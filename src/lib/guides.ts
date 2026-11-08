import type { Guide } from "@/content/site";
import { diagrams } from "@/content/site";

const words = (s: string) => s.split(/\s+/).filter(Boolean).length;

// Reading time at about 200 words a minute, counting the diagram text too.
export function readingMinutes(guide: Guide): number {
  const text = [
    guide.summary,
    ...guide.sections.flatMap((s) => [
      s.heading,
      ...(s.body ?? []),
      ...(s.list ?? []),
      ...(s.checklist ?? []),
    ]),
    ...(guide.diagram
      ? diagrams[guide.diagram].parts.flatMap((p) => [p.what, ...p.problems, p.check])
      : []),
  ].join(" ");
  return Math.max(1, Math.round(words(text) / 200));
}
