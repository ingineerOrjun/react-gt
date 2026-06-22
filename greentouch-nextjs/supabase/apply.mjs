// Applies supabase/apply-all.sql to the project's Postgres DB.
// Run: node --env-file=.env.local supabase/apply.mjs
// Reads credentials from env only (no secrets in this file).
import pg from 'pg';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const password = process.env.SUPABASE_DB_PASSWORD;
if (!url || !password) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_DB_PASSWORD');
  process.exit(1);
}

const ref = new URL(url).hostname.split('.')[0];
const host = `db.${ref}.supabase.co`;
const __dirname = dirname(fileURLToPath(import.meta.url));
const sql = readFileSync(resolve(__dirname, 'apply-all.sql'), 'utf8');

const client = new pg.Client({
  host,
  port: 5432,
  user: 'postgres',
  password,
  database: 'postgres',
  ssl: { rejectUnauthorized: false },
  connectionTimeoutMillis: 15000,
});

try {
  await client.connect();
  console.log(`Connected to ${host}`);
  await client.query(sql);
  console.log('SCHEMA APPLIED OK');
} catch (e) {
  console.error('APPLY FAILED:', e.code || '', e.message);
  process.exitCode = 1;
} finally {
  await client.end().catch(() => {});
}
