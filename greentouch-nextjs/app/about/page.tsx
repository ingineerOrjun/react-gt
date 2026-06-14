import React from 'react';
import { Metadata } from 'next';
import AboutPageContent from './AboutPageContent';

export const metadata: Metadata = {
  title: 'About Us - GreenTouch Chemicals Pvt. Ltd.',
  description: 'Learn about GreenTouch Chemicals Pvt. Ltd.: our story, mission, values, and commitment to sustainable chemical solutions.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <AboutPageContent />
    </div>
  );
} 