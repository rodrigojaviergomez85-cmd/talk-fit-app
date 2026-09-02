/**
 * TIGERS — EXPLAIN, DEFEND & RESPOND · WEEK 1 (Days 1–5)
 *
 * Intermediate · Month 2 (EAGLES → TIGERS → SHARKS). Same 5-Rep engine as
 * EAGLES; harder prompts, less scaffolding, more fixed multi-turn role plays.
 *
 * DATA SAFETY: the module id ("tigers"), the day numbers and every `t1-*`…
 * `t5-*` id are persisted in learner progress and recordings. Never rename.
 * Weeks 2–4 live in tigers-weeks-2-4-course.ts and are appended after these.
 *
 * Every interlocutor turn is FIXED and prewritten — no generative AI.
 */
import type { CourseDay, PersonalPrompt, RepLabel } from "@/lib/types";
import { l, makeDay, type EaglesDayInput, type WeekMeta } from "./eagles-week-1-course";

import sceneDecision from "@/assets/tigers/scene-d1-decision.jpg";
import scene5000 from "@/assets/tigers/scene-d2-5000.jpg";
import sceneTwoJobs from "@/assets/tigers/scene-d3-two-jobs.jpg";
import sceneMark from "@/assets/tigers/scene-d4-mark.jpg";
import sceneAbroad from "@/assets/tigers/scene-d5-abroad.jpg";

export const TIGERS_WEEKS: (WeekMeta & { subtitle: string; behavior: string })[] = [
  {
    week: 1,
    title: "Recommend, React & Defend",
    subtitle: "Tell a decision · Explore options · Advise · Prioritize · Defend",
    subtitleEs: "Contar una decisión · Explorar opciones · Aconsejar · Priorizar · Defender",
    behavior: "DEVELOP",
  },
  {
    week: 2,
    title: "Experience, Explain & Interview",
    subtitle: "Then vs now · Experience · Effort · Evidence · Job interview",
    subtitleEs: "Antes y ahora · Experiencia · Esfuerzo · Evidencia · Entrevista de trabajo",
    behavior: "SUPPORT",
  },
  {
    week: 3,
    title: "Compare, Persuade & Negotiate",
    subtitle: "Change · Compare · Defend · Negotiate · Decide who to hire",
    subtitleEs: "Cambio · Comparar · Defender · Negociar · Decidir a quién contratar",
    behavior: "DEFEND",
  },
  {
    week: 4,
    title: "Predict, React & Decide",
    subtitle: "Predict · Accomplish · Reflect · React to new info · Final",
    subtitleEs: "Predecir · Lograr · Reflexionar · Reaccionar a nueva información · Final",
    behavior: "RESPOND",
  },
];

/** Rep 4 prompt with a TIGERS behavior label (EXPLICA · JUSTIFICA · DEFIENDE). */
export function q(
  id: string,
  question: string,
  questionEs: string,
  starter: string,
  starterEs: string,
  cue: string,
  label?: RepLabel,
): PersonalPrompt {
  return label ? { id, question, questionEs, starter, starterEs, cue, label } : { id, question, questionEs, starter, starterEs, cue };
}

export const chunks4 = (prefix: string): string[][] => [
  [`${prefix}-1`, `${prefix}-2`],
  [`${prefix}-3`, `${prefix}-4`],
  [`${prefix}-5`, `${prefix}-6`],
  [`${prefix}-7`, `${prefix}-8`],
];

export function tigersDay(input: EaglesDayInput): CourseDay {
  return makeDay({ estimatedMinutes: "7–10 min", ...input }, TIGERS_WEEKS);
}

const START = "START REP 1";

/* ============================ DAY 1 — A DECISION I MADE ============================ */

const d1 = tigersDay({
  day: 1,
  topic: "A Decision I Made",
  topicEs: "Una decisión que tomé",
  focus: "Simple past — tell a decision and why",
  focusEs: "Pasado simple — cuenta una decisión y por qué",
  intro: {
    title: "A DECISION I MADE",
    titleEs: "UNA DECISIÓN QUE TOMÉ",
    lead: "Don't just say what you did. Explain WHY, what the other option was, and how you feel about it now.",
    leadEs: "No digas solo qué hiciste. Explica POR QUÉ, cuál era la otra opción y cómo te sientes ahora.",
    examples: ["The main reason was that I wanted more stability.", "In the end, I decided to accept the offer.", "Looking back, I think I made the right choice."],
    goal: "Speak for about 60 seconds. Connect 8 ideas.",
    goalEs: "Habla unos 60 segundos. Conecta 8 ideas.",
    cta: START,
  },
  lines: [
    l("t1-1", "Last month, | I had to make an important decision | because I wanted to change something in my life.", "El mes pasado tuve que tomar una decisión importante porque quería cambiar algo en mi vida."),
    l("t1-2", "I had two options: | stay in my job | or accept a new opportunity.", "Tenía dos opciones: quedarme en mi trabajo o aceptar una nueva oportunidad."),
    l("t1-3", "The main reason I wanted to change | was that I felt I wasn't growing.", "La razón principal por la que quería cambiar era que sentía que no estaba creciendo."),
    l("t1-4", "However, | the new job was risky | because I didn't know the company well.", "Sin embargo, el nuevo trabajo era arriesgado porque no conocía bien la empresa."),
    l("t1-5", "So I talked to my family | and I asked a friend who worked there.", "Así que hablé con mi familia y le pregunté a un amigo que trabajaba ahí."),
    l("t1-6", "In the end, | I decided to accept the offer.", "Al final, decidí aceptar la oferta."),
    l("t1-7", "It was difficult at first, | but I learned a lot in the first three months.", "Fue difícil al principio, pero aprendí mucho en los primeros tres meses."),
    l("t1-8", "Looking back, | I think I made the right choice.", "Mirando atrás, creo que tomé la decisión correcta."),
  ],
  rep2Chunks: chunks4("t1"),
  prompts: [
    q("t1-p1", "What important decision did you make?", "¿Qué decisión importante tomaste?", "Last year, I decided to…", "El año pasado decidí…", "ANSWER"),
    q("t1-p2", "Why did you make that decision?", "¿Por qué tomaste esa decisión?", "The main reason was that…", "La razón principal fue que…", "WHY", "explain"),
    q("t1-p3", "What was the other option?", "¿Cuál era la otra opción?", "The other option was to… but…", "La otra opción era… pero…", "COMPARE", "explain"),
    q("t1-p4", "What made it difficult?", "¿Qué lo hizo difícil?", "It was difficult because… However, …", "Fue difícil porque… Sin embargo, …", "EXPLAIN", "justify"),
    q("t1-p5", "Would you make the same decision again? Why?", "¿Tomarías la misma decisión otra vez? ¿Por qué?", "Looking back, I would… because…", "Mirando atrás, yo… porque…", "DEFEND", "defend"),
  ],
  cues: ["DECISION", "WHY", "OTHER OPTION", "DIFFICULT?", "LOOKING BACK"],
  powerChunks: { core: ["the main reason was…", "in the end…"], stretch: "looking back…" },
  sceneImage: { src: sceneDecision, alt: "A young man at a crossroads in a city choosing between a job and a home path", altEs: "Un joven en una encrucijada de la ciudad eligiendo entre un camino de trabajo y uno de casa" },
  goalSeconds: [60, 70],
  goalSentences: 8,
  rep5Prompt: { question: "Tell me about an important decision you made.", questionEs: "Cuéntame sobre una decisión importante que tomaste." },
  rep5Tips: {
    en: "Decision → the main reason was… → the other option → what was difficult → in the end… → looking back…",
    es: "Decisión → the main reason was… → la otra opción → qué fue difícil → in the end… → looking back…",
  },
  rep5Label: "explain",
  speakerVoice: "male",
  testReady: {
    type: "story-retell",
    title: "STORY RETELL",
    titleEs: "VUELVE A CONTARLO",
    instruction: "Listen once. Then retell: what happened, the options, the choice and why.",
    instructionEs: "Escucha una vez. Luego cuenta: qué pasó, las opciones, la decisión y por qué.",
    passage:
      "Two years ago, Laura had a stable job at a bank, but she wasn't happy. A small company offered her a marketing position with a lower salary. Her parents told her to stay at the bank because it was safer. Laura thought about it for a week. In the end, she accepted the marketing job because she wanted to learn something new. Today she leads a team of five people, and she says it was the best decision of her life.",
    speakSeconds: 40,
    items: [
      {
        id: "t1-tr1",
        text: "Retell Laura's decision: situation, options, choice, and why.",
        textEs: "Cuenta la decisión de Laura: situación, opciones, decisión y por qué.",
        chunks: ["SITUATION", "OPTIONS", "CHOICE", "WHY", "RESULT"],
        maxSeconds: 45,
      },
    ],
  },
});

/* ============================ DAY 2 — WHAT COULD HAPPEN? ============================ */

const d2 = tigersDay({
  day: 2,
  topic: "What Could Happen?",
  topicEs: "¿Qué podría pasar?",
  focus: "Modals — could · might · would — explore possibilities",
  focusEs: "Modales — could · might · would — explora posibilidades",
  intro: {
    title: "WHAT COULD HAPPEN?",
    titleEs: "¿QUÉ PODRÍA PASAR?",
    lead: "You receive $5,000 you didn't expect. Don't list options — connect them: possibility → reason → risk → choice.",
    leadEs: "Recibes $5,000 que no esperabas. No hagas una lista: conecta posibilidad → razón → riesgo → decisión.",
    examples: ["One possibility is to travel because I've never left the country.", "Another option would be to save it.", "If I had to choose, I would probably invest in a course."],
    goal: "Speak for 60–75 seconds. Compare at least 3 options.",
    goalEs: "Habla 60–75 segundos. Compara al menos 3 opciones.",
    cta: START,
  },
  lines: [
    l("t2-1", "If I received five thousand dollars, | I could do many different things with it.", "Si recibiera cinco mil dólares, podría hacer muchas cosas diferentes."),
    l("t2-2", "One possibility is to travel | because I've never left the country.", "Una posibilidad es viajar porque nunca he salido del país."),
    l("t2-3", "Another option would be to save it | for an emergency.", "Otra opción sería ahorrarlo para una emergencia."),
    l("t2-4", "That might be smart, | but it wouldn't change my life right now.", "Eso podría ser inteligente, pero no cambiaría mi vida ahora mismo."),
    l("t2-5", "I could also start a small business, | but that would be risky | because I don't have experience.", "También podría empezar un pequeño negocio, pero sería arriesgado porque no tengo experiencia."),
    l("t2-6", "However, | investing in a course could help me | get a better job.", "Sin embargo, invertir en un curso podría ayudarme a conseguir un mejor trabajo."),
    l("t2-7", "If I had to choose, | I would probably spend half on a course | and save the rest.", "Si tuviera que elegir, probablemente gastaría la mitad en un curso y ahorraría el resto."),
    l("t2-8", "That way, | I would grow now | and still have something for later.", "Así, crecería ahora y aún tendría algo para después."),
  ],
  rep2Chunks: chunks4("t2"),
  prompts: [
    q("t2-p1", "What could you do with $5,000?", "¿Qué podrías hacer con $5,000?", "One possibility is to… because…", "Una posibilidad es… porque…", "ANSWER"),
    q("t2-p2", "Why would that be useful?", "¿Por qué sería útil?", "It would be useful because…", "Sería útil porque…", "WHY", "explain"),
    q("t2-p3", "What is another option?", "¿Cuál es otra opción?", "Another option would be to…", "Otra opción sería…", "COMPARE", "explain"),
    q("t2-p4", "What is a risk or disadvantage?", "¿Cuál es un riesgo o desventaja?", "However, that might be risky because…", "Sin embargo, eso podría ser arriesgado porque…", "RISK", "justify"),
    q("t2-p5", "What would you finally choose, and why?", "¿Qué elegirías al final y por qué?", "If I had to choose, I would… because…", "Si tuviera que elegir, yo… porque…", "DEFEND", "defend"),
  ],
  cues: ["OPTION 1", "WHY", "OPTION 2", "RISK", "MY CHOICE"],
  powerChunks: { core: ["one possibility is…", "another option would be…"], stretch: "however…" },
  sceneImage: { src: scene5000, alt: "$5,000 in cash surrounded by options: travel, save, study, start a business, help family, buy something", altEs: "$5,000 en efectivo rodeados de opciones: viajar, ahorrar, estudiar, emprender, ayudar a la familia, comprar algo" },
  goalSeconds: [60, 75],
  goalSentences: 8,
  rep5Prompt: { question: "Explain what you would do with $5,000 and why.", questionEs: "Explica qué harías con $5,000 y por qué." },
  rep5Tips: {
    en: "one possibility is… + because → another option would be… → however… (risk) → if I had to choose…",
    es: "one possibility is… + because → another option would be… → however… (riesgo) → if I had to choose…",
  },
  rep5Label: "justify",
  speakerVoice: "female",
});

/* ============================ DAY 3 — GIVE ADVICE & DEFEND IT ============================ */

const d3 = tigersDay({
  day: 3,
  topic: "Give Advice & Defend It",
  topicEs: "Da un consejo y defiéndelo",
  focus: "Modals — should · would · if I were you — recommend + defend",
  focusEs: "Modales — should · would · if I were you — recomienda y defiende",
  intro: {
    title: "GIVE ADVICE & DEFEND IT",
    titleEs: "DA UN CONSEJO Y DEFIÉNDELO",
    lead: "Your friend has two job offers. Recommend one, explain the trade-off, and hold your position when they push back.",
    leadEs: "Tu amigo tiene dos ofertas de trabajo. Recomienda una, explica el costo y mantén tu posición cuando te cuestione.",
    examples: ["If I were you, I would choose Job B.", "The main reason is that you would have more time.", "I see your point, but money isn't everything."],
    goal: "Decision role play: 3 fixed turns. Speak 60–75 seconds in total.",
    goalEs: "Role play de decisión: 3 turnos fijos. Habla 60–75 segundos en total.",
    cta: START,
  },
  lines: [
    l("t3-1", "My friend has two job offers, | and he doesn't know which one to choose.", "Mi amigo tiene dos ofertas de trabajo y no sabe cuál elegir."),
    l("t3-2", "Job A pays more, | but the commute is long | and the schedule is fixed.", "El trabajo A paga más, pero el trayecto es largo y el horario es fijo."),
    l("t3-3", "Job B pays less, | but he could work from home | and grow faster.", "El trabajo B paga menos, pero podría trabajar desde casa y crecer más rápido."),
    l("t3-4", "If I were him, | I would choose Job B.", "Si yo fuera él, elegiría el trabajo B."),
    l("t3-5", "The main reason is that | he would save two hours every day.", "La razón principal es que ahorraría dos horas todos los días."),
    l("t3-6", "Of course, | the lower salary is a real disadvantage.", "Claro, el salario más bajo es una desventaja real."),
    l("t3-7", "I see his point about the money, | but growth is more valuable | in the long term.", "Entiendo su punto sobre el dinero, pero el crecimiento vale más a largo plazo."),
    l("t3-8", "Overall, | Job B would give him a better life, | not just a better salary.", "En general, el trabajo B le daría una mejor vida, no solo un mejor salario."),
  ],
  rep2Chunks: chunks4("t3"),
  prompts: [
    q("t3-p1", "Which job should your friend choose?", "¿Qué trabajo debería elegir tu amigo?", "If I were you, I would choose…", "Si yo fuera tú, elegiría…", "ANSWER"),
    q("t3-p2", "Why?", "¿Por qué?", "The main reason is that…", "La razón principal es que…", "WHY", "explain"),
    q("t3-p3", "What is a disadvantage of your choice?", "¿Cuál es una desventaja de tu elección?", "Of course, one disadvantage is…", "Claro, una desventaja es…", "TRADE-OFF", "justify"),
    q("t3-p4", "Why NOT the other job?", "¿Por qué NO el otro trabajo?", "I wouldn't choose it because…", "No lo elegiría porque…", "COMPARE", "justify"),
    q("t3-p5", "What would change your mind?", "¿Qué te haría cambiar de opinión?", "I would change my mind if…", "Cambiaría de opinión si…", "DEFEND", "defend"),
  ],
  cues: ["JOB A", "JOB B", "MY ADVICE", "TRADE-OFF", "DEFEND"],
  powerChunks: { core: ["if I were you…", "the main reason is…"], stretch: "I see your point, but…" },
  sceneImage: { src: sceneTwoJobs, alt: "Job A: higher salary, long commute, fixed schedule. Job B: lower salary, work from home, growth, flexible schedule", altEs: "Trabajo A: mejor salario, trayecto largo, horario fijo. Trabajo B: menor salario, trabajo desde casa, crecimiento, horario flexible" },
  goalSeconds: [60, 75],
  goalSentences: 7,
  rep5Prompt: { question: "Your friend asks: which job should I choose? Recommend one and defend it.", questionEs: "Tu amigo pregunta: ¿qué trabajo debo elegir? Recomienda uno y defiéndelo." },
  rep5Tips: {
    en: "Turn 1: if I were you… + the main reason is… Turn 2: I see your point, but… Turn 3: adapt, then keep your position.",
    es: "Turno 1: if I were you… + the main reason is… Turno 2: I see your point, but… Turno 3: adáptate y mantén tu posición.",
  },
  rep5Label: "defend",
  rep5Turns: [
    { id: "t3-turn1", label: "FRIEND", labelEs: "AMIGO", text: "Which job do you think I should choose?", es: "¿Qué trabajo crees que debería elegir?", voice: "male" },
    { id: "t3-turn2", label: "FRIEND", labelEs: "AMIGO", text: "But Job A pays much more. Why wouldn't you choose it?", es: "Pero el trabajo A paga mucho más. ¿Por qué no lo elegirías?", voice: "male" },
    { id: "t3-turn3", label: "FRIEND", labelEs: "AMIGO", text: "What if I really needed more money right now?", es: "¿Y si de verdad necesitara más dinero ahora mismo?", voice: "male" },
  ],
  rep5Toolbox: ["If I were you…", "The main reason is…", "I see your point, but…", "It depends on…", "Overall…"],
  speakerVoice: "female",
  testReady: {
    type: "listen-respond",
    title: "LISTEN & RESPOND",
    titleEs: "ESCUCHA Y RESPONDE",
    instruction: "Listen to the conversation once. Then answer 4 questions out loud.",
    instructionEs: "Escucha la conversación una vez. Luego responde 4 preguntas en voz alta.",
    passage:
      "Ana: I got two offers. One is at a big company downtown. It pays well, but I'd spend three hours a day in traffic. Diego: And the other one? Ana: It's a startup. The salary is lower, but I could work from home three days a week, and they promote people fast. Diego: Honestly, I'd take the startup. Time is worth more than money. Ana: Maybe, but I have a loan to pay.",
    items: [
      { id: "t3-tr1", audio: "What is the disadvantage of the downtown job?", text: "What is the disadvantage of the downtown job?", textEs: "¿Cuál es la desventaja del trabajo del centro?", maxSeconds: 12 },
      { id: "t3-tr2", audio: "What are two advantages of the startup?", text: "What are two advantages of the startup?", textEs: "¿Cuáles son dos ventajas de la startup?", maxSeconds: 12 },
      { id: "t3-tr3", audio: "Why is Ana not sure about the startup?", text: "Why is Ana not sure about the startup?", textEs: "¿Por qué Ana no está segura de la startup?", maxSeconds: 12 },
      { id: "t3-tr4", audio: "What would you recommend to Ana, and why?", text: "What would you recommend to Ana, and why?", textEs: "¿Qué le recomendarías a Ana y por qué?", maxSeconds: 20 },
    ],
  },
});

/* ============================ DAY 4 — WHAT NEEDS TO CHANGE? ============================ */

const d4 = tigersDay({
  day: 4,
  topic: "What Needs to Change?",
  topicEs: "¿Qué necesita cambiar?",
  focus: "Semi-modals — needs to · has to · doesn't have to — prioritize",
  focusEs: "Semi-modales — needs to · has to · doesn't have to — prioriza",
  intro: {
    title: "WHAT NEEDS TO CHANGE?",
    titleEs: "¿QUÉ NECESITA CAMBIAR?",
    lead: "Mark wants a better job, but five things are holding him back. Don't list them — decide what comes FIRST and why.",
    leadEs: "Mark quiere un mejor trabajo, pero cinco cosas lo frenan. No las enumeres: decide qué va PRIMERO y por qué.",
    examples: ["The first thing he needs to do is update his résumé.", "The most important change is practicing English every day.", "He doesn't have to fix everything immediately."],
    goal: "Speak for 60–75 seconds. Give Mark a plan with priorities.",
    goalEs: "Habla 60–75 segundos. Dale a Mark un plan con prioridades.",
    cta: START,
  },
  lines: [
    l("t4-1", "Mark wants a better job, | but several things are holding him back.", "Mark quiere un mejor trabajo, pero varias cosas lo frenan."),
    l("t4-2", "He is often late, | he rarely practices English, | and his résumé is outdated.", "Llega tarde seguido, casi no practica inglés y su currículum está desactualizado."),
    l("t4-3", "He also spends too much time on social media | and never practices interviews.", "También pasa demasiado tiempo en redes sociales y nunca practica entrevistas."),
    l("t4-4", "He doesn't have to fix everything immediately, | but he has to start somewhere.", "No tiene que arreglar todo de inmediato, pero tiene que empezar por algo."),
    l("t4-5", "The first thing he needs to do | is update his résumé | because nobody will call him without it.", "Lo primero que necesita hacer es actualizar su currículum porque nadie lo llamará sin eso."),
    l("t4-6", "However, | the most important change is practicing English every day, | because that opens more doors.", "Sin embargo, el cambio más importante es practicar inglés todos los días, porque eso abre más puertas."),
    l("t4-7", "Being on time is important too, | but he can fix that quickly | with a simple routine.", "Ser puntual también es importante, pero puede arreglarlo rápido con una rutina simple."),
    l("t4-8", "Overall, | if he changes one thing a week, | he will be ready in two months.", "En general, si cambia una cosa por semana, estará listo en dos meses."),
  ],
  rep2Chunks: chunks4("t4"),
  prompts: [
    q("t4-p1", "What does Mark need to do?", "¿Qué necesita hacer Mark?", "Mark needs to… and he has to…", "Mark necesita… y tiene que…", "ANSWER"),
    q("t4-p2", "What is the most important change?", "¿Cuál es el cambio más importante?", "The most important change is…", "El cambio más importante es…", "PRIORITY", "explain"),
    q("t4-p3", "Why that one first?", "¿Por qué ese primero?", "The first thing he needs to do is… because…", "Lo primero que necesita hacer es… porque…", "WHY", "justify"),
    q("t4-p4", "What doesn't he have to change immediately?", "¿Qué no tiene que cambiar de inmediato?", "He doesn't have to… yet, because…", "No tiene que… todavía, porque…", "LATER", "justify"),
    q("t4-p5", "How would you convince him?", "¿Cómo lo convencerías?", "I would tell him that… For example, …", "Le diría que… Por ejemplo, …", "DEFEND", "defend"),
  ],
  cues: ["PROBLEMS", "FIRST", "WHY", "NOT YET", "CONVINCE"],
  powerChunks: { core: ["the first thing he needs to do is…", "the most important change is…"], stretch: "he doesn't have to… yet." },
  sceneImage: { src: sceneMark, alt: "Mark at a messy desk: alarm clock, phone notifications, an outdated résumé and an unopened English book", altEs: "Mark en un escritorio desordenado: despertador, notificaciones del teléfono, un currículum viejo y un libro de inglés sin abrir" },
  goalSeconds: [60, 75],
  goalSentences: 8,
  rep5Prompt: { question: "Give Mark a plan and explain which change should come first.", questionEs: "Dale a Mark un plan y explica qué cambio debe ir primero." },
  rep5Tips: {
    en: "Name the problems → the first thing he needs to do is… + because → the most important change is… → he doesn't have to… yet → overall…",
    es: "Di los problemas → the first thing he needs to do is… + because → the most important change is… → he doesn't have to… yet → overall…",
  },
  rep5Label: "justify",
  speakerVoice: "male",
});

/* ============================ DAY 5 — WHAT WOULD YOU DO? ============================ */

const d5 = tigersDay({
  day: 5,
  topic: "What Would You Do?",
  topicEs: "¿Qué harías tú?",
  focus: "Second conditional — if I had to choose, I would…",
  focusEs: "Segundo condicional — if I had to choose, I would…",
  intro: {
    title: "WHAT WOULD YOU DO?",
    titleEs: "¿QUÉ HARÍAS TÚ?",
    lead: "A job offer in another country. Benefits and challenges are real. Decide, explain both sides, and defend your answer when the situation changes.",
    leadEs: "Una oferta de trabajo en otro país. Los beneficios y los retos son reales. Decide, explica ambos lados y defiende tu respuesta cuando la situación cambie.",
    examples: ["If I had to choose, I would accept the offer.", "The main reason is career growth.", "I see the other side, but I can't ignore my family."],
    goal: "Decision role play: 4 fixed turns. Speak 75–90 seconds in total.",
    goalEs: "Role play de decisión: 4 turnos fijos. Habla 75–90 segundos en total.",
    cta: START,
  },
  lines: [
    l("t5-1", "If I received a job offer in another country, | it would be a very difficult decision.", "Si recibiera una oferta de trabajo en otro país, sería una decisión muy difícil."),
    l("t5-2", "On one hand, | I would earn more money | and my career would grow faster.", "Por un lado, ganaría más dinero y mi carrera crecería más rápido."),
    l("t5-3", "I would also have a new experience | in a different culture.", "También tendría una nueva experiencia en una cultura diferente."),
    l("t5-4", "On the other hand, | I would have to leave my family, | and that would be hard.", "Por otro lado, tendría que dejar a mi familia, y eso sería duro."),
    l("t5-5", "I wouldn't know anyone there, | so the first months would be lonely.", "No conocería a nadie ahí, así que los primeros meses serían solitarios."),
    l("t5-6", "If I had to choose, | I would probably accept the offer.", "Si tuviera que elegir, probablemente aceptaría la oferta."),
    l("t5-7", "The main reason is that | opportunities like this don't come every year.", "La razón principal es que oportunidades así no llegan todos los años."),
    l("t5-8", "I see the other side, | but I could visit my family | and still build my future.", "Veo el otro lado, pero podría visitar a mi familia y aun así construir mi futuro."),
  ],
  rep2Chunks: chunks4("t5"),
  prompts: [
    q("t5-p1", "What would you do?", "¿Qué harías tú?", "If I had to choose, I would…", "Si tuviera que elegir, yo…", "ANSWER"),
    q("t5-p2", "Why?", "¿Por qué?", "The main reason is that…", "La razón principal es que…", "WHY", "explain"),
    q("t5-p3", "What is the biggest advantage?", "¿Cuál es la mayor ventaja?", "The biggest advantage would be…", "La mayor ventaja sería…", "ADVANTAGE", "explain"),
    q("t5-p4", "What is the biggest disadvantage?", "¿Cuál es la mayor desventaja?", "On the other hand, I would have to…", "Por otro lado, tendría que…", "DISADVANTAGE", "justify"),
    q("t5-p5", "What would change your mind?", "¿Qué te haría cambiar de opinión?", "I would change my mind if… because…", "Cambiaría de opinión si… porque…", "DEFEND", "defend"),
  ],
  cues: ["BENEFITS", "CHALLENGES", "MY DECISION", "WHY", "OTHER SIDE"],
  powerChunks: { core: ["if I had to choose…", "the main reason is…"], stretch: "I see the other side, but…" },
  sceneImage: { src: sceneAbroad, alt: "A woman holding a job offer letter between the benefits of moving abroad and the challenge of leaving family", altEs: "Una mujer con una carta de oferta entre los beneficios de mudarse al extranjero y el reto de dejar a la familia" },
  goalSeconds: [75, 90],
  goalSentences: 8,
  rep5Prompt: { question: "If you received a job offer in another country, what would you do?", questionEs: "Si recibieras una oferta de trabajo en otro país, ¿qué harías?" },
  rep5Tips: {
    en: "Each turn: react to the new information, then return to your position with the main reason is… Close with a final decision.",
    es: "En cada turno: reacciona a la nueva información y vuelve a tu posición con the main reason is… Cierra con una decisión final.",
  },
  rep5Label: "defend",
  rep5Turns: [
    { id: "t5-turn1", label: "INTERVIEWER", labelEs: "ENTREVISTADORA", text: "If you received a job offer in another country, what would you do?", es: "Si recibieras una oferta de trabajo en otro país, ¿qué harías?", voice: "female" },
    { id: "t5-turn2", label: "INTERVIEWER", labelEs: "ENTREVISTADORA", text: "What if the salary was twice what you earn now?", es: "¿Y si el salario fuera el doble de lo que ganas ahora?", voice: "female" },
    { id: "t5-turn3", label: "INTERVIEWER", labelEs: "ENTREVISTADORA", text: "What if your family asked you to stay?", es: "¿Y si tu familia te pidiera quedarte?", voice: "female" },
    { id: "t5-turn4", label: "INTERVIEWER", labelEs: "ENTREVISTADORA", text: "So, what would your final decision be?", es: "Entonces, ¿cuál sería tu decisión final?", voice: "female" },
  ],
  rep5Toolbox: ["If I had to choose…", "The main reason is…", "On the other hand…", "I see the other side, but…", "In the end…"],
  speakerVoice: "male",
  testReady: {
    type: "speak-now",
    title: "SPEAK NOW",
    titleEs: "HABLA AHORA",
    instruction: "10 seconds to think. Then speak for 45–60 seconds.",
    instructionEs: "10 segundos para pensar. Luego habla 45–60 segundos.",
    thinkSeconds: 10,
    speakSeconds: 60,
    items: [
      {
        id: "t5-tr1",
        text: "Describe a difficult decision and explain how you would make it.",
        textEs: "Describe una decisión difícil y explica cómo la tomarías.",
        chunks: ["DECISION?", "OPTIONS?", "WHY?", "OTHER SIDE?", "FINAL?"],
        maxSeconds: 60,
      },
    ],
  },
});

export const TIGERS_WEEK_1_DAYS: CourseDay[] = [d1, d2, d3, d4, d5];
