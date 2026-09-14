# Preparación para 17,000 estudiantes

Respuesta corta: la app funciona, pero **hoy no está lista** para 17,000 usuarios. Hay tres riesgos reales de costo y estabilidad que conviene cerrar antes del lanzamiento.

## Qué encontré (datos reales de hoy)

- 835 cuentas registradas, 6,742 grabaciones, base de datos en 49 MB.
- Audio guardado: 1.07 GB de grabaciones de estudiantes + 316 MB de audio del curso.
- **Los límites de uso están apagados** (limits_enabled = false) y el cobro también. Hoy cualquier estudiante puede usar la corrección de voz y el coach de IA sin tope.
- El servidor de datos está en el tamaño más pequeño disponible.
- La limpieza automática de audios viejos corre cada día a las 7:00 UTC, pero borra máximo 5,000 archivos por corrida.

Proyección lineal a 17,000 estudiantes (20x): ~21 GB de audio de estudiantes y ~135,000 grabaciones nuevas por ciclo, con consumo de IA sin tope.

## Cambios propuestos antes del lanzamiento

### 1. Encender los límites de uso (crítico, costo)
Activar los topes por sección y el multiplicador Pro que ya están construidos, y revisar los números por sección (práctica diaria, corrección de voz, coach de IA, entrevistas). Sin esto, el costo de IA con 17,000 usuarios no tiene techo.

### 2. Subir el tamaño del servidor de datos
Pasar de Tiny a un tamaño acorde a miles de sesiones concurrentes. Es un cambio de configuración; implica un costo mensual mayor y un reinicio breve.

### 3. Retención de audio sostenible
- Aumentar la capacidad diaria de limpieza (de 5,000 a un volumen acorde) y correrla más de una vez al día.
- Definir una política para las grabaciones finales, que hoy se guardan para siempre: propongo conservar la última grabación final por día/módulo y borrar el archivo de las anteriores después de 90 días, manteniendo el historial de progreso intacto.

### 4. Alertas de gasto y salud
Configurar alertas de créditos y un chequeo semanal del panel de costos que ya existe, para detectar consumo anómalo en los primeros días.

### 5. Prueba de carga ligera
Simular la jornada de un estudiante (historia con audio, 5 pasos de práctica, subida de grabación) en paralelo para confirmar tiempos de respuesta antes de abrir el registro masivo.

## Detalles técnicos

- `app_settings.limits_enabled` y `billing_enabled` en `false`; `section_limits` ya tiene topes definidos por sección listos para usarse.
- Compute Tiny; subir vía redimensionamiento de instancia. Revisar también tamaño de disco.
- `purgeExpiredTakes` en `src/lib/storage-purge.server.ts` con `limit = 5000`; cron `purge-old-practice-audio` a las `0 7 * * *` llamando `/api/public/hooks/purge-audio`.
- Las grabaciones finales (`is_final_rep = true` y las referenciadas por `day_progress.recording_path`) están excluidas del borrado por diseño; la nueva política requiere ampliar el clasificador en `storage-report.ts` y sus pruebas.
- Los índices de las tablas calientes se están usando correctamente; no veo escaneos completos problemáticos.
- El audio del curso (`course-audio`) se comparte entre todos los estudiantes y no crece con el número de usuarios.

## Orden sugerido

1. Encender límites y validar topes.
2. Subir tamaño del servidor y disco.
3. Ajustar limpieza de audio y política de grabaciones finales.
4. Alertas de gasto.
5. Prueba de carga y lanzamiento por etapas (por ejemplo 2,000 → 8,000 → 17,000).
