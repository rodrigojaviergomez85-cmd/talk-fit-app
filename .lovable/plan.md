# Silenciar el audio del cuento al empezar a grabar

## El problema

En las preguntas rápidas, el audio de la frase ("Ahora dilo tú") a veces tarda en cargar. Si tocas el botón de grabar antes de que termine de cargar, el audio arranca mientras ya estás grabando: en la reproducción se escucha tu voz mezclada con la voz del cuento.

Hoy el botón de grabar no apaga el audio que está sonando ni el que viene en camino. La app ya sabe cancelar audio pendiente, pero nadie se lo pide al empezar a grabar.

## La solución

Al tocar el botón de grabar en cualquier parte del cuento, el audio se corta de inmediato (el que suena y el que aún está cargando). Así la grabación siempre queda limpia, con tu voz sola.

Se aplica en los tres lugares donde se graba dentro del cuento:
- la repetición después de responder una pregunta rápida,
- la tarjeta de motivación (frase de mentalidad),
- la grabación final del episodio.

Nada más cambia: los botones, los tiempos y la forma de escuchar la grabación quedan igual.

## Detalles técnicos

- `src/components/storybook/StorybookPlayer.tsx`: pasar `onStart={() => AudioService.stop()}` a cada `VoiceRecorder` (quiz "say it", mindset, finale). `VoiceRecorder` ya expone el callback `onStart`.
- `AudioService.stop()` ya cancela tanto el `HTMLAudioElement` en curso como la petición TTS en vuelo (`latestSpeakCancel`), así que no requiere cambios en `src/services/audio-service.ts`.
- Verificación: typecheck, tests de storybook y prueba en móvil respondiendo una pregunta y tocando grabar de inmediato.
