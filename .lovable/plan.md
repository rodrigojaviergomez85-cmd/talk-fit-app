# Validar la respuesta hablada del cuento + aviso de IA

## Qué está pasando (el error)

En la pregunta rápida del Episodio 1, el estudiante contestó **"My name is Rodrigo."**
y salió "Inténtalo de nuevo". La transcripción fue perfecta; el problema es que
cada pregunta hoy acepta **una sola** frase esperada (la pregunta), no la
respuesta natural del estudiante.

## Solución

1. **Aceptar solo la respuesta natural, no la pregunta.** En las preguntas
   personales (nombre, comida favorita, origen, etc.) la frase esperada cambia:
   - **Nombre:** acepta `My name is *` y también decir solo el nombre
     ("Rodrigo"). **No** acepta repetir "What is your name?".
   - **Comida favorita:** acepta `My favorite food is *` y también decir solo la
     comida ("Pupusas").
   - **Origen:** acepta `I am from *` y también decir solo el lugar ("El Salvador").
   - **Edad:** acepta `I am * years old` y también el número solo ("Twenty").
   - El resto de las preguntas (afirmaciones, frases del cuento como
     "We are amazing.") siguen con su frase exacta — ahí sí se repite la frase.
   - Esto aplica a los episodios 1–5 que ya tienen revisión; los episodios 6–20
     y la Temporada 2 seguirán esta misma regla cuando se activen.

2. **Aviso corto de IA**, igual que en el Paso 2 de los módulos actuales, debajo
   del botón DECIRLO: *"La IA comparará tu respuesta y puede cometer errores.
   Úsala como guía para mejorar."* (versión en inglés incluida). Se reutiliza el
   texto que ya existe (`rep2.aiDisclaimer`).

3. **Mensaje mientras revisa:** se mantiene "Revisando tu audio…" con el spinner;
   el aviso de IA queda visible debajo para orientar al estudiante.

## Detalles técnicos

- `src/services/storybook/types.ts`: `StorybookSayItCheck` gana
  `allowShortAnswer?: boolean` — cuando es `true`, también se acepta una
  respuesta corta (1–2 palabras) sin la frase completa. Sigue existiendo
  `target` (ahora apunta a la respuesta con comodín `*`).
- `src/lib/story-say-match.ts`: agrega el caso de respuesta corta: si
  `allowShortAnswer` y la transcripción tiene 1–2 palabras limpias, se acepta.
  Pruebas nuevas: "My name is Rodrigo" ✓, "Rodrigo" ✓, "What is your name?" ✗.
- `src/routes/api/story-say-check.ts`: pasa la opción al comparador. Sigue siendo
  una sola transcripción por intento — mismo costo y mismas cuotas.
- Episodios 1–5 (`vale-first-day`, `vale-first-call`, `vale-who-is-he`,
  `vale-who-is-d`, `vale-support-team`): en las preguntas personales el `target`
  pasa a la respuesta con comodín + `allowShortAnswer`; las de repetición exacta
  no cambian.
- `src/components/storybook/StorybookPlayer.tsx`: muestra el aviso de IA
  (`rep2.aiDisclaimer`) bajo el bloque de grabación de "Ahora dilo tú".

## Verificación

- Pruebas del matcher y del storybook + chequeo de tipos.
- Revisión en celular (394px) del Episodio 1: decir "My name is Rodrigo" da
  "Great job, champion!"; decir la pregunta da "Inténtalo de nuevo"; el aviso de
  IA se ve debajo del botón.
