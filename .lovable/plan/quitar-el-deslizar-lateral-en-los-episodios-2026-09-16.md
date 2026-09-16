# Quitar el deslizar lateral en los episodios

Hoy, en cualquier episodio de El Mundo de Vale, deslizar el dedo a la izquierda o a la derecha cambia de página. Eso provoca cambios de página accidentales mientras se lee o se baja por la pantalla.

## Cambio

- Eliminar el gesto de deslizar horizontal en todos los episodios (todas las temporadas usan el mismo reproductor, así que el cambio aplica a los 100+ episodios de una sola vez).
- Mantener el desplazamiento vertical normal (subir y bajar) tal como está.
- Las páginas se seguirán pasando con los botones de avanzar/retroceder y tocando la pantalla, igual que ahora.
- Actualizar el texto de ayuda que dice "Desliza o toca para pasar la página" para que diga solo "Toca para pasar la página" (y su versión en inglés).

## Detalle técnico

En `src/components/storybook/StorybookPlayer.tsx`: quitar los manejadores `onTouchStart`/`onTouchEnd` del contenedor de la página y la referencia `touchX`, y ajustar el texto bilingüe de la línea de ayuda. No se tocan audio, grabaciones, preguntas ni el resto del flujo.
