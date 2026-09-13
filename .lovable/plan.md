# Corregir el tono de piel de Vale en el Episodio 10

## Problema
En el Episodio 10 "Háblame de ti" (`vale-ep10`), Vale aparece con piel más oscura que su diseño oficial (cálido claro-canela) en varias escenas.

## Diagnóstico (confirmado con hoja de contacto)
Comparé las 11 imágenes del episodio contra la referencia oficial `_canon/vale.jpg`:

- **s1** (presentación frente al equipo): Vale visiblemente más oscura — el peor caso.
- **s2** (con Mr. Reyes): piel más oscura que la oficial.
- **s7** (junto al mapa de El Salvador): piel más oscura que la oficial.
- **s9** (frente al panel de fotos): piel más oscura que la oficial.
- Portada, s3, s6, s8 y s10: dentro de lo aceptable, se conservan.

## Solución
- Regenerar **s1, s2, s7 y s9** con edición sobre la imagen existente, usando `src/assets/storybook/_canon/vale.jpg` como referencia de personaje, para aclarar la piel de Vale al tono oficial sin cambiar composición, ropa (blusa mostaza), cabello negro largo ni fondo.
- Mantener intactos los demás personajes de cada escena (Mr. Reyes con barba gris y corbata en s2; el mapa con la etiqueta "EL SALVADOR" en s7).
- Sin cambios de código: se reemplazan solo los 4 archivos de imagen.

## Verificación
- Nueva hoja de contacto del episodio: comparar tono de piel de Vale en las 4 escenas corregidas contra `_canon/vale.jpg`.
- Abrir el episodio en la vista previa móvil y confirmar que las escenas se ven correctas.
