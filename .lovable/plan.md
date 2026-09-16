# Episodio 8 (Advanced 1): que las tres expresiones sí se digan en el diálogo

## Problema confirmado
La tarjeta final "Say it like a native" del episodio 8 enseña **back down**, **work out** y **meet in the middle**, pero ninguna de las tres aparece en las líneas del episodio. La regla del curso es que cada expresión la diga un personaje dentro de la historia.

## Qué se va a cambiar
Se ajustan tres líneas de diálogo (misma historia, mismas imágenes, mismos personajes, mismo orden de escenas) para que cada expresión se use de forma natural, y las frases de ejemplo de la tarjeta final pasan a ser exactamente esas líneas.

1. **Escena 3 (Vale con las dos columnas) → "back down"**
   Vale nombra que ninguno de los dos va a ceder frente al comité, justo antes de pedirles que describan el problema y no a la persona.

2. **Escena 5 (la tercera versión) → "work out"**
   Vale presenta el plan combinado diciendo que resolvieron una tercera versión que mantiene ambos riesgos bajo control.

3. **Escena 7 (presentación al comité) → "meet in the middle"**
   Camila explica que llegaron a un punto medio sin perder lo que le importaba a cada uno.

## Detalles técnicos
- Archivo: `src/services/storybook/advanced-1-ep8-two-right-answers.ts`.
- Se editan solo `text`/`es` de esas tres líneas y los campos `example`/`exampleEs` del bloque `expressions` para que coincidan palabra por palabra con el diálogo.
- Se agregan las palabras nuevas a `words` de cada escena con su significado en español si hacen falta; se revisa `src/services/storybook/glossary.ts` para que todo token tenga significado.
- Sin cambios en imágenes, quizzes, `sayIt`, casting, voces ni duración de grabación.
- Verificación: suite de Storybook (incluida la prueba de expresiones/glosario), `tsgo` y carga de la ruta del episodio 8.
