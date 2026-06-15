"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, Clock, Tag, ChevronRight } from 'lucide-react';
import type { BlogPost } from '../../lib/blog-data';
import { cardEntrance, hoverLift, hoverTransition, revealViewport } from '../ui/motion';

interface BlogCardProps {
  post: BlogPost;
  index?: number;
  priority?: boolean;
}

export default function BlogCard({ post, index = 0, priority = false }: BlogCardProps) {
  const href = `/blog/${post.id}`;
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
        <Image
          src={post.image}
          alt={post.title}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-center transition-transform duration-300 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Link>

      <div className="flex flex-col flex-grow p-6">
        <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 gap-4 mb-3">
          <span className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            {post.date}
          </span>
          <span className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            {post.readTime}
          </span>
        </div>

        <h3 className="text-xl font-semibold mb-2 leading-snug text-slate-900 dark:text-slate-100">
          <Link href={href} className="hover:text-green-600 dark:hover:text-green-400 transition-colors">
            {post.title}
          </Link>
        </h3>

        <p className="text-slate-600 dark:text-slate-300 mb-4 flex-grow leading-relaxed line-clamp-3">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300 capitalize">
            <Tag className="h-3 w-3 mr-1" />
            {post.category}
          </span>
          <Link
            href={href}
            className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium flex items-center"
          >
            Read more
            <ChevronRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
