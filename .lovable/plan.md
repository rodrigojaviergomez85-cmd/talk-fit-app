# Mezclar el orden de las respuestas en los cuentos

## Problema confirmado
En todos los episodios (incluida la Temporada 1, episodio 1) la opción correcta está siempre guardada en la primera posición (`answer: 0`). El estudiante puede acertar sin leer: siempre toca la de arriba.

## Solución
Mezclar las opciones al mostrarlas, sin tocar los guiones ni las imágenes.

- El orden se calcula con una "semilla" fija basada en el identificador del episodio y de la pregunta. Así cada pregunta tiene un orden distinto, pero siempre el mismo para esa pregunta (no cambia al repetir la escena ni al volver atrás).
- La respuesta correcta puede caer en cualquier posición; la verificación sigue apuntando a la opción correcta real.
- Emojis, textos, audio, estrellas y la parte de "ahora dilo tú" no cambian.

## Alcance
Se aplica a todas las preguntas rápidas de El mundo de Vale. Aunque la revisión pedida es la Temporada 1 (episodios 1-20), el mismo problema existe en las demás temporadas, así que el arreglo las cubre todas.

## Detalles técnicos
- Nueva utilidad `shuffleQuizOptions(episodeId, quiz)` en `src/services/storybook/` que devuelve las opciones reordenadas y el nuevo índice correcto, usando un hash determinista (sin `Math.random`).
- `StorybookPlayer.tsx`: usar las opciones mezcladas en el render (línea ~1187) y comparar la selección contra el índice correcto reasignado (líneas ~1075 y ~1188), en lugar de `quiz.answer`.
- Test nuevo: verifica determinismo, que la correcta no quede siempre en posición 0 a lo largo de la Temporada 1, y que las opciones sean las mismas (solo reordenadas).
- Verificación: Vitest completo, TypeScript y revisión de la ruta del episodio a 394px.
