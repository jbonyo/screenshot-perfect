import { createFileRoute } from "@tanstack/react-router";
import { PageHero, QuoteBand } from "@/components/site/SiteChrome";
import { Accountability } from "@/components/home/Sections";
import { Reveal } from "@/components/site/Reveal";
import { company, images, process } from "@/content/site";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () =>
    pageHead({
      title: "About Apexon | The Accountable Engineering Team, Nairobi",
      description:
        "Apexon Global Technologies is a Nairobi-based technology solutions company delivering networking, IT infrastructure, IPTV and AV systems with engineering discipline.",
      path: "/about",
    }),
  component: About,
});

function About() {
  return (
    <>
      <PageHero
        eyebrow="About Apexon"
        title={company.positioning + "."}
        body="A Nairobi-based technology solutions company focused on doing the infrastructure work properly, and standing behind it."
        image={images.technician}
      />
      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-2 md:py-24">
        <Reveal>
          <h2 className="redline text-3xl font-extrabold tracking-tight md:text-4xl">Who we are</h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Apexon Global Technologies designs, installs, and maintains networking, IT
            infrastructure, and IPTV / audiovisual systems for government institutions, corporate
            organisations, and technology partners.
          </p>
          <p className="mt-4 text-lg text-muted-foreground">
            Our promise is simple: {company.tagline.toLowerCase()} Every job is planned, tested,
            documented, and handed over with clear responsibility.
          </p>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="redline text-3xl font-extrabold tracking-tight md:text-4xl">
            How we deliver
          </h2>
          <ol className="mt-6 space-y-3">
            {process.map((p, i) => (
              <li key={p} className="flex items-center gap-4 border-b pb-3 text-lg font-semibold">
                <span className="font-mono text-sm text-primary">0{i + 1}</span> {p}
              </li>
            ))}
          </ol>
        </Reveal>
      </section>
      <section className="mx-auto max-w-7xl px-6 pb-16 md:pb-24">
        <h2 className="mb-10 text-3xl font-extrabold tracking-tight md:text-4xl">
          Our working principles
        </h2>
        <Accountability />
      </section>
      <QuoteBand />
    </>
  );
}
