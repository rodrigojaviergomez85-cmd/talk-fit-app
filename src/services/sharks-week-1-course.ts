/**
 * SHARKS — ADAPT, IMPROVISE & KEEP THE CONVERSATION GOING · WEEK 1 (Days 1–5)
 *
 * Upper-intermediate · Month 3 (EAGLES → TIGERS → SHARKS). Same 5-Rep engine;
 * the defining behavior is REACTING FAST — telling a story, weighing
 * possibilities, changing advice when new facts appear, re-prioritizing under
 * pressure, and holding a decision together while conditions keep shifting.
 *
 * DATA SAFETY: the module id ("sharks"), the day numbers and every `s1-*`…
 * `s5-*` id are persisted in learner progress and recordings. Never rename.
 * Weeks 2–4 live in sharks-weeks-2-4-course.ts and are appended after these.
 *
 * Every interlocutor turn is FIXED and prewritten — no generative AI.
 */
import type { CourseDay, PersonalPrompt, RepLabel } from "@/lib/types";
import { l, makeDay, type EaglesDayInput, type WeekMeta } from "./eagles-week-1-course";
import { q, chunks4 } from "./tigers-week-1-course";

export { q, chunks4 };

import sceneD1 from "@/assets/sharks/scene-d01.jpg";
import sceneD2 from "@/assets/sharks/scene-d02.jpg";
import sceneD3 from "@/assets/sharks/scene-d03.jpg";
import sceneD4 from "@/assets/sharks/scene-d04.jpg";
import sceneD5 from "@/assets/sharks/scene-d05.jpg";

export const SHARKS_WEEKS: (WeekMeta & { subtitle: string; behavior: string })[] = [
  {
    week: 1,
    title: "Think Fast, React & Adapt",
    subtitle: "Tell a story · Predict outcomes · Advise · Prioritize · Adapt to change",
    subtitleEs: "Contar una historia · Predecir resultados · Aconsejar · Priorizar · Adaptarse al cambio",
    behavior: "REACT",
  },
  {
    week: 2,
    title: "Clarify, Rephrase & Recover",
    subtitle: "Life in the big city · Tell me more · Catching up · Say it another way · Get the facts right",
    subtitleEs: "Vida en la gran ciudad · Cuéntame más · Poniéndose al día · Dilo de otra forma · Confirma los datos",
    behavior: "RECOVER",
  },
  {
    week: 3,
    title: "Argue, Persuade & Change Your Mind",
    subtitle: "Then vs now · Make a fast choice · Take a side · Changing priorities · Mini debate",
    subtitleEs: "Antes vs ahora · Decide rápido · Toma una postura · Prioridades cambiantes · Mini debate",
    behavior: "PERSUADE",
  },
  {
    week: 4,
    title: "Lead, Adapt & Improvise",
    subtitle: "The future is uncertain · Something I've always wanted to do · My English journey · Keep the conversation going · SHARKS final",
    subtitleEs: "El futuro es incierto · Algo que siempre quise hacer · Mi camino con el inglés · Sigue la conversación · Final de SHARKS",
    behavior: "IMPROVISE",
  },
];

export function sharksDay(input: EaglesDayInput): CourseDay {
  return makeDay({ estimatedMinutes: "8–11 min", ...input }, SHARKS_WEEKS);
}

const START = "START REP 1";

/* ============================ DAY 1 — TELL THE STORY ============================ */

const d1 = sharksDay({
  day: 1,
  topic: "Tell the Story",
  topicEs: "Cuenta la historia",
  focus: "Simple past — tell a memorable experience and react to the unexpected",
  focusEs: "Pasado simple — cuenta una experiencia memorable y reacciona a lo inesperado",
  intro: {
    title: "TELL THE STORY",
    titleEs: "CUENTA LA HISTORIA",
    lead: "Something memorable happened to you, and then something unexpected changed it. Tell it in order, and react.",
    leadEs: "Algo memorable te pasó, y luego algo inesperado lo cambió todo. Cuéntalo en orden y reacciona.",
    examples: ["At first, everything was going normally.", "What happened next was completely unexpected.", "Looking back, I think everyone handled it well."],
    goal: "Speak for 75–90 seconds. Connect 8 ideas.",
    goalEs: "Habla 75–90 segundos. Conecta 8 ideas.",
    cta: START,
  },
  lines: [
    l("s1-1", "Last Christmas, | I went to my grandmother's house | because my whole family was getting together.", "La Navidad pasada fui a la casa de mi abuela porque toda mi familia se iba a reunir."),
    l("s1-2", "At first, | everything was going normally.", "Al principio, todo iba normal."),
    l("s1-3", "We had dinner together | and talked for a long time.", "Cenamos juntos y hablamos durante mucho tiempo."),
    l("s1-4", "While we were eating, | something unexpected happened.", "Mientras comíamos, pasó algo inesperado."),
    l("s1-5", "The electricity suddenly went out.", "La electricidad se fue de repente."),
    l("s1-6", "What happened next was | we used our phones for light | and kept talking.", "Lo que pasó después fue que usamos nuestros teléfonos como luz y seguimos hablando."),
    l("s1-7", "In the end, | the problem actually made the night more memorable.", "Al final, el problema en realidad hizo la noche más memorable."),
    l("s1-8", "Looking back, | I think everyone handled the situation well.", "Mirando atrás, creo que todos manejaron bien la situación."),
  ],
  rep2Chunks: chunks4("s1"),
  prompts: [
    q("s1-p1", "What happened?", "¿Qué pasó?", "Last… I… because…", "Hace… yo… porque…", "ANSWER"),
    q("s1-p2", "Why was it memorable?", "¿Por qué fue memorable?", "It was memorable because…", "Fue memorable porque…", "WHY", "explain"),
    q("s1-p3", "What happened unexpectedly?", "¿Qué pasó inesperadamente?", "What happened next was…", "Lo que pasó después fue…", "UNEXPECTED", "react"),
    q("s1-p4", "How did you react?", "¿Cómo reaccionaste?", "At first I… but then…", "Al principio yo… pero luego…", "REACT", "react"),
    q("s1-p5", "Looking back, what would you do differently?", "Mirando atrás, ¿qué harías diferente?", "Looking back, I would…", "Mirando atrás, yo…", "REFLECT", "adapt"),
  ],
  cues: ["EVENT", "AT FIRST", "UNEXPECTED", "REACTION", "LOOKING BACK"],
  powerChunks: { core: ["at first…", "what happened next was…"], stretch: "looking back…" },
  sceneImage: { src: sceneD1, alt: "A family dinner by candlelight after the electricity suddenly went out", altEs: "Una cena familiar a la luz de velas después de que se fue la electricidad de repente" },
  goalSeconds: [75, 90],
  goalSentences: 8,
  rep5Prompt: { question: "Tell me about a memorable experience.", questionEs: "Cuéntame sobre una experiencia memorable." },
  rep5Tips: {
    en: "Set the scene → at first… → what happened next was… (the unexpected part) → how you reacted → looking back… Take 5–10 seconds to think before you start.",
    es: "Presenta la escena → at first… → what happened next was… (lo inesperado) → cómo reaccionaste → looking back… Tómate 5–10 segundos para pensar antes de empezar.",
  },
  rep5Label: "react",
  rep5Turns: [
    { id: "s1-turn1", label: "INTERVIEWER", labelEs: "ENTREVISTADORA", text: "Tell me about a memorable experience.", es: "Cuéntame sobre una experiencia memorable.", voice: "female" },
    { id: "s1-turn2", label: "INTERVIEWER", labelEs: "ENTREVISTADORA", text: "What if the same problem happened again today?", es: "¿Y si el mismo problema pasara otra vez hoy?", voice: "female" },
  ],
  rep5Toolbox: ["At first…", "What happened next was…", "Looking back…", "I reacted by…", "In the end…"],
  speakerVoice: "female",
  testReady: {
    type: "story-retell",
    title: "STORY RETELL",
    titleEs: "VUELVE A CONTARLO",
    instruction: "Listen once. Then retell: what happened, what changed, the reaction and the result.",
    instructionEs: "Escucha una vez. Luego cuenta: qué pasó, qué cambió, la reacción y el resultado.",
    passage:
      "Last summer, Diego organized a big barbecue for his friends. At first, everything was going well: good food, music, everyone was happy. While they were eating, it suddenly started to rain very hard. Diego and his friends quickly moved everything inside his small apartment. It was crowded and a little chaotic, but everyone laughed about it and stayed for hours. In the end, Diego says it was one of the best afternoons he's had in years.",
    speakSeconds: 40,
    items: [
      {
        id: "s1-tr1",
        text: "Retell what happened: the event, what changed, the reaction, and the result.",
        textEs: "Cuenta lo que pasó: el evento, qué cambió, la reacción y el resultado.",
        chunks: ["WHAT HAPPENED?", "WHAT CHANGED?", "REACTION?", "RESULT?"],
        maxSeconds: 40,
      },
    ],
  },
});

/* ============================ DAY 2 — WHAT COULD HAPPEN NEXT? ============================ */

const d2 = sharksDay({
  day: 2,
  topic: "What Could Happen Next?",
  topicEs: "¿Qué podría pasar después?",
  focus: "Modals — might · could · would — consider more than one outcome",
  focusEs: "Modales — might · could · would — considera más de un resultado",
  intro: {
    title: "WHAT COULD HAPPEN NEXT?",
    titleEs: "¿QUÉ PODRÍA PASAR DESPUÉS?",
    lead: "A friend gets a job in another country. Don't list isolated outcomes — connect them: possibility → reason → risk → it depends.",
    leadEs: "Un amigo consigue trabajo en otro país. No enumeres resultados aislados: conéctalos: posibilidad → razón → riesgo → depende.",
    examples: ["One possibility is that he might love living abroad because he'll experience a new culture.", "At the same time, he could feel lonely at first.", "It depends on how quickly he adapts."],
    goal: "Speak for 75–90 seconds. Weigh at least 3 outcomes.",
    goalEs: "Habla 75–90 segundos. Considera al menos 3 resultados.",
    cta: START,
  },
  lines: [
    l("s2-1", "My friend just got a job in another country, | and a lot could happen from here.", "Mi amigo acaba de conseguir trabajo en otro país, y podrían pasar muchas cosas desde aquí."),
    l("s2-2", "One possibility is that | he might love living abroad | because he'll experience a new culture.", "Una posibilidad es que le encante vivir en el extranjero porque va a experimentar una cultura nueva."),
    l("s2-3", "His career could also grow faster, | and he might earn a better salary.", "Su carrera también podría crecer más rápido, y podría ganar un mejor salario."),
    l("s2-4", "At the same time, | he could feel lonely at first | because he won't know anyone.", "Al mismo tiempo, podría sentirse solo al principio porque no conocerá a nadie."),
    l("s2-5", "He might also experience some culture shock | during the first few months.", "También podría sufrir un poco de choque cultural durante los primeros meses."),
    l("s2-6", "However, | those new experiences could open doors | he never expected.", "Sin embargo, esas experiencias nuevas podrían abrirle puertas que nunca esperó."),
    l("s2-7", "It depends on | how quickly he adapts | to the new environment.", "Depende de qué tan rápido se adapte al nuevo entorno."),
    l("s2-8", "Overall, | I think the risk is worth it | if he stays open-minded.", "En general, creo que el riesgo vale la pena si mantiene la mente abierta."),
  ],
  rep2Chunks: chunks4("s2"),
  prompts: [
    q("s2-p1", "What might happen?", "¿Qué podría pasar?", "One possibility is that…", "Una posibilidad es que…", "ANSWER"),
    q("s2-p2", "Why?", "¿Por qué?", "…because…", "…porque…", "WHY", "explain"),
    q("s2-p3", "What is another possibility?", "¿Cuál es otra posibilidad?", "At the same time, he could…", "Al mismo tiempo, podría…", "MORE", "explain"),
    q("s2-p4", "What problem could happen?", "¿Qué problema podría pasar?", "However, he might…", "Sin embargo, podría…", "RISK", "react"),
    q("s2-p5", "Which outcome do you think is most likely?", "¿Qué resultado crees que es más probable?", "It depends on… but I think…", "Depende de… pero creo que…", "LIKELY", "adapt"),
  ],
  cues: ["POSSIBILITY 1", "WHY", "POSSIBILITY 2", "RISK", "IT DEPENDS"],
  powerChunks: { core: ["one possibility is…", "at the same time…"], stretch: "it depends on…" },
  sceneImage: { src: sceneD2, alt: "A friend packing a suitcase for a new job abroad, surrounded by thought bubbles of growth, loneliness and new experiences", altEs: "Un amigo empacando una maleta para un nuevo trabajo en el extranjero, rodeado de pensamientos sobre crecimiento, soledad y experiencias nuevas" },
  goalSeconds: [75, 90],
  goalSentences: 8,
  rep5Prompt: { question: "Explain what could happen if someone moved to another country for work.", questionEs: "Explica qué podría pasar si alguien se mudara a otro país por trabajo." },
  rep5Tips: {
    en: "one possibility is… + because → at the same time… (a risk) → it depends on… → close with your overall opinion. Take 5–10 seconds to think first.",
    es: "one possibility is… + because → at the same time… (un riesgo) → it depends on… → cierra con tu opinión general. Tómate 5–10 segundos para pensar primero.",
  },
  rep5Label: "adapt",
  rep5Toolbox: ["One possibility is…", "At the same time…", "It depends on…", "However…", "Overall…"],
  speakerVoice: "male",
});

/* ============================ DAY 3 — ADVICE UNDER PRESSURE ============================ */

const d3 = sharksDay({
  day: 3,
  topic: "Advice Under Pressure",
  topicEs: "Consejo bajo presión",
  focus: "Modals — should · would · could — give advice and change it with new facts",
  focusEs: "Modales — should · would · could — aconseja y cambia tu consejo con nuevos datos",
  intro: {
    title: "ADVICE UNDER PRESSURE",
    titleEs: "CONSEJO BAJO PRESIÓN",
    lead: "Sarah spends too much money. Give her advice — then new information appears, and you must adapt without losing confidence.",
    leadEs: "Sarah gasta demasiado dinero. Dale un consejo; luego aparece nueva información y debes adaptarte sin perder confianza.",
    examples: ["Based on what I know, I would suggest she track every purchase.", "Based on that new information, my advice is a bit different.", "The most important change she should make is…"],
    goal: "Advice role play: 4 fixed turns. Speak 75–90 seconds in total.",
    goalEs: "Role play de consejo: 4 turnos fijos. Habla 75–90 segundos en total.",
    cta: START,
  },
  lines: [
    l("s3-1", "Sarah spends too much money | and she rarely saves anything.", "Sarah gasta demasiado dinero y casi nunca ahorra nada."),
    l("s3-2", "She buys things impulsively | and uses her credit cards frequently.", "Compra cosas por impulso y usa sus tarjetas de crédito con frecuencia."),
    l("s3-3", "Based on what I know, | I would suggest she make a monthly budget.", "Según lo que sé, le sugeriría que hiciera un presupuesto mensual."),
    l("s3-4", "She should also | leave her credit cards at home | when she goes shopping.", "También debería dejar sus tarjetas de crédito en casa cuando va de compras."),
    l("s3-5", "However, | I just learned that most of her expenses are actually medical.", "Sin embargo, acabo de saber que la mayoría de sus gastos son en realidad médicos."),
    l("s3-6", "Based on that new information, | my advice is a bit different now.", "Basándome en esa nueva información, mi consejo es un poco diferente ahora."),
    l("s3-7", "She should still | control her online shopping, | but medical costs are not her fault.", "Aún debería controlar sus compras en línea, pero los gastos médicos no son su culpa."),
    l("s3-8", "Overall, | the most important change | is separating necessary costs from impulse spending.", "En general, el cambio más importante es separar los gastos necesarios de los gastos impulsivos."),
  ],
  rep2Chunks: chunks4("s3"),
  prompts: [
    q("s3-p1", "What should Sarah do?", "¿Qué debería hacer Sarah?", "Based on what I know, I would suggest…", "Según lo que sé, sugeriría…", "ANSWER"),
    q("s3-p2", "Why?", "¿Por qué?", "…because…", "…porque…", "WHY", "explain"),
    q("s3-p3", "Which change should come first?", "¿Qué cambio debería ir primero?", "The first thing she should do is…", "Lo primero que debería hacer es…", "PRIORITY", "justify"),
    q("s3-p4", "What other option could help?", "¿Qué otra opción podría ayudar?", "Another option would be to…", "Otra opción sería…", "OPTION", "explain"),
    q("s3-p5", "What information could change your advice?", "¿Qué información podría cambiar tu consejo?", "My advice could change if…", "Mi consejo podría cambiar si…", "CLARIFY", "clarify"),
  ],
  cues: ["PROBLEM", "ADVICE", "NEW FACT", "ADAPT", "MOST IMPORTANT"],
  powerChunks: { core: ["based on what I know…", "I would suggest…"], stretch: "based on that new information…" },
  sceneImage: { src: sceneD3, alt: "Sarah looking at a pile of receipts and credit card statements, with a medical bill highlighted among them", altEs: "Sarah mirando un montón de recibos y estados de cuenta, con una factura médica resaltada entre ellos" },
  goalSeconds: [75, 90],
  goalSentences: 8,
  rep5Prompt: { question: "Sarah spends too much money and never saves. What advice would you give her?", questionEs: "Sarah gasta demasiado dinero y nunca ahorra. ¿Qué consejo le darías?" },
  rep5Tips: {
    en: "Turn 1: based on what I know… + I would suggest… Turn 2: adapt with based on that new information… Turn 3: hold your improved advice. Take 5–10 seconds before each turn.",
    es: "Turno 1: based on what I know… + I would suggest… Turno 2: adapta con based on that new information… Turno 3: mantén tu consejo mejorado. Tómate 5–10 segundos antes de cada turno.",
  },
  rep5Label: "adapt",
  rep5Turns: [
    { id: "s3-turn1", label: "COACH", labelEs: "COACH", text: "Sarah spends too much money and never saves. What advice would you give her?", es: "Sarah gasta demasiado dinero y nunca ahorra. ¿Qué consejo le darías?", voice: "male" },
    { id: "s3-turn2", label: "COACH", labelEs: "COACH", text: "New information: most of Sarah's expenses are actually medical and necessary.", es: "Nueva información: la mayoría de los gastos de Sarah son en realidad médicos y necesarios.", voice: "male" },
    { id: "s3-turn3", label: "COACH", labelEs: "COACH", text: "She still spends too much on online shopping. What would you recommend now?", es: "Aun así gasta demasiado en compras en línea. ¿Qué recomendarías ahora?", voice: "male" },
    { id: "s3-turn4", label: "COACH", labelEs: "COACH", text: "What is the most important change she should make?", es: "¿Cuál es el cambio más importante que debería hacer?", voice: "male" },
  ],
  rep5Toolbox: ["Based on what I know…", "I would suggest…", "Based on that new information…", "The most important change is…", "Overall…"],
  speakerVoice: "male",
  testReady: {
    type: "listen-respond",
    title: "LISTEN & RESPOND",
    titleEs: "ESCUCHA Y RESPONDE",
    instruction: "Listen to the two-part situation once. Then answer 4 questions out loud.",
    instructionEs: "Escucha la situación en dos partes una vez. Luego responde 4 preguntas en voz alta.",
    passage:
      "Part 1: Tomás never saves money. He eats out every day and buys new gadgets every month. His friend thinks he should cut all unnecessary spending immediately. Part 2 — new information: Tomás recently found out his mother needs monthly medical treatment, and he has been quietly paying part of the cost every month.",
    items: [
      { id: "s3-tr1", audio: "What was the first problem you heard about Tomás?", text: "What was the first problem you heard about Tomás?", textEs: "¿Cuál fue el primer problema que escuchaste sobre Tomás?", maxSeconds: 15 },
      { id: "s3-tr2", audio: "What new information appeared?", text: "What new information appeared?", textEs: "¿Qué nueva información apareció?", maxSeconds: 15 },
      { id: "s3-tr3", audio: "Did your recommendation change? Why?", text: "Did your recommendation change? Why?", textEs: "¿Cambió tu recomendación? ¿Por qué?", maxSeconds: 20 },
      { id: "s3-tr4", audio: "What is the most important change Tomás should make now?", text: "What is the most important change Tomás should make now?", textEs: "¿Cuál es el cambio más importante que Tomás debería hacer ahora?", maxSeconds: 15 },
    ],
  },
});

/* ============================ DAY 4 — PRIORITIZE THE PROBLEM ============================ */

const d4 = sharksDay({
  day: 4,
  topic: "Prioritize the Problem",
  topicEs: "Prioriza el problema",
  focus: "Semi-modals — needs to · has to · doesn't have to — reprioritize under pressure",
  focusEs: "Semi-modales — needs to · has to · doesn't have to — reprioriza bajo presión",
  intro: {
    title: "PRIORITIZE THE PROBLEM",
    titleEs: "PRIORIZA EL PROBLEMA",
    lead: "You have five tasks today and everything seems important. Decide what comes first, then re-prioritize when time suddenly changes.",
    leadEs: "Tienes cinco tareas hoy y todo parece importante. Decide qué va primero, y luego reprioriza cuando el tiempo cambia de repente.",
    examples: ["The first thing we need to do is answer the urgent client email.", "This can wait because it's not time-sensitive.", "Considering the situation, my new priority order is…"],
    goal: "Workplace role play: 4 fixed turns. Speak 75–90 seconds in total.",
    goalEs: "Role play de trabajo: 4 turnos fijos. Habla 75–90 segundos en total.",
    cta: START,
  },
  lines: [
    l("s4-1", "Today I have several tasks, | and at first they all seem important.", "Hoy tengo varias tareas, y al principio todas parecen importantes."),
    l("s4-2", "I need to answer an urgent client email, | prepare a report, | and attend a meeting.", "Necesito responder un correo urgente de un cliente, preparar un informe y asistir a una reunión."),
    l("s4-3", "I also have to update a spreadsheet | and call a supplier.", "También tengo que actualizar una hoja de cálculo y llamar a un proveedor."),
    l("s4-4", "The first thing we need to do | is answer the client, | because they're waiting for an answer.", "Lo primero que necesitamos hacer es responder al cliente, porque está esperando una respuesta."),
    l("s4-5", "The spreadsheet can wait | because nobody needs it until Friday.", "La hoja de cálculo puede esperar porque nadie la necesita hasta el viernes."),
    l("s4-6", "However, | I just found out I only have thirty minutes | before an important meeting.", "Sin embargo, acabo de saber que solo tengo treinta minutos antes de una reunión importante."),
    l("s4-7", "Considering the situation, | I need to prepare for the meeting first | and call the supplier later.", "Considerando la situación, necesito prepararme para la reunión primero y llamar al proveedor después."),
    l("s4-8", "In the end, | doesn't have to happen today | is the spreadsheet, and that's fine.", "Al final, lo que no tiene que pasar hoy es la hoja de cálculo, y está bien."),
  ],
  rep2Chunks: chunks4("s4"),
  prompts: [
    q("s4-p1", "What needs to happen first?", "¿Qué necesita pasar primero?", "The first thing we need to do is…", "Lo primero que necesitamos hacer es…", "ANSWER"),
    q("s4-p2", "Why?", "¿Por qué?", "…because…", "…porque…", "WHY", "explain"),
    q("s4-p3", "What can wait?", "¿Qué puede esperar?", "This can wait because…", "Esto puede esperar porque…", "WAIT", "justify"),
    q("s4-p4", "What doesn't have to happen immediately?", "¿Qué no tiene que pasar de inmediato?", "…doesn't have to happen today because…", "…no tiene que pasar hoy porque…", "NOT YET", "justify"),
    q("s4-p5", "How would you prioritize everything?", "¿Cómo priorizarías todo?", "Considering the situation, my priority is…", "Considerando la situación, mi prioridad es…", "PRIORITIZE", "adapt"),
  ],
  cues: ["TASKS", "FIRST", "CAN WAIT", "TIME CHANGES", "NEW ORDER"],
  powerChunks: { core: ["the first thing we need to do is…", "this can wait because…"], stretch: "considering the situation…" },
  sceneImage: { src: sceneD4, alt: "A cluttered desk with five sticky notes: urgent email, report, meeting, spreadsheet and supplier call, next to a clock showing thirty minutes left", altEs: "Un escritorio lleno de notas: correo urgente, informe, reunión, hoja de cálculo y llamada a un proveedor, junto a un reloj que marca treinta minutos" },
  goalSeconds: [75, 90],
  goalSentences: 8,
  rep5Prompt: { question: "You have five tasks today. What is your priority order, and why?", questionEs: "Tienes cinco tareas hoy. ¿Cuál es tu orden de prioridad y por qué?" },
  rep5Tips: {
    en: "Name the tasks → the first thing we need to do is… → this can wait because… → when the situation changes, use considering the situation… to reorder. Take 5–10 seconds to think.",
    es: "Nombra las tareas → the first thing we need to do is… → this can wait because… → cuando la situación cambie, usa considering the situation… para reordenar. Tómate 5–10 segundos para pensar.",
  },
  rep5Label: "adapt",
  rep5Turns: [
    { id: "s4-turn1", label: "MANAGER", labelEs: "GERENTE", text: "You have all these tasks today. What would you do first?", es: "Tienes todas estas tareas hoy. ¿Qué harías primero?", voice: "female" },
    { id: "s4-turn2", label: "MANAGER", labelEs: "GERENTE", text: "You just found out you only have 30 minutes before an important meeting.", es: "Acabas de saber que solo tienes 30 minutos antes de una reunión importante.", voice: "female" },
    { id: "s4-turn3", label: "MANAGER", labelEs: "GERENTE", text: "One more thing — one task can wait until tomorrow.", es: "Una cosa más: una tarea puede esperar hasta mañana.", voice: "female" },
    { id: "s4-turn4", label: "MANAGER", labelEs: "GERENTE", text: "So what's your new priority order?", es: "Entonces, ¿cuál es tu nuevo orden de prioridad?", voice: "female" },
  ],
  rep5Toolbox: ["The first thing we need to do is…", "This can wait because…", "Considering the situation…", "…doesn't have to happen today.", "My new priority is…"],
  speakerVoice: "female",
});

/* ============================ DAY 5 — UNEXPECTED SITUATION ============================ */

const d5 = sharksDay({
  day: 5,
  topic: "Unexpected Situation",
  topicEs: "Situación inesperada",
  focus: "Second conditional — decide while conditions keep changing",
  focusEs: "Segundo condicional — decide mientras las condiciones siguen cambiando",
  intro: {
    title: "UNEXPECTED SITUATION",
    titleEs: "SITUACIÓN INESPERADA",
    lead: "If you could live anywhere in the world, where would you live? Decide — then keep your answer alive as new conditions appear.",
    leadEs: "Si pudieras vivir en cualquier lugar del mundo, ¿dónde vivirías? Decide, y mantén tu respuesta viva mientras aparecen nuevas condiciones.",
    examples: ["If I had the opportunity, I would probably live in Canada.", "If that changed, I would have to reconsider.", "I would still choose the same place because…"],
    goal: "Decision role play: 4 fixed turns. Speak 75–90 seconds in total.",
    goalEs: "Role play de decisión: 4 turnos fijos. Habla 75–90 segundos en total.",
    cta: START,
  },
  lines: [
    l("s5-1", "If I had the opportunity to live anywhere, | I would probably choose Canada.", "Si tuviera la oportunidad de vivir en cualquier lugar, probablemente elegiría Canadá."),
    l("s5-2", "I would probably live in a big city | because there would be more job opportunities.", "Probablemente viviría en una ciudad grande porque habría más oportunidades laborales."),
    l("s5-3", "The biggest advantage would be | the quality of life | and the healthcare system.", "La mayor ventaja sería la calidad de vida y el sistema de salud."),
    l("s5-4", "However, | the weather would be difficult | because I'm used to a warmer climate.", "Sin embargo, el clima sería difícil porque estoy acostumbrado a un clima más cálido."),
    l("s5-5", "If that changed, | for example if the salary there was much lower, | I would have to reconsider.", "Si eso cambiara, por ejemplo si el salario ahí fuera mucho más bajo, tendría que reconsiderarlo."),
    l("s5-6", "If my family couldn't move with me, | that would also change everything.", "Si mi familia no pudiera mudarse conmigo, eso también cambiaría todo."),
    l("s5-7", "Even so, | I think I would still choose the same place | in the end.", "Aun así, creo que al final seguiría eligiendo el mismo lugar."),
    l("s5-8", "The main reason is that | the long-term opportunity would be worth the short-term difficulty.", "La razón principal es que la oportunidad a largo plazo valdría la pena el reto a corto plazo."),
  ],
  rep2Chunks: chunks4("s5"),
  prompts: [
    q("s5-p1", "Where would you live?", "¿Dónde vivirías?", "If I had the opportunity, I would…", "Si tuviera la oportunidad, yo…", "ANSWER"),
    q("s5-p2", "Why?", "¿Por qué?", "…because…", "…porque…", "WHY", "explain"),
    q("s5-p3", "What would be the biggest advantage?", "¿Cuál sería la mayor ventaja?", "The biggest advantage would be…", "La mayor ventaja sería…", "ADVANTAGE", "explain"),
    q("s5-p4", "What would be difficult?", "¿Qué sería difícil?", "However, it would be difficult because…", "Sin embargo, sería difícil porque…", "CHALLENGE", "justify"),
    q("s5-p5", "What could change your decision?", "¿Qué podría cambiar tu decisión?", "If that changed, I would…", "Si eso cambiara, yo…", "CHANGE", "adapt"),
  ],
  cues: ["PLACE", "WHY", "ADVANTAGE", "CHALLENGE", "WHAT IF?"],
  powerChunks: { core: ["if I had the opportunity…", "I would probably…"], stretch: "if that changed…" },
  sceneImage: { src: sceneD5, alt: "A world map with a pin on a chosen city, surrounded by small icons of salary, family and weather that could change the decision", altEs: "Un mapa del mundo con un pin en una ciudad elegida, rodeado de íconos de salario, familia y clima que podrían cambiar la decisión" },
  goalSeconds: [75, 90],
  goalSentences: 8,
  rep5Prompt: { question: "If you could live anywhere in the world, where would you live?", questionEs: "Si pudieras vivir en cualquier lugar del mundo, ¿dónde vivirías?" },
  rep5Tips: {
    en: "Decide → if I had the opportunity… + because → biggest advantage → what's difficult → when a turn changes the conditions, use if that changed… to adapt without abandoning your answer. Take 5–10 seconds to think.",
    es: "Decide → if I had the opportunity… + because → mayor ventaja → qué es difícil → cuando un turno cambie las condiciones, usa if that changed… para adaptarte sin abandonar tu respuesta. Tómate 5–10 segundos para pensar.",
  },
  rep5Label: "adapt",
  rep5Turns: [
    { id: "s5-turn1", label: "INTERVIEWER", labelEs: "ENTREVISTADOR", text: "If you could live anywhere, where would you live?", es: "Si pudieras vivir en cualquier lugar, ¿dónde vivirías?", voice: "male" },
    { id: "s5-turn2", label: "INTERVIEWER", labelEs: "ENTREVISTADOR", text: "What if the salary there was much lower?", es: "¿Y si el salario ahí fuera mucho más bajo?", voice: "male" },
    { id: "s5-turn3", label: "INTERVIEWER", labelEs: "ENTREVISTADOR", text: "What if your family couldn't move with you?", es: "¿Y si tu familia no pudiera mudarse contigo?", voice: "male" },
    { id: "s5-turn4", label: "INTERVIEWER", labelEs: "ENTREVISTADOR", text: "Would you still choose the same place? Why?", es: "¿Seguirías eligiendo el mismo lugar? ¿Por qué?", voice: "male" },
  ],
  rep5Toolbox: ["If I had the opportunity…", "I would probably…", "If that changed…", "The biggest advantage would be…", "Even so…"],
  speakerVoice: "male",
  testReady: {
    type: "speak-now",
    title: "SPEAK NOW",
    titleEs: "HABLA AHORA",
    instruction: "5–10 seconds to think. Then speak for about 60 seconds.",
    instructionEs: "5–10 segundos para pensar. Luego habla unos 60 segundos.",
    thinkSeconds: 8,
    speakSeconds: 60,
    items: [
      {
        id: "s5-tr1",
        text: "Describe what you would do if an important plan suddenly changed.",
        textEs: "Describe qué harías si un plan importante cambiara de repente.",
        chunks: ["PLAN?", "WHAT CHANGED?", "REACTION?", "NEW PLAN?", "RESULT?"],
        maxSeconds: 60,
      },
    ],
  },
});

export const SHARKS_WEEK_1_DAYS: CourseDay[] = [d1, d2, d3, d4, d5];
