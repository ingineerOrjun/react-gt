"use client";

import React from 'react';
import { motion } from 'framer-motion';
import TestimonialCard from './cards/TestimonialCard';
import { fadeUp, revealViewport } from './ui/motion';

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
    <section className="py-16 md:py-24 bg-gradient-to-b from-green-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            We&apos;re proud to partner with forward-thinking companies committed to sustainability.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.author}
              quote={testimonial.quote}
              author={testimonial.author}
              position={testimonial.position}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
