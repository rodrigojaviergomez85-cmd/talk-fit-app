# Botón circular de repetición: siempre 1x + muestra opciones de velocidad

## Objetivo
En el reproductor del cuento (`StorybookPlayer`), cuando el estudiante toca el botón circular de repetición junto a **Escuchar**, el audio debe reproducirse siempre a velocidad normal (`1x`) y, al mismo tiempo, deben desplegarse los botones de velocidad (`0.5x`, `0.75x`, `1x`).

## Cambios propuestos
1. En `src/components/storybook/StorybookPlayer.tsx`, dentro del componente `SceneSlide`:
   - Cambiar el `onClick` del botón circular (`RotateCcw`) para que:
     - Establezca `sceneRate` a `1`.
     - Llame a `play(1)` para reproducir la escena a velocidad normal.
     - Fuerce `showSpeeds = true` (no alternar; siempre mostrar las opciones).
   - Mantener el comportamiento actual del botón **Escuchar**: reproducir al ritmo seleccionado por el usuario (`rate`).
   - Mantener la persistencia de velocidad entre escenas (el `sceneRate` sigue siendo el estado del episodio).

2. Añadir o actualizar pruebas en el archivo de tests del storybook para verificar:
   - Al tocar el botón circular se dispara reproducción a `rate = 1`.
   - Los botones de velocidad (`0.5x`, `0.75x`, `1x`) quedan visibles tras tocar el botón circular.

## Notas técnicas
- El botón usa el icono `RotateCcw` y actualmente alterna `showSpeeds`.
- `AudioService.speak(scene.text, { rate: speed, ... })` es la API de reproducción.
- La velocidad elegida se guarda en el estado `sceneRate` del `StorybookPlayer` y se pasa a `SceneSlide` como prop `rate`.

## Validación
- `bunx tsgo` pasa sin errores.
- Tests de storybook (`bunx vitest run src/components/storybook/`) pasan.
- Verificación móvil en la preview: tocar el círculo reproduce el audio y despliega los tres botones de velocidad.
