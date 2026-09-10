# Plan: Audiolibros en Natural Method

## Qué se va a hacer
Reemplazar el placeholder de `/natural-method/audiobooks` por un listado de 10 audiolibros de nivel **Básico**. Cada uno es una tarjeta con: imagen teaser pequeña generada por mí, nombre del audiolibro y un botón que abre el enlace externo de la historia/video (los links de Gemini que compartiste).

## Lista de audiolibros (todos Básico)
1. Toby the Turtle
2. Lulu the Ladybug
3. Benny the Bunny
4. The Magical Pencil
5. The Quiet Star
6. Nico the Mouse
7. Leo the Robot
8. Paco the Penguin
9. Milo the Cat
10. Sparky the Dragon

## Cambios
1. **Datos** — nuevo archivo `src/services/natural-method-audiobooks.ts` con los 10 títulos, su enlace externo y su nivel (basic).
2. **Imágenes teaser** — genero 10 ilustraciones (una por historia: la tortuga, la mariquita, el conejo, el lápiz mágico, la estrella, el ratón, el robot, el pingüino, el gato, el dragón), estilo ilustración infantil consistente, en `src/assets/audiobooks/`.
3. **Página** — `src/routes/natural-method.audiobooks.tsx`:
   - Encabezado con botón de regreso a Natural Method (como hoy).
   - Sección "Nivel Básico / Basic Level".
   - Tarjetas: imagen teaser a la par del nombre, ícono de play, y abren el enlace en pestaña nueva.
   - Textos bilingües (ES/EN) como el resto de la app.
   - `head()` propio ya existe; se actualiza la descripción.
4. **Qué NO cambia**: verbos, phrasal verbs, idioms, navegación inferior, curso, progreso, cuotas. No hay audio alojado en la app ni costo de IA en tiempo de ejecución (solo la generación única de las imágenes).

## Verificación
- `bunx tsc --noEmit` pasa.
- `/natural-method/audiobooks` muestra las 10 tarjetas con imagen y nombre.
- Cada tarjeta abre su enlace correcto en pestaña nueva.
- Captura en móvil (393 px) y revisión visual de las 10 imágenes.
