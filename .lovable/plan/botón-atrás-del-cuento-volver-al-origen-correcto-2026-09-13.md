# Botón atrás del cuento: volver al origen correcto

## Comportamiento actual
La flecha atrás de la portada del cuento siempre va a `/natural-method/audiobooks`.

## Cambio propuesto

**1. La pantalla del día marca el origen**
- En `src/routes/day.$moduleId.$day.tsx`, el enlace a la historia agrega un parámetro de búsqueda, p. ej. `?from=day`.
- El enlace desde Audiolibros (`/natural-method/audiobooks`) no lleva parámetro (o lleva `?from=audiobooks`).

**2. `StorybookPlayer.tsx` decide el destino**
- Se agrega `validateSearch` a la ruta `/natural-method/cuento/$storyId` para leer `from` de forma tipada.
- Flecha atrás:
  - Dentro de la historia (slide > 0): va a la parte anterior (sin cambios).
  - En la portada (slide 0) con `from=day`: navega de regreso a `/day/$moduleId/$day` del episodio actual (se resuelve vía `seasons.ts`, slot del episodio).
  - En la portada sin `from` (entró desde Método natural): va a `/natural-method/audiobooks` (sin cambios).

## Sin cambios
- Navegación dentro de la historia, "siguiente episodio" del final, y la pantalla de Audiolibros.

## Verificación
- Playwright móvil: Inicio → día → cuento → atrás desde portada regresa a la pantalla del día; avanzar 2 escenas → atrás regresa una escena; entrar desde Método → atrás regresa a Audiolibros.
