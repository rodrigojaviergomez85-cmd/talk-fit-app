# Vale como maestra experimentada y empresaria (Advanced 1)

Hoy, en varios momentos, Vale habla como si estuviera aprendiendo inglés: admite que mezcla los tiempos verbales, que se pone nerviosa con la gramática y le da la razón a Mr. Reed como si él fuera su profesor. Eso rompe su credibilidad: Vale enseña inglés y dirige su propia academia.

## Qué cambia

Reescribir la voz de Vale en los 20 episodios de Advanced 1 para que siempre suene como profesional con años de experiencia:

- Vale nunca duda de su inglés ni pide que le corrijan la gramática.
- Las dudas, los nervios y la práctica pasan al estudiante (tú): donde antes Vale decía "me equivoco con los tiempos", ahora ella explica la regla y te invita a probarla.
- Frente a Mr. Reed y al comité, Vale negocia de igual a igual: aporta datos, resultados y criterio de negocio, no aprobación.
- Se conserva la trama, los personajes, las imágenes ya producidas y la duración de cada episodio.

## Alcance

- Episodios 1 a 5: ya están dentro de la app; se corrigen sus diálogos, tarjetas de mentalidad, preguntas y cierres.
- Episodios 6 a 20: aún son guiones escritos; se corrige la voz de Vale en los guiones para que se produzcan ya con el tono correcto.

## Ejemplos de corrección

| Antes (Vale novata) | Después (Vale experta) |
| --- | --- |
| "And the grammar? I mix my past tenses when I get nervous." | "Watch the tenses here: past progressive sets the scene, simple past moves it. Your turn." |
| "The past progressive painted the scene... Reed was right." | "That is exactly the structure I train my students to use." |
| Vale pide consejo sobre cómo contar su historia | Vale decide la estrategia y explica por qué funciona |

## Detalles técnicos

- Archivos: `src/services/storybook/advanced-1-ep1..ep5*.ts` (líneas de diálogo, `mindset`/`habit`, quizzes, finale, cliffhanger) y los guiones en `/mnt/documents/guion-advanced-1-episodios-*.md`.
- Toda palabra tocable nueva debe existir literal en el texto de la escena y tener traducción en `glossary.ts`.
- Se mantiene la estructura actual (9 escenas, recording de 30 s) y las imágenes existentes; no se regenera arte.
- Verificación: `bunx vitest run src/services/storybook`, typecheck y carga de los episodios en móvil.
