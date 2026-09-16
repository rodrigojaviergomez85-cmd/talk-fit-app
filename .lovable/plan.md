# Consultar la liga de semanas anteriores

## Problema

La pantalla de la liga siempre mira el día en el que vas ahora. Al terminar el día 5 y avanzar al día 6 (semana 2), la app busca la liga de la semana 2, que todavía no existe, y muestra "la liga no está disponible". Los puntos y el puesto de la semana 1 siguen guardados, pero ya no hay forma de verlos.

## Qué se va a construir

1. **Selector de semana en la pantalla de la liga.** Arriba aparece una lista corta con tus semanas de liga ("Semana 1 · 3–9 sep", "Semana 2 · 10–16 sep"). Al tocar una, se cargan sus puntos, tu puesto y su clasificación completa.
2. **Semana por defecto inteligente.** Si tu semana actual todavía no tiene liga, se abre automáticamente la última semana en la que sí participaste, con una etiqueta clara: "Semana cerrada · resultado final".
3. **Semanas cerradas en solo lectura.** Se ven puntos, puesto, participantes y clasificación; no se otorgan puntos nuevos ni se puede recuperar actividades de una semana pasada.
4. **Aviso cuando tu semana actual aún no compite.** En vez del mensaje seco de "no disponible", se explica que esta semana todavía no tiene liga y se ofrece el botón para ver el resultado de la semana anterior.
5. **Acceso desde la pantalla del día.** La tarjeta de liga del día enlaza a la liga con la semana correcta ya seleccionada.

## Detalles técnicos

- Nueva función de base de datos `league_my_competitions()` (security definer, solo el usuario autenticado): devuelve, por cada membresía del usuario, `competition_id`, `module_id`, `curriculum_week`, `week_start`, `week_end`, `closed`, `points`, `rank` y `participants`, ordenadas de más reciente a más antigua. El ranking se calcula igual que en `league_my_summary` (respetando `hidden`).
- Nueva función de servidor `getMyLeagueHistory` en `src/lib/league.functions.ts` con `requireSupabaseAuth`, que llama a esa RPC y devuelve una lista tipada `LeagueWeekRef[]` (tipo nuevo en `src/lib/league.ts`).
- `getMyLeagueSummary` gana una variante por competencia: acepta opcionalmente `competitionId` y, cuando viene, resuelve el resumen de esa competencia en lugar de derivarlo de módulo/día. Sin `competitionId` el comportamiento actual no cambia.
- `src/routes/liga.tsx`: carga el historial junto con el resumen; estado `selectedCompetitionId`; el selector re-carga resumen, vista previa y clasificación paginada usando `getLeagueBoard` con el id seleccionado. Se ocultan las acciones de reclamo/recuperación en semanas cerradas; el interruptor de "ocultarme" permanece visible solo en la semana activa.
- `src/lib/i18n.tsx`: textos bilingües para el selector, la etiqueta de semana cerrada y el aviso de semana sin liga.
- Autoridad del servidor intacta: no se cambian `league_award`, cupos, ni la lógica de puntos.

## Verificación

- `bunx tsgo --noEmit`.
- Pruebas existentes de liga (`src/lib/league.test.ts`) más un caso nuevo para el mapeo del historial.
- Revisión en navegador móvil: con el usuario en el día 6, la liga abre la semana 1 cerrada con puntos y puesto, y el selector permite volver entre semanas.
