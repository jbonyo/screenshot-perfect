import { useId, useRef, useState, type KeyboardEvent } from "react";
import {
  Cable,
  Laptop,
  Network,
  PanelsTopLeft,
  Plug,
  RadioTower,
  Server,
  Tv,
  type LucideIcon,
} from "lucide-react";
import { diagrams, type DiagramId } from "@/content/site";
import { cn } from "@/lib/utils";

const icons: Record<string, LucideIcon> = {
  switch: Server,
  "patch-panel": PanelsTopLeft,
  "cable-run": Cable,
  outlet: Plug,
  device: Laptop,
  sources: RadioTower,
  headend: Server,
  network: Network,
  screens: Tv,
};

// Interactive signal-path diagram drawn with inline SVG. It follows the ARIA tabs
// pattern: arrow keys, Home and End move between parts, and the panel below explains
// the selected part. The moving "signal" on the connector only runs when the
// visitor allows motion, and a full text version sits underneath.
export function Diagram({ id }: { id: DiagramId }) {
  const diagram = diagrams[id];
  const parts = diagram.parts;
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const base = useId();
  const part = parts[active]!;
  const Icon = icons[part.id] ?? Network;

  const select = (i: number) => {
    const next = (i + parts.length) % parts.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  const onKeyDown = (e: KeyboardEvent) => {
    const moves: Record<string, number> = {
      ArrowRight: active + 1,
      ArrowDown: active + 1,
      ArrowLeft: active - 1,
      ArrowUp: active - 1,
      Home: 0,
      End: parts.length - 1,
    };
    const target = moves[e.key];
    if (target === undefined) return;
    e.preventDefault();
    select(target);
  };

  return (
    <figure className="not-prose my-10 rounded-lg border bg-card p-5 md:p-8 print:break-inside-avoid">
      <figcaption>
        <h2 className="text-2xl font-extrabold tracking-tight">{diagram.title}</h2>
        <p className="mt-2 text-muted-foreground">{diagram.intro}</p>
      </figcaption>

      <div className="relative mt-8">
        {/* Connector: vertical on phones, horizontal from md up. Decorative. */}
        <svg
          aria-hidden
          className="absolute left-7 top-7 bottom-7 w-1 md:hidden"
          preserveAspectRatio="none"
          viewBox="0 0 4 100"
        >
          <line x1="2" y1="0" x2="2" y2="100" className="diagram-line" />
          <line x1="2" y1="0" x2="2" y2="100" className="diagram-signal" />
        </svg>
        <svg
          aria-hidden
          className="absolute inset-x-[10%] top-7 hidden h-1 w-[80%] md:block"
          preserveAspectRatio="none"
          viewBox="0 0 100 4"
        >
          <line x1="0" y1="2" x2="100" y2="2" className="diagram-line" />
          <line x1="0" y1="2" x2="100" y2="2" className="diagram-signal" />
        </svg>

        <div
          role="tablist"
          aria-label={diagram.title}
          onKeyDown={onKeyDown}
          className="relative grid gap-3 md:grid-flow-col md:auto-cols-fr md:gap-4"
        >
          {parts.map((p, i) => {
            const PartIcon = icons[p.id] ?? Network;
            const selected = i === active;
            return (
              <button
                key={p.id}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`${base}-tab-${p.id}`}
                aria-selected={selected}
                aria-controls={`${base}-panel`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(i)}
                className="group flex min-h-14 items-center gap-4 rounded-lg text-left md:flex-col md:text-center"
              >
                <span
                  className={cn(
                    "grid h-14 w-14 shrink-0 place-items-center rounded-full border-2 transition-colors",
                    selected
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background text-foreground group-hover:border-primary",
                  )}
                >
                  <PartIcon className="h-6 w-6" aria-hidden />
                </span>
                <span>
                  <span className="block font-mono text-xs text-primary">0{i + 1}</span>
                  <span className={cn("block font-semibold", selected && "text-primary")}>
                    {p.label}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div
        role="tabpanel"
        id={`${base}-panel`}
        aria-labelledby={`${base}-tab-${part.id}`}
        tabIndex={0}
        className="mt-8 grid gap-6 rounded-lg bg-muted/50 p-5 md:grid-cols-[auto_1fr] md:p-6"
      >
        <Icon className="hidden h-10 w-10 text-primary md:block" aria-hidden />
        <div>
          <h3 className="text-xl font-bold">{part.label}</h3>
          <p className="mt-2">{part.what}</p>
          <h4 className="mt-5 font-semibold">What often goes wrong</h4>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-muted-foreground">
            {part.problems.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
          <h4 className="mt-5 font-semibold">What to check</h4>
          <p className="mt-1 text-muted-foreground">{part.check}</p>
        </div>
      </div>

      <details className="mt-6 print:hidden">
        <summary className="inline-flex min-h-11 cursor-pointer items-center font-semibold text-primary underline underline-offset-4">
          Text version of this diagram
        </summary>
        <ol className="mt-4 space-y-4">
          {parts.map((p, i) => (
            <li key={p.id}>
              <p className="font-semibold">
                {i + 1}. {p.label}
              </p>
              <p className="text-muted-foreground">{p.what}</p>
              <p className="text-muted-foreground">What to check: {p.check}</p>
            </li>
          ))}
        </ol>
      </details>
    </figure>
  );
}
