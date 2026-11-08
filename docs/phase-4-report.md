# Phase 4 report: differentiators

Completed 8 November 2026 on branch `phase-4-differentiators`. Not yet merged into `main`.
Built from the approved brief (`docs/phase-4-brief.md`) using the recommended defaults:

- no price figures or timelines;
- no example maintenance tiers;
- general advice only on counterfeit cable, UPS and testing;
- a company byline.

## What was built

| Page or item                | Address                                 | Notes                                                                                                       |
| --------------------------- | --------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Guides index                | `/guides`                               | Five guide cards plus a short Kenyan conditions checklist. Added to the main navigation.                    |
| Five guides                 | `/guides/<slug>`                        | Reading time, "last reviewed" date, print button, related service with quote link, Article structured data. |
| "From rack to desk" diagram | inside "Why structured cabling matters" | Five parts: what each does, what goes wrong, what to check.                                                 |
| IPTV signal-flow diagram    | inside "IPTV explained"                 | Four stages, sources to screens.                                                                            |
| Kenyan conditions checklist | `/guides` and its own guide             | Power and UPS, copper-clad aluminium (CCA) cable, dust, heat and humidity, security.                        |
| Maintenance plans           | `/maintenance-plans`                    | What a visit covers, the four choices agreed per client, how a plan is agreed. No fixed times or prices.    |
| How we price                | `/how-we-price`                         | Six cost factors, what a quote sets out, ways to keep costs down, process steps, free survey. No figures.   |
| Footer and sitemap          | every page                              | The two new pages are in the footer's Company column. The sitemap now lists 24 pages.                       |

All wording is in `src/content/site.ts`. The diagram component is
`src/components/site/Diagram.tsx`.

## How the diagrams work

- They are drawn with inline SVG and the site's existing icon set. No new libraries or
  scripts were added.
- They follow the standard tabs pattern:
  - one Tab stop;
  - the arrow keys, Home and End move between parts;
  - screen readers announce each part and its panel.
- A dashed "signal" moves along the connector line. It stops when the visitor has
  reduced motion turned on.
- Each diagram has a "Text version" underneath, and the panel shows when printed.

## Claims (work plan section 3)

- The guides give general advice ("what to check", "what to ask for") and do not claim
  Apexon results, clients or statistics.
- They do not say that Apexon tests for counterfeit cable, supplies UPS units or uses a
  named tester.
- Maintenance plans repeat the confirmed wording: terms are agreed per client and
  written into the agreement.
- Pricing shows no figures. The only promises it makes are ones you have already
  confirmed: free site surveys, a reply within one business day, and no commitment.
- No Senate content and no "world-class" wording.

## Tests

- **Diagram keyboard and motion tests: 20 of 20 pass** on both diagrams. They cover:
  - one Tab stop;
  - arrows, Home and End, with wrap-around at both ends;
  - Tab into the panel;
  - the signal animates normally and stops with reduced motion;
  - the text version is present;
  - no duplicate ids.
- **Lighthouse:** accessibility, best practices and SEO score 100 on `/guides`, both
  diagram guides, `/maintenance-plans` and `/how-we-price`.
- **Grid-gap scan:** at 390, 700, 900, 1100 and 1366 px, no empty grid cells. With five
  guide cards, the guides index uses a 2 + 3 layout to avoid an empty slot.
- **Sitemap:** all 24 pages return 200. An unknown guide returns "Page not found" (404).
- **Code checks:**
  - lint has 0 errors (the 6 existing warnings are in the unused UI kit);
  - typecheck, unit tests and build pass.

## Page weight

- The new pages are lighter than the home page. On the local test server, uncompressed:
  - `/guides`: 704 KB
  - one guide: 652 KB
  - `/how-we-price`: 629 KB
  - `/maintenance-plans`: 613 KB
  - home page: 698 KB
- The guide text lives in `site.ts`, which every page loads, so every page gains about
  7 KiB compressed. That is roughly 2% on the home page (about 394 → 401 KiB), still in
  line with the Phase 1 budget.
- If the guides grow a lot later, they can move to a file loaded only on guide pages.

## Not done, or needs you

- **Your approval:** please read the five guides and approve the wording. You can ask
  for any change.
- **Optional page transitions:** skipped, as the brief allowed.
- **Still open from Phase 3:**
  - a cable tester model;
  - LinkedIn and Facebook links;
  - the official logo;
  - the domain;
  - legal review;
  - ODPC registration.
- **Optional extras you can send later:**
  - **Real price figures or typical timelines:** these can go on "How we price".
  - **Example maintenance tiers:** these can go on "Maintenance plans".
