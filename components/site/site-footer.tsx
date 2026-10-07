import { MdArrowOutward } from "react-icons/md";
import SocialIcons from "@/components/ui/socialicons";
import { site } from "@/lib/site";

/** Compact footer; the full contact panel lives in the FAQ section. */
const SiteFooter = () => (
  <footer className="relative border-t border-white/[0.06]">
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-[radial-gradient(ellipse_at_50%_100%,rgba(168,85,247,0.18),transparent_70%)]"
    />
    <div className="relative mx-auto flex max-w-[1200px] flex-col gap-6 px-5 py-10 sm:px-8 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-[17px] font-semibold tracking-[-0.02em] text-white">
          Kiki<span className="text-fuchsia-400">.</span>
        </p>
        <p className="mt-1 text-sm text-white/55">
          © {new Date().getFullYear()} {site.name} · {site.location}
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-5 text-lg text-white/75">
        <SocialIcons />
      </div>
      <a href={site.techUrl} className="focus-ring inline-flex items-center gap-1 rounded text-sm text-white/65 hover:text-white">
        Engineering portfolio <MdArrowOutward aria-hidden="true" />
      </a>
    </div>
  </footer>
);

export default SiteFooter;
