# Temporada 6: corregir los nombres de los candidatos y el tono de piel de Vale

Dos correcciones en la Temporada 6 (Eagles) de El mundo de Vale.

## 1. Episodio 15: los candidatos ya no se llaman "Don Tito" ni "Kat"

En el episodio de la entrevista, el primer candidato aparece con el nombre "Don Tito" y la segunda con el nombre "Kat", que son personajes fijos de la historia (el vecino y la amiga del call center). En una entrevista deben verse como personas nuevas.

- El primer candidato pasa a mostrarse como **Candidate / Candidato** (voz masculina joven, distinta a la de Don Tito).
- La segunda candidata pasa a mostrarse como **Candidate / Candidata** (voz femenina distinta a la de Kat).
- Ana (la tercera, la del hotel) se queda igual: sí es un personaje con nombre y termina contratada.
- El resto del episodio (diálogos, preguntas, glosario, estrellas, final) no cambia.
- Don Tito y Kat siguen intactos en todos los demás episodios donde sí aparecen como ellos mismos.

## 2. Tono de piel de Vale en toda la Temporada 6

Al revisar las 20 episodios encontré que en varias escenas (sobre todo de la mitad de la temporada en adelante, incluido el episodio 15) Vale aparece con piel muy clara y rasgos que no coinciden con ella: se pierde su identidad latina y también cambia el estilo de dibujo.

- Reviso las imágenes de los 20 episodios comparándolas con la imagen de referencia oficial de Vale (piel morena clara cálida, cabello negro largo y lacio, blusa mostaza, estilo ilustración tipo webtoon).
- Regenero cada imagen donde Vale se vea fuera de personaje, manteniendo la misma escena, la misma composición y los demás personajes.
- Mismo estándar de siempre: sin texto dentro de la imagen, 768x768, menos de 250 KB.
- Reviso el resultado en hoja de contactos antes de cerrar.

## Detalles técnicos

- `src/services/storybook/types.ts` y `voices.ts`: nuevos hablantes `candidateM` y `candidateF` con nombre visible "Candidate", voz y tono únicos dentro de la temporada.
- `src/services/storybook/eagles-ep15-a-great-teacher.ts`: escenas s3 y s5 cambian de `tito`/`kat` a los nuevos hablantes; sin cambios de texto.
- Regeneración de arte en `src/assets/storybook/eagles-ep*/`, usando `_canon/vale.jpg` como referencia.
- Pruebas: la de consistencia de Eagles sigue verde, más la verificación de voces únicas, TypeScript y la ruta del episodio.
