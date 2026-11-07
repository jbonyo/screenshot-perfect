# Phase 3 report: services and trust

Completed 7 November 2026 on branch `phase-3-services-trust`. Not yet merged into `main`.

## What was built

| Page or item                | Address                                                            | Notes                                                                                                       |
| --------------------------- | ------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------- |
| Four service pages          | `/services/networking`, `infrastructure`, `iptv-av`, `maintenance` | Problem, what we supply, how we deliver, testing, what you receive, FAQ; quote (pre-selected) and WhatsApp. |
| Services overview           | `/services`                                                        | Each service links to its full page.                                                                        |
| Handover pack               | `/handover`                                                        | The five handover parts plus four downloadable SAMPLE PDFs (made-up data).                                  |
| Compliance and documents    | `/compliance`                                                      | e-GP registration with number; six documents "available on request"; request form.                          |
| Partners and subcontractors | `/partners`                                                        | Who we serve, who we work with, partner enquiry form.                                                       |
| FAQ                         | `/faq`                                                             | 8 general questions plus each service's questions; keyboard-friendly expand/collapse.                       |
| Capability statement        | `/capability-statement` and PDF                                    | Built from the site content; prints to A4; PDF in `public/downloads`.                                       |
| Footer                      | every page                                                         | New "For tenders" column; FAQ and Partners in Company.                                                      |
| Backend                     | Supabase migration + function v4                                   | New `documents` and `partner` request types; table still locked to the public.                              |

Regenerate the PDFs after content changes: start the site, then run
`node scripts/pdf/build.mjs http://localhost:<port>`.

## Claims (work plan section 3)

Stated only from the owner's answers of 7 November 2026:

- Team: two electrical engineers and a telecommunications specialist, led by a founder
  with a data science background; further specialists per project. No certifications claimed.
- Service area: Nairobi, anywhere in Kenya by arrangement.
- Project scope: described as capability ("from small fixes to large institutional
  projects ... supported by specialist partners"), not as completed work.
- Testing: each link tested before handover with results recorded. No named standard
  (TIA-568, ISO/IEC 11801) until confirmed; switch `certificationTesting` on then.
- Warranty: not mentioned (none offered).
- Maintenance: terms agreed per client in a written agreement.
- e-GP supplier registration shown with its number; other documents on request only.
- Gallery caption "Cable certification testing" changed to "Network cable testing".

## Tests

- End-to-end, 31 of 32 pass (the other is the browser logging the deliberate 404 test):
  all four service pages and their quote links, FAQ opens with the keyboard, unknown
  service shows "Page not found" (404), document request and partner enquiry sent and
  thanked, error summaries focused and in page order, all five PDFs download, footer
  links, sitemap lists 16 pages and every one returns 200, no duplicate ids.
- Database: both test requests stored with the right fields and emailed; deleted.
- Keyboard test 11 of 11 across 14 pages. Nothing fully hidden by sticky bars; the tall
  partner text box is partly behind the mobile bar when focused, with its top visible.
- Lighthouse accessibility, best practices and SEO: 100 on every new page.
- Lint 0 errors, typecheck, unit tests and build pass.

## Fixed during testing

1. The Maintenance page's five delivery steps left an empty box; the last now spans the row.
2. Handover page heading order (level-3 headings without a level-2 heading).
3. Chrome's built-in PDF printing hung on the capability statement because of the
   analytics script; the PDF script now blocks analytics while printing.

## Not finished, or needs you

- Confirm you own at least a basic cable tester (the "tested before handover" wording
  depends on it). If you later use a certifier, say which standard and the site can say so.
- Decide on a workmanship warranty: many tenders ask for a warranty letter.
- Official logo file when available (the current SVG recreation is used).
- Moving the project folder out of OneDrive (see the Phase 3 summary): OneDrive grew to
  about 13 GB of memory syncing build files and had to be restarted.
