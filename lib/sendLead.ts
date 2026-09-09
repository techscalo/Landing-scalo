export type LeadLanding =
  | "v1-landing"
  | "v1-leadmagnet"
  | "v2-landing"
  | "v2-leadmagnet";

// Lee los utm_* de la URL actual, si estan. Se usa window.location en vez de
// useSearchParams para no forzar que cada pagina se saque de rendering
// estatico (useSearchParams pide un boundary de Suspense).
function getUtmParams() {
  if (typeof window === "undefined") return undefined;
  const params = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};
  (["source", "medium", "campaign", "content", "term"] as const).forEach(
    (key) => {
      const value = params.get(`utm_${key}`);
      if (value) utm[key] = value;
    }
  );
  return Object.keys(utm).length > 0 ? utm : undefined;
}

export type LeadPayload = {
  landing: LeadLanding;
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
  completedLeadMagnet?: boolean;
};

// Manda el lead a /api/lead (que lo sincroniza con GHL). Fire-and-forget: no
// bloquea ni rompe la UX del formulario si falla la red o el CRM.
export function sendLead(payload: LeadPayload) {
  fetch("/api/lead", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...payload, utm: getUtmParams() }),
  }).catch(() => {});
}
