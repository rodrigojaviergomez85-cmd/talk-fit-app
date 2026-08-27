# Botón "ES" para traducir las frases

Para quien no entiende nada de inglés, cada frase y cada pregunta en inglés tendrá un botón pequeño **ES** que muestra u oculta su traducción al español, escrita a mano (sin IA, instantánea y gratis).

## Cómo se ve

- Junto a cada frase del modelo (reps 1, 2, 3, 5, 6, 7) aparece un botón discreto **ES**.
- Al tocarlo, debajo de la frase en inglés aparece la traducción en español, en texto más pequeño y color secundario.
- Al tocarlo otra vez, se oculta.
- Lo mismo en las preguntas personales (rep 8) y sus starters, y en la lista de la meta / checklist.
- Un botón "Mostrar todo en español" arriba de la pantalla de práctica activa las traducciones de toda la sesión de una vez (se recuerda durante la sesión).

## Contenido

Se agregan traducciones al español para:
- Las 9 frases del modelo.
- Las 10 preguntas personales y sus starters.
- Los chunks de automaticidad y los chunks de habla natural que se muestran en Coach.

Ejemplos:
- "I usually wake up around six thirty." → "Normalmente me levanto como a las seis y media."
- "What time do you usually wake up?" → "¿A qué hora te levantas normalmente?"

## Detalles técnicos

- `src/lib/types.ts`: campos opcionales `es?: string` en `ModelSentence`, `Chunk` y `PersonalPrompt` (`questionEs`, `starterEs`).
- `src/services/lesson-service.ts`: se rellenan las traducciones de frases, chunks y prompts.
- Nuevo `src/components/fluency/TranslatableText.tsx`: muestra el texto en inglés + botón "ES" y la traducción; acepta un modo forzado desde arriba.
- `src/routes/practice.tsx`: estado `showSpanish` a nivel de sesión con el toggle global, y uso de `TranslatableText` en las frases, preguntas y checklist.
- `src/routes/coach.tsx`: mismo componente para los chunks listados.
- Solo cambios de presentación: la lógica de grabación, comparación y análisis de IA no se toca.
