// Runs on a 5-minute cron (see supabase/cron.sql). For every favorited event
// starting in the next 25-35 minutes that hasn't already triggered a
// notification, sends a web push to every subscribed device.
import { createClient } from 'npm:@supabase/supabase-js@2';
import webpush from 'npm:web-push@3.6.7';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const VAPID_PUBLIC_KEY = Deno.env.get('VAPID_PUBLIC_KEY')!;
const VAPID_PRIVATE_KEY = Deno.env.get('VAPID_PRIVATE_KEY')!;
const VAPID_SUBJECT = Deno.env.get('VAPID_SUBJECT') ?? 'mailto:example@example.com';

webpush.setVapidDetails(VAPID_SUBJECT, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);

Deno.serve(async (req) => {
  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

  const now = new Date();
  const windowStart = new Date(now.getTime() + 25 * 60 * 1000).toISOString();
  const windowEnd = new Date(now.getTime() + 35 * 60 * 1000).toISOString();

  const { data: favorites, error: favError } = await supabase.from('blizzcon_favorites').select('event_id');
  if (favError) return new Response(JSON.stringify({ error: favError.message }), { status: 500 });

  const favIds = (favorites ?? []).map((f) => f.event_id);
  if (favIds.length === 0) return new Response(JSON.stringify({ sent: 0, reason: 'no favorites' }));

  const { data: events, error: evError } = await supabase
    .from('blizzcon_events')
    .select('*')
    .in('id', favIds)
    .gte('start_time', windowStart)
    .lte('start_time', windowEnd);
  if (evError) return new Response(JSON.stringify({ error: evError.message }), { status: 500 });

  if (!events || events.length === 0) return new Response(JSON.stringify({ sent: 0, reason: 'nothing in window' }));

  const { data: alreadyNotified } = await supabase
    .from('blizzcon_notified_events')
    .select('event_id')
    .in(
      'event_id',
      events.map((e) => e.id)
    );
  const notifiedSet = new Set((alreadyNotified ?? []).map((n) => n.event_id));
  const toNotify = events.filter((e) => !notifiedSet.has(e.id));
  if (toNotify.length === 0) return new Response(JSON.stringify({ sent: 0, reason: 'already notified' }));

  const { data: subs, error: subError } = await supabase.from('blizzcon_push_subscriptions').select('*');
  if (subError) return new Response(JSON.stringify({ error: subError.message }), { status: 500 });
  if (!subs || subs.length === 0) return new Response(JSON.stringify({ sent: 0, reason: 'no subscriptions' }));

  let sent = 0;
  const staleSubIds: string[] = [];

  for (const event of toNotify) {
    const mins = Math.round((new Date(event.start_time).getTime() - now.getTime()) / 60000);
    const payload = JSON.stringify({
      title: event.title,
      body: `Starts in ${mins} min · ${event.stage}`,
      tag: event.id,
      url: '/',
    });

    for (const row of subs) {
      try {
        await webpush.sendNotification(row.subscription, payload);
        sent++;
      } catch (err) {
        if (err?.statusCode === 404 || err?.statusCode === 410) {
          staleSubIds.push(row.id);
        }
      }
    }

    await supabase.from('blizzcon_notified_events').insert({ event_id: event.id });
  }

  if (staleSubIds.length > 0) {
    await supabase.from('blizzcon_push_subscriptions').delete().in('id', staleSubIds);
  }

  return new Response(JSON.stringify({ sent, events: toNotify.map((e) => e.id) }));
});
