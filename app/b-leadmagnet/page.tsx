"use client";

import { useEffect, useState } from "react";
import { sendLead } from "../../lib/sendLead";
import { DEFAULT_COUNTRY_CODE } from "../../lib/countryCodes";
import { PhoneField } from "../../components/PhoneField";
import { MetaPixel } from "../../components/MetaPixel";

type Area = "control" | "seguimiento" | "reactivacion" | "medicion";

const questions: { text: string; area: Area }[] = [
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

const focusMsg: Record<Area, string> = {
  control: "Foco recomendado: centralización y control de oportunidades.",
  seguimiento: "Foco recomendado: seguimiento y velocidad de respuesta.",
  reactivacion: "Foco recomendado: reimpacto sistemático de bases antiguas.",
  medicion:
    "Foco recomendado: métricas, dashboards y continuidad de la información.",
};

export default function V2LeadMagnet() {
  const [state, setState] = useState<Record<number, number>>({});
  const [modalOpen, setModalOpen] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [whatsappCode, setWhatsappCode] = useState(DEFAULT_COUNTRY_CODE);
  const [lead, setLead] = useState({
    nombre: "",
    empresa: "",
    whatsapp: "",
    email: "",
  });

  useEffect(() => {
    const stored = sessionStorage.getItem("scaloLeadV2");
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

  const answered = Object.keys(state).length;
  const ready = answered === 10;

  function pick(index: number, value: number) {
    setState((prev) => ({ ...prev, [index]: value }));
  }

  const score = Object.values(state).reduce((s, v) => s + v, 0);
  let pill = "",
    title = "",
    text = "";
  if (score >= 8) {
    pill = "Sistema aceitado";
    title = "La base está sólida. Ahora toca optimizar.";
    text =
      "Tenés una estructura comercial medible. El siguiente salto está en mejorar automatizaciones, reimpactos y conversiones.";
  } else if (score >= 5) {
    pill = "Perdiendo eficiencia";
    title = "Hay sistema, pero todavía se escapan oportunidades.";
    text =
      "Parte del proceso funciona, aunque algunos pasos todavía dependen demasiado de tareas manuales, personas o información dispersa.";
  } else {
    pill = "Fugas comerciales";
    title = "Antes de sumar leads, conviene cerrar las fugas.";
    text =
      "Tu sistema puede estar generando oportunidades que no se trabajan de manera consistente. Ordenar, medir y automatizar debería ser la prioridad.";
  }
  const misses: Record<Area, number> = {
    control: 0,
    seguimiento: 0,
    reactivacion: 0,
    medicion: 0,
  };
  Object.entries(state).forEach(([idx, v]) => {
    if (!v) misses[questions[Number(idx)].area]++;
  });
  const focusKey = (Object.entries(misses).sort(
    (a, b) => b[1] - a[1]
  )[0][0] as Area);

  function submitGate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const whatsapp = `${whatsappCode}${lead.whatsapp}`;
    sessionStorage.setItem(
      "scaloLeadV2",
      JSON.stringify({ ...lead, whatsapp })
    );
    sendLead({
      landing: "b-leadmagnet",
      nombre: lead.nombre,
      empresa: lead.empresa,
      whatsapp,
      email: lead.email,
      diagnostico: { puntaje: score, resultado: pill, areaFoco: focusKey },
      completedLeadMagnet: true,
    });
    setShowResult(true);
  }

  return (
    <>
      <MetaPixel />
      <header>
        <div className="wrap nav">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/scalo-white.png" alt="SCALO" />
          <a href="/b">← Volver a la landing</a>
        </div>
      </header>
      <main>
        <section className="wrap intro">
          <div>
            <div className="kicker">Scorecard gratuito · 10 preguntas</div>
            <h1>Medí las fugas de tu sistema comercial.</h1>
          </div>
          <p>
            Marcá <strong>SÍ</strong> o <strong>NO</strong>. Cuando completes las
            10, desbloqueás un diagnóstico instantáneo con el área que más
            conviene revisar.
          </p>
        </section>
        <section className="wrap grid">
          <div className="questions">
            {questions.map((q, idx) => {
              const val = state[idx];
              return (
                <article
                  key={idx}
                  className={`q${val !== undefined ? " answered" : ""}`}
                >
                  <div className="qtop">
                    <span>{String(idx + 1).padStart(2, "0")}</span>
                    <p>{q.text}</p>
                  </div>
                  <div className="toggle">
                    <button
                      type="button"
                      className={val === 1 ? "on" : ""}
                      onClick={() => pick(idx, 1)}
                    >
                      SÍ
                    </button>
                    <button
                      type="button"
                      className={val === 0 ? "on" : ""}
                      onClick={() => pick(idx, 0)}
                    >
                      NO
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
          <aside className="side">
            <div className="small">Progreso</div>
            <div className="count">
              <span>{answered}</span>/10
            </div>
            <div className="meter">
              <i style={{ width: `${answered * 10}%` }} />
            </div>
            <p>El resultado se calcula con 1 punto por cada “Sí”.</p>
            <button
              className={`unlock${ready ? " ready" : ""}`}
              onClick={() => ready && setModalOpen(true)}
            >
              DESBLOQUEAR RESULTADO →
            </button>
            <p className="hint">Primero respondé las 10 preguntas.</p>
          </aside>
        </section>
      </main>
      <div
        className={`modal${modalOpen ? " open" : ""}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) setModalOpen(false);
        }}
      >
        <div className="modalbox">
          <button className="close" onClick={() => setModalOpen(false)}>
            ×
          </button>
          {!showResult ? (
            <div>
              <div className="kicker" style={{ color: "#38546c" }}>
                Último paso
              </div>
              <h2>¿A dónde te enviamos el diagnóstico?</h2>
              <p>
                Completá tus datos para revelar el resultado y dejar listo el
                contacto para un seguimiento personalizado.
              </p>
              <form onSubmit={submitGate}>
                <div className="formgrid">
                  <div className="field">
                    <label>Nombre</label>
                    <input
                      required
                      name="nombre"
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
                      value={lead.empresa}
                      onChange={(e) =>
                        setLead({ ...lead, empresa: e.target.value })
                      }
                    />
                  </div>
                  <div className="field">
                    <label>WhatsApp</label>
                    <PhoneField
                      code={whatsappCode}
                      onCodeChange={setWhatsappCode}
                      number={lead.whatsapp}
                      onNumberChange={(v) => setLead({ ...lead, whatsapp: v })}
                    />
                  </div>
                  <div className="field">
                    <label>Email</label>
                    <input
                      required
                      name="email"
                      type="email"
                      value={lead.email}
                      onChange={(e) =>
                        setLead({ ...lead, email: e.target.value })
                      }
                    />
                  </div>
                  <button className="submit">ENVIAR →</button>
                </div>
              </form>
            </div>
          ) : (
            <div className="result show">
              <div className="kicker" style={{ color: "#38546c" }}>
                Tu diagnóstico
              </div>
              <div className="rscore">{score}/10</div>
              <span className="pill">{pill}</span>
              <h3>{title}</h3>
              <p>{text}</p>
              <div className="focus">{focusMsg[focusKey]}</div>
              <a className="rcta" href="/b#contacto">
                QUIERO REVISAR ESTO CON SCALO →
              </a>
            </div>
          )}
        </div>
      </div>

      <style jsx global>{`
        html, body { overflow-x: hidden; max-width: 100%; }
        .panel, .side, .modalbox, .card, .formgrid, .field, .grid > * { min-width: 0; }
        select, input, textarea { min-width: 0; max-width: 100%; }

        :root {
          --ink: #1c1a1b;
          --blue: #38546c;
          --light: #e3e3e3;
          --gray: #545454;
          --white: #fff;
        }
        body {
          background: #111;
          color: #fff;
          font-family: "Montserrat", "Arial Narrow", Arial, sans-serif;
        }
        .wrap {
          width: min(1160px, calc(100% - 36px));
          margin: auto;
        }
        header {
          padding: 22px 0;
          border-bottom: 1px solid #2c2a2c;
          position: sticky;
          top: 0;
          background: rgba(17, 17, 17, 0.94);
          backdrop-filter: blur(10px);
          z-index: 5;
        }
        .nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .nav img {
          width: 155px;
        }
        .nav a {
          font-size: 12px;
          text-decoration: none;
          color: #bdbdbd;
        }
        .intro {
          padding: 52px 0 34px;
          display: grid;
          grid-template-columns: 1.25fr 0.75fr;
          gap: 60px;
          align-items: end;
        }
        .kicker {
          font-size: 11px;
          color: #9eb1bf;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          font-weight: 800;
          margin-bottom: 16px;
        }
        h1 {
          font-size: clamp(44px, 6vw, 76px);
          line-height: 0.94;
          letter-spacing: -0.055em;
          margin: 0;
        }
        .intro p {
          color: #bdbdbd;
          line-height: 1.6;
          margin: 0;
        }
        .intro strong {
          color: #fff;
        }
        .grid {
          display: grid;
          grid-template-columns: 1fr 310px;
          gap: 28px;
          align-items: start;
          padding-bottom: 80px;
        }
        .questions {
          display: grid;
          gap: 10px;
        }
        .q {
          background: #1b191b;
          border: 1px solid #313031;
          padding: 18px 19px;
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 20px;
          align-items: center;
        }
        .q.answered {
          border-color: #5c7487;
        }
        .qtop {
          display: grid;
          grid-template-columns: 36px 1fr;
          gap: 12px;
          align-items: start;
        }
        .qtop span {
          font-size: 11px;
          color: #8fa7b9;
          font-weight: 800;
          padding-top: 3px;
        }
        .qtop p {
          margin: 0;
          font-size: 14px;
          line-height: 1.5;
          color: #ececec;
        }
        .toggle {
          display: grid;
          grid-template-columns: 58px 58px;
          border: 1px solid #474547;
        }
        .toggle button {
          background: transparent;
          color: #bbb;
          border: 0;
          padding: 10px;
          font-weight: 800;
          cursor: pointer;
        }
        .toggle button + button {
          border-left: 1px solid #474547;
        }
        .toggle button.on {
          background: var(--blue);
          color: #fff;
        }
        .side {
          position: sticky;
          top: 92px;
          background: var(--blue);
          padding: 24px;
          overflow: hidden;
        }
        .side:after {
          content: "";
          position: absolute;
          right: -55px;
          bottom: -42px;
          width: 170px;
          height: 170px;
          background: url("/scalo-iso.png") center/contain no-repeat;
          opacity: 0.08;
        }
        .side .small {
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: #d2dde4;
          font-weight: 800;
        }
        .count {
          font-size: 66px;
          line-height: 1;
          font-weight: 800;
          letter-spacing: -0.06em;
          margin: 12px 0 2px;
        }
        .side p {
          font-size: 13px;
          line-height: 1.5;
          color: #d9e2e8;
          position: relative;
          z-index: 2;
        }
        .meter {
          height: 5px;
          background: rgba(255, 255, 255, 0.2);
          margin: 18px 0;
        }
        .meter i {
          display: block;
          height: 100%;
          width: 0;
          background: #fff;
          transition: 0.25s;
        }
        .unlock {
          width: 100%;
          border: 0;
          background: #fff;
          color: #111;
          padding: 13px;
          font-weight: 800;
          cursor: pointer;
          opacity: 0.45;
          pointer-events: none;
          position: relative;
          z-index: 2;
        }
        .unlock.ready {
          opacity: 1;
          pointer-events: auto;
        }
        .hint {
          font-size: 11px !important;
          color: #c6d2da !important;
        }
        .modal {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.72);
          display: none;
          place-items: center;
          z-index: 10;
          padding: 20px;
        }
        .modal.open {
          display: grid;
        }
        .modalbox {
          width: min(620px, 100%);
          background: var(--light);
          color: var(--ink);
          padding: 30px;
          position: relative;
        }
        .close {
          position: absolute;
          right: 16px;
          top: 12px;
          background: none;
          border: 0;
          font-size: 28px;
          cursor: pointer;
        }
        .modal h2 {
          font-size: 32px;
          letter-spacing: -0.04em;
          margin: 0 0 9px;
        }
        .modal p {
          color: var(--gray);
          font-size: 14px;
          line-height: 1.55;
        }
        .formgrid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-top: 20px;
        }
        .field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        label {
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.09em;
          font-weight: 800;
        }
        input {
          padding: 12px;
          border: 1px solid #b9b9b9;
          background: #fff;
          font: inherit;
        }
        .full {
          grid-column: 1 / -1;
        }
        .submit {
          grid-column: 1 / -1;
          background: var(--ink);
          color: #fff;
          border: 0;
          padding: 14px;
          font-weight: 800;
          cursor: pointer;
        }
        .rscore {
          font-size: 78px;
          color: var(--blue);
          font-weight: 800;
          letter-spacing: -0.07em;
          line-height: 0.9;
          margin: 16px 0;
        }
        .pill {
          display: inline-block;
          background: var(--ink);
          color: #fff;
          padding: 7px 9px;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
        .result h3 {
          font-size: 29px;
          line-height: 1.1;
          letter-spacing: -0.035em;
          margin: 16px 0 8px;
        }
        .focus {
          background: #d7dde1;
          border-left: 5px solid var(--blue);
          padding: 13px 15px;
          color: #283038;
          line-height: 1.5;
          font-size: 13px;
          margin: 18px 0;
        }
        .rcta {
          display: inline-block;
          background: var(--blue);
          color: #fff;
          text-decoration: none;
          padding: 13px 15px;
          font-size: 12px;
          font-weight: 800;
        }
        @media (max-width: 850px) {
          .intro,
          .grid {
            grid-template-columns: 1fr;
          }
          .side {
            position: relative;
            top: 0;
            order: -1;
          }
          .q {
            grid-template-columns: 1fr;
          }
          .toggle {
            width: 118px;
          }
        }
        @media (max-width: 560px) {
          .wrap {
            width: calc(100% - 26px);
          }
          .formgrid {
            grid-template-columns: 1fr;
          }
          .full,
          .submit {
            grid-column: 1;
          }
          .intro {
            padding-top: 36px;
          }
          h1 {
            font-size: 52px;
          }
        }
      `}</style>
    </>
  );
}
