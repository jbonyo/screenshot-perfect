import { cn } from "@/lib/utils";

/** Apexon Redline logo, recreated as SVG. tone: "dark" = for dark backgrounds, "light" = for paper. */
export function Logo({
  tone = "dark",
  showTagline = true,
  className,
}: {
  tone?: "dark" | "light";
  showTagline?: boolean;
  className?: string;
}) {
  const letters = tone === "dark" ? "fill-paper" : "fill-ink";
  const sub = tone === "dark" ? "fill-paper-muted" : "fill-ink";
  return (
    <svg
      viewBox={showTagline ? "0 0 820 190" : "0 0 820 136"}
      role="img"
      aria-label="Apexon Global Technologies"
      className={cn("h-auto", className)}
    >
      <polygon points="0,136 46,0 74,0 34,136" className="fill-primary" />
      <polygon points="74,0 110,136 76,136 57,62" className="fill-primary-deep" />
      <path
        className={letters}
        fillRule="evenodd"
        d="M138 0H252V74L232 94H172V136H138Z M172 34V60H218V34Z"
      />
      <path className={letters} d="M282 0H390V34H316V51H380V85H316V102H390V136H282Z" />
      <polygon className={letters} points="418,0 456,0 475,30 494,0 532,0 500,68 450,68" />
      <polygon
        className="fill-primary"
        points="450,68 500,68 532,136 494,136 475,106 456,136 418,136"
      />
      <path className={letters} fillRule="evenodd" d="M560 0H678V136H560Z M594 34V102H644V34Z" />
      <path className={letters} d="M706 0H740L786 80V0H820V136H786L740 56V136H706Z" />
      {showTagline && (
        <text
          x="0"
          y="182"
          textLength="820"
          lengthAdjust="spacing"
          className={sub}
          style={{ font: "600 30px 'JetBrains Mono', monospace" }}
        >
          GLOBAL TECHNOLOGIES
        </text>
      )}
    </svg>
  );
}

export function LogoIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 110 136" aria-hidden className={className}>
      <polygon points="0,136 46,0 74,0 34,136" className="fill-primary" />
      <polygon points="74,0 110,136 76,136 57,62" className="fill-primary-deep" />
    </svg>
  );
}
