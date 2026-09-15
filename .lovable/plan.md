# Sharks: imágenes recortadas y de menor calidad (episodios 5 al 10)

## Qué está pasando

La pantalla que enviaste es del **episodio 5 ("The counter-offer")**, no del 4. Revisé las imágenes guardadas y el problema es real y tiene dos partes:

1. **Encuadre cortado.** Varias escenas del episodio 5 están enmarcadas como una tira ancha dentro del cuadro: a Vale se le corta la cabeza arriba (solo se ve de la boca para abajo) y quedan franjas blancas/negras a los lados. Lo mismo pasa con Mr. Reed.

2. **Menos detalle.** Los episodios 3 y 4 sí se rehicieron de verdad y pesan en promedio 154–155 KB por imagen, igual que el episodio 2 (132 KB). Los episodios 5 al 10 solo recibieron un ajuste automático de contraste y nitidez, no un rehacer real: pesan 107–115 KB y se ven más planos y con menos detalle.

En otras palabras: el trabajo de mejora se completó hasta el episodio 4 y de ahí en adelante quedó a medias. Fue mi error haberlo dado por terminado.

## Qué haría

1. **Rehacer las 72 ilustraciones de los episodios 5, 6, 7, 8, 9 y 10** con la misma calidad y estilo del episodio 2 y 4: mismo trazo de cómic, color y nivel de detalle.

2. **Corregir el encuadre.** Cada escena con la cabeza completa dentro del cuadro, sin franjas blancas ni negras, sin texto dentro de la imagen, y respetando lo que pasa en el diálogo de esa escena.

3. **Mantener a los personajes idénticos** a su versión oficial: Vale (camisa mostaza, cabello negro largo), Dani (hombre joven, camisa azul claro), Camila, Mr. Reed (hombre mayor, traje azul) y el resto del elenco de Sharks, con las manos y brazos bien dibujados.

4. **Igualar el peso y el tamaño**: 768×768 y entre 130 y 200 KB, igual que los episodios 2 a 4, para que carguen rápido en el teléfono sin perder detalle.

5. **Revisión final**: hoja de contactos episodio por episodio para verlas juntas, más las pruebas automáticas de personajes, voces y textos, y revisión de las pantallas en móvil.

Como son 72 imágenes, lo haría episodio por episodio (5, luego 6, y así) para poder revisar cada tanda antes de seguir.

## Detalles técnicos

- Assets en `src/assets/storybook/sharks-ep5-…` a `sharks-ep10-…`; se regenera cada `cover.jpg` y `s1.jpg`–`s11.jpg` con los prompts canónicos de `character-canon.ts`.
- Nada de recorte central agresivo en el post-proceso: se genera directo a 768×768 y solo se optimiza el JPEG, sin re-encuadrar.
- Se corren `sharks-consistency.test.ts`, `cast-consistency.test.ts` y la suite completa; se verifica que cada ruta de episodio responda 200.

Sin cambios en guiones, voces, preguntas ni límites de práctica.
