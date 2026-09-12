# Paso 4 como warm-up: respuestas cortas, máximo 15 s y cuenta regresiva

Asunción: "día 4" = **Paso 4** (las preguntas de Make It Yours), el warm-up del Paso 5. Si te referías a otra cosa, dime antes de aprobar.

## Cambios

1. **Límite de 15 segundos** (`src/routes/practice.tsx`, `Rep4MakeItYours`)
   - `VoiceRecorder maxSeconds` pasa de `30` a `15` en las preguntas del Paso 4. La grabación se detiene sola al llegar a 15 s (el mecanismo automático ya existe).

2. **Cuenta regresiva** (`src/components/fluency/VoiceRecorder.tsx`)
   - Nueva prop opcional `countdown?: boolean`. Cuando está activa y hay `maxSeconds`, el timer muestra el tiempo **restante** (`00:15` → `00:00`) en lugar del conteo ascendente.
   - Color: normal mientras graba; rojo (`text-destructive`) cuando quedan 5 s o menos (reutiliza la lógica `nearLimit` existente).
   - La prop es opcional y por defecto apagada: los demás pasos (Paso 2, Paso 5, Review, entrevistas) siguen con su conteo normal.

3. **Aviso "1–2 oraciones"** (`Rep4MakeItYours` + `src/lib/i18n.tsx`)
   - Texto bilingüe nuevo junto al grabador, visible antes de grabar:
     - ES: "Responde en 1–2 oraciones (máx. 15 s) — es un calentamiento para el Paso 5."
     - EN: "Answer in 1–2 sentences (max 15s) — this is your warm-up for Step 5."

## Alcance
- Solo Paso 4 de la práctica diaria (todos los módulos y niveles, incluido Review si reutiliza el mismo componente — se verifica al implementar; si Review usa su propio Paso 4, se aplica igual para mantener consistencia).
- Tigers Pressure Rounds mantienen sus reglas actuales (todas las vueltas requeridas); solo cambia el límite por respuesta si usan este mismo grabador.
- Sin cambios en IA, comparaciones, límites diarios, progresión ni Paso 5.

## Verificación
- `bunx tsc --noEmit` y suite Vitest completa.
- Navegador (móvil 393px): abrir Paso 4, grabar, confirmar cuenta regresiva 00:15 descendente, rojo a los 5 s, parada automática a los 15 s, y que el Paso 5 sigue con su timer normal.
