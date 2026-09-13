# Escuchar más lento en el cuento (0.5x / 0.75x / 1x)

## Qué cambia para el estudiante

- La escena sigue sonando sola al llegar, a velocidad normal (1x). Eso no cambia.
- Junto a ESCUCHAR y ESPAÑOL aparece un botón redondo de repetir (la flecha circular, igual que en el paso 4 de los audios).
- Al tocarlo se despliegan tres velocidades: **0.5x**, **0.75x**, **1x** (1x marcada por defecto).
- Al elegir una velocidad, la frase se repite de inmediato a esa velocidad.
- La velocidad elegida se recuerda mientras dure el episodio: el botón ESCUCHAR y el autoplay de la siguiente escena usan esa misma velocidad, así un estudiante básico puede leer todo el cuento despacio sin tocar nada más.
- Si empieza otro audio, el que estaba sonando se detiene (como hoy).

## Dónde aplica

- Tarjetas de escena del cuento (las burbujas con imagen y texto).
- No cambia nada en las preguntas rápidas, en la tarjeta de afirmación ni en la grabación final.

## Detalles técnicos

Solo `src/components/storybook/StorybookPlayer.tsx`:

- Nuevo estado `rate` en el componente raíz del player (default `1`), pasado a `SceneSlide` junto a un `onRateChange`.
- El efecto de autoplay de escena y el botón ESCUCHAR pasan `rate` a `AudioService.speak(...)`.
- En `SceneSlide`, botón icono `RotateCcw` que abre/cierra una fila de tres chips (`0.5` / `0.75` / `1`); al tocar una: `AudioService.stop()`, guardar la velocidad y reproducir `scene.text` con esa velocidad. Chip activo con estilo primario.
- Los toques de palabra individual siguen en 0.75x fijo, sin cambio.

## Verificación

- `bunx tsgo --noEmit` y los tests del storybook.
- Móvil (394px): abrir un episodio, elegir 0.5x y confirmar que la frase suena más lenta y que la siguiente escena mantiene esa velocidad.
