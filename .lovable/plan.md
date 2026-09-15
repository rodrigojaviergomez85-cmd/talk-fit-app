# Temporada 8 (Sharks) Episodio 1 — Dani y Camila consistentes

## Problema

1. En la escena 5 el diálogo lo dice "Mateo", pero ahí debe ser **Dani**. Mateo también aparece en la escena 2 del mismo episodio.
2. Dani y Camila no se ven como en las temporadas anteriores: en la ilustración de la escena 5 aparecen dos personas que no coinciden con los personajes canónicos (Dani debe ser joven salvadoreño de pelo negro corto y rizado, piel medio-morena clara, camisa celeste; Camila con su look canónico de temporadas 6–7).

## Qué haría

1. **Cambiar el hablante**: las dos líneas de Mateo (escenas 2 y 5) pasan a Dani, ajustando el texto en inglés y español solo lo necesario para que suene natural en boca de Dani. Mateo queda fuera del episodio.
2. **Voz**: verificar que Dani use su voz masculina canónica en esas líneas (sin crear voces nuevas).
3. **Arte**: regenerar las ilustraciones donde Dani o Camila estén fuera de personaje, empezando por la escena 5 (el hombre de la laptop debe ser Dani canónico y la mujer, Camila canónica). Revisar las 12 imágenes del episodio (portada + 11 escenas) y corregir solo las que estén mal, conservando composición, fondo y props.
4. **Textos de apoyo**: actualizar las descripciones de escena que mencionan a Mateo.
5. **Consistencia**: agregar comprobaciones de reparto canónico para Sharks (solo Vale, Dani, Camila, Reed, Don Tito, narrador) similares a las de Tigers.
6. **Validar**: normalizar imágenes a 768×768 y menos de 250 KB, correr las pruebas del cuento y TypeScript, y verificar la ruta del episodio.

## Detalles técnicos

- Script: `src/services/storybook/sharks-ep1-tell-the-story.ts` (líneas 73 y 125).
- Arte: `src/assets/storybook/sharks-ep1-tell-the-story/*.jpg`.
- Pruebas: nuevo bloque de reparto canónico en la suite de consistencia de storybook.
- Ruta a verificar: `/natural-method/cuento/sharks-ep1-tell-the-story`.
