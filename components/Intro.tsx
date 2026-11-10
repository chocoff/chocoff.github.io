"use client";

import { useEffect, useRef, useState } from "react";
import { getPhase, hasKindledBefore, kindle, lightImmediately, subscribe, type Phase } from "@/lib/flame";

/**
 * The darkness over the page. Invisible without JS (the pre-paint script
 * sets data-phase), so the content is always reachable.
 */
export default function Intro() {
  const [phase, setPhase] = useState<Phase>("dormant");
  const [hinted, setHinted] = useState(false);
  const button = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const initial = document.documentElement.dataset.phase as Phase | undefined;
    if (initial === "lit") {
      setPhase("lit");
      return;
    }
    setPhase(getPhase());
    const off = subscribe(setPhase);

    // Lock scroll while dormant; the page lives behind the darkness.
    document.documentElement.classList.add("is-dark");

    // Returning visitors: a short re-light, no ritual.
    let auto: number | undefined;
    if (hasKindledBefore()) auto = window.setTimeout(() => kindle(1000), 650);

    // If nothing happens for a while, the prompt brightens.
    const hint = window.setTimeout(() => setHinted(true), 5000);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") lightImmediately();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      off();
      window.clearTimeout(auto);
      window.clearTimeout(hint);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    if (phase !== "lit") return;
    document.documentElement.classList.remove("is-dark");
    // Hand focus to the page once the darkness lifts.
    const t = window.setTimeout(() => document.getElementById("hero-title")?.focus({ preventScroll: true }), 300);
    return () => window.clearTimeout(t);
  }, [phase]);

  if (phase === "lit") return null;

  return (
    <div className="intro" data-state={phase} data-hinted={hinted || undefined}>
      <p className="intro-mark">
        Fernando Rojas <span aria-hidden="true">·</span> Software Developer
      </p>

      <button ref={button} type="button" className="intro-kindle" onClick={() => kindle()} disabled={phase !== "dormant"}>
        <span className="intro-prompt">Kindle the flame</span>
        <span className="visually-hidden"> and enter the portfolio</span>
      </button>

      <button type="button" className="intro-skip" onClick={lightImmediately}>
        Skip intro
      </button>
    </div>
  );
}
