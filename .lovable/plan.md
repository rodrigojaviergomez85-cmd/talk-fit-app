# Por qué la liga muestra 0 participantes

## Lo que encontré (verificado en la base de datos)

- Existe **una sola competencia** abierta: Basic Zero · Semana 1 (14–20 sep).
- En ella hay **1 sola inscripción** y **0 puntos**; no hay premios otorgados todavía.

Dos causas concretas:

1. **La inscripción ocurre solo cuando alguien abre una pantalla de día con liga.** Nadie queda inscrito por estar en Basic Zero Semana 1: hay que entrar a esa pantalla para que el servidor cree su lugar en la competencia. Como la liga se activó hace poco, casi nadie ha pasado por ahí.
2. **Tu cuenta está excluida** (cuenta sin límites / administrador). Para esas cuentas el servidor responde "sin inscripción", y en ese caso la tarjeta muestra 0 puntos y 0 participantes aunque otros sí estén inscritos.

Es decir: no es un error de conteo, es que casi nadie está inscrito todavía y tu cuenta no cuenta.

## Qué propongo hacer

1. **Inscribir de una vez a los estudiantes que ya califican**: todos los que están en Basic Zero Semana 1 quedan dentro de la competencia de esta semana con 0 puntos, sin esperar a que abran la pantalla. Así la clasificación deja de verse vacía.
2. **Mostrar el número real de participantes también a las cuentas excluidas** (como la tuya), para que al revisar la liga veas cuánta gente hay aunque tú no compitas. Se marcará claramente que estás viendo en modo observador y no acumulas puntos.
3. Sin cambios en puntajes, topes, retención ni en el resto de la app.

## Detalles técnicos

- Nueva migración: función que asegura membresía masiva para usuarios con progreso en el módulo/semana del piloto, respetando exclusiones (`league_is_excluded`) y la tabla `league_pilot_cohorts`; ejecución puntual para poblar la competencia actual.
- `league_my_summary`: devolver `participants` (y `goalAttainable`) reales aun cuando `enrolled = false`, sin otorgar puntos.
- `LeagueDaySection.tsx` y `liga.tsx`: usar ese conteo y mostrar estado observador en lugar del mensaje de "no disponible" cuando el usuario está excluido.
- Pruebas: cobertura de resumen para usuario excluido (participantes > 0, puntos 0) y de la inscripción masiva idempotente.
