"use client";

import { useEffect, useRef } from "react";
import EmberField from "./EmberField";
import { gpu, hydratePhase, scroll } from "@/lib/flame";

const clamp = (n: number) => Math.max(0, Math.min(1, n));

/** Fixed, behind everything: the GPU bonfire under the 2D ember field. */
export default function FireStage({ hasModel }: { hasModel: boolean }) {
  const gpuRef = useRef<HTMLCanvasElement>(null);

  // Scroll progress that positions and turns the bonfire.
  useEffect(() => {
    const about = document.getElementById("about");
    const rest = document.getElementById("contact");
    const links = rest?.querySelector(".contact-rail");
    const measure = () => {
      const vh = window.innerHeight;
      if (about) {
        const r = about.getBoundingClientRect();
        scroll.aboutIn = clamp((vh - r.top) / vh);
        scroll.aboutPin = clamp(-r.top / Math.max(1, r.height - vh));
        scroll.aboutOut = clamp((vh - r.bottom) / (vh * 0.6));
      }
      if (rest) {
        const r = rest.getBoundingClientRect();
        scroll.rest = clamp((vh - r.top) / (vh * 0.8));
        scroll.restBottom = r.bottom / vh;
        if (links) scroll.restContent = links.getBoundingClientRect().bottom / vh;
      }
    };
    // At most one measurement per frame, however many scroll events arrive.
    let frame = 0;
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(() => {
        frame = 0;
        measure();
      });
    };
    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  useEffect(() => {
    hydratePhase();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const weak = (navigator.hardwareConcurrency ?? 4) <= 2;
    if (reduce || weak) {
      gpu.failed = true; // the 2D layer draws the whole fire
      return;
    }

    let stop: (() => void) | undefined;
    let cancelled = false;

    const start = async () => {
      try {
        const { startFire } = await import("@/lib/fire-gpu");
        if (cancelled || !gpuRef.current) return;
        stop = await startFire(gpuRef.current, { hasModel });
        if (cancelled) stop();
      } catch (err) {
        gpu.failed = true;
        gpu.ready = false;
        if (process.env.NODE_ENV !== "production") console.warn("GPU fire unavailable, using 2D fire.", err);
      }
    };

    // Let the dormant embers paint first.
    const idle = (window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number })
      .requestIdleCallback;
    const handle = idle ? idle(start, { timeout: 600 }) : window.setTimeout(start, 200);

    return () => {
      cancelled = true;
      if (!idle) window.clearTimeout(handle);
      stop?.();
    };
  }, [hasModel]);

  return (
    <div className="fire-stage" aria-hidden="true">
      <canvas ref={gpuRef} className="fire-gpu" />
      <EmberField />
    </div>
  );
}
