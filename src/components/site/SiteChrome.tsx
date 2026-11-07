import { Link } from "@tanstack/react-router";
import { useState, type ComponentType } from "react";
import {
  ArrowRight,
  Clock,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Twitter,
  X,
} from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Photo } from "@/components/site/Photo";
import { company, contact, cta, nav, services, socials, type Social } from "@/content/site";
import { useFocusTrap } from "@/hooks/use-focus-trap";
import type { Photo as PhotoData } from "@/lib/photos";

const verifiedSocials = socials.filter((s) => s.confirmed && s.href);

// lucide has no TikTok glyph; use the standard brand mark instead.
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  );
}

const socialIcon: Record<Social["name"], ComponentType<{ className?: string }>> = {
  LinkedIn: Linkedin,
  X: Twitter,
  Facebook,
  Instagram,
  TikTok: TikTokIcon,
};

export function ContactLinks({
  tone = "dark",
  compact = false,
}: {
  tone?: "dark" | "light";
  compact?: boolean;
}) {
  const items = [
    { icon: Phone, label: "Call", ...contact.phone },
    { icon: MessageCircle, label: "WhatsApp", ...contact.whatsapp },
    { icon: Mail, label: "Email", ...contact.email },
  ];
  return (
    <ul className={compact ? "flex flex-wrap items-center gap-x-6 gap-y-1" : "space-y-1"}>
      {items.map(({ icon: Icon, label, value, href, confirmed }) => (
        <li key={label}>
          <a
            href={href}
            className="group inline-flex min-h-10 max-w-full flex-wrap items-center gap-x-2 hover:text-primary"
          >
            <Icon className="h-4 w-4 shrink-0 text-primary" aria-hidden />
            <span className="font-semibold">{label}:</span>
            {/* Long values such as the email address may wrap in narrow columns. */}
            <span
              className={`min-w-0 [overflow-wrap:anywhere] ${
                confirmed
                  ? ""
                  : tone === "dark"
                    ? "italic text-paper-muted"
                    : "italic text-muted-foreground"
              }`}
            >
              {value}
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}

function Socials() {
  if (!verifiedSocials.length) return null;
  return (
    <ul className="flex items-center gap-1">
      {verifiedSocials.map((s) => {
        const Icon = socialIcon[s.name];
        return (
          <li key={s.name}>
            <a
              href={s.href}
              target="_blank"
              rel="noreferrer"
              aria-label={`${company.short} on ${s.name}`}
              className="grid h-10 w-10 place-items-center rounded-md hover:text-primary"
            >
              <Icon className="h-4 w-4" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  const menuRef = useFocusTrap<HTMLDivElement>(open, close);

  return (
    <>
      <div className="surface-red hidden bg-brand text-sm text-primary-foreground md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-1 [&_.text-primary]:text-primary-foreground">
          <ContactLinks compact />
          <div className="[&_a:hover]:text-primary-foreground/80">
            <Socials />
          </div>
        </div>
      </div>
      <header className="surface-dark sticky top-0 z-40 border-b border-ink-line bg-ink/95 text-paper backdrop-blur">
        <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 md:px-6">
          <Link to="/" aria-label="Apexon Global Technologies, home" className="min-w-0">
            <Logo className="w-36 md:w-48" />
          </Link>
          <div className="flex items-center gap-2 md:gap-3">
            <nav aria-label="Primary" className="mr-2 hidden items-center gap-6 lg:flex">
              {nav.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  className="text-sm font-semibold text-paper/80 hover:text-paper"
                  activeProps={{
                    className:
                      "text-paper underline decoration-primary decoration-2 underline-offset-8",
                    "aria-current": "page",
                  }}
                  activeOptions={{ exact: true }}
                >
                  {n.label}
                </Link>
              ))}
            </nav>
            <a
              href={contact.phone.href}
              className="hidden min-h-12 items-center gap-2 px-2 text-sm font-semibold text-paper/80 hover:text-paper md:inline-flex"
            >
              <Phone className="h-4 w-4" aria-hidden /> {contact.phone.value}
            </a>
            <Link to={cta.quote.to} className="btn btn-primary hidden sm:inline-flex">
              {cta.quote.label}
            </Link>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="site-menu"
              className="btn min-h-12 border-2 border-paper/60 px-4 text-paper hover:bg-paper hover:text-ink lg:hidden"
            >
              <Menu className="h-5 w-5" aria-hidden /> <span className="text-base">Menu</span>
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div
          ref={menuRef}
          id="site-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="surface-dark fixed inset-0 z-50 overflow-y-auto bg-ink text-paper animate-in fade-in"
        >
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
            <Logo className="w-36 md:w-48" />
            <button
              type="button"
              onClick={close}
              autoFocus
              className="btn min-h-12 border-2 border-paper px-4 hover:bg-paper hover:text-ink"
            >
              <X className="h-5 w-5" aria-hidden /> Close
            </button>
          </div>
          <div className="mx-auto grid max-w-7xl gap-12 px-6 py-10 md:grid-cols-[1.4fr_1fr]">
            <nav aria-label="Menu">
              <ul className="space-y-2">
                {nav.map((n, i) => (
                  <li key={n.to} className="animate-rise" style={{ animationDelay: `${i * 60}ms` }}>
                    <Link
                      to={n.to}
                      onClick={close}
                      className="group flex items-center justify-between border-b border-ink-line py-4 text-4xl font-extrabold tracking-tight hover:text-primary md:text-6xl"
                    >
                      {n.label}
                      <ArrowRight
                        className="h-8 w-8 opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100"
                        aria-hidden
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="space-y-8">
              <div>
                <p className="eyebrow mb-3">Services</p>
                <ul className="space-y-1">
                  {services.map((s) => (
                    <li key={s.slug}>
                      <Link
                        to="/services"
                        hash={s.slug}
                        onClick={close}
                        className="inline-flex min-h-10 items-center text-lg hover:text-primary"
                      >
                        {s.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="eyebrow mb-3">Contact</p>
                <ContactLinks />
              </div>
              <Link to={cta.quote.to} onClick={close} className="btn btn-primary w-full">
                {cta.quote.label}
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function MobileActionBar() {
  const items = [
    { label: "Call", icon: Phone, href: contact.phone.href },
    { label: "WhatsApp", icon: MessageCircle, href: contact.whatsapp.href },
    { label: "Email", icon: Mail, href: contact.email.href },
  ];
  return (
    <nav
      aria-label="Quick contact"
      className="surface-dark fixed inset-x-0 bottom-0 z-30 grid grid-cols-4 border-t border-ink-line bg-ink text-paper md:hidden"
    >
      {items.map(({ label, icon: Icon, href }) => (
        <a
          key={label}
          href={href}
          className="flex min-h-16 flex-col items-center justify-center gap-1 text-xs font-semibold"
        >
          <Icon className="h-5 w-5 text-primary" aria-hidden /> {label}
        </a>
      ))}
      <Link
        to={cta.quote.to}
        className="flex min-h-16 flex-col items-center justify-center gap-1 bg-brand text-xs font-bold text-primary-foreground"
      >
        <ArrowRight className="h-5 w-5" aria-hidden /> Quote
      </Link>
    </nav>
  );
}

export function QuoteBand() {
  return (
    <section className="surface-red bg-brand text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-14 md:grid-cols-[1.5fr_1fr] md:items-center md:py-20">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight md:text-5xl">
            Have a project in mind?
          </h2>
          <p className="mt-4 max-w-xl text-lg text-primary-foreground/90">
            Tell us about your site, scope, and timelines. We'll come back with a clear, itemised
            proposal.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 md:justify-end">
          <Link to={cta.quote.to} className="btn bg-ink text-paper hover:bg-ink-soft">
            {cta.quote.label} <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
          <a href={contact.phone.href} className="btn btn-outline-light">
            <Phone className="h-4 w-4" aria-hidden /> Call us
          </a>
        </div>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="surface-dark bg-ink pb-20 text-paper md:pb-0">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-14 md:grid-cols-4 md:py-16">
        <div>
          <Logo className="w-48" />
          <p className="mt-6 text-paper-muted">{company.tagline}</p>
          <p className="mt-1 font-mono text-xs uppercase tracking-widest text-primary">
            {company.positioning}
          </p>
        </div>
        <div>
          <h2 className="eyebrow mb-4">Services</h2>
          <ul className="text-paper/80">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  to="/services"
                  hash={s.slug}
                  className="inline-flex min-h-10 items-center hover:text-primary"
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="eyebrow mb-4">Company</h2>
          <ul className="text-paper/80">
            {nav.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="inline-flex min-h-10 items-center hover:text-primary">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-4 text-sm">
          <h2 className="eyebrow">Get in touch</h2>
          <ContactLinks />
          <p className="flex items-start gap-2 text-paper-muted">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />{" "}
            {contact.location.value}
          </p>
          <p className="flex items-start gap-2 text-paper-muted">
            <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />{" "}
            {contact.hours.value}
          </p>
          <Socials />
          <Link to={cta.quote.to} className="btn btn-primary">
            {cta.quote.label}
          </Link>
        </div>
      </div>
      <div className="border-t border-ink-line">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-2 px-6 py-6 text-xs text-paper-muted">
          <p>
            © {new Date().getFullYear()} {company.name}. All rights reserved.
          </p>
          <p>Privacy Policy and Terms coming soon · Photos are illustrative.</p>
        </div>
      </div>
    </footer>
  );
}

export function PageHero({
  eyebrow,
  title,
  body,
  image,
}: {
  eyebrow: string;
  title: string;
  body: string;
  image: PhotoData;
}) {
  return (
    <section className="surface-dark relative isolate overflow-hidden bg-ink text-paper">
      <Photo
        photo={image}
        alt=""
        priority
        className="absolute inset-0 -z-10 h-full w-full object-cover opacity-50"
      />
      <div className="absolute inset-0 -z-10" style={{ background: "var(--overlay-hero)" }} />
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-32">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl text-[clamp(2.25rem,6vw+1rem,4.5rem)] font-extrabold leading-[1.02] tracking-tight">
          {title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-paper/85">{body}</p>
      </div>
    </section>
  );
}
