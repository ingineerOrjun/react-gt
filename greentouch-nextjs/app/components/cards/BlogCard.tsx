"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, ChevronRight, FileText } from 'lucide-react';
import type { BlogCardView } from '../../lib/queries/public';
import { cardEntrance, hoverLift, hoverTransition, revealViewport } from '../ui/motion';

interface BlogCardProps {
  post: BlogCardView;
  index?: number;
  priority?: boolean;
}

export default function BlogCard({ post, index = 0, priority = false }: BlogCardProps) {
  const href = `/blog/${post.slug}`;
  return (
    <motion.article
      custom={index}
      variants={cardEntrance}
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      whileHover={hoverLift}
      transition={hoverTransition}
      className="group h-full flex flex-col rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 shadow-sm hover:shadow-xl hover:border-green-300 dark:hover:border-green-700/60 overflow-hidden transition-[box-shadow,border-color] duration-300 ease-out"
    >
      <Link
        href={href}
        className="relative aspect-[16/9] overflow-hidden block bg-slate-100 dark:bg-slate-900"
      >
        {post.imageUrl ? (
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-center transition-transform duration-300 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-slate-300 dark:text-slate-600">
            <FileText className="h-10 w-10" />
          </div>
        )}
      </Link>

      <div className="flex flex-col flex-grow p-6">
        <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 gap-2 mb-3">
          <Calendar className="h-4 w-4" />
          {post.date}
        </div>

        <h3 className="text-xl font-semibold mb-2 leading-snug text-slate-900 dark:text-slate-100">
          <Link href={href} className="hover:text-green-600 dark:hover:text-green-400 transition-colors">
            {post.title}
          </Link>
        </h3>

        <p className="text-slate-600 dark:text-slate-300 mb-4 flex-grow leading-relaxed line-clamp-3">
          {post.excerpt}
        </p>

        <Link
          href={href}
          className="mt-auto text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium inline-flex items-center"
        >
          Read more
          <ChevronRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.article>
  );
}
