# Voz de Mateo: joven y alegre (19 años)

## Problema
Mateo usa la voz `male` (`onyx`), que suena grave y madura. Debe sonar como un joven alegre de 19 años.

## Cambios

1. **Nueva voz `youngMale` → `echo`** en `src/lib/course-audio.server.ts` (mapa de voces). `echo` es la voz masculina más joven y ligera del modelo de voz actual.
2. **Nuevo tono `cheerful`** en `src/lib/course-audio.server.ts` y `src/lib/model-tone.ts`: instrucciones de entrega para un joven de 19 años, alegre, enérgico y natural (sin sonar grave, maduro ni robótico) — mismo estilo de instrucciones detalladas que ya usamos para Vale (`playful`).
3. **`src/components/storybook/StorybookPlayer.tsx`**: `speakerVoice("mateo")` pasa de `male` a `youngMale`, y `speakerTone("mateo")` pasa de `story` al nuevo tono `cheerful`. Los demás personajes (Dylan, Luis, etc.) no cambian.
4. La caché de audio incluye voz y tono en la clave, así que las líneas de Mateo se regeneran solas con la nueva voz; no hay que borrar nada.

## Verificación
- Generar una muestra real de TTS con una línea de Mateo (ej. "My hobbies are soccer and music") y escuchar/verificar que suena joven y alegre.
- Abrir un episodio con Mateo en móvil (Playwright) y confirmar que el audio se reproduce.
- `tsc` + tests de storybook.

## Nota
Si `echo` no suena suficientemente joven al escucharla, la alternativa es `ash` o subir la velocidad ligeramente; lo ajusto en la misma tarea tras escuchar la muestra.
