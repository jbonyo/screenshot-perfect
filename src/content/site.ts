// Central content for the whole site. Update details here only.
// Anything with `confirmed: false` is a placeholder and is shown as such.
import rack from "@/assets/rack.jpg";
import engineer from "@/assets/engineer.jpg";
import boardroom from "@/assets/boardroom.jpg";
import testing from "@/assets/testing.jpg";
import iptv from "@/assets/iptv.jpg";
import cabletray from "@/assets/cabletray.jpg";
import wifi from "@/assets/wifi.jpg";
import building from "@/assets/building.jpg";

export const company = {
  name: "Apexon Global Technologies",
  short: "Apexon",
  tagline: "Technology You Can Depend On.",
  secondaryTagline: "Built to Perform. Built to Last.",
  positioning: "The Accountable Engineering Team",
  country: "Kenya",
};

type ContactItem = { value: string; href: string; confirmed: boolean };

export const contact: {
  phone: ContactItem;
  whatsapp: ContactItem;
  email: ContactItem;
  location: ContactItem;
  hours: ContactItem;
} = {
  phone: { value: "+254 759 551 005", href: "tel:+254759551005", confirmed: true },
  whatsapp: { value: "+254 759 551 005", href: "https://wa.me/254759551005", confirmed: true },
  email: { value: "apexontech2@gmail.com", href: "mailto:apexontech2@gmail.com", confirmed: true },
  location: { value: "Nairobi, Kenya (address to be confirmed)", href: "/contact", confirmed: false },
  hours: { value: "Business hours to be confirmed", href: "/contact", confirmed: false },
};

export type Social = { name: "LinkedIn" | "X" | "Facebook" | "Instagram" | "TikTok"; href: string; confirmed: boolean };
// Add verified profile URLs and set confirmed: true. Unconfirmed links are not shown.
export const socials: Social[] = [
  { name: "Instagram", href: "https://www.instagram.com/apexon.global", confirmed: true },
  { name: "Facebook", href: "https://www.facebook.com/search/top?q=Apexon%20Global%20Technologies", confirmed: true },
  { name: "TikTok", href: "https://www.tiktok.com/@apexon.global", confirmed: true },
  { name: "X", href: "https://x.com/ApexonTech", confirmed: true },
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

export const images = { rack, engineer, boardroom, testing, iptv, cabletray, wifi, building };

export const heroSlides = [
  {
    eyebrow: "Apexon Global Technologies",
    title: "Technology You Can Depend On.",
    body: "Reliable networking, IT infrastructure, and audiovisual systems delivered with engineering discipline.",
    cta: { label: "Request a Quote", to: "/contact" as const },
    image: rack,
    alt: "Neatly organised network rack with structured cabling (illustrative stock image)",
  },
  {
    eyebrow: "Networking & Infrastructure",
    title: "Build a Stronger Network.",
    body: "Structured cabling and IT infrastructure designed around your organisation's needs.",
    cta: { label: "Explore Our Services", to: "/services" as const },
    image: cabletray,
    alt: "Overhead cable tray with bundled network cables in a corridor (illustrative stock image)",
  },
  {
    eyebrow: "IPTV & Audiovisual",
    title: "Connect Spaces. Deliver Better Experiences.",
    body: "Professional IPTV and audiovisual solutions for suitable institutional and corporate environments.",
    cta: { label: "Discuss Your Project", to: "/contact" as const },
    image: iptv,
    alt: "Lobby with a large multi-screen video wall (illustrative stock image)",
  },
  {
    eyebrow: "Engineering & Delivery",
    title: "Built to Perform. Built to Last.",
    body: "A structured approach to installation, testing, documentation, and handover.",
    cta: { label: "How We Work", to: "/about" as const },
    image: testing,
    alt: "Technician certifying a network cable with a handheld tester (illustrative stock image)",
  },
  {
    eyebrow: "Corporate & Institutional",
    title: "Technology Infrastructure for Critical Operations.",
    body: "Practical technology solutions for government institutions, corporate organisations, and technology partners.",
    cta: { label: "Talk to Our Team", to: "/contact" as const },
    image: building,
    alt: "Modern institutional office building at dusk (illustrative stock image)",
  },
];

export const services = [
  {
    slug: "networking",
    title: "Networking & Structured Cabling",
    short: "Copper and fibre cabling, racks, and patching — designed, installed, labelled, and tested.",
    points: ["Cabling design & installation", "Rack & cabinet build-outs", "Labelling and test reports"],
    image: rack,
    alt: "Structured cabling in a network rack (illustrative stock image)",
  },
  {
    slug: "infrastructure",
    title: "IT Infrastructure",
    short: "Servers, switching, and Wi-Fi that support daily operations without drama.",
    points: ["Server & switching setup", "Enterprise Wi-Fi coverage", "Infrastructure documentation"],
    image: wifi,
    alt: "Ceiling-mounted Wi-Fi access point in an office (illustrative stock image)",
  },
  {
    slug: "iptv-av",
    title: "IPTV & Audiovisual Systems",
    short: "Displays, IPTV distribution, and meeting-room AV for institutions and corporates.",
    points: ["IPTV distribution", "Boardroom & conference AV", "Display & signage installs"],
    image: boardroom,
    alt: "Boardroom with display, speakers, and conference camera (illustrative stock image)",
  },
];

// Set to true and fill `testimonials` once genuine, approved reviews exist.
export const showTestimonials = false;
export const testimonials: { quote: string; name: string; role: string; organisation: string }[] = [];

export const principles = [
  { title: "Thorough testing", body: "Every link and system is tested before we call it done." },
  { title: "Clear documentation", body: "Labelling, layouts, and records you can actually use later." },
  { title: "Accountable delivery", body: "One team, clear responsibility, from survey to sign-off." },
  { title: "Professional handover", body: "A walkthrough and a documented handover — not just a closed ticket." },
];

export const process = ["Assess", "Design", "Supply", "Install", "Test", "Hand over"];

export const audiences = [
  { title: "Government institutions", body: "Infrastructure delivered with documentation suitable for procurement and audit." },
  { title: "Corporate organisations", body: "Dependable networks and meeting spaces that keep work moving." },
  { title: "Technology partners", body: "A disciplined installation team to deliver alongside your solution." },
];

export const gallery = [
  { src: rack, alt: "Network rack with blue structured cabling", kind: "stock" as const },
  { src: engineer, alt: "Engineer patching cables at a patch panel", kind: "stock" as const },
  { src: boardroom, alt: "Conference room with audiovisual setup", kind: "stock" as const },
  { src: cabletray, alt: "Cable tray along a corridor ceiling", kind: "stock" as const },
  { src: testing, alt: "Cable certification testing", kind: "stock" as const },
  { src: iptv, alt: "Lobby video wall", kind: "stock" as const },
  { src: wifi, alt: "Office Wi-Fi access point", kind: "stock" as const },
  { src: building, alt: "Institutional building exterior", kind: "stock" as const },
];
