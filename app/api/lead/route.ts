import { NextRequest, NextResponse } from "next/server";

// Custom fields creados en el location "Scalo Business" (GHL) para estos
// leads -- ver PR de conexion GHL para el detalle de por que se crearon.
const CUSTOM_FIELD_IDS = {
  landingOrigen: "7Dh1yZzZq492dZrmMvIK",
  cantidadComerciales: "Oa7WAix4enobRR070AMB",
  principalPreocupacion: "OXGwlmySgT5LxsN5TyMi",
  diagnosticoPuntaje: "GfS8jFlX9aw3dUPGGV1X",
  diagnosticoResultado: "z1ZsRT9xR8ylL8NDUtDa",
  diagnosticoAreaFoco: "nQmi6cZ1Kfomnp3NS8dG",
  utmSource: "ZVq8k2t0FOrRBhe3yVUo",
  utmMedium: "6qCb9WZ8Iktnbxa4fvO8",
  utmCampaign: "KtmZJd2cmbHDGvyYgtFY",
  utmContent: "2S7t3QaRtGGK0cQLYzxr",
  utmTerm: "WeiulOOYwtstYVmZxQ0o",
  fbclid: "ppmPZ6YhLz77yKANhM5y",
} as const;

type Landing = "a" | "a-leadmagnet" | "b" | "b-leadmagnet";

type LeadPayload = {
  landing: Landing;
  nombre?: string;
  empresa?: string;
  whatsapp?: string;
  email?: string;
  equipo?: string;
  preocupacion?: string;
  diagnostico?: {
    puntaje: number;
    resultado: string;
    areaFoco: string;
  };
  utm?: {
    source?: string;
    medium?: string;
    campaign?: string;
    content?: string;
    term?: string;
  };
  completedLeadMagnet?: boolean;
  fbclid?: string;
};

export async function POST(req: NextRequest) {
  const apiKey = process.env.GHL_PIT;
  const locationId = process.env.GHL_LOCATION_ID;

  if (!apiKey || !locationId) {
    console.error("[lead] faltan GHL_PIT / GHL_LOCATION_ID en el entorno");
    return NextResponse.json(
      { error: "GHL no configurado en este entorno" },
      { status: 500 }
    );
  }

  let data: LeadPayload;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }

  if (!data.landing) {
    return NextResponse.json({ error: "falta landing" }, { status: 400 });
  }

  const customFields: { id: string; value: string | number }[] = [
    { id: CUSTOM_FIELD_IDS.landingOrigen, value: data.landing },
  ];

  if (data.equipo) {
    customFields.push({ id: CUSTOM_FIELD_IDS.cantidadComerciales, value: data.equipo });
  }
  if (data.preocupacion) {
    customFields.push({ id: CUSTOM_FIELD_IDS.principalPreocupacion, value: data.preocupacion });
  }
  if (data.diagnostico) {
    customFields.push(
      { id: CUSTOM_FIELD_IDS.diagnosticoPuntaje, value: data.diagnostico.puntaje },
      { id: CUSTOM_FIELD_IDS.diagnosticoResultado, value: data.diagnostico.resultado },
      { id: CUSTOM_FIELD_IDS.diagnosticoAreaFoco, value: data.diagnostico.areaFoco }
    );
  }
  if (data.utm?.source) customFields.push({ id: CUSTOM_FIELD_IDS.utmSource, value: data.utm.source });
  if (data.utm?.medium) customFields.push({ id: CUSTOM_FIELD_IDS.utmMedium, value: data.utm.medium });
  if (data.utm?.campaign) customFields.push({ id: CUSTOM_FIELD_IDS.utmCampaign, value: data.utm.campaign });
  if (data.utm?.content) customFields.push({ id: CUSTOM_FIELD_IDS.utmContent, value: data.utm.content });
  if (data.utm?.term) customFields.push({ id: CUSTOM_FIELD_IDS.utmTerm, value: data.utm.term });
  if (data.fbclid) customFields.push({ id: CUSTOM_FIELD_IDS.fbclid, value: data.fbclid });

  const tags = ["landing-scalo", data.landing.startsWith("a") ? "landing-a" : "landing-b"];
  if (data.completedLeadMagnet) tags.push("lead-magnet-completado");

  const ghlBody = {
    locationId,
    name: data.nombre || undefined,
    email: data.email || undefined,
    phone: data.whatsapp || undefined,
    companyName: data.empresa || undefined,
    source: `Landing Scalo (${data.landing})`,
    tags,
    customFields,
  };

  try {
    const res = await fetch("https://services.leadconnectorhq.com/contacts/upsert", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Version: "2021-07-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ghlBody),
    });

    const text = await res.text();
    if (!res.ok) {
      console.error("[lead] GHL respondio error:", res.status, text);
      return NextResponse.json(
        { error: "ghl_error", status: res.status, detail: text },
        { status: 502 }
      );
    }

    console.log("[lead] contacto sincronizado con GHL:", data.landing, data.email);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[lead] fallo la llamada a GHL:", e);
    return NextResponse.json({ error: "network_error" }, { status: 502 });
  }
}
