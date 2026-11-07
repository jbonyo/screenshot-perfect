import { createFileRoute } from "@tanstack/react-router";
import { nav, secondaryPages, services, siteUrl } from "@/content/site";

// Built from the main navigation, the footer pages and each service page. Uses
// siteUrl when set, otherwise the request's host, so it is correct on previews and live.
export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: ({ request }) => {
        const origin = siteUrl || new URL(request.url).origin;
        const paths = [
          ...nav.map((n) => n.to),
          ...services.map((s) => `/services/${s.slug}`),
          ...secondaryPages.map((p) => p.to),
        ];
        const urls = paths.map((path) => `  <url><loc>${origin}${path}</loc></url>`).join("\n");
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
