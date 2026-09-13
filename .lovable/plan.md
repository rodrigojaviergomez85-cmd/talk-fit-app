# Botón atrás del cuento: retroceder escena por escena

## Problema
La flecha de atrás (arriba a la izquierda) siempre sale al menú de Método (Audiolibros), así que si el estudiante la toca en medio del episodio pierde el avance y lo saca del cuento.

## Cambio
En el reproductor del cuento (StorybookPlayer):

- La flecha atrás ya no es un enlace directo al menú. Ahora:
  - **Si estás en cualquier escena después de la portada** → te lleva a la **escena anterior** (mismo comportamiento que el gesto de deslizar hacia la derecha).
  - **Si estás en la primera pantalla (la portada)** → ahí sí te lleva al **menú de Método Natural / Audiolibros**.
- Al retroceder se detiene cualquier audio en curso (ya sucede al cambiar de escena), para que no suene el audio de la escena anterior encima.

Así el botón hace lo que el estudiante espera: "regresar" dentro del cuento, no "salir" del cuento. Para salir en medio del episodio sigue estando la portada (una vez atrás) y la navegación de abajo.

## Detalles técnicos
- En `StorybookPlayer.tsx`: reemplazar el `Link` del header por un `button` que haga `idx > 0 ? go(idx - 1) : navigate("/natural-method/audiobooks")` (con `useNavigate`).
- Etiqueta accesible bilingüe actualizada ("Atrás / Escena anterior").
- Verificación: typecheck + prueba móvil con Playwright: abrir episodio, avanzar 2 escenas, dar atrás dos veces (debe quedar en portada, no salir al menú), dar atrás una tercera vez (ahí sí debe ir a Audiolibros).
