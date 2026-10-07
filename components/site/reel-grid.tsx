"use client";

import { useState } from "react";
import { PiArrowUpRightBold, PiHeartFill, PiPlayFill, PiEyeDuotone } from "react-icons/pi";
import { compact, postUrl, type Post } from "@/lib/social";

/**
 * Vertical 9:16 reel cards. The cover is a static image; TikTok's player
 * only loads when a visitor presses play, and only one plays at a time.
 */
export default function ReelGrid({ reels }: { reels: (Post & { cover: string | null })[] }) {
  const [playing, setPlaying] = useState<string | null>(null);

  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {reels.map((reel) => (
        <li key={reel.id}>
          <article className="card overflow-hidden">
            <div className="relative aspect-[9/16] bg-gradient-to-br from-purple-900/60 via-[#140c26] to-pink-900/40">
              {playing === reel.id ? (
                <iframe
                  src={`https://www.tiktok.com/player/v1/${reel.id}?autoplay=1&controls=1&description=0&music_info=0&rel=0`}
                  title={reel.title}
                  allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                  className="absolute inset-0 h-full w-full border-0"
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setPlaying(reel.id)}
                  aria-label={`Play: ${reel.title}`}
                  className="group absolute inset-0 focus-visible:outline-none"
                >
                  {reel.cover && (
                    // TikTok cover URLs are signed and short-lived, so they
                    // can't go through next/image's optimiser cache.
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={reel.cover} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
                  )}
                  <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-3xl text-white ring-1 ring-white/30 backdrop-blur-sm transition-transform duration-200 group-hover:scale-110 group-focus-visible:ring-2 group-focus-visible:ring-fuchsia-200">
                    <PiPlayFill aria-hidden="true" className="ml-0.5" />
                  </span>
                </button>
              )}
            </div>

            {/* Titles and numbers sit on a solid surface, never over the video. */}
            <div className="p-5">
              <p className="text-xs font-medium text-fuchsia-300">{reel.tag}</p>
              <h3 className="mt-1.5 text-[17px] font-semibold leading-snug tracking-[-0.01em] text-white">{reel.title}</h3>
              <div className="mt-3 flex items-center justify-between text-sm text-white/60">
                <span className="tabular inline-flex items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 text-white">
                    <PiEyeDuotone aria-hidden="true" /> {compact(reel.views)}
                    <span className="sr-only">views</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <PiHeartFill aria-hidden="true" /> {compact(reel.likes)}
                    <span className="sr-only">likes</span>
                  </span>
                </span>
                <a
                  href={postUrl(reel)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring inline-flex min-h-[44px] items-center gap-1 rounded px-1 text-white/70 hover:text-white"
                >
                  TikTok <PiArrowUpRightBold aria-hidden="true" />
                </a>
              </div>
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
}
