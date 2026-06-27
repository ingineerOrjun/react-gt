-- 20260627000000 | Product CMS (Phase 5) — Core
-- Additive & idempotent. Adds categories + industries (full-CRUD shape reusing
-- the generic factory: published/display_order), and extends products with a
-- category, marketing flags, short description, and per-product SEO. The public
-- site is unchanged: new columns are NULL/false by default, so the detail page
-- falls back to its current values until the owner fills them in.

-- ── product_categories ───────────────────────────────────────────────────────
create table if not exists public.product_categories (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  slug          text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  description   text,
  icon          text,
  image_path    text,
  published     boolean not null default true,
  published_at  timestamptz,
  display_order integer not null default 0,
  created_by    uuid references auth.users (id) on delete set null,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- ── product_industries ───────────────────────────────────────────────────────
create table if not exists public.product_industries (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  slug          text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  description   text,
  icon          text,
  image_path    text,
  published     boolean not null default true,
  published_at  timestamptz,
  display_order integer not null default 0,
  created_by    uuid references auth.users (id) on delete set null,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- ── product_documents (schema ready; UI ships in a follow-up increment) ──────
create table if not exists public.product_documents (
  id            uuid primary key default gen_random_uuid(),
  product_id    uuid not null references public.products (id) on delete cascade,
  title         text not null,
  document_type text not null default 'Brochure',
  file_url      text not null,
  file_size     integer,
  display_order integer not null default 0,
  created_at    timestamptz not null default now()
);

-- ── extend products ──────────────────────────────────────────────────────────
alter table public.products
  add column if not exists category_id      uuid references public.product_categories (id) on delete set null,
  add column if not exists featured         boolean not null default false,
  add column if not exists popular          boolean not null default false,
  add column if not exists is_new           boolean not null default false,
  add column if not exists best_seller      boolean not null default false,
  add column if not exists short_description text,
  add column if not exists seo_title        text,
  add column if not exists seo_description  text,
  add column if not exists seo_keywords     text,
  add column if not exists og_image         text,
  add column if not exists canonical_url    text,
  add column if not exists meta_robots      text;

-- triggers
do $$ begin
  if not exists (select 1 from pg_trigger where tgname = 'product_categories_set_updated_at') then
    create trigger product_categories_set_updated_at before update on public.product_categories for each row execute function public.set_updated_at();
  end if;
  if not exists (select 1 from pg_trigger where tgname = 'product_industries_set_updated_at') then
    create trigger product_industries_set_updated_at before update on public.product_industries for each row execute function public.set_updated_at();
  end if;
end $$;

-- ── RLS ──────────────────────────────────────────────────────────────────────
alter table public.product_categories enable row level security;
alter table public.product_industries enable row level security;
alter table public.product_documents enable row level security;

do $$ begin
  if not exists (select 1 from pg_policies where tablename='product_categories' and policyname='pc_public_read') then
    create policy "pc_public_read" on public.product_categories for select to anon, authenticated using (published = true);
  end if;
  if not exists (select 1 from pg_policies where tablename='product_categories' and policyname='pc_admin_all') then
    create policy "pc_admin_all" on public.product_categories for all to authenticated using (public.is_admin()) with check (public.is_admin());
  end if;
  if not exists (select 1 from pg_policies where tablename='product_industries' and policyname='pi_public_read') then
    create policy "pi_public_read" on public.product_industries for select to anon, authenticated using (published = true);
  end if;
  if not exists (select 1 from pg_policies where tablename='product_industries' and policyname='pi_admin_all') then
    create policy "pi_admin_all" on public.product_industries for all to authenticated using (public.is_admin()) with check (public.is_admin());
  end if;
  if not exists (select 1 from pg_policies where tablename='product_documents' and policyname='pd_public_read') then
    create policy "pd_public_read" on public.product_documents for select to anon, authenticated using (true);
  end if;
  if not exists (select 1 from pg_policies where tablename='product_documents' and policyname='pd_admin_all') then
    create policy "pd_admin_all" on public.product_documents for all to authenticated using (public.is_admin()) with check (public.is_admin());
  end if;
end $$;

-- ── Seed starter categories & industries (admin data; not auto-assigned, so the
--    public detail page is unaffected) ─────────────────────────────────────────
insert into public.product_categories (name, slug, icon, display_order)
select * from (values
  ('Eco Cleaners', 'eco-cleaners', 'Droplets', 1),
  ('Industrial Solutions', 'industrial-solutions', 'Factory', 2),
  ('Green Chemicals', 'green-chemicals', 'FlaskConical', 3),
  ('Sustainable Packaging', 'sustainable-packaging', 'Boxes', 4),
  ('Biodegradable Products', 'biodegradable-products', 'Recycle', 5)
) as v(name, slug, icon, display_order)
where not exists (select 1 from public.product_categories);

insert into public.product_industries (name, slug, icon, display_order)
select * from (values
  ('Hospitality', 'hospitality', 'Building2', 1),
  ('Education', 'education', 'Users', 2),
  ('Healthcare', 'healthcare', 'ShieldCheck', 3),
  ('Commercial Buildings', 'commercial-buildings', 'Building2', 4),
  ('Manufacturing', 'manufacturing', 'Factory', 5),
  ('Residential', 'residential', 'Leaf', 6)
) as v(name, slug, icon, display_order)
where not exists (select 1 from public.product_industries);
