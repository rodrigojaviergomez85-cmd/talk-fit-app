# Ajuste puntual: Sharks Episodio 5 - "your teachers" → "your students"

## Problema
En `src/services/storybook/sharks-ep5-counter-offer.ts`, Camila dice:

> "Fifteen percent lower, and **your teachers** keep the same training hours we promised before."

Como Vale dirige una academia de inglés con estudiantes (no profesores contratados por Houston), la lógica del diálogo debe ser:

> "...and **your students** keep the same training hours we promised before."

## Cambio a realizar
1. Reemplazar `"your teachers"` por `"your students"` en la línea correspondiente de `sharks-ep5-counter-offer.ts`.
2. Revisar la misma escena y el resto del episodio para asegurar que no haya otra referencia inconsistente a "teachers" donde debería ser "students".
3. Ejecutar los tests del storybook y comprobar TypeScript para evitar regresiones.

## Criterio de aceptación
- El diálogo en Sharks Episodio 5 dice "your students".
- No se rompe ningún test ni el build.
