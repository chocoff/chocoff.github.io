import type { L } from "./i18n";

export type Project = {
  id: string;
  title: string;
  /** One line: what it is. */
  summary: L;
  /** The problem it takes on. Only verified facts. */
  problem?: L;
  /** How it was built. */
  build?: L;
  stack: readonly string[];
  /** `light` images (diagrams on white) are dimmed harder so they never outshine the fire. */
  image: { src: string; alt: L; width: number; height: number; tone?: "light" };
  links: readonly { label: L; href: string; kind: "source" | "report" | "case" }[];
  featured?: boolean;
};

export const projects: readonly Project[] = [
  {
    id: "bci",
    title: "BCI for Game Control",
    summary: { en: "Turning EEG readings into 3D movement commands.", es: "Convierte lecturas de EEG en comandos de movimiento 3D." },
    build:
      { en: "EEG readings are interpreted with motor imagery and deep learning, then translated into movement commands for a 3D environment in Unity.", es: "Las lecturas de EEG se interpretan con imaginación motora y deep learning, y se traducen en comandos de movimiento para un entorno 3D en Unity." },
    stack: ["BCI", "Python", "Deep learning", "Unity"],
    image: { src: "/media/projects/bci.webp", alt: { en: "Diagram of the EEG headset, microcontroller and laptop pipeline", es: "Diagrama del casco EEG, el microcontrolador y la laptop" }, width: 542, height: 400, tone: "light" },
    links: [{ label: { en: "Read the report (PDF)", es: "Leer el informe (PDF)" }, href: "/docs/bci-report.pdf", kind: "report" }],
    featured: true,
  },
  {
    id: "java-engine",
    title: "3D Java Game Engine",
    summary: { en: "A 3D rendering pipeline written from scratch.", es: "Un pipeline de renderizado 3D escrito desde cero." },
    build: { en: "Custom rendering pipeline on LWJGL3 with hand-written GLSL shaders, in Java.", es: "Pipeline de renderizado propio sobre LWJGL3 con shaders GLSL escritos a mano, en Java." },
    stack: ["Java", "LWJGL3", "GLSL", "Game dev"],
    image: { src: "/media/projects/java-engine.webp", alt: { en: "Blackjack table rendered with the custom LWJGL engine", es: "Mesa de blackjack renderizada con el motor propio en LWJGL" }, width: 1366, height: 735 },
    links: [{ label: { en: "View source", es: "Ver código" }, href: "https://github.com/chocoff/lwjgl_blackjack", kind: "source" }],
    featured: true,
  },
  {
    id: "reforest-ai",
    title: "Reforest AI",
    summary: { en: "Satellite imagery and machine learning to find where reforestation helps most.", es: "Imágenes satelitales y machine learning para encontrar dónde reforestar ayuda más." },
    problem:
      { en: "Deforestation in Paraguay's Chaco, driven by agricultural expansion and wildfires, is hard to track at the speed it happens.", es: "La deforestación en el Chaco paraguayo, impulsada por la expansión agrícola y los incendios, es difícil de seguir al ritmo en que ocurre." },
    build:
      { en: "A CNN classifies forest cover in Sentinel-2 imagery, then a second phase compares image pairs with NDVI channels to predict vegetation change.", es: "Una CNN clasifica la cobertura forestal en imágenes de Sentinel-2; una segunda fase compara pares de imágenes con canales NDVI para predecir cambios en la vegetación." },
    stack: ["Python", "CNN", "NDVI", "Earth Engine"],
    image: { src: "/media/reforest/satelite1.webp", alt: { en: "Satellite view of cleared plots in Paraguay's Chaco", es: "Vista satelital de parcelas desmontadas en el Chaco paraguayo" }, width: 657, height: 388 },
    links: [
      { label: { en: "Read the write-up", es: "Leer el artículo" }, href: "/projects/reforest-ai/", kind: "case" },
      { label: { en: "View source", es: "Ver código" }, href: "https://github.com/chocoff/reforest-ai", kind: "source" },
    ],
    featured: true,
  },
  {
    id: "sigmachat",
    title: "SigmaChat",
    summary: { en: "Real-time chat with coding competitions built in, over low-latency Socket.io.", es: "Chat en tiempo real con competencias de programación integradas, sobre Socket.io de baja latencia." },
    stack: ["Flask", "MongoDB", "Socket.io"],
    image: { src: "/media/projects/sigmachat.webp", alt: { en: "SigmaChat interface", es: "Interfaz de SigmaChat" }, width: 1600, height: 807 },
    links: [{ label: { en: "View source", es: "Ver código" }, href: "https://github.com/chocoff/sigmachat", kind: "source" }],
  },
  {
    id: "skylimit",
    title: "SkyLimit",
    summary: { en: "A 2D endless jumper in C++ with SFML, built on OOP principles.", es: "Un juego 2D de salto infinito en C++ con SFML, basado en principios de POO." },
    stack: ["C++", "SFML", "Game dev"],
    image: { src: "/media/projects/skylimit.webp", alt: { en: "SkyLimit gameplay", es: "Partida de SkyLimit" }, width: 494, height: 442 },
    links: [{ label: { en: "View source", es: "Ver código" }, href: "https://github.com/pablolird/skylimit", kind: "source" }],
  },
  {
    id: "tower-of-the-forest",
    title: "Tower of the Forest",
    summary: { en: "A 2D tower defense with random enemy generation and a shop and upgrade system, in C++ with SFML.", es: "Un tower defense 2D con generación aleatoria de enemigos y un sistema de tienda y mejoras, en C++ con SFML." },
    stack: ["C++", "SFML", "Game dev"],
    image: { src: "/media/projects/tower-of-the-forest.webp", alt: { en: "Tower of the Forest gameplay", es: "Partida de Tower of the Forest" }, width: 645, height: 327 },
    links: [{ label: { en: "View source", es: "Ver código" }, href: "https://github.com/pablolird/Tower-of-the-Forest", kind: "source" }],
  },
];
