# Que "Volver a mi día" regrese al día correcto

## Problema

En la pantalla de la liga, el botón "Volver a mi día" siempre lleva a Inicio, no al día desde donde el estudiante entró.

## Solución

- Al entrar a la liga desde la tarjeta de liga de un día o desde el enlace "Ver mi semana de liga", se recuerda el módulo y el día de origen.
- El botón "Volver a mi día" regresa exactamente a ese día.
- Si alguien abre la liga directamente (por ejemplo desde un enlace guardado), el botón lleva a su día actual según su progreso; si no hay progreso todavía, lleva a Inicio como hoy.
- El texto del botón y su ubicación no cambian.

## Detalle técnico

- `src/routes/liga.tsx`: agregar `validateSearch` opcional (`from` = moduleId, `day` = número) y usar `Route.useSearch()` para construir el destino del enlace de regreso: `/day/$moduleId/$day` si viene el origen; si no, `JourneyService.currentModule/currentDay` cargado en cliente; si tampoco, `/`.
- `src/routes/day.$moduleId.$day.tsx` (enlace "Ver mi semana de liga") y `src/components/fluency/LeagueDaySection.tsx` (tarjeta de liga): pasar `search={{ from: moduleId, day }}` al `<Link to="/liga">`. `LeagueDaySection` recibirá esos datos por props desde donde se usa.
- Sin cambios de backend, puntos ni reglas de liga.
