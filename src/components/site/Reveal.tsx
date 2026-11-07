import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

// Fades content in as it scrolls into view. Items already on screen (or when
// IntersectionObserver is missing) are left alone, so nothing is ever hidden
// unless the script is running and able to show it again.
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;
    el.classList.add("reveal-pending");
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          el.classList.remove("reveal-pending");
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      el.classList.remove("reveal-pending");
    };
  }, []);
  return (
    <div ref={ref} className={cn("reveal", className)} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}
