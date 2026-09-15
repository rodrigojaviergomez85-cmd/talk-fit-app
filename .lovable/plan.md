# El mundo de Vale abierto para todos + botón "Siguiente episodio"

## Qué cambia para el estudiante

1. Todos los episodios publicados (temporadas 1 a 8) quedan abiertos para cualquier estudiante, sin importar su nivel ni su avance en la ruta oficial.
2. Desaparece el tope de 2 episodios nuevos por día: pueden ver los que quieran.
3. Los episodios viejos ya no se vuelven a cerrar: la lista de Audiolibros muestra todas las temporadas y todos los episodios disponibles.
4. Al final de cada episodio, junto al botón "Atrás", aparece un botón naranja **"Siguiente episodio"** que lleva directo al episodio que sigue (incluso si es el primero de la siguiente temporada). Si es el último episodio publicado, en su lugar se muestra el aviso de "próximamente".
5. Se quita la pantalla de candado "Este episodio todavía está cerrado".

La ruta oficial de práctica (días, pasos 1 a 5, límites diarios de práctica) no cambia en nada: esto solo afecta la historia.

## Detalle técnico

- `src/services/storybook/seasons.ts`: `isSeasonUnlocked` y `isDayUnlocked` devuelven `true` para cualquier temporada/día que exista con episodio registrado; `unlockedDayInModule` devuelve el total de slots y `earliestUnlockedDayInModule` devuelve 1. Se conserva `EPISODE_LOOKBACK` y el resto de la numeración global para no romper llamadas existentes.
- `getNextEpisodeSlot` ya resuelve el salto entre temporadas; se usa tal cual y siempre vendrá `unlocked: true`. Se filtra para que solo devuelva episodios que realmente existen (slots con teaser pero sin episodio registrado no se ofrecen como "siguiente").
- `src/components/storybook/StorybookPlayer.tsx`: en la barra inferior, cuando el slide es `finale`, se agrega el botón "Siguiente episodio / Next episode" que navega a `/natural-method/cuento/$storyId` del siguiente episodio (reemplaza la vista sin cambiar de ruta padre, con `key` del episodio para reiniciar el reproductor y la posición guardada).
- `src/routes/natural-method.cuento.$storyId.tsx`: se elimina el bloque `locked` y el cálculo asociado.
- `src/routes/natural-method.audiobooks.tsx`: se quitan los cortes por temporada/día bloqueados para listar todo lo publicado.
- Tests: se actualiza `season-route-lock.test.ts` para reflejar la nueva política (todo abierto) en vez de borrarlo, y se agrega una prueba de que `getNextEpisodeSlot` encadena entre temporadas. Se corre Vitest y el chequeo de tipos.
