# Plan: Reemplazar "Más ayuda" por "Entiéndelo fácil" en la intro de cada día

## Qué se va a hacer
- En la pantalla intro de cada día de práctica (antes de Paso 1), eliminar el botón colapsable **Más ayuda / More help**.
- En su lugar poner la tarjeta colapsable **Entiéndelo fácil / Understand it easily**, igual que en Review, con el contenido de gramática del tema que corresponde al módulo/día.
- La tarjeta sigue siendo plegable para no estorbar antes de empezar.

## Dónde se mueve el contenido
- Se reutilizan las guías ya escritas de Review (`simple-present-guide.ts`, `simple-past-guide.ts`, `simple-future-guide.ts`, `modals-guide.ts`, `comparatives-guide.ts`, etc.).
- Se crea un mapeo módulo/tema → tarjetas de guía en `src/services/module-guides.ts`.
- Se agrega `guideCards?: ReviewGuideCard[]` al tipo `CourseDay` y se asigna al cargar el módulo.
- En `src/routes/practice.tsx` se reemplaza `<CollapsibleHelp label="More help" …>` por `<ReviewGuide cards={day.guideCards} …>`.

## Mapeo propuesto
| Módulo | Guía a mostrar |
|--------|----------------|
| basic-zero | Sin guía formal; se conserva el bloque introductorio actual (ya no hay gramática explícita). |
| simple-present | `SIMPLE_PRESENT_GUIDE` |
| simple-future | `SIMPLE_FUTURE_GUIDE` |
| past-stories | `SIMPLE_PAST_GUIDE` |
| mixed-tenses | Resumen corto de presente + pasado + futuro, reutilizando tarjetas clave de esas tres guías. |
| eagles-week-1 | Según semana/tema del día: pasado simple (semana 1), modales/comparativos/present perfect (semanas 2–4). |
| tigers | Modales, comparativos y present perfect según el día. |
| sharks | Guías mixtas avanzadas según el tema del día. |
| advanced-1/2/3 | Guías mixtas según el tema del día (past perfect, modal perfects, present perfect progressive, etc.). |

## Archivos a tocar
- `src/lib/types.ts` — agregar `guideCards?: ReviewGuideCard[]` a `CourseDay`.
- `src/services/module-guides.ts` — nuevo servicio de mapeo.
- `src/services/course-service.ts` — adjuntar `guideCards` al cargar días.
- `src/routes/practice.tsx` — reemplazar el `CollapsibleHelp` "More help" por `ReviewGuide`.
- `src/lib/i18n.tsx` — eliminar o reubicar la clave `intro.moreHelp` si ya no se usa.

## Qué NO cambia
- IDs de módulos, días, grabaciones ni progreso.
- Lógica de Steps 1–5, retakes, cap diario, AI Coach, Review ni Progress.
- El componente `ReviewGuide` se reusa tal cual.

## Verificación
- `bun run typecheck`
- `bun test --run`
- Captura del intro de un día de Simple Present mostrando la tarjeta colapsada y expandida.
