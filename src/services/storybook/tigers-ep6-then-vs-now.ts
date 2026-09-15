import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/tigers-ep6-then-vs-now/cover.jpg";
import s1 from "@/assets/storybook/tigers-ep6-then-vs-now/s1.jpg";
import s2 from "@/assets/storybook/tigers-ep6-then-vs-now/s2.jpg";
import s3 from "@/assets/storybook/tigers-ep6-then-vs-now/s3.jpg";
import s4 from "@/assets/storybook/tigers-ep6-then-vs-now/s4.jpg";
import s5 from "@/assets/storybook/tigers-ep6-then-vs-now/s5.jpg";
import s6 from "@/assets/storybook/tigers-ep6-then-vs-now/s6.jpg";
import s7 from "@/assets/storybook/tigers-ep6-then-vs-now/s7.jpg";
import s8 from "@/assets/storybook/tigers-ep6-then-vs-now/s8.jpg";
import s9 from "@/assets/storybook/tigers-ep6-then-vs-now/s9.jpg";
import s10 from "@/assets/storybook/tigers-ep6-then-vs-now/s10.jpg";
import s11 from "@/assets/storybook/tigers-ep6-then-vs-now/s11.jpg";

/**
 * Season 7 (Tigers) Episode 6 — "Then vs now".
 * Matches Tigers Day 6 (past progressive + present progressive: what was
 * happening then vs. what is happening now).
 */
export const TIGERS_EP6_THEN_VS_NOW: StorybookEpisode = {
  id: "tigers-ep6-then-vs-now",
  moduleId: "tigers",
  week: 2,
  title: "Then vs now",
  titleEs: "Antes contra ahora",
  episodeLabel: { en: "Season 7 · Episode 6", es: "Temporada 7 · Episodio 6" },
  previously: [
    { en: "BigTalk offered to buy the school.", es: "BigTalk ofreció comprar la escuela." },
    { en: "Everyone answered: what would you do?", es: "Todos respondieron: ¿qué harías tú?" },
    { en: "Vale said no — the school is not for sale.", es: "Vale dijo que no: la escuela no está en venta." },
  ],
  reviewWords: [
    { word: "offer", es: "oferta" },
    { word: "purpose", es: "propósito" },
    { word: "sale", es: "venta" },
  ],
  blurb: {
    en: "Cleaning the reception, Vale finds an old photo from the call center. A year ago she was answering calls; now she is running a school.",
    es: "Limpiando la recepción, Vale encuentra una foto vieja del call center. Hace un año contestaba llamadas; ahora dirige una escuela.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Vale y Camila limpian la recepción y encuentran una caja de cosas viejas.",
      text: "Saturday, cleaning day. Under a pile of old papers, Camila found a shoebox full of photos.",
      es: "Sábado, día de limpieza. Debajo de una pila de papeles viejos, Camila encontró una caja de zapatos llena de fotos.",
      speaker: "narrator",
      lines: [
        { speaker: "camila", text: "Vale, look what I found under all these papers.", es: "«Vale, mira lo que encontré debajo de estos papeles»." },
        { speaker: "vale", text: "My shoebox! I thought I lost it in the move.", es: "«¡Mi caja de zapatos! Pensé que la había perdido en la mudanza»." },
        { speaker: "dani", text: "What's inside?", es: "«¿Qué hay adentro?»" },
      ],
      words: [
        { word: "pile", es: "pila" },
        { word: "shoebox", es: "caja de zapatos" },
        { word: "lost", es: "perdida" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "La foto: Vale joven con diadema del call center, sonriendo con cansancio.",
      text: "In this photo I was working at the call center. It was my first year.",
      es: "«En esta foto estaba trabajando en el call center. Era mi primer año».",
      speaker: "vale",
      lines: [
        { speaker: "vale", text: "Here. In this photo I was working at the call center.", es: "«Aquí. En esta foto estaba trabajando en el call center»." },
        { speaker: "vale", text: "I was answering sixty calls a day, and my English was still shaky.", es: "«Contestaba sesenta llamadas al día y mi inglés todavía era inseguro»." },
        { speaker: "dani", text: "Shaky? You? I don't believe it.", es: "«¿Inseguro? ¿Tú? No lo creo»." },
      ],
      words: [
        { word: "answering", es: "contestando" },
        { word: "calls", es: "llamadas" },
        { word: "shaky", es: "inseguro / tembloroso" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Recuerdo: Vale practicando frases frente al espejo del baño en su descanso.",
      text: "While everyone was eating lunch, I was practicing sentences in front of the bathroom mirror.",
      es: "«Mientras todos almorzaban, yo estaba practicando frases frente al espejo del baño».",
      speaker: "vale",
      lines: [
        { speaker: "vale", text: "Look at this one. My break time.", es: "«Mira esta. Mi hora de descanso»." },
        { speaker: "vale", text: "While everyone was eating lunch, I was practicing sentences in the bathroom mirror.", es: "«Mientras todos almorzaban, yo practicaba frases en el espejo del baño»." },
        { speaker: "camila", text: "In the bathroom? Really?", es: "«¿En el baño? ¿En serio?»" },
        { speaker: "vale", text: "It was the only quiet place in the whole building.", es: "«Era el único lugar silencioso de todo el edificio»." },
      ],
      words: [
        { word: "break", es: "descanso" },
        { word: "mirror", es: "espejo" },
        { word: "quiet", es: "silencioso" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Recuerdo: Kat corrige a Vale con una sonrisa en el pasillo del call center.",
      text: "Kat was correcting my pronunciation every single day.",
      es: "«Kat estaba corrigiendo mi pronunciación todos los días».",
      speaker: "vale",
      lines: [
        { speaker: "vale", text: "And this is Kat, my first coach.", es: "«Y esta es Kat, mi primera coach»." },
        { speaker: "vale", text: "She was correcting my pronunciation every single day, in the hallway, between calls.", es: "«Corregía mi pronunciación todos los días, en el pasillo, entre llamadas»." },
        { speaker: "dani", text: "Was she nice?", es: "«¿Era buena onda?»" },
        { speaker: "vale", text: "She was strict. But strict people were building my English.", es: "«Era estricta. Pero la gente estricta estaba construyendo mi inglés»." },
      ],
      words: [
        { word: "coach", es: "entrenadora" },
        { word: "strict", es: "estricta" },
        { word: "hallway", es: "pasillo" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Dani compara la foto con la oficina actual, señalando alrededor.",
      text: "A year ago you were practicing in a bathroom. Now you're running a whole school.",
      es: "«Hace un año practicabas en un baño. Ahora estás dirigiendo una escuela completa».",
      speaker: "dani",
      lines: [
        { speaker: "dani", text: "Wow. A year ago you were practicing in a bathroom.", es: "«Wow. Hace un año practicabas en un baño»." },
        { speaker: "dani", text: "And now you're running a whole school and fighting a giant company.", es: "«Y ahora estás dirigiendo una escuela completa y peleando con una empresa gigante»." },
        { speaker: "vale", text: "Life changes fast when you practice every day.", es: "«La vida cambia rápido cuando practicas todos los días»." },
      ],
      words: [
        { word: "running", es: "dirigiendo" },
        { word: "fighting", es: "peleando" },
        { word: "whole", es: "completa" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Vale muestra otra foto: su mamá cocinando mientras ella estudiaba en la mesa.",
      text: "My mom was cooking dinner, and I was studying verbs at the same table, every night.",
      es: "«Mi mamá estaba cocinando la cena y yo estaba estudiando verbos en la misma mesa, cada noche».",
      speaker: "vale",
      lines: [
        { speaker: "vale", text: "This one is my favorite. Look.", es: "«Esta es mi favorita. Miren»." },
        { speaker: "vale", text: "My mom was cooking dinner, and I was studying verbs at the same table, every night.", es: "«Mi mamá cocinaba la cena y yo estudiaba verbos en la misma mesa, cada noche»." },
        { speaker: "camila", text: "And now? Are you still studying at night?", es: "«¿Y ahora? ¿Todavía estás estudiando de noche?»" },
        { speaker: "vale", text: "Now I'm studying business. The table is the same. The dream is bigger.", es: "«Ahora estoy estudiando negocios. La mesa es la misma. El sueño es más grande»." },
      ],
      words: [
        { word: "cooking", es: "cocinando" },
        { word: "studying", es: "estudiando" },
        { word: "bigger", es: "más grande" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Dani mira su propio teléfono y encuentra una foto vieja de él repartiendo comida.",
      text: "Look at me! I was delivering food on a bicycle. Now I'm learning English and running a front desk.",
      es: "«¡Mírenme! Yo estaba repartiendo comida en bicicleta. Ahora estoy aprendiendo inglés y atendiendo una recepción».",
      speaker: "dani",
      lines: [
        { speaker: "dani", text: "I have one too! Look at me two years ago.", es: "«¡Yo también tengo una! Mírenme hace dos años»." },
        { speaker: "dani", text: "I was delivering food on a bicycle in the rain.", es: "«Estaba repartiendo comida en bicicleta bajo la lluvia»." },
        { speaker: "dani", text: "Now I'm learning English and I'm running the front desk of a school.", es: "«Ahora estoy aprendiendo inglés y atiendo la recepción de una escuela»." },
      ],
      words: [
        { word: "delivering", es: "repartiendo" },
        { word: "rain", es: "lluvia" },
        { word: "front desk", es: "recepción" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Camila recuerda: estaba trabajando en una tienda; ahora está diseñando talleres.",
      text: "I was working in a store, folding shirts. Now I'm designing workshops.",
      es: "«Yo estaba trabajando en una tienda, doblando camisas. Ahora estoy diseñando talleres».",
      speaker: "camila",
      lines: [
        { speaker: "camila", text: "My turn. I was working in a store, folding shirts all day.", es: "«Mi turno. Yo trabajaba en una tienda, doblando camisas todo el día»." },
        { speaker: "camila", text: "Now I'm designing workshops and I'm leading a team meeting next week.", es: "«Ahora estoy diseñando talleres y voy a dirigir una reunión la próxima semana»." },
        { speaker: "vale", text: "Do you see the pattern? Everyone here was doing something small…", es: "«¿Ven el patrón? Todos aquí estaban haciendo algo pequeño…»" },
        { speaker: "vale", text: "…and now everyone is building something big.", es: "«…y ahora todos están construyendo algo grande»." },
      ],
      words: [
        { word: "folding", es: "doblando" },
        { word: "designing", es: "diseñando" },
        { word: "pattern", es: "patrón" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Vale pega la foto del call center en la pared nueva de la recepción.",
      text: "Vale put the old photo on the reception wall, next to the new schedule.",
      es: "Vale puso la foto vieja en la pared de la recepción, junto al horario nuevo.",
      speaker: "narrator",
      lines: [
        { speaker: "dani", text: "Why are you putting that on the wall? It's your old life.", es: "«¿Por qué la pones en la pared? Es tu vida vieja»." },
        { speaker: "vale", text: "Because students need to see it. I wasn't born speaking English.", es: "«Porque los estudiantes necesitan verla. No nací hablando inglés»." },
        { speaker: "vale", text: "I was practicing in a bathroom. If I could do it, they can do it.", es: "«Yo practicaba en un baño. Si yo pude, ellos pueden»." },
      ],
      words: [
        { word: "born", es: "nacida" },
        { word: "could", es: "pude" },
        { word: "practicing", es: "practicando" },
      ],
    },
    {
      id: "s10",
      image: s10,
      imageAlt: "El equipo mira la pared terminada: foto vieja, horario nuevo, taller gratis.",
      text: "The wall now told the whole story: where we were, and where we are going.",
      es: "La pared ahora contaba toda la historia: dónde estábamos y a dónde vamos.",
      speaker: "narrator",
      lines: [
        { speaker: "camila", text: "The wall looks perfect. Old photo, new schedule, free workshop.", es: "«La pared se ve perfecta. Foto vieja, horario nuevo, taller gratis»." },
        { speaker: "vale", text: "It's the story of this school: then and now.", es: "«Es la historia de esta escuela: antes y ahora»." },
        { speaker: "dani", text: "And next year? What will we be doing?", es: "«¿Y el próximo año? ¿Qué estaremos haciendo?»" },
      ],
      words: [
        { word: "perfect", es: "perfecta" },
        { word: "story", es: "historia" },
        { word: "next", es: "próximo" },
      ],
    },
    {
      id: "s11",
      image: s11,
      imageAlt: "Vale repasa la comparación antes y ahora frente a la pared.",
      text: "Vale reviews then vs now, one more time, out loud.",
      es: "Vale repasa el antes y el ahora, una vez más, en voz alta.",
      speaker: "vale",
      lines: [
        { speaker: "camila", text: "One more time, boss. Then and now.", es: "«Una vez más, jefa. Antes y ahora»." },
        { speaker: "vale", text: "A year ago, I was answering calls and I was practicing in a bathroom.", es: "«Hace un año, estaba contestando llamadas y practicaba en un baño»." },
        { speaker: "vale", text: "Right now, I'm running my school and I'm studying business at night.", es: "«Ahora mismo, estoy dirigiendo mi escuela y estoy estudiando negocios de noche»." },
        { speaker: "vale", text: "I wasn't born ready. I was practicing while others were resting.", es: "«No nací lista. Estaba practicando mientras otros descansaban»." },
      ],
      words: [
        { word: "ready", es: "lista" },
        { word: "resting", es: "descansando" },
        { word: "others", es: "otros" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s3",
      questionEn: "What was Vale doing while everyone was eating lunch?",
      questionEs: "¿Qué estaba haciendo Vale mientras todos almorzaban?",
      options: [
        { label: "She was practicing sentences in the bathroom mirror", emoji: "🪞" },
        { label: "She was sleeping under her desk", emoji: "😴" },
        { label: "She was selling photos", emoji: "📸" },
      ],
      answer: 0,
      sayIt: "While everyone was eating lunch, I was practicing sentences.",
      sayItEs: "Ejemplo: «While everyone was eating lunch, I was practicing sentences.»",
      sayItAskEn: "What were you doing last year at this time? Tell me one thing.",
      sayItAskEs: "¿Qué estabas haciendo el año pasado en esta época? Dime una cosa.",
      sayItCheck: {
        target: "I was *",
        altTargets: ["Last year I was *", "I was *ing *", "A year ago, I was *"],
      },
    },
    {
      id: "q2",
      afterScene: "s7",
      questionEn: "What was Dani doing two years ago, and what is he doing now?",
      questionEs: "¿Qué estaba haciendo Dani hace dos años y qué está haciendo ahora?",
      options: [
        { label: "He was delivering food; now he's learning English", emoji: "🚲" },
        { label: "He was teaching English; now he delivers food", emoji: "🍕" },
        { label: "He was traveling; now he's resting", emoji: "🌴" },
      ],
      answer: 0,
      sayIt: "Two years ago I was delivering food. Now I'm learning English.",
      sayItEs: "Ejemplo: «Two years ago I was delivering food. Now I'm learning English.»",
      sayItAskEn: "Compare yourself: what were you doing before, and what are you doing now?",
      sayItAskEs: "Compárate: ¿qué estabas haciendo antes y qué estás haciendo ahora?",
      sayItCheck: {
        target: "I was *, and now I am *",
        altTargets: ["Before I was *, now I'm *", "I was *ing. Right now I am *ing", "I was *ing. Right now I'm *ing"],
      },
    },
    {
      id: "q3",
      afterScene: "s9",
      questionEn: "Why did Vale put the old photo on the wall?",
      questionEs: "¿Por qué Vale puso la foto vieja en la pared?",
      options: [
        { label: "So students see she wasn't born speaking English", emoji: "🖼️" },
        { label: "Because the wall was empty", emoji: "🧱" },
        { label: "To hide a hole in the wall", emoji: "🕳️" },
      ],
      answer: 0,
      sayIt: "I wasn't born speaking English. I was practicing every day.",
      sayItEs: "Ejemplo: «I wasn't born speaking English. I was practicing every day.»",
      sayItAskEn: "Why are you changing? What is making you better now?",
      sayItAskEs: "¿Por qué estás cambiando? ¿Qué te está haciendo mejor ahora?",
      sayItCheck: {
        target: "I am *ing because *",
        altTargets: ["I'm *ing because *", "* is making me better", "Now I am *ing because *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s8",
    phrase: "English is easy. I was born ready to learn, one day at a time.",
    es: "El inglés es fácil. Nací listo para aprender, un día a la vez.",
  },
  habitCard: {
    afterScene: "s3",
    phrase: "I use the small moments. Five quiet minutes a day build a new life.",
    es: "Uso los momentos pequeños. Cinco minutos de silencio al día construyen una vida nueva.",
    model: "vale",
    modelActionEs: "Vale practicaba en los descansos, en el único lugar silencioso que tenía.",
  },
  continuePrompt: {
    en: "Compare your life: what were you doing a year ago? What are you doing right now? Why did it change?",
    es: "Compara tu vida: ¿qué estabas haciendo hace un año? ¿Qué estás haciendo ahora mismo? ¿Por qué cambió?",
  },
  continueWith: ["A year ago, I was ...", "Right now, I am ...", "It changed because ..."],
  cliffhanger: {
    en: "Episode 7: Bryan challenges Vale in front of a client: have you ever taught a company?",
    es: "Episodio 7: Bryan reta a Vale frente a un cliente: ¿alguna vez has enseñado a una empresa?",
  },
};
