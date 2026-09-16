# Liga semanal para todo el curso

Hoy la Liga solo existe para Basic Zero, semana 1. La ampliamos a los 11 módulos y sus 4 semanas, con la misma lógica: se compite por módulo + semana del currículo, la semana corre de lunes a domingo, y cada actividad completada suma 150 puntos una sola vez.

## Cómo queda

- Todos los módulos y semanas quedan activos desde hoy.
- Cada tabla junta solo a quienes van en el mismo módulo y la misma semana. Si en una semana hay una sola persona, aparece sola en primer lugar; no se mezcla con otros grupos.
- Días con historia (El mundo de Vale) + audios: 300 puntos por día, 1.500 en la semana.
- Advanced 2 y Advanced 3 todavía no tienen historias: ahí el día vale solo los 150 puntos de los audios (750 en la semana). La pantalla lo explica en español e inglés y solo muestra la actividad de audios.
- La recuperación dentro de la semana, el historial de semanas, ocultarse del ranking y las cuentas internas excluidas siguen igual.

## Qué se construye

1. **Mapa de historias completo**: hoy solo están registrados los 5 episodios de Basic Zero semana 1. Se registran los 20 días de cada módulo con historia (Basic Zero, Simple Future, Simple Present, Past Stories, Mixed Tenses, Eagles, Tigers, Sharks, Advanced 1), con el punto exacto del episodio que hay que alcanzar para que cuente.
2. **Semanas con y sin historia**: el sistema distingue una semana de dos actividades (historia + audios) de una de una sola actividad (solo audios), para la meta diaria, la meta semanal, las insignias del día y el texto de la pantalla.
3. **Apertura de grupos**: se activan todas las combinaciones módulo + semana; las de Advanced 2 y 3 quedan marcadas como solo-audios.
4. **Inscripción y puesta al día**: al abrir su día o la Liga, cada estudiante entra al grupo que le corresponde esta semana, y se acreditan las actividades que ya completó en esta semana calendario.

## Detalles técnicos

- `league_pilot_cohorts`: se agrega la columna `activities_per_day` (2 por defecto, 1 para advanced-2 y advanced-3) y se insertan las 44 filas módulo + semana (11 × 4). RLS de lectura ya existe; solo lectura para `authenticated`.
- `league_my_summary` / `league_summary_by_competition` devuelven `activitiesPerDay`, y la meta diaria/semanal deja de ser constante en el cliente (`DAY_GOAL`, `WEEKLY_GOAL` pasan a calcularse con ese valor).
- `league_award` sigue idéntico: 150 puntos, `UNIQUE (user_id, activity_type, module_id, day)`; para semanas solo-audios simplemente nunca llega un award de tipo `story`.
- `src/lib/league-manifest.ts` se completa con los 180 slots (9 módulos × 20 días) y su `minSceneIndex`; `league-manifest.test.ts` se amplía para validar contra los episodios reales (ids existentes y conteo de escenas) y para exigir que todo módulo con temporada tenga sus 20 días.
- `league_backfill_cohort` se ejecuta por cada cohorte activa para acreditar lo ya hecho en la semana en curso (vía `run_sql`, no en carga de página).
- UI: `LeagueDaySection`, `/liga` y las tarjetas de progreso diario ocultan la fila de historia cuando `activitiesPerDay = 1`; textos bilingües nuevos.
- Pruebas: manifiesto completo, metas por tipo de semana, resumen con cohorte solo-audios, y que la inscripción respete módulo + semana.
