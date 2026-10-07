"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { IconType } from "react-icons";
import {
  PiBriefcaseDuotone,
  PiCompassDuotone,
  PiFilmSlateDuotone,
  PiQuestionDuotone,
  PiMegaphoneSimpleDuotone,
  PiUserDuotone,
  PiVideoDuotone,
} from "react-icons/pi";
import { nav } from "@/lib/site";
import { cn } from "@/lib/utils";

// Same colour as the strip line under the tabs, so the active tab merges
// into it like a folder tab.
const TAB = "#1f1338";

const icons: Record<string, IconType> = {
  "/#services": PiMegaphoneSimpleDuotone,
  "/#social": PiVideoDuotone,
  "/#work": PiFilmSlateDuotone,
  "/#experience": PiBriefcaseDuotone,
  "/#about": PiUserDuotone,
  "/#faq": PiQuestionDuotone,
};

/** Tracks which section is in the middle of the viewport ("" = hero). */
function useActiveSection() {
  const [active, setActive] = useState("");
  useEffect(() => {
    const els = nav
      .map((n) => document.getElementById(n.href.replace("/#", "")))
      .filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    els.forEach((el) => io.observe(el));
    const onScroll = () => {
      if (els[0] && els[0].getBoundingClientRect().top > window.innerHeight * 0.5) setActive("");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  return active;
}

/**
 * One glass bar: wordmark on the left, folder tabs on the right. The active
 * tab rises out of the strip with concave corners at its base; the others
 * are dimmed and get a soft pill on hover.
 */
const SiteNav = () => {
  const active = useActiveSection();

  return (
    <header className="sticky top-0 z-40 px-4 pt-3 sm:px-6">
      <div className="glass mx-auto max-w-[1200px] overflow-hidden rounded-2xl">
        <div className="flex items-end gap-4 pl-5">
          <Link
            href="/"
            className="focus-ring mb-3.5 shrink-0 rounded text-[17px] font-semibold tracking-[-0.02em] text-white"
          >
            Kiki<span className="text-fuchsia-400">.</span>
          </Link>

          <nav aria-label="Primary" className="min-w-0 flex-1">
            <ul className="flex items-end justify-end gap-1 overflow-x-auto pr-3 pt-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <li className="shrink-0">
                <Tab href="/" label="Home" Icon={PiCompassDuotone} active={active === ""} iconOnly />
              </li>
              {nav.map((item, i) => (
                <li key={item.href} className="flex shrink-0 items-end">
                  {i === nav.length - 1 && (
                    <span aria-hidden="true" className="mx-2 mb-3 h-4 w-px bg-white/15" />
                  )}
                  <Tab
                    href={item.href}
                    label={item.label}
                    Icon={icons[item.href]}
                    active={active === item.href.replace("/#", "")}
                  />
                </li>
              ))}
            </ul>
          </nav>
        </div>
        {/* The line the active tab merges into */}
        <div aria-hidden="true" className="h-[3px]" style={{ background: TAB }} />
      </div>
    </header>
  );
};

function Tab({
  href,
  label,
  Icon,
  active,
  iconOnly = false,
}: {
  href: string;
  label: string;
  Icon: IconType;
  active: boolean;
  iconOnly?: boolean;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "location" : undefined}
      aria-label={iconOnly ? label : undefined}
      className={cn(
        "focus-ring group relative flex items-center gap-2 text-[14px] font-medium transition-colors duration-200",
        iconOnly ? "px-3" : "px-4",
        active ? "h-11 rounded-t-xl text-white" : "mb-1 h-10 rounded-lg text-white/45 hover:bg-white/[0.07] hover:text-white"
      )}
      style={active ? { background: TAB } : undefined}
    >
      {active && (
        <>
          {/* Concave corners where the tab meets the strip line */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -left-3 bottom-0 h-3 w-3"
            style={{ background: `radial-gradient(circle at 0 0, transparent 12px, ${TAB} 12.5px)` }}
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-3 bottom-0 h-3 w-3"
            style={{ background: `radial-gradient(circle at 100% 0, transparent 12px, ${TAB} 12.5px)` }}
          />
        </>
      )}
      <Icon
        aria-hidden="true"
        className={cn(
          "text-[19px] transition-colors duration-200",
          active ? "text-fuchsia-300" : "text-white/40 group-hover:text-white/90"
        )}
      />
      {!iconOnly && <span className="hidden sm:inline">{label}</span>}
      {!iconOnly && <span className="sr-only sm:hidden">{label}</span>}
    </Link>
  );
}

export default SiteNav;
