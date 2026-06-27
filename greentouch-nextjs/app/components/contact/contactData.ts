// Content model for the Contact page sections. Keeping copy + icons in one
// server-safe module keeps the section components presentational and reusable.
import {
  Zap,
  PackageCheck,
  ShieldCheck,
  Headphones,
  Phone,
  Mail,
  MapPin,
  BadgeCheck,
  Boxes,
  Truck,
  SlidersHorizontal,
  Send,
  ClipboardCheck,
  MessageSquare,
  ReceiptText,
  GraduationCap,
  Building2,
  Droplets,
  HeartHandshake,
  type LucideIcon,
} from 'lucide-react';
import type { SiteSettings } from '../../lib/site-settings-defaults';

export interface IconItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

// Hero trust badges.
export const TRUST_BADGES: { icon: LucideIcon; label: string }[] = [
  { icon: Zap, label: 'Fast Response' },
  { icon: PackageCheck, label: 'Reliable Supply' },
  { icon: ShieldCheck, label: 'Quality Assured' },
  { icon: Headphones, label: 'Customer Support' },
];

// Section 2 — contact options grid. Built from the database single source of
// truth (settings) so phone/email/address stay in sync everywhere.
export interface ContactOption {
  icon: LucideIcon;
  title: string;
  value: string;
  description: string;
  href?: string;
  external?: boolean;
}

export function buildContactOptions(s: SiteSettings): ContactOption[] {
  return [
    {
      icon: Phone,
      title: 'Call Us',
      value: s.phone,
      description: 'Speak directly with our supply team for quick answers and availability.',
      href: `tel:${s.phone}`,
    },
    {
      icon: Mail,
      title: 'Email Us',
      value: s.email,
      description: 'Send your requirements and we will respond with a tailored quotation.',
      href: `mailto:${s.email}`,
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      value: s.address,
      description: `Meet our team at our facility in ${s.addressStreet}, ${s.addressDistrict}.`,
      href: 'https://www.google.com/maps/search/?api=1&query=Dhalkebar+Mithila+Municipality+Dhanusha+Nepal',
      external: true,
    },
  ];
}

// Section 4 — why businesses choose GreenTouch.
export const WHY_CHOOSE: IconItem[] = [
  {
    icon: BadgeCheck,
    title: 'Reliable Product Quality',
    description: 'Consistent, dependable formulations you can trust batch after batch.',
  },
  {
    icon: Boxes,
    title: 'Bulk Supply Capability',
    description: 'Volume and recurring orders fulfilled smoothly for institutions and facilities.',
  },
  {
    icon: Truck,
    title: 'Timely Delivery',
    description: 'Dependable lead times that keep your operations running without interruption.',
  },
  {
    icon: Headphones,
    title: 'Dedicated Customer Support',
    description: 'A responsive team that understands your account and your requirements.',
  },
  {
    icon: SlidersHorizontal,
    title: 'Custom Requirements Handling',
    description: 'Tailored quantities and specifications for specialised use cases.',
  },
];

// Section 5 — inquiry process timeline.
export const INQUIRY_STEPS: IconItem[] = [
  {
    icon: Send,
    title: 'Submit Inquiry',
    description: 'Share your requirements through the form or a quick call.',
  },
  {
    icon: ClipboardCheck,
    title: 'We Review Requirements',
    description: 'Our team assesses products, quantities, and delivery needs.',
  },
  {
    icon: MessageSquare,
    title: 'Consultation',
    description: 'We discuss specifications and recommend the right solutions.',
  },
  {
    icon: ReceiptText,
    title: 'Quotation & Supply',
    description: 'Receive a clear quote and reliable, scheduled supply.',
  },
];

// Section 6 — FAQs.
export const CONTACT_FAQS: { question: string; answer: string }[] = [
  {
    question: 'Do you supply in bulk?',
    answer:
      'Yes. We regularly fulfil bulk and recurring orders for institutions, facilities, and businesses. Share your expected volumes and we will confirm availability and lead times.',
  },
  {
    question: 'Do you serve schools and institutions?',
    answer:
      'Absolutely. Schools, hospitals, hotels, offices, and industrial facilities are among the organisations we supply with cleaning and hygiene solutions.',
  },
  {
    question: 'How quickly do you respond?',
    answer:
      'We typically respond to inquiries within 24 hours on business days. For urgent requirements, calling us directly is the fastest route to an answer.',
  },
  {
    question: 'Can I request custom quantities?',
    answer:
      'Yes. We accommodate custom quantities and specific requirements wherever possible — just let us know what you need in your inquiry.',
  },
];

// Section 8 — social proof / credibility (no fabricated stats or testimonials).
export const SOCIAL_PROOF: IconItem[] = [
  {
    icon: GraduationCap,
    title: 'Trusted by Educational Institutions',
    description: 'Cleaning and hygiene supplies for schools and campuses.',
  },
  {
    icon: Building2,
    title: 'Serving Commercial Facilities',
    description: 'Hotels, offices, and industrial sites rely on our products.',
  },
  {
    icon: Droplets,
    title: 'Quality Cleaning Solutions',
    description: 'Effective formulations built for real-world performance.',
  },
  {
    icon: HeartHandshake,
    title: 'Customer-Focused Support',
    description: 'A partnership approach to every order and account.',
  },
];
