import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export const dynamic = "force-static";

/** Every public page, with its other-language twin. */
const pages: { en: string; es?: string; priority: number }[] = [
  { en: "/", es: "/es/", priority: 1 },
  { en: "/projects/reforest-ai/", priority: 0.7 },
  { en: "/journal/", es: "/es/journal/", priority: 0.5 },
  { en: "/reading/", es: "/es/reading/", priority: 0.4 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => new URL(path, site.url).toString();
  return pages.flatMap(({ en, es, priority }) => {
    const alternates = es ? { languages: { en: url(en), es: url(es) } } : undefined;
    const entries: MetadataRoute.Sitemap = [{ url: url(en), priority, alternates }];
    if (es) entries.push({ url: url(es), priority: priority * 0.9, alternates });
    return entries;
  });
}
