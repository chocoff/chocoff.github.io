import type { Lang } from "@/content/i18n";
import { ui } from "@/content/i18n";

/** EN / ES switch. `path` is the page's path without the language prefix, e.g. "/" or "/reading/". */
export default function LangToggle({ lang, path }: { lang: Lang; path: string }) {
  const other: Lang = lang === "en" ? "es" : "en";
  const href = other === "en" ? path : `/es${path}`;
  return (
    <a className="lang-toggle" href={href} hrefLang={other} lang={other} aria-label={ui.langSwitch[lang]}>
      <span data-on={lang === "en" || undefined}>EN</span>
      <span aria-hidden="true">/</span>
      <span data-on={lang === "es" || undefined}>ES</span>
    </a>
  );
}
