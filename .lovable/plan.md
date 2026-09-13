# Validar la respuesta hablada del cuento + aviso de IA

## Qué está pasando (el error)

En la pregunta rápida del Episodio 1, después de elegir "Vale" el cuento pide:
**"What is your name?"** (o sea, hacer la pregunta). El estudiante respondió
**"My name is Rodrigo."**, que es una respuesta válida en la vida real, pero la
revisión solo acepta una única frase exacta: la pregunta. Por eso salió
"Inténtalo de nuevo" aunque el estudiante habló bien.

La causa no es el micrófono ni la transcripción (se escuchó perfecto
"My name is Rodrigo."), es que cada pregunta hoy admite **una sola** frase
esperada.

## Solución

1. **Aceptar varias respuestas por pregunta.** Cada pregunta podrá tener una
   lista de frases válidas en vez de una sola. Si el estudiante dice cualquiera
   de ellas, sale "Great job, champion!" con el sonido de éxito.

   Episodios 1–5 (los que ya tienen revisión) quedan así:
   - Nombre: acepta `What is your name?` **y** `My name is *` (o solo el nombre).
   - Comida: acepta `What is your favorite food?` **y** `My favorite food is *`.
   - Origen: acepta `Where are you from?` **y** `I am from *`.
   - Igual para las demás: siempre se acepta la pregunta o la respuesta natural.

2. **Aviso corto de IA**, igual que en el Paso 2 de los módulos actuales, debajo
   del botón DECIRLO: *"La IA comparará tu respuesta y puede cometer errores.
   Úsala como guía para mejorar."* (versión en inglés incluida). Se reutiliza el
   texto que ya existe, no se inventa uno nuevo.

3. **Mensaje mientras revisa:** se mantiene "Revisando tu audio…" con el spinner,
   y el aviso de IA queda visible para que nadie se frustre si la IA falla.

## Detalles técnicos

- `src/services/storybook/types.ts`: `StorybookSayItCheck` pasa de `target: string`
  a aceptar además `alternates?: string[]` (el `target` sigue igual por
  compatibilidad).
- `src/lib/story-say-match.ts`: nueva función que prueba el `target` y cada
  alternativa, y devuelve éxito si alguna coincide. Se agregan pruebas para
  "My name is Rodrigo" vs. la pregunta.
- `src/routes/api/story-say-check.ts`: usa la comparación con alternativas. Sin
  llamadas extra de IA — sigue siendo una sola transcripción por intento, mismo
  costo y mismas cuotas.
- Episodios 1–5 (`vale-first-day`, `vale-first-call`, `vale-who-is-he`,
  `vale-who-is-d`, `vale-support-team`): se agregan las alternativas.
- `src/components/storybook/StorybookPlayer.tsx`: muestra el aviso de IA
  (clave existente `rep2.aiDisclaimer`) bajo el bloque de grabación de "Ahora dilo tú".

## Verificación

- Pruebas del matcher y del storybook + chequeo de tipos.
- Revisión en celular (394px) del Episodio 1: responder con el nombre debe dar
  "Great job, champion!" y debe verse el aviso de IA.
