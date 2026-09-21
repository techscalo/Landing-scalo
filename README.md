# Landing Scalo

Landing y diagnóstico comercial de Scalo en **Next.js 16** (App Router, TypeScript).

## Rutas

| Ruta | Descripción |
|------|-------------|
| `/b` | Landing oscura + formulario de auditoría |
| `/a-leadmagnet` | Diagnóstico de 10 preguntas con resultado y enlace a `/b#contacto` |
| `/` y `/a` | Redirección permanente a `/b` |
| `/b-leadmagnet` | Redirección permanente a `/a-leadmagnet` |

Las redirecciones conservan los parámetros de campaña de la URL. Ya no se distribuyen visitas entre variantes A/B.

## Desarrollo

```bash
npm install
npm run dev
```

## Deploy

Conectado a Vercel (team `techscalo-team`). Cada push a `main` dispara un deploy de producción automático en https://landing-scalo.vercel.app
