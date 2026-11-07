import { createFileRoute } from "@tanstack/react-router";
import { Download } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import {
  company,
  companyDocuments,
  contact,
  downloads,
  egpRegistration,
  handover,
  process,
  projectScope,
  serviceArea,
  services,
  team,
} from "@/content/site";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/capability-statement")({
  head: () =>
    pageHead({
      title: "Capability Statement | Apexon Global Technologies",
      description:
        "Apexon Global Technologies capability statement: services, team, delivery process, handover documentation, compliance and contacts.",
      path: "/capability-statement",
    }),
  component: CapabilityStatement,
});

// One page, built from the site content, that prints cleanly to A4. The PDF in
// public/downloads is generated from this page (see docs/phase-3-report.md).
function CapabilityStatement() {
  return (
    <div className="bg-muted py-10 print:bg-white print:py-0">
      <div className="mx-auto mb-6 flex max-w-[210mm] justify-end px-4 print:hidden">
        <a href={downloads.capabilityStatement} download className="btn btn-primary">
          <Download className="h-4 w-4" aria-hidden /> Download PDF
        </a>
      </div>
      <article className="mx-auto max-w-[210mm] bg-card p-8 text-[15px] leading-relaxed shadow-[var(--shadow-card)] md:p-12 print:max-w-none print:p-0 print:shadow-none">
        <header className="flex flex-wrap items-end justify-between gap-4 border-b-4 border-brand pb-5">
          <div>
            <Logo tone="light" className="w-56" />
            <p className="mt-2 font-semibold">{company.tagline}</p>
          </div>
          <div className="text-right">
            <h1 className="text-2xl font-extrabold tracking-tight">Capability Statement</h1>
            <p className="text-sm text-muted-foreground">{company.positioning}</p>
          </div>
        </header>

        <section className="mt-6 grid gap-6 sm:grid-cols-2 print:grid-cols-2">
          <div>
            <h2 className="eyebrow">Who we are</h2>
            <p className="mt-2">
              {company.name} designs, installs, tests, documents and maintains networking, IT
              infrastructure, and IPTV and audiovisual systems for government institutions,
              corporate organisations and technology partners.
            </p>
            <p className="mt-2">{team.summary}</p>
          </div>
          <div>
            <h2 className="eyebrow">Coverage and scope</h2>
            <p className="mt-2">{serviceArea}</p>
            <p className="mt-2">{projectScope}</p>
          </div>
        </section>

        <section className="mt-6 break-inside-avoid">
          <h2 className="eyebrow">Services</h2>
          <div className="mt-3 grid gap-4 sm:grid-cols-2 print:grid-cols-2">
            {services.map((s) => (
              <div key={s.slug} className="rounded-md border p-4">
                <h3 className="font-bold">{s.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{s.short}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-6 grid gap-6 sm:grid-cols-2 print:grid-cols-2 break-inside-avoid">
          <div>
            <h2 className="eyebrow">How we deliver</h2>
            <ol className="mt-2 list-decimal space-y-0.5 pl-5">
              {process.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ol>
          </div>
          <div>
            <h2 className="eyebrow">Every handover includes</h2>
            <ul className="mt-2 list-disc space-y-0.5 pl-5">
              {handover.items.map((h) => (
                <li key={h.title}>{h.title}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-6 grid gap-6 sm:grid-cols-2 print:grid-cols-2 break-inside-avoid">
          <div>
            <h2 className="eyebrow">Compliance</h2>
            <p className="mt-2">
              {egpRegistration.label}: <span className="font-mono">{egpRegistration.number}</span>
            </p>
            <p className="mt-2 text-sm text-muted-foreground">Available on request:</p>
            <ul className="mt-1 list-disc pl-5 text-sm">
              {companyDocuments.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="eyebrow">Contact</h2>
            <ul className="mt-2 space-y-1">
              <li>Phone and WhatsApp: {contact.phone.value}</li>
              <li>Email: {contact.email.value}</li>
              <li>{contact.location.value}</li>
              <li>{contact.hours.value}</li>
            </ul>
          </div>
        </section>
      </article>
    </div>
  );
}
