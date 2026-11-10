"use client";

import { useEffect, useRef } from "react";
import EmberField from "./EmberField";
import { gpu, hydratePhase } from "@/lib/flame";

/** Fixed, behind everything: the GPU fire under the 2D ember field. */
export default function FireStage() {
  const gpuRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    hydratePhase();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const weak = (navigator.hardwareConcurrency ?? 4) <= 2;
    if (reduce || weak) return;

    let stop: (() => void) | undefined;
    let cancelled = false;

    const start = async () => {
      try {
        const { startFire } = await import("@/lib/fire-gpu");
        if (cancelled || !gpuRef.current) return;
        stop = await startFire(gpuRef.current);
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
  }, []);

  return (
    <div className="fire-stage" aria-hidden="true">
      <canvas ref={gpuRef} className="fire-gpu" />
      <EmberField />
    </div>
  );
}
