"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { type LucideIcon } from 'lucide-react';
import { cardEntrance, hoverLift, hoverTransition, revealViewport } from '../ui/motion';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index?: number;
}

export default function FeatureCard({ icon: Icon, title, description, index = 0 }: FeatureCardProps) {
  return (
    <motion.div
      custom={index}
      variants={cardEntrance}
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      whileHover={hoverLift}
      transition={hoverTransition}
      className="group h-full rounded-2xl bg-white dark:bg-slate-800/60 p-6 sm:p-7 border border-slate-200 dark:border-slate-700/60 shadow-sm hover:shadow-xl hover:border-green-300 dark:hover:border-green-700/60 transition-[box-shadow,border-color] duration-300 ease-out"
    >
      <div className="mb-5 inline-flex p-3 rounded-xl bg-green-100 dark:bg-green-900/40 ring-1 ring-green-200/60 dark:ring-green-800/40 transition-transform duration-300 ease-out group-hover:scale-110">
        <Icon className="h-7 w-7 text-green-600 dark:text-green-400" />
      </div>
      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2 leading-snug">
        {title}
      </h3>
      <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{description}</p>
    </motion.div>
  );
}
