import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ArrowLeft, Calendar, Clock, Tag, User, ChevronRight } from 'lucide-react';
import { getAllPostIds, getPostById, getRelatedPosts } from '../../lib/blog-data';
import BlogCard from '../../components/cards/BlogCard';

interface PageProps {
  params: { id: string };
}

export function generateStaticParams() {
  return getAllPostIds().map((id) => ({ id: String(id) }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const post = getPostById(Number(params.id));
  if (!post) return { title: 'Article Not Found' };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
      type: 'article',
    },
  };
}

export default function BlogPostPage({ params }: PageProps) {
  const post = getPostById(Number(params.id));
  if (!post) notFound();

  const related = getRelatedPosts(post.id);

  return (
    <article className="bg-white dark:bg-slate-950">
      {/* Hero */}
      <header className="relative h-[50vh] min-h-[360px] w-full">
        <Image src={post.image} alt={post.title} fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 pb-10 text-white">
            <Link
              href="/blog"
              className="inline-flex items-center text-green-200 hover:text-white mb-4 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Blog
            </Link>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-500 capitalize mb-4">
              <Tag className="h-3 w-3 mr-1" />
              {post.category}
            </span>
            <h1 className="text-3xl md:text-5xl font-bold max-w-4xl">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-4 text-sm text-gray-200">
              <span className="flex items-center">
                <User className="h-4 w-4 mr-1.5" />
                {post.author}
              </span>
              <span className="flex items-center">
                <Calendar className="h-4 w-4 mr-1.5" />
                {post.date}
              </span>
              <span className="flex items-center">
                <Clock className="h-4 w-4 mr-1.5" />
                {post.readTime}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-3xl mx-auto">
          <p className="text-xl text-gray-700 dark:text-slate-200 leading-relaxed mb-8 font-medium">
            {post.excerpt}
          </p>
          <div className="space-y-6 text-gray-700 dark:text-slate-300 leading-relaxed text-lg">
            {post.content.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {/* Author / CTA */}
          <div className="mt-12 p-6 rounded-2xl bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-900/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold">
                {post.author
                  .split(' ')
                  .map((part) => part[0])
                  .join('')
                  .slice(0, 2)}
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-slate-400">Written by</p>
                <p className="font-semibold text-gray-900 dark:text-slate-100">{post.author}</p>
              </div>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
            >
              Get in touch <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="max-w-5xl mx-auto mt-16">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-8">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {related.map((item, index) => (
                <BlogCard key={item.id} post={item} index={index} />
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
