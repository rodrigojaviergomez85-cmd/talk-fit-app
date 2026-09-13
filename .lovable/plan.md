# Temporada 5: Vale como maestra fluida, historias de hábitos personales

## Contexto / corrección
En la Temporada 5 Vale ya no está aprendiendo inglés: es maestra fluida y dueña de su escuela. La trama no debe mostrarla estudiando o dudando del idioma. El crecimiento de la temporada es personal: buenos hábitos, descanso, alimentación, ejercicio, mentores, gratitud y perseverancia.

## Qué se construye / ajusta

1. **Revisar y reescribir los episodios 1–5 ya creados**
   - Eliminar cualquier escena donde Vale "aprenda" o practique inglés.
   - Dejar a Vale como maestra fluida que guía, aconseja o enfrenta desafíos personales.
   - Mantener el inglés de sus diálogos natural y correcto.
   - Si un personaje necesita dificultad con el idioma, que sea un estudiante (por ejemplo, Dani), no Vale.

2. **Escribir los episodios 6–20 bajo la misma regla**
   - Vale es protagonista emocional, pero su arco es de liderazgo, hábitos y crecimiento personal.
   - Los hábitos los modelan Vale, Dani, Kat, Mateo, Camila o mamá según el episodio.
   - La práctica del estudiante (usuario) sigue siendo la misma: escucha, responde preguntas, graba frases, final de 15 segundos.

3. **Mantener alineación con `mixed-tenses`**
   - Las preguntas y prompts al usuario siguen mezclando pasado, presente y futuro.
   - La dificultad no es que Vale aprenda tiempos, sino que el usuario practique los tiempos a través de la historia de personajes que ya los dominan.

4. **Infraestructura ya existente**
   - `habitCard` con tarjeta de hábito, escucha, repetición opcional de 15 segundos, sin IA.
   - Secuencia de desbloqueo diario, portada de temporada, registro en `index.ts` y `seasons.ts`.
   - No se cambia la estructura del reproductor ni el sistema de voces.

5. **Arte y personajes**
   - Generar ilustraciones que muestren a Vale como maestra (salón, pizarrón, estudiantes, escuela), no como estudiante.
   - Mantener voces canónicas: Vale `girl`/playful, Mateo `youngMale`/alegre, Kat `femaleBright`, Dani `shyBoy`, Camila `female`, mamá `female`.

6. **Verificación**
   - `npx tsgo --noEmit` limpio.
   - `bunx vitest run` pasa.
   - Rutas `/natural-method/cuento/vale-s5-*` responden 200.
   - Revisión móvil 394px sin errores.
   - Revisión manual: ningún episodio de la Temporada 5 presenta a Vale aprendiendo inglés.

## Archivos a tocar
- `src/services/storybook/vale-s5-*.ts` (1–20)
- `src/assets/storybook/vale-s5-*/` (portadas y escenas, placeholders → ilustraciones finales)
- `roadmap.md` para reflejar avance por bloques
