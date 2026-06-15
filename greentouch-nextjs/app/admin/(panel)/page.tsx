import React from 'react';
import Link from 'next/link';
import { Package, FileText, Mail, Inbox } from 'lucide-react';
import { createClient } from '../../lib/supabase/server';
import type { ContactMessageRow } from '../../lib/supabase/database.types';

async function getDashboardData() {
  const supabase = createClient();

  const safeCount = async (table: 'products' | 'blogs' | 'contact_messages') => {
    try {
      const { count } = await supabase.from(table).select('*', { count: 'exact', head: true });
      return count ?? 0;
    } catch {
      return 0;
    }
  };

  let recentMessages: Pick<ContactMessageRow, 'id' | 'name' | 'subject' | 'status' | 'created_at'>[] = [];
  try {
    const { data } = await supabase
      .from('contact_messages')
      .select('id, name, subject, status, created_at')
      .order('created_at', { ascending: false })
      .limit(5);
    recentMessages = data ?? [];
  } catch {
    recentMessages = [];
  }

  const [products, blogs, messages] = await Promise.all([
    safeCount('products'),
    safeCount('blogs'),
    safeCount('contact_messages'),
  ]);

  return { products, blogs, messages, recentMessages };
}

const STATUS_STYLES: Record<string, string> = {
  new: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
  read: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
  responded: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
  archived: 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300',
};

export default async function DashboardPage() {
  const { products, blogs, messages, recentMessages } = await getDashboardData();

  const stats = [
    { label: 'Total Products', value: products, icon: Package, href: '/admin/products' },
    { label: 'Total Blogs', value: blogs, icon: FileText, href: '/admin/blogs' },
    { label: 'Total Messages', value: messages, icon: Mail, href: '/admin/messages' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        {stats.map(({ label, value, icon: Icon, href }) => (
          <Link
            key={label}
            href={href}
            className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 hover:shadow-md hover:border-green-300 dark:hover:border-green-700/60 transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="inline-flex p-2.5 rounded-xl bg-green-100 dark:bg-green-900/40">
                <Icon className="h-6 w-6 text-green-600 dark:text-green-400" />
              </span>
            </div>
            <p className="text-3xl font-bold text-slate-900 dark:text-slate-100">{value}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{label}</p>
          </Link>
        ))}
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Recent Messages</h2>
          <Link href="/admin/messages" className="text-sm text-green-600 dark:text-green-400 hover:underline">
            View all
          </Link>
        </div>

        {recentMessages.length === 0 ? (
          <div className="text-center py-10 text-slate-500 dark:text-slate-400">
            <Inbox className="h-10 w-10 mx-auto mb-3 opacity-50" />
            <p>No messages yet.</p>
          </div>
        ) : (
          <ul className="divide-y divide-slate-100 dark:divide-slate-800">
            {recentMessages.map((m) => (
              <li key={m.id} className="py-3 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-medium text-slate-900 dark:text-slate-100 truncate">{m.subject}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 truncate">{m.name}</p>
                </div>
                <span
                  className={`shrink-0 px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                    STATUS_STYLES[m.status] ?? STATUS_STYLES.new
                  }`}
                >
                  {m.status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
