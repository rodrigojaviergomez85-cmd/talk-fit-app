# Quitar el subrayado de palabras buenas/malas en Rep 2

## Objetivo
En el paso "Listen. Then copy." (Rep 2 del contador de 6, componente `Rep3`), eliminar el feedback visual que subraya/raya palabras como buenas o malas. Se conserva el veredicto general (BIEN DICHO / CASI / INTÉNTALO OTRA VEZ), el porcentaje y el botón de repetir; también se conserva la comparación "Model vs my voice".

## Cambios

1. **`src/components/fluency/RepFeedback.tsx`**
   - Agregar prop opcional `showWords?: boolean` (default `true`).
   - Cuando `showWords` sea `false`, no renderizar el bloque de palabras coloreadas/tachadas ni la línea "Palabras de más".
   - Mantener el banner de veredicto, el porcentaje y el botón `INTENTAR OTRA VEZ`.

2. **`src/routes/practice.tsx`**
   - En el componente `Rep3`, pasar `showWords={false}` a `<RepFeedback>`.
   - No modificar `Rep7` ni ningún otro paso: ellos siguen mostrando el desglose palabra por palabra.

## Lo que no cambia
- Lógica de grabación, transcripción y comparación en `Rep3`.
- Componente `RepFeedback` en `Rep7` y cualquier otro uso futuro.
- Navegación hacia adelante/atrás, límites de tiempo y flujo de completado del día.

## Verificación
- `bunx tsgo --noEmit` sin errores.
- En el preview, grabar en Rep 2 y confirmar que aparece el veredicto y el porcentaje, pero no las palabras subrayadas/rayadas.
- Verificar que Rep 5 sigue mostrando el desglose palabra por palabra.
