import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, Check, ChevronLeft, ChevronRight, X } from "lucide-react";
import {
  gallery,
  handover,
  illustrativeLabel,
  principles,
  services,
  showTestimonials,
  testimonials,
} from "@/content/site";
import { Photo } from "@/components/site/Photo";
import { Reveal } from "@/components/site/Reveal";
import { useFocusTrap } from "@/hooks/use-focus-trap";

export function ServiceCards() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {services.map((s, i) => (
        <Reveal key={s.slug} delay={i * 100}>
          <article className="group flex h-full flex-col overflow-hidden rounded-lg border bg-card transition hover:-translate-y-1 hover:shadow-[var(--shadow-card)]">
            <div className="aspect-[16/10] overflow-hidden">
              <Photo
                photo={s.image}
                alt={s.alt}
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-1 flex-col p-6">
              <span className="font-mono text-xs text-primary">0{i + 1}</span>
              <h3 className="mt-2 text-xl font-bold tracking-tight">{s.title}</h3>
              <p className="mt-3 text-muted-foreground">{s.short}</p>
              <div className="mt-auto flex flex-wrap gap-x-5 gap-y-2 pt-6 text-sm font-bold">
                <Link
                  to="/services"
                  hash={s.slug}
                  className="inline-flex min-h-11 items-center gap-1 hover:text-primary"
                >
                  Explore <span className="sr-only">{s.title}</span>
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex min-h-11 items-center text-primary hover:underline"
                >
                  Request a quote
                </Link>
              </div>
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  );
}

export function Handover() {
  return (
    <ol className="grid gap-px overflow-hidden rounded-lg border bg-border sm:grid-cols-2 lg:grid-cols-5">
      {handover.items.map((item, i) => (
        <li key={item.title} className="bg-card p-6">
          <span className="font-mono text-sm text-primary">0{i + 1}</span>
          <h3 className="mt-4 text-lg font-bold">{item.title}</h3>
          <p className="mt-2 text-muted-foreground">{item.body}</p>
        </li>
      ))}
    </ol>
  );
}

export function Accountability() {
  if (showTestimonials && testimonials.length) {
    return (
      <div className="grid gap-6 md:grid-cols-2">
        {testimonials.map((t) => (
          <figure key={t.name} className="rounded-lg border bg-card p-8">
            <blockquote className="text-xl font-semibold">“{t.quote}”</blockquote>
            <figcaption className="mt-6 text-sm text-muted-foreground">
              {t.name}, {t.role} — {t.organisation}
            </figcaption>
          </figure>
        ))}
      </div>
    );
  }
  return (
    <div className="grid gap-px overflow-hidden rounded-lg border bg-border sm:grid-cols-2 lg:grid-cols-4">
      {principles.map((p, i) => (
        <Reveal key={p.title} delay={i * 80} className="h-full">
          <div className="h-full bg-card p-8">
            <span className="grid h-10 w-10 place-items-center rounded-md bg-brand text-primary-foreground">
              <Check className="h-5 w-5" aria-hidden />
            </span>
            <h3 className="mt-6 text-xl font-bold">{p.title}</h3>
            <p className="mt-2 text-muted-foreground">{p.body}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

export function Gallery() {
  const [open, setOpen] = useState<number | null>(null);
  const n = gallery.length;
  const dialogRef = useFocusTrap<HTMLDivElement>(open !== null, () => setOpen(null));
  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setOpen((x) => (x === null ? x : (x + 1) % n));
      if (e.key === "ArrowLeft") setOpen((x) => (x === null ? x : (x - 1 + n) % n));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, n]);
  const spans = [
    "md:col-span-2 md:row-span-2",
    "",
    "",
    "md:col-span-2",
    "",
    "",
    "md:col-span-2",
    "",
  ];
  const current = open === null ? null : gallery[open]!;
  return (
    <>
      <div className="grid auto-rows-[180px] grid-cols-2 gap-3 md:auto-rows-[200px] md:grid-cols-4">
        {gallery.map((g, i) => (
          <Reveal key={g.alt} delay={(i % 4) * 70} className={spans[i] ?? ""}>
            <button
              type="button"
              onClick={() => setOpen(i)}
              className="group relative h-full w-full overflow-hidden rounded-md bg-muted"
              aria-label={`View larger: ${g.alt}`}
            >
              <Photo
                photo={g.src}
                alt=""
                sizes="(min-width: 768px) 50vw, 50vw"
                className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
              />
              <span className="absolute inset-0 bg-ink/0 transition group-hover:bg-ink/30" />
            </button>
          </Reveal>
        ))}
      </div>
      <p className="mt-4 text-sm text-muted-foreground">
        All photos are illustrative. Apexon project photos will be added once approved.
      </p>
      {current && open !== null && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          className="surface-dark fixed inset-0 z-50 grid place-items-center bg-ink/95 p-4 animate-in fade-in"
          onClick={() => setOpen(null)}
        >
          <figure
            className="flex max-w-full flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Photo
              photo={current.src}
              alt={current.alt}
              sizes="100vw"
              priority
              className="max-h-[78vh] w-auto max-w-full rounded-md object-contain"
            />
            <figcaption className="mt-4 text-center text-paper">
              {current.alt}{" "}
              <span className="text-paper/70">({illustrativeLabel.toLowerCase()})</span>
            </figcaption>
          </figure>
          <button
            autoFocus
            type="button"
            aria-label="Close image viewer"
            onClick={() => setOpen(null)}
            className="absolute right-4 top-4 grid h-12 w-12 place-items-center rounded-md bg-paper text-ink"
          >
            <X aria-hidden />
          </button>
          <button
            type="button"
            aria-label="Previous image"
            onClick={(e) => {
              e.stopPropagation();
              setOpen((open - 1 + n) % n);
            }}
            className="absolute left-4 top-1/2 grid h-12 w-12 place-items-center rounded-md bg-paper text-ink"
          >
            <ChevronLeft aria-hidden />
          </button>
          <button
            type="button"
            aria-label="Next image"
            onClick={(e) => {
              e.stopPropagation();
              setOpen((open + 1) % n);
            }}
            className="absolute right-4 top-1/2 grid h-12 w-12 place-items-center rounded-md bg-paper text-ink"
          >
            <ChevronRight aria-hidden />
          </button>
        </div>
      )}
    </>
  );
}
