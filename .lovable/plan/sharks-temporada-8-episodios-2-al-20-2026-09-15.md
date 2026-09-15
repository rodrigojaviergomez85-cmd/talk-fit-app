# Sharks (Temporada 8) — Episodios 2 al 20

Cerrar la temporada completa con el mismo formato del Episodio 1: diálogo natural tipo serie americana, poca narración, turnos hablados del estudiante y monólogo final de 45 segundos. Encima de eso, una capa nueva de **idioms y phrasal verbs** para empujar de B1+ a B2 real.

## La historia

Vale sale de El Salvador. Sharks es la temporada de aguas internacionales: primer contrato en dólares, oficinas en Guatemala y México, un inversionista, un cliente perdido y recuperado, el nacimiento de Vale Kids y un acuerdo regional al final. Dani crece en su mundo corporativo. Bryan, Camila, Morgan, Don Tito, Sofía y Mr. Reed siguen en escena, y aparece un negociador duro nuevo.

Cada día ya tiene su gancho definido en la temporada (Guatemala siete de la mañana, La contraoferta, Perder un cliente, El inversionista, Los tiburones cierran tratos…). Se respetan esos títulos.

## Cómo llega el estudiante a B2

Cada episodio sigue el tema oficial del día de Sharks, sin inventar currículo:

| Días | Tema oficial | Foco hablado |
|---|---|---|
| 2–5 | might/could/would, should, needs to/has to, segundo condicional | predecir, aconsejar, priorizar, decidir bajo presión |
| 6–10 | vida en la ciudad, pedir más detalle, ponerse al día, decirlo de otra forma, confirmar datos | aclarar, parafrasear, recuperar la conversación |
| 11–15 | antes vs ahora, decidir rápido, tomar postura, prioridades que cambian, mini debate | argumentar y cambiar de opinión |
| 16–20 | futuro incierto, algo que siempre quise hacer, mi camino con el inglés, mantener la conversación, final Sharks | liderar, improvisar, cerrar |

Capa B2 añadida en todos:
- Menos repetición, más producción abierta: 4 turnos del estudiante por episodio, al menos 2 de respuesta libre.
- Español bajo demanda, no a la vista por defecto.
- Monólogo final de 45 segundos en los días 5, 10, 15 y 20 (checkpoint hablado); 30 segundos el resto.
- Frases largas y encadenadas en el diálogo, con audio opcional a 1.25×.

## Idioms y phrasal verbs (lo nuevo)

Cada episodio lleva **2 phrasal verbs + 1 idiom de negocios**, dichos primero por un personaje dentro del diálogo, no como lista. Se marcan como palabras tocables con significado en español y se reciclan: lo que aparece en el día 3 vuelve en el 9 y en el 17.

Bolsa de la temporada (≈40 phrasal verbs y 20 idioms), por ejemplo: *follow up, back out, roll out, scale up, push back, run into, work out, turn down, bring up, lay off, take over, call off, cut corners, touch base, get the ball rolling, think outside the box, a deal breaker, the bottom line, ahead of schedule, on the same page.*

Al final de cada episodio, una pantalla corta de "Say it like a native": las tres expresiones del día, con audio y una pregunta de uso. Las preguntas calificadas del episodio incluyen al menos una que exige usar una de esas expresiones al hablar.

## Cómo se construye

1. Guion completo de los 19 episodios (11 escenas cada uno), con diálogo, glosario, preguntas mezcladas, afirmaciones de perseverancia, final y cliffhanger.
2. Ilustraciones reales: 12 imágenes por episodio (portada + 11 escenas), estilo cómic sombreado de Sharks, 768×768 y bajo 250 KB. Nada de imágenes de relleno.
3. Personajes desde la biblia canónica: Vale, Dani, Camila, Bryan, Morgan, Don Tito, Sofía, Mr. Reed. Voces fijas por personaje.
4. Registro de cada episodio en su día 2–20 de la temporada.
5. Revisión de consistencia al cerrar: contactos visuales por episodio (rostro, piel, cabello, ropa, dos brazos, sin texto en la imagen), quién habla vs quién aparece, voces, y currículo día por día.

## Detalles técnicos

- Archivos nuevos `src/services/storybook/sharks-epN-*.ts` siguiendo la forma de `sharks-ep1-tell-the-story.ts`, con `cast` declarado por escena (campo nuevo del sistema de prevención).
- Registro en `src/services/storybook/index.ts` y llenado de `slots` día 2–20 en `seasons.ts`.
- Nuevo campo opcional de expresiones (`expressions`) en el tipo de episodio, más la pantalla "Say it like a native" en `StorybookPlayer`, con reciclaje verificado por prueba.
- Pruebas: `sharks-consistency.test.ts` ampliada (reparto canónico, arte real, tamaños), `sharks-curriculum-alignment.test.ts` nueva (día ↔ tema oficial ↔ expresiones), y la suite global de reparto.
- Assets en `src/assets/storybook/sharks-epN-*/`.

## Entrega

Por lotes de 5 episodios (2–5, 6–10, 11–15, 16–20), cada lote con guion + arte + registro + pruebas antes de pasar al siguiente, y una revisión de consistencia completa al cerrar la temporada.
