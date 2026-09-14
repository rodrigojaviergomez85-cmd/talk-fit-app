# Cerrar el bypass del límite diario de práctica y de entrevistas

Sí, entendí la petición y estoy de acuerdo con el enfoque: el límite se vuelve una regla de la base de datos, no una promesa del teléfono. Confirmé en la base lo que describís antes de escribir esto.

## Lo que verifiqué ahora mismo

- Las dos tablas tienen hoy una sola regla de acceso "ALL" por usuario, así que el estudiante puede borrar sus propias filas.
- La cuenta de estudiante tiene permiso de borrado en ambas tablas.
- Ninguna fila existente tiene una fecha con formato inválido, así que la nueva validación de formato entra sin conflicto.
- 1.404 filas históricas de práctica tienen una fecha lejana a la de hoy. Esto es normal y no se toca: la nueva validación de fecha solo corre cuando se registra la primera grabación de un intento, no sobre filas viejas.

## Lo que se hará

### 1. Permisos (base de datos)
- Quitar el permiso de borrado a la cuenta de estudiante en ambas tablas.
- Reemplazar la regla única por tres reglas separadas: ver, crear y modificar, siempre limitadas a las filas propias. Ninguna regla de borrado.
- El acceso interno del sistema (reportes de admin, limpieza de audio, analíticas) queda igual.

### 2. Formato de la fecha local
- Restricción en ambas tablas: la fecha debe tener exactamente el formato año-mes-día.
- La migración revisa primero que ninguna fila existente la viole y falla con un mensaje claro si encuentra alguna.

### 3. Campos que ya no se pueden cambiar
- Nueva regla automática al modificar una fila: no se puede cambiar el dueño, el módulo, el día ni la fecha local, y no se puede borrar una primera grabación ya registrada.
- Registrar la primera grabación por primera vez sigue permitido: es el flujo normal.
- Dos funciones separadas, una por tabla, porque la tabla de entrevistas no tiene módulo ni día.

### 4. La fecha la valida el servidor
- Dentro de los dos controles de límite ya existentes se agrega un solo bloque nuevo, justo después de las salidas tempranas actuales y antes de la exención de cuentas internas, porque es integridad de datos y no cuota.
- Se rechaza cualquier fecha que esté a más de un día de la fecha del servidor. El margen de un día hacia cada lado se mantiene tal cual: ninguna zona horaria real puede diferir más que eso.
- El bloqueo del lock, el límite leído de la configuración, el conteo y los mensajes actuales de límite no se tocan.

### 5. Un solo mensaje amable en la app
- Cuando el guardado falle por fecha inválida, y solo en ese caso, se muestra un aviso: "La fecha de tu teléfono no coincide" / "Activá la fecha y hora automáticas en tu teléfono y volvé a intentar." (y su versión en inglés).
- Todos los demás errores conservan su comportamiento actual. No se agregan reintentos ni cambia el cálculo de la fecha local.

### 6. Pruebas
- Ajustar solo las afirmaciones existentes que cambien, sin borrarlas.
- Nueva prueba del aviso: aparece exactamente una vez con el error de fecha y ninguna con otros errores.
- Script manual `supabase/tests/attempt_cap_bypass.sql` (no es migración) que comprueba que fallan el borrado, el borrado de la primera grabación, el cambio de fecha local y una fecha a diez días; y que ayer y mañana sí funcionan. El script limpia lo que crea.
- Correr toda la batería de pruebas.

## Detalle técnico

- Migración: `REVOKE DELETE ... FROM authenticated`; drop de las políticas `Users manage own practice attempts` y `Users manage their own interview attempts`; políticas separadas SELECT / INSERT / UPDATE `TO authenticated` con `auth.uid() = user_id`.
- `CHECK (local_day_key ~ '^[0-9]{4}-[0-9]{2}-[0-9]{2}$')` con los nombres `practice_attempts_local_day_key_format` y `interview_attempts_local_day_key_format`, precedido de un `DO` que aborta si hay filas inválidas.
- `protect_attempt_fields()` y `protect_interview_attempt_fields()`, `SECURITY DEFINER`, `SET search_path = public`, error `IMMUTABLE_ATTEMPT_FIELD <columna>` con `ERRCODE = 'P0001'`; triggers `practice_attempts_immutable` e `interview_attempts_immutable` BEFORE UPDATE FOR EACH ROW.
- `CREATE OR REPLACE` de `enforce_daily_practice_cap` y `enforce_daily_interview_cap` conservando cada línea, con `_server_day DATE := (now() AT TIME ZONE 'UTC')::date` y el rechazo `INVALID_LOCAL_DAY_KEY`.
- Cliente: en `src/services/practice-attempts.ts` (`pushInsert`, `pushUpdate`) y `src/services/interview-attempts.ts` (`consumeSlot`), detectar `INVALID_LOCAL_DAY_KEY` en `error.message` y llamar a `toast` de sonner con las claves `clock.mismatch.title` y `clock.mismatch.body` añadidas en `src/lib/i18n.tsx` (ES primero, EN después).

## Un riesgo que quiero dejar dicho

Si un estudiante graba sin conexión y su intento se sincroniza más de un día después, esa fila ya no se podrá insertar con su fecha original: la primera grabación de ese día quedaría sin registrar en la nube. Con el flujo actual esto es muy raro, y es el precio de cerrar el hueco. Si preferís, puedo ampliar el margen para la sincronización tardía, pero por defecto lo dejo como lo pediste.
