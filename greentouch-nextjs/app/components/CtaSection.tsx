"use client";

import React from 'react';
import Link from 'next/link';
import { FiMail } from 'react-icons/fi';

export default function CtaSection() {
  return (
    <section className="py-16 bg-gradient-to-r from-green-700 to-green-500 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Chemical Processes?
          </h2>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            Join hundreds of forward-thinking companies that have already made the switch 
            to sustainable chemical solutions.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/contact" 
              className="px-8 py-4 bg-white text-green-700 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition duration-300"
            >
              Schedule a Consultation
            </Link>
            <Link 
              href="/products" 
              className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-green-600 transition duration-300"
            >
              Browse Products
            </Link>
          </div>
          <div className="mt-12 flex flex-col sm:flex-row justify-center items-center gap-6">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>9801603296</span>
            </div>
            <div className="flex items-center text-green-600 dark:text-green-500">
              <FiMail className="mr-2 h-5 w-5" />
              <span>greentouchgrouppvtltd.1@gmail.com</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 