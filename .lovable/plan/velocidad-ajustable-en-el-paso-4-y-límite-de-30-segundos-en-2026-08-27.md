# Velocidad ajustable en el paso 4 y límite de 30 segundos en el paso 6

## Paso 4 — Velocidad natural con control de velocidad

- Debajo del texto modelo aparece un selector de velocidad con cuatro opciones: **0.75x**, **1x**, **1.25x**, **1.5x** (1x seleccionada por defecto).
- Al tocar una opción se detiene el audio en curso y el siguiente "START SHADOWING" usa la nueva velocidad.
- El subtítulo de la instrucción muestra siempre la velocidad activa ("Natural speed · 1.25x speed").
- Instrucción visible para que el usuario sepa que puede ajustarla:
  - EN: "Tap a speed to make it slower or faster."
  - ES: "Toca una velocidad para ponerlo más lento o más rápido. Empieza en 1x y súbelo cuando te sientas cómodo."
  - La línea en español sigue el mismo comportamiento que el resto: botón **ES** / toggle "Mostrar todo en español".

El paso 3 (shadowing lento) se mantiene fijo en 0.85x, sin selector.

## Paso 6 — Límite de 30 segundos por rep

- Cada una de las 5 reps internas se corta automáticamente a los **30 segundos**: la grabación se detiene sola y pasa a la reproducción/veredicto como si el usuario hubiera pulsado STOP.
- El temporizador cuenta de forma visible hacia el límite y muestra "MÁX 30 s"; los últimos 5 segundos se marcan en color de alerta.
- El objetivo de segundos de la lección se sigue mostrando, pero nunca por encima de 30.
- Instrucción añadida en la tarjeta de la serie:
  - EN: "Max 30 seconds per rep. It stops on its own."
  - ES: "Máximo 30 segundos por rep. Se detiene solo."

## Detalles técnicos

- `src/components/fluency/VoiceRecorder.tsx`: nueva prop opcional `maxSeconds`; el intervalo del temporizador dispara `stop()` al alcanzarla, y el texto del temporizador cambia a estilo de alerta en los últimos 5 s. Sin `maxSeconds` el comportamiento actual no cambia.
- `src/routes/practice.tsx`:
  - `Shadowing` acepta `speeds?: number[]`; con esa prop renderiza los botones de velocidad y usa un estado `speed` local (inicializado con `rate`) para `AudioService.speak` y para el subtítulo. El caso `case 3` (paso 4) pasa `speeds={[0.75, 1, 1.25, 1.5]}` más las líneas de instrucción EN/ES.
  - `RepSeries` pasa `maxSeconds={30}` al `VoiceRecorder` y añade la línea EN/ES del límite.
- Cambios solo de presentación: no se toca el análisis local, la navegación ni el conteo de 5 reps.

## Verificación

- `bunx tsgo --noEmit` sin errores.
- En el preview: cambiar velocidad en el paso 4 y comprobar que el audio suena más lento/rápido; en el paso 6 grabar y confirmar el corte automático a los 30 s.
