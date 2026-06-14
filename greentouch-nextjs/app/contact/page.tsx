import { Metadata } from 'next';
import dynamic from 'next/dynamic';

// Use dynamic import with no SSR to ensure the client component is loaded correctly
const ContactPageClient = dynamic(() => import('./ContactPageClient'), { ssr: false });

export const metadata: Metadata = {
  title: 'Contact Us | GreenTouch Chemicals Pvt. Ltd.',
  description: 'Get in touch with our team for inquiries about our eco-friendly chemical solutions, partnerships, or sustainability initiatives.',
};

export default function ContactPage() {
  return (
    <ContactPageClient />
  );
} 