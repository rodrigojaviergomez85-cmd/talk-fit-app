# Advanced 1, 2 y 3 — plan de calidad y guion mes 1

Objetivo: terminar la historia de Vale de B1 a B2 con la misma calidad de Sharks 10–15, escrito a mano, más fluido, sin los errores de Sharks 3–20.

## Lecciones aprendidas (reglas obligatorias)

1. Escritura a mano, escena por escena. Nada de plantillas ni relleno automático.
2. Cada episodio: 11 escenas, 33 líneas encadenadas (cada línea responde a la anterior), 550–650 palabras habladas.
3. Diálogo estilo serie real: interrupciones, humor, silencios, desacuerdos. Narración mínima.
4. Vocabulario contextual real: mínimo 3 palabras tocables por escena, 16 unidades nuevas B1–B2 por episodio, + 10–20 recicladas. Exactamente 2 phrasal verbs y 1 idiom/colocación, subrayados como expresión completa.
5. Quiz y "Say It" nacen del diálogo de ese episodio, nunca genéricos.
6. `imageAlt` describe la escena real; el arte se produce solo después de aprobar el guion.
7. Canon fijo: Vale (mostaza), Dani (hombre joven, camisa celeste), Camila (afrolatina, blusa morada), Renata (blazer carmesí), Reed (canoso, traje azul). Mateo prohibido desde Sharks.
8. Arte: estilo cómic 2D juvenil de Sharks 10–15, 768×768, RGB progresivo, <250 KB, sin texto ni logos ni recortes.
9. Puertas de calidad por episodio antes de continuar: guion aprobado → arte → auditoría texto/imagen → tests + revisión móvil.

## Flujo de trabajo (mes por mes)

- Mes 1 = Advanced 1 (20 episodios), Mes 2 = Advanced 2, Mes 3 = Advanced 3.
- Por mes: primero las 20 ideas (esto), luego guiones a mano en lotes de 5, luego arte de esos 5, luego auditoría y tests.
- No se empieza el mes siguiente sin cerrar el anterior.

## Puente desde Sharks 20

México firmado por fases, Dani a cargo de operaciones (sigue siendo empleado), Reed invita a Vale a competir por un programa internacional.

## Mes 1 — Advanced 1: "Ganarse la oportunidad" (20 ideas)

Tema de lengua: inglés profesional de alto nivel — presentar, defender ideas, negociar con cortesía, lenguaje hipotético y diplomático.

1. La invitación formal de Reed: reglas del programa internacional y la duda de Vale.
2. Formar el equipo de la propuesta: Camila, Dani y una nueva analista.
3. La primera versión de la propuesta es aburrida; Reed la critica sin filtros.
4. Entrevistar a estudiantes reales para encontrar la historia que vende.
5. Presentación de prueba ante el equipo: Vale se pasa del tiempo.
6. Aprender a resumir: el discurso de 60 segundos (checkpoint hablado).
7. Un competidor grande entra al concurso y Camila se desanima.
8. Problema de datos: los números de retención no cuadran.
9. Dani propone una idea arriesgada y Vale debe decidir si confía.
10. Videollamada difícil con el comité: preguntas hostiles (checkpoint hablado).
11. Renata pide prioridad para México justo en la semana clave.
12. Vale negocia tiempo sin romper el acuerdo de México.
13. Una maestra clave renuncia en el peor momento.
14. Camila toma su primer rol de liderazgo real.
15. Ensayo final: Vale practica lenguaje diplomático para desacuerdos (checkpoint hablado).
16. Falla técnica en el ensayo general; el equipo improvisa.
17. Reed da retroalimentación dura la noche anterior.
18. Día de la presentación: Vale presenta ante el comité internacional.
19. Preguntas y respuestas: la pregunta que nadie esperaba.
20. Resultado: Vale gana el piloto internacional, con una condición que abre Advanced 2 (monólogo de 45 s).

## Detalles técnicos

- Cada episodio: nuevo archivo en `src/services/storybook/adv1-epN-<slug>.ts`, registrado en el índice de episodios y mapeado a Advanced 1, día N.
- Presupuesto de vocabulario: agregar entrada por episodio en `EPISODE_VOCAB_BUDGET` (`src/services/storybook/vocabulary-targets.ts`), 16 unidades, validado por `vocabulary-budget.test.ts`.
- Assets en `src/assets/storybook/adv1-epN-<slug>/` (cover + s1–s11).
- Tests por lote: consistencia de historia, alineación curricular, presupuesto de vocabulario, TypeScript, y carga de la ruta `/natural-method/cuento/<slug>`.
- Candados de ruta: 2 episodios nuevos por día, repaso hacia atrás, futuro bloqueado.

## Siguiente paso

Al aprobar estas 20 ideas, entrego los guiones completos de Advanced 1 (episodios 1–5) para revisión antes de producir arte.
