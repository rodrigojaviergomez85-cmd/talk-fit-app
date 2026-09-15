# Plan maestro: Sharks + Advanced 1, 2, 3 (cierre de la saga de Vale)

## Visión del cierre
Vale termina como empresaria internacional: presencia en 12+ países, clases para niños, cientos de empleados. Dani crece en el mundo corporativo hasta convertirse en **presidenta de El Salvador**, impulsando educación de calidad para todos. El mensaje final al estudiante: perseverancia + inglés = transformación real ("I can do it", "English is easy", "Mistakes are part of the process").

## Arco por temporada (B1 sólido → B2)

### Season 8 — Sharks (Días 1–20): "Vale cruza fronteras"
- Retoma el gancho de Tigers: la empresa estadounidense acepta la propuesta.
- Primer contrato internacional en dólares; negociación dura con un "tiburón" (nuevo antagonista ejecutivo, voz estable nueva).
- Primera expansión fuera de El Salvador (Guatemala, luego México); errores culturales y aprendizaje.
- Nace **Vale Kids** (clases para niños) — Camila lidera el piloto.
- Bryan/BigTalk intenta una última jugada y queda atrás; Sofía y el equipo maduran.
- Gramática: negociación y persuasión B2, condicionales mixtos, pasiva en reportes de negocios, reported speech, conectores de argumentación.
- Cliffhanger final: Vale recibe una invitación a una alianza regional (4 países).

### Season 9 — Advanced 1 (Días 1–20): "Liderar en serio"
- Vale dirige operaciones en 4–6 países; delega, contrata directores regionales, maneja culturas distintas.
- Dani escala en su empresa: dirige su primer equipo bilingüe y da su primera charla pública sobre educación.
- Inglés de liderazgo: presentaciones, feedback difícil, reuniones, manejo de conflicto, small talk profesional.
- Gramática: presentaciones formales, énfasis (cleft sentences), matices de modalidad, phrasal verbs de negocios.
- Cliffhanger: un medio internacional perfila a Vale; Dani es invitada a un foro nacional.

### Season 10 — Advanced 2 (Días 1–20): "Crecer sin romperse"
- Escala a 12+ países y cientos de empleados; crisis real: calidad dispareja, un director renuncia, presión de medios.
- Vale responde con cultura y estándares; Mateo lidera tecnología/plataforma.
- Dani deja el corporativo y entra a la política con plataforma de educación de calidad para todos; campaña.
- Gramática: argumentación avanzada, hedging, registro formal vs. informal, discurso persuasivo, resúmenes ejecutivos.
- Cliffhanger: noche de elecciones.

### Season 11 — Advanced 3 (Días 1–20): "El legado"
- **Dani gana la presidencia de El Salvador**; su primer anuncio: educación bilingüe de calidad accesible para todos.
- Vale firma la alianza que lleva su programa (incluido Vale Kids) a escuelas públicas; la academia se vuelve movimiento.
- Episodio final (Día 20): ceremonia/encuentro con estudiantes reales de la app; Vale mira a cámara: "I started with one sentence. So can you."
- Gramática: integración total B2 (todos los tiempos), matices, fluidez espontánea, entrevistas y discursos.
- Cierre emocional + afirmaciones de perseverancia; la saga queda completa A1→B2.

## Reglas de producción (idénticas a Eagles/Tigers)
- Un episodio por día oficial del currículo (20 por temporada), mapeados a las metas gramaticales de cada módulo.
- Formato sitcom B1→B2: casi todo diálogo fluido, narración mínima.
- Por episodio: 11 escenas, 6 usos de la estructura objetivo, 3 preguntas calificadas (2 intentos + Skip, opciones aleatorizadas), 2–3 turnos hablados del estudiante, afirmaciones de perseverancia habladas, final grabado de 15 s, cliffhanger.
- Elenco estable con voces únicas fijas; nuevos personajes (tiburón de negocios, equipo de campaña de Dani, medios) reciben voz propia antes de escribir.
- Glosario 100% con significados (palabras tappeables válidas).
- Arte: cover + 10 escenas (s1–s11) por episodio, 768×768 JPG < 250 KB, continuidad de personajes con referencias canónicas, cero placeholders, sin texto accidental.
- Candados de ruta oficial: episodio actual + 3 anteriores; futuro bloqueado.
- Registro de episodios y temporada en el servicio de storybook; rutas verificadas HTTP 200.

## Entregable por temporada
1. Guiones de los 20 episodios alineados a currícula.
2. Registro + voces nuevas.
3. 220 ilustraciones reales + revisión en contact sheets + correcciones.
4. Tests de consistencia (voces, glosario, assets, tamaños) + suite Storybook + TypeScript.
5. Revisión visual final y cierre en roadmap.

## Orden de trabajo propuesto
Sharks completo → Advanced 1 → Advanced 2 → Advanced 3 (una temporada por ciclo, con revisión de consistencia al cerrar cada una).

## Notas técnicas
- Sin cambios al motor del reproductor; solo contenido, voces y assets.
- Voces nuevas se agregan al mapa de `StorybookSpeaker` antes de usarlas en guiones.
- Cada temporada cierra con el test de consistencia estilo `tigers-consistency.test.ts`.
