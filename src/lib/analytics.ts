// Records a custom event in Umami when its script is present; otherwise does nothing.
// Link clicks are tracked without code through `data-umami-event` attributes.
type Umami = { track: (event: string, data?: Record<string, string>) => void };

export function track(event: string, data?: Record<string, string>) {
  if (typeof window === "undefined") return;
  const umami = (window as unknown as { umami?: Umami }).umami;
  try {
    umami?.track(event, data);
  } catch {
    // Analytics must never break the page.
  }
}
