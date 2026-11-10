/**
 * Everything that changes when your situation changes lives here.
 * Edit `status` and redeploy; the hero and metadata read from it.
 */
export const site = {
  name: "Fernando Rojas",
  alias: "Choco",
  url: "https://chocoff.github.io",
  role: "Software Developer",
  description:
    "Fernando Rojas (Choco), Paraguayan software developer. Game systems, graphics, and AI pipelines, built from scratch.",

  status: {
    /** One short line, shown under the name. */
    headline: "Software Developer & Client Management at Dualtti",
    /** Supporting line. Keep it to one sentence. */
    detail:
      "Building software and running clients' Meta Ads campaigns, with one last course left before I graduate in Computer Science and Information Engineering.",
    since: "Sep 2026",
  },

  intro:
    "Born in Paraguay, I studied at UPTP and spent an exchange at Taiwan Tech (NTUST). I like building things from the ground up: game systems, rendering pipelines, and AI tools that do real work.",
} as const;

export const contact = {
  email: "rojasmfer@proton.me",
  whatsapp: "https://wa.me/595981133155",
  whatsappDisplay: "+595 981 133 155",
  resume: "/docs/fernando-rojas-resume.pdf",
  linkedin: "https://www.linkedin.com/in/fernando-rojaschoco",
  github: "https://github.com/chocoff",
} as const;

export const skills = [
  { group: "Languages", items: ["C++", "C#", "Python", "Java"] },
  { group: "Graphics & games", items: ["OpenGL / GLSL", "LWJGL3", "SFML", "Unity"] },
  { group: "AI & data", items: ["Deep learning", "RAG pipelines", "Docling", "RASA", "Earth Engine"] },
  { group: "Tooling", items: ["Docker", "Flask", "MongoDB", "Socket.io"] },
] as const;

export const interests = [
  "Low-level programming",
  "Game development",
  "Computer graphics",
  "Souls-like games",
  "Fantasy books",
] as const;
