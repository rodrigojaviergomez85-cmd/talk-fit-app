# Arreglar "Hablar en vivo": el coach no escucha ni responde

Hoy la sesión se conecta y el cronómetro corre, pero en iPhone el estudiante habla y no pasa nada: no hay saludo, no hay respuesta hablada y no hay corrección al final. El problema no es el permiso del micrófono; es cómo se envía y se reproduce el audio en el teléfono, y que el coach nunca empieza ni cierra la conversación.

## Qué va a cambiar para el estudiante

1. **El coach saluda primero.** Al tocar "Hablar en vivo", en 1–2 segundos el coach dice algo corto en inglés y hace una pregunta. Así se sabe que está en vivo.
2. **Te escucha de verdad.** Se corrige el envío del audio desde el teléfono para que el modelo reciba la voz con la calidad que espera (hoy en iPhone llega distorsionada, por eso no contesta).
3. **Se oye la respuesta.** Se desbloquea el sonido al tocar el botón y se reproduce a la velocidad correcta en iPhone.
4. **Siempre hay feedback al final.** Al tocar "Terminar", antes de cerrar, el coach da un resumen corto en español con hasta 3 correcciones y una frase para practicar; queda en pantalla y también se escucha.
5. **Avisos claros en vez de silencio.** Si no se detecta voz en ~15 segundos, o si se cae la conexión, aparece un mensaje ("No te estoy escuchando, revisa el micrófono") en vez de quedarse mudo.
6. **Ves lo que dijiste.** El texto de tu turno y el del coach siguen apareciendo en pantalla durante la conversación (no se guarda nada).

## Detalle técnico

Archivo principal: `src/components/fluency/LiveCoach.tsx`.

- **Captura de audio:** hoy se crea `new AudioContext({ sampleRate: 16000 })` y se envían las muestras crudas como `audio/pcm;rate=16000`. Safari iOS ignora `sampleRate` y entrega 48 kHz, así que el modelo recibe audio a triple velocidad. Cambio: leer `ctx.sampleRate` real y remuestrear a 16 kHz en el cliente antes de `sendRealtimeInput`.
- **Reproducción:** crear el `AudioContext` de salida y llamar `resume()` dentro del gesto del tap (antes de los `await`), y construir los buffers con la tasa real del contexto remuestreando el PCM de 24 kHz, en vez de asumir 24 kHz. Mantener la cola con `playHead` y el corte en `interrupted`.
- **Saludo inicial:** tras `ai.live.connect`, enviar un `sendClientContent` con un turno de sistema breve que pida saludar y hacer una pregunta.
- **Cierre con feedback:** en `stop()`, si la sesión está viva, enviar un turno de texto pidiendo el resumen en español, esperar hasta ~8 s el `turnComplete`, mostrar el texto y dejar terminar el audio; luego cerrar socket, micrófono y reportar segundos a `/api/live-coach` como hoy.
- **Diagnóstico:** temporizador de silencio (sin `inputTranscription` ni nivel de micrófono) que muestra aviso; `onerror`/`onclose` muestran el motivo en vez de cerrar en silencio.
- **Sin cambios de costos ni límites:** siguen los 5 min por sesión, 15 min al día y la lista privada en `src/routes/api/live-coach.ts`.

## Cómo se verifica

- Prueba en el navegador del sandbox con micrófono simulado: confirmar saludo del coach, transcripción del turno, audio de respuesta y resumen final.
- Prueba manual en tu iPhone (es el caso que falló): hablar una frase, escuchar respuesta, tocar "Terminar" y ver la corrección.
- Confirmar que los segundos usados siguen quedando registrados.
