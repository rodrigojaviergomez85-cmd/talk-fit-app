# Voces por género en Basic Zero

## Problema
Todas las voces del modelo suenan con la misma voz (`alloy`) sin importar si el personaje del día es hombre o mujer. Los personajes de Basic Zero ya tienen `gender: "m" | "f"` en sus perfiles, pero nunca llega al sistema de audio.

## Qué vamos a hacer

### 1. La API de voz acepta el género
- `src/routes/api/tts.ts`: acepta un parámetro opcional `voice: "female" | "male"`.
  - Mujer → voz `nova` (femenina, natural norteamericana)
  - Hombre → voz `onyx` (masculina, natural norteamericana)
  - Sin género (módulo Simple Present) → se mantiene `alloy` como está
- Valores no permitidos se ignoran (fallback a `alloy`).

### 2. El servicio de audio pasa la voz
- `src/services/audio-service.ts`:
  - `loadModelAudio(text, voice)` envía `voice` a `/api/tts`.
  - La caché se clavea por `voz + texto` (ahora solo por texto) para no mezclar audios.
  - El fallback del navegador ya soporta voces hombre/mujer (`pickVoice`), así que funciona igual sin conexión al servidor.

### 3. Cada día declara la voz de su personaje
- `src/lib/types.ts`: `CourseDay` gana `speakerVoice?: "female" | "male"`.
- `src/services/basic-zero-course.ts`: `makeDay` recibe el género del personaje del día y lo guarda en `speakerVoice`:
  - Sofía, Valeria, Lucía, Paola, Ana, Rosa, María, Camila, Carmen → `female`
  - Carlos, Daniel, Miguel, Andrés, Luis, Jorge, Pedro, Tomás → `male`
- `simple-present` no se toca (voz neutral como ahora).

### 4. La práctica usa la voz del día
- `src/components/fluency/AudioPlayer.tsx` acepta `voice` y la pasa a `AudioService.speak`.
- `src/routes/practice.tsx` pasa `day.speakerVoice` a todos los puntos donde suena el modelo (Rep 1, Rep 3, ejemplo de Rep 5, etc.).

## Resultado
En Basic Zero, los días con mujeres suenan con voz de mujer y los días con hombres con voz de hombre. Simple Present no cambia. Sin cambios visuales ni de base de datos.

## Verificación
- Typecheck + comprobación de que `/practice?module=basic-zero&day=1` (día de mujer, p. ej. Sofía) genera audio con voz femenina vía `/api/tts`.
