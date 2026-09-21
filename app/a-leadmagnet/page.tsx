"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { sendLead } from "../../lib/sendLead";
import { DEFAULT_COUNTRY_CODE } from "../../lib/countryCodes";
import { PhoneField } from "../../components/PhoneField";
import { MetaPixel } from "../../components/MetaPixel";

type Area = "control" | "seguimiento" | "reactivacion" | "medicion";

const qs: { text: string; area: Area }[] = [
  {
    text: "¿Todos los leads que ingresan quedan registrados automáticamente en un mismo lugar?",
    area: "control",
  },
  {
    text: "¿Podés saber en menos de 1 minuto cuántas oportunidades comerciales tiene abiertas tu empresa?",
    area: "control",
  },
  {
    text: "¿Cada oportunidad tiene un responsable, una etapa y una próxima acción definida?",
    area: "control",
  },
  {
    text: "¿Tu equipo recibe recordatorios o seguimientos automáticos para evitar que una oportunidad quede olvidada?",
    area: "seguimiento",
  },
  {
    text: "¿Podés saber cuánto tarda tu empresa en responder un nuevo lead?",
    area: "seguimiento",
  },
  {
    text: "¿Reimpactan sistemáticamente a prospectos que consultaron pero no compraron?",
    area: "reactivacion",
  },
  {
    text: "¿Utilizan activamente sus bases de datos antiguas para generar nuevas oportunidades?",
    area: "reactivacion",
  },
  {
    text: "¿Podés medir cuántas oportunidades convierte cada vendedor?",
    area: "medicion",
  },
  {
    text: "¿Podés ver en un dashboard las principales métricas comerciales sin depender de que alguien arme un Excel?",
    area: "medicion",
  },
  {
    text: "Si mañana un vendedor deja la empresa, ¿toda la información, conversaciones y oportunidades que estaba trabajando quedan bajo control de la empresa?",
    area: "medicion",
  },
];

const areaMsg: Record<Area, string> = {
  control:
    "Principal foco detectado: registro y control de oportunidades. Revisá centralización, responsables, etapas y próximas acciones.",
  seguimiento:
    "Principal foco detectado: velocidad y seguimiento. Hay señales de dependencia del trabajo manual para que las oportunidades avancen.",
  reactivacion:
    "Principal foco detectado: reimpacto de base. Podría haber facturación potencial en prospectos y contactos antiguos que hoy no se trabajan de forma sistemática.",
  medicion:
    "Principal foco detectado: métricas y continuidad. Necesitás visibilidad de conversiones y que la información permanezca bajo control de la empresa.",
};

export default function V1LeadMagnet() {
  const [phase, setPhase] = useState<"gate" | "quiz" | "result">("gate");
  const [i, setI] = useState(0);
  const [answers, setAnswers] = useState<{ value: number; area: Area }[]>([]);
  const [lead, setLead] = useState({
    nombre: "",
    empresa: "",
    whatsapp: "",
    email: "",
  });
  const [whatsappCode, setWhatsappCode] = useState(DEFAULT_COUNTRY_CODE);

  useEffect(() => {
    const stored = sessionStorage.getItem("scaloLead");
    if (stored) {
      try {
        const d = JSON.parse(stored);
        setLead((prev) => ({
          nombre: d.nombre ?? prev.nombre,
          empresa: d.empresa ?? prev.empresa,
          whatsapp: d.whatsapp ?? prev.whatsapp,
          email: d.email ?? prev.email,
        }));
      } catch {}
    }
  }, []);

  function startQuiz(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const whatsapp = `${whatsappCode}${lead.whatsapp}`;
    sessionStorage.setItem("scaloLead", JSON.stringify({ ...lead, whatsapp }));
    sendLead({
      landing: "a-leadmagnet",
      nombre: lead.nombre,
      empresa: lead.empresa,
      whatsapp,
      email: lead.email,
    });
    setPhase("quiz");
  }

  function computeResult(list: { value: number; area: Area }[]) {
    const score = list.reduce((s, a) => s + a.value, 0);
    const badge =
      score >= 8
        ? "Sistema aceitado"
        : score >= 5
          ? "Perdiendo eficiencia"
          : "Fugas comerciales";
    const misses: Record<Area, number> = {
      control: 0,
      seguimiento: 0,
      reactivacion: 0,
      medicion: 0,
    };
    list.forEach((a) => {
      if (!a.value) misses[a.area]++;
    });
    const focusKey = Object.entries(misses).sort(
      (a, b) => b[1] - a[1],
    )[0][0] as Area;
    return { score, badge, focusKey };
  }

  function answer(value: number) {
    const next = [...answers, { value, area: qs[i].area }];
    if (i + 1 < qs.length) {
      setAnswers(next);
      setI(i + 1);
    } else {
      setAnswers(next);
      setPhase("result");
      const { score, badge, focusKey } = computeResult(next);
      sendLead({
        landing: "a-leadmagnet",
        nombre: lead.nombre,
        empresa: lead.empresa,
        whatsapp: `${whatsappCode}${lead.whatsapp}`,
        email: lead.email,
        diagnostico: { puntaje: score, resultado: badge, areaFoco: focusKey },
        completedLeadMagnet: true,
      });
    }
  }

  function restart() {
    setAnswers([]);
    setI(0);
    setPhase("quiz");
  }

  const score = answers.reduce((s, a) => s + a.value, 0);
  let badge = "",
    title = "",
    text = "";
  if (score >= 8) {
    badge = "Sistema aceitado";
    title = "Tenés una estructura comercial sólida y medible.";
    text =
      "Tu mayor oportunidad probablemente esté en optimizar automatizaciones, reimpactos y conversiones para extraer todavía más rendimiento del sistema actual.";
  } else if (score >= 5) {
    badge = "Perdiendo eficiencia";
    title = "Hay estructura, pero todavía existen agujeros.";
    text =
      "Algunas oportunidades dependen demasiado del seguimiento manual, de cada vendedor o de información dispersa. Hay margen para vender más con la estructura que ya tenés.";
  } else {
    badge = "Fugas comerciales";
    title = "Tu empresa puede estar dejando oportunidades sin trabajar.";
    text =
      "Antes de invertir más en publicidad o sumar vendedores, conviene ordenar, medir y automatizar el sistema comercial actual.";
  }
  const misses: Record<Area, number> = {
    control: 0,
    seguimiento: 0,
    reactivacion: 0,
    medicion: 0,
  };
  answers.forEach((a) => {
    if (!a.value) misses[a.area]++;
  });
  const focusKey = Object.entries(misses).sort(
    (a, b) => b[1] - a[1],
  )[0][0] as Area;

  return (
    <>
      <MetaPixel />
      <header className="wrap">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/scalo-white.png" alt="SCALO" />
        <Link href="/a">← Volver a la landing</Link>
      </header>
      <main className="shell">
        <div className="box">
          <aside className="side">
            <div>
              <div className="tag">Lead Magnet · 2 minutos</div>
              <h1>¿Qué tan aceitado está tu sistema comercial?</h1>
              <p>
                10 preguntas simples para detectar si estás aprovechando las
                oportunidades que ya generás o dejando ventas sobre la mesa.
              </p>
            </div>
            <div className="diagnostic-meta">
              <span>10 preguntas</span>
              <span>4 áreas clave</span>
              <span>Tu resultado al instante</span>
            </div>
            <div className="mini">Menos clicks, más SCALO.</div>
          </aside>
          <section className="content" aria-live="polite">
            {phase === "gate" && (
              <div>
                <div className="step">Paso 1 de 2 — Tus datos</div>
                <h2>Recibí tu diagnóstico comercial</h2>
                <p className="sub">
                  Completá estos datos para empezar. Al final vas a ver tu
                  puntaje y la principal zona a revisar.
                </p>
                <form onSubmit={startQuiz}>
                  <div className="formgrid">
                    <div className="field">
                      <label htmlFor="a-leadmagnet-nombre">
                        Nombre y apellido
                      </label>
                      <input
                        id="a-leadmagnet-nombre"
                        required
                        name="nombre"
                        autoComplete="name"
                        value={lead.nombre}
                        onChange={(e) =>
                          setLead({ ...lead, nombre: e.target.value })
                        }
                      />
                    </div>
                    <div className="field">
                      <label htmlFor="a-leadmagnet-empresa">Empresa</label>
                      <input
                        id="a-leadmagnet-empresa"
                        required
                        name="empresa"
                        autoComplete="organization"
                        value={lead.empresa}
                        onChange={(e) =>
                          setLead({ ...lead, empresa: e.target.value })
                        }
                      />
                    </div>
                    <div className="field">
                      <label htmlFor="a-leadmagnet-whatsapp">WhatsApp</label>
                      <PhoneField
                        id="a-leadmagnet-whatsapp"
                        code={whatsappCode}
                        onCodeChange={setWhatsappCode}
                        number={lead.whatsapp}
                        onNumberChange={(v) =>
                          setLead({ ...lead, whatsapp: v })
                        }
                      />
                    </div>
                    <div className="field">
                      <label htmlFor="a-leadmagnet-email">Email</label>
                      <input
                        id="a-leadmagnet-email"
                        required
                        type="email"
                        name="email"
                        autoComplete="email"
                        value={lead.email}
                        onChange={(e) =>
                          setLead({ ...lead, email: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <button className="cta">EMPEZAR DIAGNÓSTICO →</button>
                </form>
              </div>
            )}
            {phase === "quiz" && (
              <div className="quiz">
                <div className="step">Paso 2 de 2 — Diagnóstico</div>
                <div
                  className="progress"
                  role="progressbar"
                  aria-label="Progreso del diagnóstico"
                  aria-valuemin={0}
                  aria-valuemax={qs.length}
                  aria-valuenow={i}
                >
                  <div
                    className="bar"
                    style={{ width: `${(i / qs.length) * 100}%` }}
                  />
                </div>
                <div className="qnum">
                  Pregunta {i + 1} de {qs.length}
                </div>
                <div className="question">{qs[i].text}</div>
                <div className="choices">
                  <button className="choice" onClick={() => answer(1)}>
                    <strong>✓</strong> SÍ
                  </button>
                  <button className="choice" onClick={() => answer(0)}>
                    <strong>×</strong> NO
                  </button>
                </div>
              </div>
            )}
            {phase === "result" && (
              <div className="result">
                <div className="step">Tu resultado</div>
                <div className="score">{score}/10</div>
                <span className="badge">{badge}</span>
                <h2>{title}</h2>
                <p className="sub">{text}</p>
                <div className="area">{areaMsg[focusKey]}</div>
                <div className="actions">
                  <Link className="primary" href="/a#auditoria">
                    QUIERO UNA AUDITORÍA →
                  </Link>
                  <a
                    className="secondary"
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      restart();
                    }}
                  >
                    Repetir diagnóstico
                  </a>
                </div>
              </div>
            )}
          </section>
        </div>
      </main>
    </>
  );
}
