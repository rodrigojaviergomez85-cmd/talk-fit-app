# Todos los días desbloqueados

Los 20 días de BASIC ZERO y los 5 días del módulo SIMPLE PRESENT (Fluency Journey) quedan disponibles desde el inicio: el estudiante puede entrar a cualquier día cuando quiera.

## Qué cambia

- En la lista de días de cada módulo (Home) desaparece el candado y la opacidad de "bloqueado": todas las filas son tocables y llevan a su día.
- Se mantienen los estados visuales COMPLETADO (check verde) y ACTUAL (día sugerido, resaltado en naranja), para que el estudiante siga sabiendo dónde va.
- El botón principal sigue apuntando al día actual sugerido; nada más cambia en la práctica, audio, grabación ni progreso.

## Detalle técnico

- `JourneyService.isDayUnlocked` devuelve siempre `true` (se deja la función para no tocar los llamados).
- `JourneyDayRow` en `src/components/fluency/DailyPracticeCard.tsx`: se elimina el ícono de candado y el estilo `opacity-55`; siempre renderiza el `Link` a `/practice?module=…&day=…`.
- `src/routes/practice.tsx` no tiene ningún gate por día, así que no requiere cambios.

## Verificación

Typecheck y revisión en navegador móvil: abrir Basic Zero día 12 y Simple Present día 4 sin haber completado los anteriores.
