import type { MetadataRoute } from 'next';
import { getPublishedBlogSlugs } from './lib/queries/public';

const base = 'https://greentouchchemicals.com';

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPaths: { path: string; priority: number; freq: 'daily' | 'weekly' | 'monthly' }[] = [
    { path: '', priority: 1, freq: 'weekly' },
    { path: '/about', priority: 0.8, freq: 'monthly' },
    { path: '/products', priority: 0.9, freq: 'weekly' },
    { path: '/blog', priority: 0.8, freq: 'weekly' },
    { path: '/contact', priority: 0.7, freq: 'monthly' },
    { path: '/privacy', priority: 0.3, freq: 'monthly' },
    { path: '/terms', priority: 0.3, freq: 'monthly' },
    { path: '/cookies', priority: 0.3, freq: 'monthly' },
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map(({ path, priority, freq }) => ({
    url: `${base}${path}`,
    changeFrequency: freq,
    priority,
  }));

  // Published blog detail pages (resilient: empty if Supabase isn't configured).
  const slugs = await getPublishedBlogSlugs();
  const blogEntries: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${base}/blog/${slug}`,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticEntries, ...blogEntries];
}
