# RSVP storage setup

The public invitation accepts replies at `/`; view and count them at `/admin`.
Replies are saved in Supabase and the dashboard requires the admin password.

1. Create a Supabase project.
2. In its SQL Editor, run `supabase/schema.sql` to create the RSVP table and allow public submissions while keeping reads private.
3. Set `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`, and `SUPABASE_SECRET_KEY` in `.env.local`. Keep the secret key private. Choose a long private value for `RSVP_ADMIN_PASSWORD`.
4. Add the same three environment variables to your Next.js hosting provider, then redeploy.
5. Open `/admin` on the deployed site and enter the admin password to see replies and totals.

Keep `SUPABASE_SECRET_KEY` and `RSVP_ADMIN_PASSWORD` private. They are only read by the server. The project must run Next.js with server-side routes; a static-only deployment cannot store these replies.
