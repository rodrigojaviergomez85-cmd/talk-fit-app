# Avanzar de día solo al completar el Paso 2

Hoy, en la pantalla del día, el botón "Siguiente día" ya se bloquea hasta terminar los audios (Paso 2). Pero en la lista oficial del módulo (Semana 2 · Day 6, 7, 8...) cualquier día futuro se puede abrir con un toque, así que la regla se salta desde ahí.

## Qué va a cambiar

- Un día futuro queda bloqueado hasta que el estudiante complete los audios del día actual.
- Días ya completados y días anteriores siguen abiertos (puede repetir o ponerse al día).
- En la lista del módulo, los días bloqueados se ven en gris con candado y no son tocables; muestran el texto "Completa los audios del día actual" / "Finish today's audios first".
- Si alguien entra por URL directa a un día bloqueado, ve la misma pantalla de bloqueo con un botón para volver a su día actual.
- Las cuentas admin / de prueba sin límites siguen navegando libremente, sin bloqueos.
- El desbloqueo respeta la semana de inicio elegida en el onboarding (quien empieza en semana 3 no queda bloqueado por los días 1–10).

## Detalle técnico

- `JourneyService.isDayUnlocked` deja de devolver siempre `true`: un día está abierto si ya está completado, o si es menor o igual al `currentDay` del módulo (primer día sin completar, que ya contempla `startWeek`).
- `hasUnlimitedAccess()` sigue siendo el bypass; se evalúa en las capas de UI, igual que en `day.$moduleId.$day.tsx`.
- `JourneyDayRow` (`src/components/fluency/DailyPracticeCard.tsx`) recibe `unlocked` (prop ya declarada pero sin usar) y renderiza un `div` con candado en vez del `Link` cuando está bloqueado.
- `module.$moduleId.tsx` calcula `unlocked` por día con `isDayUnlocked` u `hasUnlimitedAccess` y lo pasa a `JourneyDayRow`; `TestReadyCard` del mismo día también queda bloqueado.
- `day.$moduleId.$day.tsx` añade la pantalla de bloqueo cuando el día no está desbloqueado (mantiene su lógica actual de "Siguiente día").
- Nuevas claves bilingües en `src/lib/i18n.tsx` para el candado y la pantalla de bloqueo.
- Pruebas: casos en los tests de `journey-service` para día actual, día futuro, día completado y arranque en semana 3; luego `tsgo --noEmit` y verificación en navegador móvil de `/module/basic-zero`.
