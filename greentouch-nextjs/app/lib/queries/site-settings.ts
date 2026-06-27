// ─────────────────────────────────────────────────────────────────────────────
// THE single source of truth for global site configuration at runtime.
//
// • Cookieless anon client → does NOT opt routes out of static/ISR.
// • unstable_cache(tag) → one fetch shared across the request tree & cached
//   across requests; invalidated by revalidateTag(SITE_SETTINGS_TAG) on save.
// • DB-over-defaults mapping → always returns a complete, typed SiteSettings;
//   degrades to DEFAULT_SETTINGS if Supabase is unreachable/unseeded.
// ─────────────────────────────────────────────────────────────────────────────
import 'server-only';
import { unstable_cache } from 'next/cache';
import { createPublicClient } from '../supabase/public';
import { hasSupabaseEnv } from '../env';
import {
  DEFAULT_SETTINGS,
  formatPhone,
  type SiteSettings,
  type BusinessHour,
  type SocialLinks,
} from '../site-settings-defaults';
import type { SiteSettingsRow } from '../supabase/database.types';

export const SITE_SETTINGS_TAG = 'site-settings';

/** Map a raw DB row onto the typed app shape, falling back per-field to defaults. */
export function mapRowToSettings(row: SiteSettingsRow): SiteSettings {
  const d = DEFAULT_SETTINGS;
  const phone = (row.contact_phone || d.phone).replace(/\D/g, '') || d.phone;
  const hours = Array.isArray(row.business_hours) ? (row.business_hours as unknown as BusinessHour[]) : [];
  const areas = Array.isArray(row.service_areas) ? (row.service_areas as unknown as string[]) : [];
  const social =
    row.social_links && typeof row.social_links === 'object' && !Array.isArray(row.social_links)
      ? (row.social_links as unknown as SocialLinks)
      : {};
  return {
    companyName: row.company_name || d.companyName,
    companyTagline: row.company_tagline || d.companyTagline,
    companyDescription: row.company_description || d.companyDescription,
    email: row.contact_email || d.email,
    phone,
    phoneDisplay: formatPhone(phone),
    whatsapp: (row.whatsapp || phone).replace(/\D/g, '') || phone,
    address: row.address || d.address,
    addressStreet: row.address_street || d.addressStreet,
    addressMunicipality: row.address_municipality || d.addressMunicipality,
    addressDistrict: row.address_district || d.addressDistrict,
    addressPostalCode: row.address_postal_code || d.addressPostalCode,
    addressCountry: row.address_country || d.addressCountry,
    businessHours: hours.length ? hours : d.businessHours,
    serviceAreas: areas.length ? areas : d.serviceAreas,
    social: Object.keys(social).length ? social : d.social,
    seoTitle: row.seo_title || d.seoTitle,
    seoDescription: row.seo_description || d.seoDescription,
    seoKeywords: row.seo_keywords || d.seoKeywords,
    seoOgImage: row.seo_og_image || d.seoOgImage,
    footerCopyright: row.footer_copyright || d.footerCopyright,
    siteUrl: d.siteUrl,
  };
}

async function read(): Promise<SiteSettings> {
  if (!hasSupabaseEnv) return DEFAULT_SETTINGS;
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .eq('singleton', true)
      .maybeSingle();
    if (error || !data) return DEFAULT_SETTINGS;
    return mapRowToSettings(data as unknown as SiteSettingsRow);
  } catch {
    return DEFAULT_SETTINGS;
  }
}

const cachedRead = unstable_cache(read, ['site-settings'], {
  tags: [SITE_SETTINGS_TAG],
  revalidate: 3600,
});

/** Public/SSR read — cached, deduped, single source of truth. */
export async function getSiteSettings(): Promise<SiteSettings> {
  return cachedRead();
}

/** Uncached read for the admin editor (always reflects the latest saved row). */
export async function getSiteSettingsFresh(): Promise<SiteSettings> {
  return read();
}
