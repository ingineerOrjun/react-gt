import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import ProductForm from '../../../../components/admin/ProductForm';

export const metadata = { title: 'New product' };

export default function NewProductPage() {
  return (
    <div>
      <Link
        href="/admin/products"
        className="inline-flex items-center text-sm text-slate-500 dark:text-slate-400 hover:text-green-600 dark:hover:text-green-400 mb-4"
      >
        <ArrowLeft className="h-4 w-4 mr-1.5" /> Back to products
      </Link>
      <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">New product</h1>
      <ProductForm />
    </div>
  );
}
