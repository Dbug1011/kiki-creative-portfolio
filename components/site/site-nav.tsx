"use client";

import Link from "next/link";
import { MdPlayArrow } from "react-icons/md";
import { useDocumentViewer } from "@/components/ui/document-viewer";
import { nav, site } from "@/lib/site";

/** Floating glass nav: wordmark, section links, showreel, one primary action. */
const SiteNav = () => {
  const { openDocument } = useDocumentViewer();

  return (
    <header className="sticky top-0 z-40 px-4 pt-3 sm:px-6">
      <div className="glass mx-auto flex h-14 max-w-[1200px] items-center justify-between gap-4 rounded-2xl pl-5 pr-2">
        <Link href="/" className="focus-ring rounded text-[17px] font-semibold tracking-[-0.02em] text-white">
          Kiki<span className="text-fuchsia-400">.</span>
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1 text-[15px] text-white/70">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="focus-ring rounded-lg px-3 py-2 transition-colors duration-200 hover:bg-white/[0.06] hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            aria-haspopup="dialog"
            onClick={() => openDocument(site.showreel)}
            className="focus-ring hidden min-h-[40px] items-center gap-1.5 rounded-[10px] px-3 text-[15px] font-medium text-white/80 transition-colors hover:text-white sm:inline-flex"
          >
            <MdPlayArrow aria-hidden="true" className="text-lg" /> Showreel
          </button>
          <Link href="/#contact" className="btn-primary min-h-[40px] px-4">
            Send a brief
          </Link>
        </div>
      </div>
    </header>
  );
};

export default SiteNav;
