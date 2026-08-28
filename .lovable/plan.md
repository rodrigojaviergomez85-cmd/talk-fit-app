# Intro como Paso 0 en /practice

La pantalla de intro (Simple Present) pasa a ser el primer paso dentro del flujo de práctica, antes del Paso 1 actual.

## Comportamiento

- Al abrir `/practice`, siempre se muestra primero la intro como **PASO 0**.
- El botón grande "LET'S PRACTICE / VAMOS A PRACTICAR" avanza al Paso 1 (Rep 1) actual.
- La flecha de adelante también avanza de Paso 0 → Paso 1; en Paso 1 la flecha de atrás regresa a Paso 0.
- Los pasos actuales conservan su numeración: REP 1 OF 6 … REP 6 OF 6.
- La barra de progreso pasa a tener 7 segmentos (Paso 0 + 6 reps) y el título del header muestra "PASO 0 — SIMPLE PRESENT" (en inglés: "STEP 0 — SIMPLE PRESENT").
- El toggle de español funciona igual en el Paso 0.
- La ruta `/module/simple-present` se conserva funcionando para acceso directo.

## Detalles técnicos

- Extraer el contenido de `src/routes/module.simple-present.tsx` a un componente reutilizable `src/components/fluency/IntroStep.tsx` con prop `onStart`.
- La ruta `/module/simple-present` renderiza ese componente con su propio header/CTA hacia `/practice`.
- En `src/routes/practice.tsx`: agregar el stage `{ kind: "intro" }` como estado inicial; `RepProgress` recibe `current=0` y `total=7`, y los reps se desplazan a `current = index + 1`.
- Navegación: back en Rep 1 vuelve a intro; forward en intro va a Rep 1; sin cambios en Paso 6, límites de grabación, racha ni pantalla de día completado.
