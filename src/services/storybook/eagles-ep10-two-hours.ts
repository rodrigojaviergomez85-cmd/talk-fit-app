import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/eagles-ep10-two-hours/cover.jpg";
import s1 from "@/assets/storybook/eagles-ep10-two-hours/s1.jpg";
import s2 from "@/assets/storybook/eagles-ep10-two-hours/s2.jpg";
import s3 from "@/assets/storybook/eagles-ep10-two-hours/s3.jpg";
import s4 from "@/assets/storybook/eagles-ep10-two-hours/s4.jpg";
import s5 from "@/assets/storybook/eagles-ep10-two-hours/s5.jpg";
import s6 from "@/assets/storybook/eagles-ep10-two-hours/s6.jpg";
import s7 from "@/assets/storybook/eagles-ep10-two-hours/s7.jpg";
import s8 from "@/assets/storybook/eagles-ep10-two-hours/s8.jpg";
import s9 from "@/assets/storybook/eagles-ep10-two-hours/s9.jpg";
import s10 from "@/assets/storybook/eagles-ep10-two-hours/s10.jpg";

/**
 * Season 6 (Eagles) Episode 10 — "Two hours".
 * Eagles day 10: transfer — solve a brand new problem using past, present
 * perfect and present perfect progressive.
 */
export const EAGLES_EP10_TWO_HOURS: StorybookEpisode = {
  id: "eagles-ep10-two-hours",
  moduleId: "eagles-week-1",
  week: 2,
  title: "Two hours",
  titleEs: "Dos horas",
  episodeLabel: { en: "Season 6 · Episode 10", es: "Temporada 6 · Episodio 10" },
  previously: [
    { en: "Vale solved the complaint.", es: "Vale resolvió la queja." },
    { en: "The advanced group started.", es: "Empezó el grupo avanzado." },
    { en: "Then the platform went down.", es: "Y luego se cayó la plataforma." },
  ],
  reviewWords: [
    { word: "problem", es: "problema" },
    { word: "plan", es: "plan" },
    { word: "backup", es: "respaldo" },
  ],
  blurb: {
    en: "The online platform is dead two hours before the evening class. Nobody has a plan, so the team invents one.",
    es: "La plataforma está caída dos horas antes de la clase de la noche. Nadie tiene un plan, así que el equipo inventa uno.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Vale, Dani and Camila stand around a laptop with an error message.",
      text: "5:02 p.m. The screen has not changed for fifteen minutes.",
      es: "5:02 p.m. La pantalla no cambia desde hace quince minutos.",
      speaker: "narrator",
      lines: [
        { speaker: "narrator", text: "5:02 p.m. The screen has not changed for fifteen minutes.", es: "5:02 p.m. La pantalla no cambia desde hace quince minutos." },
        { speaker: "dani", text: "I have restarted everything twice. It has not helped.", es: "«He reiniciado todo dos veces. No ha servido»." },
        { speaker: "vale", text: "Okay. We have two hours and thirty students.", es: "«Bien. Tenemos dos horas y treinta estudiantes»." },
      ],
      words: [
        { word: "screen", es: "pantalla" },
        { word: "restarted", es: "reiniciado" },
        { word: "helped", es: "ayudado / servido" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Camila writes three options on the whiteboard with a marker.",
      text: "Camila writes the options instead of panicking.",
      es: "Camila escribe las opciones en vez de entrar en pánico.",
      speaker: "camila",
      lines: [
        { speaker: "camila", text: "Option one: cancel. Option two: phone calls. Option three: here, in person.", es: "«Opción uno: cancelar. Opción dos: llamadas. Opción tres: aquí, presencial»." },
        { speaker: "vale", text: "We have never cancelled a class. We are not starting today.", es: "«Nunca hemos cancelado una clase. No vamos a empezar hoy»." },
        { speaker: "dani", text: "Then we have one hour and fifty minutes to move a class.", es: "«Entonces tenemos una hora y cincuenta minutos para mover una clase»." },
      ],
      words: [
        { word: "cancel", es: "cancelar" },
        { word: "person", es: "persona" },
        { word: "minutes", es: "minutos" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Vale speaks on the phone while walking fast through the school.",
      text: "Vale calls the director first.",
      es: "Vale llama primero al director.",
      speaker: "vale",
      lines: [
        { speaker: "vale", text: "Our platform has been down since five. Here is what we are doing.", es: "«Nuestra plataforma está caída desde las cinco. Esto es lo que vamos a hacer»." },
        { speaker: "boss", text: "You called before I found out. That has never happened to me.", es: "«Me llamaste antes de que yo me enterara. Eso nunca me había pasado»." },
        { speaker: "vale", text: "Bad news travels better when it travels early.", es: "«Las malas noticias viajan mejor cuando viajan temprano»." },
      ],
      words: [
        { word: "down", es: "caída" },
        { word: "news", es: "noticias" },
        { word: "early", es: "temprano" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Dani sends messages to students from two phones at once.",
      text: "Dani writes thirty messages in twelve minutes.",
      es: "Dani escribe treinta mensajes en doce minutos.",
      speaker: "dani",
      lines: [
        { speaker: "dani", text: "Same hour, same teacher, new place. Ten have answered already.", es: "«Misma hora, misma maestra, lugar nuevo. Diez ya han respondido»." },
        { speaker: "kat", text: "I have been in the office since seven. I can walk there.", es: "«Llevo en la oficina desde las siete. Puedo ir caminando»." },
        { speaker: "beto", text: "I have never been to the school. Send me the address.", es: "«Nunca he ido a la escuela. Mándame la dirección»." },
      ],
      words: [
        { word: "place", es: "lugar" },
        { word: "answered", es: "respondido" },
        { word: "address", es: "dirección" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Mateo carries chairs into the school after his shift.",
      text: "Mateo arrives with chairs and no questions.",
      es: "Mateo llega con sillas y sin preguntas.",
      speaker: "mateo",
      lines: [
        { speaker: "mateo", text: "I have borrowed twelve chairs from my neighbor.", es: "«Le he pedido doce sillas prestadas a mi vecino»." },
        { speaker: "vale", text: "How did you know? I have not called you.", es: "«¿Cómo supiste? No te he llamado»." },
        { speaker: "mateo", text: "Dani wrote to everybody. Everybody includes me.", es: "«Dani le escribió a todos. Todos me incluye a mí»." },
      ],
      words: [
        { word: "borrowed", es: "prestado" },
        { word: "chairs", es: "sillas" },
        { word: "everybody", es: "todos" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Vale and Camila move desks and set up a big room quickly.",
      text: "6:15. The room does not look like a classroom yet.",
      es: "6:15. El salón todavía no parece un salón de clases.",
      speaker: "camila",
      lines: [
        { speaker: "camila", text: "We have been moving furniture for forty minutes.", es: "«Llevamos cuarenta minutos moviendo muebles»." },
        { speaker: "vale", text: "Last year I did this alone for six students.", es: "«El año pasado hice esto sola para seis estudiantes»." },
        { speaker: "camila", text: "And tonight you have a team and thirty.", es: "«Y esta noche tienes un equipo y treinta»." },
      ],
      words: [
        { word: "furniture", es: "muebles" },
        { word: "alone", es: "sola" },
        { word: "tonight", es: "esta noche" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Morgan on a phone screen laughs while Vale explains the situation.",
      text: "Morgan calls at 6:40.",
      es: "Morgan llama a las 6:40.",
      speaker: "morgan",
      lines: [
        { speaker: "morgan", text: "I have heard you moved a whole class in two hours.", es: "«He escuchado que moviste una clase entera en dos horas»." },
        { speaker: "vale", text: "The platform failed. The class did not.", es: "«La plataforma falló. La clase no»." },
        { speaker: "morgan", text: "I have been buying services for ten years. That sentence sells.", es: "«Llevo diez años comprando servicios. Esa frase vende»." },
      ],
      words: [
        { word: "heard", es: "escuchado" },
        { word: "failed", es: "falló" },
        { word: "sells", es: "vende" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Students arrive at the school door at night, surprised and smiling.",
      text: "7:00 p.m. Twenty-six of thirty arrive.",
      es: "7:00 p.m. Llegan veintiséis de treinta.",
      speaker: "beto",
      lines: [
        { speaker: "beto", text: "I have never come to a class after work before.", es: "«Nunca había venido a una clase después del trabajo»." },
        { speaker: "kat", text: "I have been to many trainings. Nobody has done this for us.", es: "«He estado en muchas capacitaciones. Nadie había hecho esto por nosotros»." },
        { speaker: "vale", text: "Sit down. We have lost the platform, not the class.", es: "«Siéntense. Perdimos la plataforma, no la clase»." },
      ],
      words: [
        { word: "come", es: "venir" },
        { word: "trainings", es: "capacitaciones" },
        { word: "lost", es: "perdido" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "The full classroom practices in pairs with no computers at all.",
      text: "No screens. Just voices.",
      es: "Sin pantallas. Solo voces.",
      speaker: "vale",
      lines: [
        { speaker: "vale", text: "Tonight we practice the way I learned: talking.", es: "«Esta noche practicamos como yo aprendí: hablando»." },
        { speaker: "kat", text: "This has been the best class of the program.", es: "«Esta ha sido la mejor clase del programa»." },
        { speaker: "vale", text: "Because the problem made us better. Mistakes are part of the process.", es: "«Porque el problema nos hizo mejores. Los errores son parte del proceso»." },
      ],
      words: [
        { word: "practice", es: "practicar" },
        { word: "best", es: "mejor" },
        { word: "problem", es: "problema" },
      ],
    },
    {
      id: "s10",
      image: s10,
      imageAlt: "Vale and Dani lock the school door late at night, tired and happy.",
      text: "9:30 p.m. The platform comes back. Nobody needed it.",
      es: "9:30 p.m. La plataforma vuelve. Nadie la necesitó.",
      speaker: "dani",
      lines: [
        { speaker: "dani", text: "It has been online since eight fifty.", es: "«Ha estado en línea desde las ocho cincuenta»." },
        { speaker: "vale", text: "Write it down: we have a backup plan now.", es: "«Anótalo: ahora tenemos un plan de respaldo»." },
        { speaker: "narrator", text: "On the door, a note nobody left yesterday: \"Are you the school from Northline?\"", es: "En la puerta, una nota que nadie dejó ayer: «¿Ustedes son la escuela de Northline?»" },
      ],
      words: [
        { word: "online", es: "en línea" },
        { word: "backup", es: "respaldo" },
        { word: "note", es: "nota" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s3",
      questionEn: "Why did the director say that had never happened to him?",
      questionEs: "¿Por qué el director dijo que eso nunca le había pasado?",
      options: [
        { label: "Vale called him before he found out about the problem", emoji: "📞" },
        { label: "Vale cancelled the class", emoji: "❌" },
        { label: "Vale asked him for more money", emoji: "💵" },
      ],
      answer: 0,
      sayIt: "She called him before he found out.",
      sayItEs: "Ejemplo: «She called him before he found out.»",
      sayItAskEn: "Tell me about a problem that happened to you recently. Use: It happened… because…",
      sayItAskEs: "Cuéntame de un problema que te pasó hace poco. Usa: It happened… because…",
      sayItCheck: {
        target: "It happened *",
        altTargets: ["It happened because *", "It was * because *", "Yesterday *"],
      },
    },
    {
      id: "q2",
      afterScene: "s6",
      questionEn: "How long had the team been moving furniture?",
      questionEs: "¿Cuánto tiempo llevaba el equipo moviendo muebles?",
      options: [
        { label: "They have been moving furniture for forty minutes", emoji: "🪑" },
        { label: "They have been resting", emoji: "😴" },
        { label: "They have been waiting for the platform", emoji: "💻" },
      ],
      answer: 0,
      sayIt: "They have been moving furniture for forty minutes.",
      sayItEs: "Ejemplo: «They have been moving furniture for forty minutes.»",
      sayItAskEn: "What have you been doing to solve a problem lately? Use: I have been…",
      sayItAskEs: "¿Qué has estado haciendo para resolver un problema últimamente? Usa: I have been…",
      sayItCheck: {
        target: "I have been *",
        altTargets: ["I've been *", "I have been working *", "I have been trying *"],
      },
    },
    {
      id: "q3",
      afterScene: "s9",
      questionEn: "What did Vale say about the problem?",
      questionEs: "¿Qué dijo Vale sobre el problema?",
      options: [
        { label: "The problem made them better", emoji: "💪" },
        { label: "The problem ruined the class", emoji: "💔" },
        { label: "The problem was the students' fault", emoji: "🙅" },
      ],
      answer: 0,
      sayIt: "The problem made us better.",
      sayItEs: "Ejemplo: «The problem made us better.»",
      sayItAskEn: "Tell me one problem you have solved without help. Use: I have solved…",
      sayItAskEs: "Dime un problema que has resuelto sin ayuda. Usa: I have solved…",
      sayItCheck: {
        target: "I have solved *",
        altTargets: ["I've solved *", "I have fixed *", "I have found a solution *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s8",
    phrase: "Everything is possible when I put in the effort.",
    es: "Todo es posible cuando le pongo esfuerzo.",
  },
  habitCard: {
    afterScene: "s2",
    phrase: "When something breaks, I write the options before I write the excuses.",
    es: "Cuando algo se rompe, escribo las opciones antes que las excusas.",
    model: "camila",
    modelActionEs: "Camila escribe tres opciones en la pizarra en vez de entrar en pánico.",
  },
  continuePrompt: {
    en: "Tell me about a day when your plan failed. What happened? What have you learned from it?",
    es: "Cuéntame de un día en que tu plan falló. ¿Qué pasó? ¿Qué has aprendido de eso?",
  },
  continueWith: ["It happened ...", "I have been ...", "I have learned ..."],
  cliffhanger: {
    en: "Episode 11: A stranger leaves a note on the door — and remembers Vale from the call center.",
    es: "Episodio 11: Un desconocido deja una nota en la puerta… y recuerda a Vale del call center.",
  },
};
