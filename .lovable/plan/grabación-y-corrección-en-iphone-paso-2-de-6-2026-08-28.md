# Grabación y corrección en iPhone (paso 2 de 6)

En iPhone —tanto Safari como Chrome, porque Chrome en iOS usa el mismo motor de Apple— no existe el reconocimiento de voz en vivo del navegador. Por eso:

- El paso 2 (y el paso donde se repite frase por frase) usa ese reconocimiento en vivo para saber qué dijiste. En iPhone devuelve texto vacío, así que "no escucha" y la corrección no aparece o sale mal.
- El paso 6 sí funciona porque ahí solo se graba el audio; no necesita entender las palabras.

## Solución

Transcribir la grabación en el servidor con la IA de Lovable cuando el navegador no tenga reconocimiento en vivo (iPhone, y cualquier navegador sin soporte).

- Al detener la grabación, el audio se envía a una ruta interna del servidor que lo transcribe y devuelve el texto.
- Con ese texto se hace la misma corrección local de siempre (BIEN DICHO / CASI / INTÉNTALO OTRA VEZ). En Android/desktop se sigue usando el reconocimiento en vivo, que es instantáneo.
- Mientras transcribe se muestra un breve estado "Analizando…" / "Analyzing…" (1–3 s).
- Si la transcripción falla (sin internet o error del servicio), se guarda igual la grabación y se muestra un aviso corto en vez de marcar la frase como incorrecta. Nunca se usa un texto inventado.

## Grabación compatible con iPhone

Para que el audio sea legible por el transcriptor y por el reproductor:

- Elegir el formato que el navegador soporta de verdad (`audio/mp4` en iOS, `audio/webm` en Chrome/Android) en lugar de asumir webm.
- Armar el archivo final con ese mismo formato y nombrarlo con la extensión correcta al subirlo.
- Rechazar grabaciones vacías o de menos de ~1 segundo con un mensaje para volver a grabar, en vez de enviarlas y fallar.
- Crear el contexto de audio de la onda con el prefijo de WebKit y reanudarlo tras el toque del usuario; si falla, la grabación continúa sin la animación.

## Detalles técnicos

- Nueva ruta `src/routes/api/transcribe.ts`: recibe el audio (`multipart/form-data`), lo reenvía a `https://ai.gateway.lovable.dev/v1/audio/transcriptions` con `openai/gpt-4o-mini-transcribe`, `language: "en"` y `LOVABLE_API_KEY`; respuesta no-streaming, con manejo explícito de 402/429/5xx y validación de tamaño.
- `src/services/speech-to-text-service.ts`: nuevo `transcribeBlob(blob)` que llama a esa ruta; se elimina el uso del transcript simulado en el flujo de reps.
- `src/components/fluency/VoiceRecorder.tsx`: cuando `captureTranscript` está activo y no hay reconocimiento en vivo, usa `transcribeBlob` con estado de carga antes de llamar `onComplete`; mensajes de error de micrófono diferenciados (permiso denegado / no soportado) en inglés y español.
- `src/services/recording-service.ts`: selección de `mimeType` con `isTypeSupported`, `Blob` con el tipo real, `AudioContext` con prefijo WebKit y `resume()`.
- Sin cambios en el límite de 30 s, la serie de 5 reps, la racha ni la pantalla de día completado.

## Verificación

- Typecheck y carga de `/practice`.
- Prueba de la ruta `/api/transcribe` con un audio de ejemplo.
- Prueba en el navegador del sandbox del paso 2: grabar, ver "Analizando…" y recibir la corrección.
- Prueba final tuya en iPhone (Chrome y Safari) sobre la app publicada.
