import { records } from "@/content/records";
import { posts, upcoming } from "@/content/journal";
import { monthName } from "@/content/journey";
import { base, ui, type Lang } from "@/content/i18n";
import CosmerePath from "./CosmerePath";
import LangToggle from "./LangToggle";
import { Footer } from "./Sections";
import { ArrowOutIcon } from "./icons";

function formatDate(iso: string, lang: Lang) {
  const [y, m, d] = iso.split("-");
  const month = monthName(Number(m), lang);
  return d ? `${Number(d)} ${month} ${y}` : `${month} ${y}`;
}

function Shell({ lang, path, title, sub, children }: { lang: Lang; path: string; title: string; sub: string; children: React.ReactNode }) {
  return (
    <>
      <LangToggle lang={lang} path={path} />
      <main className="subpage">
        <a className="text-link subpage-back" href={`${base(lang)}/#more`}>
          ← {ui.backToFire[lang]}
        </a>
        <h1 className="section-title">{title}</h1>
        <p className="section-sub">{sub}</p>
        {children}
      </main>
      <Footer lang={lang} />
    </>
  );
}

export function JournalPage({ lang }: { lang: Lang }) {
  const sorted = [...records].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <Shell lang={lang} path="/journal/" title={ui.journalTitle[lang]} sub={ui.journalSub[lang]}>
      <h2 className="minor-title subpage-h">{ui.recordsTitle[lang]}</h2>
      <ol className="ledger">
        {sorted.map((r) => (
          <li key={r.href} className="ledger-row">
            <time className="ledger-date" dateTime={r.date}>
              {formatDate(r.date, lang)}
            </time>
            <div className="ledger-text">
              <h3 lang={r.lang}>
                <a href={r.href} target="_blank" rel="noopener noreferrer">
                  {r.title}
                </a>
              </h3>
              <p>{r.summary[lang]}</p>
            </div>
            <p className="ledger-source">
              {r.source} <ArrowOutIcon />
            </p>
          </li>
        ))}
      </ol>

      <h2 className="minor-title subpage-h">{ui.notesTitle[lang]}</h2>
      {posts.length > 0 ? (
        <ol className="ledger">
          {posts.map((p) => (
            <li key={p.href} className="ledger-row">
              <time className="ledger-date" dateTime={p.date}>
                {formatDate(p.date, lang)}
              </time>
              <div className="ledger-text">
                <h3>
                  <a href={p.href}>{p.title[lang]}</a>
                </h3>
                <p>{p.summary[lang]}</p>
              </div>
            </li>
          ))}
        </ol>
      ) : (
        <p className="subpage-later">
          {ui.shelvesLater[lang]} {upcoming.map((u) => u[lang]).join(" · ")}
        </p>
      )}
    </Shell>
  );
}

export function ReadingPage({ lang }: { lang: Lang }) {
  return (
    <Shell lang={lang} path="/reading/" title={ui.readingTitle[lang]} sub={ui.readingSub[lang]}>
      <div className="subpage-body">
        <CosmerePath lang={lang} />
      </div>
    </Shell>
  );
}
