"use client";

import Link from "next/link";
import { MdArrowOutward, MdPlayArrow } from "react-icons/md";
import { useDocumentViewer } from "@/components/ui/document-viewer";
import { nav, site } from "@/lib/site";

const SiteNav = () => {
  const { openDocument } = useDocumentViewer();

  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-[#0b0718]/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="rounded font-display text-lg font-bold tracking-tight text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-300"
        >
          kiki<span className="text-fuchsia-400">.</span>
          <span className="ml-1 hidden text-sm font-medium text-white/55 sm:inline">motion</span>
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1 text-sm text-white/65">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-full px-3 py-1.5 transition-colors hover:bg-white/[0.06] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-300"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={site.techUrl}
            className="hidden items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium text-white/60 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-300 sm:inline-flex"
          >
            Engineering work
            <MdArrowOutward aria-hidden="true" />
          </a>
          <button
            type="button"
            aria-haspopup="dialog"
            onClick={() => openDocument(site.showreel)}
            className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-1.5 text-xs font-semibold text-white shadow-[0_0_24px_-6px_rgba(236,72,153,0.7)] transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-300"
          >
            <MdPlayArrow aria-hidden="true" className="text-sm" /> Showreel
          </button>
        </div>
      </div>
    </header>
  );
};

export default SiteNav;
