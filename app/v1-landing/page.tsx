"use client";

import Link from "next/link";
import { useState } from "react";
import { sendLead } from "../../lib/sendLead";

export default function V1Landing() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<
      string,
      string
    >;
    sessionStorage.setItem("scaloLead", JSON.stringify(data));
    sendLead({
      landing: "v1-landing",
      nombre: data.nombre,
      empresa: data.empresa,
      whatsapp: data.whatsapp,
      email: data.email,
      equipo: data.equipo,
      preocupacion: data.preocupacion,
    });
    setSent(true);
  }

  return (
    <>
      <header>
        <div className="wrap nav">
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="logo" src="/scalo-black.png" alt="SCALO" />
            <span className="micro">Scalo System™</span>
          </div>
          <Link className="toplink" href="/v1-leadmagnet">
            Diagnóstico gratis →
          </Link>
        </div>
      </header>
      <main>
        <section className="wrap hero">
          <div>
            <div className="eyebrow">Solo para {"{NICHO}"}</div>
            <h1>
              Vendé más con las oportunidades que{" "}
              <span className="blue">ya generás.</span>
            </h1>
            <p className="lead">
              Implementamos <strong>Scalo System™</strong>, un sistema comercial
              a medida para automatizar seguimientos, reimpactar tu base de datos
              y convertir más, sin sumar comerciales ni depender de más
              publicidad.
            </p>
            <div className="ctas">
              <a className="btn primary" href="#auditoria">
                Solicitar auditoría
              </a>
              <Link className="btn secondary" href="/v1-leadmagnet">
                Medir mi sistema en 2 min
              </Link>
            </div>
            <div className="trust">
              <span>CRM a medida</span>
              <span>Seguimientos automáticos</span>
              <span>Dashboards en tiempo real</span>
            </div>
          </div>
          <div className="panel" id="auditoria">
            <h2>Solicitá una auditoría comercial</h2>
            <p>
              Dejanos tus datos y analizamos dónde puede estar perdiéndose
              facturación.
            </p>
            <form onSubmit={handleSubmit}>
              <div className="formgrid">
                <div className="field">
                  <label>Nombre y apellido</label>
                  <input required name="nombre" autoComplete="name" />
                </div>
                <div className="field">
                  <label>Empresa</label>
                  <input required name="empresa" autoComplete="organization" />
                </div>
                <div className="field">
                  <label>WhatsApp</label>
                  <input
                    required
                    name="whatsapp"
                    inputMode="tel"
                    autoComplete="tel"
                  />
                </div>
                <div className="field">
                  <label>Email</label>
                  <input
                    required
                    name="email"
                    type="email"
                    autoComplete="email"
                  />
                </div>
                <div className="field">
                  <label>Cantidad de comerciales</label>
                  <select required name="equipo" defaultValue="">
                    <option value="">Seleccioná</option>
                    <option>1</option>
                    <option>2–5</option>
                    <option>6–10</option>
                    <option>11–20</option>
                    <option>21+</option>
                  </select>
                </div>
                <div className="field">
                  <label>Principal preocupación</label>
                  <select required name="preocupacion" defaultValue="">
                    <option value="">Seleccioná</option>
                    <option>Falta de seguimiento</option>
                    <option>Leads dispersos</option>
                    <option>No reactivamos la base</option>
                    <option>No tengo métricas claras</option>
                    <option>Dependemos demasiado de cada vendedor</option>
                  </select>
                </div>
                <button className="formbtn" type="submit">
                  SOLICITAR AUDITORÍA →
                </button>
              </div>
              <p className="fine">
                Preview funcional: el formulario no envía datos a ningún
                servidor.
              </p>
              <div
                className="formmsg"
                style={{ display: sent ? "block" : "none" }}
              >
                Listo. En una implementación real, este envío podría crear el
                contacto y disparar el workflow de seguimiento.
              </div>
            </form>
          </div>
        </section>
        <section className="wrap benefits">
          <div className="sectionhead">
            <h3>Menos clicks. Más control comercial.</h3>
            <p>
              Scalo ordena el circuito que ya existe: captura, seguimiento,
              reimpacto, medición y continuidad de la información.
            </p>
          </div>
          <div className="cards">
            <div className="card">
              <span className="num">01 — CENTRALIZAR</span>
              <h4>Una sola fuente de verdad</h4>
              <p>
                Leads, conversaciones, responsables y próximas acciones en un
                mismo sistema.
              </p>
            </div>
            <div className="card">
              <span className="num">02 — AUTOMATIZAR</span>
              <h4>Que ningún lead se enfríe</h4>
              <p>
                Recordatorios y seguimientos para reducir oportunidades
                olvidadas o demoradas.
              </p>
            </div>
            <div className="card">
              <span className="num">03 — MEDIR</span>
              <h4>Ver lo que está pasando</h4>
              <p>
                Dashboards para entender respuesta, conversión y rendimiento sin
                depender de Excels manuales.
              </p>
            </div>
          </div>
        </section>
        <section className="strip">
          <div className="wrap stripin">
            <div>
              <h3>¿Todavía no querés una auditoría?</h3>
              <p>
                Hacé el diagnóstico gratuito y descubrí qué tan aceitado está tu
                sistema comercial.
              </p>
            </div>
            <Link className="btn" href="/v1-leadmagnet">
              HACER EL TEST GRATIS →
            </Link>
          </div>
        </section>
      </main>
      <footer className="wrap">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/scalo-black.png" alt="SCALO" />
        <span>Menos clicks, más SCALO.</span>
      </footer>

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
          --line: rgba(28, 26, 27, 0.15);
        }
        html {
          scroll-behavior: smooth;
        }
        body {
          background: var(--light);
          color: var(--ink);
          font-family: "Montserrat", "Arial Narrow", Arial, sans-serif;
        }
        a {
          color: inherit;
        }
        .wrap {
          width: min(1180px, calc(100% - 40px));
          margin: auto;
        }
        header {
          height: 82px;
          display: flex;
          align-items: center;
          border-bottom: 1px solid var(--line);
        }
        .nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
        }
        .logo {
          width: 172px;
          height: auto;
          display: block;
        }
        .micro {
          font-size: 12px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--gray);
        }
        .toplink {
          text-decoration: none;
          font-size: 13px;
          font-weight: 700;
          padding: 11px 16px;
          border: 1px solid var(--ink);
          border-radius: 999px;
        }
        .hero {
          display: grid;
          grid-template-columns: 1.08fr 0.92fr;
          gap: 64px;
          align-items: center;
          padding: 64px 0 36px;
          min-height: 640px;
        }
        .eyebrow {
          display: inline-flex;
          gap: 10px;
          align-items: center;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin-bottom: 22px;
        }
        .eyebrow:before {
          content: "";
          width: 28px;
          height: 3px;
          background: var(--blue);
        }
        h1 {
          font-size: clamp(46px, 6vw, 82px);
          line-height: 0.94;
          letter-spacing: -0.055em;
          margin: 0 0 24px;
          font-weight: 800;
          max-width: 760px;
        }
        h1 .blue {
          color: var(--blue);
        }
        .lead {
          font-size: 19px;
          line-height: 1.6;
          max-width: 700px;
          margin: 0 0 28px;
          color: #323033;
        }
        .lead strong {
          color: var(--ink);
        }
        .ctas {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin: 0 0 28px;
        }
        .btn {
          border: 0;
          border-radius: 4px;
          padding: 16px 20px;
          font-weight: 800;
          font-size: 14px;
          cursor: pointer;
          text-decoration: none;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          min-height: 52px;
        }
        .btn.primary {
          background: var(--ink);
          color: #fff;
        }
        .btn.secondary {
          border: 1px solid var(--ink);
          background: transparent;
        }
        .btn:hover {
          transform: translateY(-1px);
        }
        .trust {
          display: flex;
          flex-wrap: wrap;
          gap: 10px 22px;
          font-size: 13px;
          color: var(--gray);
        }
        .trust span:before {
          content: "✓";
          color: var(--blue);
          font-weight: 900;
          margin-right: 7px;
        }
        .panel {
          background: var(--ink);
          color: #fff;
          padding: 28px;
          border-radius: 22px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 24px 60px rgba(28, 26, 27, 0.18);
        }
        .panel:after {
          content: "";
          position: absolute;
          right: -52px;
          top: -36px;
          width: 220px;
          height: 220px;
          background-image: url("/scalo-iso.png");
          background-repeat: no-repeat;
          background-size: contain;
          opacity: 0.06;
          transform: rotate(7deg);
        }
        .panel h2 {
          font-size: 24px;
          margin: 0 0 5px;
        }
        .panel p {
          margin: 0 0 22px;
          color: #cfcfcf;
          line-height: 1.5;
        }
        .formgrid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .field {
          display: flex;
          flex-direction: column;
          gap: 7px;
        }
        .field.full {
          grid-column: 1 / -1;
        }
        label {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.09em;
          color: #cfcfcf;
          font-weight: 700;
        }
        input,
        select {
          width: 100%;
          border: 1px solid rgba(255, 255, 255, 0.18);
          background: #272527;
          color: #fff;
          border-radius: 6px;
          padding: 13px 14px;
          outline: none;
          font: inherit;
        }
        input:focus,
        select:focus {
          border-color: #8fa7ba;
        }
        option {
          color: #1c1a1b;
        }
        .formbtn {
          grid-column: 1 / -1;
          background: var(--blue);
          color: #fff;
          border: 0;
          border-radius: 6px;
          padding: 15px;
          font-weight: 800;
          font-size: 14px;
          cursor: pointer;
          margin-top: 2px;
        }
        .fine {
          font-size: 11px !important;
          color: #9f9f9f !important;
          margin: 11px 0 0 !important;
        }
        .formmsg {
          margin-top: 14px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          padding: 12px;
          border-radius: 6px;
          font-size: 13px;
        }
        .benefits {
          padding: 34px 0 72px;
        }
        .sectionhead {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 30px;
          border-top: 1px solid var(--ink);
          padding-top: 22px;
          margin-bottom: 26px;
        }
        .sectionhead h3 {
          font-size: 30px;
          margin: 0;
          letter-spacing: -0.03em;
        }
        .sectionhead p {
          max-width: 520px;
          color: var(--gray);
          line-height: 1.55;
          margin: 0;
        }
        .cards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
        }
        .card {
          border: 1px solid var(--line);
          background: rgba(255, 255, 255, 0.28);
          padding: 23px;
          min-height: 170px;
        }
        .num {
          font-size: 12px;
          font-weight: 800;
          color: var(--blue);
          letter-spacing: 0.1em;
        }
        .card h4 {
          font-size: 19px;
          margin: 24px 0 8px;
        }
        .card p {
          font-size: 14px;
          line-height: 1.55;
          color: var(--gray);
          margin: 0;
        }
        .strip {
          background: var(--blue);
          color: #fff;
        }
        .stripin {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 26px;
          padding: 24px 0;
        }
        .strip h3 {
          margin: 0;
          font-size: 22px;
        }
        .strip p {
          margin: 4px 0 0;
          color: #d9e2e8;
          font-size: 14px;
        }
        .strip .btn {
          background: #fff;
          color: var(--ink);
          white-space: nowrap;
        }
        footer {
          padding: 28px 0 34px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: var(--gray);
          font-size: 12px;
        }
        footer img {
          width: 128px;
        }
        @media (max-width: 860px) {
          .hero {
            grid-template-columns: 1fr;
            gap: 36px;
            padding-top: 42px;
          }
          .panel {
            border-radius: 14px;
          }
          .cards {
            grid-template-columns: 1fr;
          }
          .sectionhead {
            align-items: flex-start;
            flex-direction: column;
          }
          .stripin {
            align-items: flex-start;
            flex-direction: column;
          }
          h1 {
            font-size: clamp(48px, 15vw, 70px);
          }
        }
        @media (max-width: 560px) {
          .wrap {
            width: min(100% - 26px, 1180px);
          }
          header {
            height: 72px;
          }
          .logo {
            width: 145px;
          }
          .micro,
          .toplink {
            display: none;
          }
          .formgrid {
            grid-template-columns: 1fr;
          }
          .field.full,
          .formbtn {
            grid-column: 1;
          }
          .hero {
            min-height: 0;
            padding-bottom: 22px;
          }
          .lead {
            font-size: 17px;
          }
        }
      `}</style>
    </>
  );
}
