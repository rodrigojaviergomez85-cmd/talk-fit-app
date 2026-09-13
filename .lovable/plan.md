# Temporadas 4 y 5 de El Mundo de Vale (+ visión Advanced)

## Alineación con el currículo

- **Temporada 4 → Basic 3 ("past-stories")**: pasado simple, Did/Didn't, pasado progresivo, contar una historia completa. Vale **sigue trabajando en el call center** (como desde la Temporada 1) y aquí aprende a **narrar su pasado**: cómo empezó, sus errores, sus primeras victorias — mientras el sueño de su escuela va creciendo.
- **Temporada 5 → Basic 4 ("mixed-tenses")**: pasado + futuro juntos, presente + pasado, preguntas sí/no y WH en todos los tiempos, conversación real. Aquí ocurre el **primer mega éxito**: Vale deja el call center y abre su pequeña escuela de inglés (becas + alumnos de paga).
- **Eagles / Sharks / Tigers → prep B1+/B2**: la escuela de Vale **crece** — empresas le piden entrenar a sus equipos; pasa de profesora novata a líder/empresaria.
- **Advanced 1–3 → cierre B2**: la escuela ya es un referente; Vale es directora reconocida y prepara a otros para el trabajo en inglés.

## Temporada 4 — "Cómo empezó todo" (Basic 3, 20 episodios)

Premisa: un blogger/periodista local quiere escribir sobre Vale ("la chica del call center que aprendió sola"). Cada episodio es Vale **contando su pasado** — flashbacks naturales que exigen pasado simple y progresivo. Sigue en su trabajo del call center; el sueño de la escuela aparece como semilla al final.

- Semana 1 (ep 1–5): Vale narra su ayer y sus inicios — simple past con verbos regulares/irregulares.
- Semana 2 (ep 6–10): qué hicieron los demás (Mateo, Kat, su mamá) — Did/Didn't, preguntas Did you…?.
- Semana 3 (ep 11–15): "qué estaba pasando cuando…" — past progressive, interrupciones (I was working when the call came).
- Semana 4 (ep 16–20): Vale cuenta su historia completa (versión propia de Caperucita Roja) — narración conectada; ep 20 = contar su historia de principio a fin (45–70s, 8 oraciones en el reto de audio, el finale del cuento sigue en 15s); cliffhanger: una oportunidad inesperada aparece.
- Tema secundario de repaso: 2–3 menciones naturales de presente simple por episodio.

## Temporada 5 — "El sueño hecho realidad" (Basic 4, 20 episodios)

Premisa: Vale deja el call center y abre **su escuela de inglés pequeña** — becas para jóvenes como ella y sus primeros alumnos de paga. Nuevos personajes: **Dani** (becario protagonista, 18 años, nervioso pero decidido — el espejo del estudiante), un alumno de paga difícil, y la primera colaboradora (co-maestra/recepcionista).

- Semana 1 (ep 1–5): la gran noticia y los preparativos — pasado + futuro (Yesterday I signed…, tomorrow we're going to open…).
- Semana 2 (ep 6–10): la vida diaria de la escuela — presente + pasado mezclados, primeros problemas (Dani quiere rendirse → afirmaciones E4CC).
- Semana 3 (ep 11–15): entrevistas — Vale entrevista empleados/becarios; preguntas sí/no y WH en todos los tiempos (What did you do before? What are you doing now? What will you do next?).
- Semana 4 (ep 16–20): conversación real — pasado, presente y futuro juntos; ep 20 = discurso de inauguración + **llega la primera llamada de una empresa grande** que quiere contratarla para entrenar a su equipo → puente a Eagles.
- Tema secundario: repaso de going to/will y simple present integrados.

## Visión: Eagles, Sharks, Tigers y Advanced (máxima adicción)

**Decisión recomendada: NO cambiar de protagonista.** Vale es el ancla emocional de los 11 meses; cambiarla rompería el apego. En su lugar, **Dani se convierte en co-protagonista**: el ex-becario que crece dentro de la historia, igual que el estudiante crece en la app.

- **Eagles**: primer contrato corporativo — ventas consultivas, presentaciones a empresas, manejo de presión. Dani da sus primeras clases.
- **Sharks**: la escuela escala — más empleados, conflictos de equipo, liderazgo, entrevistas de trabajo, objeciones difíciles.
- **Tigers**: competencia con academias grandes — estándares altos, llamadas exigentes, negociación.
- **Advanced 1–3 (cierre B2)**: la escuela es un referente nacional. Preparación laboral total: entrevistas reales, inglés corporativo, presentaciones, liderazgo. Arco final: **Dani consigue su primer trabajo bilingüe gracias a la escuela** (el estudiante se ve reflejado) y Vale recibe una invitación internacional → cierre emocional de los 11 meses, con la promesa de que el siguiente capítulo es del estudiante.

## Reglas que se mantienen (sin cambios)

- 1 episodio por día de práctica, desbloqueo secuencial; cuentas internas ven todo.
- Mismo formato: 10–11 escenas, webtoon 2D, vocabulario tocable con significado en español, 3 preguntas TPRS con listening automático, variedad WH, 2 preguntas personales validadas por IA (máx 2 intentos + "Saltar por ahora"), afirmaciones E4CC sin validación (I can do it, I am a champion, etc.), finale de 15s con un solo CTA "AHORA GRABA TUS AUDIOS", cliffhanger.
- Personajes y voces canónicas (Vale, Kat, Mateo, Luis, Ana, Dylan, Mr. Reyes); nuevos personajes de T5 reciben referencia canónica y voz propia antes de generar arte.
- Máximo de respuesta del curso: 30s; finales de cuento: 15s / ~5 oraciones.
- QA por bloque: identidad, piel, anatomía (2 brazos), props, consistencia de voces, tests (vitest + tsgo), chequeo móvil 394px, imágenes <300 KB.

## Implementación por fases

1. **Fase A — Temporada 4, episodios 1–5**: guiones + arte + registro + QA.
2. **Fase B — T4, episodios 6–10**.
3. **Fase C — T4, episodios 11–15**.
4. **Fase D — T4, episodios 16–20**.
5. **Fase E — Temporada 5, episodios 1–5** (incluye diseño canónico de Dani y 1–2 personajes nuevos).
6. **Fases F–H — T5, episodios 6–20** en bloques de 5.
7. Sección "Método Natural": agregar tarjetas plegables de Temporada 3, 4 y 5 al terminar cada una.
8. Audiobooks: registrar T4 y T5 como en temporadas anteriores.

## Detalles técnicos

- Un archivo `vale-s4-*.ts` / `vale-s5-*.ts` por episodio en `src/services/storybook/`, registro en `index.ts`, `seasons.ts` y slots diarios vía `getEpisodeSlot()`.
- Mapeo de módulo: T4 → `past-stories`, T5 → `mixed-tenses` (rutas `/day/past-stories/N` y `/day/mixed-tenses/N`).
- `sayItCheck` por episodio con marcos de pasado (What did you do yesterday? → I worked / I went…), sin temas aún no vistos.
- Arte en `src/assets/storybook/vale-s4-epN/` y `vale-s5-epN/`, JPG <300 KB, referencias canónicas en `_canon/`.
- Validación IA: una llamada Whisper por prompt, matching determinístico, sin costo en afirmaciones ni finale.
