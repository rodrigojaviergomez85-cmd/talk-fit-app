# Revisión de dibujos: Temporada 3 completa

## Qué reportaste

En el Episodio 1, a Kat le falta una mano. Puede haber errores parecidos en otros episodios de la temporada.

## Qué voy a hacer

Revisar las 220 imágenes de la Temporada 3 (20 episodios x 11 imágenes) una por una y corregir las defectuosas, sin tocar los textos, preguntas, voces ni el orden de las escenas.

En cada imagen reviso:

- Manos y brazos: exactamente dos brazos y dos manos completas por persona, sin dedos de más o de menos, sin manos cortadas o deformes.
- Identidad de cada personaje según su ficha oficial: Vale, Kat, Mateo, Mr. Reyes, Dylan, Luis, la mamá de Vale, Camila, Ana y cualquier otro que aparezca (edad, tono de piel, cabello, ropa y accesorios).
- Que el personaje no cambie de aspecto entre escenas del mismo episodio.
- Número correcto de personas y objetos según lo que dice la escena.
- Que no aparezca texto inventado o ilegible dentro del dibujo.

## Cómo lo corrijo

Solo se regeneran las imágenes con defecto, usando las fichas oficiales de cada personaje como referencia y el mismo estilo de dibujo de la temporada. Las imágenes correctas se quedan tal cual.

Empiezo por el Episodio 1 (la mano de Kat) y sigo episodio por episodio hasta el 20, reportando lo que encuentro y corrijo en cada bloque.

## Detalles técnicos

- Carpetas: `src/assets/storybook/vale-s3-ep1` … `vale-s3-ep20` (`cover.jpg`, `s1.jpg`–`s10.jpg`).
- Reglas de estilo y fichas: `src/assets/storybook/STYLE.md` y `src/assets/storybook/_canon/*.jpg`.
- Imágenes nuevas: mismo formato cuadrado, JPG comprimido por debajo de 250 KB para que cargue rápido en celular.
- Al final: pruebas automáticas, verificación de tipos y revisión de rutas de la temporada en pantalla de 394 px.
