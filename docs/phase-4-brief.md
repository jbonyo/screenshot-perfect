# Phase 4 brief: differentiators

For approval. Work happens on branch `phase-4-differentiators`. Nothing reaches `main`
(and so Lovable) until you approve the result. Effort: L.

Goal from the work plan: features competitors lack that suit Kenyan buyers, written
only with facts Apexon can stand behind.

## What will be built

**1. Guides section** (`/guides` plus one page per article)

Five launch articles, written in plain English for office managers and procurement
staff rather than engineers:

1. Why structured cabling matters
2. Common office Wi-Fi mistakes
3. IPTV explained
4. Preventive maintenance checklist
5. Building networks for Kenyan conditions

Each article will have:

- a reading time and a "last reviewed" date;
- links to the related service page and a quote button;
- a printable layout.

General technical facts will be stated as general practice. They will not be presented
as Apexon results, and there will be no invented statistics. You approve each article
before it goes live.

**2. Two interactive diagrams**, drawn as lightweight inline SVG (no new libraries):

- **From rack to desk:** patch panel → cable run → wall outlet → device. Selecting each
  part explains what it is and what goes wrong with it.
- **IPTV signal flow:** source → headend → network → set-top box or smart TV.

Both diagrams:

- work with the keyboard and a screen reader;
- respect reduced-motion settings;
- have a text-only version underneath them.

**3. Kenyan conditions checklist**, as a page section and an article:

- power surges and UPS;
- counterfeit copper-clad aluminium (CCA) cable and how to spot it;
- dust and humidity.

It is written as practical advice for buyers.

**4. Maintenance plans page** (`/maintenance-plans`)

Based on what you confirmed: visit frequency and fault response times are agreed with
each client. The page will show how plans are built:

- what a visit covers;
- the choices you make: visit frequency, response time, and working hours or
  after-hours;
- that the agreed terms are written into the contract.

No fixed response times or prices will be shown unless you give me figures you can
honour. It links to the support form and the quote form with Maintenance pre-selected.

**5. "How we price" page** (`/how-we-price`)

- What affects cost: number of points, building type, distances, equipment choices,
  working hours, and site access.
- What a quote includes, and that site surveys are free.
- Typical stages and timelines, only if you confirm them.
- Price ranges only if you supply real figures. Otherwise there will be no numbers.

**6. Navigation and SEO**

- Guides are added to the main navigation.
- The new pages are added to the footer and the sitemap.
- Each article gets Article structured data.

## What will not change

- No Senate content, client names, testimonials or project photos (still parked).
- No new third-party scripts or libraries.
- Optional page transitions are skipped unless you ask for them, to keep speed scores safe.
- Existing pages and forms keep working exactly as they do now.

## Done when

- You have approved every article and page.
- The diagrams pass keyboard and reduced-motion tests.
- Accessibility, best practices and SEO still score 100.
- Page weight stays within the Phase 1 budget.
- The claims checklist is clear.

## What I need from you

Anything you can't confirm stays off the site. You can answer in parts.

| #   | Question                                                                                                                                                                | Used for                   |
| --- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| 1   | Price ranges or pricing principles you are willing to publish (for example "from KSh X per network point", or "no figures, explain the factors only")                   | How we price               |
| 2   | Typical timelines you can state (for example "a 20-point office: 2 to 4 working days after survey"), or should timelines stay off?                                      | How we price, guides       |
| 3   | Maintenance plans: should I show example tiers (for example quarterly visits, next-business-day response) marked "example, agreed per contract", or no examples at all? | Maintenance plans          |
| 4   | Do you test or inspect cable to spot counterfeit CCA cable, and do you buy from authorised distributors? (decides whether the guide can say "we do X")                  | Kenyan conditions          |
| 5   | Do you supply or install UPS and surge protection?                                                                                                                      | Kenyan conditions, pricing |
| 6   | Article byline: "Apexon Global Technologies" or a named author (for example yourself, as founder)?                                                                      | Guides                     |
| 7   | Still open from Phase 3: do you have a cable tester, and which model? (lets the guides mention testing)                                                                 | Guides, service pages      |

Recommended defaults if you'd rather not decide now:

- 1: factors only, no figures.
- 2: no timelines.
- 3: no example tiers; show the building blocks only.
- 4, 5 and 7: general advice only.
- 6: company byline.
