import Image from "next/image";
import Link from "next/link";
import { MdAdd, MdArrowForward, MdArrowOutward, MdMailOutline, MdPlayArrow } from "react-icons/md";
import { SiLinkedin, SiTiktok } from "react-icons/si";
import OpenInViewer from "@/components/site/play-button";
import ReelGrid from "@/components/site/reel-grid";
import ResumeButton from "@/components/site/resume-button";
import WorkGrid from "@/components/site/work-grid";
import { site } from "@/lib/site";
import { compact, engagementRate, fetchCover, postUrl, reels, tiktok, topPosts, totalTopViews } from "@/lib/social";

// TikTok cover URLs expire, so the page refreshes them twice a day.
export const revalidate = 43_200;

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

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

const faqs = [
  {
    q: "What do you offer?",
    a: "Social media management, SaaS explainer videos, and short-form reels and editing. You can book one piece or a monthly retainer that covers planning, editing, and posting.",
  },
  {
    q: "Which platforms do you work with?",
    a: "Short-form vertical video first: TikTok, Instagram Reels, and YouTube Shorts, plus LinkedIn for B2B and SaaS brands.",
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
    a: "Premiere Pro and CapCut for editing, Photoshop and Figma for stills, thumbnails, and style frames.",
  },
  {
    q: "Where are you based?",
    a: "Tokyo, Japan. I work remotely with teams in other time zones.",
  },
];

/* ------------------------------------------------------------------ */

export default async function Home() {
  const reelsWithCovers = await Promise.all(reels.map(async (r) => ({ ...r, cover: await fetchCover(r.id) })));
  const top = topPosts[0];

  const metrics = [
    { value: tiktok.followers.toLocaleString("en"), label: "TikTok followers" },
    { value: compact(tiktok.likes), label: "Total likes" },
    { value: compact(top.views), label: "Views on top video" },
    { value: compact(totalTopViews), label: `Views from ${topPosts.length} posts over 100K` },
  ];

  return (
    <>
      {/* ---------------------------------------------------------- Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-10 h-[620px] w-[620px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.35),rgba(236,72,153,0.12)_45%,transparent_70%)] blur-2xl"
        />
        <div className="relative mx-auto max-w-[1200px] px-5 pt-12 sm:px-8 md:pt-16">
          {/* Headline split around the portrait on desktop; stacked above it on mobile. */}
          <div className="grid items-center md:grid-cols-[1fr_minmax(0,400px)_1fr] md:gap-4">
            <h1 className="contents">
              <span className="block text-center text-[2.5rem] font-bold leading-[1.05] tracking-[-0.03em] text-white md:order-1 md:text-right md:text-6xl lg:text-7xl">
                Social media
              </span>
              <span className="block text-center text-[2.5rem] font-bold leading-[1.05] tracking-[-0.03em] md:order-3 md:text-left md:text-6xl lg:text-7xl">
                <span className="bg-gradient-to-r from-purple-300 via-pink-300 to-fuchsia-400 bg-clip-text text-transparent">
                  people watch.
                </span>
              </span>
            </h1>
            <div className="feather-portrait relative mx-auto mt-6 aspect-[3/4] w-full max-w-[340px] md:order-2 md:mt-0 md:max-w-[400px]">
              <Image
                src="/photos/portrait-headshot-soft.webp"
                alt="Portrait of Karis Ruth Jumawan"
                fill
                priority
                quality={92}
                sizes="(min-width: 768px) 400px, 340px"
                className="object-contain object-bottom"
              />
            </div>
          </div>

          <div className="relative -mt-16 flex flex-col items-center pb-20 text-center md:-mt-20">
            <p className="max-w-[34rem] text-lg leading-relaxed text-white/80">
              I&apos;m Kiki. I manage social accounts, make SaaS explainer
              videos, and edit reels, as a computer engineer who understands
              the product before posting about it.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="#contact" className="btn-primary">
                Send a brief <MdArrowForward aria-hidden="true" />
              </Link>
              <OpenInViewer src={site.showreel.src} title={site.showreel.title} className="btn-ghost">
                <MdPlayArrow aria-hidden="true" className="text-lg" /> Watch showreel
              </OpenInViewer>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ Evidence */}
      <section aria-labelledby="proof-h" className="relative">
        <div className="mx-auto max-w-[1200px] px-5 pb-24 sm:px-8">
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <h2 id="proof-h" className="text-lg font-semibold text-white">Results on my own TikTok</h2>
            {tiktok.organic && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300/30 bg-emerald-400/10 px-3 py-1 text-[13px] font-medium text-emerald-200">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_8px_rgba(110,231,183,0.9)]" />
                100% organic · no paid ads
              </span>
            )}
          </div>
          <dl className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {metrics.map((m) => (
              <div key={m.label} className="glass rounded-2xl p-6">
                <dt className="text-sm text-white/65">{m.label}</dt>
                <dd className="tabular mt-2 text-4xl font-bold tracking-[-0.02em] text-white md:text-5xl">{m.value}</dd>
              </div>
            ))}
          </dl>

          <div className="card mt-4 overflow-hidden">
            <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-white/[0.07] px-6 py-4">
              <h3 className="text-[17px] font-semibold text-white">Every post over 100K views</h3>
              <a href={tiktok.url} target="_blank" rel="noopener noreferrer" className="focus-ring inline-flex items-center gap-1.5 rounded text-sm text-fuchsia-300 hover:text-fuchsia-200">
                <SiTiktok aria-hidden="true" /> @{tiktok.handle} <MdArrowOutward aria-hidden="true" />
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
                    <tr key={p.id} className="border-t border-white/[0.06]">
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
          </div>
          <p className="mt-3 text-xs leading-relaxed text-white/50">
            From my own TikTok{tiktok.organic && ", grown organically with no paid promotion"}. Read from the public profile and post pages on{" "}
            {tiktok.capturedAt}. Engagement = (likes + comments + shares) ÷ views. Saves aren&apos;t shown for photo carousels.
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------ Services */}
      <section aria-labelledby="services-h" id="services" className="scroll-mt-24">
        <div className="mx-auto max-w-[1200px] px-5 py-24 sm:px-8">
          <p className="eyebrow">Services</p>
          <h2 id="services-h" className="mt-3 max-w-2xl text-3xl font-semibold leading-[1.15] tracking-[-0.02em] text-white md:text-5xl">
            Content that explains,
            <br /> and gets watched
          </h2>
          <ul className="mt-12 grid gap-6 md:grid-cols-2">
            {services.map((s) => (
              <li key={s.title} className="card group p-7 transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-fuchsia-300/25 md:p-8">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-xl font-semibold tracking-[-0.01em] text-white md:text-2xl">{s.title}</h3>
                  <MdArrowOutward aria-hidden="true" className="mt-1 shrink-0 text-xl text-white/40 transition-colors group-hover:text-fuchsia-300" />
                </div>
                <p className="mt-3 max-w-[34rem] text-base leading-relaxed text-white/65">{s.body}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {s.deliverables.map((d) => (
                    <li key={d} className="rounded-full border border-white/10 px-3 py-1 text-[13px] text-white/75">
                      {d}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* -------------------------------------------------------- Social */}
      <section aria-labelledby="social-h" id="social" className="scroll-mt-24">
        <div className="mx-auto max-w-[1200px] px-5 py-24 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Reels</p>
              <h2 id="social-h" className="mt-3 text-3xl font-semibold leading-[1.15] tracking-[-0.02em] text-white md:text-5xl">
                From my own feed
              </h2>
              <p className="mt-4 max-w-[34rem] text-base leading-relaxed text-white/65">
                Every video of mine that passed 100K views: shot, edited, and
                posted by me, all organic reach. Press play to watch on the
                page; numbers as of {tiktok.capturedAt}.
              </p>
            </div>
            <a href={tiktok.url} target="_blank" rel="noopener noreferrer" className="btn-ghost">
              <SiTiktok aria-hidden="true" /> Follow on TikTok
            </a>
          </div>
          <div className="mt-12">
            <ReelGrid reels={reelsWithCovers} />
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- Work */}
      <section aria-labelledby="work-h" id="work" className="scroll-mt-24">
        <div className="mx-auto max-w-[1200px] px-5 py-24 sm:px-8">
          <p className="eyebrow">Selected work</p>
          <h2 id="work-h" className="mb-10 mt-3 text-3xl font-semibold leading-[1.15] tracking-[-0.02em] text-white md:text-5xl">
            Explainers & motion
          </h2>
          <WorkGrid />
        </div>
      </section>

      {/* --------------------------------------------------------- About */}
      <section aria-labelledby="about-h" id="about" className="scroll-mt-24">
        <div className="mx-auto grid max-w-[1200px] items-center gap-16 px-5 py-24 sm:px-8 md:grid-cols-2">
          {/* Overlapping, slightly rotated photo cards */}
          <div aria-hidden="true" className="relative mx-auto h-[380px] w-full max-w-[460px] sm:h-[440px]">
            <div className="absolute left-0 top-6 w-[62%] -rotate-6 overflow-hidden rounded-2xl border border-white/10 shadow-[0_16px_48px_rgba(0,0,0,0.4)]">
              <div className="relative aspect-[4/5]">
                <Image src="/photos/VideographyCover.png" alt="" fill sizes="280px" className="object-cover" />
              </div>
            </div>
            <div className="absolute right-0 top-0 w-[55%] rotate-[5deg] overflow-hidden rounded-2xl border border-white/10 shadow-[0_16px_48px_rgba(0,0,0,0.4)]">
              <div className="relative aspect-[4/5]">
                <Image src="/photos/PhotographyCover.png" alt="" fill sizes="260px" className="object-cover" />
              </div>
            </div>
            <div className="absolute bottom-0 left-[22%] w-[56%] rotate-[-1deg] overflow-hidden rounded-2xl border border-white/10 shadow-[0_16px_48px_rgba(0,0,0,0.45)]">
              <div className="relative aspect-video">
                <Image src="/work/vidfolio-1.jpg" alt="" fill sizes="260px" className="object-cover" />
              </div>
            </div>
          </div>

          <div>
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
                By day I&apos;m a GTM Customer Engineer at a cloud SaaS company
                in Tokyo, with a Computer Engineering degree behind me. That&apos;s
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
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- FAQ + contact */}
      <section aria-labelledby="faq-h" id="faq" className="scroll-mt-24">
        <div className="mx-auto grid max-w-[1200px] gap-10 px-5 py-24 sm:px-8 lg:grid-cols-[1fr_1.3fr]">
          <div id="contact" className="scroll-mt-24 lg:sticky lg:top-24 lg:self-start">
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
                <MdMailOutline aria-hidden="true" className="text-lg" /> Email me
              </a>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <a href={site.tiktok} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                  <SiTiktok aria-hidden="true" /> TikTok
                </a>
                <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                  <SiLinkedin aria-hidden="true" /> LinkedIn
                </a>
              </div>
              <p className="mt-5 break-all text-sm text-white/50">{site.email}</p>
            </div>
          </div>

          <div>
            <p className="eyebrow">FAQ</p>
            <h2 id="faq-h" className="mt-3 text-3xl font-semibold leading-[1.15] tracking-[-0.02em] text-white md:text-5xl">
              Questions, answered
            </h2>
            <ul className="mt-10 space-y-3">
              {faqs.map((f) => (
                <li key={f.q}>
                  <details className="faq group card transition-colors duration-200 open:border-fuchsia-300/40 open:bg-[#1b1030]">
                    <summary className="focus-ring flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-4 rounded-2xl px-6 py-4 text-[17px] font-medium text-white [&::-webkit-details-marker]:hidden">
                      {f.q}
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/70 transition-transform duration-200 group-open:rotate-45 group-open:border-fuchsia-300/50 group-open:text-fuchsia-200">
                        <MdAdd aria-hidden="true" />
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
