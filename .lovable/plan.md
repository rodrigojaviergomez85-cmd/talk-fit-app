Renombrar paso 4 a "Normal speed" / "Velocidad normal"

Cambiar únicamente el heading visible del paso 4 en `src/routes/practice.tsx`:

- Inglés: de `"Natural speed"` a `"Normal speed"`.
- Español: de `"Velocidad natural"` (actual) a `"Velocidad normal"`.

El comportamiento se mantiene exactamente igual:
- Velocidad del modelo fija a `1×` (velocidad natural/normal).
- Sin botones de velocidad.
- El usuario hace shadowing junto al modelo.
- Instrucciones, notas y demás pasos no se modifican.

Verificar typecheck y ruta `/practice` tras el cambio.
