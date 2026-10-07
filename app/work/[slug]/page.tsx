import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MdArrowBack, MdArrowForward } from "react-icons/md";
import VideoPlayer from "@/components/site/video-player";
import { disciplines, getWork, work } from "@/lib/work";

type Params = { params: { slug: string } };

export const dynamicParams = false;

export function generateStaticParams() {
  return work.map((w) => ({ slug: w.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const item = getWork(params.slug);
  if (!item) return {};
  return {
    title: item.title,
    description: item.summary,
    openGraph: { images: [item.poster] },
  };
}

export default function WorkPage({ params }: Params) {
  const item = getWork(params.slug);
  if (!item) notFound();

  const index = work.indexOf(item);
  const next = work[(index + 1) % work.length];

  const meta = [
    { label: "Client", value: item.client },
    { label: "Year", value: item.year },
    { label: "Type", value: disciplines.find((d) => d.key === item.discipline)?.label },
    { label: "Format", value: item.duration ? `${item.duration} · ${item.format}` : item.format },
  ];

  return (
    <article className="mx-auto max-w-6xl px-4 pb-20 pt-10 sm:px-6">
      <Link
        href="/#work"
        className="inline-flex items-center gap-1.5 rounded text-sm text-white/55 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-300"
      >
        <MdArrowBack aria-hidden="true" /> All work
      </Link>

      <header className="mt-8">
        <p className="text-xs uppercase tracking-[0.25em] text-fuchsia-300/80">{item.client}</p>
        <h1 className="text-legible mt-3 font-display text-5xl font-extrabold tracking-tight text-white md:text-7xl">
          {item.title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/70">{item.summary}</p>
      </header>

      <VideoPlayer src={item.video} poster={item.poster} title={item.title} className="mt-10" />

      <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-4">
        {meta.map((m) => (
          <div key={m.label} className="bg-[#0d0820]/90 p-4">
            <dt className="text-[11px] uppercase tracking-wider text-white/45">{m.label}</dt>
            <dd className="mt-1 text-sm text-white/90">{m.value}</dd>
          </div>
        ))}
      </dl>

      {/* Brief */}
      <section aria-labelledby="brief-h" className="mt-16 grid gap-10 md:grid-cols-[220px_1fr]">
        <h2 id="brief-h" className="font-display text-2xl font-bold text-white">
          The brief
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-fuchsia-300/80">Challenge</h3>
            <p className="mt-2 max-w-2xl text-base leading-relaxed text-white/75">{item.brief.challenge}</p>
          </div>
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-fuchsia-300/80">Approach</h3>
            <ol className="mt-3 max-w-2xl space-y-3">
              {item.brief.approach.map((a, i) => (
                <li key={a} className="flex gap-3 text-base leading-relaxed text-white/75">
                  <span className="font-mono text-xs leading-7 text-fuchsia-300/70">{String(i + 1).padStart(2, "0")}</span>
                  {a}
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-fuchsia-300/80">Deliverables</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {item.brief.deliverables.map((d) => (
                <li key={d} className="rounded-full bg-fuchsia-400/10 px-3 py-1 text-xs text-fuchsia-100">
                  {d}
                </li>
              ))}
            </ul>
          </div>
          {item.outcome && (
            <div>
              <h3 className="text-xs uppercase tracking-[0.2em] text-fuchsia-300/80">Outcome</h3>
              <p className="mt-2 max-w-2xl text-base leading-relaxed text-white/75">{item.outcome}</p>
            </div>
          )}
        </div>
      </section>

      {/* Breakdown */}
      <section aria-labelledby="frames-h" className="mt-16 grid gap-10 md:grid-cols-[220px_1fr]">
        <div>
          <h2 id="frames-h" className="font-display text-2xl font-bold text-white">
            Breakdown
          </h2>
          <p className="mt-2 text-sm text-white/50">Key frames, in order.</p>
        </div>
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {item.frames.map((f, i) => (
            <li key={f.src}>
              <figure>
                <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]">
                  <Image src={f.src} alt={f.caption} fill sizes="(min-width: 768px) 420px, 100vw" className="object-cover" />
                </div>
                <figcaption className="mt-2 text-xs text-white/55">
                  <span className="font-mono text-fuchsia-300/70">{String(i + 1).padStart(2, "0")}</span> {f.caption}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </section>

      {/* Credits */}
      <section aria-labelledby="credits-h" className="mt-16 grid gap-10 md:grid-cols-[220px_1fr]">
        <h2 id="credits-h" className="font-display text-2xl font-bold text-white">
          Credits
        </h2>
        <dl className="grid gap-6 sm:grid-cols-2">
          <div>
            <dt className="text-xs uppercase tracking-[0.2em] text-fuchsia-300/80">My role</dt>
            <dd className="mt-2 text-sm text-white/80">{item.role.join(" · ")}</dd>
          </div>
          {item.tools && (
            <div>
              <dt className="text-xs uppercase tracking-[0.2em] text-fuchsia-300/80">Tools</dt>
              <dd className="mt-2 text-sm text-white/80">{item.tools.join(" · ")}</dd>
            </div>
          )}
        </dl>
      </section>

      {/* Next */}
      <Link
        href={`/work/${next.slug}`}
        className="group mt-20 grid items-center gap-6 rounded-3xl border border-white/10 bg-white/[0.035] p-4 transition-colors hover:border-fuchsia-300/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-300 sm:grid-cols-[240px_1fr_auto] md:p-5"
      >
        <div className="relative aspect-video overflow-hidden rounded-2xl">
          <Image src={next.poster} alt="" fill sizes="240px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-white/45">Next project</p>
          <p className="mt-1 font-display text-3xl font-bold text-white">{next.title}</p>
          <p className="mt-1 text-sm text-white/55">{next.client}</p>
        </div>
        <MdArrowForward aria-hidden="true" className="hidden text-3xl text-fuchsia-300 transition-transform group-hover:translate-x-1 sm:block" />
      </Link>
    </article>
  );
}
