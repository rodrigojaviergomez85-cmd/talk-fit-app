# Tocar una frase para repetirla

Hoy, en los episodios con diálogo, solo se puede repetir la última frase que sonó. El estudiante que quiere volver a la frase 1 no tiene cómo hacerlo sin volver a reproducir toda la escena.

## Qué cambia

- Tocar cualquier frase del diálogo la reproduce **solo a ella** y se detiene al terminar.
- Si la escena está sonando, al tocar una frase se detiene lo que suena y se escucha únicamente la frase tocada.
- La frase tocada se resalta mientras suena, igual que ahora, y queda **marcada como posición actual**: al presionar de nuevo "ESCENA", el audio continúa desde la frase siguiente (es decir, sigue justo donde el estudiante se quedó, no desde el inicio). Para escuchar todo desde cero, el botón de la flecha circular ("repetir") siempre reinicia la escena completa.
- Tocar una palabra dentro de la frase sigue abriendo su significado (no se pierde esa función).
- El botoncito de bocina junto al nombre del personaje repite también solo esa frase, para que todo sea consistente.
- Nada cambia en los episodios narrados de las temporadas 1 a 5, ni en preguntas, grabaciones, voces o límites.

## Detalles técnicos

- `src/components/storybook/StorybookPlayer.tsx` (`DialogueScene`): agregar un modo de reproducción de una sola línea. La burbuja se vuelve interactiva (clic/tap en el área de la burbuja, con `role="button"` y etiqueta accesible bilingüe); los taps sobre palabras del glosario siguen manejándose como hoy y no disparan la reproducción de la frase.
- Al terminar la frase, se limpia el estado `playing` y se deja `activeLine` en esa frase para que el resaltado quede donde está leyendo el estudiante.
- Reusar `startDialogue` con un arreglo de una sola línea (o `singleLine: true` en las opciones de `dialogue-audio.ts`) para conservar la cancelación y el prefetch de caché de audio ya existentes.
- Mantener el comportamiento actual de "Seguir audio" y del autoscroll.

## Verificación

- Prueba unitaria del control de diálogo para una sola línea (se detiene y no continúa a la siguiente).
- Typecheck y suite completa de pruebas.
- Revisión en pantalla de 393 px en Eagles día 1: tocar la frase 1 estando en la 3, confirmar que suena solo la 1 y que tocar una palabra sigue abriendo su significado.
