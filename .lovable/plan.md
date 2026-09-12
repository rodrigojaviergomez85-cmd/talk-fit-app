# Botón "Escuchar verbos -ed" con opción de detener (Paso 5 y Paso 4)

## Problema
En `src/components/fluency/EdReminder.tsx`, el botón "Listen to -ed verbs" reproduce todos los verbos en secuencia (con pausas de 250 ms) y queda **deshabilitado** mientras suena. El estudiante no puede detenerlo; si el día tiene muchos verbos, se siente eterno.

## Solución (solo `EdReminder.tsx`)
Convertir el botón en un interruptor reproducir/detener:

1. **Click mientras suena = detener**: en `playAll`, si `playing` es true, se pone `cancelled.current = true`, se llama `AudioService.stop()` y `setPlaying(false)`. El callback `onEnd` del audio en curso respeta `cancelled` y no continúa la cadena.
2. **Quitar `disabled={playing}`** para que el segundo click llegue.
3. **Estado visual al sonar**: icono `Square` (o `VolumeX`) en lugar de `Volume2` y texto nuevo bilingüe `ed.stopVerbs` ("Detener" / "Stop") con `aria-pressed` para accesibilidad.
4. **Textos nuevos** en `src/lib/i18n.tsx` (junto a `ed.listenVerbs`):
   - ES: "Detener"
   - EN: "Stop"
5. Al detener, el botón vuelve a su estado original y se puede volver a reproducir desde el principio.

## Alcance
- Aplica a Paso 5 y Paso 4 (ambos usan el mismo componente).
- Sin cambios de IA, límites, progresión ni otros pasos.

## Verificación
- `bunx tsc --noEmit` y suite Vitest.
- Prueba en navegador: abrir Paso 5 de un día con verbos -ed, dar play, detener a mitad, confirmar que el audio se calla de inmediato y se puede reiniciar.
