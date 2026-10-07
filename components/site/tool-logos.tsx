import type { IconType } from "react-icons";
import {
  SiAdobeaftereffects,
  SiAdobeaudition,
  SiAdobecreativecloud,
  SiAdobeillustrator,
  SiAdobeindesign,
  SiAdobelightroom,
  SiAdobephotoshop,
  SiAdobepremierepro,
  SiCanva,
  SiDavinciresolve,
} from "react-icons/si";
import Reveal from "./reveal";

/** CapCut isn't in the icon set: a simplified version of its mark. */
const CapCutMark: IconType = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M3 6.2 12 2l9 4.2v3L12 5.2 6.2 8 12 10.8 17.8 8 21 9.5 12 13.8 3 9.5Z" />
    <path d="M3 14.5 12 10.2l9 4.3v3.3L12 22l-9-4.2v-3.3Zm3.2 1.5L12 18.8l5.8-2.8L12 13.2Z" opacity="0.85" />
  </svg>
);

const tools: { name: string; Icon: IconType; color: string }[] = [
  { name: "Adobe Creative Cloud", Icon: SiAdobecreativecloud, color: "#FF4F4F" },
  { name: "Premiere Pro", Icon: SiAdobepremierepro, color: "#9999FF" },
  { name: "After Effects", Icon: SiAdobeaftereffects, color: "#9999FF" },
  { name: "Photoshop", Icon: SiAdobephotoshop, color: "#31A8FF" },
  { name: "Illustrator", Icon: SiAdobeillustrator, color: "#FF9A00" },
  { name: "Lightroom", Icon: SiAdobelightroom, color: "#31A8FF" },
  { name: "Audition", Icon: SiAdobeaudition, color: "#00E4BB" },
  { name: "InDesign", Icon: SiAdobeindesign, color: "#FF3366" },
  { name: "DaVinci Resolve", Icon: SiDavinciresolve, color: "#F5C451" },
  { name: "CapCut", Icon: CapCutMark, color: "#FFFFFF" },
  { name: "Canva", Icon: SiCanva, color: "#00C4CC" },
];

/**
 * Icon-only logo row, in each brand's colour. The name appears as a small
 * tooltip on hover/focus and is always available to screen readers.
 */
export default function ToolLogos() {
  return (
    <ul className="flex flex-wrap gap-3">
      {tools.map(({ name, Icon, color }, i) => (
        <Reveal as="li" key={name} delay={i * 40}>
          <span
            tabIndex={0}
            title={name}
            className="focus-ring card lift group relative flex h-16 w-16 items-center justify-center text-[30px]"
            style={{ color }}
          >
            <Icon aria-hidden="true" className="transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110" />
            <span className="sr-only">{name}</span>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-black/80 px-2 py-1 text-xs font-medium text-white opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus:opacity-100"
            >
              {name}
            </span>
          </span>
        </Reveal>
      ))}
    </ul>
  );
}
