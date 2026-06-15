import React from 'react';

export const metadata = { title: 'Blogs' };

export default function AdminBlogsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">Blogs</h1>
      <p className="text-slate-500 dark:text-slate-400">
        Blog management (rich text editor, slug, featured image, publish, ordering) is being
        implemented in this sprint.
      </p>
    </div>
  );
}
