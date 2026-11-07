// Receives quote, support, document and partner requests from the website, checks
// them, stores them in public.enquiries and emails them to Apexon via Resend.
//
// Public endpoint (no login), so it protects itself: field validation, a hidden
// honeypot field, a minimum fill time, and at most RATE_LIMIT submissions per
// hour from one IP (stored only as a keyed hash).
//
// Environment: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are provided by
// Supabase. RESEND_API_KEY is set by the owner; without it enquiries are still
// stored, just not emailed. NOTIFY_TO optionally overrides the recipient.
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.58.0";
import { z } from "npm:zod@3.25.76";

const NOTIFY_TO = Deno.env.get("NOTIFY_TO") ?? "apexontech2@gmail.com";
const RATE_LIMIT = 5;
const MIN_FILL_MS = 3000;

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "content-type, apikey, authorization, x-client-info",
};

const text = (max: number) => z.string().trim().max(max);
const optionalText = (max: number) =>
  text(max)
    .optional()
    .transform((v) => (v ? v : undefined));
const count = z.coerce.number().int().min(0).max(10000).optional();

const contact = {
  name: text(120).min(2, "Please enter your name."),
  organisation: optionalText(160),
  email: z
    .string()
    .trim()
    .max(254)
    .email("Please enter a valid email address.")
    .optional()
    .or(z.literal("").transform(() => undefined)),
  phone: z
    .string()
    .trim()
    .max(40)
    .regex(/^[+\d][\d\s()-]{6,}$/, "Please enter a valid phone number.")
    .optional()
    .or(z.literal("").transform(() => undefined)),
  preferredContact: z.enum(["call", "whatsapp", "email"]),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Please agree to the Privacy Policy." }),
  }),
  location: optionalText(120),
  // Spam traps: `website` must stay empty; `fillMs` is how long the form was open,
  // measured on the visitor's own clock (so a wrong device clock does not matter).
  website: z.string().max(200).optional(),
  fillMs: z.coerce.number().min(0).optional(),
};

const quote = z.object({
  kind: z.literal("quote"),
  service: z.enum(["networking", "infrastructure", "iptv-av", "maintenance", "not-sure"]),
  siteSurvey: z.boolean().default(false),
  buildingType: optionalText(80),
  rooms: count,
  floorsOrScreens: count,
  timeline: optionalText(80),
  details: optionalText(4000),
  ...contact,
});

const support = z.object({
  kind: z.literal("support"),
  urgency: z.enum(["critical", "high", "normal"]),
  details: text(4000).min(10, "Please describe the fault in a sentence or two."),
  ...contact,
  location: text(120).min(2, "Please enter the site location."),
});

// Keep in step with `companyDocuments` in src/content/site.ts.
const documentNames = [
  "Certificate of incorporation",
  "KRA PIN certificate",
  "Tax compliance certificate",
  "CR-12",
  "County business permit",
  "e-GP supplier registration",
] as const;

const documents = z.object({
  kind: z.literal("documents"),
  documents: z
    .array(z.enum(documentNames))
    .min(1, "Please choose at least one document.")
    .max(documentNames.length),
  tenderReference: optionalText(160),
  details: optionalText(4000),
  ...contact,
  organisation: text(160).min(2, "Please enter your organisation."),
});

const partner = z.object({
  kind: z.literal("partner"),
  partnerType: text(80).min(2, "Please choose what kind of partner you are."),
  details: text(4000).min(10, "Please tell us briefly how you would like to work together."),
  ...contact,
  organisation: text(160).min(2, "Please enter your organisation."),
});

const schema = z
  .discriminatedUnion("kind", [quote, support, documents, partner])
  .refine((d) => d.email || d.phone, {
    message: "Please give an email address or a phone number.",
    path: ["email"],
  });

type Enquiry = z.infer<typeof schema>;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...cors, "Content-Type": "application/json" },
  });

async function hashIp(ip: string): Promise<string> {
  const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
  const data = new TextEncoder().encode(`${ip}:${key}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, "0")).join("");
}

function emailBody(e: Enquiry): { subject: string; text: string } {
  const lines: [string, unknown][] =
    e.kind === "quote"
      ? [
          ["Service", e.service],
          ["Site survey requested", e.siteSurvey ? "Yes" : "No"],
          ["Building type", e.buildingType],
          ["Rooms", e.rooms],
          ["Floors or screens", e.floorsOrScreens],
          ["Timeline", e.timeline],
          ["Location", e.location],
          ["Details", e.details],
        ]
      : e.kind === "support"
        ? [
            ["Urgency", e.urgency],
            ["Location", e.location],
            ["Fault", e.details],
          ]
        : e.kind === "documents"
          ? [
              ["Documents requested", e.documents.join(", ")],
              ["Tender or reference", e.tenderReference],
              ["Notes", e.details],
            ]
          : [
              ["Partner type", e.partnerType],
              ["Location", e.location],
              ["Proposal", e.details],
            ];
  const who: [string, unknown][] = [
    ["Name", e.name],
    ["Organisation", e.organisation],
    ["Email", e.email],
    ["Phone", e.phone],
    ["Prefers", e.preferredContact],
  ];
  const fmt = (rows: [string, unknown][]) =>
    rows
      .filter(([, v]) => v !== undefined && v !== "")
      .map(([k, v]) => `${k}: ${v}`)
      .join("\n");
  const subject =
    e.kind === "quote"
      ? `New quote request: ${e.service} (${e.name})`
      : e.kind === "support"
        ? `Support request [${e.urgency.toUpperCase()}]: ${e.name}`
        : e.kind === "documents"
          ? `Document request: ${e.organisation} (${e.name})`
          : `Partner enquiry: ${e.organisation} (${e.partnerType})`;
  return { subject, text: `${fmt(lines)}\n\n${fmt(who)}\n\nSent from the Apexon website.` };
}

async function sendEmail(e: Enquiry): Promise<boolean> {
  const key = Deno.env.get("RESEND_API_KEY");
  if (!key) return false;
  const { subject, text } = emailBody(e);
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      // Resend's shared sender until the Apexon domain is verified with Resend.
      from: "Apexon Website <onboarding@resend.dev>",
      to: [NOTIFY_TO],
      reply_to: e.email,
      subject,
      text,
    }),
  });
  if (!res.ok) console.error("Resend error", res.status, await res.text());
  return res.ok;
}

function adminClient() {
  return createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, {
    auth: { persistSession: false },
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  // Daily keep-alive from .github/workflows/keep-supabase-awake.yml. A tiny database
  // query counts as activity, so the free project is not paused. Returns no data.
  if (req.method === "GET") {
    const { error } = await adminClient()
      .from("enquiries")
      .select("id", { count: "exact", head: true });
    return json({ ok: !error }, error ? 500 : 200);
  }
  if (req.method !== "POST") return json({ ok: false, error: "Method not allowed." }, 405);

  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return json({ ok: false, error: "Invalid request." }, 400);
  }

  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      fieldErrors[key] ??= issue.message;
    }
    return json({ ok: false, error: "Please check the highlighted fields.", fieldErrors }, 422);
  }
  const e = parsed.data;

  // Bots: pretend success so they learn nothing, but store and send nothing.
  // The site's forms always send fillMs, so a missing value means a script.
  const tooFast = e.fillMs === undefined || e.fillMs < MIN_FILL_MS;
  if (e.website || tooFast) return json({ ok: true });

  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0]!.trim() || "unknown";
  const ipHash = await hashIp(ip);
  const db = adminClient();

  const since = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  const { count: recent, error: countError } = await db
    .from("enquiries")
    .select("id", { count: "exact", head: true })
    .eq("ip_hash", ipHash)
    .gte("created_at", since);
  if (countError) {
    console.error("Rate-limit check failed", countError);
    return json({ ok: false, error: "Something went wrong. Please call or WhatsApp us." }, 500);
  }
  if ((recent ?? 0) >= RATE_LIMIT) {
    return json(
      {
        ok: false,
        error: "We've received several requests from you already. Please call or WhatsApp us.",
      },
      429,
    );
  }

  const row = {
    kind: e.kind,
    name: e.name,
    organisation: e.organisation,
    email: e.email,
    phone: e.phone,
    preferred_contact: e.preferredContact,
    consent: e.consent,
    location: e.location,
    details: e.details,
    ip_hash: ipHash,
    ...(e.kind === "quote"
      ? {
          service: e.service,
          site_survey: e.siteSurvey,
          building_type: e.buildingType,
          rooms: e.rooms,
          floors_or_screens: e.floorsOrScreens,
          timeline: e.timeline,
        }
      : e.kind === "support"
        ? { urgency: e.urgency }
        : e.kind === "documents"
          ? { documents: e.documents, tender_reference: e.tenderReference }
          : { partner_type: e.partnerType }),
  };

  const { data: inserted, error: insertError } = await db
    .from("enquiries")
    .insert(row)
    .select("id")
    .single();
  if (insertError) {
    console.error("Insert failed", insertError);
    return json({ ok: false, error: "Something went wrong. Please call or WhatsApp us." }, 500);
  }

  const sent = await sendEmail(e).catch((err) => {
    console.error("Email failed", err);
    return false;
  });
  if (sent) await db.from("enquiries").update({ email_sent: true }).eq("id", inserted.id);

  return json({ ok: true });
});
