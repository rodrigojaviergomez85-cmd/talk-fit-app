# Eliminar la pantalla de feedback al terminar las 5 reps

## Objetivo
Quitar la pantalla de análisis/correcciones que aparece al terminar la serie de 5 reps del paso 6 ("GET MY FEEDBACK"). El usuario graba sus 5 reps y pasa directo al FINAL REP, sin correcciones ni Quick Fix.

## Lo que se mantiene (sin cambios)
- Los avisos por rep (BIEN DICHO / CASI / INTÉNTALO OTRA VEZ) en los pasos 2 y 5.
- El reproductor "Model vs my voice" para comparar la grabación con el modelo.
- La fila tipo Excel del paso 6.
- El análisis y resumen que aparecen después del FINAL REP (paso 7) y la pantalla SESSION COMPLETE.

## Cambios en `src/routes/practice.tsx`
1. **Flujo al terminar la serie**: en `RepSeries`, el botón de la última rep cambia de "GET MY FEEDBACK" a "FINAL REP" y en vez de llamar al análisis simplemente avanza al paso 7 (`goToRep(6)` vía `onRep9Recorded` simplificado o `onNext`). La grabación de la rep 5 se sigue guardando para la comparación final.
2. **Eliminar stages `analysis` y `quickfix`** del tipo `Stage`, su renderizado (`AnalysisStage`, `QuickFixCard`) y el estado asociado (`analysis`, `quickFix`) de la página.
3. **Simplificar `runAnalysis`**: solo se usa para el FINAL REP (`isFinal: true`); se elimina la rama no-final.
4. **`handleBack`**: quitar los casos `analysis`/`quickfix`.
5. **`FinalAnalysisStage`**: ya recibe `before={analysis}` nullable; con `analysis` siempre `null` muestra solo el resultado final sin comparación (verificar que no rompa — `FeedbackService.compare` solo se llama si `before` existe).
6. **Limpieza**: eliminar funciones/imports que queden huérfanos (`AnalysisStage`, `CorrectnessBanner`, `CorrectionList`, `QuickFixCard`, `FeedbackService.buildQuickFix`, `RepFeedback` se mantiene porque lo usan los pasos 2 y 5).

## Verificación
- `bunx tsgo --noEmit` sin errores.
- Playwright móvil: completar las 5 reps del paso 6 y confirmar que se pasa directo al FINAL REP sin pantalla de correcciones.
