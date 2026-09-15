import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/eagles-ep14-the-best-plan/cover.jpg";
import s1 from "@/assets/storybook/eagles-ep14-the-best-plan/s1.jpg";
import s2 from "@/assets/storybook/eagles-ep14-the-best-plan/s2.jpg";
import s3 from "@/assets/storybook/eagles-ep14-the-best-plan/s3.jpg";
import s4 from "@/assets/storybook/eagles-ep14-the-best-plan/s4.jpg";
import s5 from "@/assets/storybook/eagles-ep14-the-best-plan/s5.jpg";
import s6 from "@/assets/storybook/eagles-ep14-the-best-plan/s6.jpg";
import s7 from "@/assets/storybook/eagles-ep14-the-best-plan/s7.jpg";
import s8 from "@/assets/storybook/eagles-ep14-the-best-plan/s8.jpg";
import s9 from "@/assets/storybook/eagles-ep14-the-best-plan/s9.jpg";
import s10 from "@/assets/storybook/eagles-ep14-the-best-plan/s10.jpg";

/**
 * Season 6 (Eagles) Episode 14 — "The best plan".
 * Eagles day 14: superlatives — choose with several criteria.
 */
export const EAGLES_EP14_THE_BEST_PLAN: StorybookEpisode = {
  id: "eagles-ep14-the-best-plan",
  moduleId: "eagles-week-1",
  week: 3,
  title: "The best plan",
  titleEs: "El mejor plan",
  episodeLabel: { en: "Season 6 · Episode 14", es: "Temporada 6 · Episodio 14" },
  previously: [
    { en: "Vale defended in-person classes.", es: "Vale defendió las clases presenciales." },
    { en: "The team built a mixed plan.", es: "El equipo armó un plan mixto." },
    { en: "Morgan wants the best plan with a price.", es: "Morgan quiere el mejor plan con precio." },
  ],
  reviewWords: [
    { word: "best", es: "mejor" },
    { word: "most", es: "más" },
    { word: "choose", es: "elegir" },
  ],
  blurb: {
    en: "Three plans, one page and a price. The cheapest is not the best, and Vale has to prove it out loud.",
    es: "Tres planes, una página y un precio. El más barato no es el mejor, y Vale tiene que demostrarlo en voz alta.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Three printed plans lie on a table with Vale and Camila standing over them.",
      text: "Saturday, 9:00 a.m. Three papers, one decision.",
      es: "Sábado, 9:00 a.m. Tres papeles, una decisión.",
      speaker: "camila",
      lines: [
        { speaker: "camila", text: "Plan A is the cheapest. Plan C is the most complete.", es: "«El plan A es el más barato. El plan C es el más completo»." },
        { speaker: "vale", text: "And plan B?", es: "«¿Y el plan B?»" },
        { speaker: "camila", text: "Plan B is the safest, but it is the slowest.", es: "«El plan B es el más seguro, pero es el más lento»." },
      ],
      words: [
        { word: "cheapest", es: "el más barato" },
        { word: "complete", es: "completo" },
        { word: "slowest", es: "el más lento" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Vale writes four criteria on the whiteboard: result, price, time, risk.",
      text: "Vale writes the rules before choosing.",
      es: "Vale escribe las reglas antes de elegir.",
      speaker: "vale",
      lines: [
        { speaker: "vale", text: "Four criteria: result, price, time, risk.", es: "«Cuatro criterios: resultado, precio, tiempo, riesgo»." },
        { speaker: "dani", text: "You always choose with the heart.", es: "«Tú siempre eliges con el corazón»." },
        { speaker: "vale", text: "Today I choose with the board.", es: "«Hoy elijo con la pizarra»." },
      ],
      words: [
        { word: "result", es: "resultado" },
        { word: "risk", es: "riesgo" },
        { word: "heart", es: "corazón" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Dani puts checkmarks in a grid of three plans and four criteria.",
      text: "The grid answers faster than the argument.",
      es: "El cuadro responde más rápido que la discusión.",
      speaker: "dani",
      lines: [
        { speaker: "dani", text: "Plan C wins result and time. Plan A wins price only.", es: "«El plan C gana en resultado y tiempo. El plan A gana solo en precio»." },
        { speaker: "camila", text: "So the cheapest plan is the worst plan.", es: "«O sea que el plan más barato es el peor plan»." },
        { speaker: "vale", text: "The cheapest plan is the most expensive in six months.", es: "«El plan más barato es el más caro en seis meses»." },
      ],
      words: [
        { word: "wins", es: "gana" },
        { word: "worst", es: "el peor" },
        { word: "months", es: "meses" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Luis joins on speakerphone from his kitchen at home.",
      text: "Luis votes from his kitchen.",
      es: "Luis vota desde su cocina.",
      speaker: "luis",
      lines: [
        { speaker: "luis", text: "For us the most important thing is speaking with clients, not grammar tests.", es: "«Para nosotros lo más importante es hablar con clientes, no exámenes de gramática»." },
        { speaker: "vale", text: "That is plan C.", es: "«Eso es el plan C»." },
        { speaker: "luis", text: "Then plan C is the best one for real life.", es: "«Entonces el plan C es el mejor para la vida real»." },
      ],
      words: [
        { word: "important", es: "importante" },
        { word: "clients", es: "clientes" },
        { word: "life", es: "vida" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Camila shows a calculator with a monthly price on the screen.",
      text: "Now the hardest number.",
      es: "Ahora el número más difícil.",
      speaker: "camila",
      lines: [
        { speaker: "camila", text: "Plan C costs the most. We have to say a price out loud.", es: "«El plan C es el que más cuesta. Tenemos que decir un precio en voz alta»." },
        { speaker: "vale", text: "Last year I said my prices very quietly.", es: "«El año pasado yo decía mis precios muy bajito»." },
        { speaker: "camila", text: "This year you say them like a business owner.", es: "«Este año los dices como dueña de un negocio»." },
      ],
      words: [
        { word: "costs", es: "cuesta" },
        { word: "quietly", es: "bajito" },
        { word: "owner", es: "dueña" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Vale practices saying the price in front of a mirror.",
      text: "Vale practices one sentence twenty times.",
      es: "Vale practica una frase veinte veces.",
      speaker: "vale",
      lines: [
        { speaker: "vale", text: "This is the best plan for your team, and this is the price.", es: "«Este es el mejor plan para su equipo, y este es el precio»." },
        { speaker: "dani", text: "Again, without looking at the floor.", es: "«Otra vez, sin mirar el suelo»." },
        { speaker: "vale", text: "This is the best plan for your team. I can do it.", es: "«Este es el mejor plan para su equipo. Yo puedo hacerlo»." },
      ],
      words: [
        { word: "price", es: "precio" },
        { word: "floor", es: "suelo" },
        { word: "again", es: "otra vez" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Mateo and Kat listen while Vale rehearses in the empty classroom.",
      text: "Two volunteers become the audience.",
      es: "Dos voluntarios se vuelven el público.",
      speaker: "kat",
      lines: [
        { speaker: "kat", text: "That was the clearest explanation I have heard from you.", es: "«Esa fue la explicación más clara que te he escuchado»." },
        { speaker: "mateo", text: "And the loudest.", es: "«Y la más fuerte»." },
        { speaker: "vale", text: "Good. Monday I need both.", es: "«Bien. El lunes necesito las dos cosas»." },
      ],
      words: [
        { word: "clearest", es: "la más clara" },
        { word: "explanation", es: "explicación" },
        { word: "loudest", es: "la más fuerte" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Vale presents the plan on a video call with Morgan taking notes.",
      text: "Monday, 10:00 a.m. The meeting.",
      es: "Lunes, 10:00 a.m. La reunión.",
      speaker: "morgan",
      lines: [
        { speaker: "morgan", text: "Why is this the best option for Northline?", es: "«¿Por qué esta es la mejor opción para Northline?»" },
        { speaker: "vale", text: "Because it gives the fastest results in the most important skill: speaking.", es: "«Porque da los resultados más rápidos en la habilidad más importante: hablar»." },
        { speaker: "morgan", text: "And the most expensive price in the market.", es: "«Y el precio más caro del mercado»." },
      ],
      words: [
        { word: "option", es: "opción" },
        { word: "results", es: "resultados" },
        { word: "market", es: "mercado" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Vale answers calmly with her hands on the table.",
      text: "Vale does not move her eyes.",
      es: "Vale no mueve los ojos.",
      speaker: "vale",
      lines: [
        { speaker: "vale", text: "The most expensive class is the one that does not work.", es: "«La clase más cara es la que no funciona»." },
        { speaker: "morgan", text: "Where did you learn that?", es: "«¿Dónde aprendiste eso?»" },
        { speaker: "vale", text: "From twelve people who need this more than I need the contract.", es: "«De doce personas que necesitan esto más de lo que yo necesito el contrato»." },
      ],
      words: [
        { word: "work", es: "funcionar" },
        { word: "learn", es: "aprender" },
        { word: "contract", es: "contrato" },
      ],
    },
    {
      id: "s10",
      image: s10,
      imageAlt: "Vale closes her laptop and breathes out in the quiet office.",
      text: "10:26 a.m. Morgan says one sentence and leaves.",
      es: "10:26 a.m. Morgan dice una frase y se va.",
      speaker: "morgan",
      lines: [
        { speaker: "morgan", text: "I will answer this week. But I need one more thing first.", es: "«Contesto esta semana. Pero necesito algo más antes»." },
        { speaker: "vale", text: "What thing?", es: "«¿Qué cosa?»" },
        { speaker: "narrator", text: "\"A second teacher. You cannot be the whole school.\"", es: "«Una segunda maestra. Tú no puedes ser toda la escuela»." },
      ],
      words: [
        { word: "week", es: "semana" },
        { word: "teacher", es: "maestra" },
        { word: "school", es: "escuela" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s3",
      questionEn: "Why is the cheapest plan the worst plan?",
      questionEs: "¿Por qué el plan más barato es el peor plan?",
      options: [
        { label: "Because it becomes the most expensive in six months", emoji: "📉" },
        { label: "Because nobody likes plan A", emoji: "🙅" },
        { label: "Because Camila wrote it", emoji: "✍️" },
      ],
      answer: 0,
      sayIt: "The cheapest plan is the worst plan.",
      sayItEs: "Ejemplo: «The cheapest plan is the worst plan.»",
      sayItAskEn: "What is the best way for you to learn English? Use: The best…",
      sayItAskEs: "¿Cuál es la mejor forma para ti de aprender inglés? Usa: The best…",
      sayItCheck: {
        target: "The best *",
        altTargets: ["The best way *", "The best option *", "* is the best *"],
      },
    },
    {
      id: "q2",
      afterScene: "s4",
      questionEn: "What is the most important thing for Luis and his coworkers?",
      questionEs: "¿Qué es lo más importante para Luis y sus compañeros?",
      options: [
        { label: "Speaking with clients", emoji: "🗣️" },
        { label: "Grammar tests", emoji: "📝" },
        { label: "A certificate on the wall", emoji: "🏅" },
      ],
      answer: 0,
      sayIt: "Speaking with clients is the most important thing.",
      sayItEs: "Ejemplo: «Speaking with clients is the most important thing.»",
      sayItAskEn: "What is the most important skill in your job or study? Use: The most important…",
      sayItAskEs: "¿Cuál es la habilidad más importante en tu trabajo o estudio? Usa: The most important…",
      sayItCheck: {
        target: "The most important *",
        altTargets: ["* is the most important *", "The most *", "The best *"],
      },
    },
    {
      id: "q3",
      afterScene: "s9",
      questionEn: "What did Vale answer about the price?",
      questionEs: "¿Qué contestó Vale sobre el precio?",
      options: [
        { label: "The most expensive class is the one that does not work", emoji: "💡" },
        { label: "She can give it for free", emoji: "🆓" },
        { label: "The price is a mistake", emoji: "❌" },
      ],
      answer: 0,
      sayIt: "The most expensive class is the one that does not work.",
      sayItEs: "Ejemplo: «The most expensive class is the one that does not work.»",
      sayItAskEn: "Who is the best teacher you have had, and why? Use: The best teacher…",
      sayItAskEs: "¿Quién es la mejor maestra o maestro que has tenido y por qué? Usa: The best teacher…",
      sayItCheck: {
        target: "The best teacher *",
        altTargets: ["The best *", "My best teacher *", "* was the best *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s6",
    phrase: "I say my value out loud. I can do it.",
    es: "Digo mi valor en voz alta. Yo puedo hacerlo.",
  },
  habitCard: {
    afterScene: "s2",
    phrase: "I write my criteria before I choose.",
    es: "Escribo mis criterios antes de elegir.",
    model: "vale",
    modelActionEs: "Vale escribe cuatro criterios en la pizarra antes de decidir.",
  },
  continuePrompt: {
    en: "Tell me the best decision you made this year and why it was the best.",
    es: "Cuéntame la mejor decisión que tomaste este año y por qué fue la mejor.",
  },
  continueWith: ["The best ...", "The most important ...", "I chose ..."],
  cliffhanger: {
    en: "Episode 15: The school needs a second teacher — and everybody has an opinion about what makes a great one.",
    es: "Episodio 15: La escuela necesita una segunda maestra… y todos opinan qué hace a una buena.",
  },
};
