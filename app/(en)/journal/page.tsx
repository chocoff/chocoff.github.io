import type { Metadata } from "next";
import { JournalPage } from "@/components/SubPages";

export const metadata: Metadata = {
  title: "Journal & records",
  description: "Public records of Fernando Rojas, each with its source, and his notes.",
  alternates: { canonical: "/journal/", languages: { en: "/journal/", es: "/es/journal/" } },
};

export default function Page() {
  return <JournalPage lang="en" />;
}
