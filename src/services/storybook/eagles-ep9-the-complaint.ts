import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/eagles-ep9-the-complaint/cover.jpg";
import s1 from "@/assets/storybook/eagles-ep9-the-complaint/s1.jpg";
import s2 from "@/assets/storybook/eagles-ep9-the-complaint/s2.jpg";
import s3 from "@/assets/storybook/eagles-ep9-the-complaint/s3.jpg";
import s4 from "@/assets/storybook/eagles-ep9-the-complaint/s4.jpg";
import s5 from "@/assets/storybook/eagles-ep9-the-complaint/s5.jpg";
import s6 from "@/assets/storybook/eagles-ep9-the-complaint/s6.jpg";
import s7 from "@/assets/storybook/eagles-ep9-the-complaint/s7.jpg";
import s8 from "@/assets/storybook/eagles-ep9-the-complaint/s8.jpg";
import s9 from "@/assets/storybook/eagles-ep9-the-complaint/s9.jpg";
import s10 from "@/assets/storybook/eagles-ep9-the-complaint/s10.jpg";

/**
 * Season 6 (Eagles) Episode 9 — "The complaint".
 * Eagles day 9: customer service #1 — past, present perfect and present
 * perfect progressive inside a real complaint call.
 */
export const EAGLES_EP9_THE_COMPLAINT: StorybookEpisode = {
  id: "eagles-ep9-the-complaint",
  moduleId: "eagles-week-1",
  week: 2,
  title: "The complaint",
  titleEs: "La queja",
  episodeLabel: { en: "Season 6 · Episode 9", es: "Temporada 6 · Episodio 9" },
  previously: [
    { en: "The evening group started.", es: "Empezó el grupo de la noche." },
    { en: "Dani built a new schedule.", es: "Dani armó un horario nuevo." },
    { en: "The director wrote: we need to talk.", es: "El director escribió: we need to talk." },
  ],
  reviewWords: [
    { word: "complaint", es: "queja" },
    { word: "apologize", es: "disculparse" },
    { word: "solution", es: "solución" },
  ],
  blurb: {
    en: "A corporate student says the class is a waste of time. Vale has eleven minutes to listen, explain and fix it.",
    es: "Un estudiante corporativo dice que la clase es una pérdida de tiempo. Vale tiene once minutos para escuchar, explicar y resolver.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Vale answers a video call early in the morning with a serious face.",
      text: "Wednesday, 7:20. The director calls.",
      es: "Miércoles, 7:20. Llama el director.",
      speaker: "narrator",
      lines: [
        { speaker: "narrator", text: "Wednesday, 7:20. The director calls.", es: "Miércoles, 7:20. Llama el director." },
        { speaker: "boss", text: "One of my supervisors has complained about the class.", es: "«Uno de mis supervisores se ha quejado de la clase»." },
        { speaker: "vale", text: "Thank you for telling me. What exactly happened?", es: "«Gracias por decírmelo. ¿Qué pasó exactamente?»" },
      ],
      words: [
        { word: "complained", es: "se quejó" },
        { word: "exactly", es: "exactamente" },
        { word: "happened", es: "pasó" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "A laptop screen shows the director explaining the complaint.",
      text: "The complaint has three parts.",
      es: "La queja tiene tres partes.",
      speaker: "boss",
      lines: [
        { speaker: "boss", text: "She said the class was too basic on Monday.", es: "«Dijo que la clase estuvo muy básica el lunes»." },
        { speaker: "boss", text: "She has been working with American clients for six years.", es: "«Lleva seis años trabajando con clientes estadounidenses»." },
        { speaker: "vale", text: "I understand. She needs a different group, not a different school.", es: "«Entiendo. Ella necesita otro grupo, no otra escuela»." },
      ],
      words: [
        { word: "basic", es: "básico" },
        { word: "clients", es: "clientes" },
        { word: "different", es: "diferente" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Vale takes notes on a small notebook while she listens.",
      text: "Vale writes before she answers.",
      es: "Vale escribe antes de responder.",
      speaker: "vale",
      lines: [
        { speaker: "vale", text: "So the problem is the level, not the teacher. Is that correct?", es: "«Entonces el problema es el nivel, no la maestra. ¿Es correcto?»" },
        { speaker: "boss", text: "That's correct. She has not said anything about you.", es: "«Es correcto. No ha dicho nada de ti»." },
        { speaker: "vale", text: "Good. Then I have a solution for today.", es: "«Bien. Entonces tengo una solución para hoy»." },
      ],
      words: [
        { word: "level", es: "nivel" },
        { word: "correct", es: "correcto" },
        { word: "solution", es: "solución" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Vale and Dani look at a list of students split into two levels.",
      text: "Dani and Vale split the group.",
      es: "Dani y Vale dividen el grupo.",
      speaker: "dani",
      lines: [
        { speaker: "dani", text: "Four students have been speaking English at work for years.", es: "«Cuatro estudiantes llevan años hablando inglés en el trabajo»." },
        { speaker: "vale", text: "They go to an advanced group. Same hour, different room.", es: "«Van a un grupo avanzado. Misma hora, otro salón»." },
        { speaker: "dani", text: "That is not more work. That is better work.", es: "«Eso no es más trabajo. Es mejor trabajo»." },
      ],
      words: [
        { word: "advanced", es: "avanzado" },
        { word: "room", es: "salón" },
        { word: "better", es: "mejor" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Vale calls the supervisor who complained, standing by the window.",
      text: "Vale calls the student directly.",
      es: "Vale llama directamente a la estudiante.",
      speaker: "vale",
      lines: [
        { speaker: "vale", text: "I am sorry the class was too easy for you on Monday.", es: "«Lamento que la clase te haya quedado muy fácil el lunes»." },
        { speaker: "kat", text: "I have been in three programs. They always start from zero.", es: "«He estado en tres programas. Siempre empiezan desde cero»." },
        { speaker: "vale", text: "You will not start from zero here. I have moved you.", es: "«Aquí no vas a empezar desde cero. Te he cambiado de grupo»." },
      ],
      words: [
        { word: "sorry", es: "lo siento" },
        { word: "easy", es: "fácil" },
        { word: "moved", es: "cambiado / movido" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "The student listens on her phone in a busy corporate hallway.",
      text: "The student tests the answer.",
      es: "La estudiante pone a prueba la respuesta.",
      speaker: "kat",
      lines: [
        { speaker: "kat", text: "And what have you done for the other students?", es: "«¿Y qué has hecho por los demás estudiantes?»" },
        { speaker: "vale", text: "They keep the basic group, with the same teacher and more speaking.", es: "«Se quedan en el grupo básico, con la misma maestra y más práctica oral»." },
        { speaker: "kat", text: "Okay. That is the first real answer I have received.", es: "«Está bien. Esa es la primera respuesta real que he recibido»." },
      ],
      words: [
        { word: "keep", es: "conservar" },
        { word: "speaking", es: "hablar" },
        { word: "received", es: "recibido" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Camila teaches the basic group while students talk in pairs.",
      text: "In the other room, the basic group is louder than ever.",
      es: "En el otro salón, el grupo básico está más ruidoso que nunca.",
      speaker: "camila",
      lines: [
        { speaker: "camila", text: "Beto has been practicing since seven in the morning.", es: "«Beto ha estado practicando desde las siete de la mañana»." },
        { speaker: "beto", text: "I have said fourteen sentences today. I counted them.", es: "«He dicho catorce oraciones hoy. Las conté»." },
        { speaker: "camila", text: "Yesterday you said two. That is progress.", es: "«Ayer dijiste dos. Eso es progreso»." },
      ],
      words: [
        { word: "practicing", es: "practicando" },
        { word: "counted", es: "conté" },
        { word: "progress", es: "progreso" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Vale writes three words on the board: listen, explain, fix.",
      text: "Vale teaches the team her rule.",
      es: "Vale le enseña su regla al equipo.",
      speaker: "vale",
      lines: [
        { speaker: "vale", text: "When someone complains: listen, explain, fix. In that order.", es: "«Cuando alguien se queja: escucha, explica, resuelve. En ese orden»." },
        { speaker: "dani", text: "Most people explain first. That's why they lose the client.", es: "«La mayoría explica primero. Por eso pierde al cliente»." },
        { speaker: "vale", text: "A complaint is information. It is not an attack.", es: "«Una queja es información. No es un ataque»." },
      ],
      words: [
        { word: "listen", es: "escuchar" },
        { word: "order", es: "orden" },
        { word: "attack", es: "ataque" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "The director sends a short message on Vale's phone screen.",
      text: "Eleven minutes later, the director writes again.",
      es: "Once minutos después, el director escribe otra vez.",
      speaker: "boss",
      lines: [
        { speaker: "boss", text: "She has called me. She has changed her opinion.", es: "«Ella me ha llamado. Ha cambiado de opinión»." },
        { speaker: "vale", text: "She has not changed her opinion. We have changed the class.", es: "«No ha cambiado de opinión. Nosotros cambiamos la clase»." },
        { speaker: "boss", text: "Keep answering like that and we have no problem.", es: "«Sigue respondiendo así y no tenemos problema»." },
      ],
      words: [
        { word: "called", es: "llamado" },
        { word: "opinion", es: "opinión" },
        { word: "changed", es: "cambiado" },
      ],
    },
    {
      id: "s10",
      image: s10,
      imageAlt: "Vale and Dani stare at a laptop showing an error screen.",
      text: "At 4:58 p.m. the online platform stops working.",
      es: "A las 4:58 p.m. la plataforma en línea deja de funcionar.",
      speaker: "dani",
      lines: [
        { speaker: "dani", text: "Vale. The platform has been down for ten minutes.", es: "«Vale. La plataforma lleva diez minutos caída»." },
        { speaker: "vale", text: "The evening group starts in two hours.", es: "«El grupo de la noche empieza en dos horas»." },
        { speaker: "narrator", text: "Thirty students. No platform. Two hours.", es: "Treinta estudiantes. Sin plataforma. Dos horas." },
      ],
      words: [
        { word: "platform", es: "plataforma" },
        { word: "down", es: "caída / fuera de servicio" },
        { word: "hours", es: "horas" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s3",
      questionEn: "What was the real problem with the class?",
      questionEs: "¿Cuál era el problema real con la clase?",
      options: [
        { label: "The level was too basic for that student", emoji: "📉" },
        { label: "The teacher arrived late", emoji: "⏰" },
        { label: "The room was too small", emoji: "🚪" },
      ],
      answer: 0,
      sayIt: "The class was too basic for her. She has been working with clients for six years.",
      sayItEs: "Ejemplo: «The class was too basic for her. She has been working with clients for six years.»",
      sayItAskEn: "Tell me about a time something was too easy or too hard for you. Use: It was… because…",
      sayItAskEs: "Cuéntame de una vez que algo te resultó muy fácil o muy difícil. Usa: It was… because…",
      sayItCheck: {
        target: "It was * because *",
        altTargets: ["It was too easy because *", "It was difficult because *", "It was hard because *"],
      },
    },
    {
      id: "q2",
      afterScene: "s6",
      questionEn: "What did Vale do for the student who complained?",
      questionEs: "¿Qué hizo Vale por la estudiante que se quejó?",
      options: [
        { label: "She has moved her to an advanced group at the same hour", emoji: "🔁" },
        { label: "She gave her money back", emoji: "💵" },
        { label: "She removed her from the program", emoji: "🚫" },
      ],
      answer: 0,
      sayIt: "She has moved her to an advanced group.",
      sayItEs: "Ejemplo: «She has moved her to an advanced group.»",
      sayItAskEn: "Tell me one problem you have solved at work or at home. Use: I have solved…",
      sayItAskEs: "Dime un problema que has resuelto en el trabajo o en casa. Usa: I have solved…",
      sayItCheck: {
        target: "I have solved *",
        altTargets: ["I've solved *", "I have fixed *", "I have helped *"],
      },
    },
    {
      id: "q3",
      afterScene: "s8",
      questionEn: "What is Vale's rule for a complaint?",
      questionEs: "¿Cuál es la regla de Vale ante una queja?",
      options: [
        { label: "Listen, explain, fix — in that order", emoji: "🧭" },
        { label: "Explain first, then argue", emoji: "🗯️" },
        { label: "Wait until tomorrow", emoji: "🛌" },
      ],
      answer: 0,
      sayIt: "Listen, explain, fix. In that order.",
      sayItEs: "Ejemplo: «Listen, explain, fix. In that order.»",
      sayItAskEn: "A customer is angry. What have you been doing to solve it? Use: I have been…",
      sayItAskEs: "Un cliente está molesto. ¿Qué has estado haciendo para resolverlo? Usa: I have been…",
      sayItCheck: {
        target: "I have been *",
        altTargets: ["I've been *", "I have been working on *", "I have been listening *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s7",
    phrase: "I can do it, even when someone says no.",
    es: "Yo puedo, incluso cuando alguien dice que no.",
  },
  habitCard: {
    afterScene: "s3",
    phrase: "I listen completely before I answer. The first version of a problem is never the whole problem.",
    es: "Escucho completo antes de responder. La primera versión de un problema nunca es el problema entero.",
    model: "vale",
    modelActionEs: "Vale toma notas y confirma el problema antes de proponer nada.",
  },
  continuePrompt: {
    en: "Tell me about a complaint you have received or made. What happened? What have you done about it?",
    es: "Cuéntame de una queja que has recibido o hecho. ¿Qué pasó? ¿Qué has hecho al respecto?",
  },
  continueWith: ["It was ... because ...", "I have solved ...", "I have been ..."],
  cliffhanger: {
    en: "Episode 10: No platform, no plan, thirty students — and two hours on the clock.",
    es: "Episodio 10: Sin plataforma, sin plan, treinta estudiantes… y dos horas en el reloj.",
  },
};
