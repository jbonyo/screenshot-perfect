import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { PageHero, QuoteBand } from "@/components/site/SiteChrome";
import { images, maintenancePlans, maintenanceTerms } from "@/content/site";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/maintenance-plans")({
  head: () =>
    pageHead({
      title: "Maintenance Plans | Apexon Global Technologies",
      description:
        "Maintenance plans for networks, Wi-Fi, IPTV and AV, built around your site: visit frequency, fault response times and hours agreed with you in writing.",
      path: "/maintenance-plans",
    }),
  component: MaintenancePlans,
});

function MaintenancePlans() {
  return (
    <>
      <PageHero
        eyebrow="Maintenance plans"
        title="Maintenance built around your site"
        body={maintenancePlans.intro}
        image={images.testing}
      />
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <section aria-labelledby="choices">
          <h2 id="choices" className="text-3xl font-extrabold tracking-tight md:text-4xl">
            What you choose
          </h2>
          <p className="mt-3 max-w-2xl text-lg text-muted-foreground">{maintenanceTerms}</p>
          <ul className="mt-10 grid gap-px overflow-hidden rounded-lg border bg-border sm:grid-cols-2">
            {maintenancePlans.choices.map((c) => (
              <li key={c.title} className="bg-card p-6">
                <h3 className="text-xl font-bold">{c.title}</h3>
                <p className="mt-2 text-muted-foreground">{c.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-20 grid gap-12 lg:grid-cols-2">
          <section aria-labelledby="visit">
            <h2 id="visit" className="text-3xl font-extrabold tracking-tight">
              What a visit covers
            </h2>
            <ul className="mt-6 space-y-3 text-lg">
              {maintenancePlans.visitCovers.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="mt-1 h-5 w-5 shrink-0 text-primary" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </section>
          <section aria-labelledby="how">
            <h2 id="how" className="text-3xl font-extrabold tracking-tight">
              How a plan is agreed
            </h2>
            <ol className="mt-6 space-y-4">
              {maintenancePlans.steps.map((step, i) => (
                <li key={step} className="flex items-start gap-4 text-lg">
                  <span className="font-mono text-sm leading-7 text-primary">0{i + 1}</span>
                  {step}
                </li>
              ))}
            </ol>
          </section>
        </div>

        <section
          aria-labelledby="next"
          className="mt-20 flex flex-col gap-6 rounded-lg border bg-card p-6 md:flex-row md:items-center md:justify-between md:p-10"
        >
          <div>
            <h2 id="next" className="text-2xl font-extrabold tracking-tight">
              Start with a free survey
            </h2>
            <p className="mt-2 text-muted-foreground">
              We document what you have, then propose a plan to suit it.{" "}
              <Link
                to="/guides/$slug"
                params={{ slug: "preventive-maintenance-checklist" }}
                className="font-semibold text-primary underline underline-offset-4"
              >
                See our preventive maintenance checklist
              </Link>
              .
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <Link to="/contact" search={{ service: "maintenance" }} className="btn btn-primary">
              Ask about a plan <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link to="/support" className="btn btn-outline-dark">
              Report a fault
            </Link>
          </div>
        </section>
      </div>
      <QuoteBand />
    </>
  );
}
