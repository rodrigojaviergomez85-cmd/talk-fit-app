# Temporada 2: completar episodios 6–20

## Dónde estamos

- Los 20 guiones de la Temporada 2 ya están escritos, con preguntas variadas (What, Who, When, Where, Why, How) y sin presente simple.
- Solo los episodios 1–5 están terminados: tienen ilustraciones propias, están registrados y activos en los días 1–5.
- Los episodios 6–20 todavía usan ilustraciones prestadas de la Temporada 1 y no aparecen en la app.

## Qué se va a hacer

Sí, se puede avanzar todo de una vez. Se trabajará en 3 tandas de 5 episodios (6–10, 11–15, 16–20) dentro de la misma sesión, sin pausas para aprobación, y con la misma calidad y revisión que la Temporada 1.

Por cada episodio:

1. Crear sus 11 ilustraciones propias (portada + 10 escenas) en el estilo webtoon de la serie.
2. Revisar cada imagen contra las referencias oficiales de personajes: Vale, Luis, Mateo, Dylan, Kat, Camila, Ana, Mr. Reyes (piel, edad, cabello, ropa, anatomía correcta, continuidad de escenario).
3. Comprimir las imágenes para que la app siga cargando rápido en celular.
4. Conectar el episodio a su día (6 al 20) y activarlo.
5. Revisar que cada voz corresponda al personaje correcto (Vale, Mateo joven alegre, Dylan juvenil, narrador, etc.) y probar audio real.
6. Confirmar que cada episodio mantiene: 3 preguntas rápidas (2 personales con validación y 1 de repetición guiada), afirmación motivacional sin validación, grabación final de máximo 15 segundos y gancho al siguiente día.

Al final: revisión de tipos, pruebas automáticas y verificación en móvil de varios episodios (inicio, preguntas, grabación, salida).

## Detalles técnicos

- Imágenes nuevas en `src/assets/storybook/vale-s2-ep6` … `vale-s2-ep20`, reemplazando los imports prestados de `vale-ep*` en cada archivo `src/services/storybook/vale-s2-*.ts`.
- Registro en `src/services/storybook/index.ts` y asignación de días 6–20 en `src/services/storybook/seasons.ts` con su teaser bilingüe.
- Glosario por episodio revisado para que toda palabra nueva sea tappable con su significado en español.
- Pruebas: `s2-question-variety.test.ts`, `s2-personal-questions.test.ts`, `say-it-coverage.test.ts`, `seasons.test.ts`, `glossary.test.ts`, más `bunx tsgo`.
- Se añade una verificación automática de que ningún episodio de la Temporada 2 importe imágenes de la Temporada 1.

## Nota

Es un trabajo largo (unas 165 ilustraciones nuevas más revisiones). Si en algún episodio una imagen no queda consistente con el personaje oficial, se regenera antes de seguir.
