import { z } from 'zod';

const slug = z
  .string()
  .min(1)
  .max(200)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Use lowercase letters, numbers and single hyphens.');

export const loginSchema = z.object({
  email: z.string().email('Enter a valid email address.'),
  password: z.string().min(6, 'Password must be at least 6 characters.'),
});

export const productSchema = z.object({
  name: z.string().trim().min(1, 'Name is required.').max(160),
  slug,
  description: z.string().trim().min(1, 'Description is required.'),
  image_path: z.string().optional().nullable(),
  published: z.coerce.boolean().default(false),
  display_order: z.coerce.number().int().min(0).default(0),
});

export const blogSchema = z.object({
  title: z.string().trim().min(1, 'Title is required.').max(200),
  slug,
  excerpt: z.string().trim().min(1, 'Excerpt is required.').max(300),
  content: z.string().trim().min(1, 'Content is required.'),
  image_path: z.string().optional().nullable(),
  published: z.coerce.boolean().default(false),
  display_order: z.coerce.number().int().min(0).default(0),
});

export const contactSchema = z.object({
  name: z.string().trim().min(1, 'Name is required.').max(120),
  email: z.string().trim().email('Enter a valid email address.').max(160),
  // optional UI fields kept for the form; not persisted to the table:
  phone: z.string().trim().max(40).optional().or(z.literal('')),
  company: z.string().trim().max(160).optional().or(z.literal('')),
  subject: z.string().trim().min(1, 'Subject is required.').max(160),
  message: z.string().trim().min(10, 'Message must be at least 10 characters.').max(5000),
  // honeypot — must be empty (filled = bot)
  website: z.string().max(0).optional().or(z.literal('')),
  // Cloudflare Turnstile token; verified server-side before insert. Optional in
  // the schema so the form still validates when Turnstile is not configured.
  turnstileToken: z.string().max(2048).optional().or(z.literal('')),
});

export const messageStatusSchema = z.enum(['new', 'read', 'responded', 'archived']);

const urlOrEmpty = z.string().trim().url('Enter a valid URL.').max(300).optional().or(z.literal(''));

// Global Settings CMS (Phase 3) — scalar fields. Arrays (service areas, business
// hours) are parsed & validated in the action; social URLs validated here.
export const settingsSchema = z.object({
  company_name: z.string().trim().min(1, 'Company name is required.').max(160),
  company_tagline: z.string().trim().max(200).optional().or(z.literal('')),
  company_description: z.string().trim().max(1200).optional().or(z.literal('')),
  contact_email: z.string().trim().email('Enter a valid email address.').max(160),
  contact_phone: z.string().trim().regex(/^[0-9+\-\s]{7,20}$/, 'Enter a valid phone number.'),
  whatsapp: z.string().trim().regex(/^[0-9+\-\s]{0,20}$/, 'Enter a valid WhatsApp number.').optional().or(z.literal('')),
  address: z.string().trim().min(1, 'Address is required.').max(300),
  address_street: z.string().trim().max(160).optional().or(z.literal('')),
  address_municipality: z.string().trim().max(160).optional().or(z.literal('')),
  address_district: z.string().trim().max(160).optional().or(z.literal('')),
  address_postal_code: z.string().trim().max(20).optional().or(z.literal('')),
  address_country: z.string().trim().max(80).optional().or(z.literal('')),
  seo_title: z.string().trim().max(200).optional().or(z.literal('')),
  seo_description: z.string().trim().max(320).optional().or(z.literal('')),
  seo_keywords: z.string().trim().max(500).optional().or(z.literal('')),
  seo_og_image: urlOrEmpty,
  footer_copyright: z.string().trim().max(300).optional().or(z.literal('')),
  social_facebook: urlOrEmpty,
  social_twitter: urlOrEmpty,
  social_instagram: urlOrEmpty,
  social_linkedin: urlOrEmpty,
  social_youtube: urlOrEmpty,
  social_tiktok: urlOrEmpty,
});

export const siteSettingsSchema = z.object({
  site_title: z.string().trim().min(1).max(200),
  contact_email: z.string().trim().email().max(160),
  contact_phone: z.string().trim().max(40).optional().or(z.literal('')),
  address: z.string().trim().max(300).optional().or(z.literal('')),
  facebook_url: z.string().trim().url().optional().or(z.literal('')),
  twitter_url: z.string().trim().url().optional().or(z.literal('')),
  instagram_url: z.string().trim().url().optional().or(z.literal('')),
  linkedin_url: z.string().trim().url().optional().or(z.literal('')),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type ProductInput = z.infer<typeof productSchema>;
export type BlogInput = z.infer<typeof blogSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
