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
