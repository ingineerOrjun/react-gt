"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Filter, ChevronRight } from 'lucide-react';

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
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Sustainable Chemistry Solutions</h1>
            <p className="text-xl mb-8 text-green-50/90">
              Discover our range of eco-friendly products designed with the environment in mind,
              without compromising on performance.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="#products"
                className="px-6 py-3 bg-white text-green-700 font-medium rounded-lg hover:bg-green-100 transition"
              >
                Browse Products
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3 border border-white text-white font-medium rounded-lg hover:bg-white/10 transition"
              >
                Request Samples
              </Link>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-gray-50 dark:to-gray-950" />
      </section>

      {/* Products */}
      <section id="products" className="py-16 bg-gray-50 dark:bg-gray-950 scroll-mt-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-green-700 dark:text-green-400 mb-4">
              Our Products &amp; Solutions
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              From household cleaners to industrial solutions, our products combine efficiency with
              environmental responsibility.
            </p>
          </div>

          {/* Filters */}
          <div className="flex items-center justify-center mb-12 flex-wrap gap-3">
            <Filter className="h-5 w-5 text-green-600 dark:text-green-400" />
            <span className="text-gray-700 dark:text-gray-300 font-medium mr-1">Filter by:</span>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-all ${
                  selectedCategory === category
                    ? 'bg-green-600 text-white shadow'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.4, delay: (index % 3) * 0.08 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1 flex flex-col"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="mb-2">
                    <span className="px-3 py-1 bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 rounded-full text-xs font-medium capitalize">
                      {product.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-green-700 dark:text-green-400">
                    {product.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">
                    {product.description}
                  </p>
                  <Link
                    href="/contact"
                    className="flex items-center text-green-600 dark:text-green-400 font-medium hover:text-green-700 dark:hover:text-green-300 transition-colors mt-auto"
                  >
                    Enquire Now <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-green-700 dark:text-green-400 mb-4">
              Industries We Serve
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our specialized chemical solutions cater to a wide range of industries with specific
              requirements.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {industries.map((industry) => (
              <div
                key={industry}
                className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg text-center hover:shadow-md hover:-translate-y-1 transition-all duration-300 border border-gray-200 dark:border-gray-700"
              >
                <p className="font-semibold text-green-700 dark:text-green-400">{industry}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical info */}
      <section className="py-16 bg-gray-50 dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-6">
              Technical Specifications &amp; Documentation
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Access detailed product specifications, safety data sheets, and usage guidelines for our
              complete product range.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  Available Documents
                </h3>
                <ul className="space-y-2">
                  {[
                    'Product Specifications',
                    'Safety Data Sheets (SDS)',
                    'Application Guidelines',
                    'Compliance Certificates',
                  ].map((doc) => (
                    <li key={doc} className="flex items-center text-gray-600 dark:text-gray-300">
                      <ChevronRight className="h-4 w-4 text-green-600 dark:text-green-400 mr-2" />
                      {doc}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <Link
                  href="/contact"
                  className="inline-block px-6 py-3 bg-green-700 text-white font-medium rounded-lg shadow-md hover:bg-green-800 hover:-translate-y-0.5 transition duration-300 w-full md:w-auto text-center"
                >
                  Request Technical Catalog
                </Link>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
                  For custom formulations or specific technical questions, please contact our technical
                  support team.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
