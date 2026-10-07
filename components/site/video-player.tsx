"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { MdPlayArrow } from "react-icons/md";
import { cn } from "@/lib/utils";

/**
 * Poster first, video on demand. Nothing but the poster image downloads
 * until the visitor presses play, which matters for 10MB+ masters.
 */
export default function VideoPlayer({
  src,
  poster,
  title,
  className,
}: {
  src: string;
  poster: string;
  title: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  const start = () => {
    setStarted(true);
    // The element mounts with the src on this render; play on the next tick.
    requestAnimationFrame(() => void ref.current?.play());
  };

  return (
    <div
      data-cursor="magnet"
      className={cn(
        "relative aspect-video w-full overflow-hidden rounded-3xl border border-white/15 bg-black shadow-[0_0_100px_-30px_rgba(217,70,239,0.7)]",
        className
      )}
    >
      {started ? (
        <video
          ref={ref}
          src={src}
          poster={poster}
          controls
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <button
          type="button"
          onClick={start}
          aria-label={`Play ${title}`}
          className="group absolute inset-0 focus-visible:outline-none"
        >
          <Image src={poster} alt="" fill priority sizes="(min-width: 1152px) 1152px, 100vw" className="object-cover" />
          <span className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <span className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/15 text-4xl text-white backdrop-blur-md transition-transform duration-300 group-hover:scale-110 group-focus-visible:ring-2 group-focus-visible:ring-fuchsia-300">
            <MdPlayArrow aria-hidden="true" className="ml-1" />
          </span>
        </button>
      )}
    </div>
  );
}
