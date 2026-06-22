// Live runtime verification probe (anon/publishable key, RLS-bound).
// Run: node --env-file=.env.local supabase/probe.mjs
import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const sb = createClient(url, key, { auth: { persistSession: false } });

const out = (label, ok, detail) => console.log(`${ok ? 'PASS' : ok === null ? 'INFO' : 'FAIL'} | ${label} | ${detail}`);

async function main() {
  console.log(`Target: ${url}\n`);

  // 1. Connection + schema: products table
  {
    const { data, error } = await sb.from('products').select('id').limit(1);
    if (error) out('schema.products', false, `${error.code || ''} ${error.message}`);
    else out('schema.products', true, `reachable, ${data.length} row(s) visible to anon`);
  }
  // 2. blogs
  {
    const { error } = await sb.from('blogs').select('id').limit(1);
    out('schema.blogs', !error, error ? `${error.code || ''} ${error.message}` : 'reachable');
  }
  // 3. site_settings (public read)
  {
    const { data, error } = await sb.from('site_settings').select('site_title').limit(1);
    out('schema.site_settings', !error, error ? `${error.code || ''} ${error.message}` : `title="${data?.[0]?.site_title ?? '(none)'}"`);
  }
  // 4. RLS: anon must NOT read contact_messages
  {
    const { data, error } = await sb.from('contact_messages').select('id').limit(1);
    if (error) out('rls.contact_read_denied', null, `error (${error.code}): ${error.message}`);
    else out('rls.contact_read_denied', data.length === 0, `anon saw ${data.length} message row(s) (expected 0)`);
  }
  // 5. RLS: anon CAN insert a contact message (status defaults to 'new')
  {
    const { error } = await sb.from('contact_messages').insert({
      name: 'RLS Probe', email: 'probe@greentouch.test', subject: 'Runtime verification', message: 'Automated probe insert — safe to delete.',
    });
    out('rls.contact_insert_allowed', !error, error ? `${error.code || ''} ${error.message}` : 'insert accepted');
  }
  // 6. RLS: anon must NOT insert with a non-new status
  {
    const { error } = await sb.from('contact_messages').insert({
      name: 'RLS Probe', email: 'probe@greentouch.test', subject: 'bad status', message: 'should be rejected', status: 'archived',
    });
    out('rls.contact_insert_status_guard', !!error, error ? `correctly rejected (${error.code})` : 'WROTE archived row (RLS hole!)');
  }
  // 7. Auth endpoint reachable
  {
    const { error } = await sb.auth.signInWithPassword({ email: 'noone@greentouch.test', password: 'wrongpass123' });
    out('auth.reachable', !!error, error ? `endpoint up (${error.message})` : 'unexpected success');
  }
}

main().catch((e) => { console.error('PROBE CRASH:', e); process.exit(1); });
