import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/tigers-ep4-what-needs-to-change/cover.jpg";
import s1 from "@/assets/storybook/tigers-ep4-what-needs-to-change/s1.jpg";
import s2 from "@/assets/storybook/tigers-ep4-what-needs-to-change/s2.jpg";
import s3 from "@/assets/storybook/tigers-ep4-what-needs-to-change/s3.jpg";
import s4 from "@/assets/storybook/tigers-ep4-what-needs-to-change/s4.jpg";
import s5 from "@/assets/storybook/tigers-ep4-what-needs-to-change/s5.jpg";
import s6 from "@/assets/storybook/tigers-ep4-what-needs-to-change/s6.jpg";
import s7 from "@/assets/storybook/tigers-ep4-what-needs-to-change/s7.jpg";
import s8 from "@/assets/storybook/tigers-ep4-what-needs-to-change/s8.jpg";
import s9 from "@/assets/storybook/tigers-ep4-what-needs-to-change/s9.jpg";
import s10 from "@/assets/storybook/tigers-ep4-what-needs-to-change/s10.jpg";
import s11 from "@/assets/storybook/tigers-ep4-what-needs-to-change/s11.jpg";

/**
 * Season 7 (Tigers) Episode 4 — "What needs to change?"
 * Matches Tigers Day 4 (needs to / has to / doesn't have to: priorities).
 */
export const TIGERS_EP4_WHAT_NEEDS_TO_CHANGE: StorybookEpisode = {
  id: "tigers-ep4-what-needs-to-change",
  moduleId: "tigers",
  week: 1,
  title: "What needs to change?",
  titleEs: "¿Qué necesita cambiar?",
  episodeLabel: { en: "Season 7 · Episode 4", es: "Temporada 7 · Episodio 4" },
  previously: [
    { en: "Don Tito advised lowering prices; Camila defended the value.", es: "Don Tito aconsejó bajar los precios; Camila defendió el valor." },
    { en: "The school launched a free monthly workshop.", es: "La escuela lanzó un taller gratis mensual." },
    { en: "Northline is waiting for the results report.", es: "Northline espera el reporte de resultados." },
  ],
  reviewWords: [
    { word: "advice", es: "consejo" },
    { word: "value", es: "valor" },
    { word: "workshop", es: "taller" },
  ],
  blurb: {
    en: "Before fighting BigTalk, the team looks in the mirror: an honest audit of everything that needs to change at the school.",
    es: "Antes de pelear con BigTalk, el equipo se mira al espejo: una auditoría honesta de todo lo que necesita cambiar en la escuela.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Vale pone una hoja gigante en la pared con el título auditoría honesta.",
      text: "Saturday, seven in the morning. One giant paper on the wall: Honest Audit.",
      es: "Sábado, siete de la mañana. Una hoja gigante en la pared: Auditoría Honesta.",
      speaker: "narrator",
      lines: [
        { speaker: "vale", text: "Today we look in the mirror. Nobody cries, everybody talks.", es: "«Hoy nos miramos al espejo. Nadie llora, todos hablan»." },
        { speaker: "vale", text: "What needs to change in this school? Everything goes on the wall.", es: "«¿Qué necesita cambiar en esta escuela? Todo va a la pared»." },
        { speaker: "dani", text: "Everything? Even you, boss?", es: "«¿Todo? ¿Hasta tú, jefa?»" },
        { speaker: "vale", text: "Especially me. Start.", es: "«Especialmente yo. Empieza»." },
      ],
      words: [
        { word: "audit", es: "auditoría" },
        { word: "mirror", es: "espejo" },
        { word: "wall", es: "pared" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Dani señala el aire acondicionado roto mientras todos sudan.",
      text: "The air conditioning needs to die in peace. It has to go this month.",
      es: "«El aire acondicionado necesita morir en paz. Tiene que irse este mes».",
      speaker: "dani",
      lines: [
        { speaker: "dani", text: "First: the air conditioning needs to die in peace.", es: "«Primero: el aire acondicionado necesita morir en paz»." },
        { speaker: "dani", text: "It makes a noise like a truck. It has to go this month.", es: "«Hace un ruido como camión. Tiene que irse este mes»." },
        { speaker: "vale", text: "Agreed. Students can't hear the lessons. On the wall.", es: "«De acuerdo. Los estudiantes no pueden oír las lecciones. A la pared»." },
      ],
      words: [
        { word: "noise", es: "ruido" },
        { word: "hear", es: "oír" },
        { word: "lessons", es: "lecciones" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Camila muestra la recepción desordenada con papeles y cajas.",
      text: "The reception has to look professional. Right now it looks like a garage sale.",
      es: "«La recepción tiene que verse profesional. Ahora parece venta de garaje».",
      speaker: "camila",
      lines: [
        { speaker: "camila", text: "The reception has to look professional.", es: "«La recepción tiene que verse profesional»." },
        { speaker: "camila", text: "Right now it looks like a garage sale. Boxes, cables, old papers.", es: "«Ahora parece venta de garaje. Cajas, cables, papeles viejos»." },
        { speaker: "vale", text: "True. BigTalk's reception looks like a hotel. Ours needs to change.", es: "«Cierto. La recepción de BigTalk parece hotel. La nuestra necesita cambiar»." },
      ],
      words: [
        { word: "reception", es: "recepción" },
        { word: "garage sale", es: "venta de garaje" },
        { word: "cables", es: "cables" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Mateo señala el horario escrito a mano en la puerta, medio borrado.",
      text: "Mateo arrived with coffee and added one more thing to the list.",
      es: "Mateo llegó con café y agregó una cosa más a la lista.",
      speaker: "narrator",
      lines: [
        { speaker: "mateo", text: "The schedule on the door is hand-written and half erased.", es: "«El horario en la puerta está escrito a mano y medio borrado»." },
        { speaker: "mateo", text: "That needs to change too. I'll print a new one, no charge.", es: "«Eso también necesita cambiar. Yo imprimo uno nuevo, sin costo»." },
        { speaker: "vale", text: "Accepted. What else?", es: "«Aceptado. ¿Qué más?»" },
      ],
      words: [
        { word: "schedule", es: "horario" },
        { word: "erased", es: "borrado" },
        { word: "charge", es: "costo" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Vale, con humildad, escribe su propio nombre en la pared.",
      text: "And me. I need to answer emails faster. Some clients wait three days.",
      es: "«Y yo. Necesito responder los correos más rápido. Algunos clientes esperan tres días».",
      speaker: "vale",
      lines: [
        { speaker: "vale", text: "Now me. I need to answer emails faster.", es: "«Ahora yo. Necesito responder los correos más rápido»." },
        { speaker: "vale", text: "Some clients wait three days for an answer. That has to change.", es: "«Algunos clientes esperan tres días por una respuesta. Eso tiene que cambiar»." },
        { speaker: "camila", text: "I can take the emails on Mondays and Wednesdays.", es: "«Yo puedo tomar los correos los lunes y miércoles»." },
        { speaker: "vale", text: "Deal. Thank you, Camila.", es: "«Trato hecho. Gracias, Camila»." },
      ],
      words: [
        { word: "answer", es: "responder" },
        { word: "wait", es: "esperar" },
        { word: "deal", es: "trato hecho" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "La pared llena de notas y el equipo mirando la lista larga.",
      text: "The wall was full: nine things. Dani looked at it and turned pale.",
      es: "La pared quedó llena: nueve cosas. Dani la miró y palideció.",
      speaker: "narrator",
      lines: [
        { speaker: "dani", text: "Nine things! We don't have to do everything this week, right?", es: "«¡Nueve cosas! No tenemos que hacer todo esta semana, ¿verdad?»" },
        { speaker: "vale", text: "No. We don't have to do everything at once. We have to choose priorities.", es: "«No. No tenemos que hacer todo de una vez. Tenemos que elegir prioridades»." },
        { speaker: "vale", text: "What fixes the student experience first?", es: "«¿Qué arregla la experiencia del estudiante primero?»" },
      ],
      words: [
        { word: "at once", es: "de una vez" },
        { word: "choose", es: "elegir" },
        { word: "priorities", es: "prioridades" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Camila marca con círculos las tres prioridades en la pared.",
      text: "Priority one, the air. Priority two, the emails. Priority three, the reception.",
      es: "«Prioridad uno, el aire. Prioridad dos, los correos. Prioridad tres, la recepción».",
      speaker: "camila",
      lines: [
        { speaker: "camila", text: "Priority one: the air conditioning. Students suffer every afternoon.", es: "«Prioridad uno: el aire acondicionado. Los estudiantes sufren cada tarde»." },
        { speaker: "camila", text: "Priority two: the emails. Priority three: the reception.", es: "«Prioridad dos: los correos. Prioridad tres: la recepción»." },
        { speaker: "mateo", text: "And the door schedule? That doesn't have to wait. I can do it today.", es: "«¿Y el horario de la puerta? Eso no tiene que esperar. Puedo hacerlo hoy»." },
      ],
      words: [
        { word: "suffer", es: "sufrir" },
        { word: "wait", es: "esperar" },
        { word: "today", es: "hoy" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Vale tacha algunas notas de la pared con calma.",
      text: "The new logo? That doesn't have to change. The orange chairs? They can stay.",
      es: "«¿El logo nuevo? Eso no tiene que cambiar. ¿Las sillas naranjas? Pueden quedarse».",
      speaker: "vale",
      lines: [
        { speaker: "vale", text: "Now, what doesn't have to change?", es: "«Ahora, ¿qué no tiene que cambiar?»" },
        { speaker: "vale", text: "The logo doesn't have to change. People already know it.", es: "«El logo no tiene que cambiar. La gente ya lo conoce»." },
        { speaker: "dani", text: "The orange chairs can stay. They're ugly but they're ours.", es: "«Las sillas naranjas pueden quedarse. Son feas pero son nuestras»." },
      ],
      words: [
        { word: "logo", es: "logo" },
        { word: "already", es: "ya" },
        { word: "stay", es: "quedarse" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Vale asigna tareas: Dani al aire, Camila a recepción, Mateo al horario.",
      text: "Every priority got a name and a date. The wall became a plan.",
      es: "Cada prioridad recibió un nombre y una fecha. La pared se convirtió en plan.",
      speaker: "narrator",
      lines: [
        { speaker: "vale", text: "Dani, you find three prices for the air conditioning by Tuesday.", es: "«Dani, busca tres precios para el aire acondicionado para el martes»." },
        { speaker: "vale", text: "Camila owns the reception and the emails. Mateo, the door schedule, today.", es: "«Camila es dueña de la recepción y los correos. Mateo, el horario de la puerta, hoy»." },
        { speaker: "camila", text: "And who checks that we actually do it?", es: "«¿Y quién revisa que de verdad lo hagamos?»" },
        { speaker: "vale", text: "Friday meeting, five o'clock. We check the wall together.", es: "«Reunión el viernes, cinco en punto. Revisamos la pared juntos»." },
      ],
      words: [
        { word: "owns", es: "es dueña de / se encarga de" },
        { word: "checks", es: "revisa" },
        { word: "together", es: "juntos" },
      ],
    },
    {
      id: "s10",
      image: s10,
      imageAlt: "Mateo pega el horario nuevo impreso en la puerta, sonriendo.",
      text: "That same afternoon, the new schedule went up on the door. First change: done.",
      es: "Esa misma tarde, el horario nuevo quedó en la puerta. Primer cambio: listo.",
      speaker: "mateo",
      lines: [
        { speaker: "mateo", text: "Done! First change of the audit: complete.", es: "«¡Listo! Primer cambio de la auditoría: completo»." },
        { speaker: "vale", text: "See? We don't have to change everything today.", es: "«¿Ven? No tenemos que cambiar todo hoy»." },
        { speaker: "vale", text: "We have to start. Starting is the whole secret.", es: "«Tenemos que empezar. Empezar es todo el secreto»." },
      ],
      words: [
        { word: "complete", es: "completo" },
        { word: "start", es: "empezar" },
        { word: "secret", es: "secreto" },
      ],
    },
    {
      id: "s11",
      image: s11,
      imageAlt: "Vale resume la auditoría frente a la pared, hablando con needs to, has to y doesn't have to.",
      text: "Vale reviews the audit one more time, clear and organized.",
      es: "Vale repasa la auditoría una vez más, clara y organizada.",
      speaker: "vale",
      lines: [
        { speaker: "camila", text: "Okay, boss. Summarize the audit for us.", es: "«Bueno, jefa. Resúmenos la auditoría»." },
        { speaker: "vale", text: "The air conditioning has to go this month — it's priority one.", es: "«El aire acondicionado tiene que irse este mes: es la prioridad uno»." },
        { speaker: "vale", text: "The reception and the emails need to improve, and they have owners and dates.", es: "«La recepción y los correos necesitan mejorar, y ya tienen dueños y fechas»." },
        { speaker: "vale", text: "The logo doesn't have to change, and we don't have to do everything at once.", es: "«El logo no tiene que cambiar, y no tenemos que hacer todo de una vez»." },
      ],
      words: [
        { word: "improve", es: "mejorar" },
        { word: "owners", es: "responsables" },
        { word: "dates", es: "fechas" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s3",
      questionEn: "What were the first two problems on the wall?",
      questionEs: "¿Cuáles fueron los primeros dos problemas en la pared?",
      options: [
        { label: "The air conditioning and the reception", emoji: "🧊" },
        { label: "The logo and the chairs", emoji: "🪑" },
        { label: "The teachers and the students", emoji: "🧑‍🏫" },
      ],
      answer: 0,
      sayIt: "The air conditioning has to go, and the reception needs to change.",
      sayItEs: "Ejemplo: «The air conditioning has to go, and the reception needs to change.»",
      sayItAskEn: "What needs to change in your house, school or work? Tell me one thing.",
      sayItAskEs: "¿Qué necesita cambiar en tu casa, escuela o trabajo? Dime una cosa.",
      sayItCheck: {
        target: "* needs to change",
        altTargets: ["The * needs to *", "* has to change", "My * needs to *"],
      },
    },
    {
      id: "q2",
      afterScene: "s7",
      questionEn: "What was priority number one, and why?",
      questionEs: "¿Cuál fue la prioridad número uno y por qué?",
      options: [
        { label: "The air, because students suffer every afternoon", emoji: "🥵" },
        { label: "The logo, because it was old", emoji: "🎨" },
        { label: "The chairs, because they were ugly", emoji: "🪑" },
      ],
      answer: 0,
      sayIt: "The air conditioning is priority one because students suffer every afternoon.",
      sayItEs: "Ejemplo: «The air conditioning is priority one because students suffer every afternoon.»",
      sayItAskEn: "What has to change first in your life? Why is it the priority?",
      sayItAskEs: "¿Qué tiene que cambiar primero en tu vida? ¿Por qué es la prioridad?",
      sayItCheck: {
        target: "* has to * because *",
        altTargets: ["The priority is * because *", "First, * needs to * because *"],
      },
    },
    {
      id: "q3",
      afterScene: "s8",
      questionEn: "What doesn't have to change, according to the team?",
      questionEs: "¿Qué no tiene que cambiar, según el equipo?",
      options: [
        { label: "The logo and the orange chairs", emoji: "🟠" },
        { label: "The air conditioning", emoji: "❄️" },
        { label: "The reception", emoji: "🗄️" },
      ],
      answer: 0,
      sayIt: "The logo doesn't have to change, and the chairs can stay.",
      sayItEs: "Ejemplo: «The logo doesn't have to change, and the chairs can stay.»",
      sayItAskEn: "What doesn't have to change in your life? Tell me something that's fine as it is.",
      sayItAskEs: "¿Qué no tiene que cambiar en tu vida? Dime algo que está bien así.",
      sayItCheck: {
        target: "* doesn't have to change",
        altTargets: ["* don't have to *", "I don't have to *", "We don't have to *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s6",
    phrase: "Mistakes are part of the process. I fix one thing at a time.",
    es: "Los errores son parte del proceso. Arreglo una cosa a la vez.",
  },
  habitCard: {
    afterScene: "s5",
    phrase: "I look in the mirror without fear. An honest list is the first step to improving.",
    es: "Me miro al espejo sin miedo. Una lista honesta es el primer paso para mejorar.",
    model: "vale",
    modelActionEs: "Vale escribe su propio error en la pared antes que el de los demás.",
  },
  continuePrompt: {
    en: "Do a mini audit of your life. What needs to change? What has to change first? And what doesn't have to change at all?",
    es: "Haz una mini auditoría de tu vida. ¿Qué necesita cambiar? ¿Qué tiene que cambiar primero? ¿Y qué no tiene que cambiar para nada?",
  },
  continueWith: ["... needs to change because ...", "First, ... has to ...", "... doesn't have to change."],
  cliffhanger: {
    en: "Episode 5: BigTalk offers to buy the school. What would you do?",
    es: "Episodio 5: BigTalk ofrece comprar la escuela. ¿Qué harías tú?",
  },
};
