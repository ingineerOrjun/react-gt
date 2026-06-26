import Link from 'next/link';
import { PackageSearch, ArrowLeft, MessageSquare } from 'lucide-react';

// Rendered when a product slug doesn't resolve to a published product.
export default function ProductNotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-white px-4 dark:bg-slate-950">
      <div className="max-w-md text-center">
        <span className="mx-auto mb-5 inline-flex rounded-2xl bg-green-100 p-4 text-green-600 dark:bg-green-900/40 dark:text-green-400">
          <PackageSearch className="h-9 w-9" />
        </span>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Product not found</h1>
        <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
          The product you&apos;re looking for may have been moved or is no longer available. Browse
          our full range or get in touch and we&apos;ll help you find the right solution.
        </p>
        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-6 py-3 font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-green-700 hover:shadow-lg"
          >
            <ArrowLeft className="h-4 w-4" />
            Browse Products
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition-all duration-300 hover:border-green-300 hover:text-green-700 dark:border-slate-700 dark:text-slate-200 dark:hover:border-green-700/60"
          >
            <MessageSquare className="h-4 w-4" />
            Contact Us
          </Link>
        </div>
      </div>
    </main>
  );
}
