import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/advanced1-ep2-the-night-northline-almost-left/cover.jpg";
import s1 from "@/assets/storybook/advanced1-ep2-the-night-northline-almost-left/s1.jpg";
import s2 from "@/assets/storybook/advanced1-ep2-the-night-northline-almost-left/s2.jpg";
import s3 from "@/assets/storybook/advanced1-ep2-the-night-northline-almost-left/s3.jpg";
import s4 from "@/assets/storybook/advanced1-ep2-the-night-northline-almost-left/s4.jpg";
import s5 from "@/assets/storybook/advanced1-ep2-the-night-northline-almost-left/s5.jpg";
import s6 from "@/assets/storybook/advanced1-ep2-the-night-northline-almost-left/s6.jpg";
import s7 from "@/assets/storybook/advanced1-ep2-the-night-northline-almost-left/s7.jpg";
import s8 from "@/assets/storybook/advanced1-ep2-the-night-northline-almost-left/s8.jpg";
import s9 from "@/assets/storybook/advanced1-ep2-the-night-northline-almost-left/s9.jpg";

export const ADVANCED1_EP2_NORTHLINE_NIGHT: StorybookEpisode = {
  id: "advanced1-ep2-the-night-northline-almost-left",
  moduleId: "advanced-1",
  week: 1,
  title: "The night Northline almost left",
  titleEs: "La noche que Northline casi se va",
  episodeLabel: {
    en: "Advanced 1 · Episode 2",
    es: "Advanced 1 · Episodio 2",
  },
  previously: [
    {
      en: "Vale introduced herself to the international committee with four clear steps.",
      es: "Vale se presentó ante el comité internacional con cuatro pasos claros.",
    },
    {
      en: "The committee wrote her name down twice, and then they asked for more.",
      es: "El comité anotó su nombre dos veces, y luego pidieron más.",
    },
    {
      en: "On Friday, every academy must tell one true story of a past success.",
      es: "El viernes, cada academia debe contar una historia verdadera de un éxito pasado.",
    },
  ],
  reviewWords: [
    { word: "structure", es: "estructura" },
    { word: "background", es: "experiencia; formación" },
    { word: "goal", es: "meta; objetivo" },
    { word: "committee", es: "comité" },
    { word: "evidence", es: "evidencia; pruebas" },
  ],
  blurb: {
    en: "The committee wants one real success story, so Vale tells the night she almost lost Northline — and shows how a story is told like a movie.",
    es: "El comité quiere una historia real de éxito, y Vale cuenta la noche en que casi pierde Northline — y muestra cómo se cuenta una historia como una película.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt:
        "Vale, Dani and Camila sit around a table in the academy office planning the Friday story, with notebooks and a laptop.",
      text: "The team looks for one true story. Camila remembers the contract that almost died.",
      es: "El equipo busca una historia verdadera. Camila recuerda el contrato que casi muere.",
      speaker: "camila",
      cast: ["vale", "dani", "camila"],
      lines: [
        {
          speaker: "camila",
          text: "We need to come up with one real success story. What about Northline? If that contract had died, we wouldn't be sitting here today.",
          es: "Necesitamos idear una historia real de éxito. ¿Qué tal Northline? Si ese contrato hubiera muerto, hoy no estaríamos sentados aquí.",
        },
        {
          speaker: "vale",
          text: "Good call. And I won't tell it as a list of and then, and then. I'd argue that a committee buys a movie, not a summary — unless the story feels real, the numbers won't matter.",
          es: "Buena idea. Y no la voy a contar como una lista de y luego, y luego. Yo diría que un comité compra una película, no un resumen — a menos que la historia se sienta real, los números no importarán.",
        },
        {
          speaker: "dani",
          text: "Then don't tell it like a list; tell it like a movie. What was happening when everything started?",
          es: "Entonces no la cuentes como una lista; cuéntala como una película. ¿Qué estaba pasando cuando todo empezó?",
        },
      ],
      words: [
        { word: "success", es: "éxito" },
        { word: "contract", es: "contrato" },
        { word: "summary", es: "resumen" },
        { word: "matter", es: "importar" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Vale takes notes while Mr. Reed explains the four parts of a story on her laptop screen.",
      text: "Reed gives her the map of a good story: setting, action, result, lesson.",
      es: "Reed le da el mapa de una buena historia: escena, acción, resultado, lección.",
      speaker: "reed",
      cast: ["vale", "reed"],
      lines: [
        {
          speaker: "reed",
          text: "Dani is right. A good story has four parts: situation, action, result, lesson. What makes a story convincing is not what happened — it is how you tell it.",
          es: "Dani tiene razón. Una buena historia tiene cuatro partes: situación, acción, resultado, lección. Lo que hace convincente a una historia no es lo que pasó, sino cómo la cuentas.",
        },
        {
          speaker: "vale",
          text: "Exactly the framework I teach. Even though my students know the simple past, they always forget to paint the scene first.",
          es: "Exactamente la estructura que yo enseño. Aunque mis estudiantes conocen el pasado simple, siempre olvidan pintar primero la escena.",
        },
        {
          speaker: "reed",
          text: "Precisely. Use the past progressive for the scene and the simple past for the actions. Scene in progress, actions in points.",
          es: "Exacto. Usa el pasado progresivo para la escena y el pasado simple para las acciones. Escena en progreso, acciones en puntos.",
        },
      ],
      words: [
        { word: "setting", es: "escena; contexto" },
        { word: "convincing", es: "convincente" },
        { word: "framework", es: "estructura; marco" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Vale rehearses her story in front of Camila by a rainy window in the academy.",
      text: "Vale paints the scene first: what was happening that rainy Monday.",
      es: "Vale pinta primero la escena: lo que estaba pasando ese lunes lluvioso.",
      speaker: "vale",
      cast: ["vale", "camila"],
      lines: [
        {
          speaker: "vale",
          text: "It was raining, and I was finishing my reports when the phone rang. Northline's director was waiting on the line.",
          es: "Estaba lloviendo, y yo estaba terminando mis reportes cuando sonó el teléfono. El director de Northline estaba esperando en la línea.",
        },
        {
          speaker: "camila",
          text: "Perfect. Was raining, was finishing, was waiting — that is the scene. Now the action.",
          es: "Perfecto. Estaba lloviendo, estaba terminando, estaba esperando — esa es la escena. Ahora la acción.",
        },
        {
          speaker: "vale",
          text: "He told me they were comparing us with a bigger academy, and that a decision would be made by Friday. So I asked for forty-eight hours to prove our method.",
          es: "Me dijo que nos estaban comparando con una academia más grande, y que la decisión se tomaría antes del viernes. Así que pedí cuarenta y ocho horas para demostrar nuestro método.",
        },
      ],
      words: [
        { word: "raining", es: "lloviendo" },
        { word: "reports", es: "reportes; informes" },
        { word: "comparing", es: "comparando" },
        { word: "decision", es: "decisión" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Dani listens with a notebook while Vale describes the forty-eight hours that saved the contract.",
      text: "Then the actions: forty-eight hours, a live demo, and one shy student who answered everything.",
      es: "Luego las acciones: cuarenta y ocho horas, una demostración en vivo y una estudiante tímida que respondió todo.",
      speaker: "vale",
      cast: ["vale", "dani"],
      lines: [
        {
          speaker: "dani",
          text: "And what did you do in those forty-eight hours?",
          es: "¿Y qué hiciste en esas cuarenta y ocho horas?",
        },
        {
          speaker: "vale",
          text: "We had two days to win back their trust. While my team was recording student progress, I was preparing a live demo, and in the end we invited their managers to sit in a real class.",
          es: "Teníamos dos días para recuperar su confianza. Mientras mi equipo grababa el progreso de los estudiantes, yo preparaba una demostración en vivo, y al final invitamos a sus gerentes a presenciar una clase real.",
        },
        {
          speaker: "vale",
          text: "At first, they were skeptical; however, one shy student answered every question they asked. Northline signed for two more years, and what I learned from that experience was that evidence convinces better than promises.",
          es: "Al principio estaban escépticos; sin embargo, una estudiante tímida respondió cada pregunta que hicieron. Northline firmó por dos años más, y lo que aprendí de esa experiencia fue que la evidencia convence mejor que las promesas.",
        },
      ],
      words: [
        { word: "demo", es: "demostración" },
        { word: "managers", es: "gerentes" },
        { word: "skeptical", es: "escépticos; desconfiados" },
        { word: "signed", es: "firmó" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Vale speaks on the Friday video call while three blurred committee members listen on screen.",
      text: "Friday. The committee asks for a real success, and Vale starts with the rain.",
      es: "Viernes. El comité pide un éxito real, y Vale empieza con la lluvia.",
      speaker: "vale",
      cast: ["vale"],
      lines: [
        {
          speaker: "narrator",
          text: "A committee member says: Vale, tell us about a real experience. Take your time.",
          es: "Un miembro del comité dice: Vale, cuéntanos una experiencia real. Tómate tu tiempo.",
        },
        {
          speaker: "vale",
          text: "It was raining that Monday, and I was finishing my reports when Northline's director called. He told me they had been watching our academy for months, but they were comparing us with a bigger one.",
          es: "Ese lunes estaba lloviendo, y yo estaba terminando mis reportes cuando llamó el director de Northline. Me dijo que llevaban meses observando nuestra academia, pero que nos estaban comparando con una más grande.",
        },
        {
          speaker: "vale",
          text: "I asked for forty-eight hours. While my team was recording progress, I prepared a live demo, and our shyest student answered every question. In the end, everything went well: they signed for two more years.",
          es: "Pedí cuarenta y ocho horas. Mientras mi equipo grababa el progreso, yo preparé una demostración en vivo, y nuestra estudiante más tímida respondió cada pregunta. Al final, todo salió bien: firmaron por dos años más.",
        },
      ],
      words: [
        { word: "director", es: "director" },
        { word: "progress", es: "progreso" },
        { word: "shyest", es: "la más tímida" },
        { word: "went well", es: "salió bien" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Close view of Vale answering the committee's follow-up question with calm confidence on the video call.",
      text: "The committee wants the lesson, not only the happy ending.",
      es: "El comité quiere la lección, no solo el final feliz.",
      speaker: "vale",
      cast: ["vale"],
      lines: [
        {
          speaker: "narrator",
          text: "A committee member asks: and what did you learn from that experience?",
          es: "Un miembro del comité pregunta: ¿y qué aprendiste de esa experiencia?",
        },
        {
          speaker: "vale",
          text: "What I learned from that experience was that evidence convinces better than promises. Since then, we have been measuring everything we do, because numbers can't be argued with.",
          es: "Lo que aprendí de esa experiencia fue que la evidencia convence mejor que las promesas. Desde entonces, hemos estado midiendo todo lo que hacemos, porque con los números no se puede discutir.",
        },
        {
          speaker: "narrator",
          text: "The committee answers: a clear story. Situation, action, result, lesson. Thank you.",
          es: "El comité responde: una historia clara. Situación, acción, resultado, lección. Gracias.",
        },
      ],
      words: [
        { word: "learn", es: "aprender" },
        { word: "convinces", es: "convence" },
        { word: "measuring", es: "midiendo" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Vale, Dani and Camila smile with relief in the office after the Friday call ends.",
      text: "After the call, the team understands why the story worked.",
      es: "Después de la llamada, el equipo entiende por qué funcionó la historia.",
      speaker: "dani",
      cast: ["vale", "dani", "camila"],
      lines: [
        {
          speaker: "dani",
          text: "You told it like a movie. I could see the rain.",
          es: "La contaste como una película. Pude ver la lluvia.",
        },
        {
          speaker: "vale",
          text: "The past progressive painted the scene, and the simple past moved the story forward. That being said, the structure only works if the story is true — and that is exactly what I train my students to do.",
          es: "El pasado progresivo pintó la escena, y el pasado simple movió la historia. Dicho esto, la estructura solo funciona si la historia es verdadera — y eso es exactamente lo que entreno a mis estudiantes a hacer.",
        },
        {
          speaker: "camila",
          text: "One story down. Next week the committee wants to meet the whole team, not just the founder.",
          es: "Una historia lista. La próxima semana el comité quiere conocer a todo el equipo, no solo a la fundadora.",
        },
      ],
      words: [
        { word: "painted", es: "pintó" },
        { word: "scene", es: "escena" },
        { word: "founder", es: "fundadora" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Camila holds her camera and looks unsure while Vale and Dani encourage her.",
      text: "Camila is afraid she has nothing to say about herself.",
      es: "Camila teme no tener nada que decir sobre sí misma.",
      speaker: "camila",
      cast: ["vale", "dani", "camila"],
      lines: [
        {
          speaker: "camila",
          text: "If the committee asks about me, what am I supposed to say? I'm not a founder. I'm just the one who films everything.",
          es: "Si el comité pregunta por mí, ¿qué se supone que diga? No soy fundadora. Solo soy la que filma todo.",
        },
        {
          speaker: "vale",
          text: "Just? Camila, if you hadn't filmed our classes, thousands of people would never have seen our method. Your work is the reason half our students found us.",
          es: "¿Solo? Camila, si no hubieras filmado nuestras clases, miles de personas jamás habrían visto nuestro método. Tu trabajo es la razón por la que la mitad de nuestros estudiantes nos encontró.",
        },
        {
          speaker: "dani",
          text: "Everyone has a strength. We just need to find the right words for each one.",
          es: "Todos tienen una fortaleza. Solo necesitamos encontrar las palabras correctas para cada uno.",
        },
      ],
      words: [
        { word: "supposed", es: "supuesto; que se espera" },
        { word: "filmed", es: "filmó; grabó" },
        { word: "thousands", es: "miles" },
        { word: "strength", es: "fortaleza" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Reed speaks seriously from the laptop screen at night while Vale listens in the quiet office.",
      text: "At night, Reed brings the next question, and it is harder than the first.",
      es: "Por la noche, Reed trae la siguiente pregunta, y es más difícil que la primera.",
      speaker: "reed",
      cast: ["vale", "reed"],
      lines: [
        {
          speaker: "reed",
          text: "Vale, the committee loved your story. But one member asked a harder question.",
          es: "Vale, al comité le encantó tu historia. Pero un miembro hizo una pregunta más difícil.",
        },
        {
          speaker: "reed",
          text: "Why should we hire this academy instead of the others? You will all be expected to answer that on Monday.",
          es: "¿Por qué deberíamos contratar esta academia en lugar de las otras? Se espera que todos ustedes respondan eso el lunes.",
        },
        {
          speaker: "vale",
          text: "All of us. Then we all need the right words by Monday morning — although after tonight, I'd say we're closer than ever.",
          es: "Todos nosotros. Entonces todos necesitamos las palabras correctas para el lunes por la mañana — aunque después de esta noche, yo diría que estamos más cerca que nunca.",
        },
      ],
      words: [
        { word: "loved", es: "encantó" },
        { word: "harder", es: "más difícil" },
        { word: "hire", es: "contratar" },
        { word: "expected", es: "se espera; previsto" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s4",
      questionEn: "How did Vale win Northline back?",
      questionEs: "¿Cómo recuperó Vale a Northline?",
      options: [
        { label: "She lowered the price of every class", emoji: "💸" },
        { label: "She invited their managers to a real class and showed student progress", emoji: "🎓" },
        { label: "She asked her director to call them", emoji: "📞" },
      ],
      answer: 1,
      sayIt: "She invited their managers to a real class and showed student progress.",
      sayItEs: "Invitó a sus gerentes a una clase real y mostró el progreso de los estudiantes.",
      sayItCheck: {
        target: "She invited their managers to a real class and showed student progress",
        altTargets: [
          "She invited their managers to a real class",
          "She showed student progress in a real class",
        ],
      },
    },
    {
      id: "q2",
      afterScene: "s7",
      questionEn:
        "Your turn: tell a real experience. What was happening (setting), what happened (problem), and what did you do (reaction)?",
      questionEs:
        "Tu turno: cuenta una experiencia real. ¿Qué estaba pasando (escena), qué pasó (problema) y qué hiciste (reacción)?",
      options: [
        { label: "I am ready to tell my story", emoji: "🎤" },
        { label: "I want to listen one more time", emoji: "👂" },
        { label: "I will practice later", emoji: "⏰" },
      ],
      answer: 0,
      sayIt:
        "While I was working at my first job, a customer suddenly asked me for help. At first I was nervous; however, I stayed calm and helped him with what I knew.",
      sayItEs:
        "Mientras trabajaba en mi primer empleo, un cliente de repente me pidió ayuda. Al principio estaba nervioso; sin embargo, me mantuve tranquilo y lo ayudé con lo que sabía.",
      sayItAskEn: "What was happening, what happened, and what did you do?",
      sayItAskEs: "¿Qué estaba pasando, qué pasó y qué hiciste?",
      sayItCheck: {
        target: "I was *",
        altTargets: [
          "While I was *",
          "Last year I was *",
          "I was working *",
          "I was learning *",
          "At first I was *",
        ],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s6",
    phrase: "Evidence convinces better than promises.",
    es: "La evidencia convence mejor que las promesas.",
  },
  habitCard: {
    afterScene: "s2",
    phrase: "I tell my stories in four parts: situation, action, result, lesson.",
    es: "Cuento mis historias en cuatro partes: situación, acción, resultado, lección.",
    model: "reed",
    modelActionEs: "Reed le dio a Vale una estructura de cuatro partes en lugar de una lista de hechos.",
  },
  expressions: [
    {
      phrase: "come up with",
      variants: ["comes up with", "came up with", "coming up with"],
      es: "idear; ocurrírsele algo",
      kind: "phrasal",
      example: "We need to come up with one real success story.",
      exampleEs: "Necesitamos idear una historia real de éxito.",
    },
    {
      phrase: "win back",
      variants: ["wins back", "won back", "winning back"],
      es: "recuperar (algo perdido)",
      kind: "phrasal",
      example: "We had two days to win back their trust.",
      exampleEs: "Teníamos dos días para recuperar su confianza.",
    },
    {
      phrase: "take your time",
      es: "tómate tu tiempo; sin prisa",
      kind: "idiom",
      example: "Vale, tell us about a real experience. Take your time.",
      exampleEs: "Vale, cuéntanos una experiencia real. Tómate tu tiempo.",
    },
  ],
  finaleSeconds: 30,
  continuePrompt: {
    en: "Tell one real story: what was happening, what happened, what you did, the result, and the lesson.",
    es: "Cuenta una historia real: qué estaba pasando, qué pasó, qué hiciste, el resultado y la lección.",
  },
  continueWith: [
    "While I was ... , ...",
    "Suddenly, ...",
    "At first ... ; however, I ...",
    "What I learned from that experience was ...",
  ],
  cliffhanger: {
    en: "On Monday the committee asks the whole team: why should we hire you? Camila thinks she has no answer.",
    es: "El lunes el comité le pregunta a todo el equipo: ¿por qué deberíamos contratarlos? Camila cree que no tiene respuesta.",
  },
};
