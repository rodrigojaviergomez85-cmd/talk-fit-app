# Quitar todo el feedback de corrección en Rep 2

## Objetivo
En el paso "Listen. Then copy." (Rep 2 del contador de 6, componente `Rep3`), eliminar por completo el feedback de corrección: ni veredicto (BIEN DICHO / CASI / INTÉNTALO OTRA VEZ), ni porcentaje, ni palabras subrayadas/rayadas. El usuario graba, puede escuchar su grabación y comparar con el modelo, y avanza sin recibir evaluación intermedia.

## Cambios

1. **`src/routes/practice.tsx`**
   - En el componente `Rep3`, quitar el estado `check` y la llamada a `checkRepetition`.
   - Quitar la renderización de `<RepFeedback>` en `Rep3`.
   - Mantener `myVoice` para que la comparación "Model vs my voice" siga funcionando.
   - El botón "NEXT" / "NEXT REP" sigue habilitado después de grabar.

2. **`src/components/fluency/RepFeedback.tsx`**
   - No requiere cambios; se sigue usando en `Rep7` y posibles usos futuros.

## Lo que no cambia
- Lógica de grabación, transcripción y comparación en `Rep3`.
- `Rep7` y `RepSeries` conservan su feedback actual.
- Navegación hacia adelante/atrás, límites de tiempo y flujo de completado del día.

## Verificación
- `bunx tsgo --noEmit` sin errores.
- En el preview, grabar en Rep 2 y confirmar que no aparece ningún banner de veredicto, porcentaje ni palabras subrayadas; sí aparece la comparación "Model vs my voice".
- Verificar que Rep 5 sigue mostrando el feedback completo.
