import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/vale-s4-ep8/cover.jpg";
import s1 from "@/assets/storybook/vale-s4-ep8/s1.jpg";
import s2 from "@/assets/storybook/vale-s4-ep8/s2.jpg";
import s3 from "@/assets/storybook/vale-s4-ep8/s3.jpg";
import s4 from "@/assets/storybook/vale-s4-ep8/s4.jpg";
import s5 from "@/assets/storybook/vale-s4-ep8/s5.jpg";
import s6 from "@/assets/storybook/vale-s4-ep8/s6.jpg";
import s7 from "@/assets/storybook/vale-s4-ep8/s7.jpg";
import s8 from "@/assets/storybook/vale-s4-ep8/s8.jpg";
import s9 from "@/assets/storybook/vale-s4-ep8/s9.jpg";
import s10 from "@/assets/storybook/vale-s4-ep8/s10.jpg";
import s11 from "@/assets/storybook/vale-s4-ep8/s11.jpg";
import s12 from "@/assets/storybook/vale-s4-ep8/s12.jpg";

/**
 * Season 4 · Episode 8 — "Mateo forgot".
 * Matches Basic 3 / Past Stories Week 2 Day 8: irregular past + didn't + base verb.
 * Mateo forgot to call Ana. Vale helps him fix it.
 */
export const VALE_S4_MATEO_FORGOT: StorybookEpisode = {
  id: "vale-s4-mateo-forgot",
  moduleId: "past-stories",
  week: 2,
  title: "Mateo forgot",
  titleEs: "Mateo olvidó",
  episodeLabel: { en: "Season 4 · Episode 8", es: "Temporada 4 · Episodio 8" },
  previously: [
    { en: "Kat's free Saturday surprised Vale.", es: "El sábado libre de Kat sorprendió a Vale." },
    { en: "She wrote two pages in English.", es: "Escribió dos páginas en inglés." },
    { en: "Mateo also had plans that Saturday.", es: "Mateo también tenía planes ese sábado." },
  ],
  reviewWords: [
    { word: "day off", es: "día libre" },
    { word: "ice cream", es: "helado" },
    { word: "secret", es: "secreta" },
    { word: "grew", es: "creció" },
  ],
  blurb: {
    en: "Mateo promised Ana a call on Saturday. He didn't call. On Monday morning, he has a problem.",
    es: "Mateo le prometió una llamada a Ana el sábado. No llamó. El lunes en la mañana, tiene un problema.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Mateo llega a la oficina cansado, con los ojos cansados.",
      text: "On Monday, Mateo arrived at the office with tired eyes.",
      es: "El lunes, Mateo llegó a la oficina con ojos cansados.",
      speaker: "mateo",
      words: [
        { word: "arrived", es: "llegó" },
        { word: "office", es: "oficina" },
        { word: "tired", es: "cansados" },
        { word: "eyes", es: "ojos" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Vale le pregunta a Mateo si llamó a Ana.",
      text: '"Did you call Ana on Saturday?" Vale asked.',
      es: "«¿Llamaste a Ana el sábado?», preguntó Vale.",
      speaker: "vale",
      words: [
        { word: "Did you call", es: "¿llamaste?" },
        { word: "on Saturday", es: "el sábado" },
        { word: "asked", es: "preguntó" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Mateo baja la cabeza, avergonzado.",
      text: "Mateo looked at the floor. \"No… I forgot. I didn't call her.\"",
      es: "Mateo miró al suelo. «No… lo olvidé. No la llamé».",
      speaker: "mateo",
      words: [
        { word: "looked at the floor", es: "miró al suelo" },
        { word: "forgot", es: "olvidé / olvidó" },
        { word: "didn't call", es: "no llamé / no llamó" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Flashback: Mateo viendo videos en el sofá.",
      text: "What did he do instead? He watched videos on the couch until two in the morning.",
      es: "¿Qué hizo en su lugar? Vio videos en el sofá hasta las dos de la mañana.",
      speaker: "mateo",
      words: [
        { word: "instead", es: "en su lugar" },
        { word: "watched", es: "vio / miró" },
        { word: "videos", es: "videos" },
        { word: "couch", es: "sofá" },
        { word: "until", es: "hasta" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Flashback: el celular de Mateo suena y él no contesta.",
      text: "His phone rang at nine. He didn't answer. He didn't even hear it.",
      es: "Su teléfono sonó a las nueve. No contestó. Ni siquiera lo escuchó.",
      speaker: "mateo",
      words: [
        { word: "rang", es: "sonó" },
        { word: "didn't answer", es: "no contestó" },
        { word: "even", es: "siquiera" },
        { word: "hear", es: "escuchar" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Ana en su escritorio, seria, con el celular en la mano.",
      text: "Ana waited all night. Now she didn't want to talk to him.",
      es: "Ana esperó toda la noche. Ahora no quería hablar con él.",
      speaker: "ana",
      words: [
        { word: "waited", es: "esperó" },
        { word: "all night", es: "toda la noche" },
        { word: "want", es: "querer" },
        { word: "talk", es: "hablar" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Mateo preocupado; Vale le da un consejo.",
      text: '"Say the truth, and say sorry. But in English — practice!" Vale told him.',
      es: "«Di la verdad y pide perdón. ¡Pero en inglés — practica!», le dijo Vale.",
      speaker: "vale",
      words: [
        { word: "truth", es: "verdad" },
        { word: "say sorry", es: "pedir perdón" },
        { word: "practice", es: "practicar" },
        { word: "told", es: "dijo / le dijo" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Mateo ensaya su disculpa frente al espejo del baño.",
      text: "Mateo practiced in the bathroom mirror: \"Ana, I am sorry. I forgot. You are important to me.\"",
      es: "Mateo practicó frente al espejo del baño: «Ana, lo siento. Lo olvidé. Eres importante para mí».",
      speaker: "mateo",
      words: [
        { word: "practiced", es: "practicó" },
        { word: "mirror", es: "espejo" },
        { word: "sorry", es: "lo siento" },
        { word: "important", es: "importante" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Mateo le habla a Ana con flores de la tienda de la esquina.",
      text: "At lunch he bought flowers at the corner store and found Ana.",
      es: "Al almuerzo compró flores en la tienda de la esquina y encontró a Ana.",
      speaker: "mateo",
      words: [
        { word: "lunch", es: "almuerzo" },
        { word: "bought", es: "compró" },
        { word: "flowers", es: "flores" },
        { word: "corner store", es: "tienda de la esquina" },
        { word: "found", es: "encontró" },
      ],
    },
    {
      id: "s10",
      image: s10,
      imageAlt: "Ana escucha la disculpa de Mateo y empieza a sonreír.",
      text: "He said sorry in English. Ana listened… and then she laughed.",
      es: "Dijo su disculpa en inglés. Ana escuchó… y luego se rió.",
      speaker: "ana",
      words: [
        { word: "listened", es: "escuchó" },
        { word: "then", es: "luego" },
        { word: "laughed", es: "se rió" },
      ],
    },
    {
      id: "s11",
      image: s11,
      imageAlt: "Ana acepta las flores; Mateo aliviado.",
      text: '"Your English is better than your memory," Ana said, and took the flowers.',
      es: "«Tu inglés es mejor que tu memoria», dijo Ana, y tomó las flores.",
      speaker: "ana",
      words: [
        { word: "better than", es: "mejor que" },
        { word: "memory", es: "memoria" },
        { word: "took", es: "tomó" },
      ],
    },
    {
      id: "s12",
      image: s12,
      imageAlt: "Mateo escribe un recordatorio en su celular.",
      text: "That night Mateo wrote a reminder on his phone: CALL ANA. Every day. 8 PM.",
      es: "Esa noche Mateo escribió un recordatorio en su teléfono: LLAMAR A ANA. Todos los días. 8 PM.",
      speaker: "mateo",
      words: [
        { word: "wrote", es: "escribió" },
        { word: "reminder", es: "recordatorio" },
        { word: "every day", es: "todos los días" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s4",
      questionEn: "What did Mateo do on Saturday night?",
      questionEs: "¿Qué hizo Mateo el sábado en la noche?",
      options: [
        { label: "He watched videos until 2 AM", emoji: "📱" },
        { label: "He called Ana", emoji: "📞" },
        { label: "He studied English", emoji: "📚" },
      ],
      answer: 0,
      sayIt: "He watched videos and forgot to call.",
      sayItEs: "Ejemplo: «He watched videos until two.»",
      sayItAskEn: "What did YOU do last Saturday night?",
      sayItAskEs: "¿Qué hiciste el sábado pasado en la noche?",
      sayItCheck: {
        target: "I *",
        altTargets: ["I watched *", "I went *", "I stayed *"],
      },
    },
    {
      id: "q2",
      afterScene: "s7",
      questionEn: "What is Vale's advice for Mateo?",
      questionEs: "¿Cuál es el consejo de Vale para Mateo?",
      options: [
        { label: "Say the truth, in English", emoji: "💬" },
        { label: "Buy a new phone", emoji: "📱" },
        { label: "Hide from Ana", emoji: "🙈" },
      ],
      answer: 0,
      sayIt: "Say the truth and say sorry.",
      sayItEs: "Ejemplo: «Say the truth. Say sorry.»",
      sayItAskEn: "Did you ever forget something important?",
      sayItAskEs: "¿Alguna vez olvidaste algo importante?",
      sayItCheck: {
        target: "yes I *",
        altTargets: ["yes", "no", "yes I forgot *", "I forgot *"],
      },
    },
    {
      id: "q3",
      afterScene: "s11",
      questionEn: "Did Ana accept Mateo's apology?",
      questionEs: "¿Ana aceptó la disculpa de Mateo?",
      options: [
        { label: "Yes, she took the flowers", emoji: "💐" },
        { label: "No, she walked away", emoji: "🚶‍♀️" },
        { label: "She threw the flowers", emoji: "🗑️" },
      ],
      answer: 0,
      sayIt: "Yes, she did. She took the flowers.",
      sayItEs: "Ejemplo: «Yes, she did. She took the flowers.»",
      sayItAskEn: "When did YOU say sorry last time?",
      sayItAskEs: "¿Cuándo pediste perdón la última vez?",
      sayItCheck: {
        target: "I said sorry *",
        altTargets: ["yesterday", "last week", "I apologized *", "I don't remember"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s7",
    phrase: "Mistakes are part of the process.",
    es: "Los errores son parte del proceso.",
  },
  continuePrompt: {
    en: "Your turn! Tell about a day when you forgot something — or when you said sorry.",
    es: "¡Tu turno! Cuenta un día en que olvidaste algo — o en que pediste perdón.",
  },
  continueWith: [
    "Last week I forgot…",
    "I didn't…",
    "I felt…",
    "Then I said…",
  ],
  cliffhanger: {
    en: "Episode 9: Luis's Saturday. He did everything… except one thing. Vale checks.",
    es: "Episodio 9: El sábado de Luis. Hizo de todo… menos una cosa. Vale revisa.",
  },
};
