# Voz de Vale: juguetona y tímida

## Objetivo
Que Vale suene como una chica joven, juguetona y un poco tímida — no grave ni genérica. Hoy usa la voz "shimmer" con las instrucciones del "coach energético de call center", lo que explica el tono serio/masculino.

## Cambios

### 1. Voz más joven y femenina
- En `src/lib/course-audio.server.ts`: `VOICE_MAP.girl` pasa de `shimmer` a `nova` (voz femenina cálida y juvenil, más natural que shimmer).

### 2. Tono nuevo "playful" (juguetona y tímida)
- Agregar el tono `playful` a `Tone`/`TONES` en `course-audio.server.ts` con instrucciones propias: chica joven, voz brillante y ligera, energía juguetona con un toque de timidez/nerviosismo dulce (como alguien en su primer día de trabajo), ritmo natural, inglés americano claro.
- Como la llave de caché incluye tono+voz+texto, los clips de Vale se regeneran automáticamente la primera vez que suenen — los audios viejos quedan sin uso, sin borrar nada.

### 3. El cuento usa el tono nuevo solo para Vale
- En `src/components/storybook/StorybookPlayer.tsx`: las escenas de Vale (`speaker: "vale"`) se reproducen con `voice: "girl"` + `tone: "playful"` — tanto en reproducción automática como en el botón de repetir.
- Narrador y jefe no cambian.

### 4. Fallback del navegador
- En `src/services/audio-service.ts`: cuando se usa la voz del navegador (si falla el servidor), la voz `girl` habla con pitch un poco más alto para mantener el carácter juvenil.

## Verificación
- `bunx tsgo --noEmit` y `bunx vitest run` (la suite valida los mapas de voz/tono).
- Recorrido móvil del cuento con Playwright: confirmar que las escenas de Vale piden audio con la nueva combinación voz/tono y que no hay errores de consola.

## Detalles técnicos
- Archivos: `src/lib/course-audio.server.ts` (voz + tono nuevo), `src/components/storybook/StorybookPlayer.tsx` (ruteo del tono por personaje), `src/services/audio-service.ts` (pitch del fallback).
- Costo: solo se regeneran los ~5 clips de Vale; todo lo demás sigue en caché.
