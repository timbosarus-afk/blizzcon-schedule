-- BlizzCon schedule app tables
-- Prefixed with blizzcon_ to sit safely alongside meal-planner / wishlist tables
-- in the same Supabase project.

-- The schedule itself. Single source of truth used by both the frontend and
-- the push-notification edge function, so the two can never drift apart.
create table if not exists blizzcon_events (
  id text primary key,
  day date not null,
  stage text not null,
  title text not null,
  category text not null,
  start_time timestamptz not null,
  end_time timestamptz not null,
  in_room_only boolean not null default false
);

alter table blizzcon_events enable row level security;
create policy "anon read" on blizzcon_events for select using (true);

-- Favorited events (single-user app, no auth needed - just a device/session isn't
-- required either since Tim is the only user; keyed straight on the schedule event id).
create table if not exists blizzcon_favorites (
  event_id text primary key,
  note text,
  created_at timestamptz not null default now()
);

-- Web Push subscriptions (a phone can have more than one, e.g. if re-added to
-- home screen after clearing data).
create table if not exists blizzcon_push_subscriptions (
  id uuid primary key default gen_random_uuid(),
  subscription jsonb not null,
  created_at timestamptz not null default now()
);

-- Tracks which alert thresholds (30/15/5 min) have already fired per event,
-- so the cron sweep (running every 5 min) never double-fires the same alert.
create table if not exists blizzcon_notified_events (
  event_id text not null,
  threshold_minutes integer not null,
  notified_at timestamptz not null default now(),
  primary key (event_id, threshold_minutes)
);

-- Share tokens: lets Tim generate a read-only link to his favorited schedule
-- for friends, without exposing write access.
create table if not exists blizzcon_shares (
  token text primary key default replace(replace(encode(gen_random_bytes(9), 'base64'), '+', '-'), '/', '_'),
  created_at timestamptz not null default now()
);

alter table blizzcon_favorites enable row level security;
alter table blizzcon_push_subscriptions enable row level security;
alter table blizzcon_notified_events enable row level security;
alter table blizzcon_shares enable row level security;

-- Single-user app with no login: anon key gets full read/write on the app's
-- own tables. This mirrors the trust model already used by the meal planner
-- and wishlist apps in this project.
create policy "anon full access" on blizzcon_favorites for all using (true) with check (true);
create policy "anon full access" on blizzcon_push_subscriptions for all using (true) with check (true);
create policy "anon read" on blizzcon_notified_events for select using (true);
create policy "anon full access" on blizzcon_shares for all using (true) with check (true);

-- User-added personal events (meet & greets, streaming sessions, anything
-- not on the official printed schedule but with a known time). These merge
-- into the same schedule/favorites/notification pipeline as official events.
create table if not exists blizzcon_custom_events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  day date not null,
  start_time timestamptz not null,
  end_time timestamptz not null,
  location text,
  created_at timestamptz not null default now()
);

alter table blizzcon_custom_events enable row level security;
create policy "anon full access" on blizzcon_custom_events for all using (true) with check (true);
