# Hacer legible el botón de Interview Simulator en la barra inferior

## Objetivo
El botón actual del menú inferior dice "ENTREV" / "INTERV" y los estudiantes no lo entienden. Se cambiará para que se lea claramente como "Simulador de entrevistas" / "Interview simulator" usando dos líneas de texto, sin aumentar el número de ítems del menú.

## Cambios propuestos

1. **Etiqueta dividida en dos líneas solo para el botón de entrevistas**
   - Línea 1: "SIMULADOR" / "SIMULATOR"
   - Línea 2: "ENTREVISTA" / "INTERVIEW"
   - Esto se lee completo y aprovecha mejor el ancho reducido de un botón de 6 ítems.

2. **Ajustar el render de `BottomNav.tsx`**
   - Permitir que un ítem defina una etiqueta secundaria (`line2`).
   - Si existe `line2`, mostrar ambas líneas centradas, con tipografía ligeramente más grande y espaciado ajustado.
   - Los otros 5 botones siguen con una sola línea para no perder espacio.

3. **Conservar comportamiento existente**
   - Mismas rutas, íconos, estado activo, accesibilidad (`aria-label` con la frase completa) y estilos de color.
   - No se elimina ningún botón del menú inferior.

## Notas técnicas

- Archivos a modificar:
  - `src/components/fluency/BottomNav.tsx` (render de dos líneas y estructura de `ITEMS`).
  - `src/lib/i18n.tsx` (agregar `nav.interviewLine1` y `nav.interviewLine2`).
- Se validará en vista móvil (≤ 393 px de ancho) que las 6 etiquetas caben en una sola fila y que el texto se lee sin cortarse.
- Se correrán `tsc --noEmit` y las pruebas de Vitest antes de entregar.
