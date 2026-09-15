# Sharks: reescribir episodios 4–8 como el episodio 3

## Qué pasó la primera vez (explicación honesta)

Cuando reconstruimos Sharks 3–20, los episodios originales eran muy cortos (11 líneas, ~130 palabras). Para llegar rápido al tamaño correcto usé una capa automática de "relleno": un conjunto de frases de negocios genéricas que se insertaban antes y después de cada línea original, iguales para todos los episodios.

Eso cumplía los conteos (33 líneas, ~550 palabras, palabras tocables) pero no leía la historia: las frases no respondían a lo que el personaje acababa de decir, ni conocían la escena, ni quién estaba en el cuarto. Por eso el episodio 3 se sentía desconectado, aburrido y complicado. No fue mala suerte: fue una decisión de automatizar contenido narrativo, que es justo lo que no se debe automatizar.

El episodio 3 ya se corrigió escribiéndolo a mano, escena por escena, y salió del relleno automático. Ahora hago lo mismo con 4–8.

## Qué haré en los episodios 4–8

Para cada episodio (4 Three Offices One Team, 5 Counter Offer, 6 Hiring Across Borders, 7 Quality at Scale, 8 Vale Kids):

- Sacarlo de la capa de relleno automático y reescribir el guion completo a mano.
- Mantener la trama, el título, la continuidad con Tigers y Sharks 1–3, y el cierre/cliffhanger.
- 11 escenas, 33 líneas de diálogo conectadas: pregunta, respuesta, reacción. Cada línea responde a la anterior.
- Reparto correcto por escena (Vale, Dani, Camila, Lucía, Renata, Reed según corresponda); nada de personajes hablando donde no están, y Reed siempre a distancia cuando el guion lo pone en otro país.
- Nivel B2 real: negociación, contratación, calidad, escalar; 2 phrasal verbs + 1 idiom/colocación por episodio, reciclando vocabulario de episodios previos.
- 3 palabras tocables con traducción por escena, tomadas del diálogo real.
- Preguntas de comprensión y turnos de habla coherentes con el nuevo diálogo.
- `imageAlt` descriptivo por escena.
- No se tocan imágenes, voces, grabaciones, rutas ni bloqueos.

## Detalles técnicos

- Nuevo contenido escrito directamente en `sharks-ep4…` a `sharks-ep8…`, siguiendo la estructura de `sharks-ep3-first-dollar-contract.ts`.
- Cada ID se retira de `SHARKS_RICH_EPISODES` en `sharks-dialogue-expansions.ts` para que no reciba relleno genérico.
- Verificación: tests de consistencia, cast, currículo, glosario y cobertura de vocabulario; se agregan al glosario los términos nuevos que el test señale; TypeScript limpio.
- Revisión de lectura escena por escena antes de cerrar cada episodio.

## Después

Quedan pendientes 9–20 con el mismo tratamiento; los abordamos en tandas siguientes.
