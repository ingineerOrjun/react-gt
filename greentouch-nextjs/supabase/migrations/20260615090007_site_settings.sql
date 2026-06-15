-- 0007 | site_settings (singleton)
-- The `singleton` column has a UNIQUE constraint and a CHECK forcing it true,
-- so at most one row can ever exist.

create table if not exists public.site_settings (
  id            uuid primary key default gen_random_uuid(),
  singleton     boolean not null default true unique check (singleton),
  site_title    text not null default 'GreenTouch Chemicals Pvt. Ltd.',
  contact_email text not null default 'greentouchgrouppvtltd.1@gmail.com',
  contact_phone text,
  address       text,
  facebook_url  text,
  twitter_url   text,
  instagram_url text,
  linkedin_url  text,
  updated_at    timestamptz not null default now()
);

create trigger site_settings_set_updated_at
  before update on public.site_settings
  for each row execute function public.set_updated_at();

alter table public.site_settings enable row level security;
