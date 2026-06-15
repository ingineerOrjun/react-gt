-- 0001 | Extensions
-- pgcrypto provides gen_random_uuid(). On Supabase it is usually present already;
-- this makes the migration self-contained for a fresh/branch database.

create extension if not exists pgcrypto;
