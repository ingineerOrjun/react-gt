import Link from 'next/link';
import { ChevronRight, ChevronDown, ArrowRight } from 'lucide-react';
import type { ProductView } from '../../lib/queries/public';

// Popular Products column — dynamic from Supabase. Collapsible on mobile,
// always-open on desktop (.responsive-disclosure).
export default function FooterProducts({ products }: { products: ProductView[] }) {
  return (
    <details className="responsive-disclosure group border-b border-white/10 lg:border-0" open={false}>
      <summary className="flex items-center justify-between gap-2 py-3 max-lg:min-h-[44px] lg:py-0">
        <span>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
            Popular Products
          </h3>
          <span
            aria-hidden="true"
            className="mt-2 hidden h-0.5 w-8 rounded bg-gradient-to-r from-green-400 to-emerald-500 lg:block"
          />
        </span>
        <ChevronDown className="disclosure-chevron h-4 w-4 shrink-0 text-slate-400 transition-transform duration-300 lg:hidden" />
      </summary>
      <div className="disclosure-content">
        {products.length > 0 ? (
          <ul className="space-y-1 pb-3 lg:mt-5 lg:space-y-2.5 lg:pb-0">
            {products.map((product) => (
              <li key={product.id}>
                <Link
                  href={`/products/${product.slug}`}
                  className="group/link inline-flex items-center gap-1.5 rounded text-sm text-slate-400 transition-colors hover:text-green-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 max-lg:min-h-[44px]"
                >
                  <ChevronRight className="h-3.5 w-3.5 -translate-x-1 text-green-400 opacity-0 transition-all duration-300 group-hover/link:translate-x-0 group-hover/link:opacity-100" />
                  <span className="line-clamp-1">{product.name}</span>
                </Link>
              </li>
            ))}
            <li className="pt-1">
              <Link
                href="/products"
                className="inline-flex items-center gap-1 rounded text-sm font-semibold text-green-400 transition-colors hover:text-green-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 max-lg:min-h-[44px]"
              >
                View all products
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </li>
          </ul>
        ) : (
          <p className="pb-3 text-sm text-slate-400 lg:mt-5 lg:pb-0">
            <Link href="/products" className="font-semibold text-green-400 hover:text-green-300">
              Browse our products →
            </Link>
          </p>
        )}
      </div>
    </details>
  );
}
