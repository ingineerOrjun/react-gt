'use server';

// Settings update action — the only write path for global site configuration.
// Validates (Zod), updates the singleton, writes an audit trail for every
// changed field, and revalidates the cache tag so every public page updates.
import { revalidatePath, revalidateTag } from 'next/cache';
import { createClient } from '../supabase/server';
import { requireUser } from '../admin/crud';
import { settingsSchema } from '../validations/schemas';
import { SITE_SETTINGS_TAG } from '../queries/site-settings';
import type { ActionState } from '../../components/admin/ui/types';
import type { SiteSettingsRow } from '../supabase/database.types';

const str = (fd: FormData, k: string) => String(fd.get(k) ?? '').trim();

/** Parse a "Label | Value" newline list into business-hours objects. */
function parseHours(raw: string): { label: string; value: string }[] {
  return raw
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => {
      const [label, ...rest] = l.split('|');
      return { label: label.trim(), value: rest.join('|').trim() };
    })
    .filter((h) => h.label && h.value);
}

const parseLines = (raw: string): string[] =>
  raw
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);

export async function updateSiteSettings(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const { supabase, user } = await requireUser();

  const parsed = settingsSchema.safeParse({
    company_name: str(formData, 'company_name'),
    company_tagline: str(formData, 'company_tagline'),
    company_description: str(formData, 'company_description'),
    contact_email: str(formData, 'contact_email'),
    contact_phone: str(formData, 'contact_phone'),
    whatsapp: str(formData, 'whatsapp'),
    address: str(formData, 'address'),
    address_street: str(formData, 'address_street'),
    address_municipality: str(formData, 'address_municipality'),
    address_district: str(formData, 'address_district'),
    address_postal_code: str(formData, 'address_postal_code'),
    address_country: str(formData, 'address_country'),
    seo_title: str(formData, 'seo_title'),
    seo_description: str(formData, 'seo_description'),
    seo_keywords: str(formData, 'seo_keywords'),
    seo_og_image: str(formData, 'seo_og_image'),
    footer_copyright: str(formData, 'footer_copyright'),
    social_facebook: str(formData, 'social_facebook'),
    social_twitter: str(formData, 'social_twitter'),
    social_instagram: str(formData, 'social_instagram'),
    social_linkedin: str(formData, 'social_linkedin'),
    social_youtube: str(formData, 'social_youtube'),
    social_tiktok: str(formData, 'social_tiktok'),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? 'Please check the form and try again.' };
  }
  const v = parsed.data;

  const serviceAreas = parseLines(str(formData, 'service_areas'));
  const businessHours = parseHours(str(formData, 'business_hours'));
  const social = {
    facebook: v.social_facebook || '',
    twitter: v.social_twitter || '',
    instagram: v.social_instagram || '',
    linkedin: v.social_linkedin || '',
    youtube: v.social_youtube || '',
    tiktok: v.social_tiktok || '',
  };

  const payload = {
    company_name: v.company_name,
    company_tagline: v.company_tagline || null,
    company_description: v.company_description || null,
    site_title: v.seo_title || v.company_name,
    contact_email: v.contact_email,
    contact_phone: v.contact_phone.replace(/\s/g, ''),
    whatsapp: (v.whatsapp || v.contact_phone).replace(/\s/g, ''),
    address: v.address,
    address_street: v.address_street || null,
    address_municipality: v.address_municipality || null,
    address_district: v.address_district || null,
    address_postal_code: v.address_postal_code || null,
    address_country: v.address_country || null,
    service_areas: serviceAreas,
    business_hours: businessHours,
    social_links: social,
    seo_title: v.seo_title || null,
    seo_description: v.seo_description || null,
    seo_keywords: v.seo_keywords || null,
    seo_og_image: v.seo_og_image || null,
    footer_copyright: v.footer_copyright || null,
  };

  // Snapshot the current row for the audit diff.
  const { data: before } = await supabase
    .from('site_settings')
    .select('*')
    .eq('singleton', true)
    .maybeSingle();
  const prevRow = (before as unknown as SiteSettingsRow | null) ?? null;

  const { error } = await supabase.from('site_settings').update(payload as never).eq('singleton', true);
  if (error) return { error: 'Could not save settings. Please try again.' };

  // ── Audit trail — one row per changed field (Step 14) ──────────────────────
  if (prevRow) {
    const norm = (x: unknown) => (typeof x === 'object' && x !== null ? JSON.stringify(x) : String(x ?? ''));
    const logs = Object.entries(payload)
      .filter(([k, next]) => norm((prevRow as unknown as Record<string, unknown>)[k]) !== norm(next))
      .map(([field, next]) => ({
        actor_id: user.id,
        actor_email: user.email ?? null,
        entity: 'site_settings',
        action: 'update',
        field,
        old_value: norm((prevRow as unknown as Record<string, unknown>)[field]).slice(0, 500),
        new_value: norm(next).slice(0, 500),
      }));
    if (logs.length) {
      await supabase.from('activity_log').insert(logs as never);
    }
  }

  // Cache invalidation — every public surface re-reads on next request.
  revalidateTag(SITE_SETTINGS_TAG);
  ['/', '/about', '/products', '/contact', '/blog', '/admin', '/admin/settings'].forEach((p) =>
    revalidatePath(p),
  );

  return { error: null, ok: true };
}
