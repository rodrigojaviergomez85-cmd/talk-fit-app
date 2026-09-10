# Plan: Ejemplo + botón de traducción en la lista de verbos

## Qué vamos a agregar

En **Natural Method → Lista de verbos** (los 100 verbos comunes):

1. **Una oración de ejemplo** en presente simple debajo de cada verbo, con vocabulario cotidiano. Ejemplo: "I call my mom every Sunday."
2. **Botón de play** junto al ejemplo para escuchar la oración completa (voz del navegador, gratis, igual que los botones actuales).
3. **Botón "Traducir / Translate"** en cada tarjeta: al tocarlo, aparece la traducción al español de la oración; al tocarlo de nuevo, se oculta. La traducción ya viene escrita en los datos — no usa IA ni genera costos.

## Cambios

- `src/services/natural-method-verbs.ts`: agregar a cada uno de los 100 verbos los campos `example` (oración en presente) y `exampleEs` (traducción al español).
- `src/routes/natural-method.verbs.list.tsx`:
  - Mostrar la oración de ejemplo con su botón de play.
  - Botón de traducción (ícono de idiomas + texto) que muestra/oculta `exampleEs`, con estado local por tarjeta.
  - Incluir los ejemplos en el buscador para que también se puedan encontrar por palabras de la oración.

## No cambia

- Navegación, filtros (todos/irregulares/regulares), paginación de 10 en 10, botones de pronunciación de las tres formas, ni el resto de Natural Method.
- Sin llamadas a IA: traducciones incluidas en los datos.
