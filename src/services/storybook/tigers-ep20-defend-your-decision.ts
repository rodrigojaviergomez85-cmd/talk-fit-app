import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/tigers-ep20-defend-your-decision/cover.jpg";
import s1 from "@/assets/storybook/tigers-ep20-defend-your-decision/s1.jpg";
import s2 from "@/assets/storybook/tigers-ep20-defend-your-decision/s2.jpg";
import s3 from "@/assets/storybook/tigers-ep20-defend-your-decision/s3.jpg";
import s4 from "@/assets/storybook/tigers-ep20-defend-your-decision/s4.jpg";
import s5 from "@/assets/storybook/tigers-ep20-defend-your-decision/s5.jpg";
import s6 from "@/assets/storybook/tigers-ep20-defend-your-decision/s6.jpg";
import s7 from "@/assets/storybook/tigers-ep20-defend-your-decision/s7.jpg";
import s8 from "@/assets/storybook/tigers-ep20-defend-your-decision/s8.jpg";
import s9 from "@/assets/storybook/tigers-ep20-defend-your-decision/s9.jpg";
import s10 from "@/assets/storybook/tigers-ep20-defend-your-decision/s10.jpg";
import s11 from "@/assets/storybook/tigers-ep20-defend-your-decision/s11.jpg";

/**
 * Season 7 (Tigers) Episode 20 — "Defend your decision". SEASON FINALE.
 * Matches Tigers Day 20 (full integration: defend a decision with past,
 * present perfect, comparatives, and future — and bridge to Season 8).
 */
export const TIGERS_EP20_DEFEND_YOUR_DECISION: StorybookEpisode = {
  id: "tigers-ep20-defend-your-decision",
  moduleId: "tigers",
  week: 4,
  title: "Defend your decision",
  titleEs: "Defiende tu decisión",
  episodeLabel: { en: "Season 7 · Episode 20", es: "Temporada 7 · Episodio 20" },
  previously: [
    { en: "The school won the Northline contract and four offices.", es: "La escuela ganó el contrato de Northline y cuatro oficinas." },
    { en: "Vale named Camila, Sofía, and Dani as leaders.", es: "Vale nombró a Camila, Sofía y Dani como líderes." },
    { en: "Office four is a question mark… pointed at Bryan from BigTalk.", es: "La oficina cuatro es un signo de interrogación… que apunta a Bryan de BigTalk." },
  ],
  reviewWords: [
    { word: "leader", es: "líder" },
    { word: "purpose", es: "propósito" },
    { word: "operations", es: "operaciones" },
  ],
  blurb: {
    en: "Season finale: Vale makes the strangest call of her career, and then must defend the decision in front of everyone — including her own doubts.",
    es: "Final de temporada: Vale hace la llamada más extraña de su carrera, y luego debe defender la decisión frente a todos — incluidas sus propias dudas.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Vale sostiene el teléfono; el equipo observa en silencio absoluto.",
      text: "Vale held the phone. The team watched in absolute silence.",
      es: "Vale sostuvo el teléfono. El equipo observó en silencio absoluto.",
      speaker: "narrator",
      lines: [
        { speaker: "dani", text: "Are you really going to call him? The enemy? Today?", es: "«¿De verdad vas a llamarlo? ¿Al enemigo? ¿Hoy?»" },
        { speaker: "vale", text: "The competition. And yes. Today. Now, actually.", es: "«La competencia. Y sí. Hoy. Ahora, de hecho»." },
        { speaker: "camila", text: "She has been rehearsing this call since six in the morning.", es: "«Ha estado ensayando esta llamada desde las seis de la mañana»." },
      ],
      words: [
        { word: "silence", es: "silencio" },
        { word: "rehearsing", es: "ensayando" },
        { word: "actually", es: "de hecho" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Bryan contesta en la oficina de BigTalk, sorprendido.",
      text: "Bryan, it's Vale. I am not calling to sell. I am calling to offer.",
      es: "«Bryan, soy Vale. No llamo para vender. Llamo para ofrecer».",
      speaker: "vale",
      lines: [
        { speaker: "bryan", text: "Vale. This is unexpected. Is everything okay?", es: "«Vale. Esto es inesperado. ¿Todo bien?»" },
        { speaker: "vale", text: "Everything is great. We won Northline — and four offices. I need a leader for office four.", es: "«Todo va muy bien. Ganamos Northline — y cuatro oficinas. Necesito un líder para la oficina cuatro»." },
        { speaker: "vale", text: "I am not going to offer you more money. I am going to offer you a purpose.", es: "«No voy a ofrecerte más dinero. Voy a ofrecerte un propósito»." },
      ],
      words: [
        { word: "unexpected", es: "inesperado" },
        { word: "purpose", es: "propósito" },
        { word: "offer", es: "ofrecer" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Bryan se queda en silencio largo; Vale espera con calma.",
      text: "The silence lasted twenty seconds. Dani counted them, of course.",
      es: "El silencio duró veinte segundos. Dani los contó, por supuesto.",
      speaker: "narrator",
      lines: [
        { speaker: "bryan", text: "…You are offering the BigTalk guy a leadership position. At the school BigTalk tried to buy.", es: "«…Le estás ofreciendo al tipo de BigTalk un puesto de liderazgo. En la escuela que BigTalk intentó comprar»." },
        { speaker: "vale", text: "I am offering it to the man who told me the truth twice, when the truth was bad for him.", es: "«Se lo estoy ofreciendo al hombre que me dijo la verdad dos veces, cuando la verdad era mala para él»." },
        { speaker: "bryan", text: "That is the best reference I have ever heard.", es: "«Esa es la mejor referencia que he escuchado en mi vida»." },
      ],
      words: [
        { word: "position", es: "puesto" },
        { word: "reference", es: "referencia" },
        { word: "truth", es: "verdad" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Bryan pide un día para pensar; Vale acepta con una condición.",
      text: "Give me one day. I need to think — and I need to resign honestly.",
      es: "«Dame un día. Necesito pensar — y necesito renunciar con honestidad».",
      speaker: "bryan",
      lines: [
        { speaker: "bryan", text: "Give me one day. If I do this, I will resign honestly. No secrets, no stolen clients.", es: "«Dame un día. Si lo hago, renunciaré con honestidad. Sin secretos, sin clientes robados»." },
        { speaker: "vale", text: "That is exactly why I called you and nobody else.", es: "«Es exactamente por eso que te llamé a ti y a nadie más»." },
        { speaker: "bryan", text: "Tomorrow, then. I will call you tomorrow at nine.", es: "«Mañana, entonces. Te llamaré mañana a las nueve»." },
      ],
      words: [
        { word: "resign", es: "renunciar" },
        { word: "stolen", es: "robados" },
        { word: "secrets", es: "secretos" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Esa noche, Vale sola con sus dudas; la foto vieja del barrio sobre el escritorio.",
      text: "That night, the doubts arrived. Every big decision brings them, like uninvited guests.",
      es: "Esa noche llegaron las dudas. Toda decisión grande las trae, como invitados no invitados.",
      speaker: "narrator",
      lines: [
        { speaker: "vale", text: "What if he says no? What if he says YES and it's a mistake? What if I am wrong about people?", es: "«¿Y si dice que no? ¿Y si dice que SÍ y es un error? ¿Y si estoy equivocada sobre las personas?»" },
        { speaker: "vale", text: "No. I have watched him for a year. I have compared, I have evaluated, and I have decided.", es: "«No. Lo he observado por un año. He comparado, he evaluado y he decidido»." },
        { speaker: "vale", text: "Now I have to do the hardest part: defend my decision. Starting with myself.", es: "«Ahora tengo que hacer la parte más difícil: defender mi decisión. Empezando conmigo misma»." },
      ],
      words: [
        { word: "doubts", es: "dudas" },
        { word: "uninvited", es: "no invitados" },
        { word: "wrong", es: "equivocada" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Nueve de la mañana: el teléfono suena; todos contienen la respiración.",
      text: "Nine o'clock. The phone rang. The whole school held its breath — again.",
      es: "Nueve en punto. El teléfono sonó. Toda la escuela contuvo la respiración — otra vez.",
      speaker: "narrator",
      lines: [
        { speaker: "vale", text: "Good morning, Bryan.", es: "«Buenos días, Bryan»." },
        { speaker: "bryan", text: "Good morning. I resigned an hour ago. My boss said I was crazy. He used a stronger word, actually.", es: "«Buenos días. Renuncié hace una hora. Mi jefe dijo que estaba loco. Usó una palabra más fuerte, de hecho»." },
        { speaker: "bryan", text: "I accept, Vale. I will lead office four. And I will be the best leader you have ever hired.", es: "«Acepto, Vale. Lideraré la oficina cuatro. Y seré el mejor líder que hayas contratado»." },
      ],
      words: [
        { word: "crazy", es: "loco" },
        { word: "accept", es: "acepto" },
        { word: "hired", es: "contratado" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Celebración moderada: aplausos, y Dani ya le muestra a Bryan su futuro escritorio por videollamada.",
      text: "The team applauded. Dani was already showing Bryan his future desk by video call.",
      es: "El equipo aplaudió. Dani ya le mostraba a Bryan su futuro escritorio por videollamada.",
      speaker: "narrator",
      lines: [
        { speaker: "dani", text: "And THIS will be your desk. It is smaller than mine, obviously. Director's privilege.", es: "«Y ESTE será tu escritorio. Es más pequeño que el mío, obviamente. Privilegio de director»." },
        { speaker: "bryan", text: "Is he always like this?", es: "«¿Siempre es así?»" },
        { speaker: "vale", text: "Every day. You get used to it. Mostly.", es: "«Todos los días. Te acostumbras. Más o menos»." },
      ],
      words: [
        { word: "applauded", es: "aplaudió" },
        { word: "privilege", es: "privilegio" },
        { word: "used to it", es: "acostumbrado" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Don Tito brinda con pupusas: la competencia ahora es familia.",
      text: "Don Tito toasted with pupusas: yesterday's competition is today's family.",
      es: "Don Tito brindó con pupusas: la competencia de ayer es la familia de hoy.",
      speaker: "tito",
      lines: [
        { speaker: "tito", text: "To Bryan! Yesterday he tried to buy you; today he works for you. That is not business, mija. That is respect.", es: "«¡Por Bryan! Ayer intentó comprarte; hoy trabaja para ti. Eso no es negocio, mija. Eso es respeto»." },
        { speaker: "vale", text: "To the whole team. We defended this school with words, and the words won.", es: "«Por todo el equipo. Defendimos esta escuela con palabras, y las palabras ganaron»." },
        { speaker: "tito", text: "Words and pupusas. Never forget the pupusas.", es: "«Palabras y pupusas. Nunca olvides las pupusas»." },
      ],
      words: [
        { word: "respect", es: "respeto" },
        { word: "defended", es: "defendimos" },
        { word: "forget", es: "olvidar" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Vale defiende su decisión frente al equipo completo, incluido Bryan.",
      text: "Now the final tradition of Season Seven: defend your decision.",
      es: "«Ahora la tradición final de la temporada siete: defiende tu decisión».",
      speaker: "vale",
      lines: [
        { speaker: "vale", text: "I chose Bryan because I have watched him for a year. He plays fair, and he believes in this method.", es: "«Elegí a Bryan porque lo he observado por un año. Juega limpio y cree en este método»." },
        { speaker: "vale", text: "He is more experienced than all of us in business, and he is humbler than I expected.", es: "«Es más experimentado que todos nosotros en negocios, y es más humilde de lo que esperaba»." },
        { speaker: "vale", text: "We are going to be stronger with him. That is my decision, and I defend it.", es: "«Vamos a ser más fuertes con él. Esa es mi decisión, y la defiendo»." },
      ],
      words: [
        { word: "experienced", es: "experimentado" },
        { word: "humbler", es: "más humilde" },
        { word: "stronger", es: "más fuertes" },
      ],
    },
    {
      id: "s10",
      image: s10,
      imageAlt: "Morgan llega con una carpeta nueva: la junta quiere hablar de otra cosa.",
      text: "Then Morgan arrived with a new folder. Expansion was only the beginning.",
      es: "Entonces Morgan llegó con una carpeta nueva. La expansión era solo el principio.",
      speaker: "narrator",
      lines: [
        { speaker: "morgan", text: "Congratulations on your new leader. Now, business: Northline has a sister company. In the United States.", es: "«Felicidades por tu nuevo líder. Ahora, negocios: Northline tiene una empresa hermana. En Estados Unidos»." },
        { speaker: "vale", text: "A sister company…", es: "«Una empresa hermana…»" },
        { speaker: "morgan", text: "They have been watching your results. They want a proposal by the end of the month. In English, of course.", es: "«Han estado observando tus resultados. Quieren una propuesta para fin de mes. En inglés, por supuesto»." },
      ],
      words: [
        { word: "sister company", es: "empresa hermana" },
        { word: "proposal", es: "propuesta" },
        { word: "watching", es: "observando" },
      ],
    },
    {
      id: "s11",
      image: s11,
      imageAlt: "Cierre de temporada: el equipo completo frente al letrero, listos para lo internacional.",
      text: "Season finale: the team faces the international future, together.",
      es: "Final de temporada: el equipo enfrenta el futuro internacional, junto.",
      speaker: "vale",
      lines: [
        { speaker: "vale", text: "This year, we were almost bought, we were copied, and we were doubted.", es: "«Este año, casi nos compran, fuimos copiados y dudaron de nosotros»." },
        { speaker: "vale", text: "We have become the best small school in the city — and now, the sharks are coming.", es: "«Nos hemos convertido en la mejor escuela pequeña de la ciudad — y ahora, vienen los tiburones»." },
        { speaker: "vale", text: "Good. Let them come. We defend what we build — in English.", es: "«Bien. Que vengan. Defendemos lo que construimos — en inglés»." },
      ],
      words: [
        { word: "doubted", es: "dudaron" },
        { word: "sharks", es: "tiburones" },
        { word: "build", es: "construimos" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s3",
      questionEn: "What did Vale offer Bryan instead of money?",
      questionEs: "¿Qué le ofreció Vale a Bryan en lugar de dinero?",
      options: [
        { label: "A purpose — leading office four", emoji: "🎯" },
        { label: "A new motorcycle", emoji: "🏍️" },
        { label: "Free pupusas for life", emoji: "🫓" },
      ],
      answer: 0,
      sayIt: "I am not going to offer you more money. I am going to offer you a purpose.",
      sayItEs: "Ejemplo: «I am not going to offer you more money. I am going to offer you a purpose.»",
      sayItAskEn: "What is more important for you: money or purpose? Why?",
      sayItAskEs: "¿Qué es más importante para ti: el dinero o el propósito? ¿Por qué?",
      sayItCheck: {
        target: "* is more important than * because *",
        altTargets: ["For me, * is more important because *", "I think * because *", "I would choose * because *"],
      },
    },
    {
      id: "q2",
      afterScene: "s9",
      questionEn: "How did Vale defend her decision?",
      questionEs: "¿Cómo defendió Vale su decisión?",
      options: [
        { label: "She has watched him for a year; he plays fair and believes in the method", emoji: "🛡️" },
        { label: "She flipped a coin", emoji: "🪙" },
        { label: "She asked BigTalk's boss", emoji: "📞" },
      ],
      answer: 0,
      sayIt: "I chose him because he plays fair. We are going to be stronger with him, and I defend my decision.",
      sayItEs: "Ejemplo: «I chose him because he plays fair. We are going to be stronger with him, and I defend my decision.»",
      sayItAskEn: "Defend a decision you have made. What did you decide and why?",
      sayItAskEs: "Defiende una decisión que has tomado. ¿Qué decidiste y por qué?",
      sayItCheck: {
        target: "I decided * because *",
        altTargets: ["I chose * because *", "I defend my decision: *", "It was the best decision because *"],
      },
    },
    {
      id: "q3",
      afterScene: "s10",
      questionEn: "What news did Morgan bring at the end?",
      questionEs: "¿Qué noticia trajo Morgan al final?",
      options: [
        { label: "A sister company in the US wants a proposal", emoji: "🌎" },
        { label: "Northline cancelled everything", emoji: "❌" },
        { label: "BigTalk bought the newspaper", emoji: "📰" },
      ],
      answer: 0,
      sayIt: "A sister company has been watching our results, and they want a proposal in English.",
      sayItEs: "Ejemplo: «A sister company has been watching our results, and they want a proposal in English.»",
      sayItAskEn: "What is your next big goal? What have you been doing to reach it?",
      sayItAskEs: "¿Cuál es tu próxima meta grande? ¿Qué has estado haciendo para alcanzarla?",
      sayItCheck: {
        target: "My next goal is *, and I have been *ing",
        altTargets: ["I have been *ing to reach *", "My goal is *", "I want to *, so I have been *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s5",
    phrase: "I can do it. Doubts are uninvited guests — I hear them, and I continue anyway.",
    es: "Puedo hacerlo. Las dudas son invitados no invitados — las escucho y sigo de todos modos.",
  },
  habitCard: {
    afterScene: "s9",
    phrase: "English is easy. Mistakes are part of the process. I defend my decisions out loud, in English.",
    es: "El inglés es fácil. Los errores son parte del proceso. Defiendo mis decisiones en voz alta, en inglés.",
    model: "vale",
    modelActionEs: "Vale defendió la decisión más difícil del año con tres oraciones claras.",
  },
  continuePrompt: {
    en: "Season finale: defend YOUR biggest decision of the year. What did you choose, what have you learned, and what are you going to do next?",
    es: "Final de temporada: defiende TU decisión más grande del año. ¿Qué elegiste, qué has aprendido y qué vas a hacer después?",
  },
  continueWith: ["I decided ...", "I have learned that ...", "Next, I am going to ..."],
  cliffhanger: {
    en: "Season 8 — Sharks: an American company wants a proposal. Vale's school goes international.",
    es: "Temporada 8 — Sharks: una empresa americana quiere una propuesta. La escuela de Vale se vuelve internacional.",
  },
};
