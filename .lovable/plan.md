# Medir cuánta gente ve El Mundo de Vale

Hoy el avance del cuento se guarda solo en el teléfono del estudiante, así que no hay forma de contar lectores reales. El plan es empezar a registrar la lectura en el servidor y mostrarla en el panel de administración.

## Qué se va a registrar

Por cada episodio que un estudiante abre:

- quién lo abrió y qué episodio (temporada y número)
- cuándo lo abrió por primera vez y la última vez
- cuántas escenas alcanzó (para saber si lo terminó o lo abandonó)
- si llegó a la grabación final del episodio

Nada de esto bloquea el cuento: si el registro falla, el estudiante sigue leyendo igual.

## Qué vas a poder ver

Una sección nueva "El Mundo de Vale" dentro del panel de métricas de administración, con:

- lectores únicos hoy, últimos 7 días y últimos 30 días
- episodios abiertos y episodios terminados hoy
- porcentaje de estudiantes activos que usan el cuento
- ranking de episodios más vistos y dónde abandona la gente (escena promedio alcanzada)
- tendencia diaria de lectores de los últimos 30 días

## Notas

- Los datos históricos no se pueden recuperar: el conteo empieza el día que se active.
- El avance que ya está guardado en el teléfono se sube una sola vez la primera vez que el estudiante abre el cuento, para no perder lo ya leído.

## Detalle técnico

1. Migración: tabla `story_episode_views` (`user_id`, `episode_id`, `season`, `episode_number`, `first_opened_at`, `last_opened_at`, `scenes_reached`, `max_scene_index`, `completed_at`) con clave única `(user_id, episode_id)`, GRANTs para `authenticated`/`service_role`, RLS con políticas propias del usuario (select/insert/update por `auth.uid()`).
2. `src/lib/story-analytics.functions.ts`: server fn `recordStoryEpisodeView` con `requireSupabaseAuth`, upsert idempotente que solo avanza `max_scene_index` y sella `completed_at`; y `backfillStoryProgress` para subir una vez los IDs guardados en `localStorage`.
3. `StorybookPlayer.tsx`: llamar al registro al abrir el episodio y al avanzar de escena (con debounce, fire-and-forget, sin bloquear la UI); mantener `storybook-progress.ts` local como está.
4. Función de base de datos `admin_story_metrics()` (security definer, solo admin vía `has_role`) que devuelve los agregados, siguiendo el patrón de `admin_engagement_metrics`.
5. `src/lib/admin-metrics.functions.ts` + `src/routes/admin.metrics.tsx`: nueva tarjeta/sección con los indicadores anteriores.
6. Pruebas: unitarias del upsert idempotente y del agregado; ejecutar la suite completa y el chequeo de tipos.
