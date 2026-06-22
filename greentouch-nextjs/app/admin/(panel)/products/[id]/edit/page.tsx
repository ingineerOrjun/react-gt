import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import ProductForm from '../../../../../components/admin/ProductForm';
import { getAdminProduct } from '../../../../../lib/queries/admin';

export const metadata = { title: 'Edit product' };

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const product = await getAdminProduct(params.id);
  if (!product) notFound();

  return (
    <div>
      <Link
        href="/admin/products"
        className="inline-flex items-center text-sm text-slate-500 dark:text-slate-400 hover:text-green-600 dark:hover:text-green-400 mb-4"
      >
        <ArrowLeft className="h-4 w-4 mr-1.5" /> Back to products
      </Link>
      <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">Edit product</h1>
      <ProductForm product={product} />
    </div>
  );
}
