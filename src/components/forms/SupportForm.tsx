import { useEffect, useRef, useState } from "react";
import { Check, MessageCircle, Phone } from "lucide-react";
import {
  Checkbox,
  ChoiceGroup,
  ErrorSummary,
  HoneypotField,
  TextArea,
  TextField,
} from "@/components/forms/Fields";
import { contact, enquiry, whatsappLink } from "@/content/site";
import { track } from "@/lib/analytics";
import { checkContact, submitEnquiry, type FieldErrors } from "@/lib/enquiry";

type Urgency = "critical" | "high" | "normal";
type Preferred = "call" | "whatsapp" | "email";

const urgencyOptions: { value: Urgency; label: string; hint: string }[] = [
  { value: "critical", label: "Critical", hint: "Systems down, work has stopped" },
  { value: "high", label: "High", hint: "Partly working, affecting staff" },
  { value: "normal", label: "Normal", hint: "Minor issue or a planned request" },
];
const preferredOptions: { value: Preferred; label: string }[] = [
  { value: "call", label: "Phone call" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "email", label: "Email" },
];
const labels: Record<string, string> = {
  urgency: "Urgency",
  location: "Site location",
  details: "Fault description",
  name: "Name",
  email: "Email",
  phone: "Phone",
  preferred: "Reply method",
  consent: "Privacy Policy",
};

// Fault and support requests from existing maintenance clients.
export function SupportForm() {
  const [urgency, setUrgency] = useState<Urgency | "">("");
  const [location, setLocation] = useState("");
  const [details, setDetails] = useState("");
  const [name, setName] = useState("");
  const [organisation, setOrganisation] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [preferred, setPreferred] = useState<Preferred | "">("");
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState("");

  const [errors, setErrors] = useState<FieldErrors>({});
  const [summary, setSummary] = useState("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  const startedAt = useRef(0);
  const doneRef = useRef<HTMLHeadingElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    startedAt.current = performance.now();
  }, []);
  useEffect(() => {
    if (summary) summaryRef.current?.focus();
  }, [summary, errors]);
  useEffect(() => {
    if (done) doneRef.current?.focus();
  }, [done]);

  async function submit(ev: React.FormEvent) {
    ev.preventDefault();
    const e = checkContact({ name, email, phone, consent });
    if (!urgency) e["urgency"] = "Please choose how urgent this is.";
    if (location.trim().length < 2) e["location"] = "Please enter the site location.";
    if (details.trim().length < 10)
      e["details"] = "Please describe the fault in a sentence or two.";
    if (!preferred) e["preferred"] = "Please choose how you'd like us to reach you.";
    if (Object.keys(e).length) {
      setErrors(e);
      setSummary("Please fix the following:");
      return;
    }

    setSending(true);
    setSummary("");
    const result = await submitEnquiry({
      kind: "support",
      urgency,
      location,
      details,
      name,
      organisation,
      email,
      phone,
      preferredContact: preferred,
      consent,
      website,
      fillMs: Math.round(performance.now() - startedAt.current),
    });
    setSending(false);
    if (result.ok) {
      track("support_submitted", { urgency: String(urgency) });
      setDone(true);
      return;
    }
    setErrors(result.fieldErrors ?? {});
    setSummary(result.error);
  }

  if (done) {
    return (
      <div className="rounded-lg border bg-card p-6 md:p-8">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-brand text-primary-foreground">
          <Check className="h-6 w-6" aria-hidden />
        </span>
        <h2 ref={doneRef} tabIndex={-1} className="mt-4 text-2xl font-bold outline-none">
          Thank you. Your support request has been sent.
        </h2>
        <p className="mt-4 text-muted-foreground">
          We will contact you {enquiry.replyPromise}.
          {urgency === "critical" &&
            " For a critical fault, please also call us now so we can respond faster."}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href={contact.phone.href} className="btn btn-primary" data-umami-event="call_click">
            <Phone className="h-4 w-4" aria-hidden /> Call {contact.phone.value}
          </a>
          <a
            href={whatsappLink("a support request")}
            className="btn btn-outline-dark"
            target="_blank"
            rel="noreferrer"
            data-umami-event="whatsapp_click"
          >
            <MessageCircle className="h-4 w-4" aria-hidden /> WhatsApp
          </a>
        </div>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={submit}
      aria-labelledby="support-form-title"
      className="relative space-y-6 rounded-lg border bg-card p-6 md:p-8"
    >
      <h2 id="support-form-title" className="text-2xl font-bold">
        Report a fault
      </h2>
      {summary && (
        <ErrorSummary ref={summaryRef} message={summary} errors={errors} labels={labels} />
      )}
      <div id="urgency">
        <ChoiceGroup
          name="urgency"
          legend="How urgent is it?"
          options={urgencyOptions}
          value={urgency}
          onChange={setUrgency}
          error={errors["urgency"]}
          columns={3}
        />
      </div>
      <TextField
        id="location"
        label="Site location"
        hint="Building and town, for example Upper Hill, Nairobi"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        error={errors["location"]}
      />
      <TextArea
        id="details"
        label="What is wrong?"
        hint="What stopped working, since when, and which rooms or equipment"
        rows={5}
        value={details}
        onChange={(e) => setDetails(e.target.value)}
        error={errors["details"]}
      />
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          id="name"
          label="Your name"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errors["name"]}
        />
        <TextField
          id="organisation"
          label="Organisation"
          optional
          autoComplete="organization"
          value={organisation}
          onChange={(e) => setOrganisation(e.target.value)}
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
          error={errors["email"]}
        />
        <TextField
          id="phone"
          label="Phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          error={errors["phone"]}
        />
      </div>
      <div id="preferred">
        <ChoiceGroup
          name="preferred"
          legend="How should we reply?"
          options={preferredOptions}
          value={preferred}
          onChange={setPreferred}
          error={errors["preferred"]}
          columns={3}
        />
      </div>
      <Checkbox id="consent" checked={consent} onChange={setConsent} error={errors["consent"]}>
        I agree that Apexon may use these details to handle my request, as described in the{" "}
        <a href="/privacy" target="_blank" className="font-semibold underline underline-offset-4">
          Privacy Policy
        </a>
        .
      </Checkbox>
      <HoneypotField value={website} onChange={setWebsite} />
      <button type="submit" className="btn btn-primary w-full sm:w-auto" disabled={sending}>
        {sending ? "Sending…" : "Send support request"}
      </button>
    </form>
  );
}
