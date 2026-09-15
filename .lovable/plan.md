# Temporada 7, Episodio 20: personajes fuera de canon

## El problema

En la escena de la llamada de las nueve de la mañana (Tigers Episodio 20, `s6.jpg`) aparecen dos personas que nunca han salido en la historia: una mujer pelirroja y un hombre de polo verde. En esa escena el equipo que acompaña a Vale debe ser Camila y Dani.

Es el mismo tipo de error que ya corregimos en el Episodio 19, así que conviene revisar todo el episodio y no solo esa imagen.

## Qué haría

1. Regenerar `s6.jpg` con Vale al centro y Camila y Dani a los lados, conservando la oficina, el mapa, la pizarra, las poses y el encuadre actuales.
2. Revisar las 12 imágenes del Episodio 20 (portada y escenas 1 a 11) buscando personajes fuera de canon, brazos o manos mal dibujados y texto no deseado.
3. Regenerar solo las imágenes defectuosas usando las referencias oficiales de cada personaje.
4. Normalizar todas las imágenes corregidas al tamaño y peso estándar del resto de la temporada.
5. Ampliar las pruebas de consistencia para el Episodio 20 y verificar que el episodio carga bien.

## Canon de personajes

- Vale: cabello negro largo y liso, piel clara-media cálida, blusa mostaza.
- Camila: piel morena oscura, cabello rizado voluminoso, top morado.
- Dani: hombre joven adulto salvadoreño, cabello negro rizado corto, piel media cálida, sin barba, camisa celeste.
- Bryan: manager de BigTalk, como aparece en el Episodio 15.

## Detalles técnicos

- Archivos de arte: `src/assets/storybook/tigers-ep20-defend-your-decision/`.
- Guion y descripciones: `src/services/storybook/tigers-ep20-defend-your-decision.ts` (ajustar `imageAlt` solo si el arte corregido lo requiere).
- Pruebas: añadir un bloque de Episodio 20 en `src/services/storybook/tigers-consistency.test.ts` (cast permitido: vale, bryan, camila, dani, sofia, morgan, don tito, narrador según el guion real).
- Imágenes a 768x768 y bajo 250 KB; correr las pruebas de Storybook y cargar `/natural-method/cuento/tigers-ep20-defend-your-decision`.
