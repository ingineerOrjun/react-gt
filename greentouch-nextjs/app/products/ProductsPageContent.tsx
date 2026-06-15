"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Filter, ChevronRight } from 'lucide-react';
import ProductCard from '../components/cards/ProductCard';
import { fadeUp, revealViewport } from '../components/ui/motion';

const products = [
  {
    id: 1,
    image: '/images/products/pd2.jpeg',
    title: 'Prithvi Phenyl',
    description:
      'Keep your home fresh and germ-free with Prithvi Phenyl, a powerful disinfectant that removes stains and odors for a spotless clean.',
    category: 'household',
  },
  {
    id: 2,
    image: '/images/products/pd1.jpeg',
    title: 'Prithvi Liquid Blue',
    description:
      'Enhance your whites with Prithvi Liquid Blue, delivering a bright, long-lasting shine to your fabrics with every wash.',
    category: 'laundry',
  },
  {
    id: 3,
    image: '/images/products/pd3.jpeg',
    title: 'Prithvi Tiles Cleaner',
    description:
      'Restore the sparkle of your floors with Prithvi Tiles Cleaner, an effective formula that removes tough stains, grime, and watermarks effortlessly.',
    category: 'household',
  },
  {
    id: 4,
    image: '/images/products/pd4.jpeg',
    title: 'Prithvi Glass Cleaner',
    description:
      'Get crystal clear windows and mirrors with Prithvi Glass Cleaner, leaving no streaks or residue behind for perfect clarity.',
    category: 'household',
  },
  {
    id: 5,
    image: '/images/products/pd5.jpeg',
    title: 'Prithvi Dishwash Liquid',
    description:
      'Our powerful yet gentle dishwashing liquid cuts through grease while being kind to your hands and the environment.',
    category: 'kitchen',
  },
  {
    id: 6,
    image: '/images/products/bb.jpeg',
    title: 'Prithvi All-Purpose Cleaner',
    description:
      'A versatile cleaning solution that works on multiple surfaces, making it perfect for all your household cleaning needs.',
    category: 'household',
  },
];

const industries = [
  'Pharmaceuticals',
  'Agriculture',
  'Water Treatment',
  'Manufacturing',
  'Hospitality',
  'Education',
];

const uniqueCategories = Array.from(new Set(products.map((product) => product.category)));
const categories = ['all', ...uniqueCategories];

export default function ProductsPageContent() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredProducts = products.filter(
    (product) => selectedCategory === 'all' || product.category === selectedCategory
  );

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-r from-green-700 to-green-900 py-24 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Sustainable Chemistry Solutions
            </h1>
            <p className="text-xl mb-8 text-green-50/90 leading-relaxed">
              Discover our range of eco-friendly products designed with the environment in mind,
              without compromising on performance.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="#products"
                className="px-6 py-3 bg-white text-green-700 font-medium rounded-lg hover:bg-green-100 hover:scale-[1.02] transition-all duration-300 ease-out"
              >
                Browse Products
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3 border border-white text-white font-medium rounded-lg hover:bg-white/10 hover:scale-[1.02] transition-all duration-300 ease-out"
              >
                Request Samples
              </Link>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-gray-50 dark:to-slate-950" />
      </section>

      {/* Products */}
      <section id="products" className="py-16 md:py-20 bg-gray-50 dark:bg-slate-950 scroll-mt-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              Our Products &amp; Solutions
            </h2>
            <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
              From household cleaners to industrial solutions, our products combine efficiency with
              environmental responsibility.
            </p>
          </div>

          {/* Filters */}
          <div className="flex items-center justify-center mb-12 flex-wrap gap-3">
            <Filter className="h-5 w-5 text-green-600 dark:text-green-400" />
            <span className="text-slate-700 dark:text-slate-300 font-medium mr-1">Filter by:</span>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-green-600 text-white shadow'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                title={product.title}
                description={product.description}
                image={product.image}
                category={product.category}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-16 md:py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              Industries We Serve
            </h2>
            <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Our specialized chemical solutions cater to a wide range of industries with specific
              requirements.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {industries.map((industry) => (
              <div
                key={industry}
                className="bg-gray-50 dark:bg-slate-800/60 p-6 rounded-xl text-center border border-slate-200 dark:border-slate-700/60 hover:border-green-300 dark:hover:border-green-700/60 hover:shadow-md hover:-translate-y-1 transition-all duration-300 ease-out"
              >
                <p className="font-semibold text-green-700 dark:text-green-400">{industry}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical info */}
      <section className="py-16 md:py-20 bg-gray-50 dark:bg-slate-950">
        <div className="container mx-auto px-4">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={revealViewport}
            className="bg-white dark:bg-slate-800/60 rounded-2xl shadow-md p-8 md:p-10 border border-slate-200 dark:border-slate-700/60"
          >
            <h2 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-6">
              Technical Specifications &amp; Documentation
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
              Access detailed product specifications, safety data sheets, and usage guidelines for our
              complete product range.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  Available Documents
                </h3>
                <ul className="space-y-2">
                  {[
                    'Product Specifications',
                    'Safety Data Sheets (SDS)',
                    'Application Guidelines',
                    'Compliance Certificates',
                  ].map((doc) => (
                    <li key={doc} className="flex items-center text-slate-600 dark:text-slate-300">
                      <ChevronRight className="h-4 w-4 text-green-600 dark:text-green-400 mr-2" />
                      {doc}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <Link
                  href="/contact"
                  className="inline-block px-6 py-3 bg-green-700 text-white font-medium rounded-lg shadow-md hover:bg-green-800 hover:-translate-y-0.5 hover:scale-[1.02] transition-all duration-300 ease-out w-full md:w-auto text-center"
                >
                  Request Technical Catalog
                </Link>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-3 leading-relaxed">
                  For custom formulations or specific technical questions, please contact our technical
                  support team.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
