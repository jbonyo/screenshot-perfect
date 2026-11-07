import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { PageHero, QuoteBand } from "@/components/site/SiteChrome";
import { Reveal } from "@/components/site/Reveal";
import { images, services } from "@/content/site";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Networking, IT Infrastructure, IPTV & AV | Apexon" },
      {
        name: "description",
        content:
          "Structured cabling, servers and Wi-Fi, IPTV and audiovisual systems — designed, installed, tested, and documented by Apexon.",
      },
      { property: "og:title", content: "Apexon Services" },
      {
        property: "og:description",
        content:
          "Networking & structured cabling, IT infrastructure, and IPTV & audiovisual systems.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Services,
});

function Services() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Infrastructure, done properly."
        body="Three core disciplines, delivered with testing, documentation, and a clear handover."
        image={images.cabletray}
      />
      <div className="mx-auto max-w-7xl space-y-24 px-6 py-24">
        {services.map((s, i) => (
          <section
            id={s.slug}
            key={s.slug}
            className="grid scroll-mt-28 gap-10 md:grid-cols-2 md:items-center"
          >
            <Reveal className={i % 2 ? "md:order-2" : ""}>
              <img
                src={s.image}
                alt={s.alt}
                loading="lazy"
                width={1920}
                height={1088}
                className="aspect-[4/3] w-full rounded-lg object-cover"
              />
            </Reveal>
            <Reveal delay={100}>
              <span className="font-mono text-sm text-primary">0{i + 1}</span>
              <h2 className="mt-2 text-4xl font-black tracking-tight md:text-5xl">{s.title}</h2>
              <p className="mt-4 text-lg text-muted-foreground">{s.short}</p>
              <ul className="mt-6 space-y-3">
                {s.points.map((p) => (
                  <li key={p} className="flex items-center gap-3 font-semibold">
                    <Check className="h-5 w-5 text-primary" /> {p}
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="btn btn-primary mt-8">
                Request a Quote <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </section>
        ))}
        <p className="text-sm text-muted-foreground">
          Maintenance and technical support details will be added once confirmed.
        </p>
      </div>
      <QuoteBand />
    </>
  );
}
