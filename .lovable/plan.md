# Plan: Episodio 3 — «Who is he?»

## Objetivo de la serie

Llevar a estudiantes latinos de 18–24 años desde A1 hasta B2 en 11 meses, con práctica diaria adictiva. Cada episodio convierte el idioma del módulo en una historia ilustrada, con vocabulario tocable, preguntas TPRS, repetición oral y una grabación final. La meta acumulada es manejar activamente 3,500–4,500 palabras y preparar al estudiante para trabajos bilingües.

Además, cada episodio debe enseñar mentalidad de perseverancia: no rendirse cuando el inglés se pone difícil, decir afirmaciones en voz alta y repetir la cultura de la academia:

- **English is easy.**
- **I can do it.**
- **Mistakes are part of the process.**
- **Effort makes progress.** / El esfuerzo produce progreso.

## Episodio 3

Crear el episodio del Día 3 de Basic Zero como una continuación directa del misterio del final del Episodio 2.

### Historia propuesta

Un chico nuevo entra al call center con mucha seguridad y todos se preguntan quién es. Kat cree que es alguien importante; Vale lo saluda y descubre que es Mateo, otro agente nuevo. Él se presenta con frases de Basic Zero: nombre, edad, país, ciudad, color favorito y pasatiempos.

Vale se equivoca al presentarse y se pone nerviosa. Mateo le recuerda: **«Mistakes are part of the process.»** Vale respira, sonríe y dice en voz alta: **«English is easy. I can do it.»** Luego lo intenta otra vez y lo logra. Al final, Mr. Reyes anuncia que Mateo será su compañero de práctica; en el celular de Vale aparece una foto inesperada que conecta con el Episodio 4.

### Alcance de inglés

- Práctica activa: `My name is…`, `I am…`, `I am from…`, `I live in…`, `My favorite color is…`, `My hobbies are…`.
- Exposición gradual: `Who is he?`, `His name is…`, `He is…`.
- Sin enseñar todavía reglas de tercera persona ni `do/does`.
- Preguntas TPRS simples, principalmente con `to be` y vocabulario visible.
- Una afirmación hablada por episodio, empezando con `English is easy. I can do it.`

## Sistema permanente de motivación

Añadir una capa sencilla y repetible a los cuentos:

1. **Momento difícil:** el personaje falla, duda o siente miedo.
2. **Frase guía:** aparece una tarjeta visual corta con la frase de mentalidad.
3. **Repetición oral:** el estudiante la dice en voz alta antes de continuar.
4. **Reintento:** el personaje intenta de nuevo y progresa.
5. **Refuerzo final:** la grabación del estudiante puede terminar con una afirmación como `I can do it.`

Esto se hará como parte natural de la historia, no como una lección separada aburrida.

## Cambios

1. Crear `vale-who-is-he.ts` con 10 escenas, traducciones al español, vocabulario tocable, 3 preguntas TPRS y el momento «I can do it».
2. Generar portada y 10 ilustraciones estilo webtoon, manteniendo continuidad visual de Vale, Kat, Mr. Reyes y la oficina.
3. Añadir la voz de Mateo como personaje masculino joven, diferente de Dylan y del narrador.
4. Registrar el episodio en el catálogo y conectarlo con el Día 3 en `seasons.ts`.
5. Mantener las funciones ya existentes: todas las palabras tocables, voces por personaje, grabación final de 15 segundos, botón «Listen to me», estrellas y siguiente episodio.
6. Actualizar el final del Episodio 2 si hace falta para que el botón del siguiente episodio abra esta nueva historia.
7. Añadir pruebas del contenido, desbloqueo, glosario y frases de mentalidad; verificar typecheck y la navegación móvil completa.

## Detalles técnicos

- Archivos previstos: `src/services/storybook/vale-who-is-he.ts`, `src/services/storybook/index.ts`, `src/services/storybook/seasons.ts`, `src/services/storybook/types.ts`, `src/components/storybook/StorybookPlayer.tsx` y pruebas bajo `src/**/*.test.ts*`.
- Nuevas imágenes en `src/assets/storybook/vale-ep3/`.
- No se cambiarán reglas de desbloqueo: cuentas normales avanzan día por día; tu cuenta mantiene todos los episodios desbloqueados.
- Se revisarán las imágenes para evitar errores visibles de anatomía antes de integrarlas.
