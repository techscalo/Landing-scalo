import type { Metadata, Viewport } from "next";
import { DarkSurface } from "../../components/DarkSurface";

export const metadata: Metadata = {
  title: "Diagnóstico comercial gratis en 2 minutos | SCALO",
  description:
    "Respondé 10 preguntas y descubrí qué tan aceitado está tu sistema comercial. Recibí tu puntaje y el principal foco a mejorar.",
  alternates: { canonical: "/a-leadmagnet" },
  openGraph: {
    title: "Diagnóstico comercial gratis en 2 minutos | SCALO",
    description:
      "Respondé 10 preguntas y descubrí qué tan aceitado está tu sistema comercial. Recibí tu puntaje y el principal foco a mejorar.",
    url: "/a-leadmagnet",
    siteName: "Scalo",
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Diagnóstico comercial gratis en 2 minutos | SCALO",
    description:
      "Respondé 10 preguntas y descubrí qué tan aceitado está tu sistema comercial. Recibí tu puntaje y el principal foco a mejorar.",
    images: [
      {
        url: "/a-leadmagnet/opengraph-image",
        alt: "Diagnóstico comercial gratis en 2 minutos | SCALO",
      },
    ],
  },
};

export const viewport: Viewport = { themeColor: "#08080a" };

export default function Layout({ children }: { children: React.ReactNode }) {
  return <DarkSurface variant="diagnostic">{children}</DarkSurface>;
}
