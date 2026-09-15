# Preguntas repetidas en Sharks (episodios 3 al 10)

## Qué está pasando

Los episodios 3 al 10 comparten exactamente el mismo bloque de preguntas y de "Say it", palabra por palabra:

- "What is the main problem the team identifies?" -> "What advice would you give the team?"
- "How does the team respond under pressure?" -> "Describe how you would respond in this situation."
- "What changes at the end of the episode?" -> "Summarize the problem, the response, and the result."

Incluso las opciones de respuesta ("They decide to stop working.", "They forget the meeting.") son las mismas en los ocho episodios. Vienen de la misma capa genérica automática que ya causó los diálogos ilógicos; los episodios 11 al 20 sí tienen preguntas propias de su trama.

## Qué voy a hacer

Reescribir a mano las 3 preguntas y los 3 momentos de grabación de cada episodio del 3 al 10, uno por uno, basándome en lo que realmente pasa en cada escena.

Para cada episodio:
- Pregunta 1 (después de la escena 3): sobre el hecho concreto que se acaba de contar, con dos opciones falsas creíbles tomadas del mismo contexto (no "se olvidan de la reunión").
- Pregunta 2 (después de la escena 7): sobre la decisión o el conflicto del medio del episodio.
- Pregunta 3 (después de la escena 11): sobre el desenlace y el gancho hacia el siguiente episodio.
- Cada "Say it" conectado con esa pregunta y con el tema del episodio (contrato, contraoferta, contratación, calidad, niños, México, socio o rival), con su ejemplo inicial coherente y su traducción al español.

No toco: el diálogo, las imágenes, las voces, el orden de escenas, el vocabulario tocable ni los bloqueos por día.

## Detalles técnicos

- Archivos: `src/services/storybook/sharks-ep3-...` hasta `sharks-ep10-...`, solo el arreglo `quizzes`.
- Se mantiene la forma actual de cada quiz: `id`, `afterScene`, `questionEn/Es`, 3 `options` con emoji, `answer`, `sayIt`, `sayItEs`, `sayItAskEn/Es`, `sayItCheck` con `target` y `altTargets`.
- El índice de la respuesta correcta se reparte entre las tres posiciones (el barajado con semilla sigue aplicando).
- Verificación: prueba nueva que asegure que ningún par de episodios de Sharks comparte el mismo texto de pregunta, más la suite de storybook y el chequeo de tipos.
