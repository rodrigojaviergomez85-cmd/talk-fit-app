import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/advanced1-ep8-two-right-answers/cover.jpg";
import s1 from "@/assets/storybook/advanced1-ep8-two-right-answers/s1.jpg";
import s2 from "@/assets/storybook/advanced1-ep8-two-right-answers/s2.jpg";
import s3 from "@/assets/storybook/advanced1-ep8-two-right-answers/s3.jpg";
import s4 from "@/assets/storybook/advanced1-ep8-two-right-answers/s4.jpg";
import s5 from "@/assets/storybook/advanced1-ep8-two-right-answers/s5.jpg";
import s6 from "@/assets/storybook/advanced1-ep8-two-right-answers/s6.jpg";
import s7 from "@/assets/storybook/advanced1-ep8-two-right-answers/s7.jpg";
import s8 from "@/assets/storybook/advanced1-ep8-two-right-answers/s8.jpg";
import s9 from "@/assets/storybook/advanced1-ep8-two-right-answers/s9.jpg";

export const ADVANCED1_EP8_TWO_RIGHT_ANSWERS: StorybookEpisode = {
  id: "advanced1-ep8-two-right-answers",
  moduleId: "advanced-1",
  week: 2,
  title: "Two right answers",
  titleEs: "Dos respuestas correctas",
  episodeLabel: {
    en: "Advanced 1 · Episode 8",
    es: "Advanced 1 · Episodio 8",
  },
  previously: [
    {
      en: "Vale reported her own mistake to the committee and kept their trust.",
      es: "Vale reportó su propio error al comité y conservó su confianza.",
    },
    {
      en: "Now the committee wants to see a real disagreement inside the team.",
      es: "Ahora el comité quiere ver un desacuerdo real dentro del equipo.",
    },
    {
      en: "They get one, and it is louder than anyone planned.",
      es: "Lo consiguen, y es más ruidoso de lo que nadie planeó.",
    },
  ],
  reviewWords: [
    { word: "disagreement", es: "desacuerdo" },
    { word: "responsibility", es: "responsabilidad" },
    { word: "evidence", es: "evidencia" },
    { word: "pressure", es: "presión" },
    { word: "honest", es: "honesto" },
  ],
  blurb: {
    en: "Dani wants to sell speed. Camila wants to sell depth. Vale has to keep both of them and still choose.",
    es: "Dani quiere vender velocidad. Camila quiere vender profundidad. Vale tiene que conservar a los dos y aun así elegir.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Dani presents a fast four-week plan on the screen while Camila frowns with her arms crossed.",
      text: "Thursday. Dani puts his plan on the screen and the room changes temperature.",
      es: "Jueves. Dani pone su plan en la pantalla y la sala cambia de temperatura.",
      speaker: "dani",
      cast: ["vale", "dani", "camila"],
      lines: [
        {
          speaker: "dani",
          text: "My proposal for Northline is a four-week intensive. Fast results, visible progress, and a report every Friday.",
          es: "Mi propuesta para Northline es un intensivo de cuatro semanas. Resultados rápidos, progreso visible y un reporte cada viernes.",
        },
        {
          speaker: "camila",
          text: "Four weeks? That is a trailer, not a course. Their staff will speak for a month and forget everything by March.",
          es: "¿Cuatro semanas? Eso es un tráiler, no un curso. Su personal hablará un mes y para marzo lo habrá olvidado todo.",
        },
        {
          speaker: "dani",
          text: "And your six-month plan will be cut by their finance team before it even starts. I would rather deliver something they approve.",
          es: "Y tu plan de seis meses será cortado por su equipo de finanzas antes de que empiece. Prefiero entregar algo que aprueben.",
        },
      ],
      words: [
        { word: "intensive", es: "intensivo" },
        { word: "trailer", es: "tráiler; adelanto" },
        { word: "finance", es: "finanzas" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Camila raises her voice pointing at the whiteboard while Dani looks away, tense.",
      text: "The argument stops being about the plan.",
      es: "La discusión deja de ser sobre el plan.",
      speaker: "camila",
      cast: ["vale", "dani", "camila"],
      lines: [
        {
          speaker: "camila",
          text: "You always do this. You take the version that sells and you call it strategy.",
          es: "Siempre haces esto. Tomas la versión que vende y la llamas estrategia.",
        },
        {
          speaker: "dani",
          text: "And you always do this. You defend the perfect course that nobody can pay for.",
          es: "Y tú siempre haces esto. Defiendes el curso perfecto que nadie puede pagar.",
        },
        {
          speaker: "vale",
          text: "Both of you, stop. You have moved from the plan to each other, and that is where teams break. Sit down.",
          es: "Los dos, paren. Pasaron del plan a atacarse, y ahí es donde los equipos se rompen. Siéntense.",
        },
      ],
      words: [
        { word: "strategy", es: "estrategia" },
        { word: "defend", es: "defender" },
        { word: "teams", es: "equipos" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Vale writes two columns on the whiteboard: what Dani is protecting and what Camila is protecting.",
      text: "Vale writes two columns and refuses to write names.",
      es: "Vale escribe dos columnas y se niega a escribir nombres.",
      speaker: "vale",
      cast: ["vale", "dani", "camila"],
      lines: [
        {
          speaker: "vale",
          text: "New rule for this room: describe the problem, never the person. Dani, what are you protecting?",
          es: "Regla nueva para esta sala: describe el problema, nunca a la persona. Dani, ¿qué estás protegiendo?",
        },
        {
          speaker: "dani",
          text: "The contract. If the price scares them, we lose everything, and nobody learns anything at all.",
          es: "El contrato. Si el precio los asusta, lo perdemos todo, y nadie aprende nada.",
        },
        {
          speaker: "camila",
          text: "And I am protecting the result. If their staff cannot hold a real call in June, our name is the one that gets damaged.",
          es: "Y yo estoy protegiendo el resultado. Si su personal no puede sostener una llamada real en junio, nuestro nombre es el que queda dañado.",
        },
      ],
      words: [
        { word: "protecting", es: "protegiendo" },
        { word: "price", es: "precio" },
        { word: "damaged", es: "dañado" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Reed listens to the disagreement from the laptop screen and takes notes.",
      text: "Reed has been on the call the whole time.",
      es: "Reed ha estado en la llamada todo el tiempo.",
      speaker: "reed",
      cast: ["vale", "reed"],
      lines: [
        {
          speaker: "reed",
          text: "I have been listening since the trailer comment. Vale, what the committee is watching is not who wins; it is whether both of them are still useful afterwards.",
          es: "He estado escuchando desde el comentario del tráiler. Vale, lo que el comité observa no es quién gana; es si los dos siguen siendo útiles después.",
        },
        {
          speaker: "vale",
          text: "I know. A team that only agrees has stopped thinking, although a team that only fights has stopped working.",
          es: "Lo sé. Un equipo que solo está de acuerdo dejó de pensar, aunque un equipo que solo pelea dejó de trabajar.",
        },
        {
          speaker: "reed",
          text: "Then show them the third version. Disagreement is only valuable if something better comes out of it.",
          es: "Entonces muéstrales la tercera versión. El desacuerdo solo vale si de él sale algo mejor.",
        },
      ],
      words: [
        { word: "useful", es: "útil" },
        { word: "valuable", es: "valioso" },
        { word: "version", es: "versión" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Vale sketches a combined plan on the board while Dani and Camila lean in.",
      text: "Vale builds a third plan out of both of theirs.",
      es: "Vale construye un tercer plan con los dos de ellos.",
      speaker: "vale",
      cast: ["vale", "dani", "camila"],
      lines: [
        {
          speaker: "vale",
          text: "Here is the version I will defend. Four intensive weeks first, exactly as Dani designed them, so Northline sees progress fast.",
          es: "Esta es la versión que voy a defender. Primero cuatro semanas intensivas, exactamente como Dani las diseñó, para que Northline vea progreso rápido.",
        },
        {
          speaker: "vale",
          text: "Then five months of maintenance, twice a week, built on Camila's structure. If the first month is approved, the rest is far easier to sell.",
          es: "Luego cinco meses de mantenimiento, dos veces por semana, sobre la estructura de Camila. Si el primer mes se aprueba, el resto es mucho más fácil de vender.",
        },
        {
          speaker: "camila",
          text: "So my depth gets in through his door. I can live with that, honestly.",
          es: "Así que mi profundidad entra por su puerta. Honestamente, puedo vivir con eso.",
        },
      ],
      words: [
        { word: "maintenance", es: "mantenimiento" },
        { word: "structure", es: "estructura" },
        { word: "approved", es: "aprobado" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Dani apologises to Camila across the table and she accepts with a small smile.",
      text: "The repair matters more than the plan.",
      es: "La reparación importa más que el plan.",
      speaker: "dani",
      cast: ["vale", "dani", "camila"],
      lines: [
        {
          speaker: "dani",
          text: "Camila, I should not have said you defend courses nobody can pay for. That was about you, not about the plan.",
          es: "Camila, no debí decir que defiendes cursos que nadie puede pagar. Eso fue sobre ti, no sobre el plan.",
        },
        {
          speaker: "camila",
          text: "And calling your idea a trailer was cheap. What I meant was that I am afraid of promising speed we cannot keep.",
          es: "Y llamar tráiler a tu idea fue barato. Lo que quise decir es que tengo miedo de prometer una velocidad que no podamos mantener.",
        },
        {
          speaker: "vale",
          text: "That is the sentence I wanted. If you had said it an hour ago, we would have finished this before lunch.",
          es: "Esa es la frase que quería. Si la hubieras dicho hace una hora, habríamos terminado esto antes del almuerzo.",
        },
      ],
      words: [
        { word: "cheap", es: "barato; bajo" },
        { word: "promising", es: "prometer" },
        { word: "speed", es: "velocidad" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "The team presents the combined plan to the committee on the screen, calm and united.",
      text: "They present the third version together.",
      es: "Presentan la tercera versión juntos.",
      speaker: "narrator",
      cast: ["vale", "dani", "camila"],
      lines: [
        {
          speaker: "narrator",
          text: "A committee member asks: your two managers clearly disagreed. How did you decide?",
          es: "Un miembro del comité pregunta: sus dos gerentes claramente no estaban de acuerdo. ¿Cómo decidieron?",
        },
        {
          speaker: "vale",
          text: "Both of them were right about a different risk. What we did was combine the speed one wanted with the depth the other one refused to lose.",
          es: "Los dos tenían razón sobre un riesgo distinto. Lo que hicimos fue combinar la velocidad que uno quería con la profundidad que el otro se negaba a perder.",
        },
        {
          speaker: "camila",
          text: "And we disagreed about the plan, never about each other. That distinction is trained here, not improvised.",
          es: "Y estuvimos en desacuerdo sobre el plan, nunca entre nosotros. Esa distinción se entrena aquí, no se improvisa.",
        },
      ],
      words: [
        { word: "combine", es: "combinar" },
        { word: "depth", es: "profundidad" },
        { word: "distinction", es: "distinción" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Vale closes the meeting standing by the board with the combined plan behind her.",
      text: "Vale closes the meeting with the rule she teaches.",
      es: "Vale cierra la reunión con la regla que enseña.",
      speaker: "vale",
      cast: ["vale", "dani", "camila"],
      lines: [
        {
          speaker: "vale",
          text: "When you disagree at work, say three things: what you agree with, what worries you, and what you propose. In that order.",
          es: "Cuando estés en desacuerdo en el trabajo, di tres cosas: en qué estás de acuerdo, qué te preocupa y qué propones. En ese orden.",
        },
        {
          speaker: "dani",
          text: "I agree with the four weeks, I am worried about month six, and I propose one review in April. Like that?",
          es: "Estoy de acuerdo con las cuatro semanas, me preocupa el mes seis y propongo una revisión en abril. ¿Así?",
        },
        {
          speaker: "vale",
          text: "Exactly like that. Say it that way and nobody has to raise their voice to be heard.",
          es: "Exactamente así. Dilo de esa manera y nadie tiene que levantar la voz para ser escuchado.",
        },
      ],
      words: [
        { word: "worries", es: "preocupa" },
        { word: "propose", es: "proponer" },
        { word: "review", es: "revisión" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Reed sets the next task from the screen while Vale writes it in her notebook.",
      text: "Reed adds the next piece before anyone celebrates.",
      es: "Reed agrega la siguiente pieza antes de que nadie celebre.",
      speaker: "reed",
      cast: ["vale", "reed"],
      lines: [
        {
          speaker: "reed",
          text: "Good. The plan is honest and the team is intact. There is one voice missing from all of this, though.",
          es: "Bien. El plan es honesto y el equipo está intacto. Sin embargo, falta una voz en todo esto.",
        },
        {
          speaker: "vale",
          text: "The students. We have been arguing about what they need without asking them this week.",
          es: "Los estudiantes. Hemos estado discutiendo sobre lo que necesitan sin preguntarles esta semana.",
        },
        {
          speaker: "reed",
          text: "Then go and ask them. Bring me their words on Monday, not your summary of their words.",
          es: "Entonces ve y pregúntales. Tráeme sus palabras el lunes, no tu resumen de sus palabras.",
        },
      ],
      words: [
        { word: "intact", es: "intacto" },
        { word: "missing", es: "faltante" },
        { word: "summary", es: "resumen" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s5",
      questionEn: "How does Vale solve the disagreement between Dani and Camila?",
      questionEs: "¿Cómo resuelve Vale el desacuerdo entre Dani y Camila?",
      options: [
        { label: "She chooses Camila's six-month plan", emoji: "📚" },
        { label: "She combines four intensive weeks with five months of maintenance", emoji: "🤝" },
        { label: "She asks Reed to decide for them", emoji: "📞" },
      ],
      answer: 1,
      sayIt: "She combines four intensive weeks with five months of maintenance.",
      sayItEs: "Combina cuatro semanas intensivas con cinco meses de mantenimiento.",
      sayItCheck: {
        target: "She combines four intensive weeks with five months of maintenance",
        altTargets: ["She combines both plans", "She combined the speed and the depth"],
      },
    },
    {
      id: "q2",
      afterScene: "s7",
      questionEn: "Your turn: disagree with a colleague without attacking them. Say what you agree with, what worries you, and what you propose.",
      questionEs: "Tu turno: muestra desacuerdo con un colega sin atacarlo. Di en qué estás de acuerdo, qué te preocupa y qué propones.",
      options: [
        { label: "I am ready to answer", emoji: "🎤" },
        { label: "I want to hear the example again", emoji: "👂" },
        { label: "I will practice later", emoji: "⏰" },
      ],
      answer: 0,
      sayIt: "I agree with your goal, and I would argue that the deadline is the risk. What worries me is that the tests have not been finished yet, so I propose moving the launch by one week.",
      sayItEs: "Estoy de acuerdo con tu objetivo, y diría que la fecha límite es el riesgo. Lo que me preocupa es que las pruebas todavía no se han terminado, así que propongo mover el lanzamiento una semana.",
      sayItAskEn: "What do you agree with, what worries you, and what do you propose?",
      sayItAskEs: "¿En qué estás de acuerdo, qué te preocupa y qué propones?",
      sayItCheck: {
        target: "I agree with *",
        altTargets: ["What worries me is *", "I propose *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s7",
    phrase: "I disagree with the plan, never with the person.",
    es: "Estoy en desacuerdo con el plan, nunca con la persona.",
  },
  habitCard: {
    afterScene: "s3",
    phrase: "Before I argue, I say what the other person is protecting.",
    es: "Antes de discutir, digo qué está protegiendo la otra persona.",
    model: "vale",
    modelActionEs: "Vale hizo que cada uno explicara qué protegía antes de decidir nada.",
  },
  expressions: [
    {
      phrase: "back down",
      variants: ["backed down", "backs down", "backing down"],
      es: "ceder; echarse para atrás",
      kind: "phrasal",
      example: "Neither of them was going to back down in front of the committee.",
      exampleEs: "Ninguno de los dos iba a ceder frente al comité.",
    },
    {
      phrase: "work out",
      variants: ["worked out", "works out", "working out"],
      es: "resolver; salir bien",
      kind: "phrasal",
      example: "We worked out a third version that kept both risks under control.",
      exampleEs: "Resolvimos una tercera versión que mantuvo ambos riesgos bajo control.",
    },
    {
      phrase: "meet in the middle",
      variants: ["met in the middle", "meets in the middle"],
      es: "llegar a un punto medio",
      kind: "idiom",
      example: "They met in the middle without losing what mattered to either of them.",
      exampleEs: "Llegaron a un punto medio sin perder lo que le importaba a cada uno.",
    },
  ],
  finaleSeconds: 30,
  continuePrompt: {
    en: "Thirty seconds: disagree with a decision at work, calmly, in three steps.",
    es: "Treinta segundos: muestra desacuerdo con una decisión en el trabajo, con calma, en tres pasos.",
  },
  continueWith: [
    "I agree with ...",
    "What worries me is ...",
    "So I propose ...",
  ],
  cliffhanger: {
    en: "Reed wants the students' own words by Monday, not a summary of them.",
    es: "Reed quiere las palabras de los propios estudiantes para el lunes, no un resumen de ellas.",
  },
};
