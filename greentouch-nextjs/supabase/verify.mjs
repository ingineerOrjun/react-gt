// Authenticated end-to-end verification (signs in as admin, exercises RLS write
// paths + storage). Run: node --env-file=.env.local supabase/verify.mjs
import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const ADMIN = { email: process.env.ADMIN_EMAIL, password: process.env.ADMIN_PASSWORD };

const log = (ok, label, detail = '') => console.log(`${ok ? 'PASS' : 'FAIL'} | ${label}${detail ? ' | ' + detail : ''}`);
const PNG_1x1 = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
  'base64'
);

const admin = createClient(url, anon, { auth: { persistSession: false } });

async function main() {
  const { data: session, error: loginErr } = await admin.auth.signInWithPassword(ADMIN);
  log(!loginErr, 'auth.login', loginErr ? loginErr.message : session.user.email);
  if (loginErr) return;

  // ---- PRODUCT CRUD + storage ----
  await admin.from('products').delete().eq('slug', 'verify-product');
  const { data: prod, error: pErr } = await admin
    .from('products')
    .insert({ name: 'Verify Product', slug: 'verify-product', description: 'temp', published: true, published_at: new Date().toISOString(), display_order: 99 })
    .select('id')
    .single();
  log(!pErr && !!prod, 'product.create', pErr?.message);
  const pid = prod?.id;

  if (pid) {
    const { error: upd } = await admin.from('products').update({ name: 'Verify Product (edited)' }).eq('id', pid);
    log(!upd, 'product.update', upd?.message);

    const { error: tog } = await admin.from('products').update({ published: false }).eq('id', pid);
    log(!tog, 'product.toggle_publish', tog?.message);

    const key = `${pid}/verify.png`;
    const { error: upErr } = await admin.storage.from('products').upload(key, PNG_1x1, { contentType: 'image/png', upsert: true });
    log(!upErr, 'storage.upload_as_admin', upErr?.message);

    // public read of the object URL
    const pub = admin.storage.from('products').getPublicUrl(key).data.publicUrl;
    const headOk = (await fetch(pub)).ok;
    log(headOk, 'storage.public_read', pub.split('/storage')[1]);

    const { error: rmErr } = await admin.storage.from('products').remove([key]);
    log(!rmErr, 'storage.delete_as_admin', rmErr?.message);

    const { error: delErr } = await admin.from('products').delete().eq('id', pid);
    log(!delErr, 'product.delete', delErr?.message);
  }

  // ---- BLOG CRUD ----
  await admin.from('blogs').delete().eq('slug', 'verify-blog');
  const { data: blog, error: bErr } = await admin
    .from('blogs')
    .insert({ title: 'Verify Blog', slug: 'verify-blog', excerpt: 'temp excerpt', content: '<p>Hello <strong>world</strong></p>', published: true, published_at: new Date().toISOString(), display_order: 99 })
    .select('id')
    .single();
  log(!bErr && !!blog, 'blog.create', bErr?.message);
  if (blog?.id) {
    // anon can read the published blog by slug
    const anonClient = createClient(url, anon, { auth: { persistSession: false } });
    const { data: pubBlog } = await anonClient.from('blogs').select('title').eq('slug', 'verify-blog').eq('published', true).maybeSingle();
    log(!!pubBlog, 'blog.public_read_published', pubBlog?.title);
    const { error: bdel } = await admin.from('blogs').delete().eq('id', blog.id);
    log(!bdel, 'blog.delete', bdel?.message);
  }

  // ---- MESSAGES (admin read/update/delete) ----
  const { data: msgs, error: mErr } = await admin.from('contact_messages').select('id, status').order('created_at', { ascending: false });
  log(!mErr, 'messages.admin_read', mErr ? mErr.message : `${msgs?.length ?? 0} message(s) visible to admin`);
  if (msgs && msgs.length) {
    const { error: msErr } = await admin.from('contact_messages').update({ status: 'read' }).eq('id', msgs[0].id);
    log(!msErr, 'messages.status_change', msErr?.message);
    const { error: mdErr } = await admin.from('contact_messages').delete().eq('id', msgs[0].id);
    log(!mdErr, 'messages.delete', mdErr?.message);
  }

  await admin.auth.signOut();
}

main().catch((e) => { console.error('VERIFY CRASH:', e); process.exit(1); });
