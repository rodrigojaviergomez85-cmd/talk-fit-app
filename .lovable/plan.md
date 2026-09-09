# Review — Simple Present (5 prácticas)

Nueva sección de refuerzo para estudiantes que van a repetir su examen filtro. Es independiente del curso de 11 módulos: practicar aquí no completa días, no desbloquea niveles y no altera el hábito de 66 días.

## Navegación

- Menú inferior con 4 botones: Inicio · Progreso · Review · Cuenta.
- Rutas nuevas: `/review` (home de Review), `/review/simple-present` (módulo) y `/review/simple-present/$practice` (práctica 1–5). Abrir cualquiera directo desde el navegador funciona.
- En Review se muestra "Práctica 1 de 5", nunca "Día 1 de 20". Se puede elegir y repetir cualquiera; se destaca la siguiente pendiente.

## Las cinco prácticas

Perspectiva de las respuestas principales: 3ª · 1ª · 3ª · 1ª · 3ª.

1. **Elena's everyday routine** (she) — rutina entre semana, transporte, estudio, casa. Incluye la guía completa de gramática (7 tarjetas).
2. **My everyday life** (I) — verbo base, don't, like, because.
3. **Marco's habits** (he) — adverbios de frecuencia, every day / twice a week, doesn't, preguntas How often does…?
4. **My week and my preferences** (I) — preguntas con Do y palabras interrogativas, respuestas cortas + información extra; el estudiante formula al menos 2 preguntas a otra persona.
5. **Sofía's weekend** (she) — ficha de datos en vez de monólogo modelo; integra 3ª persona, negativas, frecuencia y conectores.

Elena, Marco y Sofía son personajes distintos y consistentes en explicación, modelos, preguntas y evaluación. Cada práctica trae contenido escrito a mano: 8 oraciones modelo con traducción y chunks, mínimo 5 preguntas guiadas con traducción y ayuda, instrucciones, vocabulario, consigna final y objetivos gramaticales. Nada se genera con IA al abrir la página.

## Guía "Entiéndelo fácil" (7 tarjetas)

Para qué sirve · Afirmaciones · Tercera persona (-s, -es, -ies, goes, has) · Negativas · Preguntas y respuestas cortas · Frecuencia · El caso de to be. Cada tarjeta con explicación en español sencillo, ejemplos en inglés y traducción, y una mini comprobación oral entre tarjetas. Errores destacados: She work, She doesn't works, Does she studies?, I am work.

La guía vive dentro del Paso 1 de la Práctica 1 y queda accesible con "Ver explicación" en las 5 prácticas. En las prácticas 2–5 solo se muestra al inicio el recordatorio del objetivo.

## Los cinco pasos

Se conserva la estructura conocida: entender y escuchar · repetir chunks · practicar con menos apoyo · responder preguntas · hablar libre. Los pasos 1–4 son práctica sin evaluación de IA.

Paso 5 = exactamente cinco posiciones de audio:

```text
Audio 1  ensayo   (escuchar; sin transcripción ni IA)
Audio 2  ensayo
Audio 3  ensayo
Audio 4  respuesta evaluada por el coach
Audio 5  retake ligado al feedback del audio 4
```

Se puede reemplazar un ensayo antes de avanzar. Posiciones vacías o grabaciones inválidas no cuentan como completadas. Meta orientativa: 5 ideas conectadas, 30–45 segundos (indicador de práctica, no aprobación).

El feedback comprueba consigna y persona principal, evalúa Simple Present según el objetivo, muestra una fortaleza cuando hay evidencia y una corrección prioritaria, y da una instrucción concreta para el retake. No inventa errores ni mejoras ni juzga pronunciación. El retake se compara contra el feedback exacto de ese usuario, práctica y sesión, y distingue "mejoró" de "sin evidencia suficiente".

## Límites, guardado y fallos

- Cada práctica de Review consume una de las 5 sesiones diarias, igual que el curso.
- Máximo 2 evaluaciones de speaking por sesión (audio 4 y retake), sujetas a la cuota de IA existente. Los ensayos 1–3 no llaman a ningún servicio de IA ni al contador de oraciones.
- Los audios se guardan en la nube con las mismas reglas de privacidad y conservación; no se guardan transcripciones completas.
- Sin cuota o con fallo de IA: la práctica sigue disponible, el quinto audio se puede usar como ensayo, se avisa claramente que la evaluación no está disponible y nunca se simula feedback. "Práctica completada" y "evaluación disponible" son cosas distintas.
- El progreso de Review es por usuario y no es accesible para otros.

## Detalles técnicos

- **Identidad separada**: nuevo tipo `ReviewModuleId` (`review-simple-present`) y `ReviewPracticeId` (1–5) en `src/lib/review-types.ts`, con un registro validado del contenido en `src/services/review/`. No se reutiliza el `ModuleId` curricular `simple-present`.
- **Contenido**: `src/services/review/simple-present-review.ts` (5 prácticas estáticas) + `simple-present-guide.ts` (7 tarjetas). Se reutiliza `ModelLine`/chunks para aprovechar TTS y caché de audio existentes.
- **Persistencia**: nueva tabla `review_progress` (user_id, review_module_id, practice_number, estado, intentos, últimas métricas) con GRANTs, RLS por `auth.uid()` y trigger `set_updated_at`. Las grabaciones usan la tabla `recordings` existente con columnas nuevas `review_module_id` / `review_practice` nulables (los 11 módulos siguen intactos), y `final_audio_coach_feedback` / `final_audio_coach_retakes` reciben las mismas columnas opcionales.
- **Servidor**: `/api/final-audio-coach` y `/api/final-audio-coach-retake` aceptan explícitamente un payload de Review (`reviewModuleId` + `practice` 1–5) validado contra el registro de contenido; se mantiene la validación de propiedad del audio, hashes, caché, leases, idempotencia y cuotas. La identidad del usuario sigue saliendo del token, nunca del cliente.
- **UI**: se reutilizan `VoiceRecorder`, `TakeBoard`, `AudioPlayer`, `ShadowKaraoke`, `FinalCoachReview`, `AppShell` y el sistema de traducciones; el flujo de práctica de Review es un componente propio para no tocar `practice.tsx` del curso.
- **Pruebas**: nuevos tests de contenido (5 prácticas, alternancia de persona, personajes distintos, 7 tarjetas, guía accesible en 2–5), de flujo (retake = audio 5, ensayos sin llamadas de IA, vínculo audio 4 ↔ retake, rechazo de feedback ajeno, sin elogios falsos) y de aislamiento (Review no cambia progreso/desbloqueos/pacing del curso, no evade cuota). Se ejecutan `npx vitest run`, `npx tsc --noEmit` y `npm run build`.
