import { ImageResponse } from "next/og";
import { ScaloSymbol } from "../lib/brand";
export const size = { width: 64, height: 64 };
export const contentType = "image/png";
export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#08080a",
        borderRadius: 12,
      }}
    >
      <ScaloSymbol size={46} />
    </div>,
    size,
  );
}
