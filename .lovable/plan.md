# Arreglar los diálogos de Sharks (empezando por el episodio 3)

## Qué está pasando

Tienes razón: el episodio 3 no fluye. La causa está identificada.

Los episodios 3 al 20 de Sharks solo tienen **una frase propia por escena**. El resto del diálogo se agrega automáticamente desde una lista de 11 frases genéricas de "reunión de negocios" que es **la misma para los 18 episodios**. Por eso aparecen cosas como "Before we decide, explain the practical risk clearly..." justo antes de una frase sobre una cláusula de pago: no hay relación entre una y otra.

Resultado: conversaciones largas, abstractas, sin lógica y aburridas. Los episodios 1 y 2 sí están bien escritos a mano, y por eso se sienten distintos.

## Qué haremos

Reescribir el episodio 3 completo como una conversación real, escena por escena, y eliminar el relleno genérico en ese episodio.

Para cada una de las 11 escenas:
- 3 líneas de diálogo que se respondan entre sí (pregunta → respuesta → reacción), con la frase original del guion conservada como eje de la escena
- Personajes correctos según la escena (Vale, Dani, Camila, Mr. Reed) y sin cambiar sus voces
- 3 palabras tocables reales tomadas de esa escena, con su traducción
- Lenguaje de negociación nivel B2: cláusula de pago, contrapropuesta, plazos, condiciones — concreto, no abstracto

También:
- Conservar el título, la trama, las preguntas de comprensión, las grabaciones y las imágenes tal como están
- Quitar el episodio 3 de la capa de relleno automático para que no vuelva a mezclarse
- Revisar que la escena final cierre con el gancho hacia el episodio 4

## Después del episodio 3

Si el resultado te gusta, seguimos con el mismo tratamiento en lotes: 4–8, 9–14 y 15–20, hasta eliminar por completo el relleno genérico de Sharks.

## Detalles técnicos

- Reescritura del arreglo `scenes` en `src/services/storybook/sharks-ep3-first-dollar-contract.ts` con `lines`, `cast`, `words` e `imageAlt` reales por escena.
- Se retira `sharks-ep3-first-dollar-contract` de `SHARKS_RICH_EPISODES` en `src/services/storybook/sharks-dialogue-expansions.ts` (el episodio deja de recibir `CONVERSATION_FRAMES`).
- Se mantienen los umbrales de los tests existentes: 33 líneas, 500–600 palabras habladas y 33 términos tocables por episodio.
- Se verifica cobertura de glosario para los términos nuevos y se corren las pruebas de consistencia de Sharks, currículo, vocabulario y glosario, más TypeScript.
- Sin cambios en imágenes, voces, quizzes ni rutas.
