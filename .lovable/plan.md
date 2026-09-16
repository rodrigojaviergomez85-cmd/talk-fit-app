# Dos ajustes al elegir nivel: caer en Inicio y abrir los 3 avanzados

## 1. Los tres niveles avanzados deben abrirse juntos (confirmado)

Hoy los avanzados funcionan como escalera: si un estudiante elige "Advanced 1" (al inicio o al cambiar de nivel), los otros dos siguen bloqueados y solo se abren cuando termina los tres intermedios (Eagles, Tigers, Sharks). Eso ya se resolvió antes para los intermedios, que sí funcionan como bloque paralelo, pero la misma regla nunca se aplicó a los avanzados.

Cambio: si el nivel guardado del estudiante es cualquiera de los tres avanzados, los tres quedan desbloqueados, igual que el bloque intermedio. Esto arregla de una vez la pantalla de elegir nivel, la de cambiar nivel en Mi Cuenta y las tarjetas de Inicio, porque todas leen la misma regla.

No cambia nada para quien no está en avanzado: el bloque avanzado sigue cerrado hasta completar los tres intermedios.

## 2. Caer en Inicio al elegir nivel

- En el registro inicial el código ya manda a Inicio después de guardar el nivel; antes de tocarlo voy a reproducir el flujo completo en el navegador (elegir nivel, semana, crear cuenta) para ver a qué pantalla llega de verdad y corregir el punto exacto si se desvía.
- Al cambiar de nivel desde Mi Cuenta la app lleva hoy a la pantalla del módulo (la lista de días). Lo cambio para que también termine en Inicio, ya en el nivel elegido.

## Pruebas

- Elegir Advanced 1 como nivel inicial y al cambiar nivel: los tres avanzados aparecen desbloqueados y seleccionables.
- Un estudiante de Basic sigue viendo los avanzados bloqueados.
- Tras elegir nivel por primera vez y tras cambiar nivel, la app queda en Inicio.
- Suite de pruebas completa y verificación de tipos.

## Detalle técnico

- `src/services/journey-service.ts` → `isModuleUnlocked`: nueva constante `ADVANCED_MODULES` y regla espejo de la intermedia (`savedId` avanzado ⇒ los tres avanzados abiertos), colocada antes del gate de familia `advanced`. `PlacementPicker.lockedReason` y `moduleStatus` heredan el arreglo sin tocarse.
- `src/routes/level.tsx`: tras `CloudSync.changeLevel`, navegar a `/` en vez de `/module/$moduleId`.
- `src/routes/onboarding.tsx`: solo si la reproducción muestra un desvío real; hoy `finish()` ya hace `navigate({ to: "/" })`.
- Nuevas pruebas en `src/services/journey-service.test.ts` para el bloque avanzado paralelo.
- Sin cambios en límites diarios, progreso, grabaciones ni en el orden del currículo.
