// Runs on a 5-minute cron (see supabase/cron.sql). For every favorited event
// (official or custom/personal) starting soon, sends a web push at each
// alert threshold (30/15/5 min before) that hasn't already fired.
import { createClient } from 'npm:@supabase/supabase-js@2';
import webpush from 'npm:web-push@3.6.7';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const VAPID_PUBLIC_KEY = Deno.env.get('VAPID_PUBLIC_KEY')!;
const VAPID_PRIVATE_KEY = Deno.env.get('VAPID_PRIVATE_KEY')!;
const VAPID_SUBJECT = Deno.env.get('VAPID_SUBJECT') ?? 'mailto:example@example.com';

const THRESHOLDS_MIN = [30, 15, 5];
const WINDOW_PAD_MIN = 5; // each threshold covers T-5..T+5 minutes out, comfortably straddling one 5-min cron tick
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

webpush.setVapidDetails(VAPID_SUBJECT, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);

Deno.serve(async (req) => {
  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);
  const now = new Date();

  const { data: favorites, error: favError } = await supabase.from('blizzcon_favorites').select('event_id');
  if (favError) return new Response(JSON.stringify({ error: favError.message }), { status: 500 });

  const favIds = (favorites ?? []).map((f) => f.event_id);
  if (favIds.length === 0) return new Response(JSON.stringify({ sent: 0, reason: 'no favorites' }));

  // blizzcon_custom_events.id is a uuid column - passing a non-uuid string
  // (official event ids like "d1-main-1") into an .in() filter against it
  // throws a Postgres type error and would otherwise take down the whole
  // sweep, official events included. Split favorited ids by shape up front.
  const customFavIds = favIds.filter((id) => UUID_RE.test(id));
  const officialFavIds = favIds; // text column, any string is safe to query

  const { data: subs, error: subError } = await supabase.from('blizzcon_push_subscriptions').select('*');
  if (subError) return new Response(JSON.stringify({ error: subError.message }), { status: 500 });
  if (!subs || subs.length === 0) return new Response(JSON.stringify({ sent: 0, reason: 'no subscriptions' }));

  let totalSent = 0;
  const staleSubIds = new Set<string>();
  const notifiedThisRun: { event_id: string; threshold_minutes: number; title: string }[] = [];

  for (const threshold of THRESHOLDS_MIN) {
    const windowStart = new Date(now.getTime() + (threshold - WINDOW_PAD_MIN) * 60 * 1000).toISOString();
    const windowEnd = new Date(now.getTime() + (threshold + WINDOW_PAD_MIN) * 60 * 1000).toISOString();

    // Official schedule events.
    const { data: officialEvents, error: evError } = await supabase
      .from('blizzcon_events')
      .select('id, title, start_time, stage')
      .in('id', officialFavIds)
      .gte('start_time', windowStart)
      .lte('start_time', windowEnd);
    if (evError) return new Response(JSON.stringify({ error: evError.message }), { status: 500 });

    // Custom/personal events (meet & greets, streaming sessions, etc) - only
    // query if there's at least one favorited id that's actually a uuid.
    let customEvents: any[] = [];
    if (customFavIds.length > 0) {
      const { data, error: customError } = await supabase
        .from('blizzcon_custom_events')
        .select('id, title, start_time, location')
        .in('id', customFavIds)
        .gte('start_time', windowStart)
        .lte('start_time', windowEnd);
      if (customError) return new Response(JSON.stringify({ error: customError.message }), { status: 500 });
      customEvents = data ?? [];
    }

    const events = [
      ...(officialEvents ?? []).map((e) => ({ ...e, place: e.stage })),
      ...customEvents.map((e) => ({ ...e, place: e.location || 'your schedule' })),
    ];
    if (events.length === 0) continue;

    const { data: alreadyNotified } = await supabase
      .from('blizzcon_notified_events')
      .select('event_id')
      .eq('threshold_minutes', threshold)
      .in(
        'event_id',
        events.map((e) => e.id)
      );
    const notifiedSet = new Set((alreadyNotified ?? []).map((n) => n.event_id));
    const toNotify = events.filter((e) => !notifiedSet.has(e.id));
    if (toNotify.length === 0) continue;

    for (const event of toNotify) {
      const mins = Math.round((new Date(event.start_time).getTime() - now.getTime()) / 60000);
      const payload = JSON.stringify({
        title: event.title,
        body: `Starts in ${mins} min \u00b7 ${event.place}`,
        tag: `${event.id}-${threshold}`,
        url: '/',
      });

      for (const row of subs) {
        try {
          await webpush.sendNotification(row.subscription, payload);
          totalSent++;
        } catch (err) {
          if (err?.statusCode === 404 || err?.statusCode === 410) {
            staleSubIds.add(row.id);
          }
        }
      }

      await supabase.from('blizzcon_notified_events').insert({ event_id: event.id, threshold_minutes: threshold });
      notifiedThisRun.push({ event_id: event.id, threshold_minutes: threshold, title: event.title });
    }
  }

  if (staleSubIds.size > 0) {
    await supabase.from('blizzcon_push_subscriptions').delete().in('id', Array.from(staleSubIds));
  }

  return new Response(JSON.stringify({ sent: totalSent, notified: notifiedThisRun }));
});
