import { enquiryEndpoint } from "@/content/site";

export type FieldErrors = Record<string, string>;
export type SubmitResult = { ok: true } | { ok: false; error: string; fieldErrors?: FieldErrors };

// Sends a quote or support request to the submit-enquiry Edge Function.
export async function submitEnquiry(payload: Record<string, unknown>): Promise<SubmitResult> {
  try {
    const res = await fetch(enquiryEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = (await res.json().catch(() => null)) as SubmitResult | null;
    if (data && typeof data === "object" && "ok" in data) return data;
    return { ok: false, error: "Something went wrong. Please call or WhatsApp us." };
  } catch {
    return {
      ok: false,
      error: "We couldn't reach our server. Check your connection, or call or WhatsApp us.",
    };
  }
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[+\d][\d\s()-]{6,}$/;

// Browser-side checks that mirror the server's, so most mistakes are caught
// before sending. The server checks everything again.
export function checkContact(v: {
  name: string;
  email: string;
  phone: string;
  consent: boolean;
}): FieldErrors {
  const e: FieldErrors = {};
  if (v.name.trim().length < 2) e["name"] = "Please enter your name.";
  if (v.email.trim() && !emailPattern.test(v.email.trim()))
    e["email"] = "Please enter a valid email address.";
  if (v.phone.trim() && !phonePattern.test(v.phone.trim()))
    e["phone"] = "Please enter a valid phone number.";
  if (!v.email.trim() && !v.phone.trim())
    e["email"] = "Please give an email address or a phone number.";
  if (!v.consent) e["consent"] = "Please agree to the Privacy Policy.";
  return e;
}
