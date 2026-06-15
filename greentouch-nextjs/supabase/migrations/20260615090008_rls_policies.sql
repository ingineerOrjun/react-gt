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
