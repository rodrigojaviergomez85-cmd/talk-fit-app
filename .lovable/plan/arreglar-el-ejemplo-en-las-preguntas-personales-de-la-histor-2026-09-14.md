# Arreglar el "Ejemplo" en las preguntas personales de la historia

## El problema

Cuando el estudiante contesta con su propia voz, la tarjeta muestra un "Ejemplo" que en realidad es la frase de la historia sobre Vale:

- Pregunta: "Where did you go yesterday?" → Ejemplo: "She walked fast to the bus stop."
- Pregunta: "What did you buy this week?" → Ejemplo: "They bought mangoes."

El ejemplo habla de otra persona y en otra forma verbal, así que no ayuda: confunde. Pasa en las 205 preguntas personales de todas las temporadas.

## Qué cambia

1. **Se quita el "Ejemplo" con la frase de la historia** de esa tarjeta. La tarjeta queda limpia: la pregunta personal, su traducción, el botón ESCUCHAR y el micrófono.
2. **Se muestra una pista de inicio coherente**, siempre derivada de lo que el sistema espera escuchar: "Empieza así: I bought…" / "Start like this: I went to…". Nunca puede contradecir la pregunta porque sale de la misma regla que califica la respuesta.
3. Cuando la pregunta no es personal (solo repetir la frase de la historia), todo sigue igual: ahí el ejemplo sí corresponde y se mantiene.
4. Sin cambios en las preguntas, las voces, la calificación, los intentos ni el botón "Saltar por ahora".

## Detalle técnico

- `src/components/storybook/StorybookPlayer.tsx`: en el bloque de `quiz.sayItAskEn`, eliminar el párrafo "Ejemplo: «{quiz.sayIt}»" y dejar únicamente la pista generada por `buildSayItHint(quiz.sayItCheck.target, es)`, subiéndola justo debajo del botón de escuchar para que se vea antes de grabar.
- `src/lib/story-say-match.ts`: revisar `buildSayItHint` para que limpie el comodín `*` y devuelva una pista legible en los formatos existentes ("I bought *", "with *", "I *"); para marcos demasiado genéricos como "I *" mostrar la pista corta "I…" en vez de un texto raro.
- Sin cambios en los archivos de episodios, en los datos ni en el servidor.

## Verificación

- Pruebas de storybook y typecheck.
- Revisar en 393px un episodio de temporada 4 (`/natural-method/cuento/vale-s4-after-work`) y el piloto Eagles: confirmar que cada pregunta personal muestra una pista que concuerda y que ya no aparece la frase sobre Vale.
