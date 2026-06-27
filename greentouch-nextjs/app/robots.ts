import type { MetadataRoute } from 'next';
import { getSiteSettings } from './lib/queries/site-settings';

export default async function robots(): Promise<MetadataRoute.Robots> {
  const base = (await getSiteSettings()).siteUrl;
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api'],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
