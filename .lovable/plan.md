Mover controles de velocidad del paso 4 al paso 3

Reorganizar los botones de velocidad en `src/routes/practice.tsx`:

1. **Paso 3 (Slow shadowing, `case 2`)**
   - Agregar botones de velocidad `speeds={[0.5, 0.75]}`.
   - Establecer velocidad inicial en `0.75` (dentro de las opciones permitidas).
   - Cambiar la nota guía para reflejar que ahora hay botones de velocidad:
     - Inglés: `"Tap 0.5× or 0.75× to slow the model."`
     - Español: `"Toca 0.5× o 0.75× para poner el modelo más lento."`
   - Conservar el heading "Slow shadowing" y la instrucción "Read along with the model" / "Lee a la par del modelo".

2. **Paso 4 (Natural speed, `case 3`)**
   - Quitar la prop `speeds` para que no haya botones de velocidad.
   - Dejar velocidad fija en `1x` (`rate={1}`).
   - Actualizar la nota para quitar la referencia a tocar velocidades; usar una guía de ritmo natural:
     - Inglés: `"Match the model's natural rhythm and flow."`
     - Español: `"Iguala el ritmo y fluidez naturales del modelo."`
   - Conservar heading "Natural speed" e instrucción "Now match natural English." / "Ahora iguala el inglés natural."

3. Verificar typecheck y ruta `/practice` tras el cambio.
