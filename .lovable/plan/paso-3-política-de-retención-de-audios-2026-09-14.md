# Paso 3 — Política de retención de audios

## Situación real hoy

- Base de datos: 49 MB (no es riesgo).
- Archivos: 1.4 GB → grabaciones de estudiantes 1,086 MB + audio del curso 320 MB.
- La limpieza automática diaria **ya existe y corre** (última: hoy 07:00). Borra tomas intermedias con más de 7 días, solo si el día ya está completado. Nunca toca el audio final.
- Por eso solo hay 341 audios ya limpiados: casi todo el contenido tiene menos de 7 días (la app es nueva).

Lo que la política actual **no** resuelve:
- Los audios finales nunca se borran. Hoy son 483 MB en dos semanas con ~835 estudiantes.
- Con 17,000 estudiantes eso escala ~20x: alrededor de 2 GB nuevos por día solo en audios finales, es decir ~60 GB al mes y ~700 GB al año, creciendo para siempre.
- Las tomas intermedias guardadas 7 días representarían ~140 GB "flotando" en todo momento.

## Propuesta

### 1. Acortar la vida de las tomas intermedias: 7 días → 48 horas
El estudiante solo las usa el mismo día para comparar tomas. Además quitar el requisito de "día completado" (hoy, si alguien abandona un día a la mitad, sus tomas se quedan para siempre).
Efecto estimado con 17k: de ~140 GB permanentes a ~40 GB.

### 2. Retención de audios finales: 90 días
Se borra solo el archivo de audio; la fila, el progreso, la fecha y el texto de la retroalimentación del coach se conservan siempre, igual que ya se hace con las tomas. El estudiante ve "audio ya no disponible" pero su historial y sus logros quedan intactos.
Efecto estimado con 17k: se estabiliza en ~180 GB en vez de crecer sin fin.

**Excepción permanente:** se conserva siempre el audio final del día 1 y del último día de cada módulo, para que el estudiante pueda escuchar su "antes y después". Eso es ~11 audios por estudiante, unos 25 GB con 17k — costo bajísimo por un momento muy motivador.

### 3. Grabar más liviano
Hoy cada audio pesa ~138 KB. Grabando en mono con opus a menor tasa se baja a ~60-70 KB sin afectar la transcripción ni la calificación. Eso corta casi a la mitad todo lo anterior.

### 4. Aviso al estudiante
Texto bilingüe corto en la pantalla de progreso: los audios de práctica se guardan 48 horas y los audios finales 90 días; los audios de inicio y fin de módulo se guardan siempre.

## Detalles técnicos

- `src/lib/storage-report.ts`: nuevas reglas del clasificador — ventana de 48 h para tomas no finales, sin depender de `day_progress`; nueva categoría para audios finales con más de 90 días, excluyendo día 1 y último día de módulo.
- `src/lib/storage-purge.server.ts`: incluir los finales caducados en el mismo barrido (ya pagina, borra en lotes y marca `audio_purged_at`; el hook diario `/api/public/hooks/purge-audio` no cambia).
- Grabación: bajar bitrate/canales en la configuración del `MediaRecorder`.
- Primer despliegue en modo `dryRun` para ver cuánto borraría antes de activarlo.
- Pruebas nuevas del clasificador (48 h, 90 días, excepciones de módulo) y ejecución de toda la suite.
