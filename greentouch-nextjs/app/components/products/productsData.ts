// Content model for the Products page sections. Server-safe; keeps the section
// components presentational and reusable.
import {
  Leaf,
  Boxes,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Factory,
  Package,
  FlaskConical,
  Sprout,
  Droplets,
  GraduationCap,
  Building2,
  HeartPulse,
  BadgeCheck,
  Recycle,
  FileCheck,
  Award,
  type LucideIcon,
} from 'lucide-react';

export interface IconItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

// Hero trust badges.
export const PRODUCT_BADGES: { icon: LucideIcon; label: string }[] = [
  { icon: Leaf, label: 'Eco-Friendly' },
  { icon: Boxes, label: 'Bulk Supply' },
  { icon: ShieldCheck, label: 'Quality Assured' },
  { icon: SlidersHorizontal, label: 'Custom Formulations' },
];

// Section — value-proposition highlights.
export const PRODUCT_HIGHLIGHTS: IconItem[] = [
  {
    icon: Leaf,
    title: 'Eco-Friendly Formulations',
    description: 'Biodegradable, low-impact chemistry that performs without compromise.',
  },
  {
    icon: Boxes,
    title: 'Bulk & Recurring Supply',
    description: 'Reliable volume fulfilment for schools, hospitals, hotels, and facilities.',
  },
  {
    icon: ShieldCheck,
    title: 'Consistent Quality',
    description: 'Dependable, repeatable quality you can trust batch after batch.',
  },
  {
    icon: SlidersHorizontal,
    title: 'Custom Requirements',
    description: 'Tailored quantities and formulations for specialised use cases.',
  },
];

// Section — product categories (mirrors PRODUCT_CATEGORIES with icons + copy).
export const PRODUCT_CATEGORY_CARDS: IconItem[] = [
  {
    icon: Sparkles,
    title: 'Eco Cleaners',
    description: 'Surface, floor, and hygiene cleaners for everyday institutional use.',
  },
  {
    icon: Factory,
    title: 'Industrial Solutions',
    description: 'Heavy-duty formulations built for demanding industrial environments.',
  },
  {
    icon: Package,
    title: 'Sustainable Packaging',
    description: 'Responsible packaging options that reduce environmental impact.',
  },
  {
    icon: FlaskConical,
    title: 'Green Chemicals',
    description: 'Sustainable chemistry engineered for performance and safety.',
  },
  {
    icon: Leaf,
    title: 'Biodegradable Products',
    description: 'Products designed to break down cleanly and minimise residue.',
  },
];

// Section — industries served.
export const INDUSTRIES: IconItem[] = [
  { icon: HeartPulse, title: 'Pharmaceuticals', description: 'Hygiene and cleaning support for sensitive environments.' },
  { icon: Sprout, title: 'Agriculture', description: 'Solutions aligned with sustainable farming practices.' },
  { icon: Droplets, title: 'Water Treatment', description: 'Formulations supporting clean and safe water systems.' },
  { icon: Factory, title: 'Manufacturing', description: 'Dependable supply for production and facility upkeep.' },
  { icon: Building2, title: 'Hospitality', description: 'Cleaning and hygiene for hotels and commercial spaces.' },
  { icon: GraduationCap, title: 'Education', description: 'Safe, reliable supplies for schools and campuses.' },
];

// Section — why choose our products (quality & compliance).
export const WHY_PRODUCTS: IconItem[] = [
  {
    icon: BadgeCheck,
    title: 'Tested & Reliable',
    description: 'Formulations validated for consistent, real-world performance.',
  },
  {
    icon: Recycle,
    title: 'Sustainable by Design',
    description: 'Eco-conscious chemistry that lowers environmental impact.',
  },
  {
    icon: FileCheck,
    title: 'Documentation & SDS',
    description: 'Safety data sheets and specifications available on request.',
  },
  {
    icon: Award,
    title: 'Compliance Focused',
    description: 'Products developed with safety and standards in mind.',
  },
];

// Section — technical documentation list.
export const TECHNICAL_DOCS: string[] = [
  'Product Specifications',
  'Safety Data Sheets (SDS)',
  'Application Guidelines',
  'Compliance Certificates',
];
