import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/vale-s4-ep2/cover.jpg";
import s1 from "@/assets/storybook/vale-s4-ep2/s1.jpg";
import s2 from "@/assets/storybook/vale-s4-ep2/s2.jpg";
import s3 from "@/assets/storybook/vale-s4-ep2/s3.jpg";
import s4 from "@/assets/storybook/vale-s4-ep2/s4.jpg";
import s5 from "@/assets/storybook/vale-s4-ep2/s5.jpg";
import s6 from "@/assets/storybook/vale-s4-ep2/s6.jpg";
import s7 from "@/assets/storybook/vale-s4-ep2/s7.jpg";
import s8 from "@/assets/storybook/vale-s4-ep2/s8.jpg";
import s9 from "@/assets/storybook/vale-s4-ep2/s9.jpg";
import s10 from "@/assets/storybook/vale-s4-ep2/s10.jpg";

/**
 * Season 4 · Episode 2 — "At work yesterday".
 * Matches Basic 3 / Past Stories Week 1 Day 2: simple past — at work yesterday.
 */
export const VALE_S4_WORK_YESTERDAY: StorybookEpisode = {
  id: "vale-s4-work-yesterday",
  moduleId: "past-stories",
  week: 1,
  title: "At work yesterday",
  titleEs: "En el trabajo ayer",
  episodeLabel: { en: "Season 4 · Episode 2", es: "Temporada 4 · Episodio 2" },
  previously: [
    { en: "Camila, a blogger, visited Vale.", es: "Camila, una bloguera, visitó a Vale." },
    { en: "Vale told her yesterday morning.", es: "Vale le contó su mañana de ayer." },
    { en: "Camila wants the whole story.", es: "Camila quiere la historia completa." },
  ],
  reviewWords: [
    { word: "woke up", es: "me desperté" },
    { word: "cooked", es: "cociné" },
    { word: "walked", es: "caminé" },
    { word: "happened", es: "pasó" },
  ],
  blurb: {
    en: "Vale tells Camila about her day at the call center — and one special call.",
    es: "Vale le cuenta a Camila su día en el call center — y una llamada especial.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Vale llega a la oficina y saluda a su equipo.",
      text: '"I arrived at the office at seven thirty. I said hi to my team."',
      es: "«Llegué a la oficina a las siete treinta. Saludé a mi equipo».",
      speaker: "vale",
      words: [
        { word: "arrived", es: "llegué" },
        { word: "office", es: "oficina" },
        { word: "team", es: "equipo" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Vale se pone los audífonos y enciende su computadora.",
      text: '"I put on my headset and turned on my computer."',
      es: "«Me puse los audífonos y encendí mi computadora».",
      speaker: "vale",
      words: [
        { word: "put on", es: "me puse" },
        { word: "headset", es: "audífonos" },
        { word: "turned on", es: "encendí" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "El jefe le da a Vale una lista de llamadas.",
      text: '"The boss gave me a long list of calls."',
      es: "«El jefe me dio una lista larga de llamadas».",
      speaker: "vale",
      words: [
        { word: "gave", es: "dio (give en pasado)" },
        { word: "list", es: "lista" },
        { word: "calls", es: "llamadas" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Vale contesta su primera llamada con una sonrisa.",
      text: '"I answered the first call. The man sounded angry."',
      es: "«Conteste la primera llamada. El hombre sonaba enojado».",
      speaker: "vale",
      words: [
        { word: "answered", es: "contesté" },
        { word: "sounded", es: "sonaba" },
        { word: "angry", es: "enojado" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Vale respira y escucha al cliente con calma.",
      text: '"I breathed, listened, and stayed calm."',
      es: "«Respiré, escuché y me mantuve calmada».",
      speaker: "vale",
      words: [
        { word: "breathed", es: "respiré" },
        { word: "listened", es: "escuché" },
        { word: "stayed", es: "me mantuve" },
        { word: "calm", es: "calmada / tranquila" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Vale resuelve el problema en la computadora.",
      text: '"I fixed his problem in ten minutes. He thanked me!"',
      es: "«Arreglé su problema en diez minutos. ¡Me agradeció!»",
      speaker: "vale",
      words: [
        { word: "fixed", es: "arreglé" },
        { word: "problem", es: "problema" },
        { word: "minutes", es: "minutos" },
        { word: "thanked", es: "agradeció" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Kat choca los cinco con Vale.",
      text: '"Kat high-fived me. Mateo smiled and said, Great job!"',
      es: "«Kat chocó los cinco conmigo. Mateo sonrió y dijo: ¡Buen trabajo!»",
      speaker: "vale",
      words: [
        { word: "high-fived", es: "chocó los cinco" },
        { word: "smiled", es: "sonrió" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Vale y Kat almuerzan pupusas en la cafetería.",
      text: '"At twelve, Kat and I ate pupusas for lunch."',
      es: "«A las doce, Kat y yo comimos pupusas de almuerzo».",
      speaker: "vale",
      words: [
        { word: "pupusas", es: "pupusas" },
        { word: "lunch", es: "almuerzo" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Vale termina su última llamada del día.",
      text: '"I finished forty calls. My voice was tired but happy."',
      es: "«Terminé cuarenta llamadas. Mi voz estaba cansada pero feliz».",
      speaker: "vale",
      words: [
        { word: "finished", es: "terminé" },
        { word: "forty", es: "cuarenta" },
        { word: "voice", es: "voz" },
        { word: "tired", es: "cansada" },
      ],
    },
    {
      id: "s10",
      image: s10,
      imageAlt: "Camila toma notas y pregunta por la tarde.",
      text: '"Amazing! And after work? Where did you go?"',
      es: "«¡Increíble! ¿Y después del trabajo? ¿A dónde fuiste?»",
      speaker: "camila",
      words: [
        { word: "amazing", es: "increíble" },
        { word: "after", es: "después de" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s3",
      questionEn: "What did the boss give Vale?",
      questionEs: "¿Qué le dio el jefe a Vale?",
      options: [
        { label: "A long list of calls", emoji: "📋" },
        { label: "A new computer", emoji: "💻" },
        { label: "A free lunch", emoji: "🍱" },
      ],
      answer: 0,
      sayIt: "The boss gave her a long list of calls.",
      sayItEs: "Ejemplo: «The boss gave her a long list of calls.»",
      sayItAskEn: "What did you do first at work or school yesterday?",
      sayItAskEs: "¿Qué hiciste primero ayer en el trabajo o la escuela?",
      sayItCheck: {
        target: "I *",
        altTargets: ["first I *"],
      },
    },
    {
      id: "q2",
      afterScene: "s6",
      questionEn: "How did the angry man end the call?",
      questionEs: "¿Cómo terminó la llamada el hombre enojado?",
      options: [
        { label: "He thanked Vale", emoji: "🙏" },
        { label: "He yelled more", emoji: "😡" },
        { label: "He hung up fast", emoji: "📵" },
      ],
      answer: 0,
      sayIt: "He thanked her.",
      sayItEs: "Ejemplo: «He thanked her.»",
      sayItAskEn: "Who did you help yesterday?",
      sayItAskEs: "¿A quién ayudaste ayer tú?",
      sayItCheck: {
        target: "I helped *",
        altTargets: ["I helped my *", "nobody"],
      },
    },
    {
      id: "q3",
      afterScene: "s9",
      questionEn: "How many calls did Vale finish?",
      questionEs: "¿Cuántas llamadas terminó Vale?",
      options: [
        { label: "Forty calls", emoji: "4️⃣0️⃣" },
        { label: "Four calls", emoji: "4️⃣" },
        { label: "Fourteen calls", emoji: "🔢" },
      ],
      answer: 0,
      sayIt: "She finished forty calls.",
      sayItEs: "Ejemplo: «She finished forty calls.»",
      sayItAskEn: "How was your day yesterday? Good or hard?",
      sayItAskEs: "¿Cómo estuvo tu día ayer? ¿Bueno o difícil?",
      sayItCheck: {
        target: "It was *",
        altTargets: ["good", "hard", "my day was *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s5",
    phrase: "Mistakes are part of the process.",
    es: "Los errores son parte del proceso.",
  },
  continuePrompt: {
    en: "Now tell us about YOUR day yesterday at work or school. What did you do?",
    es: "Ahora cuéntanos TU día de ayer en el trabajo o la escuela. ¿Qué hiciste?",
  },
  continueWith: [
    "Yesterday I arrived at…",
    "I answered…",
    "I helped…",
    "I finished…",
  ],
  cliffhanger: {
    en: "Episode 3: After work — an invitation that changed everything.",
    es: "Episodio 3: Después del trabajo — una invitación que lo cambió todo.",
  },
};
