import { Link } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { heroSlides } from "@/content/site";

export function HeroCarousel() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = heroSlides.length;
  const go = useCallback((d: number) => setI((x) => (x + d + n) % n), [n]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (paused || reduce) return;
    const t = setInterval(() => go(1), 6500);
    return () => clearInterval(t);
  }, [paused, go]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Highlights"
      className="relative isolate h-[min(88vh,760px)] min-h-[560px] overflow-hidden bg-ink text-paper"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(1);
        if (e.key === "ArrowLeft") go(-1);
      }}
    >
      {heroSlides.map((s, idx) => {
        const active = idx === i;
        return (
          <div
            key={s.title}
            role="group"
            aria-roledescription="slide"
            aria-label={`${idx + 1} of ${n}`}
            aria-hidden={!active}
            className={`absolute inset-0 transition-opacity duration-1000 ${active ? "opacity-100" : "pointer-events-none opacity-0"}`}
          >
            <img
              src={s.image}
              alt={s.alt}
              width={1920}
              height={1088}
              loading={idx === 0 ? "eager" : "lazy"}
              className={`absolute inset-0 -z-10 h-full w-full object-cover ${active ? "animate-kenburns" : ""}`}
            />
            <div className="absolute inset-0 -z-10" style={{ background: "var(--overlay-hero)" }} />
            {active && (
              <div className="mx-auto flex h-full max-w-7xl flex-col justify-center px-6 pb-16">
                <p className="eyebrow animate-rise">{s.eyebrow}</p>
                <h1
                  className="mt-4 max-w-3xl text-5xl font-black leading-[0.95] tracking-tight animate-rise sm:text-6xl md:text-7xl"
                  style={{ animationDelay: "100ms" }}
                >
                  {s.title}
                </h1>
                <p
                  className="mt-6 max-w-xl text-lg text-paper/85 animate-rise md:text-xl"
                  style={{ animationDelay: "200ms" }}
                >
                  {s.body}
                </p>
                <div
                  className="mt-8 flex flex-wrap gap-3 animate-rise"
                  style={{ animationDelay: "300ms" }}
                >
                  <Link
                    to={s.cta.to}
                    tabIndex={active ? 0 : -1}
                    className="btn btn-primary h-14 px-7 text-base"
                  >
                    {s.cta.label} <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    to="/services"
                    tabIndex={active ? 0 : -1}
                    className="btn btn-outline-light h-14 px-7 text-base"
                  >
                    Our Services
                  </Link>
                </div>
              </div>
            )}
          </div>
        );
      })}

      <div className="absolute inset-x-0 bottom-6 mx-auto flex max-w-7xl items-center justify-between gap-4 px-6">
        <div className="flex gap-2">
          {heroSlides.map((s, idx) => (
            <button
              key={s.title}
              type="button"
              onClick={() => setI(idx)}
              aria-label={`Go to slide ${idx + 1}: ${s.title}`}
              aria-current={idx === i}
              className="group flex h-11 items-center"
            >
              <span
                className={`block h-1 rounded-full transition-all ${idx === i ? "w-12 bg-primary" : "w-6 bg-paper/40 group-hover:bg-paper"}`}
              />
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous slide"
            className="grid h-12 w-12 place-items-center rounded-md border-2 border-paper/50 hover:bg-paper hover:text-ink"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next slide"
            className="grid h-12 w-12 place-items-center rounded-md border-2 border-paper/50 hover:bg-paper hover:text-ink"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
