"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { MdPlayArrow } from "react-icons/md";
import { useDocumentViewer } from "@/components/ui/document-viewer";
import { useMounted } from "@/app/hooks/use-mounted";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const LOOP = "/video/Kiki_Vidfolio.mp4";
const POSTER = "/work/vidfolio-0.jpg";

/**
 * Muted ambient loop in the hero; clicking it opens the full showreel with
 * sound. Reduced-motion visitors get the still poster instead.
 */
export default function HeroLoop() {
  const ref = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const { openDocument } = useDocumentViewer();
  const mounted = useMounted();
  const reduced = useReducedMotion();
  const animate = mounted && !reduced;

  useEffect(() => {
    if (ref.current && ref.current.readyState >= 2) setReady(true);
  }, [animate]);

  return (
    <button
      type="button"
      aria-haspopup="dialog"
      aria-label="Play showreel"
      onClick={() => openDocument(site.showreel)}
      data-cursor="magnet"
      className="group relative block aspect-video w-full overflow-hidden rounded-3xl border border-white/15 bg-white/[0.04] shadow-[0_0_100px_-25px_rgba(217,70,239,0.7)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-300"
      style={{ backgroundImage: `url(${POSTER})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      {animate && (
        <video
          ref={ref}
          src={LOOP}
          poster={POSTER}
          muted
          loop
          autoPlay
          playsInline
          preload="auto"
          onLoadedData={() => setReady(true)}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-700",
            ready ? "opacity-100" : "opacity-0"
          )}
        />
      )}
      <span className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/40 py-1.5 pl-1.5 pr-4 text-sm font-semibold text-white backdrop-blur-md transition-transform duration-300 group-hover:scale-105">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-pink-600">
          <MdPlayArrow aria-hidden="true" className="ml-0.5" />
        </span>
        Watch the reel
      </span>
    </button>
  );
}
