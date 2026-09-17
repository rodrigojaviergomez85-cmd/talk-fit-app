# Práctica diaria (MVP privado) en AI Coach

Tercera opción dentro de AI Coach, visible solo para tu cuenta (english4callcenters@gmail.com), igual que hoy funciona "Hablar en vivo".

## Qué es

Conversación por turnos (presionar para hablar), no en vivo. Es ~10-20 veces más barata que Gemini Live, así que puede escalar después a miles de estudiantes con 10 minutos diarios.

Flujo de cada turno:

1. Vale hace una pregunta (voz generada con el sistema de voz que ya existe, con caché: la misma pregunta no se vuelve a pagar).
2. Tú presionas el micrófono y respondes (máximo 30 segundos).
3. Se transcribe tu audio y se evalúa tu respuesta.
4. Vale responde: si hubo un error real, dice la frase corregida y te pide repetirla ("Say it with me"); si no, comenta breve y hace la siguiente pregunta.
5. Se reproduce su respuesta con el avatar animado moviendo la boca, igual que en el modo en vivo.

Antes de empezar se elige nivel (básico, intermedio, avanzado) y tiempo verbal (presente, pasado, futuro), y cada 5-6 turnos Vale ofrece cambiar de tiempo verbal.

## Alcance del MVP

- Solo tu cuenta ve y puede usar la pestaña; para el resto no aparece y el servidor la bloquea.
- Sin guardar transcripciones: solo se registran los contadores de uso y costo.
- Límites: 40 turnos por día y un tope por hora, con la misma mecánica de cupos que ya usa la app.
- Muestra en pantalla los turnos usados para poder medir el costo real antes de abrirlo a todos.

## Detalles técnicos

- Nueva ruta `src/routes/api/coach-practice.ts`:
  - `GET`: estado (permitido, turnos usados, límite).
  - `POST` multipart: audio + nivel + tiempo verbal + últimas 6 líneas de contexto.
  - Orden: auth → allowlist por email (misma lista que `live-coach.ts`) → validación de audio (tipo, 2 KB–1.5 MB) → cupo diario (`sectionDailyLimit` + `consumeQuota`, clave `coach_practice`) y cupo por hora → Groq `whisper-large-v3-turbo` (una llamada) → una llamada de texto al gateway (`google/gemini-3.1-flash-lite`, `max_tokens` bajo, sin reasoning) que devuelve JSON `{correction, sayIt, reply}` → respuesta.
  - Registro de costo con `logGroqCall` y `logAiCall`, reutilizando el patrón de `story-say-check.ts`.
- Nuevo componente `src/components/fluency/PracticeCoach.tsx`: selección de nivel/tiempo, grabación con `MediaRecorder` (tope 30 s), envío al endpoint, historial en pantalla, reproducción de la respuesta vía `/api/tts` con `AnalyserNode` para animar `CoachAvatar` (mismo cálculo de envolvente que `LiveCoach`).
- `src/routes/ai-coach.tsx`: tercera pestaña "Práctica diaria" / "Daily practice", renderizada solo si el estado del endpoint responde `allowed: true`.
- Sin cambios en base de datos: se usan los RPC de cupos existentes.
- Verificación: `bunx tsgo --noEmit`, pruebas existentes y una prueba en el navegador autenticado con un turno real de audio.
