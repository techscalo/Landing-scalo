import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.scalo.tech"),
  title: "SCALO — Sistema comercial",
  description:
    "Scalo System™: sistema comercial a medida para automatizar seguimientos, reimpactar tu base y convertir más.",
  applicationName: "Scalo",
};

export const viewport: Viewport = { themeColor: "#08080a" };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
