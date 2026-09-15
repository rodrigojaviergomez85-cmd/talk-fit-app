# Dani fuera de canon en el Episodio 19 (Temporada 7)

## El problema

En varias escenas del Episodio 19, Dani aparece con la piel más oscura y con rasgos distintos a los de los demás episodios. Debe verse siempre igual: el mismo joven de siempre.

## Cómo debe verse Dani (canon)

- Joven salvadoreño de 19-20 años, proporciones de adulto joven (no niño).
- Cabello negro corto y rizado.
- Piel morena clara / medio cálida (la misma de los episodios anteriores).
- Camisa azul claro.

## Qué haría

1. Revisar las 11 escenas + portada del Episodio 19 y marcar todas las imágenes donde aparece Dani (escenas 2, 5, 6, 9, 10, 11 y portada, más cualquier otra que salga en la revisión).
2. Comparar cada una lado a lado con las imágenes de Dani ya aprobadas de otros episodios de la temporada.
3. Corregir solo las que estén fuera de canon: ajustar tono de piel, rostro y edad, conservando exactamente la misma composición, poses, fondo, ropa y a los demás personajes (Vale, Camila, Sofía).
4. Dejar los archivos al mismo tamaño y peso que el resto (768×768, menos de 250 KB).
5. Ampliar la prueba de consistencia de la temporada para que cubra el Episodio 19 y avise si Dani vuelve a salir distinto.
6. Validar: pruebas de storybook, revisión visual final y carga del episodio.

## Detalle técnico

- Edición dirigida con `imagegen--edit_image` sobre `src/assets/storybook/tigers-ep19-new-leaders/*.jpg`, usando una imagen canónica de Dani de otro episodio como referencia de identidad.
- Hoja de contacto de revisión en `/tmp/browser/tigers-ep19-dani/`.
- Reoptimización a 768×768 y ≤250 KB por archivo tocado.
- Nuevas aserciones en `src/services/storybook/tigers-consistency.test.ts`.
- Verificación de la ruta `/natural-method/cuento/tigers-ep19-new-leaders`.
