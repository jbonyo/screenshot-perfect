import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock, MapPin, Wrench } from "lucide-react";
import { QuoteWizard, type ServiceChoice } from "@/components/forms/QuoteWizard";
import { ContactLinks, PageHero } from "@/components/site/SiteChrome";
import { contact, enquiry, images } from "@/content/site";
import { pageHead } from "@/lib/seo";

const serviceChoices: ServiceChoice[] = [
  "networking",
  "infrastructure",
  "iptv-av",
  "maintenance",
  "not-sure",
];

export const Route = createFileRoute("/contact")({
  // ?service=networking pre-selects the service when arriving from a service page.
  validateSearch: (search: Record<string, unknown>): { service?: ServiceChoice } => {
    const s = search["service"];
    return serviceChoices.includes(s as ServiceChoice) ? { service: s as ServiceChoice } : {};
  },
  head: () =>
    pageHead({
      title: "Contact & Request a Quote | Apexon Global Technologies, Nairobi",
      description:
        "Request a quote or a free site survey for networking, IT infrastructure, IPTV, audiovisual, or maintenance work. We reply within one business day.",
      path: "/contact",
    }),
  component: Contact,
});

function Contact() {
  const { service } = Route.useSearch();
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Request a Quote."
        body={`Tell us about your site in three short steps. We reply ${enquiry.replyPromise}.`}
        image={images.trainingRoom}
      />
      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-[1fr_1.4fr] md:py-24">
        <div id="contact-details" className="space-y-6">
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
          <Link
            to="/support"
            className="flex items-start gap-3 rounded-lg border bg-card p-4 hover:border-ink"
          >
            <Wrench className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
            <span>
              <span className="block font-semibold">Existing client with a fault?</span>
              <span className="text-sm text-muted-foreground">Send a support request instead.</span>
            </span>
          </Link>
        </div>
        <QuoteWizard initialService={service} />
      </section>
    </>
  );
}
