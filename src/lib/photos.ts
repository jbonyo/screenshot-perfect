// Responsive WebP photos generated at 640, 960, 1280 and 1920 px wide into
// src/assets/img as <name>-<width>.webp. Credits: docs/photo-credits.md.
const files = import.meta.glob("../assets/img/*.webp", {
  eager: true,
  import: "default",
}) as Record<string, string>;

export type Photo = { src: string; srcSet: string; width: number; height: number };

export function photo(name: string, width: number, height: number): Photo {
  const sizes = [640, 960, 1280, 1920]
    .map((w) => ({ w, url: files[`../assets/img/${name}-${w}.webp`] }))
    .filter((s): s is { w: number; url: string } => Boolean(s.url));
  if (!sizes.length) throw new Error(`Missing photo: ${name}`);
  return {
    src: sizes[Math.min(1, sizes.length - 1)]!.url,
    srcSet: sizes.map((s) => `${s.url} ${s.w}w`).join(", "),
    width,
    height,
  };
}
