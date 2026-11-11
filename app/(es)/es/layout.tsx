import type { Viewport } from "next";
import RootShell, { rootMetadata } from "@/components/RootShell";
import "../../globals.css";

export const metadata = rootMetadata("es");
export const viewport: Viewport = { themeColor: "#0c0a08", colorScheme: "dark" };

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="es">{children}</RootShell>;
}
