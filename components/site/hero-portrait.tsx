"use client";

import Image from "next/image";
import { useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Sneak peek: the formal portrait, with a soft circular lens that follows
 * the pointer and shows the (aligned) tech look only inside it. Touch: the
 * lens appears where you tap and follows your finger. Keyboard: focusing the
 * portrait opens the lens over the face.
 *
 * The lens position and size are CSS variables written straight to the DOM
 * (no React re-render per pointer move); `--peek-r` is registered with
 * @property in globals.css so its open/close animates.
 */
export default function HeroPortrait({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const place = (clientX: number, clientY: number) => {
    const el = ref.current;
    if (!el) return;
    const box = el.getBoundingClientRect();
    el.style.setProperty("--peek-x", `${clientX - box.left}px`);
    el.style.setProperty("--peek-y", `${clientY - box.top}px`);
  };
  const open = (on: boolean) => ref.current?.style.setProperty("--peek-r", on ? "var(--peek-size)" : "0px");

  return (
    <div
      ref={ref}
      role="img"
      tabIndex={0}
      aria-label="Portrait of Karis Ruth Jumawan. Move the pointer over it for a peek at her tech look."
      onPointerEnter={(e) => {
        place(e.clientX, e.clientY);
        open(true);
      }}
      onPointerMove={(e) => place(e.clientX, e.clientY)}
      onPointerLeave={() => open(false)}
      onPointerUp={(e) => e.pointerType !== "mouse" && open(false)}
      onFocus={() => {
        // Centre the lens on the face for keyboard users.
        const el = ref.current;
        if (!el) return;
        el.style.setProperty("--peek-x", "50%");
        el.style.setProperty("--peek-y", "30%");
        open(true);
      }}
      onBlur={() => open(false)}
      className={cn(
        "peek focus-ring relative block w-full touch-none select-none rounded-2xl",
        className
      )}
    >
      <div className="relative aspect-[9/16]">
        <Image
          src="/photos/hero-formal-v3.webp"
          alt=""
          fill
          priority
          quality={92}
          sizes="(min-width: 768px) 400px, 340px"
          className="object-contain object-bottom"
          draggable={false}
        />
        <div aria-hidden="true" className="peek-layer absolute inset-0">
          <Image
            src="/photos/hero-tech-v3.webp"
            alt=""
            fill
            priority
            quality={92}
            sizes="(min-width: 768px) 400px, 340px"
            className="object-contain object-bottom"
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
}
