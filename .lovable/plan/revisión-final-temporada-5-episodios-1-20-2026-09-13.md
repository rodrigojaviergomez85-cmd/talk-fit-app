# Revisión final Temporada 5 (episodios 1–20)

Objetivo: una última pasada de calidad a toda la temporada antes de seguir con Eagles/Sharks, revisando voces, imágenes, tonos de piel y consistencia de personajes.

## Lo que ya está verificado

- Los 20 episodios tienen 11 imágenes cada uno (portada + 10 escenas).
- Ninguna imagen pasa de 300 KB (la más pesada es 149 KB), así que cargan rápido en celular.
- Los personajes que hablan en la temporada son: Vale, Dani, Camila, Kat, Mateo y la mamá de Vale.

## Un detalle de voces encontrado

Dani usa exactamente la misma voz que Beto (el personaje tímido de temporadas anteriores). Dani es co-protagonista de esta temporada, así que conviene darle su propia voz juvenil, distinta de Beto, Mateo y Dylan. También revisaremos que Camila y la mamá de Vale no suenen idénticas, ya que hoy comparten la misma voz base.

## Revisión visual, episodio por episodio

Para cada uno de los 20 episodios se revisa cada imagen contra la referencia oficial:

- Vale: 19 años, latina, cabello negro largo, tono de piel oficial, camisa mostaza.
- Dani: adolescente latino, cabello rizado negro, camisa celeste.
- Camila, Kat, Mateo y la mamá: identidad, edad, peinado y ropa estables.
- Sin personas extra sin explicación, exactamente dos brazos y dos manos, sin texto legible en las imágenes.
- Que la escena dibujada corresponda al texto del episodio.

Cualquier imagen fuera de norma se regenera y se vuelve a comprimir.

## Revisión de guion

- Vale siempre aparece como maestra ya fluida, nunca aprendiendo inglés.
- Preguntas y respuestas válidas, pistas correctas, afirmaciones sin calificación de IA.
- Vocabulario tocable coherente con el texto.
- Continuidad de la historia: crecimiento de la escuela hacia el contrato con la empresa.

## Lo que propongo además

1. Voz propia para Dani (y separar Camila de la mamá) para que cada personaje se reconozca al oído.
2. Una prueba automática que impida que dos personajes de una misma temporada compartan voz, para que esto no vuelva a pasar.
3. Una prueba automática que verifique que cada episodio tenga sus 11 imágenes y que ninguna supere 300 KB.
4. Una ficha de referencia visual por personaje de Temporada 5, igual que las que ya existen, para acelerar futuras temporadas.

## Detalles técnicos

- Voces en `speakerVoice`/`speakerTone` de `StorybookPlayer.tsx`; subir la versión de caché de audio al cambiar voces.
- Auditoría de los 20 archivos `src/services/storybook/vale-s5-*.ts` y su registro en `index.ts`/`seasons.ts`.
- Nuevas pruebas en `src/services/storybook/`.
- Al final: Vitest completo, chequeo de tipos, rutas `/natural-method/cuento/vale-s5-*` y verificación a 394px.
