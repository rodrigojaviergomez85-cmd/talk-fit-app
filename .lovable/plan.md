# Plan: Ajustar audio del Paso 2

## Cambios solicitados
1. **Velocidades del audio modelo en Paso 2 · COPY**: de `0.5x, 0.75x, 0.9x` a `0.5x, 0.75x, 1x`, con `1x` como velocidad por defecto.
2. **Palabra individual en Paso 2**: al tocar una palabra, solo reproducirla a `0.5x` y `0.75x`; eliminar el desglose silábico y el botón `1x`.

## Archivos y líneas a modificar

### `src/routes/practice.tsx`
- Línea ~1449: `const REP2_SPEEDS = [0.5, 0.75, 0.9] as const;` → `[0.5, 0.75, 1] as const;`
- Línea ~1484: `const [speed, setSpeed] = useState<number>(0.9);` → `useState<number>(1);`

### `src/components/fluency/TappableSentence.tsx`
- Al tocar una palabra, reproducirla a `0.75x` (o el valor medio) en lugar de `0.8x`.
- Reemplazar el panel de sílabas por un panel compacto con dos botones:
  - `0.5x`
  - `0.75x`
- Eliminar el botón `1x` y todo el mapeo/botones de sílabas.
- Actualizar la etiqueta superior a algo como "Pronuncia más lento / Slow pronunciation".

## Verificación
- `bunx tsc --noEmit`
- Suite de Vitest
- Preview móvil en `/practice?day=2&module=simple-future`, Paso 2:
  - Comprobar botones de velocidad `0.5x · 0.75x · 1x` y que `1x` esté activo por defecto.
  - Tocar una palabra y confirmar que solo aparecen `0.5x` y `0.75x`, sin sílabas.
