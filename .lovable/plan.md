# Basic Zero: quitar "do/does" de los cuentos y corregir el gancho final

## Mi recomendación

En Basic Zero el curso dice explícitamente que no se enseña do/does ni la regla de tercera persona: todo se sostiene con **to be** y chunks. Los cuentos deberían respetar eso. Si aparece "How does Vale feel?" el estudiante ve una estructura que todavía no puede producir y se confunde.

No hace falta esconder el inglés natural en la narración, pero **ninguna pregunta ni frase para repetir** debe usar do/does en Basic Zero. Lo gradual llega solo cuando el módulo lo introduce.

## Cambios

1. **Preguntas de los quizzes (Episodio 2)** — reescribirlas con to be:
   - "How does Vale speak?" → "Is Vale calm?" o "How is Vale's voice?" (opciones: calm / fast / angry)
   - "How does Vale feel?" → "How is Vale?" (Happy / Tired / Sad)
   - "Where is Dylan from?" ya está bien.
2. **Gancho final del Episodio 2** — hoy dice "Why does Mr. Reyes want to see her? Next week: «Who is she?»".
   - Quitar el do/does: "Mr. Reyes is serious. Why?"
   - Corregir el género: quien aparece es un hombre, así que el avance es **"Who is he?"**.
3. **Nombre del Episodio 3 en el calendario** — en el mapa de la temporada el episodio 3 se llama "Who is she?" / «¿Quién es ella?»; cambiarlo a **"Who is he?" / «¿Quién es él?»** para que coincida con el gancho.
4. **Episodio 1 y narración** — revisar que no quede ninguna pregunta ni frase de práctica con do/does; dejar la narración en frases simples con to be o con verbos ya vistos.
5. Mantener el español de apoyo alineado con el nuevo texto.

## Detalles técnicos

- `src/services/storybook/vale-first-call.ts`: campos `quizzes[].questionEn/questionEs`, `sayIt/sayItEs` y `cliffhanger`.
- `src/services/storybook/vale-first-day.ts`: repaso de preguntas.
- `src/services/storybook/seasons.ts`: `teaser` del día 3.
- Correr typecheck y las pruebas de `src/services/storybook`.
