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
    en: "The committee wants one real success story, so Vale tells the night she almost lost Northline — and learns to tell it like a movie.",
    es: "El comité quiere una historia real de éxito, y Vale cuenta la noche en que casi pierde Northline — y aprende a contarla como una película.",
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
          text: "We need to come up with one real success story. What about Northline? That contract almost died.",
          es: "Necesitamos idear una historia real de éxito. ¿Qué tal Northline? Ese contrato casi muere.",
        },
        {
          speaker: "vale",
          text: "Good idea, but last time I told that story, I said and then, and then, and then ten times.",
          es: "Buena idea, pero la última vez que conté esa historia, dije y luego, y luego, y luego diez veces.",
        },
        {
          speaker: "dani",
          text: "Then do not tell it like a list. Tell it like a movie. What was happening when everything started?",
          es: "Entonces no la cuentes como una lista. Cuéntala como una película. ¿Qué estaba pasando cuando todo empezó?",
        },
      ],
      words: [
        { word: "success", es: "éxito" },
        { word: "contract", es: "contrato" },
        { word: "movie", es: "película" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Vale takes notes while Mr. Reed explains the four parts of a story on her laptop screen.",
      text: "Reed gives her the map of a good story: situation, action, result, lesson.",
      es: "Reed le da el mapa de una buena historia: situación, acción, resultado, lección.",
      speaker: "reed",
      cast: ["vale", "reed"],
      lines: [
        {
          speaker: "reed",
          text: "Dani is right. A good story has four parts: situation, action, result, lesson.",
          es: "Dani tiene razón. Una buena historia tiene cuatro partes: situación, acción, resultado, lección.",
        },
        {
          speaker: "vale",
          text: "And the grammar? I mix my past tenses when I get nervous.",
          es: "¿Y la gramática? Mezclo mis pasados cuando me pongo nerviosa.",
        },
        {
          speaker: "reed",
          text: "Use the past progressive for the scene, and the simple past for the actions. Scene in progress, actions in points.",
          es: "Usa el pasado progresivo para la escena, y el pasado simple para las acciones. Escena en progreso, acciones en puntos.",
        },
      ],
      words: [
        { word: "situation", es: "situación" },
        { word: "result", es: "resultado" },
        { word: "lesson", es: "lección" },
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
          text: "Perfect. Was raining, was finishing, was waiting. That is the scene. Now the action.",
          es: "Perfecto. Estaba lloviendo, estaba terminando, estaba esperando. Esa es la escena. Ahora la acción.",
        },
        {
          speaker: "vale",
          text: "He told me they were comparing us with a bigger academy, and I asked for forty-eight hours to prove our method.",
          es: "Me dijo que nos estaban comparando con una academia más grande, y yo pedí cuarenta y ocho horas para demostrar nuestro método.",
        },
      ],
      words: [
        { word: "raining", es: "lloviendo" },
        { word: "reports", es: "reportes; informes" },
        { word: "comparing", es: "comparando" },
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
          text: "What did you do in those forty-eight hours?",
          es: "¿Qué hiciste en esas cuarenta y ocho horas?",
        },
        {
          speaker: "vale",
          text: "We had two days to win back their trust. My team was recording progress while I was preparing a live demo, and we invited their managers to a real class.",
          es: "Teníamos dos días para recuperar su confianza. Mi equipo estaba grabando el progreso mientras yo preparaba una demostración en vivo, e invitamos a sus gerentes a una clase real.",
        },
        {
          speaker: "vale",
          text: "Northline signed for two more years. The lesson was simple: evidence convinces better than promises.",
          es: "Northline firmó por dos años más. La lección fue simple: la evidencia convence mejor que las promesas.",
        },
      ],
      words: [
        { word: "demo", es: "demostración" },
        { word: "managers", es: "gerentes" },
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
          text: "A committee member says: Vale, tell us about a real success. Take your time.",
          es: "Un miembro del comité dice: Vale, cuéntanos sobre un éxito real. Tómate tu tiempo.",
        },
        {
          speaker: "vale",
          text: "It was raining that Monday, and I was finishing my reports when Northline's director called. They were comparing us with a bigger academy.",
          es: "Ese lunes estaba lloviendo, y yo estaba terminando mis reportes cuando llamó el director de Northline. Nos estaban comparando con una academia más grande.",
        },
        {
          speaker: "vale",
          text: "I asked for forty-eight hours. My team recorded progress, I prepared a live demo, and our shyest student answered every question.",
          es: "Pedí cuarenta y ocho horas. Mi equipo grabó el progreso, yo preparé una demostración en vivo, y nuestra estudiante más tímida respondió cada pregunta.",
        },
      ],
      words: [
        { word: "director", es: "director" },
        { word: "progress", es: "progreso" },
        { word: "shyest", es: "la más tímida" },
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
          text: "I learned that evidence convinces better than promises. Since then, we measure everything.",
          es: "Aprendí que la evidencia convence mejor que las promesas. Desde entonces, medimos todo.",
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
        { word: "measure", es: "medir" },
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
          text: "The past progressive painted the scene, and the simple past moved the story. Reed was right.",
          es: "El pasado progresivo pintó la escena, y el pasado simple movió la historia. Reed tenía razón.",
        },
        {
          speaker: "camila",
          text: "One story down. Next week the committee wants to meet the team, not just the founder.",
          es: "Una historia lista. La próxima semana el comité quiere conocer al equipo, no solo a la fundadora.",
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
          text: "If the committee asks about me, what do I say? I am not a founder. I am just the one who films everything.",
          es: "Si el comité pregunta por mí, ¿qué digo? No soy fundadora. Solo soy la que filma todo.",
        },
        {
          speaker: "vale",
          text: "Just? Camila, you turned our method into videos that thousands of people watch.",
          es: "¿Solo? Camila, tú convertiste nuestro método en videos que miles de personas ven.",
        },
        {
          speaker: "dani",
          text: "Everyone has a strength. We just need to find the right words for each one.",
          es: "Todos tienen una fortaleza. Solo necesitamos encontrar las palabras correctas para cada uno.",
        },
      ],
      words: [
        { word: "films", es: "filma" },
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
          text: "Why should we hire this academy instead of the others? You will answer that on Monday, all of you.",
          es: "¿Por qué deberíamos contratar esta academia en lugar de las otras? Responderán eso el lunes, todos ustedes.",
        },
        {
          speaker: "vale",
          text: "All of us. Then all of us need the right words by Monday morning.",
          es: "Todos nosotros. Entonces todos necesitamos las palabras correctas para el lunes por la mañana.",
        },
      ],
      words: [
        { word: "loved", es: "encantó" },
        { word: "harder", es: "más difícil" },
        { word: "hire", es: "contratar" },
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
      questionEn: "Your turn: tell me about a challenge you faced. What was happening, and what did you do?",
      questionEs: "Tu turno: cuéntame un reto que enfrentaste. ¿Qué estaba pasando y qué hiciste?",
      options: [
        { label: "I am ready to tell my story", emoji: "🎤" },
        { label: "I want to listen one more time", emoji: "👂" },
        { label: "I will practice later", emoji: "⏰" },
      ],
      answer: 0,
      sayIt: "Last year I was learning English while I was working full-time, and I practiced every morning.",
      sayItEs: "El año pasado estaba aprendiendo inglés mientras trabajaba tiempo completo, y practicaba cada mañana.",
      sayItAskEn: "What was happening, and what did you do?",
      sayItAskEs: "¿Qué estaba pasando y qué hiciste?",
      sayItCheck: {
        target: "I was *",
        altTargets: ["Last year I was *", "I was working *", "I was learning *"],
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
      example: "Vale, tell us about a real success. Take your time.",
      exampleEs: "Vale, cuéntanos sobre un éxito real. Tómate tu tiempo.",
    },
  ],
  finaleSeconds: 30,
  continuePrompt: {
    en: "Tell one real story: what was happening, what you did, the result, and the lesson.",
    es: "Cuenta una historia real: qué estaba pasando, qué hiciste, el resultado y la lección.",
  },
  continueWith: [
    "I was ... when ...",
    "So I decided to ...",
    "The result was ...",
    "The lesson was ...",
  ],
  cliffhanger: {
    en: "On Monday the committee asks the whole team: why should we hire you? Camila thinks she has no answer.",
    es: "El lunes el comité le pregunta a todo el equipo: ¿por qué deberíamos contratarlos? Camila cree que no tiene respuesta.",
  },
};
