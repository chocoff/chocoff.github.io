import fs from "node:fs";
import path from "node:path";
import FireStage from "./FireStage";
import Intro from "./Intro";
import Reveal from "./Reveal";
import SigilNav, { type NavItem } from "./SigilNav";
import LangToggle from "./LangToggle";
import AboutPinned from "./AboutPinned";
import PathTrack from "./PathTrack";
import { Beyond, Footer, Hero, Rest, Works } from "./Sections";
import { journey } from "@/content/journey";
import { projects } from "@/content/projects";
import { ui, type Lang } from "@/content/i18n";

/** True when a bonfire model has been dropped into public/models/. Checked at build time. */
export const hasModel = () => fs.existsSync(path.join(process.cwd(), "public", "models", "bonfire.glb"));

export default function HomePage({ lang }: { lang: Lang }) {
  const model = hasModel();
  const featured = projects.filter((p) => p.featured).length;
  const en = lang === "en";
  const nav: NavItem[] = [
    { id: "about", label: ui.navAbout[lang], preview: en ? "Who I am and what I work with" : "Quién soy y con qué trabajo", warmth: 0.9 },
    { id: "path", label: ui.navPath[lang], preview: en ? `${journey.length} stops, ${journey[0].start[0]} to today` : `${journey.length} paradas, de ${journey[0].start[0]} a hoy`, warmth: 0.6 },
    { id: "works", label: ui.navWorks[lang], preview: en ? `${projects.length} projects, ${featured} in depth` : `${projects.length} proyectos, ${featured} a fondo`, warmth: 0.55 },
    { id: "more", label: ui.navMore[lang], preview: en ? "Journal, records and reading" : "Bitácora, registros y lecturas", warmth: 0.5 },
    { id: "contact", label: ui.navContact[lang], preview: en ? "Email, WhatsApp, résumé" : "Correo, WhatsApp, currículum", warmth: 1 },
  ];

  return (
    <>
      <FireStage hasModel={model} />
      <Intro lang={lang} />
      <a className="skip-link" href="#about">
        {ui.skipContent[lang]}
      </a>
      <LangToggle lang={lang} path="/" />
      <SigilNav items={nav} label={ui.navLabel[lang]} homeLabel={ui.backToTop[lang]} />
      <div className="hearth" aria-hidden="true" />
      <main className="page">
        <Hero lang={lang} />
        <AboutPinned lang={lang} />
        <PathTrack lang={lang} />
        <Works lang={lang} />
        <Beyond lang={lang} />
        <Rest lang={lang} />
      </main>
      <Footer lang={lang} hasModel={model} home />
      <Reveal />
    </>
  );
}
