# Voz propia para Beto (chico tímido de 17)

## Problema
Beto (el chico tímido de 17 años del episodio 12 de la temporada 2) no tiene personaje de voz asignado: sus líneas salen con la voz neutra/masculina de adulto y suenan a hombre mayor. Debe sonar como un adolescente tímido, joven y suave — distinto de Mateo (alegre) y Dylan (relajado).

## Cambios

1. **Nuevo tipo de voz `shyBoy`** en `src/lib/course-audio.server.ts` y `src/services/audio-service.ts`:
   - Voz del proveedor: `sage` (suave y juvenil, distinta de `echo`/Mateo y `ash`/Dylan).
   - Fallback del navegador: tono más agudo (pitch ~1.15) para que nunca suene grave.

2. **Nuevo tono `shy`** con instrucción dedicada: chico de 17 años, tímido, voz suave y joven, ritmo tranquilo, nunca profundo ni maduro — claramente distinto de Mateo y Dylan.

3. **Nuevo hablante `beto`** en `src/services/storybook/types.ts` y mapas del reproductor (`src/components/storybook/StorybookPlayer.tsx`): `speakerVoice("beto") → "shyBoy"`, `speakerTone("beto") → "shy"`.

4. **Asignar `speaker: "beto"`** a las líneas directas de Beto en los 4 episodios donde habla:
   - `vale-s2-promise.ts` (ep. 12: "Really? Will you practice with me?", su repetición en voz alta, etc.)
   - `vale-s2-plan-vs-decision.ts` (ep. 16: "I am persistent. I won't quit.", llamada perdido)
   - `vale-s2-visible-predictions.ts` (ep. 19: "I'm going to do my first interview.")
   - `vale-s2-final-fluency.ts` (ep. 20: "I'll start on Monday! I have the job!")

5. **Caché**: subir la clave de caché TTS (v4 → v5) para que los clips viejos con voz de adulto no se reutilicen.

6. **Verificación**:
   - `bunx tsgo` + tests de storybook/audio.
   - Generar una muestra real vía `/api/tts` con `shyBoy`+`shy` y escucharla (que suene joven y tímida).
   - Revisión móvil en Playwright del episodio 12 escena con Beto.

## Detalles técnicos
- Archivos: `src/lib/course-audio.server.ts`, `src/lib/model-tone.ts`, `src/services/audio-service.ts`, `src/services/storybook/types.ts`, `src/components/storybook/StorybookPlayer.tsx`, y los 4 episodios de la temporada 2 listados.
- No se tocan las voces de Vale, Mateo, Dylan, Kat, Luis, Camila, Ana, jefe ni narrador.
