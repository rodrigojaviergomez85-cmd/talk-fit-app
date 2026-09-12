# Serie de cuentos animados: del A1 al B2 en 11 meses

## La idea grande: una sola serie, no cuentos sueltos

En vez de historias independientes, construimos **"El mundo de Vale"**: una sola serie tipo webtoon/novela con personajes fijos que crecen junto al estudiante. Vale entra al call center en el Episodio 1 y, once meses después, está negociando, resolviendo conflictos y cambiando de trabajo. El estudiante se engancha por la historia, no por el inglés — igual que una serie de TikTok.

- **Elenco fijo**: Vale (19), su jefe Mr. Reyes, su amiga Kat (la relajada), Dylan (el cliente difícil / interés romántico), su mamá (que no habla inglés).
- **Temporada = módulo**. Basic Zero es la Temporada 1; cada módulo siguiente es la siguiente temporada.
- **Episodio = semana**. 4 episodios por temporada, 1 por semana. Con 11 módulos son **44 episodios** ≈ 11 meses.

## Cómo hace match con el curso

Cada episodio usa **solo** el lenguaje de su semana, más el de las semanas ya vistas (repaso en espiral). Basic Zero queda así:

| Semana | Lo que enseña el módulo | Episodio |
| --- | --- | --- |
| 1 | Presentarse (My name is, I am from, I live in, my favorite…) | Ep 1 — El primer día de Vale *(ya hecho)* |
| 2 | Presentarse con fluidez, habla conectada | Ep 2 — La primera llamada (Vale se presenta a un cliente en vivo) |
| 3 | Hablar de otra persona (she/he is, her name is…) | Ep 3 — "¿Quién es ella?" (Vale le cuenta a Kat sobre Dylan) |
| 4 | Hablar de otra persona con fluidez | Ep 4 — La foto en el celular (Vale presenta a su familia al equipo) |

La regla es la misma para todas las temporadas: el guion se escribe **después** de leer los chunks de esa semana, y una prueba automática verifica que el episodio no use estructuras que el estudiante aún no vio.

## Cómo evitamos el aburrimiento

1. **Estreno semanal, no todo de golpe.** El episodio de la semana se desbloquea al llegar a esa semana del módulo. Efecto serie: siempre hay algo que esperar.
2. **Cliffhanger obligatorio** al final de cada episodio, y un "Previously…" de 3 viñetas al inicio del siguiente.
3. **Género rotativo** dentro de la temporada para que nunca sean cuatro capítulos iguales: comedia incómoda → drama de trabajo → chisme/romance → familia. Mismo elenco, tono distinto.
4. **El estudiante entra en la historia.** Cada episodio termina con una escena donde él graba su parte como si fuera un personaje; en el siguiente episodio se le recuerda lo que "dijo".
5. **Formato variable de escena**: chat de celular, videollamada, mensaje de voz, flashback — no siempre viñeta + narración.
6. **Decisión al final** ("¿Vale renuncia o se queda?") que no cambia la trama pero se comenta al inicio del próximo episodio.

## El vocabulario: llegar a 3,500–4,500 palabras activas

Presupuesto explícito por episodio: **~80–100 palabras nuevas tocables**, de las cuales **12–15 son "palabras de la semana"** que sí se practican en voz alta.

- 44 episodios × ~90 = ~4,000 palabras expuestas → dentro del rango objetivo.
- Las 12–15 activas por episodio (44 × 13 ≈ 570) se suman a las que ya se practican en los módulos; juntas forman el núcleo activo.
- **Mi cuaderno** guarda cada palabra tocada, con la frase donde apareció.
- **Repaso espaciado**: las palabras del cuaderno reaparecen como micro-preguntas TPRS ilustradas en episodios posteriores (días 1, 7 y 21 después de guardarlas).
- Cada episodio abre con un "repaso relámpago" de 4 palabras de episodios anteriores.

## Enganche y progreso

- Mapa de temporada en Audiolibros: 4 portadas, las futuras borrosas con "Semana 3".
- Estrellas por episodio (escenas leídas, aciertos TPRS, grabación final) y racha de episodios.
- Insignia al terminar cada temporada + tráiler de la siguiente.

## Producción: cómo se hacen 44 episodios sin morir

Un molde repetible por episodio:

1. Extraer los chunks de la semana desde el archivo del módulo.
2. Escribir el guion (10–14 escenas) con la estructura fija: gancho → conflicto → chunk clave repetido 3 veces → giro → cliffhanger.
3. Escribir glosario completo (todas las palabras, no solo las marcadas) y traducciones.
4. Generar ilustraciones con el mismo prompt de estilo y la misma ficha de personajes, para que el elenco se vea igual episodio a episodio.
5. Correr las verificaciones y probar en móvil.

Yo escribo y produzco cada episodio; tú apruebas guion e ilustraciones antes de publicarlo.

## Detalles técnicos

- `src/services/storybook/` pasa de un archivo suelto a estructura de serie: `seasons.ts` (temporada → módulo, episodio → semana, orden, portada, estado de bloqueo) + un archivo por episodio.
- Nuevos campos en `StorybookEpisode`: `moduleId`, `week`, `previously[]`, `glossary`, `reviewWords[]` (palabras de episodios previos a repasar), `choice?`.
- Desbloqueo: se calcula desde el progreso existente del módulo (día → semana); nada de tablas nuevas si el cuaderno vive en local + la sync actual.
- `src/routes/natural-method.audiobooks.tsx` muestra el mapa de temporada en vez de una sola tarjeta.
- Prueba automática nueva: cada episodio declara su semana y el test falla si aparece vocabulario/estructura fuera del alcance acumulado.
- Guía de estilo de ilustración y fichas de personaje en `src/assets/storybook/STYLE.md`.

## Qué construyo primero

Fase 1 (esta entrega si la apruebas): estructura de serie + mapa de temporada + desbloqueo por semana, con el Ep 1 ya existente adentro, y el **Episodio 2 completo** ("La primera llamada") como prueba del molde.

Fase 2: Episodios 3 y 4 de Basic Zero + repaso espaciado del cuaderno.

Fase 3 en adelante: una temporada por módulo, al ritmo que tú apruebes guiones.
