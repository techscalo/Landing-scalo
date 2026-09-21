"use client";

import Link from "next/link";
import { useState } from "react";
import { sendLead } from "../../lib/sendLead";
import { DEFAULT_COUNTRY_CODE } from "../../lib/countryCodes";
import { PhoneField } from "../../components/PhoneField";
import { MetaPixel } from "../../components/MetaPixel";

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
      JSON.stringify({ ...data, whatsapp }),
    );
    sendLead({
      landing: "b",
      nombre: data.nombre,
      empresa: data.empresa,
      whatsapp,
      email: data.email,
    });
    setSent(true);
  }

  return (
    <>
      <MetaPixel />
      <header>
        <div className="wrap nav">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="logo" src="/scalo-white.png" alt="SCALO" />
          <Link href="/a-leadmagnet">Test comercial · 2 min →</Link>
        </div>
      </header>
      <main>
        <section className="wrap hero">
          <div>
            <div className="pill">
              <span>SCALO SYSTEM™</span> Sistema comercial
            </div>
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
              <Link className="btn blue" href="/a-leadmagnet">
                MEDIR MIS FUGAS →
              </Link>
              <a className="btn ghost" href="#contacto">
                Quiero hablar con Scalo
              </a>
            </div>
          </div>
          <div className="hero-meta">
            <div>
              EL FOCO<b>Más oportunidades aprovechadas</b>
            </div>
            <div>
              EL MÉTODO<b>Centralizar · Automatizar · Medir</b>
            </div>
          </div>
          <a className="scroll-cue" href="#fugas">
            <span /> EXPLORÁ EL SISTEMA ↓
          </a>
        </section>
        <section className="wrap leak-section" id="fugas">
          <div className="kicker">01 · Dónde se pierden las ventas</div>
          <h2>
            Las oportunidades están.
            <br />
            <em>Las fugas, también.</em>
          </h2>
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
                  <small>
                    Oportunidades que dependen de la memoria del equipo.
                  </small>
                </div>
              </div>
              <div className="leak">
                <span className="n">03</span>
                <div>
                  <b>Base dormida</b>
                  <small>
                    Prospectos antiguos sin reimpactos sistemáticos.
                  </small>
                </div>
              </div>
              <div className="leak">
                <span className="n">04</span>
                <div>
                  <b>Poca visibilidad</b>
                  <small>
                    Métricas que llegan tarde o dependen de un Excel.
                  </small>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="mid">
          <div className="wrap midgrid">
            <div>
              <div className="kicker">02 · El sistema</div>
              <h2>
                Primero aprovechá mejor <em>lo que ya tenés.</em>
              </h2>
            </div>
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
              <div className="kicker">03 · Auditoría comercial</div>
              <h2>
                ¿Querés saber dónde están las principales fugas de tu empresa?
              </h2>
              <p>
                Dejanos tus datos. Podemos usar el resultado del diagnóstico
                como punto de partida para revisar tu sistema comercial.
              </p>
            </div>
            <form className="form" onSubmit={handleSubmit}>
              <div className="form-heading">
                Empecemos por tu negocio.
                <span>Dejanos tus datos para analizar tu sistema.</span>
              </div>
              <div className="row">
                <div className="field">
                  <label htmlFor="b-nombre">Nombre</label>
                  <input id="b-nombre" required name="nombre" />
                </div>
                <div className="field">
                  <label htmlFor="b-empresa">Empresa</label>
                  <input id="b-empresa" required name="empresa" />
                </div>
              </div>
              <div className="row">
                <div className="field">
                  <label htmlFor="b-whatsapp">WhatsApp</label>
                  <PhoneField
                    id="b-whatsapp"
                    code={whatsappCode}
                    onCodeChange={setWhatsappCode}
                    number={whatsappNumber}
                    onNumberChange={setWhatsappNumber}
                  />
                </div>
                <div className="field">
                  <label htmlFor="b-email">Email</label>
                  <input id="b-email" required name="email" type="email" />
                </div>
              </div>
              <button className="send">QUIERO ANALIZAR MI SISTEMA →</button>
              <div
                className="success"
                role="status"
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
    </>
  );
}
