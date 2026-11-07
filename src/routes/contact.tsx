import { createFileRoute } from "@tanstack/react-router";
import { Clock, MapPin } from "lucide-react";
import { ContactLinks, PageHero } from "@/components/site/SiteChrome";
import { contact, images, services } from "@/content/site";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () =>
    pageHead({
      title: "Contact & Request a Quote | Apexon Global Technologies, Nairobi",
      description:
        "Call, WhatsApp, or email Apexon Global Technologies about networking, IT infrastructure, IPTV, audiovisual, or maintenance work. Office visits in Nairobi by appointment.",
      path: "/contact",
    }),
  component: Contact,
});

const field =
  "mt-2 w-full rounded-md border bg-card px-4 py-3 text-base outline-none focus:border-ink";

function Contact() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Request a Quote."
        body="Share your scope and we'll respond with a clear proposal."
        image={images.trainingRoom}
      />
      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-[1fr_1.4fr] md:py-24">
        <div id="details" className="space-y-6">
          <div>
            <h2 className="redline text-3xl font-extrabold">Talk to our team</h2>
            <div className="mt-6 text-lg">
              <ContactLinks tone="light" />
            </div>
          </div>
          <p className="flex items-start gap-2 text-muted-foreground">
            <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
            {contact.location.value}
          </p>
          <p className="flex items-start gap-2 text-muted-foreground">
            <Clock className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
            {contact.hours.value}
          </p>
        </div>
        <form
          aria-labelledby="quote-form-title"
          className="space-y-5 rounded-lg border bg-card p-6 md:p-8"
          onSubmit={(e) => e.preventDefault()}
        >
          <h2 id="quote-form-title" className="text-2xl font-bold">
            Project enquiry
          </h2>
          <p className="rounded-md bg-muted p-3 text-sm text-muted-foreground">
            Online enquiries go live soon. Until then, please call, WhatsApp, or email us using the
            details on this page.
          </p>
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block font-semibold">
              Name
              <input name="name" autoComplete="name" className={field} required />
            </label>
            <label className="block font-semibold">
              Organisation
              <input name="organisation" autoComplete="organization" className={field} />
            </label>
            <label className="block font-semibold">
              Email
              <input
                name="email"
                type="email"
                autoComplete="email"
                inputMode="email"
                className={field}
                required
              />
            </label>
            <label className="block font-semibold">
              Phone
              <input name="phone" type="tel" autoComplete="tel" inputMode="tel" className={field} />
            </label>
          </div>
          <label className="block font-semibold">
            Service
            <select name="service" className={field}>
              {services.map((s) => (
                <option key={s.slug}>{s.title}</option>
              ))}
              <option>Not sure yet</option>
            </select>
          </label>
          <label className="block font-semibold">
            Project details
            <textarea name="details" rows={5} className={field} />
          </label>
          <button
            type="submit"
            disabled
            className="btn w-full cursor-not-allowed border-2 border-dashed border-border bg-muted text-muted-foreground"
          >
            Send enquiry (coming soon)
          </button>
        </form>
      </section>
    </>
  );
}
