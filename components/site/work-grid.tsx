"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PiArrowRightBold } from "react-icons/pi";
import { disciplines, work, type Discipline, type WorkItem } from "@/lib/work";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function WorkGrid() {
  const [filter, setFilter] = useState<Discipline | "all">("all");
  const visible = work.filter((w) => filter === "all" || w.discipline === filter);

  return (
    <>
      <div
        role="tablist"
        aria-label="Filter work"
        className="mb-10 flex gap-1.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {disciplines.map((d) => {
          const count = d.key === "all" ? work.length : work.filter((w) => w.discipline === d.key).length;
          const selected = filter === d.key;
          return (
            <button
              key={d.key}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setFilter(d.key)}
              className={cn(
                "relative shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-300",
                selected ? "text-white" : "text-white/55 hover:text-white/90"
              )}
            >
              {selected && (
                <motion.span
                  layoutId="work-filter"
                  className="absolute inset-0 rounded-full border border-fuchsia-300/30 bg-gradient-to-r from-purple-600/50 to-pink-600/40"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative">
                {d.label}
                <span className="ml-1.5 text-[11px] opacity-60">{count}</span>
              </span>
            </button>
          );
        })}
      </div>

      <motion.ul layout className="grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-2">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((item, i) => (
            <motion.li
              key={item.slug}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.15 } }}
              transition={{ duration: 0.45, ease: EASE, delay: i * 0.04 }}
              className="list-none"
            >
              <WorkCard item={item} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </>
  );
}

/** Poster at rest; on hover (fine pointers only) a muted preview plays. */
function WorkCard({ item }: { item: WorkItem }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [previewing, setPreviewing] = useState(false);

  const enter = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    setPreviewing(true);
    void ref.current?.play().catch(() => {});
  };
  const leave = () => {
    setPreviewing(false);
    const v = ref.current;
    if (v) {
      v.pause();
      v.currentTime = 0;
    }
  };

  return (
    <Link
      href={`/work/${item.slug}`}
      onPointerEnter={enter}
      onPointerLeave={leave}
      className="group block rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-300"
    >
      <div
        data-cursor="magnet"
        className="relative aspect-video overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] transition-all duration-500 group-hover:border-fuchsia-300/30 group-hover:shadow-[0_30px_80px_-30px_rgba(217,70,239,0.6)]"
      >
        <Image
          src={item.poster}
          alt=""
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
        <video
          ref={ref}
          src={item.video}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-300",
            previewing ? "opacity-100" : "opacity-0"
          )}
        />
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-black/70 to-transparent p-4 pt-12">
          <span className="rounded-full bg-black/40 px-2.5 py-1 text-[11px] font-medium text-white/85 backdrop-blur-md">
            {disciplines.find((d) => d.key === item.discipline)?.label}
          </span>
          {item.duration && (
            <span className="rounded-full bg-black/40 px-2.5 py-1 font-mono text-[11px] text-white/85 backdrop-blur-md">
              {item.duration}
            </span>
          )}
        </div>
      </div>

      <div className="mt-4 flex items-start justify-between gap-4 px-1">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-fuchsia-200/70">
            {item.client} · {item.year}
          </p>
          <h3 className="mt-1 font-display text-2xl font-bold tracking-tight text-white">{item.title}</h3>
          <p className="mt-1.5 max-w-md text-sm leading-relaxed text-white/60">{item.summary}</p>
        </div>
        <PiArrowRightBold
          aria-hidden="true"
          className="mt-6 shrink-0 text-xl text-fuchsia-300 transition-transform group-hover:translate-x-1"
        />
      </div>
    </Link>
  );
}
