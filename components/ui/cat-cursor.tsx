"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The pixel cat from the original portfolio as the mouse cursor: a single
 * still frame that simply follows the pointer (no flipping, scaling or
 * walking animation). Mouse/trackpad only: touch devices keep their normal
 * behaviour, and the native cursor is only hidden once the cat is tracking.
 */
export default function CatCursor() {
  const ref = useRef<HTMLImageElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    const root = document.documentElement;

    const move = (e: PointerEvent) => {
      const el = ref.current;
      if (!el || e.pointerType !== "mouse") return;
      el.style.opacity = "1";
      el.style.transform = `translate3d(${e.clientX - 4}px, ${e.clientY - 3}px, 0)`;
      root.classList.add("cat-cursor-on");
    };
    const hide = () => {
      if (ref.current) ref.current.style.opacity = "0";
    };

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("mouseleave", hide);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("mouseleave", hide);
      root.classList.remove("cat-cursor-on");
    };
  }, []);

  if (!enabled) return null;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={ref}
      src="/assets/cat-cursor.png"
      alt=""
      aria-hidden="true"
      width={28}
      height={22}
      className="pointer-events-none fixed left-0 top-0 z-[10002] h-auto w-7 opacity-0 [image-rendering:pixelated]"
    />
  );
}
