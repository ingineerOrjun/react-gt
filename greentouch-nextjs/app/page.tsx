import React from 'react';
import { Metadata } from 'next';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import ProductsSection from './components/ProductsSection';
import TestimonialsSection from './components/TestimonialsSection';
import CtaSection from './components/CtaSection';
import { getPublishedProducts } from './lib/queries/public';

export const metadata: Metadata = {
  title: 'GreenTouch Chemicals Pvt. Ltd. - Sustainable Chemical Solutions',
  description: 'GreenTouch Chemicals Pvt. Ltd. provides eco-friendly and sustainable chemical solutions for businesses and consumers.',
};

export const revalidate = 60;

export default async function HomePage() {
  const products = await getPublishedProducts(4);

  return (
    <div className="flex flex-col bg-white dark:bg-slate-900">
      <HeroSection />
      <div className="py-4 bg-gradient-to-r from-green-50 to-white dark:bg-slate-900"></div>
      <FeaturesSection />
      <div className="py-4 bg-white dark:bg-slate-900"></div>
      <ProductsSection products={products} />
      <div className="py-4 bg-gradient-to-r from-white to-green-50 dark:bg-slate-900"></div>
      <TestimonialsSection />
      <div className="py-4 bg-gradient-to-b from-white to-green-50 dark:bg-slate-900"></div>
      <CtaSection />
    </div>
  );
}