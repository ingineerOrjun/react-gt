-- GreenTouch — combined Sprint 2 schema (generated from migrations/).
-- Paste into Supabase Dashboard > SQL Editor > Run. Safe to re-run.


-- ============================================================
-- migrations/20260615090001_extensions.sql
-- ============================================================
-- 0001 | Extensions
-- pgcrypto provides gen_random_uuid(). On Supabase it is usually present already;
-- this makes the migration self-contained for a fresh/branch database.

create extension if not exists pgcrypto;


-- ============================================================
-- migrations/20260615090002_profiles.sql
-- ============================================================
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


-- ============================================================
-- migrations/20260615090003_functions_triggers.sql
-- ============================================================
-- 0003 | Functions & triggers

-- Maintains updated_at on row updates.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Authorization helper used by every write policy.
-- SECURITY DEFINER so it can read public.profiles regardless of that table's RLS
-- (also prevents policy recursion). search_path pinned to avoid hijacking.
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles p
    where p.id = auth.uid()
      and p.role = 'admin'
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;

-- Auto-create a profile when a new auth user is provisioned (invite-only -> admin).
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, role)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'full_name', ''), 'admin')
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();


-- ============================================================
-- migrations/20260615090004_products.sql
-- ============================================================
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


-- ============================================================
-- migrations/20260615090005_blogs.sql
-- ============================================================
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


-- ============================================================
-- migrations/20260615090006_contact_messages.sql
-- ============================================================
-- 0006 | contact_messages
-- Public can INSERT (the contact form). Only admins can read/update/delete.

create table if not exists public.contact_messages (
  id         uuid primary key default gen_random_uuid(),
  name       text not null check (char_length(name) between 1 and 120),
  email      text not null check (char_length(email) <= 160
                                  and email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  subject    text not null check (char_length(subject) between 1 and 160),
  message    text not null check (char_length(message) between 1 and 5000),
  status     text not null default 'new'
               check (status in ('new', 'read', 'responded', 'archived')),
  created_at timestamptz not null default now()
);

create index if not exists contact_messages_status_idx
  on public.contact_messages (status, created_at desc);

alter table public.contact_messages enable row level security;


-- ============================================================
-- migrations/20260615090007_site_settings.sql
-- ============================================================
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


-- ============================================================
-- migrations/20260615090008_rls_policies.sql
-- ============================================================
-- 0008 | RLS policies
-- RLS is already enabled on every table (0002-0007). Default-deny: a row/op is
-- only allowed if a permissive policy below grants it. Multiple permissive
-- policies are OR-ed together.

-- ============================ products ============================
create policy "products_public_read_published"
  on public.products for select
  to anon, authenticated
  using (published = true);

create policy "products_admin_all"
  on public.products for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- ============================== blogs =============================
create policy "blogs_public_read_published"
  on public.blogs for select
  to anon, authenticated
  using (published = true);

create policy "blogs_admin_all"
  on public.blogs for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- ========================= contact_messages =======================
-- Public may only INSERT, and only with status = 'new'. They can never read back.
create policy "contact_public_insert"
  on public.contact_messages for insert
  to anon, authenticated
  with check (status = 'new');

create policy "contact_admin_read"
  on public.contact_messages for select
  to authenticated
  using (public.is_admin());

create policy "contact_admin_update"
  on public.contact_messages for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy "contact_admin_delete"
  on public.contact_messages for delete
  to authenticated
  using (public.is_admin());

-- ========================== site_settings =========================
create policy "settings_public_read"
  on public.site_settings for select
  to anon, authenticated
  using (true);

create policy "settings_admin_update"
  on public.site_settings for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- ============================= profiles ===========================
-- Insert is handled by the handle_new_user() trigger (SECURITY DEFINER), so no
-- client INSERT policy is needed. No DELETE policy (cascades from auth.users).
create policy "profiles_self_or_admin_read"
  on public.profiles for select
  to authenticated
  using (id = auth.uid() or public.is_admin());

create policy "profiles_self_update"
  on public.profiles for update
  to authenticated
  using (id = auth.uid())
  with check (id = auth.uid());


-- ============================================================
-- migrations/20260615090009_storage.sql
-- ============================================================
-- 0009 | Storage buckets & policies
-- Two public-read buckets; writes restricted to admins. storage.objects has RLS
-- enabled by Supabase; we add policies scoped to these two buckets.

insert into storage.buckets (id, name, public)
values ('products', 'products', true),
       ('blogs',    'blogs',    true)
on conflict (id) do nothing;

-- Public read (also served via the public object URL since buckets are public).
create policy "storage_public_read_assets"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id in ('products', 'blogs'));

-- Admin-only writes.
create policy "storage_admin_insert_assets"
  on storage.objects for insert
  to authenticated
  with check (bucket_id in ('products', 'blogs') and public.is_admin());

create policy "storage_admin_update_assets"
  on storage.objects for update
  to authenticated
  using (bucket_id in ('products', 'blogs') and public.is_admin())
  with check (bucket_id in ('products', 'blogs') and public.is_admin());

create policy "storage_admin_delete_assets"
  on storage.objects for delete
  to authenticated
  using (bucket_id in ('products', 'blogs') and public.is_admin());


-- ============================================================
-- migrations/20260615090010_seed.sql
-- ============================================================
-- 0010 | Seed data
-- Idempotent: re-running is safe (ON CONFLICT DO NOTHING on unique keys).
-- Image binaries are uploaded separately by supabase/seed/upload-images.mjs to
-- the object keys referenced in image_path below. Run that script before/after
-- this migration (order does not matter; rows simply point at the keys).

-- ---------- site_settings singleton ----------
insert into public.site_settings
  (singleton, site_title, contact_email, contact_phone, address,
   facebook_url, twitter_url, instagram_url, linkedin_url)
values
  (true,
   'GreenTouch Chemicals Pvt. Ltd.',
   'greentouchgrouppvtltd.1@gmail.com',
   '9801603296',
   'Kushwaha Chock Dhalkebar, Dhanusa district',
   'https://facebook.com/greentouchchemicalsindustries',
   'https://twitter.com/greentouchchem',
   'https://instagram.com/greentouchchemicalsindustries',
   'https://linkedin.com/company/greentouch-chemical-industries')
on conflict (singleton) do nothing;

-- ---------- products ----------
insert into public.products (slug, name, description, image_path, published, published_at, display_order)
values
  ('prithvi-phenyl', 'Prithvi Phenyl',
   'Keep your home fresh and germ-free with Prithvi Phenyl, a powerful disinfectant that removes stains and odors for a spotless clean.',
   'seed/prithvi-phenyl.jpeg', true, now(), 1),
  ('prithvi-liquid-blue', 'Prithvi Liquid Blue',
   'Enhance your whites with Prithvi Liquid Blue, delivering a bright, long-lasting shine to your fabrics with every wash.',
   'seed/prithvi-liquid-blue.jpeg', true, now(), 2),
  ('prithvi-tiles-cleaner', 'Prithvi Tiles Cleaner',
   'Restore the sparkle of your floors with Prithvi Tiles Cleaner, an effective formula that removes tough stains, grime, and watermarks effortlessly.',
   'seed/prithvi-tiles-cleaner.jpeg', true, now(), 3),
  ('prithvi-glass-cleaner', 'Prithvi Glass Cleaner',
   'Get crystal clear windows and mirrors with Prithvi Glass Cleaner, leaving no streaks or residue behind for perfect clarity.',
   'seed/prithvi-glass-cleaner.jpeg', true, now(), 4),
  ('prithvi-dishwash-liquid', 'Prithvi Dishwash Liquid',
   'Our powerful yet gentle dishwashing liquid cuts through grease while being kind to your hands and the environment.',
   'seed/prithvi-dishwash-liquid.jpeg', true, now(), 5),
  ('prithvi-all-purpose-cleaner', 'Prithvi All-Purpose Cleaner',
   'A versatile cleaning solution that works on multiple surfaces, making it perfect for all your household cleaning needs.',
   'seed/prithvi-all-purpose-cleaner.jpeg', true, now(), 6)
on conflict (slug) do nothing;

-- ---------- blogs ----------
insert into public.blogs (slug, title, excerpt, content, image_path, published, published_at, display_order)
values
  ('sustainable-chemistry-innovations-for-a-green-future',
   'Sustainable Chemistry: Innovations for a Green Future',
   'Discover the latest innovations in eco-friendly chemical solutions that are transforming industries while protecting our planet.',
   'Sustainable chemistry is no longer a niche pursuit — it is rapidly becoming the foundation of modern manufacturing. As industries face mounting pressure to reduce their environmental footprint, green chemical solutions offer a path to growth that does not come at the planet''s expense.

At GreenTouch, our research focuses on replacing hazardous reagents with biodegradable alternatives, designing closed-loop processes that minimise waste, and developing water-based formulations that eliminate harmful solvents entirely.

The results speak for themselves: cleaner production lines, safer workplaces, and end products that meet the highest international sustainability standards without compromising on performance.',
   'seed/sustainable-chemistry-innovations-for-a-green-future.jpg', true, now(), 1),

  ('natural-compounds-revolutionizing-industrial-cleaning',
   'How Natural Compounds are Revolutionizing Industrial Cleaning',
   'Learn how plant-based chemical compounds are providing safer alternatives to traditional industrial cleaning products.',
   'Traditional industrial cleaners often rely on aggressive solvents that pose risks to both workers and the environment. Plant-derived surfactants are changing that equation.

Derived from renewable sources such as coconut and corn, these compounds break down grease and grime just as effectively as their petrochemical counterparts — while remaining fully biodegradable.

Our laboratory trials show plant-based formulations matching, and in several cases exceeding, the cleaning power of conventional products.',
   'seed/natural-compounds-revolutionizing-industrial-cleaning.jpg', true, now(), 2),

  ('environmental-impact-of-chemical-manufacturing',
   'The Environmental Impact of Chemical Manufacturing: Our Commitment',
   'Read about our commitment to reducing our carbon footprint and implementing sustainable practices in our manufacturing processes.',
   'Manufacturing chemicals responsibly means accounting for every stage of the product lifecycle — from raw material sourcing to end-of-life disposal.

GreenTouch has invested heavily in carbon-neutral production, optimising energy use across our facilities and offsetting unavoidable emissions through verified reforestation programmes.

Transparency is central to our approach. We publish our environmental metrics annually and continuously set more ambitious targets.',
   'seed/environmental-impact-of-chemical-manufacturing.jpg', true, now(), 3),

  ('green-certification-for-chemical-products',
   'Green Certification: What It Means for Chemical Products',
   'Understand the importance of green certification for chemical products and how it ensures environmental compliance.',
   'Green certifications give buyers confidence that a product genuinely meets rigorous environmental and safety criteria — cutting through marketing claims with independent verification.

Standards such as ISO 14001 assess everything from ingredient sourcing to manufacturing emissions and packaging recyclability.

Every GreenTouch product is developed with certification in mind from day one.',
   'seed/green-certification-for-chemical-products.jpg', true, now(), 4),

  ('biodegradable-formulations-future-of-industrial-chemicals',
   'Biodegradable Formulations: The Future of Industrial Chemicals',
   'Explore how biodegradable formulations are setting new standards in the industrial chemical sector.',
   'Biodegradability is fast becoming a baseline expectation rather than a premium feature. Regulators and consumers alike are demanding products that return safely to nature.

Formulating for biodegradability requires careful molecular design — ensuring compounds break down completely without leaving persistent or toxic residues behind.

Our biodegradable product line demonstrates that environmental responsibility and industrial-grade performance are not mutually exclusive.',
   'seed/biodegradable-formulations-future-of-industrial-chemicals.jpg', true, now(), 5),

  ('chemical-safety-best-practices',
   'Chemical Safety: Best Practices for Handling and Storage',
   'Essential guidelines for safely handling and storing chemical products to protect both people and the environment.',
   'Even the greenest chemicals must be handled and stored correctly to ensure the safety of people and the surrounding environment.

Key practices include proper labelling, temperature-controlled storage, adequate ventilation, and readily available safety data sheets for every product on site.

Training staff to follow consistent handling protocols dramatically reduces the risk of spills and exposure.',
   'seed/chemical-safety-best-practices.jpg', true, now(), 6)
on conflict (slug) do nothing;

