import { ChevronDown } from "lucide-react";

// Question-and-answer list using native <details>, so it works with the keyboard,
// screen readers and without scripts.
export function FaqList({ items }: { items: readonly { q: string; a: string }[] }) {
  return (
    <div className="divide-y rounded-lg border bg-card">
      {items.map((item) => (
        <details key={item.q} className="group">
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold [&::-webkit-details-marker]:hidden">
            {item.q}
            <ChevronDown
              className="h-5 w-5 shrink-0 text-primary transition-transform group-open:rotate-180"
              aria-hidden
            />
          </summary>
          <p className="px-5 pb-5 text-muted-foreground">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
