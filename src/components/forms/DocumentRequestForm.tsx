import { useState } from "react";
import { Check } from "lucide-react";
import {
  Checkbox,
  CheckboxGroup,
  ChoiceGroup,
  ErrorSummary,
  HoneypotField,
  TextArea,
  TextField,
} from "@/components/forms/Fields";
import { useEnquiryForm } from "@/components/forms/useEnquiryForm";
import { companyDocuments, enquiry } from "@/content/site";
import { checkContact } from "@/lib/enquiry";

type Doc = (typeof companyDocuments)[number];
type Preferred = "call" | "whatsapp" | "email";

const preferredOptions: { value: Preferred; label: string }[] = [
  { value: "email", label: "Email" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "call", label: "Phone call" },
];
const labels: Record<string, string> = {
  documents: "Documents",
  organisation: "Organisation",
  name: "Name",
  email: "Email",
  phone: "Phone",
  preferred: "Reply method",
  consent: "Privacy Policy",
};

// Request for Apexon's company documents, for tenders and supplier onboarding.
export function DocumentRequestForm() {
  const [docs, setDocs] = useState<Doc[]>([]);
  const [tenderReference, setTenderReference] = useState("");
  const [details, setDetails] = useState("");
  const [organisation, setOrganisation] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [preferred, setPreferred] = useState<Preferred | "">("");
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState("");
  const f = useEnquiryForm("documents_requested");

  function submit(ev: React.FormEvent) {
    ev.preventDefault();
    const e = checkContact({ name, email, phone, consent });
    if (!docs.length) e["documents"] = "Please choose at least one document.";
    if (organisation.trim().length < 2) e["organisation"] = "Please enter your organisation.";
    if (!preferred) e["preferred"] = "Please choose how you'd like us to reach you.";
    if (Object.keys(e).length) return f.fail(e);
    void f.send({
      kind: "documents",
      documents: docs,
      tenderReference,
      details,
      organisation,
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
          Thank you. Your document request has been sent.
        </h2>
        <p className="mt-4 text-muted-foreground">
          We will reply {enquiry.replyPromise} and send the documents to your organisation.
        </p>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={submit}
      aria-labelledby="documents-form-title"
      className="relative space-y-6 rounded-lg border bg-card p-6 md:p-8"
    >
      <h2 id="documents-form-title" className="text-2xl font-bold">
        Request documents
      </h2>
      {f.summary && (
        <ErrorSummary ref={f.summaryRef} message={f.summary} errors={f.errors} labels={labels} />
      )}
      <div id="documents">
        <CheckboxGroup
          name="documents"
          legend="Which documents do you need?"
          options={companyDocuments}
          values={docs}
          onChange={setDocs}
          error={f.errors["documents"]}
        />
      </div>
      <TextField
        id="tenderReference"
        label="Tender or reference number"
        optional
        value={tenderReference}
        onChange={(e) => setTenderReference(e.target.value)}
      />
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          id="organisation"
          label="Organisation"
          autoComplete="organization"
          value={organisation}
          onChange={(e) => setOrganisation(e.target.value)}
          error={f.errors["organisation"]}
        />
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
        />
      </div>
      <TextArea
        id="notes"
        label="Anything else?"
        optional
        rows={3}
        value={details}
        onChange={(e) => setDetails(e.target.value)}
      />
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
        I agree that Apexon may use these details to handle my request, as described in the{" "}
        <a href="/privacy" target="_blank" className="font-semibold underline underline-offset-4">
          Privacy Policy
        </a>
        .
      </Checkbox>
      <HoneypotField value={website} onChange={setWebsite} />
      <button type="submit" className="btn btn-primary w-full sm:w-auto" disabled={f.sending}>
        {f.sending ? "Sending…" : "Send request"}
      </button>
    </form>
  );
}
