# Plan: Ajustar gramática de Basic Zero

## Objetivo
- Eliminar el Paso 3 de gramática de Basic Zero **semana 1** (días 1–5).
- Reducir a **10 preguntas** los quizzes de Basic Zero **semanas 2, 3 y 4** (días 6–20), con una selección curada que mantiene los tres formatos.
- Aprobar con **7 de 10**; los 150 puntos y el reintento único no cambian.
- Los puntos e historial ya ganados por estudiantes en la semana 1 **se conservan** (no se toca la base de datos).

## Cambios

### 1. Eliminar semana 1 (días 1–5)
- Borrar `basic-zero-day-1.ts` a `basic-zero-day-5.ts` y quitar sus imports/entradas del registro en `src/services/grammar-quiz/index.ts`.
- Manifest (`src/lib/grammar-quiz-manifest.ts`): `basic-zero` pasa a `days: [6..20]`. Con esto el Paso 3 desaparece de la ruta del día y de la liga para la semana 1; la meta semanal de liga de esa semana baja a 0 días de gramática.
- Sin cambios en base de datos: los intentos y puntos históricos de `grammar_quiz_attempts` / liga quedan intactos.

### 2. Reducir semanas 2–4 a 10 ítems (días 6–20)
- Editar `basic-zero-day-6.ts` a `basic-zero-day-20.ts`: curar a mano 10 ítems por día manteniendo la mezcla de los 3 formatos (opción múltiple, toca el error, ordena) y priorizando anclas del curso + trampas reales. Sin renumerar ids de los que quedan (se conservan `bzg6-x`… existentes para no romper historial de fallos).

### 3. Umbral por quiz
- `types.ts`: agregar `passScore?: number` al tipo `GrammarQuiz` (por defecto `GRAMMAR_PASS_SCORE = 16`). Los quizzes de basic-zero días 6–20 llevan `passScore: 7`.
- `src/lib/grammar-quiz.functions.ts`: calificar con `quiz.passScore ?? GRAMMAR_PASS_SCORE`.
- `GrammarQuizScreen.tsx`: el mensaje "Necesitas X de Y" usa el umbral del quiz actual.

### 4. Tests
- `grammar-quiz.test.ts`: actualizar conteos (55 quizzes, ids únicos), longitud 20 para Basic 3/4 y 10 para basic-zero, `hasGrammarQuiz("basic-zero", 1..5) = false`, `grammarDaysInWeek("basic-zero", 1) = 0`, semanas 2–4 = 5; verificar `passScore: 7` en basic-zero.

### 5. Verificación
- `npx vitest run` completo y `npx tsc --noEmit`.
- Móvil: Basic Zero día 1 ya **no** muestra Paso 3; día 6 muestra 10 ítems, umbral 7/10, feedback verde y puntos.

## Fuera de alcance
Basic 3/Basic 4 (sin cambios), mecánica de 150 pts/reintento, cursos, storybook, práctica, estrellas, liga (solo refleja el nuevo manifest), y datos históricos.
