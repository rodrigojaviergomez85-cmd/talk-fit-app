# Voces por personaje en el cuento animado

## Qué verá el estudiante

Cada personaje de "El primer día de Vale" tendrá su propia voz al reproducir las escenas:

- **Narrador** — voz neutra cálida (escenas de narración).
- **Vale** — voz femenina joven y brillante, distinta del narrador (sus diálogos: "My name is Vale…", "My favorite food is pupusas…").
- **El jefe** — voz masculina grave ("Introduce yourself…", "Your first call, Vale!").

Esto aplica al audio automático de cada escena y al botón "Escuchar". Las palabras sueltas (pronunciación lenta) y las preguntas TPRS conservan la voz actual.

## Cambios técnicos

1. **`src/services/storybook/types.ts`** — agregar campo opcional `speaker?: "narrator" | "vale" | "boss"` a `StorybookScene`.
2. **`src/services/storybook/vale-first-day.ts`** — asignar el speaker en cada escena (narrador: s1, s2, s4, s5, s9; jefe: s3 y la frase final de s10; Vale: s6, s7, s8). En s10 separar la narración del diálogo: la escena narra "The phone rings." con voz de narrador y reproduce la frase del jefe con voz masculina.
3. **`src/services/audio-service.ts`** — extender `ModelVoice` con los nuevos personajes y mapearlos a voces distintas.
4. **`src/lib/course-audio.server.ts`** — extender `VOICE_MAP` con voces nuevas del generador (p. ej. `shimmer` para Vale, `onyx` para el jefe, `nova`/`alloy` para el narrador). La caché ya incluye la voz en su clave, así que los clips existentes no se rompen.
5. **`src/components/storybook/StorybookPlayer.tsx`** — pasar el `speaker` de cada escena a `AudioService.speak`.
6. Verificación: typecheck, tests, y prueba en navegador móvil escuchando que cada personaje suene distinto.

## Costo

Cada combinación texto+voz se genera una sola vez y queda guardada en el almacenamiento, así que esto no multiplica costos: las frases nuevas (diálogo del jefe separado) se generan una vez y se reutilizan para todos los estudiantes.
