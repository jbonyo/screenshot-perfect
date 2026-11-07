import { createFileRoute, Link } from "@tanstack/react-router";
import { BadgeCheck, FileText, Download } from "lucide-react";
import { DocumentRequestForm } from "@/components/forms/DocumentRequestForm";
import { PageHero } from "@/components/site/SiteChrome";
import { companyDocuments, downloads, egpRegistration, images } from "@/content/site";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/compliance")({
  head: () =>
    pageHead({
      title: "Compliance & Company Documents | Apexon Global Technologies",
      description:
        "Apexon Global Technologies is a registered supplier on Kenya's e-GP system. Company registration and tax compliance documents are available on request for tenders.",
      path: "/compliance",
    }),
  component: Compliance,
});

function Compliance() {
  return (
    <>
      <PageHero
        eyebrow="Compliance & documents"
        title="Documents for tenders and onboarding."
        body="Request the company documents your procurement process needs. We send them directly to your team."
        image={images.fibrePanel}
      />
      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-[1fr_1.3fr] md:py-24">
        <div className="space-y-8">
          <div className="rounded-lg border bg-card p-6">
            <BadgeCheck className="h-8 w-8 text-primary" aria-hidden />
            <h2 className="mt-3 text-xl font-bold">{egpRegistration.label}</h2>
            <p className="mt-1 font-mono text-lg">{egpRegistration.number}</p>
          </div>
          <div>
            <h2 className="redline text-2xl font-extrabold">Available on request</h2>
            <ul className="mt-5 space-y-3">
              {companyDocuments.map((d) => (
                <li key={d} className="flex items-center gap-3 text-lg">
                  <FileText className="h-5 w-5 shrink-0 text-primary" aria-hidden />
                  {d}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-muted-foreground">
              We list only the registrations we hold. Copies are shared directly with the
              organisation requesting them.
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <h2 className="text-xl font-bold">For your tender file</h2>
            <ul className="mt-3 space-y-2">
              <li>
                <a
                  href={downloads.capabilityStatement}
                  download
                  className="inline-flex min-h-11 items-center gap-2 font-semibold text-primary underline underline-offset-4"
                >
                  <Download className="h-4 w-4" aria-hidden /> Capability statement (PDF)
                </a>
              </li>
              <li>
                <Link
                  to="/handover"
                  className="inline-flex min-h-11 items-center font-semibold text-primary underline underline-offset-4"
                >
                  Sample handover documents
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <DocumentRequestForm />
      </section>
    </>
  );
}
