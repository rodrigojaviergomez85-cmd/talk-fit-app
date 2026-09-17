# Plan: Animación de boca más natural en el avatar del Coach en vivo

## Problema
El avatar vectorial ya no salta entre retratos, pero la boca se abre demasiado al hablar y se ve artificial.

## Cambios

### 1. Reducir la apertura máxima
- En los tres assets de boca (`vale-mouth-small.webp`, `vale-mouth-medium.webp`, `vale-mouth-open.webp`) la boca "open" es demasiado grande. Regenerar el frame `open` con una apertura más moderada (~60% de la actual), alineada a la misma región del rostro.

### 2. Suavizar el mapeo volumen → boca
- En `CoachAvatar.tsx`: bajar la ganancia del envelope normalizado y subir los umbrales para que el frame `open` solo aparezca en picos reales de voz; la mayor parte del habla usará `small` y `medium`.
- Añadir histéresis/suavizado temporal (promedio móvil corto, ~3 frames) para que la boca no parpadee entre frames en sílabas rápidas.

### 3. Verificación
- `bunx tsgo --noEmit` sin errores.
- Simulación visual de los frames compuestos (guía de clip) para confirmar alineación.
- Captura móvil 440×807 del panel del coach en reposo.
- La prueba final de naturalidad requiere sesión de voz en el iPhone del usuario.

## No se toca
Lógica de Gemini Live, límites diarios, feedback final, resampling de micrófono.
