"use client";

import Link from "next/link";
import { useState } from "react";
import { sendLead } from "../../lib/sendLead";
import { DEFAULT_COUNTRY_CODE } from "../../lib/countryCodes";
import { PhoneField } from "../../components/PhoneField";

export default function V2Landing() {
  const [sent, setSent] = useState(false);
  const [whatsappCode, setWhatsappCode] = useState(DEFAULT_COUNTRY_CODE);
  const [whatsappNumber, setWhatsappNumber] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<
      string,
      string
    >;
    const whatsapp = `${whatsappCode}${whatsappNumber}`;
    sessionStorage.setItem(
      "scaloLeadV2",
      JSON.stringify({ ...data, whatsapp })
    );
    sendLead({
      landing: "v2-landing",
      nombre: data.nombre,
      empresa: data.empresa,
      whatsapp,
      email: data.email,
    });
    setSent(true);
  }

  return (
    <>
      <header>
        <div className="wrap nav">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="logo" src="/scalo-white.png" alt="SCALO" />
          <Link href="/v2-leadmagnet">Test comercial · 2 min →</Link>
        </div>
      </header>
      <main>
        <section className="wrap hero">
          <div>
            <div className="kicker">Scalo System™ · Sistema comercial</div>
            <h1>
              Tu problema puede no ser la cantidad de leads.{" "}
              <em>Puede ser lo que pasa después.</em>
            </h1>
            <p className="copy">
              Leads que ya pagaste + seguimientos que no se hacen + bases que no
              se reimpactan + oportunidades que nadie controla ={" "}
              <strong>facturación potencial desaprovechada.</strong>
            </p>
            <div className="ctas">
              <Link className="btn blue" href="/v2-leadmagnet">
                MEDIR MIS FUGAS →
              </Link>
              <a className="btn ghost" href="#contacto">
                Quiero hablar con Scalo
              </a>
            </div>
          </div>
          <div className="leakbox">
            <div className="title">
              4 fugas que un sistema comercial debería controlar
            </div>
            <div className="leaks">
              <div className="leak">
                <span className="n">01</span>
                <div>
                  <b>Leads dispersos</b>
                  <small>
                    Información en distintos lugares y sin próxima acción.
                  </small>
                </div>
              </div>
              <div className="leak">
                <span className="n">02</span>
                <div>
                  <b>Seguimiento manual</b>
                  <small>Oportunidades que dependen de la memoria del equipo.</small>
                </div>
              </div>
              <div className="leak">
                <span className="n">03</span>
                <div>
                  <b>Base dormida</b>
                  <small>Prospectos antiguos sin reimpactos sistemáticos.</small>
                </div>
              </div>
              <div className="leak">
                <span className="n">04</span>
                <div>
                  <b>Poca visibilidad</b>
                  <small>Métricas que llegan tarde o dependen de un Excel.</small>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="mid">
          <div className="wrap midgrid">
            <h2>Primero aprovechá mejor lo que ya tenés.</h2>
            <div>
              <p>
                Scalo implementa un ecosistema comercial a medida para que el
                crecimiento no dependa de sumar tareas manuales. Centraliza,
                automatiza, reimpacta y mide.
              </p>
              <div className="equation">
                No siempre necesitás más leads. Primero necesitás aprovechar
                mejor los que ya tenés.
              </div>
            </div>
          </div>
        </section>
        <section className="capture" id="contacto">
          <div className="wrap capturegrid">
            <div>
              <div className="kicker">Auditoría comercial</div>
              <h2>
                ¿Querés saber dónde están las principales fugas de tu empresa?
              </h2>
              <p>
                Dejanos tus datos. Podemos usar el resultado del diagnóstico como
                punto de partida para revisar tu sistema comercial.
              </p>
            </div>
            <form className="form" onSubmit={handleSubmit}>
              <div className="row">
                <div className="field">
                  <label>Nombre</label>
                  <input required name="nombre" />
                </div>
                <div className="field">
                  <label>Empresa</label>
                  <input required name="empresa" />
                </div>
              </div>
              <div className="row">
                <div className="field">
                  <label>WhatsApp</label>
                  <PhoneField
                    code={whatsappCode}
                    onCodeChange={setWhatsappCode}
                    number={whatsappNumber}
                    onNumberChange={setWhatsappNumber}
                  />
                </div>
                <div className="field">
                  <label>Email</label>
                  <input required name="email" type="email" />
                </div>
              </div>
              <button className="send">QUIERO ANALIZAR MI SISTEMA →</button>
              <div
                className="success"
                style={{ display: sent ? "block" : "none" }}
              >
                Datos guardados en esta preview. El próximo paso puede conectar
                el formulario con tu CRM/workflow.
              </div>
            </form>
          </div>
        </section>
      </main>
      <footer className="wrap">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/scalo-white.png" alt="SCALO" />
        <span>Menos clicks, más SCALO.</span>
      </footer>

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
          background: var(--ink);
          color: #fff;
          font-family: "Montserrat", "Arial Narrow", Arial, sans-serif;
        }
        .wrap {
          width: min(1200px, calc(100% - 42px));
          margin: auto;
        }
        a {
          color: inherit;
        }
        header {
          padding: 23px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.12);
        }
        .nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .logo {
          width: 166px;
        }
        .nav a {
          font-size: 12px;
          text-decoration: none;
          font-weight: 800;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          color: #d8d8d8;
        }
        .hero {
          display: grid;
          grid-template-columns: 1.18fr 0.82fr;
          min-height: 690px;
          gap: 50px;
          align-items: center;
          position: relative;
          padding: 60px 0;
        }
        .hero:before {
          content: "";
          position: absolute;
          left: -210px;
          top: 15%;
          width: 390px;
          height: 390px;
          background: url("/scalo-iso.png") center/contain no-repeat;
          opacity: 0.025;
          transform: rotate(-8deg);
        }
        .kicker {
          color: #afc0cc;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          margin-bottom: 20px;
        }
        h1 {
          font-size: clamp(52px, 7vw, 94px);
          line-height: 0.9;
          letter-spacing: -0.06em;
          margin: 0 0 28px;
          max-width: 820px;
        }
        h1 em {
          font-style: normal;
          color: #8aa3b6;
        }
        .copy {
          font-size: 18px;
          line-height: 1.65;
          max-width: 690px;
          color: #c9c9c9;
          margin-bottom: 28px;
        }
        .copy strong {
          color: #fff;
        }
        .ctas {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }
        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 16px 18px;
          border-radius: 999px;
          font-weight: 800;
          font-size: 13px;
          text-decoration: none;
        }
        .btn.blue {
          background: var(--blue);
        }
        .btn.ghost {
          border: 1px solid rgba(255, 255, 255, 0.35);
        }
        .leakbox {
          background: var(--blue);
          padding: 30px;
          border-radius: 6px;
          box-shadow: 18px 18px 0 #101010;
          position: relative;
          overflow: hidden;
        }
        .leakbox:after {
          content: "";
          position: absolute;
          right: -65px;
          bottom: -60px;
          width: 210px;
          height: 210px;
          background: url("/scalo-iso.png") center/contain no-repeat;
          opacity: 0.08;
        }
        .leakbox .title {
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.13em;
          font-weight: 800;
          color: #dbe4ea;
          margin-bottom: 22px;
        }
        .leaks {
          display: grid;
          gap: 10px;
          position: relative;
          z-index: 2;
        }
        .leak {
          display: grid;
          grid-template-columns: 36px 1fr;
          gap: 12px;
          align-items: center;
          background: rgba(28, 26, 27, 0.22);
          padding: 14px;
        }
        .leak .n {
          width: 30px;
          height: 30px;
          border: 1px solid rgba(255, 255, 255, 0.45);
          display: grid;
          place-items: center;
          border-radius: 50%;
          font-weight: 800;
          font-size: 11px;
        }
        .leak b {
          font-size: 14px;
        }
        .leak small {
          display: block;
          color: #d7e0e6;
          margin-top: 3px;
          line-height: 1.35;
        }
        .mid {
          background: var(--light);
          color: var(--ink);
          padding: 72px 0;
        }
        .midgrid {
          display: grid;
          grid-template-columns: 0.8fr 1.2fr;
          gap: 66px;
          align-items: start;
        }
        .mid h2 {
          font-size: 48px;
          line-height: 1;
          letter-spacing: -0.045em;
          margin: 0;
        }
        .mid p {
          font-size: 17px;
          line-height: 1.65;
          color: var(--gray);
          margin: 0 0 22px;
        }
        .equation {
          font-size: 15px;
          line-height: 1.6;
          border-left: 5px solid var(--blue);
          padding: 16px 20px;
          background: #d7d7d7;
          font-weight: 700;
        }
        .capture {
          padding: 72px 0;
        }
        .capturegrid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }
        .capture h2 {
          font-size: 44px;
          line-height: 1.05;
          letter-spacing: -0.045em;
          margin: 0 0 14px;
        }
        .capture p {
          color: #b9b9b9;
          line-height: 1.6;
        }
        .form {
          background: #252325;
          padding: 24px;
          border: 1px solid rgba(255, 255, 255, 0.12);
        }
        .row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }
        .field {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 10px;
        }
        label {
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.11em;
          color: #b9b9b9;
          font-weight: 800;
        }
        input {
          background: #1c1a1b;
          border: 1px solid #4b494b;
          color: #fff;
          padding: 13px;
          font: inherit;
        }
        button {
          font: inherit;
        }
        .send {
          width: 100%;
          background: var(--blue);
          color: #fff;
          border: 0;
          padding: 15px;
          font-weight: 800;
          cursor: pointer;
        }
        .success {
          font-size: 13px;
          color: #cfe0ea;
          margin: 12px 0 0;
        }
        footer {
          padding: 28px 0;
          border-top: 1px solid rgba(255, 255, 255, 0.12);
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: #9a9a9a;
          font-size: 12px;
        }
        footer img {
          width: 130px;
        }
        @media (max-width: 850px) {
          .hero,
          .midgrid,
          .capturegrid {
            grid-template-columns: 1fr;
          }
          .hero {
            min-height: 0;
            padding: 48px 0 70px;
          }
          .leakbox {
            box-shadow: 10px 10px 0 #101010;
          }
          .mid h2,
          .capture h2 {
            font-size: 40px;
          }
        }
        @media (max-width: 560px) {
          .wrap {
            width: calc(100% - 28px);
          }
          .nav a {
            display: none;
          }
          .row {
            grid-template-columns: 1fr;
          }
          h1 {
            font-size: 58px;
          }
        }
      `}</style>
    </>
  );
}
