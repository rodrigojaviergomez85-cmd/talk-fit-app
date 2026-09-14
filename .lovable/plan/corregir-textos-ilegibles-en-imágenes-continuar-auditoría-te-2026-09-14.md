# Corregir textos ilegibles en imágenes + continuar auditoría Temporada 3

## Problema
En Temporada 3 Episodio 3, la escena de "Ana shows the rules" muestra una pizarra con texto inventado/ilegible ("Dow anle Sane", "Bge. Warlcie"). La regla general es "sin texto en las imágenes", pero aquí el texto ES el contenido pedagógico: las reglas de la oficina deben leerse en inglés real.

## Cambios

### 1. Regenerar `vale-s3-ep3/s2.jpg` con reglas legibles
- Pizarra/blanco con reglas reales en inglés, escritas correctamente:
  - "OFFICE RULES"
  - "Don't eat at our desks."
  - "Arrive early."
  - "Don't use phones during calls."
- Usar el modelo de generación de mayor calidad (premium), que es el adecuado para texto legible.
- Mantener estilo webtoon 2D, personajes canónicos (Ana/Vale y Luis), fondo beige cálido.

### 2. Regenerar `vale-s3-ep3/s7.jpg` (ya marcada)
- Manos del equipo amontonadas/confusas; rehacer con anatomía clara.

### 3. Revisar el resto de la Temporada 3 (episodios 6–20)
- Completar la auditoría visual pendiente: anatomía (brazos/manos), identidad/piel/pelo de personajes, y **cualquier texto dentro de imágenes**:
  - Texto inventado/ilegible → regenerar sin texto, salvo que el texto sea el contenido de la escena (como la pizarra de reglas), en cuyo caso se regenera con inglés correcto y legible.
- Regenerar solo las imágenes claramente defectuosas, usando referencias canónicas.
- Comprimir todo a 768×768, menos de 250 KB por imagen.

### 4. Verificación
- Pruebas del storybook y TypeScript pasando.
- Revisión visual de las imágenes regeneradas.

## Detalles técnicos
- Archivos: `src/assets/storybook/vale-s3-ep*/` (solo imágenes; no se tocan scripts, voces ni preguntas).
- Herramienta de imagen: calidad premium para imágenes con texto; estándar para las demás.
- Temporadas 1, 2, 4, 5 y Eagles: sin cambios.
