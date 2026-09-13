# Temporada 2: quitar preguntas en presente simple

Sí, coincido: en la Temporada 2 (Basic 1) el tema es el futuro, y varias preguntas rápidas usan "does / do / wants", que todavía no se enseña. Las sustituimos por preguntas equivalentes en futuro ("going to" / "will"), sin cambiar la historia ni las ilustraciones.

## Preguntas a cambiar (11 en total)

| Episodio | Antes | Después |
|---|---|---|
| Mañana empieza ahora | When does the client want the event? | When is the client going to have the event? |
| Mi voz (P3) | What does the other team want? | What is the other team going to ask for? |
| Mi voz (P3, tu respuesta) | What do you want for your future? | What are you going to do for your future? |
| Fin de semana (P3) | What does the young man want? | What is the young man going to do? |
| Decisión al instante | What does Vale say about problems? | What will Vale say about problems? |
| El reto del will | What does Vale say after the mistake? | What will Vale say after the mistake? |
| Predicciones visibles | Why does Vale say it's going to rain? | What can Vale see in the sky? |
| Fluidez final | What does Vale say about the future? | What will the future be like? |
| Plan o decisión | Beto is lost. What does Vale say? | Beto is lost. What will Vale do? |
| Predicción | Does Vale think people will come? | Will people come to the event? |
| La promesa (P1) | What does Vale promise? | What will Vale do for Beto? |
| La promesa (P3) | What phrase does Beto repeat? | What phrase will Beto repeat every day? |

## Opciones y respuestas

- Se ajustan las opciones solo donde el presente simple aparece dentro de ellas: en Predicciones visibles pasan a "Black clouds / The sun / An airplane", y en Predicción a "Yes, they will / No, nobody will come / Only Ana will come".
- En Fin de semana, la respuesta hablada pasa de "Yes, I can join the team." a "I'm going to join the team." para mantener el futuro.
- En Mi voz, la respuesta personal pasa de "I want ..." a "I'm going to ...", con ejemplo "I'm going to study English every day."
- Todo lo demás se mantiene: dos preguntas personales por episodio, límite de 2 intentos, "Great job, champion!", sonido de felicitación y las frases motivacionales sin validación de IA.

## Detalles técnicos

- Archivos: `src/services/storybook/vale-s2-*.ts` (campos `questionEn`, `questionEs`, `options`, `answer`, `sayIt`, `sayItEs`, `sayItAskEn/Es`, `sayItCheck.target`).
- Se añade una prueba que recorre los episodios de Temporada 2 y falla si alguna pregunta u opción usa presente simple de tercera persona (`does`, `do you`, `wants`, `says`, `likes`, etc.).
- Verificación: `bunx tsgo`, pruebas de storybook y revisión en móvil de un episodio con pregunta corregida.

## Fuera de alcance

Solo se tocan las preguntas rápidas y sus respuestas. La narración de las escenas no se modifica en este cambio; si quieres, la reviso después en un paso aparte.

## Variedad de wh-questions

Hoy la Temporada 2 está muy cargada de "What": 31 de 60 preguntas empiezan con What, y solo hay 1 Why, 1 Where, 4 Who, 5 When, 4 How. Eso no entrena la comprensión de las demás preguntas.

Meta de distribución para las 60 preguntas de la temporada (3 por episodio):

- What: 18 (de 31)
- Who: 9
- When: 9
- Where: 8
- Why: 7
- How / How many / How long: 6
- Will / Is ... going to (sí o no): 3

Cómo se aplica:
- En cada episodio, al menos una de las tres preguntas deja de ser "What" y pasa a Why, Who, Where o How, usando información que ya está en las escenas de ese episodio (no se inventan datos nuevos ni se cambian ilustraciones).
- Ejemplos: "Where is Vale going to study?", "Who is going to invite the students?", "Why is Vale going to wake up early?", "How many people will come?".
- Las respuestas habladas siguen en futuro ("going to" / "will") y las preguntas personales conservan la misma wh-word que la pregunta de la historia, para que el estudiante practique contestarla ("Where are you going to study tomorrow?").
- Cada episodio mantiene 2 de 3 preguntas personales validadas por IA y 1 de repetición guiada.

La prueba automática también verifica la mezcla: falla si un episodio tiene sus tres preguntas empezando con "What".
