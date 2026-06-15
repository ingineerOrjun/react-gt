-- 0005 | blogs

create table if not exists public.blogs (
  id            uuid primary key default gen_random_uuid(),
  title         text not null check (char_length(title) between 1 and 200),
  slug          text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  excerpt       text not null check (char_length(excerpt) <= 300),
  content       text not null,
  image_path    text,                       -- object key in the 'blogs' storage bucket
  published     boolean not null default false,
  published_at  timestamptz,
  display_order integer not null default 0,
  created_by    uuid references auth.users (id) on delete set null,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists blogs_published_order_idx
  on public.blogs (published, display_order asc, published_at desc);

create trigger blogs_set_updated_at
  before update on public.blogs
  for each row execute function public.set_updated_at();

alter table public.blogs enable row level security;
