# Dani no mantiene su personaje canónico (Temporada 7, Episodio 16)

## El problema

Dani cambia de apariencia entre escenas del mismo episodio:

- En la primera escena se ve como un niño de unos 8 años: cara redonda, cuerpo pequeño, camiseta celeste.
- En la escena del call center se ve como un joven adulto alto, de piel más oscura y camisa celeste de vestir.

Dani es siempre el mismo: joven salvadoreño de unos 19-20 años, compañero de trabajo de Vale, cabello negro rizado corto, piel morena media, complexión delgada de adulto joven.

## Qué haría

1. Fijar la descripción canónica de Dani (edad, rostro, cabello, tono de piel, ropa) tomando como referencia las escenas donde sí se ve correcto, y usarla en todas las correcciones.

2. Corregir la primera escena del episodio 16 para que Dani sea el joven adulto, conservando a Vale, el salón y el fondo tal como están.

3. Revisar las 12 imágenes del episodio 16 y luego todas las escenas de la temporada 7 (episodios 1 al 20) donde aparece Dani, comparándolas contra la referencia canónica: edad, rostro, cabello, tono de piel y ropa.

4. Regenerar solo las imágenes fuera de canon, manteniendo la misma composición y los demás personajes iguales.

5. Dejar todas las imágenes corregidas con el mismo tamaño y peso que las demás.

6. Validar: pruebas de consistencia de la temporada 7, suite de la historia, revisión de tipos y carga de las páginas tocadas.

## Nota

La revisión es visual, así que la haré por hojas de contacto episodio por episodio. Si aparecen muchas imágenes fuera de canon, te aviso antes de rehacerlas todas.

## Detalle técnico

- Edición dirigida con `imagegen--edit_image` sobre `src/assets/storybook/tigers-ep16-what-we-have-achieved/s1.jpg` y demás archivos afectados, preservando composición, fondo e identidad del resto del elenco.
- Barrido visual de `src/assets/storybook/tigers-ep*/` mediante hojas de contacto en `/tmp/browser/tigers-dani-canon/`.
- Reoptimización a 768×768 y ≤250 KB de cada archivo tocado.
- Ampliar `tigers-consistency.test.ts` con aserciones de canon de Dani en los `imageAlt` afectados.
- Validación final: suite de storybook, TypeScript y respuesta HTTP de las rutas corregidas.
