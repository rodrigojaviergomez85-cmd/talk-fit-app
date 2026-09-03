# Rep 5 (Advanced): las tomas de "REPETIR" no muestran qué contestar

## Qué pasa hoy

En los días de role play con pocos turnos (en Advanced 1: 16 de los 20 días tienen 3 turnos), el tablero tiene 5 tomas. Las tomas 1–3 traen la tarjeta del reclutador (audio + pregunta + cues). Las tomas 4–5 son "REPETIR" y **no tienen ningún turno asociado**, así que aparecen solo con "Listo para grabar" y el botón GRABAR: el alumno no sabe qué pregunta está respondiendo. Además, si elige esa toma como Final Rep, la grabación queda sin pregunta visible.

El texto de arriba ("TURNO 1–3 · REPITE CUALQUIER TURNO: TOMA 4–5") lo insinúa, pero es fácil de pasar por alto y no dice *cuál* turno.

Nota: en la captura se ven solo 2 turnos en el Día 11; el contenido actual ya trae 3 (el tercero es el turno de reparación agregado en la última actualización), así que lo que viste fue antes de ese cambio. El problema de las tomas extra sin pregunta sigue igual.

## Propuesta

En una toma de REPETIR (rol play, no Pressure Round):

1. Arriba de la grabadora aparece un selector pequeño: **"¿QUÉ TURNO REPITES?"** con chips `TURNO 1` `TURNO 2` `TURNO 3`.
2. Por defecto viene seleccionado el último turno grabado (si no hay ninguno, Turno 1), así nunca queda vacío.
3. Al elegir, se muestra la **misma tarjeta del reclutador** de ese turno (audio, pregunta en inglés, traducción, cues, tip de variante/reparación) exactamente como en la toma original.
4. El encabezado de la toma pasa a decir **`TOMA 4 · TURNO 2`** y, una vez grabada, conserva esa etiqueta para que se sepa qué pregunta responde (también si se marca como Final Rep).
5. GRABAR nunca se bloquea: si el alumno no toca nada, graba con el turno por defecto ya visible.

Se aplica a todos los módulos con role play de ≤3 turnos (Advanced 1, y también EAGLES/TIGERS/SHARKS donde ocurra), porque el componente es el mismo.

## Detalles técnicos

- `src/components/fluency/TakeBoard.tsx`
  - Nuevo estado efímero `retryTurn: Record<number, number>` (mismo patrón que `prepDone` / `picked`).
  - Para `index >= turns.length` en modo `rolePlay && !pressure`: `const turn = turns[retryTurn[index] ?? defaultRetryTurn]`, donde `defaultRetryTurn` = índice del último take grabado dentro de `turns.length`, o 0.
  - Render del selector de chips (solo `isActive && !take`) encima de la tarjeta navy; la tarjeta navy, cues, tips y `RecognitionStep` reutilizan el mismo bloque existente sin duplicar código.
  - Encabezado: `TOMA N · TURNO M` para tomas de repetición.
  - Persistir el turno elegido en la grabación vía el `label` ya existente en `Recording` (`onRecorded` recibe el label), sin cambios de esquema ni de sync.
- `src/lib/i18n.tsx`: nueva clave `take.whichTurn`: `["¿QUÉ TURNO REPITES?", "WHICH TURN ARE YOU RETRYING?"]`.
- Sin cambios en contenido, ids de turnos, `isPressureRound`, `requiredTakes`, Final Rep, sync ni auth.

## Verificación

- `/practice?day=11&module=advanced-1`, viewport móvil: grabar turnos 1–3, la toma 4 muestra chips y la tarjeta del Turno 3 por defecto; cambiar a Turno 1 cambia la pregunta; grabar y marcar Final Rep conserva "TOMA 4 · TURNO 1".
- Día 5 (Pressure Round) sin cambios. Un día EAGLES con 2 turnos muestra el selector en tomas 3–5.
- Typecheck y tests existentes.
