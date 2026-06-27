import { Metadata } from 'next';
import { getPublishedProducts } from '../lib/queries/public';
import { jsonLdScript } from '../lib/utils';
import ProductsHero from '../components/products/ProductsHero';
import ProductsGrid from '../components/products/ProductsGrid';
import ProductCategories from '../components/products/ProductCategories';
import IndustriesServed from '../components/products/IndustriesServed';
import TechnicalDocs from '../components/products/TechnicalDocs';
import ProductsCta from '../components/products/ProductsCta';

export const metadata: Metadata = {
  title: 'Products - GreenTouch Chemicals Pvt. Ltd.',
  description:
    'Explore our range of eco-friendly and sustainable chemical products designed for various industries and applications.',
  alternates: { canonical: '/products' },
};

export const revalidate = 60;

// Server-rendered page shell. Data is fetched here (unchanged) and the sections
// are Server Components; the only client islands are ProductCard, FeatureCard,
// and the <Reveal> entrance wrappers — keeping the JS payload minimal and
// preserving SSR/SEO.
export default async function ProductsPage() {
  const products = await getPublishedProducts();

  // ItemList structured data for the published catalogue (SEO; zero runtime cost).
  const itemListJsonLd =
    products.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          itemListElement: products.map((p, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: p.name,
            ...(p.imageUrl ? { image: p.imageUrl } : {}),
          })),
        }
      : null;

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950">
      {itemListJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdScript(itemListJsonLd) }}
        />
      )}

      <ProductsHero />
      <ProductsGrid products={products} />
      <ProductCategories />
      <IndustriesServed />
      <TechnicalDocs />
      <ProductsCta />
    </main>
  );
}
