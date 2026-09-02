/**
 * TIGERS — WEEKS 2–4 (Days 6–20)
 *
 * WEEK 2 · EXPERIENCE, EXPLAIN & INTERVIEW — SUPPORT (Job Interview Challenge)
 * WEEK 3 · COMPARE, PERSUADE & NEGOTIATE   — DEFEND (Sales Negotiation + Hiring)
 * WEEK 4 · PREDICT, REACT & DECIDE          — RESPOND (TIGERS FINAL)
 *
 * Same module id ("tigers") and 5-Rep engine as Week 1. Ids use `t6-*`…`t20-*`.
 * Every interviewer / customer / friend turn is FIXED and prewritten — no
 * generative AI. Day 20 picks ONE scenario from a small prewritten bank.
 */
import type { CourseDay } from "@/lib/types";
import { l } from "./course-builders";
import { chunks4, q, tigersDay } from "./tigers-week-1-course";

import sceneThenNow from "@/assets/tigers/scene-d6-then-now.jpg";
import sceneExperience from "@/assets/tigers/scene-d7-experience.jpg";
import sceneWorkingOn from "@/assets/tigers/scene-d8-working-on.jpg";
import sceneInterviewPrep from "@/assets/tigers/scene-d9-interview-prep.jpg";
import sceneInterview from "@/assets/tigers/scene-d10-interview.jpg";
import sceneTechChange from "@/assets/tigers/scene-d11-tech-change.jpg";
import sceneCompare from "@/assets/tigers/scene-d12-compare.jpg";
import sceneBeachMountains from "@/assets/tigers/scene-d13-beach-mountains.jpg";
import scenePlans from "@/assets/tigers/scene-d14-plans.jpg";
import sceneCandidates from "@/assets/tigers/scene-d15-candidates.jpg";
import sceneFutureAi from "@/assets/tigers/scene-d16-future-ai.jpg";
import sceneAchievement from "@/assets/tigers/scene-d17-achievement.jpg";
import sceneChanging from "@/assets/tigers/scene-d18-changing.jpg";
import sceneCityOptions from "@/assets/tigers/scene-d19-city-options.jpg";
import sceneFinal from "@/assets/tigers/scene-d20-final.jpg";

const START = "START REP 1";

/* ====================================================================== */
/* WEEK 2 — EXPERIENCE, EXPLAIN & INTERVIEW                                 */
/* ====================================================================== */

/* ---------------------------- DAY 6 — THEN VS NOW ---------------------------- */

const d6 = tigersDay({
  day: 6,
  topic: "Then vs Now",
  topicEs: "Antes y ahora",
  focus: "Past progressive + present progressive — explain what changed and why",
  focusEs: "Pasado progresivo + presente progresivo — explica qué cambió y por qué",
  intro: {
    title: "THEN VS NOW",
    titleEs: "ANTES Y AHORA",
    lead: "Last year vs today: work, study, English, routine, goals. Don't just describe — explain WHY it changed and which is better.",
    leadEs: "El año pasado vs hoy: trabajo, estudio, inglés, rutina, metas. No solo describas: explica POR QUÉ cambió y qué es mejor.",
    examples: ["At that time, I was working night shifts.", "Right now, I'm studying English every morning.", "One major difference is that I have a plan."],
    goal: "Speak for 60–75 seconds. Compare then and now with reasons.",
    goalEs: "Habla 60–75 segundos. Compara antes y ahora con razones.",
    cta: START,
  },
  lines: [
    l("t6-1", "Last year, | I was working long hours | and I wasn't studying anything.", "El año pasado trabajaba muchas horas y no estaba estudiando nada."),
    l("t6-2", "At that time, | I was feeling stuck | because every day was the same.", "En ese momento me sentía estancado porque todos los días eran iguales."),
    l("t6-3", "I was thinking about a better job, | but I wasn't doing anything about it.", "Pensaba en un mejor trabajo, pero no estaba haciendo nada al respecto."),
    l("t6-4", "Right now, | I'm practicing English every morning | before work.", "Ahora mismo estoy practicando inglés todas las mañanas antes del trabajo."),
    l("t6-5", "I'm also applying to companies | that need bilingual people.", "También estoy aplicando a empresas que necesitan gente bilingüe."),
    l("t6-6", "One major difference is that | now I have a clear plan.", "Una diferencia importante es que ahora tengo un plan claro."),
    l("t6-7", "The change happened | because I got tired of waiting for luck.", "El cambio ocurrió porque me cansé de esperar la suerte."),
    l("t6-8", "Overall, | my life is busier now, | but it's definitely better.", "En general, mi vida es más ocupada ahora, pero definitivamente es mejor."),
  ],
  rep2Chunks: chunks4("t6"),
  prompts: [
    q("t6-p1", "What were you doing last year?", "¿Qué estabas haciendo el año pasado?", "At that time, I was…", "En ese momento, yo estaba…", "THEN"),
    q("t6-p2", "What are you doing now?", "¿Qué estás haciendo ahora?", "Right now, I'm…", "Ahora mismo estoy…", "NOW"),
    q("t6-p3", "What changed?", "¿Qué cambió?", "One major difference is that…", "Una diferencia importante es que…", "COMPARE", "explain"),
    q("t6-p4", "Why did it change?", "¿Por qué cambió?", "It changed because…", "Cambió porque…", "WHY", "justify"),
    q("t6-p5", "Which situation is better, and why?", "¿Qué situación es mejor y por qué?", "I think now is better because… However, …", "Creo que ahora es mejor porque… Sin embargo, …", "DEFEND", "defend"),
  ],
  cues: ["LAST YEAR", "RIGHT NOW", "DIFFERENCE", "WHY", "BETTER?"],
  powerChunks: { core: ["at that time…", "right now…"], stretch: "one major difference is…" },
  sceneImage: { src: sceneThenNow, alt: "Left: last year, a tired man studying alone. Right: now, the same man confidently working with a headset", altEs: "Izquierda: el año pasado, un hombre cansado estudiando solo. Derecha: ahora, el mismo hombre trabajando con confianza con audífonos" },
  goalSeconds: [60, 75],
  goalSentences: 8,
  rep5Prompt: { question: "Explain how your life has changed.", questionEs: "Explica cómo ha cambiado tu vida." },
  rep5Tips: {
    en: "at that time… (2 ideas) → right now… (2 ideas) → one major difference is… → why → which is better.",
    es: "at that time… (2 ideas) → right now… (2 ideas) → one major difference is… → por qué → cuál es mejor.",
  },
  rep5Label: "explain",
  speakerVoice: "male",
});

/* ---------------------------- DAY 7 — TELL ME ABOUT YOUR EXPERIENCE ---------------------------- */

const d7 = tigersDay({
  day: 7,
  topic: "Tell Me About Your Experience",
  topicEs: "Cuéntame sobre tu experiencia",
  focus: "Present perfect — experience + one concrete example",
  focusEs: "Presente perfecto — experiencia + un ejemplo concreto",
  intro: {
    title: "TELL ME ABOUT YOUR EXPERIENCE",
    titleEs: "CUÉNTAME SOBRE TU EXPERIENCIA",
    lead: "Move from \"I have worked with customers\" to \"I have worked with different customers. For example, one time…\" Experience needs evidence.",
    leadEs: "Pasa de \"I have worked with customers\" a \"I have worked with different customers. For example, one time…\" La experiencia necesita evidencia.",
    examples: ["I have had experience with difficult customers.", "For example, one time a customer was very upset about a late order.", "What I learned was to listen first."],
    goal: "Speak for 60–75 seconds. Experience → example → lesson.",
    goalEs: "Habla 60–75 segundos. Experiencia → ejemplo → lección.",
    cta: START,
  },
  lines: [
    l("t7-1", "I have worked in customer service | for about two years.", "He trabajado en servicio al cliente por unos dos años."),
    l("t7-2", "I have had experience with | many different types of customers.", "He tenido experiencia con muchos tipos diferentes de clientes."),
    l("t7-3", "For example, | one time a customer was very upset | because her order was late.", "Por ejemplo, una vez una clienta estaba muy molesta porque su pedido llegó tarde."),
    l("t7-4", "She was shouting, | and she wanted to cancel everything.", "Estaba gritando y quería cancelar todo."),
    l("t7-5", "I stayed calm, | I listened to her, | and I explained what I could do.", "Me mantuve tranquilo, la escuché y le expliqué qué podía hacer."),
    l("t7-6", "In the end, | she accepted a discount | and she kept her order.", "Al final, aceptó un descuento y mantuvo su pedido."),
    l("t7-7", "What I learned was that | people calm down when they feel heard.", "Lo que aprendí fue que la gente se calma cuando se siente escuchada."),
    l("t7-8", "That experience has helped me | in every job since then.", "Esa experiencia me ha ayudado en cada trabajo desde entonces."),
  ],
  rep2Chunks: chunks4("t7"),
  prompts: [
    q("t7-p1", "What experience do you have?", "¿Qué experiencia tienes?", "I have had experience with…", "He tenido experiencia con…", "ANSWER"),
    q("t7-p2", "Can you give an example?", "¿Puedes dar un ejemplo?", "For example, one time…", "Por ejemplo, una vez…", "EXAMPLE", "explain"),
    q("t7-p3", "What happened?", "¿Qué pasó?", "First, … Then, … In the end, …", "Primero, … Luego, … Al final, …", "STORY", "explain"),
    q("t7-p4", "What did you learn?", "¿Qué aprendiste?", "What I learned was that…", "Lo que aprendí fue que…", "LESSON", "justify"),
    q("t7-p5", "How could that help you in a new job?", "¿Cómo te ayudaría eso en un nuevo trabajo?", "It could help me because… For example, …", "Me ayudaría porque… Por ejemplo, …", "DEFEND", "defend"),
  ],
  cues: ["EXPERIENCE", "EXAMPLE", "WHAT HAPPENED", "LESSON", "NEW JOB"],
  powerChunks: { core: ["I have had experience with…", "for example…"], stretch: "what I learned was…" },
  sceneImage: { src: sceneExperience, alt: "A customer service agent with a headset calmly helping an upset customer, with a lightbulb showing a lesson learned", altEs: "Una agente de servicio al cliente con audífonos ayudando con calma a un cliente molesto, con un foco que muestra la lección aprendida" },
  goalSeconds: [60, 75],
  goalSentences: 8,
  rep5Prompt: { question: "Tell me about an experience that taught you something important.", questionEs: "Cuéntame sobre una experiencia que te enseñó algo importante." },
  rep5Tips: {
    en: "I have had experience with… → for example, one time… → what happened → what I learned was… → how it helps you now.",
    es: "I have had experience with… → for example, one time… → qué pasó → what I learned was… → cómo te ayuda hoy.",
  },
  rep5Label: "explain",
  speakerVoice: "female",
  testReady: {
    type: "quick-answers",
    title: "INTERVIEW QUICK RESPONSE",
    titleEs: "RESPUESTA RÁPIDA DE ENTREVISTA",
    instruction: "Listen to the interview question. Answer in 15–25 seconds. Give one example.",
    instructionEs: "Escucha la pregunta de entrevista. Responde en 15–25 segundos. Da un ejemplo.",
    items: [
      { id: "t7-tr1", audio: "Tell me about your experience.", maxSeconds: 25 },
      { id: "t7-tr2", audio: "What have you learned from working with others?", maxSeconds: 25 },
      { id: "t7-tr3", audio: "What is one achievement you are proud of?", maxSeconds: 25 },
      { id: "t7-tr4", audio: "Tell me about a time you solved a problem.", maxSeconds: 25 },
      { id: "t7-tr5", audio: "Why are you interested in this position?", maxSeconds: 20 },
    ],
  },
});

/* ---------------------------- DAY 8 — WHAT HAVE YOU BEEN WORKING ON? ---------------------------- */

const d8 = tigersDay({
  day: 8,
  topic: "What Have You Been Working On?",
  topicEs: "¿En qué has estado trabajando?",
  focus: "Present perfect progressive — effort · challenge · progress",
  focusEs: "Presente perfecto progresivo — esfuerzo · reto · progreso",
  intro: {
    title: "WHAT HAVE YOU BEEN WORKING ON?",
    titleEs: "¿EN QUÉ HAS ESTADO TRABAJANDO?",
    lead: "Talk about effort over time: what, how long, why, what has been hard, and what progress you notice.",
    leadEs: "Habla del esfuerzo en el tiempo: qué, cuánto tiempo, por qué, qué ha sido difícil y qué progreso notas.",
    examples: ["I've been working on my speaking for three months.", "One challenge has been finding time every day.", "Little by little, I've been getting faster."],
    goal: "Speak for 60–75 seconds. Effort → challenge → progress.",
    goalEs: "Habla 60–75 segundos. Esfuerzo → reto → progreso.",
    cta: START,
  },
  lines: [
    l("t8-1", "I've been working on my English speaking | for about three months.", "He estado trabajando en mi speaking en inglés por unos tres meses."),
    l("t8-2", "I've been practicing every morning | because I want a bilingual job.", "He estado practicando cada mañana porque quiero un trabajo bilingüe."),
    l("t8-3", "One challenge has been | finding time | when I'm tired after work.", "Un reto ha sido encontrar tiempo cuando estoy cansado después del trabajo."),
    l("t8-4", "Another challenge has been | speaking without translating in my head.", "Otro reto ha sido hablar sin traducir en mi cabeza."),
    l("t8-5", "However, | I've been recording myself, | and I can hear the difference.", "Sin embargo, me he estado grabando y puedo escuchar la diferencia."),
    l("t8-6", "Little by little, | I've been getting faster and more natural.", "Poco a poco, he estado hablando más rápido y más natural."),
    l("t8-7", "For example, | last week I explained a problem to a customer | without stopping.", "Por ejemplo, la semana pasada le expliqué un problema a un cliente sin detenerme."),
    l("t8-8", "Overall, | the progress has been slow but real.", "En general, el progreso ha sido lento pero real."),
  ],
  rep2Chunks: chunks4("t8"),
  prompts: [
    q("t8-p1", "What have you been working on?", "¿En qué has estado trabajando?", "I've been working on…", "He estado trabajando en…", "ANSWER"),
    q("t8-p2", "How long?", "¿Cuánto tiempo?", "I've been doing it for… / since…", "Lo he estado haciendo por… / desde…", "HOW LONG"),
    q("t8-p3", "Why?", "¿Por qué?", "The main reason is that…", "La razón principal es que…", "WHY", "explain"),
    q("t8-p4", "What challenge have you faced?", "¿Qué reto has enfrentado?", "One challenge has been…", "Un reto ha sido…", "CHALLENGE", "justify"),
    q("t8-p5", "What progress have you noticed? Give an example.", "¿Qué progreso has notado? Da un ejemplo.", "Little by little, I've been… For example, …", "Poco a poco, he estado… Por ejemplo, …", "EVIDENCE", "defend"),
  ],
  cues: ["WHAT", "HOW LONG", "WHY", "CHALLENGE", "PROGRESS"],
  powerChunks: { core: ["I've been working on…", "one challenge has been…"], stretch: "little by little…" },
  sceneImage: { src: sceneWorkingOn, alt: "A man practicing speaking with a phone timer, a rising progress chart and a calendar with daily checkmarks", altEs: "Un hombre practicando speaking con un cronómetro en el teléfono, una gráfica de progreso y un calendario con marcas diarias" },
  goalSeconds: [60, 75],
  goalSentences: 8,
  rep5Prompt: { question: "Explain something you have been working hard to improve.", questionEs: "Explica algo que has estado trabajando duro para mejorar." },
  rep5Tips: {
    en: "I've been working on… + for/since → why → one challenge has been… → however… → little by little… + for example…",
    es: "I've been working on… + for/since → por qué → one challenge has been… → however… → little by little… + for example…",
  },
  rep5Label: "explain",
  speakerVoice: "male",
});

/* ---------------------------- DAY 9 — WHY ARE YOU READY? ---------------------------- */

const d9 = tigersDay({
  day: 9,
  topic: "Why Are You Ready?",
  topicEs: "¿Por qué estás listo?",
  focus: "Mixed — past · present perfect · present perfect progressive — interview evidence",
  focusEs: "Mixto — pasado · presente perfecto · presente perfecto progresivo — evidencia para entrevista",
  intro: {
    title: "WHY ARE YOU READY?",
    titleEs: "¿POR QUÉ ESTÁS LISTO?",
    lead: "\"Why should we hire you?\" is not a memorized script. Build it from evidence: experience, skills, what you've learned, what you're improving.",
    leadEs: "\"Why should we hire you?\" no es un guion memorizado. Constrúyelo con evidencia: experiencia, habilidades, lo que aprendiste, lo que estás mejorando.",
    examples: ["Based on my experience, I know how to handle pressure.", "One reason I'm a good fit is that I learn fast.", "What I can bring to the role is reliability."],
    goal: "Speak for 60–90 seconds. Evidence, not adjectives.",
    goalEs: "Habla 60–90 segundos. Evidencia, no adjetivos.",
    cta: START,
  },
  lines: [
    l("t9-1", "Based on my experience, | I know how to work under pressure.", "Según mi experiencia, sé trabajar bajo presión."),
    l("t9-2", "In my last job, | I handled more than fifty calls a day, | and I kept a good attitude.", "En mi último trabajo atendí más de cincuenta llamadas al día y mantuve una buena actitud."),
    l("t9-3", "I have learned to listen carefully | before I give a solution.", "He aprendido a escuchar con atención antes de dar una solución."),
    l("t9-4", "I've also been improving my English every day | for the last six months.", "También he estado mejorando mi inglés todos los días durante los últimos seis meses."),
    l("t9-5", "One reason I'm a good fit is that | I learn fast and I don't give up.", "Una razón por la que encajo bien es que aprendo rápido y no me rindo."),
    l("t9-6", "For example, | when my team changed systems, | I was the first one to master it.", "Por ejemplo, cuando mi equipo cambió de sistema, fui el primero en dominarlo."),
    l("t9-7", "I still need to improve my speed in writing, | and I've been practicing that too.", "Todavía necesito mejorar mi velocidad al escribir, y también lo he estado practicando."),
    l("t9-8", "What I can bring to the role | is reliability, energy and a real desire to grow.", "Lo que puedo aportar al puesto es confiabilidad, energía y ganas reales de crecer."),
  ],
  rep2Chunks: chunks4("t9"),
  prompts: [
    q("t9-p1", "What experience do you have?", "¿Qué experiencia tienes?", "Based on my experience, I…", "Según mi experiencia, yo…", "EXPERIENCE"),
    q("t9-p2", "What have you learned from it?", "¿Qué has aprendido de eso?", "I have learned to…", "He aprendido a…", "LEARNED", "explain"),
    q("t9-p3", "What have you been improving?", "¿Qué has estado mejorando?", "I've been improving… for…", "He estado mejorando… por…", "IMPROVING", "explain"),
    q("t9-p4", "What is a weakness you're working on?", "¿Cuál es una debilidad en la que trabajas?", "I still need to improve… so I've been…", "Todavía necesito mejorar… así que he estado…", "HONEST", "justify"),
    q("t9-p5", "Why are you a good fit?", "¿Por qué encajas bien?", "One reason I'm a good fit is that… For example, …", "Una razón por la que encajo es que… Por ejemplo, …", "DEFEND", "defend"),
  ],
  cues: ["EXPERIENCE", "LEARNED", "IMPROVING", "WEAKNESS", "GOOD FIT"],
  powerChunks: { core: ["based on my experience…", "one reason I'm a good fit is…"], stretch: "what I can bring to the role is…" },
  sceneImage: { src: sceneInterviewPrep, alt: "A woman preparing for a video job interview at home with notes about experience and skills", altEs: "Una mujer preparándose en casa para una entrevista de trabajo por video con notas sobre experiencia y habilidades" },
  goalSeconds: [60, 90],
  goalSentences: 8,
  rep5Prompt: { question: "Why should we hire you?", questionEs: "¿Por qué deberíamos contratarte?" },
  rep5Tips: {
    en: "based on my experience… → I have learned… → I've been improving… → one reason I'm a good fit is… + for example… → what I can bring…",
    es: "based on my experience… → I have learned… → I've been improving… → one reason I'm a good fit is… + for example… → what I can bring…",
  },
  rep5Label: "defend",
  speakerVoice: "female",
  testReady: {
    type: "listen-respond",
    title: "LISTEN & RESPOND",
    titleEs: "ESCUCHA Y RESPONDE",
    instruction: "Listen to the interview once. Then answer 4 questions out loud.",
    instructionEs: "Escucha la entrevista una vez. Luego responde 4 preguntas en voz alta.",
    passage:
      "Interviewer: Tell me about your experience. Candidate: I've worked in sales for three years, mostly with small businesses. I've learned to ask questions before I offer a product. Interviewer: What are you improving right now? Candidate: My English. I've been practicing every day for four months because most of our new clients are from the US. Interviewer: Can you give me an example of a difficult client? Candidate: Sure. Last month a client wanted to cancel. I listened, I offered a smaller plan, and he stayed.",
    items: [
      { id: "t9-tr1", audio: "What experience does the candidate have?", text: "What experience does the candidate have?", textEs: "¿Qué experiencia tiene el candidato?", maxSeconds: 12 },
      { id: "t9-tr2", audio: "What skill has the candidate been improving, and why?", text: "What skill has the candidate been improving, and why?", textEs: "¿Qué habilidad ha estado mejorando el candidato y por qué?", maxSeconds: 15 },
      { id: "t9-tr3", audio: "What example did the candidate give?", text: "What example did the candidate give?", textEs: "¿Qué ejemplo dio el candidato?", maxSeconds: 15 },
      { id: "t9-tr4", audio: "Would you hire this candidate? Why or why not?", text: "Would you hire this candidate? Why or why not?", textEs: "¿Contratarías a este candidato? ¿Por qué sí o por qué no?", maxSeconds: 20 },
    ],
  },
});

/* ---------------------------- DAY 10 — JOB INTERVIEW CHALLENGE ---------------------------- */

const d10 = tigersDay({
  day: 10,
  topic: "Job Interview Challenge",
  topicEs: "Reto: entrevista de trabajo",
  focus: "Transfer — answer real interview questions with reasons and examples",
  focusEs: "Transferencia — responde preguntas reales de entrevista con razones y ejemplos",
  intro: {
    title: "JOB INTERVIEW CHALLENGE",
    titleEs: "RETO: ENTREVISTA DE TRABAJO",
    lead: "Four real interview questions, one after another. You won't see the next question until it comes. Answer, explain, give an example.",
    leadEs: "Cuatro preguntas reales de entrevista, una tras otra. No verás la siguiente hasta que llegue. Responde, explica, da un ejemplo.",
    examples: ["For example, in my last job…", "The main reason is that I've been preparing for this.", "What I learned from that experience was…"],
    goal: "Interview role play: 4 fixed questions. Speak 75–90 seconds in total.",
    goalEs: "Role play de entrevista: 4 preguntas fijas. Habla 75–90 segundos en total.",
    cta: START,
  },
  lines: [
    l("t10-1", "Thank you for the opportunity. | Let me tell you a little about myself.", "Gracias por la oportunidad. Déjeme contarle un poco sobre mí."),
    l("t10-2", "I have worked in customer support for two years, | and I've been studying English every day.", "He trabajado en soporte al cliente por dos años y he estado estudiando inglés todos los días."),
    l("t10-3", "You should hire me because | I solve problems calmly | and I learn fast.", "Debería contratarme porque resuelvo problemas con calma y aprendo rápido."),
    l("t10-4", "For example, | in my last job I reduced complaints | by explaining things more clearly.", "Por ejemplo, en mi último trabajo reduje las quejas explicando las cosas con más claridad."),
    l("t10-5", "A weakness I'm working on | is speaking too fast when I'm nervous.", "Una debilidad en la que trabajo es hablar demasiado rápido cuando estoy nervioso."),
    l("t10-6", "So I've been recording myself | and practicing pauses.", "Así que me he estado grabando y practicando las pausas."),
    l("t10-7", "A difficult situation I handled | was a customer who wanted to cancel | after a billing mistake.", "Una situación difícil que manejé fue un cliente que quería cancelar después de un error de facturación."),
    l("t10-8", "What I learned from that experience was that | honesty and a quick solution | keep the customer.", "Lo que aprendí de esa experiencia fue que la honestidad y una solución rápida conservan al cliente."),
  ],
  rep2Chunks: chunks4("t10"),
  prompts: [
    q("t10-p1", "Tell me about yourself.", "Háblame de ti.", "I have worked… and I've been…", "He trabajado… y he estado…", "ANSWER"),
    q("t10-p2", "Why should we hire you?", "¿Por qué deberíamos contratarte?", "You should hire me because… For example, …", "Deberían contratarme porque… Por ejemplo, …", "DEFEND", "defend"),
    q("t10-p3", "What is a weakness you're working on?", "¿Qué debilidad estás trabajando?", "A weakness I'm working on is… so I've been…", "Una debilidad en la que trabajo es… así que he estado…", "HONEST", "justify"),
    q("t10-p4", "Tell me about a difficult situation.", "Cuéntame una situación difícil.", "A difficult situation I handled was…", "Una situación difícil que manejé fue…", "EXAMPLE", "explain"),
    q("t10-p5", "What did you learn?", "¿Qué aprendiste?", "What I learned from that experience was…", "Lo que aprendí de esa experiencia fue…", "LESSON", "justify"),
  ],
  cues: ["ABOUT ME", "WHY ME", "WEAKNESS", "DIFFICULT SITUATION", "LESSON"],
  powerChunks: { core: ["for example…", "the main reason is…"], stretch: "what I learned from that experience was…" },
  sceneImage: { src: sceneInterview, alt: "A job interview in a modern office: a hiring manager listening to a confident candidate", altEs: "Una entrevista de trabajo en una oficina moderna: una reclutadora escuchando a un candidato seguro" },
  goalSeconds: [75, 90],
  goalSentences: 8,
  hideModelText: true,
  rep5Prompt: { question: "Job interview: answer each question with a reason and an example.", questionEs: "Entrevista de trabajo: responde cada pregunta con una razón y un ejemplo." },
  rep5Tips: {
    en: "Each answer: direct answer → the main reason is… → for example… Don't memorize; use your real experience.",
    es: "Cada respuesta: respuesta directa → the main reason is… → for example… No memorices; usa tu experiencia real.",
  },
  rep5Label: "defend",
  rep5Turns: [
    { id: "t10-turn1", label: "INTERVIEWER", labelEs: "ENTREVISTADOR", text: "Tell me about yourself and your experience.", es: "Háblame de ti y de tu experiencia.", voice: "male" },
    { id: "t10-turn2", label: "INTERVIEWER", labelEs: "ENTREVISTADOR", text: "Why should we hire you instead of another candidate?", es: "¿Por qué deberíamos contratarte a ti y no a otro candidato?", voice: "male" },
    { id: "t10-turn3", label: "INTERVIEWER", labelEs: "ENTREVISTADOR", text: "Tell me about a weakness you're currently working on.", es: "Cuéntame una debilidad en la que estás trabajando actualmente.", voice: "male" },
    { id: "t10-turn4", label: "INTERVIEWER", labelEs: "ENTREVISTADOR", text: "Give me an example of a difficult situation you handled.", es: "Dame un ejemplo de una situación difícil que manejaste.", voice: "male" },
  ],
  rep5Toolbox: ["Based on my experience…", "For example…", "The main reason is…", "What I learned was…", "Overall…"],
  speakerVoice: "female",
  testReady: {
    type: "speak-now",
    title: "SPEAK NOW — INTERVIEW",
    titleEs: "HABLA AHORA — ENTREVISTA",
    instruction: "10 seconds to think. Then answer for 45–60 seconds.",
    instructionEs: "10 segundos para pensar. Luego responde 45–60 segundos.",
    thinkSeconds: 10,
    speakSeconds: 60,
    items: [
      {
        id: "t10-tr1",
        text: "What is one strength you would bring to a new job?",
        textEs: "¿Cuál es una fortaleza que aportarías a un nuevo trabajo?",
        chunks: ["STRENGTH?", "WHY?", "EXAMPLE?", "RESULT?"],
        maxSeconds: 60,
      },
    ],
  },
});

/* ====================================================================== */
/* WEEK 3 — COMPARE, PERSUADE & NEGOTIATE                                   */
/* ====================================================================== */

/* ---------------------------- DAY 11 — HOW THINGS HAVE CHANGED ---------------------------- */

const d11 = tigersDay({
  day: 11,
  topic: "How Things Have Changed",
  topicEs: "Cómo han cambiado las cosas",
  focus: "Used to — change over time (technology)",
  focusEs: "Used to — cambio con el tiempo (tecnología)",
  intro: {
    title: "HOW THINGS HAVE CHANGED",
    titleEs: "CÓMO HAN CAMBIADO LAS COSAS",
    lead: "Phones, communication, work, shopping. Describe what people used to do, what they do now, and decide if the change is positive.",
    leadEs: "Teléfonos, comunicación, trabajo, compras. Describe qué solía hacer la gente, qué hace ahora y decide si el cambio es positivo.",
    examples: ["People used to call from a landline.", "Today, however, everything happens on a phone.", "One of the biggest changes is how we work."],
    goal: "Speak for 60–75 seconds. Then vs now + your opinion.",
    goalEs: "Habla 60–75 segundos. Antes vs ahora + tu opinión.",
    cta: START,
  },
  lines: [
    l("t11-1", "Twenty years ago, | people used to communicate very differently.", "Hace veinte años, la gente solía comunicarse de forma muy diferente."),
    l("t11-2", "They used to call from a landline | or write long emails.", "Solían llamar desde un teléfono fijo o escribir correos largos."),
    l("t11-3", "Today, however, | most people send short messages | and voice notes.", "Hoy, sin embargo, la mayoría envía mensajes cortos y notas de voz."),
    l("t11-4", "People also used to shop in stores, | but now they buy almost everything online.", "La gente también solía comprar en tiendas, pero ahora compra casi todo en línea."),
    l("t11-5", "One of the biggest changes is work: | many people used to go to an office every day.", "Uno de los mayores cambios es el trabajo: mucha gente solía ir a una oficina todos los días."),
    l("t11-6", "Now, | a lot of them work from home | at least part of the week.", "Ahora, muchos trabajan desde casa al menos parte de la semana."),
    l("t11-7", "In my opinion, | the change is mostly positive | because we save time.", "En mi opinión, el cambio es mayormente positivo porque ahorramos tiempo."),
    l("t11-8", "However, | we used to talk more in person, | and I think we've lost some of that.", "Sin embargo, solíamos hablar más en persona, y creo que hemos perdido algo de eso."),
  ],
  rep2Chunks: chunks4("t11"),
  prompts: [
    q("t11-p1", "What did people use to do?", "¿Qué solía hacer la gente?", "People used to…", "La gente solía…", "BEFORE"),
    q("t11-p2", "What do they do now?", "¿Qué hacen ahora?", "Today, however, they…", "Hoy, sin embargo, ellos…", "NOW"),
    q("t11-p3", "What has changed the most?", "¿Qué ha cambiado más?", "One of the biggest changes is…", "Uno de los mayores cambios es…", "COMPARE", "explain"),
    q("t11-p4", "Is the change positive or negative?", "¿El cambio es positivo o negativo?", "In my opinion, it's mostly… because…", "En mi opinión, es mayormente… porque…", "OPINION", "justify"),
    q("t11-p5", "Why? Give an example.", "¿Por qué? Da un ejemplo.", "For example, … However, …", "Por ejemplo, … Sin embargo, …", "DEFEND", "defend"),
  ],
  cues: ["USED TO", "TODAY", "BIGGEST CHANGE", "POSITIVE?", "WHY"],
  powerChunks: { core: ["people used to…", "today, however…"], stretch: "one of the biggest changes is…" },
  sceneImage: { src: sceneTechChange, alt: "Before: landline phone, paper maps and physical stores. Now: smartphones, video calls and remote work", altEs: "Antes: teléfono fijo, mapas de papel y tiendas físicas. Ahora: celulares, videollamadas y trabajo remoto" },
  goalSeconds: [60, 75],
  goalSentences: 8,
  rep5Prompt: { question: "Explain how technology has changed daily life.", questionEs: "Explica cómo la tecnología ha cambiado la vida diaria." },
  rep5Tips: {
    en: "people used to… (2) → today, however… (2) → one of the biggest changes is… → positive or negative + why → however…",
    es: "people used to… (2) → today, however… (2) → one of the biggest changes is… → positivo o negativo + por qué → however…",
  },
  rep5Label: "explain",
  speakerVoice: "male",
  testReady: {
    type: "story-retell",
    title: "INFORMATION RETELL",
    titleEs: "VUELVE A CONTAR LA INFORMACIÓN",
    instruction: "Listen once. Then retell the key ideas in your own words.",
    instructionEs: "Escucha una vez. Luego cuenta las ideas clave con tus palabras.",
    passage:
      "Ten years ago, most people in the city used to pay with cash, and banks used to have long lines every Friday. Today, more than seventy percent of payments are made with a phone. Small businesses used to lose customers who didn't have cash. Now they can sell to anyone. However, older people say the change happened too fast, and some of them still feel lost without paper money.",
    speakSeconds: 40,
    items: [
      {
        id: "t11-tr1",
        text: "Retell the key ideas: before, now, who benefits, who struggles.",
        textEs: "Cuenta las ideas clave: antes, ahora, quién se beneficia, quién batalla.",
        chunks: ["BEFORE", "NOW", "BENEFIT", "PROBLEM"],
        maxSeconds: 45,
      },
    ],
  },
});

/* ---------------------------- DAY 12 — COMPARE & CHOOSE ---------------------------- */

const d12 = tigersDay({
  day: 12,
  topic: "Compare & Choose",
  topicEs: "Compara y elige",
  focus: "Short comparatives — cheaper · faster · safer · closer",
  focusEs: "Comparativos cortos — cheaper · faster · safer · closer",
  intro: {
    title: "COMPARE & CHOOSE",
    titleEs: "COMPARA Y ELIGE",
    lead: "Pick a pair — city vs city, car vs motorcycle, job vs job, plan vs plan. Compare, say who each option is for, and decide.",
    leadEs: "Elige un par: ciudad vs ciudad, carro vs moto, trabajo vs trabajo, plan vs plan. Compara, di para quién es cada opción y decide.",
    examples: ["The main difference is the price.", "For someone who drives every day, a car is safer.", "It depends on how much you travel."],
    goal: "Speak for 60–75 seconds. Compare two options and decide.",
    goalEs: "Habla 60–75 segundos. Compara dos opciones y decide.",
    cta: START,
  },
  lines: [
    l("t12-1", "A motorcycle is cheaper than a car, | and it's faster in traffic.", "Una moto es más barata que un carro y es más rápida en el tráfico."),
    l("t12-2", "It's also easier to park | in a big city.", "También es más fácil de estacionar en una ciudad grande."),
    l("t12-3", "However, | a car is safer, | especially when it rains.", "Sin embargo, un carro es más seguro, especialmente cuando llueve."),
    l("t12-4", "A car is also bigger, | so you can carry more people and more things.", "Un carro también es más grande, así que puedes llevar más gente y más cosas."),
    l("t12-5", "The main difference is | cost versus safety.", "La diferencia principal es costo versus seguridad."),
    l("t12-6", "For someone who drives alone | and lives close to work, | a motorcycle makes sense.", "Para alguien que maneja solo y vive cerca del trabajo, una moto tiene sentido."),
    l("t12-7", "For someone with a family, | a car is clearly the better choice.", "Para alguien con familia, un carro es claramente la mejor opción."),
    l("t12-8", "It depends on your life, | but if I had to choose today, | I would choose the car.", "Depende de tu vida, pero si tuviera que elegir hoy, elegiría el carro."),
  ],
  rep2Chunks: chunks4("t12"),
  prompts: [
    q("t12-p1", "Which option is better for cost?", "¿Qué opción es mejor en costo?", "Option A is cheaper than… because…", "La opción A es más barata que… porque…", "COST"),
    q("t12-p2", "Which is better for safety or comfort?", "¿Cuál es mejor en seguridad o comodidad?", "However, Option B is safer / more comfortable…", "Sin embargo, la opción B es más segura / cómoda…", "SAFETY", "explain"),
    q("t12-p3", "What is the main difference?", "¿Cuál es la diferencia principal?", "The main difference is…", "La diferencia principal es…", "COMPARE", "explain"),
    q("t12-p4", "Who would prefer the other option?", "¿Quién preferiría la otra opción?", "For someone who…, the other option is better because…", "Para alguien que…, la otra opción es mejor porque…", "WHO", "justify"),
    q("t12-p5", "Which would you choose, and why?", "¿Cuál elegirías y por qué?", "It depends on… but if I had to choose, I would… because…", "Depende de… pero si tuviera que elegir, yo… porque…", "DEFEND", "defend"),
  ],
  cues: ["OPTION A", "OPTION B", "MAIN DIFFERENCE", "FOR WHOM", "MY CHOICE"],
  powerChunks: { core: ["the main difference is…", "for someone who…"], stretch: "it depends on…" },
  sceneImage: { src: sceneCompare, alt: "Comparison pairs: big city vs small town, car vs motorcycle, two jobs, two plans", altEs: "Pares para comparar: ciudad grande vs pueblo, carro vs moto, dos trabajos, dos planes" },
  variants: [
    { id: "city", label: "CITY A vs CITY B", labelEs: "CIUDAD A vs CIUDAD B" },
    { id: "vehicle", label: "CAR vs MOTORCYCLE", labelEs: "CARRO vs MOTO" },
    { id: "job", label: "JOB A vs JOB B", labelEs: "TRABAJO A vs TRABAJO B" },
    { id: "plan", label: "PLAN A vs PLAN B", labelEs: "PLAN A vs PLAN B" },
  ],
  goalSeconds: [60, 75],
  goalSentences: 8,
  rep5Prompt: { question: "Compare two options and explain your decision.", questionEs: "Compara dos opciones y explica tu decisión." },
  rep5Tips: {
    en: "A is cheaper/faster than B → however, B is safer/… → the main difference is… → for someone who… → it depends on… + my choice.",
    es: "A is cheaper/faster than B → however, B is safer/… → the main difference is… → for someone who… → it depends on… + mi elección.",
  },
  rep5Label: "justify",
  speakerVoice: "female",
});

/* ---------------------------- DAY 13 — COMPARE & DEFEND ---------------------------- */

const d13 = tigersDay({
  day: 13,
  topic: "Compare & Defend",
  topicEs: "Compara y defiende",
  focus: "Long comparatives — more relaxing · more interesting · more expensive",
  focusEs: "Comparativos largos — more relaxing · more interesting · more expensive",
  intro: {
    title: "COMPARE & DEFEND",
    titleEs: "COMPARA Y DEFIENDE",
    lead: "Beach or mountains? Your friend disagrees with you. Compare, accept one good point, and defend your choice anyway.",
    leadEs: "¿Playa o montaña? Tu amigo no está de acuerdo. Compara, acepta un buen punto y defiende tu elección de todos modos.",
    examples: ["One advantage is that the beach is more relaxing.", "On the other hand, the mountains are more interesting.", "I see your point, but I still prefer the beach."],
    goal: "Debate role play: 3 fixed turns. Speak 75–90 seconds in total.",
    goalEs: "Role play de debate: 3 turnos fijos. Habla 75–90 segundos en total.",
    cta: START,
  },
  lines: [
    l("t13-1", "If I had to choose a vacation, | I would choose the beach.", "Si tuviera que elegir unas vacaciones, elegiría la playa."),
    l("t13-2", "One advantage is that | the beach is more relaxing than the mountains.", "Una ventaja es que la playa es más relajante que la montaña."),
    l("t13-3", "It's also more social, | because you can meet people easily.", "También es más social, porque puedes conocer gente fácilmente."),
    l("t13-4", "On the other hand, | the mountains are more interesting | if you like adventure.", "Por otro lado, la montaña es más interesante si te gusta la aventura."),
    l("t13-5", "They are usually less crowded | and more peaceful.", "Normalmente están menos llenas y son más tranquilas."),
    l("t13-6", "The beach can be more expensive | in high season, | and that's a real disadvantage.", "La playa puede ser más cara en temporada alta, y esa es una desventaja real."),
    l("t13-7", "I see your point about adventure, | but after a hard year, | I need to rest.", "Entiendo tu punto sobre la aventura, pero después de un año duro, necesito descansar."),
    l("t13-8", "Overall, | the beach gives me exactly what I need right now.", "En general, la playa me da exactamente lo que necesito ahora."),
  ],
  rep2Chunks: chunks4("t13"),
  prompts: [
    q("t13-p1", "Which is more enjoyable for you?", "¿Cuál disfrutas más?", "For me, … is more enjoyable because…", "Para mí, … es más disfrutable porque…", "ANSWER"),
    q("t13-p2", "Why?", "¿Por qué?", "One advantage is that…", "Una ventaja es que…", "WHY", "explain"),
    q("t13-p3", "What is an advantage of the OTHER option?", "¿Cuál es una ventaja de la OTRA opción?", "On the other hand, … is more…", "Por otro lado, … es más…", "OTHER SIDE", "justify"),
    q("t13-p4", "What is a disadvantage of your choice?", "¿Cuál es una desventaja de tu elección?", "A real disadvantage is that…", "Una desventaja real es que…", "HONEST", "justify"),
    q("t13-p5", "How would you defend your choice?", "¿Cómo defenderías tu elección?", "I see your point, but… Overall, …", "Entiendo tu punto, pero… En general, …", "DEFEND", "defend"),
  ],
  cues: ["MY CHOICE", "ADVANTAGE", "OTHER SIDE", "DISADVANTAGE", "DEFEND"],
  powerChunks: { core: ["one advantage is…", "on the other hand…"], stretch: "I see your point, but…" },
  sceneImage: { src: sceneBeachMountains, alt: "A sunny beach on the left, mountains on the right, and two friends playfully arguing about which is better", altEs: "Una playa soleada a la izquierda, montañas a la derecha y dos amigos discutiendo en broma cuál es mejor" },
  variants: [
    { id: "beach-mountains", label: "BEACH vs MOUNTAINS", labelEs: "PLAYA vs MONTAÑA" },
    { id: "online-inperson", label: "ONLINE vs IN-PERSON", labelEs: "EN LÍNEA vs PRESENCIAL" },
    { id: "city-country", label: "CITY vs COUNTRY", labelEs: "CIUDAD vs CAMPO" },
  ],
  goalSeconds: [75, 90],
  goalSentences: 8,
  rep5Prompt: { question: "Which would you choose: beach or mountains? Defend it when your friend disagrees.", questionEs: "¿Qué elegirías: playa o montaña? Defiéndelo cuando tu amigo no esté de acuerdo." },
  rep5Tips: {
    en: "Turn 1: choice + one advantage is… Turn 2: I see your point, but… + on the other hand… Turn 3: what would change your mind — be honest, then close.",
    es: "Turno 1: elección + one advantage is… Turno 2: I see your point, but… + on the other hand… Turno 3: qué te haría cambiar — sé honesto y cierra.",
  },
  rep5Label: "defend",
  rep5Turns: [
    { id: "t13-turn1", label: "FRIEND", labelEs: "AMIGA", text: "Beach or mountains — which would you choose for our trip?", es: "Playa o montaña: ¿cuál elegirías para nuestro viaje?", voice: "female" },
    { id: "t13-turn2", label: "FRIEND", labelEs: "AMIGA", text: "I disagree. I think the other option is much better.", es: "No estoy de acuerdo. Creo que la otra opción es mucho mejor.", voice: "female" },
    { id: "t13-turn3", label: "FRIEND", labelEs: "AMIGA", text: "Okay. What would make you change your mind?", es: "Bueno. ¿Qué te haría cambiar de opinión?", voice: "female" },
  ],
  rep5Toolbox: ["One advantage is…", "On the other hand…", "I see your point, but…", "It depends on…", "Overall…"],
  speakerVoice: "male",
  testReady: {
    type: "listen-respond",
    title: "LISTEN & RESPOND",
    titleEs: "ESCUCHA Y RESPONDE",
    instruction: "Two people with opposite opinions. Listen once, then answer 4 questions out loud.",
    instructionEs: "Dos personas con opiniones opuestas. Escucha una vez y responde 4 preguntas en voz alta.",
    passage:
      "Sofía: I think studying online is more practical. You save time, and you can watch the class again. Luis: I disagree. In-person classes are more effective because you have to participate. Online, people turn off the camera and disappear. Sofía: That depends on the student. I've been more disciplined online than I ever was in a classroom. Luis: Maybe, but most people aren't like you.",
    items: [
      { id: "t13-tr1", audio: "What is Sofía's opinion, and why?", text: "What is Sofía's opinion, and why?", textEs: "¿Cuál es la opinión de Sofía y por qué?", maxSeconds: 15 },
      { id: "t13-tr2", audio: "What is Luis's main argument?", text: "What is Luis's main argument?", textEs: "¿Cuál es el argumento principal de Luis?", maxSeconds: 15 },
      { id: "t13-tr3", audio: "How does Sofía respond to Luis?", text: "How does Sofía respond to Luis?", textEs: "¿Cómo le responde Sofía a Luis?", maxSeconds: 15 },
      { id: "t13-tr4", audio: "Who do you agree with, and why?", text: "Who do you agree with, and why?", textEs: "¿Con quién estás de acuerdo y por qué?", maxSeconds: 20 },
    ],
  },
});

/* ---------------------------- DAY 14 — SALES NEGOTIATION ---------------------------- */

const d14 = tigersDay({
  day: 14,
  topic: "Sales Negotiation",
  topicEs: "Negociación de ventas",
  focus: "Superlatives + comparatives in context — the best value · more reliable than",
  focusEs: "Superlativos + comparativos en contexto — the best value · more reliable than",
  intro: {
    title: "SALES NEGOTIATION",
    titleEs: "NEGOCIACIÓN DE VENTAS",
    lead: "Three plans. The customer pushes on price, compares you with a competitor and stays unconvinced. Recommend, compare, and hold your value.",
    leadEs: "Tres planes. El cliente presiona en el precio, te compara con la competencia y sigue sin convencerse. Recomienda, compara y sostén tu valor.",
    examples: ["Compared with Plan A, Plan B is much more reliable.", "The biggest advantage is the support.", "I understand your concern, but the cheapest plan can cost you more later."],
    goal: "Negotiation role play: 4 fixed customer turns. Speak 75–90 seconds in total.",
    goalEs: "Role play de negociación: 4 turnos fijos del cliente. Habla 75–90 segundos en total.",
    cta: START,
  },
  lines: [
    l("t14-1", "We have three plans, | and each one is designed for a different type of customer.", "Tenemos tres planes, y cada uno está diseñado para un tipo distinto de cliente."),
    l("t14-2", "Plan A is the cheapest, | but it only includes the basic features.", "El Plan A es el más barato, pero solo incluye las funciones básicas."),
    l("t14-3", "Plan C is the most complete, | with priority support, | but it's also the most expensive.", "El Plan C es el más completo, con soporte prioritario, pero también es el más caro."),
    l("t14-4", "Based on what you've told me, | I would recommend Plan B.", "Según lo que me ha dicho, le recomendaría el Plan B."),
    l("t14-5", "Compared with Plan A, | it's much more reliable, | and the support is faster.", "Comparado con el Plan A, es mucho más confiable y el soporte es más rápido."),
    l("t14-6", "The biggest advantage is that | you won't lose time | when something goes wrong.", "La mayor ventaja es que no perderá tiempo cuando algo falle."),
    l("t14-7", "I understand your concern about the price, | but the cheapest plan | can cost you more later.", "Entiendo su preocupación por el precio, pero el plan más barato puede costarle más después."),
    l("t14-8", "Overall, | Plan B is the best value | for a business like yours.", "En general, el Plan B es la mejor relación calidad-precio para un negocio como el suyo."),
  ],
  rep2Chunks: chunks4("t14"),
  prompts: [
    q("t14-p1", "Which plan would you recommend?", "¿Qué plan recomendarías?", "Based on what you've told me, I would recommend…", "Según lo que me ha dicho, le recomendaría…", "RECOMMEND"),
    q("t14-p2", "Why?", "¿Por qué?", "The main reason is that…", "La razón principal es que…", "WHY", "explain"),
    q("t14-p3", "What is its biggest advantage?", "¿Cuál es su mayor ventaja?", "The biggest advantage is that… Compared with…", "La mayor ventaja es que… Comparado con…", "COMPARE", "explain"),
    q("t14-p4", "What is a disadvantage?", "¿Cuál es una desventaja?", "One disadvantage is… However, …", "Una desventaja es… Sin embargo, …", "HONEST", "justify"),
    q("t14-p5", "The customer says it's too expensive. What do you say?", "El cliente dice que es muy caro. ¿Qué dices?", "I understand your concern, but…", "Entiendo su preocupación, pero…", "DEFEND", "defend"),
  ],
  cues: ["PLAN A", "PLAN B", "PLAN C", "BIGGEST ADVANTAGE", "OBJECTION"],
  powerChunks: { core: ["compared with…", "the biggest advantage is…"], stretch: "I understand your concern, but…" },
  sceneImage: { src: scenePlans, alt: "Plan A: lowest price, basic features. Plan B: moderate price, better reliability, good support. Plan C: highest price, most features, priority support", altEs: "Plan A: precio más bajo, funciones básicas. Plan B: precio moderado, mejor confiabilidad, buen soporte. Plan C: precio más alto, más funciones, soporte prioritario" },
  goalSeconds: [75, 90],
  goalSentences: 8,
  rep5Prompt: { question: "A customer is comparing our three plans. Recommend one and defend it under pressure.", questionEs: "Un cliente compara nuestros tres planes. Recomienda uno y defiéndelo bajo presión." },
  rep5Tips: {
    en: "Turn 1: recommend + the main reason. Turn 2: compared with… (value, not price). Turn 3: I understand your concern, but… Turn 4: the biggest advantage is… + close.",
    es: "Turno 1: recomienda + la razón principal. Turno 2: compared with… (valor, no precio). Turno 3: I understand your concern, but… Turno 4: the biggest advantage is… + cierre.",
  },
  rep5Label: "defend",
  rep5Turns: [
    { id: "t14-turn1", label: "CUSTOMER", labelEs: "CLIENTE", text: "I run a small business and I'm looking at your plans. Which plan would you recommend?", es: "Tengo un negocio pequeño y estoy viendo sus planes. ¿Qué plan me recomienda?", voice: "male" },
    { id: "t14-turn2", label: "CUSTOMER", labelEs: "CLIENTE", text: "Your competitor offers something similar for ten dollars less.", es: "Su competidor ofrece algo parecido por diez dólares menos.", voice: "male" },
    { id: "t14-turn3", label: "CUSTOMER", labelEs: "CLIENTE", text: "Why should I pay more?", es: "¿Por qué debería pagar más?", voice: "male" },
    { id: "t14-turn4", label: "CUSTOMER", labelEs: "CLIENTE", text: "I'm still not convinced. What's the biggest advantage?", es: "Todavía no estoy convencido. ¿Cuál es la mayor ventaja?", voice: "male" },
  ],
  rep5Toolbox: ["Based on what you've told me…", "Compared with…", "The biggest advantage is…", "I understand your concern, but…", "Overall…"],
  speakerVoice: "female",
});

/* ---------------------------- DAY 15 — WHO WOULD YOU HIRE? ---------------------------- */

const d15 = tigersDay({
  day: 15,
  topic: "Who Would You Hire?",
  topicEs: "¿A quién contratarías?",
  focus: "Simple present review — evaluate candidates and defend a decision",
  focusEs: "Repaso del presente simple — evalúa candidatos y defiende una decisión",
  intro: {
    title: "WHO WOULD YOU HIRE?",
    titleEs: "¿A QUIÉN CONTRATARÍAS?",
    lead: "Ana, Carlos or Maria. Each one has a real strength and a real gap. Choose one, explain why not the others, and defend it when challenged.",
    leadEs: "Ana, Carlos o Maria. Cada uno tiene una fortaleza real y una carencia real. Elige uno, explica por qué no los otros y defiéndelo cuando te cuestionen.",
    examples: ["I would choose Maria.", "The main reason is that she has experience and good English.", "Compared with the other candidates, she is the most balanced."],
    goal: "Hiring role play: 4 fixed turns. Speak 75–90 seconds in total.",
    goalEs: "Role play de contratación: 4 turnos fijos. Habla 75–90 segundos en total.",
    cta: START,
  },
  lines: [
    l("t15-1", "We have three candidates, | and each one has a clear strength.", "Tenemos tres candidatos, y cada uno tiene una fortaleza clara."),
    l("t15-2", "Ana speaks excellent English | and she learns quickly, | but she has little experience.", "Ana habla excelente inglés y aprende rápido, pero tiene poca experiencia."),
    l("t15-3", "Carlos has five years of experience | and he is very reliable, | but his English is weaker.", "Carlos tiene cinco años de experiencia y es muy confiable, pero su inglés es más débil."),
    l("t15-4", "Maria has three years of experience, | good English, | and strong customer service skills.", "Maria tiene tres años de experiencia, buen inglés y fuertes habilidades de servicio al cliente."),
    l("t15-5", "If I had to choose, | I would choose Maria.", "Si tuviera que elegir, elegiría a Maria."),
    l("t15-6", "The main reason is that | she doesn't have a big gap | in any area.", "La razón principal es que no tiene una carencia grande en ninguna área."),
    l("t15-7", "Compared with the other candidates, | she can start working with customers | from day one.", "Comparada con los otros candidatos, puede empezar a trabajar con clientes desde el primer día."),
    l("t15-8", "I see the value in Ana and Carlos, | but for this position, | Maria is the safest choice.", "Veo el valor de Ana y Carlos, pero para este puesto, Maria es la opción más segura."),
  ],
  rep2Chunks: chunks4("t15"),
  prompts: [
    q("t15-p1", "Who would you hire?", "¿A quién contratarías?", "I would choose…", "Yo elegiría a…", "ANSWER"),
    q("t15-p2", "Why?", "¿Por qué?", "The main reason is that…", "La razón principal es que…", "WHY", "explain"),
    q("t15-p3", "What is their biggest strength?", "¿Cuál es su mayor fortaleza?", "Their biggest strength is… For example, …", "Su mayor fortaleza es… Por ejemplo, …", "STRENGTH", "explain"),
    q("t15-p4", "Why not the others?", "¿Por qué no los otros?", "Compared with the other candidates, …", "Comparado con los otros candidatos, …", "COMPARE", "justify"),
    q("t15-p5", "What could change your decision?", "¿Qué podría cambiar tu decisión?", "I would change my decision if…", "Cambiaría mi decisión si…", "DEFEND", "defend"),
  ],
  cues: ["ANA", "CARLOS", "MARIA", "MY CHOICE", "WHY NOT"],
  powerChunks: { core: ["I would choose…", "the main reason is…"], stretch: "compared with the other candidates…" },
  sceneImage: { src: sceneCandidates, alt: "Three candidate cards: Ana (excellent English, little experience, learns quickly), Carlos (5 years experience, weaker English, very reliable), Maria (good English, 3 years experience, strong customer service)", altEs: "Tres tarjetas de candidatos: Ana (excelente inglés, poca experiencia, aprende rápido), Carlos (5 años de experiencia, inglés más débil, muy confiable), Maria (buen inglés, 3 años de experiencia, fuerte servicio al cliente)" },
  goalSeconds: [75, 90],
  goalSentences: 8,
  rep5Prompt: { question: "Who would you hire: Ana, Carlos or Maria? Decide and defend it.", questionEs: "¿A quién contratarías: Ana, Carlos o Maria? Decide y defiéndelo." },
  rep5Tips: {
    en: "Turn 1: I would choose… + the main reason. Turn 2: why not Ana — compare fairly. Turn 3: react to new information honestly. Turn 4: final choice + overall…",
    es: "Turno 1: I would choose… + la razón principal. Turno 2: por qué no Ana — compara con justicia. Turno 3: reacciona con honestidad a la nueva información. Turno 4: elección final + overall…",
  },
  rep5Label: "defend",
  rep5Turns: [
    { id: "t15-turn1", label: "MANAGER", labelEs: "GERENTE", text: "You've seen the three candidates. Who would you hire?", es: "Ya viste a los tres candidatos. ¿A quién contratarías?", voice: "female" },
    { id: "t15-turn2", label: "MANAGER", labelEs: "GERENTE", text: "Why not Ana? Her English is the best of the three.", es: "¿Por qué no Ana? Su inglés es el mejor de los tres.", voice: "female" },
    { id: "t15-turn3", label: "MANAGER", labelEs: "GERENTE", text: "What if Carlos had better English?", es: "¿Y si Carlos tuviera mejor inglés?", voice: "female" },
    { id: "t15-turn4", label: "MANAGER", labelEs: "GERENTE", text: "Okay. Who is your final choice, and why?", es: "Bien. ¿Cuál es tu elección final y por qué?", voice: "female" },
  ],
  rep5Toolbox: ["I would choose…", "The main reason is…", "Compared with the other candidates…", "I see the value in…, but…", "Overall…"],
  speakerVoice: "male",
  testReady: {
    type: "speak-now",
    title: "SPEAK NOW",
    titleEs: "HABLA AHORA",
    instruction: "10 seconds to think. Then speak for about 60 seconds.",
    instructionEs: "10 segundos para pensar. Luego habla unos 60 segundos.",
    thinkSeconds: 10,
    speakSeconds: 60,
    items: [
      {
        id: "t15-tr1",
        text: "What makes someone a strong candidate for a job?",
        textEs: "¿Qué hace que alguien sea un candidato fuerte para un trabajo?",
        chunks: ["QUALITY 1?", "WHY?", "EXAMPLE?", "QUALITY 2?", "MOST IMPORTANT?"],
        maxSeconds: 60,
      },
    ],
  },
});

/* ====================================================================== */
/* WEEK 4 — PREDICT, REACT & DECIDE                                          */
/* ====================================================================== */

/* ---------------------------- DAY 16 — WHAT DO YOU THINK WILL HAPPEN? ---------------------------- */

const d16 = tigersDay({
  day: 16,
  topic: "What Do You Think Will Happen?",
  topicEs: "¿Qué crees que va a pasar?",
  focus: "Future — will · going to · it's possible that — predict and defend",
  focusEs: "Futuro — will · going to · it's possible that — predice y defiende",
  intro: {
    title: "WHAT DO YOU THINK WILL HAPPEN?",
    titleEs: "¿QUÉ CREES QUE VA A PASAR?",
    lead: "AI, remote work, education, transportation. Make a prediction, give a reason and an example, and admit another possibility.",
    leadEs: "IA, trabajo remoto, educación, transporte. Haz una predicción, da una razón y un ejemplo, y admite otra posibilidad.",
    examples: ["I believe AI will change most office jobs.", "The main reason is that it's already writing emails and reports.", "It's possible that new jobs will appear too."],
    goal: "Speak for 75–90 seconds. Prediction → reason → example → other possibility.",
    goalEs: "Habla 75–90 segundos. Predicción → razón → ejemplo → otra posibilidad.",
    cta: START,
  },
  lines: [
    l("t16-1", "I believe AI will change most office jobs | in the next five years.", "Creo que la IA cambiará la mayoría de los trabajos de oficina en los próximos cinco años."),
    l("t16-2", "The main reason is that | it's already writing emails, reports and code.", "La razón principal es que ya está escribiendo correos, reportes y código."),
    l("t16-3", "For example, | in my company, | people are going to use AI to answer basic customer questions.", "Por ejemplo, en mi empresa la gente va a usar IA para responder preguntas básicas de clientes."),
    l("t16-4", "Some jobs will probably disappear, | especially repetitive ones.", "Algunos trabajos probablemente desaparecerán, especialmente los repetitivos."),
    l("t16-5", "However, | it's possible that new jobs will appear, | like people who train and check the AI.", "Sin embargo, es posible que aparezcan nuevos trabajos, como gente que entrena y revisa la IA."),
    l("t16-6", "Another possibility is that | AI won't replace people, | but people who use AI will replace people who don't.", "Otra posibilidad es que la IA no reemplace a las personas, sino que la gente que usa IA reemplace a la que no."),
    l("t16-7", "If I had to bet, | I would say the biggest change will be speed, | not unemployment.", "Si tuviera que apostar, diría que el mayor cambio será la velocidad, no el desempleo."),
    l("t16-8", "Overall, | people who keep learning | will be fine.", "En general, la gente que siga aprendiendo estará bien."),
  ],
  rep2Chunks: chunks4("t16"),
  prompts: [
    q("t16-p1", "What do you think will happen?", "¿Qué crees que va a pasar?", "I believe… will…", "Creo que… va a…", "PREDICT"),
    q("t16-p2", "Why?", "¿Por qué?", "The main reason is that…", "La razón principal es que…", "WHY", "explain"),
    q("t16-p3", "Can you give an example?", "¿Puedes dar un ejemplo?", "For example, …", "Por ejemplo, …", "EXAMPLE", "explain"),
    q("t16-p4", "What is another possibility?", "¿Cuál es otra posibilidad?", "It's possible that… / Another possibility is that…", "Es posible que… / Otra posibilidad es que…", "OTHER SIDE", "justify"),
    q("t16-p5", "What could change your prediction?", "¿Qué podría cambiar tu predicción?", "My prediction could change if…", "Mi predicción podría cambiar si…", "DEFEND", "defend"),
  ],
  cues: ["PREDICTION", "WHY", "EXAMPLE", "ANOTHER POSSIBILITY", "MY BET"],
  powerChunks: { core: ["I believe…", "the main reason is…"], stretch: "it's possible that…" },
  sceneImage: { src: sceneFutureAi, alt: "A professional collaborating with an AI assistant on screen, robots in the background and remote workers on video tiles", altEs: "Un profesional colaborando con un asistente de IA en pantalla, robots al fondo y trabajadores remotos en videollamada" },
  variants: [
    { id: "ai", label: "AI & WORK", labelEs: "IA Y TRABAJO" },
    { id: "remote", label: "REMOTE WORK", labelEs: "TRABAJO REMOTO" },
    { id: "education", label: "EDUCATION", labelEs: "EDUCACIÓN" },
    { id: "transport", label: "TRANSPORTATION", labelEs: "TRANSPORTE" },
  ],
  goalSeconds: [75, 90],
  goalSentences: 9,
  rep5Prompt: { question: "How do you think AI will change work in the next five years?", questionEs: "¿Cómo crees que la IA cambiará el trabajo en los próximos cinco años?" },
  rep5Tips: {
    en: "I believe… → the main reason is… → for example… → however, it's possible that… → if I had to bet… → overall…",
    es: "I believe… → the main reason is… → for example… → however, it's possible that… → if I had to bet… → overall…",
  },
  rep5Label: "justify",
  speakerVoice: "male",
  testReady: {
    type: "story-retell",
    title: "INFORMATION RETELL + OPINION",
    titleEs: "VUELVE A CONTAR + OPINIÓN",
    instruction: "Listen once. Retell the key idea, then give your own opinion.",
    instructionEs: "Escucha una vez. Cuenta la idea clave y luego da tu opinión.",
    passage:
      "A recent report says that in the next ten years, more than half of customer service conversations will start with an AI assistant. Companies believe this will reduce waiting times. However, the same report says that customers still want a real person for complicated problems, and that agents who can explain, negotiate and calm people down will be more valuable than ever.",
    speakSeconds: 45,
    items: [
      {
        id: "t16-tr1",
        text: "Retell the key idea. Then say: do you agree? Why?",
        textEs: "Cuenta la idea clave. Luego di: ¿estás de acuerdo? ¿Por qué?",
        chunks: ["KEY IDEA", "HOWEVER", "MY OPINION", "WHY"],
        maxSeconds: 50,
      },
    ],
  },
});

/* ---------------------------- DAY 17 — WHAT HAVE YOU ACCOMPLISHED? ---------------------------- */

const d17 = tigersDay({
  day: 17,
  topic: "What Have You Accomplished?",
  topicEs: "¿Qué has logrado?",
  focus: "Present perfect — achievement + evidence + next goal",
  focusEs: "Presente perfecto — logro + evidencia + siguiente meta",
  intro: {
    title: "WHAT HAVE YOU ACCOMPLISHED?",
    titleEs: "¿QUÉ HAS LOGRADO?",
    lead: "An achievement is not a title — it's evidence. Say what you accomplished, why it matters, what was hard, and what comes next.",
    leadEs: "Un logro no es un título: es evidencia. Di qué lograste, por qué importa, qué fue difícil y qué sigue.",
    examples: ["I have accomplished something I thought was impossible.", "For example, I've spoken English every day for two months.", "However, I still need to improve my listening."],
    goal: "Speak for 75–90 seconds. Achievement → why → example → next.",
    goalEs: "Habla 75–90 segundos. Logro → por qué → ejemplo → siguiente.",
    cta: START,
  },
  lines: [
    l("t17-1", "This year, | I have accomplished something | I thought was impossible.", "Este año he logrado algo que creía imposible."),
    l("t17-2", "I have spoken English out loud every day | for more than two months.", "He hablado inglés en voz alta todos los días por más de dos meses."),
    l("t17-3", "It's important to me because | I used to freeze | every time someone spoke to me in English.", "Es importante para mí porque solía quedarme paralizado cada vez que alguien me hablaba en inglés."),
    l("t17-4", "For example, | last week I explained a problem to a customer from Texas, | and he understood me perfectly.", "Por ejemplo, la semana pasada le expliqué un problema a un cliente de Texas y me entendió perfectamente."),
    l("t17-5", "The most difficult part | has been staying consistent | when I'm tired.", "La parte más difícil ha sido mantenerme constante cuando estoy cansado."),
    l("t17-6", "I have also learned that | small daily steps | are more powerful than big plans.", "También he aprendido que los pequeños pasos diarios son más poderosos que los grandes planes."),
    l("t17-7", "However, | I still need to improve my listening | with fast speakers.", "Sin embargo, todavía necesito mejorar mi comprensión con hablantes rápidos."),
    l("t17-8", "My next goal is | to pass a job interview | completely in English.", "Mi siguiente meta es pasar una entrevista de trabajo completamente en inglés."),
  ],
  rep2Chunks: chunks4("t17"),
  prompts: [
    q("t17-p1", "What have you accomplished?", "¿Qué has logrado?", "I have accomplished…", "He logrado…", "ANSWER"),
    q("t17-p2", "Why is it important to you?", "¿Por qué es importante para ti?", "It's important to me because…", "Es importante para mí porque…", "WHY", "explain"),
    q("t17-p3", "Can you give an example?", "¿Puedes dar un ejemplo?", "For example, …", "Por ejemplo, …", "EVIDENCE", "explain"),
    q("t17-p4", "What was difficult?", "¿Qué fue difícil?", "The most difficult part has been…", "La parte más difícil ha sido…", "CHALLENGE", "justify"),
    q("t17-p5", "What do you want to do next, and why?", "¿Qué quieres hacer después y por qué?", "However, I still need to… My next goal is… because…", "Sin embargo, todavía necesito… Mi siguiente meta es… porque…", "NEXT", "defend"),
  ],
  cues: ["ACHIEVEMENT", "WHY IMPORTANT", "EXAMPLE", "DIFFICULT", "NEXT GOAL"],
  powerChunks: { core: ["I have accomplished…", "for example…"], stretch: "however, I still need to…" },
  sceneImage: { src: sceneAchievement, alt: "A woman on a podium holding a certificate, with a staircase continuing upward toward a flag on a hill", altEs: "Una mujer en un podio con un certificado, con una escalera que sigue subiendo hacia una bandera en una colina" },
  goalSeconds: [75, 90],
  goalSentences: 9,
  rep5Prompt: { question: "Tell me about an achievement and what you want to do next.", questionEs: "Cuéntame sobre un logro y qué quieres hacer después." },
  rep5Tips: {
    en: "I have accomplished… → why it matters → for example… → the most difficult part has been… → however, I still need to… → my next goal is…",
    es: "I have accomplished… → por qué importa → for example… → the most difficult part has been… → however, I still need to… → my next goal is…",
  },
  rep5Label: "explain",
  speakerVoice: "female",
});

/* ---------------------------- DAY 18 — HOW HAVE YOU BEEN CHANGING? ---------------------------- */

const d18 = tigersDay({
  day: 18,
  topic: "How Have You Been Changing?",
  topicEs: "¿Cómo has estado cambiando?",
  focus: "Present perfect progressive — reflect on development and challenges",
  focusEs: "Presente perfecto progresivo — reflexiona sobre tu desarrollo y tus retos",
  intro: {
    title: "HOW HAVE YOU BEEN CHANGING?",
    titleEs: "¿CÓMO HAS ESTADO CAMBIANDO?",
    lead: "Reflect honestly: what you've been doing differently, why, what you've noticed, what's been hard, and what still needs work.",
    leadEs: "Reflexiona con honestidad: qué has estado haciendo diferente, por qué, qué has notado, qué ha sido difícil y qué falta.",
    examples: ["I've been trying to think in English instead of translating.", "One change I've noticed is that I pause less.", "What I still need to work on is speaking under pressure."],
    goal: "Speak for 75–90 seconds. Honest reflection with evidence.",
    goalEs: "Habla 75–90 segundos. Reflexión honesta con evidencia.",
    cta: START,
  },
  lines: [
    l("t18-1", "For the last few months, | I've been trying to think in English | instead of translating.", "Durante los últimos meses he estado tratando de pensar en inglés en vez de traducir."),
    l("t18-2", "I've been doing this because | translating makes me slow and nervous.", "He estado haciendo esto porque traducir me hace lento y nervioso."),
    l("t18-3", "One change I've noticed is that | I pause less | when I explain something.", "Un cambio que he notado es que hago menos pausas cuando explico algo."),
    l("t18-4", "For example, | yesterday I gave my opinion in a meeting | without preparing it first.", "Por ejemplo, ayer di mi opinión en una reunión sin prepararla antes."),
    l("t18-5", "What's been difficult | is staying calm | when someone asks me an unexpected question.", "Lo que ha sido difícil es mantener la calma cuando alguien me hace una pregunta inesperada."),
    l("t18-6", "I've also been listening to podcasts, | and I understand more every week.", "También he estado escuchando podcasts, y entiendo más cada semana."),
    l("t18-7", "What I still need to work on | is defending my ideas | when someone disagrees.", "Lo que todavía necesito trabajar es defender mis ideas cuando alguien no está de acuerdo."),
    l("t18-8", "Overall, | I've been becoming a more confident speaker, | little by little.", "En general, me he estado convirtiendo en un hablante más seguro, poco a poco."),
  ],
  rep2Chunks: chunks4("t18"),
  prompts: [
    q("t18-p1", "What have you been doing differently?", "¿Qué has estado haciendo diferente?", "I've been trying to…", "He estado tratando de…", "ANSWER"),
    q("t18-p2", "Why?", "¿Por qué?", "I've been doing this because…", "He estado haciendo esto porque…", "WHY", "explain"),
    q("t18-p3", "What change have you noticed? Give an example.", "¿Qué cambio has notado? Da un ejemplo.", "One change I've noticed is that… For example, …", "Un cambio que he notado es que… Por ejemplo, …", "EVIDENCE", "explain"),
    q("t18-p4", "What has been difficult?", "¿Qué ha sido difícil?", "What's been difficult is…", "Lo que ha sido difícil es…", "CHALLENGE", "justify"),
    q("t18-p5", "What do you still need to work on, and what will you do?", "¿Qué te falta trabajar y qué harás?", "What I still need to work on is… so I'm going to…", "Lo que todavía necesito trabajar es… así que voy a…", "NEXT", "defend"),
  ],
  cues: ["DIFFERENT", "WHY", "NOTICED", "DIFFICULT", "STILL NEED"],
  powerChunks: { core: ["I've been trying to…", "one change I've noticed is…"], stretch: "what I still need to work on is…" },
  sceneImage: { src: sceneChanging, alt: "A man looking at a mirror that shows increasingly confident versions of himself, with icons of daily habits", altEs: "Un hombre mirando un espejo que muestra versiones cada vez más seguras de sí mismo, con íconos de hábitos diarios" },
  goalSeconds: [75, 90],
  goalSentences: 9,
  rep5Prompt: { question: "Explain how you have been changing or improving.", questionEs: "Explica cómo has estado cambiando o mejorando." },
  rep5Tips: {
    en: "I've been trying to… → why → one change I've noticed is… + for example… → what's been difficult is… → what I still need to work on is… → overall…",
    es: "I've been trying to… → por qué → one change I've noticed is… + for example… → what's been difficult is… → what I still need to work on is… → overall…",
  },
  rep5Label: "explain",
  speakerVoice: "male",
  testReady: {
    type: "listen-respond",
    title: "LISTEN & RESPOND",
    titleEs: "ESCUCHA Y RESPONDE",
    instruction: "A natural-speed conversation. Listen once, then answer 4 questions out loud.",
    instructionEs: "Una conversación a velocidad natural. Escucha una vez y responde 4 preguntas en voz alta.",
    passage:
      "Manager: How have things been going since you moved to the new team? Employee: Honestly, better than I expected. I've been learning the new system, and I've been asking more questions instead of guessing. Manager: Any challenges? Employee: The pace. Everything moves faster here, and I've been staying late some days. Manager: What would help? Employee: A short check-in every Monday. Ten minutes would be enough.",
    items: [
      { id: "t18-tr1", audio: "What is the main idea of the conversation?", text: "What is the main idea of the conversation?", textEs: "¿Cuál es la idea principal de la conversación?", maxSeconds: 15 },
      { id: "t18-tr2", audio: "What has the employee been doing differently?", text: "What has the employee been doing differently?", textEs: "¿Qué ha estado haciendo diferente el empleado?", maxSeconds: 15 },
      { id: "t18-tr3", audio: "What is the employee's opinion about the new team?", text: "What is the employee's opinion about the new team?", textEs: "¿Qué opina el empleado del nuevo equipo?", maxSeconds: 15 },
      { id: "t18-tr4", audio: "If you were the manager, how would you respond?", text: "If you were the manager, how would you respond?", textEs: "Si fueras el gerente, ¿cómo responderías?", maxSeconds: 20 },
    ],
  },
});

/* ---------------------------- DAY 19 — NEW IN THE CITY ---------------------------- */

const d19 = tigersDay({
  day: 19,
  topic: "New in the City",
  topicEs: "Nuevo en la ciudad",
  focus: "Mixed tenses — decide as the information changes",
  focusEs: "Tiempos mixtos — decide mientras la información cambia",
  intro: {
    title: "NEW IN THE CITY",
    titleEs: "NUEVO EN LA CIUDAD",
    lead: "You just moved. Downtown or near the office? Each turn gives you NEW information. React to it, then decide.",
    leadEs: "Acabas de mudarte. ¿Centro o cerca de la oficina? Cada turno te da información NUEVA. Reacciona y luego decide.",
    examples: ["It depends on how much I value my time.", "If I had to choose, I would live near the office.", "Considering everything, the extra cost is worth it."],
    goal: "Info-reveal role play: 4 fixed turns. Speak 75–90 seconds in total.",
    goalEs: "Role play con información nueva: 4 turnos fijos. Habla 75–90 segundos en total.",
    cta: START,
  },
  lines: [
    l("t19-1", "I moved to this city last month, | and I still haven't decided where to live.", "Me mudé a esta ciudad el mes pasado y todavía no he decidido dónde vivir."),
    l("t19-2", "Option A is downtown: | it's cheaper, | but it's noisier and farther from work.", "La opción A es el centro: es más barata, pero más ruidosa y más lejos del trabajo."),
    l("t19-3", "Option B is near the office: | it's more expensive, | but it's quieter and I would save about an hour a day.", "La opción B está cerca de la oficina: es más cara, pero más tranquila y ahorraría como una hora al día."),
    l("t19-4", "It depends on | what I value more: | money or time.", "Depende de qué valoro más: dinero o tiempo."),
    l("t19-5", "At first, | I was going to choose downtown | because I've been trying to save.", "Al principio iba a elegir el centro porque he estado tratando de ahorrar."),
    l("t19-6", "However, | an hour a day is five hours a week | that I could use to study.", "Sin embargo, una hora al día son cinco horas a la semana que podría usar para estudiar."),
    l("t19-7", "If I had to choose, | I would live near the office, | even if it costs more.", "Si tuviera que elegir, viviría cerca de la oficina, aunque cueste más."),
    l("t19-8", "Considering everything, | time is the one thing | I can't buy back.", "Considerando todo, el tiempo es lo único que no puedo recuperar."),
  ],
  rep2Chunks: chunks4("t19"),
  prompts: [
    q("t19-p1", "Which area would you choose?", "¿Qué zona elegirías?", "If I had to choose, I would…", "Si tuviera que elegir, yo…", "ANSWER"),
    q("t19-p2", "Why?", "¿Por qué?", "It depends on… but for me…", "Depende de… pero para mí…", "WHY", "explain"),
    q("t19-p3", "What is a disadvantage of your choice?", "¿Cuál es una desventaja de tu elección?", "One disadvantage is… However, …", "Una desventaja es… Sin embargo, …", "HONEST", "justify"),
    q("t19-p4", "Who would prefer the other area?", "¿Quién preferiría la otra zona?", "For someone who…, the other area is better because…", "Para alguien que…, la otra zona es mejor porque…", "OTHER SIDE", "justify"),
    q("t19-p5", "What new information could change your choice?", "¿Qué información nueva podría cambiar tu elección?", "I would change my mind if… Considering everything, …", "Cambiaría de opinión si… Considerando todo, …", "DEFEND", "defend"),
  ],
  cues: ["DOWNTOWN", "NEAR OFFICE", "IT DEPENDS", "NEW INFO", "FINAL"],
  powerChunks: { core: ["it depends on…", "if I had to choose…"], stretch: "considering everything…" },
  sceneImage: { src: sceneCityOptions, alt: "Option A downtown: cheaper, noisier, far from work, larger apartment. Option B near office: more expensive, quieter, saves an hour a day", altEs: "Opción A centro: más barata, más ruidosa, lejos del trabajo, apartamento más grande. Opción B cerca de la oficina: más cara, más tranquila, ahorra una hora al día" },
  goalSeconds: [75, 90],
  goalSentences: 8,
  rep5Prompt: { question: "Where would you live: downtown or near the office? React to each new detail, then decide.", questionEs: "¿Dónde vivirías: en el centro o cerca de la oficina? Reacciona a cada detalle nuevo y decide." },
  rep5Tips: {
    en: "Each turn adds a fact. Say what it changes (it depends on…), keep or update your position, and finish with considering everything…",
    es: "Cada turno agrega un dato. Di qué cambia (it depends on…), mantén o actualiza tu posición y termina con considering everything…",
  },
  rep5Label: "defend",
  rep5Turns: [
    { id: "t19-turn1", label: "AGENT", labelEs: "AGENTE", text: "The downtown area is cheaper, but it's much noisier. What do you think?", es: "La zona del centro es más barata, pero es mucho más ruidosa. ¿Qué opinas?", voice: "female" },
    { id: "t19-turn2", label: "AGENT", labelEs: "AGENTE", text: "The area near your office is more expensive, but you'd save about an hour every day.", es: "La zona cerca de tu oficina es más cara, pero ahorrarías como una hora todos los días.", voice: "female" },
    { id: "t19-turn3", label: "AGENT", labelEs: "AGENTE", text: "One more thing: you just found out the downtown apartment is much larger.", es: "Una cosa más: acabas de enterarte de que el apartamento del centro es mucho más grande.", voice: "female" },
    { id: "t19-turn4", label: "AGENT", labelEs: "AGENTE", text: "So, where would you live, and why?", es: "Entonces, ¿dónde vivirías y por qué?", voice: "female" },
  ],
  rep5Toolbox: ["It depends on…", "If I had to choose…", "However…", "That changes things because…", "Considering everything…"],
  speakerVoice: "male",
});

/* ---------------------------- DAY 20 — TIGERS FINAL ---------------------------- */

const FINAL_TOOLBOX = ["The main reason is…", "For example…", "However…", "I see your point, but…", "If I had to choose…", "Overall…"];

const finalTurns = (prefix: string, opening: string, openingEs: string, voice: "female" | "male") => [
  { id: `${prefix}-turn1`, label: "CHALLENGER", labelEs: "RETADOR", text: opening, es: openingEs, voice },
  { id: `${prefix}-turn2`, label: "CHALLENGER", labelEs: "RETADOR", text: "I understand your point, but what about the other option?", es: "Entiendo tu punto, pero ¿y la otra opción?", voice },
  { id: `${prefix}-turn3`, label: "CHALLENGER", labelEs: "RETADOR", text: "What would make you change your mind?", es: "¿Qué te haría cambiar de opinión?", voice },
  { id: `${prefix}-turn4`, label: "CHALLENGER", labelEs: "RETADOR", text: "So, what's your final decision, and why?", es: "Entonces, ¿cuál es tu decisión final y por qué?", voice },
];

const d20 = tigersDay({
  day: 20,
  topic: "TIGERS Final — Defend Your Decision",
  topicEs: "Final TIGERS — Defiende tu decisión",
  focus: "Transfer — answer · explain · support · compare · react · defend",
  focusEs: "Transferencia — responder · explicar · sostener · comparar · reaccionar · defender",
  intro: {
    title: "TIGERS FINAL",
    titleEs: "FINAL TIGERS",
    lead: "Defend your decision. You'll get ONE scenario — work, customer or life. No full model today: only the skeleton. Decide, explain, give an example, consider the other side, respond, conclude.",
    leadEs: "Defiende tu decisión. Recibirás UN escenario: trabajo, cliente o vida. Hoy no hay modelo completo: solo el esqueleto. Decide, explica, da un ejemplo, considera el otro lado, responde, concluye.",
    examples: ["DECISION → WHY → EXAMPLE", "OTHER SIDE → WHAT IF? → CONCLUSION", "Not perfect grammar. Clear reasoning."],
    goal: "Final challenge: 4 fixed turns. Speak 90–105 seconds in total. 10–12 connected ideas.",
    goalEs: "Reto final: 4 turnos fijos. Habla 90–105 segundos en total. 10–12 ideas conectadas.",
    cta: START,
  },
  lines: [
    l("t20-1", "My decision is clear, | and I can explain it.", "Mi decisión es clara y puedo explicarla."),
    l("t20-2", "The main reason is | what matters most in this situation.", "La razón principal es lo que más importa en esta situación."),
    l("t20-3", "For example, | there is one moment that proves my point.", "Por ejemplo, hay un momento que prueba mi punto."),
    l("t20-4", "I see the other side: | the other option has a real advantage.", "Veo el otro lado: la otra opción tiene una ventaja real."),
    l("t20-5", "However, | that advantage doesn't change | the most important factor.", "Sin embargo, esa ventaja no cambia el factor más importante."),
    l("t20-6", "If the situation changed, | I would consider it again.", "Si la situación cambiara, lo consideraría de nuevo."),
    l("t20-7", "But with the information I have today, | I would choose the same.", "Pero con la información que tengo hoy, elegiría lo mismo."),
    l("t20-8", "Overall, | this is the decision | I can defend.", "En general, esta es la decisión que puedo defender."),
  ],
  rep2Chunks: chunks4("t20"),
  prompts: [
    q("t20-p1", "What is your decision?", "¿Cuál es tu decisión?", "My decision is… / If I had to choose, I would…", "Mi decisión es… / Si tuviera que elegir, yo…", "DECISION"),
    q("t20-p2", "Why?", "¿Por qué?", "The main reason is that…", "La razón principal es que…", "WHY", "explain"),
    q("t20-p3", "What example supports your decision?", "¿Qué ejemplo apoya tu decisión?", "For example, …", "Por ejemplo, …", "EXAMPLE", "explain"),
    q("t20-p4", "What is the strongest argument against it?", "¿Cuál es el argumento más fuerte en contra?", "The strongest argument against it is… However, …", "El argumento más fuerte en contra es… Sin embargo, …", "OTHER SIDE", "justify"),
    q("t20-p5", "How would you respond to that argument?", "¿Cómo responderías a ese argumento?", "I see your point, but… Overall, …", "Entiendo tu punto, pero… En general, …", "DEFEND", "defend"),
  ],
  cues: ["DECISION", "WHY", "EXAMPLE", "OTHER SIDE", "WHAT IF?", "CONCLUSION"],
  powerChunks: { core: ["the main reason is…", "I see your point, but…"], stretch: "overall…" },
  sceneImage: { src: sceneFinal, alt: "A confident professional presenting a decision, with work, customer and life scenario tiles floating nearby", altEs: "Un profesional seguro presentando una decisión, con escenarios de trabajo, cliente y vida flotando cerca" },
  goalSeconds: [90, 105],
  goalSentences: 10,
  hideModelText: true,
  rep5Prompt: { question: "Defend your decision.", questionEs: "Defiende tu decisión." },
  rep5Tips: {
    en: "10–15 seconds to think. DECISION → WHY → EXAMPLE → OTHER SIDE → WHAT IF? → CONCLUSION. Speak 90–105 seconds in total.",
    es: "10–15 segundos para pensar. DECISION → WHY → EXAMPLE → OTHER SIDE → WHAT IF? → CONCLUSION. Habla 90–105 segundos en total.",
  },
  rep5Label: "defend",
  rep5Toolbox: FINAL_TOOLBOX,
  rep5Scenarios: [
    {
      id: "t20-work",
      label: "WORK",
      labelEs: "TRABAJO",
      situation: "You have two very different job offers: one pays 30% more but demands long hours in an office; the other pays less, is fully remote and offers fast growth.",
      situationEs: "Tienes dos ofertas de trabajo muy distintas: una paga 30% más pero exige muchas horas en oficina; la otra paga menos, es 100% remota y ofrece crecimiento rápido.",
      rep5Prompt: { question: "Which job do you choose? Decide and defend it.", questionEs: "¿Qué trabajo eliges? Decide y defiéndelo." },
      rep5Turns: finalTurns("t20-work", "You have two very different job offers. Which one do you choose, and why?", "Tienes dos ofertas de trabajo muy distintas. ¿Cuál eliges y por qué?", "male"),
    },
    {
      id: "t20-customer",
      label: "CUSTOMER",
      labelEs: "CLIENTE",
      situation: "A customer's internet has failed three times this month. You offered a technician visit and she rejected it. You need to explain another option and defend your recommendation.",
      situationEs: "El internet de una clienta falló tres veces este mes. Le ofreciste una visita técnica y la rechazó. Debes explicar otra opción y defender tu recomendación.",
      rep5Prompt: { question: "The customer rejected your first solution. Explain another option and defend it.", questionEs: "La clienta rechazó tu primera solución. Explica otra opción y defiéndela." },
      rep5Turns: finalTurns("t20-customer", "I don't want a technician in my house again. What else can you offer me?", "No quiero otro técnico en mi casa. ¿Qué más me puede ofrecer?", "female"),
    },
    {
      id: "t20-life",
      label: "LIFE",
      labelEs: "VIDA",
      situation: "You have the opportunity to move to another country for two years: better income and experience, but far from your family and everything you know.",
      situationEs: "Tienes la oportunidad de mudarte a otro país por dos años: mejor ingreso y experiencia, pero lejos de tu familia y de todo lo que conoces.",
      rep5Prompt: { question: "Do you move or do you stay? Decide and explain why.", questionEs: "¿Te mudas o te quedas? Decide y explica por qué." },
      rep5Turns: finalTurns("t20-life", "You could move to another country for two years. Do you go or do you stay?", "Podrías mudarte a otro país por dos años. ¿Te vas o te quedas?", "female"),
    },
  ],
  speakerVoice: "female",
  testReady: {
    type: "speak-now",
    title: "FINAL SPEAK NOW",
    titleEs: "HABLA AHORA — FINAL",
    instruction: "10 seconds to think. Then speak for about 60 seconds.",
    instructionEs: "10 segundos para pensar. Luego habla unos 60 segundos.",
    thinkSeconds: 10,
    speakSeconds: 60,
    items: [
      {
        id: "t20-tr1",
        text: "Explain a difficult decision you made.",
        textEs: "Explica una decisión difícil que tomaste.",
        chunks: ["DECISION?", "WHY?", "EXAMPLE?", "OTHER SIDE?", "CONCLUSION?"],
        maxSeconds: 60,
      },
    ],
  },
});

export const TIGERS_WEEKS_2_4_DAYS: CourseDay[] = [d6, d7, d8, d9, d10, d11, d12, d13, d14, d15, d16, d17, d18, d19, d20];
