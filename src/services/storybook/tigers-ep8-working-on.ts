import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/tigers-ep8-working-on/cover.jpg";
import s1 from "@/assets/storybook/tigers-ep8-working-on/s1.jpg";
import s2 from "@/assets/storybook/tigers-ep8-working-on/s2.jpg";
import s3 from "@/assets/storybook/tigers-ep8-working-on/s3.jpg";
import s4 from "@/assets/storybook/tigers-ep8-working-on/s4.jpg";
import s5 from "@/assets/storybook/tigers-ep8-working-on/s5.jpg";
import s6 from "@/assets/storybook/tigers-ep8-working-on/s6.jpg";
import s7 from "@/assets/storybook/tigers-ep8-working-on/s7.jpg";
import s8 from "@/assets/storybook/tigers-ep8-working-on/s8.jpg";
import s9 from "@/assets/storybook/tigers-ep8-working-on/s9.jpg";
import s10 from "@/assets/storybook/tigers-ep8-working-on/s10.jpg";
import s11 from "@/assets/storybook/tigers-ep8-working-on/s11.jpg";

/**
 * Season 7 (Tigers) Episode 8 — "What have you been working on?"
 * Matches Tigers Day 8 (present perfect progressive: ongoing work, the
 * challenge, and the progress).
 */
export const TIGERS_EP8_WORKING_ON: StorybookEpisode = {
  id: "tigers-ep8-working-on",
  moduleId: "tigers",
  week: 2,
  title: "What have you been working on?",
  titleEs: "¿En qué has estado trabajando?",
  episodeLabel: { en: "Season 7 · Episode 8", es: "Temporada 7 · Episodio 8" },
  previously: [
    { en: "The first free workshop filled the classroom with neighbors.", es: "El primer taller gratis llenó el salón de vecinos." },
    { en: "Bryan tried to embarrass Vale in front of a client — and failed.", es: "Bryan intentó avergonzar a Vale frente a un cliente — y falló." },
    { en: "Three neighbors signed up for regular classes.", es: "Tres vecinos se inscribieron a clases regulares." },
  ],
  reviewWords: [
    { word: "workshop", es: "taller" },
    { word: "experience", es: "experiencia" },
    { word: "signed up", es: "se inscribieron" },
  ],
  blurb: {
    en: "A young teacher named Sofía knocks on the door with a folder, a nervous smile, and two years of quiet work.",
    es: "Una maestra joven llamada Sofía toca a la puerta con una carpeta, una sonrisa nerviosa y dos años de trabajo silencioso.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Sofía, maestra joven, espera en la recepción con una carpeta contra el pecho.",
      text: "Tuesday, nine in the morning. A young woman with a folder waited at the front desk, nervous.",
      es: "Martes, nueve de la mañana. Una mujer joven con una carpeta esperaba en la recepción, nerviosa.",
      speaker: "narrator",
      lines: [
        { speaker: "dani", text: "Good morning! How can I help you?", es: "«¡Buenos días! ¿En qué puedo ayudarte?»" },
        { speaker: "sofia", text: "Hi… I'm Sofía. I'm an English teacher, and I want to work here.", es: "«Hola… soy Sofía. Soy maestra de inglés y quiero trabajar aquí»." },
        { speaker: "dani", text: "Vale! Someone wants to see you. And she has a folder!", es: "«¡Vale! Alguien quiere verte. ¡Y trae carpeta!»" },
      ],
      words: [
        { word: "folder", es: "carpeta" },
        { word: "nervous", es: "nerviosa" },
        { word: "want", es: "querer" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Vale recibe a Sofía en su escritorio con dos tazas de café.",
      text: "I have been teaching kids at the community center for two years.",
      es: "«He estado enseñando a niños en el centro comunitario por dos años».",
      speaker: "sofia",
      lines: [
        { speaker: "vale", text: "So, Sofía, tell me about yourself.", es: "«Cuéntame de ti, Sofía»." },
        { speaker: "sofia", text: "I have been teaching kids at the community center for two years.", es: "«He estado enseñando a niños en el centro comunitario por dos años»." },
        { speaker: "sofia", text: "For free. Every Saturday. My dream is to teach full time.", es: "«Gratis. Todos los sábados. Mi sueño es enseñar tiempo completo»." },
      ],
      words: [
        { word: "community center", es: "centro comunitario" },
        { word: "full time", es: "tiempo completo" },
        { word: "dream", es: "sueño" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Sofía abre su carpeta y muestra fichas hechas a mano con dibujos.",
      text: "Look. I have been making my own cards and games because the center has no books.",
      es: "«Mira. He estado haciendo mis propias fichas y juegos porque el centro no tiene libros».",
      speaker: "sofia",
      lines: [
        { speaker: "sofia", text: "Look at these. I have been making my own cards and games.", es: "«Mira estas. He estado haciendo mis propias fichas y juegos»." },
        { speaker: "sofia", text: "The center has no books, so I draw everything by hand.", es: "«El centro no tiene libros, así que dibujo todo a mano»." },
        { speaker: "vale", text: "Two hundred cards… you made all of these?", es: "«Doscientas fichas… ¿hiciste todas estas?»" },
      ],
      words: [
        { word: "cards", es: "fichas" },
        { word: "games", es: "juegos" },
        { word: "by hand", es: "a mano" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Vale hojea las fichas, impresionada; Camila espía desde la puerta.",
      text: "And I have been studying your school. Your method is the reason I'm here.",
      es: "«Y he estado estudiando su escuela. Su método es la razón por la que estoy aquí».",
      speaker: "sofia",
      lines: [
        { speaker: "sofia", text: "And I have been studying your school since January.", es: "«Y he estado estudiando su escuela desde enero»." },
        { speaker: "sofia", text: "Speaking first, real practice, no fear. Your method is the reason I'm here.", es: "«Hablar primero, práctica real, sin miedo. Su método es la razón por la que estoy aquí»." },
        { speaker: "camila", text: "Vale, can I say something? I like her already.", es: "«Vale, ¿puedo decir algo? Ya me cae bien»." },
      ],
      words: [
        { word: "method", es: "método" },
        { word: "reason", es: "razón" },
        { word: "already", es: "ya" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Vale hace una pregunta difícil; Sofía respira antes de responder.",
      text: "What has been the hardest part of teaching at the center?",
      es: "«¿Qué ha sido lo más difícil de enseñar en el centro?»",
      speaker: "vale",
      lines: [
        { speaker: "vale", text: "What has been the hardest part of teaching at the center?", es: "«¿Qué ha sido lo más difícil de enseñar en el centro?»" },
        { speaker: "sofia", text: "The kids arrive tired. Some haven't eaten breakfast.", es: "«Los niños llegan cansados. Algunos no han desayunado»." },
        { speaker: "sofia", text: "So I have been bringing fruit from my mom's trees. A hungry kid can't learn.", es: "«Así que he estado trayendo fruta de los árboles de mi mamá. Un niño con hambre no puede aprender»." },
      ],
      words: [
        { word: "hardest", es: "más difícil" },
        { word: "tired", es: "cansados" },
        { word: "hungry", es: "con hambre" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Sofía sonríe contando el avance de sus alumnos.",
      text: "And the progress? My kids have been speaking in complete sentences since March.",
      es: "«¿Y el avance? Mis niños han estado hablando en oraciones completas desde marzo».",
      speaker: "sofia",
      lines: [
        { speaker: "vale", text: "And the progress? Tell me about the results.", es: "«¿Y el avance? Cuéntame de los resultados»." },
        { speaker: "sofia", text: "My kids have been speaking in complete sentences since March.", es: "«Mis niños han estado hablando en oraciones completas desde marzo»." },
        { speaker: "sofia", text: "One girl, Gabi, has been teaching her little brother at home.", es: "«Una niña, Gabi, ha estado enseñándole a su hermanito en casa»." },
      ],
      words: [
        { word: "sentences", es: "oraciones" },
        { word: "since", es: "desde" },
        { word: "little brother", es: "hermanito" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Vale y Camila intercambian miradas de acuerdo.",
      text: "Sofía, I have been looking for a teacher like you for months.",
      es: "«Sofía, he estado buscando una maestra como tú por meses».",
      speaker: "vale",
      lines: [
        { speaker: "vale", text: "Sofía, I have been looking for a teacher like you for months.", es: "«Sofía, he estado buscando una maestra como tú por meses»." },
        { speaker: "vale", text: "The school is growing, and Northline needs more hours.", es: "«La escuela está creciendo y Northline necesita más horas»." },
        { speaker: "vale", text: "Can you teach a demo class on Saturday? With real students?", es: "«¿Puedes enseñar una clase de prueba el sábado? ¿Con estudiantes reales?»" },
        { speaker: "sofia", text: "Yes! I mean… yes. Yes, I can.", es: "«¡Sí! O sea… sí. Sí, puedo»." },
      ],
      words: [
        { word: "looking for", es: "buscando" },
        { word: "growing", es: "creciendo" },
        { word: "demo", es: "de prueba / demostración" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Sofía sale flotando de felicidad; Dani le muestra la puerta con una reverencia cómica.",
      text: "Sofía floated out of the office like a balloon.",
      es: "Sofía salió flotando de la oficina como un globo.",
      speaker: "narrator",
      lines: [
        { speaker: "sofia", text: "Thank you, thank you, thank you. I won't disappoint you.", es: "«Gracias, gracias, gracias. No la voy a decepcionar»." },
        { speaker: "dani", text: "Good luck, teacher Sofía!", es: "«¡Buena suerte, maestra Sofía!»" },
        { speaker: "camila", text: "Two years teaching for free, and she made her own materials… Vale, hire her now.", es: "«Dos años enseñando gratis, y hace sus propios materiales… Vale, contrátala ya»." },
      ],
      words: [
        { word: "disappoint", es: "decepcionar" },
        { word: "luck", es: "suerte" },
        { word: "hire", es: "contratar" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Vale y Camila revisan el calendario de clases con una columna nueva.",
      text: "If the demo goes well, Sofía takes the kids' group and the new evening class.",
      es: "«Si la prueba sale bien, Sofía toma el grupo de niños y la nueva clase de la tarde».",
      speaker: "vale",
      lines: [
        { speaker: "vale", text: "Patience, Camila. If the demo goes well, she takes the kids' group.", es: "«Paciencia, Camila. Si la prueba sale bien, ella toma el grupo de niños»." },
        { speaker: "vale", text: "And the new evening class for adults. We have been needing one for weeks.", es: "«Y la nueva clase de la tarde para adultos. La hemos estado necesitando por semanas»." },
        { speaker: "camila", text: "And if it goes badly?", es: "«¿Y si sale mal?»" },
        { speaker: "vale", text: "Then I give her feedback, and she tries again. That's the rule of this house.", es: "«Entonces le doy comentarios y lo intenta otra vez. Esa es la regla de esta casa»." },
      ],
      words: [
        { word: "evening", es: "de la tarde/noche" },
        { word: "feedback", es: "comentarios / retroalimentación" },
        { word: "tries again", es: "lo intenta otra vez" },
      ],
    },
    {
      id: "s10",
      image: s10,
      imageAlt: "Dani escribe el nombre de Sofía en la pizarra con un signo de interrogación.",
      text: "On the board, Dani wrote: Sofía — Saturday, 10:00. And under it, a big question mark.",
      es: "En la pizarra, Dani escribió: Sofía — sábado, 10:00. Y debajo, un signo de interrogación grande.",
      speaker: "narrator",
      lines: [
        { speaker: "dani", text: "Do you think she's ready? She was so nervous.", es: "«¿Crees que esté lista? Estaba tan nerviosa»." },
        { speaker: "vale", text: "Dani, I have been watching teachers for years.", es: "«Dani, he estado observando maestros por años»." },
        { speaker: "vale", text: "Nervous people who still show up? Those are the brave ones.", es: "«La gente nerviosa que aun así aparece… esas son las valientes»." },
      ],
      words: [
        { word: "ready", es: "lista" },
        { word: "show up", es: "aparecer / presentarse" },
        { word: "brave", es: "valientes" },
      ],
    },
    {
      id: "s11",
      image: s11,
      imageAlt: "Sofía ensaya su presentación frente al espejo de su casa.",
      text: "That night, Sofía practiced her introduction in front of her mirror, again and again.",
      es: "Esa noche, Sofía practicó su presentación frente a su espejo, una y otra vez.",
      speaker: "sofia",
      lines: [
        { speaker: "sofia", text: "Hi, I'm Sofía. I have been teaching kids for two years.", es: "«Hola, soy Sofía. He estado enseñando a niños por dos años»." },
        { speaker: "sofia", text: "I have been making my own materials, and I have been learning from the best school in the city.", es: "«He estado haciendo mis propios materiales y he estado aprendiendo de la mejor escuela de la ciudad»." },
        { speaker: "sofia", text: "I have been working toward this my whole life. I can do it.", es: "«He estado trabajando para esto toda mi vida. Yo puedo hacerlo»." },
      ],
      words: [
        { word: "materials", es: "materiales" },
        { word: "toward", es: "hacia" },
        { word: "whole life", es: "toda la vida" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s3",
      questionEn: "What has Sofía been doing for two years?",
      questionEs: "¿Qué ha estado haciendo Sofía por dos años?",
      options: [
        { label: "Teaching kids at the community center", emoji: "🧒" },
        { label: "Working at BigTalk", emoji: "🏢" },
        { label: "Selling fruit with her mom", emoji: "🍎" },
      ],
      answer: 0,
      sayIt: "I have been teaching kids at the community center for two years.",
      sayItEs: "Ejemplo: «I have been teaching kids at the community center for two years.»",
      sayItAskEn: "What have you been working on lately? Tell me.",
      sayItAskEs: "¿En qué has estado trabajando últimamente? Cuéntame.",
      sayItCheck: {
        target: "I have been *",
        altTargets: ["I've been *", "Lately, I have been *", "I have been *ing *"],
      },
    },
    {
      id: "q2",
      afterScene: "s6",
      questionEn: "What progress have Sofía's students made?",
      questionEs: "¿Qué avance han logrado los estudiantes de Sofía?",
      options: [
        { label: "They have been speaking in complete sentences since March", emoji: "🗣️" },
        { label: "They all moved to the United States", emoji: "🇺🇸" },
        { label: "They stopped coming to class", emoji: "🚪" },
      ],
      answer: 0,
      sayIt: "My students have been speaking in complete sentences since March.",
      sayItEs: "Ejemplo: «My students have been speaking in complete sentences since March.»",
      sayItAskEn: "What has been the hardest part of it? Tell me the challenge.",
      sayItAskEs: "¿Qué ha sido lo más difícil? Cuéntame el reto.",
      sayItCheck: {
        target: "The hardest part has been *",
        altTargets: ["It has been hard because *", "The challenge has been *", "I have been fighting with *"],
      },
    },
    {
      id: "q3",
      afterScene: "s9",
      questionEn: "What is Vale's rule when something goes badly?",
      questionEs: "¿Cuál es la regla de Vale cuando algo sale mal?",
      options: [
        { label: "Give feedback and try again", emoji: "🔁" },
        { label: "Say goodbye forever", emoji: "👋" },
        { label: "Call BigTalk", emoji: "📞" },
      ],
      answer: 0,
      sayIt: "I give her feedback, and she tries again. That's the rule of this house.",
      sayItEs: "Ejemplo: «I give her feedback, and she tries again. That's the rule of this house.»",
      sayItAskEn: "And the progress? What have you been achieving?",
      sayItAskEs: "¿Y el avance? ¿Qué has estado logrando?",
      sayItCheck: {
        target: "I have been *ing *",
        altTargets: ["I have been getting better at *", "I have been achieving *", "I've been *ing *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s5",
    phrase: "I can do it. Nervous and brave can live in the same person.",
    es: "Yo puedo hacerlo. Nerviosa y valiente pueden vivir en la misma persona.",
  },
  habitCard: {
    afterScene: "s3",
    phrase: "When I don't have resources, I create them. A pen and a card can build a classroom.",
    es: "Cuando no tengo recursos, los creo. Un lapicero y una ficha pueden construir un salón.",
    model: "sofia",
    modelActionEs: "Sofía hizo doscientas fichas a mano porque su centro no tenía libros.",
  },
  continuePrompt: {
    en: "Answer like Sofía: What have you been working on? What has been the challenge? What progress have you been making?",
    es: "Responde como Sofía: ¿en qué has estado trabajando? ¿Cuál ha sido el reto? ¿Qué avance has estado logrando?",
  },
  continueWith: ["I have been ... for ...", "The hardest part has been ...", "I have been getting better at ..."],
  cliffhanger: {
    en: "Episode 9: The renewal meeting is in one week — Vale prepares the defense of the contract.",
    es: "Episodio 9: La reunión de renovación es en una semana — Vale prepara la defensa del contrato.",
  },
};
