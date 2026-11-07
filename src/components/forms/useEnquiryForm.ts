import { useEffect, useRef, useState } from "react";
import { track } from "@/lib/analytics";
import { submitEnquiry, type FieldErrors } from "@/lib/enquiry";

// Shared state for single-page enquiry forms: errors with a focused summary,
// sending state, fill-time measurement for spam control, and the done state.
export function useEnquiryForm(event: string) {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [summary, setSummary] = useState("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const startedAt = useRef(0);
  const summaryRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    startedAt.current = performance.now();
  }, []);
  useEffect(() => {
    if (summary) summaryRef.current?.focus();
  }, [summary, errors]);
  useEffect(() => {
    if (done) doneRef.current?.focus();
  }, [done]);

  function fail(e: FieldErrors, message = "Please fix the following:") {
    setErrors(e);
    setSummary(message);
  }

  async function send(payload: Record<string, unknown>) {
    setSending(true);
    setSummary("");
    const result = await submitEnquiry({
      ...payload,
      fillMs: Math.round(performance.now() - startedAt.current),
    });
    setSending(false);
    if (result.ok) {
      track(event);
      setDone(true);
      return;
    }
    fail(result.fieldErrors ?? {}, result.error);
  }

  return { errors, summary, sending, done, summaryRef, doneRef, fail, send };
}
