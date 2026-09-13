# Guion maestro B1→B2: Eagles, Tigers, Sharks y Advanced 1-2-3

Seis temporadas nuevas (120 episodios) que dejan el tono de "cuento narrado" y pasan a **serie americana tipo sitcom/drama ligero**: diálogo rápido, réplicas cortas, humor, interrupciones y personajes que suenan a gente real, no a narrador.

## Cambio de formato: de cuento a serie

Hoy cada escena es una imagen + una frase (casi siempre del narrador). Desde Eagles, cada escena es un **intercambio de diálogo**: 2 a 4 réplicas entre personajes sobre la misma imagen, con voces distintas y ritmo natural.

- Narración: solo una línea de contexto al abrir el episodio ("Monday. 8:55 a.m. The new office."). Nada más.
- Réplicas cortas (6-14 palabras), lenguaje real: *Wait — seriously? / I mean… / Look, here's the thing.*
- Cada episodio tiene estructura de serie: **cold open** (gancho de 2 escenas) → conflicto → escalada → giro → **tag final** (chiste o gancho de 15 segundos).
- El estudiante ya no solo repite: **entra en la conversación**. En 2-3 momentos el episodio se detiene y le toca decir la réplica del personaje (misma escena, su turno).
- Se mantiene lo que ya funciona: palabras tocables con significado, preguntas rápidas, afirmaciones, grabación final de 15 s, cliffhanger.

## Arco maestro (la trama continúa)

| Temporada | Módulo | Historia | Inglés |
|---|---|---|---|
| 6 | EAGLES | La escuela de Vale firma su primer contrato con una empresa internacional. Dani entra como asistente. | Explicar, recomendar, resolver, vender |
| 7 | TIGERS | Un competidor grande copia el modelo de Vale; hay que defender el contrato. | Argumentar, dar evidencia, negociar |
| 8 | SHARKS | Crecimiento: empleados, clientes difíciles, imprevistos en vivo. | Improvisar, aclarar, reaccionar sin guion |
| 9 | ADVANCED 1 | Dani busca su primer trabajo bilingüe; Vale contrata maestros. | Entrevistas, contar tu historia |
| 10 | ADVANCED 2 | El turno real: operación diaria, clientes molestos, incidentes. | Atender, resolver, reportar |
| 11 | ADVANCED 3 | Oportunidad internacional: expandir a LATAM o quedarse. | Explicar ideas, hipótesis, hablar sin guion |

Cada temporada = 20 episodios (1 por día del módulo) y usa exactamente el vocabulario y la gramática de ese módulo. Continuidad de personajes: Vale, Dani, Camila, Kat, Mateo, más nuevos por temporada (socios, empleados, clientes corporativos).

## Voces tipo serie

- Cada personaje mantiene su voz (ya hay prueba automática que evita que dos compartan voz).
- Nuevo tono de entrega **conversacional**: más rápido, informal, con energía de serie; se acaba el tono "cuento leído".
- Las líneas se reproducen encadenadas para que la escena suene a conversación continua, no a frases sueltas.

## Piloto aprobado

**Eagles · Episodio 1 — "The Company Call"**: la empresa llama para pedir clases para su equipo; Vale y Dani improvisan una reunión para la que no están listos. 10-12 escenas de diálogo, 3 momentos donde el estudiante toma un turno, 3 preguntas rápidas, afirmación, cierre de 15 s y cliffhanger.

Se revisa el piloto contigo antes de producir el resto de la temporada.

## Detalles técnicos

- Ampliar `StorybookScene` con `lines?: { speaker, text, es }[]` (diálogo) manteniendo `text`/`speaker` para las temporadas 1-5, que **no cambian**.
- `StorybookPlayer.tsx`: render de burbujas de diálogo, reproducción secuencial por réplica con resaltado del hablante activo, y nuevo tipo de tarjeta "tu turno" (grabación con verificación flexible ya existente).
- Nuevo tono `sitcom` en `model-tone.ts` + mapeo en `/api/tts`; subir la versión de caché de audio.
- Nuevos hablantes en `StorybookSpeaker` + entradas en `voices.ts` y fichas canónicas en `_canon/` para cada personaje nuevo.
- Episodio piloto en `src/services/storybook/eagles-ep1-*.ts`, registrado en `index.ts` y `seasons.ts` (temporada 6, módulo `eagles-week-1`), con 11 imágenes bajo 300 KB.
- Pruebas: unicidad de voces, cobertura de arte, y una nueva que verifique que los episodios de Eagles+ usan diálogo (máximo una línea de narrador por episodio).
