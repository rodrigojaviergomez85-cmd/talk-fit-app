# Dos correcciones pendientes: audio duplicado + piel de Vale en Episodio 10

## 1. Audio duplicado en preguntas rápidas (plan ya aprobado, pendiente de aplicar)

**Causa confirmada:** `AudioService.stop()` solo pausa el audio que ya suena. Si el estudiante contesta antes de que el clip de la pregunta termine de descargarse, esa descarga completa después y suena encima del audio de "Ahora dilo tú".

**Solución:** en `src/services/audio-service.ts`, guardar la función de cancelación de la última llamada a `speak()` y hacer que `stop()` la invoque, cancelando también las descargas en camino. Sin cambios de interfaz; queda resuelto para preguntas, escenas, palabras tocables y tarjeta de mentalidad en todos los episodios.

## 2. Vale más morena en el Episodio 10 ("Háblame de ti")

**Diagnóstico:** comparé las 11 imágenes de `vale-ep10` contra la referencia oficial `_canon/vale.jpg`. Las escenas **s1, s2, s7 y s9** la muestran con piel más oscura que el diseño aprobado.

**Solución:** regenerar solo esas 4 escenas con edición sobre la imagen existente y la referencia oficial de Vale, aclarando su piel al tono oficial sin cambiar composición, ropa ni fondo. Portada, s3, s6, s8 y s10 se conservan.

## Verificación
- Typecheck y pruebas.
- Celular: contestar una pregunta rápida de inmediato — solo suena "Ahora dilo tú"; cambiar de escena rápido — solo suena la escena visible.
- Hoja de contacto del Episodio 10 y vista móvil: Vale con tono oficial en las 4 escenas corregidas.
