-- 0002 | profiles
-- 1:1 with auth.users. Single role: 'admin'. Sign-ups are disabled, so every
-- provisioned user is internal staff with full admin rights.

create table if not exists public.profiles (
  id         uuid primary key references auth.users (id) on delete cascade,
  full_name  text,
  role       text not null default 'admin' check (role = 'admin'),
  created_at timestamptz not null default now()
);

comment on table public.profiles is 'Internal staff profiles (1:1 with auth.users). Single admin role.';

alter table public.profiles enable row level security;
