import { shareImage } from "../../lib/shareImage";
export const alt = "Diagnóstico comercial gratuito de Scalo";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return shareImage(true);
}
