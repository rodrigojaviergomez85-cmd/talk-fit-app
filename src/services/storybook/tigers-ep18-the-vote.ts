import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/tigers-ep18-the-vote/cover.jpg";
import s1 from "@/assets/storybook/tigers-ep18-the-vote/s1.jpg";
import s2 from "@/assets/storybook/tigers-ep18-the-vote/s2.jpg";
import s3 from "@/assets/storybook/tigers-ep18-the-vote/s3.jpg";
import s4 from "@/assets/storybook/tigers-ep18-the-vote/s4.jpg";
import s5 from "@/assets/storybook/tigers-ep18-the-vote/s5.jpg";
import s6 from "@/assets/storybook/tigers-ep18-the-vote/s6.jpg";
import s7 from "@/assets/storybook/tigers-ep18-the-vote/s7.jpg";
import s8 from "@/assets/storybook/tigers-ep18-the-vote/s8.jpg";
import s9 from "@/assets/storybook/tigers-ep18-the-vote/s9.jpg";
import s10 from "@/assets/storybook/tigers-ep18-the-vote/s10.jpg";
import s11 from "@/assets/storybook/tigers-ep18-the-vote/s11.jpg";

/**
 * Season 7 (Tigers) Episode 18 — "The vote".
 * Matches Tigers Day 18 (mixed tenses in real time: reacting, deciding,
 * celebrating — the renewal decision).
 */
export const TIGERS_EP18_THE_VOTE: StorybookEpisode = {
  id: "tigers-ep18-the-vote",
  moduleId: "tigers",
  week: 4,
  title: "The vote",
  titleEs: "El voto",
  episodeLabel: { en: "Season 7 · Episode 18", es: "Temporada 7 · Episodio 18" },
  previously: [
    { en: "The board visited the school and saw real classes.", es: "La junta visitó la escuela y vio clases reales." },
    { en: "Beto spoke English to the board, voluntarily.", es: "Beto habló inglés con la junta, voluntariamente." },
    { en: "Morgan said it was the best school visit of her career.", es: "Morgan dijo que fue la mejor visita escolar de su carrera." },
  ],
  reviewWords: [
    { word: "vote", es: "voto" },
    { word: "voluntarily", es: "voluntariamente" },
    { word: "career", es: "carrera" },
  ],
  blurb: {
    en: "Friday, noon. The board votes. The whole street seems to hold its breath — and then the phone rings.",
    es: "Viernes, mediodía. La junta vota. Toda la calle parece contener la respiración — y entonces suena el teléfono.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Viernes once y media: el equipo reunido, el teléfono en el centro de la mesa.",
      text: "Friday, eleven thirty. The phone sat in the middle of the table like a bomb.",
      es: "Viernes, once y media. El teléfono estaba en el centro de la mesa como una bomba.",
      speaker: "narrator",
      lines: [
        { speaker: "dani", text: "The vote is at twelve. It's eleven thirty. Thirty minutes. That's… one thousand eight hundred seconds.", es: "«El voto es a las doce. Son las once y media. Treinta minutos. Eso es… mil ochocientos segundos»." },
        { speaker: "camila", text: "He has been counting in seconds all morning.", es: "«Ha estado contando en segundos toda la mañana»." },
        { speaker: "vale", text: "Let him count. It keeps him calm.", es: "«Déjenlo contar. Lo mantiene calmado»." },
      ],
      words: [
        { word: "bomb", es: "bomba" },
        { word: "seconds", es: "segundos" },
        { word: "calm", es: "calmado" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Don Tito apaga su altavoz por respeto; el barrio entero espera en silencio.",
      text: "Don Tito turned off his speaker out of respect. The whole neighborhood went quiet.",
      es: "Don Tito apagó su altavoz por respeto. Todo el barrio se quedó en silencio.",
      speaker: "narrator",
      lines: [
        { speaker: "tito", text: "I have turned off my speaker. First time in ten years. This is a serious day.", es: "«Apagué mi altavoz. Primera vez en diez años. Este es un día serio»." },
        { speaker: "vale", text: "Don Tito, you didn't have to—", es: "«Don Tito, no tenía que—»" },
        { speaker: "tito", text: "The neighborhood has decided, mija. Today, this street works for you.", es: "«El barrio ha decidido, mija. Hoy, esta calle trabaja para ti»." },
      ],
      words: [
        { word: "respect", es: "respeto" },
        { word: "quiet", es: "en silencio" },
        { word: "serious", es: "serio" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Doce en punto: el teléfono suena; todos se levantan de un salto.",
      text: "Twelve o'clock. The phone rang. Everybody jumped.",
      es: "Doce en punto. El teléfono sonó. Todos saltaron.",
      speaker: "narrator",
      lines: [
        { speaker: "dani", text: "IT'S HER! IT'S TWELVE! ANSWER! Wait— no— breathe— ANSWER!", es: "«¡ES ELLA! ¡SON LAS DOCE! ¡CONTESTA! Espera— no— respira— ¡CONTESTA!»" },
        { speaker: "vale", text: "Good afternoon, Morgan. Yes. We are all here.", es: "«Buenas tardes, Morgan. Sí. Estamos todos aquí»." },
        { speaker: "morgan", text: "Good. Because I am going to say this only once.", es: "«Bien. Porque voy a decir esto una sola vez»." },
      ],
      words: [
        { word: "jumped", es: "saltaron" },
        { word: "answer", es: "contestar" },
        { word: "once", es: "una sola vez" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Morgan habla por altavoz: la junta ha votado; pausa dramática.",
      text: "The board has voted. It was close. Very close.",
      es: "«La junta ha votado. Fue cerrado. Muy cerrado».",
      speaker: "morgan",
      lines: [
        { speaker: "morgan", text: "The board has voted. It was close. Very close.", es: "«La junta ha votado. Fue cerrado. Muy cerrado»." },
        { speaker: "morgan", text: "BigTalk offered a lower price. Several members liked that.", es: "«BigTalk ofreció un precio más bajo. A varios miembros les gustó eso»." },
        { speaker: "vale", text: "I understand.", es: "«Entiendo»." },
      ],
      words: [
        { word: "close", es: "cerrado / reñido" },
        { word: "lower", es: "más bajo" },
        { word: "several", es: "varios" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Morgan continúa: pero la visita cambió el voto.",
      text: "But then they visited your school. And the visit changed the vote.",
      es: "«Pero luego visitaron tu escuela. Y la visita cambió el voto».",
      speaker: "morgan",
      lines: [
        { speaker: "morgan", text: "But then they visited your school. And the visit changed everything.", es: "«Pero luego visitaron tu escuela. Y la visita lo cambió todo»." },
        { speaker: "morgan", text: "One member said: 'Cheaper is not better if students don't learn.' Your students learn.", es: "«Un miembro dijo: «Más barato no es mejor si los estudiantes no aprenden». Tus estudiantes aprenden»." },
        { speaker: "morgan", text: "The contract is yours, Vale. Two more years. Congratulations.", es: "«El contrato es tuyo, Vale. Dos años más. Felicidades»." },
      ],
      words: [
        { word: "changed", es: "cambió" },
        { word: "learn", es: "aprenden" },
        { word: "congratulations", es: "felicidades" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Explosión de alegría: todos gritan; Don Tito enciende su altavoz con música.",
      text: "The office exploded. Don Tito turned his speaker back on with music, and the whole street celebrated.",
      es: "La oficina explotó. Don Tito encendió su altavoz con música, y toda la calle celebró.",
      speaker: "narrator",
      lines: [
        { speaker: "dani", text: "WE WON! WE WON! ONE THOUSAND EIGHT HUNDRED SECONDS OF TERROR, BUT WE WON!", es: "«¡GANAMOS! ¡GANAMOS! ¡MIL OCHOCIENTOS SEGUNDOS DE TERROR, PERO GANAMOS!»" },
        { speaker: "tito", text: "PUPUSAS FOR EVERYONE! TODAY THE NEIGHBORHOOD EATS FREE!", es: "«¡PUPUSAS PARA TODOS! ¡HOY EL BARRIO COME GRATIS!»" },
        { speaker: "vale", text: "We did it. We actually did it.", es: "«Lo hicimos. De verdad lo hicimos»." },
      ],
      words: [
        { word: "won", es: "ganamos" },
        { word: "terror", es: "terror" },
        { word: "free", es: "gratis" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Morgan agrega una noticia más: quieren hablar de expandir el programa.",
      text: "One more thing, Vale. The board wants to talk about expanding the program.",
      es: "«Una cosa más, Vale. La junta quiere hablar de expandir el programa».",
      speaker: "morgan",
      lines: [
        { speaker: "morgan", text: "One more thing. The board wants to talk about expanding the program.", es: "«Una cosa más. La junta quiere hablar de expandir el programa»." },
        { speaker: "vale", text: "Expanding? To what?", es: "«¿Expandir? ¿A qué?»" },
        { speaker: "morgan", text: "To our other offices. We have four. They have been asking about English programs for years.", es: "«A nuestras otras oficinas. Tenemos cuatro. Han estado preguntando por programas de inglés por años»." },
      ],
      words: [
        { word: "expanding", es: "expandir" },
        { word: "offices", es: "oficinas" },
        { word: "asking", es: "preguntando" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Vale mira al equipo: cuatro oficinas significa más maestros, más clases.",
      text: "Four offices. More teachers. More classes. A real company.",
      es: "Cuatro oficinas. Más maestros. Más clases. Una empresa de verdad.",
      speaker: "narrator",
      lines: [
        { speaker: "camila", text: "Four offices… Vale, we are two teachers and a coordinator who hugs signs.", es: "«Cuatro oficinas… Vale, somos dos maestras y un coordinador que abraza letreros»." },
        { speaker: "vale", text: "Then we grow. We hire. We train. We have been preparing for this without knowing it.", es: "«Entonces crecemos. Contratamos. Entrenamos. Hemos estado preparándonos para esto sin saberlo»." },
        { speaker: "dani", text: "I am going to need a bigger desk. And business cards. Do coordinators get business cards?", es: "«Voy a necesitar un escritorio más grande. Y tarjetas de presentación. ¿Los coordinadores reciben tarjetas?»" },
      ],
      words: [
        { word: "hire", es: "contratar" },
        { word: "train", es: "entrenar" },
        { word: "business cards", es: "tarjetas de presentación" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Bryan mira la celebración desde enfrente; asiente con respeto.",
      text: "Across the street, Bryan watched the celebration. He nodded slowly, with respect.",
      es: "Enfrente, Bryan miraba la celebración. Asintió despacio, con respeto.",
      speaker: "narrator",
      lines: [
        { speaker: "bryan", text: "They won. The smallest school in the neighborhood beat the biggest chain in the country.", es: "«Ganaron. La escuela más pequeña del barrio le ganó a la cadena más grande del país»." },
        { speaker: "bryan", text: "I have been in business for fifteen years. I have never seen anything like this.", es: "«He estado en los negocios por quince años. Nunca he visto algo así»." },
      ],
      words: [
        { word: "beat", es: "le ganó a" },
        { word: "chain", es: "cadena" },
        { word: "nodded", es: "asintió" },
      ],
    },
    {
      id: "s10",
      image: s10,
      imageAlt: "Vale llama a su mamá; ambas lloran de felicidad.",
      text: "Vale called her mom. They both cried — the best kind of crying.",
      es: "Vale llamó a su mamá. Ambas lloraron — el mejor tipo de llanto.",
      speaker: "narrator",
      lines: [
        { speaker: "vale", text: "Mom. We won. The contract is ours. Two more years… and maybe four offices.", es: "«Mamá. Ganamos. El contrato es nuestro. Dos años más… y quizás cuatro oficinas»." },
        { speaker: "mom", text: "I knew it. I have been lighting a candle every night since January.", es: "«Lo sabía. He estado encendiendo una vela cada noche desde enero»." },
        { speaker: "vale", text: "Mom, that's dangerous—", es: "«Mamá, eso es peligroso—»" },
        { speaker: "mom", text: "It worked, didn't it?", es: "«Funcionó, ¿no?»" },
      ],
      words: [
        { word: "candle", es: "vela" },
        { word: "dangerous", es: "peligroso" },
        { word: "worked", es: "funcionó" },
      ],
    },
    {
      id: "s11",
      image: s11,
      imageAlt: "Vale cierra con el equipo: frase de victoria con tiempos mezclados.",
      text: "Vale closes the day with the victory sentence — past, present, and future in one breath.",
      es: "Vale cierra el día con la oración de victoria: pasado, presente y futuro en un respiro.",
      speaker: "vale",
      lines: [
        { speaker: "vale", text: "We started with four students and a broken fan. We have built something real.", es: "«Empezamos con cuatro estudiantes y un ventilador descompuesto. Hemos construido algo real»." },
        { speaker: "vale", text: "We have been working for this every single day. And today, we won.", es: "«Hemos estado trabajando para esto todos los días. Y hoy, ganamos»." },
        { speaker: "vale", text: "Now we are going to grow — carefully, honestly, and together.", es: "«Ahora vamos a crecer — con cuidado, con honestidad y juntos»." },
      ],
      words: [
        { word: "carefully", es: "con cuidado" },
        { word: "honestly", es: "con honestidad" },
        { word: "together", es: "juntos" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s3",
      questionEn: "How did Dani count the wait?",
      questionEs: "¿Cómo contó Dani la espera?",
      options: [
        { label: "In seconds — one thousand eight hundred", emoji: "⏱️" },
        { label: "In pupusas", emoji: "🫓" },
        { label: "In songs", emoji: "🎵" },
      ],
      answer: 0,
      sayIt: "We have been waiting all morning — one thousand eight hundred seconds!",
      sayItEs: "Ejemplo: «We have been waiting all morning — one thousand eight hundred seconds!»",
      sayItAskEn: "Tell me about a time you waited for important news. How did you feel?",
      sayItAskEs: "Cuéntame de una vez que esperaste noticias importantes. ¿Cómo te sentiste?",
      sayItCheck: {
        target: "I was waiting for *",
        altTargets: ["I have been waiting for *", "I felt *", "I waited for * and I felt *"],
      },
    },
    {
      id: "q2",
      afterScene: "s5",
      questionEn: "Why did the board choose Vale's school?",
      questionEs: "¿Por qué la junta eligió la escuela de Vale?",
      options: [
        { label: "The visit changed the vote — her students really learn", emoji: "🏆" },
        { label: "BigTalk forgot to vote", emoji: "🗳️" },
        { label: "The school was cheaper", emoji: "🏷️" },
      ],
      answer: 0,
      sayIt: "The visit changed the vote. Cheaper is not better if students don't learn.",
      sayItEs: "Ejemplo: «The visit changed the vote. Cheaper is not better if students don't learn.»",
      sayItAskEn: "Tell me about a victory in your life. What happened? How did you celebrate?",
      sayItAskEs: "Cuéntame de una victoria en tu vida. ¿Qué pasó? ¿Cómo celebraste?",
      sayItCheck: {
        target: "I won *, and I *",
        altTargets: ["Once, I * and we celebrated", "My victory was *", "I worked hard and I *"],
      },
    },
    {
      id: "q3",
      afterScene: "s7",
      questionEn: "What does Northline want to talk about now?",
      questionEs: "¿De qué quiere hablar Northline ahora?",
      options: [
        { label: "Expanding the program to four more offices", emoji: "📈" },
        { label: "Canceling the contract", emoji: "❌" },
        { label: "Buying pupusas", emoji: "🫓" },
      ],
      answer: 0,
      sayIt: "The board wants to expand the program, so we are going to grow and hire more teachers.",
      sayItEs: "Ejemplo: «The board wants to expand the program, so we are going to grow and hire more teachers.»",
      sayItAskEn: "If your biggest dream came true tomorrow, what would you do next?",
      sayItAskEs: "Si tu sueño más grande se hiciera realidad mañana, ¿qué harías después?",
      sayItCheck: {
        target: "If *, I would *",
        altTargets: ["I would * and I would *", "First, I would *", "If my dream came true, *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s5",
    phrase: "I can do it. We waited, we worked, we won. Mistakes were part of the process.",
    es: "Puedo hacerlo. Esperamos, trabajamos, ganamos. Los errores fueron parte del proceso.",
  },
  habitCard: {
    afterScene: "s10",
    phrase: "English is easy — one honest sentence at a time, even in the biggest moment of my life.",
    es: "El inglés es fácil — una oración honesta a la vez, aun en el momento más grande de mi vida.",
    model: "vale",
    modelActionEs: "Vale tomó la llamada más importante en inglés, con calma y claridad.",
  },
  continuePrompt: {
    en: "Celebrate in English: tell me about the best news of your year. What happened before, and what are you going to do next?",
    es: "Celebra en inglés: cuéntame la mejor noticia de tu año. ¿Qué pasó antes y qué vas a hacer después?",
  },
  continueWith: ["This year, ...", "I have been working on ...", "Next, I am going to ..."],
  cliffhanger: {
    en: "Episode 19: The expansion begins — Vale must decide who leads the new offices.",
    es: "Episodio 19: La expansión comienza — Vale debe decidir quién lidera las nuevas oficinas.",
  },
};
