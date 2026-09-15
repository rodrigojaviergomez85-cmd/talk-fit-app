import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/eagles-ep13-online-or-in-person/cover.jpg";
import s1 from "@/assets/storybook/eagles-ep13-online-or-in-person/s1.jpg";
import s2 from "@/assets/storybook/eagles-ep13-online-or-in-person/s2.jpg";
import s3 from "@/assets/storybook/eagles-ep13-online-or-in-person/s3.jpg";
import s4 from "@/assets/storybook/eagles-ep13-online-or-in-person/s4.jpg";
import s5 from "@/assets/storybook/eagles-ep13-online-or-in-person/s5.jpg";
import s6 from "@/assets/storybook/eagles-ep13-online-or-in-person/s6.jpg";
import s7 from "@/assets/storybook/eagles-ep13-online-or-in-person/s7.jpg";
import s8 from "@/assets/storybook/eagles-ep13-online-or-in-person/s8.jpg";
import s9 from "@/assets/storybook/eagles-ep13-online-or-in-person/s9.jpg";
import s10 from "@/assets/storybook/eagles-ep13-online-or-in-person/s10.jpg";

/**
 * Season 6 (Eagles) Episode 13 — "Online or in person".
 * Eagles day 13: long comparatives — more comfortable · more convenient · more flexible.
 */
export const EAGLES_EP13_ONLINE_OR_IN_PERSON: StorybookEpisode = {
  id: "eagles-ep13-online-or-in-person",
  moduleId: "eagles-week-1",
  week: 3,
  title: "Online or in person",
  titleEs: "En línea o presencial",
  episodeLabel: { en: "Season 6 · Episode 13", es: "Temporada 6 · Episodio 13" },
  previously: [
    { en: "The team chose two schedules.", es: "El equipo eligió dos horarios." },
    { en: "Luis told the twelve workers.", es: "Luis les avisó a los doce trabajadores." },
    { en: "Morgan asked a new question.", es: "Morgan hizo una pregunta nueva." },
  ],
  reviewWords: [
    { word: "comfortable", es: "cómodo" },
    { word: "convenient", es: "conveniente" },
    { word: "flexible", es: "flexible" },
  ],
  blurb: {
    en: "Online is more convenient. In person is more powerful. Vale has to defend a real answer with real reasons.",
    es: "En línea es más conveniente. Presencial es más poderoso. Vale tiene que defender una respuesta real con razones reales.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Vale reads Morgan's message on her phone early in the morning.",
      text: "6:40 a.m. One line, big decision.",
      es: "6:40 a.m. Una línea, decisión grande.",
      speaker: "vale",
      lines: [
        { speaker: "vale", text: "\"Online or in person?\" She wants reasons, not a feeling.", es: "«¿En línea o presencial?» Quiere razones, no un sentimiento." },
        { speaker: "dani", text: "Online is more convenient for everyone.", es: "«En línea es más conveniente para todos»." },
        { speaker: "vale", text: "Convenient is not the same as effective.", es: "«Conveniente no es lo mismo que efectivo»." },
      ],
      words: [
        { word: "reasons", es: "razones" },
        { word: "convenient", es: "conveniente" },
        { word: "effective", es: "efectivo" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Dani shows two tabs on a laptop: a video call and a classroom photo.",
      text: "Dani argues for the screen.",
      es: "Dani defiende la pantalla.",
      speaker: "dani",
      lines: [
        { speaker: "dani", text: "Online is more flexible. People can join from the bus.", es: "«En línea es más flexible. La gente se puede conectar desde el bus»." },
        { speaker: "camila", text: "And it is more comfortable in the rainy season.", es: "«Y es más cómodo en la época de lluvia»." },
        { speaker: "vale", text: "Comfortable people speak less. I have seen it.", es: "«La gente cómoda habla menos. Yo lo he visto»." },
      ],
      words: [
        { word: "flexible", es: "flexible" },
        { word: "join", es: "unirse / conectarse" },
        { word: "rainy", es: "lluvioso" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Luis speaks from the Northline office with his coworkers behind him.",
      text: "Luis asks the twelve and reports back.",
      es: "Luis les pregunta a los doce y reporta.",
      speaker: "luis",
      lines: [
        { speaker: "luis", text: "Eight say online is more convenient. Four say it is more difficult to focus.", es: "«Ocho dicen que en línea es más conveniente. Cuatro dicen que es más difícil concentrarse»." },
        { speaker: "vale", text: "And you?", es: "«¿Y tú?»" },
        { speaker: "luis", text: "I am more nervous on camera than in a room.", es: "«Estoy más nervioso en cámara que en un salón»." },
      ],
      words: [
        { word: "focus", es: "concentrarse" },
        { word: "camera", es: "cámara" },
        { word: "nervous", es: "nervioso" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Kat and Beto practice speaking face to face in the school.",
      text: "Vale watches her own students for the answer.",
      es: "Vale busca la respuesta en sus propios estudiantes.",
      speaker: "kat",
      lines: [
        { speaker: "kat", text: "In person is more intense, but I learn more.", es: "«Presencial es más intenso, pero aprendo más»." },
        { speaker: "beto", text: "Online I turn off the camera and I disappear.", es: "«En línea apago la cámara y desaparezco»." },
        { speaker: "vale", text: "That sentence just wrote my email.", es: "«Esa frase acaba de escribir mi correo»." },
      ],
      words: [
        { word: "intense", es: "intenso" },
        { word: "disappear", es: "desaparecer" },
        { word: "email", es: "correo" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Camila adds costs and travel times to a simple table.",
      text: "Camila checks the cost of being right.",
      es: "Camila revisa el costo de tener razón.",
      speaker: "camila",
      lines: [
        { speaker: "camila", text: "In person is more expensive for them: transport and time.", es: "«Presencial es más caro para ellos: transporte y tiempo»." },
        { speaker: "vale", text: "Then we go to them. Their office, their hour.", es: "«Entonces vamos nosotros. Su oficina, su hora»." },
        { speaker: "camila", text: "That is more complicated for us and more comfortable for them.", es: "«Eso es más complicado para nosotros y más cómodo para ellos»." },
      ],
      words: [
        { word: "transport", es: "transporte" },
        { word: "time", es: "tiempo" },
        { word: "complicated", es: "complicado" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Vale writes a hybrid plan with three days and two days.",
      text: "Vale writes a third option nobody asked for.",
      es: "Vale escribe una tercera opción que nadie pidió.",
      speaker: "vale",
      lines: [
        { speaker: "vale", text: "Three days in person, two days online. More flexible, still real.", es: "«Tres días presencial, dos en línea. Más flexible, y sigue siendo real»." },
        { speaker: "dani", text: "That is more work for you than for anybody.", es: "«Eso es más trabajo para ti que para nadie»." },
        { speaker: "vale", text: "I know. Effort is part of the process.", es: "«Lo sé. El esfuerzo es parte del proceso»." },
      ],
      words: [
        { word: "days", es: "días" },
        { word: "work", es: "trabajo" },
        { word: "effort", es: "esfuerzo" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Morgan listens on a video call, taking notes.",
      text: "3:00 p.m. Vale defends the plan in English.",
      es: "3:00 p.m. Vale defiende el plan en inglés.",
      speaker: "morgan",
      lines: [
        { speaker: "morgan", text: "Why is your plan more expensive than the online one?", es: "«¿Por qué tu plan es más caro que el plan en línea?»" },
        { speaker: "vale", text: "Because speaking in a room is more effective than speaking to a black square.", es: "«Porque hablar en un salón es más efectivo que hablarle a un cuadro negro»." },
        { speaker: "morgan", text: "Say that again in the meeting on Monday.", es: "«Dilo otra vez en la reunión del lunes»." },
      ],
      words: [
        { word: "square", es: "cuadro" },
        { word: "meeting", es: "reunión" },
        { word: "monday", es: "lunes" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Dani accepts the plan and prepares the online days.",
      text: "Dani loses the argument and wins a job.",
      es: "Dani pierde la discusión y gana un trabajo.",
      speaker: "dani",
      lines: [
        { speaker: "dani", text: "Fine. I run the online days. They will be more organized than mine used to be.", es: "«Está bien. Yo llevo los días en línea. Serán más organizados que los míos de antes»." },
        { speaker: "vale", text: "Thank you. Losing well is a skill.", es: "«Gracias. Perder bien es una habilidad»." },
        { speaker: "dani", text: "I learned it from you.", es: "«La aprendí de ti»." },
      ],
      words: [
        { word: "organized", es: "organizados" },
        { word: "skill", es: "habilidad" },
        { word: "thank", es: "agradecer" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Luis tells his coworkers the final answer in the office.",
      text: "Luis reads the answer to the twelve.",
      es: "Luis les lee la respuesta a los doce.",
      speaker: "luis",
      lines: [
        { speaker: "luis", text: "Three days here, two days online. Is that more comfortable for everybody?", es: "«Tres días aquí, dos en línea. ¿Eso es más cómodo para todos?»" },
        { speaker: "kat", text: "It is more honest. We came to speak, not to hide.", es: "«Es más honesto. Vinimos a hablar, no a escondernos»." },
        { speaker: "luis", text: "Then we start Monday. I can do it.", es: "«Entonces empezamos el lunes. Yo puedo hacerlo»." },
      ],
      words: [
        { word: "honest", es: "honesto" },
        { word: "speak", es: "hablar" },
        { word: "start", es: "empezar" },
      ],
    },
    {
      id: "s10",
      image: s10,
      imageAlt: "Vale looks at a printed proposal with three different plans.",
      text: "9:50 p.m. Three plans, one page, one choice left.",
      es: "9:50 p.m. Tres planes, una página, falta una elección.",
      speaker: "camila",
      lines: [
        { speaker: "camila", text: "Morgan wants the best plan on Monday, with a price.", es: "«Morgan quiere el mejor plan el lunes, con precio»." },
        { speaker: "vale", text: "Then tomorrow we choose the best one, not the easiest one.", es: "«Entonces mañana elegimos el mejor, no el más fácil»." },
        { speaker: "narrator", text: "Three plans on the table. Only one goes to Miami.", es: "Tres planes sobre la mesa. Solo uno va a Miami." },
      ],
      words: [
        { word: "price", es: "precio" },
        { word: "page", es: "página" },
        { word: "table", es: "mesa" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s2",
      questionEn: "Why does Dani prefer online classes?",
      questionEs: "¿Por qué Dani prefiere las clases en línea?",
      options: [
        { label: "Because they are more flexible", emoji: "💻" },
        { label: "Because they are longer", emoji: "⏰" },
        { label: "Because nobody has to speak", emoji: "🤐" },
      ],
      answer: 0,
      sayIt: "Online classes are more flexible.",
      sayItEs: "Ejemplo: «Online classes are more flexible.»",
      sayItAskEn: "Online or in person for you? Use: … is more convenient than …",
      sayItAskEs: "¿En línea o presencial para ti? Usa: … is more convenient than …",
      sayItCheck: {
        target: "* is more convenient than *",
        altTargets: ["Online is more convenient than *", "* more convenient than *", "* is more convenient *"],
      },
    },
    {
      id: "q2",
      afterScene: "s5",
      questionEn: "What did Vale decide about the location?",
      questionEs: "¿Qué decidió Vale sobre el lugar?",
      options: [
        { label: "The team goes to the students' office", emoji: "🏢" },
        { label: "The students pay for transport", emoji: "🚌" },
        { label: "Nobody meets in person", emoji: "🚫" },
      ],
      answer: 0,
      sayIt: "They go to the students' office.",
      sayItEs: "Ejemplo: «They go to the students' office.»",
      sayItAskEn: "Where do you study better? Use: … is more comfortable than …",
      sayItAskEs: "¿Dónde estudias mejor? Usa: … is more comfortable than …",
      sayItCheck: {
        target: "* is more comfortable than *",
        altTargets: ["* more comfortable than *", "My house is more comfortable than *", "* is more comfortable *"],
      },
    },
    {
      id: "q3",
      afterScene: "s7",
      questionEn: "How did Vale defend her plan to Morgan?",
      questionEs: "¿Cómo defendió Vale su plan ante Morgan?",
      options: [
        { label: "Speaking in a room is more effective", emoji: "🗣️" },
        { label: "It costs less money", emoji: "💵" },
        { label: "It is the only option", emoji: "1️⃣" },
      ],
      answer: 0,
      sayIt: "Speaking in a room is more effective.",
      sayItEs: "Ejemplo: «Speaking in a room is more effective.»",
      sayItAskEn: "Which schedule fits your life? Use: … is more flexible than …",
      sayItAskEs: "¿Qué horario le queda a tu vida? Usa: … is more flexible than …",
      sayItCheck: {
        target: "* is more flexible than *",
        altTargets: ["* more flexible than *", "My schedule is more flexible than *", "* is more flexible *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s6",
    phrase: "I choose the plan that helps me grow, not the easy one.",
    es: "Elijo el plan que me hace crecer, no el fácil.",
  },
  habitCard: {
    afterScene: "s3",
    phrase: "Before I decide for people, I ask people.",
    es: "Antes de decidir por la gente, le pregunto a la gente.",
    model: "luis",
    modelActionEs: "Luis le pregunta a sus doce compañeros antes de opinar.",
  },
  continuePrompt: {
    en: "Compare studying at home and studying with other people. Which is better for you and why?",
    es: "Compara estudiar en casa y estudiar con otras personas. ¿Cuál es mejor para ti y por qué?",
  },
  continueWith: ["... is more convenient ...", "... is more comfortable ...", "I prefer ..."],
  cliffhanger: {
    en: "Episode 14: Three plans, one page, and the best one has to be chosen tonight.",
    es: "Episodio 14: Tres planes, una página, y el mejor hay que elegirlo esta noche.",
  },
};
