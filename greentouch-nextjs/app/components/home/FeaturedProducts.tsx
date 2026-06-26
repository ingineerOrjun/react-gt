import Link from 'next/link';
import { ArrowRight, ChevronRight, PackageSearch } from 'lucide-react';
import ProductShowcaseCard from '../products/ProductShowcaseCard';
import Reveal from '../ui/Reveal';
import type { ProductView } from '../../lib/queries/public';

// Section 4 — featured products. Cards link straight to product detail pages.
// Empty state preserved for when no products are published.
export default function FeaturedProducts({ products }: { products: ProductView[] }) {
  return (
    <section className="bg-white py-8 dark:bg-slate-950 md:py-24">
      <div className="container">
        <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end lg:mb-12">
          <div className="max-w-2xl">
            <Reveal>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 md:text-4xl">
                Featured Products
              </h2>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
                Effective, eco-conscious cleaning solutions for everyday and industrial use.
              </p>
            </Reveal>
          </div>
          {products.length > 0 && (
            <Reveal delay={0.1}>
              <Link
                href="/products"
                className="group inline-flex items-center gap-1.5 font-semibold text-green-700 transition-colors hover:text-green-800 dark:text-green-400"
              >
                View all products
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </Reveal>
          )}
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-8">
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
          <div className="mx-auto max-w-md py-8 text-center">
            <PackageSearch className="mx-auto mb-4 h-12 w-12 text-slate-300 dark:text-slate-600" />
            <p className="mb-6 text-slate-500 dark:text-slate-400">
              Our product range is coming soon. Get in touch and we&apos;ll be glad to help.
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
