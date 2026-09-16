import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/advanced1-ep13-why-here/cover.jpg";
import s1 from "@/assets/storybook/advanced1-ep13-why-here/s1.jpg";
import s2 from "@/assets/storybook/advanced1-ep13-why-here/s2.jpg";
import s3 from "@/assets/storybook/advanced1-ep13-why-here/s3.jpg";
import s4 from "@/assets/storybook/advanced1-ep13-why-here/s4.jpg";
import s5 from "@/assets/storybook/advanced1-ep13-why-here/s5.jpg";
import s6 from "@/assets/storybook/advanced1-ep13-why-here/s6.jpg";
import s7 from "@/assets/storybook/advanced1-ep13-why-here/s7.jpg";
import s8 from "@/assets/storybook/advanced1-ep13-why-here/s8.jpg";
import s9 from "@/assets/storybook/advanced1-ep13-why-here/s9.jpg";

export const ADVANCED1_EP13_WHY_HERE: StorybookEpisode = {
  id: "advanced1-ep13-why-here",
  moduleId: "advanced-1",
  week: 3,
  title: "Why here",
  titleEs: "Por qué aquí",
  episodeLabel: {
    en: "Advanced 1 · Episode 13",
    es: "Advanced 1 · Episodio 13",
  },
  previously: [
    {
      en: "Vale owned the course she closed, with numbers to back it.",
      es: "Vale asumió el curso que cerró, con números que lo respaldan.",
    },
    {
      en: "Crown's offer is still on Lidia's desk.",
      es: "La oferta de Crown sigue en el escritorio de Lidia.",
    },
    {
      en: "Today the committee asks the question everyone answers badly: why us?",
      es: "Hoy el comité hace la pregunta que todos responden mal: ¿por qué nosotros?",
    },
  ],
  reviewWords: [
    { word: "research", es: "investigación" },
    { word: "match", es: "encaje" },
    { word: "value", es: "valor" },
    { word: "attrition", es: "deserción" },
    { word: "agents", es: "agentes" },
  ],
  blurb: {
    en: "Crown answers \"why us\" with forty schools. Vale answers it with the six hundred people Northline loses every year.",
    es: "Crown responde \"por qué nosotros\" con cuarenta escuelas. Vale responde con las seiscientas personas que Northline pierde cada año.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Camila, Vale and Dani prepare the answer around a table covered in notes.",
      text: "Nine out of ten finalists answer this question badly.",
      es: "Nueve de cada diez finalistas responden mal esta pregunta.",
      speaker: "camila",
      cast: ["camila", "vale", "dani"],
      lines: [
        {
          speaker: "camila",
          text: "Nine out of ten finalists answer \"why us\" by talking about themselves. Crown will talk about their forty schools.",
          es: "Nueve de cada diez finalistas responden \"por qué nosotros\" hablando de sí mismos. Crown hablará de sus cuarenta escuelas.",
        },
        {
          speaker: "vale",
          text: "Then the first sentence out of my mouth has to be about Northline, not about me.",
          es: "Entonces la primera frase que salga de mi boca tiene que ser sobre Northline, no sobre mí.",
        },
        {
          speaker: "dani",
          text: "Four parts: what you know about them, where we match, the value we add, and where it goes in three years.",
          es: "Cuatro partes: qué sabes de ellos, dónde encajamos, qué valor agregamos y a dónde va esto en tres años.",
        },
      ],
      words: [
        { word: "finalists", es: "finalistas" },
        { word: "match", es: "encajar" },
        { word: "value", es: "valor" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Vale shows Camila the numbers she collected about Northline's agents.",
      text: "The research nobody can buy.",
      es: "La investigación que nadie puede comprar.",
      speaker: "vale",
      cast: ["vale", "camila"],
      lines: [
        {
          speaker: "vale",
          text: "Northline hires two thousand agents a year and loses six hundred of them in the first ninety days. Their exit interviews say the same thing: people quit because they can't handle the calls in English.",
          es: "Northline contrata dos mil agentes al año y pierde seiscientos en los primeros noventa días. Sus entrevistas de salida dicen lo mismo: la gente renuncia porque no puede con las llamadas en inglés.",
        },
        {
          speaker: "camila",
          text: "Where did you get the exit interviews?",
          es: "¿De dónde sacaste las entrevistas de salida?",
        },
        {
          speaker: "vale",
          text: "From three of their former agents, who are now my students. It's the kind of research you can't buy.",
          es: "De tres de sus exagentes, que ahora son mis estudiantes. Es el tipo de investigación que no se puede comprar.",
        },
      ],
      words: [
        { word: "agents", es: "agentes" },
        { word: "exit interviews", es: "entrevistas de salida" },
        { word: "research", es: "investigación" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Dani times Vale as she compresses the match into one sentence.",
      text: "The match, in a single sentence.",
      es: "El encaje, en una sola frase.",
      speaker: "dani",
      cast: ["vale", "dani"],
      lines: [
        {
          speaker: "dani",
          text: "And the match? Say it in one sentence, because the committee stops listening after two.",
          es: "¿Y por qué funciona para ellos? Resúmelo en una sola frase, porque el comité deja de escuchar después de dos.",
        },
        {
          speaker: "vale",
          text: "They lose people who can't speak under pressure; my entire method is speaking under pressure. That's not a coincidence — it's the reason I'm in this room.",
          es: "Ellos pierden gente que no puede hablar bajo presión; todo mi método es hablar bajo presión. Eso no es coincidencia: es la razón por la que estoy en esta sala.",
        },
      ],
      words: [
        { word: "pressure", es: "presión" },
        { word: "coincidence", es: "coincidencia" },
        { word: "entire", es: "todo, entero" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Lidia stops Vale in the doorway with a question of her own.",
      text: "Lidia asks her question first.",
      es: "Lidia hace su pregunta primero.",
      speaker: "lidia",
      cast: ["lidia", "vale"],
      lines: [
        {
          speaker: "lidia",
          text: "Before you go in, answer mine. Why here, for you? You could have sold the method and stopped working years ago.",
          es: "Antes de que entres, responde la mía. ¿Por qué aquí, para ti? Pudiste vender el método y dejar de trabajar hace años.",
        },
        {
          speaker: "vale",
          text: "Because a method you sell belongs to whoever buys it. A method you keep teaching stays alive and keeps getting corrected.",
          es: "Porque un método que vendes le pertenece a quien lo compra. Un método que sigues enseñando se mantiene vivo y se sigue corrigiendo.",
        },
        {
          speaker: "lidia",
          text: "Crown offered me money. You're offering me a method that keeps changing.",
          es: "Crown me ofreció dinero. Tú me ofreces un método que sigue cambiando.",
        },
      ],
      words: [
        { word: "belongs", es: "pertenece" },
        { word: "alive", es: "vivo" },
        { word: "corrected", es: "corregido" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Barrett asks why Northline while Vale answers with their own numbers.",
      text: "In the room, she opens with their problem.",
      es: "En la sala, ella abre con el problema de ellos.",
      speaker: "barrett",
      cast: ["barrett", "vale"],
      lines: [
        {
          speaker: "barrett",
          text: "Why Northline? And please don't tell me it's a great company; we know what we are.",
          es: "¿Por qué Northline? Y por favor no me diga que es una gran empresa; ya sabemos lo que somos.",
        },
        {
          speaker: "vale",
          text: "You lose six hundred agents a year in their first ninety days, and your own exit interviews say it's the English on live calls. I know that because three of those agents sit in my classroom on Tuesday nights.",
          es: "Pierden seiscientos agentes al año en sus primeros noventa días, y sus propias entrevistas de salida dicen que es el inglés en llamadas en vivo. Lo sé porque tres de esos agentes se sientan en mi aula los martes por la noche.",
        },
        {
          speaker: "vale",
          text: "What I bring is not more classes; it's speaking minutes measured per agent per week. If those minutes go up, your ninety-day attrition comes down, and in three years you stop replacing the same six hundred people.",
          es: "Lo que traigo no son más clases; son minutos hablados medidos por agente por semana. Si esos minutos suben, su deserción de noventa días baja, y en tres años dejan de reemplazar a las mismas seiscientas personas.",
        },
      ],
      words: [
        { word: "live calls", es: "llamadas en vivo" },
        { word: "attrition", es: "deserción" },
        { word: "replacing", es: "reemplazar" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Reed and Barrett compare the two presentations in the empty committee room.",
      text: "Two openings, two different rooms.",
      es: "Dos aperturas, dos salas distintas.",
      speaker: "reed",
      cast: ["reed", "barrett"],
      lines: [
        {
          speaker: "reed",
          text: "Crown opened with the number of schools. She opened with the number of people you lose.",
          es: "Crown abrió con el número de escuelas. Ella abrió con el número de personas que ustedes pierden.",
        },
        {
          speaker: "barrett",
          text: "I noticed. I've been sitting in these rounds for nine years and almost nobody does their homework on us.",
          es: "Lo noté. Llevo nueve años en estas rondas y casi nadie hace la tarea sobre nosotros.",
        },
      ],
      words: [
        { word: "opened", es: "abrió, comenzó" },
        { word: "rounds", es: "rondas" },
        { word: "noticed", es: "noté" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Lidia tells Vale and Camila that she turned Crown down.",
      text: "Lidia gives her answer.",
      es: "Lidia da su respuesta.",
      speaker: "lidia",
      cast: ["lidia", "vale", "camila"],
      lines: [
        {
          speaker: "lidia",
          text: "I turned Crown down this morning. Not for you — for the fact that in two years here I've rewritten three of your lessons and you kept all three.",
          es: "Rechacé a Crown esta mañana. No por ti: por el hecho de que en dos años aquí reescribí tres de tus lecciones y las tres se quedaron.",
        },
        {
          speaker: "camila",
          text: "She also asked for a raise, which I've already approved.",
          es: "También pidió un aumento, que ya aprobé.",
        },
        {
          speaker: "vale",
          text: "Good. I'd rather pay up now than explain later why the best teacher I have is teaching for someone else.",
          es: "Bien. Prefiero pagar ahora que explicar después por qué la mejor maestra que tengo está enseñando para otro.",
        },
      ],
      words: [
        { word: "rewritten", es: "reescribí" },
        { word: "raise", es: "aumento" },
        { word: "approved", es: "aprobé" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Dani and Vale walk through the academy after both conversations.",
      text: "The same question, in two rooms.",
      es: "La misma pregunta, en dos salas.",
      speaker: "dani",
      cast: ["dani", "vale"],
      lines: [
        {
          speaker: "dani",
          text: "Same question, two rooms. Northline wanted to know why them; Lidia wanted to know why here.",
          es: "La misma pregunta, dos salas. Northline quería saber por qué ellos; Lidia quería saber por qué aquí.",
        },
        {
          speaker: "vale",
          text: "And both answers come down to the same thing: what changes for them if I stay.",
          es: "Y las dos respuestas se reducen a lo mismo: qué cambia para ellos si me quedo.",
        },
      ],
      words: [
        { word: "wanted", es: "quería" },
        { word: "changes", es: "cambia" },
        { word: "stay", es: "quedarme" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Reed tells Vale she is through to the contract stage.",
      text: "Tomorrow the price is on the table.",
      es: "Mañana el precio está sobre la mesa.",
      speaker: "reed",
      cast: ["reed", "vale"],
      lines: [
        {
          speaker: "reed",
          text: "You're through to the contract stage. Tomorrow you meet the finance team, and they will push on the price for an hour.",
          es: "Pasaste a la etapa del contrato. Mañana ves al equipo de finanzas, y van a presionar sobre el precio durante una hora.",
        },
        {
          speaker: "vale",
          text: "An hour is fine. My number doesn't get tired.",
          es: "Una hora está bien. Mi número no se cansa.",
        },
      ],
      words: [
        { word: "stage", es: "etapa" },
        { word: "finance", es: "finanzas" },
        { word: "tired", es: "cansado" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s4",
      questionEn: "What does Vale say Northline's real problem is?",
      questionEs: "¿Cuál dice Vale que es el problema real de Northline?",
      options: [
        { label: "Their managers don't speak Spanish", emoji: "🗣️" },
        { label: "New agents quit because they can't handle calls in English", emoji: "📞" },
        { label: "They don't have enough classrooms", emoji: "🏫" },
      ],
      answer: 1,
      sayIt: "New agents quit because they can't handle calls in English.",
      sayItEs: "Los agentes nuevos renuncian porque no pueden con las llamadas en inglés.",
      sayItCheck: {
        target: "New agents quit because they can't handle calls in English",
        altTargets: ["They quit because they can't handle calls in English"],
      },
    },
    {
      id: "q2",
      afterScene: "s6",
      questionEn: "Why do you want to work at this company? Say what you know about them, where you match, the value you add, and where you see it in three years.",
      questionEs: "¿Por qué quieres trabajar en esta empresa? Di qué sabes de ellos, dónde encajas, qué valor agregas y dónde lo ves en tres años.",
      options: [
        { label: "I am ready to answer", emoji: "🎤" },
        { label: "I want to hear the example again", emoji: "👂" },
        { label: "I will practice later", emoji: "⏰" },
      ],
      answer: 0,
      sayIt: "I know you're opening a new support team this year and that most of your clients call in English. I've handled calls for two years, so what I add is somebody who doesn't need three months of training, and in three years I'd like to be the person training that team.",
      sayItEs: "Sé que están abriendo un nuevo equipo de soporte este año y que la mayoría de sus clientes llaman en inglés. He atendido llamadas por dos años, así que lo que agrego es alguien que no necesita tres meses de capacitación, y en tres años me gustaría ser la persona que forma a ese equipo.",
      sayItAskEn: "What do you know about them, where do you match, what do you add, and where is it in three years?",
      sayItAskEs: "¿Qué sabes de ellos, dónde encajas, qué agregas y dónde está eso en tres años?",
      sayItCheck: {
        target: "I know you *",
        altTargets: ["What I add is *", "In three years *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s6",
    phrase: "I talk about what they need before I talk about what I want.",
    es: "Hablo de lo que ellos necesitan antes de hablar de lo que yo quiero.",
  },
  habitCard: {
    afterScene: "s2",
    phrase: "Before an interview, I research the company until I can name their real problem.",
    es: "Antes de una entrevista, investigo la empresa hasta poder nombrar su problema real.",
    model: "vale",
    modelActionEs: "Vale abrió con los números de Northline, no con los suyos.",
  },
  expressions: [
    {
      phrase: "pay up",
      variants: ["pays up", "paid up", "paying up"],
      es: "pagar lo que se debe",
      kind: "phrasal",
      example: "I'd rather pay up now than explain later why the best teacher I have is teaching for someone else.",
      exampleEs: "Prefiero pagar ahora que explicar después por qué la mejor maestra que tengo está enseñando para otro.",
    },
    {
      phrase: "turn down",
      variants: ["turned Crown down", "turned down", "turns down", "turning down"],
      es: "rechazar",
      kind: "phrasal",
      example: "I turned Crown down this morning.",
      exampleEs: "Rechacé a Crown esta mañana.",
    },
    {
      phrase: "do your homework",
      variants: ["does their homework", "did their homework", "doing your homework"],
      es: "investigar bien antes",
      kind: "idiom",
      example: "Almost nobody does their homework on us.",
      exampleEs: "Casi nadie hace la tarea sobre nosotros.",
    },
    {
      phrase: "come down to",
      variants: ["comes down to", "came down to", "coming down to"],
      es: "reducirse a",
      kind: "idiom",
      example: "Both answers come down to the same thing: what changes for them if I stay.",
      exampleEs: "Las dos respuestas se reducen a lo mismo: qué cambia para ellos si me quedo.",
    },
  ],
  finaleSeconds: 30,
  continuePrompt: {
    en: "Thirty seconds: say why you want to work there, starting with their problem, not yours.",
    es: "Treinta segundos: di por qué quieres trabajar ahí, empezando con el problema de ellos, no el tuyo.",
  },
  continueWith: [
    "I know that you ...",
    "Where I match is ...",
    "In three years ...",
  ],
  cliffhanger: {
    en: "Lidia is staying, but tomorrow the finance team pushes on the price for a full hour.",
    es: "Lidia se queda, pero mañana el equipo de finanzas presiona el precio durante una hora entera.",
  },
};
