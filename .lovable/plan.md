# Tarjeta "Ver mi liga" debajo del Paso 2

## Lo que pediste (confirmación)

En la pantalla del día (ej. Semana 1 · Día 2), **debajo del Paso 2 (Audios del día)** debe aparecer siempre:

1. Una **barra de progreso** tipo "Tus puntos de hoy · 150 / 300" (imagen 1).
2. Una **tarjeta "Tu liga semanal"** con tu puesto (#4 de 25 estudiantes), tus puntos (750 pts) y el botón **"Ver mi liga →"** (imagen 1).
3. Al tocar "Ver mi liga" se abre la **pantalla completa de la liga** (`/liga`): meta semanal 750/1,500 pts, líderes y tu posición (imagen 2). Esta pantalla ya existe.

## Por qué hoy no aparece

La tarjeta ya está construida, pero solo se muestra si el servidor responde `enrolled: true`, y eso requiere que exista una competencia activa creada para tu cohorte esa semana. Si no existe (o el estudiante no quedó inscrito), la tarjeta desaparece por completo — eso es lo que ves en tu captura.

## Cambios

1. **Siempre visible en días con liga** (`src/routes/day.$moduleId.$day.tsx`): para días de cohorte elegible (piloto: Basic Zero, Semana 1, días 1–5), mostrar la sección aunque `enrolled` sea falso, con un estado inicial "0 / 300 pts · Sin puesto todavía" en lugar de ocultarla.
2. **Inscripción automática** (`src/lib/league.functions.ts` + migración SQL): al reclamar puntos o consultar el resumen, si no hay competencia activa para la cohorte/semana actual, el servidor la crea e inscribe al estudiante en el momento (función SQL `league_claim_day` / `league_my_summary`: crear competencia + participante si faltan, con límite de 25 por liga creando ligas nuevas al llenarse). Sin intervención manual.
3. **Estilo según la imagen** (`src/components/fluency/LeagueDaySection.tsx`):
   - Barra "Tus puntos de hoy · X / 300" en naranja sobre la tarjeta del día.
   - Tarjeta clara (fondo blanco, no azul oscuro) con ícono de trofeo en burbuja naranja, título "Tu liga semanal", subtítulo "Tu nivel · Semana N", puesto en grande "#4 de 25 estudiantes", puntos "750 pts" a la derecha, y "Ver mi liga →" en naranja como botón.
   - Quitar el texto "Vista de ejemplo" — son datos reales.
4. **Sin cambios** en la pantalla `/liga` (imagen 2 ya está hecha) ni en puntos, recuperación ni ranking.

## Detalles técnicos

- Migración nueva: `league_ensure_competition(_module_id, _week)` (security definer) llamada desde `league_my_summary` y `league_claim_day`; GRANT solo a `authenticated`; sin exposición de datos personales (nombres públicos como hoy).
- El reclamo de puntos sigue siendo idempotente (150 pts por actividad, tope 1,500 semanales); sin llamadas de IA.
- Pruebas: tests de `league`/`league-manifest` actualizados + prueba de que la sección se renderiza con `enrolled: false`; suite completa y TypeScript.

## Verificación

- Abrir `/day/basic-zero/2` con un estudiante del piloto: la tarjeta aparece debajo del Paso 2 aunque nunca haya entrado a la liga.
- Tocar "Ver mi liga" → abre `/liga` con tu posición real.
