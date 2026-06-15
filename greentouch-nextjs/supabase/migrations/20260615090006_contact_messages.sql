-- 0006 | contact_messages
-- Public can INSERT (the contact form). Only admins can read/update/delete.

create table if not exists public.contact_messages (
  id         uuid primary key default gen_random_uuid(),
  name       text not null check (char_length(name) between 1 and 120),
  email      text not null check (char_length(email) <= 160
                                  and email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  subject    text not null check (char_length(subject) between 1 and 160),
  message    text not null check (char_length(message) between 1 and 5000),
  status     text not null default 'new'
               check (status in ('new', 'read', 'responded', 'archived')),
  created_at timestamptz not null default now()
);

create index if not exists contact_messages_status_idx
  on public.contact_messages (status, created_at desc);

alter table public.contact_messages enable row level security;
