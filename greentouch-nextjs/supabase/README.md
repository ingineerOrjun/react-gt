# Supabase — Sprint 2 Foundation (Runbook)

Schema, RLS, storage, and seed for GreenTouch Chemicals. Source of truth for the
database. **Apply to a branch (staging) database first, then production.**

## Layout

```
supabase/
├── migrations/                 # forward migrations (applied in filename order)
│   ├── 20260615090001_extensions.sql
│   ├── 20260615090002_profiles.sql
│   ├── 20260615090003_functions_triggers.sql
│   ├── 20260615090004_products.sql
│   ├── 20260615090005_blogs.sql
│   ├── 20260615090006_contact_messages.sql
│   ├── 20260615090007_site_settings.sql
│   ├── 20260615090008_rls_policies.sql
│   ├── 20260615090009_storage.sql
│   └── 20260615090010_seed.sql
├── seed/upload-images.mjs      # uploads product/blog images into storage buckets
└── rollback/rollback_all.sql   # full teardown (reverse order)
```

## 0. Prerequisites
- Supabase CLI: `npm i -g supabase` (or use `npx supabase`).
- App deps for the seed script: `npm i @supabase/supabase-js @supabase/ssr`.
- Fill `.env.local` from `.env.example` (branch keys for staging).

## 1. Link the project
```bash
supabase login
supabase init                       # once; creates supabase/config.toml
supabase link --project-ref "$SUPABASE_PROJECT_REF"
```

## 2. Create / target the STAGING branch database
Branching (Pro plan) gives an isolated copy for staging.
```bash
# via CLI
supabase branches create staging
supabase branches list
# point the CLI at the branch (use the branch ref it prints), or manage from the
# Supabase dashboard > Branches. Put the BRANCH url/keys in .env.local for testing.
```
> If branching is unavailable, create a separate "greentouch-staging" project and
> link to that instead — same commands, different ref.

## 3. Apply migrations (branch first)
```bash
supabase db push                    # applies all migrations/ in order
```

## 4. Seed images into storage
```bash
# Node 20.6+: loads .env.local automatically
node --env-file=.env.local supabase/seed/upload-images.mjs
```
(The data rows are seeded by migration 0010; this uploads the binaries the rows
point at.)

## 5. Generate TypeScript types
```bash
supabase gen types typescript --linked > types/database.types.ts
```

## 6. Provision the first admin user (no public sign-up)
Sign-ups are disabled in **Auth > Providers > Email** (turn OFF "Allow new users
to sign up"). Create staff manually:
- Dashboard: **Authentication > Users > Add user** (set a password).
- The `on_auth_user_created` trigger auto-inserts a `profiles` row with role
  `admin`. Verify: `select * from public.profiles;`

## 7. Promote to production
Re-run steps 3–6 against the production project (link to prod ref). Take a
backup/PITR checkpoint first (step "Rollback" below).

---

## Verification checklist
Run in the SQL editor of the branch DB. RLS is validated by proving access is
**denied** where it should be.

**Structure**
- [ ] `select tablename, rowsecurity from pg_tables where schemaname='public';`
      → all of products, blogs, contact_messages, site_settings, profiles show `rowsecurity = true`.
- [ ] `select count(*) from pg_policies where schemaname='public';` → matches the policy count (14).
- [ ] `select id, public from storage.buckets;` → `products`, `blogs` both `public = true`.
- [ ] `select * from public.site_settings;` → exactly one row.
- [ ] Insert a product with a duplicate `slug` → fails (unique).
- [ ] Insert a second `site_settings` row → fails (singleton).
- [ ] Insert `contact_messages` with a bad email / empty subject → fails (CHECK).

**RLS — anon** (SQL editor: `set role anon;` then queries; `reset role;` after)
- [ ] `select count(*) from public.products;` → only published rows.
- [ ] `select count(*) from public.contact_messages;` → 0 (denied/empty).
- [ ] `insert into public.contact_messages(name,email,subject,message) values('A','a@b.co','Hi','Hello there');` → succeeds.
- [ ] `insert ... (status) values (...,'archived');` → fails the WITH CHECK.
- [ ] `update public.contact_messages set status='read';` → 0 rows / denied.

**RLS — admin** (simulate: set the JWT claims, or test from an authenticated client)
- [ ] Admin can select drafts, insert/update/delete products & blogs.
- [ ] Admin can read and update contact_messages and site_settings.

**Storage**
- [ ] Public URL of a seeded object loads (e.g. `…/storage/v1/object/public/products/seed/prithvi-phenyl.jpeg`).
- [ ] Anonymous upload is rejected; admin upload succeeds (the seed script proves admin/service path).

**Auth**
- [ ] New-user sign-up via the public anon flow is rejected (disabled).
- [ ] Creating a user in the dashboard produces a matching `profiles` row (trigger).

---

## Rollback
1. Take a snapshot first: Dashboard > Database > Backups (or rely on PITR).
2. Full teardown of Sprint 2 objects (reverse order, transactional):
   ```bash
   supabase db execute --file supabase/rollback/rollback_all.sql
   ```
   …or paste `rollback/rollback_all.sql` into the branch SQL editor.
3. Partial rollback: run only the section for the migration you need to undo
   (sections are ordered to respect dependencies — policies/triggers before
   tables, tables before functions).
4. `pgcrypto` is intentionally left installed (shared, harmless).

**Decision gate:** roll back if any verification item fails on the branch, or if
any anon "should be denied" check returns data.
