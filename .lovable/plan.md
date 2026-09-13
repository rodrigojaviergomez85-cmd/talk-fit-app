# Validar la respuesta hablada del cuento + aviso de IA

## Qué está pasando (el error)

En la pregunta rápida del Episodio 1, el estudiante contestó **"My name is Rodrigo."**
y salió "Inténtalo de nuevo". La transcripción fue perfecta; el problema es que
hoy cada punto de revisión acepta **una sola** frase esperada (la pregunta), no
la respuesta natural del estudiante.

## Qué se valida y qué no (regla permanente)

- **SÍ se valida con IA:** las respuestas de las preguntas rápidas (nombre,
  comida favorita, origen, edad, datos del cuento como "He is from Canada.").
- **NO se valida con IA:** las frases motivacionales/de afirmación
  ("I can do it", "We are amazing.", "I am awesome.", "My voice is calm.",
  "I am happy today.", la tarjeta de afirmación del episodio). Esas se repiten
  libremente como hoy, sin revisión — repiten y siguen.

## Cambios

1. **Aceptar solo la respuesta natural, no la pregunta.** En las preguntas
   personales la frase esperada cambia:
   - **Nombre:** acepta `My name is *` y también decir solo el nombre
     ("Rodrigo"). **No** acepta repetir "What is your name?".
   - **Comida favorita:** acepta `My favorite food is *` y también decir solo la
     comida ("Pupusas").
   - **Origen:** acepta `I am from *` y también decir solo el lugar ("El Salvador").
   - **Edad:** acepta `I am * years old` y también el número solo ("Twenty").
   - Los datos del cuento (Episodio 4: "He is a client.", "He is from Canada.",
     "His name is Dylan.") siguen con su frase exacta.
   - Los episodios 6–20 y la Temporada 2 seguirán esta misma regla cuando se
     activen.

2. **Quitar la validación de las afirmaciones** en los Episodios 2, 3 y 5
   ("My voice is calm.", "I am happy today.", "We are amazing.",
   "I am awesome.") — graban, se escuchan y siguen, como la tarjeta
   motivacional.

3. **Aviso corto de IA**, igual que en el Paso 2 de los módulos actuales, debajo
   del botón DECIRLO (solo donde hay validación): *"La IA comparará tu respuesta
   y puede cometer errores. Úsala como guía para mejorar."* (versión en inglés
   incluida). Reutiliza el texto existente (`rep2.aiDisclaimer`).

4. **Mensaje mientras revisa:** se mantiene "Revisando tu audio…" con el spinner;
   el aviso de IA queda visible debajo.

## Detalles técnicos

- `src/services/storybook/types.ts`: `StorybookSayItCheck` gana
  `allowShortAnswer?: boolean` — con `true` también se acepta una respuesta
  corta (1–2 palabras) sin la frase completa.
- `src/lib/story-say-match.ts`: caso de respuesta corta; pruebas nuevas:
  "My name is Rodrigo" ✓, "Rodrigo" ✓, "What is your name?" ✗.
- `src/routes/api/story-say-check.ts`: pasa la opción al comparador. Sigue siendo
  una sola transcripción por intento — mismas cuotas; al quitar la validación de
  las afirmaciones, el costo por episodio incluso baja.
- Episodios 1–5 (`vale-first-day`, `vale-first-call`, `vale-who-is-he`,
  `vale-who-is-d`, `vale-support-team`): ajustes de `target`/`allowShortAnswer`
  en preguntas personales y quitar `sayItCheck` de las afirmaciones.
- `src/components/storybook/StorybookPlayer.tsx`: muestra `rep2.aiDisclaimer`
  bajo el bloque de grabación cuando el quiz tiene validación.

## Verificación

- Pruebas del matcher y del storybook + chequeo de tipos.
- Revisión en celular (394px) del Episodio 1: decir "My name is Rodrigo" da
  "Great job, champion!"; decir la pregunta da "Inténtalo de nuevo"; el aviso de
  IA se ve debajo; las afirmaciones no piden validación.
