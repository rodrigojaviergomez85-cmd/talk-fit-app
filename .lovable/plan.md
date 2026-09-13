# Plan: reforzar hábitos positivos en Temporada 5

## Objetivo
Sembrar hábitos de alto rendimiento en el subconsciente del estudiante a través de la historia de Vale en la Temporada 5, sin romper el ritmo de aprendizaje de inglés. Los hábitos aparecerán modelados por los personajes y como micro-lecciones breves al final de cada episodio.

## Alcance
- Solo Temporada 5 (módulo de tiempos mixtos / "mixed-tenses").
- No se rehacen temporadas anteriores.
- Se mantiene el tono espiritual neutro e inclusivo: gratitud, esperanza y un momento de quietud, sin imponer creencias.

## Hilo narrativo de Temporada 5
Vale acaba de dejar el call center y abre su pequeña escuela de inglés. Tiene becarios, alumnos de paga, empleados cercanos y desafíos reales. La temporada usa presente, pasado y futuro mezclados. Los hábitos la ayudan a no rendirse mientras crece.

## Cinco pilares de hábitos (rotan cada 4 episodios)

```text
Episodios 1-4   Descanso y energía        (dormir temprano, despertar con propósito)
Episodios 5-8   Cuerpo y nutrición        (moverse, comer frutas/verduras, hidratarse)
Episodios 9-12  Aprender de mentores      (leer, escuchar consejos, usar la IA para practicar)
Episodios 13-16 Espíritu y mentalidad     (gratitud, un momento de quietud, confiar y seguir)
Episodios 17-20 Constancia y esfuerzo     (no rendirse, los errores son parte del proceso)
```

## Forma de integrarlo

### 1. Personajes modelando el hábito
Cada bloque asigna un hábito a un personaje que ya existe:

- Vale: se levanta temprano, lee un libro de mentor, toma un momento de quietud antes de una reunión difícil, repite "I can do it".
- Dani: aprende a dormir temprano para no perderse la clase del sábado.
- Kat: come fruta en el descanso, camina al trabajo.
- Mateo: empieza a hacer ejercicio en las mañanas.
- Mr. Reyes: bebe agua, da consejos de mentoria.
- Camila: usa la IA para preparar clases más rápido.
- Mamá de Vale: enseña gratitud y orar en silencio (presentada como su rutina personal, no como obligación).

### 2. Micro-lección final: "Hábito del día"
Al final de cada episodio se agrega una tarjeta corta con:

- Frase clave en inglés (1-2 oraciones).
- Traducción en español.
- Botón para escuchar la frase.
- Botón para repetir en voz alta (sin calificación de IA).
- Personaje que modeló el hábito y su acción.

Ejemplo:

```text
"I go to bed early so I can win tomorrow."
"Me acuesto temprano para ganar mañana."
Dani lo practica antes de su clase del sábado.
```

### 3. Tono espiritual neutro
Para la parte de "orar y confiar en Dios" se usa lenguaje inclusivo:

- "I take a quiet moment to breathe and believe."
- "I am grateful for what I have."
- "I trust that everything will be okay."
- "I believe in something bigger than my problems."

La mamá de Vale puede rezar en una escena como parte de su cultura, pero el estudiante solo escucha y repite la frase neutra si lo desea. No hay obligación religiosa.

### 4. Sin fricción ni evaluación
- La tarjeta de hábito no bloquea avanzar.
- No se usa IA para calificar la repetición.
- Se puede saltar, pero el diseño visual y el personaje motivan a repetir.
- Si el usuario repite, suena el efecto de estrella suave (sin sonido de error).

## Cambios técnicos

### Tipos de datos
Extender `StorybookEpisode` en `src/services/storybook/types.ts` agregando:

```ts
export type StorybookHabitCard = {
  /** Scene id after which the habit card appears. */
  afterScene: string;
  phrase: string;
  es: string;
  /** Character modeling the habit. */
  model: StorybookSpeaker;
  /** One-line Spanish description of what the character did. */
  modelActionEs: string;
};
```

Y añadir `habitCard?: StorybookHabitCard` a `StorybookEpisode`.

### Reproductor
Actualizar `StorybookPlayer.tsx` para renderizar `habitCard` como una diapositiva extra después de `afterScene`. Debe:

- Mostrar el personaje en pequeño con su nombre.
- Reproducir automáticamente la frase en inglés con la voz del `model`.
- Ofrecer botón "Escuchar de nuevo" con velocidad 1x.
- Botón "Repetir en voz alta" que graba un máximo de 15 segundos y reproduce la grabación (sin IA).
- Botón "Continuar" siempre activo.

### Guiones de Temporada 5
Cada uno de los 20 episodios incluirá:

- Hilo de la escuela de Vale.
- Gramática de tiempos mixtos.
- Un momento donde el hábito del bloque resuelve o evita un problema.
- `habitCard` con frase, traducción y personaje modelo.
- Preguntas de comprensión y `sayItCheck` acordes al tema.
- Final de 15 segundos grabando la continuación.

### Ejemplo de mapeo por episodio

| Día | Título tentativo | Hábito | Personaje modelo |
|-----|------------------|--------|------------------|
| 1 | The first students | Descanso | Vale se acuesta temprano |
| 2 | A tired teacher | Descanso | Dani duerme 8 horas |
| 3 | The early morning | Descanso | Vale despierta con energía |
| 4 | Win tomorrow | Descanso | Repaso: "I go to bed early" |
| 5 | Healthy snacks | Cuerpo/nutrición | Kat come fruta |
| 6 | Mateo runs | Cuerpo/nutrición | Mateo corre por la mañana |
| 7 | Water break | Cuerpo/nutrición | Todos beben agua |
| 8 | Strong body, strong mind | Cuerpo/nutrición | Repaso: "I eat vegetables" |
| 9 | A book from a mentor | Mentores/IA | Vale lee un consejo |
| 10 | Ask the AI | Mentores/IA | Camila usa IA para planificar |
| 11 | Practice every day | Mentores/IA | Dani practica 15 minutos |
| 12 | Learn from mistakes | Mentores/IA | Repaso: "I use AI to improve" |
| 13 | A quiet moment | Espíritu/mentalidad | Vale respira y agradece |
| 14 | Gratitude list | Espíritu/mentalidad | Mamá de Vale da gracias |
| 15 | Trust the process | Espíritu/mentalidad | Camila confía en el proceso |
| 16 | Believe in yourself | Espíritu/mentalidad | Repaso: "I trust and keep going" |
| 17 | The hard day | Constancia | Vale no se rinde |
| 18 | Try again | Constancia | Dani repite una lección |
| 19 | Mistakes are progress | Constancia | Repaso: "Mistakes are part of the process" |
| 20 | We did it | Constancia | Vale celebra con todos |

## QA y controles de calidad
- Cada personaje conserva ficha canónica (STYLE.md).
- Las frases de hábito usan vocabulario del nivel y tiempos mixtos.
- No se incluye texto legible dentro de las ilustraciones (salvo portadas).
- Audios usan la voz estable del personaje modelo.
- Pruebas en móvil 394 px.
- `bunx vitest run src/services/storybook` y `npx tsgo --noEmit` deben pasar.

## Criterios de aceptación
- [ ] Tipo `StorybookHabitCard` y campo `habitCard` añadidos.
- [ ] `StorybookPlayer` renderiza la tarjeta, reproduce audio y permite repetir sin IA.
- [ ] Los 20 guiones de Temporada 5 incluyen al menos una tarjeta de hábito cada uno.
- [ ] El tono espiritual es neutro e inclusivo.
- [ ] Tests y TypeScript pasan.
- [ ] Vista móvil validada.
