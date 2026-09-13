# Aceptar la respuesta cuando la tarjeta hace una pregunta

## Problema

En la tarjeta de "Ahora dilo tú" del episodio 3, lo esperado es la pregunta literal
("What is your name?"). Si el estudiante contesta de forma natural ("My name is Rodrigo"),
la app lo marca como incorrecto, aunque eso es exactamente lo que haría en la vida real.

Hoy hay 4 tarjetas con pregunta como respuesta esperada:

- Episodio 3 (Vale · ¿Quién es él?): "What is your name?" y "Where are you from?"
- Episodio de la primera llamada: "Where are you from?"
- Temporada 2 (fin de semana): "Can I join the team?"

## Regla nueva (permanente)

- Si la tarjeta le hace una pregunta al estudiante, se acepta la **respuesta natural**
  (y también la pregunta, por si decide repetirla).
- Si la tarjeta pide repetir una oración afirmativa o negativa de la historia, se sigue
  exigiendo esa oración tal cual.
- Las frases motivacionales siguen sin validación de IA.

## Qué se acepta en cada tarjeta

| Tarjeta | Se acepta |
| --- | --- |
| What is your name? | "My name is ..." o solo el nombre; también la pregunta |
| Where are you from? | "I am from ..." o solo el lugar; también la pregunta |
| Can I join the team? | "Yes, ..." / "I can join the team"; también la pregunta |

El texto de ayuda bajo "Escuchamos: …" mostrará la forma de respuesta sugerida
("Dilo así: My name is ...") en vez de la pregunta.

## Detalles técnicos

- `StorybookSayItCheck` gana `altTargets?: string[]`; `compareStorySay` devuelve "good"
  si el objetivo principal **o** cualquier alternativa coincide (respetando
  `allowShortAnswer` por objetivo).
- `src/routes/api/story-say-check.ts` pasa las alternativas al comparador; los objetivos
  siguen cargándose en el servidor (no se confía en el cliente). Sigue siendo una sola
  llamada de transcripción, sin costo extra.
- En las 4 tarjetas, el objetivo principal pasa a ser la forma de respuesta
  (`My name is *`, `I am from *`, `I can join the team`) con `allowShortAnswer`, y la
  pregunta original queda en `altTargets`.
- Se ajusta el texto en español de esas tarjetas para pedir la respuesta.
- `buildSayItHint` sigue igual: muestra el objetivo principal, ahora la respuesta.
- Tests nuevos en `src/lib/story-say-match.test.ts` para alternativas + respuesta corta,
  y verificación en móvil del episodio 3.
