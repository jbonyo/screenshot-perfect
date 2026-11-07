// Central content for the whole site. Update details here only.
// Anything with `confirmed: false` is a placeholder and is shown as such.
import { photo } from "@/lib/photos";

export const company = {
  name: "Apexon Global Technologies",
  short: "Apexon",
  tagline: "Technology You Can Depend On.",
  secondaryTagline: "Built to Perform. Built to Last.",
  positioning: "The Accountable Engineering Team",
  city: "Nairobi",
  country: "Kenya",
};

// Public address of the site, e.g. "https://apexonglobal.co.ke" (no trailing slash).
// Leave empty until the domain is live: canonical links and absolute share-image
// URLs are only emitted once this is set.
export const siteUrl = "";

type ContactItem = { value: string; href: string; confirmed: boolean };

export const contact: {
  phone: ContactItem;
  whatsapp: ContactItem;
  email: ContactItem;
  location: ContactItem;
  hours: ContactItem;
} = {
  phone: { value: "+254 759 551 005", href: "tel:+254759551005", confirmed: true },
  whatsapp: {
    value: "+254 759 551 005",
    href: "https://wa.me/254759551005",
    confirmed: true,
  },
  email: {
    value: "apexontech2@gmail.com",
    href: "mailto:apexontech2@gmail.com",
    confirmed: true,
  },
  location: {
    value: "TransNational Bank building, 3rd floor, Office 34, Nairobi (visits by appointment)",
    href: "/contact",
    confirmed: true,
  },
  hours: {
    value: "Mon–Fri 8:00 am – 5:00 pm · Sat 9:00 am – 4:00 pm",
    href: "/contact",
    confirmed: true,
  },
};

// Structured versions of the address and hours, used for search-engine data.
export const address = {
  streetAddress: "TransNational Bank building, 3rd floor, Office 34",
  addressLocality: "Nairobi",
  addressCountry: "KE",
};
export const openingHours = [
  {
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "08:00",
    closes: "17:00",
  },
  { days: ["Saturday"], opens: "09:00", closes: "16:00" },
];

export type Social = {
  name: "LinkedIn" | "X" | "Facebook" | "Instagram" | "TikTok";
  href: string;
  confirmed: boolean;
};
// Add verified profile URLs and set confirmed: true. Unconfirmed links are not shown.
export const socials: Social[] = [
  { name: "Instagram", href: "https://www.instagram.com/apexon.global", confirmed: true },
  { name: "TikTok", href: "https://www.tiktok.com/@apexon.global", confirmed: true },
  { name: "X", href: "https://x.com/ApexonTech", confirmed: true },
  // Waiting for the real page URLs.
  { name: "LinkedIn", href: "", confirmed: false },
  { name: "Facebook", href: "", confirmed: false },
];

export const cta = {
  quote: { label: "Request a Quote", to: "/contact" as const },
  services: { label: "Explore Our Services", to: "/services" as const },
};

export const nav = [
  { label: "Home", to: "/" as const },
  { label: "Services", to: "/services" as const },
  { label: "About", to: "/about" as const },
  { label: "Contact", to: "/contact" as const },
];

// Pages outside the main navigation, linked from the footer and listed in the sitemap.
export const secondaryPages = [
  { label: "Support request", to: "/support" as const },
  { label: "Privacy Policy", to: "/privacy" as const },
  { label: "Terms", to: "/terms" as const },
];

// Where the quote and support forms send enquiries (see supabase/README.md).
export const enquiryEndpoint =
  "https://aakehgdlubuzjdswzuvk.supabase.co/functions/v1/submit-enquiry";

// Owner answers, 7 November 2026. Used in thank-you messages and the Privacy Policy.
export const enquiry = {
  replyPromise: "within one business day",
  siteSurveyLabel: "Request a free site survey",
  retentionMonths: 24,
};

// Cookieless analytics (Umami Cloud). No script loads while the ID is empty.
export const analytics = {
  umamiWebsiteId: "cb2a6116-5482-4480-90a8-f2c4161eac47",
  scriptSrc: "https://cloud.umami.is/script.js",
};

// Data-protection facts for the Privacy Policy. Only fill in what is true.
export const dataProtection = {
  // ODPC registration is being applied for; leave empty until a number is issued.
  odpcRegistrationNumber: "",
  storage: "Supabase, hosted in Ireland (European Union)",
  // Set to true once a lawyer or data-protection adviser has reviewed the legal pages.
  legalPagesReviewed: false,
  lastUpdated: "7 November 2026",
};

// Click-to-chat link with a pre-filled first message.
export function whatsappLink(topic?: string) {
  const text = topic
    ? `Hello Apexon, I'd like to ask about ${topic}.`
    : "Hello Apexon, I'd like to ask about your services.";
  return `${contact.whatsapp.href}?text=${encodeURIComponent(text)}`;
}

// All photos are stock or generated images. The footer says "Photos are illustrative"
// and each alt text ends "(illustrative image)" (owner decision, 7 November 2026).
export const images = {
  rack: photo("rack", 1920, 1088),
  cabletray: photo("cabletray", 1920, 1088),
  iptv: photo("iptv", 1920, 1088),
  testing: photo("testing", 1920, 1088),
  wifi: photo("wifi", 1920, 1088),
  technician: photo("technician", 1920, 1440),
  trainingRoom: photo("training-room", 1920, 1280),
  fibrePanel: photo("fibre-panel", 1920, 1278),
};

export const illustrativeLabel = "Illustrative image";

export const hero = {
  eyebrow: "Apexon Global Technologies · Nairobi",
  title: "Technology You Can Depend On.",
  body: "Networking, IT infrastructure, IPTV and audiovisual systems, and the maintenance that keeps them running, delivered with engineering discipline.",
  image: images.rack,
  alt: "Neatly organised network rack with structured cabling (illustrative image)",
};

// Plain statements of fact only. No figures until they can be proven.
export const facts = [
  "Nairobi-based",
  "Networking & structured cabling",
  "IT infrastructure, IPTV & AV",
  "Maintenance & technical support",
];

export const services = [
  {
    slug: "networking",
    whatsappTopic: "structured cabling",
    title: "Networking & Structured Cabling",
    short:
      "Copper and fibre cabling, racks, and patching, designed, installed, labelled, and tested.",
    points: [
      "Cabling design & installation",
      "Rack & cabinet build-outs",
      "Labelling and test reports",
    ],
    image: images.fibrePanel,
    alt: "Fibre patch leads in a rack-mounted patch panel (illustrative image)",
  },
  {
    slug: "infrastructure",
    whatsappTopic: "IT infrastructure",
    title: "IT Infrastructure",
    short: "Servers, switching, and Wi-Fi that support daily operations without drama.",
    points: [
      "Server & switching setup",
      "Enterprise Wi-Fi coverage",
      "Infrastructure documentation",
    ],
    image: images.wifi,
    alt: "Ceiling-mounted Wi-Fi access point in an office (illustrative image)",
  },
  {
    slug: "iptv-av",
    whatsappTopic: "IPTV and audiovisual systems",
    title: "IPTV & Audiovisual Systems",
    short: "Displays, IPTV distribution, and meeting-room AV for institutions and corporates.",
    points: ["IPTV distribution", "Meeting & training room AV", "Display & signage installs"],
    image: images.trainingRoom,
    alt: "Training room with a large wall display and rows of desks (illustrative image)",
  },
  {
    slug: "maintenance",
    whatsappTopic: "maintenance and technical support",
    title: "Maintenance & Technical Support",
    short:
      "Planned maintenance and fault support for the systems we install, and for existing networks.",
    points: [
      "Preventive maintenance visits",
      "Fault diagnosis & repair",
      "Support for existing installations",
    ],
    image: images.testing,
    alt: "Technician testing a network cable with a handheld tester (illustrative image)",
  },
];

// Set to true and fill `testimonials` once genuine, approved reviews exist.
export const showTestimonials = false;
export const testimonials: {
  quote: string;
  name: string;
  role: string;
  organisation: string;
}[] = [];

export const principles = [
  { title: "Thorough testing", body: "Every link and system is tested before we call it done." },
  {
    title: "Clear documentation",
    body: "Labelling, layouts, and records you can actually use later.",
  },
  {
    title: "Accountable delivery",
    body: "One team, clear responsibility, from survey to sign-off.",
  },
  {
    title: "Professional handover",
    body: "A walkthrough and a documented handover, not just a closed ticket.",
  },
];

export const process = ["Assess", "Design", "Supply", "Install", "Test", "Hand over"];

export const handover = {
  title: "What every handover includes",
  body: "When we finish, you receive the records you need to run, audit, and extend the system.",
  items: [
    { title: "Test reports", body: "Results for every tested link and system." },
    { title: "Labelling", body: "Ports, cables, and equipment labelled to a clear scheme." },
    { title: "As-built drawings", body: "Layouts showing what was installed and where." },
    { title: "Walkthrough", body: "Your team is shown how the system is laid out and used." },
    { title: "Sign-off", body: "A documented handover with clear responsibility." },
  ],
};

export const audiences = [
  {
    title: "Government institutions",
    body: "Infrastructure delivered with documentation suitable for procurement and audit.",
  },
  {
    title: "Corporate organisations",
    body: "Dependable networks and meeting spaces that keep work moving.",
  },
  {
    title: "Technology partners",
    body: "A disciplined installation team to deliver alongside your solution.",
  },
];

export const gallery = [
  { src: images.rack, alt: "Network rack with blue structured cabling" },
  { src: images.technician, alt: "Technician working on cabling in a network rack" },
  { src: images.trainingRoom, alt: "Training room with a large wall display" },
  { src: images.cabletray, alt: "Cable tray along a corridor ceiling" },
  { src: images.testing, alt: "Cable certification testing" },
  { src: images.iptv, alt: "Lobby video wall" },
  { src: images.wifi, alt: "Office Wi-Fi access point" },
  { src: images.fibrePanel, alt: "Fibre patch panel in a rack" },
];
