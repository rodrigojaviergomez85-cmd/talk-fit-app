import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/eagles-ep2-the-proposal/cover.jpg";
import s1 from "@/assets/storybook/eagles-ep2-the-proposal/s1.jpg";
import s2 from "@/assets/storybook/eagles-ep2-the-proposal/s2.jpg";
import s3 from "@/assets/storybook/eagles-ep2-the-proposal/s3.jpg";
import s4 from "@/assets/storybook/eagles-ep2-the-proposal/s4.jpg";
import s5 from "@/assets/storybook/eagles-ep2-the-proposal/s5.jpg";
import s6 from "@/assets/storybook/eagles-ep2-the-proposal/s6.jpg";
import s7 from "@/assets/storybook/eagles-ep2-the-proposal/s7.jpg";
import s8 from "@/assets/storybook/eagles-ep2-the-proposal/s8.jpg";
import s9 from "@/assets/storybook/eagles-ep2-the-proposal/s9.jpg";
import s10 from "@/assets/storybook/eagles-ep2-the-proposal/s10.jpg";

/**
 * Season 6 (Eagles) Episode 2 — "The proposal".
 * Eagles day 2: could / might — put options on the table.
 */
export const EAGLES_EP2_THE_PROPOSAL: StorybookEpisode = {
  id: "eagles-ep2-the-proposal",
  moduleId: "eagles-week-1",
  week: 1,
  title: "The proposal",
  titleEs: "La propuesta",
  episodeLabel: { en: "Season 6 · Episode 2", es: "Temporada 6 · Episodio 2" },
  previously: [
    { en: "Morgan asked for a proposal by Friday.", es: "Morgan pidió una propuesta para el viernes." },
    { en: "Vale recommended live call practice.", es: "Vale recomendó práctica de llamadas en vivo." },
    { en: "Vale and Dani have four days.", es: "Vale y Dani tienen cuatro días." },
  ],
  reviewWords: [
    { word: "proposal", es: "propuesta" },
    { word: "option", es: "opción" },
    { word: "plan", es: "plan" },
  ],
  blurb: {
    en: "Four days, one proposal, and too many options. Vale and Camila decide what they could offer Northline.",
    es: "Cuatro días, una propuesta y demasiadas opciones. Vale y Camila deciden qué podrían ofrecerle a Northline.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Vale, Dani y Camila alrededor de una mesa llena de papeles en la pequeña oficina.",
      text: "Tuesday morning. Three people, one table, and a proposal that does not exist yet.",
      es: "Martes por la mañana. Tres personas, una mesa y una propuesta que todavía no existe.",
      speaker: "narrator",
      lines: [
        {
          speaker: "narrator",
          text: "Tuesday morning. Three people, one table, and a proposal that does not exist yet.",
          es: "Martes por la mañana. Tres personas, una mesa y una propuesta que todavía no existe.",
        },
        { speaker: "dani", text: "Okay. Where do we start?", es: "«Bueno. ¿Por dónde empezamos?»" },
        { speaker: "vale", text: "We could start with the problem, not the price.", es: "«Podríamos empezar con el problema, no con el precio»." },
      ],
      words: [
        { word: "table", es: "mesa" },
        { word: "start", es: "empezar" },
        { word: "price", es: "precio" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Camila escribe tres ideas en una pizarra blanca.",
      text: "Camila writes three ideas on the board.",
      es: "Camila escribe tres ideas en la pizarra.",
      speaker: "camila",
      lines: [
        { speaker: "camila", text: "We could do three classes a week, or one long class.", es: "«Podríamos hacer tres clases por semana, o una clase larga»." },
        { speaker: "camila", text: "We might also record every call and study it later.", es: "«También podríamos grabar cada llamada y estudiarla después»." },
        { speaker: "vale", text: "I like that. Write it down.", es: "«Me gusta. Anótalo»." },
      ],
      words: [
        { word: "board", es: "pizarra" },
        { word: "record", es: "grabar" },
        { word: "later", es: "después" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Dani mira su laptop con cara de duda.",
      text: "Dani is not sure about the long class.",
      es: "Dani no está seguro de la clase larga.",
      speaker: "dani",
      lines: [
        { speaker: "dani", text: "One long class might be too much for a sales team.", es: "«Una clase larga podría ser demasiado para un equipo de ventas»." },
        { speaker: "dani", text: "They could get tired after forty minutes.", es: "«Podrían cansarse después de cuarenta minutos»." },
        { speaker: "vale", text: "Good point. Short and often is better.", es: "«Buen punto. Corto y seguido es mejor»." },
      ],
      words: [
        { word: "tired", es: "cansados" },
        { word: "often", es: "seguido / a menudo" },
        { word: "better", es: "mejor" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Vale organiza tarjetas de colores con dos planes distintos.",
      text: "Vale builds two clear options on the wall.",
      es: "Vale arma dos opciones claras en la pared.",
      speaker: "vale",
      lines: [
        { speaker: "vale", text: "Every good proposal gives two options, not ten.", es: "«Toda buena propuesta da dos opciones, no diez»." },
        { speaker: "vale", text: "Option one: three short classes a week. Option two: two classes and one real call practice.", es: "«Opción uno: tres clases cortas por semana. Opción dos: dos clases y una práctica de llamada real»." },
        { speaker: "camila", text: "And we could let them choose.", es: "«Y podríamos dejarlos elegir»." },
      ],
      words: [
        { word: "options", es: "opciones" },
        { word: "choose", es: "elegir" },
        { word: "wall", es: "pared" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "El teléfono de Vale suena con un mensaje inesperado de Morgan.",
      text: "A message from Morgan arrives at 2:14 in the afternoon.",
      es: "Un mensaje de Morgan llega a las 2:14 de la tarde.",
      speaker: "narrator",
      lines: [
        { speaker: "narrator", text: "A message from Morgan arrives at 2:14 in the afternoon.", es: "Un mensaje de Morgan llega a las 2:14 de la tarde." },
        { speaker: "dani", text: "Vale… another school sent Morgan a proposal this morning.", es: "«Vale… otra escuela le envió una propuesta a Morgan esta mañana»." },
        { speaker: "vale", text: "Okay. Then ours might need to be better, not faster.", es: "«Bueno. Entonces la nuestra podría necesitar ser mejor, no más rápida»." },
      ],
      words: [
        { word: "message", es: "mensaje" },
        { word: "another", es: "otra" },
        { word: "faster", es: "más rápida" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Camila y Vale comparan precios en una hoja de papel.",
      text: "They talk about money, calmly.",
      es: "Hablan de dinero, con calma.",
      speaker: "camila",
      lines: [
        { speaker: "camila", text: "We could lower the price to win.", es: "«Podríamos bajar el precio para ganar»." },
        { speaker: "vale", text: "We could. But then we might teach thirty people badly.", es: "«Podríamos. Pero entonces podríamos enseñarle mal a treinta personas»." },
        { speaker: "camila", text: "You're right. Same price, better plan.", es: "«Tienes razón. Mismo precio, mejor plan»." },
      ],
      words: [
        { word: "lower", es: "bajar" },
        { word: "win", es: "ganar" },
        { word: "badly", es: "mal" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Dani muestra un video corto de práctica en la pantalla.",
      text: "Dani has one more idea.",
      es: "Dani tiene una idea más.",
      speaker: "dani",
      lines: [
        { speaker: "dani", text: "We could send a two-minute video with the proposal.", es: "«Podríamos enviar un video de dos minutos con la propuesta»." },
        { speaker: "dani", text: "Morgan might show it to her director.", es: "«Morgan podría mostrárselo a su directora»." },
        { speaker: "vale", text: "Dani, that's the best idea of the day.", es: "«Dani, esa es la mejor idea del día»." },
      ],
      words: [
        { word: "video", es: "video" },
        { word: "show", es: "mostrar" },
        { word: "idea", es: "idea" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "La oficina de noche, con tazas de café y la propuesta casi lista.",
      text: "Ten at night. The proposal is almost ready.",
      es: "Diez de la noche. La propuesta está casi lista.",
      speaker: "narrator",
      lines: [
        { speaker: "narrator", text: "Ten at night. The proposal is almost ready.", es: "Diez de la noche. La propuesta está casi lista." },
        { speaker: "camila", text: "I'm tired, but this looks professional.", es: "«Estoy cansada, pero esto se ve profesional»." },
        { speaker: "vale", text: "It looks like us. That's better.", es: "«Se ve como nosotros. Eso es mejor»." },
      ],
      words: [
        { word: "night", es: "noche" },
        { word: "professional", es: "profesional" },
        { word: "ready", es: "lista" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Vale lee la última página en voz alta mientras Dani escucha.",
      text: "Vale reads the last page out loud.",
      es: "Vale lee la última página en voz alta.",
      speaker: "vale",
      lines: [
        { speaker: "vale", text: "\"Your team could speak with confidence in twelve weeks.\"", es: "«Su equipo podría hablar con confianza en doce semanas»." },
        { speaker: "dani", text: "That's a strong ending.", es: "«Ese es un final fuerte»." },
        { speaker: "vale", text: "It's not a promise. It's an option they can believe.", es: "«No es una promesa. Es una opción que pueden creer»." },
      ],
      words: [
        { word: "confidence", es: "confianza" },
        { word: "ending", es: "final" },
        { word: "believe", es: "creer" },
      ],
    },
    {
      id: "s10",
      image: s10,
      imageAlt: "Vale presiona enviar y los tres se quedan mirando la pantalla.",
      text: "Thursday night, 11:40. Vale presses send.",
      es: "Jueves por la noche, 11:40. Vale presiona enviar.",
      speaker: "narrator",
      lines: [
        { speaker: "narrator", text: "Thursday night, 11:40. Vale presses send.", es: "Jueves por la noche, 11:40. Vale presiona enviar." },
        { speaker: "dani", text: "It's gone. We can't change anything now.", es: "«Ya se fue. Ahora no podemos cambiar nada»." },
        { speaker: "vale", text: "Good. Now Morgan could say yes, or she might say no. We did our part.", es: "«Bien. Ahora Morgan podría decir que sí, o podría decir que no. Hicimos nuestra parte»." },
      ],
      words: [
        { word: "send", es: "enviar" },
        { word: "change", es: "cambiar" },
        { word: "part", es: "parte" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s2",
      questionEn: "What did Camila say they could do?",
      questionEs: "¿Qué dijo Camila que podrían hacer?",
      options: [
        { label: "Record every call and study it later", emoji: "🎧" },
        { label: "Close the school for a week", emoji: "🚪" },
        { label: "Teach only grammar", emoji: "📚" },
      ],
      answer: 0,
      sayIt: "They could record every call and study it later.",
      sayItEs: "Ejemplo: «They could record every call and study it later.»",
      sayItAskEn: "What could you do this week to practice your English? Say one idea.",
      sayItAskEs: "¿Qué podrías hacer esta semana para practicar tu inglés? Di una idea.",
      sayItCheck: {
        target: "I could *",
        altTargets: ["We could *", "I could practice *"],
      },
    },
    {
      id: "q2",
      afterScene: "s5",
      questionEn: "What did Dani say about the other school?",
      questionEs: "¿Qué dijo Dani sobre la otra escuela?",
      options: [
        { label: "It sent Morgan a proposal that morning", emoji: "📩" },
        { label: "It closed last year", emoji: "🏚️" },
        { label: "It called Vale by mistake", emoji: "📞" },
      ],
      answer: 0,
      sayIt: "Another school sent Morgan a proposal.",
      sayItEs: "Ejemplo: «Another school sent Morgan a proposal.»",
      sayItAskEn: "What might you do tomorrow? You are not sure yet, so use might.",
      sayItAskEs: "¿Qué podrías hacer mañana? No estás seguro, así que usa might.",
      sayItCheck: {
        target: "I might *",
        altTargets: ["Tomorrow I might *", "I might go *"],
      },
    },
    {
      id: "q3",
      afterScene: "s9",
      questionEn: "Why did Vale keep the same price?",
      questionEs: "¿Por qué Vale mantuvo el mismo precio?",
      options: [
        { label: "Because a cheap plan would teach thirty people badly", emoji: "⚖️" },
        { label: "Because Morgan asked for it", emoji: "📝" },
        { label: "Because Dani forgot to change it", emoji: "🙈" },
      ],
      answer: 0,
      sayIt: "Same price, better plan.",
      sayItEs: "Ejemplo: «Same price, better plan.»",
      sayItAskEn: "Studying in the morning or studying at night — which option is better for you?",
      sayItAskEs: "Estudiar en la mañana o estudiar en la noche: ¿cuál opción es mejor para ti?",
      sayItCheck: {
        target: "My best option is *",
        altTargets: ["The best option for me is *", "My option is *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s6",
    phrase: "English is easy for me.",
    es: "El inglés es fácil para mí.",
  },
  habitCard: {
    afterScene: "s4",
    phrase: "I give two clear options, not ten. Clear choices help people decide.",
    es: "Doy dos opciones claras, no diez. Las opciones claras ayudan a decidir.",
    model: "vale",
    modelActionEs: "Vale reduce todas las ideas a dos opciones en la pared.",
  },
  continuePrompt: {
    en: "You have one free afternoon. What could you do? What might you do first? Which option is better?",
    es: "Tienes una tarde libre. ¿Qué podrías hacer? ¿Qué harías primero? ¿Cuál opción es mejor?",
  },
  continueWith: ["I could ...", "I might ...", "My best option is ..."],
  cliffhanger: {
    en: "Episode 3: The other school is bigger, older, and cheaper. Don Tito has advice.",
    es: "Episodio 3: La otra escuela es más grande, más vieja y más barata. Don Tito tiene un consejo.",
  },
};
