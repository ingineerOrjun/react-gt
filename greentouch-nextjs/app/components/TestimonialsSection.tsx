"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    quote:
      "GreenTouch's eco-friendly chemicals have transformed our manufacturing process, reducing our environmental impact without sacrificing quality.",
    author: 'Sarah Johnson',
    position: 'Operations Director, EcoManufacturing Inc.',
  },
  {
    quote:
      'The technical support and innovative solutions provided by GreenTouch have helped us meet our sustainability goals ahead of schedule.',
    author: 'Michael Chen',
    position: 'Chief Sustainability Officer, GreenTech Solutions',
  },
  {
    quote:
      "Switching to GreenTouch's products has not only reduced our carbon footprint but has also improved our production efficiency by 30%.",
    author: 'Emma Rodriguez',
    position: 'Plant Manager, BioProducts Co.',
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-green-50 to-white dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            We&apos;re proud to partner with forward-thinking companies committed to sustainability.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: index * 0.12 }}
              className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative"
            >
              <div className="absolute top-0 right-0 w-12 h-12 -mt-4 -mr-4 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                <Quote className="h-6 w-6 text-white" />
              </div>

              <p className="text-gray-700 dark:text-gray-300 italic mb-6">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 font-semibold flex items-center justify-center mr-3">
                  {testimonial.author
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.author}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.position}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
