import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, Check, MessageCircle } from "lucide-react";
import type { ServiceChoice } from "@/components/forms/QuoteWizard";
import { FaqList } from "@/components/site/FaqList";
import { PageHero, QuoteBand } from "@/components/site/SiteChrome";
import { serviceDetails, services, whatsappLink } from "@/content/site";
import { pageHead } from "@/lib/seo";

const find = (slug: string) => {
  const service = services.find((s) => s.slug === slug);
  const detail = serviceDetails[slug];
  return service && detail ? { service, detail } : null;
};

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    if (!find(params.slug)) throw notFound();
  },
  head: ({ params }) => {
    const found = find(params.slug);
    return pageHead({
      title: found
        ? `${found.service.title} in Nairobi | Apexon Global Technologies`
        : "Service | Apexon Global Technologies",
      description: found
        ? `${found.service.short} ${found.detail.testing}`
        : "Apexon Global Technologies services.",
      path: `/services/${params.slug}`,
    });
  },
  component: ServicePage,
});

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t py-10 first:border-t-0 first:pt-0">
      <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">{title}</h2>
      <div className="mt-5 text-lg">{children}</div>
    </section>
  );
}

function ServicePage() {
  const { slug } = Route.useParams();
  const { service, detail } = find(slug)!;
  const others = services.filter((s) => s.slug !== slug);

  return (
    <>
      <PageHero
        eyebrow="Services"
        title={service.title}
        body={service.short}
        image={service.image}
      />
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:py-24 lg:grid-cols-[1fr_20rem]">
        <div>
          <Section title="The problem we solve">
            <p className="text-muted-foreground">{detail.problem}</p>
          </Section>
          <Section title="What we supply and install">
            <ul className="space-y-3">
              {detail.supply.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="mt-1 h-5 w-5 shrink-0 text-primary" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </Section>
          <Section title="How we deliver">
            <ol className="grid gap-px overflow-hidden rounded-lg border bg-border sm:grid-cols-2">
              {detail.process.map((step, i) => (
                <li key={step} className="bg-card p-5 sm:odd:last:col-span-2">
                  <span className="font-mono text-sm text-primary">0{i + 1}</span>
                  <p className="mt-2 font-semibold">{step}</p>
                </li>
              ))}
            </ol>
          </Section>
          <Section title="Testing">
            <p className="text-muted-foreground">{detail.testing}</p>
          </Section>
          <Section title="What you receive">
            <ul className="space-y-3">
              {detail.receive.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="mt-1 h-5 w-5 shrink-0 text-primary" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4">
              <Link
                to="/handover"
                className="font-semibold text-primary underline underline-offset-4"
              >
                See sample handover documents
              </Link>
            </p>
          </Section>
          <Section title="Questions">
            <FaqList items={detail.faqs} />
          </Section>
        </div>

        <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start" aria-label="Next steps">
          <div className="rounded-lg border bg-card p-6">
            <h2 className="text-xl font-bold">Talk to us about {service.title.toLowerCase()}</h2>
            <p className="mt-2 text-muted-foreground">Free site survey on request.</p>
            <div className="mt-5 flex flex-col gap-3">
              <Link
                to="/contact"
                search={{ service: slug as ServiceChoice }}
                className="btn btn-primary"
              >
                Request a Quote <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <a
                href={whatsappLink(service.whatsappTopic)}
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline-dark"
                data-umami-event="whatsapp_click"
                data-umami-event-service={slug}
              >
                <MessageCircle className="h-4 w-4" aria-hidden /> Chat on WhatsApp
              </a>
              {slug === "maintenance" && (
                <Link to="/support" className="btn btn-outline-dark">
                  Report a fault
                </Link>
              )}
            </div>
          </div>
          <nav aria-label="Other services" className="rounded-lg border bg-card p-6">
            <h2 className="eyebrow">Other services</h2>
            <ul className="mt-3">
              {others.map((s) => (
                <li key={s.slug}>
                  <Link
                    to="/services/$slug"
                    params={{ slug: s.slug }}
                    className="inline-flex min-h-11 items-center font-semibold hover:text-primary"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      </div>
      <QuoteBand />
    </>
  );
}
