import React from 'react';
import { Metadata } from 'next';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import ProductsSection from './components/ProductsSection';
import TestimonialsSection from './components/TestimonialsSection';
import CtaSection from './components/CtaSection';

export const metadata: Metadata = {
  title: 'GreenTouch Chemicals Pvt. Ltd. - Sustainable Chemical Solutions',
  description: 'GreenTouch Chemicals Pvt. Ltd. provides eco-friendly and sustainable chemical solutions for businesses and consumers.',
};

export default function HomePage() {
  return (
    <div className="flex flex-col bg-white dark:bg-gray-900">
      <HeroSection />
      <div className="py-4 bg-gradient-to-r from-green-50 to-white dark:bg-gray-900"></div>
      <FeaturesSection />
      <div className="py-4 bg-white dark:bg-gray-900"></div>
      <ProductsSection />
      <div className="py-4 bg-gradient-to-r from-white to-green-50 dark:bg-gray-900"></div>
      <TestimonialsSection />
      <div className="py-4 bg-gradient-to-b from-white to-green-50 dark:bg-gray-900"></div>
      <CtaSection />
    </div>
  );
} 