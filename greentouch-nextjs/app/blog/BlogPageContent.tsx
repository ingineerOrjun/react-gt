"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Calendar, ChevronRight, Search, FileText } from 'lucide-react';
import BlogCard from '../components/cards/BlogCard';
import { fadeUp, revealViewport } from '../components/ui/motion';
import type { BlogCardView } from '../lib/queries/public';

export default function BlogPageContent({ posts }: { posts: BlogCardView[] }) {
  const [searchQuery, setSearchQuery] = useState('');

  const featuredPost = posts[0];
  const rest = posts.slice(1);

  const filteredPosts = (featuredPost ? rest : posts).filter((post) => {
    const q = searchQuery.toLowerCase();
    return post.title.toLowerCase().includes(q) || post.excerpt.toLowerCase().includes(q);
  });

  return (
    <div className="min-h-screen py-16 md:py-20 bg-gray-50 dark:bg-slate-950">
      {featuredPost && (
        <div className="container mx-auto px-4 md:px-6 mb-16">
          <FeaturedPost post={featuredPost} />
        </div>
      )}

      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
          className="text-center mb-12"
        >
          <span className="px-4 py-1 bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300 rounded-full text-sm font-medium inline-block mb-3">
            OUR BLOG
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Latest Sustainability Insights
          </h1>
          <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Stay updated with the latest news, innovations, and insights in sustainable chemistry and
            environmental practices.
          </p>
        </motion.div>

        {posts.length === 0 ? (
          <div className="text-center py-16 max-w-md mx-auto">
            <FileText className="h-12 w-12 mx-auto mb-4 text-slate-300 dark:text-slate-600" />
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">
              No articles yet
            </h3>
            <p className="text-slate-500 dark:text-slate-400">
              Check back soon for the latest insights from our team.
            </p>
          </div>
        ) : (
          <>
            {/* Search */}
            <div className="flex justify-center mb-12">
              <div className="relative w-full max-w-md">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search articles"
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent bg-white dark:bg-slate-800 dark:text-slate-100 transition"
                />
                <Search className="absolute left-3 top-3.5 h-5 w-5 text-slate-400 dark:text-slate-500" />
              </div>
            </div>

            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {filteredPosts.map((post, index) => (
                  <BlogCard key={post.id} post={post} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-xl shadow-sm">
                <p className="text-slate-600 dark:text-slate-300 text-lg">
                  No articles match “{searchQuery}”.
                </p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="mt-4 text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium inline-flex items-center"
                >
                  Clear search <ChevronRight className="h-4 w-4 ml-1" />
                </button>
              </div>
            )}
          </>
        )}

        {/* Newsletter */}
        <div className="mt-20 bg-gradient-to-r from-green-700 to-green-600 rounded-2xl shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-6 items-center p-8 md:p-12">
            <div className="text-white">
              <h3 className="text-2xl font-bold mb-3">Subscribe to Our Newsletter</h3>
              <p className="opacity-90 mb-6 leading-relaxed">
                Get the latest sustainability updates, industry insights, and exclusive offers
                delivered to your inbox.
              </p>
              <form className="flex flex-col sm:flex-row gap-2" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  required
                  placeholder="Your email address"
                  aria-label="Email address"
                  className="flex-grow px-4 py-3 rounded-lg sm:rounded-r-none focus:outline-none text-slate-700"
                />
                <button className="bg-green-900 hover:bg-green-800 hover:scale-[1.02] text-white px-6 py-3 rounded-lg sm:rounded-l-none font-medium transition-all duration-300 ease-out">
                  Subscribe
                </button>
              </form>
              <p className="text-xs mt-3 opacity-80">We respect your privacy. Unsubscribe at any time.</p>
            </div>
            <div className="hidden md:block relative aspect-[16/9] rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1485955900006-10f4d324d411?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Sustainability newsletter"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 0px, 400px"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const FeaturedPost = ({ post }: { post: BlogCardView }) => (
  <motion.div
    variants={fadeUp}
    initial="hidden"
    whileInView="visible"
    viewport={revealViewport}
    className="group relative rounded-2xl overflow-hidden shadow-xl transition-shadow duration-300 hover:shadow-2xl bg-slate-100 dark:bg-slate-900"
  >
    <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden">
      {post.imageUrl ? (
        <Image
          src={post.imageUrl}
          alt={post.title}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-slate-300 dark:text-slate-600">
          <FileText className="h-12 w-12" />
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
    </div>

    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-3">
        <span className="bg-green-500 px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider">
          Featured
        </span>
        <span className="flex items-center text-sm">
          <Calendar className="h-4 w-4 mr-1 opacity-80" />
          {post.date}
        </span>
      </div>

      <h2 className="text-2xl md:text-3xl font-bold mb-3 leading-tight max-w-3xl">{post.title}</h2>
      <p className="text-gray-200 mb-4 max-w-3xl leading-relaxed line-clamp-2">{post.excerpt}</p>

      <Link
        href={`/blog/${post.slug}`}
        className="inline-flex items-center text-white bg-green-600 hover:bg-green-700 hover:scale-[1.02] px-4 py-2 rounded-lg font-medium transition-all duration-300 ease-out"
      >
        Read Article <ChevronRight className="ml-1 h-4 w-4" />
      </Link>
    </div>
  </motion.div>
);
