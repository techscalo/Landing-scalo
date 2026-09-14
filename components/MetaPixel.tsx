"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const PIXEL_ID = "1447152853923966";

// Un solo evento desde el front: PageView. Lead y CompleteRegistration los
// manda GoHighLevel por la API de conversiones cuando entra el contacto con
// la etiqueta landing-scalo, para no duplicar eventos entre front y server.
//
// Id del Script atado al pathname: next/script dedupea por `id` a nivel de
// toda la sesion del browser (no por mount), asi que con un id fijo el
// PageView solo dispararia una vez en total y no al navegar entre las 4
// paginas sin recarga completa (ej: /a -> /a-leadmagnet via <Link>).
export function MetaPixel() {
  const pathname = usePathname();

  useEffect(() => {
    const fbclid = new URLSearchParams(window.location.search).get("fbclid");
    if (fbclid) sessionStorage.setItem("fbclid", fbclid);
  }, []);

  return (
    <Script id={`meta-pixel-${pathname}`} strategy="afterInteractive">
      {`
        !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
        n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
        document,'script','https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${PIXEL_ID}');
        fbq('track', 'PageView');
      `}
    </Script>
  );
}
