import type { L } from "./i18n";

/**
 * The journal. Records come from records.ts; your own posts go in `posts`.
 * `upcoming` names the kinds of notes that will appear once written.
 */
export type Post = { title: L; date: string; summary: L; href: string };

export const upcoming: readonly L[] = [
  { en: "Technical notes", es: "Notas técnicas" },
  { en: "Build logs", es: "Bitácoras de proyectos" },
  { en: "University", es: "Universidad" },
  { en: "Reflections", es: "Reflexiones" },
];

export const posts: readonly Post[] = [];
