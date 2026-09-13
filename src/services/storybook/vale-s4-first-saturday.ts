import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/vale-s4-ep6/cover.jpg";
import s1 from "@/assets/storybook/vale-s4-ep6/s1.jpg";
import s2 from "@/assets/storybook/vale-s4-ep6/s2.jpg";
import s3 from "@/assets/storybook/vale-s4-ep6/s3.jpg";
import s4 from "@/assets/storybook/vale-s4-ep6/s4.jpg";
import s5 from "@/assets/storybook/vale-s4-ep6/s5.jpg";
import s6 from "@/assets/storybook/vale-s4-ep6/s6.jpg";
import s7 from "@/assets/storybook/vale-s4-ep6/s7.jpg";
import s8 from "@/assets/storybook/vale-s4-ep6/s8.jpg";
import s9 from "@/assets/storybook/vale-s4-ep6/s9.jpg";
import s10 from "@/assets/storybook/vale-s4-ep6/s10.jpg";
import s11 from "@/assets/storybook/vale-s4-ep6/s11.jpg";
import s12 from "@/assets/storybook/vale-s4-ep6/s12.jpg";

/**
 * Season 4 · Episode 6 — "The first Saturday class".
 * Matches Basic 3 / Past Stories Week 2 Day 6: he/she + simple past, other people's day.
 * Vale teaches her first Saturday class. Dani, a scholarship student, is not happy to be there.
 */
export const VALE_S4_FIRST_SATURDAY: StorybookEpisode = {
  id: "vale-s4-first-saturday",
  moduleId: "past-stories",
  week: 2,
  title: "The first Saturday class",
  titleEs: "La primera clase de sábado",
  episodeLabel: { en: "Season 4 · Episode 6", es: "Temporada 4 · Episodio 6" },
  previously: [
    { en: "Vale confirmed: she teaches every Saturday.", es: "Vale confirmó: enseña todos los sábados." },
    { en: "The boss tested her English. She passed.", es: "El jefe puso a prueba su inglés. Lo logró." },
    { en: "Now, Saturday morning arrived.", es: "Ahora, llegó la mañana del sábado." },
  ],
  reviewWords: [
    { word: "whole", es: "todo / entero" },
    { word: "breathed", es: "respiró" },
    { word: "proud", es: "orgullosos" },
    { word: "hugged", es: "abracé" },
  ],
  blurb: {
    en: "Vale's first day as a real teacher. Five students. One of them crossed his arms and looked away.",
    es: "El primer día de Vale como maestra de verdad. Cinco estudiantes. Uno cruzó los brazos y miró a otro lado.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Vale camina a la escuela con su bolso lleno de libros.",
      text: "Vale walked to the school with a heavy bag full of books.",
      es: "Vale caminó a la escuela con un bolso pesado lleno de libros.",
      words: [
        { word: "walked", es: "caminó" },
        { word: "school", es: "escuela" },
        { word: "heavy", es: "pesado" },
        { word: "bag", es: "bolso" },
        { word: "full", es: "lleno" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Vale abre la puerta del salón y respira.",
      text: "She opened the classroom door. Five students waited inside.",
      es: "Abrió la puerta del salón. Cinco estudiantes esperaban adentro.",
      words: [
        { word: "opened", es: "abrió" },
        { word: "classroom", es: "salón de clases" },
        { word: "waited", es: "esperaban" },
        { word: "inside", es: "adentro" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Vale saluda y los estudiantes responden.",
      text: '"Good morning! My name is Vale. I am your new teacher."',
      es: "«¡Buenos días! Me llamo Vale. Soy su nueva maestra».",
      speaker: "vale",
      words: [
        { word: "Good morning", es: "buenos días" },
        { word: "your", es: "su / tu" },
        { word: "new", es: "nueva" },
        { word: "teacher", es: "maestra" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Dani, en el fondo, cruza los brazos y mira a otro lado.",
      text: "But one student, Dani, crossed his arms and looked out the window.",
      es: "Pero un estudiante, Dani, cruzó los brazos y miró por la ventana.",
      speaker: "dani",
      words: [
        { word: "crossed", es: "cruzó" },
        { word: "his arms", es: "sus brazos" },
        { word: "looked", es: "miró" },
        { word: "window", es: "ventana" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Vale no se asusta; sonríe y empieza un juego de nombres.",
      text: "Vale did not worry. She smiled and started a name game.",
      es: "Vale no se preocupó. Sonrió y empezó un juego de nombres.",
      speaker: "vale",
      words: [
        { word: "did not worry", es: "no se preocupó" },
        { word: "smiled", es: "sonrió" },
        { word: "started", es: "empezó" },
        { word: "game", es: "juego" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Los estudiantes se ríen con el juego; Dani sigue serio.",
      text: "The students laughed and played. Dani did not play. He watched.",
      es: "Los estudiantes se rieron y jugaron. Dani no jugó. Él observó.",
      words: [
        { word: "laughed", es: "se rieron" },
        { word: "played", es: "jugaron" },
        { word: "did not play", es: "no jugó" },
        { word: "watched", es: "observó" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Vale le pregunta a Dani si desayunó.",
      text: '"Did you have breakfast, Dani?" Vale asked gently.',
      es: "«¿Desayunaste, Dani?», preguntó Vale con cariño.",
      speaker: "vale",
      words: [
        { word: "Did you have", es: "¿tuviste / desayunaste?" },
        { word: "breakfast", es: "desayuno" },
        { word: "asked", es: "preguntó" },
        { word: "gently", es: "con cariño" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Dani contesta bajito, sin mirar a Vale.",
      text: "\"No,\" Dani answered quietly. \"My grandma didn't cook today. She felt sick.\"",
      es: "«No», contestó Dani bajito. «Mi abuela no cocinó hoy. Se sintió enferma».",
      speaker: "dani",
      words: [
        { word: "answered", es: "contestó" },
        { word: "quietly", es: "bajito / en voz baja" },
        { word: "grandma", es: "abuela" },
        { word: "cook", es: "cocinar" },
        { word: "felt sick", es: "se sintió enferma" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Vale le ofrece a Dani su propio sándwich.",
      text: "Vale gave Dani her sandwich. \"Eat first. Then we learn.\"",
      es: "Vale le dio a Dani su sándwich. «Come primero. Luego aprendemos».",
      speaker: "vale",
      words: [
        { word: "gave", es: "dio" },
        { word: "sandwich", es: "sándwich" },
        { word: "eat", es: "comer" },
        { word: "first", es: "primero" },
        { word: "learn", es: "aprender" },
      ],
    },
    {
      id: "s10",
      image: s10,
      imageAlt: "Dani sonríe por primera vez mientras come.",
      text: "Dani ate the sandwich. Then, for the first time, he smiled.",
      es: "Dani comió el sándwich. Luego, por primera vez, sonrió.",
      words: [
        { word: "ate", es: "comió" },
        { word: "then", es: "luego / entonces" },
        { word: "first time", es: "primera vez" },
        { word: "smiled", es: "sonrió" },
      ],
    },
    {
      id: "s11",
      image: s11,
      imageAlt: "Al final, Dani participa y levanta la mano.",
      text: "At the end, Dani raised his hand. \"Teacher… I liked that game. Can we play it again?\"",
      es: "Al final, Dani levantó la mano. «Maestra… me gustó ese juego. ¿Podemos jugarlo otra vez?»",
      speaker: "dani",
      words: [
        { word: "At the end", es: "al final" },
        { word: "raised his hand", es: "levantó la mano" },
        { word: "bring", es: "traer" },
        { word: "again", es: "otra vez" },
        { word: "next week", es: "la próxima semana" },
      ],
    },
    {
      id: "s12",
      image: s12,
      imageAlt: "Vale sale feliz; su primera clase fue un éxito.",
      text: "Vale walked home with a full heart. Her first class worked. But Dani's grandma was still sick.",
      es: "Vale caminó a casa con el corazón lleno. Su primera clase funcionó. Pero la abuela de Dani seguía enferma.",
      words: [
        { word: "full heart", es: "corazón lleno" },
        { word: "worked", es: "funcionó" },
        { word: "still", es: "aún / todavía" },
        { word: "sick", es: "enferma" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s4",
      questionEn: "What did Dani do when class started?",
      questionEs: "¿Qué hizo Dani cuando empezó la clase?",
      options: [
        { label: "He crossed his arms", emoji: "😒" },
        { label: "He sang a song", emoji: "🎤" },
        { label: "He ran to the board", emoji: "🏃" },
      ],
      answer: 0,
      sayIt: "Dani crossed his arms and looked away.",
      sayItEs: "Ejemplo: «Dani crossed his arms.»",
      sayItAskEn: "Did YOU ever feel nervous on a first day?",
      sayItAskEs: "¿Alguna vez te sentiste nervioso/a en un primer día?",
      sayItCheck: {
        target: "yes I *",
        altTargets: ["yes", "no", "I was nervous", "I felt *"],
      },
    },
    {
      id: "q2",
      afterScene: "s8",
      questionEn: "Why didn't Dani have breakfast?",
      questionEs: "¿Por qué no desayunó Dani?",
      options: [
        { label: "His grandma felt sick", emoji: "🤒" },
        { label: "He doesn't like food", emoji: "🍔" },
        { label: "He woke up late", emoji: "⏰" },
      ],
      answer: 0,
      sayIt: "His grandma didn't cook. She felt sick.",
      sayItEs: "Ejemplo: «She didn't cook. She felt sick.»",
      sayItAskEn: "What did YOU eat for breakfast today?",
      sayItAskEs: "¿Qué desayunaste hoy?",
      sayItCheck: {
        target: "I ate *",
        altTargets: ["I had *", "I didn't eat *", "nothing", "I drank *"],
      },
    },
    {
      id: "q3",
      afterScene: "s11",
      questionEn: "Did Dani like the class in the end?",
      questionEs: "¿Al final le gustó la clase a Dani?",
      options: [
        { label: "Yes, he raised his hand", emoji: "🙋" },
        { label: "No, he left early", emoji: "🚪" },
        { label: "He fell asleep", emoji: "😴" },
      ],
      answer: 0,
      sayIt: "Yes, he did. He raised his hand.",
      sayItEs: "Ejemplo: «Yes, he did. He raised his hand.»",
      sayItAskEn: "Did you like your first English class?",
      sayItAskEs: "¿Te gustó tu primera clase de inglés?",
      sayItCheck: {
        target: "yes I did",
        altTargets: ["yes", "yes I liked it", "I liked it", "no I didn't"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s6",
    phrase: "Mistakes are part of the process.",
    es: "Los errores son parte del proceso.",
  },
  continuePrompt: {
    en: "Your turn! Talk about another person's day yesterday — your mom, a friend, a classmate.",
    es: "¡Tu turno! Habla del día de ayer de otra persona: tu mamá, un amigo, un compañero.",
  },
  continueWith: [
    "He/She woke up at…",
    "He/She didn't…",
    "He/She ate…",
    "At the end, he/she…",
  ],
  cliffhanger: {
    en: "Episode 7: Kat's Saturday. She didn't work — so what did she do? One answer surprises Vale.",
    es: "Episodio 7: El sábado de Kat. No trabajó — ¿entonces qué hizo? Una respuesta sorprende a Vale.",
  },
};
