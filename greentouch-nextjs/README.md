# GreenTouch Chemicals — Website & CMS

Production website and enterprise CMS for **Greentouch Chemical Industries Pvt. Ltd.** — a
B2B manufacturer of cleaning & hygiene products. The public site is SSR/ISR-first and the
entire content surface (products, blog, homepage, global settings, taxonomy) is editable from
a premium admin panel. No external API or page rebuild is required to change content.

---

## 1. Tech stack

| Concern | Choice |
|---|---|
| Framework | Next.js 14 (App Router, Server Components first) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS + a token-driven design system |
| Data / Auth | Supabase (Postgres + RLS + Storage + Auth via `@supabase/ssr`) |
| Mutations | Next.js **Server Actions** (no REST/GraphQL layer) |
| Caching | `unstable_cache` + `revalidateTag` / ISR (`revalidate`) |
| Editor | TipTap (blog rich text) |
| Motion | framer-motion (server-first; `MotionConfig reducedMotion="user"`) |
| Security | Cloudflare Turnstile, Upstash rate-limit, honeypot, Zod validation |
| Monitoring | Sentry, Google Analytics (`@next/third-parties`) |

There is **no Redux, no axios, and no separate backend** — the previous README describing those was stale.

---

## 2. Architecture

```
                         ┌──────────────────────────── Supabase ────────────────────────────┐
                         │  products · blogs · contact_messages · site_settings · activity_log │
                         │  product_categories · product_industries · home_sections           │
                         │  home_features · home_statistics   (RLS: public-read / admin-write) │
                         └───────────────▲───────────────────────────────────▲────────────────┘
        Server Actions (admin, RLS=admin)│                  cookieless reads  │  (public, cached)
   ┌─────────────────────────────────────┴──────┐        ┌────────────────────┴───────────────┐
   │  app/lib/admin/crud.ts  (generic factory)   │        │  app/lib/queries/*  (getSiteSettings,│
   │  save·toggle·delete·duplicate·bulk·audit·   │        │  getHomeContent, getProductBySlug…) │
   │  beforeDelete guard · revalidate(tag/path)  │        │  unstable_cache(tag) + DEFAULT fallback│
   └───────────────▲────────────────────────────┘        └────────────────────▲────────────────┘
   resource configs│ (parse/dupTransform per table)        SSR / ISR Server Components
   ┌───────────────┴───────────┐   client islands          ┌───────────────────┴───────────────┐
   │  app/lib/admin/resources.ts│   DataTable · ResourceForm │  Home · About · Products · Detail   │
   └────────────────────────────┘   AdminShell · ContactForm │  Blog · Contact (+ JSON-LD/metadata)│
                                                             └─────────────────────────────────────┘
```

**Key principles**
- **One CRUD factory.** Every resource (products, blogs, categories, industries, home features/stats)
  is `config + spec` over `crud.ts` — no per-resource CRUD/table/form code.
- **One source of truth.** Global config lives in `site_settings`; the public site reads it via
  cached queries with baked-in defaults, so it never breaks if the DB is unseeded.
- **SSR-first.** Public pages are Static/ISR; cached queries use a **cookieless** Supabase client so
  they don't opt routes out of static optimization. Only genuinely interactive pieces are client
  components (DataTable, ResourceForm, ContactForm, AdminShell, galleries, accordions).
- **Audit trail.** Every admin mutation writes to `activity_log` (best-effort, never blocks the write).

---

## 3. Folder structure

```
greentouch-nextjs/
├── app/
│   ├── (public routes)      page.tsx, about/, products/, products/[slug]/, blog/, blog/[slug]/, contact/
│   ├── admin/
│   │   ├── login/           credential login (Server Action)
│   │   └── (panel)/         authed admin: dashboard, products, categories, industries,
│   │                        blogs, messages, homepage/*, settings
│   ├── components/
│   │   ├── admin/ui/        DataTable, ResourceForm, ConfirmDialog, PageHeader, specs, types
│   │   ├── admin/           AdminShell, dashboard/*, settings/*, home/*, RichTextEditor
│   │   ├── ui/              Card primitives, IconCard, FeatureCard, PremiumHero, Reveal
│   │   ├── home/ about/ products/ contact/ layout/   public sections
│   ├── lib/
│   │   ├── admin/           crud.ts (factory), resources.ts (configs)
│   │   ├── actions/         'use server' wrappers (products, blogs, categories, …, settings)
│   │   ├── queries/         public.ts, admin.ts, site-settings.ts, home.ts, dashboard.ts
│   │   ├── supabase/        server.ts (cookie), public.ts (anon), middleware.ts, database.types.ts
│   │   ├── validations/     Zod schemas
│   │   ├── icon-map.ts, site-settings-defaults.ts, storage.ts, sanitize.ts, utils.ts, env.ts
│   ├── error.tsx · global-error.tsx · not-found.tsx · sitemap.ts · robots.ts · manifest.ts · opengraph-image.tsx
├── supabase/
│   ├── migrations/          numbered SQL (additive, idempotent)
│   ├── apply-migration.mjs  generic applier  ·  apply.mjs / admin-setup.mjs
├── docs/OPERATIONS.md
├── middleware.ts            Supabase session refresh
└── next.config.* / tailwind.config.ts
```

---

## 4. Installation (local)

```bash
git clone <repo> && cd greentouch-nextjs
npm install
cp .env.local.example .env.local   # then fill in the values (section 5)
npm run dev                        # http://localhost:3000
```

Provision the first admin user (once): `node --env-file=.env.local supabase/admin-setup.mjs`
(uses `ADMIN_EMAIL` / `ADMIN_PASSWORD`). Then log in at `/admin/login`.

---

## 5. Environment variables

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ | Public anon key (RLS-enforced) |
| `SUPABASE_SERVICE_ROLE_KEY` | admin scripts | Service role (server-only; **never** exposed) |
| `SUPABASE_DB_PASSWORD` | migrations | Direct Postgres password for `apply-migration.mjs` |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | provisioning | Seed the first admin via `admin-setup.mjs` |
| `TURNSTILE_SECRET_KEY` | recommended | Cloudflare Turnstile (contact form) — server verify |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | recommended | Turnstile site key (client widget) |
| `UPSTASH_REDIS_REST_URL` / `_TOKEN` | recommended | Contact-form rate limiting |
| `NEXT_PUBLIC_SENTRY_DSN` | optional | Error monitoring |
| `NEXT_PUBLIC_GA_ID` | optional | Google Analytics |

The app degrades gracefully: with Supabase unset, public pages render via baked-in defaults and
`/admin` redirects to login. Optional integrations simply show "Not configured" on the dashboard.

---

## 6. Build, test, deploy

```bash
npm run lint     # ESLint (next/core-web-vitals) — must be clean
npm run build    # type-checks (strict) + production build
npm run start    # serve the production build
```

**Deploy (Vercel recommended):** push to the repo, set the env vars in the Vercel project, deploy.
Security headers (HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy)
are configured in `next.config`. The www→apex redirect is handled at the edge.

**Database migrations:** add a numbered, additive SQL file under `supabase/migrations/` then
`node --env-file=.env.local supabase/apply-migration.mjs migrations/<file>.sql`. Migrations are
idempotent (`add column if not exists`, guarded policy/trigger creation) and safe to re-run.

---

## 7. Admin user guide

Log in at `/admin/login`. The sidebar is grouped (Content · Site · Engage · System); **⌘K** opens a
command palette.

- **Dashboard** — KPIs, content/website health, recent activity, company info, content progress.
- **Products** — full CRUD; set Category, Featured/Popular/New/Best-seller flags, and per-product
  **SEO** (collapsible). Search, status/featured/category filters, sort, pagination, bulk publish/
  delete, CSV export, duplicate.
- **Categories / Industries** — taxonomy CRUD. A category that products reference **cannot be deleted**
  until reassigned.
- **Blog** — rich-text articles with slug, excerpt, cover image, publish toggle.
- **Homepage** — *Section content* (hero / why-choose heading / CTA), *Why-Choose features* (cards),
  *Trust bar* (statistics). Edits publish to the live homepage immediately.
- **Settings** — company name, contact, address, service areas, business hours, social links, default
  SEO, footer copyright. Saving updates the footer, contact page, metadata and JSON-LD everywhere.
- **Messages (Leads)** — contact-form submissions with status.

Common controls: every list has search/filter/sort/bulk; every editor has unsaved-changes warning,
character counters, image upload (JPEG/PNG/WebP/AVIF ≤ 5 MB), and a floating save bar.

---

## 8. Developer guide — add a CMS resource

No new CRUD, table, or form code is needed. To add a managed resource `X`:

1. **Migration** — create the table (use `published` + `display_order` to reuse the factory).
2. **Config** (`app/lib/admin/resources.ts`) — a `ResourceConfig` with `parse()` (+ optional
   `duplicateTransform`, `beforeDelete`, `revalidateTags`).
3. **Actions** (`app/lib/actions/x.ts`) — thin `'use server'` wrappers over `saveResource` etc.
4. **Spec** (`app/components/admin/ui/specs.ts`) — `ColumnSpec[]` + `FormField[]` (data only).
5. **Pages** — list (`<DataTable/>`), `new` + `[id]/edit` (`<ResourceForm/>`).
6. **Nav** — add to `adminNav.ts`.

Field types supported by `ResourceForm`: `text · textarea · slug · richtext · image · icon · select ·
number · switch` (+ a collapsible `seo` group). Column types: `primary · text · number · status · date`.

---

## 9. Maintenance

- **Type drift:** `database.types.ts` is hand-authored. After schema changes, update it (or regenerate
  with `supabase gen types typescript`) to drop the `as unknown as` casts.
- **Health:** the dashboard surfaces missing images/SEO/category, drafts, and integration status.
- **Logs:** Sentry for runtime errors; `activity_log` for an in-app audit trail of admin changes.
- **Content:** prefer editing via `/admin` — the public site reads it live. Avoid editing the
  hardcoded section data files; they exist only as resilience defaults.

---

## 10. Backup & restore

- **Database:** use Supabase's automated daily backups (Dashboard → Database → Backups), or
  `pg_dump` via the connection string for ad-hoc snapshots. Restore via Supabase PITR or `psql`.
- **Storage:** the `products` and `blogs` buckets hold uploaded images; export via the Supabase
  Storage UI/API as needed.
- **Schema:** the `supabase/migrations/` files are the source of truth and re-apply idempotently.
- **Recovery drill:** restore DB → run any unapplied migrations → re-provision admin if needed.

---

## 11. Future roadmap

- Product **documents** (SDS/datasheets/certs) — table exists; needs a documents bucket + upload UI.
- **Multiple industries** + **related products** (join tables + a `multiselect` field).
- Standalone **Media Library** (browser, usage tracking, unused detection).
- **RBAC** (Editor/Author/Viewer roles) + sessions view.
- Content-Security-Policy header; regenerate Supabase types.

---

## License

Proprietary — © Greentouch Chemical Industries Pvt. Ltd.
