# Temporada 2: variedad de wh-questions + quitar presente simple

Dos cambios juntos en las preguntas rápidas de la Temporada 2 (Basic 1): agregar variedad de Why / Who / When / Where / How, y quitar las preguntas que usan presente simple (tema aún no visto). No se cambian la historia ni las ilustraciones.

## 1. Variedad de preguntas (lo principal)

Hoy la temporada está muy cargada de "What": de 60 preguntas (3 por episodio), 31 empiezan con What, y solo hay 1 Why, 1 Where, 4 Who, 5 When, 4 How.

Distribución objetivo para las 60 preguntas:

- What: 18
- Who: 9
- When: 9
- Where: 8
- Why: 7
- How / How many / How long: 6
- Will…? / Is … going to…? (sí o no): 3

Cómo se aplica:

- En cada episodio, al menos una de las tres preguntas deja de ser "What" y pasa a Why, Who, When, Where o How, usando información que ya está en las escenas de ese episodio.
- Ejemplos: "Where is Vale going to study?", "Who is going to invite the students?", "Why is Vale going to wake up early?", "When will the event start?", "How many people will come?".
- La pregunta personal del estudiante conserva la misma wh-word que la pregunta de la historia, para practicar contestarla: "Why are you going to study English?", "Who are you going to help this week?".
- Todas las respuestas siguen en futuro ("going to" / "will").
- Se mantienen 2 preguntas personales por episodio (validadas por IA) y 1 de repetición guiada.

## 2. Quitar el presente simple (12 preguntas)

| Episodio | Antes | Después |
|---|---|---|
| Mañana empieza ahora | When does the client want the event? | When is the client going to have the event? |
| Mi voz (P3) | What does the other team want? | What is the other team going to ask for? |
| Mi voz (P3, tu respuesta) | What do you want for your future? | What are you going to do for your future? |
| Fin de semana (P3) | What does the young man want? | Who is going to join the team? |
| Decisión al instante | What does Vale say about problems? | What will Vale say about problems? |
| El reto del will | What does Vale say after the mistake? | What will Vale say after the mistake? |
| Predicciones visibles | Why does Vale say it's going to rain? | Why is it going to rain? |
| Fluidez final | What does Vale say about the future? | What will the future be like? |
| Plan o decisión | Beto is lost. What does Vale say? | What will Vale do for Beto? |
| Predicción | Does Vale think people will come? | Will people come to the event? |
| La promesa (P1) | What does Vale promise? | What will Vale do for Beto? |
| La promesa (P3) | What phrase does Beto repeat? | When will Beto repeat the phrase? |

Ajustes de opciones y respuestas:

- En Predicciones visibles las opciones pasan a "Black clouds / The sun / An airplane"; en Predicción a "Yes, they will / No, nobody will come / Only Ana will come".
- En Fin de semana la respuesta hablada pasa a "I'm going to join the team."
- En Mi voz la respuesta personal pasa de "I want …" a "I'm going to …", con ejemplo "I'm going to study English every day."
- Se mantienen el límite de 2 intentos, "Great job, champion!", el sonido de felicitación y las frases motivacionales sin validación de IA.

## Detalles técnicos

- Archivos: `src/services/storybook/vale-s2-*.ts` (`questionEn`, `questionEs`, `options`, `answer`, `sayIt`, `sayItEs`, `sayItAskEn/Es`, `sayItCheck.target`, `altTargets`).
- Nueva prueba de temporada: falla si alguna pregunta u opción usa presente simple de tercera persona (`does`, `do you`, `wants`, `says`, `likes`), si un episodio tiene sus tres preguntas empezando con "What", o si la distribución global de wh-words se aleja de la meta.
- Verificación: `bunx tsgo`, pruebas de storybook y revisión en móvil de 2 episodios corregidos.

## Fuera de alcance

Solo se tocan las preguntas rápidas y sus respuestas; la narración de las escenas no cambia.
