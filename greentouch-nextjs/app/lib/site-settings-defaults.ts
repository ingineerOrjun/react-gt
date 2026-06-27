// ─────────────────────────────────────────────────────────────────────────────
// Single bootstrap source for global site configuration.
//
// DEFAULT_SETTINGS mirrors the values currently rendered on the public site, so
// the website looks IDENTICAL whether the data comes from the database or this
// fallback (resilience: if Supabase is unreachable or unseeded, defaults render).
// getSiteSettings() (server) returns DB-over-defaults; the database is the
// single source of truth at runtime, these are the disaster-recovery defaults.
//
// This module is plain data (NO 'server-only') so client components and the
// back-compat constants can import it too — keeping ONE definition.
// ─────────────────────────────────────────────────────────────────────────────

export interface BusinessHour {
  label: string;
  value: string;
}

export interface SocialLinks {
  facebook?: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
  youtube?: string;
  tiktok?: string;
}

export interface SiteSettings {
  companyName: string;
  companyTagline: string;
  companyDescription: string;
  email: string;
  /** Digits only — for tel:/wa.me links. */
  phone: string;
  /** Formatted for display. */
  phoneDisplay: string;
  /** Digits only — for wa.me links. */
  whatsapp: string;
  /** Full one-line address. */
  address: string;
  addressStreet: string;
  addressMunicipality: string;
  addressDistrict: string;
  addressPostalCode: string;
  addressCountry: string;
  businessHours: BusinessHour[];
  serviceAreas: string[];
  social: SocialLinks;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  seoOgImage: string;
  footerCopyright: string;
  siteUrl: string;
}

/** Format a digits-only phone for display, e.g. 9801603296 → 980-1603296. */
export function formatPhone(digits: string): string {
  const d = (digits || '').replace(/\D/g, '');
  return d.length >= 10 ? `${d.slice(0, 3)}-${d.slice(3)}` : d;
}

export const DEFAULT_SETTINGS: SiteSettings = {
  companyName: 'GreenTouch Chemicals Pvt. Ltd.',
  companyTagline: '',
  companyDescription: '',
  email: 'greentouch.np@gmail.com',
  phone: '9801603296',
  phoneDisplay: '980-1603296',
  whatsapp: '9801603296',
  address: 'Dhalkebar, Mithila Municipality, Dhanusha, Nepal 45700',
  addressStreet: 'Dhalkebar',
  addressMunicipality: 'Mithila Municipality',
  addressDistrict: 'Dhanusha',
  addressPostalCode: '45700',
  addressCountry: 'Nepal',
  businessHours: [
    { label: 'Monday – Friday', value: '9am – 5pm' },
    { label: 'Weekends', value: 'By appointment' },
  ],
  serviceAreas: ['Lahan', 'Rajbiraj', 'Jaleshwar', 'Birgunj', 'Siraha', 'Janakpur', 'Malangwa', 'Kalaiya'],
  social: {
    facebook: 'https://facebook.com/greentouchchemicalsindustries',
    twitter: 'https://twitter.com/greentouchchem',
    instagram: 'https://instagram.com/greentouchchemicalsindustries',
    linkedin: 'https://linkedin.com/company/greentouch-chemical-industries',
  },
  seoTitle: 'GreenTouch Chemicals Pvt. Ltd. | Sustainable Chemical Solutions',
  seoDescription:
    'GreenTouch Chemicals Pvt. Ltd. is a leading provider of eco-friendly chemical products and sustainable solutions for industrial and consumer applications.',
  seoKeywords: 'sustainable chemicals, eco-friendly products, green chemical solutions, biodegradable, GreenTouch Chemicals',
  seoOgImage: '',
  footerCopyright: 'GreenTouch Chemicals Pvt. Ltd. All rights reserved.',
  siteUrl: 'https://greentouchchemicals.com',
};
