import { createFileRoute, Link } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";
import { company, contact } from "@/content/site";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/terms")({
  head: () =>
    pageHead({
      title: "Terms of Use | Apexon Global Technologies",
      description:
        "The terms that apply when you use the Apexon Global Technologies website and request quotes or site surveys.",
      path: "/terms",
    }),
  component: Terms,
});

function Terms() {
  return (
    <LegalPage title="Terms of Use">
      <section>
        <p>
          These terms apply when you use this website, which is run by {company.name}
          (&ldquo;Apexon&rdquo;, &ldquo;we&rdquo;). By using the website you accept them.
        </p>
      </section>

      <section>
        <h2>1. Information on this website</h2>
        <p>
          The information here describes our services in general terms. It is not an offer or a
          binding quote. Photos on this website are illustrative and do not show specific Apexon
          projects unless stated.
        </p>
      </section>

      <section>
        <h2>2. Quotes and site surveys</h2>
        <ul>
          <li>
            Site surveys are free. Requesting a survey or a quote does not commit you to anything.
          </li>
          <li>
            A quote becomes binding only when we issue it to you in writing and you accept it. The
            scope, price, timeline, warranty and payment terms are those set out in that written
            proposal or contract.
          </li>
        </ul>
      </section>

      <section>
        <h2>3. Using the website</h2>
        <p>
          Please do not misuse the website: for example, by sending spam or false requests,
          attempting to break its security, or interfering with how it works.
        </p>
      </section>

      <section>
        <h2>4. Ownership of content</h2>
        <p>
          The text, logo and design of this website belong to Apexon. Photos are used under licence
          from their owners. Please ask us before reusing any content.
        </p>
      </section>

      <section>
        <h2>5. Links to other services</h2>
        <p>
          Links to WhatsApp, social media and other websites are provided for convenience. Those
          services have their own terms and privacy policies.
        </p>
      </section>

      <section>
        <h2>6. Liability</h2>
        <p>
          We take care to keep this website accurate and available, but we provide it &ldquo;as
          is&rdquo;. To the extent the law allows, we are not liable for losses arising from
          reliance on general information on the website. Nothing in these terms limits any
          liability that cannot be limited under Kenyan law.
        </p>
      </section>

      <section>
        <h2>7. Privacy</h2>
        <p>
          How we handle personal data is explained in our <Link to="/privacy">Privacy Policy</Link>.
        </p>
      </section>

      <section>
        <h2>8. Governing law</h2>
        <p>These terms are governed by the laws of Kenya.</p>
      </section>

      <section>
        <h2>9. Contact</h2>
        <p>
          Questions about these terms: <a href={contact.email.href}>{contact.email.value}</a> or{" "}
          {contact.phone.value}.
        </p>
      </section>
    </LegalPage>
  );
}
