"use client";

import { useEffect, useId, useRef, useState } from "react";
import { books, cosmereAbout, type Book } from "@/content/cosmere";
import { ui, type Lang } from "@/content/i18n";
import { ArrowOutIcon } from "./icons";

/** Consecutive books on the same world form one leg of the journey. */
function legs(list: readonly Book[]) {
  const out: { world: Book["world"]; books: { book: Book; index: number }[] }[] = [];
  list.forEach((book, index) => {
    const lastLeg = out[out.length - 1];
    if (lastLeg && lastLeg.world === book.world) lastLeg.books.push({ book, index });
    else out.push({ world: book.world, books: [{ book, index }] });
  });
  return out;
}

export default function CosmerePath({ lang }: { lang: Lang }) {
  const latestIndex = Math.max(0, books.findIndex((b) => b.status === "latest"));
  const [selected, setSelected] = useState(latestIndex);
  const panelId = useId();
  const shelf = useRef<HTMLDivElement>(null);
  const book = books[selected];
  const read = books.filter((b) => b.status !== "planned").length;

  const status = (b: Book) => (b.status === "latest" ? ui.statusLatest[lang] : b.status === "read" ? ui.statusRead[lang] : ui.statusPlanned[lang]);
  const kind = (b: Book) => (b.kind === "novel" ? ui.kindNovel[lang] : b.kind === "novella" ? ui.kindNovella[lang] : ui.kindStory[lang]);

  // On narrow screens the shelf scrolls; start with the latest flame in view.
  useEffect(() => {
    const el = shelf.current;
    if (!el || el.scrollWidth <= el.clientWidth) return;
    const latest = el.querySelector<HTMLElement>('[data-status="latest"]');
    if (latest) el.scrollLeft = latest.offsetLeft - el.clientWidth + latest.offsetWidth + 24;
  }, []);

  return (
    <div className="cosmere">
      <p className="cosmere-count">
        <strong>{read}</strong> {ui.readCount[lang]} <em>{books[latestIndex]?.title}</em>.
      </p>

      <div className="cosmere-shelf" role="list" aria-label={ui.readingOrder[lang]} ref={shelf}>
        {legs(books).map((leg, li) => (
          <div className="cosmere-leg" data-world={leg.world} key={`${leg.world}-${li}`} role="presentation">
            <span className="cosmere-world">{leg.world}</span>
            <div className="cosmere-spines">
              {leg.books.map(({ book: b, index }) => (
                <div role="listitem" key={b.title} className="spine-slot">
                  <button
                    type="button"
                    className="spine"
                    data-kind={b.kind}
                    data-status={b.status}
                    aria-pressed={selected === index}
                    aria-controls={panelId}
                    onClick={() => setSelected(index)}
                    onMouseEnter={() => setSelected(index)}
                    onFocus={() => setSelected(index)}
                  >
                    <span className="spine-flame" aria-hidden="true" />
                    <span className="spine-title" aria-hidden={b.spine ? true : undefined}>
                      {b.spine ?? b.title}
                    </span>
                    {b.spine && <span className="visually-hidden">{b.title}</span>}
                    <span className="visually-hidden">
                      , {kind(b)}, {status(b)}
                    </span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="cosmere-swipe" aria-hidden="true">
        {ui.swipe[lang]}
      </p>

      <div className="cosmere-panel" id={panelId} aria-live="polite">
        <h2 className="cosmere-title">{book.title}</h2>
        <p className="cosmere-meta">
          <span>{book.series}</span>
          <span aria-hidden="true">·</span>
          <span>{book.world}</span>
          <span aria-hidden="true">·</span>
          <span>{kind(book)}</span>
          <span aria-hidden="true">·</span>
          <span>{status(book)}</span>
        </p>
        <p className="cosmere-blurb">{book.blurb[lang]}</p>
        <a href={book.href} target="_blank" rel="noopener noreferrer" className="text-link">
          {ui.official[lang]} <ArrowOutIcon />
        </a>
      </div>

      <p className="cosmere-foot">
        {ui.orderNote[lang]}{" "}
        <a href={cosmereAbout} target="_blank" rel="noopener noreferrer" className="text-link">
          {ui.whatIsCosmere[lang]} <ArrowOutIcon />
        </a>
      </p>
    </div>
  );
}
