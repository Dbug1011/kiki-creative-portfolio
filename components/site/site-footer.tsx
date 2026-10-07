import { MdArrowOutward, MdMailOutline } from "react-icons/md";
import SocialIcons from "@/components/ui/socialicons";
import ResumeButton from "@/components/site/resume-button";
import { site } from "@/lib/site";

const linkClass =
  "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/80 transition-colors hover:border-fuchsia-300/40 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-300";

const SiteFooter = () => (
  <footer id="contact" className="scroll-mt-20 border-t border-white/[0.06]">
    <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <p className="text-xs uppercase tracking-[0.25em] text-fuchsia-300/80">Contact</p>
      <h2 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-[1.05] tracking-tight text-white md:text-6xl">
        Got a product that needs{" "}
        <span className="bg-gradient-to-r from-purple-300 via-pink-300 to-fuchsia-400 bg-clip-text text-transparent">
          explaining?
        </span>
      </h2>
      <p className="mt-4 max-w-xl text-base leading-relaxed text-white/60">
        Explainers, launch cuts, kinetic type, and social edits. Send a brief,
        even a rough one, and I&apos;ll reply with an approach.
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <a href={`mailto:${site.email}`} className={linkClass}>
          <MdMailOutline aria-hidden="true" /> {site.email}
        </a>
        <ResumeButton className={linkClass}>Résumé</ResumeButton>
        <a href={site.techUrl} className={linkClass}>
          Engineering portfolio <MdArrowOutward aria-hidden="true" />
        </a>
      </div>

      <div className="mt-10 flex text-xl text-white">
        <SocialIcons />
      </div>
    </div>
    <p className="pb-8 text-center text-[11px] text-white/35">
      © {new Date().getFullYear()} {site.name} · {site.location}
    </p>
  </footer>
);

export default SiteFooter;
