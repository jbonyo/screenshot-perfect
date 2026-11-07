# Phase 0 report: prerequisites and baseline

Prepared 7 November 2026 on branch `phase-0-prerequisites`.

## Decisions

| Decision | Outcome |
|---|---|
| Hero | Static: one image, one message, one main "Request a Quote" button |
| Enquiries | Email to apexontech2@gmail.com plus a database table (public can add, not read) |
| Analytics | Cookieless |
| Photos | 1C (Unsplash, Sammyayot254) pending final pick, 2B, 3A |
| Social links | Keep Instagram, TikTok and X for now; LinkedIn and the real Facebook page to follow |
| ODPC | Registered (per owner). Certificate to be filed for the Phase 3 documents page |

## Confirmed facts

- Address: TransNational Bank building, 3rd floor, Office 34, Nairobi (visits by appointment)
- Hours: Monday to Friday 8:00 to 17:00; Saturday 9:00 to 16:00
- Phone and WhatsApp: +254 759 551 005
- Email: apexontech2@gmail.com

## Baseline scores (before Phase 1)

Measured with Lighthouse 12.8.2 (the engine behind PageSpeed Insights) against the
Lovable preview, home page, using Lighthouse's default mobile and desktop settings.
The preview needs a viewer link, so Google's hosted PageSpeed could not reach it.
Re-run on the published URL once the site is live.

| Measure | Mobile | Desktop | Target |
|---|---|---|---|
| Performance | 83 | 88 | |
| Accessibility | 96 | 96 | |
| Best practices | 96 | 96 | |
| SEO | 63 | 63 | |
| Largest Contentful Paint | 3.3 s | 1.4 s | under 2.5 s |
| First Contentful Paint | 3.3 s | 1.4 s | |
| Cumulative Layout Shift | 0 | 0 | under 0.1 |
| Total Blocking Time | 0 ms | 0 ms | |
| Speed Index | 5.0 s | 2.0 s | |
| Page weight | 230 KiB | 230 KiB | |

Findings behind the numbers:

- LCP element is the hero headline. It waits for the Google Fonts stylesheet
  (render-blocking) and for its own entrance animation.
- SEO 63 is mostly the preview's own "noindex" setting; the published site will not
  have it. Sitemap, canonical, share image and structured data are still missing.
- Accessibility: some touch targets are too small or too close together, and some
  buttons' accessible names do not match their visible text.
- Best practices: errors are logged to the browser console.

## Repository checks

- Tests: 1 of 1 passed. Build: passed.
- Lint: 118 formatting errors that were already there (117 auto-fixable). Scheduled for Phase 1.
- Local set-up: Node.js 26 LTS installed; repo set to LF line endings.

## Domain

WHOIS checked 7 November 2026:

| Domain | Status |
|---|---|
| apexonglobal.co.ke | Available (recommended) |
| apexon.co.ke | Available |
| apexonglobaltech.co.ke | Available |
| apexon.ke | Available |
| apexonglobaltech.com | Available |
| apexonglobal.com | Taken (registered March 2026) |

## Still open

- Final choice for photo 1 (1C, 1D or 1E).
- Domain registration and hosting choice.
- LinkedIn and Facebook page URLs.
- Google Business Profile (owner action, offsite).
