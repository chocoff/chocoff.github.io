"use client";

import { useEffect, useState, type ComponentType, type SVGProps } from "react";
import { SigilAnvil, SigilBook, SigilFlame, SigilLantern, SigilPath } from "./icons";

export type NavItem = { id: string; label: string; preview: string; warmth: number };

const icons: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  about: SigilFlame,
  path: SigilPath,
  works: SigilAnvil,
  more: SigilBook,
  contact: SigilLantern,
};

export default function SigilNav({ items, label, homeLabel }: { items: readonly NavItem[]; label: string; homeLabel: string }) {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const sections = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => Boolean(el));
    const root = document.documentElement;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const id = e.target.id;
          setActive(id);
          const item = items.find((i) => i.id === id);
          if (item) root.style.setProperty("--warmth", String(item.warmth));
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));

    // Above the first section: the hero, full warmth.
    const onScroll = () => {
      if (sections[0] && window.scrollY < sections[0].offsetTop - window.innerHeight * 0.5) {
        setActive("");
        root.style.setProperty("--warmth", "1");
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [items]);

  return (
    <nav className="sigils" aria-label={label}>
      <a className="sigils-home" href="#top" aria-label={homeLabel}>
        Choco<span aria-hidden="true">.</span>
      </a>
      <ol>
        {items.map((item) => {
          const Icon = icons[item.id];
          return (
            <li key={item.id}>
              <a href={`#${item.id}`} className="sigil" aria-current={active === item.id ? "location" : undefined} aria-describedby={`peek-${item.id}`}>
                <Icon />
                <span className="sigil-label">{item.label}</span>
              </a>
              <span className="sigil-peek" id={`peek-${item.id}`} role="tooltip">
                {item.preview}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
