import ProductShowcaseCard from '../ProductShowcaseCard';
import Reveal from '../../ui/Reveal';
import type { ProductView } from '../../../lib/queries/public';

// Related products grid. Reuses the catalogue card; each links to its own detail
// page. Renders nothing when there are no other published products.
export default function RelatedProducts({ products }: { products: ProductView[] }) {
  if (products.length === 0) return null;

  return (
    <section className="bg-slate-50 py-16 dark:bg-slate-900/40 md:py-20">
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <Reveal>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 md:text-3xl">
              You May Also Need
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
              Other products from our cleaning and hygiene range.
            </p>
          </Reveal>
        </div>

        {/* Mobile: CSS scroll-snap swipe rail. Desktop: standard grid. No JS. */}
        <ul className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-8 lg:overflow-visible lg:px-0 lg:pb-0">
          {products.map((product, index) => (
            <li key={product.id} className="w-[78%] shrink-0 snap-start sm:w-[48%] lg:w-auto">
              <ProductShowcaseCard
                title={product.name}
                description={product.description}
                image={product.imageUrl}
                slug={product.slug}
                index={index}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
