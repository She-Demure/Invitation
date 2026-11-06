create table if not exists public.rsvps (
  id bigint generated always as identity primary key,
  name text not null check (char_length(name) between 1 and 120),
  attending boolean not null,
  party_size integer not null default 0 check (party_size between 0 and 20),
  note text not null default '' check (char_length(note) <= 500),
  created_at timestamptz not null default now()
);

alter table public.rsvps enable row level security;

grant insert on public.rsvps to anon;

create policy "Guests can submit RSVPs"
  on public.rsvps
  for insert
  to anon
  with check (true);

-- Do not grant public read access. The Next.js admin API uses the service role
-- key on the server after checking RSVP_ADMIN_PASSWORD.
