# Phase 2 brief: conversion (turn visits into enquiries)

For approval. Work happens on branch `phase-2-conversion`; nothing reaches `main`
(and so Lovable) until you approve the result. Effort: M (one to two sessions once
the inputs below are ready).

## How an enquiry will flow

```
Visitor fills the form on the site
        │  (checked in the browser, then sent over HTTPS)
        ▼
Supabase Edge Function "submit-enquiry"
        │  1. checks every field again (lengths, email, phone)
        │  2. spam checks: hidden trap field, too-fast submit, max 5 per hour per visitor
        │  3. saves the enquiry in the "enquiries" table
        │  4. emails it to apexontech2@gmail.com via Resend
        ▼
Visitor sees a thank-you message with "what happens next"
```

The `enquiries` table is locked: the public cannot read or change it, and only the
function can add rows. You read enquiries in the Supabase dashboard and in your inbox.
No passwords or keys are stored in the website code.

## What will change

**1. Quote form with a three-step wizard** (Contact page)

- Step 1, Service: networking, IT infrastructure, IPTV & AV, maintenance & support,
  or "not sure"; plus a "request a site survey" option.
- Step 2, Site details: building type, number of rooms, floors or screens (shown
  only when relevant), location (town or county), timeline.
- Step 3, Contact: name, organisation, email, phone, preferred contact method
  (call, WhatsApp, email), and consent to the Privacy Policy.
- Proper autofill hints, errors announced to screen readers, works without a mouse,
  progress shown as "Step 1 of 3".
- Thank-you message: what happens next and when (see the inputs below).

**2. Support request form** (new page `/support`, linked from the footer and the
Maintenance service): name, organisation, phone, email, site location, fault
description, urgency (critical, high, normal). Same pipeline, marked as support.

**3. WhatsApp click-to-chat with pre-filled messages**

- Each service has a "Chat on WhatsApp" link that opens with, for example,
  "Hello Apexon, I'd like to ask about structured cabling."
- The mobile bar's WhatsApp button opens a general greeting.
- Free; no paid WhatsApp Business API.

**4. Cookieless analytics (Umami)**

- One small script (about 2 KB), no cookies, so no cookie banner is needed.
- Events recorded: quote submitted, support request submitted, and Call, WhatsApp
  and Email clicks.
- This is the only third-party script, and the work plan requires your approval
  for it: approving this brief approves it.

**5. Privacy Policy and Terms pages**

- Real pages at `/privacy` and `/terms`, written to the Kenya Data Protection Act,
  2019: who collects the data, what, why, how long it is kept, who processes it
  (Supabase, Resend, Umami), transfers outside Kenya, and how to ask for access or
  deletion.
- Marked as drafts until someone qualified has reviewed them.

## What will not change

- No change to the design, services, About page or photos.
- No paid services; no cookie banner; no chat widget, pixel or embedded map.
- No Senate content anywhere.

## Done when

- Test enquiries and support requests arrive by email and appear in the table.
- Spam tests (trap field, instant submit, a flood of requests) are rejected safely.
- Form errors are announced to screen readers; the keyboard test still passes.
- Analytics shows the click and submit events.
- The form works on a mid-range Android phone on a slow connection (your phone test).
- Lint, tests and build pass; before and after Lighthouse scores recorded.

## What I need from you

**Before I start** (I cannot create accounts or handle passwords and keys for you):

| #   | Action                                                                                                                                                        | Cost       | Who                      |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | ------------------------ |
| 1   | Approve creating a Supabase project "apexon-website" in your organisation jbonyo_056                                                                          | $0 / month | You approve, I create it |
| 2   | Create a free Resend account with apexontech2@gmail.com, make an API key, and paste it into Supabase as the secret `RESEND_API_KEY` (I will send exact steps) | Free       | You                      |
| 3   | Create a free Umami Cloud account, add the website, and send me the Website ID (it is public, not a secret)                                                   | Free       | You                      |

**Answers** (they go into the thank-you message and the Privacy Policy):

| #   | Question                                                               | Suggested default                     |
| --- | ---------------------------------------------------------------------- | ------------------------------------- |
| 4   | How quickly will you reply to an enquiry?                              | "Within one business day"             |
| 5   | Are site surveys free? (The site will only say "free" if you confirm.) | Say "request a site survey", no price |
| 6   | Your ODPC registration number, to show in the Privacy Policy           | Needed                                |
| 7   | How long to keep enquiries before deleting them?                       | 24 months                             |
| 8   | Who will review the Privacy Policy and Terms?                          | A lawyer or data-protection adviser   |

## Notes and limits

- Until your domain is verified with Resend, emails come from Resend's shared sender
  and can only go to your own address. That is enough for enquiry alerts. An
  automatic confirmation email to the customer needs the domain, so it is left
  for later.
- Free-plan limits: Resend about 3,000 emails a month (100 a day); Umami about
  100,000 events a month with 6 months of history. Both are far above a new
  company's needs. Check each service's pricing page when you sign up, as plans change.
- The Supabase region will be the closest one available; the Privacy Policy will
  state that enquiry data is stored outside Kenya if it is.
