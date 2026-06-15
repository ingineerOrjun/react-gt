// Seed image uploader (Sprint 2)
// Uploads the existing product photos (local files) and blog cover images
// (fetched from their current Unsplash sources) into the Supabase storage
// buckets, using the exact object keys referenced by 20260615090010_seed.sql.
//
// Requires SERVICE ROLE (bypasses RLS). NEVER run this in the browser/app.
//
// Usage (Node 20.6+ can load env via --env-file):
//   node --env-file=.env.local supabase/seed/upload-images.mjs
// or export NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY first.

import { createClient } from '@supabase/supabase-js';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE, {
  auth: { persistSession: false },
});

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = resolve(__dirname, '../../public');

// slug -> local file under public/images/products
const PRODUCTS = {
  'prithvi-phenyl': 'images/products/pd2.jpeg',
  'prithvi-liquid-blue': 'images/products/pd1.jpeg',
  'prithvi-tiles-cleaner': 'images/products/pd3.jpeg',
  'prithvi-glass-cleaner': 'images/products/pd4.jpeg',
  'prithvi-dishwash-liquid': 'images/products/pd5.jpeg',
  'prithvi-all-purpose-cleaner': 'images/products/bb.jpeg',
};

// slug -> remote source for the blog cover image
const BLOGS = {
  'sustainable-chemistry-innovations-for-a-green-future':
    'https://images.unsplash.com/photo-1616069954520-c883645aeec9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  'natural-compounds-revolutionizing-industrial-cleaning':
    'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  'environmental-impact-of-chemical-manufacturing':
    'https://images.unsplash.com/photo-1507668339897-8a035aa9527d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  'green-certification-for-chemical-products':
    'https://images.unsplash.com/photo-1617840517959-4530d92e525e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  'biodegradable-formulations-future-of-industrial-chemicals':
    'https://images.unsplash.com/photo-1566221880967-2d471ca5aef4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  'chemical-safety-best-practices':
    'https://images.unsplash.com/photo-1564889990214-28bae904cc9d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
};

async function upload(bucket, key, body, contentType) {
  const { error } = await supabase.storage
    .from(bucket)
    .upload(key, body, { contentType, upsert: true });
  if (error) {
    console.error(`  ✗ ${bucket}/${key}: ${error.message}`);
    return false;
  }
  console.log(`  ✓ ${bucket}/${key}`);
  return true;
}

async function run() {
  console.log('Uploading product images (local)…');
  for (const [slug, rel] of Object.entries(PRODUCTS)) {
    const buf = await readFile(resolve(publicDir, rel));
    await upload('products', `seed/${slug}.jpeg`, buf, 'image/jpeg');
  }

  console.log('Uploading blog images (remote)…');
  for (const [slug, url] of Object.entries(BLOGS)) {
    const res = await fetch(url);
    if (!res.ok) {
      console.error(`  ✗ fetch ${slug}: HTTP ${res.status}`);
      continue;
    }
    const buf = Buffer.from(await res.arrayBuffer());
    await upload('blogs', `seed/${slug}.jpg`, buf, 'image/jpeg');
  }

  console.log('Done.');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
