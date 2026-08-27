# Simplificar la práctica: sin IA, sin paso 1 ni paso 7, y paso final con 5 reps

La sesión pasa de 9 a 7 pasos, la corrección se hace solo con la comparación local palabra por palabra, y el paso de hablar de tu vida se convierte en una serie de 5 repeticiones.

## Nuevo flujo (7 pasos)

1. Escucha y nota el ritmo (antes paso 2)
2. Escucha. Luego repite (antes paso 3)
3. Shadowing lento
4. Shadowing a velocidad natural
5. Hazlo sin el hablante (con veredicto BIEN DICHO / CASI)
6. Habla de TU vida — **5 reps internas**: contador "REP 1 DE 5" … "REP 5 DE 5", una grabación por rep, veredicto local después de cada una y botón para repetir; al terminar la quinta se avanza
7. Rep final: misma tarea, enfocada en tu punto a mejorar

Se eliminan: el paso "Just listen" (solo escuchar) y el paso "Now make it yours" (preguntas personales).

## Corrección sin IA

- Se quita toda llamada a la IA: nada de "Tu coach de IA está escuchando…", ni banners "corregido por IA", ni lista de correcciones generadas por IA.
- Se mantiene la corrección local: comparación palabra por palabra con la frase modelo (verde/rojo, % de coincidencia, repetir) y el análisis local heurístico que produce puntaje, fortalezas, una cosa a mejorar y Quick Fix.
- Las pantallas de análisis, Quick Fix, comparación antes/después y resumen siguen funcionando igual, alimentadas por el análisis local.

## Detalles técnicos

- `src/routes/practice.tsx`: borrar `Rep1` y `Rep8` (preguntas personales) y reindexar el switch de `RepBody` a 0–6; `REP_TITLES` pasa a 7 entradas ("REP 1 DE 7" … "REP 6 DE 7", "FINAL REP"); `RepProgress total={7}`; los índices fijos de la rep final (`{ kind: "rep", index: 8 }` y `goToRep(8)`) pasan a 6; el resumen muestra "7 / 7 REPS ✓".
- Nuevo componente interno `RepSeries` para el paso 6: estado `repNumber` 1–5, `VoiceRecorder` por rep, `RepFeedback` local, botón "SIGUIENTE REP" hasta la 5 y luego avanzar. La grabación de la última rep es la que se usa para el análisis local que alimenta Quick Fix.
- `src/services/speech-analysis-service.ts`: `analyze()` deja de llamar al server function y usa solo `analyzeLocal()`; se eliminan `aiPowered`/`aiError` del flujo y el archivo `src/lib/speech-analysis.functions.ts`.
- Quitar los banners y listas de corrección de IA de `practice.tsx` (`CorrectnessBanner`, `CorrectionList` si quedan sin uso) y el estado de carga de la IA.
- Todas las instrucciones nuevas mantienen su traducción al español con el botón ES y el toggle "Mostrar todo en español".

## Verificación

- `bunx tsgo --noEmit` sin errores.
- Recorrer el flujo en el preview: los 7 pasos, las 5 reps internas del paso 6 y el resumen final con "7 / 7".
