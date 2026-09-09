import Link from "next/link";

export default function Home() {
  return (
    <div className="wrap">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="logo" src="/scalo-black.png" alt="SCALO" />
      <h1>Previews · Landing + Lead Magnet</h1>
      <p>
        Dos direcciones creativas. Cada versión tiene una landing corta y un
        diagnóstico interactivo.
      </p>
      <div className="grid">
        <div className="card">
          <h2>Versión 1 · Landing</h2>
          <p>
            Dirección clara y profesional, foco en auditoría y sistema
            comercial.
          </p>
          <Link href="/v1-landing">Abrir preview →</Link>
        </div>
        <div className="card">
          <h2>Versión 1 · Lead Magnet</h2>
          <p>
            Quiz paso a paso, captura de datos antes del diagnóstico y resultado
            por puntaje.
          </p>
          <Link href="/v1-leadmagnet">Abrir preview →</Link>
        </div>
        <div className="card dark">
          <h2>Versión 2 · Landing</h2>
          <p>
            Dirección más editorial, oscura y agresiva: “fugas comerciales”.
          </p>
          <Link href="/v2-landing">Abrir preview →</Link>
        </div>
        <div className="card dark">
          <h2>Versión 2 · Lead Magnet</h2>
          <p>
            Scorecard completo, resultado bloqueado hasta dejar datos y foco por
            área.
          </p>
          <Link href="/v2-leadmagnet">Abrir preview →</Link>
        </div>
      </div>

      <style>{`
        body{background:#E3E3E3;color:#1C1A1B;font-family:'Montserrat','Arial Narrow',Arial,sans-serif;}
        .wrap{width:min(1100px,calc(100% - 36px));margin:60px auto}
        .logo{width:175px;height:auto}
        h1{font-size:48px;letter-spacing:-.04em;margin:30px 0 10px}
        p{color:#545454;line-height:1.6}
        .grid{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-top:34px}
        .card{background:#fff;border:1px solid #c5c5c5;padding:25px}
        .card.dark{background:#1C1A1B;color:#fff;border-color:#1C1A1B}
        .card h2{margin:0 0 8px;font-size:24px}
        .card p{font-size:14px}
        .dark p{color:#bbb}
        .card a{display:inline-block;margin-top:8px;text-decoration:none;font-weight:800;color:inherit;border-bottom:2px solid #38546C;padding-bottom:3px}
        @media(max-width:700px){.grid{grid-template-columns:1fr}h1{font-size:38px}}
      `}</style>
    </div>
  );
}
