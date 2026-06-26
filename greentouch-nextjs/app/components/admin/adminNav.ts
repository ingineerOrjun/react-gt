import {
  LayoutDashboard,
  Package,
  Tags,
  Factory,
  FileText,
  ImageIcon,
  Quote,
  HelpCircle,
  Home,
  Info,
  Contact,
  Map,
  Search,
  Inbox,
  BarChart3,
  Settings,
  Users,
  type LucideIcon,
} from 'lucide-react';

export interface AdminNavItem {
  label: string;
  /** Live route. Omit (with `soon: true`) for modules not built yet. */
  href?: string;
  icon: LucideIcon;
  /** Renders disabled with a "Soon" pill until its phase ships. */
  soon?: boolean;
  /** Match exactly instead of by-prefix (used for the Dashboard root). */
  exact?: boolean;
}

export interface AdminNavSection {
  title?: string;
  items: AdminNavItem[];
}

// Single source of truth for the admin navigation. As each CMS phase ships, the
// matching item flips from `soon` to a real `href` — nothing else changes.
export const ADMIN_NAV: AdminNavSection[] = [
  { items: [{ label: 'Dashboard', href: '/admin', icon: LayoutDashboard, exact: true }] },
  {
    title: 'Content',
    items: [
      { label: 'Products', href: '/admin/products', icon: Package },
      { label: 'Categories', icon: Tags, soon: true },
      { label: 'Industries', icon: Factory, soon: true },
      { label: 'Blog', href: '/admin/blogs', icon: FileText },
      { label: 'Media Library', icon: ImageIcon, soon: true },
      { label: 'Testimonials', icon: Quote, soon: true },
      { label: 'FAQs', icon: HelpCircle, soon: true },
    ],
  },
  {
    title: 'Site',
    items: [
      { label: 'Homepage', icon: Home, soon: true },
      { label: 'About', icon: Info, soon: true },
      { label: 'Contact Info', icon: Contact, soon: true },
      { label: 'Service Areas', icon: Map, soon: true },
      { label: 'SEO', icon: Search, soon: true },
    ],
  },
  {
    title: 'Engage',
    items: [
      { label: 'Leads', href: '/admin/messages', icon: Inbox },
      { label: 'Analytics', icon: BarChart3, soon: true },
    ],
  },
  {
    title: 'System',
    items: [
      { label: 'Settings', icon: Settings, soon: true },
      { label: 'Users', icon: Users, soon: true },
    ],
  },
];

// Flat list of live, navigable destinations — feeds the command palette and
// breadcrumb label lookup. Includes nested create routes.
export const ADMIN_DESTINATIONS: { label: string; href: string; icon: LucideIcon }[] = [
  ...ADMIN_NAV.flatMap((s) =>
    s.items.filter((i) => i.href && !i.soon).map((i) => ({ label: i.label, href: i.href!, icon: i.icon })),
  ),
  { label: 'New Product', href: '/admin/products/new', icon: Package },
  { label: 'New Blog Post', href: '/admin/blogs/new', icon: FileText },
];

// Path-segment → human label, for breadcrumbs.
export const ADMIN_SEGMENT_LABELS: Record<string, string> = {
  admin: 'Dashboard',
  products: 'Products',
  blogs: 'Blog',
  messages: 'Leads',
  new: 'New',
  edit: 'Edit',
};
