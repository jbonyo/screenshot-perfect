import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, MessageCircle, Phone } from "lucide-react";
import {
  Checkbox,
  ChoiceGroup,
  ErrorSummary,
  HoneypotField,
  SelectField,
  TextArea,
  TextField,
} from "@/components/forms/Fields";
import { contact, enquiry, whatsappLink } from "@/content/site";
import { track } from "@/lib/analytics";
import { checkContact, submitEnquiry, type FieldErrors } from "@/lib/enquiry";

export type ServiceChoice =
  "networking" | "infrastructure" | "iptv-av" | "maintenance" | "not-sure";
type Preferred = "call" | "whatsapp" | "email";

const serviceOptions: { value: ServiceChoice; label: string; hint: string }[] = [
  { value: "networking", label: "Networking & structured cabling", hint: "Cabling, racks, fibre" },
  { value: "infrastructure", label: "IT infrastructure", hint: "Servers, switching, Wi-Fi" },
  { value: "iptv-av", label: "IPTV & audiovisual", hint: "Displays, IPTV, meeting rooms" },
  { value: "maintenance", label: "Maintenance & support", hint: "Existing systems and faults" },
  { value: "not-sure", label: "Not sure yet", hint: "Tell us what you need" },
];
const buildingTypes = [
  "Office",
  "Government building",
  "School, college or university",
  "Hospital or clinic",
  "Hotel or hospitality",
  "Retail",
  "Warehouse or industrial",
  "Residential",
  "Other",
] as const;
const timelines = [
  "As soon as possible",
  "Within 1 month",
  "1 to 3 months",
  "3 to 6 months",
  "Just planning",
] as const;
const preferredOptions: { value: Preferred; label: string }[] = [
  { value: "call", label: "Phone call" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "email", label: "Email" },
];

const labels: Record<string, string> = {
  service: "Service",
  location: "Site location",
  name: "Name",
  email: "Email",
  phone: "Phone",
  preferred: "Reply method",
  consent: "Privacy Policy",
};

const stepTitles = ["What do you need?", "About the site", "How can we reach you?"];

export function QuoteWizard({ initialService }: { initialService?: ServiceChoice | undefined }) {
  const [step, setStep] = useState(0);
  const [service, setService] = useState<ServiceChoice | "">(initialService ?? "");
  const [siteSurvey, setSiteSurvey] = useState(false);
  const [buildingType, setBuildingType] = useState("");
  const [rooms, setRooms] = useState("");
  const [floorsOrScreens, setFloorsOrScreens] = useState("");
  const [location, setLocation] = useState("");
  const [timeline, setTimeline] = useState("");
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
  const headingRef = useRef<HTMLHeadingElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const moved = useRef(false);

  useEffect(() => {
    startedAt.current = performance.now();
  }, []);

  // Move focus to the new step's heading (not on first load).
  useEffect(() => {
    if (moved.current) headingRef.current?.focus();
  }, [step, done]);

  useEffect(() => {
    if (summary) summaryRef.current?.focus();
  }, [summary, errors]);

  const showsScreens = service === "iptv-av";
  const countLabel = showsScreens ? "Number of screens" : "Number of floors";

  function fail(e: FieldErrors, message = "Please fix the following:") {
    setErrors(e);
    setSummary(message);
  }

  function next() {
    const e: FieldErrors = {};
    if (step === 0 && !service) e["service"] = "Please choose a service, or “Not sure yet”.";
    if (step === 1 && location.trim().length < 2)
      e["location"] = "Please enter the town or area of the site.";
    if (Object.keys(e).length) return fail(e);
    setErrors({});
    setSummary("");
    moved.current = true;
    setStep((s) => s + 1);
  }

  function back() {
    setErrors({});
    setSummary("");
    moved.current = true;
    setStep((s) => s - 1);
  }

  async function submit(ev: React.FormEvent) {
    ev.preventDefault();
    if (step < 2) return next();
    const e = checkContact({ name, email, phone, consent });
    if (!preferred) e["preferred"] = "Please choose how you'd like us to reach you.";
    if (Object.keys(e).length) return fail(e);

    setSending(true);
    setSummary("");
    const result = await submitEnquiry({
      kind: "quote",
      service,
      siteSurvey,
      buildingType,
      rooms: rooms || undefined,
      floorsOrScreens: floorsOrScreens || undefined,
      location,
      timeline,
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
      track("quote_submitted", { service: String(service) });
      moved.current = true;
      setDone(true);
      return;
    }
    fail(result.fieldErrors ?? {}, result.error);
  }

  if (done) {
    return (
      <div className="rounded-lg border bg-card p-6 md:p-8">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-brand text-primary-foreground">
          <Check className="h-6 w-6" aria-hidden />
        </span>
        <h2 ref={headingRef} tabIndex={-1} className="mt-4 text-2xl font-bold outline-none">
          Thank you, {name.trim().split(" ")[0]}. Your request has been sent.
        </h2>
        <h3 className="mt-6 font-bold">What happens next</h3>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-muted-foreground">
          <li>
            We read your request and reply {enquiry.replyPromise}, by{" "}
            {preferredOptions.find((p) => p.value === preferred)?.label.toLowerCase()}.
          </li>
          <li>
            {siteSurvey
              ? "We agree a time for your free site survey."
              : "If the job needs it, we offer a free site survey."}
          </li>
          <li>You receive a clear, itemised proposal.</li>
        </ol>
        <p className="mt-6 text-sm text-muted-foreground">Need us sooner?</p>
        <div className="mt-2 flex flex-wrap gap-3">
          <a
            href={contact.phone.href}
            className="btn btn-outline-dark"
            data-umami-event="call_click"
          >
            <Phone className="h-4 w-4" aria-hidden /> Call {contact.phone.value}
          </a>
          <a
            href={whatsappLink()}
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
      aria-labelledby="quote-step-title"
      className="relative space-y-6 rounded-lg border bg-card p-6 md:p-8"
    >
      <div>
        <p className="font-mono text-sm text-primary" aria-live="polite">
          Step {step + 1} of 3
        </p>
        <div className="mt-2 flex gap-1.5" aria-hidden="true">
          {stepTitles.map((t, i) => (
            <span
              key={t}
              className={`h-1.5 flex-1 rounded-full ${i <= step ? "bg-brand" : "bg-border"}`}
            />
          ))}
        </div>
        <h2
          id="quote-step-title"
          ref={headingRef}
          tabIndex={-1}
          className="mt-4 text-2xl font-bold outline-none"
        >
          {stepTitles[step]}
        </h2>
      </div>

      {summary && (
        <ErrorSummary ref={summaryRef} message={summary} errors={errors} labels={labels} />
      )}

      {step === 0 && (
        <>
          <div id="service">
            <ChoiceGroup
              name="service"
              legend="Service"
              options={serviceOptions}
              value={service}
              onChange={setService}
              error={errors["service"]}
            />
          </div>
          <Checkbox id="siteSurvey" checked={siteSurvey} onChange={setSiteSurvey}>
            <span className="font-semibold">{enquiry.siteSurveyLabel}</span>
            <span className="block text-sm text-muted-foreground">
              We visit, assess the site, and quote from what we see.
            </span>
          </Checkbox>
        </>
      )}

      {step === 1 && (
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField
            id="location"
            label="Site location"
            hint="Town or area, for example Westlands, Nairobi"
            autoComplete="address-level2"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            error={errors["location"]}
            className="sm:col-span-2"
          />
          <SelectField
            id="buildingType"
            label="Type of building"
            optional
            placeholder="Choose one"
            options={buildingTypes}
            value={buildingType}
            onChange={(e) => setBuildingType(e.target.value)}
          />
          <SelectField
            id="timeline"
            label="When do you need it?"
            optional
            placeholder="Choose one"
            options={timelines}
            value={timeline}
            onChange={(e) => setTimeline(e.target.value)}
          />
          <TextField
            id="rooms"
            label="Number of rooms or offices"
            optional
            type="number"
            inputMode="numeric"
            min={0}
            value={rooms}
            onChange={(e) => setRooms(e.target.value)}
          />
          <TextField
            id="floorsOrScreens"
            label={countLabel}
            optional
            type="number"
            inputMode="numeric"
            min={0}
            value={floorsOrScreens}
            onChange={(e) => setFloorsOrScreens(e.target.value)}
          />
          <TextArea
            id="details"
            label="Anything else we should know?"
            optional
            rows={4}
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            className="sm:col-span-2"
          />
        </div>
      )}

      {step === 2 && (
        <>
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
            I agree that Apexon may use these details to reply to my request, as described in the{" "}
            <a
              href="/privacy"
              target="_blank"
              className="font-semibold underline underline-offset-4"
            >
              Privacy Policy
            </a>
            .
          </Checkbox>
          <HoneypotField value={website} onChange={setWebsite} />
        </>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        {step > 0 ? (
          <button type="button" onClick={back} className="btn btn-outline-dark">
            <ArrowLeft className="h-4 w-4" aria-hidden /> Back
          </button>
        ) : (
          <span />
        )}
        <button
          type="submit"
          className="btn btn-primary"
          disabled={sending}
          aria-disabled={sending}
        >
          {step < 2 ? (
            <>
              Next <ArrowRight className="h-4 w-4" aria-hidden />
            </>
          ) : sending ? (
            "Sending…"
          ) : (
            "Send request"
          )}
        </button>
      </div>
    </form>
  );
}
