# Temporada 4 — Episodios 11 al 20 + doble revisión de calidad

Cierra la Temporada 4 (Basic 3 / historias en pasado) con los últimos 10 episodios y una revisión general al final.

## Bloque 1 — Episodios 11 a 15: pasado progresivo

Tema gramatical: "was/were + -ing", interrupciones con "when", y contraste con pasado simple.

- Ep. 11 — Vale estaba estudiando cuando Kat llamó.
- Ep. 12 — Mateo estaba cocinando cuando se fue la luz.
- Ep. 13 — Dani estaba practicando inglés en el bus.
- Ep. 14 — Luis estaba trabajando cuando llegó una noticia.
- Ep. 15 — Reto de la Semana 3: todos cuentan qué estaban haciendo ese día.

## Bloque 2 — Episodios 16 a 20: contar historias con conectores

Tema: narrar con first / then / after that / suddenly / finally, mezclando pasado simple y progresivo.

- Ep. 16 — Vale cuenta su primera historia completa.
- Ep. 17 — Caperucita Roja en inglés sencillo (versión Vale).
- Ep. 18 — Dani cuenta su propia historia frente a la clase.
- Ep. 19 — La periodista Camila publica el artículo.
- Ep. 20 — Final de temporada: la decisión de Vale y gancho hacia la Temporada 5 (su escuela).

## Formato de cada episodio (igual a los episodios 6-10)

- 12 escenas + portada, ilustraciones estilo webtoon.
- 45 a 50 palabras tocables con significado en español.
- 3 preguntas rápidas con audio automático y una respuesta personal hablada.
- Frases de ánimo habladas (sin calificación de IA).
- Grabación final de máximo 15 segundos y gancho para el día siguiente.
- Un episodio por día, desbloqueo secuencial.

## Doble revisión de calidad al final

1. Revisión uno por uno de los 10 episodios: identidad de cada personaje (piel, cabello, ropa), dos brazos, sin texto legible en las imágenes, tamaños proporcionales.
2. Revisión de contenido: que todo el inglés sea de Basic 3, que no haya preguntas fuera de tema, que las voces de cada personaje sean las correctas y que el vocabulario tenga su traducción.
3. Revisión técnica: imágenes bajo 300 KB, episodios registrados y asignados a su día, pruebas y verificación en pantalla de celular.

## Detalles técnicos

- Nuevos guiones en `src/services/storybook/vale-s4-*.ts`, registrados en `index.ts` y asignados a los días 11-20 en `seasons.ts`.
- Arte nuevo en `src/assets/storybook/vale-s4-ep11..ep20/` (`cover.jpg`, `s1.jpg`–`s12.jpg`), comprimido bajo 300 KB.
- Vocabulario nuevo agregado al glosario con respaldo en español.
- Al cerrar: `bunx vitest run`, `npx tsgo --noEmit`, verificación de rutas y QA móvil a 394px.
