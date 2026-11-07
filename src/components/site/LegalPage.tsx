import type { ReactNode } from "react";
import { dataProtection } from "@/content/site";

// Shared layout for the Privacy Policy and Terms: readable line length, clear
// headings, last-updated date, and a review notice until a legal adviser signs off.
export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">{title}</h1>
      <p className="mt-4 text-muted-foreground">Last updated {dataProtection.lastUpdated}</p>
      {!dataProtection.legalPagesReviewed && (
        <p className="mt-4 rounded-md border border-dashed p-3 text-sm text-muted-foreground">
          This page has not yet been reviewed by a legal adviser and may be updated.
        </p>
      )}
      <div className="mt-10 space-y-8 text-lg leading-relaxed [&_h2]:text-2xl [&_h2]:font-bold [&_li]:mt-2 [&_p]:mt-3 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-6 [&_a]:font-semibold [&_a]:underline [&_a]:underline-offset-4">
        {children}
      </div>
    </article>
  );
}
