# Lote E · Episodios 15–20 de "El mundo de Vale" (cierre de Temporada 1)

## Objetivo
Producir e integrar los episodios 15, 16, 17, 18, 19 y 20 — el cierre completo de la Temporada 1 (Basic Zero) — con la misma calidad y el mismo sistema de control en tres capas que eliminó los errores de piel y voz en el lote anterior. Cada episodio sigue el molde aprobado: 10 ilustraciones, 3 quizzes TPRS, 1 tarjeta de mindset con repetición oral obligatoria, grabación final de 15 segundos y cliffhanger.

## Línea argumental del lote

El gancho del Episodio 14 son los 50 clientes con el mismo problema. Este lote resuelve esa crisis, celebra el crecimiento de Vale y cierra la temporada con su graduación y el puente al Módulo 2.

- **Episodio 15 · We are a team** — El equipo resuelve juntos el problema de los 50 clientes, cada quien desde su lugar. Chunks: we are a team, we help each other, good job. Mindset: "I love challenges."
- **Episodio 16 · Luis's big day** — Luis tiene su entrevista de trabajo y toda la familia lo apoya. Chunks: he is ready, you can do it, believe in yourself. Mindset: "I believe in myself."
- **Episodio 17 · Good news!** — Luis consigue el trabajo; Vale celebra y cuenta la noticia en la oficina. Chunks: good news, I am happy, we are happy. Mindset: "You are amazing."
- **Episodio 18 · Vale's first month** — Mr. Reyes evalúa a Vale tras su primer mes; repaso del vocabulario del módulo. Chunks: my first month, I can do it, I am proud. Mindset: "I am disciplined."
- **Episodio 19 · The celebration** — El equipo celebra con pupusas; Camila y Kat bromean; Ana anuncia algo. Chunks: let's celebrate, my favorite food, thank you. Mindset: "I am awesome."
- **Episodio 20 · Vale's graduation** — Graduación de Basic Zero. Vale mira atrás, agradece, y Ana le da una carpeta azul: la invitación al Módulo 2 (Season 2 cliffhanger). Chunks: repaso acumulado del módulo. Mindset: "English is easy. I can do it."

## Alcance del lenguaje
Todo se mantiene dentro del alcance acumulativo de Basic Zero: presente simple con `to be`, chunks de presentación, origen, preferencias, hobbies, familia y equipo. Sin will/was/were/going to/modales — la prueba automática de alcance ya lo exige.

## Control de calidad permanente (tres capas, ya establecido)
1. **Referencias canónicas** en `src/assets/storybook/_canon/` (Vale, Mateo, Mr. Reyes, Kat, Dylan, Luis, Camila, Ana) — toda ilustración se genera editando desde esas fichas.
2. **Hoja de contactos por episodio** antes de integrar: identidad, edad, tono de piel (Vale: morena clara cálida), pelo, ropa, exactamente dos brazos y dos manos, continuidad de objetos. Cualquier imagen dudosa se regenera antes de escribir código.
3. **Voces**: cada personaje nuevo se escucha con un clip TTS real antes de publicar; cada escena declara `speaker`; Vale siempre con la voz dulce/juvenil aprobada.

## Detalles técnicos

### Archivos a crear
- `src/assets/storybook/vale-ep15/` … `vale-ep20/` → cover.jpg + s1.jpg…s10.jpg (66 imágenes)
- `src/services/storybook/vale-we-are-a-team.ts`
- `src/services/storybook/vale-luis-big-day.ts`
- `src/services/storybook/vale-good-news.ts`
- `src/services/storybook/vale-first-month.ts`
- `src/services/storybook/vale-celebration.ts`
- `src/services/storybook/vale-graduation.ts`

### Archivos a editar
- `src/services/storybook/index.ts` — registrar los 6 episodios.
- `src/services/storybook/seasons.ts` — slots días 15–20 con teasers.
- `src/services/storybook/glossary.ts` — vocabulario nuevo (team, interview, news, proud, celebrate, graduation, etc.).
- `roadmap.md` — marcar el cierre de la Temporada 1.

### Validación final
- `bunx tsgo --noEmit`
- `bunx vitest run src/services/storybook`
- Recorrido móvil con Playwright de los 6 episodios: portada, escenas, quizzes, tarjeta de mindset, grabación final y botón de siguiente episodio (en el 20: teaser de Season 2).

## Nota
Sin preocupación por créditos (confirmado por el usuario): se generarán las ~66 ilustraciones y los audios de muestra necesarios.
