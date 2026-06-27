-- 20260626000001 | Settings expansion + activity log (Phase 3)
-- Purely ADDITIVE & idempotent: extends the site_settings singleton with the
-- remaining global website configuration, and adds an activity_log audit table.
-- Safe to re-run. Direct-Postgres execution (apply-settings.mjs) bypasses RLS.

-- ── 1. Extend site_settings ──────────────────────────────────────────────────
alter table public.site_settings
  add column if not exists company_name        text not null default 'GreenTouch Chemicals Pvt. Ltd.',
  add column if not exists company_tagline      text,
  add column if not exists company_description  text,
  add column if not exists whatsapp             text,
  add column if not exists address_street       text,
  add column if not exists address_municipality text,
  add column if not exists address_district     text,
  add column if not exists address_postal_code  text,
  add column if not exists address_country      text default 'Nepal',
  add column if not exists business_hours       jsonb not null default '[]'::jsonb,
  add column if not exists service_areas        jsonb not null default '[]'::jsonb,
  add column if not exists social_links         jsonb not null default '{}'::jsonb,
  add column if not exists seo_title            text,
  add column if not exists seo_description      text,
  add column if not exists seo_keywords         text,
  add column if not exists seo_og_image         text,
  add column if not exists hero_eyebrow         text,
  add column if not exists hero_title           text,
  add column if not exists hero_subtitle        text,
  add column if not exists footer_description   text,
  add column if not exists footer_copyright     text;

-- ── 2. Ensure the singleton row exists, then seed canonical current values ────
insert into public.site_settings (singleton) values (true)
  on conflict (singleton) do nothing;

update public.site_settings set
  company_name        = 'GreenTouch Chemicals Pvt. Ltd.',
  site_title          = 'GreenTouch Chemicals Pvt. Ltd.',
  contact_email       = 'greentouch.np@gmail.com',
  contact_phone       = '9801603296',
  whatsapp            = '9801603296',
  address             = 'Dhalkebar, Mithila Municipality, Dhanusha, Nepal 45700',
  address_street      = 'Dhalkebar',
  address_municipality= 'Mithila Municipality',
  address_district    = 'Dhanusha',
  address_postal_code = '45700',
  address_country     = 'Nepal',
  business_hours      = '[{"label":"Monday – Friday","value":"9am – 5pm"},{"label":"Weekends","value":"By appointment"}]'::jsonb,
  service_areas       = '["Lahan","Rajbiraj","Jaleshwar","Birgunj","Siraha","Janakpur","Malangwa","Kalaiya"]'::jsonb,
  social_links        = '{"facebook":"https://facebook.com/greentouchchemicalsindustries","twitter":"https://twitter.com/greentouchchem","instagram":"https://instagram.com/greentouchchemicalsindustries","linkedin":"https://linkedin.com/company/greentouch-chemical-industries"}'::jsonb,
  seo_title           = 'GreenTouch Chemicals Pvt. Ltd. | Sustainable Chemical Solutions',
  seo_description     = 'GreenTouch Chemicals Pvt. Ltd. is a leading provider of eco-friendly chemical products and sustainable solutions for industrial and consumer applications.',
  seo_keywords        = 'sustainable chemicals, eco-friendly products, green chemical solutions, biodegradable, GreenTouch Chemicals',
  footer_copyright    = 'GreenTouch Chemicals Pvt. Ltd. All rights reserved.'
where singleton = true;

-- ── 3. Activity log (audit trail) ────────────────────────────────────────────
create table if not exists public.activity_log (
  id          uuid primary key default gen_random_uuid(),
  actor_id    uuid references auth.users (id) on delete set null,
  actor_email text,
  entity      text not null,
  action      text not null,
  field       text,
  old_value   text,
  new_value   text,
  created_at  timestamptz not null default now()
);

create index if not exists activity_log_created_at_idx on public.activity_log (created_at desc);

alter table public.activity_log enable row level security;

do $$ begin
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'activity_log' and policyname = 'activity_admin_read') then
    create policy "activity_admin_read" on public.activity_log for select to authenticated using (public.is_admin());
  end if;
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'activity_log' and policyname = 'activity_admin_insert') then
    create policy "activity_admin_insert" on public.activity_log for insert to authenticated with check (public.is_admin());
  end if;
end $$;
