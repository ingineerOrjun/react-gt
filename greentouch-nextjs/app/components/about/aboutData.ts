// Content model for the About page sections. Server-safe. Honest, trust-building
// copy grounded in the real business (cleaning & hygiene products, bulk supply
// for institutions) — no invented history, statistics, people, or testimonials.
import {
  BadgeCheck,
  Building2,
  PackageCheck,
  Headphones,
  Target,
  Eye,
  HeartHandshake,
  Truck,
  TrendingUp,
  ShieldCheck,
  Sparkles,
  Factory,
  BedDouble,
  GraduationCap,
  HeartPulse,
  Building,
  Home,
  Footprints,
  GlassWater,
  Shirt,
  Droplets,
  SprayCan,
  type LucideIcon,
} from 'lucide-react';

export interface IconItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

// Hero trust bar.
export const TRUST_BAR: { icon: LucideIcon; label: string }[] = [
  { icon: BadgeCheck, label: 'Quality Focused' },
  { icon: Building2, label: 'Industry Trusted' },
  { icon: PackageCheck, label: 'Reliable Supply' },
  { icon: Headphones, label: 'Customer Support' },
];

// Section 2 — company story visual-card highlights.
export const STORY_POINTS: { icon: LucideIcon; label: string }[] = [
  { icon: ShieldCheck, label: 'Consistent, dependable quality' },
  { icon: PackageCheck, label: 'Reliable bulk supply' },
  { icon: Building2, label: 'Built for institutions & industry' },
];

// Section 3 — mission & vision.
export const MISSION = {
  icon: Target,
  title: 'Our Mission',
  lead: 'Deliver dependable chemical solutions.',
  body: 'To deliver dependable, high-quality cleaning and hygiene products that help homes, businesses, and industries maintain cleaner, safer, and healthier environments.',
};

export const VISION = {
  icon: Eye,
  title: 'Our Vision',
  lead: 'Become a trusted name in cleaning and hygiene products.',
  body: 'To be recognised as a trusted name in cleaning and hygiene — known for consistent quality, reliable supply, and genuine customer care.',
};

// Section 4 — core values.
export const CORE_VALUES: IconItem[] = [
  {
    icon: BadgeCheck,
    title: 'Quality First',
    description: 'We hold every product to consistent, dependable standards — batch after batch.',
  },
  {
    icon: HeartHandshake,
    title: 'Customer Commitment',
    description: 'Your needs guide what we make and how we support you.',
  },
  {
    icon: Truck,
    title: 'Reliability',
    description: 'Dependable supply and lead times you can plan your operations around.',
  },
  {
    icon: TrendingUp,
    title: 'Continuous Improvement',
    description: 'We keep refining our formulations and processes to serve you better.',
  },
];

// Section 5 — why customers choose GreenTouch.
export const WHY_CHOOSE: IconItem[] = [
  {
    icon: BadgeCheck,
    title: 'Consistent Product Quality',
    description: 'Formulations you can rely on to perform the same way, every order.',
  },
  {
    icon: Truck,
    title: 'Reliable Supply Chain',
    description: 'Dependable fulfilment for bulk and recurring requirements.',
  },
  {
    icon: Sparkles,
    title: 'Practical Product Solutions',
    description: 'Effective products designed for real-world cleaning and hygiene needs.',
  },
  {
    icon: Headphones,
    title: 'Responsive Support',
    description: 'A team that responds quickly and understands your account.',
  },
  {
    icon: Factory,
    title: 'Industry-Focused Products',
    description: 'Solutions suited to institutional, commercial, and industrial settings.',
  },
  {
    icon: HeartHandshake,
    title: 'Long-Term Relationships',
    description: 'We focus on dependable partnerships, not one-off transactions.',
  },
];

// Section 6 — industries served.
export const INDUSTRIES: IconItem[] = [
  { icon: BedDouble, title: 'Hospitality', description: 'Hotels and guest facilities maintaining clean, welcoming spaces.' },
  { icon: GraduationCap, title: 'Education', description: 'Schools and campuses keeping environments safe and hygienic.' },
  { icon: HeartPulse, title: 'Healthcare', description: 'Facilities that depend on consistent hygiene standards.' },
  { icon: Building, title: 'Commercial Buildings', description: 'Offices and shared spaces kept clean and presentable.' },
  { icon: Factory, title: 'Manufacturing', description: 'Industrial sites needing dependable cleaning supply.' },
  { icon: Home, title: 'Residential', description: 'Everyday cleaning and hygiene for households.' },
];

// Section 7 — product categories (link to /products).
export const PRODUCT_CATEGORIES: IconItem[] = [
  { icon: Footprints, title: 'Floor Care', description: 'Cleaners and finishes for everyday and heavy-duty floors.' },
  { icon: Sparkles, title: 'Surface Care', description: 'Effective cleaning for a wide range of surfaces.' },
  { icon: GlassWater, title: 'Glass Cleaning', description: 'Streak-free clarity for glass and mirrors.' },
  { icon: Shirt, title: 'Laundry Solutions', description: 'Dependable detergents and laundry care.' },
  { icon: Droplets, title: 'Hygiene Products', description: 'Everyday hygiene essentials for safer spaces.' },
  { icon: SprayCan, title: 'Industrial Cleaning', description: 'Heavy-duty solutions for demanding environments.' },
];

// Section 8 — commitment to quality checklist.
export const QUALITY_POINTS: { title: string; description: string }[] = [
  {
    title: 'Product Consistency',
    description: 'Formulations made to perform the same way, batch after batch.',
  },
  {
    title: 'Quality Control',
    description: 'Careful checks so what reaches you meets our standards.',
  },
  {
    title: 'Customer-Focused Development',
    description: 'Products shaped by real customer and industry requirements.',
  },
  {
    title: 'Safety & Performance',
    description: 'Built to clean effectively while keeping safety in mind.',
  },
];
