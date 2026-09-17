# Corregir la edad de Vale en el episodio 16 (Advanced 1)

## El problema

Comparando con los episodios 1 al 5 (y el 11), Vale se ve como una mujer de unos 30 años: cara delgada, rasgos jóvenes, cabello negro largo y liso, blusa mostaza. En el episodio 16 aparece claramente mayor: cara más llena y expresión más severa, como de 45 años o más. Es la misma persona en la historia, así que debe verse igual.

## Qué se va a hacer (solo episodio 16)

1. **Fijar la Vale oficial** tomando como única referencia las imágenes de los episodios 1 al 5: mujer salvadoreña de unos 30 años, piel morena clara cálida, cara ovalada delgada, cabello negro largo y liso, ojos cafés, blusa mostaza (con o sin saco negro), expresión cálida y segura.

2. **Revisar las 10 imágenes del episodio 16** (portada y 9 escenas) una por una contra esa referencia y marcar cada aparición de Vale como correcta o envejecida.

3. **Regenerar solo las imágenes marcadas.** Se conserva exactamente la misma escena, composición, ropa, lugar, luz y los demás personajes; solo cambia el rostro de Vale al canónico. No se toca el guion, el audio, el vocabulario, los quizzes ni el avance del alumno.

4. **Verificación final:** comparar lado a lado con los episodios 1-5, confirmar que cada imagen queda en 768x768 y por debajo de 250 KB para móvil, y revisar el episodio completo en el lector del celular.

## Para que no vuelva a pasar

- Guardar la descripción canónica de Vale (con la edad incluida) como memoria del proyecto, para que toda imagen futura parta del mismo texto.
- Dejar como paso obligatorio la comparación visual contra los episodios 1-5 antes de dar por terminada cualquier imagen nueva.

Los episodios 17 al 20 también muestran cierta variación, pero quedan fuera de este trabajo hasta que lo indiques.

## Detalle técnico

- Referencias: `src/assets/storybook/advanced1-ep1-rules-of-the-game/` a `advanced1-ep5-*`.
- Objetivo: `src/assets/storybook/advanced1-ep16-the-ninety-days/`.
- Regeneración en el mismo estilo semi-realista cálido, 768x768 RGB JPG progresivo, menos de 250 KB, sin texto ni logos legibles.
- Sin cambios en `src/services/storybook/advanced-1-ep16-the-ninety-days.ts`; al final se corren las pruebas de storybook y el chequeo de TypeScript.
