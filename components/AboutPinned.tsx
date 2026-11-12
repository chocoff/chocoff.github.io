"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { interests, site, skills } from "@/content/site";
import { ui, type Lang } from "@/content/i18n";

/**
 * About. On wide screens the section is pinned while the bonfire turns beside
 * it, and the skill groups take the light one at a time. On narrow screens and
 * with reduced motion it is a plain section with everything shown.
 */
export default function AboutPinned({ lang }: { lang: Lang }) {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 900px) and (prefers-reduced-motion: no-preference)");
    const apply = () => setPinned(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (!pinned) return;
    const el = ref.current!;
    let frame = 0;
    const update = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const p = Math.max(0, Math.min(0.999, -r.top / Math.max(1, r.height - window.innerHeight)));
      setActive(Math.floor(p * skills.length));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, [pinned]);

  return (
    <section className="about" id="about" aria-labelledby="about-h" ref={ref} data-pinned={pinned || undefined}>
      <div className="about-sticky">
        <div className="about-text">
          <h2 className="section-title" id="about-h">
            {ui.aboutTitle[lang]}
          </h2>
          <div className="about-intro">
            <Image className="about-portrait" src="/media/portrait.webp" alt={ui.portraitAlt[lang]} width={480} height={480} sizes="112px" loading="lazy" />
            <p className="lede">{site.intro[lang]}</p>
          </div>

          <h3 className="minor-title">{ui.skills[lang]}</h3>
          <ul className="facets">
            {skills.map((s, i) => (
              <li key={s.group.en} className="facet" data-active={!pinned || i === active || undefined}>
                <span className="facet-name">{s.group[lang]}</span>
                <span className="facet-items">{s.items.join(" · ")}</span>
              </li>
            ))}
          </ul>

          <h3 className="minor-title">{ui.interests[lang]}</h3>
          <p className="about-interests">{interests.map((i) => i[lang]).join(" · ")}</p>
        </div>
      </div>
    </section>
  );
}
