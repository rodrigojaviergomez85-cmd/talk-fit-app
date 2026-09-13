# Validación con IA en todas las preguntas rápidas

## Qué pasa hoy

La validación solo está puesta en 4 episodios (Episodio 1, 2 parcialmente, "¿Quién es él?" y "¿Quién es D?"). En los demás, cuando el estudiante graba en "Ahora dilo tú", la app acepta cualquier audio sin revisarlo y no suena la felicitación.

En el episodio que mostraste, "I am happy today." no tiene validación porque se marcó por error como frase motivacional.

## Qué se va a hacer

1. **Activar la revisión en todas las frases de la historia.** Cada pregunta rápida de los 40 episodios (Temporada 1 y 2) tendrá su frase objetivo:
   - Frases fijas de la historia (ej. "I am happy today.", "He is from Canada.", "She is going to sell food at the door.") se comparan completas.
   - Frases personales con "…" (ej. "My favorite color is …", "I live in…, and…") usan comodín y aceptan respuestas cortas.
2. **Las afirmaciones motivacionales siguen sin IA**, tal como acordamos: "I am awesome.", "We are amazing.", "English is easy for me.", "Mistakes are part of the process. I'll continue.", "I love challenges.", "We are champions.", "My answers are long and clear.", "My answers are long and fluent.", "I am disciplined." y similares.
3. **Sonido de felicitación también en las motivacionales.** Al terminar de grabar una afirmación, suena la felicitación y aparece "¡Great job, champion! +1 ⭐", sin llamar a la IA (costo cero).
4. **Aviso de IA** ya existente ("La IA comparará tu respuesta y puede cometer errores…") se muestra solo donde sí hay revisión.

## Costo

Se mantiene el mismo esquema barato: una sola llamada de transcripción por intento, máximo 2 intentos por pregunta, comparación local y límites diarios ya existentes. Las afirmaciones no gastan nada.

## Detalles técnicos

- Agregar `sayItCheck` (con `allowShortAnswer` donde hay comodín) a los quizzes de todos los archivos `src/services/storybook/vale-*.ts` que hoy no lo tienen, excepto los prompts motivacionales.
- En `StorybookPlayer.tsx`, en la rama `!hasCheck`, llamar `playGoodFeedbackSound()` y mostrar el bloque de éxito.
- Pruebas: un test que recorra todos los episodios y verifique que cada `sayIt` tenga `sayItCheck`, salvo los de la lista motivacional; más tests de coincidencia para frases con comodín.
- Verificación con TypeScript, suite de storybook y revisión móvil a 394px.
