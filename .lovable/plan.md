# Episodio 19 (Temporada 7): personajes fuera de canon

## El problema

Confirmado en las imágenes del episodio 19 "New Leaders":

- La escena final muestra a tres personas que nunca han aparecido en la serie: una mujer de cabello castaño corto, una chica de cabello castaño largo y un hombre barbudo. Ahí deberían estar Vale, Camila, Dani y Sofía.
- En otras escenas Dani aparece con la piel más oscura y con un rostro distinto al de los episodios anteriores.

## Cómo deben verse los personajes (canon)

- Vale: salvadoreña, cabello negro lacio y largo, piel morena clara cálida, blusa mostaza.
- Camila: joven salvadoreña, cabello rizado oscuro, piel morena media.
- Dani: joven salvadoreño de 19-20 años, cabello negro corto y rizado, piel morena clara, camisa azul claro, proporciones de adulto joven (nunca de niño).
- Sofía: según se ve en el resto de la temporada.

## Qué haría

1. Revisar las 11 escenas y la portada del episodio 19 una por una y marcar cada imagen con personajes equivocados o fuera de canon.
2. Comparar con imágenes ya aprobadas de esos mismos personajes en otros episodios de la temporada.
3. Regenerar solo las imágenes con problemas, conservando la composición, el fondo, la pose y el ambiente, pero con el elenco correcto y con los rasgos de siempre.
4. Empezar por la escena final (el equipo junto al organigrama) y por las escenas de Dani.
5. Dejar todas las imágenes corregidas a 768×768 y menos de 250 KB, igual que el resto.
6. Ampliar la prueba de consistencia de la temporada para que cubra el episodio 19 y avise si Dani o Camila vuelven a salir distintos.
7. Validar: pruebas de storybook, revisión visual final y carga del episodio.

## Detalle técnico

- Edición/regeneración dirigida con `imagegen--edit_image` sobre `src/assets/storybook/tigers-ep19-new-leaders/*.jpg`, usando referencias canónicas de Vale, Camila, Dani y Sofía de otros episodios.
- Hoja de contacto de revisión en `/tmp/browser/tigers-ep19-cast/`.
- Reoptimización a 768×768 y ≤250 KB por archivo tocado.
- Nuevas aserciones en `src/services/storybook/tigers-consistency.test.ts`.
- Verificación de la ruta `/natural-method/cuento/tigers-ep19-new-leaders`.
