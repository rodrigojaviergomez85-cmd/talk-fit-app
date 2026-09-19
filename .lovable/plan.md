# AI Coach: minutos ilimitados (tu cuenta) + botón con efecto al presionar

## 1. Minutos ilimitados para cuentas internas

Hoy el límite vive en el servidor (`src/routes/api/live-coach.ts`): 5 min por sesión y 15 min por día para todos.

- Las cuentas de la lista interna de acceso ilimitado (donde ya está `english4callcenters@gmail.com`) pasan a tener **minutos ilimitados**: sin tope diario y una sesión larga (60 min por sesión como seguro anti-sesión-olvidada; al terminar puedes volver a empezar de inmediato).
- Los demás estudiantes conservan exactamente los límites actuales (5 min/sesión, 15 min/día).
- Uso real se sigue **registrando** en `live_coach_sessions` aunque sea ilimitado, para que puedas medir el costo real de Google después.
- La pantalla del coach muestra para tu cuenta "Minutos ilimitados" en vez del contador regresivo, y el botón "Empezar a hablar" nunca se bloquea por minutos.

## 2. Botón "mantén para hablar" con efecto de presión

En `src/components/fluency/LiveCoach.tsx`:

- Al presionar: el botón **crece más** (de scale-110 a scale-125), con **brillo** animado alrededor (anillo luminoso + resplandor tipo glow) para que se note claramente que está grabando.
- Al soltar: vuelve a su tamaño normal con una transición suave.
- Funciona igual con dedo, mouse y tecla Espacio; no cambia la lógica de audio ni de turnos.

## Detalles técnicos

- `src/routes/api/live-coach.ts`: si el correo está en la lista ilimitada, `dailyLimitSeconds`/`sessionLimitSeconds` se devuelven ampliados y se omite el bloqueo 429; el insert de segundos usados se mantiene.
- `src/lib/unlimited-access.ts`: se reutiliza la lista existente (sin duplicar correos en otro archivo); el servidor la importa.
- `src/components/fluency/LiveCoach.tsx`: textos bilingües para "Minutos ilimitados", contador solo para cuentas con límite; clases del botón con glow (`ring` + `shadow` animado) mientras `talking` está activo.
- Tests: ajuste de los tests del coach si validan los límites actuales.

## Verificación

- `npx tsc --noEmit` y suite Vitest.
- Prueba móvil: tu cuenta ve "Minutos ilimitados", puede iniciar sesión sin bloqueo, y el botón crece/brilla al mantenerlo y se encoge al soltarlo.
