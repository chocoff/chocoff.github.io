import type { Metadata } from "next";
import { site } from "@/content/site";
import type { Lang } from "@/content/i18n";
import { fontVars } from "@/lib/fonts";

/**
 * Runs before first paint. Decides whether the visitor meets the dark
 * (first visit), gets a quick re-light (returning), or lands lit (reduced
 * motion, already kindled this session, or a deep link to a section).
 * Without JS nothing here runs, the intro never shows, and the page is lit.
 * If the app's JS fails to start within 4s, the failsafe lights the page so
 * nobody is left in the dark with a dead button.
 */
const prePaint = `(function(){var d=document.documentElement;d.classList.add('js');try{
var k='choco:kindled';var rm=matchMedia('(prefers-reduced-motion: reduce)').matches;
var s=sessionStorage.getItem(k)==='1';var h=location.hash&&location.hash.length>1;
d.dataset.phase=(rm||s||h)?'lit':'dormant';}catch(e){d.dataset.phase='dormant';}
setTimeout(function(){if(!d.dataset.ready){d.dataset.phase='lit';d.classList.remove('is-dark');}},4000);})();`;

export function rootMetadata(lang: Lang): Metadata {
  const title = `${site.name} (${site.alias}) · ${site.role[lang]}`;
  const home = lang === "en" ? "/" : "/es/";
  return {
    metadataBase: new URL(site.url),
    title: { default: title, template: `%s · ${site.name}` },
    description: site.description[lang],
    alternates: { canonical: home, languages: { en: "/", es: "/es/" } },
    icons: {
      icon: [
        { url: "/favicon.svg", type: "image/svg+xml" },
        { url: "/favicon.png", sizes: "64x64" },
      ],
      apple: "/apple-touch-icon.png",
    },
    openGraph: {
      type: "profile",
      url: home,
      locale: lang === "en" ? "en_US" : "es_PY",
      title: `${site.name} (${site.alias})`,
      description: site.description[lang],
      siteName: site.name,
      images: [{ url: "/og.png", width: 1200, height: 630, alt: `${site.name}, ${site.role[lang]}` }],
    },
    twitter: { card: "summary_large_image", title: `${site.name} (${site.alias})`, description: site.description[lang], images: ["/og.png"] },
  };
}

export default function RootShell({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  const personLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    alternateName: site.alias,
    jobTitle: site.role[lang],
    url: site.url,
    worksFor: { "@type": "Organization", name: "Dualtti", url: "https://dualtti.com/" },
    alumniOf: [
      { "@type": "CollegeOrUniversity", name: "Universidad Politécnica Taiwán-Paraguay" },
      { "@type": "CollegeOrUniversity", name: "National Taiwan University of Science and Technology" },
    ],
    sameAs: ["https://www.linkedin.com/in/fernando-rojaschoco", "https://github.com/chocoff"],
  };
  return (
    <html lang={lang} className={fontVars} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: prePaint }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
