import { shareImage } from "../../lib/shareImage";
export const alt = "Scalo System — Sistema comercial";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return shareImage(false);
}
