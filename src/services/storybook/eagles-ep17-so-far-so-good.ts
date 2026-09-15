import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/eagles-ep17-so-far-so-good/cover.jpg";
import s1 from "@/assets/storybook/eagles-ep17-so-far-so-good/s1.jpg";
import s2 from "@/assets/storybook/eagles-ep17-so-far-so-good/s2.jpg";
import s3 from "@/assets/storybook/eagles-ep17-so-far-so-good/s3.jpg";
import s4 from "@/assets/storybook/eagles-ep17-so-far-so-good/s4.jpg";
import s5 from "@/assets/storybook/eagles-ep17-so-far-so-good/s5.jpg";
import s6 from "@/assets/storybook/eagles-ep17-so-far-so-good/s6.jpg";
import s7 from "@/assets/storybook/eagles-ep17-so-far-so-good/s7.jpg";
import s8 from "@/assets/storybook/eagles-ep17-so-far-so-good/s8.jpg";
import s9 from "@/assets/storybook/eagles-ep17-so-far-so-good/s9.jpg";
import s10 from "@/assets/storybook/eagles-ep17-so-far-so-good/s10.jpg";

/**
 * Season 6 (Eagles) Episode 17 — "So far, so good".
 * Eagles day 17: present perfect — already · yet · so far.
 */
export const EAGLES_EP17_SO_FAR_SO_GOOD: StorybookEpisode = {
  id: "eagles-ep17-so-far-so-good",
  moduleId: "eagles-week-1",
  week: 4,
  title: "So far, so good",
  titleEs: "Hasta ahora, bien",
  episodeLabel: { en: "Season 6 · Episode 17", es: "Temporada 6 · Episodio 17" },
  previously: [
    { en: "Vale got her first passport.", es: "Vale sacó su primer pasaporte." },
    { en: "The trip is in six days.", es: "El viaje es en seis días." },
    { en: "The checklist is still full.", es: "La lista sigue llena." },
  ],
  reviewWords: [
    { word: "already", es: "ya" },
    { word: "yet", es: "todavía" },
    { word: "so far", es: "hasta ahora" },
  ],
  blurb: {
    en: "Six days, one checklist, and a team that has done more than it thinks.",
    es: "Seis días, una lista y un equipo que ha hecho más de lo que cree.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "The team stands in front of a big checklist with empty boxes.",
      text: "7:30 a.m. Eleven boxes. Four checked.",
      es: "7:30 a.m. Once casillas. Cuatro marcadas.",
      speaker: "dani",
      lines: [
        { speaker: "dani", text: "We have already finished the schedule and the materials.", es: "«Ya hemos terminado el horario y los materiales»." },
        { speaker: "vale", text: "We have not recorded the student videos yet.", es: "«Todavía no hemos grabado los videos de los estudiantes»." },
        { speaker: "dani", text: "So far we are winning. Barely.", es: "«Hasta ahora vamos ganando. Apenas»." },
      ],
      words: [
        { word: "already", es: "ya" },
        { word: "materials", es: "materiales" },
        { word: "barely", es: "apenas" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Camila checks the contract documents one by one on a desk.",
      text: "Camila attacks the paperwork.",
      es: "Camila ataca el papeleo.",
      speaker: "camila",
      lines: [
        { speaker: "camila", text: "I have already sent the invoice and the insurance.", es: "«Ya he enviado la factura y el seguro»." },
        { speaker: "vale", text: "Have you signed the hotel reservation yet?", es: "«¿Ya firmaste la reservación del hotel?»" },
        { speaker: "camila", text: "Not yet. The cheapest one has answered nothing so far.", es: "«Todavía no. El más barato no ha contestado nada hasta ahora»." },
      ],
      words: [
        { word: "invoice", es: "factura" },
        { word: "insurance", es: "seguro" },
        { word: "reservation", es: "reservación" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Students record short videos in front of a phone on a tripod.",
      text: "The students record their own proof.",
      es: "Los estudiantes graban su propia prueba.",
      speaker: "kat",
      lines: [
        { speaker: "kat", text: "I have already recorded mine. Twice.", es: "«Ya grabé el mío. Dos veces»." },
        { speaker: "beto", text: "I have not spoken to a camera yet. I am scared.", es: "«Todavía no le he hablado a una cámara. Tengo miedo»." },
        { speaker: "kat", text: "So far you have survived everything. Say it once.", es: "«Hasta ahora has sobrevivido a todo. Dilo una vez»." },
      ],
      words: [
        { word: "recorded", es: "grabado" },
        { word: "camera", es: "cámara" },
        { word: "survived", es: "sobrevivido" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Beto speaks to the camera for the first time, sweating a little.",
      text: "Beto records take number one.",
      es: "Beto graba la toma número uno.",
      speaker: "beto",
      lines: [
        { speaker: "beto", text: "My name is Beto. I have studied English for four months.", es: "«Me llamo Beto. He estudiado inglés por cuatro meses»." },
        { speaker: "vale", text: "Keep going. What have you achieved so far?", es: "«Sigue. ¿Qué has logrado hasta ahora?»" },
        { speaker: "beto", text: "I have sold shoes to two tourists in English!", es: "«¡He vendido zapatos a dos turistas en inglés!»" },
      ],
      words: [
        { word: "months", es: "meses" },
        { word: "achieved", es: "logrado" },
        { word: "tourists", es: "turistas" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Luis records his video in the Northline office with coworkers behind.",
      text: "Luis records in the office where he was afraid.",
      es: "Luis graba en la oficina donde tenía miedo.",
      speaker: "luis",
      lines: [
        { speaker: "luis", text: "I have taken four calls in English this week. Zero last month.", es: "«He tomado cuatro llamadas en inglés esta semana. Cero el mes pasado»." },
        { speaker: "vale", text: "Have you told your family yet?", es: "«¿Ya se lo dijiste a tu familia?»" },
        { speaker: "luis", text: "Not yet. I want one more week of proof.", es: "«Todavía no. Quiero una semana más de pruebas»." },
      ],
      words: [
        { word: "calls", es: "llamadas" },
        { word: "family", es: "familia" },
        { word: "proof", es: "prueba" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Vale and the new teacher review group B's progress together.",
      text: "The new teacher reports her first week.",
      es: "La maestra nueva reporta su primera semana.",
      speaker: "ana",
      lines: [
        { speaker: "ana", text: "Group B has already finished unit two. Nobody has left yet.", es: "«El grupo B ya terminó la unidad dos. Nadie se ha ido todavía»." },
        { speaker: "vale", text: "That is the number I care about.", es: "«Ese es el número que me importa»." },
        { speaker: "ana", text: "So far this is the best job I have had.", es: "«Hasta ahora este es el mejor trabajo que he tenido»." },
      ],
      words: [
        { word: "unit", es: "unidad" },
        { word: "left", es: "se ha ido" },
        { word: "job", es: "trabajo" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Mateo fixes the projector while the team watches nervously.",
      text: "One box on the list belongs to Mateo.",
      es: "Una casilla de la lista es de Mateo.",
      speaker: "mateo",
      lines: [
        { speaker: "mateo", text: "I have already fixed the projector and the cable.", es: "«Ya arreglé el proyector y el cable»." },
        { speaker: "dani", text: "Have you tested it with the laptop yet?", es: "«¿Ya lo probaste con la laptop?»" },
        { speaker: "mateo", text: "No. That is why I am smiling nervously.", es: "«No. Por eso sonrío nervioso»." },
      ],
      words: [
        { word: "fixed", es: "arreglado" },
        { word: "cable", es: "cable" },
        { word: "tested", es: "probado" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "The whole team looks at the checklist with almost every box checked.",
      text: "9:00 p.m. Ten of eleven.",
      es: "9:00 p.m. Diez de once.",
      speaker: "vale",
      lines: [
        { speaker: "vale", text: "We have already done everything except the rehearsal.", es: "«Ya hemos hecho todo menos el ensayo»." },
        { speaker: "camila", text: "And the hotel has finally answered.", es: "«Y el hotel por fin contestó»." },
        { speaker: "vale", text: "So far, so good. Tomorrow we practice the real thing.", es: "«Hasta ahora, bien. Mañana practicamos lo real»." },
      ],
      words: [
        { word: "except", es: "excepto" },
        { word: "finally", es: "por fin" },
        { word: "real", es: "real" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Vale watches the students' recorded videos on a laptop, moved.",
      text: "11:15 p.m. Vale watches all twelve videos.",
      es: "11:15 p.m. Vale ve los doce videos.",
      speaker: "vale",
      lines: [
        { speaker: "vale", text: "Four months ago none of them could say one full sentence.", es: "«Hace cuatro meses ninguno podía decir una frase completa»." },
        { speaker: "dani", text: "And you have not celebrated it yet.", es: "«Y todavía no lo has celebrado»." },
        { speaker: "vale", text: "I am celebrating now. Mistakes are part of the process.", es: "«Lo estoy celebrando ahora. Los errores son parte del proceso»." },
      ],
      words: [
        { word: "sentence", es: "frase" },
        { word: "celebrated", es: "celebrado" },
        { word: "process", es: "proceso" },
      ],
    },
    {
      id: "s10",
      image: s10,
      imageAlt: "Dani sits alone in the classroom holding an old notebook.",
      text: "Midnight. Dani is still there.",
      es: "Medianoche. Dani sigue ahí.",
      speaker: "dani",
      lines: [
        { speaker: "dani", text: "Everybody has a video except me.", es: "«Todos tienen video menos yo»." },
        { speaker: "vale", text: "You have been working on something for two years. Tell me tomorrow.", es: "«Llevas dos años trabajando en algo. Cuéntamelo mañana»." },
        { speaker: "narrator", text: "The old notebook has a date on the first page: two years ago.", es: "El cuaderno viejo tiene una fecha en la primera página: hace dos años." },
      ],
      words: [
        { word: "video", es: "video" },
        { word: "notebook", es: "cuaderno" },
        { word: "date", es: "fecha" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s2",
      questionEn: "What has Camila already sent?",
      questionEs: "¿Qué ya envió Camila?",
      options: [
        { label: "The invoice and the insurance", emoji: "📄" },
        { label: "The hotel payment", emoji: "🏨" },
        { label: "The student videos", emoji: "🎬" },
      ],
      answer: 0,
      sayIt: "She has already sent the invoice.",
      sayItEs: "Ejemplo: «She has already sent the invoice.»",
      sayItAskEn: "What have you already done today? Use: I have already…",
      sayItAskEs: "¿Qué ya hiciste hoy? Usa: I have already…",
      sayItCheck: {
        target: "I have already *",
        altTargets: ["I've already *", "I have already finished *", "I have already studied *"],
      },
    },
    {
      id: "q2",
      afterScene: "s4",
      questionEn: "What has Beto achieved in four months?",
      questionEs: "¿Qué ha logrado Beto en cuatro meses?",
      options: [
        { label: "He has sold shoes to two tourists in English", emoji: "👟" },
        { label: "He has traveled to Miami", emoji: "✈️" },
        { label: "He has changed jobs", emoji: "🔁" },
      ],
      answer: 0,
      sayIt: "He has sold shoes to two tourists in English.",
      sayItEs: "Ejemplo: «He has sold shoes to two tourists in English.»",
      sayItAskEn: "What have you achieved so far with your English? Use: So far I have…",
      sayItAskEs: "¿Qué has logrado hasta ahora con tu inglés? Usa: So far I have…",
      sayItCheck: {
        target: "So far I have *",
        altTargets: ["I have *", "So far I've *", "I have learned *"],
      },
    },
    {
      id: "q3",
      afterScene: "s8",
      questionEn: "What is missing on the checklist?",
      questionEs: "¿Qué falta en la lista?",
      options: [
        { label: "The rehearsal", emoji: "🎭" },
        { label: "The passport", emoji: "🛂" },
        { label: "The schedule", emoji: "🗓️" },
      ],
      answer: 0,
      sayIt: "The rehearsal is missing.",
      sayItEs: "Ejemplo: «The rehearsal is missing.»",
      sayItAskEn: "What have you not done yet this week? Use: I have not… yet",
      sayItAskEs: "¿Qué no has hecho todavía esta semana? Usa: I have not… yet",
      sayItCheck: {
        target: "I have not * yet",
        altTargets: ["I haven't * yet", "I have not *", "I still have not *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s4",
    phrase: "I have done more than I think. I can do it.",
    es: "He hecho más de lo que creo. Yo puedo hacerlo.",
  },
  habitCard: {
    afterScene: "s1",
    phrase: "Every week I count what I have already finished, not only what is missing.",
    es: "Cada semana cuento lo que ya terminé, no solo lo que falta.",
    model: "dani",
    modelActionEs: "Dani marca en la lista lo que el equipo ya terminó.",
  },
  continuePrompt: {
    en: "Tell me three things you have achieved this year.",
    es: "Cuéntame tres cosas que has logrado este año.",
  },
  continueWith: ["I have already ...", "So far I have ...", "I have not ... yet"],
  cliffhanger: {
    en: "Episode 18: Dani's notebook has a date — and two years of a plan nobody knows about.",
    es: "Episodio 18: El cuaderno de Dani tiene una fecha… y dos años de un plan que nadie conoce.",
  },
};
