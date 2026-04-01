-- Migration: create purchases table for prompt store
-- Run via: supabase db push --project-ref jpfmfvivpywoxywbgxuc

create table if not exists purchases (
  id                  uuid primary key default gen_random_uuid(),
  email               text not null,
  pack_id             text not null,
  pack_title          text,
  stripe_session_id   text unique not null,
  amount_paid         numeric(10,2),
  download_expires_at timestamptz,
  created_at          timestamptz default now()
);

-- Index for fast session lookups
create index if not exists purchases_stripe_session_id_idx
  on purchases (stripe_session_id);

-- Index for customer email lookups
create index if not exists purchases_email_idx
  on purchases (email);
