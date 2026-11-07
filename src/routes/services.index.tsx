import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, MessageCircle } from "lucide-react";
import { PageHero, QuoteBand } from "@/components/site/SiteChrome";
import type { ServiceChoice } from "@/components/forms/QuoteWizard";
import { Photo } from "@/components/site/Photo";
import { Reveal } from "@/components/site/Reveal";
import { images, services, whatsappLink } from "@/content/site";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/services/")({
  head: () =>
    pageHead({
      title: "Services | Networking, IT Infrastructure, IPTV & AV, Maintenance | Apexon",
      description:
        "Structured cabling, servers and Wi-Fi, IPTV and audiovisual systems, and maintenance and technical support in Nairobi: designed, installed, tested, and documented by Apexon.",
      path: "/services",
    }),
  component: Services,
});

function Services() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Infrastructure, done properly."
        body="Four disciplines, delivered with testing, documentation, and a clear handover."
        image={images.cabletray}
      />
      <div className="mx-auto max-w-7xl space-y-16 px-6 py-16 md:space-y-24 md:py-24">
        {services.map((s, i) => (
          <section
            id={s.slug}
            key={s.slug}
            aria-labelledby={`${s.slug}-title`}
            className="grid scroll-mt-28 gap-8 md:grid-cols-2 md:items-center md:gap-10"
          >
            <Reveal className={i % 2 ? "md:order-2" : ""}>
              <Photo
                photo={s.image}
                alt={s.alt}
                sizes="(min-width: 768px) 50vw, 100vw"
                className="aspect-[4/3] w-full rounded-lg object-cover"
              />
            </Reveal>
            <Reveal delay={100}>
              <span className="font-mono text-sm text-primary">0{i + 1}</span>
              <h2
                id={`${s.slug}-title`}
                className="mt-2 text-3xl font-extrabold tracking-tight md:text-5xl"
              >
                {s.title}
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">{s.short}</p>
              <ul className="mt-6 space-y-3">
                {s.points.map((p) => (
                  <li key={p} className="flex items-center gap-3 font-semibold">
                    <Check className="h-5 w-5 text-primary" aria-hidden /> {p}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/services/$slug"
                  params={{ slug: s.slug }}
                  className="btn btn-outline-dark"
                >
                  Full details <span className="sr-only">: {s.title}</span>
                </Link>
                <Link
                  to="/contact"
                  search={{ service: s.slug as ServiceChoice }}
                  className="btn btn-primary"
                >
                  Request a Quote <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
                <a
                  href={whatsappLink(s.whatsappTopic)}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline-dark"
                  data-umami-event="whatsapp_click"
                  data-umami-event-service={s.slug}
                >
                  <MessageCircle className="h-4 w-4" aria-hidden /> Chat on WhatsApp
                </a>
              </div>
              {s.slug === "maintenance" && (
                <p className="mt-4 text-muted-foreground">
                  Existing client with a fault?{" "}
                  <Link
                    to="/support"
                    className="font-semibold text-primary underline underline-offset-4"
                  >
                    Send a support request
                  </Link>
                  .
                </p>
              )}
            </Reveal>
          </section>
        ))}
      </div>
      <QuoteBand />
    </>
  );
}
