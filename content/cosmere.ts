/**
 * The owner's reading path through the Cosmere, in the order it was read.
 * status: "read" | "latest" (most recent flame) | "planned".
 * Add a book by appending it; set the previous "latest" to "read".
 */
import type { L } from "./i18n";

export type Book = {
  title: string;
  /** Shorter form for the spine, when the full title won't fit. */
  spine?: string;
  world: "Scadrial" | "Sel" | "Nalthis" | "Roshar" | "Canticle";
  series: string;
  kind: "novel" | "novella" | "short story";
  blurb: L;
  href: string;
  status: "read" | "latest" | "planned";
};

const MISTBORN = "https://www.brandonsanderson.com/pages/the-mistborn-saga-the-original-trilogy";
const STORMLIGHT = "https://www.brandonsanderson.com/pages/the-stormlight-archive-series";
const STANDALONES = "https://www.brandonsanderson.com/pages/standalones-cosmere";
const COLLECTIONS = "https://www.brandonsanderson.com/pages/collections-cosmere";

export const cosmereAbout = "https://www.brandonsanderson.com/pages/what-is-the-cosmere";

export const books: readonly Book[] = [
  { title: "The Final Empire", world: "Scadrial", series: "Mistborn, Era One", kind: "novel", status: "read", href: MISTBORN,
    blurb: { en: "A crew of thieves plots against the immortal Lord Ruler, and a street urchin named Vin learns Allomancy.", es: "Una banda de ladrones conspira contra el inmortal Lord Legislador, y una chica de la calle llamada Vin aprende alomancia." } },
  { title: "The Well of Ascension", world: "Scadrial", series: "Mistborn, Era One", kind: "novel", status: "read", href: MISTBORN,
    blurb: { en: "Vin and Elend try to hold Luthadel while armies close in around it.", es: "Vin y Elend intentan sostener Luthadel mientras los ejércitos la rodean." } },
  { title: "The Hero of Ages", world: "Scadrial", series: "Mistborn, Era One", kind: "novel", status: "read", href: MISTBORN,
    blurb: { en: "The end of the first era, as ash and mist swallow the world.", es: "El final de la primera era, mientras la ceniza y la bruma devoran el mundo." } },
  { title: "The Eleventh Metal", spine: "Eleventh Metal", world: "Scadrial", series: "Mistborn", kind: "short story", status: "read", href: COLLECTIONS,
    blurb: { en: "Kelsier learns Allomancy, before the events of The Final Empire.", es: "Kelsier aprende alomancia, antes de los hechos de El Imperio Final." } },
  { title: "Mistborn: Secret History", spine: "Secret History", world: "Scadrial", series: "Mistborn", kind: "novella", status: "read", href: MISTBORN,
    blurb: { en: "What was really happening behind the scenes of the first era.", es: "Lo que realmente ocurría entre bastidores durante la primera era." } },
  { title: "Elantris", world: "Sel", series: "Elantris", kind: "novel", status: "read", href: STANDALONES,
    blurb: { en: "A prince is struck by a curse and thrown into the fallen city of Elantris.", es: "Un príncipe cae bajo una maldición y es arrojado a la ciudad caída de Elantris." } },
  { title: "The Hope of Elantris", spine: "Hope of Elantris", world: "Sel", series: "Elantris", kind: "short story", status: "read", href: COLLECTIONS,
    blurb: { en: "A short story set during the climax of Elantris.", es: "Un relato ambientado durante el clímax de Elantris." } },
  { title: "The Emperor's Soul", spine: "Emperor's Soul", world: "Sel", series: "Standalone", kind: "novella", status: "read", href: COLLECTIONS,
    blurb: { en: "A forger must recreate an emperor's soul before time runs out.", es: "Una falsificadora debe recrear el alma de un emperador antes de que se acabe el tiempo." } },
  { title: "Warbreaker", world: "Nalthis", series: "Standalone", kind: "novel", status: "read", href: STANDALONES,
    blurb: { en: "Two princesses, a God King, and a magic fueled by color and Breath.", es: "Dos princesas, un Rey Dios y una magia alimentada por el color y el Aliento." } },
  { title: "The Way of Kings", world: "Roshar", series: "The Stormlight Archive", kind: "novel", status: "read", href: STORMLIGHT,
    blurb: { en: "Kaladin, Shallan and Dalinar on a world scoured by highstorms.", es: "Kaladin, Shallan y Dalinar en un mundo azotado por las altas tormentas." } },
  { title: "Words of Radiance", world: "Roshar", series: "The Stormlight Archive", kind: "novel", status: "read", href: STORMLIGHT,
    blurb: { en: "The Knights Radiant begin to return as the war on the Shattered Plains turns.", es: "Los Caballeros Radiantes empiezan a volver mientras cambia la guerra en las Llanuras Quebradas." } },
  { title: "Edgedancer", world: "Roshar", series: "The Stormlight Archive", kind: "novella", status: "read", href: STORMLIGHT,
    blurb: { en: "Lift's detour to Tashikk, between books two and three.", es: "El desvío de Lift a Tashikk, entre el segundo y el tercer libro." } },
  { title: "Oathbringer", world: "Roshar", series: "The Stormlight Archive", kind: "novel", status: "read", href: STORMLIGHT,
    blurb: { en: "Dalinar faces his past as the Everstorm reshapes Roshar.", es: "Dalinar enfrenta su pasado mientras la Tormenta Eterna transforma Roshar." } },
  { title: "Dawnshard", world: "Roshar", series: "The Stormlight Archive", kind: "novella", status: "read", href: STORMLIGHT,
    blurb: { en: "Rysn sails for Aimia, an island that guards a secret.", es: "Rysn navega hacia Aimia, una isla que guarda un secreto." } },
  { title: "Rhythm of War", world: "Roshar", series: "The Stormlight Archive", kind: "novel", status: "read", href: STORMLIGHT,
    blurb: { en: "An occupied tower, and the science of Light.", es: "Una torre ocupada y la ciencia de la Luz." } },
  { title: "The Sunlit Man", world: "Canticle", series: "Standalone", kind: "novel", status: "read", href: STANDALONES,
    blurb: { en: "Nomad runs across a planet where the sunrise kills.", es: "Nómada huye por un planeta donde el amanecer mata." } },
  { title: "Wind and Truth", world: "Roshar", series: "The Stormlight Archive", kind: "novel", status: "latest", href: STORMLIGHT,
    blurb: { en: "The fifth Stormlight book, closing the series' first arc.", es: "El quinto libro de El Archivo de las Tormentas, que cierra el primer arco de la saga." } },
];
