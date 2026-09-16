# Advanced 1 eps 1–5: auditoría de nivel, alineación curricular y reescritura a B2

## Diagnóstico

El inglés de Advanced 1 (episodios 1–5) es correcto y fluido, pero de nivel B1: oraciones cortas, presente/pasado simple, poco matiz. Un estudiante que termina Advanced así habla bien, pero no llega a B2. Advanced es el último tramo del programa: aquí debe ocurrir el salto.

## Alineación con la currícula oficial

Cada episodio corresponde a un día del módulo Advanced 1 y debe reforzar su estructura oficial, no inventar otra:

- **Día/Episodio 1 — "Tell me about yourself":** presentación profesional NOW → BACKGROUND → STRENGTH → GOAL.
- **Día/Episodio 2 — "A real experience":** pasado simple + pasado progresivo, estructura SETTING → ACTION → PROBLEM → REACTION → RESULT/LESSON.
- **Día/Episodio 3 — "Why us":** presente simple + presente progresivo, CLAIM → EVIDENCE → VALUE.
- **Día/Episodio 4 — "My honest weakness":** debilidad real + lo que estás haciendo para mejorarla.
- **Día/Episodio 5 — "Pressure round":** respuestas bajo presión, recuperación ante interrupciones.

En la reescritura, el diálogo de Vale y su equipo usa y modela la estructura del día, y las preguntas "tu turno" del estudiante practican exactamente esa estructura. Los Power Chunks y frases guía del día oficial aparecen en el episodio cuando sea natural.

## Alcance de este trabajo

Solo episodios 1–5 de Advanced 1. Misma historia, mismas escenas, mismo arte, mismas voces y personajes. Solo sube el nivel del inglés y la exigencia de las preguntas del estudiante.

## Paso 1 — Auditoría

Revisar escena por escena los 5 episodios y marcar, por episodio, qué falta de:

- Estructura del día oficial (según la tabla de arriba)
- Condicionales 2° y 3° ("if we had known", "I'd go with...")
- Voz pasiva ("the contract was signed")
- Reported speech ("she told me that...")
- Cleft sentences ("what worries me is...")
- Present perfect continuous / wish / if only
- Conectores de matiz: although, even though, whereas, on the other hand, I'd argue that, to be fair, that being said, unless, as long as
- Turnos largos: 3–4 oraciones conectadas de opinión o argumento, sin narrador que las corte
- Phrasal verbs avanzados y collocations de negocio

Resultado: una tabla corta por episodio con lo que falta, que te presento antes de reescribir.

## Paso 2 — Reescritura a mano, episodio por episodio

Por cada episodio, y con revisión tuya entre uno y otro:

- La estructura gramatical del día oficial aparece en el diálogo y en la práctica del estudiante
- Mínimo 6 estructuras B2 integradas de forma natural en el diálogo
- Al menos 2 turnos largos (3–4 oraciones conectadas)
- Lenguaje abstracto: opinión, hipótesis, desacuerdo educado, negociación — no solo narración de hechos
- Preguntas "tu turno": de repetir una frase modelo a dar una opinión y justificarla, con estructura guía y validación flexible
- Glosario: cada palabra o expresión nueva con significado en español; phrasal verbs e idioms como expresión completa
- Vale sigue sonando maestra experimentada y empresaria; las dudas son del estudiante
- Traducciones al español revisadas línea por línea

## Verificación

- Test automático nuevo que cuente estructuras B2 (mínimo 6) y turnos largos (mínimo 2) por episodio
- Suite de Storybook existente (104 tests), typecheck y carga de las rutas de los 5 episodios en móvil

## Detalles técnicos

- Archivos: `src/services/storybook/advanced-1-ep1..ep5-*.ts`
- Currícula oficial: `src/services/advanced-1-course.ts` (días 1–5, week 1)
- El nuevo test de nivel detecta patrones (would have, if + past perfect, pasivas, reported speech, conectores) y vive junto a los tests de Storybook
- Sin cambios en arte, registro de temporada, límites diarios ni grabación final (tope de 30s se mantiene)
