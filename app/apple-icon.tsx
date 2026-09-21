import { ImageResponse } from "next/og";
import { ScaloSymbol } from "../lib/brand";
export const size = { width: 180, height: 180 };
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
        borderRadius: 36,
      }}
    >
      <ScaloSymbol size={130} />
    </div>,
    size,
  );
}
