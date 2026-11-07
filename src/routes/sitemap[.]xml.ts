import { createFileRoute } from "@tanstack/react-router";
import { nav, siteUrl } from "@/content/site";

// Built from the main navigation. Uses siteUrl when set, otherwise the host the
// request came in on, so it is correct on previews and on the live domain.
export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: ({ request }) => {
        const origin = siteUrl || new URL(request.url).origin;
        const urls = nav
          .map((n) => `  <url><loc>${origin}${n.to === "/" ? "/" : n.to}</loc></url>`)
          .join("\n");
        const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
        return new Response(body, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
