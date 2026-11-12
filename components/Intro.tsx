"use client";

import { useEffect, useState } from "react";
import { getPhase, kindle, lightImmediately, subscribe, type Phase } from "@/lib/flame";
import { ui, type Lang } from "@/content/i18n";

/**
 * The darkness over the page. Invisible without JS (the pre-paint script
 * sets data-phase), so the content is always reachable.
 */
export default function Intro({ lang }: { lang: Lang }) {
  const [phase, setPhase] = useState<Phase>("dormant");
  const [hinted, setHinted] = useState(false);

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

    // If nothing happens for a while, the prompt brightens.
    const hint = window.setTimeout(() => setHinted(true), 5000);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") lightImmediately();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      off();
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
        Choco <span aria-hidden="true">·</span> {ui.introMark[lang]}
      </p>

      <button type="button" className="intro-kindle" onClick={() => kindle()} disabled={phase !== "dormant"}>
        <span className="intro-prompt">{ui.kindle[lang]}</span>
        <span className="visually-hidden">{ui.kindleSr[lang]}</span>
      </button>

      <button type="button" className="intro-skip" onClick={lightImmediately}>
        {ui.skipIntro[lang]}
      </button>
    </div>
  );
}
