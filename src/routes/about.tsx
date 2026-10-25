import { createFileRoute } from "@tanstack/react-router";
import { PageHero, QuoteBand } from "@/components/site/SiteChrome";
import { Accountability } from "@/components/home/Sections";
import { Reveal } from "@/components/site/Reveal";
import { company, images, process } from "@/content/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Apexon — The Accountable Engineering Team" },
      { name: "description", content: "Apexon Global Technologies is a Kenyan technology solutions company delivering networking, IT infrastructure, and AV systems with engineering discipline." },
      { property: "og:title", content: "About Apexon Global Technologies" },
      { property: "og:description", content: "The accountable engineering team behind dependable networks and AV systems in Kenya." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <PageHero eyebrow="About Apexon" title={company.positioning + "."} body="A Kenyan technology solutions company focused on doing the infrastructure work properly — and standing behind it." image={images.engineer} />
      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-24 md:grid-cols-2">
        <Reveal>
          <h2 className="redline text-4xl font-black tracking-tight">Who we are</h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Apexon Global Technologies designs and installs networking, IT infrastructure, and IPTV / audiovisual systems for government institutions, corporate organisations, and technology partners.
          </p>
          <p className="mt-4 text-lg text-muted-foreground">
            Our promise is simple: {company.tagline.toLowerCase()} Every job is planned, tested, documented, and handed over with clear responsibility.
          </p>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="redline text-4xl font-black tracking-tight">How we deliver</h2>
          <ol className="mt-6 space-y-3">
            {process.map((p, i) => (
              <li key={p} className="flex items-center gap-4 border-b pb-3 text-lg font-bold">
                <span className="font-mono text-sm text-primary">0{i + 1}</span> {p}
              </li>
            ))}
          </ol>
        </Reveal>
      </section>
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <h2 className="mb-10 text-4xl font-black tracking-tight">Our working principles</h2>
        <Accountability />
      </section>
      <QuoteBand />
    </>
  );
}
