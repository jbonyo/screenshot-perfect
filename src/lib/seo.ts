import { company, siteUrl } from "@/content/site";

const shareImage = "/og-image.jpg";

// Title, description, share tags and (once siteUrl is set) canonical link for a page.
export function pageHead({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}) {
  const url = siteUrl ? `${siteUrl}${path}` : undefined;
  const image = `${siteUrl}${shareImage}`;
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: company.name },
      { property: "og:image", content: image },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: image },
      ...(url ? [{ property: "og:url", content: url }] : []),
    ],
    links: url ? [{ rel: "canonical", href: url }] : [],
  };
}
