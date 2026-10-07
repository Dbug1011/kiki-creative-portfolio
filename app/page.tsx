import Image from "next/image";
import Link from "next/link";
import { MdArrowDownward, MdOutlinePictureAsPdf } from "react-icons/md";
import {
  SiAdobeaftereffects,
  SiAdobeillustrator,
  SiAdobelightroom,
  SiAdobephotoshop,
  SiAdobepremierepro,
  SiBlender,
  SiFigma,
} from "react-icons/si";
import HeroLoop from "@/components/site/hero-loop";
import KineticHeadline from "@/components/site/kinetic-headline";
import OpenInViewer from "@/components/site/play-button";
import WorkGrid from "@/components/site/work-grid";
import { site } from "@/lib/site";

const services = [
  {
    title: "SaaS explainer videos",
    body: "Turn a product, a pricing model, or a workflow into 15–60 seconds that a buyer actually gets.",
    deliverables: ["Script & storyboard", "Diagram + chart animation", "Launch & social cuts"],
  },
  {
    title: "Kinetic typography",
    body: "Type that moves with intent. Brand statements, campaign openers, and title sequences without a voiceover.",
    deliverables: ["Type-led sequences", "Lyric / quote pieces", "Bumpers & stingers"],
  },
  {
    title: "Product UI walkthroughs",
    body: "Real screens, cleaned up and animated, then connected to the 'why' with motion graphics.",
    deliverables: ["UI capture & cleanup", "Feature highlights", "Onboarding clips"],
  },
  {
    title: "Visual assets",
    body: "Stills and graphics that sit next to the video: thumbnails, style frames, photography.",
    deliverables: ["Style frames", "Thumbnails & covers", "Photography"],
  },
];

const process = [
  { step: "Brief", body: "Audience, the one message, where it runs, and how long it can be." },
  { step: "Script & boards", body: "Words first, then rough frames so we agree on the story before any animation." },
  { step: "Style frames", body: "Three or four finished stills that lock the look: type, colour, UI treatment." },
  { step: "Animation", body: "Built in passes: timing first, then easing and detail, then polish." },
  { step: "Sound & delivery", body: "Music, SFX, captions, and every aspect ratio and length you need." },
];

const tools = [
  { Icon: SiAdobeaftereffects, name: "After Effects" },
  { Icon: SiAdobepremierepro, name: "Premiere Pro" },
  { Icon: SiAdobephotoshop, name: "Photoshop" },
  { Icon: SiAdobeillustrator, name: "Illustrator" },
  { Icon: SiAdobelightroom, name: "Lightroom" },
  { Icon: SiFigma, name: "Figma" },
  { Icon: SiBlender, name: "Blender" },
];

const strip = ["SaaS explainers", "Kinetic typography", "Product walkthroughs", "Social cuts", "Style frames", "Photography"];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="text-xs uppercase tracking-[0.25em] text-fuchsia-300/80">{children}</p>;
}

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 pb-16 pt-14 sm:px-6 md:pt-20">
        <Eyebrow>{site.name} · Motion &amp; visuals</Eyebrow>
        <div className="mt-5">
          <KineticHeadline
            lines={[
              { words: ["Motion", "that"] },
              { words: ["explains."], accent: true },
            ]}
          />
        </div>
        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_1.35fr] lg:items-end">
          <div>
            <p className="text-legible max-w-md text-base leading-relaxed text-white/70 md:text-lg">
              I make SaaS explainer videos, kinetic typography, and the
              visual assets around them, for product teams who need a
              complicated idea to land in seconds.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="#work"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_28px_-6px_rgba(236,72,153,0.8)] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-300"
              >
                See the work <MdArrowDownward aria-hidden="true" />
              </Link>
              <Link
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 text-sm font-medium text-white/85 transition-colors hover:border-fuchsia-300/40 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-300"
              >
                Send a brief
              </Link>
            </div>
          </div>
          <HeroLoop />
        </div>
      </section>

      {/* Discipline strip */}
      <div aria-hidden="true" className="marquee-group overflow-hidden border-y border-white/[0.06] py-5 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="marquee-track flex w-max animate-marquee">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center gap-10 pr-10 font-display text-2xl font-bold text-white/25 md:text-3xl">
              {strip.map((s) => (
                <span key={s} className="flex items-center gap-10">
                  {s}
                  <span className="text-fuchsia-400/60">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Work */}
      <section aria-labelledby="work-heading" id="work" className="scroll-mt-20">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <Eyebrow>Selected work</Eyebrow>
          <h2 id="work-heading" className="mb-10 mt-3 font-display text-4xl font-bold tracking-tight text-white md:text-5xl">
            Recent pieces
          </h2>
          <WorkGrid />
        </div>
      </section>

      {/* Services */}
      <section aria-labelledby="services-heading" id="services" className="scroll-mt-20">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <Eyebrow>Services</Eyebrow>
          <h2 id="services-heading" className="mt-3 font-display text-4xl font-bold tracking-tight text-white md:text-5xl">
            What I make
          </h2>
          <ul className="mt-10 grid gap-4 md:grid-cols-2">
            {services.map((s, i) => (
              <li
                key={s.title}
                data-cursor="magnet"
                className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 transition-colors hover:border-fuchsia-300/25 md:p-8 md:backdrop-blur-md"
              >
                <p className="font-mono text-xs text-fuchsia-300/70">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-2 font-display text-2xl font-bold text-white">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65">{s.body}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {s.deliverables.map((d) => (
                    <li key={d} className="rounded-full bg-fuchsia-400/10 px-3 py-1 text-xs text-fuchsia-100">
                      {d}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>

          <ul aria-label="Tools" className="mt-10 flex flex-wrap gap-2.5">
            {tools.map(({ Icon, name }) => (
              <li
                key={name}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs font-medium text-white/70"
              >
                <Icon aria-hidden="true" className="text-sm" /> {name}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Process */}
      <section aria-labelledby="process-heading" id="process" className="scroll-mt-20">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <Eyebrow>Process</Eyebrow>
          <h2 id="process-heading" className="mt-3 font-display text-4xl font-bold tracking-tight text-white md:text-5xl">
            From brief to delivery
          </h2>
          <ol className="mt-10 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 md:grid-cols-5">
            {process.map((p, i) => (
              <li key={p.step} className="bg-[#0d0820]/90 p-5">
                <p className="font-display text-3xl font-extrabold text-fuchsia-300/40">{i + 1}</p>
                <h3 className="mt-2 font-semibold text-white">{p.step}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-white/60">{p.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Stills */}
      <section aria-labelledby="stills-heading" id="stills" className="scroll-mt-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-20 sm:px-6 md:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10">
            <Image
              src="/photos/PhotographyCover.png"
              alt="Photography portfolio cover"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <Eyebrow>Stills</Eyebrow>
            <h2 id="stills-heading" className="mt-3 font-display text-4xl font-bold tracking-tight text-white md:text-5xl">
              Photography
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-white/65">
              The eye behind the edits. Portraits, places, and events, shot
              and graded by me. A lot of the framing instincts in the motion
              work start here.
            </p>
            <OpenInViewer
              src={site.photography.src}
              title={site.photography.title}
              className="mt-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 text-sm font-medium text-white/85 transition-colors hover:border-fuchsia-300/40 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-300"
            >
              <MdOutlinePictureAsPdf aria-hidden="true" /> View the photo book
            </OpenInViewer>
          </div>
        </div>
      </section>
    </>
  );
}
