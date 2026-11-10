import type { Metadata, Viewport } from "next";
import { Alegreya_Sans, IM_Fell_English, IM_Fell_English_SC } from "next/font/google";
import { site } from "@/content/site";
import "./globals.css";

const display = IM_Fell_English_SC({ weight: "400", subsets: ["latin"], variable: "--font-display", display: "swap" });
const inscription = IM_Fell_English({ weight: "400", style: ["normal", "italic"], subsets: ["latin"], variable: "--font-inscription", display: "swap" });
const body = Alegreya_Sans({ weight: ["400", "500", "700"], style: ["normal", "italic"], subsets: ["latin", "latin-ext"], variable: "--font-body", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} (${site.alias}) · ${site.role}`, template: `%s · ${site.name}` },
  description: site.description,
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.png", sizes: "64x64" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "profile",
    url: "/",
    title: `${site.name} (${site.alias})`,
    description: site.description,
    siteName: site.name,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: `${site.name}, ${site.role}` }],
  },
  twitter: { card: "summary_large_image", title: `${site.name} (${site.alias})`, description: site.description, images: ["/og.png"] },
};

export const viewport: Viewport = {
  themeColor: "#0c0a08",
  colorScheme: "dark",
};

/**
 * Runs before first paint. Decides whether the visitor meets the dark
 * (first visit), gets a quick re-light (returning), or lands lit (reduced
 * motion, already kindled this session, or a deep link to a section).
 * Without JS nothing here runs, the intro never shows, and the page is lit.
 */
const prePaint = `(function(){var d=document.documentElement;d.classList.add('js');try{
var k='choco:kindled';var rm=matchMedia('(prefers-reduced-motion: reduce)').matches;
var s=sessionStorage.getItem(k)==='1';var h=location.hash&&location.hash.length>1;
d.dataset.phase=(rm||s||h)?'lit':'dormant';}catch(e){d.dataset.phase='dormant';}})();`;

const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  alternateName: site.alias,
  jobTitle: site.role,
  url: site.url,
  worksFor: { "@type": "Organization", name: "Dualtti", url: "https://dualtti.com/" },
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "Universidad Politécnica Taiwán-Paraguay" },
    { "@type": "CollegeOrUniversity", name: "National Taiwan University of Science and Technology" },
  ],
  sameAs: ["https://www.linkedin.com/in/fernando-rojaschoco", "https://github.com/chocoff"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${inscription.variable} ${body.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: prePaint }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
