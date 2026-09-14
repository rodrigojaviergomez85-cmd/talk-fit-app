# Proteger el audio de cada estudiante contra borrados cruzados

La limpieza automática de audio borra archivos con permisos totales, guiándose por dos campos de texto que el propio estudiante escribe (la ruta del audio del día y la de cada toma) y por fechas que también escribe el cliente. Hoy nada impide que una fila apunte a un archivo de otra persona ni que una fecha venga antigua a propósito.

Verificación previa: hoy no existe ninguna fila fuera de formato (1.572 días completados y 7.147 grabaciones, todas con ruta correcta), así que las nuevas reglas no afectan datos existentes ni el flujo normal del estudiante.

## Reglas de ruta (tomadas del código actual)

- Audio final del día: `id-del-estudiante/modulo-day-N.ext` y el repaso `...-latest.ext`.
- Tomas de práctica: `id-del-estudiante/modulo/N/take-K.ext`.

## Sección A — Propiedad al escribir (migración)

- Función `public.owns_storage_path(_user_id uuid, _path text)`, SQL, IMMUTABLE: verdadera solo si la ruta empieza con el id del dueño seguido de `/`. Sin acceso a tablas (requisito de un CHECK).
- CHECK `recordings_storage_path_owner` y CHECK `day_progress_recording_path_owner` (este admite ruta nula).
- CHECK de forma: `day_progress_recording_path_shape` exige `user_id || '/' || module_id || '-day-' || day || '%'`; `recordings_storage_path_shape` exige `user_id || '/' || module_id || '/' || day || '/take-' || take_number || '%'`.
- Antes de cada constraint, un bloque que cuenta filas infractoras y aborta la migración con un mensaje que nombra la tabla.

## Sección B — Fechas confiables (migración)

- Nueva columna `created_at timestamptz NOT NULL DEFAULT now()` en `day_progress`.
- `protect_day_progress_timestamps()` (plpgsql, SECURITY DEFINER, search_path public), BEFORE INSERT OR UPDATE: fija `created_at` a `now()` al insertar y al valor anterior al actualizar; rechaza `completed_at` con más de una hora en el futuro o anterior a `created_at` menos una hora, con error `INVALID_COMPLETED_AT` (P0001).
- `protect_recording_timestamps()` equivalente para `recordings.created_at`.
- REVOKE EXECUTE de ambas funciones a PUBLIC, anon y authenticated.

## Sección C — Segunda comprobación dentro de la limpieza

- En `purge_candidates` y `purge_day_final_candidates`, añadir a cada WHERE la condición `owns_storage_path(user_id, ...)`.
- En `src/lib/storage-purge.server.ts`: antes de cada borrado, filtrar el lote a filas cuya ruta empiece con su propio `user_id` + `/`; en el bucle de finales validar tanto la ruta base como la derivada `-latest`. Las filas que fallen se omiten, se cuentan y se registran en `errors` con un mensaje que empieza por `OWNERSHIP MISMATCH`, visible en el historial de trabajos y en la pantalla de alertas. Nunca se borran ni se marcan como purgadas.

## Sección D — Sin cambios

Retención, exención de día 1 y último día del módulo, lotes, topes, presupuesto de tiempo y timeouts; cuotas, límites, rutas de IA y tablas de costo; políticas del bucket; y el código de subida del cliente.

## Sección E — Pruebas

- `supabase/tests/storage_path_ownership.sql` (script, no migración), al estilo de `attempt_cap_bypass.sql`: con un usuario desechable, comprobar que falla una ruta con otro id, que falla una ruta propia con módulo o día distinto, que la ruta correcta funciona, que retroceder `completed_at` años falla con `INVALID_COMPLETED_AT`, que `created_at` no se puede cambiar en un update, y los cuatro casos equivalentes para `recordings`. El script limpia sus datos.
- `src/lib/storage-purge.test.ts`: con el cliente inyectable, casos para ruta ajena (no se borra, no se marca, genera entrada `OWNERSHIP MISMATCH`), final con base válida pero `-latest` inválida (se omite) y lote normal sin cambios.
- Ejecutar toda la suite y el chequeo de tipos.

Para el estudiante no cambia nada: sigue grabando, repasando y viendo su audio igual que hoy.
