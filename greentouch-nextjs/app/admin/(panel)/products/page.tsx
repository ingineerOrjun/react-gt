import React from 'react';
import Link from 'next/link';
import { Plus, Package } from 'lucide-react';
import ProductsTable from '../../../components/admin/ProductsTable';
import { getAdminProducts } from '../../../lib/queries/admin';

export const metadata = { title: 'Products' };

export default async function AdminProductsPage() {
  const products = await getAdminProducts();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Products</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">{products.length} total</p>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2.5 rounded-lg transition-colors"
        >
          <Plus className="h-4 w-4" /> New product
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
          <Package className="h-10 w-10 mx-auto mb-3 text-slate-300 dark:text-slate-600" />
          <p className="text-slate-600 dark:text-slate-300 mb-4">No products yet.</p>
          <Link href="/admin/products/new" className="text-green-600 dark:text-green-400 font-medium hover:underline">
            Create your first product
          </Link>
        </div>
      ) : (
        <ProductsTable products={products} />
      )}
    </div>
  );
}
