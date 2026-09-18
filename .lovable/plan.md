# Eliminación de cuenta dentro de la app (anonimización, sin borrar filas)

Cumple la guía 5.1.1(v) de Apple: el usuario elimina su cuenta desde la app, sin correo ni espera.
Ninguna fila de actividad se borra: la cuenta se anonimiza en el sitio, así la reportería no cambia.

## Qué verá el usuario

1. En "Mi Cuenta", al final, una **Zona de riesgo** con el botón rojo **Eliminar mi cuenta**.
2. La pantalla `/eliminar-cuenta` se reescribe y explica con honestidad:
   - Se elimina para siempre: acceso, correo, nombre, grabaciones de voz y transcripciones.
   - Se conservan de forma anónima y sin vínculo: módulos completados, rachas y tiempo de práctica.
   - Es inmediato e irreversible.
3. Doble confirmación: escribir `ELIMINAR` y **reintroducir la contraseña**; si la cuenta entró con
   Google, el botón pide **reautenticar con Google** en lugar de la contraseña.
4. Al confirmar: se anonimiza, se cierra la sesión y se muestra una pantalla de despedida.

## Cómo se anonimiza (servidor)

Esta app no usa Edge Functions: el equivalente seguro es una **server function** con clave de
servicio (nunca en el cliente). El `user_id` sale siempre del token verificado, jamás del cuerpo.

Orden de ejecución:

1. Verificar sesión (401 si no es válida) y verificar la reautenticación recién hecha.
2. **Borrar del Storage** todos los audios del usuario (bucket `recordings`, prefijo del usuario) y
   su foto de avatar (`avatars`). Se hace antes de la transacción porque el Storage no es
   transaccional; si falla, se aborta sin tocar la base.
3. **Una sola transacción SQL** (función `public.anonymize_account`) que hace todo o nada:
   - Toma el siguiente número de una secuencia → identificador `usuario-eliminado-<n>`.
   - `auth.users`: `email = usuario-eliminado-<n>@deleted.invalid`, `phone = NULL`,
     contraseña sustituida por un hash aleatorio nuevo, `raw_user_meta_data` y
     `raw_app_meta_data` = `{}`, `email_confirmed_at` y `phone_confirmed_at` = `NULL`,
     `banned_until = 2999-01-01`. La fila se queda.
   - **Borra todas las filas de `auth.identities`** de ese usuario (si no, "Continuar con Google"
     devolvería la cuenta eliminada).
   - Revoca todos los refresh tokens → todas las sesiones se cierran.
   - `profiles`: `display_name = 'Usuario eliminado <n>'`, `email = NULL`, `avatar_id = NULL`,
     `avatar_photo_path = NULL`, motivos de revisión a `NULL`. La fila se queda.
   - Pone a `NULL` el texto libre escrito o dictado: transcripciones y correcciones del coach
     (`final_audio_coach_feedback`, `final_audio_coach_retakes`), reflexiones personales,
     y los datos personales de tickets de soporte y reportes de error del usuario.
   - Marca los audios como purgados (`recordings.audio_purged_at`, `day_progress.recording_purged_at`,
     rutas a `NULL`) para que la app muestre "audio no disponible" en vez de un reproductor muerto.
   - Inserta en `deletion_log` **solo** el SHA-256 del correo original y la fecha. Sin correo en
     claro y sin ninguna relación con el `user_id`.
   - No toca ninguna otra columna: progreso, puntajes, rachas, completados, fechas y segundos
     hablados quedan intactos.
4. Devuelve `200 {ok:true, identificador:'usuario-eliminado-<n>'}`; cualquier fallo revierte todo.

## Detalles técnicos

- Migración: secuencia `deleted_account_seq`, tabla `public.deletion_log` (`id`, `email_sha256`,
  `deleted_at`) sin acceso para `anon`/`authenticated`, y la función `SECURITY DEFINER`
  `public.anonymize_account(_user_id uuid, _email_sha256 text) returns text`.
  Es el único punto donde se escribe en `auth.*`, y es imprescindible para invalidar el login
  y las identidades de Google.
- `src/lib/delete-account.functions.ts`: `deleteMyAccount` con `requireSupabaseAuth`; borra Storage
  con `supabaseAdmin` (importado dentro del handler) y luego llama a la función SQL vía RPC.
- `src/routes/eliminar-cuenta.tsx`: nueva pantalla bilingüe con el texto honesto, la doble
  confirmación y la despedida. Se conserva el pie legal existente.
- `src/routes/profile.tsx`: bloque "Zona de riesgo" con el botón rojo hacia `/eliminar-cuenta`.
- Se quitan de soporte/contacto las frases que piden eliminar la cuenta por correo.

## Verificación que reportaré

1. Antes y después: módulos completados por mes, usuarios únicos por mes, suma de segundos
   hablados y completados por módulo → los cuatro números deben ser idénticos.
2. Cuenta de prueba con correo y contraseña: eliminarla y volver a iniciar sesión con las
   credenciales antiguas → debe fallar.
3. Buscar el correo original en `auth.users`, `raw_user_meta_data`, perfil y logs → no debe aparecer.
4. Google: comprobaré por consulta que no queda ninguna fila en `auth.identities` de esa cuenta,
   que es lo que garantiza que "Continuar con Google" cree una cuenta nueva y vacía. La prueba
   real con una cuenta de Google de verdad tendrás que hacerla tú en el preview; te indico los pasos.
