import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, CheckSquare, Printer } from "lucide-react";
import type { ServiceChoice } from "@/components/forms/QuoteWizard";
import { Diagram } from "@/components/site/Diagram";
import { PageHero, QuoteBand } from "@/components/site/SiteChrome";
import { company, guides, services, siteUrl, type GuideSection } from "@/content/site";
import { readingMinutes } from "@/lib/guides";
import { pageHead } from "@/lib/seo";

const find = (slug: string) => guides.find((g) => g.slug === slug);

export const Route = createFileRoute("/guides/$slug")({
  loader: ({ params }) => {
    if (!find(params.slug)) throw notFound();
  },
  head: ({ params }) => {
    const guide = find(params.slug);
    if (!guide) {
      return pageHead({
        title: "Guide | Apexon Global Technologies",
        description: "Guides from Apexon Global Technologies.",
        path: `/guides/${params.slug}`,
      });
    }
    const head = pageHead({
      title: `${guide.title} | Apexon Global Technologies`,
      description: guide.summary,
      path: `/guides/${guide.slug}`,
    });
    const article = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: guide.title,
      description: guide.summary,
      dateModified: new Date(guide.reviewed).toISOString().slice(0, 10),
      author: { "@type": "Organization", name: company.name },
      publisher: { "@type": "Organization", name: company.name },
      image: `${siteUrl}${guide.image.src}`,
      ...(siteUrl ? { mainEntityOfPage: `${siteUrl}/guides/${guide.slug}` } : {}),
    };
    return {
      ...head,
      scripts: [{ type: "application/ld+json", children: JSON.stringify(article) }],
    };
  },
  component: GuidePage,
});

function SectionBlock({ section }: { section: GuideSection }) {
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">{section.heading}</h2>
      {section.body?.map((p) => (
        <p key={p} className="mt-4 text-lg leading-relaxed">
          {p}
        </p>
      ))}
      {section.list && (
        <ul className="mt-4 list-disc space-y-2 pl-6 text-lg">
          {section.list.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
      )}
      {section.checklist && (
        <ul className="mt-5 space-y-3 rounded-lg border bg-card p-5 text-lg">
          {section.checklist.map((x) => (
            <li key={x} className="flex items-start gap-3">
              <CheckSquare className="mt-1 h-5 w-5 shrink-0 text-primary" aria-hidden />
              {x}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function GuidePage() {
  const { slug } = Route.useParams();
  const guide = find(slug)!;
  const service = services.find((s) => s.slug === guide.service);
  const others = guides.filter((g) => g.slug !== slug).slice(0, 3);
  // The diagram goes after the first section, where it explains what was just introduced.
  const [first, ...rest] = guide.sections;

  return (
    <>
      <PageHero
        eyebrow={`Guide · ${readingMinutes(guide)} min read`}
        title={guide.title}
        body={guide.summary}
        image={guide.image}
      />
      <article className="mx-auto max-w-3xl px-6 py-14 md:py-20">
        <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground">
          <Link
            to="/guides"
            className="inline-flex min-h-11 items-center gap-2 font-semibold text-foreground hover:text-primary print:hidden"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden /> All guides
          </Link>
          <p>
            By {company.name} · Last reviewed {guide.reviewed}
          </p>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex min-h-11 items-center gap-2 font-semibold text-foreground hover:text-primary print:hidden"
          >
            <Printer className="h-4 w-4" aria-hidden /> Print
          </button>
        </div>

        {first && <SectionBlock section={first} />}
        {guide.diagram && <Diagram id={guide.diagram} />}
        {rest.map((s) => (
          <SectionBlock key={s.heading} section={s} />
        ))}

        <p className="mt-12 border-t pt-6 text-sm text-muted-foreground">
          General guidance only. Every site is different: ask us if you are unsure what applies to
          yours.
        </p>

        {service && (
          <aside
            aria-label="Related service"
            className="mt-10 rounded-lg border bg-card p-6 print:hidden"
          >
            <h2 className="text-xl font-bold">Need help with this?</h2>
            <p className="mt-2 text-muted-foreground">{service.short}</p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/contact"
                search={{ service: service.slug as ServiceChoice }}
                className="btn btn-primary"
              >
                Request a Quote <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link
                to="/services/$slug"
                params={{ slug: service.slug }}
                className="btn btn-outline-dark"
              >
                About {service.title.toLowerCase()}
              </Link>
            </div>
          </aside>
        )}

        <nav aria-label="More guides" className="mt-14 print:hidden">
          <h2 className="eyebrow">More guides</h2>
          <ul className="mt-3">
            {others.map((g) => (
              <li key={g.slug}>
                <Link
                  to="/guides/$slug"
                  params={{ slug: g.slug }}
                  className="inline-flex min-h-11 items-center font-semibold hover:text-primary"
                >
                  {g.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </article>
      <div className="print:hidden">
        <QuoteBand />
      </div>
    </>
  );
}
