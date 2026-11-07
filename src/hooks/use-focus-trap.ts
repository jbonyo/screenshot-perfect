import { useEffect, useRef } from "react";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

// While `active`, keeps Tab and Shift+Tab inside the returned container, closes on
// Escape, locks page scroll, and returns focus to whatever opened it when it closes.
export function useFocusTrap<T extends HTMLElement>(active: boolean, onClose: () => void) {
  const ref = useRef<T>(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  // Track focus while closed: by the time the open effect runs, autoFocus has
  // already moved focus into the dialog, so the opener must be known earlier.
  const openerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (active) return;
    const remember = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      // The dialog's autoFocus fires before this listener is removed (and before
      // React attaches `ref`), so skip anything inside a modal dialog.
      if (target.closest?.('[aria-modal="true"]')) return;
      openerRef.current = target;
    };
    document.addEventListener("focusin", remember);
    return () => document.removeEventListener("focusin", remember);
  }, [active]);

  useEffect(() => {
    if (!active) return;
    const opener = openerRef.current;
    const el = ref.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeRef.current();
        return;
      }
      if (e.key !== "Tab" || !el) return;
      const items = Array.from(el.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (!items.length) return;
      const first = items[0]!;
      const last = items[items.length - 1]!;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      if (opener?.isConnected) opener.focus();
    };
  }, [active]);

  return ref;
}
