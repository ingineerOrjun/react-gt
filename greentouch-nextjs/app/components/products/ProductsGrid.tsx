import Link from 'next/link';
import { ChevronRight, PackageSearch } from 'lucide-react';
import ProductShowcaseCard from './ProductShowcaseCard';
import Reveal from '../ui/Reveal';
import type { ProductView } from '../../lib/queries/public';

// The data-driven catalog. Server component; ProductCard remains the client
// island for entrance/hover motion. Mapping + empty state preserved from the
// original page.
export default function ProductsGrid({ products }: { products: ProductView[] }) {
  return (
    <section
      id="products"
      className="scroll-mt-24 bg-slate-50 py-16 dark:bg-slate-900/40 md:py-20"
    >
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <Reveal>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 md:text-3xl">
              Our Products &amp; Solutions
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
              From everyday cleaners to industrial solutions, our products combine efficiency with
              environmental responsibility.
            </p>
          </Reveal>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {products.map((product, index) => (
              <ProductShowcaseCard
                key={product.id}
                title={product.name}
                description={product.description}
                image={product.imageUrl}
                slug={product.slug}
                index={index}
              />
            ))}
          </div>
        ) : (
          <div className="mx-auto max-w-md py-12 text-center">
            <PackageSearch className="mx-auto mb-4 h-12 w-12 text-slate-300 dark:text-slate-600" />
            <h3 className="mb-2 text-lg font-semibold text-slate-800 dark:text-slate-200">
              No products yet
            </h3>
            <p className="mb-6 text-slate-500 dark:text-slate-400">
              Our catalogue is being updated. Reach out and we&apos;ll be glad to help.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center rounded-lg bg-green-600 px-5 py-2.5 font-medium text-white transition-colors hover:bg-green-700"
            >
              Contact us <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
