Agregar botón de velocidad normal 1.0× al paso 3 (Shadowing)

Cambios en `src/routes/practice.tsx`:

1. En el componente `Rep3Shadow`, ampliar el selector de velocidad para incluir `1.0`:
   - Opciones: `0.5×`, `0.75×`, `1.0×`.
   - Velocidad inicial sigue en `0.75`.
   - Etiqueta del botón `1.0x` (o `1x`) con el mismo estilo de los existentes.

2. Ajustar la guía visible para que el usuario sepa que `1.0×` es velocidad normal:
   - Inglés: opcional añadir una nota corta como "0.5× / 0.75× = slow · 1.0× = normal".
   - Español: nota corta como "0.5× / 0.75× = lento · 1.0× = normal".
   - Se puede agregar debajo de los botones como texto secundario, sin cambiar la instrucción principal "Read along with the model." / "Lee a la par del modelo."

3. Verificar que el reproductor del modelo (`AudioPlayer` con `rate={speed}`) responde a la selección de 1.0× y que el subtítulo o estado refleje la velocidad activa.

4. Typecheck y carga de `/practice?day=1` en el paso 3.
