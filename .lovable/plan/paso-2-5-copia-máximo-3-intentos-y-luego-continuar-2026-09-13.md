# Paso 2/5 (Copia): máximo 3 intentos y luego continuar

## Objetivo

En el Paso 2 (COPIA) de los módulos de audio, limitar a **3 grabaciones por frase** (la inicial + 2 reintentos). Al agotar los 3 intentos, el botón de reintentar desaparece y solo queda **SIGUIENTE** (y el enlace de omitir), para no frustrar al estudiante. Las historias de Vale se quedan como están (2 intentos).

## Estado actual (verificado en el código)

- `src/routes/practice.tsx` (`Rep2Copy`): ya existe un contador `retries` y `canRetry={retries < 2}` oculta el botón INTENTAR DE NUEVO después de 2 reintentos.
- **El hueco:** la grabadora (`VoiceRecorder`) queda visible y activa todo el tiempo. Si el estudiante vuelve a grabar sin tocar "Intentar de nuevo", se envía otra corrección a la IA sin que el contador suba — por eso hoy es efectivamente ilimitado.

## Cambios

### 1. `src/routes/practice.tsx` — `Rep2Copy`

- Agregar contador de **intentos totales** por frase (`attempts`), que sube con cada grabación enviada a la corrección (no solo al tocar INTENTAR DE NUEVO).
- Máximo: `MAX_ATTEMPTS = 3`.
- Después de la grabación 3 (mientras se revisa y con el resultado en pantalla):
  - La grabadora se deshabilita/oculta y se muestra un mensaje suave bilingüe, p. ej. "Ya hiciste 3 intentos — buen trabajo. Sigue adelante." / "You've tried 3 times — good job. Keep going."
  - La tarjeta de resultado muestra solo **SIGUIENTE** (y omitir), sin INTENTAR DE NUEVO.
- Mostrar un contador pequeño bajo la grabadora: "Intento 2 de 3" / "Attempt 2 of 3" (solo cuando la corrección IA está activa para ese módulo/día).
- El contador se reinicia al cambiar de frase (chunk), igual que hoy.
- SKIP (omitir frase) sigue siempre disponible, sin cambios.
- Cuando la corrección IA no está activa para un módulo, el comportamiento no cambia (no hay validación que limitar).

### 2. `src/lib/i18n.tsx`

- Nuevas llaves bilingües: contador de intentos y mensaje de "3 intentos hechos, sigue adelante".

### 3. Pruebas

- Prueba unitaria de la lógica del contador (máx. 3, reinicio por frase).
- `bunx tsgo` + pruebas de storybook/practice existentes.
- Verificación móvil con Playwright: grabar 3 veces con audio de prueba, confirmar que el reintento desaparece y queda solo SIGUIENTE.

## Fuera de alcance

- Las historias de Vale se mantienen en 2 intentos.
- No se toca el Paso 4, Paso 5 ni el AI Coach final.
