import Image from "next/image";
import { site } from "@/content/site";
import { projects } from "@/content/projects";
import { records } from "@/content/records";
import { books } from "@/content/cosmere";
import { base, ui, type Lang } from "@/content/i18n";
import ContactRail from "./ContactRail";
import { ArrowOutIcon } from "./icons";

export function Hero({ lang }: { lang: Lang }) {
  return (
    <header className="hero" id="top">
      <div className="hero-inner">
        <h1 className="hero-title" id="hero-title" tabIndex={-1}>
          <span className="hero-name">{site.alias}</span>
          <span className="hero-alias">{site.name}</span>
        </h1>
        <p className="hero-status">
          <span className="status-dot" aria-hidden="true" />
          {site.status.headline[lang]}
        </p>
        <p className="hero-detail">{site.status.detail[lang]}</p>
        <ContactRail lang={lang} />
      </div>
    </header>
  );
}

export function Works({ lang }: { lang: Lang }) {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);
  const ext = (href: string) => (href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {});
  return (
    <section className="section works" id="works" aria-labelledby="works-h">
      <div className="section-head">
        <h2 className="section-title" id="works-h" data-reveal>
          {ui.worksTitle[lang]}
        </h2>
        <p className="section-sub" data-reveal>
          {ui.worksSub[lang]}
        </p>
      </div>

      <div className="works-featured">
        {featured.map((p, i) => (
          <article className="work" key={p.id} data-flip={i % 2 ? "" : undefined} data-reveal>
            <div className="work-image" data-tone={p.image.tone}>
              <Image src={p.image.src} alt={p.image.alt[lang]} width={p.image.width} height={p.image.height} sizes="(max-width: 900px) 100vw, 58vw" />
            </div>
            <div className="work-text">
              <h3 className="work-title">{p.title}</h3>
              <p className="work-summary">{p.summary[lang]}</p>
              <dl className="work-facts">
                {p.problem && (
                  <div>
                    <dt>{ui.problem[lang]}</dt>
                    <dd>{p.problem[lang]}</dd>
                  </div>
                )}
                {p.build && (
                  <div>
                    <dt>{ui.build[lang]}</dt>
                    <dd>{p.build[lang]}</dd>
                  </div>
                )}
                <div>
                  <dt>{ui.stack[lang]}</dt>
                  <dd className="stack">{p.stack.join(" · ")}</dd>
                </div>
              </dl>
              <p className="work-links">
                {p.links.map((l) => (
                  <a key={l.href} className={l.kind === "source" ? "text-link" : "action action--fire action--small"} href={l.href} {...ext(l.href)}>
                    {l.label[lang]}
                    {l.kind === "case" && ui.inEnglish[lang]}
                    {l.href.startsWith("http") && <ArrowOutIcon />}
                  </a>
                ))}
              </p>
            </div>
          </article>
        ))}
      </div>

      <h3 className="minor-title works-more-title" data-reveal>
        {ui.alsoBuilt[lang]}
      </h3>
      <ul className="works-more">
        {rest.map((p) => (
          <li key={p.id} className="work-row" data-reveal>
            <div className="work-row-thumb">
              <Image src={p.image.src} alt="" width={p.image.width} height={p.image.height} sizes="160px" />
            </div>
            <div className="work-row-text">
              <h4>{p.title}</h4>
              <p>{p.summary[lang]}</p>
              <p className="stack">{p.stack.join(" · ")}</p>
            </div>
            {p.links.map((l) => (
              <a key={l.href} className="text-link work-row-link" href={l.href} target="_blank" rel="noopener noreferrer">
                {l.label[lang]} <ArrowOutIcon />
                <span className="visually-hidden"> {p.title}</span>
              </a>
            ))}
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Two quiet doors to the side rooms. Nothing here competes with the work. */
export function Beyond({ lang }: { lang: Lang }) {
  const latest = books.find((b) => b.status === "latest");
  const read = books.filter((b) => b.status !== "planned").length;
  const doors = [
    {
      href: `${base(lang)}/journal/`,
      name: ui.journalDoor[lang],
      note: lang === "en" ? `${records.length} public records, each with its source` : `${records.length} registros públicos, cada uno con su fuente`,
    },
    {
      href: `${base(lang)}/reading/`,
      name: ui.readingDoor[lang],
      note: lang === "en" ? `${read} Cosmere books. Latest: ${latest?.title}` : `${read} libros del Cosmere. El último: ${latest?.title}`,
    },
  ];
  return (
    <section className="section beyond" id="more" aria-labelledby="more-h">
      <h2 className="minor-title" id="more-h" data-reveal>
        {ui.moreTitle[lang]}
      </h2>
      <ul className="doors">
        {doors.map((d) => (
          <li key={d.href} data-reveal>
            <a className="door" href={d.href}>
              <span className="door-name">{d.name}</span>
              <span className="door-note">{d.note}</span>
              <span className="door-go" aria-hidden="true">
                →
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Rest({ lang }: { lang: Lang }) {
  return (
    <section className="section rest" id="contact" aria-labelledby="contact-h">
      <div className="rest-inner" data-reveal>
        <h2 className="section-title" id="contact-h">
          {ui.restTitle[lang]}
        </h2>
        <p className="lede">{ui.restLede[lang]}</p>
        <ContactRail lang={lang} size="large" />
      </div>
    </section>
  );
}

export function Footer({ lang, hasModel, home = false }: { lang: Lang; hasModel?: boolean; home?: boolean }) {
  return (
    <footer className="footer">
      <p>
        © {new Date().getFullYear()} {site.alias} · {site.name}.
        {hasModel && (
          <>
            {" "}
            {ui.modelCredit[lang]}{" "}
            <a href="https://sketchfab.com/3d-models/dark-souls-bonfire-b0d68c8f4cd0487da3d1fb8327ab1044" target="_blank" rel="noopener noreferrer">
              “Dark Souls - Bonfire”
            </a>{" "}
            · UselessViking ·{" "}
            <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer">
              CC BY 4.0
            </a>
            .
          </>
        )}
      </p>
      <a href={home ? "#top" : `${base(lang)}/`} className="text-link">
        {ui.backToFire[lang]}
      </a>
    </footer>
  );
}
