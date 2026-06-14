import React from 'react';
import { Metadata } from 'next';
import ProductsPageContent from './ProductsPageContent';

export const metadata: Metadata = {
  title: 'Products - GreenTouch Chemicals Pvt. Ltd.',
  description: 'Explore our range of eco-friendly and sustainable chemical products designed for various industries and applications.',
};

export default function ProductsPage() {
  return (
    <div className="min-h-screen">
      <ProductsPageContent />
    </div>
  );
} 