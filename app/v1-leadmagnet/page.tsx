"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { sendLead } from "../../lib/sendLead";

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
    sessionStorage.setItem("scaloLead", JSON.stringify(lead));
    sendLead({
      landing: "v1-leadmagnet",
      nombre: lead.nombre,
      empresa: lead.empresa,
      whatsapp: lead.whatsapp,
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
    const focusKey = Object.entries(misses).sort((a, b) => b[1] - a[1])[0][0] as Area;
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
        landing: "v1-leadmagnet",
        nombre: lead.nombre,
        empresa: lead.empresa,
        whatsapp: lead.whatsapp,
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
  const focusKey = (Object.entries(misses).sort(
    (a, b) => b[1] - a[1]
  )[0][0] as Area);

  return (
    <>
      <header className="wrap">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/scalo-black.png" alt="SCALO" />
        <Link href="/v1-landing">← Volver a la landing</Link>
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
            <div className="mini">Menos clicks, más SCALO.</div>
          </aside>
          <section className="content">
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
                      <label>Nombre y apellido</label>
                      <input
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
                      <label>Empresa</label>
                      <input
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
                      <label>WhatsApp</label>
                      <input
                        required
                        name="whatsapp"
                        autoComplete="tel"
                        value={lead.whatsapp}
                        onChange={(e) =>
                          setLead({ ...lead, whatsapp: e.target.value })
                        }
                      />
                    </div>
                    <div className="field">
                      <label>Email</label>
                      <input
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
                <div className="progress">
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
                  <Link className="primary" href="/v1-landing#auditoria">
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

      <style jsx global>{`
        html, body { overflow-x: hidden; max-width: 100%; }
        .panel, .side, .modalbox, .card, .formgrid, .field, .grid > * { min-width: 0; }
        select, input, textarea { min-width: 0; max-width: 100%; }

        :root {
          --light: #e3e3e3;
          --ink: #1c1a1b;
          --gray: #545454;
          --blue: #38546c;
          --white: #fff;
        }
        body {
          background: var(--light);
          color: var(--ink);
          font-family: "Montserrat", "Arial Narrow", Arial, sans-serif;
        }
        .wrap {
          width: min(980px, calc(100% - 34px));
          margin: auto;
        }
        header {
          padding: 24px 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        header img {
          width: 155px;
        }
        header a {
          font-size: 13px;
          text-decoration: none;
          color: var(--gray);
        }
        .shell {
          min-height: calc(100vh - 92px);
          display: grid;
          place-items: center;
          padding: 28px 0 70px;
        }
        .box {
          width: min(920px, 100%);
          background: #fff;
          border: 1px solid rgba(28, 26, 27, 0.12);
          box-shadow: 0 22px 60px rgba(28, 26, 27, 0.08);
          min-height: 580px;
          display: grid;
          grid-template-columns: 300px 1fr;
        }
        .side {
          background: var(--blue);
          color: #fff;
          padding: 34px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          overflow: hidden;
          position: relative;
        }
        .side:after {
          content: "";
          position: absolute;
          right: -80px;
          bottom: -75px;
          width: 270px;
          height: 270px;
          background: url("/scalo-iso.png") center/contain no-repeat;
          opacity: 0.08;
        }
        .side .tag {
          font-size: 11px;
          letter-spacing: 0.13em;
          text-transform: uppercase;
          font-weight: 800;
        }
        .side h1 {
          font-size: 35px;
          line-height: 1.02;
          letter-spacing: -0.045em;
          margin: 18px 0;
        }
        .side p {
          font-size: 14px;
          line-height: 1.55;
          color: #d9e2e8;
        }
        .side .mini {
          font-size: 12px;
          color: #c7d3dc;
          position: relative;
          z-index: 2;
        }
        .content {
          padding: 34px 42px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .step {
          font-size: 11px;
          color: var(--gray);
          text-transform: uppercase;
          letter-spacing: 0.12em;
          font-weight: 800;
          margin-bottom: 14px;
        }
        h2 {
          font-size: 31px;
          line-height: 1.12;
          margin: 0 0 10px;
          letter-spacing: -0.035em;
        }
        .sub {
          color: var(--gray);
          font-size: 14px;
          line-height: 1.55;
          margin: 0 0 22px;
        }
        .formgrid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        label {
          font-size: 11px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }
        .field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        input {
          padding: 13px;
          border: 1px solid #c9c9c9;
          border-radius: 4px;
          font: inherit;
        }
        .full {
          grid-column: 1 / -1;
        }
        button {
          font: inherit;
        }
        .cta {
          width: 100%;
          border: 0;
          background: var(--ink);
          color: #fff;
          padding: 15px 17px;
          font-weight: 800;
          border-radius: 4px;
          cursor: pointer;
          margin-top: 14px;
        }
        .progress {
          height: 4px;
          background: #dedede;
          margin: 0 0 27px;
        }
        .bar {
          height: 100%;
          background: var(--blue);
          width: 0;
          transition: 0.25s;
        }
        .qnum {
          font-size: 12px;
          font-weight: 800;
          color: var(--blue);
          letter-spacing: 0.09em;
          text-transform: uppercase;
          margin-bottom: 14px;
        }
        .question {
          font-size: 29px;
          line-height: 1.18;
          letter-spacing: -0.035em;
          font-weight: 800;
          min-height: 140px;
          display: flex;
          align-items: center;
        }
        .choices {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-top: 20px;
        }
        .choice {
          padding: 18px;
          border: 1px solid #bdbdbd;
          background: #fff;
          cursor: pointer;
          text-align: left;
          font-weight: 800;
          font-size: 15px;
          border-radius: 5px;
        }
        .choice:hover {
          border-color: var(--blue);
          background: #f4f6f8;
        }
        .choice strong {
          font-size: 18px;
          margin-right: 8px;
          color: var(--blue);
        }
        .score {
          font-size: 78px;
          line-height: 0.85;
          font-weight: 800;
          letter-spacing: -0.07em;
          color: var(--blue);
          margin: 10px 0 17px;
        }
        .badge {
          display: inline-block;
          padding: 8px 10px;
          background: var(--ink);
          color: #fff;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.09em;
          text-transform: uppercase;
          border-radius: 3px;
        }
        .result h2 {
          margin-top: 16px;
        }
        .area {
          border-left: 4px solid var(--blue);
          padding: 12px 16px;
          background: #f1f3f4;
          margin: 18px 0;
          font-size: 14px;
          line-height: 1.55;
        }
        .actions {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }
        .actions a {
          text-decoration: none;
          padding: 13px 16px;
          border-radius: 4px;
          font-size: 13px;
          font-weight: 800;
        }
        .actions .primary {
          background: var(--blue);
          color: #fff;
        }
        .actions .secondary {
          border: 1px solid var(--ink);
        }
        @media (max-width: 760px) {
          .box {
            grid-template-columns: 1fr;
          }
          .side {
            min-height: 210px;
          }
          .content {
            padding: 30px 24px;
          }
          .formgrid {
            grid-template-columns: 1fr;
          }
          .full {
            grid-column: 1;
          }
          .question {
            font-size: 25px;
            min-height: 170px;
          }
        }
      `}</style>
    </>
  );
}
