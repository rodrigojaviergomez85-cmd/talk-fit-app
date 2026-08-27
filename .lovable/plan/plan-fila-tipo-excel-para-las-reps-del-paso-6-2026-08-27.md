# Plan: Fila tipo Excel para las reps del paso 6

## Resumen
En el paso 6 ("Talk about YOUR life") se graban 5 reps cortas. Se mostrará una fila estilo Excel con: número de rep, duración y estado (hecho/pendiente). Se verá durante la serie y también al finalizar.

## Diseño
- Componente nuevo `RepSeriesRow` dentro de `src/routes/practice.tsx` (o en `src/components/fluency/` si se prefiere reutilizable).
- Apariencia: tarjeta horizontal con columnas delimitadas por líneas verticales sutiles, tipografía monoespaciada/tabular, fondo `bg-card`.
- Encabezados de columna: REP, TIME, STATUS.
- Cada celda de datos muestra una rep. Las pendientes muestran guiones o texto atenuado.
- Estado: "DONE" / "—" con badge verde cuando está completo.
- Versión en español de los encabezados y estados controlada por `useSpanishAll`.

## Cambios técnicos
1. Estado en `RepSeries`:
   - Agregar `completedReps: { number: number; duration: number; status: "done" | "pending" }[]`.
   - Al terminar una grabación, agregar/actualizar la entrada correspondiente antes de avanzar al siguiente rep.
2. `VoiceRecorder` ya devuelve `Recording` con `duration`; usaremos ese valor.
3. Renderizar `RepSeriesRow`:
   - Arriba del botón START para que se vea durante la serie.
   - También se mantiene visible en el resumen final si aplica.
4. Ajustes de estilo mobile-first:
   - Scroll horizontal si no caben 5 columnas en pantallas muy pequeñas.
   - Columnas de igual ancho, texto centrado.
5. No se modifica la lógica de grabación, análisis ni navegación; solo se añade visualización de historial.

## Verificación
- `bunx tsgo --noEmit -p tsconfig.json` sin errores.
- Previsualización en `/practice`: la fila aparece vacía al inicio del paso 6 y se llena celda por celda tras cada rep.
