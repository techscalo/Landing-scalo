# Landing Scalo

Landing y diagnóstico comercial de Scalo en **Next.js 16** (App Router, TypeScript).

## Rutas

| Ruta | Descripción |
|------|-------------|
| `/b` | Landing oscura + formulario de auditoría |
| `/a-leadmagnet` | Diagnóstico de 10 preguntas con resultado y enlace a `/b#contacto` |
| `/` y `/a` | Redirección a `/b` |
| `/b-leadmagnet` | Redirección a `/a-leadmagnet` |

Las páginas se sirven sin almacenar HTML y la navegación entre ellas carga una respuesta nueva. `/actualizar` recupera el diagnóstico si un navegador conserva una respuesta vieja, sin borrar cookies ni almacenamiento de formularios.

Las redirecciones conservan los parámetros de campaña de la URL. Ya no se distribuyen visitas entre variantes A/B.

## Desarrollo

```bash
npm install
npm run dev
```

## Deploy

Conectado a Vercel (team `techscalo-team`). Cada push a `main` dispara un deploy de producción automático en https://landing-scalo.vercel.app

## Migración del portal PWA anterior

`public/sw.js` reemplaza el service worker de Scalo Portal: se activa sin esperar, deja de interceptar peticiones, cancela su registro y recarga las pestañas controladas. No borra cookies ni almacenamiento del usuario. Mantener esta URL disponible para visitantes que vuelvan meses después.

En Vercel, tanto `scalo.tech` como `www.scalo.tech` deben estar conectados a **Production** en este proyecto. No configurar una redirección a nivel de dominio en `scalo.tech`: el navegador rechaza las redirecciones al actualizar `/sw.js`. `proxy.ts` redirige las demás URLs a `www` y deja el worker accesible directamente en ambos dominios.
