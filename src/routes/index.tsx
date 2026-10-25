import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { Accountability, FeaturedSolutions, Gallery, ServiceCards } from "@/components/home/Sections";
import { QuoteBand } from "@/components/site/SiteChrome";
import { Reveal } from "@/components/site/Reveal";
import { audiences, images, process } from "@/content/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Apexon Global Technologies — Technology You Can Depend On" },
      { name: "description", content: "Networking, structured cabling, IT infrastructure, IPTV and audiovisual systems in Kenya — delivered by an accountable engineering team." },
      { property: "og:title", content: "Apexon Global Technologies — Technology You Can Depend On" },
      { property: "og:description", content: "Networking, IT infrastructure, IPTV and AV systems for institutions and corporates in Kenya." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function SectionHead({ eyebrow, title, body }: { eyebrow: string; title: string; body?: string }) {
  return (
    <Reveal className="mb-12 max-w-2xl">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">{title}</h2>
      {body && <p className="mt-4 text-lg text-muted-foreground">{body}</p>}
    </Reveal>
  );
}

function Index() {
  return (
    <>
      <HeroCarousel />

      <section className="border-b bg-card">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-border md:grid-cols-4">
          {["Kenyan technology solutions company", "Networking & structured cabling", "IT infrastructure & Wi-Fi", "IPTV & audiovisual systems"].map((t) => (
            <p key={t} className="px-6 py-6 text-sm font-bold uppercase tracking-wide">
              <span className="mr-2 inline-block h-2 w-2 bg-primary" />{t}
            </p>
          ))}
        </div>
      </section>

      <FeaturedSolutions />

      <section className="mx-auto max-w-7xl px-6 py-24">
        <SectionHead eyebrow="Services" title="Three disciplines. One accountable team." body="We design, install, and document the infrastructure your organisation runs on." />
        <ServiceCards />
      </section>

      <section className="bg-ink text-paper">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <Reveal className="mb-12 max-w-2xl">
            <p className="eyebrow">How we work</p>
            <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">A clear process, start to sign-off.</h2>
          </Reveal>
          <ol className="grid gap-px overflow-hidden rounded-lg bg-ink-line sm:grid-cols-3 lg:grid-cols-6">
            {process.map((p, i) => (
              <li key={p} className="bg-ink p-6">
                <span className="font-mono text-sm text-primary">0{i + 1}</span>
                <p className="mt-6 text-xl font-black">{p}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-24 md:grid-cols-2 md:items-center">
        <Reveal>
          <img src={images.engineer} alt="Engineer patching network cables (illustrative stock image)" loading="lazy" width={1920} height={1088} className="aspect-[4/3] w-full rounded-lg object-cover" />
        </Reveal>
        <Reveal delay={100}>
          <p className="eyebrow">Featured project</p>
          <h2 className="mt-3 text-4xl font-black tracking-tight">Institutional network & AV delivery</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            A recent engagement for a public-sector client covering infrastructure and audiovisual works. Client name and project details will be shared here once disclosure is approved.
          </p>
          <Link to="/contact" className="btn btn-outline-dark mt-8">Discuss a similar project <ArrowRight className="h-4 w-4" /></Link>
        </Reveal>
      </section>

      <section className="bg-muted">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <SectionHead eyebrow="Who we serve" title="Built for organisations that can't afford downtime." />
          <div className="grid gap-6 md:grid-cols-3">
            {audiences.map((a, i) => (
              <Reveal key={a.title} delay={i * 100}>
                <div className="redline h-full rounded-lg bg-card p-8">
                  <h3 className="text-2xl font-black">{a.title}</h3>
                  <p className="mt-3 text-muted-foreground">{a.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <SectionHead eyebrow="Built on accountability" title="How we hold ourselves to account." body="Client reviews will appear here once approved. Until then, these are the standards we work to." />
        <Accountability />
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <SectionHead eyebrow="Gallery" title="The kind of work we do." />
        <Gallery />
      </section>

      <QuoteBand />
    </>
  );
}
