# "Kat" en la entrevista del Episodio 15

## Qué pasa

La escena que aparece en tu captura (la chica que llega tarde y dice "Sorry. Traffic. How much do you pay?") ya fue corregida: ahora esa persona figura como **Candidate**, no como Kat. Lo que estás viendo es la versión anterior cargada en tu pantalla.

## Qué haría

1. Recargar/limpiar la vista del episodio para confirmar que ya dice "Candidate" en las dos escenas de entrevista (la del hombre y la de la mujer).
2. Revisar todos los episodios de Eagles (temporada 6) y Tigers (temporada 7) buscando otras escenas de entrevista donde un personaje conocido (Kat, Don Tito, Mateo, Beto) aparezca como si fuera un candidato desconocido, y cambiarlos a "Candidate" cuando corresponda.
3. Dejar una prueba automática que impida que vuelva a pasar: en una escena de entrevista, el entrevistado no puede ser un personaje del elenco fijo.
4. Confirmar que la voz de cada candidato siga siendo distinta a la de Kat y a la de los demás personajes.

## Nota

Ana y Beto sí son candidatos con nombre propio en ese mismo episodio (Vale termina contratando a Ana), así que esos se quedan como están.

## Detalle técnico

- `src/services/storybook/eagles-ep15-a-great-teacher.ts`: escenas s3 y s5 ya usan `candidateM` / `candidateF`.
- `src/services/storybook/voices.ts`: ambos muestran la etiqueta "Candidate" con voces propias.
- Barrido con búsqueda por texto sobre `src/services/storybook/*.ts` para detectar escenas de entrevista con hablantes del elenco fijo.
- Nueva prueba en `src/services/storybook/eagles-consistency.test.ts` (o archivo equivalente).
