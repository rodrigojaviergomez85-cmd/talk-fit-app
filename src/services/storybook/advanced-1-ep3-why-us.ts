import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/advanced1-ep3-why-us/cover.jpg";
import s1 from "@/assets/storybook/advanced1-ep3-why-us/s1.jpg";
import s2 from "@/assets/storybook/advanced1-ep3-why-us/s2.jpg";
import s3 from "@/assets/storybook/advanced1-ep3-why-us/s3.jpg";
import s4 from "@/assets/storybook/advanced1-ep3-why-us/s4.jpg";
import s5 from "@/assets/storybook/advanced1-ep3-why-us/s5.jpg";
import s6 from "@/assets/storybook/advanced1-ep3-why-us/s6.jpg";
import s7 from "@/assets/storybook/advanced1-ep3-why-us/s7.jpg";
import s8 from "@/assets/storybook/advanced1-ep3-why-us/s8.jpg";
import s9 from "@/assets/storybook/advanced1-ep3-why-us/s9.jpg";

export const ADVANCED1_EP3_WHY_US: StorybookEpisode = {
  id: "advanced1-ep3-why-us",
  moduleId: "advanced-1",
  week: 1,
  title: "Why us?",
  titleEs: "¿Por qué nosotros?",
  episodeLabel: {
    en: "Advanced 1 · Episode 3",
    es: "Advanced 1 · Episodio 3",
  },
  previously: [
    {
      en: "Vale told the committee how she saved the Northline contract, and they loved the story.",
      es: "Vale le contó al comité cómo salvó el contrato de Northline, y les encantó la historia.",
    },
    {
      en: "Now the committee wants to meet the whole team, not only the founder.",
      es: "Ahora el comité quiere conocer a todo el equipo, no solo a la fundadora.",
    },
    {
      en: "Camila is sure she has no strength worth saying out loud.",
      es: "Camila está segura de que no tiene ninguna fortaleza que valga la pena decir en voz alta.",
    },
  ],
  reviewWords: [
    { word: "success", es: "éxito" },
    { word: "lesson", es: "lección" },
    { word: "evidence", es: "evidencia; pruebas" },
    { word: "founder", es: "fundadora" },
    { word: "measure", es: "medir" },
  ],
  blurb: {
    en: "Each person on the team must answer the hardest question in any interview: why should we hire you?",
    es: "Cada persona del equipo debe responder la pregunta más difícil de cualquier entrevista: ¿por qué deberíamos contratarte?",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Vale, Dani and Camila meet on a quiet Sunday in the academy office, preparing for Monday's call.",
      text: "Sunday. Tomorrow each of them answers one question, and it feels like a trap.",
      es: "Domingo. Mañana cada uno responde una pregunta, y se siente como una trampa.",
      speaker: "vale",
      cast: ["vale", "dani", "camila"],
      lines: [
        {
          speaker: "vale",
          text: "Tomorrow the committee asks one question to each of us: why should we hire you, or in our case, your role?",
          es: "Mañana el comité le hace una pregunta a cada uno: ¿por qué deberíamos contratarte, o en nuestro caso, tu rol?",
        },
        {
          speaker: "dani",
          text: "That question is a trap. If you say too little, you sound weak. If you say too much, you sound arrogant.",
          es: "Esa pregunta es una trampa. Si dices muy poco, suenas débil. Si dices demasiado, suenas arrogante.",
        },
        {
          speaker: "camila",
          text: "Then I am in trouble, because I would say nothing. I do not have a strength like you two.",
          es: "Entonces estoy en problemas, porque yo no diría nada. No tengo una fortaleza como ustedes dos.",
        },
      ],
      words: [
        { word: "hire", es: "contratar" },
        { word: "trap", es: "trampa" },
        { word: "arrogant", es: "arrogante" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Camila and Vale listen to Mr. Reed on the laptop screen while he explains his rule about value.",
      text: "Reed changes the question: it is not about being great, it is about value.",
      es: "Reed cambia la pregunta: no se trata de ser grandioso, se trata del valor.",
      speaker: "reed",
      cast: ["vale", "camila", "reed"],
      lines: [
        {
          speaker: "reed",
          text: "Camila, let me stop you there. The question is not are you great? The question is what value do you bring?",
          es: "Camila, déjame detenerte ahí. La pregunta no es ¿eres grandiosa? La pregunta es ¿qué valor aportas?",
        },
        {
          speaker: "camila",
          text: "Value. Okay. But how do I say it without sounding like I am selling a car?",
          es: "Valor. Okay. ¿Pero cómo lo digo sin sonar como si vendiera un carro?",
        },
        {
          speaker: "reed",
          text: "Do not bring up your job title; bring up one fact. Say I am good at this, and here is the proof. Facts are humble, opinions are arrogant.",
          es: "No menciones tu puesto; menciona un hecho. Di soy buena en esto, y aquí está la prueba. Los hechos son humildes, las opiniones son arrogantes.",
        },
      ],
      words: [
        { word: "value", es: "valor" },
        { word: "proof", es: "prueba" },
        { word: "humble", es: "humilde" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Dani stands and practices his answer while Vale and Camila listen from the table.",
      text: "Dani goes first: one strength, one fact, nothing else.",
      es: "Dani va primero: una fortaleza, un hecho, nada más.",
      speaker: "dani",
      cast: ["vale", "dani", "camila"],
      lines: [
        {
          speaker: "dani",
          text: "Fine, I go first. One of my strengths is operations: I coordinate three countries, and last month not a single class was cancelled.",
          es: "Bien, yo voy primero. Una de mis fortalezas es operaciones: coordino tres países, y el mes pasado ni una sola clase fue cancelada.",
        },
        {
          speaker: "vale",
          text: "Strength plus proof. Clean. Did you hear it, Camila?",
          es: "Fortaleza más prueba. Limpio. ¿Lo escuchaste, Camila?",
        },
        {
          speaker: "camila",
          text: "I heard it. Let me try. I am good at noticing what people feel on camera.",
          es: "Lo escuché. Déjame intentar. Soy buena notando lo que la gente siente frente a la cámara.",
        },
      ],
      words: [
        { word: "operations", es: "operaciones" },
        { word: "coordinate", es: "coordinar" },
        { word: "cancelled", es: "cancelada" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Camila shows an edited video on her laptop while Vale and Dani watch it with respect.",
      text: "Camila finds her fact, and it is bigger than she thought.",
      es: "Camila encuentra su hecho, y es más grande de lo que pensaba.",
      speaker: "camila",
      cast: ["vale", "dani", "camila"],
      lines: [
        {
          speaker: "vale",
          text: "Now the proof. One fact.",
          es: "Ahora la prueba. Un hecho.",
        },
        {
          speaker: "camila",
          text: "Our students watch the videos twice when I edit them, because I cut out the boring parts and keep the real moments.",
          es: "Nuestros estudiantes ven los videos dos veces cuando yo los edito, porque quito las partes aburridas y guardo los momentos reales.",
        },
        {
          speaker: "dani",
          text: "That is not a small strength. That is the reason our method travels.",
          es: "Esa no es una fortaleza pequeña. Es la razón por la que nuestro método viaja.",
        },
      ],
      words: [
        { word: "edit", es: "editar" },
        { word: "boring", es: "aburridas" },
        { word: "moments", es: "momentos" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Vale rehearses her answer standing by the whiteboard while Camila plays the committee.",
      text: "Vale answers with data, not adjectives.",
      es: "Vale responde con datos, no con adjetivos.",
      speaker: "vale",
      cast: ["vale", "dani", "camila"],
      lines: [
        {
          speaker: "camila",
          text: "Your turn, founder. Why should the program choose your academy?",
          es: "Tu turno, fundadora. ¿Por qué debería el programa elegir tu academia?",
        },
        {
          speaker: "vale",
          text: "Because we do not sell English; we build speakers. Our students complete more speaking minutes than any traditional school in the region, and here is the data.",
          es: "Porque no vendemos inglés; construimos hablantes. Nuestros estudiantes completan más minutos hablados que cualquier escuela tradicional de la región, y aquí están los datos.",
        },
        {
          speaker: "dani",
          text: "Strength, proof, and numbers. The committee is going to love that.",
          es: "Fortaleza, prueba y números. Al comité le va a encantar eso.",
        },
      ],
      words: [
        { word: "speakers", es: "hablantes" },
        { word: "minutes", es: "minutos" },
        { word: "data", es: "datos" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Dani answers the committee on the video call while Camila waits for her turn beside him.",
      text: "Monday. Dani goes first in front of the committee.",
      es: "Lunes. Dani va primero frente al comité.",
      speaker: "dani",
      cast: ["dani", "camila"],
      lines: [
        {
          speaker: "narrator",
          text: "A committee member asks: Dani, why should we value your role in this academy?",
          es: "Un miembro del comité pregunta: Dani, ¿por qué deberíamos valorar tu rol en esta academia?",
        },
        {
          speaker: "dani",
          text: "I coordinate operations in three countries, and last month not a single class was cancelled. I keep the machine running so teachers can teach.",
          es: "Coordino operaciones en tres países, y el mes pasado ni una sola clase fue cancelada. Mantengo la máquina funcionando para que los maestros enseñen.",
        },
        {
          speaker: "narrator",
          text: "The committee turns to Camila: and you? The cameras and the videos.",
          es: "El comité se dirige a Camila: ¿y tú? Las cámaras y los videos.",
        },
      ],
      words: [
        { word: "role", es: "rol; papel" },
        { word: "machine", es: "máquina" },
        { word: "teachers", es: "maestros" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Camila speaks to the committee on camera with quiet confidence in the academy studio corner.",
      text: "Camila says her value out loud for the first time.",
      es: "Camila dice su valor en voz alta por primera vez.",
      speaker: "camila",
      cast: ["camila"],
      lines: [
        {
          speaker: "camila",
          text: "I notice what students feel on camera, and I turn our method into videos people actually finish. Students watch my edits twice.",
          es: "Noto lo que los estudiantes sienten frente a la cámara, y convierto nuestro método en videos que la gente sí termina. Los estudiantes ven mis ediciones dos veces.",
        },
        {
          speaker: "narrator",
          text: "A committee member answers: clear value, both of you. Vale, your team speaks like owners.",
          es: "Un miembro del comité responde: valor claro, los dos. Vale, tu equipo habla como dueños.",
        },
        {
          speaker: "camila",
          text: "We learned from the best owner.",
          es: "Aprendimos de la mejor dueña.",
        },
      ],
      words: [
        { word: "camera", es: "cámara" },
        { word: "finish", es: "terminar" },
        { word: "owners", es: "dueños" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "The three of them laugh together with coffee after the call in the warm afternoon office.",
      text: "After the call, Camila understands what changed.",
      es: "Después de la llamada, Camila entiende qué cambió.",
      speaker: "vale",
      cast: ["vale", "dani", "camila"],
      lines: [
        {
          speaker: "vale",
          text: "Camila, did you hear what the committee said? Clear value.",
          es: "Camila, ¿escuchaste lo que dijo el comité? Valor claro.",
        },
        {
          speaker: "camila",
          text: "I heard it. Yesterday I had no strength. Today I have a strength with proof.",
          es: "Lo escuché. Ayer no tenía fortaleza. Hoy tengo una fortaleza con prueba.",
        },
        {
          speaker: "dani",
          text: "That is the trick. The strength was always there. The words were missing.",
          es: "Ese es el truco. La fortaleza siempre estuvo ahí. Faltaban las palabras.",
        },
      ],
      words: [
        { word: "trick", es: "truco" },
        { word: "missing", es: "faltando; ausentes" },
        { word: "yesterday", es: "ayer" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Reed delivers uncomfortable news from the laptop screen while Vale listens with a tense face.",
      text: "The committee is impressed, but one member wants something harder.",
      es: "El comité está impresionado, pero un miembro quiere algo más difícil.",
      speaker: "reed",
      cast: ["vale", "reed"],
      lines: [
        {
          speaker: "reed",
          text: "Vale, the committee is impressed. But one member wrote something in the chat: everyone has strengths, I want to hear a weakness.",
          es: "Vale, el comité está impresionado. Pero un miembro escribió algo en el chat: todos tienen fortalezas, quiero escuchar una debilidad.",
        },
        {
          speaker: "vale",
          text: "A real weakness, in front of nine competing academies. Fine. I would rather be honest than perfect.",
          es: "Una debilidad real, frente a nueve academias competidoras. Bien. Prefiero ser honesta que perfecta.",
        },
        {
          speaker: "reed",
          text: "Be ready on Wednesday. And Vale, do not invent a pretty one.",
          es: "Prepárate para el miércoles. Y Vale, no inventes una bonita.",
        },
      ],
      words: [
        { word: "impressed", es: "impresionado" },
        { word: "weakness", es: "debilidad" },
        { word: "chat", es: "chat" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s5",
      questionEn: "What is Reed's formula for answering why should we hire you?",
      questionEs: "¿Cuál es la fórmula de Reed para responder por qué deberíamos contratarte?",
      options: [
        { label: "Say you are the best and smile", emoji: "😎" },
        { label: "Talk about your job title for one minute", emoji: "💼" },
        { label: "Name your strength and prove it with one fact", emoji: "📊" },
      ],
      answer: 2,
      sayIt: "Name your strength and prove it with one fact.",
      sayItEs: "Nombra tu fortaleza y pruébala con un hecho.",
      sayItCheck: {
        target: "Name your strength and prove it with one fact",
        altTargets: ["Say your strength and prove it with one fact", "Your strength and one fact"],
      },
    },
    {
      id: "q2",
      afterScene: "s7",
      questionEn: "Your turn: what is one of your strengths? Prove it with one fact.",
      questionEs: "Tu turno: ¿cuál es una de tus fortalezas? Pruébala con un hecho.",
      options: [
        { label: "I am ready to answer", emoji: "🎤" },
        { label: "I want to hear the example again", emoji: "👂" },
        { label: "I will practice later", emoji: "⏰" },
      ],
      answer: 0,
      sayIt: "One of my strengths is consistency. I practiced English every day for sixty days.",
      sayItEs: "Una de mis fortalezas es la constancia. Practiqué inglés todos los días durante sesenta días.",
      sayItAskEn: "What is one of your strengths, and what is your proof?",
      sayItAskEs: "¿Cuál es una de tus fortalezas y cuál es tu prueba?",
      sayItCheck: {
        target: "One of my strengths is *",
        altTargets: ["My strength is *", "I am good at *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s7",
    phrase: "Facts are humble. Opinions are arrogant.",
    es: "Los hechos son humildes. Las opiniones son arrogantes.",
  },
  habitCard: {
    afterScene: "s2",
    phrase: "I say my strength, then I prove it with one fact.",
    es: "Digo mi fortaleza y luego la pruebo con un hecho.",
    model: "reed",
    modelActionEs: "Reed le enseñó a Camila a acompañar cada fortaleza con una prueba real.",
  },
  expressions: [
    {
      phrase: "bring up",
      variants: ["brings up", "brought up", "bringing up"],
      es: "mencionar; sacar un tema",
      kind: "phrasal",
      example: "Do not bring up your job title; bring up one fact.",
      exampleEs: "No menciones tu puesto; menciona un hecho.",
    },
    {
      phrase: "cut out",
      variants: ["cuts out", "cutting out"],
      es: "quitar; eliminar",
      kind: "phrasal",
      example: "I cut out the boring parts and keep the real moments.",
      exampleEs: "Quito las partes aburridas y guardo los momentos reales.",
    },
    {
      phrase: "sound like",
      variants: ["sounds like", "sounded like", "sounding like"],
      es: "sonar como; parecer",
      kind: "idiom",
      example: "How do I say it without sounding like I am selling a car?",
      exampleEs: "¿Cómo lo digo sin sonar como si vendiera un carro?",
    },
  ],
  finaleSeconds: 30,
  continuePrompt: {
    en: "Answer the question: why should we hire you? Name one strength and prove it with one fact.",
    es: "Responde la pregunta: ¿por qué deberíamos contratarte? Nombra una fortaleza y pruébala con un hecho.",
  },
  continueWith: [
    "One of my strengths is ...",
    "For example, last month I ...",
    "That is why I can ...",
  ],
  cliffhanger: {
    en: "On Wednesday the committee wants a real weakness, and Vale has to choose an honest one.",
    es: "El miércoles el comité quiere una debilidad real, y Vale tiene que elegir una honesta.",
  },
};
