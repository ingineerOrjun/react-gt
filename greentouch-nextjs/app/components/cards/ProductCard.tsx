"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { cardEntrance, hoverLift, hoverTransition, revealViewport } from '../ui/motion';

interface ProductCardProps {
  title: string;
  description: string;
  image: string;
  category?: string;
  href?: string;
  cta?: string;
  index?: number;
}

export default function ProductCard({
  title,
  description,
  image,
  category,
  href = '/contact',
  cta = 'Enquire Now',
  index = 0,
}: ProductCardProps) {
  return (
    <motion.div
      custom={index}
      variants={cardEntrance}
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      whileHover={hoverLift}
      transition={hoverTransition}
      className="group h-full flex flex-col rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 shadow-sm hover:shadow-xl hover:border-green-300 dark:hover:border-green-700/60 overflow-hidden transition-[box-shadow,border-color] duration-300 ease-out"
    >
      {/* object-contain so product labels are never cropped; soft backdrop fills the letterboxing */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-contain object-center p-3 transition-transform duration-300 ease-out group-hover:scale-105"
        />
      </div>

      <div className="flex flex-col flex-grow p-6">
        {category && (
          <span className="self-start mb-3 px-3 py-1 rounded-full text-xs font-medium capitalize bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300">
            {category}
          </span>
        )}
        <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2 leading-snug">
          {title}
        </h3>
        <p className="text-slate-600 dark:text-slate-300 mb-4 flex-grow leading-relaxed">
          {description}
        </p>
        <Link
          href={href}
          className="mt-auto inline-flex items-center font-medium text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors"
        >
          {cta}
          <ChevronRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.div>
  );
}
