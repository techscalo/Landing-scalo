import { Geist, Geist_Mono } from "next/font/google";
import styles from "./DarkSurface.module.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--scalo-sans",
  display: "swap",
});
const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--scalo-mono",
  display: "swap",
});

export function DarkSurface({
  children,
  variant,
}: {
  children: React.ReactNode;
  variant: "landing" | "diagnostic";
}) {
  return (
    <div
      className={`${styles.surface} ${geist.variable} ${mono.variable}`}
      data-design={variant}
    >
      <div className={styles.atmosphere} aria-hidden="true" />
      {children}
    </div>
  );
}
