import type { Metadata } from "next";
import { ReadingPage } from "@/components/SubPages";

export const metadata: Metadata = {
  title: "Reading path",
  description: "Fernando Rojas's reading path through Brandon Sanderson's Cosmere.",
  alternates: { canonical: "/reading/", languages: { en: "/reading/", es: "/es/reading/", "x-default": "/reading/" } },
};

export default function Page() {
  return <ReadingPage lang="en" />;
}
