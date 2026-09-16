# Elevar Advanced 1 a nivel B2 real

## Diagnóstico

El inglés de Advanced 1 (episodios 1–5) es correcto y fluido, pero de nivel B1: oraciones cortas y simples, presente/pasado básico, poco matiz. Un estudiante que termina Advanced así habla bien, pero no llega a B2. La meta declarada del programa es terminar en B2 en 11 meses, y Advanced 1–3 son los últimos 3 meses: aquí es donde el salto debe ocurrir.

## Reglas de nivel B2 por episodio (Advanced 1–3)

Cada episodio debe incluir, de forma natural dentro del diálogo:

- **Estructuras B2 obligatorias (mínimo 6 por episodio):** condicionales 2° y 3° ("if we had known", "I'd go with..."), voz pasiva ("the contract was signed"), reported speech ("she told me that..."), oraciones con "what... is..." ("what worries me is..."), wish/if only, present perfect continuous, phrasal verbs avanzados.
- **Turnos largos:** al menos 2 turnos por episodio de 3–4 oraciones conectadas (opinión, argumento, mini-monólogo), sin narrador que los corte.
- **Conectores de matiz:** although, even though, whereas, on the other hand, I'd argue that, to be fair, that being said, as long as, unless.
- **Lenguaje abstracto:** opiniones, hipótesis, negociación, desacuerdo educado — no solo narración de eventos.
- **Producción del estudiante más exigente:** las preguntas "tu turno" pasan de frases modelo a respuestas abiertas con estructura guía (ej. dar una opinión y justificarla); el monólogo final sube de 30s a respuestas de 45–60s en Advanced 2–3.
- **Vocabulario:** mantener las reglas ya aprobadas (16 unidades nuevas B1–B2 + 10–20 recicladas, 2 phrasal verbs completos + 1 idiom/collocation por episodio), pero elevando la selección a unidades claramente B2.

Lo que NO cambia: Vale como maestra/empresaria segura, el formato Friends (casi todo diálogo), elenco y voces canónicas, quizzes con Say It, cliffhangers, estructura de 9 escenas, arte realista 768×768 <250 KB.

## Trabajo por lotes

1. **Auditoría de nivel de Advanced 1 (eps 1–5 ya producidos):** marcar qué estructuras B2 faltan en cada episodio.
2. **Reescritura a mano de eps 1–5** para cumplir las reglas (misma historia, mismo arte; solo sube el nivel del inglés y de las preguntas del estudiante).
3. **Guiones nuevos de eps 6–20 ya escritos:** revisarlos contra las reglas B2 y reescribir los que queden cortos antes de producir arte.
4. **Advanced 2 y 3:** los guiones se escriben desde cero con estas reglas; en Advanced 3 se reduce el español de apoyo y las respuestas del estudiante son casi sin guía.
5. **QA por lote:** test automático que cuente estructuras B2 por episodio (mínimo 6) y turnos largos (mínimo 2), además de los tests de vocabulario/glosario existentes.

## Detalles técnicos

- Episodios en `src/services/storybook/advanced-1-ep*.ts`; registro en `src/services/storybook/index.ts`.
- El test de presupuesto de vocabulario ya existe; se añade un test de estructuras B2 (detección por patrones: would have, if + past perfect, pasivas, reported speech, conectores).
- Grabación final: el tope de 30s recién implementado se mantiene en Advanced 1; se evalúa subir a 45s solo en Advanced 2–3 (cambio de un parámetro por temporada).

## Verificación

- Test nuevo de estructuras B2 + suite de Storybook (104 tests) + typecheck.
- Revisión manual episodio por episodio antes de producir arte (igual que el proceso aprobado).
