# Correcciones al piloto: Advanced 1 · Episodio 1

## Problema

1. **Credibilidad de Vale.** En la escena 3, Vale dice "So I do not need perfect English; I need a clear order." Vale es una maestra de inglés experta y dueña de la academia: esa frase la hace sonar como estudiante insegura y contradice su personaje. La misma idea se repite en la tarjeta de mentalidad ("I do not need perfect English; I need a clear order.").
2. **Mr. Reed caricatura.** En la escena 3 (y parcialmente en la 2), Reed aparece en la laptop como una ilustración plana estilo caricatura, rompiendo el estilo realista cinematográfico V1 del episodio. En la escena 6 ya se ve realista, así que hay inconsistencia entre escenas.

## Cambios

### 1. Guion — proteger la credibilidad de Vale

- Escena 3, línea de Vale: reemplazar por una línea donde Vale responde como maestra experta que ya conoce el principio, no como alumna que duda de su inglés. Ejemplo: "Structure before polish. That is exactly what I teach my students." ("Estructura antes que perfección. Eso es exactamente lo que le enseño a mis estudiantes.")
- Tarjeta de mentalidad (después de la escena 7): cambiar a un consejo que Vale daría como maestra, no una confesión de debilidad. Ejemplo: "A clear structure beats a memorized script." ("Una estructura clara le gana a un guion memorizado.")
- Revisar que ninguna otra línea del episodio presente a Vale como insegura de su inglés; la tensión del episodio queda en la presión del comité, no en su nivel.
- Actualizar las traducciones al español de las líneas tocadas.

### 2. Arte — Reed realista y consistente

- Regenerar las apariciones de Reed en pantalla (escenas 2, 3 y 7) editando las imágenes actuales: mismo hombre de la escena 6 (ejecutivo de unos 60 años, traje azul marino, proporciones naturales, fotorrealista), eliminando el estilo caricatura/ilustración.
- Mantener intactos Vale, el ambiente cálido y la composición de cada escena; solo cambia la representación de Reed en la pantalla de la laptop.
- Reed debe verse idéntico en las 4 escenas donde aparece (2, 3, 6, 7).
- Normalizar las imágenes finales a 768×768 JPG progresivas menores de 250 KB, como el resto.

### 3. Verificación

- Pruebas del mundo de Vale y TypeScript en verde.
- Revisión visual en móvil de las escenas 3 y 7 (línea nueva de Vale + Reed realista).
- Confirmar que las palabras tocables y el glosario siguen completos tras el cambio de texto.

## Detalles técnicos

- Archivo de texto: `src/services/storybook/advanced-1-ep1-rules-of-the-game.ts` (escena 3 + mindsetCard).
- Imágenes: `src/assets/storybook/advanced1-ep1-rules-of-the-game/s2.jpg`, `s3.jpg`, `s7.jpg` (edición sobre la imagen actual para conservar la escena).
- Sin cambios en temporadas 1–8 ni en el resto del episodio.
