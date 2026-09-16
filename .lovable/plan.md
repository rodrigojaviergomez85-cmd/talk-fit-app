# Consultar la liga de la semana en curso y de semanas anteriores

## Problema

La pantalla de la liga siempre mira el día en el que vas ahora. Al terminar el día 5 y avanzar al día 6 (semana 2 del curso), la app busca una liga de la semana 2 que todavía no existe y muestra "la liga no está disponible".

Esto pasa en dos situaciones distintas:

1. **Te adelantaste pero la semana de calendario sigue abierta** (hiciste jueves y viernes el mismo día): tu competencia de esta semana sigue viva hasta el domingo, tus puntos siguen contando y todavía puedes recuperar días pendientes. Hoy la app te la esconde sin razón.
2. **La semana ya cerró**: quieres ver cómo quedaste.

## Qué se va a construir

1. **La liga se elige por competencia, no por el día en que vas.** Si tienes una competencia abierta esta semana de calendario, esa es la que se abre siempre, aunque ya estés en el día 6 o 7 del curso.
2. **Selector de semanas.** Arriba aparece una lista corta con tus semanas ("Semana 1 · 3–9 sep", "Semana 2 · 10–16 sep"). Al tocar una se cargan sus puntos, tu puesto y su clasificación.
3. **Etiqueta de estado.** Semana abierta: "En curso · cierra el domingo". Semana pasada: "Semana cerrada · resultado final", en solo lectura.
4. **Seguir sumando en la semana abierta aunque vayas adelantado.** Al terminar la historia o los audios de un día de la semana 1, los puntos se reclaman en la competencia abierta correspondiente a ese día, sin importar en qué día del curso estés hoy.
5. **Aviso claro cuando tu semana del curso todavía no compite.** En vez de "no disponible", se explica que los días nuevos aún no tienen liga y se ofrece el acceso directo a la semana que sí está abierta o al último resultado.

## Detalles técnicos

- Nueva función de base de datos `league_my_competitions()` (security definer, alcance del usuario autenticado): por cada membresía devuelve `competition_id`, `module_id`, `curriculum_week`, `week_start`, `week_end`, `closed`, `points`, `rank` y `participants`, ordenadas de más reciente a más antigua. El puesto se calcula igual que en `league_my_summary`, respetando `hidden`.
- `getMyLeagueSummary` acepta opcionalmente `competitionId`; cuando viene, resuelve esa competencia en lugar de derivarla de módulo/día. Sin él, el comportamiento actual no cambia.
- Nueva función de servidor `getMyLeagueHistory` en `src/lib/league.functions.ts` con `requireSupabaseAuth`, y tipo `LeagueWeekRef` en `src/lib/league.ts`.
- `claimDayRewards` ya recibe el día del curso que se completó; se ajusta para resolver la competencia por ese día (semana del curso del día) y no por el día actual del estudiante, de modo que recuperar el día 4 o 5 estando en el día 6 siga otorgando puntos mientras la competencia esté abierta.
- `src/routes/liga.tsx`: carga historial y resumen; estado `selectedCompetitionId` con preferencia "competencia abierta > última cerrada"; el selector recarga resumen, vista previa y clasificación paginada. El interruptor "ocultarme" solo aparece en la competencia abierta.
- `src/lib/i18n.tsx`: textos bilingües para el selector, el estado en curso/cerrada y el aviso de semana sin liga.
- Autoridad del servidor intacta: no cambian `league_award`, cupos diarios ni el máximo semanal.

## Verificación

- `bunx tsgo --noEmit`.
- Pruebas de liga existentes más casos nuevos: mapeo del historial y selección por defecto (abierta antes que cerrada).
- Revisión en navegador móvil: estando en el día 6 con la semana de calendario abierta, la liga muestra la semana 1 "en curso" con puntos y puesto; con la semana ya cerrada, muestra el resultado final y permite cambiar de semana.
