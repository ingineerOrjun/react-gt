import React from 'react';

export const metadata = { title: 'Products' };

export default function AdminProductsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">Products</h1>
      <p className="text-slate-500 dark:text-slate-400">
        Product management (list, create, edit, delete, image upload, publish, ordering) is being
        implemented in this sprint.
      </p>
    </div>
  );
}
