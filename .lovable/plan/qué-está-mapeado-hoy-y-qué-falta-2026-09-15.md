# Qué está mapeado hoy y qué falta

## Respuesta corta

- **Eagles (temporada 6), días 1–20: sí, mapeado día por día.** El plan maestro de Eagles ya dice qué gramática y qué momento de la trama va en cada día, incluidos los días 7 al 20. Solo faltan producir los episodios 7–20 (los 1–6 ya están listos).
- **Tigers, Sharks y Advanced 1, 2 y 3: mapeados solo a nivel de temporada**, no día por día. El guion maestro define la historia y el objetivo de inglés de cada una, pero todavía no existe la tabla de 20 días por temporada.

## Arco ya aprobado (guion maestro)

| Temporada | Módulo | Historia | Inglés |
|---|---|---|---|
| 6 | Eagles | Primer contrato con una empresa internacional | Explicar, recomendar, resolver, vender |
| 7 | Tigers | Un competidor grande copia el modelo de Vale | Argumentar, dar evidencia, negociar |
| 8 | Sharks | Crecimiento: empleados, clientes difíciles, imprevistos | Improvisar, aclarar, reaccionar sin guion |
| 9 | Advanced 1 | Dani busca su primer trabajo bilingüe | Entrevistas, contar tu historia |
| 10 | Advanced 2 | La operación diaria: clientes molestos, incidentes | Atender, resolver, reportar |
| 11 | Advanced 3 | Oportunidad internacional: expandir o quedarse | Ideas, hipótesis, hablar sin guion |

## Lo que propongo hacer ahora

**Paso 1 — Completar los mapas día por día que faltan.**
Un mapa por cada temporada (Tigers, Sharks, Advanced 1, 2 y 3): 20 líneas por temporada, cada una con el día, el tema del curso oficial, la escena de la trama y los 3 momentos hablados del estudiante. Se toma directo del contenido del curso que ya existe, para que la historia y la clase del día siempre coincidan. Ejemplo de lo que ya está en el curso:

- Tigers día 1 "A Decision I Made", día 2 "What Could Happen?", día 3 "Give Advice & Defend It", día 4 "What Needs to Change?", día 5 "What Would You Do?".
- Sharks día 1 "Tell the Story", día 2 "What Could Happen Next?", día 3 "Advice Under Pressure", día 4 "Prioritize the Problem", día 5 "Unexpected Situation".
- Advanced 1 arranca con "Tell Me About Yourself"; Advanced 2 con "Understand the Customer"; Advanced 3 con "Explain an Unexpected Experience".

Además, fijar la continuidad de personajes por temporada (quién entra, quién sale) y la lista de voces nuevas, para no repetir voces entre personajes.

**Paso 2 — Producir Eagles 7–20.**
En tandas de cinco episodios (7–10, 11–15, 16–20), igual que los últimos: diálogo tipo serie, 3 preguntas calificadas con la gramática del día, turnos del estudiante, afirmaciones, cierre de 15 segundos, cliffhanger, 11 ilustraciones por episodio y la triple revisión automática de imágenes y voces.

**Paso 3 — Temporadas 7 a 11.**
Una temporada a la vez, en el mismo formato, revisando contigo el episodio 1 de cada temporada antes de producir el resto.

## Detalles técnicos

- Fuente de verdad de cada día: `src/services/tigers-week-1-course.ts`, `tigers-weeks-2-4-course.ts`, `sharks-*`, `advanced-1/2/3-*` (campos `topic` y `focus`).
- Los mapas nuevos se guardan como documentos de plan, uno por temporada, con la misma estructura del plan de Eagles.
- Cada temporada nueva necesita su entrada en `src/services/storybook/seasons.ts` con los 20 slots, registro en `index.ts`, fichas canónicas en `_canon/` para personajes nuevos y entradas en `voices.ts`.
- La prueba `eagles-consistency.test.ts` se generaliza para cubrir cualquier temporada de diálogo (arte presente, peso bajo 250 KB, texto alternativo, voz única por personaje, formato de diálogo).
- Los candados por ruta oficial y el límite de episodios por día no cambian.
