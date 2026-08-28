# Paso 6: detener audio y saltar a la rep que elijas

Hoy en el paso 6, al tocar ▶ en la tabla de reps el audio se reproduce hasta el final y no hay forma de pararlo; además solo se puede volver a una rep anterior con la flecha de retroceso, una por una.

## Qué se construye

- **Detener el audio**: el botón ▶ de cada rep se convierte en pausa/stop (■) mientras se reproduce. Tocarlo detiene esa grabación al instante. Solo suena una rep a la vez: al reproducir otra, la anterior se detiene.
- **Ir a la rep que elijas**: cada columna de la tabla gana un botón para saltar a esa rep (por ejemplo "IR" / "GO"). Al tocarlo, el paso 6 pasa a esa rep, mostrando su grabación guardada si la tiene (con LISTEN / TRY AGAIN / NEXT) o el botón START si está pendiente.
- La rep activa se resalta en la tabla para que se vea dónde estás.
- Se puede ir tanto hacia atrás como hacia adelante, pero solo a reps ya hechas o a la siguiente pendiente inmediata, para no saltarse grabaciones.
- Textos bilingües con el toggle de español existente (IR / GO, DETENER / STOP).

## Detalles técnicos

- `src/components/fluency/RepSeriesRow.tsx`: estado `playingRep` para alternar ▶/■ con un único `Audio`; se detiene en `onEnded` y al desmontar. Nuevos props opcionales `current?: number` y `onSelect?: (n: number) => void` para el botón de salto y el resaltado.
- `src/routes/practice.tsx` (`RepSeries`): pasar `current={repNumber}` y `onSelect={goToRep}` a `RepSeriesRow`; `goToRep` ya restaura la grabación guardada. Sin cambios en grabación, límite de 30 s, borrado ni paso a la rep final.
