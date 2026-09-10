# BlizzCon Schedule

Personal schedule app for BlizzCon 2026 (Sept 12-13, Anaheim) - favorite sessions,
add notes, see clashes, get a push notification 30 min before anything starts.

## Stack
React + Vite, Supabase (Postgres + Edge Functions + pg_cron), Vercel, Web Push.
Reuses the meal-planner Supabase project (tables prefixed `blizzcon_`).

## Already done
- Tables created, all 73 events seeded (`blizzcon_events`)
- `notify-favorites` edge function deployed (verify_jwt off - it's an
  internal cron trigger, nothing else calls it)
- pg_cron job running every 5 minutes

## Still needed before alerts will actually fire

The edge function needs its VAPID secrets set. **Do not commit the private
key anywhere** - this repo is public. Get the key value from wherever you
saved it out-of-band (password manager / chat history), then from a
terminal with the Supabase CLI logged in:

```
supabase link --project-ref phesmbmeeblrqmviikca
supabase secrets set VAPID_PUBLIC_KEY=<public key>
supabase secrets set VAPID_PRIVATE_KEY=<private key - keep this out of git>
supabase secrets set VAPID_SUBJECT=mailto:your-email@example.com
```

Or set them via the dashboard: Edge Functions > notify-favorites > Secrets.
No MCP tool exposes secret-setting, so this one step has to be done manually.

## Environment variables
`.env` (local, gitignored) and Vercel project settings both need:
- `VITE_SUPABASE_URL=https://phesmbmeeblrqmviikca.supabase.co`
- `VITE_SUPABASE_ANON_KEY=` (Project Settings > API > anon/public legacy key
  - this one is meant to be public, safe in frontend code)
- `VITE_VAPID_PUBLIC_KEY=` (the public half only - see `.env.example`)

## iOS notification quirk
Safari on iPhone only allows push notifications for sites added to the Home
Screen (Share icon -> Add to Home Screen), not for a page open in a regular
tab. The app shows this instructions banner automatically when it detects
iOS + not-installed.

## Local dev
```
npm install
npm run dev
```

## Deploy
Push to GitHub, import into Vercel, set the env vars above. Vite/React is
auto-detected, no config needed.
