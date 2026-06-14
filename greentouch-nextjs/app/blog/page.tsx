import React from 'react';
import { Metadata } from 'next';
import BlogPageContent from './BlogPageContent';

export const metadata: Metadata = {
  title: 'Blog - GreenTouch Chemical Industries Private Limited',
  description: 'Stay informed with the latest news, insights, and innovations in sustainable chemistry and eco-friendly solutions.',
};

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      <BlogPageContent />
    </div>
  );
} 