# Lote D · Episodios 13–16 de "El mundo de Vale"

## Objetivo
Producir e integrar los episodios 13, 14, 15 y 16 de la Temporada 1 (Basic Zero), uno por día de práctica, con desbloqueo secuencial. Mantener la voz dulce/juvenil de Vale, los tonos de piel canónicos y la coherencia de personajes. Cada episodio sigue el molde aprobado: 10 ilustraciones, 3 quizzes TPRS, 1 tarjeta de mindset con repetición oral obligatoria, grabación final de 15 segundos y cliffhanger.

## Línea argumental del lote

El gancho del Episodio 12 es la carpeta roja del nuevo supervisor. Este lote resuelve ese misterio, presenta a un nuevo personaje clave y usa la tensión de un cliente difícil para practicar terceras personas, trabajo en equipo y actitud de liderazgo.

- **Episodio 13 · Who is the new supervisor?** — Llega la supervisora Ana. La carpeta roja es buena: Vale es candidata a un programa de líderes. Chunks: introduce her / his name, she / he is from, she / he works here.
- **Episodio 14 · Dylan needs help** — Dylan (cliente canadiense) tiene un problema técnico. Vale y Mateo lo ayudan. Chunks: he / she needs help, we can help, what is the problem?
- **Episodio 15 · We are a team** — El equipo resuelve el problema desde distintos lugares. Chunks: we are a team, we help each other, good job.
- **Episodio 16 · Luis's big day** — Luis tiene su entrevista. Todos lo apoyan. Chunks: he / she is ready, you can do it, believe in yourself.

## Personajes nuevos y voz

- **Ana** — supervisora, 35 años, mexicana, piel morena clara, pelo negro largo ondulado, blazer azul marino y blusa blanca. Voz femenina adulta segura y cálida (no grave, no masculina).
- Mantener a Vale, Mateo, Kat, Mr. Reyes, Luis, Camila y Dylan con sus fichas y voces aprobadas.

## Detalles técnicos

### Archivos a crear
- `src/assets/storybook/vale-ep13/` → cover.jpg, s1.jpg…s10.jpg
- `src/assets/storybook/vale-ep14/` → cover.jpg, s1.jpg…s10.jpg
- `src/assets/storybook/vale-ep15/` → cover.jpg, s1.jpg…s10.jpg
- `src/assets/storybook/vale-ep16/` → cover.jpg, s1.jpg…s10.jpg
- `src/services/storybook/vale-new-supervisor.ts`
- `src/services/storybook/vale-dylan-needs-help.ts`
- `src/services/storybook/vale-we-are-a-team.ts`
- `src/services/storybook/vale-luis-big-day.ts`

### Archivos a editar
- `src/services/storybook/index.ts` — registrar los 4 episodios.
- `src/services/storybook/seasons.ts` — agregar slots día 13–16 con teasers.
- `src/services/storybook/glossary.ts` — añadir vocabulario nuevo (supervisor, folder, problem, team, interview, etc.).
- `src/services/storybook/types.ts` — si es necesario, añadir `"ana"` a `StorybookSpeaker`.

## Cómo evitamos los errores de piel y voz (sistema nuevo, permanente)

En vez de corregir después, se agrega un control en tres capas que se aplica a este lote y a todos los siguientes.

**Capa 1 — Fichas fijas de referencia.** Se crea una carpeta `src/assets/storybook/_canon/` con una imagen de referencia definitiva por personaje (Vale, Mateo, Mr. Reyes, Kat, Dylan, Luis, Camila, Ana). Toda ilustración con personajes se hace editando a partir de esas referencias, nunca desde cero. Así el tono de piel y la cara no pueden "derivar".

**Capa 2 — Revisión en hoja de contactos antes de escribir código.** Al terminar las 11 imágenes de un episodio se arma una sola hoja de contactos junto a la ficha canónica y se revisa: identidad, edad, tono de piel, pelo, ropa, dos brazos y dos manos, y continuidad de objetos. Cualquier imagen dudosa se regenera en ese momento; el episodio no se integra hasta que la hoja esté limpia.

**Capa 3 — Pruebas automáticas de voz.** Se añade una prueba que falla si: alguna escena no declara hablante, algún hablante no está en el mapa de voces, o alguna línea de Vale no usa su voz/tono aprobado. Además, por episodio se genera y escucha un clip real de cada personaje nuevo antes de publicar.

Con eso, los errores de piel se atajan en la capa 1 y 2, y los de voz quedan imposibles de pasar por alto porque rompen la prueba.

### Verificación visual y de audio (obligatoria antes de publicar)
1. Comparar cada escena contra la ficha canónica del personaje y `STYLE.md`.
2. Confirmar tono de piel de Vale: morena cálida / light-tan latina, no oscura, no pálida.
3. Confirmar exactamente dos brazos y dos manos por personaje.
4. Confirmar que Ana se ve mujer adulta, no masculina, no jovencita.
5. Escuchar las líneas de Vale y de Ana; si algo suena grave o distinto, regenerar antes de integrar.
6. Revisar que cada escena declara `speaker` correcto y que el texto coincide con el hablante.

### Validación final
- `bunx tsgo --noEmit`
- `bunx vitest run src/services/storybook`
- Recorrido móvil con Playwright de los 4 episodios: portada, escenas, quizzes, tarjeta de mindset, grabación final y botón de siguiente episodio.

## Nota de créditos
El usuario confirmó que no hay preocupación por créditos; se generarán las 40 ilustraciones y los audios necesarios en este lote.
