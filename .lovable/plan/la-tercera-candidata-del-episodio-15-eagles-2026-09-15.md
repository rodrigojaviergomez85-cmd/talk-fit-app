# La tercera candidata del Episodio 15 (Eagles)

## Qué cambia

En la mañana de entrevistas, la mujer del hotel todavía es una desconocida, pero aparece con nombre propio ("Ana") desde su primera escena. Va a mostrarse como **Candidate** mientras está en proceso, y recuperará su nombre en el momento en que Vale la contrata.

- Escena de la entrevista (la del uniforme de hotel): "Candidate".
- Escena de la clase de prueba: ella sigue como "Candidate"; Beto se queda como Beto, porque sí es un alumno conocido de la escuela.
- Escena en que Vale le ofrece el trabajo: ya aparece con su nombre, como parte del equipo.

## Detalles

- Su voz será la misma en todo el episodio, para que no suene como dos personas distintas al pasar de "Candidate" a su nombre.
- No se toca el diálogo, ni el audio, ni las imágenes, ni las preguntas del episodio.

## Detalle técnico

- `types.ts` / `voices.ts`: nuevo hablante `candidateHotel` con etiqueta "Candidate" y la misma voz/tono que `ana`, para conservar continuidad sonora. Se ajusta la prueba de "dos personajes nunca comparten voz" para tratar a `candidateHotel` y `ana` como la misma persona.
- `eagles-ep15-a-great-teacher.ts`: en s6 y s7 las líneas de la candidata pasan a `candidateHotel`; s9 (la contratación) mantiene `ana`.
- Se amplía la prueba en `eagles-consistency.test.ts` para cubrir s6/s7 además de s3/s5.
- Validación: pruebas de storybook, TypeScript y carga de la ruta del episodio.
