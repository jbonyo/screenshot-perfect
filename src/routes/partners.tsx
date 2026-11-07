import { createFileRoute } from "@tanstack/react-router";
import { PartnerForm } from "@/components/forms/PartnerForm";
import { PageHero } from "@/components/site/SiteChrome";
import { audiences, images, partnersWeWorkWith, projectScope, serviceArea } from "@/content/site";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/partners")({
  head: () =>
    pageHead({
      title: "Partners & Subcontractors | Apexon Global Technologies",
      description:
        "Main contractors, technology vendors, integrators and specialist subcontractors: work with Apexon on networking, IT infrastructure, IPTV and AV projects in Kenya.",
      path: "/partners",
    }),
  component: Partners,
});

function Partners() {
  return (
    <>
      <PageHero
        eyebrow="Partners & subcontractors"
        title="Deliver together."
        body="A disciplined installation and documentation team to work alongside your project or product."
        image={images.technician}
      />
      <section className="mx-auto max-w-7xl px-6 pt-16 md:pt-24">
        <h2 className="redline text-3xl font-extrabold tracking-tight md:text-4xl">Who we serve</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {audiences.map((a) => (
            <div key={a.title} className="rounded-lg border bg-card p-6">
              <h3 className="text-xl font-bold">{a.title}</h3>
              <p className="mt-2 text-muted-foreground">{a.body}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-[1fr_1.4fr] md:py-24">
        <div className="space-y-6 text-lg">
          <h2 className="redline text-3xl font-extrabold tracking-tight">Work with us</h2>
          <p className="text-muted-foreground">We work with:</p>
          <ul className="list-disc space-y-1 pl-6">
            {partnersWeWorkWith.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          <p className="text-muted-foreground">{projectScope}</p>
          <p className="text-muted-foreground">{serviceArea}</p>
        </div>
        <PartnerForm />
      </section>
    </>
  );
}
