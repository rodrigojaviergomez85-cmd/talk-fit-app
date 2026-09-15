import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/tigers-ep1-a-decision-i-made/cover.jpg";
import s1 from "@/assets/storybook/tigers-ep1-a-decision-i-made/s1.jpg";
import s2 from "@/assets/storybook/tigers-ep1-a-decision-i-made/s2.jpg";
import s3 from "@/assets/storybook/tigers-ep1-a-decision-i-made/s3.jpg";
import s4 from "@/assets/storybook/tigers-ep1-a-decision-i-made/s4.jpg";
import s5 from "@/assets/storybook/tigers-ep1-a-decision-i-made/s5.jpg";
import s6 from "@/assets/storybook/tigers-ep1-a-decision-i-made/s6.jpg";
import s7 from "@/assets/storybook/tigers-ep1-a-decision-i-made/s7.jpg";
import s8 from "@/assets/storybook/tigers-ep1-a-decision-i-made/s8.jpg";
import s9 from "@/assets/storybook/tigers-ep1-a-decision-i-made/s9.jpg";
import s10 from "@/assets/storybook/tigers-ep1-a-decision-i-made/s10.jpg";
import s11 from "@/assets/storybook/tigers-ep1-a-decision-i-made/s11.jpg";

/**
 * Season 7 (Tigers) Episode 1 — "A decision I made".
 * Sitcom-style dialogue. Matches Tigers Day 1 (simple past: tell a decision,
 * why you made it, and what happened after).
 */
export const TIGERS_EP1_A_DECISION_I_MADE: StorybookEpisode = {
  id: "tigers-ep1-a-decision-i-made",
  moduleId: "tigers",
  week: 1,
  title: "A decision I made",
  titleEs: "Una decisión que tomé",
  episodeLabel: { en: "Season 7 · Episode 1", es: "Temporada 7 · Episodio 1" },
  previously: [
    { en: "Vale's school won the Northline contract.", es: "La escuela de Vale ganó el contrato con Northline." },
    { en: "Camila and Dani now work with her.", es: "Camila y Dani ahora trabajan con ella." },
    { en: "A big chain of academies arrived in the city.", es: "Una cadena grande de academias llegó a la ciudad." },
  ],
  reviewWords: [
    { word: "contract", es: "contrato" },
    { word: "proposal", es: "propuesta" },
    { word: "client", es: "cliente" },
  ],
  blurb: {
    en: "A huge academy chain copies Vale's model. While everyone panics, Vale tells the story of the decision that started it all.",
    es: "Una cadena enorme de academias copia el modelo de Vale. Mientras todos entran en pánico, Vale cuenta la historia de la decisión que empezó todo.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Vale, Camila y Dani miran por la ventana un letrero nuevo de una academia grande frente a la escuela.",
      text: "Tuesday morning. Across the street, a giant sign appeared: BigTalk Academy — now open.",
      es: "Martes por la mañana. Frente a la escuela apareció un letrero gigante: BigTalk Academy — ya abierta.",
      speaker: "narrator",
      lines: [
        { speaker: "dani", text: "Vale… come here. Look across the street.", es: "«Vale… ven. Mira enfrente»." },
        { speaker: "camila", text: "BigTalk Academy? They have schools in six countries.", es: "«¿BigTalk Academy? Tienen escuelas en seis países»." },
        { speaker: "vale", text: "I know. I saw the sign yesterday.", es: "«Lo sé. Vi el letrero ayer»." },
      ],
      words: [
        { word: "across", es: "enfrente / al otro lado" },
        { word: "sign", es: "letrero" },
        { word: "appeared", es: "apareció" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Camila, preocupada, muestra el teléfono con la página de la competencia.",
      text: "They copied everything: live practice, small groups, even our prices.",
      es: "«Copiaron todo: práctica en vivo, grupos pequeños, hasta nuestros precios».",
      speaker: "camila",
      lines: [
        { speaker: "camila", text: "Look at their page. They copied everything.", es: "«Mira su página. Copiaron todo»." },
        { speaker: "camila", text: "Live practice, small groups… even our prices.", es: "«Práctica en vivo, grupos pequeños… hasta nuestros precios»." },
        { speaker: "dani", text: "And they have money for ads everywhere.", es: "«Y tienen dinero para anuncios por todas partes»." },
        { speaker: "vale", text: "Sit down, both of you. I want to tell you something.", es: "«Siéntense, los dos. Quiero contarles algo»." },
      ],
      words: [
        { word: "copied", es: "copiaron" },
        { word: "everything", es: "todo" },
        { word: "prices", es: "precios" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Vale habla con calma mientras Dani y Camila escuchan sentados.",
      text: "Two years ago, I made the hardest decision of my life.",
      es: "«Hace dos años tomé la decisión más difícil de mi vida».",
      speaker: "vale",
      lines: [
        { speaker: "vale", text: "Two years ago, I made the hardest decision of my life.", es: "«Hace dos años tomé la decisión más difícil de mi vida»." },
        { speaker: "vale", text: "I left my call center job and I opened this school.", es: "«Dejé mi trabajo en el call center y abrí esta escuela»." },
        { speaker: "dani", text: "Why did you do it? The job was safe.", es: "«¿Por qué lo hiciste? El trabajo era seguro»." },
        { speaker: "vale", text: "Because I wanted to teach my way, with real practice.", es: "«Porque quería enseñar a mi manera, con práctica real»." },
      ],
      words: [
        { word: "decision", es: "decisión" },
        { word: "left", es: "dejé / dejó" },
        { word: "safe", es: "seguro" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Recuerdo: Vale joven con su uniforme del call center, despidiéndose de su escritorio.",
      text: "I remember that Friday. I turned in my badge, and my hands were shaking.",
      es: "«Recuerdo ese viernes. Entregué mi gafete y me temblaban las manos».",
      speaker: "vale",
      lines: [
        { speaker: "vale", text: "I remember that Friday perfectly.", es: "«Recuerdo ese viernes perfectamente»." },
        { speaker: "vale", text: "I turned in my badge, and my hands were shaking.", es: "«Entregué mi gafete y me temblaban las manos»." },
        { speaker: "camila", text: "Were you scared?", es: "«¿Tenías miedo?»" },
        { speaker: "vale", text: "Terrified. But I already had three students waiting for me.", es: "«Aterrada. Pero ya tenía tres estudiantes esperándome»." },
      ],
      words: [
        { word: "badge", es: "gafete" },
        { word: "shaking", es: "temblando" },
        { word: "waiting", es: "esperando" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Recuerdo: la primera clase de Vale en un cuarto pequeño alquilado con tres estudiantes.",
      text: "After that, I rented a tiny room. My mom painted the wall, and Mateo built the table.",
      es: "«Después de eso alquilé un cuartito. Mi mamá pintó la pared y Mateo construyó la mesa».",
      speaker: "vale",
      lines: [
        { speaker: "vale", text: "After that, I rented a tiny room with one window.", es: "«Después de eso alquilé un cuartito con una ventana»." },
        { speaker: "vale", text: "My mom painted the wall, and Mateo built the table.", es: "«Mi mamá pintó la pared y Mateo construyó la mesa»." },
        { speaker: "dani", text: "And what happened with the three students?", es: "«¿Y qué pasó con los tres estudiantes?»" },
        { speaker: "vale", text: "They learned fast, and each one brought a friend.", es: "«Aprendieron rápido y cada uno trajo a un amigo»." },
      ],
      words: [
        { word: "rented", es: "alquilé" },
        { word: "tiny", es: "pequeñísimo" },
        { word: "brought", es: "trajo" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Vale señala la pared de la oficina actual, llena de fotos de estudiantes.",
      text: "That decision brought us here: two classrooms, forty students and a contract with Northline.",
      es: "«Esa decisión nos trajo hasta aquí: dos salones, cuarenta estudiantes y un contrato con Northline».",
      speaker: "vale",
      lines: [
        { speaker: "vale", text: "That one decision brought us here.", es: "«Esa única decisión nos trajo hasta aquí»." },
        { speaker: "vale", text: "Two classrooms, forty students, and a contract with Northline.", es: "«Dos salones, cuarenta estudiantes y un contrato con Northline»." },
        { speaker: "camila", text: "And now a giant competitor across the street.", es: "«Y ahora un competidor gigante enfrente»." },
        { speaker: "vale", text: "Exactly. So we don't panic. We remember who we are.", es: "«Exacto. Así que no entramos en pánico. Recordamos quiénes somos»." },
      ],
      words: [
        { word: "brought", es: "trajo" },
        { word: "classrooms", es: "salones" },
        { word: "panic", es: "pánico" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Dani toma notas en una pizarra mientras Vale organiza ideas.",
      text: "A competitor with money can copy our prices, but not our results.",
      es: "«Un competidor con dinero puede copiar nuestros precios, pero no nuestros resultados».",
      speaker: "vale",
      lines: [
        { speaker: "vale", text: "A competitor with money can copy our prices.", es: "«Un competidor con dinero puede copiar nuestros precios»." },
        { speaker: "vale", text: "But they can't copy our results, or our students' stories.", es: "«Pero no pueden copiar nuestros resultados ni las historias de nuestros estudiantes»." },
        { speaker: "dani", text: "So what's the plan?", es: "«¿Entonces cuál es el plan?»" },
        { speaker: "vale", text: "First, we call every student. Then, we show Northline our numbers.", es: "«Primero llamamos a cada estudiante. Después le mostramos nuestros números a Northline»." },
      ],
      words: [
        { word: "results", es: "resultados" },
        { word: "stories", es: "historias" },
        { word: "numbers", es: "números / datos" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Camila habla por teléfono con una estudiante mientras sonríe.",
      text: "Camila called the first student, and she said something beautiful.",
      es: "Camila llamó a la primera estudiante, y ella dijo algo hermoso.",
      speaker: "narrator",
      lines: [
        { speaker: "camila", text: "Hi Ana, it's Camila, from the school. How is your English?", es: "«Hola Ana, soy Camila, de la escuela. ¿Cómo va tu inglés?»" },
        { speaker: "camila", text: "She said: I passed my interview last week, in English!", es: "«Dijo: ¡pasé mi entrevista la semana pasada, en inglés!»" },
        { speaker: "vale", text: "Write that down. That's our best ad.", es: "«Escríbelo. Ese es nuestro mejor anuncio»." },
      ],
      words: [
        { word: "passed", es: "pasó / aprobó" },
        { word: "interview", es: "entrevista" },
        { word: "ad", es: "anuncio" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Mateo entra con una caja de folletos y levanta el pulgar.",
      text: "Mateo arrived with flyers, and Don Tito sent lunch for everyone.",
      es: "«Mateo llegó con folletos y Don Tito mandó almuerzo para todos».",
      speaker: "mateo",
      lines: [
        { speaker: "mateo", text: "I printed two hundred flyers at the shop, cheap.", es: "«Imprimí doscientos folletos en la tienda, barato»." },
        { speaker: "mateo", text: "And Don Tito sent lunch for everyone.", es: "«Y Don Tito mandó almuerzo para todos»." },
        { speaker: "vale", text: "See? BigTalk has money. We have a family.", es: "«¿Ven? BigTalk tiene dinero. Nosotros tenemos una familia»." },
      ],
      words: [
        { word: "flyers", es: "folletos" },
        { word: "printed", es: "imprimí" },
        { word: "cheap", es: "barato" },
      ],
    },
    {
      id: "s10",
      image: s10,
      imageAlt: "El equipo junta las manos en el centro de la oficina, animados.",
      text: "At six, the team put their hands together in the middle of the office.",
      es: "A las seis, el equipo juntó las manos en el centro de la oficina.",
      speaker: "narrator",
      lines: [
        { speaker: "vale", text: "Two years ago I decided to bet on us.", es: "«Hace dos años decidí apostar por nosotros»." },
        { speaker: "vale", text: "Today I make the same decision again.", es: "«Hoy tomo la misma decisión otra vez»." },
        { speaker: "dani", text: "Then let's work. BigTalk doesn't know who they're fighting.", es: "«Entonces a trabajar. BigTalk no sabe contra quién pelea»." },
      ],
      words: [
        { word: "bet", es: "apostar" },
        { word: "again", es: "otra vez" },
        { word: "fighting", es: "peleando / luchando" },
      ],
    },
    {
      id: "s11",
      image: s11,
      imageAlt: "Vale resume la historia paso a paso frente a la pizarra, en pasado.",
      text: "Vale tells the whole story one more time, step by step, in the past.",
      es: "Vale cuenta la historia completa una vez más, paso a paso, en pasado.",
      speaker: "vale",
      lines: [
        { speaker: "camila", text: "Okay, boss. Tell us the story one more time, slowly.", es: "«Bueno, jefa. Cuéntanos la historia una vez más, despacio»." },
        { speaker: "vale", text: "Two years ago, I left my job because I believed in real practice.", es: "«Hace dos años dejé mi trabajo porque creía en la práctica real»." },
        { speaker: "vale", text: "After that, I opened a tiny room and I taught my first three students.", es: "«Después de eso abrí un cuartito y enseñé a mis primeros tres estudiantes»." },
        { speaker: "vale", text: "They brought friends, we grew, and last month we signed with Northline.", es: "«Ellos trajeron amigos, crecimos, y el mes pasado firmamos con Northline»." },
        { speaker: "vale", text: "Overall, it was the best decision of my life.", es: "«En general, fue la mejor decisión de mi vida»." },
      ],
      words: [
        { word: "believed", es: "creía" },
        { word: "grew", es: "crecimos" },
        { word: "signed", es: "firmamos" },
        { word: "overall", es: "en general" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s3",
      questionEn: "What decision did Vale make two years ago?",
      questionEs: "¿Qué decisión tomó Vale hace dos años?",
      options: [
        { label: "She left her job and opened her school", emoji: "🏫" },
        { label: "She moved to another country", emoji: "✈️" },
        { label: "She closed the school", emoji: "🚪" },
      ],
      answer: 0,
      sayIt: "Two years ago, I left my job and I opened my school.",
      sayItEs: "Ejemplo: «Two years ago, I left my job and I opened my school.»",
      sayItAskEn: "Tell me about an important decision you made. What did you do?",
      sayItAskEs: "Cuéntame una decisión importante que tomaste. ¿Qué hiciste?",
      sayItCheck: {
        target: "I decided to *",
        altTargets: ["I made a decision: I *", "I * because I wanted to *", "* ago, I *"],
      },
    },
    {
      id: "q2",
      afterScene: "s6",
      questionEn: "Why did Vale leave her call center job?",
      questionEs: "¿Por qué dejó Vale su trabajo en el call center?",
      options: [
        { label: "Because she wanted to teach her way", emoji: "🎯" },
        { label: "Because they fired her", emoji: "📦" },
        { label: "Because the pay was bad", emoji: "💸" },
      ],
      answer: 0,
      sayIt: "She left her job because she wanted to teach her way.",
      sayItEs: "Ejemplo: «She left her job because she wanted to teach her way.»",
      sayItAskEn: "Why did you make that decision? Use 'because'.",
      sayItAskEs: "¿Por qué tomaste esa decisión? Usa «because».",
      sayItCheck: {
        target: "Because I *",
        altTargets: ["I did it because *", "I made that decision because *"],
      },
    },
    {
      id: "q3",
      afterScene: "s9",
      questionEn: "What happened after Vale opened the tiny room?",
      questionEs: "¿Qué pasó después de que Vale abrió el cuartito?",
      options: [
        { label: "Her students learned fast and brought friends", emoji: "📈" },
        { label: "Nobody came to class", emoji: "🕳️" },
        { label: "She went back to the call center", emoji: "🎧" },
      ],
      answer: 0,
      sayIt: "After that, her students brought friends, and the school grew.",
      sayItEs: "Ejemplo: «After that, her students brought friends, and the school grew.»",
      sayItAskEn: "What happened after your decision? Tell me the next thing.",
      sayItAskEs: "¿Qué pasó después de tu decisión? Cuéntame lo que pasó después.",
      sayItCheck: {
        target: "After that, *",
        altTargets: ["After that I *", "Then *", "Later, *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s7",
    phrase: "I can do it. Mistakes are part of the process.",
    es: "Yo puedo hacerlo. Los errores son parte del proceso.",
  },
  habitCard: {
    afterScene: "s4",
    phrase: "When fear shows up, I tell my story. Remembering why I started makes me brave.",
    es: "Cuando aparece el miedo, cuento mi historia. Recordar por qué empecé me da valentía.",
    model: "vale",
    modelActionEs: "Vale responde al miedo contando la decisión que la trajo hasta aquí.",
  },
  continuePrompt: {
    en: "Tell us about a big decision in your life. What did you decide? Why? What happened after that? How was it overall?",
    es: "Cuéntanos una decisión grande de tu vida. ¿Qué decidiste? ¿Por qué? ¿Qué pasó después? ¿Cómo fue en general?",
  },
  continueWith: ["I decided to ... because ...", "After that, I ...", "Overall, it was ..."],
  cliffhanger: {
    en: "Episode 2: BigTalk's manager visits the school — with a smile and a folder.",
    es: "Episodio 2: El gerente de BigTalk visita la escuela — con una sonrisa y una carpeta.",
  },
};
