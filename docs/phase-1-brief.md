# Phase 1 brief: foundation (design, accessibility, speed)

For approval. Work happens on branch `phase-1-foundation`; nothing reaches `main`
(and so Lovable) until you approve the result.

## What will change

**Colour and type**

- Buttons and red text on light backgrounds use the deeper red #AC1922 (7.0:1 with white).
  Bright red stays for large text, accents and dark sections. Top bar and quote band fixed the same way.
- Focus ring visible on every background (off-white on red and dark areas).
- Self-host one variable Archivo font and a small mono subset instead of loading Google
  Fonts. This removes the render-blocking request that delays the hero today.
- Hero text scales smoothly on small phones; mobile section padding tightened to about 56 to 64 px.
- Logo tagline reads GLOBAL TECHNOLOGIES with a space.

**Home page**

- Static hero: one image, one headline, "Request a Quote" as the main button and
  "Our Services" as a quieter link. No auto-rotation, no zoom, no delayed headline.
- Remove the scrolling "Featured Solutions" strip; the stat strip shows only real facts.
- Replace "Featured project" with "What every handover includes": test reports,
  labelling, as-built drawings, walkthrough and sign-off.

**Content** (all in `src/content/site.ts`)

- Address, hours, Nairobi base, and maintenance and technical support as a fourth service.
- Photos: the three replacements plus a credits file (`docs/photo-credits.md`); every
  stock image labelled "Illustrative image".
- Social links: Instagram, TikTok and X stay. The Facebook link (currently a search
  page) is hidden until the real page URL arrives. LinkedIn added when supplied.

**Navigation and accessibility**

- "Menu" button on mobile only; skip-to-content link; scroll padding so the sticky
  header and mobile bar never hide a focused item.
- Keyboard focus trapped and restored in the menu overlay and image viewer.
- Fix the touch-target and accessible-name issues Lighthouse found.
- Form fields get proper names and autofill hints (the form itself is enabled in Phase 2).

**Speed**

- Images converted to WebP/AVIF at several sizes; only the hero image loads early.
- Scroll-reveal made safe: content stays visible if scripts load slowly or fail.
- Bundle report to spot unused libraries.

**SEO basics**

- Sitemap, share image, canonical links, unique titles and descriptions per page.
- Structured data for the organisation (name, address, hours, phone).

**Housekeeping**

- Fix the 118 existing lint formatting errors; keep lint, tests and build passing.

## What will not change

- No quote form submission, analytics or legal pages yet (Phase 2).
- No new service pages (Phase 3). No Senate content anywhere.
- No third-party scripts.

## Done when

- Text contrast at least 4.5:1 (3:1 for large text); keyboard-only pass works; no unstoppable motion.
- Mobile LCP under 2.5 s in the same Lighthouse test as the baseline, or the gap explained.
- No placeholder text where a fact is confirmed; no image with a third-party logo.

## Offsite (your action)

- Set up a Google Business Profile with the address and hours above.
