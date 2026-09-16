# El Paso 5 no da feedback: audios marcados como "borrados"

## Qué está pasando (confirmado)

Al repetir un día que ya habías practicado hace días, la app sube el audio nuevo, pero la ficha de esa grabación sigue marcada como "audio ya borrado" por la limpieza automática. El Coach de IA solo acepta audios vigentes, así que rechaza la petición al instante y muestra "Tu práctica quedó guardada, pero el feedback no está disponible en este momento".

Evidencia:
- En los registros del servidor, dos intentos de hoy (Advanced 1, días 1 y 2) terminaron en `not_found` en ~170 ms, sin llamar a la IA.
- Las fichas de esas grabaciones tienen la marca de borrado del 14 y 16 de septiembre, aunque fueron actualizadas hoy a las 14:52 y 14:53 con audio nuevo.
- El resto de estudiantes con días nuevos sí recibió feedback hoy (más de 500 análisis correctos), lo que confirma que el problema es solo el de los días repetidos tras la limpieza.

Hay dos problemas secundarios del mismo origen:
- La limpieza podría volver a borrar ese audio nuevo antes de tiempo, porque la ficha conserva la fecha de creación original.
- Si al marcar el audio final no se actualiza ninguna ficha, la app igual lo da por bueno y pide feedback de algo que no existe.

## Solución

1. **Al subir una grabación, dejarla como nueva otra vez**
   - Quitar la marca de borrado y actualizar la fecha de la grabación, de modo que el audio recién subido cuente como vigente.
   - Hacer lo mismo con la marca de borrado del progreso del día cuando se guarda un audio final nuevo.

2. **Detectar de verdad el "audio final"**
   - Al marcar la grabación elegida como final, confirmar que realmente se actualizó una ficha; si no, la app no pide feedback y muestra un aviso claro en vez de fallar en silencio.

3. **Reparar las fichas afectadas**
   - Limpiar la marca de borrado en las grabaciones que tienen audio nuevo subido después de esa marca, para que esos estudiantes puedan pedir su feedback hoy mismo.

4. **Pruebas**
   - Caso "día repetido tras limpieza": subir de nuevo y confirmar que el Coach responde con feedback.
   - Caso "no existe la ficha final": confirmar el mensaje de aviso en lugar del error genérico.
   - Suite de pruebas y verificación de tipos completas.

## Detalle técnico

- `src/services/cloud-sync.ts`: `buildRecordingUpsertRow` añade `audio_purged_at: null` y refresca `created_at`/`updated_at`; `markFinalTake` usa `.select("id")` y devuelve `false` si no hubo filas; al guardar el día se limpia `day_progress.recording_purged_at`.
- `src/services/final-audio-coach-client.ts`: mantiene el estado `unavailable` pero solo cuando el marcado realmente falló; no se cambia el resto del flujo ni el consumo de IA.
- Migración/dato: `update recordings set audio_purged_at = null where audio_purged_at is not null and updated_at > audio_purged_at and storage_path is not null` (verificado contra el objeto de storage en el mismo paso).
- Sin cambios en límites diarios, cuotas de IA, retención (10 días finales / 48 h tomas) ni en la UI del Paso 5.
