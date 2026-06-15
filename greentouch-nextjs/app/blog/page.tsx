import React from 'react';
import { Metadata } from 'next';
import BlogPageContent from './BlogPageContent';
import { getPublishedBlogs } from '../lib/queries/public';

export const metadata: Metadata = {
  title: 'Blog - GreenTouch Chemicals Pvt. Ltd.',
  description:
    'Stay informed with the latest news, insights, and innovations in sustainable chemistry and eco-friendly solutions.',
};

export const revalidate = 60;

export default async function BlogPage() {
  const posts = await getPublishedBlogs();
  return (
    <div className="min-h-screen">
      <BlogPageContent posts={posts} />
    </div>
  );
}
