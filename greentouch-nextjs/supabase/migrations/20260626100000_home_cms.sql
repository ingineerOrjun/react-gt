-- 20260626100000 | Homepage CMS (Phase 4)
-- Additive & idempotent. Three tables backing the existing homepage sections,
-- seeded with the EXACT current content so the public homepage is byte-identical.
-- home_features / home_statistics use `published`/`display_order` so they reuse
-- the generic CRUD + DataTable + ResourceForm with zero new code.

-- ── home_sections (keyed singleton copy: hero, why_choose, cta, …) ────────────
create table if not exists public.home_sections (
  id            uuid primary key default gen_random_uuid(),
  section_key   text not null unique,
  eyebrow       text,
  title         text,
  highlight     text,
  subtitle      text,
  content       text,
  button_text   text,
  button_link   text,
  button2_text  text,
  button2_link  text,
  image         text,
  icon          text,
  meta          jsonb not null default '{}'::jsonb,
  display_order integer not null default 0,
  enabled       boolean not null default true,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- ── home_features (Why-Choose cards) ─────────────────────────────────────────
create table if not exists public.home_features (
  id            uuid primary key default gen_random_uuid(),
  title         text not null,
  description   text not null,
  icon          text,
  published     boolean not null default true,
  published_at  timestamptz,
  display_order integer not null default 0,
  created_by    uuid references auth.users (id) on delete set null,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- ── home_statistics (trust bar / stats) ──────────────────────────────────────
create table if not exists public.home_statistics (
  id            uuid primary key default gen_random_uuid(),
  label         text not null,
  value         text,
  suffix        text,
  icon          text,
  published     boolean not null default true,
  published_at  timestamptz,
  display_order integer not null default 0,
  created_by    uuid references auth.users (id) on delete set null,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- updated_at triggers (reuse existing function)
do $$ begin
  if not exists (select 1 from pg_trigger where tgname = 'home_sections_set_updated_at') then
    create trigger home_sections_set_updated_at before update on public.home_sections for each row execute function public.set_updated_at();
  end if;
  if not exists (select 1 from pg_trigger where tgname = 'home_features_set_updated_at') then
    create trigger home_features_set_updated_at before update on public.home_features for each row execute function public.set_updated_at();
  end if;
  if not exists (select 1 from pg_trigger where tgname = 'home_statistics_set_updated_at') then
    create trigger home_statistics_set_updated_at before update on public.home_statistics for each row execute function public.set_updated_at();
  end if;
end $$;

-- ── RLS ──────────────────────────────────────────────────────────────────────
alter table public.home_sections enable row level security;
alter table public.home_features enable row level security;
alter table public.home_statistics enable row level security;

do $$ begin
  if not exists (select 1 from pg_policies where tablename='home_sections' and policyname='home_sections_public_read') then
    create policy "home_sections_public_read" on public.home_sections for select to anon, authenticated using (enabled = true);
  end if;
  if not exists (select 1 from pg_policies where tablename='home_sections' and policyname='home_sections_admin_all') then
    create policy "home_sections_admin_all" on public.home_sections for all to authenticated using (public.is_admin()) with check (public.is_admin());
  end if;
  if not exists (select 1 from pg_policies where tablename='home_features' and policyname='home_features_public_read') then
    create policy "home_features_public_read" on public.home_features for select to anon, authenticated using (published = true);
  end if;
  if not exists (select 1 from pg_policies where tablename='home_features' and policyname='home_features_admin_all') then
    create policy "home_features_admin_all" on public.home_features for all to authenticated using (public.is_admin()) with check (public.is_admin());
  end if;
  if not exists (select 1 from pg_policies where tablename='home_statistics' and policyname='home_statistics_public_read') then
    create policy "home_statistics_public_read" on public.home_statistics for select to anon, authenticated using (published = true);
  end if;
  if not exists (select 1 from pg_policies where tablename='home_statistics' and policyname='home_statistics_admin_all') then
    create policy "home_statistics_admin_all" on public.home_statistics for all to authenticated using (public.is_admin()) with check (public.is_admin());
  end if;
end $$;

-- ── Seed: exact current homepage content ─────────────────────────────────────
insert into public.home_sections (section_key, eyebrow, title, highlight, subtitle, content, button_text, button_link, button2_text, button2_link, image, meta, display_order)
values
  ('hero',
   'Cleaning & hygiene products, supplied reliably',
   'Premium Cleaning Solutions for',
   'Homes, Businesses & Industries',
   'GreenTouch Chemicals delivers high-quality, eco-conscious cleaning and hygiene products — with dependable bulk supply for schools, hospitals, hotels, and facilities.',
   null,
   'Explore Products', '/products', 'Contact Us', '/contact',
   '/images/banner/bann.jpeg',
   '{"points":["Eco-friendly formulations","Reliable bulk supply","Trusted by institutions"],"card_title":"Quality you can rely on","card_subtitle":"Consistent supply for institutions & industry"}'::jsonb,
   1),
  ('why_choose',
   null,
   'Why Choose GreenTouch',
   null,
   'The reasons institutions and businesses rely on us for cleaning and hygiene supply.',
   null, null, null, null, null, null, '{}'::jsonb, 2),
  ('cta',
   null,
   'Ready to Order Reliable Cleaning & Hygiene Supply?',
   null,
   null,
   'Request a quote or message us on WhatsApp — bulk and custom quantities welcome. We typically respond within 24 hours.',
   'Request a Quote', '/contact', null, null, null, '{}'::jsonb, 3)
on conflict (section_key) do nothing;

insert into public.home_features (title, description, icon, display_order)
select * from (values
  ('Consistent Product Quality', 'Formulations you can rely on to perform the same way, every order.', 'BadgeCheck', 1),
  ('Reliable Supply Chain', 'Dependable fulfilment for bulk and recurring requirements.', 'Truck', 2),
  ('Practical Product Solutions', 'Effective products designed for real-world cleaning and hygiene needs.', 'Sparkles', 3),
  ('Responsive Support', 'A team that responds quickly and understands your account.', 'Headphones', 4),
  ('Industry-Focused Products', 'Solutions suited to institutional, commercial, and industrial settings.', 'Factory', 5),
  ('Long-Term Relationships', 'We focus on dependable partnerships, not one-off transactions.', 'HeartHandshake', 6)
) as v(title, description, icon, display_order)
where not exists (select 1 from public.home_features);

insert into public.home_statistics (label, icon, display_order)
select * from (values
  ('Quality Focused', 'BadgeCheck', 1),
  ('Industry Trusted', 'Building2', 2),
  ('Reliable Supply', 'PackageCheck', 3),
  ('Customer Support', 'Headphones', 4)
) as v(label, icon, display_order)
where not exists (select 1 from public.home_statistics);
