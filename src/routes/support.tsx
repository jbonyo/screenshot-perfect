import { createFileRoute } from "@tanstack/react-router";
import { MessageCircle, Phone } from "lucide-react";
import { SupportForm } from "@/components/forms/SupportForm";
import { PageHero } from "@/components/site/SiteChrome";
import { contact, enquiry, images, whatsappLink } from "@/content/site";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/support")({
  head: () =>
    pageHead({
      title: "Support Request | Apexon Global Technologies",
      description:
        "Report a network, IT, IPTV or audiovisual fault to Apexon's maintenance and technical support team in Nairobi.",
      path: "/support",
    }),
  component: Support,
});

function Support() {
  return (
    <>
      <PageHero
        eyebrow="Maintenance & technical support"
        title="Report a fault."
        body={`For existing clients. Tell us what is wrong and we will contact you ${enquiry.replyPromise}.`}
        image={images.testing}
      />
      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-[1fr_1.6fr] md:py-24">
        <div className="space-y-6">
          <h2 className="redline text-3xl font-extrabold">Is it urgent?</h2>
          <p className="text-lg text-muted-foreground">
            If systems are down and work has stopped, call or WhatsApp us now as well as sending
            this form.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href={contact.phone.href} className="btn btn-primary" data-umami-event="call_click">
              <Phone className="h-4 w-4" aria-hidden /> Call {contact.phone.value}
            </a>
            <a
              href={whatsappLink("a support request")}
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline-dark"
              data-umami-event="whatsapp_click"
            >
              <MessageCircle className="h-4 w-4" aria-hidden /> WhatsApp
            </a>
          </div>
          <p className="text-muted-foreground">{contact.hours.value}</p>
        </div>
        <SupportForm />
      </section>
    </>
  );
}
