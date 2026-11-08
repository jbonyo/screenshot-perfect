import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { Photo } from "@/components/site/Photo";
import { PageHero, QuoteBand } from "@/components/site/SiteChrome";
import { guides, guidesIntro, images, kenyanConditions } from "@/content/site";
import { readingMinutes } from "@/lib/guides";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/guides/")({
  head: () =>
    pageHead({
      title: "Guides: Networking, Wi-Fi, IPTV and Maintenance | Apexon Global Technologies",
      description:
        "Plain-English guides on structured cabling, office Wi-Fi, IPTV, preventive maintenance and building networks for Kenyan conditions.",
      path: "/guides",
    }),
  component: GuidesIndex,
});

function GuidesIndex() {
  const kenya = guides.find((g) => g.slug === kenyanConditions.guide)!;
  return (
    <>
      <PageHero
        eyebrow="Guides"
        title="Know what good looks like"
        body={guidesIntro}
        image={images.rack}
      />
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
          {guides.map((g, i) => (
            <li
              key={g.slug}
              className={i < 2 ? "lg:col-span-3" : "sm:last:col-span-2 lg:col-span-2"}
            >
              <Link
                to="/guides/$slug"
                params={{ slug: g.slug }}
                className="group flex h-full flex-col overflow-hidden rounded-lg border bg-card transition-shadow hover:shadow-lg"
              >
                <Photo
                  photo={g.image}
                  alt=""
                  sizes="(min-width: 1024px) 600px, (min-width: 640px) 50vw, 100vw"
                  className="aspect-[16/9] w-full object-cover"
                />
                <span className="flex flex-1 flex-col p-6">
                  <span className="text-sm text-muted-foreground">
                    {readingMinutes(g)} min read
                  </span>
                  <span className="mt-2 text-xl font-bold group-hover:text-primary">{g.title}</span>
                  <span className="mt-2 flex-1 text-muted-foreground">{g.summary}</span>
                  <span className="mt-4 inline-flex items-center gap-2 font-semibold text-primary">
                    Read the guide <ArrowRight className="h-4 w-4" aria-hidden />
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <section
          aria-labelledby="kenya-checklist"
          className="mt-20 rounded-lg border bg-card p-6 md:p-10"
        >
          <p className="eyebrow">Local conditions</p>
          <h2 id="kenya-checklist" className="mt-3 text-3xl font-extrabold tracking-tight">
            {kenyanConditions.title}
          </h2>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {kenyanConditions.items.map((item) => (
              <li key={item.title} className="flex items-start gap-3">
                <Check className="mt-1 h-5 w-5 shrink-0 text-primary" aria-hidden />
                <span>
                  <span className="block font-semibold">{item.title}</span>
                  <span className="text-muted-foreground">{item.body}</span>
                </span>
              </li>
            ))}
          </ul>
          <Link
            to="/guides/$slug"
            params={{ slug: kenya.slug }}
            className="mt-8 inline-flex min-h-11 items-center gap-2 font-semibold text-primary underline underline-offset-4"
          >
            Read the full checklist <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </section>
      </div>
      <QuoteBand />
    </>
  );
}
