# Temporada 7: brazos mal dibujados

## El problema

En la escena de la llamada (Episodio 1), a Camila los dos brazos le salen del mismo lado del cuerpo: el que sostiene el teléfono y el que gesticula. El otro hombro queda sin brazo.

## Qué haría

1. Corregir esa imagen: dos brazos, uno a cada lado, conservando la pose (teléfono en una mano, la otra abierta), el escritorio, la laptop y todo el fondo tal como están.
2. Revisar una por una las 240 ilustraciones de la temporada 7 (Tigers, episodios 1 al 20) buscando el mismo tipo de error: brazos o manos de más, brazos faltantes, manos deformes, dedos extra.
3. Regenerar solo las imágenes con problemas, manteniendo la misma composición y los personajes iguales a como se ven en el resto de la temporada.
4. Dejar todas las imágenes corregidas al mismo tamaño y peso que las demás, y volver a pasar las pruebas de consistencia de la temporada.

## Nota

La revisión de anatomía es visual, así que la haré por hojas de contacto episodio por episodio; si aparecen muchas imágenes con fallas, te aviso antes de rehacerlas todas.

## Detalle técnico

- Corrección por edición dirigida con `imagegen--edit_image` sobre `src/assets/storybook/tigers-ep1-a-decision-i-made/s8.jpg`, preservando composición, fondo, ropa e identidad.
- Barrido visual de `src/assets/storybook/tigers-ep*/` mediante hojas de contacto en `/tmp/browser/tigers-anatomy/`.
- Reoptimización a 768×768 y ≤250 KB de cada archivo tocado.
- Validación final: `src/services/storybook/tigers-consistency.test.ts`, suite de storybook, TypeScript y carga de la ruta del episodio.
