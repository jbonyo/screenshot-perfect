import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { PageHero, QuoteBand } from "@/components/site/SiteChrome";
import { Photo } from "@/components/site/Photo";
import { Reveal } from "@/components/site/Reveal";
import { images, services } from "@/content/site";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/services")({
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
              <Link to="/contact" className="btn btn-primary mt-8">
                Request a Quote <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </Reveal>
          </section>
        ))}
      </div>
      <QuoteBand />
    </>
  );
}
