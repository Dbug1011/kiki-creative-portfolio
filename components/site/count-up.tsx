"use client";

import { useEffect, useRef, useState } from "react";

type Format = "int" | "compact" | "percent";

const formatters: Record<Format, (n: number) => string> = {
  int: (n) => Math.round(n).toLocaleString("en"),
  compact: (n) => new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(n),
  percent: (n) => `${n.toFixed(1)}%`,
};

/**
 * Counts up from 0 to `value` the first time it scrolls into view (ease-out,
 * ~1.6s). Renders the final value on the server and for reduced-motion
 * visitors, so the real number is never hidden.
 */
export default function CountUp({ value, format = "int" }: { value: number; format?: Format }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(value);
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setShown(0);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || done.current) return;
        done.current = true;
        io.disconnect();
        const start = performance.now();
        const dur = 1600;
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / dur);
          setShown(value * (1 - Math.pow(1 - t, 3)));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value]);

  return (
    <span ref={ref} className="tabular">
      {formatters[format](shown)}
    </span>
  );
}
