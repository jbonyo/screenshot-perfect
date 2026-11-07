# Phase 1 report: foundation (design, accessibility, speed)

Completed 7 November 2026 on branch `phase-1-foundation` (local, not pushed).
Screenshots: `../phase-1/` (outside the repo).

## Scores, before and after

Lighthouse 12.8.2, home page, default mobile and desktop settings. Both builds were
run locally side by side with compression switched on, so the comparison is fair.
Hosted numbers will differ; re-run on the published URL.

| Measure                  | Before (main), mobile | After, mobile | Before, desktop | After, desktop |
| ------------------------ | --------------------- | ------------- | --------------- | -------------- |
| Performance              | 63                    | 88            | 92              | 99             |
| Accessibility            | 96                    | 100           | 96              | 100            |
| Best practices           | 100                   | 100           | 100             | 100            |
| SEO                      | 100                   | 100           | 100             | 100            |
| Largest Contentful Paint | 3.0 s                 | 2.8 s         | 1.5 s           | 0.7 s          |
| Total Blocking Time      | 1,178 ms              | 190 ms        | 8 ms            | 4 ms           |
| Cumulative Layout Shift  | 0                     | 0             | 0.002           | 0              |
| Page weight              | 1,575 KiB             | 384 KiB       | 1,798 KiB       | 385 KiB        |

### Logged gap: mobile LCP 2.8 s against a 2.5 s target

The hero photo now loads early and the headline is no longer animated. What remains
is the framework script (about 132 KiB compressed: React and TanStack Router), which
the page needs before it is interactive and which Lighthouse's slow-phone model weighs
heavily. Reducing it means framework-level changes, out of scope for this phase.
Next check: real-visitor data once the site is published.

## Quality checklist (work plan section 7)

| Area          | Result                                                                                                                                 |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Speed         | Hero image preloaded; other images lazy; fonts self-hosted; no layout shift. Mobile LCP gap logged above.                              |
| Accessibility | Lighthouse 100. Scripted keyboard test, 11 of 11 pass: skip link, menu and image-viewer focus trap, Escape, focus return, sticky bars. |
| Mobile        | No horizontal scrolling at 375 and 390 px; bottom bar does not cover focused items. Not yet tried on a real mid-range Android phone.   |
| Content       | Confirmed address, hours and maintenance service; every photo labelled illustrative; no Senate or public-sector project wording.       |
| Technical     | Lint 0 errors (6 warnings in the unused UI kit, already there), typecheck, tests and build pass.                                       |

## Not finished, or needs you

- Credits for the five original photos (rack, cable tray, IPTV, testing, Wi-Fi) are
  unknown; see `docs/photo-credits.md`.
- `siteUrl` in `src/content/site.ts` is empty until the domain is live; canonical
  links and absolute share-image links switch on when it is set.
- LinkedIn and the real Facebook page URL.
- Street name for the TransNational Bank building (for maps and search listings).
- Google Business Profile (offsite).
- Real-device test on a mid-range Android phone on a slow connection.
