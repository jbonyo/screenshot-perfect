import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Photo } from "@/components/site/Photo";
import { cta, hero } from "@/content/site";

// Static hero: one message, one main action. No motion, so the headline
// paints immediately and nothing moves that a visitor cannot stop.
export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="surface-dark relative isolate flex min-h-[min(80vh,720px)] items-center overflow-hidden bg-ink text-paper"
    >
      <Photo
        photo={hero.image}
        alt={hero.alt}
        priority
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10" style={{ background: "var(--overlay-hero)" }} />
      <div className="mx-auto w-full max-w-7xl px-6 py-20 md:py-28">
        <p className="eyebrow">{hero.eyebrow}</p>
        <h1
          id="hero-title"
          className="mt-4 max-w-3xl text-[clamp(2.5rem,7vw+1rem,5rem)] font-extrabold leading-[0.98] tracking-tight"
        >
          {hero.title}
        </h1>
        <p className="mt-6 max-w-xl text-lg text-paper/85 md:text-xl">{hero.body}</p>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
          <Link to={cta.quote.to} className="btn btn-primary h-14 px-7 text-base">
            {cta.quote.label} <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
          <Link
            to={cta.services.to}
            className="inline-flex min-h-12 items-center gap-2 font-semibold text-paper underline decoration-paper/40 underline-offset-8 hover:decoration-paper"
          >
            Our services
          </Link>
        </div>
      </div>
    </section>
  );
}
