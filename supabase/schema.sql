create table if not exists public.rsvps (
  id bigint generated always as identity primary key,
  name text not null check (char_length(name) between 1 and 120),
  attending boolean not null,
  party_size integer not null default 0 check (party_size between 0 and 20),
  note text not null default '' check (char_length(note) <= 500),
  created_at timestamptz not null default now()
);

alter table public.rsvps enable row level security;

-- The Next.js server uses the service role key. Do not add public table policies
-- or expose that key in browser code.
