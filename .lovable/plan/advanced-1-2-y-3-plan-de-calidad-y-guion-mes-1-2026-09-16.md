# Advanced 1, 2 y 3 — plan de calidad y guion mes 1

Objetivo: terminar la historia de Vale de B1 a B2 con la calidad de Sharks 10–15, escrito a mano, más fluido, sin repetir el error de Sharks 3–20.

## Currícula oficial de los módulos (fuente: los cursos del app)

La historia DEBE servir a la currícula, no al revés. Cada episodio recicla el foco del día de su módulo:

- **Advanced 1 — GET HIRED (entrevistas de trabajo):** presentación profesional, historias conductuales (reto, error, conflicto, ayuda), preguntas difíciles (por qué te fuiste, fracaso, por qué aquí, salario), presión final.
- **Advanced 2 — Customer service y ventas:** entender al cliente, recomendar y vender, resolver problemas, desempeño en el trabajo real.
- **Advanced 3 — Opinión y pensamiento sin guion:** organizar ideas, tomar posición, manejar lo inesperado, reflexionar y conectar.

## Lecciones aprendidas (reglas obligatorias)

1. Escritura a mano, escena por escena. Nada de plantillas ni relleno automático.
2. 11 escenas, 33 líneas encadenadas (cada línea responde a la anterior), 550–650 palabras.
3. Diálogo estilo serie real: interrupciones, humor, desacuerdos. Narración mínima.
4. Vocabulario contextual: mínimo 3 tocables por escena, 16 unidades nuevas B1–B2 por episodio + 10–20 recicladas. Exactamente 2 phrasal verbs y 1 idiom/colocación, subrayados como expresión completa.
5. Quiz y "Say It" nacen del diálogo del episodio, nunca genéricos.
6. Arte solo después de aprobar el guion; `imageAlt` describe la escena real.
7. Canon fijo: Vale (mostaza), Dani (hombre joven, camisa celeste), Camila (afrolatina, morada), Renata (carmesí), Reed (canoso, azul marino). Mateo prohibido.
8. Arte: cómic 2D juvenil estilo Sharks 10–15, 768×768, RGB progresivo, <250 KB, sin texto ni logos ni recortes.
9. Puertas por episodio: guion aprobado → arte → auditoría texto/imagen → tests + revisión móvil.

## Flujo por mes

Mes 1 = Advanced 1, Mes 2 = Advanced 2, Mes 3 = Advanced 3. Por mes: 20 ideas → guiones a mano en lotes de 5 → arte de esos 5 → auditoría y tests. No se empieza el mes siguiente sin cerrar el anterior.

## Puente desde Sharks 20

México firmado por fases, Dani a cargo de operaciones (sigue empleado), Reed invita a Vale a competir por un programa internacional. El concurso funciona como la "entrevista de trabajo más grande de su vida" — paralela directa a la currícula GET HIRED.

## Mes 1 — Advanced 1: "Ganarse la oportunidad" (20 ideas alineadas al día)

| Día | Foco del módulo (currícula) | Idea del episodio |
|---|---|---|
| 1 | Presentación profesional: AHORA → EXPERIENCIA → FORTALEZA → META | Reed explica las reglas; Vale se presenta ante el comité con esa estructura |
| 2 | Experiencia real en pasado: SITUACIÓN → ACCIÓN → RESULTADO → LECCIÓN | Vale cuenta cómo salvó el contrato de Northline |
| 3 | "Por qué contratarte": fortalezas y valor | Vale forma su equipo y cada uno defiende su fortaleza |
| 4 | Debilidad y metas con honestidad | Vale admite ante Reed su debilidad con los números fríos |
| 5 | Pressure Round del reclutador | Simulacro: Reed hace de reclutador duro; ensayo general (checkpoint hablado) |
| 6 | Reto: SITUACIÓN → ACCIÓN → RESULTADO → LECCIÓN | La primera versión de la propuesta es aburrida; Reed la critica |
| 7 | Un error: RESPONSABILIDAD → ACCIÓN → LECCIÓN, sin culpar a otros | Los números de retención no cuadran y Vale asume el error |
| 8 | Conflicto con control emocional | Dani y Camila chocan sobre la estrategia; Vale media |
| 9 | Pensamiento orientado al cliente | Entrevistan a estudiantes reales para hallar la historia que vende |
| 10 | Ronda conductual: 4 historias con seguimientos ocultos | Ronda de práctica: cada uno cuenta su historia (checkpoint hablado) |
| 11 | "Por qué te fuiste": HECHO → MARCO POSITIVO → QUÉ QUIERO | Un competidor grande entra al concurso; Vale encuadra en positivo |
| 12 | Fracaso: RESPONSABILIDAD → CAMBIO → RESULTADO | Una maestra clave renuncia en el peor momento; Vale responde |
| 13 | "Por qué aquí": EMPRESA → MATCH → VALOR → FUTURO | Camila investiga al comité y descubre por qué Vale es el match |
| 14 | Desacuerdo profesional calmado: salario y horario | Renata exige prioridad para México; Vale negocia sin romper el acuerdo |
| 15 | Ronda difícil: CALMA → RESPUESTA → SOPORTE → SEGUIR HABLANDO | Videollamada hostil con el comité: preguntas duras (checkpoint hablado) |
| 16 | Historia profesional de 75–90 s: PASADO → PRESENTE → FUTURO | Camila toma su primer rol de liderazgo y presenta la historia del equipo |
| 17 | Reclutador inesperado: escenario sorpresa | Un miembro sorpresa del comité visita la academia sin avisar |
| 18 | Preguntas locas con 10 s para pensar | Reed dispara preguntas inesperadas la noche anterior |
| 19 | Cambio de rol: reclutador → cliente enojado → ventas | Un cliente molesto llama en pleno ensayo; Dani lo resuelve |
| 20 | Simulación final de presión | La presentación final: Vale gana el piloto internacional con una condición que abre Advanced 2 (monólogo de 45 s) |

## Detalles técnicos

- Archivos `src/services/storybook/adv1-epN-<slug>.ts`, registrados en el índice de episodios, mapeados a Advanced 1 día N (los IDs `a1d*` del módulo no se tocan).
- 16 unidades por episodio en `EPISODE_VOCAB_BUDGET` (`vocabulary-targets.ts`), validadas por `vocabulary-budget.test.ts`.
- Assets en `src/assets/storybook/adv1-epN-<slug>/` (cover + s1–s11).
- Tests por lote: consistencia, alineación curricular, vocabulario, TypeScript y carga de la ruta.
- Candados: 2 episodios nuevos por día, repaso hacia atrás, futuro bloqueado.

## Siguiente paso

Al aprobar estas 20 ideas, entrego los guiones completos de Advanced 1 episodios 1–5 para revisión antes de producir arte.
