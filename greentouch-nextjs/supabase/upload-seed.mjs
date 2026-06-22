// Uploads seed images to match the keys in 0010_seed.sql, authenticated as the
// admin user (staff write RLS). Run: node --env-file=.env.local supabase/upload-seed.mjs
import { createClient } from '@supabase/supabase-js';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = resolve(__dirname, '../public');

const PRODUCTS = {
  'prithvi-phenyl': 'images/products/pd2.jpeg',
  'prithvi-liquid-blue': 'images/products/pd1.jpeg',
  'prithvi-tiles-cleaner': 'images/products/pd3.jpeg',
  'prithvi-glass-cleaner': 'images/products/pd4.jpeg',
  'prithvi-dishwash-liquid': 'images/products/pd5.jpeg',
  'prithvi-all-purpose-cleaner': 'images/products/bb.jpeg',
};
const BLOGS = {
  'sustainable-chemistry-innovations-for-a-green-future': 'https://images.unsplash.com/photo-1616069954520-c883645aeec9?auto=format&fit=crop&w=1200&q=80',
  'natural-compounds-revolutionizing-industrial-cleaning': 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1200&q=80',
  'environmental-impact-of-chemical-manufacturing': 'https://images.unsplash.com/photo-1507668339897-8a035aa9527d?auto=format&fit=crop&w=1200&q=80',
  'green-certification-for-chemical-products': 'https://images.unsplash.com/photo-1617840517959-4530d92e525e?auto=format&fit=crop&w=1200&q=80',
  'biodegradable-formulations-future-of-industrial-chemicals': 'https://images.unsplash.com/photo-1566221880967-2d471ca5aef4?auto=format&fit=crop&w=1200&q=80',
  'chemical-safety-best-practices': 'https://images.unsplash.com/photo-1564889990214-28bae904cc9d?auto=format&fit=crop&w=1200&q=80',
};

const sb = createClient(url, anon, { auth: { persistSession: false } });
const { error: loginErr } = await sb.auth.signInWithPassword({ email: process.env.ADMIN_EMAIL, password: process.env.ADMIN_PASSWORD });
if (loginErr) { console.error('login failed:', loginErr.message); process.exit(1); }

const up = async (bucket, key, body, ct) => {
  const { error } = await sb.storage.from(bucket).upload(key, body, { contentType: ct, upsert: true });
  console.log(`${error ? '✗' : '✓'} ${bucket}/${key}${error ? ' — ' + error.message : ''}`);
};

for (const [slug, rel] of Object.entries(PRODUCTS)) {
  await up('products', `seed/${slug}.jpeg`, await readFile(resolve(publicDir, rel)), 'image/jpeg');
}
for (const [slug, u] of Object.entries(BLOGS)) {
  const r = await fetch(u);
  if (!r.ok) { console.log(`✗ blog ${slug} fetch ${r.status}`); continue; }
  await up('blogs', `seed/${slug}.jpg`, Buffer.from(await r.arrayBuffer()), 'image/jpeg');
}
await sb.auth.signOut();
console.log('done');
