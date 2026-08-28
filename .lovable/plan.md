# Grabación de audio en iPhone (Safari)

En iPhone la grabación no funciona. Las causas están en el código actual de captura de micrófono:

1. `RecordingService.start()` crea `new MediaRecorder(stream)` sin indicar formato. Safari en iOS no soporta `audio/webm`; necesita `audio/mp4`. Además, el `Blob` final se arma con `"audio/webm"` como respaldo, lo que produce audios que iOS no reproduce.
2. El `AudioContext` que se usa para la onda de voz se crea sin `webkitAudioContext` y sin `resume()`. En iOS arranca suspendido y puede lanzar error, dejando la grabación inutilizable.
3. Si el micrófono falla, el mensaje es siempre el mismo ("We need microphone access"), sin distinguir permiso denegado, navegador no compatible o página sin HTTPS.
4. La transcripción en vivo (Web Speech) no existe en Safari iOS, así que las reps quedan sin texto; hoy eso puede bloquear el flujo.

## Cambios

**Captura compatible con iOS**
- Elegir el formato soportado con `MediaRecorder.isTypeSupported`, en orden: `audio/mp4`, `audio/mp4;codecs=mp4a.40.2`, `audio/webm;codecs=opus`, `audio/webm`; si ninguno aplica, dejar que el navegador decida.
- Usar el `mimeType` real del grabador al crear el `Blob`, sin forzar webm.
- Pedir `getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } })` y liberar las pistas siempre.
- Crear el `AudioContext` con el prefijo `webkit` cuando exista y llamar `resume()` tras el gesto del usuario; si falla, seguir grabando sin onda.

**Errores claros**
- Detectar `NotAllowedError` (permiso denegado), ausencia de `mediaDevices` (Safari en iframe o sin HTTPS) y navegador sin `MediaRecorder`, mostrando un mensaje bilingüe distinto en cada caso, con la indicación de abrir la app en Safari desde la pantalla de inicio y permitir el micrófono en Ajustes.

**Sin transcripción en iOS**
- Cuando no haya reconocimiento de voz, la rep se guarda igualmente con su audio y duración; el flujo de reps 1–5 y la pantalla de día completado no cambian.

## Detalles técnicos

- `src/services/recording-service.ts`: selección de `mimeType`, `Blob` con el tipo real, `AudioContext` con prefijo y `resume()`, y tipos de error propagados (`permission | unsupported | insecure | unknown`).
- `src/components/fluency/VoiceRecorder.tsx`: mapear ese tipo de error a texto en inglés/español.
- Sin cambios en la lógica de reps, límite de 30 s, racha ni en la voz del modelo.

## Verificación

- Typecheck y carga de `/practice`.
- Prueba en el navegador del sandbox: grabar, detener, ver duración y reproducir la rep.
- Prueba final tuya en iPhone (Safari) en la app publicada, ya que el simulador no reproduce el comportamiento real de iOS.
