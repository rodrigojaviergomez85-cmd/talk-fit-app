# Rep 5: mover tarjeta de instrucción arriba del ejemplo

## Qué cambia

En Rep 5/5, la tarjeta naranja de instrucciones (`ANSWER THE QUESTION:` con la pregunta, conectores y meta) debe aparecer **antes** del ejemplo de audio modelo (`Want to hear how it should sound? / Listen to example`).

Actualmente el orden es:
1. Título del rep
2. Ejemplo de audio modelo
3. Meta de segundos
4. Tarjeta naranja de instrucción
5. TakeBoard

Nuevo orden:
1. Título del rep
2. Tarjeta naranja de instrucción
3. Ejemplo de audio modelo
4. Meta de segundos
5. TakeBoard

## Detalle técnico

- En `src/routes/practice.tsx`, dentro del render del paso Rep 5, reordenar los bloques JSX para que la tarjeta `rep5Prompt` aparezca antes del bloque `day.modelExample`.
- No se cambian textos ni datos; solo el orden visual.
- Verificación: typecheck y screenshot de Rep 5 en móvil.
