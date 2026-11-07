import { useState } from "react";
import { Check } from "lucide-react";
import {
  Checkbox,
  ChoiceGroup,
  ErrorSummary,
  HoneypotField,
  SelectField,
  TextArea,
  TextField,
} from "@/components/forms/Fields";
import { useEnquiryForm } from "@/components/forms/useEnquiryForm";
import { enquiry, partnerTypes } from "@/content/site";
import { checkContact } from "@/lib/enquiry";

type Preferred = "call" | "whatsapp" | "email";

const preferredOptions: { value: Preferred; label: string }[] = [
  { value: "email", label: "Email" },
  { value: "call", label: "Phone call" },
  { value: "whatsapp", label: "WhatsApp" },
];
const labels: Record<string, string> = {
  partnerType: "Partner type",
  organisation: "Organisation",
  details: "How you would like to work together",
  name: "Name",
  email: "Email",
  phone: "Phone",
  preferred: "Reply method",
  consent: "Privacy Policy",
};

// Enquiries from main contractors, vendors, subcontractors and integrators.
export function PartnerForm() {
  const [partnerType, setPartnerType] = useState("");
  const [organisation, setOrganisation] = useState("");
  const [location, setLocation] = useState("");
  const [details, setDetails] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [preferred, setPreferred] = useState<Preferred | "">("");
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState("");
  const f = useEnquiryForm("partner_submitted");

  function submit(ev: React.FormEvent) {
    ev.preventDefault();
    const e = checkContact({ name, email, phone, consent });
    if (!partnerType) e["partnerType"] = "Please choose what kind of partner you are.";
    if (organisation.trim().length < 2) e["organisation"] = "Please enter your organisation.";
    if (details.trim().length < 10)
      e["details"] = "Please tell us briefly how you would like to work together.";
    if (!preferred) e["preferred"] = "Please choose how you'd like us to reach you.";
    if (Object.keys(e).length) return f.fail(e);
    void f.send({
      kind: "partner",
      partnerType,
      organisation,
      location,
      details,
      name,
      email,
      phone,
      preferredContact: preferred,
      consent,
      website,
    });
  }

  if (f.done) {
    return (
      <div className="rounded-lg border bg-card p-6 md:p-8">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-brand text-primary-foreground">
          <Check className="h-6 w-6" aria-hidden />
        </span>
        <h2 ref={f.doneRef} tabIndex={-1} className="mt-4 text-2xl font-bold outline-none">
          Thank you. We have your partner enquiry.
        </h2>
        <p className="mt-4 text-muted-foreground">
          We will get back to you {enquiry.replyPromise}.
        </p>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={submit}
      aria-labelledby="partner-form-title"
      className="relative space-y-6 rounded-lg border bg-card p-6 md:p-8"
    >
      <h2 id="partner-form-title" className="text-2xl font-bold">
        Partner with us
      </h2>
      {f.summary && (
        <ErrorSummary ref={f.summaryRef} message={f.summary} errors={f.errors} labels={labels} />
      )}
      <div className="grid gap-5 sm:grid-cols-2">
        <SelectField
          id="partnerType"
          label="You are a"
          placeholder="Choose one"
          options={partnerTypes}
          value={partnerType}
          onChange={(e) => setPartnerType(e.target.value)}
          error={f.errors["partnerType"]}
        />
        <TextField
          id="organisation"
          label="Organisation"
          autoComplete="organization"
          value={organisation}
          onChange={(e) => setOrganisation(e.target.value)}
          error={f.errors["organisation"]}
        />
        <TextField
          id="location"
          label="Where are you based?"
          optional
          autoComplete="address-level2"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="sm:col-span-2"
        />
      </div>
      <TextArea
        id="details"
        label="How would you like to work together?"
        hint="For example the kind of projects, regions or products"
        rows={4}
        value={details}
        onChange={(e) => setDetails(e.target.value)}
        error={f.errors["details"]}
      />
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          id="name"
          label="Your name"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={f.errors["name"]}
        />
        <TextField
          id="email"
          label="Email"
          type="email"
          inputMode="email"
          autoComplete="email"
          hint="Email or phone, at least one"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={f.errors["email"]}
        />
        <TextField
          id="phone"
          label="Phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          error={f.errors["phone"]}
          className="sm:col-span-2"
        />
      </div>
      <div id="preferred">
        <ChoiceGroup
          name="preferred"
          legend="How should we reply?"
          options={preferredOptions}
          value={preferred}
          onChange={setPreferred}
          error={f.errors["preferred"]}
          columns={3}
        />
      </div>
      <Checkbox id="consent" checked={consent} onChange={setConsent} error={f.errors["consent"]}>
        I agree that Apexon may use these details to reply, as described in the{" "}
        <a href="/privacy" target="_blank" className="font-semibold underline underline-offset-4">
          Privacy Policy
        </a>
        .
      </Checkbox>
      <HoneypotField value={website} onChange={setWebsite} />
      <button type="submit" className="btn btn-primary w-full sm:w-auto" disabled={f.sending}>
        {f.sending ? "Sending…" : "Send enquiry"}
      </button>
    </form>
  );
}
