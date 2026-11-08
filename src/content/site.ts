// Central content for the whole site. Update details here only.
// Anything with `confirmed: false` is a placeholder and is shown as such.
import { photo, type Photo as PhotoData } from "@/lib/photos";

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
  { label: "Guides", to: "/guides" as const },
  { label: "About", to: "/about" as const },
  { label: "Contact", to: "/contact" as const },
];

// Pages outside the main navigation, linked from the footer and listed in the sitemap.
export const secondaryPages = [
  { label: "Support request", to: "/support" as const, group: "company" },
  { label: "Maintenance plans", to: "/maintenance-plans" as const, group: "company" },
  { label: "How we price", to: "/how-we-price" as const, group: "company" },
  { label: "FAQ", to: "/faq" as const, group: "company" },
  { label: "Partners", to: "/partners" as const, group: "company" },
  { label: "Handover pack", to: "/handover" as const, group: "tenders" },
  { label: "Compliance & documents", to: "/compliance" as const, group: "tenders" },
  { label: "Capability statement", to: "/capability-statement" as const, group: "tenders" },
  { label: "Privacy Policy", to: "/privacy" as const, group: "legal" },
  { label: "Terms", to: "/terms" as const, group: "legal" },
] as const;

export const pagesInGroup = (group: (typeof secondaryPages)[number]["group"]) =>
  secondaryPages.filter((p) => p.group === group);

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

export const partnersWeWorkWith = [
  "Main contractors",
  "Technology vendors and distributors",
  "Specialist subcontractors",
  "Consultants and system integrators",
];

// Files in public/downloads. Samples use made-up data and are marked SAMPLE.
export const downloads = {
  capabilityStatement: "/downloads/apexon-capability-statement.pdf",
  samples: [
    {
      title: "Cable test report",
      file: "/downloads/sample-cable-test-report.pdf",
      body: "Results for every link, with pass or fail, length and the date tested.",
    },
    {
      title: "Labelling scheme",
      file: "/downloads/sample-labelling-scheme.pdf",
      body: "How every rack, panel, port and outlet is named, so anyone can trace a cable.",
    },
    {
      title: "As-built drawing",
      file: "/downloads/sample-as-built-drawing.pdf",
      body: "A floor plan showing outlet positions, cable routes and the rack location as installed.",
    },
    {
      title: "Handover checklist",
      file: "/downloads/sample-handover-checklist.pdf",
      body: "The items we check and sign off with you before the job is closed.",
    },
  ],
};

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

// ---------------------------------------------------------------------------
// Phase 4: guides, diagrams, maintenance plans and pricing guidance.
// General technical advice is written as general practice, not as Apexon results.
// ---------------------------------------------------------------------------

export type DiagramId = "rack-to-desk" | "iptv-flow";

export type DiagramPart = {
  id: string;
  label: string;
  what: string;
  problems: string[];
  check: string;
};

export const diagrams: Record<DiagramId, { title: string; intro: string; parts: DiagramPart[] }> = {
  "rack-to-desk": {
    title: "From rack to desk",
    intro:
      "Every wired connection in an office follows the same path. Choose a part to see what it does and what usually goes wrong.",
    parts: [
      {
        id: "switch",
        label: "Rack and switch",
        what: "The network switch sits in a cabinet (the rack) and connects every outlet in the building to the internet line, the servers and each other.",
        problems: [
          "Overheating in a closed cupboard with no ventilation",
          "No surge protection or backup power",
          "Unlabelled ports, so nobody knows what is connected where",
        ],
        check: "Ventilation, a UPS, and a port map that matches the labels.",
      },
      {
        id: "patch-panel",
        label: "Patch panel",
        what: "Cables from the offices end on a patch panel. Short patch leads join each panel port to a switch port, so changes are made in the rack, not in the walls.",
        problems: [
          "A tangle of leads that makes every change slow and risky",
          "Leads of mixed quality or the wrong category",
          "Panel numbers that do not match the outlets",
        ],
        check:
          "Tidy, labelled leads of the right length and a panel numbering scheme that matches each outlet.",
      },
      {
        id: "cable-run",
        label: "Cable run",
        what: "The permanent cable from the patch panel to the outlet, run through trays, trunking or ceilings. It is the hardest part to replace later.",
        problems: [
          "Copper-clad aluminium cable sold as copper",
          "Cable run beside power lines, picking up interference",
          "Runs longer than the 90 metres the cabling standards allow",
        ],
        check:
          "Genuine solid-copper cable, separation from power cables, and test results for every run.",
      },
      {
        id: "outlet",
        label: "Wall outlet",
        what: "The socket on the wall or floor box where a user plugs in. Each one should carry a label that matches the patch panel.",
        problems: [
          "Outlets placed where furniture later blocks them",
          "Poorly terminated sockets that fail now and then",
          "No label, so faults take longer to trace",
        ],
        check: "Outlets planned around the furniture layout, with a clear label on each.",
      },
      {
        id: "device",
        label: "Desk device",
        what: "The computer, phone, printer or Wi-Fi access point that uses the connection.",
        problems: [
          "Worn or damaged desk leads blamed on the network",
          "Devices connected to the wrong part of the network",
        ],
        check: "Good desk leads and devices connected to the correct, documented network.",
      },
    ],
  },
  "iptv-flow": {
    title: "How IPTV reaches the screen",
    intro:
      "IPTV sends television over a building's data network instead of coaxial cable. Choose a stage to see what happens there.",
    parts: [
      {
        id: "sources",
        label: "Sources",
        what: "Where the content comes from: satellite or terrestrial TV, streaming services, cameras, or your own videos and notices.",
        problems: [
          "Content that is not licensed for the way it is being shown",
          "Weak satellite or aerial signal at the start of the chain",
        ],
        check: "Correct licensing and a strong, stable signal from each source.",
      },
      {
        id: "headend",
        label: "Headend",
        what: "Equipment that receives each source and turns it into IP video streams, often with a channel list and a welcome screen.",
        problems: [
          "Headend equipment without backup power",
          "Too few channels planned for future needs",
        ],
        check:
          "Capacity for the channels you need now and later, and protection from power problems.",
      },
      {
        id: "network",
        label: "Network",
        what: "Switches and cabling carry the streams through the building. Good designs send each channel only to the screens that ask for it (multicast).",
        problems: [
          "IPTV traffic slowing down the office network",
          "Switches that are not set up for multicast video",
        ],
        check: "IPTV kept on its own part of the network, on switches set up for multicast.",
      },
      {
        id: "screens",
        label: "Screens",
        what: "Smart TVs, set-top boxes or computers that show the channels. Screens can be grouped, for example by floor or room type.",
        problems: [
          "Screens that need someone to switch them on and change channels by hand",
          "Displays that are not made to run all day",
        ],
        check: "Displays suited to the hours they run, and central control where it helps.",
      },
    ],
  },
};

export type GuideSection = {
  heading: string;
  body?: string[];
  list?: string[];
  checklist?: string[];
};

export type Guide = {
  slug: string;
  title: string;
  summary: string;
  reviewed: string;
  service: string;
  image: PhotoData;
  imageAlt: string;
  diagram?: DiagramId;
  sections: GuideSection[];
};

export const guidesIntro =
  "Plain-English guides for the people who plan, buy and look after office technology. General advice, free to use.";

export const guides: Guide[] = [
  {
    slug: "why-structured-cabling-matters",
    title: "Why structured cabling matters",
    summary:
      "The cabling behind the walls outlasts every device plugged into it. What good cabling looks like, and why it saves money later.",
    reviewed: "8 November 2026",
    service: "networking",
    image: images.fibrePanel,
    imageAlt: "Fibre patch leads in a rack-mounted patch panel (illustrative image)",
    diagram: "rack-to-desk",
    sections: [
      {
        heading: "What structured cabling is",
        body: [
          "Structured cabling is a planned system of cables, panels and outlets that carries data, phones, Wi-Fi and often cameras and IPTV around a building. Instead of running a new cable each time someone needs one, every outlet is wired back to a central rack in an organised, labelled way.",
          "It is usually the longest-lasting part of a network. Computers and switches are replaced every few years; good cabling can serve through several of those upgrades.",
        ],
      },
      {
        heading: "Why it is worth doing properly",
        list: [
          "Faults are found quickly, because every outlet is labelled and recorded.",
          "Moves and changes happen in the rack, not by pulling new cables through ceilings.",
          "The network performs as it should, because the cable and its installation suit the speeds you need.",
          "It looks professional, which matters to visitors, auditors and whoever works on it next.",
        ],
      },
      {
        heading: "Signs your cabling needs attention",
        checklist: [
          "Nobody can say which outlet connects to which switch port",
          "Cables hang loose in ceilings or run across floors",
          "Connections drop when someone moves a chair or a desk",
          "The rack is a tangle of leads of different colours and lengths",
          "There are no records or drawings of the network",
        ],
      },
      {
        heading: "What to ask for when you buy",
        list: [
          "Genuine solid-copper cable of the right category, or fibre where distances need it",
          "A labelling scheme that matches the patch panel to every outlet",
          "Test results for every cable run",
          "As-built drawings showing where the cables go",
          "A walkthrough at handover",
        ],
      },
    ],
  },
  {
    slug: "common-office-wifi-mistakes",
    title: "Common office Wi-Fi mistakes",
    summary:
      "Most Wi-Fi complaints come from a handful of planning mistakes. How to spot them and what to do instead.",
    reviewed: "8 November 2026",
    service: "infrastructure",
    image: images.wifi,
    imageAlt: "Ceiling-mounted Wi-Fi access point in an office (illustrative image)",
    sections: [
      {
        heading: "1. One powerful router for the whole building",
        body: [
          "Walls, floors and glass weaken Wi-Fi. One strong router in a corner office rarely covers a whole floor well. Several access points, placed where people work and wired back to the network, give more even coverage.",
        ],
      },
      {
        heading: "2. Planning for coverage, not for people",
        body: [
          "A signal that reaches the boardroom is not the same as a signal that serves forty people in a meeting at once. Plan around how many devices will connect in each area, not only the floor area.",
        ],
      },
      {
        heading: "3. Repeaters instead of cables",
        body: [
          "Wireless repeaters are easy to add, but they share their capacity with the connection they repeat, so speeds drop. Where possible, run a cable to each access point.",
        ],
      },
      {
        heading: "4. One network for everyone",
        body: [
          "Staff, guests, printers and cameras on the same network is a security and performance risk. Separate them, and give guests internet access only.",
        ],
      },
      {
        heading: "5. Forgetting power",
        body: [
          "If the access points and switch go down with every power cut, so does the Wi-Fi. Switches that power the access points through the network cable (PoE), backed by a UPS, keep coverage up through short outages.",
        ],
      },
      {
        heading: "Quick checklist",
        checklist: [
          "Access points are wired back to the network, not repeated",
          "Busy rooms have enough capacity for the people who use them",
          "Guests are on their own network",
          "Equipment is labelled and its settings are recorded",
          "The Wi-Fi equipment is on backup power",
        ],
      },
    ],
  },
  {
    slug: "iptv-explained",
    title: "IPTV explained",
    summary:
      "How television over your data network works, where it fits, and what to plan before you install it.",
    reviewed: "8 November 2026",
    service: "iptv-av",
    image: images.trainingRoom,
    imageAlt: "Training room with a large wall display and rows of desks (illustrative image)",
    diagram: "iptv-flow",
    sections: [
      {
        heading: "What IPTV is",
        body: [
          "IPTV (Internet Protocol Television) delivers TV channels and video over a building's data network instead of separate coaxial cable. The same cabling that serves computers can carry channels to screens in rooms, lobbies, wards or training rooms.",
        ],
      },
      {
        heading: "Where it is useful",
        list: [
          "Hotels and guest houses with screens in every room",
          "Hospitals, for wards and waiting areas",
          "Offices and institutions, for lobby screens, notices and live events",
          "Schools and training centres, for teaching content",
        ],
      },
      {
        heading: "What to plan first",
        checklist: [
          "Which channels and content you need, and that you are licensed to show them",
          "How many screens, and where",
          "Whether your network can carry video without slowing everything else down",
          "Whether screens need central control, such as turning on at set times",
          "Who will look after the system once it is running",
        ],
      },
      {
        heading: "IPTV and your network",
        body: [
          "Video uses a lot of network capacity. A well-designed system keeps IPTV on its own part of the network and uses switches set up to send each channel only where it is being watched. Getting this right at the start avoids slow internet for staff later.",
        ],
      },
    ],
  },
  {
    slug: "preventive-maintenance-checklist",
    title: "Preventive maintenance checklist",
    summary:
      "A simple list of checks that keeps networks, Wi-Fi and AV systems running, and catches problems before they become outages.",
    reviewed: "8 November 2026",
    service: "maintenance",
    image: images.testing,
    imageAlt: "Technician testing a network cable with a handheld tester (illustrative image)",
    sections: [
      {
        heading: "Why preventive maintenance pays",
        body: [
          "Many network failures give warning signs first: a hot cabinet, a weak UPS battery, errors creeping up on a switch port. Regular checks catch these while they are cheap to fix and before they stop work.",
        ],
      },
      {
        heading: "Racks and power",
        checklist: [
          "Cabinets are clean, ventilated and not overheating",
          "UPS batteries pass a test and the UPS alarms work",
          "Surge protection is in place and working",
          "Nothing unexpected has been plugged in or removed",
        ],
      },
      {
        heading: "Network",
        checklist: [
          "Switch and router software is supported and up to date",
          "Ports showing errors are investigated",
          "Labels and records still match what is connected",
          "Backups of device settings are current",
        ],
      },
      {
        heading: "Wi-Fi",
        checklist: [
          "All access points are online",
          "Coverage is still good where people now work",
          "Guest and staff networks are still separate",
          "Wi-Fi passwords are changed when staff leave",
        ],
      },
      {
        heading: "AV and IPTV",
        checklist: [
          "Displays, projectors and channels all work",
          "Meeting-room systems connect first time",
          "Remote controls, cables and adapters are present",
        ],
      },
      {
        heading: "After each visit",
        list: [
          "Write down what was checked, found and fixed",
          "Update labels and drawings if anything changed",
          "Plan replacements for equipment nearing the end of its life",
        ],
      },
    ],
  },
  {
    slug: "building-networks-for-kenyan-conditions",
    title: "Building networks for Kenyan conditions",
    summary:
      "Power surges, counterfeit cable, dust and humidity: a practical checklist for networks that keep working in local conditions.",
    reviewed: "8 November 2026",
    service: "networking",
    image: images.cabletray,
    imageAlt: "Cable tray along a corridor ceiling (illustrative image)",
    sections: [
      {
        heading: "Power: surges, dips and outages",
        body: [
          "Power cuts, voltage dips and the surge when power returns are common causes of damaged network equipment. Protecting the core of the network usually costs far less than replacing it.",
        ],
        checklist: [
          "A UPS for the main switch, router and any servers",
          "Surge protection on the power feeding network equipment",
          "UPS batteries tested and replaced on a schedule",
          "Proper earthing for racks and equipment",
          "Switches that power Wi-Fi and phones through the cable (PoE), so one UPS protects them all",
        ],
      },
      {
        heading: "Counterfeit and copper-clad aluminium cable",
        body: [
          "Copper-clad aluminium (CCA) cable looks like copper but has an aluminium core. It is cheaper, but it carries signals and power less well, breaks more easily and does not meet structured cabling standards. Cable sold as copper sometimes turns out to be CCA.",
        ],
        checklist: [
          "Scratch a cut end of the conductor: aluminium shows silver under the copper colour",
          "Compare the weight: a box of CCA is noticeably lighter than copper",
          "Read the jacket print for “CCA”, or a missing category marking",
          "Be wary of prices far below other suppliers",
          "Buy from established suppliers and ask for the product datasheet",
        ],
      },
      {
        heading: "Dust",
        body: [
          "Dust blocks equipment fans and builds up heat. It is worse near construction, unpaved roads and windows that stay open.",
        ],
        checklist: [
          "Closed cabinets with filtered ventilation where dust is heavy",
          "Racks away from doors and windows that are often open",
          "Fans and filters cleaned during maintenance visits",
        ],
      },
      {
        heading: "Heat and humidity",
        body: [
          "Humid coastal and lakeside air corrodes connectors, and hot rooms shorten equipment life everywhere.",
        ],
        checklist: [
          "Network equipment in a cool, ventilated room, not a store cupboard",
          "Outdoor cable and connectors rated for outdoor use",
          "Outdoor joints sealed against moisture",
          "Corroded connectors replaced during maintenance",
        ],
      },
      {
        heading: "Security and access",
        checklist: [
          "Racks locked, with keys held by named people",
          "Cable routes protected from accidental damage and theft",
          "Records kept so a new technician can understand the system quickly",
        ],
      },
    ],
  },
];

// Short version for the guides index; the full checklist is in the article above.
export const kenyanConditions = {
  title: "Kenyan conditions checklist",
  guide: "building-networks-for-kenyan-conditions",
  items: [
    { title: "Power", body: "A UPS and surge protection for the core of the network." },
    { title: "Cable", body: "Genuine solid copper, not copper-clad aluminium." },
    { title: "Dust", body: "Closed, filtered cabinets and regular cleaning." },
    { title: "Humidity", body: "Outdoor-rated cable and sealed outdoor joints." },
  ],
};

export const maintenancePlans = {
  intro:
    "Every site is different, so we do not sell fixed packages. We build each plan with you and write the agreed terms into the maintenance agreement.",
  visitCovers: [
    "Checks on racks, power, UPS and surge protection",
    "Network health: switches, routers, ports and settings backups",
    "Wi-Fi coverage and access points",
    "AV and IPTV equipment, where included",
    "Labelling and records kept up to date",
    "A written report of what was found and fixed",
  ],
  choices: [
    {
      title: "Visit frequency",
      body: "How often we visit for planned checks, set by how critical the systems are.",
    },
    {
      title: "Fault response time",
      body: "How quickly we respond when something fails, agreed for each level of urgency.",
    },
    {
      title: "Hours covered",
      body: "Working hours only, or after-hours cover for systems that cannot wait.",
    },
    {
      title: "Systems covered",
      body: "Networking, Wi-Fi, servers, IPTV and AV: include only what you need.",
    },
  ],
  steps: [
    "We survey and document your current systems",
    "We propose a schedule and response times to suit them",
    "You review, and we write the agreed terms into the agreement",
    "Planned visits begin, each with a written report",
  ],
};

export const pricing = {
  intro:
    "We do not publish fixed prices, because every building and brief is different. This page explains what drives the cost, so the quote you receive makes sense.",
  factors: [
    {
      title: "Number of points",
      body: "How many network outlets, access points, screens or devices the project needs.",
    },
    {
      title: "Building and routes",
      body: "Ceiling and wall types, distances, floors, and whether trunking or trays are needed.",
    },
    {
      title: "Equipment choices",
      body: "Cable category or fibre, and the make and specification of switches, Wi-Fi and displays.",
    },
    {
      title: "Working hours and access",
      body: "Whether work must happen after hours or at weekends, and how easy the site is to reach.",
    },
    {
      title: "Existing systems",
      body: "Whether we start fresh or work around, document or replace what is already there.",
    },
    {
      title: "Location",
      body: "Travel and accommodation for work outside Nairobi.",
    },
  ],
  quoteIncludes: [
    "The scope of work",
    "Equipment and materials",
    "Labour and installation",
    "Testing and handover documentation",
  ],
  saveMoney: [
    "Plan cabling before ceilings and partitions are finished",
    "Tell us about future growth, so it is sized once",
    "Share floor plans and furniture layouts early",
    "Group work into one visit where possible",
  ],
};
