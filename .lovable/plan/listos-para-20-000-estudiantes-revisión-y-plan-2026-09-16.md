# ¿Listos para 20,000 estudiantes? Revisión y plan

Respuesta corta: **todavía no**. La capacidad (servidor, disco, costos) sí aguanta. Lo que no aguanta son **dos fallas reales que ya están ocurriendo hoy** con 1,130 cuentas, y que con 20,000 se vuelven graves.

## Lo que revisé hoy (datos reales, no supuestos)

- 1,130 cuentas (522 nuevas en 7 días), 345 prácticas en las últimas 24 h.
- Archivos: 1,136 MB de grabaciones + 591 MB de audio del curso. Base de datos: 69 MB. Disco contratado: 500 GB.
- Costo de IA: $7.99 en los últimos 7 días. Sin fallas en los servicios de IA (0 errores en 5,400+ llamadas de 24 h).
- Limpieza de audio: **38 corridas fallidas y solo 6 exitosas en 3 días.** Falla cada hora.
- Limpieza del registro de IA: funcionando bien.

## Problema 1 (crítico): 1,555 de 2,012 fichas de días quedaron "congeladas"

Una protección de fechas que agregamos el 14 de septiembre compara la fecha de práctica contra una fecha de creación que se rellenó ese mismo día. Resultado: **el 77% de las fichas de días ya practicados rechaza cualquier actualización.**

Esto explica dos cosas que ya estamos viendo:
- La limpieza automática de audio falla cada hora (no puede marcar 105 audios ya vencidos) y nunca avanza.
- El Paso 5 no entrega feedback al repetir un día viejo: la app no puede actualizar esa ficha ni quitar la marca de "audio borrado".

Con 20,000 estudiantes esto se multiplica: el audio deja de borrarse y muchos estudiantes repitiendo días no reciben feedback.

**Solución:** corregir la protección para que compare contra la fecha real más antigua de cada ficha (no contra la fecha de relleno), y reparar de una vez las 1,555 fichas afectadas. La protección sigue bloqueando fechas futuras o manipuladas.

## Problema 2: la limpieza se atasca con las fichas que no puede marcar

Aun corregido lo anterior, la limpieza reintenta las mismas fichas fallidas en cada corrida y gasta ahí su presupuesto.

**Solución:** que una ficha que falle no tumbe la corrida completa ni se reintente indefinidamente; se registra el fallo, se salta y se sigue con el resto. La corrida solo se marca como fallida si falla el lote entero.

## Problema 3 (menor, ya cubierto): el Paso 5 sin feedback

Con el Problema 1 resuelto, queda aplicar lo que ya habíamos acordado: al subir audio nuevo, quitar la marca de "borrado" y refrescar la fecha, y avisar claramente si de verdad no hay audio final en vez de fallar en silencio. Se reparan las fichas afectadas para que esos estudiantes puedan pedir su feedback hoy.

## Lo que sí está listo para 20,000

- Topes diarios (5 prácticas, 2 entrevistas, cuotas de IA) activos y aplicados en el servidor.
- Servidor X-Large y 500 GB de disco: con la limpieza funcionando, el audio se estabiliza muy por debajo del disco contratado.
- Alertas de gasto y salud en el panel de admin.
- Costos de IA: hoy ~$1.15 al día con ~350 prácticas. A 20,000 estudiantes con el uso actual por estudiante, la proyección ronda **$20–25 al día**. Conviene confirmarlo tras el primer día de rampa.

## Recomendación de lanzamiento

1. Aplicar las correcciones de arriba (mismo día).
2. Confirmar 3 corridas de limpieza seguidas en verde y el Paso 5 dando feedback al repetir un día viejo.
3. Subir por etapas: 10,000 primero, revisar alertas 24 h, luego 20,000.

## Detalle técnico

- `protect_day_progress_timestamps()`: la comparación de `completed_at` / `latest_recorded_at` usa `least(NEW.created_at, OLD.completed_at, OLD.latest_recorded_at)` como piso en UPDATE, en lugar de `NEW.created_at`; se mantiene el techo `now() + 1 hora` y la regla de avance monótono.
- Dato correctivo: `update day_progress set created_at = least(created_at, completed_at) where completed_at < created_at`.
- `src/lib/storage-purge.server.ts`: el marcado por ficha se aísla en try/catch por fila; se acumulan `skipped` en `job_runs.detail` y `ok` solo es falso si falla el lote o el presupuesto.
- `src/services/cloud-sync.ts`: `buildRecordingUpsertRow` limpia `audio_purged_at` y refresca fechas; `markFinalTake` usa `.select("id")` y devuelve `false` sin filas; se limpia `day_progress.recording_purged_at` al guardar audio final nuevo.
- Reparación: `update recordings set audio_purged_at = null where audio_purged_at is not null and updated_at > audio_purged_at and storage_path is not null`.
- Pruebas: trigger acepta el marcado de purga en fichas antiguas y sigue rechazando fechas futuras; una ficha fallida no tumba la corrida; repetir un día viejo devuelve feedback; suite completa y verificación de tipos.
- Sin cambios en topes, cuotas, retención (10 días finales / 48 h tomas) ni en la UI.
