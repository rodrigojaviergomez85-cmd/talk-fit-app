# Dani se ve como un niño (Temporada 7, Episodio 16)

## El problema

En la primera escena del episodio "What we have achieved", Dani aparece dibujado como un niño de unos 8 años: cara redonda, cuerpo pequeño y expresión infantil. Dani es un joven adulto salvadoreño (alrededor de 19-20 años), compañero de trabajo de Vale en el call center.

## Qué haría

1. Corregir esa imagen para que Dani se vea como el joven adulto que es en el resto de la historia: rostro y proporciones de adulto joven, cabello rizado oscuro corto, misma ropa y misma pose, conservando a Vale, el salón y el fondo tal como están.

2. Revisar las 12 imágenes del episodio 16 buscando el mismo problema de edad o proporciones en Dani y en los demás personajes.

3. Revisar el resto de la temporada 7 (episodios 1 al 20) donde aparece Dani, para detectar otras escenas en las que se vea como niño, y regenerar solo las que tengan el problema.

4. Dejar todas las imágenes corregidas con el mismo tamaño y peso que las demás.

5. Validar: pruebas de consistencia de la temporada 7, pruebas de la historia, revisión de tipos y carga de las páginas de los episodios tocados.

## Nota

La revisión de edad es visual, así que la haré por hojas de contacto episodio por episodio. Si aparecen muchas imágenes con el problema, te aviso antes de rehacerlas todas.

## Detalle técnico

- Edición dirigida con `imagegen--edit_image` sobre `src/assets/storybook/tigers-ep16-what-we-have-achieved/s1.jpg`, preservando composición, fondo, ropa e identidad de Vale.
- Barrido visual de `src/assets/storybook/tigers-ep*/` mediante hojas de contacto en `/tmp/browser/tigers-dani-age/`.
- Reoptimización a 768×768 y ≤250 KB de cada archivo tocado.
- Validación: `tigers-consistency.test.ts`, suite de storybook, TypeScript y respuesta HTTP de las rutas de los episodios corregidos.
