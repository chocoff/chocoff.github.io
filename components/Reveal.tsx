"use client";

import { useEffect } from "react";
import { subscribe, getPhase } from "@/lib/flame";

/**
 * Marks [data-reveal] elements as shown when the light reaches them.
 * Content is visible by default; hiding only happens under html.js (set pre-paint).
 */
export default function Reveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.setAttribute("data-shown", "");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );

    const start = () => els.forEach((el) => io.observe(el));
    let off: (() => void) | undefined;
    if (getPhase() === "lit" || document.documentElement.dataset.phase === "lit") start();
    else off = subscribe((p) => p === "lit" && start());

    return () => {
      io.disconnect();
      off?.();
    };
  }, []);

  return null;
}
