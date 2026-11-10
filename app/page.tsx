import FireStage from "@/components/FireStage";
import Intro from "@/components/Intro";
import Reveal from "@/components/Reveal";
import SigilNav from "@/components/SigilNav";
import { About, Cosmere, Footer, Hero, Journal, Path, Records, Rest, Works } from "@/components/Sections";
import { books } from "@/content/cosmere";
import { journey } from "@/content/journey";
import { projects } from "@/content/projects";
import { records } from "@/content/records";

const latest = books.find((b) => b.status === "latest");
const featuredCount = projects.filter((p) => p.featured).length;
const firstYear = journey[0]?.start.split(" ")[1];

const nav = [
  { id: "about", label: "About", preview: "Who I am, skills and interests", warmth: 0.85 },
  { id: "path", label: "Path", preview: `${journey.length} stops, ${firstYear} to today`, warmth: 0.65 },
  { id: "works", label: "Works", preview: `${projects.length} projects, ${featuredCount} in depth`, warmth: 0.55 },
  { id: "records", label: "Journal", preview: `${records.length} records, and the journal shelves`, warmth: 0.45 },
  { id: "cosmere", label: "Cosmere", preview: latest ? `Most recent: ${latest.title}` : "My reading path", warmth: 0.5 },
  { id: "contact", label: "Contact", preview: "Email, WhatsApp, résumé", warmth: 1 },
] as const;

export default function Home() {
  return (
    <>
      <FireStage />
      <Intro />
      <a className="skip-link" href="#about">
        Skip to content
      </a>
      <SigilNav items={nav} />
      <div className="hearth" aria-hidden="true" />
      <main className="page">
        <Hero />
        <About />
        <Path />
        <Works />
        <Records />
        <Journal />
        <Cosmere />
        <Rest />
      </main>
      <Footer />
      <Reveal />
    </>
  );
}
