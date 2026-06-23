# GreenTouch Chemicals — Operations & Monitoring Runbook

Last updated: 2026-06-23. Scope: production launch hardening (contact-form abuse
protection, error monitoring, OG/SEO). All features below follow the codebase's
**graceful-degradation** convention — each is inert until its environment
variables are set, so dev and un-provisioned environments never crash.

---

## 1. Environment variables

| Variable | Scope | Required for | Notes |
|---|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | public | core | RLS-bound anon access |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | public | core | publishable key |
| `SUPABASE_SERVICE_ROLE_KEY` | **server** | admin scripts | bypasses RLS — never `NEXT_PUBLIC_` |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | public | bot protection | Cloudflare Turnstile widget |
| `TURNSTILE_SECRET_KEY` | **server** | bot protection | Turnstile server verification |
| `UPSTASH_REDIS_REST_URL` | **server** | rate limiting | Upstash REST endpoint |
| `UPSTASH_REDIS_REST_TOKEN` | **server** | rate limiting | Upstash REST token |
| `NEXT_PUBLIC_SENTRY_DSN` | public | error monitoring | enables client+server capture |
| `SENTRY_ORG` / `SENTRY_PROJECT` | build | source maps | Sentry project coordinates |
| `SENTRY_AUTH_TOKEN` | **build/CI** | source maps | gates source-map upload |
| `NEXT_PUBLIC_GA_ID` | public | analytics | GA4 measurement id |

Set these in **Vercel → Project → Settings → Environment Variables** (Production
+ Preview). `SENTRY_AUTH_TOKEN` only needs to exist in the build environment.

---

## 2. Contact-form abuse protection (defense in depth)

Order of checks in `app/lib/actions/contact.ts` → `submitContact()`:

1. **Schema validation** (Zod) — `app/lib/validations/schemas.ts`.
2. **Honeypot** (layer 1) — hidden `website` field. Filled ⇒ fake-success, store
   nothing, skip paid checks. Zero-cost first filter.
3. **Rate limit** (layer 2) — Upstash sliding window, **5 requests / 10 min / IP**
   (`app/lib/rate-limit.ts`). IP from `x-forwarded-for`. Over-limit ⇒ friendly
   throttle message. Inert if Upstash env missing.
4. **Turnstile** (layer 3) — server-side token verification against
   `siteverify` (`app/lib/turnstile.ts`). Fails **closed** on invalid token or
   network error. Inert if `TURNSTILE_SECRET_KEY` missing.
5. **Insert** — anon Supabase client; RLS policy `contact_public_insert` allows
   anon INSERT only with `status = 'new'`; public can never read messages back.

Client widget: `app/components/ContactForm.tsx` loads the Turnstile script,
renders the widget, gates submit on a token, and resets after each attempt
(tokens are single-use).

**Tuning the rate limit:** edit `Ratelimit.slidingWindow(5, '10 m')` in
`app/lib/rate-limit.ts`. **Disable temporarily:** unset the `UPSTASH_*` vars and
redeploy — the limiter becomes `null` and submissions flow without throttling.

---

## 3. Error monitoring (Sentry)

- Init: `sentry.{client,server,edge}.config.ts`, wired via `instrumentation.ts`
  (`register()` + `onRequestError`).
- Build wrapper: `next.config.mjs` → `withSentryConfig`. Source maps upload only
  when `SENTRY_AUTH_TOKEN` is present, and are **deleted from the output after
  upload** (`deleteSourcemapsAfterUpload: true`) so they aren't served publicly.
- Error boundaries: `app/error.tsx` (route) + `app/global-error.tsx` (root
  layout) both `Sentry.captureException`.
- Sample rate: `tracesSampleRate: 0.1`. Replays off.

### Coverage matrix

| Surface | Captured by |
|---|---|
| Client render errors | `app/error.tsx`, `app/global-error.tsx` |
| Server Component / route errors | `instrumentation.ts` `onRequestError` |
| Server Actions (contact/admin) | `onRequestError` + try/catch return paths |
| Edge/middleware | `sentry.edge.config.ts` |
| Unhandled client exceptions | `sentry.client.config.ts` global handlers |

### Validate the pipeline

```bash
curl https://<host>/api/sentry-test
# 200 {"ok":true,"eventId":"..."}  -> event should appear in Sentry within ~30s
# 503 {"ok":false,...}             -> DSN not set (Sentry inert)
```
Route: `app/api/sentry-test/route.ts` (disallowed in `robots.ts`, not indexed).

### Alerts (configure in Sentry UI — one-time)

1. **Issues → Alerts → Create Alert → Issues**: notify on *a new issue is
   created* → email/Slack to the ops channel.
2. **Metric alert**: error rate > N events / 1 min sustained 5 min.
3. Set the alert environment filter to `production`.

---

## 4. SEO / social

- `app/opengraph-image.tsx` — generated 1200×630 PNG (App Router convention →
  auto-emits `og:image`). `app/twitter-image.tsx` re-exports it → `twitter:image`.
- `app/robots.ts`, `app/sitemap.ts`, `app/layout.tsx` metadata + Organization
  JSON-LD. Verify tags with: `curl -s https://<host>/ | grep -i 'og:image\|twitter:image'`.

---

## 5. Rollout plan

1. Provision Upstash (Redis DB) and Cloudflare Turnstile (site + secret keys).
2. Add all env vars to Vercel (Production **and** Preview).
3. Deploy to a **Preview** URL first. Run the verification checklist (§7).
4. Confirm `og:image`/`twitter:image` via the post-deploy `curl` checks.
5. Promote to Production. Watch Sentry for the first 30 min.

## 6. Rollback plan

- **Turnstile misfiring / blocking real users:** unset `TURNSTILE_SECRET_KEY`
  (and optionally `NEXT_PUBLIC_TURNSTILE_SITE_KEY`) → redeploy. Form reverts to
  honeypot-only. No code change.
- **Rate limit too aggressive / Upstash outage:** unset `UPSTASH_*` → redeploy.
  Throttling disabled; form still works (fails open by design — limiter `null`).
- **Sentry noise / quota:** lower `tracesSampleRate` or unset
  `NEXT_PUBLIC_SENTRY_DSN`.
- **Full feature revert:** `git revert` the launch-hardening commit. The new
  modules are additive; the contact insert path is unchanged underneath.

## 7. Post-deploy verification checklist

- [ ] `/contact` returns server-rendered HTML (View Source shows the form).
- [ ] Turnstile widget renders; submitting without solving is blocked.
- [ ] 6th submission within 10 min from one IP returns the throttle message.
- [ ] Honeypot still silently rejects (filled `website` ⇒ fake success).
- [ ] `curl /api/sentry-test` → 200 and event visible in Sentry.
- [ ] Sentry shows readable (source-mapped) stack frames.
- [ ] `og:image` + `twitter:image` present in `/` head and render 1200×630.
- [ ] Lighthouse: Performance/SEO/Best-Practices/A11y unchanged or improved.
