# Tocar cualquier palabra del cuento

Hoy solo las palabras subrayadas (las curadas de cada escena) responden al toque. Si un estudiante no entiende "says", "with" o "the", se queda sin ayuda.

## Qué cambia para el estudiante

- Cualquier palabra en inglés del cuento se puede tocar: escena, portada, pregunta del quiz y frase para repetir.
- Al tocarla se escucha su pronunciación lenta y aparece el significado en español.
- Las palabras clave siguen subrayadas en naranja (son las que valen estrella y se guardan en el cuaderno). Las demás se tocan igual, pero con un subrayado tenue para no saturar la lectura.
- Si una palabra no tiene significado registrado, igual se escucha la pronunciación y se muestra un mensaje corto ("Toca escuchar para practicarla") en vez de dejar el toque sin respuesta.
- El cuaderno de vocabulario sigue guardando solo las palabras clave, para que no se llene de artículos y preposiciones.

## Cómo se resuelve el significado

Orden de búsqueda al tocar una palabra:

1. Palabras curadas de la escena actual.
2. Palabras curadas de cualquier otra escena del mismo episodio (incluye `reviewWords`).
3. Glosario base compartido de palabras funcionales y comunes de Basic Zero.
4. Sin significado: solo pronunciación + mensaje breve.

## Detalles técnicos

- Nuevo archivo `src/services/storybook/glossary.ts`: mapa `Record<string, string>` en minúsculas con las palabras frecuentes que aparecen en los episodios 1 y 2 (says, the, with, a, is, at, her, his, my, to, and, in, on, it, you, this, are, was, of, for, but, so, very, please, now, today, here, there, etc.), más una función `lookupWord(word, episode, scene)` que aplica el orden anterior y normaliza mayúsculas, comillas y puntuación.
- `src/components/storybook/StorybookPlayer.tsx`:
  - `SceneSlide` recibe el episodio completo (o el mapa ya construido) para poder buscar fuera de la escena.
  - Todos los tokens de palabra se renderizan como `button`; el estilo depende de si la palabra es curada (subrayado `decoration-primary/60`) o no (subrayado punteado suave `decoration-border`).
  - `onLearnWord` se sigue llamando solo con palabras curadas, para no alterar estrellas ni el cuaderno.
  - El panel de significado maneja el caso "sin traducción" con texto bilingüe.
  - Aplicar el mismo componente de texto tocable a la frase del quiz (`sayIt`) reutilizando un pequeño componente `TappableText` extraído de `SceneSlide`.
- Actualizar el texto de ayuda de la portada: "toca cualquier palabra para ver su significado".
- Tests: añadir casos en los tests de storybook que verifiquen que `lookupWord` resuelve una palabra funcional ("says") y que cae al glosario base cuando no está en la escena.
