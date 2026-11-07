import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";
import { company, contact, dataProtection, enquiry } from "@/content/site";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/privacy")({
  head: () =>
    pageHead({
      title: "Privacy Policy | Apexon Global Technologies",
      description:
        "How Apexon Global Technologies collects, uses, stores and protects personal data, in line with Kenya's Data Protection Act, 2019.",
      path: "/privacy",
    }),
  component: Privacy,
});

function Privacy() {
  return (
    <LegalPage title="Privacy Policy">
      <section>
        <p>
          This policy explains how {company.name} (&ldquo;Apexon&rdquo;, &ldquo;we&rdquo;) collects
          and uses personal data when you use this website or contact us. We follow Kenya&rsquo;s
          Data Protection Act, 2019.
        </p>
      </section>

      <section>
        <h2>1. Who is responsible for your data</h2>
        <p>
          {company.name} is the data controller. You can reach us at{" "}
          <a href={contact.email.href}>{contact.email.value}</a>, on {contact.phone.value}, or at{" "}
          {contact.location.value}.
        </p>
        {dataProtection.odpcRegistrationNumber && (
          <p>
            Office of the Data Protection Commissioner registration number:{" "}
            {dataProtection.odpcRegistrationNumber}.
          </p>
        )}
      </section>

      <section>
        <h2>2. What we collect</h2>
        <ul>
          <li>
            <strong>When you send a quote or support request:</strong> your name, organisation,
            email address, phone number, how you prefer to be contacted, the site location, and the
            project or fault details you give us.
          </li>
          <li>
            <strong>For spam protection:</strong> a one-way coded version of your internet (IP)
            address, which lets us limit repeated submissions. We do not store the address itself.
          </li>
          <li>
            <strong>Visit statistics:</strong> anonymous figures such as which pages are viewed, the
            type of device, the country and the referring website. These do not identify you and do
            not use cookies.
          </li>
          <li>
            <strong>When you call, WhatsApp or email us:</strong> the details you choose to share.
          </li>
        </ul>
      </section>

      <section>
        <h2>3. Why we use it</h2>
        <ul>
          <li>To reply to your request {enquiry.replyPromise} and prepare quotes and proposals.</li>
          <li>To arrange site surveys and deliver, maintain and support the work you ask for.</li>
          <li>To keep the website secure and protect it from spam and misuse.</li>
          <li>To understand, in general terms, how the website is used so we can improve it.</li>
        </ul>
        <p>
          We rely on your consent, which you give when you submit a form, and on the need to take
          steps you have asked for before entering into a contract with you. You can withdraw your
          consent at any time by contacting us.
        </p>
      </section>

      <section>
        <h2>4. Who we share it with</h2>
        <p>
          We do not sell or rent your personal data. We use a small number of service providers who
          process data on our behalf and only as we instruct:
        </p>
        <ul>
          <li>
            <strong>Supabase</strong>, which stores enquiries in a secured database hosted in
            Ireland (European Union).
          </li>
          <li>
            <strong>Resend</strong>, which delivers enquiry notifications to our email inbox.
          </li>
          <li>
            <strong>Umami</strong>, which provides the anonymous, cookie-free visit statistics.
          </li>
        </ul>
        <p>We may also share data where the law requires us to.</p>
      </section>

      <section>
        <h2>5. Storage outside Kenya</h2>
        <p>
          Enquiry data is stored with {dataProtection.storage}. We use providers that apply
          appropriate safeguards to protect personal data, as Kenyan law requires for transfers
          outside Kenya.
        </p>
      </section>

      <section>
        <h2>6. How long we keep it</h2>
        <p>
          We keep enquiries for {enquiry.retentionMonths} months after our last contact with you,
          then delete them. If you become a client, we keep the records needed to deliver and
          support the work and to meet legal obligations such as tax records.
        </p>
      </section>

      <section>
        <h2>7. How we protect it</h2>
        <p>
          Information travels to us over encrypted connections (HTTPS). Enquiries are stored in a
          database that the public cannot read, and access is limited to the people who handle your
          request.
        </p>
      </section>

      <section>
        <h2>8. Cookies</h2>
        <p>
          This website does not use cookies for analytics or advertising, and it has no advertising
          trackers.
        </p>
      </section>

      <section>
        <h2>9. Your rights</h2>
        <p>Under the Data Protection Act, 2019, you have the right to:</p>
        <ul>
          <li>be told how your personal data is used;</li>
          <li>see the personal data we hold about you;</li>
          <li>object to the processing of all or part of your personal data;</li>
          <li>have false or misleading data corrected; and</li>
          <li>have false, misleading or unlawfully held data deleted.</li>
        </ul>
        <p>
          To use any of these rights, email <a href={contact.email.href}>{contact.email.value}</a>.
          If you are not satisfied with our response, you can complain to the Office of the Data
          Protection Commissioner (<a href="https://www.odpc.go.ke">www.odpc.go.ke</a>).
        </p>
      </section>

      <section>
        <h2>10. Changes to this policy</h2>
        <p>
          We will update this page if we change how we handle personal data. The date at the top
          shows the latest version.
        </p>
      </section>
    </LegalPage>
  );
}
