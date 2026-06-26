import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

// Accessible breadcrumb navigation for the product detail page.
export default function ProductBreadcrumb({ productName }: { productName: string }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
        <li>
          <Link href="/" className="transition-colors hover:text-green-700 dark:hover:text-green-400">
            Home
          </Link>
        </li>
        <li aria-hidden="true">
          <ChevronRight className="h-4 w-4" />
        </li>
        <li>
          <Link
            href="/products"
            className="transition-colors hover:text-green-700 dark:hover:text-green-400"
          >
            Products
          </Link>
        </li>
        <li aria-hidden="true">
          <ChevronRight className="h-4 w-4" />
        </li>
        <li>
          <span aria-current="page" className="font-medium text-slate-800 dark:text-slate-200">
            {productName}
          </span>
        </li>
      </ol>
    </nav>
  );
}
