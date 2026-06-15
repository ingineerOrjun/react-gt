-- Sprint 2 rollback (teardown)
-- Drops everything created by migrations 0001-0010 in safe reverse order.
-- Apply with: supabase db execute --file supabase/rollback/rollback_all.sql
-- (or paste into the SQL editor of the BRANCH database).
--
-- NOTE: this destroys all data in the four tables. Take a snapshot first.
-- Each section corresponds to one forward migration; you can run a single
-- section to roll back just that step (drop in this order to respect deps).

begin;

-- ---- 0010 seed (data only; dropped with tables below, but clear explicitly) ----
delete from public.blogs;
delete from public.products;
delete from public.contact_messages;
delete from public.site_settings;

-- ---- 0009 storage policies + buckets ----
drop policy if exists "storage_admin_delete_assets" on storage.objects;
drop policy if exists "storage_admin_update_assets" on storage.objects;
drop policy if exists "storage_admin_insert_assets" on storage.objects;
drop policy if exists "storage_public_read_assets"  on storage.objects;
-- Remove seeded objects first, then the buckets.
delete from storage.objects where bucket_id in ('products', 'blogs');
delete from storage.buckets where id in ('products', 'blogs');

-- ---- 0008 RLS policies ----
drop policy if exists "profiles_self_update"            on public.profiles;
drop policy if exists "profiles_self_or_admin_read"     on public.profiles;
drop policy if exists "settings_admin_update"           on public.site_settings;
drop policy if exists "settings_public_read"            on public.site_settings;
drop policy if exists "contact_admin_delete"            on public.contact_messages;
drop policy if exists "contact_admin_update"            on public.contact_messages;
drop policy if exists "contact_admin_read"              on public.contact_messages;
drop policy if exists "contact_public_insert"           on public.contact_messages;
drop policy if exists "blogs_admin_all"                 on public.blogs;
drop policy if exists "blogs_public_read_published"     on public.blogs;
drop policy if exists "products_admin_all"              on public.products;
drop policy if exists "products_public_read_published"  on public.products;

-- ---- 0007 / 0006 / 0005 / 0004 tables (triggers drop with the tables) ----
drop table if exists public.site_settings;
drop table if exists public.contact_messages;
drop table if exists public.blogs;
drop table if exists public.products;

-- ---- 0003 functions & triggers ----
drop trigger if exists on_auth_user_created on auth.users;
drop function if exists public.handle_new_user();
drop function if exists public.is_admin();
drop function if exists public.set_updated_at();

-- ---- 0002 profiles ----
drop table if exists public.profiles;

-- ---- 0001 extensions: intentionally NOT dropped (shared, low risk) ----

commit;
