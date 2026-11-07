import type { Photo as PhotoData } from "@/lib/photos";

// `priority` is for the one above-the-fold image per page; everything else lazy-loads.
export function Photo({
  photo,
  alt,
  sizes = "100vw",
  priority = false,
  className,
}: {
  photo: PhotoData;
  alt: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <img
      src={photo.src}
      srcSet={photo.srcSet}
      sizes={sizes}
      alt={alt}
      width={photo.width}
      height={photo.height}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding={priority ? "sync" : "async"}
      className={className}
    />
  );
}
