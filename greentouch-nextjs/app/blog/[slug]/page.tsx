import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ArrowLeft, Calendar, ChevronRight, FileText } from 'lucide-react';
import BlogCard from '../../components/cards/BlogCard';
import { getBlogBySlug, getPublishedBlogSlugs, getRelatedBlogs } from '../../lib/queries/public';

interface PageProps {
  params: { slug: string };
}

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getPublishedBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = await getBlogBySlug(params.slug);
  if (!post) return { title: 'Article Not Found' };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      images: post.imageUrl ? [post.imageUrl] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const post = await getBlogBySlug(params.slug);
  if (!post) notFound();

  const related = await getRelatedBlogs(post.slug);
  const paragraphs = post.content.split(/\n{2,}/).filter((p) => p.trim().length > 0);

  return (
    <article className="bg-white dark:bg-slate-950">
      {/* Hero */}
      <header className="relative h-[50vh] min-h-[360px] w-full bg-slate-200 dark:bg-slate-900">
        {post.imageUrl ? (
          <Image src={post.imageUrl} alt={post.title} fill priority className="object-cover" sizes="100vw" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-slate-300 dark:text-slate-700">
            <FileText className="h-16 w-16" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 pb-10 text-white">
            <Link
              href="/blog"
              className="inline-flex items-center text-green-200 hover:text-white mb-4 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Blog
            </Link>
            <h1 className="text-3xl md:text-5xl font-bold max-w-4xl leading-tight">{post.title}</h1>
            <div className="flex items-center gap-2 mt-4 text-sm text-gray-200">
              <Calendar className="h-4 w-4" />
              {post.date}
            </div>
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-3xl mx-auto">
          <p className="text-xl text-slate-700 dark:text-slate-200 leading-relaxed mb-8 font-medium">
            {post.excerpt}
          </p>
          <div className="space-y-6 text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
            {paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-12 p-6 rounded-2xl bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-900/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-slate-700 dark:text-slate-200 font-medium">
              Have a question about our sustainable solutions?
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
            >
              Get in touch <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>

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
