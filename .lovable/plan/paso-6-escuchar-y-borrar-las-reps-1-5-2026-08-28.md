# Paso 6: escuchar y borrar las reps 1–5

Hoy el paso 6 solo guarda la grabación de la rep actual: al pasar a la siguiente, el audio anterior se pierde y la tabla tipo Excel solo muestra número, tiempo y estado. La idea es guardar las 5 grabaciones y poder reproducirlas o borrarlas desde esa tabla.

## Qué se construye

- Guardar la grabación de cada rep (1 a 5) durante todo el paso 6.
- En la tabla de reps, cada rep completada muestra dos acciones:
  - Reproducir (▶) para escuchar esa grabación.
  - Borrar (papelera) para eliminarla.
- Al borrar: la rep vuelve a "pendiente" (tiempo `—`), y si era la rep en curso, el bloque de reproducción/TRY AGAIN desaparece para volver a grabarla.
- Al volver atrás con el botón de retroceso, la grabación guardada de esa rep se vuelve a mostrar en lugar de perderse.
- La grabación que se envía a la rep final sigue siendo la de la rep 5.
- Textos bilingües: ESCUCHAR / LISTEN y BORRAR / DELETE con el toggle de español existente.

## Detalles técnicos

- `src/components/fluency/RepSeriesRow.tsx`: `SeriesRep` gana `url?: string`; se añade una fila de acciones con botones play/borrar y callbacks opcionales `onPlay` / `onDelete`. Reproducción con un único `Audio` interno para no solapar audios.
- `src/routes/practice.tsx` (`RepSeries`): `completedReps` guarda también la URL de cada grabación; `markRep` se ajusta; al navegar entre reps se restaura la grabación guardada de esa rep; `onDelete` limpia la entrada y el estado local si aplica.
- Sin cambios en la lógica de grabación, límite de 30 s, análisis final ni navegación entre pasos.
