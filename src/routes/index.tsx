import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/home/Hero";
import { Accountability, Gallery, Handover, ServiceCards } from "@/components/home/Sections";
import { QuoteBand } from "@/components/site/SiteChrome";
import { Reveal } from "@/components/site/Reveal";
import { audiences, facts, handover, process } from "@/content/site";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () =>
    pageHead({
      title: "Apexon Global Technologies | Networking, IT & AV in Nairobi",
      description:
        "Networking and structured cabling, IT infrastructure, IPTV and audiovisual systems, and maintenance in Nairobi, Kenya. Tested, documented, and handed over properly.",
      path: "/",
    }),
  component: Index,
});

function SectionHead({ eyebrow, title, body }: { eyebrow: string; title: string; body?: string }) {
  return (
    <Reveal className="mb-10 max-w-2xl md:mb-12">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-5xl">{title}</h2>
      {body && <p className="mt-4 text-lg text-muted-foreground">{body}</p>}
    </Reveal>
  );
}

function Index() {
  return (
    <>
      <Hero />

      <section aria-label="At a glance" className="border-b bg-card">
        <ul className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-border md:grid-cols-4">
          {facts.map((t) => (
            <li key={t} className="px-6 py-5 text-sm font-bold uppercase tracking-wide">
              <span className="mr-2 inline-block h-2 w-2 bg-primary" aria-hidden />
              {t}
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <SectionHead
          eyebrow="Services"
          title="Four disciplines. One accountable team."
          body="We design, install, document, and maintain the infrastructure your organisation runs on."
        />
        <ServiceCards />
      </section>

      <section className="surface-dark bg-ink text-paper">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <Reveal className="mb-10 max-w-2xl md:mb-12">
            <p className="eyebrow">How we work</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-5xl">
              A clear process, start to sign-off.
            </h2>
          </Reveal>
          <ol className="grid gap-px overflow-hidden rounded-lg bg-ink-line sm:grid-cols-3 lg:grid-cols-6">
            {process.map((p, i) => (
              <li key={p} className="bg-ink p-6">
                <span className="font-mono text-sm text-primary">0{i + 1}</span>
                <p className="mt-6 text-xl font-bold">{p}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <SectionHead eyebrow="Handover" title={handover.title} body={handover.body} />
        <Handover />
      </section>

      <section className="bg-muted">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <SectionHead
            eyebrow="Who we serve"
            title="Built for organisations that can't afford downtime."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {audiences.map((a, i) => (
              <Reveal key={a.title} delay={i * 100}>
                <div className="redline h-full rounded-lg bg-card p-8">
                  <h3 className="text-2xl font-bold">{a.title}</h3>
                  <p className="mt-3 text-muted-foreground">{a.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <SectionHead
          eyebrow="Built on accountability"
          title="How we hold ourselves to account."
          body="These are the standards we work to on every job."
        />
        <Accountability />
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16 md:pb-24">
        <SectionHead eyebrow="Gallery" title="The kind of work we do." />
        <Gallery />
      </section>

      <QuoteBand />
    </>
  );
}
