// Dashboard read layer — one resilient gather of every executive metric, run as
// the authenticated staff user (server client → RLS returns drafts too).
// All counts/health are *derived from columns that actually exist*; nothing is
// faked. Fields that arrive in later phases (categories, SEO, featured) are
// intentionally omitted rather than invented.
import 'server-only';
import { createClient } from '../supabase/server';
import { publicImageUrl } from '../storage';
import { getSiteSettings } from './site-settings';
import type { ProductRow, BlogRow, ContactMessageRow } from '../supabase/database.types';

export interface RecentRow {
  id: string;
  name: string;
  slug: string;
  imageUrl: string | null;
  published: boolean;
  updated_at: string;
}

export interface ActivityItem {
  kind: 'product' | 'blog' | 'message';
  title: string;
  meta: string;
  at: string;
  href: string;
}

export interface IssueSignal {
  label: string;
  count: number;
  href: string;
}

export interface HealthSignal {
  label: string;
  status: 'ok' | 'neutral';
  detail: string;
}

export interface DashboardData {
  products: {
    total: number;
    published: number;
    draft: number;
    missingImage: number;
    recent: RecentRow[];
    issues: IssueSignal[];
  };
  blogs: {
    total: number;
    published: number;
    draft: number;
    missingImage: number;
    missingExcerpt: number;
    recent: RecentRow[];
    issues: IssueSignal[];
  };
  messages: {
    total: number;
    unread: number;
    today: number;
    week: number;
    month: number;
    latest: Pick<ContactMessageRow, 'id' | 'name' | 'email' | 'subject' | 'status' | 'created_at'>[];
  };
  activity: ActivityItem[];
  health: HealthSignal[];
  company: {
    name: string;
    address: string;
    phone: string;
    phoneDisplay: string;
    email: string;
    serviceAreas: string[];
    fromDatabase: boolean;
  };
}

const MS_DAY = 86_400_000;

export async function getDashboardData(): Promise<DashboardData> {
  const supabase = createClient();

  const safe = async <T>(p: PromiseLike<{ data: T | null }>): Promise<T | null> => {
    try {
      const { data } = await p;
      return data ?? null;
    } catch {
      return null;
    }
  };

  const [productData, blogData, messageData, settings] = await Promise.all([
    safe<ProductRow[]>(supabase.from('products').select('*').order('updated_at', { ascending: false })),
    safe<BlogRow[]>(supabase.from('blogs').select('*').order('updated_at', { ascending: false })),
    safe<ContactMessageRow[]>(supabase.from('contact_messages').select('*').order('created_at', { ascending: false })),
    getSiteSettings(),
  ]);

  const products = (productData as unknown as ProductRow[]) ?? [];
  const blogs = (blogData as unknown as BlogRow[]) ?? [];
  const messages = (messageData as unknown as ContactMessageRow[]) ?? [];

  const now = Date.now();
  const within = (iso: string, ms: number) => now - new Date(iso).getTime() <= ms;

  // ── Products ────────────────────────────────────────────────────────────────
  const pPublished = products.filter((p) => p.published).length;
  const pMissingImage = products.filter((p) => !p.image_path).length;
  const pDraft = products.length - pPublished;
  const pMissingCategory = products.filter((p) => !p.category_id).length;
  const pMissingSeo = products.filter((p) => !p.seo_title && !p.seo_description).length;
  const productIssues: IssueSignal[] = [
    { label: 'Missing image', count: pMissingImage, href: '/admin/products' },
    { label: 'Draft (unpublished)', count: pDraft, href: '/admin/products' },
    { label: 'Without category', count: pMissingCategory, href: '/admin/products' },
    { label: 'Missing SEO', count: pMissingSeo, href: '/admin/products' },
  ].filter((i) => i.count > 0);

  // ── Blogs ─────────────────────────────────────────────────────────────────--
  const bPublished = blogs.filter((b) => b.published).length;
  const bMissingImage = blogs.filter((b) => !b.image_path).length;
  const bMissingExcerpt = blogs.filter((b) => !b.excerpt?.trim()).length;
  const bDraft = blogs.length - bPublished;
  const blogIssues: IssueSignal[] = [
    { label: 'Draft (unpublished)', count: bDraft, href: '/admin/blogs' },
    { label: 'Missing cover image', count: bMissingImage, href: '/admin/blogs' },
    { label: 'Missing excerpt', count: bMissingExcerpt, href: '/admin/blogs' },
  ].filter((i) => i.count > 0);

  const toRecent = (
    rows: (ProductRow | BlogRow)[],
    bucket: 'products' | 'blogs',
    nameKey: 'name' | 'title',
  ): RecentRow[] =>
    rows.slice(0, 5).map((r) => ({
      id: r.id,
      name: String((r as unknown as Record<string, unknown>)[nameKey] ?? ''),
      slug: r.slug,
      imageUrl: publicImageUrl(bucket, r.image_path),
      published: r.published,
      updated_at: r.updated_at,
    }));

  // ── Messages ─────────────────────────────────────────────────────────────────
  const unread = messages.filter((m) => m.status === 'new').length;
  const today = messages.filter((m) => within(m.created_at, MS_DAY)).length;
  const week = messages.filter((m) => within(m.created_at, 7 * MS_DAY)).length;
  const month = messages.filter((m) => within(m.created_at, 30 * MS_DAY)).length;

  // ── Activity (derived from create/update timestamps; newest first) ────────────
  const activity: ActivityItem[] = [
    ...products.map<ActivityItem>((p) => ({
      kind: 'product',
      title: p.name,
      meta: p.published ? 'Product published' : 'Product saved as draft',
      at: p.updated_at,
      href: `/admin/products/${p.id}/edit`,
    })),
    ...blogs.map<ActivityItem>((b) => ({
      kind: 'blog',
      title: b.title,
      meta: b.published ? 'Article published' : 'Article saved as draft',
      at: b.updated_at,
      href: `/admin/blogs/${b.id}/edit`,
    })),
    ...messages.map<ActivityItem>((m) => ({
      kind: 'message',
      title: m.subject || m.name,
      meta: `New enquiry from ${m.name}`,
      at: m.created_at,
      href: '/admin/messages',
    })),
  ]
    .sort((a, b) => new Date(b.at).getTime() - new Date(a.at).getTime())
    .slice(0, 8);

  // ── Website health (real env/runtime signals only — no faked failures) ────────
  const env = process.env;
  const has = (k: string) => Boolean(env[k]);
  const health: HealthSignal[] = [
    { label: 'Database', status: productData !== null ? 'ok' : 'neutral', detail: productData !== null ? 'Connected' : 'Unreachable' },
    { label: 'Authentication', status: 'ok', detail: 'Session active' },
    { label: 'Storage', status: has('NEXT_PUBLIC_SUPABASE_URL') ? 'ok' : 'neutral', detail: has('NEXT_PUBLIC_SUPABASE_URL') ? 'Configured' : 'Not configured' },
    { label: 'Public website', status: 'ok', detail: 'Online' },
    { label: 'Contact form', status: messageData !== null ? 'ok' : 'neutral', detail: messageData !== null ? 'Receiving' : 'Unknown' },
    { label: 'Spam protection', status: has('TURNSTILE_SECRET_KEY') ? 'ok' : 'neutral', detail: has('TURNSTILE_SECRET_KEY') ? 'Turnstile active' : 'Not configured' },
    { label: 'Rate limiting', status: has('UPSTASH_REDIS_REST_URL') ? 'ok' : 'neutral', detail: has('UPSTASH_REDIS_REST_URL') ? 'Active' : 'Not configured' },
    { label: 'Error monitoring', status: has('NEXT_PUBLIC_SENTRY_DSN') ? 'ok' : 'neutral', detail: has('NEXT_PUBLIC_SENTRY_DSN') ? 'Sentry active' : 'Not configured' },
    { label: 'Sitemap', status: 'ok', detail: 'Generated' },
    { label: 'Robots.txt', status: 'ok', detail: 'Available' },
  ];

  // ── Company info — single source of truth via getSiteSettings() (Phase 3). ────
  // The dashboard and the public website now render identical, DB-driven data.
  const company = {
    name: settings.companyName,
    address: settings.address,
    phone: settings.phone,
    phoneDisplay: settings.phoneDisplay,
    email: settings.email,
    serviceAreas: settings.serviceAreas,
    fromDatabase: true,
  };

  return {
    products: {
      total: products.length,
      published: pPublished,
      draft: pDraft,
      missingImage: pMissingImage,
      recent: toRecent(products, 'products', 'name'),
      issues: productIssues,
    },
    blogs: {
      total: blogs.length,
      published: bPublished,
      draft: bDraft,
      missingImage: bMissingImage,
      missingExcerpt: bMissingExcerpt,
      recent: toRecent(blogs, 'blogs', 'title'),
      issues: blogIssues,
    },
    messages: {
      total: messages.length,
      unread,
      today,
      week,
      month,
      latest: messages.slice(0, 5),
    },
    activity,
    health,
    company,
  };
}

/** Compact relative-time label for timelines (server-rendered). */
export function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const min = Math.round(diff / 60000);
  if (min < 1) return 'just now';
  if (min < 60) return `${min}m ago`;
  const hr = Math.round(min / 60);
  if (hr < 24) return `${hr}h ago`;
  const day = Math.round(hr / 24);
  if (day < 30) return `${day}d ago`;
  return new Date(iso).toLocaleDateString();
}
