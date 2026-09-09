# Badges de módulo (mascotas)

Cada módulo tendrá su propio emblema animal, estilo **emblema moderno plano**: silueta del animal dentro de un escudo circular, con los colores de la app.

## Los 11 emblemas

| Módulo | Animal | Por qué |
| --- | --- | --- |
| Basic Zero | Pollito | El primer paso, apenas empiezas |
| Basic 1 · Futuro | Conejo | Salta hacia adelante, planes |
| Basic 2 · Presente | Abeja | Rutina diaria, constancia |
| Basic 3 · Pasado | Elefante | Memoria, contar lo que pasó |
| Basic 4 · Mixto | Zorro | Agilidad para cambiar de tiempo |
| EAGLES | Águila | Ya definido |
| TIGERS | Tigre | Ya definido |
| SHARKS | Tiburón | Ya definido |
| Advanced 1 · Get Hired | León | Presencia, seguridad en la entrevista |
| Advanced 2 · Do the Job | Lobo | Trabajo en equipo, resolver |
| Advanced 3 · Beyond the Script | Fénix | Improvisar y renacer sin guion |

Si quieres cambiar alguno, se cambia solo esa imagen.

## Dónde aparecen

- **Inicio** — emblema del módulo actual junto al título de la tarjeta principal.
- **Lista de niveles** — emblema pequeño en cada módulo al elegir nivel.
- **Página del módulo** — emblema en el encabezado.
- **Progreso / logros** — los 11 emblemas en una cuadrícula: en gris mientras el módulo no está terminado, a color cuando el aprendiz completa sus 20 días.

## Detalles técnicos

- Generar 11 PNG cuadrados con fondo transparente (1024×1024), silueta plana + escudo circular, paleta de la app; guardarlos en `src/assets/badges/`.
- Nuevo `src/lib/module-badges.ts`: mapa `ModuleId -> { src, alt (es/en) }` y un componente `ModuleBadge` con tamaños `sm | md | lg` y estado `locked` (gris, `grayscale opacity-40`).
- Puntos de uso: `CurrentModuleCard.tsx`, `ModuleHeading.tsx` (página del módulo), el listado de `PlacementPicker.tsx` / `level.tsx`, y una sección nueva de emblemas en `/progress`, reutilizando el patrón visual de `BadgeGrid.tsx`.
- El estado "ganado" se deriva de `JourneyService.completedCount(state, moduleId)` contra el total de días del módulo; no se crean tablas ni datos nuevos.
- Texto alternativo bilingüe con las claves `badge.*` en `src/lib/i18n.tsx`.
- Sin cambios en práctica, progreso guardado, cuotas, IA ni grabaciones.
