"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const products = [
  {
    id: 1,
    image: '/images/products/pd2.jpeg',
    title: 'Prithvi Phenyl',
    description:
      'Keep your home fresh and germ-free with Prithvi Phenyl, a powerful disinfectant that removes stains and odors for a spotless clean.',
  },
  {
    id: 2,
    image: '/images/products/pd1.jpeg',
    title: 'Prithvi Liquid Blue',
    description:
      'Enhance your whites with Prithvi Liquid Blue, delivering a bright, long-lasting shine to your fabrics with every wash.',
  },
  {
    id: 3,
    image: '/images/products/pd3.jpeg',
    title: 'Prithvi Tiles Cleaner',
    description:
      'Restore the sparkle of your floors with Prithvi Tiles Cleaner, an effective formula that removes tough stains, grime, and watermarks effortlessly.',
  },
  {
    id: 4,
    image: '/images/products/pd4.jpeg',
    title: 'Prithvi Glass Cleaner',
    description:
      'Get crystal clear windows and mirrors with Prithvi Glass Cleaner, leaving no streaks or residue behind for perfect clarity.',
  },
];

const industries = ['Pharmaceuticals', 'Agriculture', 'Water Treatment', 'Manufacturing'];

export default function ProductsSection() {
  return (
    <section className="py-16 md:py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-green-700 dark:text-green-400 text-center mb-12"
        >
          Our Products &amp; Services
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: (index % 4) * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1 border border-green-100 dark:border-gray-700 flex flex-col"
            >
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold mb-2 text-green-700 dark:text-green-400">
                  {product.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">
                  {product.description}
                </p>
                <Link
                  href="/products"
                  className="inline-block text-green-700 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 font-medium mt-auto"
                >
                  Learn more →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16">
          <h3 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-8">
            Industries We Serve
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {industries.map((industry) => (
              <div
                key={industry}
                className="bg-green-50 dark:bg-gray-800 p-6 rounded-lg text-center hover:bg-green-100 dark:hover:bg-gray-700 transition-colors duration-300 border border-green-200 dark:border-gray-700"
              >
                <p className="font-semibold text-green-700 dark:text-green-400">{industry}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 bg-gradient-to-r from-green-50 to-green-100 dark:from-gray-800 dark:to-gray-800 p-8 rounded-xl border border-green-200 dark:border-gray-700">
          <h3 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-4">
            Technical Specifications
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Need detailed technical specifications and safety guidelines for our products? Our team is
            happy to help.
          </p>
          <Link
            href="/contact"
            className="inline-block px-6 py-3 bg-green-700 text-white font-medium rounded-lg shadow-md hover:bg-green-800 hover:-translate-y-0.5 transition duration-300"
          >
            Request Documentation
          </Link>
        </div>
      </div>
    </section>
  );
}
