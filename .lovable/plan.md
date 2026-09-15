# Arreglar a Mr. Reed en Sharks (episodio 3)

## Qué encontré

Revisé el episodio 3 de Sharks ("The first dollar contract"). El texto está bien: Mr. Reed habla en las escenas 3, 4, 9 y 11. El problema está en los dibujos:

- Escena 4: Reed habla ("Houston uses one contract worldwide"), pero la imagen muestra a dos mujeres en videollamada. Reed no aparece.
- Escena 11: Reed cierra el episodio, pero la imagen muestra a Vale, Dani y Camila celebrando. Reed no aparece; el hombre en la escena es Dani.
- Escena 9: correcta (Reed ejecutivo canadiense/americano de ~55 años, cabello plateado, traje azul marino).

Es decir, en las escenas donde Reed habla, el dibujo pone a Dani (o a otras personas) en su lugar.

## Qué haré

1. Revisar las 11 escenas del episodio 3 una por una y comparar quién habla con quién aparece dibujado.
2. Volver a generar solo las imágenes que no coinciden (escena 4 y 11 confirmadas, más las que aparezcan en la revisión), con el Reed oficial: hombre estadounidense de unos 55 años, piel clara, cabello corto plateado, afeitado, gesto serio, traje azul marino con corbata.
3. Mantener el mismo estilo ilustrado que el episodio 2 (mismo acabado, 768x768, sin texto ni logos, sin recortes raros).
4. Extender la misma revisión a los demás episodios de Sharks donde Reed habla, para que no quede ninguna escena con el personaje equivocado.
5. Correr las pruebas de consistencia de personajes y la revisión final de imágenes.

No cambio el guion, las preguntas ni las voces: solo las ilustraciones que muestran al personaje equivocado.

## Detalle técnico

- Escenas afectadas confirmadas: `src/assets/storybook/sharks-ep3-first-dollar-contract/s4.jpg` y `s11.jpg`.
- Referencia canónica: entrada `reed` en `src/services/storybook/character-canon.ts`.
- Los `cast` de cada escena en `sharks-ep3-first-dollar-contract.ts` definen quién debe aparecer; se usan como fuente de verdad para la auditoría.
- Las imágenes nuevas se normalizan a 768x768 JPG progresivo, menos de 250 KB.
