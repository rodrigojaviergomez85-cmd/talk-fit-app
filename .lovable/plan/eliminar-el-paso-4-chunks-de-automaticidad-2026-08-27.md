# Eliminar el paso 4 (chunks de automaticidad)

Quitar la Rep 4 —"Make these phrases automatic", la lista de chunks rápidos— del flujo de práctica. La sesión pasa de 10 a 9 repeticiones.

## Cambios en `src/routes/practice.tsx`

1. **Eliminar la rep del flujo**: quitar `case 3: return <Rep4 … />` del switch de `RepBody` y reindexar los casos siguientes (shadowing lento → 3, natural → 4, Rep7 → 5, Rep8 → 6, Rep9 → 7, Rep10 → 8).
2. **Borrar los componentes** `Rep4` y `ChunkRow` (solo se usan aquí).
3. **Actualizar títulos y totales**:
   - `REP_TITLES` pasa a 9 entradas: "REP 1 OF 9" … "REP 8 OF 9", "FINAL REP".
   - `RepProgress total={10}` → `total={9}`.
   - Resumen final: "10 / 10 REPS ✓" → "9 / 9 REPS ✓".
4. **Actualizar índices fijos**: las referencias al índice 9 de la rep final (`{ kind: "rep", index: 9 }` en AnalysisStage y `goToRep(9)` en QuickFixCard) pasan a índice 8.
5. **Limpieza de imports**: quitar los que queden sin uso tras borrar `ChunkRow` (p. ej. `Check`, `RepCheck` si no se usa en otra rep — se verifica).

## Lo que NO cambia

- `lesson.automaticityChunks` se mantiene en el modelo de datos y en la página Coach (se usa en "Natural speech chunks"); solo sale del flujo de práctica.
- Todo lo demás: corrección palabra por palabra en reps 3 y 7, análisis con IA en reps 9/10, Quick Fix, comparación y resumen funcionan igual, solo renumerados.

## Verificación

- `bunx tsgo --noEmit` sin errores.
- Recorrer el flujo en el preview: home → práctica → las 9 reps en orden → análisis → quick fix → rep final → resumen muestra "9 / 9".
