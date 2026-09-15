# Mr. Herrera siempre igual: hombre mayor con barba y traje

## El problema

En Tigers Episodio 7, escena 2, Bryan presenta a Mr. Herrera y el dibujo muestra a un hombre joven, sin barba y de camisa blanca. En las escenas siguientes del mismo episodio (cuando toma notas y cuando le entrega su tarjeta a Vale) Mr. Herrera aparece como debe ser: hombre mayor, cabello oscuro con canas, barba corta gris y traje gris oscuro.

## Canon del personaje

Mr. Herrera: hombre mayor (50-60 años), piel clara-media latina, cabello oscuro con canas peinado hacia atrás, barba y bigote cortos grises, traje gris oscuro con camisa blanca, expresión seria y observadora.

## Qué haría

1. Regenerar la imagen de la escena 2 del Episodio 7 para que Mr. Herrera sea el hombre mayor con barba y traje, manteniendo a Bryan (polo verde) presentándolo, a Vale a la derecha, el salón, el pizarrón, el mapa y las plantas tal como están.

2. Actualizar la descripción de esa escena, que hoy dice "un hombre de camisa blanca", para que describa a Mr. Herrera correctamente.

3. Revisar una por una las 12 imágenes del Episodio 7 y las de los Episodios 13 y 17 (los otros episodios donde aparece Mr. Herrera) para confirmar que siempre se ve igual; regenerar solo las que no coincidan.

4. Dejar las imágenes corregidas al mismo tamaño y peso que las demás (768x768, menos de 250 KB).

5. Agregar una verificación automática que deje constancia del canon de Mr. Herrera en las pruebas de consistencia de la temporada 7.

6. Validar: pruebas de consistencia de Tigers, suite de storybook, TypeScript y carga de la ruta del episodio.

## Detalle técnico

- Edición dirigida con `imagegen--edit_image` sobre `src/assets/storybook/tigers-ep7-your-experience/s2.jpg`, usando `s9.jpg` del mismo episodio como referencia canónica de Mr. Herrera y preservando composición, fondo e identidad de Bryan y Vale.
- Ajuste del `imageAlt` de la escena `s2` en `src/services/storybook/tigers-ep7-your-experience.ts`.
- Barrido visual por hojas de contacto de `tigers-ep7`, `tigers-ep13` y `tigers-ep17` en `/tmp/browser/herrera-check/`.
- Reoptimización a 768x768 y <=250 KB de cada archivo tocado.
- Nueva aserción en `src/services/storybook/tigers-consistency.test.ts` sobre las escenas de Mr. Herrera.
