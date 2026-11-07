-- Phase 3: document requests (Compliance page) and partner enquiries.
-- Same locked table; only the submit-enquiry Edge Function writes to it.

alter table public.enquiries drop constraint enquiries_kind_check;
alter table public.enquiries
  add constraint enquiries_kind_check check (kind in ('quote', 'support', 'documents', 'partner'));

alter table public.enquiries
  add column documents text[] check (cardinality(documents) <= 20),
  add column tender_reference text check (char_length(tender_reference) <= 160),
  add column partner_type text check (char_length(partner_type) <= 80);
