// Content for the product detail sections. The product schema stores only
// name/description/image, so benefits, applications, usage, packaging, and
// safety notes are honest, generic framing — not invented per-product
// specifications or claims. Guidance defers to the product label and SDS.
import {
  ShieldCheck,
  Sparkles,
  Boxes,
  Leaf,
  GraduationCap,
  Building2,
  BedDouble,
  Factory,
  HeartPulse,
  Home,
  BookOpen,
  Beaker,
  Droplets,
  PackageCheck,
  type LucideIcon,
} from 'lucide-react';

export interface IconItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

// Key benefits — used both as the hero summary list and the Key Benefits section.
export const KEY_BENEFITS: IconItem[] = [
  {
    icon: ShieldCheck,
    title: 'Consistent Quality',
    description: 'Dependable performance you can rely on, batch after batch.',
  },
  {
    icon: Sparkles,
    title: 'Effective Cleaning',
    description: 'Formulated to handle everyday cleaning and hygiene tasks.',
  },
  {
    icon: Boxes,
    title: 'Bulk Supply Ready',
    description: 'Available in volume for institutions and facilities.',
  },
  {
    icon: Leaf,
    title: 'Eco-Conscious',
    description: 'Made with a lighter environmental footprint in mind.',
  },
];

// Recommended applications.
export const APPLICATIONS: IconItem[] = [
  { icon: GraduationCap, title: 'Schools & Institutions', description: 'Classrooms, campuses, and shared facilities.' },
  { icon: Building2, title: 'Commercial Facilities', description: 'Offices, retail, and commercial buildings.' },
  { icon: BedDouble, title: 'Hospitality', description: 'Hotels and guest-facing environments.' },
  { icon: Factory, title: 'Industrial Sites', description: 'Manufacturing and facility upkeep.' },
  { icon: HeartPulse, title: 'Healthcare Settings', description: 'Spaces that depend on hygiene standards.' },
  { icon: Home, title: 'Residential Use', description: 'Everyday household cleaning and hygiene.' },
];

// Usage instructions (numbered steps; honest, label-deferring).
export const USAGE_STEPS: IconItem[] = [
  {
    icon: BookOpen,
    title: 'Follow the Label',
    description: 'Always read and follow the directions and dosage on the product label.',
  },
  {
    icon: Beaker,
    title: 'Dilute as Directed',
    description: 'Use the recommended dilution for the surface and task at hand.',
  },
  {
    icon: Droplets,
    title: 'Test First',
    description: 'Try on a small, inconspicuous area before full application.',
  },
  {
    icon: PackageCheck,
    title: 'Store Safely',
    description: 'Reseal after use and store in a cool, dry place.',
  },
];

// Packaging information (honest, generic).
export const PACKAGING_INFO: string[] = [
  'Available in multiple pack sizes to suit different needs.',
  'Bulk and custom packaging available on request.',
  'Standard quantities for regular and recurring orders.',
];

// Safety notes (honest, generic; defers to SDS).
export const SAFETY_NOTES: string[] = [
  'Keep out of reach of children.',
  'Avoid contact with eyes; rinse thoroughly with water if contact occurs.',
  'Store in a cool, dry place away from direct sunlight.',
  'Safety Data Sheets (SDS) are available on request.',
];
