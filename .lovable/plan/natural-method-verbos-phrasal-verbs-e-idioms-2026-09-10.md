# Natural Method: verbos, phrasal verbs e idioms

## Qué cambia

**Pantalla Natural Method** sigue con 2 botones:
1. Most Common Verbs
2. Natural Method Audiobooks

**Dentro de "Most Common Verbs"** aparecen 3 opciones:
- List of Verbs (los 100 actuales: presente, pasado, participio, significado)
- Phrasal Verbs (100 más comunes, en presente, con significado en español y un ejemplo de uso)
- Idioms (50 con significado en español y un ejemplo)

Cada opción abre su propia lista.

## Lectura cómoda: 10 por página

Las tres listas muestran máximo 10 elementos por página, con:
- Botones Anterior / Siguiente y el indicador "Página 3 de 10"
- Botón para volver a las 3 opciones, y de ahí a Natural Method
- Al cambiar de página, la vista sube al inicio de la lista
- El buscador y los filtros actuales de verbos se mantienen y la paginación se reinicia al buscar

## Audio

Botón de play solo en la expresión (el phrasal verb o el idiom), no en el ejemplo. Usa la misma voz del navegador que ya usan los verbos, sin costo de IA. La lista de verbos conserva sus botones actuales.

## Contenido

- 100 phrasal verbs de uso diario (get up, look for, take off, give up, etc.), cada uno con significado en español y una oración de ejemplo en presente.
- 50 idioms comunes (break the ice, once in a while, piece of cake, etc.), cada uno con significado en español y una oración de ejemplo.
- Textos de la interfaz en inglés y español, según el idioma elegido.

## Detalles técnicos

- Nuevos datos: `src/services/natural-method-phrasal-verbs.ts` y `src/services/natural-method-idioms.ts` (tipados, exportados como arreglos constantes).
- Nuevas rutas: `natural-method.verbs.index.tsx` (menú de 3 opciones), `natural-method.verbs.list.tsx` (lista actual movida aquí), `natural-method.verbs.phrasal.tsx`, `natural-method.verbs.idioms.tsx`. `natural-method.verbs.tsx` pasa a ser layout con `<Outlet />`.
- Componente compartido de paginación (10 por página) reutilizado por las tres listas.
- Reuso del botón de audio existente (`AudioService`) ya usado en la lista de verbos.
- `head()` propio por ruta con título y descripción distintos.
- Sin cambios en currículo, progreso, cuotas, Review, Coach ni navegación inferior.
