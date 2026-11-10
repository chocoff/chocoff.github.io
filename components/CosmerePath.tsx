"use client";

import { useEffect, useId, useRef, useState } from "react";
import { books, cosmereAbout, type Book } from "@/content/cosmere";
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

export default function CosmerePath() {
  const latestIndex = Math.max(0, books.findIndex((b) => b.status === "latest"));
  const [selected, setSelected] = useState(latestIndex);
  const panelId = useId();
  const shelf = useRef<HTMLDivElement>(null);

  // On narrow screens the shelf scrolls; start with the latest flame in view.
  useEffect(() => {
    const el = shelf.current;
    if (!el || el.scrollWidth <= el.clientWidth) return;
    const latest = el.querySelector<HTMLElement>('[data-status="latest"]');
    if (latest) el.scrollLeft = latest.offsetLeft - el.clientWidth + latest.offsetWidth + 24;
  }, []);
  const book = books[selected];
  const read = books.filter((b) => b.status !== "planned").length;

  return (
    <div className="cosmere">
      <p className="cosmere-count">
        <strong>{read}</strong> books, novellas and stories so far. The most recent flame:{" "}
        <em>{books[latestIndex]?.title}</em>.
      </p>

      <div className="cosmere-shelf" role="list" aria-label="Reading order" ref={shelf}>
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
                    <span className="spine-title" aria-hidden={b.spine ? true : undefined}>{b.spine ?? b.title}</span>
                    {b.spine && <span className="visually-hidden">{b.title}</span>}
                    <span className="visually-hidden">
                      , {b.kind}, {b.status === "latest" ? "most recent read" : b.status === "read" ? "read" : "planned"}
                    </span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="cosmere-swipe" aria-hidden="true">
        Swipe the shelf: {books.length} books, oldest on the left
      </p>

      <div className="cosmere-panel" id={panelId} aria-live="polite">
        <h3 className="cosmere-title">{book.title}</h3>
        <p className="cosmere-meta">
          <span>{book.series}</span>
          <span aria-hidden="true">·</span>
          <span>{book.world}</span>
          <span aria-hidden="true">·</span>
          <span className="cap">{book.kind}</span>
          <span aria-hidden="true">·</span>
          <span>{book.status === "latest" ? "Most recent" : book.status === "read" ? "Read" : "Planned"}</span>
        </p>
        <p className="cosmere-blurb">{book.blurb}</p>
        <a href={book.href} target="_blank" rel="noopener noreferrer" className="text-link">
          On brandonsanderson.com <ArrowOutIcon />
        </a>
      </div>

      <p className="cosmere-foot">
        Reading order is my own, not publication order. New to it?{" "}
        <a href={cosmereAbout} target="_blank" rel="noopener noreferrer" className="text-link">
          What is the Cosmere <ArrowOutIcon />
        </a>
      </p>
    </div>
  );
}
