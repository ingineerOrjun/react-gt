// Navigation links
export const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Products', path: '/products' },
  { label: 'About', path: '/about' },
  { label: 'Blog', path: '/blog' },
  { label: 'Contact', path: '/contact' },
];

// Footer links
export const FOOTER_LINKS = {
  company: [
    { label: 'About Us', path: '/about' },
    { label: 'Blog', path: '/blog' },
    { label: 'Careers', path: '/careers' },
    { label: 'Contact', path: '/contact' },
  ],
  products: [
    { label: 'Industrial Solutions', path: '/products/industrial' },
    { label: 'Agricultural Products', path: '/products/agricultural' },
    { label: 'Cleaning Agents', path: '/products/cleaning' },
    { label: 'Water Treatment', path: '/products/water' },
    { label: 'Specialty Chemicals', path: '/products/specialty' },
  ],
  legal: [
    { label: 'Privacy Policy', path: '/privacy' },
    { label: 'Terms of Service', path: '/terms' },
    { label: 'Sitemap', path: '/sitemap' },
  ],
};

// Social media links
export const SOCIAL_LINKS = [
  { platform: 'Facebook', icon: 'facebook', url: 'https://facebook.com' },
  { platform: 'Twitter', icon: 'twitter', url: 'https://twitter.com' },
  { platform: 'LinkedIn', icon: 'linkedin', url: 'https://linkedin.com' },
  { platform: 'Instagram', icon: 'instagram', url: 'https://instagram.com' },
];

// Contact information (real company data). `phone` stays digits-only for
// tel:/wa.me links; `phoneDisplay` is the formatted form for UI.
export const CONTACT_INFO = {
  address: 'Dhalkebar, Mithila Municipality, Dhanusha, Nepal 45700',
  phone: '9801603296',
  phoneDisplay: '980-1603296',
  email: 'greentouch.np@gmail.com',
  hours: 'Monday - Friday: 9am - 5pm',
};

// Cities served (real service areas) — used for honest trust messaging.
export const SERVICE_AREAS = [
  'Lahan',
  'Rajbiraj',
  'Jaleshwar',
  'Birgunj',
  'Siraha',
  'Janakpur',
  'Malangwa',
  'Kalaiya',
];

// Product categories
export const PRODUCT_CATEGORIES = [
  'Eco Cleaners',
  'Industrial Solutions',
  'Sustainable Packaging',
  'Green Chemicals',
  'Biodegradable Products',
];

// Blog categories
export const BLOG_CATEGORIES = [
  'Sustainability',
  'Industry Insights',
  'Product Innovation',
  'Green Chemistry',
  'Company News',
  'Case Studies',
];

// Form validation messages
export const VALIDATION_MESSAGES = {
  required: 'This field is required',
  email: 'Please enter a valid email address',
  minLength: (length: number) => `Must be at least ${length} characters`,
  maxLength: (length: number) => `Must be at most ${length} characters`,
  phoneFormat: 'Please enter a valid phone number',
};

// API endpoints for client-side fetching
export const API_ENDPOINTS = {
  products: '/api/products',
  blog: '/api/blog',
  contact: '/api/contact',
  auth: '/api/auth',
};

// Site metadata for SEO
export const SITE_METADATA = {
  title: 'GreenTouch Chemicals Pvt. Ltd. - Sustainable Chemical Solutions',
  description: 'GreenTouch Chemicals Pvt. Ltd. provides eco-friendly and sustainable chemical solutions for businesses and consumers. Our products are designed to minimize environmental impact while delivering exceptional performance.',
  keywords: 'green chemicals, eco-friendly products, sustainable solutions, environmentally friendly, biodegradable, GreenTouch Chemicals Pvt. Ltd.',
  author: 'GreenTouch Chemicals Pvt. Ltd.',
  siteUrl: 'https://greentouchchemicals.com',
}; 