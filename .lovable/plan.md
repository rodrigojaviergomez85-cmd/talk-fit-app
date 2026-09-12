# Tocar cualquier palabra en el cuento

## Objetivo
En el cuento "El primer día de Vale", el estudiante podrá tocar **cualquier** palabra del texto en inglés (no solo las 4 palabras marcadas por escena) y ver su significado en español, con pronunciación lenta como hoy.

## Qué cambia

1. **Diccionario del episodio** (`src/services/storybook/vale-first-day.ts` o un archivo `glossary.ts` nuevo):
   - Glosario palabra → español que cubre **todas** las palabras de los textos del episodio (incluidas las funcionales: the, is, her, with, says, etc.).
   - Se normaliza a minúsculas y se limpia puntuación; palabras con variante (speaks→habla) se definen tal cual aparecen.

2. **Render del texto** (`StorybookPlayer.tsx`):
   - Hoy solo son tocables las palabras del array `words` de la escena. Se cambia para que **todo token de palabra** sea tocable.
   - Las palabras curadas (array `words`) conservan el subrayado/resaltado actual; el resto se ven iguales al texto normal pero responden al toque con un leve feedback.

3. **Panel de significado**:
   - Se reutiliza el panel existente (significado en español + botón de pronunciación lenta).
   - Al tocar una palabra no curada, también se ofrece "Guardar en mi cuaderno de vocabulario" igual que las curadas.

4. **Sin dependencias externas**: todo el glosario es local y manual (control total de la traducción, sin costos ni latencia de API). Es viable porque el episodio tiene un vocabulario pequeño y controlado; para futuros episodios se genera el glosario junto con el guion.

## Técnico
- Normalización: `token.value.toLowerCase()` ya existe; se añade lookup en el glosario como fallback cuando `wordMap` no tiene la palabra.
- Tipo nuevo opcional `glossary?: Record<string, string>` en `StorybookEpisode`.
- No se tocan TTS, voces, quizzes ni grabación final.
- Verificación: typecheck, tests, y prueba en el navegador móvil tocando palabras curadas y no curadas.
