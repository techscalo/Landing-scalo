import { ImageResponse } from "next/og";
import { ScaloSymbol } from "./brand";

export function shareImage(diagnostic = false) {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "56px 72px",
        color: "#f4f4f5",
        background:
          "radial-gradient(ellipse at top left, #27272f, #08080a 70%)",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid #ffffff26",
          paddingBottom: 25,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontSize: 32,
            letterSpacing: 2,
          }}
        >
          <ScaloSymbol size={40} />
          SCALO
        </div>
        <div style={{ display: "flex", color: "#a1a1aa", fontSize: 20 }}>
          {diagnostic ? "DIAGNÓSTICO · 2 MINUTOS" : "SCALO SYSTEM™"}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          flex: 1,
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 68,
            lineHeight: 1.05,
            letterSpacing: -3,
            fontWeight: 700,
            maxWidth: 1030,
          }}
        >
          {diagnostic
            ? "¿Qué tan aceitado está tu sistema comercial?"
            : "Las oportunidades están."}
        </div>
        {!diagnostic && (
          <div
            style={{
              display: "flex",
              fontSize: 76,
              letterSpacing: -3,
              color: "#a1a1aa",
              lineHeight: 1.15,
              fontWeight: 700,
            }}
          >
            Que no se te escapen.
          </div>
        )}
        <div
          style={{
            display: "flex",
            fontSize: 26,
            lineHeight: 1.5,
            color: "#a1a1aa",
            maxWidth: 890,
            marginTop: 28,
          }}
        >
          {diagnostic
            ? "10 preguntas. 4 áreas clave. Descubrí dónde se pierden tus oportunidades."
            : "Centralizá, automatizá y aprovechá mejor los leads que ya generás."}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 21,
        }}
      >
        <div
          style={{
            display: "flex",
            padding: "14px 24px",
            borderRadius: 12,
            background: "#f4f4f5",
            color: "#08080a",
          }}
        >
          {diagnostic ? "Hacé tu diagnóstico gratis →" : "Conocé el sistema →"}
        </div>
        <div style={{ display: "flex", color: "#a1a1aa" }}>scalo.tech</div>
      </div>
    </div>,
    { width: 1200, height: 630 },
  );
}
