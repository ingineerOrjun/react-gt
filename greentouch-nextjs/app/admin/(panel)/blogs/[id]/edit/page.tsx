import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import BlogForm from '../../../../../components/admin/BlogForm';
import { getAdminBlog } from '../../../../../lib/queries/admin';

export const metadata = { title: 'Edit article' };

export default async function EditBlogPage({ params }: { params: { id: string } }) {
  const blog = await getAdminBlog(params.id);
  if (!blog) notFound();

  return (
    <div>
      <Link
        href="/admin/blogs"
        className="inline-flex items-center text-sm text-slate-500 dark:text-slate-400 hover:text-green-600 dark:hover:text-green-400 mb-4"
      >
        <ArrowLeft className="h-4 w-4 mr-1.5" /> Back to blogs
      </Link>
      <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">Edit article</h1>
      <BlogForm blog={blog} />
    </div>
  );
}
