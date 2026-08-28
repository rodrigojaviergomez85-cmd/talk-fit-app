# Botón para saltar pasos hacia adelante en /practice

## Qué se va a hacer

Agregar una flecha "siguiente" (ChevronRight) en el header de práctica, espejo de la flecha "atrás" que ya existe.

## Cambios

1. **`src/components/fluency/RepProgress.tsx`**
   - Nueva prop opcional `onNext`.
   - Nuevo botón redondo con `ChevronRight` junto al botón Exit (mismo estilo que el botón de atrás; deshabilitado/atenuado cuando no hay `onNext`).

2. **`src/routes/practice.tsx`**
   - Nuevo `handleForward`:
     - Si el paso actual tiene sub-pasos internos (paso 2: frase por frase; paso 6: rep por rep), la flecha avanza al siguiente sub-paso usando un `forwardRef` igual al `backRef` existente. En el paso 6 solo permite avanzar a reps completadas o la siguiente pendiente (sin saltarse grabaciones).
     - Si no, avanza al siguiente paso (`goToRep(stage.index + 1)`), hasta el último.
   - La flecha se oculta/deshabilita en la pantalla final de celebración.
   - Los pasos 2 (chunks) y 6 (RepSeries) registran su acción de avance interno en `forwardRef`, igual que ya hacen con `backRef`.

## Comportamiento resultante

- Header: `←` (atrás) | título | `→` (adelante) + Exit.
- Saltar hacia adelante no graba ni valida nada; es solo navegación, igual que la flecha de atrás.
- Nada cambia en grabación, límites de 30 s, racha, ni pantalla de celebración.
