# Botón de salir en el lector de cuentos (El mundo de Vale)

## Objetivo
Dentro de cualquier episodio, el estudiante tendrá un botón de salir (X) siempre visible que lo regresa a la pantalla de decisión del día (Método natural o Audios del día). Así no queda "atrapado" en la historia si entró por error o quiere cambiar de actividad.

## Propuesta de ubicación
- En la barra superior del lector, a la derecha, junto al contador de estrellas.
- Botón circular con icono X (mismo estilo que el botón de atrás a la izquierda).
- Visible en TODAS las slides: portada, escenas, preguntas rápidas, tarjeta motivacional y final.
- En la portada convive con la flecha de atrás (la flecha ya lleva a la pantalla del día); la X hace lo mismo ahí, así el patrón es consistente.

## Comportamiento
- Si el estudiante llegó desde Inicio (flujo del día), la X lo lleva a `/day/$moduleId/$day` — la pantalla donde elige entre el Mundo de Vale y los audios obligatorios.
- Si llegó desde el menú de Método natural / Audiolibros, la X lo lleva a `/natural-method/audiobooks` (mismo destino que la flecha de atrás actual).
- Antes de salir se detiene cualquier audio en reproducción (incluidas descargas TTS en curso) para que no quede sonando de fondo.
- Las estrellas ganadas hasta ese momento se conservan en memoria de la sesión actual igual que hoy; no se toca la lógica de progreso ni de desbloqueo.

## Etiquetas
- Solo icono X (sin texto) para no saturar la barra en móvil; aria-label "Salir" / "Exit" para accesibilidad.

## Detalles técnicos
- Archivo: `src/components/storybook/StorybookPlayer.tsx` — nuevo botón en el header que llama a una función `handleExit`: `AudioService.stop()` + navegar según origen (reutiliza el parámetro `from=day` ya validado en `natural-method.cuento.$storyId.tsx`, leyendo `moduleId`/`day` del slot del episodio con `getEpisodeSlot()`).
- Sin cambios en rutas, desbloqueo, ni endpoints.

## Verificación
- TypeScript + tests de storybook.
- Playwright móvil (394px): entrar a un episodio desde Inicio, avanzar 2 escenas, pulsar X → confirmar que aterriza en la pantalla del día; entrar desde Audiolibros → X → confirmar regreso al listado.
