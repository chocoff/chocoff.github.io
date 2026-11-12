import type { L } from "./i18n";

export type Stop = {
  id: string;
  kind: "study" | "work";
  place: string;
  placeLong?: string;
  role: L;
  /** [year, month] — month is 1-12. `end: null` means present. */
  start: [number, number];
  end: [number, number] | null;
  location?: L;
  summary: L;
  url: string;
  logo: { src: string; width: number; height: number; wide?: boolean };
  /** A photo from that stop, 4:5. */
  photo?: { src: string; alt: L };
};

/** Oldest first. The path is drawn in this order. */
export const journey: readonly Stop[] = [
  {
    id: "uptp",
    kind: "study",
    place: "UPTP",
    placeLong: "Universidad Politécnica Taiwán-Paraguay",
    role: { en: "B.S. Computer Science and Information Engineering", es: "Lic. en Ciencias de la Computación e Ingeniería Informática" },
    start: [2023, 3],
    end: [2024, 12],
    location: { en: "Paraguay", es: "Paraguay" },
    summary: {
      en: "Started the degree in Paraguay. Coursework across UPTP and NTUST: data structures, OOP, AI/ML, operating systems, networks.",
      es: "Empecé la carrera en Paraguay. Materias entre la UPTP y NTUST: estructuras de datos, POO, IA/ML, sistemas operativos, redes.",
    },
    url: "https://www.uptp.edu.py/",
    logo: { src: "/media/logos/uptp.png", width: 257, height: 75, wide: true },
  },
  {
    id: "cast",
    kind: "work",
    place: "Cast S.A.",
    role: { en: "Software Engineering Intern", es: "Pasante de Ingeniería de Software" },
    start: [2024, 12],
    end: [2025, 2],
    summary: {
      en: "Developed RASA-based AI conversational agents to automate client support workflows.",
      es: "Desarrollé agentes conversacionales de IA con RASA para automatizar flujos de atención al cliente.",
    },
    url: "https://cast.com.py/",
    logo: { src: "/media/logos/cast.svg", width: 64, height: 64 },
    photo: {
      src: "/media/path/cast.webp",
      alt: { en: "Choco holding his internship certificate at Cast", es: "Choco con su certificado de pasantía en Cast" },
    },
  },
  {
    id: "ntust",
    kind: "study",
    place: "NTUST",
    placeLong: "National Taiwan University of Science and Technology (Taiwan Tech)",
    role: { en: "Exchange program, Computer Science and Information Engineering", es: "Programa de intercambio, Ciencias de la Computación e Ingeniería Informática" },
    start: [2025, 2],
    end: [2026, 6],
    location: { en: "Taipei, Taiwan", es: "Taipéi, Taiwán" },
    summary: {
      en: "Continued the degree in Taipei through the UPTP and Taiwan Tech program.",
      es: "Continué la carrera en Taipéi mediante el programa entre la UPTP y Taiwan Tech.",
    },
    url: "https://www.ntust.edu.tw/",
    logo: { src: "/media/logos/ntust.png", width: 415, height: 80, wide: true },
    photo: {
      src: "/media/path/ntust.webp",
      alt: { en: "Choco at Taiwan Tech holding two awards for the BCI project", es: "Choco en Taiwan Tech con dos premios por el proyecto BCI" },
    },
  },
  {
    id: "reekon",
    kind: "work",
    place: "REEKON",
    role: { en: "AI Engineering Intern", es: "Pasante de Ingeniería de IA" },
    start: [2026, 5],
    end: [2026, 6],
    summary: {
      en: "Refactored and implemented a new Retrieval-Augmented Generation pipeline with diverse document chunking strategies and Docling.",
      es: "Refactoricé e implementé un nuevo pipeline de Retrieval-Augmented Generation con distintas estrategias de segmentación de documentos y Docling.",
    },
    url: "https://reekon.org/",
    logo: { src: "/media/logos/reekon.png", width: 152, height: 32, wide: true },
  },
  {
    id: "igs",
    kind: "work",
    place: "International Games System",
    role: { en: "Software Engineering Intern, Arcade Department", es: "Pasante de Ingeniería de Software, Departamento de Arcade" },
    start: [2026, 6],
    end: [2026, 8],
    location: { en: "New Taipei, Taiwan", es: "Nuevo Taipéi, Taiwán" },
    summary: {
      en: "Developed and implemented the third stage of an arcade IP, including its boss fight and weather mechanics, and presented the results on the arcade machines themselves.",
      es: "Desarrollé e implementé la tercera etapa de una IP de arcade, con su pelea de jefe y sus mecánicas de clima, y presenté los resultados en las propias máquinas.",
    },
    url: "https://www.igs.com.tw/en/",
    logo: { src: "/media/logos/igs.png", width: 140, height: 100 },
    photo: {
      src: "/media/path/igs.webp",
      alt: { en: "Choco in the IGS lobby, next to an arcade character statue", es: "Choco en el vestíbulo de IGS, junto a la estatua de un personaje de arcade" },
    },
  },
  {
    id: "dualtti",
    kind: "work",
    place: "Dualtti",
    role: { en: "Software Developer & Client Management", es: "Desarrollador de Software y Gestión de Clientes" },
    start: [2026, 9],
    end: null,
    location: { en: "Paraguay", es: "Paraguay" },
    summary: {
      en: "Building software for clients and owning the relationship end to end: understanding what they need, scoping it, delivering it and following up.",
      es: "Desarrollo software para clientes y llevo la relación de punta a punta: entender lo que necesitan, definir el alcance, entregarlo y darle seguimiento.",
    },
    url: "https://dualtti.com/",
    logo: { src: "/media/logos/dualtti.png", width: 256, height: 256 },
  },
];

const MONTHS: Record<"en" | "es", readonly string[]> = {
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  es: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
};
export const monthYear = ([y, m]: [number, number], lang: "en" | "es") => `${MONTHS[lang][m - 1]} ${y}`;
export const monthName = (m: number, lang: "en" | "es") => MONTHS[lang][m - 1];
