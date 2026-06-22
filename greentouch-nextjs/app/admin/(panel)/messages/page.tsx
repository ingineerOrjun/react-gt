import React from 'react';
import MessagesList from '../../../components/admin/MessagesList';
import { getAdminMessages } from '../../../lib/queries/admin';

export const metadata = { title: 'Messages' };

export default async function AdminMessagesPage() {
  const messages = await getAdminMessages();
  const unread = messages.filter((m) => m.status === 'new').length;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Messages</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {messages.length} total{unread > 0 ? ` · ${unread} new` : ''}
        </p>
      </div>
      <MessagesList messages={messages} />
    </div>
  );
}
