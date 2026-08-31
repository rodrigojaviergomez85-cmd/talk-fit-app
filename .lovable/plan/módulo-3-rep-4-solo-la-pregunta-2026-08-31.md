# Módulo 3, Rep 4: solo la pregunta

## Qué cambia

En Rep 4/5 ("Answer about YOUR life") de los días del Módulo 3, actualmente se muestran las imágenes (tarjetas de verbos, escena, story strip) **antes** de la pregunta. El usuario quiere ver **solo la pregunta** (con su starter, cues, audio y grabadora), sin imágenes arriba.

## Detalle técnico

- En `src/routes/practice.tsx`, en el componente de Rep 4 (~líneas 540-542), dejar de renderizar `SceneImage`, `PastVerbCards` y `StoryStrip` cuando el día pertenece al Módulo 3 (es decir, cuando el día tiene `verbCards` o `storyPanels`).
- Los días con escena de Simple Present (Weeks 3-4) conservan su imagen, porque ahí la pregunta es sobre la imagen ("What's happening?").
- Ajustar la instrucción del rep para que en Módulo 3 diga "Answer about YOUR life." / "Responde sobre TU vida." en vez de "What's happening? Answer about the picture.", usando la misma condición.
- Reps 1, 3 y 5 no cambian: ahí las imágenes sí se quedan.

## Verificación

Typecheck y revisión en el navegador de Rep 4 de un día del Módulo 3 (verb cards), uno de Week 3 (escena) y Week 4 Day 5 (story strip), confirmando que solo aparece la pregunta y que Simple Present Rep 4 sigue igual.
