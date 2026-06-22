import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import BlogForm from '../../../../components/admin/BlogForm';

export const metadata = { title: 'New article' };

export default function NewBlogPage() {
  return (
    <div>
      <Link
        href="/admin/blogs"
        className="inline-flex items-center text-sm text-slate-500 dark:text-slate-400 hover:text-green-600 dark:hover:text-green-400 mb-4"
      >
        <ArrowLeft className="h-4 w-4 mr-1.5" /> Back to blogs
      </Link>
      <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">New article</h1>
      <BlogForm />
    </div>
  );
}
