-- Already applied directly to the project via the Supabase MCP tools.
-- Kept here for reference / disaster recovery.

create extension if not exists pg_cron;
create extension if not exists pg_net;

select cron.schedule(
  'blizzcon-notify-favorites',
  '*/5 * * * *',
  $$
  select net.http_post(
    url := 'https://phesmbmeeblrqmviikca.supabase.co/functions/v1/notify-favorites',
    headers := jsonb_build_object('Content-Type', 'application/json')
  );
  $$
);

-- The function is deployed with verify_jwt = false since this is an
-- internal cron trigger with no user-facing auth flow. To stop the
-- schedule: select cron.unschedule('blizzcon-notify-favorites');
