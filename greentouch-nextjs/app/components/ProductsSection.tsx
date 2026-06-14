"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const products = [
  {
    id: 1,
    image: "/images/products/pd2.jpeg",
    title: "Prithvi Phenyl",
    description:
      "Keep your home fresh and germ-free with Prithvi Phenyl, a powerful disinfectant that removes stains and odors for a spotless clean.",
  },
  {
    id: 2,
    image: "/images/products/pd1.jpeg",
    title: "Prithvi Liquid Blue",
    description:
      "Enhance your whites with Prithvi Liquid Blue, delivering a bright, long-lasting shine to your fabrics with every wash.",
  },
  {
    id: 3,
    image: "/images/products/pd3.jpeg",
    title: "Prithvi Tiles Cleaner",
    description:
      "Restore the sparkle of your floors with Prithvi Tiles Cleaner, an effective formula that removes tough stains, grime, and watermarks effortlessly.",
  },
  {
    id: 4,
    image: "/images/products/pd4.jpeg",
    title: "Prithvi Glass Cleaner",
    description:
      "Get crystal clear windows and mirrors with Prithvi Glass Cleaner, leaving no streaks or residue behind for perfect clarity.",
  },
];

const industries = [
  "Pharmaceuticals",
  "Agriculture",
  "Water Treatment",
  "Manufacturing",
];

export default function ProductsSection() {
  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-green-700 text-center mb-12">
          Our Products & Services
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden hover:transform hover:scale-105 border border-green-100 dark:border-gray-700"
            >
              <div className="relative h-64 w-full">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-green-700 dark:text-green-500">
                  {product.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {product.description}
                </p>
                <Link 
                  href="/products" 
                  className="inline-block text-green-700 dark:text-green-500 hover:text-green-800 dark:hover:text-green-400 font-medium"
                >
                  Learn more →
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-green-700 dark:text-green-500 mb-8">
            Industries We Serve
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {industries.map((industry, index) => (
              <div 
                key={index} 
                className="bg-green-50 dark:bg-gray-800 p-6 rounded-lg text-center hover:bg-green-100 dark:hover:bg-gray-700 transition-colors duration-300 border border-green-200 dark:border-gray-700"
              >
                <p className="font-semibold text-green-700 dark:text-green-500">{industry}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-16 bg-gradient-to-r from-green-50 to-green-100 dark:bg-gray-800 p-8 rounded-xl border border-green-200 dark:border-gray-700">
          <h3 className="text-2xl font-bold text-green-700 dark:text-green-500 mb-4">
            Technical Specifications
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Download detailed technical specifications and safety guidelines for our products.
          </p>
          <button
            className="px-6 py-3 bg-green-700 text-white font-medium rounded-lg shadow-md hover:bg-green-800 transition duration-300"
          >
            Download PDF
          </button>
        </div>
      </div>
    </section>
  );
} 