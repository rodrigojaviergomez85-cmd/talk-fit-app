# Plan: Review muestra solo temas gramaticales

## Objetivo
En la pantalla **Review/Repaso** (`/review`) quitar la tarjeta "Interview Simulator", de modo que solo aparezcan los temas gramaticales. El simulador sigue disponible desde su propia tarjeta en **Repaso** (`/practicar`), sin aparecer duplicado.

## Cambios

1. **`src/routes/review.index.tsx`**
   - Eliminar la tarjeta/enlace a `/review/interview-simulators` (tercera tarjeta).
   - Quitar el import `BriefcaseBusiness` que queda sin uso.
   - Resultado: `/review` muestra únicamente dos tarjetas:
     - **Basic** — estructuras esenciales
     - **Intermediate + Advanced** — estructuras más avanzadas

2. **Sin cambios en `/practicar`**
   - La tarjeta "Simulador de entrevista" del hub Repaso se mantiene tal cual (es el acceso único al simulador).

3. **Sin cambios en rutas del simulador**
   - `/review/interview-simulators` y sus subrutas siguen existiendo y funcionando; solo se elimina el enlace duplicado dentro de Review.

## Verificación
- `bunx tsgo --noEmit` sin errores.
- Captura móvil de `/review` mostrando solo las dos tarjetas gramaticales.
- Confirmar que `/practicar` sigue mostrando Review/Repaso + Simulador de entrevista.
