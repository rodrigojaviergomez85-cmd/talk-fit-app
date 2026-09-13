# Botón "Saltar por ahora" en preguntas rápidas de los cuentos

## Qué vamos a construir

En las preguntas rápidas de los cuentos de Vale, hoy SIGUIENTE queda bloqueado hasta que el estudiante graba una respuesta aceptada. Agregamos una salida sutil para quien no quiera grabar otra vez:

- **Dónde:** debajo del texto "Graba tu respuesta para continuar.", como texto-botón gris, discreto, sin relleno (mismo estilo del mensaje: `text-[12px] text-muted-foreground`, subrayado ligero).
- **Texto:** "Saltar por ahora" / "Skip for now".
- **Cuándo aparece:** solo cuando el estudiante ya respondió correctamente la pregunta y **ya hizo al menos un intento de grabación** (así siempre practican speaking al menos una vez; no se puede saltar de entrada).
- **Qué hace:** desbloquea SIGUIENTE y avanza a la siguiente parte del cuento. No da estrella ni sonido de felicitación; simplemente deja continuar.
- **Qué NO cambia:** la respuesta correcta a la pregunta sigue siendo obligatoria (eso es comprensión, no speaking). Las tarjetas de afirmaciones motivacionales ya tienen SIGUIENTE libre. El límite de 2 intentos con "Great job, champion!" se mantiene.

## Detalles técnicos

- `src/components/storybook/StorybookPlayer.tsx`: en el bloque de la línea 324, cuando `quizDone[quiz.id]` es true, `saidIt` es false y hubo ≥1 intento fallido, mostrar el botón "Saltar por ahora" que hace `setSaidIt(...)` true y `go(idx + 1)`. Reusar el contador de intentos ya existente en la tarjeta de quiz (prop o estado levantado al padre).
- `src/lib/storybook-advance.ts`: sin cambios; el skip simplemente marca `saidIt` como completo.
- Bilingüe ES/EN con el toggle existente.

## Verificación

- `bunx tsgo` + tests de storybook.
- Playwright móvil: contestar, fallar una grabación (audio falso), confirmar que aparece "Saltar por ahora", tocarlo y verificar que avanza; confirmar que NO aparece antes de ningún intento de grabación.
