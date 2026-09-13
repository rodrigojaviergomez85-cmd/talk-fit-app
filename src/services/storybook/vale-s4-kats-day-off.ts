import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/vale-s4-ep7/cover.jpg";
import s1 from "@/assets/storybook/vale-s4-ep7/s1.jpg";
import s2 from "@/assets/storybook/vale-s4-ep7/s2.jpg";
import s3 from "@/assets/storybook/vale-s4-ep7/s3.jpg";
import s4 from "@/assets/storybook/vale-s4-ep7/s4.jpg";
import s5 from "@/assets/storybook/vale-s4-ep7/s5.jpg";
import s6 from "@/assets/storybook/vale-s4-ep7/s6.jpg";
import s7 from "@/assets/storybook/vale-s4-ep7/s7.jpg";
import s8 from "@/assets/storybook/vale-s4-ep7/s8.jpg";
import s9 from "@/assets/storybook/vale-s4-ep7/s9.jpg";
import s10 from "@/assets/storybook/vale-s4-ep7/s10.jpg";
import s11 from "@/assets/storybook/vale-s4-ep7/s11.jpg";
import s12 from "@/assets/storybook/vale-s4-ep7/s12.jpg";

/**
 * Season 4 · Episode 7 — "Kat's day off".
 * Matches Basic 3 / Past Stories Week 2 Day 7: what did she do? — Did/Didn't.
 * Kat had Saturday off. Vale asks her everything. One answer surprises her.
 */
export const VALE_S4_KATS_DAY_OFF: StorybookEpisode = {
  id: "vale-s4-kats-day-off",
  moduleId: "past-stories",
  week: 2,
  title: "Kat's day off",
  titleEs: "El día libre de Kat",
  episodeLabel: { en: "Season 4 · Episode 7", es: "Temporada 4 · Episodio 7" },
  previously: [
    { en: "Vale taught her first Saturday class.", es: "Vale enseñó su primera clase de sábado." },
    { en: "Dani didn't want to be there… at first.", es: "Dani no quería estar ahí… al principio." },
    { en: "Kat had the same Saturday free.", es: "Kat tuvo libre ese mismo sábado." },
  ],
  reviewWords: [
    { word: "raised his hand", es: "levantó la mano" },
    { word: "gently", es: "con cariño" },
    { word: "sandwich", es: "sándwich" },
    { word: "full heart", es: "corazón lleno" },
  ],
  blurb: {
    en: "Kat didn't work on Saturday. No calls, no customers. So what did she do all day? Vale wants every detail.",
    es: "Kat no trabajó el sábado. Sin llamadas, sin clientes. ¿Entonces qué hizo todo el día? Vale quiere cada detalle.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Kat se despierta tarde y estira los brazos, feliz.",
      text: "Kat woke up late on Saturday. No alarm. No uniform. Just free time.",
      es: "Kat se despertó tarde el sábado. Sin alarma. Sin uniforme. Solo tiempo libre.",
      speaker: "kat",
      words: [
        { word: "woke up late", es: "se despertó tarde" },
        { word: "alarm", es: "alarma" },
        { word: "uniform", es: "uniforme" },
        { word: "free time", es: "tiempo libre" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Kat cocina pancakes en su cocina.",
      text: "She cooked a big breakfast: pancakes, eggs and sweet coffee.",
      es: "Cocinó un desayuno grande: pancakes, huevos y café dulce.",
      speaker: "kat",
      words: [
        { word: "cooked", es: "cocinó" },
        { word: "big breakfast", es: "desayuno grande" },
        { word: "pancakes", es: "pancakes / panqueques" },
        { word: "sweet", es: "dulce" },
        { word: "coffee", es: "café" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Kat llama a su abuela por teléfono.",
      text: "Then she called her grandma. They talked for one whole hour.",
      es: "Luego llamó a su abuela. Hablaron por una hora entera.",
      speaker: "kat",
      words: [
        { word: "called", es: "llamó" },
        { word: "grandma", es: "abuela" },
        { word: "talked", es: "hablaron" },
        { word: "hour", es: "hora" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Kat no limpió su cuarto; la ropa está en la silla.",
      text: "Did she clean her room? No, she didn't. The clothes stayed on the chair.",
      es: "¿Limpió su cuarto? No, no lo hizo. La ropa se quedó en la silla.",
      speaker: "kat",
      words: [
        { word: "clean", es: "limpiar" },
        { word: "room", es: "cuarto" },
        { word: "clothes", es: "ropa" },
        { word: "stayed", es: "se quedó" },
        { word: "chair", es: "silla" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Kat sale a caminar al parque con audífonos.",
      text: "In the afternoon she walked to the park and listened to music.",
      es: "En la tarde caminó al parque y escuchó música.",
      speaker: "kat",
      words: [
        { word: "afternoon", es: "tarde" },
        { word: "walked", es: "caminó" },
        { word: "park", es: "parque" },
        { word: "listened", es: "escuchó" },
        { word: "music", es: "música" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Kat compra un helado en el parque.",
      text: "She bought an ice cream and sat under a big tree.",
      es: "Compró un helado y se sentó bajo un árbol grande.",
      speaker: "kat",
      words: [
        { word: "bought", es: "compró" },
        { word: "ice cream", es: "helado" },
        { word: "sat", es: "se sentó" },
        { word: "tree", es: "árbol" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Kat no revisó su correo; el teléfono boca abajo.",
      text: "Did she check her email? No! She didn't open her computer all day.",
      es: "¿Revisó su correo? ¡No! No abrió su computadora en todo el día.",
      speaker: "kat",
      words: [
        { word: "check", es: "revisar" },
        { word: "email", es: "correo" },
        { word: "open", es: "abrir" },
        { word: "all day", es: "todo el día" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Kat en su cuarto de noche, escribiendo en un cuaderno.",
      text: "At night she did one secret thing. She wrote two pages in English in her notebook.",
      es: "En la noche hizo una cosa secreta. Escribió dos páginas en inglés en su cuaderno.",
      speaker: "kat",
      words: [
        { word: "secret", es: "secreta" },
        { word: "wrote", es: "escribió" },
        { word: "pages", es: "páginas" },
        { word: "notebook", es: "cuaderno" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Vale, sorprendida y feliz, escucha a Kat en la oficina.",
      text: '"You wrote in English? On your free day?" Vale asked, surprised.',
      es: "«¿Escribiste en inglés? ¿En tu día libre?», preguntó Vale, sorprendida.",
      speaker: "vale",
      words: [
        { word: "your free day", es: "tu día libre" },
        { word: "asked", es: "preguntó" },
        { word: "surprised", es: "sorprendida" },
      ],
    },
    {
      id: "s10",
      image: s10,
      imageAlt: "Kat sonríe orgullosa y muestra su cuaderno.",
      text: '"Yes! I want to be ready. Maybe one day I will teach too," Kat smiled.',
      es: "«¡Sí! Quiero estar lista. Quizás un día yo también enseñe», sonrió Kat.",
      speaker: "kat",
      words: [
        { word: "ready", es: "lista" },
        { word: "maybe", es: "quizás" },
        { word: "one day", es: "un día" },
        { word: "teach", es: "enseñar" },
        { word: "too", es: "también" },
      ],
    },
    {
      id: "s11",
      image: s11,
      imageAlt: "Vale abraza a Kat, emocionada.",
      text: "Vale hugged her. \"Kat, that's the best news of my week.\"",
      es: "Vale la abrazó. «Kat, esa es la mejor noticia de mi semana».",
      speaker: "vale",
      words: [
        { word: "hugged", es: "abrazó" },
        { word: "best", es: "mejor" },
        { word: "news", es: "noticia" },
        { word: "week", es: "semana" },
      ],
    },
    {
      id: "s12",
      image: s12,
      imageAlt: "Kat y Vale caminan juntas por la oficina, felices.",
      text: "A day off gave Kat rest. But her dream didn't rest. It grew.",
      es: "Un día libre le dio descanso a Kat. Pero su sueño no descansó. Creció.",
      words: [
        { word: "rest", es: "descanso" },
        { word: "dream", es: "sueño" },
        { word: "grew", es: "creció" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s3",
      questionEn: "Who did Kat call on Saturday?",
      questionEs: "¿A quién llamó Kat el sábado?",
      options: [
        { label: "Her grandma", emoji: "👵" },
        { label: "Her boss", emoji: "👔" },
        { label: "A customer", emoji: "📞" },
      ],
      answer: 0,
      sayIt: "She called her grandma.",
      sayItEs: "Ejemplo: «She called her grandma.»",
      sayItAskEn: "Who did YOU call or text yesterday?",
      sayItAskEs: "¿A quién llamaste o escribiste ayer?",
      sayItCheck: {
        target: "I called *",
        altTargets: ["I texted *", "I wrote to *", "nobody", "my *"],
      },
    },
    {
      id: "q2",
      afterScene: "s7",
      questionEn: "Did Kat clean her room and check her email?",
      questionEs: "¿Kat limpió su cuarto y revisó su correo?",
      options: [
        { label: "No, she didn't do either", emoji: "🙅‍♀️" },
        { label: "Yes, both", emoji: "✅" },
        { label: "Only the email", emoji: "📧" },
      ],
      answer: 0,
      sayIt: "She didn't clean and she didn't check her email.",
      sayItEs: "Ejemplo: «She didn't clean her room.»",
      sayItAskEn: "Did you clean your room yesterday?",
      sayItAskEs: "¿Limpiaste tu cuarto ayer?",
      sayItCheck: {
        target: "yes I did",
        altTargets: ["no I didn't", "yes", "no"],
      },
    },
    {
      id: "q3",
      afterScene: "s10",
      questionEn: "What was Kat's secret activity at night?",
      questionEs: "¿Cuál fue la actividad secreta de Kat en la noche?",
      options: [
        { label: "She wrote in English", emoji: "✍️" },
        { label: "She watched movies", emoji: "🎬" },
        { label: "She made pupusas", emoji: "🫓" },
      ],
      answer: 0,
      sayIt: "She wrote two pages in English.",
      sayItEs: "Ejemplo: «She wrote in English.»",
      sayItAskEn: "Did you practice English yesterday? What did you do?",
      sayItAskEs: "¿Practicaste inglés ayer? ¿Qué hiciste?",
      sayItCheck: {
        target: "I *",
        altTargets: ["yes I did", "yes", "I practiced *", "I studied *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s8",
    phrase: "I believe in myself.",
    es: "Creo en mí.",
  },
  continuePrompt: {
    en: "Your turn! Describe your last free day — what did you do, and what didn't you do?",
    es: "¡Tu turno! Describe tu último día libre: ¿qué hiciste y qué no hiciste?",
  },
  continueWith: [
    "On my free day I woke up…",
    "I did…",
    "I didn't…",
    "At night I…",
  ],
  cliffhanger: {
    en: "Episode 8: Mateo forgot something important on Saturday. Ana is not happy.",
    es: "Episodio 8: Mateo olvidó algo importante el sábado. Ana no está feliz.",
  },
};
