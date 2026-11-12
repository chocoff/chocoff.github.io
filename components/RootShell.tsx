import type { Metadata } from "next";
import { contact, site, skills } from "@/content/site";
import type { Lang } from "@/content/i18n";
import { fontVars } from "@/lib/fonts";

/**
 * Runs before first paint. Every visit starts in the dark and waits for the
 * visitor to kindle the fire, except with reduced motion or a deep link to a
 * section, which land lit. A refresh starts at the top, where the fire is.
 * Without JS nothing here runs, the intro never shows, and the page is lit.
 * If the app's JS fails to start within 4s, the failsafe lights the page so
 * nobody is left in the dark with a dead button.
 */
const prePaint = `(function(){var d=document.documentElement;d.classList.add('js');try{
var rm=matchMedia('(prefers-reduced-motion: reduce)').matches;
var h=location.hash&&location.hash.length>1;
d.dataset.phase=(rm||h)?'lit':'dormant';
if(d.dataset.phase==='dormant'&&'scrollRestoration' in history){history.scrollRestoration='manual';scrollTo(0,0);}}catch(e){d.dataset.phase='dormant';}
setTimeout(function(){if(!d.dataset.ready){d.dataset.phase='lit';d.classList.remove('is-dark');}},4000);})();`;

export function rootMetadata(lang: Lang): Metadata {
  const title = `${site.alias} (${site.name}) · ${site.role[lang]}`;
  const home = lang === "en" ? "/" : "/es/";
  return {
    metadataBase: new URL(site.url),
    title: { default: title, template: `%s · ${site.alias}` },
    description: site.description[lang],
    applicationName: site.alias,
    authors: [{ name: site.name, url: site.url }],
    creator: site.name,
    keywords: ["Fernando Rojas", "Choco", "software developer", "Paraguay", "game development", "computer graphics", "AI", "portfolio"],
    alternates: { canonical: home, languages: { en: "/", es: "/es/", "x-default": "/" } },
    robots: { index: true, follow: true },
    formatDetection: { telephone: false, email: false, address: false },
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
      alternateLocale: lang === "en" ? ["es_PY"] : ["en_US"],
      title: `${site.alias} (${site.name})`,
      description: site.description[lang],
      siteName: site.alias,
      firstName: "Fernando",
      lastName: "Rojas",
      username: "chocoff",
      images: [{ url: "/og.png", width: 1200, height: 630, alt: `${site.alias} (${site.name}), ${site.role[lang]}` }],
    },
    twitter: { card: "summary_large_image", title: `${site.alias} (${site.name})`, description: site.description[lang], images: ["/og.png"] },
  };
}

export default function RootShell({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  const home = new URL(lang === "en" ? "/" : "/es/", site.url).toString();
  const structured = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${site.url}/#person`,
        name: site.name,
        alternateName: site.alias,
        givenName: "Fernando",
        familyName: "Rojas",
        jobTitle: site.role[lang],
        description: site.description[lang],
        url: site.url,
        image: new URL("/media/portrait.webp", site.url).toString(),
        nationality: { "@type": "Country", name: "Paraguay" },
        worksFor: { "@type": "Organization", name: "Dualtti", url: "https://dualtti.com/" },
        alumniOf: [
          { "@type": "CollegeOrUniversity", name: "Universidad Politécnica Taiwán-Paraguay", url: "https://www.uptp.edu.py/" },
          { "@type": "CollegeOrUniversity", name: "National Taiwan University of Science and Technology", url: "https://www.ntust.edu.tw/" },
        ],
        knowsAbout: skills.flatMap((s) => s.items),
        sameAs: [contact.linkedin, contact.github],
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: home,
        name: site.alias,
        inLanguage: lang,
        author: { "@id": `${site.url}/#person` },
      },
    ],
  };
  return (
    <html lang={lang} className={fontVars} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: prePaint }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structured) }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
