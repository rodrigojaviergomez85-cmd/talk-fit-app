# Arreglar la escena donde Mr. Reed aparece presente pero está en Houston

## Qué pasa

En el Episodio 4 de Sharks, la escena 8 es un momento en el que Vale habla sola con su equipo en la oficina. El guion dice exactamente eso: solo Vale habla, y Mr. Reed no participa porque está en Houston, conectado por video en otras escenas.

La ilustración de esa escena, sin embargo, muestra a Mr. Reed sentado físicamente en la mesa junto a Vale, Dani y Camila. Es un error solo de la imagen, no del texto.

## Qué se va a hacer

1. Regenerar únicamente la ilustración de la escena 8: Vale de pie hablando a su equipo (Dani y Camila) en la oficina de la academia, sin Mr. Reed presente en la sala ni en pantalla.
2. Revisar las otras ilustraciones del episodio donde aparece Mr. Reed (escenas 3, 4, 7, 9 y 11) y confirmar que en todas se le vea únicamente dentro de la pantalla de videollamada desde Houston. Si alguna lo muestra físicamente en la sala, se regenera igual.
3. Mantener el mismo estilo, tamaño y calidad de las demás imágenes del episodio (mismo look ilustrado que el Episodio 2), con los personajes canónicos: Vale con blusa mostaza, Dani con camisa celeste, Camila con blusa morada, Mr. Reed con traje azul marino y cabello plateado.

## Lo que no se toca

- Guion, diálogos, traducciones, preguntas ni grabaciones.
- Voces, orden de escenas, glosario ni desbloqueos.
- Ningún otro episodio.

## Detalles técnicos

- Archivos afectados: solo imágenes en `src/assets/storybook/sharks-ep4-three-offices-one-team/` (s8.jpg como mínimo).
- Se conservan 768x768 px, JPG progresivo por debajo de 250 KB, sin texto ni logos en la imagen.
- Si cambia alguna imagen, se actualiza su `imageAlt` solo si deja de describir la escena.
- Verificación final: tests de historia de Sharks y comprobación de rutas.
