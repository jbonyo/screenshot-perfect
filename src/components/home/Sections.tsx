import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, Check, ChevronLeft, ChevronRight, Pause, Play, X } from "lucide-react";
import { gallery, images, principles, services, showTestimonials, testimonials } from "@/content/site";
import { Reveal } from "@/components/site/Reveal";

const solutions = [
  { title: "Structured Cabling", tag: "Networking", image: images.rack },
  { title: "Enterprise Wi-Fi", tag: "IT Infrastructure", image: images.wifi },
  { title: "Boardroom AV", tag: "Audiovisual", image: images.boardroom },
  { title: "IPTV Distribution", tag: "IPTV", image: images.iptv },
  { title: "Testing & Certification", tag: "Delivery", image: images.testing },
  { title: "Cable Containment", tag: "Networking", image: images.cabletray },
];

export function FeaturedSolutions() {
  const [paused, setPaused] = useState(false);
  const Card = ({ s, hidden }: { s: (typeof solutions)[number]; hidden?: boolean }) => (
    <Link
      to="/services"
      tabIndex={hidden ? -1 : 0}
      aria-hidden={hidden}
      className="group relative block h-80 w-72 shrink-0 overflow-hidden rounded-lg bg-ink-soft shadow-[var(--shadow-card)] md:w-80"
    >
      <img src={s.image} alt="" loading="lazy" width={640} height={360} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
      <div className="absolute inset-0" style={{ background: "var(--overlay-card)" }} />
      <div className="absolute inset-x-0 bottom-0 p-6 text-paper">
        <p className="font-mono text-xs uppercase tracking-widest text-primary">{s.tag}</p>
        <p className="mt-2 text-2xl font-black tracking-tight">{s.title}</p>
        <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold opacity-80 group-hover:opacity-100">
          Learn more <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
  return (
    <section className="overflow-hidden bg-ink py-20 text-paper">
      <div className="mx-auto mb-10 flex max-w-7xl flex-wrap items-end justify-between gap-4 px-6">
        <div>
          <p className="eyebrow">Featured Solutions</p>
          <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">What we put in the ceiling, the rack, and the room.</h2>
        </div>
        <button type="button" onClick={() => setPaused((p) => !p)} className="btn btn-outline-light" aria-pressed={paused}>
          {paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />} {paused ? "Play" : "Pause"}
        </button>
      </div>
      <div className="marquee-viewport overflow-hidden">
        <div className="marquee-track animate-marquee flex w-max gap-6 px-3" data-paused={paused}>
          {solutions.map((s) => <Card key={s.title} s={s} />)}
          <div className="marquee-dup flex gap-6">
            {solutions.map((s) => <Card key={`d-${s.title}`} s={s} hidden />)}
          </div>
        </div>
      </div>
    </section>
  );
}

export function ServiceCards() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {services.map((s, i) => (
        <Reveal key={s.slug} delay={i * 100}>
          <article className="group flex h-full flex-col overflow-hidden rounded-lg border bg-card transition hover:-translate-y-1 hover:shadow-[var(--shadow-card)]">
            <div className="aspect-[16/10] overflow-hidden">
              <img src={s.image} alt={s.alt} loading="lazy" width={640} height={400} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
            </div>
            <div className="flex flex-1 flex-col p-6">
              <span className="font-mono text-xs text-primary">0{i + 1}</span>
              <h3 className="mt-2 text-2xl font-black tracking-tight">{s.title}</h3>
              <p className="mt-3 text-muted-foreground">{s.short}</p>
              <div className="mt-auto flex flex-wrap gap-4 pt-6 text-sm font-bold">
                <Link to="/services" hash={s.slug} className="inline-flex items-center gap-1 hover:text-primary">
                  Explore <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/contact" className="text-primary hover:underline">Request a quote</Link>
              </div>
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  );
}

export function Accountability() {
  if (showTestimonials && testimonials.length) {
    return (
      <div className="grid gap-6 md:grid-cols-2">
        {testimonials.map((t) => (
          <figure key={t.name} className="rounded-lg border bg-card p-8">
            <blockquote className="text-xl font-semibold">“{t.quote}”</blockquote>
            <figcaption className="mt-6 text-sm text-muted-foreground">{t.name}, {t.role} — {t.organisation}</figcaption>
          </figure>
        ))}
      </div>
    );
  }
  return (
    <div className="grid gap-px overflow-hidden rounded-lg border bg-border sm:grid-cols-2 lg:grid-cols-4">
      {principles.map((p, i) => (
        <Reveal key={p.title} delay={i * 80} className="h-full">
          <div className="group h-full bg-card p-8 transition hover:bg-ink hover:text-paper">
            <span className="grid h-10 w-10 place-items-center rounded-md bg-primary text-primary-foreground">
              <Check className="h-5 w-5" />
            </span>
            <h3 className="mt-6 text-xl font-black">{p.title}</h3>
            <p className="mt-2 text-muted-foreground group-hover:text-paper-muted">{p.body}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

export function Gallery() {
  const [open, setOpen] = useState<number | null>(null);
  const n = gallery.length;
  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((x) => (x === null ? x : (x + 1) % n));
      if (e.key === "ArrowLeft") setOpen((x) => (x === null ? x : (x - 1 + n) % n));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, n]);
  const spans = ["md:col-span-2 md:row-span-2", "", "", "md:col-span-2", "", "", "md:col-span-2", ""];
  return (
    <>
      <div className="grid auto-rows-[180px] grid-cols-2 gap-3 md:auto-rows-[200px] md:grid-cols-4">
        {gallery.map((g, i) => (
          <Reveal key={i} delay={(i % 4) * 70} className={spans[i] ?? ""}>
            <button
              type="button"
              onClick={() => setOpen(i)}
              className="group relative h-full w-full overflow-hidden rounded-md bg-muted"
              aria-label={`View larger: ${g.alt}`}
            >
              <img src={g.src} alt={g.alt} loading="lazy" width={800} height={450} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
              <span className="absolute inset-0 bg-ink/0 transition group-hover:bg-ink/30" />
            </button>
          </Reveal>
        ))}
      </div>
      <p className="mt-4 text-xs text-muted-foreground">Illustrative stock photography. Apexon project photos will be added once approved.</p>
      {open !== null && (
        <div role="dialog" aria-modal="true" aria-label="Image viewer" className="fixed inset-0 z-50 grid place-items-center bg-ink/95 p-4 animate-in fade-in" onClick={() => setOpen(null)}>
          <img src={gallery[open].src} alt={gallery[open].alt} className="max-h-[80vh] max-w-full rounded-md object-contain" onClick={(e) => e.stopPropagation()} />
          <p className="mt-4 text-center text-paper">{gallery[open].alt}</p>
          <button autoFocus type="button" aria-label="Close" onClick={() => setOpen(null)} className="absolute right-4 top-4 grid h-12 w-12 place-items-center rounded-md bg-paper text-ink"><X /></button>
          <button type="button" aria-label="Previous image" onClick={(e) => { e.stopPropagation(); setOpen((open - 1 + n) % n); }} className="absolute left-4 top-1/2 grid h-12 w-12 place-items-center rounded-md bg-paper text-ink"><ChevronLeft /></button>
          <button type="button" aria-label="Next image" onClick={(e) => { e.stopPropagation(); setOpen((open + 1) % n); }} className="absolute right-4 top-1/2 grid h-12 w-12 place-items-center rounded-md bg-paper text-ink"><ChevronRight /></button>
        </div>
      )}
    </>
  );
}
