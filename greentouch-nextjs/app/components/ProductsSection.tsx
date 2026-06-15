"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ProductCard from './cards/ProductCard';
import { fadeUp, revealViewport } from './ui/motion';

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
    <section className="py-16 md:py-24 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Our Products &amp; Services
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Effective, eco-conscious cleaning solutions crafted for everyday homes and demanding
            industries alike.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              title={product.title}
              description={product.description}
              image={product.image}
              href="/products"
              cta="Learn more"
              index={index}
            />
          ))}
        </div>

        <div className="mt-20">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-8">
            Industries We Serve
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {industries.map((industry) => (
              <div
                key={industry}
                className="bg-green-50 dark:bg-slate-800/60 p-6 rounded-xl text-center border border-green-100 dark:border-slate-700/60 hover:border-green-300 dark:hover:border-green-700/60 hover:shadow-md hover:-translate-y-1 transition-all duration-300 ease-out"
              >
                <p className="font-semibold text-green-700 dark:text-green-400">{industry}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 bg-gradient-to-r from-green-50 to-green-100 dark:from-slate-800 dark:to-slate-800/60 p-8 md:p-10 rounded-2xl border border-green-200 dark:border-slate-700/60">
          <h3 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-3">
            Technical Specifications
          </h3>
          <p className="text-slate-700 dark:text-slate-300 mb-6 max-w-2xl leading-relaxed">
            Need detailed technical specifications and safety guidelines for our products? Our team is
            happy to help.
          </p>
          <Link
            href="/contact"
            className="inline-block px-6 py-3 bg-green-700 text-white font-medium rounded-lg shadow-md hover:bg-green-800 hover:-translate-y-0.5 hover:scale-[1.02] transition duration-300 ease-out"
          >
            Request Documentation
          </Link>
        </div>
      </div>
    </section>
  );
}
