import { DEFAULT_SETTINGS } from './site-settings-defaults';

// Navigation links (consumed by the Navbar).
export const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Products', path: '/products' },
  { label: 'About', path: '/about' },
  { label: 'Blog', path: '/blog' },
  { label: 'Contact', path: '/contact' },
];

// Contact information. Derived from the single bootstrap source
// (DEFAULT_SETTINGS) so there is exactly ONE definition. Server components and
// SSR-critical paths read live values via getSiteSettings(); these constants are
// the synchronous fallback used by client components that can't await.
export const CONTACT_INFO = {
  address: DEFAULT_SETTINGS.address,
  phone: DEFAULT_SETTINGS.phone,
  phoneDisplay: DEFAULT_SETTINGS.phoneDisplay,
  email: DEFAULT_SETTINGS.email,
  hours: `${DEFAULT_SETTINGS.businessHours[0]?.label ?? 'Monday – Friday'}: ${DEFAULT_SETTINGS.businessHours[0]?.value ?? '9am – 5pm'}`,
};

// Cities served — single definition via DEFAULT_SETTINGS.
export const SERVICE_AREAS = DEFAULT_SETTINGS.serviceAreas;

// Product category labels (seed/reference list).
export const PRODUCT_CATEGORIES = [
  'Eco Cleaners',
  'Industrial Solutions',
  'Sustainable Packaging',
  'Green Chemicals',
  'Biodegradable Products',
];

// Form validation messages.
export const VALIDATION_MESSAGES = {
  required: 'This field is required',
  email: 'Please enter a valid email address',
  minLength: (length: number) => `Must be at least ${length} characters`,
  maxLength: (length: number) => `Must be at most ${length} characters`,
  phoneFormat: 'Please enter a valid phone number',
};
