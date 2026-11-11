import type { Metadata } from "next";
import { ReadingPage } from "@/components/SubPages";

export const metadata: Metadata = {
  title: "Camino de lectura",
  description: "El camino de lectura de Fernando Rojas por el Cosmere de Brandon Sanderson.",
  alternates: { canonical: "/es/reading/", languages: { en: "/reading/", es: "/es/reading/" } },
};

export default function Page() {
  return <ReadingPage lang="es" />;
}
