# Corregir la edad de Vale en Advanced 1 (episodios 16 al 20)

## El problema

Comparando con los episodios 1 al 5, Vale cambia de edad. En los episodios 1-5 y 11 se ve como una mujer de unos 30 años: cara delgada, rasgos jóvenes, blusa mostaza. En varias imágenes del 16 al 20 aparece claramente mayor: cara más llena, gesto más severo, aspecto de 45 años o más (por ejemplo episodio 16 escenas 1, 4, 5, 6, 7, 8 y 9; episodio 18 escena 1; episodio 20 escena 1).

Es la misma persona en la historia, así que debe verse igual en toda la temporada.

## Qué se va a hacer

1. **Fijar la Vale oficial.** Tomar como única referencia visual a Vale de los episodios 1 al 5 y escribir su descripción exacta y definitiva: mujer salvadoreña de unos 30 años, piel morena clara cálida, cara ovalada delgada, cabello negro largo y liso, ojos cafés, blusa mostaza (con o sin saco negro), expresión cálida y segura. Esa descripción queda guardada para que todas las imágenes futuras la usen palabra por palabra.

2. **Revisar las 60 imágenes de los episodios 16 al 20** (portada más 9 a 11 escenas por episodio), una por una, al lado de las de los episodios 1-5, y marcar cada aparición de Vale como correcta o envejecida.

3. **Regenerar solo las imágenes marcadas.** Se mantiene exactamente la misma escena, composición, ropa, lugar, luz y los demás personajes; solo cambia el rostro de Vale al canónico. No se toca el guion, el audio, el vocabulario, los quizzes ni el avance del alumno.

4. **Verificación final.** Comparar de nuevo las imágenes corregidas contra los episodios 1-5, confirmar que todas pesan poco para móvil (768x768, menos de 250 KB) y revisar los cinco episodios en el lector del celular.

## Para que no vuelva a pasar

- Guardar la descripción canónica de Vale, Dani y Camila como memoria del proyecto, con la edad incluida, para que cada imagen nueva parta del mismo texto.
- Añadir una guía de personajes en el proyecto (documento de canon) con las imágenes de referencia de los episodios 1-5.
- Incluir un paso obligatorio de revisión visual lado a lado antes de dar por terminado cualquier episodio nuevo: cada imagen con Vale se compara contra la referencia antes de registrarla.

## Detalle técnico

- Referencias: `src/assets/storybook/advanced1-ep1-rules-of-the-game/*` a `advanced1-ep5-*`.
- Objetivo: `src/assets/storybook/advanced1-ep16-*` a `advanced1-ep20-*`.
- Regeneración con el mismo estilo semi-realista cálido, 768x768 RGB JPG progresivo, menos de 250 KB, sin texto ni logos legibles.
- Nuevo documento de canon en `src/services/storybook/` (o `docs/`) con el descriptor fijo reutilizable por prompt.
- Sin cambios en los archivos de guion `advanced-1-ep16..20*.ts`; se corren las pruebas existentes de storybook y TypeScript al final.
