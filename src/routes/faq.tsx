import { createFileRoute, Link } from "@tanstack/react-router";
import { FaqList } from "@/components/site/FaqList";
import { QuoteBand } from "@/components/site/SiteChrome";
import { faqs, serviceDetails, services } from "@/content/site";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/faq")({
  head: () =>
    pageHead({
      title: "Frequently Asked Questions | Apexon Global Technologies",
      description:
        "Answers about quotes, free site surveys, where we work, handover documentation, company documents for tenders and maintenance agreements.",
      path: "/faq",
    }),
  component: Faq,
});

function Faq() {
  return (
    <>
      <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
          Frequently asked questions
        </h1>
        <div className="mt-10">
          <FaqList items={faqs} />
        </div>
        {services.map((s) => (
          <section key={s.slug} className="mt-14" aria-labelledby={`faq-${s.slug}`}>
            <h2 id={`faq-${s.slug}`} className="text-2xl font-extrabold tracking-tight">
              {s.title}
            </h2>
            <div className="mt-5">
              <FaqList items={serviceDetails[s.slug]?.faqs ?? []} />
            </div>
            <Link
              to="/services/$slug"
              params={{ slug: s.slug }}
              className="mt-3 inline-flex min-h-11 items-center font-semibold text-primary underline underline-offset-4"
            >
              More about {s.title.toLowerCase()}
            </Link>
          </section>
        ))}
      </div>
      <QuoteBand />
    </>
  );
}
