# Botón "Día anterior" y aviso de semana inactiva en la pantalla del día

## Qué pide el usuario

En la pantalla del día (`/day/$moduleId/$day`):

1. Debajo del botón **"Siguiente día"**, agregar un botón **"Día anterior"** para navegar hacia atrás.
2. Cuando el estudiante se adelante a días de una semana que aún no es su semana activa de la liga (ej. ya está en el día 6 pero la liga compite la semana 1), mostrar una leyenda discreta: **"* Aún no puedes ganar puntos para esta semana, solo tu semana activa *"** (con su versión en inglés).

## Cómo se decide la "semana activa"

La semana activa la define la liga: el resumen del servidor (`league.summary.curriculumWeek`) dice en qué semana del currículo está compitiendo el estudiante. Regla:

- Si el estudiante **está inscrito en la liga** (`summary.enrolled`) y la semana del día que está viendo (`curriculumWeekForDay(day)`) es **mayor** que su semana activa → mostrar la leyenda.
- Si es la misma semana o una anterior (recuperación permitida) → no se muestra nada.
- Si no está inscrito en la liga → no se muestra nada (la liga no le aplica).

Esto solo afecta el mensaje en pantalla; la entrega de puntos sigue 100% controlada por el servidor, que ya es la autoridad.

## Cambios

1. **`src/lib/i18n.tsx`** — 3 textos nuevos (ES/EN):
   - `day.prevDay`: "Día anterior" / "Previous day"
   - `day.inactiveWeekNote`: "* Aún no puedes ganar puntos para esta semana, solo tu semana activa *" / "* You can't earn points for this week yet, only for your active week *"
2. **`src/routes/day.$moduleId.$day.tsx`**:
   - Botón "Día anterior" (mismo estilo secundario que "Siguiente día", con ícono `ArrowLeft`), visible solo cuando `day > 1`. Se coloca justo debajo de "Siguiente día".
   - Leyenda de semana inactiva: texto pequeño en gris, centrado, debajo de los botones de navegación, con la regla de arriba usando `league.summary`.
   - Cuando el día está fuera de la semana activa, el bloque de puntos de la liga ya no aplica (`eligible=false`); la leyenda explica por qué no hay puntos ahí.

## Detalles técnicos

- Archivos: `src/routes/day.$moduleId.$day.tsx`, `src/lib/i18n.tsx`. Se reutilizan `curriculumWeekForDay` de `src/lib/league.ts` y el `useLeagueDay` ya existente (sin nuevas llamadas al servidor).
- Sin cambios de base de datos, sin cambios en el servidor, sin cambios de diseño fuera de estos dos elementos.
- Verificación: `bunx tsgo --noEmit`, pruebas de liga existentes, y revisión visual en el navegador (día 1: sin botón anterior; día 6 con liga en semana 1: aparece la leyenda; día dentro de la semana activa: sin leyenda).
