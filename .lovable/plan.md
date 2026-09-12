# Plan: Ajustar velocidades del Paso 2

## Cambio solicitado
En el **Paso 2 · COPY** cambiar las velocidades del audio modelo de `0.5x, 0.75x, 0.9x` a `0.5x, 0.75x, 1x`, y dejar `1x` como velocidad por defecto. Las sílabas y el resto de la funcionalidad se mantienen intactas.

## Archivo y líneas a modificar
- `src/routes/practice.tsx`
  - Línea ~1449: `const REP2_SPEEDS = [0.5, 0.75, 0.9] as const;` → `[0.5, 0.75, 1] as const;`
  - Línea ~1484: `const [speed, setSpeed] = useState<number>(0.9);` → `useState<number>(1);`

## Verificación
- `bunx tsc --noEmit`
- Vitest suite existente
- Preview móvil en `/practice?day=2&module=simple-future`, Paso 2: comprobar botones `0.5x · 0.75x · 1x` y que `1x` esté activo por defecto.
