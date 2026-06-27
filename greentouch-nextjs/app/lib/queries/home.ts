// Homepage content read layer — single source of truth for the public homepage.
// Cookieless anon client + unstable_cache(tag) → stays static/ISR, one fetch,
// invalidated by revalidateTag(HOME_CONTENT_TAG) on save. DB-over-defaults so the
// homepage is byte-identical whether seeded or not.
import 'server-only';
import { unstable_cache } from 'next/cache';
import { createPublicClient } from '../supabase/public';
import { hasSupabaseEnv } from '../env';
import type { HomeSectionRow, HomeFeatureRow, HomeStatRow } from '../supabase/database.types';

export const HOME_CONTENT_TAG = 'home-content';

export interface HomeSectionView {
  eyebrow: string;
  title: string;
  highlight: string;
  subtitle: string;
  content: string;
  buttonText: string;
  buttonLink: string;
  button2Text: string;
  button2Link: string;
  image: string;
  points: string[];
  cardTitle: string;
  cardSubtitle: string;
}

export interface HomeFeatureView {
  title: string;
  description: string;
  icon: string;
}

export interface HomeStatView {
  label: string;
  value: string;
  suffix: string;
  icon: string;
}

export interface HomeContent {
  hero: HomeSectionView;
  whyChoose: HomeSectionView;
  cta: HomeSectionView;
  features: HomeFeatureView[];
  statistics: HomeStatView[];
}

const emptySection: HomeSectionView = {
  eyebrow: '', title: '', highlight: '', subtitle: '', content: '',
  buttonText: '', buttonLink: '', button2Text: '', button2Link: '',
  image: '', points: [], cardTitle: '', cardSubtitle: '',
};

// Defaults mirror the seed (= the exact pre-CMS homepage content).
export const DEFAULT_HOME: HomeContent = {
  hero: {
    ...emptySection,
    eyebrow: 'Cleaning & hygiene products, supplied reliably',
    title: 'Premium Cleaning Solutions for',
    highlight: 'Homes, Businesses & Industries',
    subtitle:
      'GreenTouch Chemicals delivers high-quality, eco-conscious cleaning and hygiene products — with dependable bulk supply for schools, hospitals, hotels, and facilities.',
    buttonText: 'Explore Products',
    buttonLink: '/products',
    button2Text: 'Contact Us',
    button2Link: '/contact',
    image: '/images/banner/bann.jpeg',
    points: ['Eco-friendly formulations', 'Reliable bulk supply', 'Trusted by institutions'],
    cardTitle: 'Quality you can rely on',
    cardSubtitle: 'Consistent supply for institutions & industry',
  },
  whyChoose: {
    ...emptySection,
    title: 'Why Choose GreenTouch',
    subtitle: 'The reasons institutions and businesses rely on us for cleaning and hygiene supply.',
  },
  cta: {
    ...emptySection,
    title: 'Ready to Order Reliable Cleaning & Hygiene Supply?',
    content:
      'Request a quote or message us on WhatsApp — bulk and custom quantities welcome. We typically respond within 24 hours.',
    buttonText: 'Request a Quote',
    buttonLink: '/contact',
  },
  features: [
    { title: 'Consistent Product Quality', description: 'Formulations you can rely on to perform the same way, every order.', icon: 'BadgeCheck' },
    { title: 'Reliable Supply Chain', description: 'Dependable fulfilment for bulk and recurring requirements.', icon: 'Truck' },
    { title: 'Practical Product Solutions', description: 'Effective products designed for real-world cleaning and hygiene needs.', icon: 'Sparkles' },
    { title: 'Responsive Support', description: 'A team that responds quickly and understands your account.', icon: 'Headphones' },
    { title: 'Industry-Focused Products', description: 'Solutions suited to institutional, commercial, and industrial settings.', icon: 'Factory' },
    { title: 'Long-Term Relationships', description: 'We focus on dependable partnerships, not one-off transactions.', icon: 'HeartHandshake' },
  ],
  statistics: [
    { label: 'Quality Focused', value: '', suffix: '', icon: 'BadgeCheck' },
    { label: 'Industry Trusted', value: '', suffix: '', icon: 'Building2' },
    { label: 'Reliable Supply', value: '', suffix: '', icon: 'PackageCheck' },
    { label: 'Customer Support', value: '', suffix: '', icon: 'Headphones' },
  ],
};

function mapSection(row: HomeSectionRow | undefined, fallback: HomeSectionView): HomeSectionView {
  if (!row) return fallback;
  const meta = (row.meta && typeof row.meta === 'object' && !Array.isArray(row.meta) ? row.meta : {}) as Record<string, unknown>;
  return {
    eyebrow: row.eyebrow ?? fallback.eyebrow,
    title: row.title ?? fallback.title,
    highlight: row.highlight ?? fallback.highlight,
    subtitle: row.subtitle ?? fallback.subtitle,
    content: row.content ?? fallback.content,
    buttonText: row.button_text ?? fallback.buttonText,
    buttonLink: row.button_link ?? fallback.buttonLink,
    button2Text: row.button2_text ?? fallback.button2Text,
    button2Link: row.button2_link ?? fallback.button2Link,
    image: row.image ?? fallback.image,
    points: Array.isArray(meta.points) ? (meta.points as string[]) : fallback.points,
    cardTitle: typeof meta.card_title === 'string' ? meta.card_title : fallback.cardTitle,
    cardSubtitle: typeof meta.card_subtitle === 'string' ? meta.card_subtitle : fallback.cardSubtitle,
  };
}

async function read(): Promise<HomeContent> {
  if (!hasSupabaseEnv) return DEFAULT_HOME;
  try {
    const supabase = createPublicClient();
    const [sectionsRes, featuresRes, statsRes] = await Promise.all([
      supabase.from('home_sections').select('*'),
      supabase.from('home_features').select('*').eq('published', true).order('display_order', { ascending: true }),
      supabase.from('home_statistics').select('*').eq('published', true).order('display_order', { ascending: true }),
    ]);
    const sections = (sectionsRes.data as unknown as HomeSectionRow[] | null) ?? [];
    const byKey = (k: string) => sections.find((s) => s.section_key === k);
    const features = (featuresRes.data as unknown as HomeFeatureRow[] | null) ?? [];
    const stats = (statsRes.data as unknown as HomeStatRow[] | null) ?? [];

    return {
      hero: mapSection(byKey('hero'), DEFAULT_HOME.hero),
      whyChoose: mapSection(byKey('why_choose'), DEFAULT_HOME.whyChoose),
      cta: mapSection(byKey('cta'), DEFAULT_HOME.cta),
      features: features.length
        ? features.map((f) => ({ title: f.title, description: f.description, icon: f.icon ?? 'ShieldCheck' }))
        : DEFAULT_HOME.features,
      statistics: stats.length
        ? stats.map((s) => ({ label: s.label, value: s.value ?? '', suffix: s.suffix ?? '', icon: s.icon ?? 'ShieldCheck' }))
        : DEFAULT_HOME.statistics,
    };
  } catch {
    return DEFAULT_HOME;
  }
}

const cachedRead = unstable_cache(read, ['home-content'], { tags: [HOME_CONTENT_TAG], revalidate: 3600 });

export async function getHomeContent(): Promise<HomeContent> {
  return cachedRead();
}

/** Uncached read for the admin editor (always reflects the latest saved rows). */
export async function getHomeContentFresh(): Promise<HomeContent> {
  return read();
}
