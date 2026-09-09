# Review: módulo "Present Progressive"

Agregar un segundo módulo dentro de Review, con exactamente la misma lógica y estructura que "Simple Present": guía de gramática, 5 prácticas completas, Pasos 1–5 idénticos a los del curso, progreso propio y aislado.

## Qué verá el usuario

- En Review aparecen dos tarjetas: **Simple Present** y **Present Progressive** (Presente Progresivo).
- Present Progressive tiene 5 prácticas completas, cada una con:
  - Paso 1: recordatorio corto (la práctica 1 abre con la guía completa "Entiéndelo fácil").
  - Paso 2: copiar por trozos con corrección hablada.
  - Paso 3: shadowing con control de velocidad.
  - Paso 4: tres preguntas WH con variedad por práctica.
  - Paso 5: tres audios obligatorios, opción 4 y 5, elección del audio final, Coach y un retake opcional.
- Mismo tope diario de 5 prácticas y misma cuota de AI: solo la primera grabación real consume un cupo.
- El progreso de Review sigue separado del viaje de 66 días, rachas y desbloqueos.

## Contenido de las 5 prácticas

Foco: acciones en curso ahora, planes cercanos y contraste natural con rutinas.

1. **Right now at the office** — 3ª persona (personaje). Am/is/are + -ing en afirmativo.
2. **What I'm doing today** — 1ª persona. Negativo y "-ing" con cambios ortográficos (making, running, studying).
3. **On the call right now** — 3ª persona. Preguntas y respuestas cortas (Is she…? Yes, she is).
4. **My week in progress** — 1ª persona. Progresivo vs presente simple (hábito vs ahora).
5. **Live update** — 3ª persona, con hoja de datos en vez de monólogo modelo: narración libre de una escena en curso.

Cada práctica: 8 oraciones modelo con traducción y trozos, mínimo 5 preguntas guiadas, vocabulario, pregunta final con tips y objetivos gramaticales para el Coach.

Paso 4 con variedad intencional: WHAT, WHERE, WHO, WHY, HOW, HOW LONG, WHAT TIME repartidos, tres preguntas distintas por práctica y sin repetir la misma WH dentro de una práctica.

## Detalles técnicos

- `src/lib/review-types.ts`: agregar `"review-present-progressive"` a `REVIEW_MODULE_IDS` (el resto de tipos ya es genérico).
- Nuevos: `src/services/review/present-progressive-guide.ts` (7 tarjetas) y `src/services/review/present-progressive-practices.ts` (5 prácticas).
- `review-registry.ts`: registrar el módulo en `REVIEW_MODULES`; las funciones `getReviewModule`, `getReviewPractice`, `loadReviewDay` y la adaptación a `CourseDay` funcionan sin cambios.
- `rep2-correction-profiles.ts`: mapear `review-present-progressive` a `SIMPLE_PRESENT_PROFILE` y agregarlo al `ROLLOUT_MODULES` (misma tolerancia exacta de BASIC).
- Rutas `/review`, `/review/$moduleId`, `/review/$moduleId/$practice` ya son genéricas por `moduleId`: no requieren cambios.
- `review-progress.ts` ya indexa por `moduleId`; el progreso del nuevo módulo queda separado automáticamente.
- Pruebas: extender `review-content.test.ts` para validar, para cada módulo de Review, 5 prácticas, 8 líneas con trozos, ≥5 preguntas, exactamente 3 prompts distintos en Paso 4, cobertura WH y aislamiento respecto al curso.

## Fuera de alcance

Sin cambios en el curso de 11 módulos, en progreso/rachas/hábito, en cuotas ni en el motor del Coach.
