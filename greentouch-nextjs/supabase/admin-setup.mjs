// Creates (idempotently) a confirmed admin auth user directly in Postgres, then
// verifies login via the public API. Run: node --env-file=.env.local supabase/admin-setup.mjs
import pg from 'pg';
import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const password = process.env.SUPABASE_DB_PASSWORD;

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
  console.error('Set ADMIN_EMAIL and ADMIN_PASSWORD in .env.local');
  process.exit(1);
}

const ref = new URL(url).hostname.split('.')[0];
const client = new pg.Client({
  host: `db.${ref}.supabase.co`,
  port: 5432,
  user: 'postgres',
  password,
  database: 'postgres',
  ssl: { rejectUnauthorized: false },
  connectionTimeoutMillis: 15000,
});

const sql = `
do $$
declare uid uuid := gen_random_uuid();
begin
  delete from auth.users where email = '${ADMIN_EMAIL}';
  insert into auth.users (
    instance_id, id, aud, role, email, encrypted_password,
    email_confirmed_at, raw_app_meta_data, raw_user_meta_data,
    created_at, updated_at, confirmation_token, email_change,
    email_change_token_new, recovery_token
  ) values (
    '00000000-0000-0000-0000-000000000000', uid, 'authenticated', 'authenticated',
    '${ADMIN_EMAIL}', crypt('${ADMIN_PASSWORD}', gen_salt('bf')),
    now(), '{"provider":"email","providers":["email"]}', '{"full_name":"GreenTouch Admin"}',
    now(), now(), '', '', '', ''
  );
  insert into auth.identities (id, provider_id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at)
  values (gen_random_uuid(), uid::text, uid,
    json_build_object('sub', uid::text, 'email', '${ADMIN_EMAIL}')::jsonb,
    'email', now(), now(), now());
end $$;
`;

try {
  await client.connect();
  await client.query(sql);
  const { rows } = await client.query(
    `select p.id, p.role from public.profiles p join auth.users u on u.id = p.id where u.email = $1`,
    [ADMIN_EMAIL]
  );
  console.log(`DB: admin user created; profile role = ${rows[0]?.role ?? '(MISSING — trigger failed)'}`);
} catch (e) {
  console.error('DB SETUP FAILED:', e.message);
  process.exit(1);
} finally {
  await client.end().catch(() => {});
}

// Verify login through the public API (the real auth path the app uses).
const sb = createClient(url, anon, { auth: { persistSession: false } });
const { data, error } = await sb.auth.signInWithPassword({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD });
if (error) console.error(`LOGIN VERIFY: FAIL — ${error.message}`);
else console.log(`LOGIN VERIFY: PASS — session for ${data.user.email} (uid ${data.user.id.slice(0, 8)}…)`);
console.log(`\nAdmin credentials: ${ADMIN_EMAIL} / ${ADMIN_PASSWORD}`);
