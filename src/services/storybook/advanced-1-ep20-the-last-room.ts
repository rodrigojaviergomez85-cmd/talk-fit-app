import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/advanced1-ep20-the-last-room/cover.jpg";
import s1 from "@/assets/storybook/advanced1-ep20-the-last-room/s1.jpg";
import s2 from "@/assets/storybook/advanced1-ep20-the-last-room/s2.jpg";
import s3 from "@/assets/storybook/advanced1-ep20-the-last-room/s3.jpg";
import s4 from "@/assets/storybook/advanced1-ep20-the-last-room/s4.jpg";
import s5 from "@/assets/storybook/advanced1-ep20-the-last-room/s5.jpg";
import s6 from "@/assets/storybook/advanced1-ep20-the-last-room/s6.jpg";
import s7 from "@/assets/storybook/advanced1-ep20-the-last-room/s7.jpg";
import s8 from "@/assets/storybook/advanced1-ep20-the-last-room/s8.jpg";
import s9 from "@/assets/storybook/advanced1-ep20-the-last-room/s9.jpg";

export const ADVANCED1_EP20_THE_LAST_ROOM: StorybookEpisode = {
  id: "advanced1-ep20-the-last-room",
  moduleId: "advanced-1",
  week: 4,
  title: "CEO of two worlds",
  titleEs: "CEO de dos mundos",
  episodeLabel: {
    en: "Advanced 1 · Episode 20",
    es: "Advanced 1 · Episodio 20",
  },
  previously: [
    {
      en: "Northline signed the ten-million-dollar expansion.",
      es: "Northline firmó la expansión de diez millones de dólares.",
    },
    {
      en: "Dani became Director of Operations and faced his first public classroom moment.",
      es: "Dani se convirtió en Director de Operaciones y enfrentó su primer momento público en clase.",
    },
    {
      en: "Vale now has to lead Vale Kids and Vale Adults without becoming the bottleneck.",
      es: "Vale ahora debe dirigir Vale Kids y Vale Adults sin convertirse en el cuello de botella.",
    },
  ],
  reviewWords: [
    { word: "CEO", es: "directora general" },
    { word: "worldwide", es: "a nivel mundial" },
    { word: "leadership", es: "liderazgo" },
    { word: "financial", es: "financiero" },
    { word: "operations", es: "operaciones" },
  ],
  blurb: {
    en: "The academy celebrates, Vale steps into CEO life, and Dani gets the first problem of the next season.",
    es: "La academia celebra, Vale entra a su vida de CEO y Dani recibe el primer problema de la próxima temporada.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "The team enters the decorated academy classroom for the season celebration.",
      text: "Saturday, the last room.",
      es: "Sábado, el último salón.",
      speaker: "camila",
      cast: ["camila", "vale", "dani"],
      lines: [
        { speaker: "camila", text: "Welcome to the official celebration, also known as the cheapest party approved by finance.", es: "Bienvenidos a la celebración oficial, también conocida como la fiesta más barata aprobada por finanzas." },
        { speaker: "dani", text: "There are balloons, Camila. That is aggressive spending for you.", es: "Hay globos, Camila. Eso es gasto agresivo para ti." },
        { speaker: "vale", text: "And there are chairs in a circle. We started in one small room, so we close Advanced 1 in one room.", es: "Y hay sillas en círculo. Empezamos en un salón pequeño, así que cerramos Advanced 1 en un salón." },
        { speaker: "camila", text: "A sentimental budget decision. Rare, but allowed.", es: "Una decisión presupuestaria sentimental. Rara, pero permitida." },
      ],
      words: [
        { word: "celebration", es: "celebración" },
        { word: "finance", es: "finanzas" },
        { word: "sentimental", es: "sentimental" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Vale thanks Lidia, Dani and Camila for the international expansion.",
      text: "Vale's toast.",
      es: "El brindis de Vale.",
      speaker: "vale",
      cast: ["vale", "dani", "camila", "lidia"],
      lines: [
        { speaker: "vale", text: "To Lidia, who proved the method can live in another teacher's voice.", es: "Por Lidia, que demostró que el método puede vivir en la voz de otra maestra." },
        { speaker: "vale", text: "To Camila, who keeps ambition from becoming financial fiction.", es: "Por Camila, que evita que la ambición se vuelva ficción financiera." },
        { speaker: "vale", text: "And to Dani, who wanted a chance and accidentally got a job title with consequences.", es: "Y por Dani, que quería una oportunidad y accidentalmente recibió un título con consecuencias." },
        { speaker: "dani", text: "I accept this emotional attack with respect.", es: "Acepto este ataque emocional con respeto." },
      ],
      words: [
        { word: "toast", es: "brindis" },
        { word: "ambition", es: "ambición" },
        { word: "accidentally", es: "accidentalmente" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Vale explains the new academy structure with Vale Kids and Vale Adults.",
      text: "Two worlds, one method.",
      es: "Dos mundos, un método.",
      speaker: "vale",
      cast: ["vale", "lidia", "dani"],
      lines: [
        { speaker: "vale", text: "From today, Vale Academy has two worlds: Vale Kids and Vale Adults. Different ages, same principle: people speak before they believe they are ready.", es: "Desde hoy, Academia Vale tiene dos mundos: Vale Kids y Vale Adults. Edades distintas, mismo principio: las personas hablan antes de creer que están listas." },
        { speaker: "lidia", text: "Kids will need more movement, shorter correction and fewer speeches from adults who love hearing themselves.", es: "Kids necesitará más movimiento, corrección más corta y menos discursos de adultos que aman escucharse." },
        { speaker: "dani", text: "As a recovering adult who loves explaining things, I feel personally targeted.", es: "Como adulto en recuperación que ama explicar cosas, me siento personalmente atacado." },
        { speaker: "vale", text: "Good. The method should make even the leaders uncomfortable enough to improve.", es: "Bien. El método debe incomodar incluso a los líderes lo suficiente para mejorar." },
      ],
      words: [
        { word: "principle", es: "principio" },
        { word: "movement", es: "movimiento" },
        { word: "targeted", es: "señalado, aludido" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Barrett arrives with the signed copy and the first expansion calendar.",
      text: "Barrett brings the calendar.",
      es: "Barrett trae el calendario.",
      speaker: "barrett",
      cast: ["barrett", "vale", "camila"],
      lines: [
        { speaker: "barrett", text: "I brought the signed copy and the first expansion calendar. Miami, Bogotá and Monterrey are not ideas anymore; they are dates.", es: "Traje la copia firmada y el primer calendario de expansión. Miami, Bogotá y Monterrey ya no son ideas; son fechas." },
        { speaker: "camila", text: "Dates are beautiful when they arrive with deposits.", es: "Las fechas son hermosas cuando llegan con depósitos." },
        { speaker: "vale", text: "They also arrive with pressure. If one country fails, the headline will not say 'small scheduling issue'.", es: "También llegan con presión. Si un país falla, el titular no dirá 'pequeño problema de horario'." },
        { speaker: "barrett", text: "Which is why Northline wants your next leadership map by Monday.", es: "Por eso Northline quiere tu próximo mapa de liderazgo para el lunes." },
      ],
      words: [
        { word: "signed", es: "firmado" },
        { word: "deposits", es: "depósitos" },
        { word: "headline", es: "titular" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Vale gives Dani the first independent leadership assignment.",
      text: "Dani gets the first fire.",
      es: "Dani recibe el primer incendio.",
      speaker: "vale",
      cast: ["vale", "dani", "barrett"],
      lines: [
        { speaker: "vale", text: "Dani, your first independent assignment: build the service recovery plan for upset parents, angry clients and teachers who think change is a personal insult.", es: "Dani, tu primera asignación independiente: construye el plan de recuperación de servicio para padres molestos, clientes enojados y maestros que creen que el cambio es un insulto personal." },
        { speaker: "dani", text: "So Advanced 2 is basically customer service with jump scares.", es: "Entonces Advanced 2 es básicamente servicio al cliente con sustos repentinos." },
        { speaker: "barrett", text: "If you can calm an upset parent without sounding fake, Northline will listen.", es: "Si puedes calmar a un padre molesto sin sonar falso, Northline escuchará." },
        { speaker: "dani", text: "Then I need scripts that do not sound like scripts.", es: "Entonces necesito guiones que no suenen como guiones." },
      ],
      words: [
        { word: "service recovery", es: "recuperación de servicio" },
        { word: "jump scares", es: "sustos repentinos" },
        { word: "fake", es: "falso" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Camila gives Dani a finance warning wrapped in a joke.",
      text: "Camila's warning label.",
      es: "La advertencia de Camila.",
      speaker: "camila",
      cast: ["camila", "dani"],
      lines: [
        { speaker: "camila", text: "Also, every solution has a cost. If your plan needs twelve new people and a unicorn, bring it down to earth before sending it to me.", es: "Además, toda solución tiene costo. Si tu plan necesita doce personas nuevas y un unicornio, bájalo a tierra antes de enviármelo." },
        { speaker: "dani", text: "Could we approve one emotional-support unicorn?", es: "¿Podríamos aprobar un unicornio de apoyo emocional?" },
        { speaker: "camila", text: "Denied. But I will approve clear priorities, realistic staffing and one coffee if you stop calling it a crisis every time your calendar changes.", es: "Denegado. Pero aprobaré prioridades claras, personal realista y un café si dejas de llamarle crisis cada vez que cambia tu calendario." },
        { speaker: "dani", text: "Negotiated down from unicorn to coffee. I am already learning finance.", es: "Negociado de unicornio a café. Ya estoy aprendiendo finanzas." },
      ],
      words: [
        { word: "bring it down to earth", es: "hacerlo realista" },
        { word: "staffing", es: "personal" },
        { word: "negotiated", es: "negociado" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Vale gives the learner the final Advanced 1 speaking task.",
      text: "Your final Advanced 1 turn.",
      es: "Tu turno final de Advanced 1.",
      speaker: "vale",
      cast: ["vale", "elena"],
      lines: [
        { speaker: "vale", text: "Your turn. Close the season like a professional: what did you learn, what changed in you, and what responsibility are you ready to take on next?", es: "Tu turno. Cierra la temporada como profesional: qué aprendiste, qué cambió en ti y qué responsabilidad estás listo para asumir después." },
        { speaker: "elena", text: "Can I answer with feelings and still sound B2?", es: "¿Puedo responder con sentimientos y aun así sonar B2?" },
        { speaker: "vale", text: "Yes. B2 is not cold English. It is specific English with a clear reason.", es: "Sí. B2 no es inglés frío. Es inglés específico con una razón clara." },
        { speaker: "elena", text: "Good, because my feelings have a spreadsheet now.", es: "Bien, porque mis sentimientos ahora tienen hoja de cálculo." },
      ],
      words: [
        { word: "professional", es: "profesional" },
        { word: "take on", es: "asumir" },
        { word: "specific", es: "específico" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Dani and Vale speak privately about leadership after the celebration.",
      text: "The quiet promise.",
      es: "La promesa en voz baja.",
      speaker: "dani",
      cast: ["dani", "vale"],
      lines: [
        { speaker: "dani", text: "Be honest. Did you choose me because I am ready, or because I need to become ready?", es: "Sé honesta. ¿Me elegiste porque estoy listo o porque necesito volverme listo?" },
        { speaker: "vale", text: "Both. I chose you because you care before people notice, and because this job will force you to speak before you feel safe.", es: "Ambas. Te elegí porque te importa antes de que la gente lo note, y porque este trabajo te obligará a hablar antes de sentirte seguro." },
        { speaker: "dani", text: "That is either mentorship or a threat with nice lighting.", es: "Eso es mentoría o una amenaza con buena iluminación." },
        { speaker: "vale", text: "Leadership usually is.", es: "El liderazgo suele serlo." },
      ],
      words: [
        { word: "mentorship", es: "mentorías, guía" },
        { word: "threat", es: "amenaza" },
        { word: "lighting", es: "iluminación" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Vale, Dani and Camila look at the world map as the season closes.",
      text: "The world opens.",
      es: "El mundo se abre.",
      speaker: "vale",
      cast: ["vale", "dani", "camila"],
      lines: [
        { speaker: "vale", text: "We won the contract, but the real win is this: the academy no longer depends on one heroic teacher. It depends on a team.", es: "Ganamos el contrato, pero la verdadera victoria es esta: la academia ya no depende de una maestra heroica. Depende de un equipo." },
        { speaker: "camila", text: "A team with a budget, thank you very much.", es: "Un equipo con presupuesto, muchas gracias." },
        { speaker: "dani", text: "And a Director of Operations who is only mildly terrified.", es: "Y un Director de Operaciones que solo está ligeramente aterrado." },
        { speaker: "vale", text: "Advanced 2 follows Dani into his first hard conversations. Advanced 3 follows him when he has to defend what he believes. For tonight, we celebrate. Tomorrow, we lead.", es: "Advanced 2 sigue a Dani hacia sus primeras conversaciones difíciles. Advanced 3 lo sigue cuando deba defender lo que cree. Por esta noche, celebramos. Mañana lideramos." },
      ],
      words: [
        { word: "depends", es: "depende" },
        { word: "heroic", es: "heroica" },
        { word: "terrified", es: "aterrado" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s5",
      questionEn: "What is Dani's first independent assignment for Advanced 2?",
      questionEs: "¿Cuál es la primera asignación independiente de Dani para Advanced 2?",
      options: [
        { label: "Build a service recovery plan", emoji: "📞" },
        { label: "Replace all classes with videos", emoji: "🎥" },
        { label: "Stop working with Vale Kids", emoji: "🚫" },
      ],
      answer: 0,
      sayIt: "Dani has to build a service recovery plan.",
      sayItEs: "Dani tiene que construir un plan de recuperación de servicio.",
      sayItCheck: {
        target: "Dani has to build a service recovery plan",
        altTargets: ["He has to build a service recovery plan", "Build a service recovery plan"],
      },
    },
    {
      id: "q2",
      afterScene: "s7",
      questionEn: "Final simulation: what did you learn, what changed in you, and what responsibility are you ready to take on?",
      questionEs: "Simulación final: qué aprendiste, qué cambió en ti y qué responsabilidad estás listo para asumir?",
      options: [
        { label: "I am ready to answer", emoji: "🎤" },
        { label: "I want to hear the example again", emoji: "👂" },
        { label: "I will practice later", emoji: "⏰" },
      ],
      answer: 0,
      sayIt: "I learned to answer with evidence, I became more confident under pressure, and I am ready to take on conversations that used to scare me.",
      sayItEs: "Aprendí a responder con evidencia, me volví más seguro bajo presión y estoy listo para asumir conversaciones que antes me asustaban.",
      sayItAskEn: "One continuous answer: I learned..., I became..., I am ready to take on...",
      sayItAskEs: "Una respuesta continua: I learned..., I became..., I am ready to take on...",
      sayItCheck: {
        target: "I learned *",
        altTargets: ["I became *", "I am ready to take on *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s9",
    phrase: "I can lead before I feel completely ready.",
    es: "Puedo liderar antes de sentirme completamente listo.",
  },
  habitCard: {
    afterScene: "s7",
    phrase: "I close with what I learned, what changed and what I will take on next.",
    es: "Cierro con lo que aprendí, lo que cambió y lo que asumiré después.",
    model: "vale",
    modelActionEs: "Vale cerró Advanced 1 conectando aprendizaje, cambio personal y responsabilidad nueva.",
  },
  expressions: [
    {
      phrase: "bring down to earth",
      variants: ["bring it down to earth", "brings down to earth", "brought down to earth"],
      es: "hacer algo realista",
      kind: "phrasal",
      example: "Bring it down to earth before sending it to me.",
      exampleEs: "Hazlo realista antes de enviármelo.",
    },
    {
      phrase: "take on",
      variants: ["takes on", "took on", "taking on"],
      es: "asumir",
      kind: "phrasal",
      example: "What responsibility are you ready to take on next?",
      exampleEs: "¿Qué responsabilidad estás listo para asumir después?",
    },
    {
      phrase: "jump scare",
      variants: ["jump scares"],
      es: "susto repentino",
      kind: "idiom",
      example: "Advanced 2 is basically customer service with jump scares.",
      exampleEs: "Advanced 2 es básicamente servicio al cliente con sustos repentinos.",
    },
    {
      phrase: "nice lighting",
      es: "buena presentación para algo incómodo",
      kind: "idiom",
      example: "That is either mentorship or a threat with nice lighting.",
      exampleEs: "Eso es mentoría o una amenaza con buena iluminación.",
    },
  ],
  finaleSeconds: 30,
  continuePrompt: {
    en: "Thirty seconds, the season finale: what you learned, what changed, and what you are ready to take on next.",
    es: "Treinta segundos, final de temporada: qué aprendiste, qué cambió y qué estás listo para asumir después.",
  },
  continueWith: [
    "I learned ...",
    "I became ...",
    "I am ready to take on ...",
  ],
  cliffhanger: {
    en: "Advanced 2: Dani's first week as manager begins with an upset parent, a missing teacher and a message he really should not have read before coffee.",
    es: "Advanced 2: la primera semana de Dani como gerente empieza con un padre molesto, una maestra ausente y un mensaje que no debió leer antes del café.",
  },
};
