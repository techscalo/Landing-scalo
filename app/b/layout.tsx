import { connection } from "next/server";
import type { Metadata, Viewport } from "next";
import { DarkSurface } from "../../components/DarkSurface";

export const metadata: Metadata = {
  title: "SCALO — Aprovechá mejor tus oportunidades comerciales",
  description:
    "Centralizá leads, automatizá seguimientos y reactivá tu base con Scalo System™. Detectá las fugas de tu sistema comercial.",
  alternates: { canonical: "/b" },
  openGraph: {
    title: "SCALO — Aprovechá mejor tus oportunidades comerciales",
    description:
      "Centralizá leads, automatizá seguimientos y reactivá tu base con Scalo System™. Detectá las fugas de tu sistema comercial.",
    url: "/b",
    siteName: "Scalo",
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SCALO — Aprovechá mejor tus oportunidades comerciales",
    description:
      "Centralizá leads, automatizá seguimientos y reactivá tu base con Scalo System™. Detectá las fugas de tu sistema comercial.",
    images: [
      {
        url: "/b/opengraph-image",
        alt: "SCALO — Aprovechá mejor tus oportunidades comerciales",
      },
    ],
  },
};

export const viewport: Viewport = { themeColor: "#08080a" };

export default async function Layout({ children }: { children: React.ReactNode }) {
  // Always serve fresh HTML; hashed images, CSS and JS remain cacheable.
  await connection();
  return <DarkSurface variant="landing">{children}</DarkSurface>;
}
