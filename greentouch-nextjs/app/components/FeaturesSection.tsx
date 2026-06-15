"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Leaf, Boxes, ShieldCheck, FlaskConical, Check } from 'lucide-react';
import FeatureCard from './cards/FeatureCard';
import { fadeUp, revealViewport } from './ui/motion';

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
    description: 'Our dedicated R&D team constantly works to develop greener chemical alternatives.',
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
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-green-50 dark:from-slate-900 dark:to-slate-950">
      <div className="container mx-auto px-4">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            What Makes GreenTouch Different
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Our commitment to sustainability and innovation drives everything we do, delivering
            superior chemical solutions that protect our planet.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </div>

        <div className="mt-20 flex flex-col md:flex-row items-center gap-10 lg:gap-14">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={revealViewport}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="w-full md:w-1/2"
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg ring-1 ring-slate-200 dark:ring-slate-700/60">
              <Image
                src="/images/banner/bc.jpeg"
                alt="Advanced research laboratory"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={revealViewport}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="w-full md:w-1/2 space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100">
              Committed to a Sustainable Future
            </h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              At GreenTouch, we believe that chemistry can help solve the world&apos;s most pressing
              environmental challenges. Our team of scientists and engineers are dedicated to
              developing innovative chemical solutions that reduce waste, conserve resources, and
              minimize environmental impact.
            </p>
            <ul className="space-y-3">
              {commitments.map((item) => (
                <li key={item} className="flex items-start">
                  <span className="flex-shrink-0 mt-0.5 mr-3 p-0.5 rounded-full bg-green-100 dark:bg-green-900/50">
                    <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </span>
                  <span className="text-slate-700 dark:text-slate-300">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
