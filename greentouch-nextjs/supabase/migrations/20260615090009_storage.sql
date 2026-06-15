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
