# Listening automático en las Preguntas Rápidas del storybook

## Qué pasa hoy

En las tarjetas de "Pregunta rápida" el audio de la pregunta existe, pero:
- No siempre suena solo al llegar: si el estudiante avanza rápido o el audio anterior seguía sonando, la pregunta puede quedar en silencio y el estudiante contesta sin escuchar nada.
- Si se equivoca al contestar, el audio puede seguir sonando encima.
- El botón ESCUCHAR da la impresión de que escuchar es opcional, cuando queremos que siempre practiquen listening.

## Cambios (solo en `src/components/storybook/StorybookPlayer.tsx`)

1. **Autoplay garantizado de la pregunta**: al aparecer una tarjeta de pregunta, el audio de la pregunta se dispara siempre de forma automática, en cada visita a esa tarjeta (al avanzar y al volver atrás). Se espera a que cualquier audio anterior termine de parar para que no se monte ni se cancele.
2. **Parar al seleccionar cualquier respuesta**:
   - Respuesta correcta → para el audio de la pregunta y luego suena la frase de continuación ("What is your name?", etc.), como hoy.
   - Respuesta incorrecta → para el audio de la pregunta y solo muestra el sacudón rojo; sin audios encimados.
3. **ESCUCHAR queda como repetición**: el botón sigue visible para volver a oír la pregunta cuantas veces quiera, pero ya no es requisito para practicar listening.

## Verificación

- Prueba en móvil (episodio 3): llegar a una pregunta sin tocar ESCUCHAR → suena sola; seleccionar respuesta → el audio para de inmediato.
- TypeScript + tests del storybook.
