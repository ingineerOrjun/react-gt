// Home-specific content. Shared trust/industry/why/category data is imported
// from aboutData to keep the site consistent and DRY.
import { Send, ClipboardCheck, Truck, Headphones, type LucideIcon } from 'lucide-react';

export interface IconItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

// How It Works — four-step B2B supply process.
export const HOW_IT_WORKS: IconItem[] = [
  {
    icon: Send,
    title: 'Share Your Requirements',
    description: 'Tell us what you need by form, phone, or WhatsApp.',
  },
  {
    icon: ClipboardCheck,
    title: 'Get a Tailored Quote',
    description: 'We review your needs and respond with pricing and availability.',
  },
  {
    icon: Truck,
    title: 'Reliable Supply',
    description: 'Receive dependable, scheduled delivery — bulk or standard.',
  },
  {
    icon: Headphones,
    title: 'Ongoing Support',
    description: 'Count on responsive support for repeat and recurring orders.',
  },
];
