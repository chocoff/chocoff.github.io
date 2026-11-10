/**
 * The owner's reading path through the Cosmere, in the order it was read.
 * status: "read" | "latest" (most recent flame) | "planned".
 * Add a book by appending it; set the previous "latest" to "read".
 */
export type Book = {
  title: string;
  /** Shorter form for the spine, when the full title won't fit. */
  spine?: string;
  world: "Scadrial" | "Sel" | "Nalthis" | "Roshar" | "Canticle";
  series: string;
  kind: "novel" | "novella" | "short story";
  blurb: string;
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
    blurb: "A crew of thieves plots against the immortal Lord Ruler, and a street urchin named Vin learns Allomancy." },
  { title: "The Well of Ascension", world: "Scadrial", series: "Mistborn, Era One", kind: "novel", status: "read", href: MISTBORN,
    blurb: "Vin and Elend try to hold Luthadel while armies close in around it." },
  { title: "The Hero of Ages", world: "Scadrial", series: "Mistborn, Era One", kind: "novel", status: "read", href: MISTBORN,
    blurb: "The end of the first era, as ash and mist swallow the world." },
  { title: "The Eleventh Metal", spine: "Eleventh Metal", world: "Scadrial", series: "Mistborn", kind: "short story", status: "read", href: COLLECTIONS,
    blurb: "Kelsier learns Allomancy, before the events of The Final Empire." },
  { title: "Mistborn: Secret History", spine: "Secret History", world: "Scadrial", series: "Mistborn", kind: "novella", status: "read", href: MISTBORN,
    blurb: "What was really happening behind the scenes of the first era." },
  { title: "Elantris", world: "Sel", series: "Elantris", kind: "novel", status: "read", href: STANDALONES,
    blurb: "A prince is struck by a curse and thrown into the fallen city of Elantris." },
  { title: "The Hope of Elantris", spine: "Hope of Elantris", world: "Sel", series: "Elantris", kind: "short story", status: "read", href: COLLECTIONS,
    blurb: "A short story set during the climax of Elantris." },
  { title: "The Emperor's Soul", spine: "Emperor's Soul", world: "Sel", series: "Standalone", kind: "novella", status: "read", href: COLLECTIONS,
    blurb: "A forger must recreate an emperor's soul before time runs out." },
  { title: "Warbreaker", world: "Nalthis", series: "Standalone", kind: "novel", status: "read", href: STANDALONES,
    blurb: "Two princesses, a God King, and a magic fueled by color and Breath." },
  { title: "The Way of Kings", world: "Roshar", series: "The Stormlight Archive", kind: "novel", status: "read", href: STORMLIGHT,
    blurb: "Kaladin, Shallan and Dalinar on a world scoured by highstorms." },
  { title: "Words of Radiance", world: "Roshar", series: "The Stormlight Archive", kind: "novel", status: "read", href: STORMLIGHT,
    blurb: "The Knights Radiant begin to return as the war on the Shattered Plains turns." },
  { title: "Edgedancer", world: "Roshar", series: "The Stormlight Archive", kind: "novella", status: "read", href: STORMLIGHT,
    blurb: "Lift's detour to Tashikk, between books two and three." },
  { title: "Oathbringer", world: "Roshar", series: "The Stormlight Archive", kind: "novel", status: "read", href: STORMLIGHT,
    blurb: "Dalinar faces his past as the Everstorm reshapes Roshar." },
  { title: "Dawnshard", world: "Roshar", series: "The Stormlight Archive", kind: "novella", status: "read", href: STORMLIGHT,
    blurb: "Rysn sails for Aimia, an island that guards a secret." },
  { title: "Rhythm of War", world: "Roshar", series: "The Stormlight Archive", kind: "novel", status: "read", href: STORMLIGHT,
    blurb: "An occupied tower, and the science of Light." },
  { title: "The Sunlit Man", world: "Canticle", series: "Standalone", kind: "novel", status: "read", href: STANDALONES,
    blurb: "Nomad runs across a planet where the sunrise kills." },
  { title: "Wind and Truth", world: "Roshar", series: "The Stormlight Archive", kind: "novel", status: "latest", href: STORMLIGHT,
    blurb: "The fifth Stormlight book, closing the series' first arc." },
];
