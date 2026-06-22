import React from 'react';
import Link from 'next/link';
import { Plus, FileText } from 'lucide-react';
import BlogsTable from '../../../components/admin/BlogsTable';
import { getAdminBlogs } from '../../../lib/queries/admin';

export const metadata = { title: 'Blogs' };

export default async function AdminBlogsPage() {
  const blogs = await getAdminBlogs();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Blogs</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">{blogs.length} total</p>
        </div>
        <Link
          href="/admin/blogs/new"
          className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2.5 rounded-lg transition-colors"
        >
          <Plus className="h-4 w-4" /> New article
        </Link>
      </div>

      {blogs.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
          <FileText className="h-10 w-10 mx-auto mb-3 text-slate-300 dark:text-slate-600" />
          <p className="text-slate-600 dark:text-slate-300 mb-4">No articles yet.</p>
          <Link href="/admin/blogs/new" className="text-green-600 dark:text-green-400 font-medium hover:underline">
            Write your first article
          </Link>
        </div>
      ) : (
        <BlogsTable blogs={blogs} />
      )}
    </div>
  );
}
