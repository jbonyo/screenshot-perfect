-- Quote requests and support requests from the website.
-- Locked down: row level security is on with no policies, and the public roles
-- have no table privileges, so only the submit-enquiry Edge Function (service
-- role) can add rows. Owners read them in the Supabase dashboard.

create table public.enquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  kind text not null check (kind in ('quote', 'support')),
  status text not null default 'new' check (status in ('new', 'contacted', 'closed', 'spam')),

  -- Quote details
  service text check (char_length(service) <= 80),
  site_survey boolean not null default false,
  building_type text check (char_length(building_type) <= 80),
  rooms integer check (rooms between 0 and 10000),
  floors_or_screens integer check (floors_or_screens between 0 and 10000),
  timeline text check (char_length(timeline) <= 80),

  -- Support details
  urgency text check (urgency in ('critical', 'high', 'normal')),

  -- Shared
  location text check (char_length(location) <= 120),
  details text check (char_length(details) <= 4000),
  name text not null check (char_length(name) between 2 and 120),
  organisation text check (char_length(organisation) <= 160),
  email text check (char_length(email) <= 254),
  phone text check (char_length(phone) <= 40),
  preferred_contact text check (preferred_contact in ('call', 'whatsapp', 'email')),
  consent boolean not null check (consent),

  -- Spam control: keyed hash of the sender's IP, never the IP itself.
  ip_hash text,
  email_sent boolean not null default false,

  constraint contact_present check (email is not null or phone is not null)
);

comment on table public.enquiries is
  'Website quote and support requests. Written only by the submit-enquiry Edge Function.';

create index enquiries_ip_hash_created_at_idx on public.enquiries (ip_hash, created_at desc);
create index enquiries_created_at_idx on public.enquiries (created_at desc);

alter table public.enquiries enable row level security;
revoke all on table public.enquiries from anon, authenticated;
