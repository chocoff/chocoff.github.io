export type Lang = "en" | "es";
export type L = Record<Lang, string>;
export const langs: readonly Lang[] = ["en", "es"];

/** Path prefix for a language: "" for English, "/es" for Spanish. */
export const base = (lang: Lang) => (lang === "en" ? "" : "/es");

/** Interface strings. Content lives in the other files in this folder. */
export const ui = {
  introMark: { en: "Software Developer", es: "Desarrollador de Software" },
  kindle: { en: "Kindle the flame", es: "Enciende la llama" },
  kindleSr: { en: " and enter the portfolio", es: " y entra al portafolio" },
  skipIntro: { en: "Skip intro", es: "Saltar intro" },
  skipContent: { en: "Skip to content", es: "Saltar al contenido" },
  aka: { en: "also known as", es: "también conocido como" },
  langSwitch: { en: "Ver en español", es: "View in English" },

  navLabel: { en: "Sections", es: "Secciones" },
  navAbout: { en: "About", es: "Sobre mí" },
  navPath: { en: "Path", es: "Camino" },
  navWorks: { en: "Works", es: "Proyectos" },
  navMore: { en: "More", es: "Más" },
  navContact: { en: "Contact", es: "Contacto" },
  backToTop: { en: "Back to the top", es: "Volver arriba" },

  emailMe: { en: "Email me", es: "Escríbeme" },
  copyEmail: { en: "Copy", es: "Copiar" },
  copied: { en: "Address copied", es: "Dirección copiada" },
  resume: { en: "Résumé", es: "Currículum" },

  aboutTitle: { en: "By the fire", es: "Junto al fuego" },
  skills: { en: "What I work with", es: "Con qué trabajo" },
  interests: { en: "Off the clock", es: "Fuera del trabajo" },
  portraitAlt: { en: "Fernando Rojas", es: "Fernando Rojas" },

  pathTitle: { en: "The path so far", es: "El camino hasta aquí" },
  pathSub: {
    en: "Every place I've studied and worked, from the first semester in Paraguay to today.",
    es: "Cada lugar donde estudié y trabajé, desde el primer semestre en Paraguay hasta hoy.",
  },
  pathHint: { en: "Keep scrolling to walk the path", es: "Sigue bajando para recorrer el camino" },
  study: { en: "Study", es: "Estudios" },
  work: { en: "Work", es: "Trabajo" },
  present: { en: "present", es: "actualidad" },
  logoOf: { en: "logo", es: "logo" },

  worksTitle: { en: "Built from scratch", es: "Hecho desde cero" },
  worksSub: {
    en: "Engines, games and models where I wrote the parts most people import.",
    es: "Motores, juegos y modelos donde escribí las partes que la mayoría importa.",
  },
  problem: { en: "Problem", es: "Problema" },
  build: { en: "Build", es: "Solución" },
  stack: { en: "Stack", es: "Tecnologías" },
  alsoBuilt: { en: "Also built", es: "También hice" },
  inEnglish: { en: "", es: " (en inglés)" },

  moreTitle: { en: "Beyond the work", es: "Más allá del trabajo" },
  moreSub: {
    en: "Two side rooms, for the curious.",
    es: "Dos salas aparte, para quien tenga curiosidad.",
  },
  journalDoor: { en: "Journal & records", es: "Bitácora y registros" },
  readingDoor: { en: "Reading path", es: "Camino de lectura" },
  open: { en: "Open", es: "Abrir" },

  restTitle: { en: "Sit by the fire a while", es: "Quédate un rato junto al fuego" },
  restLede: {
    en: "I'm happy to talk about roles, collaborations, games, or the last book you read. Email or WhatsApp, whichever suits you.",
    es: "Con gusto hablamos de puestos, colaboraciones, juegos o el último libro que leíste. Por correo o WhatsApp, como prefieras.",
  },

  footerBuilt: {
    en: "Built from scratch with Next.js and a WebGPU bonfire.",
    es: "Hecho desde cero con Next.js y una hoguera en WebGPU.",
  },
  backToFire: { en: "Back to the fire", es: "Volver al fuego" },
  modelCredit: { en: "Bonfire model:", es: "Modelo de la hoguera:" },

  journalTitle: { en: "Journal & records", es: "Bitácora y registros" },
  journalSub: {
    en: "Milestones someone else wrote down, each with its source. My own notes will follow.",
    es: "Hitos que alguien más dejó por escrito, cada uno con su fuente. Mis propias notas vendrán después.",
  },
  recordsTitle: { en: "Records", es: "Registros" },
  notesTitle: { en: "Notes", es: "Notas" },
  shelvesLater: { en: "Opening later:", es: "Próximamente:" },

  readingTitle: { en: "Through the Cosmere", es: "A través del Cosmere" },
  readingSub: {
    en: "Off the clock I read Brandon Sanderson. This is my path through his universe, one flame per book.",
    es: "Fuera del trabajo leo a Brandon Sanderson. Este es mi camino por su universo, una llama por libro.",
  },
  readCount: { en: "books, novellas and stories so far. The most recent flame:", es: "libros, novelas cortas y relatos hasta ahora. La llama más reciente:" },
  swipe: { en: "Swipe the shelf, oldest on the left", es: "Desliza el estante; los más antiguos a la izquierda" },
  readingOrder: { en: "Reading order", es: "Orden de lectura" },
  statusRead: { en: "Read", es: "Leído" },
  statusLatest: { en: "Most recent", es: "El más reciente" },
  statusPlanned: { en: "Planned", es: "Pendiente" },
  kindNovel: { en: "Novel", es: "Novela" },
  kindNovella: { en: "Novella", es: "Novela corta" },
  kindStory: { en: "Short story", es: "Relato" },
  official: { en: "On brandonsanderson.com", es: "En brandonsanderson.com" },
  orderNote: { en: "Reading order is my own, not publication order. New to it?", es: "El orden es el mío, no el de publicación. ¿No lo conoces?" },
  whatIsCosmere: { en: "What is the Cosmere", es: "Qué es el Cosmere" },
} satisfies Record<string, L>;
