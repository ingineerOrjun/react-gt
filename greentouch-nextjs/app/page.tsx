import { Metadata } from 'next';
import { getPublishedProducts } from './lib/queries/public';
import HomeHero from './components/home/HomeHero';
import HomeTrustBar from './components/home/HomeTrustBar';
import FeaturedProducts from './components/home/FeaturedProducts';
import WhyChooseHome from './components/home/WhyChooseHome';
import AboutPreview from './components/home/AboutPreview';
import HowItWorks from './components/home/HowItWorks';
import HomeFaqCondensed from './components/home/HomeFaqCondensed';
import HomeFinalCta from './components/home/HomeFinalCta';
import { CONTACT_FAQS } from './components/contact/contactData';
import { jsonLdScript } from './lib/utils';

const BASE = 'https://greentouchchemicals.com';
const description =
  'GreenTouch Chemicals supplies premium, eco-conscious cleaning and hygiene products for homes, businesses, and industries — with reliable bulk supply for schools, hospitals, hotels, and facilities.';

export const metadata: Metadata = {
  title: 'GreenTouch Chemicals | Premium Cleaning & Hygiene Products',
  description,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    title: 'GreenTouch Chemicals | Premium Cleaning & Hygiene Products',
    description,
    url: BASE,
  },
};

export const revalidate = 60;

export default async function HomePage() {
  const products = await getPublishedProducts(4);

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'GreenTouch Chemicals Pvt. Ltd.',
    url: BASE,
    publisher: { '@type': 'Organization', name: 'GreenTouch Chemicals Pvt. Ltd.' },
  };

  // Condensed FAQ structured data (the 3 questions shown on the homepage).
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: CONTACT_FAQS.slice(0, 3).map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  };

  const itemListJsonLd =
    products.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: 'Featured Products',
          itemListElement: products.map((p, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: p.name,
            url: `${BASE}/products/${p.slug}`,
            ...(p.imageUrl ? { image: p.imageUrl } : {}),
          })),
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(faqJsonLd) }}
      />
      {itemListJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdScript(itemListJsonLd) }}
        />
      )}

      {/* Deduplicated mobile-first flow (Industries → Products, Categories →
          Products, FAQ → Contact live canonically on those pages). */}
      {/* 1 */} <HomeHero />
      {/* 2 */} <HomeTrustBar />
      {/* 3 */} <FeaturedProducts products={products} />
      {/* 4 */} <WhyChooseHome />
      {/* 5 */} <AboutPreview />
      {/* 6 */} <HowItWorks />
      {/* 7 */} <HomeFaqCondensed />
      {/* 8 */} <HomeFinalCta />
    </>
  );
}
