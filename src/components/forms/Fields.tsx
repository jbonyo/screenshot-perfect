import { forwardRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

// Accessible form fields: every input has a visible label, errors are linked
// with aria-describedby and marked aria-invalid, and text stays 16px so phones
// do not zoom in.
const control =
  "mt-2 w-full rounded-md border bg-card px-4 py-3 text-base outline-none focus:border-ink aria-[invalid=true]:border-brand";

function Message({
  id,
  error,
  hint,
}: {
  id: string;
  error?: string | undefined;
  hint?: string | undefined;
}) {
  return (
    <>
      {hint && (
        <span id={`${id}-hint`} className="mt-1 block text-sm font-normal text-muted-foreground">
          {hint}
        </span>
      )}
      {error && (
        <span id={`${id}-error`} className="mt-1 block text-sm font-semibold text-brand">
          {error}
        </span>
      )}
    </>
  );
}

const describedBy = (id: string, error?: string, hint?: string) =>
  [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(" ") || undefined;

type Base = {
  id: string;
  label: string;
  error?: string | undefined;
  hint?: string | undefined;
  optional?: boolean | undefined;
};

function Label({ label, optional }: { label: string; optional?: boolean | undefined }) {
  return (
    <>
      {label}
      {optional && <span className="font-normal text-muted-foreground"> (optional)</span>}
    </>
  );
}

export const TextField = forwardRef<
  HTMLInputElement,
  Base & React.InputHTMLAttributes<HTMLInputElement>
>(function TextField({ id, label, error, hint, optional, className, ...props }, ref) {
  return (
    <label htmlFor={id} className={cn("block font-semibold", className)}>
      <Label label={label} optional={optional} />
      <input
        ref={ref}
        id={id}
        className={control}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        {...props}
      />
      <Message id={id} error={error} hint={hint} />
    </label>
  );
});

export function TextArea({
  id,
  label,
  error,
  hint,
  optional,
  className,
  ...props
}: Base & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <label htmlFor={id} className={cn("block font-semibold", className)}>
      <Label label={label} optional={optional} />
      <textarea
        id={id}
        className={control}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        {...props}
      />
      <Message id={id} error={error} hint={hint} />
    </label>
  );
}

export function SelectField({
  id,
  label,
  error,
  hint,
  optional,
  options,
  placeholder,
  className,
  ...props
}: Base & {
  options: readonly string[];
  placeholder?: string;
} & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <label htmlFor={id} className={cn("block font-semibold", className)}>
      <Label label={label} optional={optional} />
      <select
        id={id}
        className={control}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        {...props}
      >
        {placeholder !== undefined && <option value="">{placeholder}</option>}
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <Message id={id} error={error} hint={hint} />
    </label>
  );
}

// A group of radio buttons styled as large tappable cards.
export function ChoiceGroup<T extends string>({
  name,
  legend,
  options,
  value,
  onChange,
  error,
  columns = 2,
}: {
  name: string;
  legend: string;
  options: readonly { value: T; label: string; hint?: string }[];
  value: T | "";
  onChange: (v: T) => void;
  error?: string | undefined;
  columns?: 1 | 2 | 3;
}) {
  const cols = { 1: "", 2: "sm:grid-cols-2", 3: "sm:grid-cols-3" }[columns];
  // In two columns an odd last option would leave an empty cell; let it span the row.
  const spanLast = columns === 2 && options.length % 2 === 1;
  return (
    <fieldset aria-describedby={error ? `${name}-error` : undefined}>
      <legend className="font-semibold">{legend}</legend>
      <div className={cn("mt-3 grid gap-3", cols)}>
        {options.map((o, i) => (
          <label
            key={o.value}
            className={cn(
              "flex min-h-14 cursor-pointer items-start gap-3 rounded-md border bg-card p-4 has-[:checked]:border-brand has-[:checked]:bg-brand/5 has-[:focus-visible]:outline has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-[var(--focus)]",
              spanLast && i === options.length - 1 && "sm:col-span-2",
            )}
          >
            <input
              type="radio"
              name={name}
              value={o.value}
              checked={value === o.value}
              onChange={() => onChange(o.value)}
              className="mt-1 h-4 w-4 shrink-0 accent-[var(--brand-deep)]"
            />
            <span>
              <span className="block font-semibold">{o.label}</span>
              {o.hint && <span className="block text-sm text-muted-foreground">{o.hint}</span>}
            </span>
          </label>
        ))}
      </div>
      {error && (
        <p id={`${name}-error`} className="mt-2 text-sm font-semibold text-brand">
          {error}
        </p>
      )}
    </fieldset>
  );
}

// Several checkboxes in one labelled group, for multi-choice questions.
export function CheckboxGroup<T extends string>({
  name,
  legend,
  options,
  values,
  onChange,
  error,
}: {
  name: string;
  legend: string;
  options: readonly T[];
  values: T[];
  onChange: (v: T[]) => void;
  error?: string | undefined;
}) {
  const toggle = (o: T) =>
    onChange(values.includes(o) ? values.filter((v) => v !== o) : [...values, o]);
  return (
    <fieldset aria-describedby={error ? `${name}-error` : undefined}>
      <legend className="font-semibold">{legend}</legend>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {options.map((o) => (
          <label
            key={o}
            className="flex min-h-12 cursor-pointer items-center gap-3 rounded-md border bg-card px-4 py-3 has-[:checked]:border-brand has-[:checked]:bg-brand/5"
          >
            <input
              type="checkbox"
              name={name}
              value={o}
              checked={values.includes(o)}
              onChange={() => toggle(o)}
              className="h-5 w-5 shrink-0 accent-[var(--brand-deep)]"
            />
            {o}
          </label>
        ))}
      </div>
      {error && (
        <p id={`${name}-error`} className="mt-2 text-sm font-semibold text-brand">
          {error}
        </p>
      )}
    </fieldset>
  );
}

export function Checkbox({
  id,
  checked,
  onChange,
  error,
  children,
}: {
  id: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  error?: string | undefined;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="flex min-h-11 cursor-pointer items-start gap-3">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className="mt-1 h-5 w-5 shrink-0 accent-[var(--brand-deep)]"
        />
        <span>{children}</span>
      </label>
      {error && (
        <p id={`${id}-error`} className="mt-1 text-sm font-semibold text-brand">
          {error}
        </p>
      )}
    </div>
  );
}

// Shown at the top of a form after a failed submit. It receives focus, so
// screen-reader users hear the problems at once; each item links to its field.
export const ErrorSummary = forwardRef<
  HTMLDivElement,
  { message: string; errors: Record<string, string>; labels: Record<string, string> }
>(function ErrorSummary({ message, errors, labels }, ref) {
  // `labels` lists fields in page order, so problems read top to bottom.
  const entries = Object.keys(labels)
    .filter((k) => errors[k])
    .map((k) => [k, errors[k]!] as const);
  return (
    <div
      ref={ref}
      tabIndex={-1}
      role="alert"
      className="rounded-md border-2 border-brand bg-brand/5 p-4 outline-none"
    >
      <p className="font-bold">{message}</p>
      {entries.length > 0 && (
        <ul className="mt-2 list-disc space-y-1 pl-5">
          {entries.map(([k, v]) => (
            <li key={k}>
              <a href={`#${k}`} className="underline underline-offset-4">
                {labels[k]}: {v}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});

// Off-screen trap field. People never see or fill it; simple bots usually do.
export function HoneypotField({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label>
        Leave this field empty
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </label>
    </div>
  );
}
