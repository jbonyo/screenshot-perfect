import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { PageHero, QuoteBand } from "@/components/site/SiteChrome";
import { enquiry, images, pricing, process } from "@/content/site";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/how-we-price")({
  head: () =>
    pageHead({
      title: "How We Price | Apexon Global Technologies",
      description:
        "What affects the cost of a cabling, Wi-Fi, IPTV or AV project, what a quote covers, and how to keep costs down. Site surveys are free.",
      path: "/how-we-price",
    }),
  component: HowWePrice,
});

function HowWePrice() {
  return (
    <>
      <PageHero
        eyebrow="How we price"
        title="Clear quotes, no surprises"
        body={pricing.intro}
        image={images.cabletray}
      />
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <section aria-labelledby="factors">
          <h2 id="factors" className="text-3xl font-extrabold tracking-tight md:text-4xl">
            What affects the cost
          </h2>
          <ul className="mt-10 grid gap-px overflow-hidden rounded-lg border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {pricing.factors.map((f) => (
              <li key={f.title} className="bg-card p-6">
                <h3 className="text-xl font-bold">{f.title}</h3>
                <p className="mt-2 text-muted-foreground">{f.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-20 grid gap-12 lg:grid-cols-2">
          <section aria-labelledby="includes">
            <h2 id="includes" className="text-3xl font-extrabold tracking-tight">
              What your quote sets out
            </h2>
            <ul className="mt-6 space-y-3 text-lg">
              {pricing.quoteIncludes.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="mt-1 h-5 w-5 shrink-0 text-primary" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </section>
          <section aria-labelledby="save">
            <h2 id="save" className="text-3xl font-extrabold tracking-tight">
              Ways to keep costs down
            </h2>
            <ul className="mt-6 space-y-3 text-lg">
              {pricing.saveMoney.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="mt-1 h-5 w-5 shrink-0 text-primary" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section aria-labelledby="steps" className="mt-20">
          <h2 id="steps" className="text-3xl font-extrabold tracking-tight">
            From enquiry to handover
          </h2>
          <ol className="mt-8 grid gap-px overflow-hidden rounded-lg border bg-border sm:grid-cols-3 lg:grid-cols-6">
            {process.map((step, i) => (
              <li key={step} className="bg-card p-5">
                <span className="font-mono text-sm text-primary">0{i + 1}</span>
                <p className="mt-2 font-semibold">{step}</p>
              </li>
            ))}
          </ol>
        </section>

        <section
          aria-labelledby="start"
          className="mt-20 flex flex-col gap-6 rounded-lg border bg-card p-6 md:flex-row md:items-center md:justify-between md:p-10"
        >
          <div>
            <h2 id="start" className="text-2xl font-extrabold tracking-tight">
              Site surveys are free
            </h2>
            <p className="mt-2 text-muted-foreground">
              Tell us about the site and we reply {enquiry.replyPromise}. Asking for a survey or
              quote does not commit you to anything.
            </p>
          </div>
          <Link to="/contact" className="btn btn-primary shrink-0">
            Request a Quote <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </section>
      </div>
      <QuoteBand />
    </>
  );
}
