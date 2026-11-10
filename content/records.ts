/** Verified public mentions. Add newest at the top of the list; the UI sorts by date. */
export type Record = {
  date: string; // ISO yyyy-mm or yyyy-mm-dd
  title: string;
  summary: string;
  source: string;
  href: string;
  lang: "es" | "en";
};

export const records: readonly Record[] = [
  {
    date: "2026-09",
    title: "Wrapped up the IGS summer internship",
    summary:
      "Worked on game development systems, logic and performance optimization, and presented results on the arcade machines themselves.",
    source: "LinkedIn",
    href: "https://www.linkedin.com/posts/fernando-rojaschoco_ive-officially-wrapped-up-my-summer-internship-share-7493840536294838272-ZuAQ/",
    lang: "en",
  },
  {
    date: "2026-06-17",
    title: "Talento paraguayo en firma líder de videojuegos taiwanés",
    summary: "GEN covers the start of the professional internship at International Games System (IGS) in Taiwan.",
    source: "GEN (Instagram)",
    href: "https://www.instagram.com/reel/DZsm98-kSjW/",
    lang: "es",
  },
  {
    date: "2026-06-16",
    title: "Estudiante paraguayo ingresa a firma líder de videojuegos en Taiwán",
    summary: "Diario HOY reports the IGS internship, part of the UPTP program with Taiwan Tech.",
    source: "Diario HOY",
    href: "https://www.hoy.com.py/nacionales/2026/06/16/estudiante-paraguayo-ingresa-a-firma-lider-de-videojuegos-en-taiwan",
    lang: "es",
  },
  {
    date: "2026-04-01",
    title: "Won a programming contest at UPTP",
    summary: "GEN's #Antitesis features the win, and the Paraguayan talent being noticed in Taiwan.",
    source: "GEN (Instagram)",
    href: "https://www.instagram.com/reel/DWm4lB1EXlC/",
    lang: "es",
  },
];
