import type { L } from "./i18n";

/**
 * Everything that changes when your situation changes lives here.
 * Edit `status` and redeploy; the hero and metadata read from it.
 * Each text has an English (`en`) and a Spanish (`es`) version.
 */
export const site = {
  name: "Fernando Rojas",
  alias: "Choco",
  url: "https://chocoff.github.io",
  role: { en: "Software Developer", es: "Desarrollador de Software" } as L,
  description: {
    en: "Choco (Fernando Rojas), Paraguayan software developer working with clients end to end. Game systems, graphics and AI pipelines, built from scratch.",
    es: "Choco (Fernando Rojas), desarrollador de software paraguayo que trabaja con clientes de punta a punta. Sistemas de juego, gráficos y pipelines de IA, hechos desde cero.",
  } as L,

  status: {
    /** One short line, shown under the name. */
    headline: {
      en: "Software Developer & Client Management at Dualtti",
      es: "Desarrollador de Software y Gestión de Clientes en Dualtti",
    } as L,
    /** Supporting line. Keep it to one sentence. */
    detail: {
      en: "I design and build software, and work directly with clients to turn what they need into products that ship. Computer Science and Information Engineering student.",
      es: "Diseño y desarrollo software, y trabajo directamente con clientes para convertir lo que necesitan en productos que funcionan. Estudiante de Ciencias de la Computación e Ingeniería Informática.",
    } as L,
  },

  intro: {
    en: "Born in Paraguay, I studied at UPTP and spent an exchange at Taiwan Tech (NTUST). I like building things from the ground up: game systems, rendering pipelines, and AI tools that do real work.",
    es: "Nací en Paraguay, estudié en la UPTP e hice un intercambio en Taiwan Tech (NTUST). Me gusta construir las cosas desde la base: sistemas de juego, pipelines de renderizado y herramientas de IA que hacen trabajo real.",
  } as L,
};

export const contact = {
  email: "rojasmfer@proton.me",
  whatsapp: "https://wa.me/595981133155",
  resume: "/docs/fernando-rojas-resume.pdf",
  linkedin: "https://www.linkedin.com/in/fernando-rojaschoco",
  github: "https://github.com/chocoff",
} as const;

/** Shown one at a time in the About section while the bonfire turns. */
export const skills: readonly { group: L; items: readonly string[] }[] = [
  { group: { en: "Languages", es: "Lenguajes" }, items: ["C++", "C#", "Python", "Java"] },
  { group: { en: "Graphics & games", es: "Gráficos y juegos" }, items: ["OpenGL / GLSL", "LWJGL3", "SFML", "Unity"] },
  { group: { en: "AI & data", es: "IA y datos" }, items: ["Deep learning", "RAG pipelines", "Docling", "RASA", "Earth Engine"] },
  { group: { en: "Tooling", es: "Herramientas" }, items: ["Docker", "Flask", "MongoDB", "Socket.io"] },
];

export const interests: readonly L[] = [
  { en: "Low-level programming", es: "Programación de bajo nivel" },
  { en: "Game development", es: "Desarrollo de videojuegos" },
  { en: "Computer graphics", es: "Gráficos por computadora" },
  { en: "Souls-like games", es: "Juegos souls-like" },
  { en: "Fantasy books", es: "Libros de fantasía" },
];
