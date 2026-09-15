# Beto en la presentación (Temporada 7, Episodio 17)

## El problema

En la escena donde Beto habla por primera vez frente a la junta ("I have been learning English for one year…"), la ilustración muestra a otro personaje: un joven de cabello castaño con diadema de call center, frente a una computadora. Ese no es Beto, y la escena tampoco ocurre en un call center: ocurre en la escuela, frente a los visitantes.

La escena anterior del mismo episodio sí muestra a Beto correctamente: joven salvadoreño, cabello negro rizado corto, piel morena clara, sudadera gris, de pie hablando en el salón. Ese es el Beto canónico.

## Qué haría

1. Regenerar la imagen de la escena de la presentación con el Beto canónico (cabello negro rizado corto, piel morena clara, sudadera gris, proporciones de adulto joven), de pie hablando a los miembros de la junta en el salón de la escuela, con Mr. Herrera (hombre mayor con barba gris y traje oscuro) escuchando. Sin diadema, sin computadora, sin call center.

2. Revisar las demás escenas del Episodio 17 donde aparece Beto y corregir solo las que no coincidan con su aspecto canónico.

3. Revisar rápidamente las apariciones de Beto en el resto de la Temporada 7 para confirmar que se mantiene igual, y regenerar únicamente las que estén fuera de canon.

4. Normalizar las imágenes corregidas al mismo tamaño y peso que las demás.

5. Agregar una verificación automática de que Beto sigue siendo el que habla en esa escena, correr las pruebas de la historia y abrir el episodio para confirmar que se ve bien.

## Nota

Si en tu pantalla los diálogos de esa escena aparecen con el nombre "VALE", es una pantalla guardada de una versión anterior: en el guion actual esas líneas ya están asignadas a Beto. Lo confirmo durante la verificación.

## Detalle técnico

- Activo a regenerar: `src/assets/storybook/tigers-ep17-the-visit/s10.jpg` (768×768, < 250 KB), usando `s9.jpg` del mismo episodio como referencia canónica de Beto y la referencia canónica de Mr. Herrera.
- Prueba nueva en `src/services/storybook/tigers-consistency.test.ts` (bloque del Episodio 17).
- Verificación: `bunx vitest run src/services/storybook`, typecheck y ruta `/natural-method/cuento/tigers-ep17-the-visit`.
