"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Calendar, Clock, Tag, ChevronRight, Search, Filter } from 'lucide-react';
import { blogPosts, type BlogPost } from '../lib/blog-data';

export default function BlogPageContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const uniqueCategories = Array.from(new Set(blogPosts.map((post) => post.category)));
  const categories = ['all', ...uniqueCategories];

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPost = blogPosts.find((post) => post.featured);

  return (
    <div className="min-h-screen py-16 bg-gray-50 dark:bg-gray-950">
      {/* Featured post */}
      {featuredPost && (
        <div className="container mx-auto px-4 md:px-6 mb-16">
          <FeaturedPost post={featuredPost} />
        </div>
      )}

      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="px-4 py-1 bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300 rounded-full text-sm font-medium inline-block mb-3">
            OUR BLOG
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Latest Sustainability Insights
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Stay updated with the latest news, innovations, and insights in sustainable chemistry
            and environmental practices.
          </p>
        </motion.div>

        {/* Search & filter */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-4">
          <div className="relative flex-grow max-w-md">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-800 dark:text-white transition"
            />
            <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
          </div>

          <div className="flex items-center flex-wrap gap-2">
            <Filter className="h-5 w-5 text-green-600 dark:text-green-400" />
            <span className="text-gray-700 dark:text-gray-300 font-medium mr-1">Filter:</span>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium capitalize transition-all ${
                  selectedCategory === category
                    ? 'bg-green-600 text-white shadow'
                    : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Posts grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <BlogPostCard key={post.id} post={post} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              No articles found matching your search criteria.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-4 text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium flex items-center mx-auto"
            >
              Clear filters <ChevronRight className="h-4 w-4 ml-1" />
            </button>
          </div>
        )}

        {/* Newsletter */}
        <div className="mt-20 bg-gradient-to-r from-green-700 to-green-600 rounded-2xl shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-6 items-center p-8 md:p-12">
            <div className="text-white">
              <h3 className="text-2xl font-bold mb-3">Subscribe to Our Newsletter</h3>
              <p className="opacity-90 mb-6">
                Get the latest sustainability updates, industry insights, and exclusive offers
                delivered to your inbox.
              </p>
              <form
                className="flex flex-col sm:flex-row gap-2"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="email"
                  required
                  placeholder="Your email address"
                  className="flex-grow px-4 py-3 rounded-lg sm:rounded-r-none focus:outline-none text-gray-700"
                />
                <button className="bg-green-900 hover:bg-green-800 text-white px-6 py-3 rounded-lg sm:rounded-l-none font-medium transition-colors duration-300">
                  Subscribe
                </button>
              </form>
              <p className="text-xs mt-3 opacity-80">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
            <div className="hidden md:block relative h-64 rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1485955900006-10f4d324d411?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Sustainability newsletter"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 0px, 400px"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const FeaturedPost = ({ post }: { post: BlogPost }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="relative rounded-2xl overflow-hidden shadow-xl group transition-all duration-300 hover:shadow-2xl"
  >
    <div className="relative h-80 md:h-96 overflow-hidden">
      <Image
        src={post.image}
        alt={post.title}
        fill
        priority
        sizes="100vw"
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
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
        <span className="flex items-center text-sm">
          <Clock className="h-4 w-4 mr-1 opacity-80" />
          {post.readTime}
        </span>
      </div>

      <h2 className="text-2xl md:text-3xl font-bold mb-3">{post.title}</h2>
      <p className="text-gray-200 mb-4 max-w-3xl">{post.excerpt}</p>

      <Link
        href={`/blog/${post.id}`}
        className="inline-flex items-center text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-medium transition-colors duration-300"
      >
        Read Article <ChevronRight className="ml-1 h-4 w-4" />
      </Link>
    </div>
  </motion.div>
);

const BlogPostCard = ({ post, index }: { post: BlogPost; index: number }) => (
  <motion.article
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.45, delay: (index % 3) * 0.1 }}
    className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col"
  >
    <Link href={`/blog/${post.id}`} className="relative h-48 overflow-hidden block">
      <Image
        src={post.image}
        alt={post.title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover transition-transform duration-500 hover:scale-105"
      />
    </Link>

    <div className="p-6 flex flex-col flex-grow">
      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 gap-4 mb-3">
        <span className="flex items-center">
          <Calendar className="h-4 w-4 mr-1" />
          {post.date}
        </span>
        <span className="flex items-center">
          <Clock className="h-4 w-4 mr-1" />
          {post.readTime}
        </span>
      </div>

      <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
        <Link
          href={`/blog/${post.id}`}
          className="hover:text-green-600 dark:hover:text-green-400 transition-colors"
        >
          {post.title}
        </Link>
      </h3>

      <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">{post.excerpt}</p>

      <div className="flex items-center justify-between mt-auto">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300 capitalize">
          <Tag className="h-3 w-3 mr-1" />
          {post.category}
        </span>

        <Link
          href={`/blog/${post.id}`}
          className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium flex items-center"
        >
          Read more <ChevronRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
    </div>
  </motion.article>
);
