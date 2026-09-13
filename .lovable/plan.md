# Velocidad de audio: volver a normal en cada frase

## Problema

Si el estudiante elige 0.5x o 0.75x en una frase, la siguiente frase también se reproduce lenta. La velocidad lenta debe ser solo para la frase donde la eligió.

## Comportamiento deseado

- Cada frase nueva se reproduce automáticamente a velocidad normal (1x).
- Elegir 0.5x o 0.75x afecta únicamente a la frase actual (y sus repeticiones ahí mismo).
- Al pasar a la siguiente frase, el selector vuelve a mostrar 1x.
- El botón circular de repetir sigue funcionando igual: repite en normal y abre las opciones de velocidad.

## Detalle técnico

En `src/components/storybook/StorybookPlayer.tsx`:

- `sceneRate` / `sceneRateRef` dejan de ser "para todo el episodio": se reinician a `1` cuando cambia `idx`.
- En el efecto de autoplay (que ya depende de `idx`), fijar `sceneRateRef.current = 1` y `setSceneRate(1)` antes de reproducir, y usar `rate: 1` para la escena.
- Actualizar el comentario de la línea 96 para reflejar que la velocidad es por frase.

Sin cambios en preguntas rápidas, tarjetas de afirmación, grabaciones ni traducciones.

## Verificación

- `bunx tsgo`
- Pruebas existentes de storybook
- Revisión móvil (394px): elegir 0.75x en una frase, avanzar y confirmar que la siguiente suena a velocidad normal y el selector marca 1x.
