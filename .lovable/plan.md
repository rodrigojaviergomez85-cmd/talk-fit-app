# Empezar en Inicio después de elegir el nivel

## Qué pasa hoy

Cuando un estudiante elige su nivel y crea su cuenta por primera vez, la app lo lleva directo a la pantalla de práctica (Día 1, Paso 1 de los 5 audios). No ve su pantalla de Inicio.

## Qué quedará

Al terminar de elegir nivel y semana e iniciar sesión, el estudiante llega a **Inicio**, ya ubicado en el nivel y la semana que eligió. Desde ahí decide cuándo empezar sus audios con el botón de continuar.

- El nivel y la semana elegidos se siguen guardando igual que hoy.
- Inicio muestra el módulo elegido y el día correspondiente a la semana (1, 6, 11 o 16).
- Si guardar falla, se mantiene el aviso actual y el botón de reintentar.
- Estudiantes que ya estaban inscritos siguen entrando a Inicio como siempre.

## Detalle técnico

- `src/routes/onboarding.tsx`: `finish()` deja de navegar a `/practice` con `search: { day, module }` y navega siempre a `/`. Se conserva `setPrefs({ onboardingCompleted: true })` y el guardado de la colocación (`CloudSync.applyPendingPlacement`) antes de navegar; se elimina el uso ya innecesario de `weekStartDay` / primer módulo para la navegación, pero la semana elegida se sigue persistiendo en preferencias para que Inicio apunte al día correcto.
- `src/routes/index.tsx`: verificar que el encabezado y el botón de continuar tomen el módulo/día recién guardados (`prefs.currentModuleId` + estado de `JourneyService`) y que el redirect automático a onboarding no se dispare tras la colocación.
- Prueba: cubrir que, tras completar la colocación, la navegación destino es `/` y que Inicio refleja el módulo y día de la semana elegida.
