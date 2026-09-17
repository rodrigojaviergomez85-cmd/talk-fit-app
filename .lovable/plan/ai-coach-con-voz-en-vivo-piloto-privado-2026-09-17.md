# AI Coach con voz en vivo (piloto privado)

Piloto solo para tu cuenta. Nadie más ve ni puede abrir el modo de voz.

## Cómo se ve

La pantalla AI Coach pasa a tener dos pestañas:

1. **Escribir** — el chat de texto actual, sin cambios (mismos límites, mismas respuestas).
2. **Hablar en vivo** — visible solo para tu cuenta.

En "Hablar en vivo":

- Un círculo animado al centro que late y se expande con la voz (como el modo de voz de ChatGPT): un color cuando tú hablas, otro cuando el coach habla, y un pulso suave mientras piensa.
- Un botón grande: "Empezar conversación" / "Terminar".
- Debajo, el tiempo usado de la sesión.
- Puedes interrumpir al coach hablando encima; él se calla y te escucha.

## La conversación

- El coach actúa como una persona real: hace una pregunta, escucha, responde, repregunta. Nada de listas ni explicaciones largas.
- Habla en inglés; si te trabas, da un empujón corto en español y vuelve al inglés.
- **No te corrige en el momento** (así lo pediste): te deja hablar.
- Al terminar, aparece un **resumen de la sesión**: 3 a 5 errores con la versión correcta, 2 o 3 expresiones mejores que pudiste usar, y una frase de ánimo. Bilingüe.
- La conversación no se guarda; solo se guarda el resumen de esa sesión mientras tengas la pantalla abierta.

## Límites del piloto

- Máximo 5 minutos por sesión y 15 minutos al día, con corte automático y aviso a los 30 segundos finales.
- Al cerrar la pestaña o quedarse en silencio 20 segundos, la sesión termina sola (evita cobros fantasma).
- Todo el tiempo y costo de cada sesión queda registrado en el panel de costos que ya existe.

## Cómo lo construiría (técnico)

**Voz en vivo: ElevenLabs Agents (WebRTC).** Es la única forma de lograr latencia de conversación real, interrupciones y voz natural. El agente se configura en ElevenLabs y la app solo pide un token efímero.

- Conector ElevenLabs (App connector) → `ELEVENLABS_API_KEY` en el servidor.
- `src/routes/api/ai-coach-voice.ts`: `verifyRequestUser`, verificación server-side de que el usuario está en la allowlist del piloto (reutilizando `unlimited-access` / una constante nueva), reserva de minutos, y `GET /v1/convai/conversation/token`. Sin allowlist → 403.
- Cliente `@elevenlabs/react` (`useConversation`) en un componente nuevo `LiveCoach.tsx`: estado de conexión, `getOutputVolume()`/`getInputVolume()` para animar el círculo con `requestAnimationFrame` sobre un SVG/canvas ligero.
- Cuota de minutos: nueva RPC `consume_ai_coach_voice_minutes` con el mismo patrón atómico de `consume_ai_coach_quota`, más un heartbeat cada 30 s que descuenta el tiempo real; el cierre reconcilia.
- Resumen final: la transcripción que devuelve la sesión se manda una sola vez a `openai/gpt-6-astra` por el gateway con un esquema JSON simple (errores, mejoras, ánimo), registrado en `ai_call_log` como endpoint `ai-coach-voice-summary`.
- `src/routes/ai-coach.tsx` gana las pestañas; el flujo de texto y su cuota quedan intactos.

**Alternativa sin conector nuevo:** encadenar lo que ya tenemos (Groq Whisper → modelo de texto → `/api/tts`). Cuesta menos y no requiere ElevenLabs, pero hay ~2 segundos de pausa entre cada turno y no se puede interrumpir: se siente a walkie-talkie, no a conversación. Sirve como respaldo si el costo de voz en vivo resulta alto en el piloto.

## Costos a vigilar en el piloto

La voz en vivo se cobra por minuto de conversación, no por pregunta. Por eso el piloto va cerrado a tu cuenta, con corte por silencio y tope duro de minutos, y con medición en el panel de costos antes de pensar en abrirlo a estudiantes o dejarlo solo para Pro.
