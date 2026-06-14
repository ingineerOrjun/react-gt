"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Phone } from 'lucide-react';

export default function CtaSection() {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-r from-green-700 to-green-500 text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Chemical Processes?
          </h2>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            Join hundreds of forward-thinking companies that have already made the switch to
            sustainable chemical solutions.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/contact"
              className="px-8 py-4 bg-white text-green-700 font-semibold rounded-lg shadow-lg hover:bg-gray-100 hover:-translate-y-0.5 transition duration-300"
            >
              Schedule a Consultation
            </Link>
            <Link
              href="/products"
              className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 hover:-translate-y-0.5 transition duration-300"
            >
              Browse Products
            </Link>
          </div>
          <div className="mt-12 flex flex-col sm:flex-row justify-center items-center gap-6 text-white">
            <a href="tel:9801603296" className="flex items-center hover:opacity-80 transition-opacity">
              <Phone className="h-5 w-5 mr-2" />
              <span>9801603296</span>
            </a>
            <a
              href="mailto:greentouchgrouppvtltd.1@gmail.com"
              className="flex items-center hover:opacity-80 transition-opacity"
            >
              <Mail className="mr-2 h-5 w-5" />
              <span className="break-all">greentouchgrouppvtltd.1@gmail.com</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
