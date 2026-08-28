# Voz natural (inglés americano) y botón de retroceso funcional

## 1. Voz natural estilo americano

Hoy el audio modelo usa la voz del navegador (SpeechSynthesis), que suena robótica y cambia según el dispositivo. Se reemplaza por una voz real de IA:

- Nueva ruta de servidor que llama a Lovable AI Text-to-Speech (`openai/gpt-4o-mini-tts`) con una voz neutra americana y devuelve el audio en streaming.
- `AudioService.speak()` pasa a pedir ese audio y reproducirlo, manteniendo la misma interfaz (`rate`, `onStart`, `onEnd`, `stop`), así que ningún componente cambia: paso 2, 3, 4, Coach, Quick Fix y pronunciación suenan igual de natural.
- La velocidad de los pasos 3 y 4 (0.75x–1.5x) se mantiene ajustando la reproducción del audio.
- Caché en memoria por (texto + velocidad) para no regenerar la misma frase y que la segunda escucha sea instantánea.
- Si la generación falla (sin conexión, límite de créditos), se cae automáticamente a la voz del navegador para que la práctica nunca se bloquee.

## 2. Botón de retroceso

Ahora la flecha solo funciona cuando estás en un paso y no en el primero; queda gris/inactiva en muchas pantallas y nunca retrocede dentro de un paso.

Cambios:
- La flecha retrocede dentro del paso cuando hay sub-pasos: en el paso 2 (frase por frase) vuelve a la frase anterior, y en el paso 6 vuelve a la rep anterior de las 5.
- Desde las pantallas de corrección/resumen intermedio la flecha vuelve al paso que las generó, en lugar de quedar inactiva.
- Solo queda deshabilitada en el primer paso, sin sub-pasos previos.
- Al retroceder se detiene cualquier audio en curso (ya ocurre) y se conserva lo grabado.

## Detalles técnicos

- `src/routes/api/tts.ts` (ruta de servidor): POST con `{ text }`, llama a `https://ai.gateway.lovable.dev/v1/audio/speech` con `LOVABLE_API_KEY`, `stream_format: "sse"`, `response_format: "pcm"`, y reenvía el stream. Manejo explícito de 402/429/5xx.
- `src/services/audio-service.ts`: `speak()` reproduce PCM vía Web Audio con `playbackRate` para la velocidad; mantiene `estimateSeconds`, `stop()` y el fallback a `speechSynthesis`.
- `src/routes/practice.tsx`: los sub-índices del paso 2 y del paso 6 se elevan al componente de página (o se exponen vía callback) para que `RepProgress.onBack` pueda decrementarlos; `onBack` también se define para las etapas `analysis`, `quickfix` y `final-analysis`.
- Sin cambios en el análisis local, el conteo de reps ni la fila tipo Excel.

## Verificación

- Typecheck y carga de `/practice`.
- Prueba en preview: escuchar el paso 2 (voz natural), cambiar velocidad en el paso 4 y retroceder con la flecha desde el paso 6, desde una rep interna y desde una frase interna del paso 2.
