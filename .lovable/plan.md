# Fluency Reps — Viaje de 5 días de Simple Present (actualización del MVP)

Mantenemos la identidad visual actual (naranja / navy / blanco, mobile-first) y reconstruimos solo la experiencia de aprendizaje.

## 1. Contenido: 5 días

Nuevo contenido en el servicio de lecciones, con las frases exactas del brief y traducciones al español escritas a mano:

- Día 1 — I / You / We / They · My Work Routine · 8 frases
- Día 2 — He / She · Someone I Know · 8 frases nuevas
- Día 3 — Don't / Doesn't · Things We Do and Don't Do · 8 frases nuevas
- Día 4 — Do / Does · Ask & Answer · 8 pares pregunta/respuesta
- Día 5 — Fluency Challenge · 10 patrones mixtos + 3 mini retos

Cada día trae: intro corta (Paso 0), sus 8 frases divididas en chunks naturales, prompts + sentence starters para la Rep 4, y cues visuales para la Rep 5. Las Reps 1–4 reciclan las mismas 8 frases del día.

## 2. Flujo diario: 5 Fluency Reps

```text
STEP 0 intro corta → REP 1 LISTEN → REP 2 COPY → REP 3 SHADOW
   → REP 4 MAKE IT YOURS → REP 5 FINAL FLUENCY REP → DAY COMPLETE
```

- **Rep 1 — Just listen**: sin transcripción al inicio; botón grande ▶ LISTEN TO MODEL; al terminar, LISTEN AGAIN / NEXT.
- **Rep 2 — Listen & copy**: chunk por chunk con ▶ LISTEN, 🎤 RECORD, y después LISTEN TO MODEL / LISTEN TO ME / TRY AGAIN / NEXT. Sin ninguna corrección.
- **Rep 3 — Speak with the model**: transcripción en chunks, solo dos velocidades (SLOW / NORMAL), animación de onda, TRY AGAIN / NEXT.
- **Rep 4 — Make it yours**: preguntas cortas + starters del día; grabaciones cortas opcionales; en Día 4 la app reproduce preguntas ("YOUR TURN") y además pide al alumno hacer sus propias preguntas con DO y DOES.
- **Rep 5 — Final fluency rep**: 3 intentos obligatorios (PRACTICE / MAKE IT BETTER / FINAL REP) con temporizador y meta 35–45 s, apoyo visual que disminuye en cada intento, y hasta 2 intentos opcionales con "USE THIS AS MY FINAL REP". Al final: comparación YOUR FIRST TRY vs YOUR FINAL TRY con duraciones, sin juicios de calidad.

## 3. Eliminar toda evaluación automática

Se quitan de la app: scores de fluidez/gramática/pronunciación, corrección por reconocimiento de voz, "My Top Mistakes", strongest skill, biggest opportunity y el AI Coach. Solo se miden datos objetivos: duración de grabación, reps completadas, minutos hablados, días completados y racha.

## 4. Pantallas

- **Home**: tarjeta del día actual (DAY N OF 5, foco, tema, meta 35–45 s, 5 reps, 5–8 min) + botón START DAY N; debajo el mapa del viaje con estados completado / actual / bloqueado; tiles de racha, días completados, minutos hablados y grabaciones finales. Sin Fluency Score ni "Today's focus" generado.
- **Progress**: racha, días completados, minutos hablados esta semana, total de reps, y el viaje de 5 días.
- **Coach → MIS GRABACIONES**: historial de la grabación final de cada día (Día, tema, duración, ▶ LISTEN). Al terminar el Día 5 aparece THEN VS NOW (Día 1 vs Día 5).
- **Completado del día**: DAY N COMPLETE ✓, 5/5 reps, tiempo final, práctica total, racha, "SMALL REPS. BIG FLUENCY.", botones ▶ LISTEN TO FINAL RECORDING y FINISH.
- **Completado del Día 5**: 5/5 DAYS, totales, Día 1 vs Día 5 y la pregunta de autoevaluación (NOT YET / A LITTLE / DEFINITELY) que se guarda.

Desbloqueo secuencial: al completar un día se abre el siguiente de inmediato.

## 5. Guardado en la nube

Activamos Lovable Cloud para que las grabaciones finales y el progreso queden guardados y puedas revisarlos durante el testeo con estudiantes reales:

- Login simple por email/contraseña (necesario para asociar cada grabación a un alumno).
- Tablas de progreso por día (día, reps completadas, duraciones, respuesta de autoevaluación) y almacenamiento de audio para la grabación final de cada día.
- El alumno solo ve y escucha sus propias grabaciones.
- Si falla la subida, la sesión sigue funcionando y la grabación se puede escuchar localmente.

## Detalles técnicos

- `src/services/lesson-service.ts` pasa a exponer un catálogo `days[1..5]`; `src/lib/types.ts` gana `Day`, patrones Q&A y quita los tipos de scoring/análisis.
- `src/routes/practice.tsx` se reescribe como máquina de estados de 5 reps parametrizada por día (`/practice?day=N`); se borran `RepFeedback`, `QuickFixCard`, `AIAnalysisCard`, `MistakeBank`, `FluencyScore`, `PronunciationCard`, `pronunciation-check.ts`, `speech-analysis-service.ts`, `feedback-service.ts` y el uso de `speech-to-text-service` para corrección.
- Componentes reutilizables: `AudioPlayer`, `VoiceRecorder`, `RepProgress`, `DailyJourney` (nuevo), `RecordingComparison`, `RecordingHistory` (nuevo), `CompletionScreen`, `TranslationToggle`.
- `ProfileService` pasa a manejar días del viaje (`currentDay`, `completedDays`, minutos, racha) y sincroniza con Cloud; se conserva la idempotencia por fecha local.
- Grabación: se mantiene la selección de MIME por navegador (mp4 en iOS) ya implementada; se elimina la transcripción de `/api/transcribe` del flujo del alumno. Se conserva `/api/tts` para el audio del modelo.
- SEO/head por ruta y verificación con typecheck + recorrido móvil en Playwright.
