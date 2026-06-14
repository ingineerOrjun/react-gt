"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Leaf, Boxes, ShieldCheck, FlaskConical, Check } from 'lucide-react';

const features = [
  {
    title: 'Eco-Friendly Formulations',
    description:
      'Our products are developed with biodegradable ingredients that minimize environmental impact.',
    icon: Leaf,
  },
  {
    title: 'Carbon Neutral Production',
    description:
      'Our manufacturing process is optimized to reduce carbon emissions and conserve energy.',
    icon: Boxes,
  },
  {
    title: 'Industry Certifications',
    description:
      'All our products have passed rigorous testing and meet international sustainability standards.',
    icon: ShieldCheck,
  },
  {
    title: 'Research & Innovation',
    description:
      'Our dedicated R&D team constantly works to develop greener chemical alternatives.',
    icon: FlaskConical,
  },
];

const commitments = [
  'Reduced carbon footprint across our entire supply chain',
  'Water-based formulations that eliminate harmful solvents',
  'Sustainable packaging made from recycled materials',
  'Zero-waste manufacturing processes',
];

export default function FeaturesSection() {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-white to-green-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            What Makes GreenTouch Different
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Our commitment to sustainability and innovation drives everything we do, delivering
            superior chemical solutions that protect our planet.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.45, delay: (index % 4) * 0.1 }}
                className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-green-200 dark:hover:border-green-900"
              >
                <div className="mb-4 inline-flex p-3 rounded-xl bg-green-100 dark:bg-green-900/40">
                  <Icon className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-20 flex flex-col md:flex-row items-center gap-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="w-full md:w-1/2"
          >
            <div className="relative h-[300px] md:h-[400px] rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/images/banner/bc.jpeg"
                alt="Advanced research laboratory"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="w-full md:w-1/2 space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Committed to a Sustainable Future
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              At GreenTouch, we believe that chemistry can help solve the world&apos;s most pressing
              environmental challenges. Our team of scientists and engineers are dedicated to
              developing innovative chemical solutions that reduce waste, conserve resources, and
              minimize environmental impact.
            </p>
            <ul className="space-y-3">
              {commitments.map((item) => (
                <li key={item} className="flex items-start">
                  <span className="flex-shrink-0 mt-0.5 mr-2 p-0.5 rounded-full bg-green-100 dark:bg-green-900/50">
                    <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </span>
                  <span className="text-gray-700 dark:text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
