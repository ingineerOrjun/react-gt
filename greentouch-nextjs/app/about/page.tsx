import { Metadata } from 'next';
import { jsonLdScript } from '../lib/utils';
import AboutHero from '../components/about/AboutHero';
import CompanyStory from '../components/about/CompanyStory';
import MissionVision from '../components/about/MissionVision';
import CoreValues from '../components/about/CoreValues';
import CommitmentToQuality from '../components/about/CommitmentToQuality';
import AboutCta from '../components/about/AboutCta';

const description =
  'GreenTouch Chemicals delivers reliable, high-quality cleaning and hygiene products for homes, businesses, and industries — with consistent quality, dependable bulk supply, and responsive customer support.';

export const metadata: Metadata = {
  title: 'About Us',
  description,
  alternates: { canonical: '/about' },
  openGraph: {
    type: 'website',
    title: 'About GreenTouch Chemicals | Reliable Cleaning & Hygiene Solutions',
    description,
    url: 'https://greentouchchemicals.com/about',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About GreenTouch Chemicals',
    description,
  },
};

// AboutPage + Organization structured data for trust-focused search results.
const aboutJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'About GreenTouch Chemicals',
  url: 'https://greentouchchemicals.com/about',
  description,
  mainEntity: {
    '@type': 'Organization',
    name: 'GreenTouch Chemicals Pvt. Ltd.',
    url: 'https://greentouchchemicals.com',
    description:
      'Manufacturer of cleaning and hygiene products for residential, commercial, institutional, and industrial customers.',
  },
};

// Server-rendered page shell. Every section is a Server Component; the only
// client island is the shared <Reveal> entrance wrapper — preserving SSR/SEO and
// keeping the JS payload minimal.
export default function AboutPage() {
  return (
    <main className="bg-white dark:bg-slate-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(aboutJsonLd) }}
      />

      {/* Deduplicated: Why-Choose lives on Home; Industries & Categories on
          Products. About keeps its unique story / mission / values / commitment. */}
      <AboutHero />
      <CompanyStory />
      <MissionVision />
      <CoreValues />
      <CommitmentToQuality />
      <AboutCta />
    </main>
  );
}
