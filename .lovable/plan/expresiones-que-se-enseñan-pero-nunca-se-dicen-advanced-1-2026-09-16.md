# Expresiones que se enseñan pero nunca se dicen (Advanced 1)

## Lo que encontré
La tarjeta final "Say it like a native" enseña expresiones que deben haber sido dichas por un personaje dentro del episodio. Al revisar todos los episodios de El Mundo de Vale, solo Advanced 1 falla:

| Episodio | Expresión que nadie dice |
|---|---|
| 4 · My honest weakness | back up |
| 6 · A heartbeat for the proposal | come up with |
| 7 · The numbers do not lie | double-check |
| 8 · Two right answers | back down, work out, meet in the middle |
| 9 · In their own words | write down |

Temporadas 1 a 5, Eagles, Tigers y Sharks están correctas.

## Cómo lo voy a arreglar
Escribo a mano las líneas, una por una, sin tocar la historia, las imágenes, los personajes ni el orden de escenas. En cada caso reescribo una línea existente para que la expresión salga natural en boca del personaje correcto, y luego hago que la frase de ejemplo de la tarjeta final sea exactamente esa línea.

**Episodio 8** (el que reportaste):
1. Escena 3 — Vale nombra que ninguno de los dos va a ceder frente al comité ("back down").
2. Escena 5 — Vale presenta la tercera versión como algo que resolvieron entre todos ("work out").
3. Escena 7 — Camila explica ante el comité que llegaron a un punto medio ("meet in the middle").

**Episodios 4, 6, 7 y 9**: una línea reescrita en cada uno, en la escena donde la expresión tiene sentido real (respaldar una afirmación con datos, proponer una idea nueva, verificar cifras, anotar lo que dicen los estudiantes).

## Detalles técnicos
- Archivos: `src/services/storybook/advanced-1-ep4-*.ts`, `ep6`, `ep7`, `ep8`, `ep9`.
- Se editan solo `text`/`es` de las líneas elegidas y los `example`/`exampleEs` del bloque `expressions`, que quedarán idénticos al diálogo.
- Palabras nuevas se agregan a `words` de la escena y, si falta algún token, a `src/services/storybook/glossary.ts`, para que todo siga teniendo significado al tocarlo.
- Sin cambios en arte, quizzes, `sayIt`, casting, voces ni el tope de grabación de 30 segundos.
- Verificación: suite de Storybook, `tsgo`, carga de las cinco rutas y un chequeo que confirme que cada expresión enseñada aparece en el diálogo de su episodio.
