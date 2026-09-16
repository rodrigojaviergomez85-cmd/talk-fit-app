# Vale como maestra experimentada y empresaria (Advanced 1)

Hoy, en varios momentos, Vale habla como si estuviera aprendiendo inglés: admite que mezcla los tiempos verbales, que se pone nerviosa con la gramática y le da la razón a Mr. Reed como si él fuera su profesor. Eso rompe su credibilidad: Vale enseña inglés y dirige su propia academia.

## Método: a mano, episodio por episodio

Nada de reemplazos automáticos. Por cada episodio:

1. Leo el episodio completo, escena por escena.
2. Reescribo a mano las líneas de Vale y lo que haga falta alrededor para que la conversación siga teniendo lógica.
3. Reviso quiz, tarjetas de mentalidad, cierre y cliffhanger del mismo episodio.
4. Corro las pruebas y te muestro el resultado antes de pasar al siguiente.

Vamos en orden: 1, 2, 3, 4, 5… hasta 20. Tú apruebas o corriges sobre la marcha.

## Cómo suena Vale a partir de ahora

- Nunca duda de su inglés ni pide que le corrijan la gramática.
- Las dudas, los nervios y la práctica pasan al estudiante (tú): donde antes Vale decía "me equivoco con los tiempos", ahora ella explica la regla y te invita a probarla.
- Frente a Mr. Reed y al comité negocia de igual a igual: aporta datos, resultados y criterio de negocio, no busca aprobación.
- Se conserva la trama, los personajes, las imágenes ya producidas y la duración de cada episodio.

## Alcance

- Episodios 1 a 5: ya están en la app; se corrigen sus diálogos y textos.
- Episodios 6 a 20: aún son guiones escritos; se corrigen a mano con el mismo criterio para producirlos ya con el tono correcto.

## Ejemplos de corrección

| Antes (Vale novata) | Después (Vale experta) |
| --- | --- |
| "And the grammar? I mix my past tenses when I get nervous." | "Watch the tenses here: past progressive sets the scene, simple past moves it. Your turn." |
| "The past progressive painted the scene... Reed was right." | "That is exactly the structure I train my students to use." |
| Vale pide consejo sobre cómo contar su historia | Vale decide la estrategia y explica por qué funciona |

## Detalles técnicos

- Archivos: `src/services/storybook/advanced-1-ep1..ep5*.ts` (líneas, `mindset`/`habit`, quizzes, finale, cliffhanger) y los guiones en `/mnt/documents/guion-advanced-1-episodios-*.md`.
- Toda palabra tocable nueva debe existir literal en el texto de su escena y tener traducción en `glossary.ts`.
- Se mantiene la estructura actual (9 escenas, grabación de 30 s) y las imágenes existentes; no se regenera arte.
- Verificación por episodio: `bunx vitest run src/services/storybook`; al cerrar cada bloque, typecheck y carga móvil del episodio.
