"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { cardEntrance, hoverLift, hoverTransition, revealViewport } from '../ui/motion';

interface TestimonialCardProps {
  quote: string;
  author: string;
  position: string;
  index?: number;
}

export default function TestimonialCard({ quote, author, position, index = 0 }: TestimonialCardProps) {
  const initials = author
    .split(' ')
    .map((n) => n[0])
    .join('');

  return (
    <motion.div
      custom={index}
      variants={cardEntrance}
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      whileHover={hoverLift}
      transition={hoverTransition}
      className="group relative h-full rounded-2xl bg-white dark:bg-slate-800/60 p-7 sm:p-8 border border-slate-200 dark:border-slate-700/60 shadow-sm hover:shadow-xl hover:border-green-300 dark:hover:border-green-700/60 transition-[box-shadow,border-color] duration-300 ease-out"
    >
      <div className="absolute -top-4 -right-4 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg ring-4 ring-white dark:ring-slate-900 transition-transform duration-300 ease-out group-hover:scale-110">
        <Quote className="h-6 w-6 text-white" />
      </div>

      <p className="text-slate-700 dark:text-slate-300 italic mb-6 leading-relaxed">
        &ldquo;{quote}&rdquo;
      </p>

      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 font-semibold flex items-center justify-center mr-3">
          {initials}
        </div>
        <div>
          <h4 className="font-semibold text-slate-900 dark:text-slate-100">{author}</h4>
          <p className="text-sm text-slate-500 dark:text-slate-400">{position}</p>
        </div>
      </div>
    </motion.div>
  );
}
