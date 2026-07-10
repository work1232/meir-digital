-- ============================================================
-- Meir Digital — Supabase schema
-- Run this once in the Supabase SQL Editor (Dashboard → SQL Editor)
-- ============================================================

-- User profiles: one row per registered user, created automatically.
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  phone text,
  is_admin boolean not null default false,
  created_at timestamptz not null default now()
);

-- Inquiries submitted from the website contact form.
create table public.contact_messages (
  id bigint generated always as identity primary key,
  name text not null,
  phone text not null,
  message text not null,
  package text,
  status text not null default 'new' check (status in ('new', 'handled')),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.contact_messages enable row level security;

-- Security-definer helper so admin checks don't recurse into RLS.
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(
    (select is_admin from public.profiles where id = auth.uid()),
    false
  );
$$;

-- Profiles: users see/update their own row; admins see everyone.
create policy "profiles_select_own_or_admin"
  on public.profiles for select
  using (auth.uid() = id or public.is_admin());

create policy "profiles_update_own"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Users may edit their own profile, but never their own admin flag.
revoke update (is_admin) on public.profiles from anon, authenticated;

-- Contact messages: anyone can submit; only admins can read/update.
create policy "contact_messages_insert_anyone"
  on public.contact_messages for insert
  to anon, authenticated
  with check (true);

create policy "contact_messages_select_admin"
  on public.contact_messages for select
  using (public.is_admin());

create policy "contact_messages_update_admin"
  on public.contact_messages for update
  using (public.is_admin())
  with check (public.is_admin());

-- Auto-create a profile row when a user signs up.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, phone)
  values (
    new.id,
    new.raw_user_meta_data ->> 'full_name',
    new.raw_user_meta_data ->> 'phone'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================
-- After you register on the site, make yourself the admin:
-- (replace the email with the one you registered with)
-- ============================================================
-- update public.profiles set is_admin = true
-- where id = (select id from auth.users where email = 'meir558d@gmail.com');
