# Expresiones completas (phrasal verbs e idioms) en toda la historia

## El problema

En la pantalla que enviaste, la frase "I can **sort it out** in an hour" muestra solo `sort` = "ordenar / resolver". El estudiante ve la traducción de una palabra suelta, no el significado real de la expresión ("resolverlo / arreglarlo").

Esto pasa porque hoy el reproductor solo trata como unidad las expresiones que un episodio declara a mano, y de los 51 episodios publicados **solo uno** las declara. Todos los demás (temporadas 1 a 8) parten las expresiones palabra por palabra.

Ya encontré en el texto de los episodios, entre otras: wake up (26), woke up (25), wakes up (21), give up (14), show up (9), showed up (7), back out (7), sort it out (2), pick … up.

## Qué haría

1. **Diccionario global de expresiones.** Crear una lista única de phrasal verbs e idioms con su traducción completa en español (resolverlo, despertarse, recogerla, rendirse, aparecer/llegar, echarse para atrás, etc.), recorriendo todos los episodios de las temporadas 1 a 8 para que la lista cubra lo que realmente se dice en la historia.

2. **Formas y pronombres.** Cada expresión reconoce sus variantes: wake up / wakes up / woke up / waking up, y con pronombre en medio: pick her up / pick him up / picked them up / sort it out / figure this out.

3. **Una sola unidad tocable.** La expresión completa se subraya y se toca como una sola pieza; no se puede tocar solo `sort`. La tarjeta muestra la expresión completa, su significado y la pronunciación lenta de toda la expresión, y el audio se pausa y continúa igual que hoy.

4. **Aplicar desde temporada 1.** El diccionario se aplica automáticamente a todos los episodios, sin tener que editar los 51 archivos uno por uno. Las expresiones que un episodio ya declara siguen mandando sobre la lista global.

5. **Pruebas.** Cubrir: la expresión más larga gana sobre la corta, la puntuación queda pegada ("sort it out."), repeticiones en la misma línea, variantes conjugadas, y que ninguna palabra interna quede tocable por separado.

## Detalles técnicos

- `src/services/storybook/glossary.ts`: nueva constante `PHRASE_GLOSSARY` (frase base → español) más expansión de variantes (formas verbales y ranuras de pronombre `pick * up`). `buildEpisodeGlossary()` siembra el mapa con las frases globales antes de las del episodio, de modo que `episode.expressions` conserva prioridad. `lookupWord()` ya resuelve claves con espacio; se marca `curated: true` para que la expresión se guarde en el cuaderno.
- `src/components/storybook/StorybookPlayer.tsx`: `expressionPhrases` ya sale de las claves con espacio del mapa, así que hereda las frases globales sin cambios de UI; solo se revisa que la tarjeta y `SlowWordPanel` lean bien una frase de varias palabras.
- `src/lib/syllables.ts`: `phraseTokens()` ya prioriza la coincidencia más larga y respeta límites de palabra; se agregan casos de prueba en `syllables.test.ts`.
- Pruebas nuevas/ampliadas en `src/services/storybook/glossary.test.ts` y `src/lib/syllables.test.ts`; se corre la suite completa.

Sin cambios en guiones, voces, imágenes ni límites de práctica.
