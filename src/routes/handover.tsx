import { createFileRoute } from "@tanstack/react-router";
import { Download } from "lucide-react";
import { Handover } from "@/components/home/Sections";
import { PageHero, QuoteBand } from "@/components/site/SiteChrome";
import { downloads, handover, images } from "@/content/site";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/handover")({
  head: () =>
    pageHead({
      title: "Handover Pack: What You Receive | Apexon Global Technologies",
      description:
        "Every Apexon handover includes test results, a labelling scheme, as-built drawings, a walkthrough and sign-off. Download sample documents.",
      path: "/handover",
    }),
  component: HandoverPage,
});

function HandoverPage() {
  return (
    <>
      <PageHero
        eyebrow="Handover pack"
        title={`${handover.title}.`}
        body={handover.body}
        image={images.rack}
      />
      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24" aria-labelledby="parts-title">
        <h2
          id="parts-title"
          className="redline mb-8 text-3xl font-extrabold tracking-tight md:text-4xl"
        >
          The five parts of every handover
        </h2>
        <Handover />
      </section>
      <section className="mx-auto max-w-7xl px-6 pb-16 md:pb-24" aria-labelledby="samples-title">
        <h2
          id="samples-title"
          className="redline text-3xl font-extrabold tracking-tight md:text-4xl"
        >
          Sample documents
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          These samples show the format of what you receive. They use made-up data and are marked
          SAMPLE on every page.
        </p>
        <ul className="mt-8 grid gap-6 sm:grid-cols-2">
          {downloads.samples.map((s) => (
            <li key={s.file} className="flex flex-col rounded-lg border bg-card p-6">
              <h3 className="text-xl font-bold">{s.title}</h3>
              <p className="mt-2 flex-1 text-muted-foreground">{s.body}</p>
              <a
                href={s.file}
                download
                className="btn btn-outline-dark mt-5 self-start"
                data-umami-event="sample_download"
                data-umami-event-file={s.title}
              >
                <Download className="h-4 w-4" aria-hidden /> Download sample (PDF)
                <span className="sr-only">: {s.title}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
      <QuoteBand />
    </>
  );
}
