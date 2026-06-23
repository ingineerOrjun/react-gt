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
