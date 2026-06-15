import React from 'react';

export const metadata = { title: 'Messages' };

export default function AdminMessagesPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">Messages</h1>
      <p className="text-slate-500 dark:text-slate-400">
        Contact message inbox (read, status change, delete) is being implemented in this sprint.
      </p>
    </div>
  );
}
