"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

const EASE = "[transition-timing-function:cubic-bezier(0.22,1,0.36,1)]";

/**
 * Two aligned cutouts of the same pose. Formal by default; hovering (or
 * focusing, or tapping on touch screens) sweeps a glowing scan line down the
 * frame and reveals the tech look underneath it. Both images are the same
 * size and registered to each other, so only the outfit changes.
 */
export default function HeroPortrait({ className }: { className?: string }) {
  const [tech, setTech] = useState(false);

  return (
    <button
      type="button"
      aria-pressed={tech}
      aria-label={tech ? "Show formal look" : "Show tech look"}
      onPointerEnter={(e) => e.pointerType === "mouse" && setTech(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setTech(false)}
      onClick={(e) => {
        // Mouse users already toggled on enter/leave; taps and keys toggle here.
        if ((e.nativeEvent as PointerEvent).pointerType !== "mouse") setTech((t) => !t);
      }}
      className={cn("focus-ring group relative block w-full cursor-pointer rounded-2xl", className)}
    >
      <div className="feather-portrait relative aspect-[3/4]">
        <Image
          src="/photos/hero-formal.webp"
          alt="Karis Ruth Jumawan in a black blazer"
          fill
          priority
          quality={92}
          sizes="(min-width: 768px) 400px, 340px"
          className="object-contain object-bottom"
        />
        <Image
          src="/photos/hero-tech.webp"
          alt="Karis Ruth Jumawan in a silver top and mirrored visor"
          fill
          priority
          quality={92}
          sizes="(min-width: 768px) 400px, 340px"
          className={cn(
            "object-contain object-bottom transition-[clip-path] duration-700 motion-reduce:transition-none",
            EASE,
            tech ? "[clip-path:inset(0_0_0_0)]" : "[clip-path:inset(0_0_100%_0)]"
          )}
        />
      </div>

      {/* Scan line riding the edge of the reveal */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-x-[8%] h-px bg-gradient-to-r from-transparent via-pink-200 to-transparent shadow-[0_0_18px_4px_rgba(236,72,153,0.7)] transition-[top,opacity] duration-700 motion-reduce:hidden",
          EASE,
          tech ? "top-full opacity-0" : "top-0 opacity-0 group-hover:opacity-100"
        )}
      />

      {/* Hint */}
      <span className="pointer-events-none absolute bottom-[24%] left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full border border-white/15 bg-[#0b0718]/60 px-3 py-1.5 text-xs font-medium text-white/80 backdrop-blur-md transition-opacity duration-200 group-hover:opacity-0">
        <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-pink-400 shadow-[0_0_8px_rgba(236,72,153,0.9)]" />
        <span className="hidden [@media(hover:hover)]:inline">Hover</span>
        <span className="[@media(hover:hover)]:hidden">Tap</span>
        &nbsp;for {tech ? "formal look" : "tech mode"}
      </span>
    </button>
  );
}
