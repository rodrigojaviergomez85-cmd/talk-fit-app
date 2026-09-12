# Clarificar que las tomas 4 y 5 del Paso 5 son opcionales

## Problema
Muchos estudiantes graban las tomas 4 y 5 del Paso 5 sin darse cuenta de que son opcionales. El badge "OPCIONAL" actual es pequeño y no se entiende que pueden terminar la práctica tras completar las 3 tomas obligatorias.

## Solución
Hacer la distinción obligatorio/opcional evidente en el Paso 5 sin cambiar la lógica de grabación, límites ni progresión.

### Cambios en la UI del Paso 5

1. **Header del Paso 5 con resumen de tomas**
   - Añadir debajo del título una línea bilingüe:
     - ES: "3 tomas obligatorias · 2 extras opcionales"
     - EN: "3 required takes · 2 optional extras"
   - Reutilizar chips/estilos existentes para no romper el diseño.

2. **Renombrar visualmente las tomas 4 y 5**
   - En lugar de "AUDIO 4" / "AUDIO 5", mostrar:
     - ES: "EXTRA 1 (opcional)" / "EXTRA 2 (opcional)"
     - EN: "EXTRA 1 (optional)" / "EXTRA 2 (optional)"
   - Las tomas 1–3 conservan su numeración actual.

3. **Diferenciar el estilo de las tarjetas opcionales**
   - Borde punteado (`border-dashed`) y fondo más apagado para tomas 4 y 5.
   - Badge "OPCIONAL" con mayor contraste y tamaño legible.

4. **Mensaje de "ya puedes terminar" tras 3 tomas**
   - Cuando `completed >= required`, mostrar un banner prominente encima del botón principal:
     - ES: "¡Listo! Ya completaste las 3 tomas obligatorias. Puedes terminar la práctica ahora o grabar 2 tomas extra para practicar más."
     - EN: "Done! You've completed the 3 required takes. You can finish now or record 2 extra takes for more practice."
   - El botón principal cambia a:
     - ES: "TERMINAR PRÁCTICA AHORA"
     - EN: "FINISH PRACTICE NOW"
   - Mantener la opción de grabar extras como acción secundaria clara.

5. **Texto de "record another take" más claro**
   - Reemplazar "Or record another take above" por:
     - ES: "¿Quieres más práctica? Graba una toma extra arriba."
     - EN: "Want more practice? Record an extra take above."

6. **Estado vacío de tomas opcionales**
   - En la tarjeta vacía de toma 4 y 5, mostrar texto orientador:
     - ES: "Toca grabar solo si quieres más práctica."
     - EN: "Tap record only if you want more practice."

### Archivos a modificar

- `src/components/fluency/TakeBoard.tsx`: estilos de tarjetas opcionales, renombrado de labels, mensaje de toma vacía.
- `src/routes/practice.tsx`: header del Paso 5 con resumen de tomas, banner "ya puedes terminar", CTA principal renombrado.
- `src/lib/i18n.tsx`: nuevas claves de traducción para todos los textos bilingües.

### Qué NO cambia

- `TAKE_COUNT = 5`, `REQUIRED_TAKES = 3`, lógica de `optional`, `finalIndex`, progresión ni límites.
- No se eliminan ni deshabilitan las tomas 4 y 5.
- No se modifica el comportamiento de grabación, AI Coach ni Final Audio Coach.

### Verificación

- `bunx tsc --noEmit` sin errores.
- Suite de tests existente pasa.
- Revisión visual en móvil: las 5 tarjetas caben, las opcionales se distinguen claramente, y tras 3 tomas aparece el banner de terminación.
