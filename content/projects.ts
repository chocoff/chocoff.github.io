export type Project = {
  id: string;
  title: string;
  /** One line: what it is. */
  summary: string;
  /** The problem it takes on. Only verified facts. */
  problem?: string;
  /** How it was built. */
  build?: string;
  stack: readonly string[];
  /** `light` images (diagrams on white) are dimmed harder so they never outshine the fire. */
  image: { src: string; alt: string; width: number; height: number; tone?: "light" };
  links: readonly { label: string; href: string; kind: "source" | "report" | "case" }[];
  featured?: boolean;
};

export const projects: readonly Project[] = [
  {
    id: "bci",
    title: "BCI for Game Control",
    summary: "Turning EEG readings into 3D movement commands.",
    build:
      "EEG readings are interpreted with motor imagery and deep learning, then translated into movement commands for a 3D environment in Unity.",
    stack: ["BCI", "Python", "Deep learning", "Unity"],
    image: { src: "/media/projects/bci.webp", alt: "Diagram of the EEG headset, microcontroller and laptop pipeline", width: 542, height: 400, tone: "light" },
    links: [{ label: "Read the report (PDF)", href: "/docs/bci-report.pdf", kind: "report" }],
    featured: true,
  },
  {
    id: "java-engine",
    title: "3D Java Game Engine",
    summary: "A 3D rendering pipeline written from scratch.",
    build: "Custom rendering pipeline on LWJGL3 with hand-written GLSL shaders, in Java.",
    stack: ["Java", "LWJGL3", "GLSL", "Game dev"],
    image: { src: "/media/projects/java-engine.webp", alt: "Blackjack table rendered with the custom LWJGL engine", width: 1366, height: 735 },
    links: [{ label: "View source", href: "https://github.com/chocoff/lwjgl_blackjack", kind: "source" }],
    featured: true,
  },
  {
    id: "reforest-ai",
    title: "Reforest AI",
    summary: "Satellite imagery and machine learning to find where reforestation helps most.",
    problem:
      "Deforestation in Paraguay's Chaco, driven by agricultural expansion and wildfires, is hard to track at the speed it happens.",
    build:
      "A CNN classifies forest cover in Sentinel-2 imagery, then a second phase compares image pairs with NDVI channels to predict vegetation change.",
    stack: ["Python", "CNN", "NDVI", "Earth Engine"],
    image: { src: "/media/reforest/satelite1.webp", alt: "Satellite view of cleared plots in Paraguay's Chaco", width: 657, height: 388 },
    links: [
      { label: "Read the write-up", href: "/projects/reforest-ai/", kind: "case" },
      { label: "View source", href: "https://github.com/chocoff/reforest-ai", kind: "source" },
    ],
    featured: true,
  },
  {
    id: "sigmachat",
    title: "SigmaChat",
    summary: "Real-time chat with coding competitions built in, over low-latency Socket.io.",
    stack: ["Flask", "MongoDB", "Socket.io"],
    image: { src: "/media/projects/sigmachat.webp", alt: "SigmaChat interface", width: 1600, height: 807 },
    links: [{ label: "View source", href: "https://github.com/chocoff/sigmachat", kind: "source" }],
  },
  {
    id: "skylimit",
    title: "SkyLimit",
    summary: "A 2D endless jumper in C++ with SFML, built on OOP principles.",
    stack: ["C++", "SFML", "Game dev"],
    image: { src: "/media/projects/skylimit.webp", alt: "SkyLimit gameplay", width: 494, height: 442 },
    links: [{ label: "View source", href: "https://github.com/pablolird/skylimit", kind: "source" }],
  },
  {
    id: "tower-of-the-forest",
    title: "Tower of the Forest",
    summary: "A 2D tower defense with random enemy generation and a shop and upgrade system, in C++ with SFML.",
    stack: ["C++", "SFML", "Game dev"],
    image: { src: "/media/projects/tower-of-the-forest.webp", alt: "Tower of the Forest gameplay", width: 645, height: 327 },
    links: [{ label: "View source", href: "https://github.com/pablolird/Tower-of-the-Forest", kind: "source" }],
  },
];
