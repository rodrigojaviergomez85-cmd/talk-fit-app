# Temporada 7, Episodio 17: la estudiante debe verse y llamarse como estudiante

## El problema

En la escena de la visita de la junta, la persona a la que Mr. Herrera le pregunta aparece dibujada como Camila (la maestra) y los diálogos están etiquetados con nombres equivocados:

- La estudiante que se queda callada aparece como **VALE**.
- Su respuesta ("I have been studying here for six months…") aparece como **CAMILA**.
- Más adelante, lo que dice Beto frente a la junta aparece también como **VALE**.

Camila sí habla en esa escena (le dice "Take your time, Ana"), así que en pantalla parece que Camila se responde sola.

## Qué haría

1. Poner los nombres correctos en el episodio 17:
   - las líneas de la estudiante quedan como **Ana**;
   - las líneas de Beto frente a la junta quedan como **Beto**;
   - Camila y Mr. Herrera se quedan igual.
2. Corregir la ilustración de esa escena: Ana debe verse como una estudiante joven distinta de Camila (no la misma cara, cabello y ropa de la maestra), manteniendo a Mr. Herrera, el salón, la pizarra y el resto de la composición tal como están.
3. Revisar la ilustración siguiente (Ana respondiendo) para que sea la misma Ana, y la escena de Beto para que sea él y no Vale.
4. Dejar las imágenes corregidas del mismo tamaño y peso que las demás del episodio.
5. Validar: pruebas de consistencia de la temporada 7, pruebas de historias, TypeScript y carga del episodio.

## Detalle técnico

- `src/services/storybook/tigers-ep17-the-visit.ts`: cambiar `speaker` de las líneas mal atribuidas a `ana` y `beto` (ambos ya existen en `StorybookSpeaker`, con voz y etiqueta en `voices.ts`); actualizar `speaker` de escena e `imageAlt` donde aplique.
- Regenerar `src/assets/storybook/tigers-ep17-the-visit/s4.jpg` (y `s5.jpg`/`s9.jpg` si el repaso visual lo confirma) con `imagegen--edit_image`, usando referencias canónicas de Camila y Vale para diferenciarlas; normalizar a 768×768 y ≤250 KB.
- Ampliar `src/services/storybook/tigers-consistency.test.ts` para que las líneas de Ana y Beto no queden atribuidas a Vale o Camila.
