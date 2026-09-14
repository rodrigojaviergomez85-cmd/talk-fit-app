# Limpieza de audio lista para miles de estudiantes

## Lo que verifiqué (confirmado, no supuesto)

- `src/lib/storage-purge.server.ts` lee **toda** la tabla `day_progress` (sin filtro) y **todas** las grabaciones sin purgar, paginando de 1.000 en 1.000 en un bucle sin tope, y recién después aplica `.slice(0, limit)`. El tope no protege nada.
- El trabajo corre desde la base de datos todos los días a las 7:00 UTC (`cron.job` 1) llamando a `/api/public/hooks/purge-audio`.
- Si ese llamado falla (tiempo agotado o memoria), la respuesta se pierde: hoy nadie se entera. No hay registro de corridas ni alerta.

Con 17.000 estudiantes esto son millones de filas por corrida: se cae y el audio deja de borrarse en silencio.

## Qué haremos

1. **Que la base haga el filtro, no el servidor.** En lugar de traerse todo, la limpieza pedirá solo los siguientes N archivos que ya cumplen la política (tomas de más de 48 h, finales de más de 90 días, nunca el día 1 ni el día 20, nunca lo ya purgado). Memoria constante, sin importar cuántos estudiantes haya.
2. **Corridas por lotes con tope real.** Cada corrida procesará como máximo un número fijo de archivos (por ejemplo 5.000) y se detendrá sola antes de agotar el tiempo, dejando el resto para la siguiente. El trabajo pasa de "todo o nada" a avance constante.
3. **Nada de política nueva.** Se conservan las mismas reglas actuales y se sigue borrando únicamente el archivo de audio: progreso, evaluaciones, rachas, contadores de consumo e historial de costos quedan intactos, y la pantalla sigue mostrando "audio ya no disponible".
4. **Visibilidad cuando falle.** Cada corrida quedará registrada (cuándo empezó, cuántos archivos borró, si hubo error) y la pantalla de Alertas mostrará amarillo/rojo si el trabajo no corre con éxito en 24/48 horas o si acumula demasiados pendientes.
5. **Más frecuencia.** Como cada corrida es acotada, el trabajo pasará a correr varias veces al día para que el pendiente nunca crezca.

## Detalles técnicos

- Nueva función `public.purge_candidates(_limit int)` (security definer, solo `service_role`) que devuelve filas de `recordings` candidatas: `audio_purged_at is null`, y o bien final (por `is_final_rep` o por coincidir con `day_progress.recording_path` vía `exists`) con `created_at < now() - 90 días` y `day not in (1,20)`, o bien no final con `created_at < now() - 48 horas`. Orden por `created_at`, con `limit`.
- Nueva función `public.purge_day_final_candidates(_limit int)` equivalente sobre `day_progress` (`recording_purged_at is null`, `recording_path not null`, `day not in (1,20)`, `completed_at < now() - 90 días`).
- Los umbrales siguen viniendo de `storage-report.ts` (`TAKE_MIN_AGE_HOURS`, `FINAL_RETENTION_DAYS`, `MODULE_LAST_DAY`) y se pasan como parámetros a las funciones, para que informe y borrado no puedan divergir. Se mantiene `classifyRecording` como verificación final en memoria de cada lote (defensa en profundidad) y como base de los tests.
- `purgeExpiredTakes()` se reescribe como bucle de lotes: pide `DELETE_BATCH` candidatos, borra en Storage, estampa las filas, repite hasta `maxFiles` o hasta agotar un presupuesto de tiempo (`deadlineMs`). Se eliminan los dos bucles de paginación completos.
- Índices de apoyo: `recordings (created_at) where audio_purged_at is null` y `day_progress (completed_at) where recording_purged_at is null`.
- Nueva tabla `job_runs` (nombre, inicio, fin, archivos borrados, error) escrita por el hook; el hook devuelve 500 igual, pero ahora queda rastro.
- `src/lib/admin-alerts.ts` + `/admin/alertas`: nuevo bloque "Limpieza de audio" (verde/amarillo/rojo) según la última corrida exitosa y el pendiente, con umbrales en `alert_thresholds`.
- Cron: pasar de `0 7 * * *` a cada 4 horas.
- Tests: candidatos por lotes respetan la política, el tope corta de verdad, una falla de Storage no estampa la fila, y el evaluador de alertas detecta "sin corrida exitosa en 24/48 h".
