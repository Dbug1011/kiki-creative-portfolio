import Image from "next/image";
import Link from "next/link";
import {
  PiArrowRightLight,
  PiArrowUpRightBold,
  PiEnvelopeSimpleDuotone,
  PiHeartFill,
  PiPlusBold,
  PiSealCheckFill,
} from "react-icons/pi";
import { SiFacebook, SiInstagram, SiLinkedin, SiTiktok } from "react-icons/si";
import CountUp from "@/components/site/count-up";
import HeroPortrait from "@/components/site/hero-portrait";
import OpenInViewer from "@/components/site/play-button";
import ReelGrid from "@/components/site/reel-grid";
import ResumeButton from "@/components/site/resume-button";
import Reveal from "@/components/site/reveal";
import ToolLogos from "@/components/site/tool-logos";
import WorkGrid from "@/components/site/work-grid";
import { site } from "@/lib/site";
import {
  comments,
  compact,
  engagementRate,
  fetchCover,
  postUrl,
  reels,
  tiktok,
  topPosts,
  totalTopViews,
} from "@/lib/social";

// TikTok cover URLs expire, so the page refreshes them twice a day.
export const revalidate = 43_200;

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

const heroServices = ["Social media management", "SaaS explainer videos", "Reels & video editing", "Digital content"];

const services = [
  {
    title: "Social media management",
    body: "Your accounts, run end to end: a content calendar, platform-native posts, replies to your community, and a monthly look at what worked.",
    deliverables: ["Content calendar", "Posting & scheduling", "Community replies", "Monthly analytics"],
  },
  {
    title: "SaaS explainer videos",
    body: "Your product, pricing model, or workflow in 15–60 seconds a buyer actually gets. I learn the product before I write a word.",
    deliverables: ["Script & storyboard", "UI & diagram animation", "Launch & social cuts"],
  },
  {
    title: "Reels & short-form editing",
    body: "Vertical edits built for the first two seconds: hooks, captions, pacing, and sound, for TikTok, Reels, and Shorts.",
    deliverables: ["Hooks & captions", "Talking-head edits", "Trend formats"],
  },
  {
    title: "Kinetic type & motion",
    body: "Type and UI that move with intent: brand statements, title sequences, bumpers, and the motion details around them.",
    deliverables: ["Kinetic typography", "Bumpers & stingers", "Style frames"],
  },
];

const roles = ["Social Media Manager", "Video Editor", "Digital Creator"];

type Job = { title: string; org: string; period?: string; place?: string; points?: string[] };

// Only what's confirmed (résumé, LinkedIn/Facebook work history, TikTok).
// Add titles, dates and duties for Caliber Business and Startup Weekend for
// Women here once confirmed.
const experience: Job[] = [
  {
    title: "Digital Creator",
    org: `TikTok · @${tiktok.handle}`,
    period: "2024 – Present",
    points: [
      `${compact(tiktok.likes)} likes across my videos, all organic.`,
      `${topPosts.length} posts over 100K views; the top video passed ${compact(topPosts[0].views)}.`,
      "Plans, shoots, edits, and posts every video myself.",
    ],
  },
  {
    title: "Video Editor",
    org: "The Senior Craftsmen's Voice (SCV)",
    period: "Jan 2024 – Present",
    place: "Tagbilaran, Bohol",
    points: [
      "Edits video to length and format; adds graphics, titles, sound and visual effects; enhances audio to serve the storyline.",
    ],
  },
  { title: "Part-time", org: "Caliber Business" },
  { title: "Startup Weekend for Women", org: "Startup Weekend" },
];

const faqs = [
  {
    q: "What do you offer?",
    a: "Social media management, SaaS explainer videos, and short-form reels and editing. You can book one piece or a monthly retainer that covers planning, editing, and posting.",
  },
  {
    q: "Which platforms do you work with?",
    a: "Short-form vertical video first: TikTok, Instagram Reels, Facebook Reels, and YouTube Shorts, plus LinkedIn for B2B and SaaS brands.",
  },
  {
    q: "Can you explain a technical product?",
    a: "Yes. That's the point. I'm a Computer Engineering graduate and work as a GTM Customer Engineer at a cloud SaaS company, so I learn how the product works before I script it.",
  },
  {
    q: "How do pricing and turnaround work?",
    a: "Both depend on scope: length, number of cuts, and whether I'm also running the account. Send a brief, even a rough one, and I'll reply with a quote and a timeline.",
  },
  {
    q: "What tools do you use?",
    a: "Adobe Creative Cloud (Premiere Pro, After Effects, Photoshop, Illustrator, Lightroom, Audition, InDesign), DaVinci Resolve, CapCut, and Canva.",
  },
];

const socials = [
  { href: site.tiktok, label: "TikTok", Icon: SiTiktok },
  { href: site.facebook, label: "Facebook", Icon: SiFacebook },
  { href: site.instagram, label: "Instagram", Icon: SiInstagram },
  { href: site.linkedin, label: "LinkedIn", Icon: SiLinkedin },
];

const titleOf = (id: string) => topPosts.find((p) => p.id === id)?.title ?? "a video";

/** Words that slide up out of a mask, staggered. */
function Rise({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <span className="rise-mask">
      <span className="word-rise inline-block" style={{ animationDelay: `${delay}ms` }}>
        {children}
      </span>
    </span>
  );
}

function SectionTitle({ id, eyebrow, children }: { id: string; eyebrow: string; children: React.ReactNode }) {
  return (
    <Reveal>
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id} className="mt-3 max-w-2xl text-3xl font-semibold leading-[1.15] tracking-[-0.02em] text-white md:text-5xl">
        {children}
      </h2>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */

export default async function Home() {
  const reelsWithCovers = await Promise.all(reels.map(async (r) => ({ ...r, cover: await fetchCover(r.id) })));
  const top = topPosts[0];

  const metrics = [
    { value: tiktok.likes, format: "compact" as const, label: "Total likes" },
    { value: top.views, format: "compact" as const, label: "Views on top video" },
    { value: totalTopViews, format: "compact" as const, label: `Views from ${topPosts.length} posts over 100K` },
  ];

  return (
    <>
      {/* ---------------------------------------------------------- Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-10 h-[620px] w-[620px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.35),rgba(236,72,153,0.12)_45%,transparent_70%)] blur-2xl"
        />
        <div className="relative mx-auto max-w-[1200px] px-5 pb-16 pt-10 sm:px-8 md:pt-14">
          {/*
            Desktop: three columns around the portrait (left: greeting + intro
            + actions, right: name + services). Mobile: one column in reading
            order.
          */}
          <div className="grid items-center gap-y-6 md:grid-cols-[1fr_minmax(0,380px)_1fr] md:grid-rows-[auto_1fr] md:gap-x-6">
            <h1 className="contents">
              <span className="flex flex-col items-center gap-1 md:col-start-1 md:row-start-1 md:items-start md:self-end">
                <span className="font-script text-2xl text-fuchsia-200/90 md:text-3xl">{site.name}</span>
                <span className="text-[3rem] font-bold leading-none tracking-[-0.04em] text-white md:text-7xl lg:text-8xl">
                  <Rise delay={100}>Hello,</Rise>
                </span>
              </span>
              <span className="text-center text-[3rem] font-bold leading-none tracking-[-0.04em] md:col-start-3 md:row-start-1 md:self-end md:text-left md:text-7xl lg:text-8xl">
                <Rise delay={220}>
                  <span className="bg-gradient-to-r from-purple-300 via-pink-300 to-fuchsia-400 bg-clip-text text-transparent">
                    I&apos;m Kiki.
                  </span>
                </Rise>
              </span>
            </h1>

            <HeroPortrait className="mx-auto w-full max-w-[320px] md:col-start-2 md:row-span-2 md:row-start-1 md:max-w-[380px]" />

            {/* Left: intro, actions, contact */}
            <div className="flex flex-col items-center text-center md:col-start-1 md:row-start-2 md:items-start md:self-start md:text-left">
              <p className="word-rise max-w-[26rem] text-base leading-relaxed text-white/75 md:text-[17px]" style={{ animationDelay: "340ms" }}>
                I manage social accounts, make SaaS explainer videos, and edit
                reels, as a computer engineer who understands the product first.
              </p>
              <div className="mt-7 flex flex-wrap items-center justify-center gap-5 md:justify-start">
                <Link
                  href="#contact"
                  className="focus-ring inline-flex min-h-[48px] items-center rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-6 text-[15px] font-semibold text-white shadow-[0_12px_28px_-8px_rgba(236,72,153,0.75)] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_34px_-8px_rgba(236,72,153,0.95)]"
                >
                  Send a brief
                </Link>
                <OpenInViewer
                  src={site.showreel.src}
                  title={site.showreel.title}
                  className="focus-ring group inline-flex min-h-[44px] items-center gap-2 rounded text-[15px] font-semibold text-white"
                >
                  Watch showreel
                  <PiArrowUpRightBold aria-hidden="true" className="text-lg transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </OpenInViewer>
              </div>

              {/* Contact, right in the first screen */}
              <address className="mt-7 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm not-italic text-white/70 md:justify-start">
                <a href={`mailto:${site.email}`} className="focus-ring inline-flex items-center gap-2 rounded hover:text-white">
                  <PiEnvelopeSimpleDuotone aria-hidden="true" className="text-lg text-fuchsia-300" /> {site.email}
                </a>
                <span className="flex items-center gap-1">
                  {socials.map(({ href, label, Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="focus-ring flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-base text-white/75 transition-[color,border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-fuchsia-300/40 hover:text-white"
                    >
                      <Icon aria-hidden="true" />
                    </a>
                  ))}
                </span>
              </address>
            </div>

            {/* Right: what I do */}
            <div className="flex flex-col items-center md:col-start-3 md:row-start-2 md:items-start md:self-start">
              {/* Hand-drawn arrow */}
              <svg aria-hidden="true" viewBox="0 0 120 80" className="my-2 hidden h-16 w-24 text-white/50 md:block">
                <path
                  d="M104 6c-6 18-30 22-36 12-5-9 10-14 12-3 3 16-22 36-58 48"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path d="M30 56l-8 8 11 2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <ul className="mt-4 w-full max-w-[20rem] space-y-3 md:mt-0">
                {heroServices.map((s, i) => (
                  <li
                    key={s}
                    className="word-rise group flex items-center gap-3 text-[17px] text-white/75"
                    style={{ animationDelay: `${640 + i * 80}ms` }}
                  >
                    <PiArrowRightLight
                      aria-hidden="true"
                      className="shrink-0 text-2xl text-white/40 transition-[transform,color] duration-200 group-hover:translate-x-1 group-hover:text-fuchsia-300"
                    />
                    <span className="transition-colors duration-200 group-hover:text-white">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ Evidence */}
      <section aria-labelledby="proof-h" className="relative">
        <div className="mx-auto max-w-[1200px] px-5 pb-24 sm:px-8">
          <Reveal className="mb-5 flex flex-wrap items-center gap-3">
            <h2 id="proof-h" className="text-lg font-semibold text-white">Results on my own TikTok</h2>
            {tiktok.organic && (
              <span className="inline-flex items-center gap-1.5 rounded-md bg-gradient-to-r from-purple-500/25 to-pink-500/25 px-2.5 py-1 text-[13px] font-semibold text-pink-100 ring-1 ring-inset ring-pink-300/30">
                <PiSealCheckFill aria-hidden="true" className="text-base text-pink-300" />
                100% organic reach
              </span>
            )}
          </Reveal>
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {metrics.map((m, i) => (
              <Reveal key={m.label} delay={i * 80}>
                <div className="glass lift rounded-2xl p-6">
                  <dt className="text-sm text-white/65">{m.label}</dt>
                  <dd className="mt-2 text-4xl font-bold tracking-[-0.02em] text-white md:text-5xl">
                    <CountUp value={m.value} format={m.format} />
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>

          <Reveal className="card mt-4 overflow-hidden">
            <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-white/[0.07] px-6 py-4">
              <h3 className="text-[17px] font-semibold text-white">Every post over 100K views</h3>
              <a href={tiktok.url} target="_blank" rel="noopener noreferrer" className="focus-ring inline-flex items-center gap-1.5 rounded text-sm text-fuchsia-300 hover:text-fuchsia-200">
                <SiTiktok aria-hidden="true" /> @{tiktok.handle} <PiArrowUpRightBold aria-hidden="true" />
              </a>
            </div>
            <div className="overflow-x-auto">
              <table className="tabular w-full min-w-[760px] text-left text-sm">
                <thead className="text-white/50">
                  <tr>
                    <th scope="col" className="px-6 py-3 font-medium">Post</th>
                    <th scope="col" className="px-3 py-3 text-right font-medium">Views</th>
                    <th scope="col" className="px-3 py-3 text-right font-medium">Likes</th>
                    <th scope="col" className="px-3 py-3 text-right font-medium">Comments</th>
                    <th scope="col" className="px-3 py-3 text-right font-medium">Shares</th>
                    <th scope="col" className="px-3 py-3 text-right font-medium">Saves</th>
                    <th scope="col" className="px-6 py-3 text-right font-medium">Engagement</th>
                  </tr>
                </thead>
                <tbody>
                  {topPosts.map((p) => (
                    <tr key={p.id} className="border-t border-white/[0.06] transition-colors hover:bg-white/[0.03]">
                      <td className="px-6 py-3.5">
                        <a href={postUrl(p)} target="_blank" rel="noopener noreferrer" className="focus-ring rounded text-white hover:text-fuchsia-200">
                          {p.title}
                        </a>
                        <span className="ml-2 text-xs text-white/45">{p.kind === "photo" ? "Carousel" : "Video"}</span>
                      </td>
                      <td className="px-3 py-3.5 text-right text-white">{compact(p.views)}</td>
                      <td className="px-3 py-3.5 text-right text-white/75">{compact(p.likes)}</td>
                      <td className="px-3 py-3.5 text-right text-white/75">{p.comments.toLocaleString("en")}</td>
                      <td className="px-3 py-3.5 text-right text-white/75">{p.shares.toLocaleString("en")}</td>
                      <td className="px-3 py-3.5 text-right text-white/75">{p.saves ? p.saves.toLocaleString("en") : "–"}</td>
                      <td className="px-6 py-3.5 text-right text-fuchsia-200">{(engagementRate(p) * 100).toFixed(1)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
          <p className="mt-3 text-xs leading-relaxed text-white/50">
            From my own TikTok{tiktok.organic && ", all organic"}. Read from the public profile and post pages on{" "}
            {tiktok.capturedAt}. Engagement = (likes + comments + shares) ÷ views. Saves aren&apos;t shown for photo carousels.
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------ Services */}
      <section aria-labelledby="services-h" id="services" className="scroll-mt-28">
        <div className="mx-auto max-w-[1200px] px-5 py-24 sm:px-8">
          <SectionTitle id="services-h" eyebrow="Services">
            Content that explains,
            <br /> and gets watched
          </SectionTitle>
          <ul className="mt-12 grid gap-6 md:grid-cols-2">
            {services.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 80}>
                <div className="card lift group h-full p-7 md:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-xl font-semibold tracking-[-0.01em] text-white md:text-2xl">{s.title}</h3>
                    <PiArrowUpRightBold aria-hidden="true" className="mt-1 shrink-0 text-xl text-white/40 transition-[color,transform] duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fuchsia-300" />
                  </div>
                  <p className="mt-3 max-w-[34rem] text-base leading-relaxed text-white/65">{s.body}</p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {s.deliverables.map((d) => (
                      <li key={d} className="rounded-full border border-white/10 px-3 py-1 text-[13px] text-white/75">
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </ul>

          <div id="tools" className="mt-20 scroll-mt-28">
            <Reveal>
              <p className="eyebrow">Software & tools</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-[-0.02em] text-white md:text-3xl">What I edit and design in</h3>
            </Reveal>
            <div className="mt-8">
              <ToolLogos />
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- Social */}
      <section aria-labelledby="social-h" id="social" className="scroll-mt-28">
        <div className="mx-auto max-w-[1200px] px-5 py-24 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Reveal>
              <p className="eyebrow">Reels</p>
              <h2 id="social-h" className="mt-3 text-3xl font-semibold leading-[1.15] tracking-[-0.02em] text-white md:text-5xl">
                From my own feed
              </h2>
              <p className="mt-4 max-w-[34rem] text-base leading-relaxed text-white/65">
                Every video of mine that passed 100K views: shot, edited, and
                posted by me, all organic reach. Press play to watch on the
                page; numbers as of {tiktok.capturedAt}.
              </p>
            </Reveal>
            <a href={tiktok.url} target="_blank" rel="noopener noreferrer" className="btn-ghost">
              <SiTiktok aria-hidden="true" /> Follow on TikTok
            </a>
          </div>
          <div className="mt-12">
            <ReelGrid reels={reelsWithCovers} />
          </div>

          {/* Comment snapshots */}
          <div className="mt-20">
            <Reveal>
              <p className="eyebrow">In the comments</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-[-0.02em] text-white md:text-3xl">People don&apos;t just watch, they talk back</h3>
            </Reveal>
            <ul className="mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3">
              {comments.map((c, i) => (
                <Reveal as="li" key={c.text} delay={i * 60} className="mb-4 break-inside-avoid">
                  <figure className="card lift p-5">
                    <div className="flex items-center gap-3">
                      <span aria-hidden="true" className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-sm font-semibold text-white">
                        {c.handle.charAt(1).toUpperCase()}
                      </span>
                      <figcaption className="text-sm font-semibold text-white/85">{c.handle}</figcaption>
                    </div>
                    <blockquote className="mt-3 text-[15px] leading-relaxed text-white/80">{c.text}</blockquote>
                    <div className="mt-4 flex items-center justify-between text-xs text-white/50">
                      <span className="inline-flex items-center gap-1.5 text-pink-300">
                        <PiHeartFill aria-hidden="true" /> {c.likes.toLocaleString("en")}
                        <span className="sr-only">likes</span>
                      </span>
                      <a
                        href={postUrl({ id: c.on })}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="focus-ring truncate rounded pl-3 hover:text-white"
                      >
                        on “{titleOf(c.on)}”
                      </a>
                    </div>
                  </figure>
                </Reveal>
              ))}
            </ul>
            <p className="text-xs text-white/45">Real comments from my TikTok, as written; usernames shortened for privacy.</p>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- Work */}
      <section aria-labelledby="work-h" id="work" className="scroll-mt-28">
        <div className="mx-auto max-w-[1200px] px-5 py-24 sm:px-8">
          <SectionTitle id="work-h" eyebrow="Selected work">
            Explainers & motion
          </SectionTitle>
          <div className="mt-10">
            <WorkGrid />
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- Experience */}
      <section aria-labelledby="exp-h" id="experience" className="scroll-mt-28">
        <div className="mx-auto max-w-[1200px] px-5 py-24 sm:px-8">
          <SectionTitle id="exp-h" eyebrow="Experience">
            Running socials,
            <br /> editing, creating
          </SectionTitle>
          <Reveal className="mt-8 flex flex-wrap gap-2">
            {roles.map((r) => (
              <span key={r} className="rounded-full border border-fuchsia-300/30 bg-fuchsia-400/10 px-4 py-2 text-sm font-medium text-fuchsia-100">
                {r}
              </span>
            ))}
          </Reveal>
          <ol className="mt-12 grid gap-5 md:grid-cols-2">
            {experience.map((job, i) => (
              <Reveal as="li" key={job.org + job.title} delay={i * 80}>
                <div className="card lift h-full p-7">
                  <p className="text-sm text-white/50">
                    {[job.period, job.place].filter(Boolean).join(" · ")}
                  </p>
                  <h3 className="mt-1 text-xl font-semibold tracking-[-0.01em] text-white">{job.title}</h3>
                  <p className="text-[15px] text-fuchsia-200/90">{job.org}</p>
                  {job.points && (
                    <ul className="mt-4 space-y-2 text-[15px] leading-relaxed text-white/70">
                      {job.points.map((p) => (
                        <li key={p} className="flex gap-2.5">
                          <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-pink-400" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* --------------------------------------------------------- About */}
      <section aria-labelledby="about-h" id="about" className="scroll-mt-28">
        <div className="mx-auto grid max-w-[1200px] items-center gap-16 px-5 py-24 sm:px-8 md:grid-cols-2">
          {/* Overlapping, slightly rotated photo cards */}
          <div aria-hidden="true" className="group relative mx-auto h-[380px] w-full max-w-[460px] sm:h-[440px]">
            <div className="absolute left-0 top-6 w-[62%] -rotate-6 overflow-hidden rounded-2xl border border-white/10 shadow-[0_16px_48px_rgba(0,0,0,0.4)] transition-transform duration-500 group-hover:-translate-x-3 group-hover:-rotate-[9deg]">
              <div className="relative aspect-[4/5]">
                <Image src="/photos/VideographyCover.png" alt="" fill sizes="280px" className="object-cover" />
              </div>
            </div>
            <div className="absolute right-0 top-0 w-[55%] rotate-[5deg] overflow-hidden rounded-2xl border border-white/10 shadow-[0_16px_48px_rgba(0,0,0,0.4)] transition-transform duration-500 group-hover:translate-x-3 group-hover:rotate-[8deg]">
              <div className="relative aspect-[4/5]">
                <Image src="/photos/PhotographyCover.png" alt="" fill sizes="260px" className="object-cover" />
              </div>
            </div>
            <div className="absolute bottom-0 left-[22%] w-[56%] rotate-[-1deg] overflow-hidden rounded-2xl border border-white/10 shadow-[0_16px_48px_rgba(0,0,0,0.45)] transition-transform duration-500 group-hover:translate-y-3">
              <div className="relative aspect-video">
                <Image src="/work/vidfolio-1.jpg" alt="" fill sizes="260px" className="object-cover" />
              </div>
            </div>
          </div>

          <Reveal>
            <p className="eyebrow">About</p>
            <h2 id="about-h" className="mt-3 text-3xl font-semibold leading-[1.15] tracking-[-0.02em] text-white md:text-5xl">
              An engineer
              <br /> behind the camera
            </h2>
            <div className="mt-6 max-w-[34rem] space-y-4 text-base leading-relaxed text-white/70">
              <p>
                I&apos;ve been filming and editing since I was young, and I
                still run my own TikTok, where one video passed a million
                views and {topPosts.length} posts have cleared 100K, all
                organic.
              </p>
              <p>
                By day I&apos;m a GTM Customer Engineer at a cloud SaaS company,
                with a Computer Engineering degree behind me. That&apos;s
                the edge: I can read your docs, sit in on a demo, and turn
                what your product does into something people stop scrolling
                for.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <OpenInViewer src={site.photography.src} title={site.photography.title} className="btn-ghost">
                Photography book
              </OpenInViewer>
              <ResumeButton className="btn-ghost">Resume</ResumeButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* -------------------------------------------------- FAQ + contact */}
      <section aria-labelledby="faq-h" id="faq" className="scroll-mt-28">
        <div className="mx-auto grid max-w-[1200px] gap-10 px-5 py-24 sm:px-8 lg:grid-cols-[1fr_1.3fr]">
          <div id="contact" className="scroll-mt-28 lg:sticky lg:top-28 lg:self-start">
            <div className="glass rounded-2xl p-7 md:p-8">
              <p className="eyebrow">Contact</p>
              <h2 className="mt-3 text-3xl font-semibold leading-[1.15] tracking-[-0.02em] text-white">
                Got a product
                <br /> to put on screen?
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/70">
                Send a brief, even a rough one: what it is, who it&apos;s for,
                and where it&apos;ll run. I&apos;ll reply with an approach, a
                quote, and a timeline.
              </p>
              <a href={`mailto:${site.email}`} className="btn-primary mt-7 w-full">
                <PiEnvelopeSimpleDuotone aria-hidden="true" className="text-lg" /> Email me
              </a>
              <div className="mt-3 grid grid-cols-2 gap-3">
                {socials.map(({ href, label, Icon }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                    <Icon aria-hidden="true" /> {label}
                  </a>
                ))}
              </div>
              <p className="mt-5 break-all text-sm text-white/50">{site.email}</p>
            </div>
          </div>

          <div>
            <SectionTitle id="faq-h" eyebrow="FAQ">
              Questions, answered
            </SectionTitle>
            <ul className="mt-10 space-y-3">
              {faqs.map((f) => (
                <li key={f.q}>
                  <details className="faq group card transition-colors duration-200 open:border-fuchsia-300/40 open:bg-[#1b1030]">
                    <summary className="focus-ring flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-4 rounded-2xl px-6 py-4 text-[17px] font-medium text-white [&::-webkit-details-marker]:hidden">
                      {f.q}
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/70 transition-transform duration-200 group-open:rotate-45 group-open:border-fuchsia-300/50 group-open:text-fuchsia-200">
                        <PiPlusBold aria-hidden="true" />
                      </span>
                    </summary>
                    <p className="max-w-[40rem] px-6 pb-6 text-base leading-relaxed text-white/70">{f.a}</p>
                  </details>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
