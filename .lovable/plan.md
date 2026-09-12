# Plan: Episodio 3 — «Who is he?»

## Objetivo de la serie

Llevar a estudiantes latinos de 18–24 años desde A1 hasta B2 en 11 meses con práctica diaria adictiva. Cada episodio convierte el idioma del módulo en una historia ilustrada: vocabulario tocable, preguntas TPRS, repetición oral y grabación final. La meta acumulada es manejar activamente 3,500–4,500 palabras y conseguir trabajos bilingües.

Nuevo objetivo permanente: entrenar mentalidad de resiliencia y pensar en grande. Que el estudiante no se rinda cuando la vida se ponga difícil, que se vea como futuro líder, supervisor, gerente o empresario, y que repita afirmaciones en voz alta.

## Banco de frases motivacionales

Se crea un banco rotativo para que nunca se sienta repetitivo:

- English is easy.
- I can do it.
- I believe in myself.
- I love challenges.
- I am disciplined.
- I am amazing.
- I am awesome.
- You are amazing.
- You are awesome.
- Mistakes are part of the process.
- Effort makes progress.
- I am a future leader.
- I think big.

Cada episodio usa una frase distinta. Al Episodio 3 le toca **English is easy. I love challenges.**

## Cómo se integra la mentalidad en cada historia

1. El personaje enfrenta un momento difícil o se equivoca.
2. Aparece una tarjeta corta con la frase del día en inglés y su significado en español.
3. El estudiante la dice en voz alta antes de continuar (con botón de escuchar y grabar).
4. El personaje lo intenta de nuevo y lo logra.
5. La escena final refuerza la idea de esfuerzo y progreso.

Esto queda como componente reutilizable para todos los episodios siguientes.

## Episodio 3 — «Who is he?»

Continúa directamente del final del Episodio 2, cuando Mr. Reyes llama a Vale a su oficina.

### Historia

Vale entra nerviosa a la oficina de Mr. Reyes, creyendo que hizo algo mal. En realidad la felicita y le presenta a Mateo, el nuevo agente. Mateo se presenta con frases básicas: nombre, edad, país, ciudad, color favorito y pasatiempos. Vale intenta presentarse otra vez, se traba y se apena; se siente pequeña frente a la situación. Mateo le recuerda que los retos son oportunidades y repiten juntos: «English is easy. I love challenges.» Vale respira, lo intenta de nuevo y le sale perfecto. Kat los ve y sonríe. Al final, Mr. Reyes los pone como pareja de práctica y Vale recibe una notificación extraña en su celular: el gancho del Episodio 4.

La moraleja del episodio conecta con el futuro grande del estudiante: aprender inglés no es solo un examen, es entrenamiento para ser el próximo líder, supervisor o empresario.

### Alcance de inglés (Basic Zero)

- Práctica activa: `My name is…`, `I am … years old.`, `I am from…`, `I live in…`, `My favorite color is…`, `My hobbies are…`.
- Exposición gradual: `Who is he?`, `His name is…`, `He is from…`.
- Sin `do/does` ni reglas formales de tercera persona.
- TPRS con `to be` y vocabulario visible en la imagen.

### Preguntas TPRS

1. Who is he? → Mateo
2. Where is he from? → según guion
3. What is his favorite color? → según guion

### Cierre

- Frase motivacional repetida en voz alta.
- Grabación final de 15 segundos: el estudiante se presenta y termina con «I can do it.»
- Botón «Listen to me», estrellas, cliffhanger y botón al Episodio 4.

## Cambios técnicos

1. Nuevo archivo `src/services/storybook/vale-who-is-he.ts` con 10 escenas, español, vocabulario tocable y 3 quizzes.
2. Nuevo tipo opcional `mindsetCard` en `src/services/storybook/types.ts` (frase en inglés, significado, escena donde aparece).
3. Nuevo componente de tarjeta motivacional dentro de `src/components/storybook/StorybookPlayer.tsx`, con audio y repetición hablada.
4. Nueva voz de personaje `mateo` (chico joven), distinta de Dylan y del narrador.
5. Ilustraciones nuevas en `src/assets/storybook/vale-ep3/` (portada + 10 escenas), revisadas para evitar errores de anatomía y texto tapado.
6. Registro del episodio en `src/services/storybook/index.ts` y en el Día 3 de `src/services/storybook/seasons.ts`.
7. Pruebas de contenido, desbloqueo, glosario y tarjeta motivacional; typecheck y verificación en vista móvil.

## Notas

- No se cambian las reglas de desbloqueo: los estudiantes avanzan día a día y tu cuenta mantiene todo desbloqueado.
- Si el resultado te gusta, en el siguiente paso planificamos los 20 episodios completos de Basic Zero por lotes.
