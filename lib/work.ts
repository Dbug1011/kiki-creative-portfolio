// Every project page follows the same structure:
//   Video → Client brief (challenge, approach, deliverables) → Breakdown
//   frames → Credits (role + tools)
//
// Briefs describe what's on screen. Anything only you know (the exact ask,
// turnaround, results like views or conversion) belongs in `brief` or
// `outcome`; leave `outcome` out rather than guessing. `tools` is optional
// for the same reason: only list what you actually used.

export type Discipline = "explainer" | "kinetic" | "reel";

export const disciplines: { key: Discipline | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "explainer", label: "SaaS explainers" },
  { key: "kinetic", label: "Kinetic type" },
  { key: "reel", label: "Reels & personal" },
];

export type WorkItem = {
  slug: string;
  title: string;
  client: string;
  year: string;
  discipline: Discipline;
  /** e.g. "0:24". Omit when unknown. */
  duration?: string;
  format: string;
  video: string;
  poster: string;
  /** Breakdown / style frames, shown in order under the video. */
  frames: { src: string; caption: string }[];
  summary: string;
  brief: {
    challenge: string;
    approach: string[];
    deliverables: string[];
  };
  role: string[];
  tools?: string[];
  outcome?: string;
  featured?: boolean;
};

const frames = (slug: string, captions: string[]) =>
  captions.map((caption, i) => ({ src: `/work/${slug}-${i}.jpg`, caption }));

export const work: WorkItem[] = [
  {
    slug: "trust-earned",
    title: "Trust, Earned",
    client: "Alphaus · Ripple",
    year: "2026",
    discipline: "kinetic",
    duration: "0:24",
    format: "1920×1080 · 16:9",
    video: "/video/work/trust-earned.mp4",
    poster: "/work/trust-earned-0.jpg",
    featured: true,
    summary:
      "A kinetic-typography brand piece: two words carry the message, then a timeline of product cards shows the trust being built month by month.",
    brief: {
      challenge:
        "Say something abstract (that trust with a provider is earned over time) in under half a minute, without a voiceover to lean on.",
      approach: [
        "Open on oversized type. \"TRUST\" fills the frame edge to edge, then gives way to \"EARNED\" on a quiet, blurred field.",
        "A single blue dot acts as the through-line: it anchors the type, then becomes the playhead on a month-by-month timeline.",
        "UI cards stack along the timeline as it advances, so the idea of accumulated trust is shown rather than told.",
      ],
      deliverables: ["24s master, 1080p", "Kinetic type sequence", "Timeline animation"],
    },
    role: ["Motion design", "Typography", "Edit"],
    frames: frames("trust-earned", [
      "Opening type: TRUST",
      "Resolve: EARNED",
      "Timeline begins",
      "Timeline complete",
    ]),
  },
  {
    slug: "guaranteed-commitments",
    title: "Guaranteed Commitments",
    client: "Alphaus · Ripple",
    year: "2026",
    discipline: "explainer",
    duration: "0:16",
    format: "1920×1080 · 16:9",
    video: "/video/work/guaranteed-commitments.mp4",
    poster: "/work/guaranteed-commitments-0.jpg",
    featured: true,
    summary:
      "A short SaaS explainer for a cloud-commitment product: who carries the risk, who benefits, and what happens when usage drops.",
    brief: {
      challenge:
        "Explain a financial product with three parties (partner, platform, client) and a time dimension, fast enough to work as a social cut.",
      approach: [
        "Start with a three-node diagram, partner, Ripple, client, so the relationship is clear before any detail appears.",
        "Split into side-by-side benefit cards for each party, joined by a shared-value badge.",
        "Show the 'what if' with a usage chart: the project scales down, and the unused commitment is highlighted instead of hidden.",
        "Close on a 1-year / 3-year term slider to land the commitment length.",
      ],
      deliverables: ["16s master, 1080p", "Diagram + chart animation", "UI card system"],
    },
    role: ["Motion design", "Information design", "Edit"],
    frames: frames("guaranteed-commitments", [
      "Three-party relationship",
      "Benefits by party",
      "Usage scales down: unused commitment",
      "Commitment term",
    ]),
  },
  {
    slug: "enable-wavepro",
    title: "Enable WavePro",
    client: "Alphaus · Wave",
    year: "2026",
    discipline: "explainer",
    duration: "0:54",
    format: "1920×1080 · 16:9",
    video: "/video/work/enable-wavepro.mp4",
    poster: "/work/enable-wavepro-0.jpg",
    featured: true,
    summary:
      "A product walkthrough that pairs a real UI flow (switching accounts on) with an animated explanation of what that unlocks: shared spend data between provider and client.",
    brief: {
      challenge:
        "A settings screen full of toggles isn't self-explanatory. The video has to show the exact clicks and also why they matter.",
      approach: [
        "Open on the actual table of accounts and tags so viewers recognise the screen they'll use.",
        "Cut from the UI to an abstract provider ↔ client diagram that builds up node by node.",
        "Resolve on a 'shared spend data' card with a live total and bar chart, the payoff of flipping the switch.",
      ],
      deliverables: ["54s master, 1080p", "UI walkthrough", "Concept animation"],
    },
    role: ["Motion design", "UI animation", "Edit"],
    frames: frames("enable-wavepro", [
      "UI: enabling accounts",
      "Provider ↔ client connection",
      "Shared spend data appears",
      "Resolved diagram",
    ]),
  },
  {
    slug: "ripple-billing",
    title: "Ripple Billing",
    client: "Alphaus · Ripple",
    year: "2026",
    discipline: "explainer",
    duration: "0:05",
    format: "1920×1080 · 16:9",
    video: "/video/work/ripple-billing.mp4",
    poster: "/work/ripple-billing-0.jpg",
    summary:
      "A five-second bumper: monthly billing cards rise along a trend line, then collapse into a provider → insights → client stack.",
    brief: {
      challenge:
        "Five seconds is enough for one idea. The idea here: many monthly bills become one strategic view.",
      approach: [
        "A dense spread of month-labelled cards on a rising trend line establishes volume.",
        "Everything compresses into a single vertical stack: provider, strategic insights, client.",
      ],
      deliverables: ["5s bumper, 1080p", "Loop-friendly ending"],
    },
    role: ["Motion design"],
    frames: frames("ripple-billing", [
      "Monthly cards on the trend",
      "Collapse begins",
      "Stack forms",
      "Strategic insights",
    ]),
  },
  {
    slug: "videography-reel",
    title: "Videography Reel",
    client: "Personal",
    year: "2024",
    discipline: "reel",
    duration: "1:19",
    format: "1920×1080 · 16:9",
    video: "/video/Kiki_Videography.mp4",
    poster: "/work/videography-reel-0.jpg",
    featured: true,
    summary:
      "A scrapbook-style reel: torn-paper frames, handwritten type, and footage from shoots, travel, and content work.",
    brief: {
      challenge:
        "Put years of personal shooting and editing into one piece that still feels like a single story.",
      approach: [
        "A tactile paper-collage look ties very different footage together.",
        "Typewriter captions answer one question, why I record, and structure the reel into chapters.",
        "Short-form content work (phone screens, social posts) sits alongside the cinematic footage.",
      ],
      deliverables: ["Showreel master, 1080p"],
    },
    role: ["Direction", "Shooting", "Edit", "Motion graphics"],
    tools: ["Premiere Pro", "Photoshop"],
    frames: frames("videography-reel", [
      "Opening: why I record",
      "Experiences",
      "Experiences, night footage",
      "Content work",
    ]),
  },
  {
    slug: "vidfolio",
    title: "Vidfolio Intro",
    client: "Personal",
    year: "2024",
    discipline: "reel",
    format: "1920×1080 · 16:9",
    video: "/video/Kiki_Vidfolio.mp4",
    poster: "/work/vidfolio-0.jpg",
    summary:
      "An intro sequence for my video portfolio: a cut-out title card, heritage footage framed in arches, and a closing type lockup.",
    brief: {
      challenge: "Introduce who I am and what I shoot before the reel starts.",
      approach: [
        "Cut-out portrait and bold name lockup over a coastal plate.",
        "Heritage-site footage framed in church arches for a sense of place.",
        "Closes on a collage type lockup: make your life like a movie.",
      ],
      deliverables: ["Intro sequence, 1080p"],
    },
    role: ["Design", "Edit", "Motion graphics"],
    tools: ["Premiere Pro", "Photoshop"],
    frames: frames("vidfolio", ["Title card", "Heritage", "Experiences", "Closing type"]),
  },
];

export const getWork = (slug: string) => work.find((w) => w.slug === slug);
