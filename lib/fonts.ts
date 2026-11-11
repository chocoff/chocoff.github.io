import { Hanken_Grotesk, Marcellus } from "next/font/google";

/** Headings: a calm roman face. Body: a neutral grotesque. */
export const display = Marcellus({ weight: "400", subsets: ["latin", "latin-ext"], variable: "--font-display", display: "swap" });
export const body = Hanken_Grotesk({ subsets: ["latin", "latin-ext"], style: ["normal", "italic"], variable: "--font-body", display: "swap" });
export const fontVars = `${display.variable} ${body.variable}`;
