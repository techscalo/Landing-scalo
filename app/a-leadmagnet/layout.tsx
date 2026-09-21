import type { Viewport } from "next";
import { DarkSurface } from "../../components/DarkSurface";

export const viewport: Viewport = { themeColor: "#08080a" };

export default function Layout({ children }: { children: React.ReactNode }) {
  return <DarkSurface variant="diagnostic">{children}</DarkSurface>;
}
