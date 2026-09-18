# Temporadas 10 y 11 de El mundo de Vale: solo la estructura

Registrar Advanced 2 (Temporada 10) y Advanced 3 (Temporada 11) con sus 20 huecos por temporada, sumar los cuatro personajes nuevos al canon con sus voces, y dejar instaladas las pruebas que van a exigir alineación con el día del curso. No se escribe ningún episodio.

## 1. Las dos portadas

Dos imágenes cuadradas nuevas, mismo estilo del resto del storybook (768x768, JPG progresivo, menos de 250 KB):

- `src/assets/storybook/advanced-2-season/cover.jpg` — Dani con diadema de call center en el piso de Northline, de pie entre cubículos, agentes jóvenes al fondo, luz de tarde; un jefe que todavía toma llamadas.
- `src/assets/storybook/advanced-3-season/cover.jpg` — Dani en un set improvisado de transmisión en vivo: teléfono en trípode, anillo de luz, responde preguntas sin papeles en la mano.

Canon de Dani en ambas: piel morena clara, pelo negro rizado corto, sin lentes, camisa celeste. Sin texto ni logos legibles. Son obligatorias: sin ellas las temporadas no compilan.

## 2. El diff de soporte (cuatro archivos)

Se aplica tal cual lo adjunto; ya verifiqué que el contexto de las cuatro secciones coincide con el proyecto actual.

- `types.ts` — se suman `nico`, `julieta`, `oscar`, `estela` a la unión de hablantes.
- `character-canon.ts` — `advanced-2` y `advanced-3` entran a la lista de temporadas; se crean los cuatro personajes; se extienden las temporadas permitidas de Dani, Camila, Tito, Morgan, Elena, Barrett, Lidia, Keller y Mía.
- `voices.ts` — Nico: `youngMaleCalm` / `neutral`. Julieta: `female` / `earnest`. Óscar: `shyBoy` / `shy`. Doña Estela: `femaleMature` / `story`.
- `seasons.ts` — importa las dos portadas y registra las temporadas 10 y 11, cada una con 20 huecos, `episodeId: null` y su avance en inglés y español.

Reglas que se respetan: `mom` (mamá de Vale) no se agrega a las temporadas nuevas — la mamá de Dani es Doña Estela, personaje propio, para que no se repita el sonido dentro de una misma temporada. No se usa el nombre Rosa.

## 3. Las dos pruebas nuevas de currículo

`advanced2-curriculum-alignment.test.ts` y `advanced3-curriculum-alignment.test.ts` se copian tal cual a `src/services/storybook/`. Verifican 20 días exactos del 1 al 20 y que cada episodio publicado practique el marco de su propio día; los huecos se saltan, así que hoy pasan en verde y empiezan a exigir en cuanto salga el primer episodio.

## 4. Regla de "no hablar del curso" ampliada

En `advanced1-script-fidelity.test.ts`, la lista fija de cuatro episodios del cierre de Advanced 1 pasa a incluir además, de forma dinámica, todos los episodios de `advanced-2` y `advanced-3` registrados en el catálogo. Así la prohibición de decir "B2", "Advanced 2", "Advanced 3", "Your turn" o "framework" cubre las temporadas nuevas a medida que se publiquen, sin tocar las verificaciones existentes de Advanced 1.

## 5. Fuera de alcance

Ningún episodio, ningún arte de escena, ningún cambio a cursos, ruta de práctica, progreso, grabaciones, estrellas, puntos de liga ni glosario. El catálogo mostrará las dos temporadas según la lógica de desbloqueo existente, con sus veinte avances como próximamente.

## Verificación

Suite completa de pruebas y chequeo de tipos. Al final informo archivos creados y modificados, y los nombres finales de las dos portadas.
