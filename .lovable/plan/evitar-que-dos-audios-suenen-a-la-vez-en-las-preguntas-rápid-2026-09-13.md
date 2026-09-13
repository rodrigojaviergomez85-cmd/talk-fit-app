# Evitar que dos audios suenen a la vez en las preguntas rápidas del cuento

## Problema
En las preguntas rápidas del cuento, la pregunta se reproduce automáticamente al aparecer la pantalla. Si el estudiante contesta rápido (antes de que el audio de la pregunta termine de descargarse), suenan dos audios a la vez: la pregunta y la frase de "Ahora dilo tú".

## Causa (confirmada en el código)
`AudioService.stop()` solo pausa el audio que **ya está sonando** (`currentAudio`). Mientras el clip de la pregunta todavía se está generando/descargando, no hay nada que pausar, así que `stop()` no hace nada. Cuando la descarga termina un momento después, ese audio empieza a sonar encima del nuevo.

La bandera `cancelled` que evitaría esto solo se activa con la función de cancelación que devuelve `speak()`, y el reproductor del cuento no la guarda — llama al `stop()` global.

Esto afecta también a otras partes del cuento (tocar una palabra mientras carga el audio de la escena, cambiar de página rápido, etc.).

## Solución
Hacer que `AudioService.stop()` cancele también las reproducciones que están **en camino**, no solo la que ya suena:

- `src/services/audio-service.ts`:
  - Guardar a nivel de módulo la función de cancelación de la última llamada a `speak()`.
  - `stop()` la invoca antes de limpiar, así cualquier descarga pendiente queda marcada como cancelada y nunca llega a sonar.
  - Al empezar a sonar un clip, limpiar la referencia si era la suya.

Sin cambios en el reproductor del cuento ni en la interfaz: al arreglarlo en el servicio, queda resuelto para preguntas rápidas, escenas, palabras tocables y la tarjeta de mentalidad, en todos los episodios.

## Verificación
- Typecheck y pruebas existentes.
- Prueba en celular: abrir una pregunta rápida y contestar de inmediato — solo debe sonar la frase de "Ahora dilo tú", sin la pregunta encima.
- Cambiar de escena rápidamente — solo suena el audio de la escena visible.
