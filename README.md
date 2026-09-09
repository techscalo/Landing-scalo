# Landing Scalo

Landings y lead magnets de Scalo (Scalo System™) reconstruidos en **Next.js 16** (App Router, TypeScript).

## Rutas

| Ruta | Descripción |
|------|-------------|
| `/` | Hub con las 4 previews |
| `/v1-landing` | Landing clara + formulario de auditoría |
| `/v1-leadmagnet` | Quiz de 10 preguntas con diagnóstico por puntaje |
| `/v2-landing` | Landing oscura ("fugas comerciales") + formulario |
| `/v2-leadmagnet` | Scorecard con modal de captura y diagnóstico por área |

## Desarrollo

```bash
npm install
npm run dev
```

## Deploy

Conectado a Vercel (team `techscalo-team`). Cada push a `main` dispara un deploy de producción automático en https://landing-scalo.vercel.app
