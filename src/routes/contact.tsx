import { createFileRoute } from "@tanstack/react-router";
import { Clock, MapPin } from "lucide-react";
import { ContactLinks, PageHero } from "@/components/site/SiteChrome";
import { contact, images, services } from "@/content/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Request a Quote | Apexon Global Technologies" },
      {
        name: "description",
        content:
          "Request a quote for networking, IT infrastructure, IPTV or audiovisual work from Apexon Global Technologies.",
      },
      { property: "og:title", content: "Contact Apexon — Request a Quote" },
      {
        property: "og:description",
        content: "Tell us about your project and get a clear, itemised proposal.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

const field =
  "mt-2 w-full rounded-md border bg-card px-4 py-3 text-base outline-none focus:border-primary";

function Contact() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Request a Quote."
        body="Share your scope and we'll respond with a clear proposal."
        image={images.boardroom}
      />
      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-24 md:grid-cols-[1fr_1.4fr]">
        <div id="details" className="space-y-8">
          <div>
            <h2 className="redline text-3xl font-black">Talk to our team</h2>
            <div className="mt-6 text-lg">
              <ContactLinks tone="light" />
            </div>
          </div>
          <p className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-5 w-5 text-primary" /> {contact.location.value}
          </p>
          <p className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-5 w-5 text-primary" /> {contact.hours.value}
          </p>
          <p className="rounded-md border border-dashed p-4 text-sm text-muted-foreground">
            Contact details shown in italics are placeholders and will be replaced with confirmed
            information.
          </p>
        </div>
        <form
          className="space-y-5 rounded-lg border bg-card p-8"
          onSubmit={(e) => e.preventDefault()}
        >
          <p className="rounded-md bg-muted p-3 text-sm text-muted-foreground">
            Online enquiries go live in the next phase. For now, please use the contact details once
            confirmed.
          </p>
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block font-semibold">
              Name
              <input className={field} required />
            </label>
            <label className="block font-semibold">
              Organisation
              <input className={field} />
            </label>
            <label className="block font-semibold">
              Email
              <input type="email" className={field} required />
            </label>
            <label className="block font-semibold">
              Phone
              <input type="tel" className={field} />
            </label>
          </div>
          <label className="block font-semibold">
            Service
            <select className={field}>
              {services.map((s) => (
                <option key={s.slug}>{s.title}</option>
              ))}
              <option>Not sure yet</option>
            </select>
          </label>
          <label className="block font-semibold">
            Project details
            <textarea rows={5} className={field} />
          </label>
          <button type="submit" disabled className="btn btn-primary w-full opacity-60">
            Send enquiry (coming soon)
          </button>
        </form>
      </section>
    </>
  );
}
