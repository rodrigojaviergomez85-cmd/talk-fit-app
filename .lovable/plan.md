# Paso 5: tiempo limitado, meta de oraciones y pregunta siempre visible

Objetivo: que los estudiantes hablen concentrado y no rellenen 90 segundos con pausas.

## Cambios

1. **Tiempo máximo con cuenta regresiva**
   - Básicos (Basic Zero, Simple Present, Simple Future, Past Stories, Mixed Tenses): 30 segundos por audio.
   - Intermedio y avanzado (Eagles, Tigers, Sharks, Advanced 1–3): 45 segundos por audio.
   - El cronómetro cuenta hacia atrás (00:30 / 00:45 → 00:00), se pone rojo en los últimos 5 segundos y detiene la grabación sola al llegar a cero.
   - Debajo del micrófono: "Máximo 30 segundos" / "Máximo 45 segundos".

2. **Meta de oraciones**
   - Básicos: 5–8 oraciones. Verde desde 5; rojo por debajo.
   - Intermedio y avanzado: 8 o más. Verde desde 8; rojo por debajo.
   - El texto de la meta arriba del micrófono y el contador de oraciones usan estos mismos números.

3. **La pregunta siempre visible al grabar**
   - En cada tarjeta de audio (Audio 1, 2, 3, 4, 5) se muestra la pregunta que se está contestando, en un recuadro compacto arriba del micrófono, **solo texto, sin botón de escuchar** (la pregunta principal ya tiene su botón arriba).
   - En los días de role-play, donde la línea de cada turno es distinta de la pregunta principal, se mantiene todo como está: línea propia **con** botón de escuchar.

## Alcance técnico

- `src/components/fluency/TakeBoard.tsx`: nueva prop de nivel (`basic` | `higher`) para derivar máximo de segundos y meta de oraciones; `VoiceRecorder` recibe `countdown` y el nuevo `maxSeconds`; se agrega un recuadro de solo texto con la pregunta por slot (nuevas props `promptQuestion`/`promptQuestionEs`), sin botón de escuchar. Los turnos de role-play conservan su línea con botón de escuchar.
- `src/routes/practice.tsx`: `Rep5FinalRep` pasa el nivel (ya calcula `rep5Tier(moduleId)`) y la pregunta de `day.rep5Prompt`; la línea de meta (`rep5.goalLine`) usa los nuevos valores.
- Los turnos con tiempo propio (Advanced / Pressure Rounds) mantienen su meta autoral pero su máximo se limita a 45 s.
- Textos bilingües nuevos en `src/lib/i18n.tsx`.
- Sin cambios en límites diarios, IA, progreso, grabaciones guardadas ni conteo de oraciones del servidor.
