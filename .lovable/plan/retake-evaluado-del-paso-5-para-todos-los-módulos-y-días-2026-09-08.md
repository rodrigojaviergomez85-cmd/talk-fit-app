# Retake evaluado del Paso 5 — para todos los módulos y días

Hoy el retake opcional solo existe en Basic 3 · Día 1. La idea es abrirlo a todos los cursos que ya tiene la app, conservando exactamente la misma pantalla y el mismo flujo, sin volverlo obligatorio y sin subir el gasto por alumno.

## Qué cambia para el estudiante

- Después del feedback del Paso 5, cualquier día de cualquier módulo muestra "INTÉNTALO OTRA VEZ · APLICA EL FEEDBACK · OPCIONAL".
- Sigue siendo opcional: se puede continuar sin grabar, y el retake nunca bloquea el fin de la práctica.
- En role plays y Pressure Rounds se repite solo el turno evaluado, con su misma pregunta y situación, y con el tiempo de grabación de ese turno (no el de toda la actividad).
- El resultado mantiene ANTES / AHORA, "APLICASTE ESTO", "SOBRE TU RESPUESTA" y "SIGUE PRACTICANDO".
- El título dice "MEJORASTE" solo cuando hay evidencia validada en la nueva grabación; si no, dice "RETAKE COMPLETADO".
- Un solo retake por feedback. Si el análisis falla por un problema técnico, se puede reintentar con la misma grabación, sin gastar otro retake.

## Alcance de elegibilidad

Todos los módulos del catálogo real (`basic-zero`, `simple-future`, `simple-present`, `past-stories`, `mixed-tenses`, `eagles-week-1`, `tigers`, `sharks`, `advanced-1`, `advanced-2`, `advanced-3`), en cualquier día válido que tenga un feedback del coach en estado listo. Los módulos avanzados hoy usan el coach v2 (una sola corrección); el retake se compara contra ese feedback igual que contra el compacto.

## Detalles técnicos

1. **Gate de elegibilidad** (`src/lib/final-audio-coach.ts`)
   - `isRetakePilot(moduleId, day)` pasa a aceptar cualquier `moduleId` válido del catálogo con `day >= 1` (se conserva el nombre para no renombrar identificadores internos). Se valida contra el índice de módulos, no contra una lista duplicada.
   - Frontend y backend consumen el mismo helper, así que el servidor sigue rechazando módulo/día inválidos con `not_available` antes de tocar almacenamiento, cuota o proveedores.

2. **Contexto correcto del turno** (`src/lib/final-coach-retake.server.ts`, `src/routes/api/final-audio-coach-retake.ts`)
   - `findPreviousFeedback` ya no toma "el último feedback del día": selecciona por `user_id + module_id + day + status ready` y además devuelve `source_turn_number` y `take_number`; el cliente envía el `sourceTurnNumber` mostrado y el servidor valida que coincida con la fila (si no coincide, `no_feedback`). Esto ata el retake al feedback exacto que vio el alumno.
   - `RetakeLlmContext` se construye reutilizando `buildRubric(day, moduleId, label, sourceTurnNumber)` del coach, de modo que la pregunta, el interlocutor y el objetivo de lenguaje sean los del turno evaluado, no el `rep5Prompt` genérico.

3. **Prompt por nivel** (`buildRetakeMessages`)
   - Se sustituye el texto fijo "BASIC learners" por el nivel real derivado de `coachLevelGroupFor` más el fallback avanzado, con expectativas: básico = aplicar la estructura corregida; intermedio = corregir y desarrollar/conectar; avanzado = precisión, organización, registro y desarrollo laboral.
   - La tarea sigue siendo únicamente "¿aplicó el feedback anterior?"; sin segundo informe completo ni lista nueva de errores.
   - `coach_version` del retake pasa a una constante versionada por nivel para que el resultado guardado sea trazable; las filas existentes se conservan.

4. **Una sola transcripción por retake** (`practice.tsx`, endpoint del retake)
   - Hoy la misma grabación se manda al contador de ideas y al endpoint del retake: dos transcripciones pagadas.
   - El endpoint del retake devolverá el conteo de ideas calculado con el contador local determinista sobre la transcripción que ya obtuvo. Si el contador local queda incierto, se devuelve `null` y la UI muestra el conteo como no disponible (sin llamada extra de IA).
   - `practice.tsx` deja de llamar a `countSentences` para la grabación del retake y usa el conteo que viene en la respuesta.
   - Costo objetivo por retake nuevo: 1 STT + 1 comparación, 0 llamadas de conteo.

5. **Límites, errores y datos**
   - Se conservan: unicidad por feedback, lease/pending, reclamo atómico del estado `error`, caché por hash de audio, rechazo de audio distinto, cuota dedicada (5 / 24 h) y cuenta de prueba exenta. No se suben cuotas ni se cambian proveedores/modelos.
   - El retake no consume práctica diaria, no completa días, no suma racha, no reemplaza la grabación final. Audio transitorio, resultado compacto persistente.
   - Migración: aditiva y opcional — solo si hace falta guardar `source_turn_number` en `final_audio_coach_retakes` para la validación del punto 2. No se borra ni altera nada existente.

6. **Título honesto del resultado** (`FinalCoachReview.tsx`)
   - La condición de "MEJORASTE" deja de aceptar "más segundos" o "más ideas" por sí solos: exige al menos un `applied: true` validado por el servidor. Sin eso, "RETAKE COMPLETADO".

## Pruebas

Se amplían `final-coach-pilot-retake.test.ts` y los tests de resultado/UI para cubrir: Basic 3 Día 1 sin cambios; días válidos de módulos básicos, intermedios y avanzados; rechazo de módulo/día inválido antes de proveedores; sin feedback válido no hay retake; feedback de otro usuario rechazado; turno correcto en role play/Pressure Round; doble clic y concurrencia sin análisis duplicado; resultado guardado reutilizado sin IA; un retake no encadena otro; error técnico sin efecto en el progreso; más segundos sin evidencia no dispara "MEJORASTE"; una sola transcripción por retake; cuotas vigentes. Se ejecutan typecheck y la suite completa.
