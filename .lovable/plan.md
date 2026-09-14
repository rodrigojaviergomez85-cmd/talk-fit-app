# Que toda palabra tenga significado al tocarla

## El problema
Hoy, al tocar una palabra en la historia, solo aparece la pronunciación cuando esa palabra no está en el diccionario interno. Medido sobre las 101 historias: **1 de cada 4 palabras no tiene significado** (76.6% de cobertura, 535 palabras distintas sin traducción). Palabras muy comunes como *said, were, will, first, night, school, didn't, I'm* quedan sin explicación.

## Cómo lo corregimos

**1. Nombres propios**
Vale, Dani, Kat, Ana, Luis, Mateo, Camila, Beto, Morgan, Tito, Dylan, Mr. Reyes, El Salvador, Antigua, English, Spanish se reconocen como nombres y muestran una tarjeta clara ("nombre de persona", "nombre de lugar", "el inglés") en vez de quedarse vacías.

**2. Contracciones**
Ahora mismo el apóstrofo se borra y *didn't* se vuelve "didnt", que no existe en el diccionario. Se conservan las contracciones y se agregan: I'm, I'll, I'd, don't, didn't, doesn't, wasn't, weren't, won't, can't, isn't, aren't, let's, that's, it's, she's, he's, they're, we're, you're.

**3. Formas derivadas automáticas**
Si la palabra no está tal cual, se busca su forma base y se explica la forma:
- *walked* → "caminó (pasado de walk: caminar)"
- *smiles* → "sonríe (de smile: sonreír)"
- *running* → "corriendo (de run: correr)"
Incluye reglas de -s/-es/-ies, -ed, -ing, -ly, duplicación de consonante y y→i, más una tabla de pasados irregulares frecuentes (said, went, came, took, got, saw, made, gave, knew, felt, told...).

**4. Completar el diccionario**
Se agregan al diccionario base las ~450 palabras restantes que aparecen en las historias y todavía no tienen traducción, tomadas de una auditoría real de los 101 episodios (todas las temporadas, no solo Eagles).

**5. Que no vuelva a pasar**
Una prueba automática recorre TODOS los episodios de TODAS las temporadas y falla si alguna palabra queda sin significado. Así, cada episodio nuevo que escribamos obliga a cubrir sus palabras antes de publicarse.

## Qué NO cambia
Guiones, voces, imágenes, preguntas, grabaciones y la pronunciación lenta siguen exactamente igual. Solo mejora la tarjeta que aparece al tocar una palabra.

## Detalles técnicos
- `src/services/storybook/glossary.ts`: `normalizeWord` conserva apóstrofos internos, nuevas tablas `CONTRACTIONS`, `PROPER_NOUNS`, `IRREGULAR_PAST`, función `derivedMeaning()` usada como último recurso dentro de `lookupWord`, y ampliación de `BASE_GLOSSARY`.
- `src/services/storybook/glossary.test.ts`: prueba de cobertura al 100% sobre `STORYBOOK_EPISODES` más casos puntuales (*sounded*, *terrified*, *didn't*, *Vale*).
- Sin cambios en `StorybookPlayer.tsx` salvo que ya recibirá significado para todas las palabras.
- Verificación: Vitest completo, chequeo de tipos y revisión del episodio en pantalla de celular.
