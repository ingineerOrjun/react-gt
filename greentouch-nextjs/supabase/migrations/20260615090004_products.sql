-- 0004 | products

create table if not exists public.products (
  id            uuid primary key default gen_random_uuid(),
  name          text not null check (char_length(name) between 1 and 160),
  slug          text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  description   text not null,
  image_path    text,                       -- object key in the 'products' storage bucket
  published     boolean not null default false,
  published_at  timestamptz,
  display_order integer not null default 0,
  created_by    uuid references auth.users (id) on delete set null,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists products_published_order_idx
  on public.products (published, display_order asc, created_at desc);

create trigger products_set_updated_at
  before update on public.products
  for each row execute function public.set_updated_at();

alter table public.products enable row level security;
