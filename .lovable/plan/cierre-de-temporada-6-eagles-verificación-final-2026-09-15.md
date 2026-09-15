# Cierre de Temporada 6 (Eagles) — verificación final

## Estado ya confirmado (double check hecho)
- 20/20 episodios registrados y alineados a los días 1–20 del módulo Eagles.
- 48 pruebas del cuento interactivo pasan (11 archivos).
- 220 ilustraciones (portada + 10 escenas por episodio), todas 768×768 JPG y ninguna pesa más de 250 KB.
- Glosario al 100%: todas las palabras tocables de los episodios 11–20 tienen significado en español.
- Episodio 17 escena 8 corregida (clase de sábado de Vale), episodio 20 corregido ("airplane").

## Trabajo pendiente en este plan
1. **Corregir el aviso de hidratación en el reproductor** (`StorybookPlayer.tsx`): la barra de progreso muestra valores distintos entre servidor y cliente al cargar un episodio ya avanzado. Ajuste para que el estado inicial se lea solo después de hidratar.
2. **Revisión visual final (tercer check)**: comparar lado a lado en un teléfono simulado los episodios 11–20 contra el canon de personajes (Vale, Dani, Camila, Mom, Morgan) y confirmar anatomía, tono de piel, ropa y ausencia de texto en las imágenes.
3. **Verificación final**: TypeScript sin errores, suite de pruebas completa, y la vista previa respondiendo correctamente en cada episodio de la temporada 6.
4. Actualizar el roadmap con la temporada cerrada.

## Detalles técnicos
- Sin cambios de contenido: guiones, voces y currículo quedan como están.
- El punto 2 usa capturas automáticas con Playwright en viewport móvil.
