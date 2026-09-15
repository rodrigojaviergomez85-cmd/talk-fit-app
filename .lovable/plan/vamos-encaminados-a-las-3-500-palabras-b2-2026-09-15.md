# ¿Vamos encaminados a las 3,500 palabras B2?

## Dónde estamos hoy (medido sobre todo el contenido en inglés del curso)

| Medida | Palabras distintas |
| --- | --- |
| Total de palabras distintas que aparecen en inglés | 4,214 |
| Aparecen 2 veces o más | 3,033 |
| Aparecen 3 veces o más (vocabulario realmente activo) | 2,444 |
| Aparecen 5 veces o más (muy dominado) | 1,930 |

Aporte por bloque: módulos oficiales 2,678 · Review 1,522 · Temporadas 1-5 2,066 · Eagles 1,140 · Tigers 1,261 · Sharks 1-10 691.

## El hallazgo importante

Sharks 1-10 usa 691 palabras, pero solo **40 de ellas son palabras que no aparecían antes** en ningún otro lado. Tigers aportó 173 nuevas. Es decir: estamos reciclando mucho (bueno para fluidez) pero **inyectando muy poco vocabulario nuevo** (malo para llegar a B2).

Si seguimos al ritmo actual (unas 40-170 palabras nuevas por temporada), los 70 episodios restantes (Sharks 11-20 + Advanced 1, 2 y 3) sumarían apenas 300-600 palabras nuevas: terminaríamos alrededor de **2,800-3,000 activas**, por debajo de la meta.

## La corrección: presupuesto de vocabulario por episodio

Para cerrar la brecha necesitamos pasar de 2,444 a 3,500 activas, es decir **~1,050 palabras nuevas** repartidas en 70 episodios = **15 palabras/expresiones nuevas por episodio**, cada una repetida al menos 3 veces (en el diálogo, en el glosario y en una pregunta o turno hablado).

Cada episodio nuevo llevará:
- 15 unidades nuevas: 8 palabras de contenido B1-B2, 4 phrasal verbs, 3 idioms o colocaciones de negocios.
- 5 unidades recicladas de episodios anteriores para que no se olviden.
- Las nuevas quedan marcadas en el glosario como expresión completa (por ejemplo "back out" se subraya entero).

## Qué haremos ahora

1. Crear una lista maestra de vocabulario meta (B1-B2) con las ~1,050 unidades pendientes, repartida por temporada y día, evitando repetir lo ya cubierto.
2. Agregar una prueba automática que mida, por episodio, cuántas unidades nuevas trae y cuántas veces se repiten; falla si un episodio nuevo trae menos de 15.
3. Un panel simple de avance (solo para ti) que muestre: palabras activas acumuladas y proyección hacia 3,500.
4. Producir **Sharks 11-20** (10 episodios) con ese presupuesto aplicado, manteniendo el mismo formato ya aprobado: 11 escenas de diálogo, 3 preguntas aleatorias, 4 turnos hablados (2 abiertos), afirmaciones, cliffhanger, finales de 30 segundos y checkpoints de 45 segundos en los días 15 y 20, personajes y voces canónicos, e ilustraciones reales 768×768 de la misma calidad que el episodio 2.
5. Al terminar, revisión de consistencia de textos, personajes, voces e imágenes, y QA de rutas.

Después seguimos con Advanced 1, 2 y 3 bajo el mismo presupuesto.

## Detalles técnicos

- El conteo se hace agrupando formas de una misma palabra (plural, -ing, -ed) y contando solo texto en inglés de `src/services` (módulos, Review y storybook).
- Nueva fuente de verdad: `src/services/storybook/vocabulary-targets.ts` (lista meta + unidades ya cubiertas) y `vocabulary-budget.test.ts` para la verificación por episodio.
- Las expresiones de varias palabras se registran en `expressions.ts`, que ya soporta coincidencia de frase completa.
- No se tocan los límites de práctica, los guiones ya publicados ni las temporadas 1-5.
