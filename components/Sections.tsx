import Image from "next/image";
import { site, skills, interests } from "@/content/site";
import { journey } from "@/content/journey";
import { projects } from "@/content/projects";
import { records } from "@/content/records";
import { posts, shelves } from "@/content/journal";
import ContactRail from "./ContactRail";
import CosmerePath from "./CosmerePath";
import { ArrowOutIcon, BonfireMark } from "./icons";

export function Hero() {
  return (
    <header className="hero" id="top">
      <div className="hero-inner">
        <h1 className="hero-title" id="hero-title" tabIndex={-1}>
          <span className="hero-name">{site.name}</span>
          <span className="hero-alias">
            <span className="hero-aka">also known as</span> {site.alias}
          </span>
        </h1>
        <p className="hero-status">
          <span className="status-dot" aria-hidden="true" />
          {site.status.headline}
        </p>
        <p className="hero-detail">{site.status.detail}</p>
        <ContactRail />
      </div>
    </header>
  );
}

export function About() {
  return (
    <section className="section about" id="about" aria-labelledby="about-h">
      <div className="about-grid">
        <figure className="about-portrait" data-reveal>
          <Image src="/media/portrait.webp" alt="Fernando Rojas" width={900} height={1200} sizes="(max-width: 800px) 70vw, 360px" />
        </figure>
        <div className="about-text">
          <h2 className="section-title" id="about-h" data-reveal>
            By the fire
          </h2>
          <p className="lede" data-reveal>
            {site.intro}
          </p>
          <div className="about-lists" data-reveal>
            <div>
              <h3 className="minor-title">Skills</h3>
              <dl className="skills">
                {skills.map((s) => (
                  <div key={s.group}>
                    <dt>{s.group}</dt>
                    <dd>{s.items.join(", ")}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div>
              <h3 className="minor-title">Interests</h3>
              <ul className="interests">
                {interests.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Path() {
  return (
    <section className="section path" id="path" aria-labelledby="path-h">
      <div className="section-head">
        <h2 className="section-title" id="path-h" data-reveal>
          The path so far
        </h2>
        <p className="section-sub" data-reveal>
          Every place I&apos;ve studied and worked, from the first semester in Paraguay to today.
        </p>
      </div>
      <ol className="path-list">
        {journey.map((s, i) => (
          <li key={s.id} className="stop" data-kind={s.kind} data-side={i % 2 ? "right" : "left"} data-current={s.end === null || undefined} data-reveal>
            <span className="stop-fire">
              <BonfireMark />
            </span>
            <article className="stop-body">
              <a className="stop-logo" href={s.url} target="_blank" rel="noopener noreferrer" data-wide={s.logo.wide || undefined}>
                <Image src={s.logo.src} alt={`${s.placeLong ?? s.place} logo`} width={s.logo.width} height={s.logo.height} />
              </a>
              <h3 className="stop-place">{s.place}</h3>
              {s.placeLong && <p className="stop-place-long">{s.placeLong}</p>}
              <p className="stop-role">{s.role}</p>
              <p className="stop-when">
                <time>{s.start}</time> – {s.end ? <time>{s.end}</time> : <strong>present</strong>}
                <span className="stop-kind">{s.kind === "study" ? "Study" : "Work"}</span>
              </p>
              <p className="stop-summary">{s.summary}</p>
              <p className="stop-foot">
                {s.location && <span>{s.location}</span>}
                <a className="text-link" href={s.url} target="_blank" rel="noopener noreferrer">
                  {new URL(s.url).hostname.replace(/^www\./, "")} <ArrowOutIcon />
                </a>
              </p>
            </article>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function Works() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);
  return (
    <section className="section works" id="works" aria-labelledby="works-h">
      <div className="section-head">
        <h2 className="section-title" id="works-h" data-reveal>
          Built from scratch
        </h2>
        <p className="section-sub" data-reveal>
          Engines, games and models where I wrote the parts most people import.
        </p>
      </div>

      <div className="works-featured">
        {featured.map((p, i) => (
          <article className="work" key={p.id} data-flip={i % 2 ? "" : undefined} data-reveal>
            <div className="work-image" data-tone={p.image.tone}>
              <Image src={p.image.src} alt={p.image.alt} width={p.image.width} height={p.image.height} sizes="(max-width: 900px) 100vw, 58vw" />
            </div>
            <div className="work-text">
              <h3 className="work-title">{p.title}</h3>
              <p className="work-summary">{p.summary}</p>
              <dl className="work-facts">
                {p.problem && (
                  <div>
                    <dt>Problem</dt>
                    <dd>{p.problem}</dd>
                  </div>
                )}
                {p.build && (
                  <div>
                    <dt>Build</dt>
                    <dd>{p.build}</dd>
                  </div>
                )}
                <div>
                  <dt>Stack</dt>
                  <dd className="stack">{p.stack.join(" · ")}</dd>
                </div>
              </dl>
              <p className="work-links">
                {p.links.map((l) => (
                  <a
                    key={l.href}
                    className={l.kind === "source" ? "text-link" : "action action--fire action--small"}
                    href={l.href}
                    {...(l.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    {l.label}
                    {l.href.startsWith("http") && <ArrowOutIcon />}
                  </a>
                ))}
              </p>
            </div>
          </article>
        ))}
      </div>

      <h3 className="minor-title works-more-title" data-reveal>
        Also built
      </h3>
      <ul className="works-more">
        {rest.map((p) => (
          <li key={p.id} className="work-row" data-reveal>
            <div className="work-row-thumb">
              <Image src={p.image.src} alt="" width={p.image.width} height={p.image.height} sizes="160px" />
            </div>
            <div className="work-row-text">
              <h4>{p.title}</h4>
              <p>{p.summary}</p>
              <p className="stack">{p.stack.join(" · ")}</p>
            </div>
            {p.links.map((l) => (
              <a key={l.href} className="text-link work-row-link" href={l.href} target="_blank" rel="noopener noreferrer">
                {l.label} <ArrowOutIcon />
                <span className="visually-hidden"> for {p.title}</span>
              </a>
            ))}
          </li>
        ))}
      </ul>
    </section>
  );
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function formatDate(iso: string) {
  const [y, m, d] = iso.split("-");
  const month = MONTHS[Number(m) - 1];
  return d ? `${Number(d)} ${month} ${y}` : `${month} ${y}`;
}

export function Records() {
  const sorted = [...records].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <section className="section records" id="records" aria-labelledby="records-h">
      <div className="section-head">
        <h2 className="section-title" id="records-h" data-reveal>
          Records
        </h2>
        <p className="section-sub" data-reveal>
          Milestones that someone else wrote down. Each one links to its source.
        </p>
      </div>
      <ol className="ledger">
        {sorted.map((r) => (
          <li key={r.href} className="ledger-row" data-reveal>
            <time className="ledger-date" dateTime={r.date}>
              {formatDate(r.date)}
            </time>
            <div className="ledger-text">
              <h3 lang={r.lang}>
                <a href={r.href} target="_blank" rel="noopener noreferrer">
                  {r.title}
                </a>
              </h3>
              <p>{r.summary}</p>
            </div>
            <p className="ledger-source">
              {r.source} <ArrowOutIcon />
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function Journal() {
  return (
    <section className="section journal" id="journal" aria-labelledby="journal-h">
      <div className="section-head">
        <h2 className="section-title" id="journal-h" data-reveal>
          Journal
        </h2>
        <p className="section-sub" data-reveal>
          Not a blog of hot takes. A record of the road: what I learn, build and read. Two shelves are already full; the
          rest open as I write.
        </p>
      </div>
      <ul className="shelves">
        {shelves.map((s) => {
          const count = posts.filter((p) => p.shelf === s.id).length;
          const filled = Boolean(s.href) || count > 0;
          return (
            <li key={s.id} className="shelf" data-filled={filled || undefined} data-reveal>
              <h3 className="shelf-name">
                {s.href ? <a href={s.href}>{s.name}</a> : s.name}
              </h3>
              <p className="shelf-holds">{s.holds}</p>
              <p className="shelf-state">
                {s.href ? "Open" : count > 0 ? `${count} ${count === 1 ? "entry" : "entries"}` : "First entry coming"}
              </p>
            </li>
          );
        })}
      </ul>
      {posts.length > 0 && (
        <ol className="ledger journal-posts">
          {posts.map((p) => (
            <li key={p.href} className="ledger-row">
              <time className="ledger-date" dateTime={p.date}>
                {formatDate(p.date)}
              </time>
              <div className="ledger-text">
                <h3>
                  <a href={p.href}>{p.title}</a>
                </h3>
                <p>{p.summary}</p>
              </div>
              <p className="ledger-source">{shelves.find((s) => s.id === p.shelf)?.name}</p>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}

export function Cosmere() {
  return (
    <section className="section cosmere-section" id="cosmere" aria-labelledby="cosmere-h">
      <div className="section-head">
        <h2 className="section-title" id="cosmere-h" data-reveal>
          Through the Cosmere
        </h2>
        <p className="section-sub" data-reveal>
          Off the clock I read Brandon Sanderson. This is my path through his universe, one flame per book.
        </p>
      </div>
      <div data-reveal>
        <CosmerePath />
      </div>
    </section>
  );
}

export function Rest() {
  return (
    <section className="section rest" id="contact" aria-labelledby="contact-h">
      <div className="rest-inner" data-reveal>
        <span className="rest-fire" aria-hidden="true">
          <BonfireMark />
        </span>
        <h2 className="section-title" id="contact-h">
          Sit by the fire a while
        </h2>
        <p className="lede">
          I&apos;m happy to talk about roles, collaborations, games, or the last book you read. Email or WhatsApp, whichever suits you.
        </p>
        <ContactRail size="large" />
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <p>
        © {new Date().getFullYear()} {site.name}. Built from scratch with Next.js and a WebGPU bonfire.
      </p>
      <a href="#top" className="text-link">
        Back to the fire
      </a>
    </footer>
  );
}
