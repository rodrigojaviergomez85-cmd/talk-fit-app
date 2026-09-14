# Corregir textos ilegibles + consistencia de Luis + auditoría Temporada 3

## Problemas
1. En Temporada 3 Episodio 3, la escena "Ana shows the rules" muestra una pizarra con texto inventado/ilegible ("Dow anle Sane", "Bge. Warlcie"). El texto ES el contenido pedagógico: las reglas deben leerse en inglés real.
2. Luis no es consistente: en unas imágenes parece un niño y en otras cambia totalmente de apariencia.
3. Auditoría de anatomía/identidad pendiente en episodios 6–20.

## Cambios

### 1. Regenerar `vale-s3-ep3/s2.jpg` con reglas legibles
- Pizarra con reglas reales en inglés correcto:
  - "OFFICE RULES"
  - "Don't eat at our desks."
  - "Arrive early."
  - "Don't use phones during calls."
- Usar calidad premium (adecuada para texto legible).
- Mantener estilo webtoon 2D, personajes canónicos (Ana/Vale y Luis), fondo beige cálido.

### 2. Regenerar `vale-s3-ep3/s7.jpg` (ya marcada)
- Manos del equipo amontonadas/confusas; rehacer con anatomía clara.

### 3. Consistencia de Luis en toda la Temporada 3
- Revisar cada aparición de Luis en los 20 episodios.
- Regenerar las imágenes donde parezca un niño o cambie de cara/pelo/piel/ropa.
- Cada regeneración usa la referencia canónica de Luis: joven adulto (18–20), no niño, con sus rasgos y ropa oficiales según `STYLE.md` y la hoja de referencia.

### 4. Revisar el resto de la Temporada 3 (episodios 6–20)
- Completar la auditoría visual: anatomía (brazos/manos), identidad/piel/pelo de todos los personajes, y **cualquier texto dentro de imágenes**:
  - Texto inventado/ilegible → regenerar sin texto, salvo que el texto sea el contenido de la escena (como la pizarra de reglas), en cuyo caso se regenera con inglés correcto y legible.
- Regenerar solo las imágenes claramente defectuosas, usando referencias canónicas.
- Comprimir todo a 768×768, menos de 250 KB por imagen.

### 5. Verificación
- Pruebas del storybook y TypeScript pasando.
- Revisión visual de las imágenes regeneradas.

## Detalles técnicos
- Archivos: `src/assets/storybook/vale-s3-ep*/` (solo imágenes; no se tocan scripts, voces ni preguntas).
- Herramienta de imagen: calidad premium para imágenes con texto; estándar para las demás.
- Temporadas 1, 2, 4, 5 y Eagles: sin cambios.
