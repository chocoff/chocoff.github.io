import type { Metadata } from "next";
import { JournalPage } from "@/components/SubPages";

export const metadata: Metadata = {
  title: "Bitácora y registros",
  description: "Registros públicos de Fernando Rojas, cada uno con su fuente, y sus notas.",
  alternates: { canonical: "/es/journal/", languages: { en: "/journal/", es: "/es/journal/", "x-default": "/journal/" } },
};

export default function Page() {
  return <JournalPage lang="es" />;
}
