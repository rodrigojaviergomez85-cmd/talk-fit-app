# Plan: Review solo gramática + botón de regresar

## Objetivo
1. En la pantalla **Review/Repaso** (`/review`) quitar la tarjeta "Interview Simulator" para que solo aparezcan temas gramaticales. El simulador sigue accesible desde su propia tarjeta en **Repaso** (`/practicar`), sin duplicarse.
2. Agregar un **botón de regresar** arriba en las pantallas internas, para que el usuario que entró al simulador pueda volver a Review/Repaso, y quien entró a Review pueda volver al hub.

## Cambios

1. **`src/routes/review.index.tsx`**
   - Eliminar la tarjeta/enlace a `/review/interview-simulators` (tercera tarjeta) y el import `BriefcaseBusiness` sin uso.
   - Resultado: `/review` muestra solo **Basic** e **Intermediate + Advanced**.
   - Agregar arriba un enlace/botón "← Volver" (`ArrowLeft` + etiqueta bilingüe "Volver / Back") que regrese a `/practicar`.

2. **`src/routes/review.interview-simulators.tsx`**
   - Agregar arriba un botón "← Volver a Review / Back to Review" que regrese a `/review` (los que entraron al simulador desde el hub pasan por ahí sin perderse; desde `/practicar` también pueden volver atrás).

3. **`src/routes/review.basic.tsx` y `src/routes/review.intermediate-advanced.tsx`**
   - Agregar el mismo botón "← Volver a Review / Back to Review" apuntando a `/review`.

4. **Sin cambios en `/practicar` ni en las rutas del simulador**
   - La tarjeta "Simulador de entrevista" del hub se mantiene; `/review/interview-simulators` y subrutas siguen funcionando.

## Detalles técnicos
- Botón de regreso: `<Link>` con `ArrowLeft` de lucide-react, estilo texto + ícono, bilingüe vía `useAppLang`, colocado antes del encabezado de cada pantalla.
- Navegación con `<Link to="/review">` / `<Link to="/practicar">` (type-safe, con preload).

## Verificación
- `bunx tsgo --noEmit` sin errores.
- Capturas móviles: `/review` con solo dos tarjetas gramaticales y botón volver; simulador y páginas de repaso con botón de regreso funcional.
