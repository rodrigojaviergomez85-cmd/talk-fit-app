# Consultar la liga nunca debe borrar puntos

## Confirmado en el código

En `src/lib/league.functions.ts` (líneas 104–132), al pedir el resumen de la liga hay un bloque de "auto-reparación": si la inscripción actual del estudiante no coincide con el módulo **o con la semana** solicitada, y el módulo pedido es el nivel guardado en su cuenta, el servidor ejecuta `league_switch_level`. Esa función borra recompensas y membresías de las competencias abiertas que no sean la pedida.

Por eso, abrir la liga desde el día 6 (semana curricular 2) del mismo módulo se interpreta como cambio de grupo y borra los puntos de la semana 1. Es una escritura destructiva disparada por una simple lectura.

## Qué va a quedar

1. **Consultar el tablero es solo lectura.** Abrir la liga desde cualquier día o semana nunca borra ni mueve inscripciones ni puntos.
2. **Cambiar de nivel sigue siendo una acción explícita**, con su aviso y confirmación, desde "Cambiar mi nivel". Esa es la única vía que puede descartar los puntos de la semana en curso.
3. **Si pides una semana donde aún no estás inscrito**, verás la liga de esa semana/nivel según corresponda (vacía o con tu inscripción real), sin efectos sobre otras semanas.

## Detalle técnico

- `getMyLeagueSummary`: eliminar por completo el bloque de auto-reparación (la lectura de `user_preferences` y la llamada a `league_switch_level` con su segunda consulta). El handler queda: validar cohorte → `league_my_summary` → `shapeSummary`.
- No se cambia la función de base de datos `league_switch_level`; sigue existiendo para `switchLeagueLevel`, que se invoca solo desde el flujo de cambio de nivel en `src/routes/level.tsx`.
- No se tocan `claimDayRewards`, `getCohortLeagueSummary`, el tablero, el historial ni los puntos por actividad.
- Prueba de regresión en `src/lib/league.test.ts` o equivalente: verificar que el camino de resumen no invoca `league_switch_level`.

## Verificación

- Con puntos en la semana 1, abrir `/liga` desde el día 6 del mismo módulo: los puntos y la inscripción de la semana 1 siguen intactos en la base de datos.
- El selector de semanas y el historial siguen mostrando las semanas anteriores.
- Cambiar de nivel desde Mi Cuenta sigue funcionando y sigue descartando la semana en curso como se acordó.
- Tipos y pruebas de liga.
