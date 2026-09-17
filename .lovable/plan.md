# Episodio 17 escrito a mano — "Show me, don't tell me"

## Lo que entendí

Reescribir a mano el Episodio 17 de Advanced 1 (Día 17, entrevista por competencias), con la misma calidad conversacional que quedó el Episodio 16, cuidando que la historia enganche con el 16 y que el inglés siga el nivel B2 del día en la currícula, con sus phrasal verbs e idioms.

## Estado actual (verificado)

- El Episodio 17 ya existe y funciona, pero es más delgado que el 16: 32 turnos de diálogo contra 44 del Episodio 16.
- El guion aprobado del Episodio 17 está en Files (`guion-advanced-1-episodios-16-20-v2.md`) e incluye: phrasal verbs **point out** y **follow up on**, expresiones **walk the talk** y **a paper promise**, 11 escenas, dos turnos largos y cierre grabado de 30 segundos.
- El Episodio 16 termina con el plan de noventa días aceptado y con la entrevista del miércoles ya anunciada; el 17 abre justo ahí, así que la continuidad de entrada está bien y solo hay que reforzarla dentro del texto.
- Personajes del 17: Vale, Barrett, Dani, Lidia y Elena. Coincide con el canon y con el 18 y 19 (entrevistan a Dani y Lidia).

## Qué voy a hacer

1. **Reescribir el diálogo a mano**, escena por escena, respetando el guion aprobado: misma historia, mismas decisiones, mismo final.
   - Subir a 34–40 turnos conversacionales, sin escenas donde hable una sola persona.
   - Turnos normales cortos (máximo ~32 palabras) y solo dos turnos largos: el de Dani en la escena 5 y el de Vale en la escena 10.
   - Agregar réplicas, interrupciones y reacciones reales de Barrett, Lidia, Dani y Elena, como en el 16.
2. **Continuidad con el Episodio 16**: referencias explícitas a los noventa días, a que Vale no vota, y al hecho de que Dani viene de operaciones y Lidia de enseñar el método.
3. **Nivel B2 del día**: estructuras de entrevista por competencias (condicionales, pasado, reportar resultados con números), las dos expresiones y dos phrasal verbs nuevos del día marcados como expresión completa para el glosario, más repaso de vocabulario ya visto.
4. **Preguntas y práctica**: preguntas de comprensión coherentes con el texto nuevo, en orden aleatorio, turno abierto del aprendiz (respuesta por competencias con situación, acción, resultado y un número) y grabación final de 30 segundos.
5. **Glosario tocable** en cada escena, con las expresiones completas (`point out`, `follow up on`, `walk the talk`, `a paper promise`) traducidas como unidad, no palabra por palabra.
6. **Arte**: se mantiene el arte actual del Episodio 17. Solo reviso que cada escena siga correspondiendo a su imagen y, si alguna deja de coincidir por el texto nuevo, te lo señalo antes de regenerarla.
7. **QA**: pruebas automáticas, revisión de tipos y verificación de que el episodio abre bien en móvil.

## Detalles técnicos

- Archivo a reescribir: `src/services/storybook/advanced-1-ep17-show-me-dont-tell-me.ts` (se conservan `id`, `moduleId`, `week`, imports de imágenes y estructura de escenas `lines` / `words` / `cast`).
- Fuente autorizada del contenido: `/mnt/documents/guion-advanced-1-episodios-16-20-v2.md`, sección Episodio 17.
- Referencia de densidad y formato: `advanced-1-ep16-the-ninety-days.ts`.
- Nuevos términos de glosario se agregan en `src/services/storybook/glossary.ts` cuando falten.
- Se ejecutan las pruebas de consistencia de reparto y el chequeo de tipos antes de entregar.

## Fuera de alcance

- No se toca ningún otro episodio ni el Episodio 16.
- No se cambia la progresión, los audios ni las reglas de desbloqueo.
