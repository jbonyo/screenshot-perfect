# Phase 2 report: conversion (enquiries, WhatsApp, analytics, legal pages)

Completed 7 November 2026. Merged into `main` and pushed (`59206fd`); Lovable synced the same commit.

## What was built

| Item                     | Where                                       | Notes                                                                                                     |
| ------------------------ | ------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| Quote wizard (3 steps)   | `/contact`                                  | Service and free site survey; site details; contact. `?service=` pre-selects from the Services page.      |
| Support request form     | `/support`                                  | Urgency, location, fault, contact. Linked from the footer, Contact page and Maintenance service.          |
| Enquiry backend          | Supabase `aakehgdlubuzjdswzuvk` (Ireland)   | Locked table; Edge Function validates, filters spam, stores, emails via Resend. See `supabase/README.md`. |
| WhatsApp click-to-chat   | Services, mobile bar, contact links         | Pre-filled message per service.                                                                           |
| Cookieless analytics     | Umami Cloud, ID in `src/content/site.ts`    | Page views plus `quote_submitted`, `support_submitted`, `call_click`, `whatsapp_click`, `email_click`.    |
| Privacy Policy and Terms | `/privacy`, `/terms`                        | Kenya Data Protection Act, 2019. Marked as not yet reviewed by a legal adviser.                           |
| Keep-alive               | `.github/workflows/keep-supabase-awake.yml` | Daily ping so the free Supabase project is not paused. Runs once merged into `main`.                      |

Owner answers used: reply within one business day; site surveys free; enquiries kept
24 months. No ODPC registration number is shown (registration not yet held).

## Tests

- After merging: the owner browsed the Lovable preview on their phone and found it
  working (no submissions). A TEST quote sent through the hosted preview was stored,
  emailed and showed the thank-you message, with no console errors; test row deleted.
  The daily keep-alive workflow is registered and active on GitHub.
- End-to-end in a real browser against the live backend, 24 of 24 pass: step
  validation, error summary focus and order, focus moving between steps, Back/Next
  keeping data, thank-you focus, service pre-selection, support form, honeypot dropped,
  sitemap, Umami loaded, pre-filled WhatsApp link, no duplicate ids, no console errors.
- Database check: every field arrives as entered; both test enquiries were emailed
  (`email_sent = true`); the honeypot submission was not stored. Test rows deleted.
- Backend: invalid input and missing consent rejected with clear messages; honeypot,
  too-fast and missing-timing submissions dropped silently; 6th request in an hour
  refused; daily ping returns OK. Security advisor: only the intended "RLS on, no
  policies" note.
- Keyboard test still 11 of 11 across all seven pages; no empty grid cells at any width.
- Lint 0 errors, typecheck, unit tests and build pass.

## Bugs found and fixed during testing

1. The spam timing check compared the visitor's device clock with the server's; a
   phone with the wrong time could be treated as spam. It now measures fill time on
   the device.
2. Two elements on the Contact page shared the id `details`, which sent typing and
   error links to the wrong field and lost the "Number of screens" value.
3. The five service choices left an empty box in the two-column layout; the last
   choice now spans the row.

## Scores (Lighthouse, local build with compression, home page)

| Measure                  | Phase 1, mobile | Phase 2, mobile | Phase 2, desktop |
| ------------------------ | --------------- | --------------- | ---------------- |
| Performance              | 88              | 87 to 94        | 75 to 99         |
| Accessibility            | 100             | 100             | 100              |
| Best practices           | 100             | 100             | 100              |
| SEO                      | 100             | 100             | 100              |
| Largest Contentful Paint | 2.8 s           | 2.2 to 3.0 s    | 1.2 s            |
| Page weight              | 384 KiB         | 392 KiB         | 394 KiB          |

Performance varied run to run on this computer (one run logged 18 s of CPU time no
script accounts for). Runs with and without the Umami script show it does not slow
the page. Contact page: accessibility, best practices and SEO 100.

## Not finished, or needs you

- Legal review of the Privacy Policy and Terms (then set `legalPagesReviewed: true`).
- ODPC registration; add the number to `dataProtection` in `src/content/site.ts` once issued.
- Delete the unused `apexon-website` project in your personal Supabase organisation.
- When the domain is live: set `siteUrl`, update the Umami domain, and verify the
  domain in Resend so customers can get confirmation emails.
- GitHub pauses scheduled workflows after 60 days without repository activity; any
  commit or a manual run from the Actions tab restarts it.
