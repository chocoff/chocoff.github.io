"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { journey, monthYear } from "@/content/journey";
import { ui, type Lang } from "@/content/i18n";
import { ArrowOutIcon } from "./icons";

/**
 * The path. With motion allowed, the section pins and vertical scroll walks
 * the trail sideways; each stop lights up as it is reached. Without JS or
 * with reduced motion it is a plain vertical list.
 */
export default function PathTrack({ lang }: { lang: Lang }) {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLOListElement>(null);
  const [walk, setWalk] = useState(false);
  const [reached, setReached] = useState(-1);
  const [travel, setTravel] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: no-preference)");
    const apply = () => setWalk(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (!walk) return;
    const sec = section.current!;
    const tr = track.current!;
    let dist = 0;
    let stops: HTMLElement[] = [];
    let marks: number[] = []; // each stop's marker, px from the track's left edge
    let fades: string[] = [];
    // Steps fade out as they slide past the side rail: fully shown while their
    // left edge is right of FADE_FROM, gone once it is FADE_SPAN further left.
    const FADE_FROM = 104;
    const FADE_SPAN = 320;
    let best = -1;
    let frame = 0;

    const update = () => {
      frame = 0;
      const r = sec.getBoundingClientRect();
      const vh = window.innerHeight;
      if (r.bottom < 0 || r.top > vh) return; // off screen: nothing to move
      const p = Math.max(0, Math.min(1, -r.top / Math.max(1, r.height - vh)));
      const x = -p * dist;
      tr.style.transform = `translate3d(${x}px,0,0)`;
      sec.style.setProperty("--p", p.toFixed(4));
      const wide = window.innerWidth > 900;
      for (let i = 0; i < stops.length; i++) {
        const left = marks[i] - 22 + x;
        const f = wide ? Math.max(0, Math.min(1, (left - FADE_FROM + FADE_SPAN) / FADE_SPAN)) : 1;
        const v = f.toFixed(2);
        if (v !== fades[i]) {
          fades[i] = v;
          stops[i].style.setProperty("--fade", v);
        }
      }
      if (r.top >= vh * 0.6) return;
      // A stop is reached when its marker crosses 62% of the viewport width.
      const line = window.innerWidth * 0.62 - x;
      let n = -1;
      for (let i = 0; i < marks.length; i++) if (marks[i] < line) n = i;
      if (n > best) {
        best = n;
        setReached(n);
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const measure = () => {
      dist = Math.max(0, tr.scrollWidth - window.innerWidth);
      stops = Array.from(tr.children as HTMLCollectionOf<HTMLElement>);
      marks = stops.map((el) => el.offsetLeft + 22);
      fades = [];
      setTravel(dist);
      schedule();
    };
    // Keyboard users: bring a focused stop into view by scrolling the page.
    const onFocus = (e: FocusEvent) => {
      const stop = (e.target as HTMLElement).closest<HTMLElement>(".stop");
      if (!stop || dist === 0) return;
      const want = Math.max(0, Math.min(1, (stop.offsetLeft - window.innerWidth * 0.3) / dist));
      const top = sec.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: top + want * (sec.offsetHeight - window.innerHeight) });
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(tr);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", measure);
    tr.addEventListener("focusin", onFocus);
    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", measure);
      tr.removeEventListener("focusin", onFocus);
      tr.style.transform = "";
      stops.forEach((el) => el.style.removeProperty("--fade"));
    };
  }, [walk]);

  return (
    <section
      className="path"
      id="path"
      aria-labelledby="path-h"
      ref={section}
      data-walk={walk || undefined}
      style={walk ? { height: `calc(100vh + ${Math.round(travel * 1.15)}px)` } : undefined}
    >
      <div className="path-sticky">
        <div className="path-head">
          <h2 className="section-title" id="path-h">
            {ui.pathTitle[lang]}
          </h2>
          <p className="section-sub">{ui.pathSub[lang]}</p>
        </div>

        <ol className="path-track" ref={track}>
          {journey.map((s, i) => {
            const lit = !walk || i <= reached;
            return (
              <li
                key={s.id}
                className="stop"
                data-kind={s.kind}
                data-row={i % 2 ? "low" : "high"}
                data-lit={lit || undefined}
                data-current={s.end === null || undefined}
              >
                <span className="stop-mark" aria-hidden="true" />
                <span className="stop-year" aria-hidden="true">
                  {s.start[0]}
                </span>
                <article className="stop-body">
                  <div className="stop-text">
                    <a className="stop-logo" href={s.url} target="_blank" rel="noopener noreferrer" data-wide={s.logo.wide || undefined}>
                      <Image src={s.logo.src} alt={`${s.placeLong ?? s.place} ${ui.logoOf[lang]}`} width={s.logo.width} height={s.logo.height} loading="lazy" />
                    </a>
                    <h3 className="stop-place">{s.place}</h3>
                    {s.placeLong && <p className="stop-place-long">{s.placeLong}</p>}
                    <p className="stop-role">{s.role[lang]}</p>
                    <p className="stop-when">
                      <time>{monthYear(s.start, lang)}</time> – {s.end ? <time>{monthYear(s.end, lang)}</time> : <strong>{ui.present[lang]}</strong>}
                      <span className="stop-kind">{s.kind === "study" ? ui.study[lang] : ui.work[lang]}</span>
                    </p>
                    <p className="stop-summary">{s.summary[lang]}</p>
                    <p className="stop-foot">
                      {s.location && <span>{s.location[lang]}</span>}
                      <a className="text-link" href={s.url} target="_blank" rel="noopener noreferrer">
                        {new URL(s.url).hostname.replace(/^www\./, "")} <ArrowOutIcon />
                      </a>
                    </p>
                  </div>
                  {s.photo && (
                    <figure className="stop-photo">
                      <Image src={s.photo.src} alt={s.photo.alt[lang]} width={400} height={500} sizes="(max-width: 640px) 100vw, 210px" loading="lazy" />
                    </figure>
                  )}
                </article>
              </li>
            );
          })}
        </ol>

        <div className="path-progress" aria-hidden="true">
          <span />
        </div>
      </div>
    </section>
  );
}
