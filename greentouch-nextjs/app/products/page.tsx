import React from 'react';
import { Metadata } from 'next';
import ProductsPageContent from './ProductsPageContent';
import { getPublishedProducts } from '../lib/queries/public';

export const metadata: Metadata = {
  title: 'Products - GreenTouch Chemicals Pvt. Ltd.',
  description:
    'Explore our range of eco-friendly and sustainable chemical products designed for various industries and applications.',
};

export const revalidate = 60;

export default async function ProductsPage() {
  const products = await getPublishedProducts();
  return (
    <div className="min-h-screen">
      <ProductsPageContent products={products} />
    </div>
  );
}
