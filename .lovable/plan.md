# Bloquear la historia de Vale según la ruta oficial

Hoy la historia se puede adelantar. Cada temporada calcula su candado con los días completados **de esa misma temporada**, así que alguien que va en Basic Zero puede abrir el episodio 1 de la Temporada 5. Además, la página del cuento (`/natural-method/cuento/...`) no revisa ningún candado: con el enlace directo se abre cualquier episodio.

## Regla nueva

1. **Temporadas adelantadas: cerradas.** Si el módulo del curso todavía no está abierto en la ruta oficial, todos sus episodios quedan con candado.
2. **Temporada actual: solo hasta donde vas.** Se abren los episodios hasta el día que el alumno ya alcanzó en ese módulo (incluye los días anteriores cuando eligió empezar en la semana 2, 3 o 4).
3. **Hacia atrás: todo abierto.** Los módulos ya terminados o que quedaron atrás muestran sus 20 episodios para repasar cuando quiera.
4. **Cuentas internas / ilimitadas:** siguen viendo todo, sin cambios.

## Qué verá el alumno

- En el mapa de temporadas, las temporadas futuras aparecen cerradas con un mensaje como "Se abre cuando llegues a este módulo en tu ruta".
- Los episodios del futuro dentro de su temporada siguen mostrando el candado actual.
- Si entra por un enlace directo a un episodio bloqueado, ve una pantalla amable en español/inglés que explica el motivo y un botón para volver a la lista de episodios y a su práctica del día.
- El botón "siguiente episodio" al final de un cuento respeta la misma regla.

## Detalles técnicos

- `src/services/storybook/seasons.ts`: `isDayUnlocked` primero valida `JourneyService.isModuleUnlocked(state, moduleId)`; el tope de día pasa a ser `max(JourneyService.currentDay(state, moduleId), completedDaysInModule + 1)`, y si el módulo ya está completo se abren todos los días. `getNextEpisodeSlot` hereda la regla al cruzar de temporada.
- `src/routes/natural-method.audiobooks.tsx`: el mapa de temporadas usa el nuevo estado para pintar temporada bloqueada (cabecera con candado, sin lista de episodios abiertos).
- `src/routes/natural-method.cuento.$storyId.tsx`: nueva verificación en el componente; si el episodio tiene slot y está bloqueado, renderiza la pantalla de "episodio bloqueado" en vez del reproductor.
- Pruebas en `src/services/storybook/seasons.test.ts`: temporada futura cerrada, temporada pasada abierta completa, temporada actual abierta solo hasta el día alcanzado, cuenta ilimitada sin candados.
- No se toca contenido, voces, arte ni el orden de los episodios.
