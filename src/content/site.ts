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
  { src: images.testing, alt: "Network cable testing" },
  { src: images.iptv, alt: "Lobby video wall" },
  { src: images.wifi, alt: "Office Wi-Fi access point" },
  { src: images.fibrePanel, alt: "Fibre patch panel in a rack" },
];

// ---------------------------------------------------------------------------
// Phase 3: service detail, trust and compliance content. Owner answers,
// 7 November 2026. Only state what Apexon can prove; see docs/phase-3-brief.md.
// ---------------------------------------------------------------------------

export const team = {
  summary:
    "A core team of two electrical engineers and a telecommunications specialist, led by a founder with a data science background. Further specialists are engaged per project.",
  members: [
    { role: "Electrical engineers", count: 2 },
    { role: "Telecommunications specialist", count: 1 },
    { role: "Founder, data science", count: 1 },
  ],
};

export const serviceArea = "Based in Nairobi. We work anywhere in Kenya by arrangement.";

export const projectScope =
  "From small technical fixes to large institutional projects, scoped to what we can deliver well and supported by specialist partners where needed.";

// Testing wording stays general until test standards and equipment are confirmed.
// Set to true only once cable certification to a named standard can be delivered.
export const certificationTesting = false;

export const maintenanceTerms =
  "Visit schedules and fault response times are agreed with each client and written into the maintenance agreement.";

// Kenya Electronic Government Procurement (e-GP) supplier registration.
export const egpRegistration = {
  label: "Registered supplier on Kenya’s Electronic Government Procurement (e-GP) system",
  number: "SR/eGP/2025/52816",
};

// Documents Apexon can share on request (no badges or certifications not held).
export const companyDocuments = [
  "Certificate of incorporation",
  "KRA PIN certificate",
  "Tax compliance certificate",
  "CR-12",
  "County business permit",
  "e-GP supplier registration",
] as const;

export const partnerTypes = [
  "Main contractor",
  "Technology vendor or distributor",
  "Specialist subcontractor",
  "Consultant or system integrator",
  "Other",
] as const;

type ServiceDetail = {
  problem: string;
  supply: string[];
  process: string[];
  testing: string;
  receive: string[];
  faqs: { q: string; a: string }[];
};

// Detail pages at /services/<slug>. Keys match `services[].slug`.
export const serviceDetails: Record<string, ServiceDetail> = {
  networking: {
    problem:
      "Unreliable connections, untraceable cables and no records make every change slow, risky and expensive.",
    supply: [
      "Copper (Cat6 and Cat6A) and fibre-optic cabling",
      "Racks, cabinets and patch panels",
      "Cable containment: trunking, trays and conduits",
      "Outlets, faceplates and patch leads",
      "Labelling of every port, cable and panel",
    ],
    process: [
      "Survey the site and agree requirements",
      "Design outlet positions, cable routes and rack layouts",
      "Supply materials to the agreed specification",
      "Install neatly, with containment and labelling",
      "Test every link before handover",
      "Hand over with records and a walkthrough",
    ],
    testing:
      "Every copper and fibre link is tested before handover, and the results are recorded in your handover pack.",
    receive: [
      "Test results for every link",
      "Labelling scheme",
      "As-built drawings",
      "Walkthrough and sign-off",
    ],
    faqs: [
      {
        q: "Do you install fibre as well as copper?",
        a: "Yes. We install both, and recommend the right mix for distances, speeds and budget.",
      },
      {
        q: "Can you take over an existing, untidy network?",
        a: "Yes. We survey and document what is there, tidy and relabel it, and give you records you can use.",
      },
      {
        q: "Can you work while our offices are open?",
        a: "Usually, yes. We plan disruptive work around your hours where possible and agree this before we start.",
      },
    ],
  },
  infrastructure: {
    problem:
      "Slow, patchy Wi-Fi and poorly set-up switching and servers interrupt daily work and are hard to fix without records.",
    supply: [
      "Network switches and routers",
      "Enterprise Wi-Fi access points and controllers",
      "Server and storage set-up",
      "Power protection for network equipment (UPS)",
      "Configuration records and network diagrams",
    ],
    process: [
      "Survey coverage, users and existing equipment",
      "Design the network and Wi-Fi layout",
      "Supply recommended equipment, or install hardware you already have",
      "Install and configure",
      "Test connectivity and coverage",
      "Hand over with configuration records",
    ],
    testing:
      "We check connectivity and Wi-Fi coverage across the agreed areas before handover and record the results.",
    receive: [
      "Network diagram",
      "Configuration and access records",
      "Coverage and connectivity check results",
      "Walkthrough and sign-off",
    ],
    faqs: [
      {
        q: "Do you supply equipment, or only install it?",
        a: "Both. We can recommend and supply equipment, or install and configure hardware you have bought.",
      },
      {
        q: "Are you tied to one brand?",
        a: "No. We recommend equipment to suit your needs and budget.",
      },
      {
        q: "Can you fix Wi-Fi that already exists?",
        a: "Yes. We assess the current set-up, find the weak spots and recommend changes.",
      },
    ],
  },
  "iptv-av": {
    problem:
      "Screens that will not connect, poor sound in meeting rooms and channel distribution that keeps failing waste time and frustrate guests and staff.",
    supply: [
      "IPTV and TV distribution systems",
      "Displays, video walls and digital signage",
      "Meeting and training room audio and video",
      "Cabling, mounting and control for AV equipment",
    ],
    process: [
      "Survey rooms, screens and existing signals",
      "Design the system and agree equipment",
      "Supply to the agreed specification",
      "Install, mount and connect",
      "Test every screen, source and room",
      "Hand over with user guides and a walkthrough",
    ],
    testing: "Every screen, channel and room system is tested with your staff before handover.",
    receive: [
      "System layout and equipment list",
      "Simple user guides for staff",
      "Test checklist for every room and screen",
      "Walkthrough and sign-off",
    ],
    faqs: [
      {
        q: "Which buildings is IPTV suited to?",
        a: "Hotels, hospitals, campuses, offices and any building that distributes TV or information to many screens.",
      },
      {
        q: "Which brands do you use?",
        a: "We are not tied to one brand. We recommend equipment to suit the room, the use and the budget.",
      },
      {
        q: "Will our staff be shown how to use it?",
        a: "Yes. Handover includes a walkthrough and simple user guides.",
      },
    ],
  },
  maintenance: {
    problem:
      "Systems that are installed and then forgotten fail at the worst time, and faults take longer to fix without records.",
    supply: [
      "Preventive maintenance visits",
      "Fault diagnosis and repair",
      "Support for systems we installed and for existing installations",
      "Updates to labelling and records as systems change",
    ],
    process: [
      "Survey and document the current systems",
      "Agree a maintenance schedule and response times",
      "Carry out planned visits",
      "Respond to faults as agreed",
      "Report what was found and fixed",
    ],
    testing: "Each visit includes checks on the agreed systems, with findings reported to you.",
    receive: [
      "A written maintenance agreement",
      "Visit and fault reports",
      "Updated records and labelling",
    ],
    faqs: [
      {
        q: "How quickly do you respond to faults?",
        a: "Response times are agreed with each client and written into the maintenance agreement.",
      },
      {
        q: "Do you support systems installed by someone else?",
        a: "Yes. We start with a survey so we understand and document the existing set-up.",
      },
      {
        q: "How often are visits?",
        a: "Visit frequency is agreed with each client to suit the systems and how critical they are.",
      },
    ],
  },
};

// Site-wide FAQ at /faq.
export const faqs = [
  {
    q: "How do I request a quote?",
    a: "Use the quote form, call or WhatsApp us. Tell us about the site and what you need, and we reply within one business day.",
  },
  {
    q: "Are site surveys free?",
    a: "Yes. Requesting a survey or a quote does not commit you to anything.",
  },
  { q: "Where do you work?", a: serviceArea },
  { q: "What size of project do you take on?", a: projectScope },
  {
    q: "What documentation do we get at the end?",
    a: "Every handover includes test results, a labelling scheme, as-built drawings, a walkthrough and a documented sign-off.",
  },
  {
    q: "Can you provide company documents for a tender?",
    a: "Yes. Our registration and compliance documents are available on request from the Compliance page.",
  },
  { q: "Do you offer maintenance agreements?", a: maintenanceTerms },
  {
    q: "Do you work with other contractors?",
    a: "Yes. We work alongside main contractors, technology vendors and integrators. Use the partners form to get in touch.",
  },
];
