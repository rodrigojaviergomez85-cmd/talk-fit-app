/**
 * ADVANCED 1 — GET HIRED · WEEKS 2–4 (Days 6–20)
 *
 *   WEEK 2  Prove What You Can Do        SITUATION → ACTION → RESULT → LESSON
 *   WEEK 3  Answer the Hard Questions    calm, professional answers under pressure
 *   WEEK 4  Perform Under Job Pressure   recruiter · behavioral · crazy · CS · sales · listening
 *
 * Purely additive: Week 1 (Days 1–5) lives in advanced-1-course.ts and is
 * untouched. Every recruiter / customer turn is FIXED and prewritten — no
 * generative AI, no grading, no coach. New ids only (`a1d6-*` … `a1d20-*`).
 *
 * Difficulty progression:
 *   W2 cue chips on every turn · W3 cues only on the first turn of a Round ·
 *   W4 cues only on switch / crazy turns, toolbox only on customer turns.
 */
import type { CourseDay, TestReadySprint } from "@/lib/types";
import { l, q, chunks4 } from "./course-builders";
import { bankQuestion } from "./advanced-question-bank";
import {
  advancedDay,
  turn,
  repairTurn,
  variantTurn,
  recognitionTurn,
  RECOGNITION_ROUND,
  type RecognitionFrameworkId,
  START,
  RECRUITER,
  CUSTOMER,
  QUICK,
} from "./advanced-1-course";

import sceneD6 from "@/assets/advanced-1/scene-d06.jpg";
import sceneD7 from "@/assets/advanced-1/scene-d07.jpg";
import sceneD8 from "@/assets/advanced-1/scene-d08.jpg";
import sceneD9 from "@/assets/advanced-1/scene-d09.jpg";
import sceneD10 from "@/assets/advanced-1/scene-d10.jpg";
import sceneD11 from "@/assets/advanced-1/scene-d11.jpg";
import sceneD12 from "@/assets/advanced-1/scene-d12.jpg";
import sceneD13 from "@/assets/advanced-1/scene-d13.jpg";
import sceneD14 from "@/assets/advanced-1/scene-d14.jpg";
import sceneD15 from "@/assets/advanced-1/scene-d15.jpg";
import sceneD16 from "@/assets/advanced-1/scene-d16.jpg";
import sceneD17 from "@/assets/advanced-1/scene-d17.jpg";
import sceneD18 from "@/assets/advanced-1/scene-d18.jpg";
import sceneD19 from "@/assets/advanced-1/scene-d19.jpg";
import sceneD20 from "@/assets/advanced-1/scene-d20.jpg";

const DEVELOP: [number, number] = [30, 45];
const SUSTAIN: [number, number] = [60, 75];

/* ====================================================================== */
/* WEEK 2 — PROVE WHAT YOU CAN DO                                           */
/* ====================================================================== */

/* ---------------------------- DAY 6 — A CHALLENGE ---------------------------- */

const challenge = bankQuestion("challenge-1");

const d6 = advancedDay({
  day: 6,
  topic: "Tell Me About a Challenge",
  topicEs: "Cuéntame sobre un reto",
  focus: "Simple past + past progressive — SITUATION → ACTION → RESULT → LESSON",
  focusEs: "Pasado simple + pasado progresivo — SITUACIÓN → ACCIÓN → RESULTADO → LECCIÓN",
  intro: {
    title: "A CHALLENGE YOU FACED",
    titleEs: "UN RETO QUE ENFRENTASTE",
    lead: "Stop saying 'I'm a problem solver'. Prove it with one real story: what was happening, what YOU did, what changed.",
    leadEs: "Deja de decir 'soy bueno/a resolviendo problemas'. Pruébalo con una historia real: qué pasaba, qué hiciste TÚ, qué cambió.",
    examples: ["A few months ago, I was…", "So what I did was…", "As a result…"],
    goal: "Tell the story for 60–75 seconds, then explain exactly what you did.",
    goalEs: "Cuenta la historia 60–75 segundos y luego explica exactamente qué hiciste.",
    cta: START,
  },
  lines: [
    l("a1d6-1", "A few months ago, | I was working on a project | and we were running out of time.", "Hace unos meses estaba trabajando en un proyecto y nos estábamos quedando sin tiempo."),
    l("a1d6-2", "Two people on the team got sick, | so suddenly there was a lot more work for everyone.", "Dos personas del equipo se enfermaron, así que de repente había mucho más trabajo para todos."),
    l("a1d6-3", "Instead of waiting for someone to tell me what to do, | I made a list of everything that was still pending.", "En vez de esperar a que alguien me dijera qué hacer, hice una lista de todo lo que seguía pendiente."),
    l("a1d6-4", "Then I talked to my supervisor | and we decided what was really urgent.", "Luego hablé con mi supervisora y decidimos qué era realmente urgente."),
    l("a1d6-5", "I took the two most difficult tasks myself | and I stayed a little later that week.", "Yo tomé las dos tareas más difíciles y me quedé un poco más tarde esa semana."),
    l("a1d6-6", "It wasn't easy, | but I kept everyone updated every day.", "No fue fácil, pero mantuve a todos informados cada día."),
    l("a1d6-7", "In the end, | we delivered the project only one day late, | and the client was happy with the result.", "Al final entregamos el proyecto solo un día tarde, y el cliente quedó contento con el resultado."),
    l("a1d6-8", "What I learned is that | when things get difficult, | organizing first saves a lot of time later.", "Lo que aprendí es que cuando las cosas se ponen difíciles, organizarse primero ahorra mucho tiempo después."),
  ],
  rep2Chunks: chunks4("a1d6"),
  prompts: [
    q("a1d6-p1", "What was happening? Set the scene in one or two sentences.", "¿Qué estaba pasando? Describe la escena en una o dos oraciones.", "A few months ago, I was…", "Hace unos meses, yo estaba…", "SITUATION"),
    q("a1d6-p2", "What made it difficult?", "¿Qué lo hizo difícil?", "The problem was that…", "El problema era que…", "PROBLEM"),
    q("a1d6-p3", "What did YOU do first?", "¿Qué hiciste TÚ primero?", "So what I did was…", "Así que lo que hice fue…", "ACTION", "explain"),
    q("a1d6-p4", "What was the result?", "¿Cuál fue el resultado?", "As a result…", "Como resultado…", "RESULT"),
    q("a1d6-p5", "What did you learn from it?", "¿Qué aprendiste de eso?", "What I learned is that…", "Lo que aprendí es que…", "LESSON", "justify"),
  ],
  cues: ["SITUATION", "PROBLEM", "ACTION", "RESULT", "LESSON"],
  powerChunks: { core: ["So what I did was…", "As a result…"], stretch: "What I learned is that…" },
  sceneImage: { src: sceneD6, alt: "A woman explaining a problem on a whiteboard to two coworkers", altEs: "Una mujer explicando un problema en una pizarra a dos compañeros" },
  goalSeconds: [75, 100],
  goalSentences: 8,
  hideModelText: true,
  rep5Prompt: { question: challenge.text, questionEs: challenge.es },
  rep5Tips: {
    en: "SITUATION → ACTION → RESULT → LESSON. Use 'I', not 'we', when you describe the action.",
    es: "SITUACIÓN → ACCIÓN → RESULTADO → LECCIÓN. Usa 'I', no 'we', cuando describas la acción.",
  },
  rep5Turns: [
    variantTurn("a1d6-turn1", RECRUITER, "challenge-1", 0, "female", { targetSeconds: SUSTAIN, cues: ["SITUATION", "ACTION", "RESULT", "LESSON"] }),
    turn("a1d6-turn2", RECRUITER, challenge.followUp!.text, challenge.followUp!.es, "female", { targetSeconds: DEVELOP, cues: ["I decided…", "I talked to…", "I took…"] }),
    // REPAIR — NEEDS TIME
    repairTurn("a1d6-repair", "time", "repair-time-2", "female"),
  ],
  speakerVoice: "female",
});

/* ---------------------------- DAY 7 — A MISTAKE ---------------------------- */

const mistake = bankQuestion("mistake-1");

const d7Sprint: TestReadySprint = {
  type: "repeat",
  title: "LISTEN & REPEAT",
  titleEs: "ESCUCHA Y REPITE",
  instruction: "Natural speed. Listen, then say the whole sentence. Five sentences, each one a little longer.",
  instructionEs: "Velocidad natural. Escucha y di la oración completa. Cinco oraciones, cada una un poco más larga.",
  items: [
    { id: "a1d7-tr1", audio: "I sent the report to the wrong client by mistake.", maxSeconds: 10 },
    { id: "a1d7-tr2", audio: "As soon as I noticed, I told my supervisor what had happened.", maxSeconds: 12 },
    { id: "a1d7-tr3", audio: "I didn't try to hide it, because that would have made everything worse.", maxSeconds: 14 },
    { id: "a1d7-tr4", audio: "We called the client together and I apologized directly.", maxSeconds: 14 },
    { id: "a1d7-tr5", audio: "Since then, I always double-check the email address before I send anything important.", maxSeconds: 16 },
  ],
};

const d7 = advancedDay({
  day: 7,
  topic: "Tell Me About a Mistake",
  topicEs: "Cuéntame sobre un error",
  focus: "Own it — MISTAKE → RESPONSIBILITY → ACTION → LESSON · never blame a coworker or manager",
  focusEs: "Asúmelo — ERROR → RESPONSABILIDAD → ACCIÓN → LECCIÓN · nunca culpes a un compañero o jefe",
  intro: {
    title: "A MISTAKE YOU MADE",
    titleEs: "UN ERROR QUE COMETISTE",
    lead: "Recruiters don't want a perfect person. They want someone who takes responsibility and fixes things. No excuses, no blaming.",
    leadEs: "Los reclutadores no quieren a alguien perfecto. Quieren a alguien que asume la responsabilidad y arregla las cosas. Sin excusas, sin culpar.",
    examples: ["I made a mistake when…", "It was my responsibility, so…", "Since then, I always…"],
    goal: "60–75 seconds, then explain what you would do differently today.",
    goalEs: "60–75 segundos y luego explica qué harías diferente hoy.",
    cta: START,
  },
  lines: [
    l("a1d7-1", "In my last job, | I made a mistake with an important email.", "En mi último trabajo cometí un error con un correo importante."),
    l("a1d7-2", "I was in a hurry, | and I sent the report to the wrong client.", "Tenía prisa y envié el reporte al cliente equivocado."),
    l("a1d7-3", "It was my responsibility, | so I didn't try to hide it or blame anyone.", "Era mi responsabilidad, así que no intenté esconderlo ni culpar a nadie."),
    l("a1d7-4", "As soon as I noticed, | I told my supervisor exactly what had happened.", "En cuanto me di cuenta, le dije a mi supervisor exactamente lo que había pasado."),
    l("a1d7-5", "Then I called the client, | apologized directly, | and sent the correct file.", "Luego llamé al cliente, me disculpé directamente y envié el archivo correcto."),
    l("a1d7-6", "The client appreciated the honesty, | and we didn't lose the account.", "El cliente valoró la honestidad y no perdimos la cuenta."),
    l("a1d7-7", "Since then, | I always double-check the name and the address | before I send anything important.", "Desde entonces, siempre reviso dos veces el nombre y la dirección antes de enviar algo importante."),
    l("a1d7-8", "That mistake taught me that | being fast is never more important | than being careful.", "Ese error me enseñó que ser rápido nunca es más importante que ser cuidadoso."),
  ],
  rep2Chunks: chunks4("a1d7"),
  prompts: [
    q("a1d7-p1", "What was the mistake? Say it directly.", "¿Cuál fue el error? Dilo directamente.", "I made a mistake when…", "Cometí un error cuando…", "MISTAKE"),
    q("a1d7-p2", "Why was it your responsibility?", "¿Por qué era tu responsabilidad?", "It was my responsibility because…", "Era mi responsabilidad porque…", "RESPONSIBILITY", "justify"),
    q("a1d7-p3", "What did you do to fix it?", "¿Qué hiciste para arreglarlo?", "As soon as I noticed, I…", "En cuanto me di cuenta, yo…", "ACTION", "explain"),
    q("a1d7-p4", "What do you do differently now?", "¿Qué haces diferente ahora?", "Since then, I always…", "Desde entonces, siempre…", "LESSON"),
    q("a1d7-p5", "Why should this mistake not worry an employer?", "¿Por qué este error no debería preocupar a un empleador?", "It shouldn't worry you because…", "No debería preocuparle porque…", "DEFEND", "defend"),
  ],
  cues: ["MISTAKE", "RESPONSIBILITY", "ACTION", "LESSON"],
  powerChunks: { core: ["It was my responsibility, so…", "Since then, I always…"], stretch: "That mistake taught me that…" },
  sceneImage: { src: sceneD7, alt: "A man at a service desk honestly explaining a mistake to his supervisor", altEs: "Un hombre en un mostrador explicando con honestidad un error a su supervisor" },
  goalSeconds: [75, 100],
  goalSentences: 8,
  hideModelText: true,
  rep5Prompt: { question: mistake.text, questionEs: mistake.es },
  rep5Tips: {
    en: "MISTAKE → RESPONSIBILITY → ACTION → LESSON. If you hear yourself blaming someone, stop and restart the sentence with 'I'.",
    es: "ERROR → RESPONSABILIDAD → ACCIÓN → LECCIÓN. Si te escuchas culpando a alguien, detente y vuelve a empezar la oración con 'I'.",
  },
  rep5Turns: [
    variantTurn("a1d7-turn1", RECRUITER, "mistake-1", 0, "male", { targetSeconds: SUSTAIN, cues: ["MISTAKE", "RESPONSIBILITY", "ACTION", "LESSON"] }),
    turn("a1d7-turn2", RECRUITER, mistake.followUp!.text, mistake.followUp!.es, "male", { targetSeconds: DEVELOP, cues: ["TODAY I WOULD…", "BECAUSE…"] }),
    // REPAIR — DIDN'T CATCH IT
    repairTurn("a1d7-repair", "catch", "repair-catch-2", "male"),
  ],
  speakerVoice: "male",
  testReady: d7Sprint,
});

/* ---------------------------- DAY 8 — A DIFFICULT PERSON ---------------------------- */

const difficult = bankQuestion("difficult-1");

const d8 = advancedDay({
  day: 8,
  topic: "Tell Me About a Difficult Person",
  topicEs: "Cuéntame sobre una persona difícil",
  focus: "Conflict with emotional control — SITUATION → PROBLEM → RESPONSE → RESULT",
  focusEs: "Conflicto con control emocional — SITUACIÓN → PROBLEMA → RESPUESTA → RESULTADO",
  intro: {
    title: "A DIFFICULT PERSON",
    titleEs: "UNA PERSONA DIFÍCIL",
    lead: "The recruiter is not asking about the other person. They're asking how YOU stay professional when someone isn't.",
    leadEs: "El reclutador no pregunta por la otra persona. Pregunta cómo TÚ te mantienes profesional cuando alguien no lo es.",
    examples: ["I stayed calm and…", "Instead of reacting, I…", "We ended up…"],
    goal: "Tell it in 60–75 seconds, then explain how you kept it professional.",
    goalEs: "Cuéntalo en 60–75 segundos y luego explica cómo lo mantuviste profesional.",
    cta: START,
  },
  lines: [
    l("a1d8-1", "Last year I worked with a coworker | who was always criticizing other people's work.", "El año pasado trabajé con un compañero que siempre criticaba el trabajo de los demás."),
    l("a1d8-2", "One day, in front of the whole team, | he said my report was useless.", "Un día, frente a todo el equipo, dijo que mi reporte era inútil."),
    l("a1d8-3", "Honestly, I was frustrated, | but I didn't answer in that moment.", "Honestamente estaba frustrado/a, pero no respondí en ese momento."),
    l("a1d8-4", "Instead of reacting, | I asked him if we could talk after the meeting.", "En vez de reaccionar, le pregunté si podíamos hablar después de la reunión."),
    l("a1d8-5", "I stayed calm | and I asked him what exactly he thought was missing.", "Me mantuve tranquilo/a y le pregunté qué exactamente creía que faltaba."),
    l("a1d8-6", "It turned out | he had information about the client that I didn't have.", "Resultó que él tenía información sobre el cliente que yo no tenía."),
    l("a1d8-7", "We ended up improving the report together, | and after that he was much more respectful.", "Terminamos mejorando el reporte juntos, y después de eso fue mucho más respetuoso."),
    l("a1d8-8", "What I learned is that | staying professional usually gets better results | than winning the argument.", "Lo que aprendí es que mantenerse profesional normalmente da mejores resultados que ganar la discusión."),
  ],
  rep2Chunks: chunks4("a1d8"),
  prompts: [
    q("a1d8-p1", "Who was the difficult person and what was the situation?", "¿Quién era la persona difícil y cuál era la situación?", "I once worked with…", "Una vez trabajé con…", "SITUATION"),
    q("a1d8-p2", "What exactly was the problem?", "¿Cuál era exactamente el problema?", "The problem was that…", "El problema era que…", "PROBLEM"),
    q("a1d8-p3", "How did you feel, and what did you do instead of reacting?", "¿Cómo te sentiste y qué hiciste en vez de reaccionar?", "I was frustrated, but instead of reacting, I…", "Estaba frustrado/a, pero en vez de reaccionar, yo…", "RESPONSE", "react"),
    q("a1d8-p4", "How did it end?", "¿Cómo terminó?", "We ended up…", "Terminamos…", "RESULT"),
    q("a1d8-p5", "What would you do if that person were a customer, not a coworker?", "¿Qué harías si esa persona fuera un cliente y no un compañero?", "If it were a customer, I would…", "Si fuera un cliente, yo…", "ADAPT", "adapt"),
  ],
  cues: ["SITUATION", "PROBLEM", "RESPONSE", "RESULT"],
  powerChunks: { core: ["Instead of reacting, I…", "I stayed calm and…"], stretch: "We ended up… together." },
  sceneImage: { src: sceneD8, alt: "A call center agent staying calm while a frustrated customer talks on a video call", altEs: "Una agente de call center manteniendo la calma mientras una clienta frustrada habla por videollamada" },
  goalSeconds: [75, 100],
  goalSentences: 8,
  hideModelText: true,
  rep5Prompt: { question: difficult.text, questionEs: difficult.es },
  rep5Tips: {
    en: "SITUATION → PROBLEM → RESPONSE → RESULT. Spend most of your time on YOUR response, not on how bad the other person was.",
    es: "SITUACIÓN → PROBLEMA → RESPUESTA → RESULTADO. Dedica más tiempo a TU respuesta, no a lo mala que era la otra persona.",
  },
  rep5Turns: [
    variantTurn("a1d8-turn1", RECRUITER, "difficult-1", 0, "female", { targetSeconds: SUSTAIN, cues: ["SITUATION", "PROBLEM", "RESPONSE", "RESULT"] }),
    turn("a1d8-turn2", RECRUITER, difficult.followUp!.text, difficult.followUp!.es, "female", { targetSeconds: DEVELOP, cues: ["I stayed calm…", "I asked…", "I focused on…"] }),
    // REPAIR — CONFIRM
    repairTurn("a1d8-repair", "confirm", "repair-confirm-2", "female"),
  ],
  speakerVoice: "female",
});

/* ---------------------------- DAY 9 — HELPING SOMEONE ---------------------------- */

const helped = bankQuestion("helped-1");

const d9Sprint: TestReadySprint = {
  type: "listen-respond",
  title: "LISTEN & RESPOND",
  titleEs: "ESCUCHA Y RESPONDE",
  instruction: "A coworker asks for help. Listen once, then answer each question out loud.",
  instructionEs: "Un compañero pide ayuda. Escucha una vez y responde cada pregunta en voz alta.",
  passage:
    "Hey, sorry to bother you. I have a customer on the line who wants a refund, but the system says the order was already delivered. I've never handled this before and my supervisor is in a meeting. Can you help me? What should I tell him?",
  items: [
    { id: "a1d9-tr1", audio: "What does the coworker need?", text: "What does the coworker need?", textEs: "¿Qué necesita el compañero?", maxSeconds: 15 },
    { id: "a1d9-tr2", audio: "Why can't he ask his supervisor?", text: "Why can't he ask his supervisor?", textEs: "¿Por qué no puede preguntarle a su supervisor?", maxSeconds: 15 },
    { id: "a1d9-tr3", audio: "What would you tell him to say to the customer?", text: "What would you tell him to say to the customer?", textEs: "¿Qué le dirías que le diga al cliente?", maxSeconds: 30 },
  ],
};

const d9 = advancedDay({
  day: 9,
  topic: "Tell Me About a Time You Helped Someone",
  topicEs: "Cuéntame sobre una vez que ayudaste a alguien",
  focus: "Customer-oriented thinking — NEED → ACTION → RESULT → WHY IT MATTERED",
  focusEs: "Pensamiento orientado al cliente — NECESIDAD → ACCIÓN → RESULTADO → POR QUÉ IMPORTÓ",
  intro: {
    title: "A TIME YOU HELPED SOMEONE",
    titleEs: "UNA VEZ QUE AYUDASTE A ALGUIEN",
    lead: "Customer, coworker, neighbor — it doesn't matter. Show that you notice what people need and that you act.",
    leadEs: "Cliente, compañero, vecino — no importa. Muestra que notas lo que la gente necesita y que actúas.",
    examples: ["I noticed that…", "So I offered to…", "It mattered because…"],
    goal: "60–75 seconds, then explain why your response mattered.",
    goalEs: "60–75 segundos y luego explica por qué importó tu respuesta.",
    cta: START,
  },
  lines: [
    l("a1d9-1", "A few weeks after I started my job, | a new coworker joined the team.", "Unas semanas después de empezar mi trabajo, un compañero nuevo se unió al equipo."),
    l("a1d9-2", "I noticed that she was struggling with the system | and she was too nervous to ask for help.", "Noté que ella tenía problemas con el sistema y estaba demasiado nerviosa para pedir ayuda."),
    l("a1d9-3", "I remembered how I felt on my first week, | so I offered to sit with her during lunch.", "Recordé cómo me sentí en mi primera semana, así que me ofrecí a sentarme con ella en el almuerzo."),
    l("a1d9-4", "I showed her the three things that had confused me the most, | step by step.", "Le mostré las tres cosas que más me habían confundido a mí, paso a paso."),
    l("a1d9-5", "It only took about twenty minutes, | but it made a big difference for her.", "Solo tomó unos veinte minutos, pero hizo una gran diferencia para ella."),
    l("a1d9-6", "By the end of the week, | she was handling calls on her own.", "Para el final de la semana, ella ya atendía llamadas sola."),
    l("a1d9-7", "It mattered because | a small amount of my time saved her a lot of stress, | and the team got faster.", "Importó porque un poco de mi tiempo le ahorró mucho estrés, y el equipo se volvió más rápido."),
    l("a1d9-8", "For me, helping isn't extra work — | it's part of doing the job well.", "Para mí, ayudar no es trabajo extra — es parte de hacer bien el trabajo."),
  ],
  rep2Chunks: chunks4("a1d9"),
  prompts: [
    q("a1d9-p1", "Who needed help, and what did you notice?", "¿Quién necesitaba ayuda y qué notaste?", "I noticed that…", "Noté que…", "NEED"),
    q("a1d9-p2", "What did you do?", "¿Qué hiciste?", "So I offered to…", "Así que me ofrecí a…", "ACTION", "explain"),
    q("a1d9-p3", "What was the result for that person?", "¿Cuál fue el resultado para esa persona?", "By the end…", "Al final…", "RESULT"),
    q("a1d9-p4", "Why did it matter?", "¿Por qué importó?", "It mattered because…", "Importó porque…", "WHY", "justify"),
    q("a1d9-p5", "A customer calls with a problem that isn't your department. What do you do?", "Un cliente llama con un problema que no es de tu departamento. ¿Qué haces?", "Even if it's not my department, I would…", "Aunque no sea mi departamento, yo…", "CUSTOMER", "react"),
  ],
  cues: ["NEED", "ACTION", "RESULT", "WHY IT MATTERED"],
  powerChunks: { core: ["I noticed that…", "It mattered because…"], stretch: "It made a big difference for…" },
  sceneImage: { src: sceneD9, alt: "A man patiently helping a new coworker at her computer", altEs: "Un hombre ayudando con paciencia a una compañera nueva en su computadora" },
  goalSeconds: [75, 100],
  goalSentences: 8,
  hideModelText: true,
  rep5Prompt: { question: helped.text, questionEs: helped.es },
  rep5Tips: {
    en: "NEED → ACTION → RESULT → WHY IT MATTERED. The last step is what makes you sound like someone who cares about customers.",
    es: "NECESIDAD → ACCIÓN → RESULTADO → POR QUÉ IMPORTÓ. El último paso es lo que te hace sonar como alguien a quien le importan los clientes.",
  },
  rep5Turns: [
    variantTurn("a1d9-turn1", RECRUITER, "helped-1", 0, "male", { targetSeconds: SUSTAIN, cues: ["NEED", "ACTION", "RESULT", "WHY"] }),
    turn("a1d9-turn2", RECRUITER, helped.followUp!.text, helped.followUp!.es, "male", { targetSeconds: DEVELOP, cues: ["FOR THAT PERSON…", "FOR THE TEAM…"] }),
    // REPAIR — RESTART
    repairTurn("a1d9-repair", "restart", "repair-restart-2", "male"),
  ],
  speakerVoice: "male",
  testReady: d9Sprint,
});

/* ---------------------------- DAY 10 — BEHAVIORAL INTERVIEW ROUND ---------------------------- */

const b1 = bankQuestion("challenge-1");
const b2 = bankQuestion("mistake-1");
const b3 = bankQuestion("helped-1");
const b4 = bankQuestion("pressure-1");
const W2_RECOGNITION: RecognitionFrameworkId[] = ["story", "evidence", "weakness", "service"];
const fuNext = bankQuestion("fu-next");
const fuLearn = bankQuestion("fu-learn");

const d10Sprint: TestReadySprint = {
  type: "mixed",
  title: "MIXED SPRINT — EXTRA PRACTICE",
  titleEs: "MIXED SPRINT — PRÁCTICA EXTRA",
  instruction: "Optional extra practice. Five quick, different drills. No score.",
  instructionEs: "Práctica extra opcional. Cinco ejercicios rápidos y diferentes. Sin calificación.",
  items: [
    { id: "a1d10-tr1", kind: "repeat", audio: "Instead of waiting for instructions, I made a list of everything that was still pending.", maxSeconds: 12 },
    { id: "a1d10-tr2", kind: "quick-answers", audio: "What did you learn from your last mistake?", text: "What did you learn from your last mistake?", textEs: "¿Qué aprendiste de tu último error?", maxSeconds: 20 },
    { id: "a1d10-tr3", kind: "build-sentence", chunks: ["WHAT I LEARNED", "IS THAT", "STAYING CALM", "GETS BETTER RESULTS"], maxSeconds: 12 },
    { id: "a1d10-tr4", kind: "listen-respond", audio: "Can you cover my shift on Saturday? I know it's last minute, but my kid is sick.", text: "Respond to your coworker.", textEs: "Responde a tu compañero.", chunks: ["UNDERSTAND", "WHAT I CAN DO"], maxSeconds: 25 },
    { id: "a1d10-tr5", kind: "speak-now", text: "Tell me about a time you worked under pressure.", textEs: "Cuéntame sobre una vez que trabajaste bajo presión.", chunks: ["SITUATION", "ACTION", "RESULT"], thinkSeconds: 5, maxSeconds: 45 },
  ],
};

const d10 = advancedDay({
  day: 10,
  topic: "Behavioral Interview Round",
  topicEs: "Ronda de entrevista conductual",
  focus: "Week 2 challenge — four behavioral stories with hidden follow-ups · evidence, not claims",
  focusEs: "Reto de la Semana 2 — cuatro historias conductuales con repreguntas ocultas · evidencia, no afirmaciones",
  intro: {
    title: "BEHAVIORAL INTERVIEW ROUND",
    titleEs: "RONDA DE ENTREVISTA CONDUCTUAL",
    lead: "Four Rounds. Each question asks for a real story, and each story gets a follow-up you won't see until you answer. Evidence, not claims.",
    leadEs: "Cuatro Rounds. Cada pregunta pide una historia real, y cada historia recibe una repregunta que no verás hasta responder. Evidencia, no afirmaciones.",
    examples: ["SITUATION → ACTION → RESULT → LESSON", "What I did was…", "As a result…"],
    goal: "About 5 minutes of speaking across all Rounds.",
    goalEs: "Unos 5 minutos hablando en total.",
    cta: START,
  },
  lines: [
    l("a1d10-1", "When the recruiter asks for a story, | I start with the situation in one or two sentences.", "Cuando el reclutador pide una historia, empiezo con la situación en una o dos oraciones."),
    l("a1d10-2", "Then I move quickly to what I did, | because that's the part they really care about.", "Luego paso rápido a lo que hice, porque esa es la parte que realmente les importa."),
    l("a1d10-3", "For example, when we were short on people, | I organized the pending tasks and took the hardest ones.", "Por ejemplo, cuando nos faltaba gente, organicé las tareas pendientes y tomé las más difíciles."),
    l("a1d10-4", "When I made a mistake with an email, | I reported it immediately and called the client myself.", "Cuando cometí un error con un correo, lo reporté de inmediato y llamé al cliente yo mismo/a."),
    l("a1d10-5", "If they ask what happened next, | I give the result with a real detail: | we delivered one day late and kept the client.", "Si preguntan qué pasó después, doy el resultado con un detalle real: entregamos un día tarde y conservamos al cliente."),
    l("a1d10-6", "If they ask what I learned, | I connect it to the job: | organizing first, being careful, staying calm.", "Si preguntan qué aprendí, lo conecto con el trabajo: organizarme primero, ser cuidadoso/a, mantener la calma."),
    l("a1d10-7", "I don't need a perfect story — | I need a clear one.", "No necesito una historia perfecta — necesito una clara."),
    l("a1d10-8", "And when I don't remember a detail, | I say so and keep going.", "Y cuando no recuerdo un detalle, lo digo y sigo adelante."),
  ],
  rep2Chunks: chunks4("a1d10"),
  prompts: [
    q("a1d10-p1", "In one sentence: what is a challenge you handled well?", "En una oración: ¿qué reto manejaste bien?", "One challenge I handled was…", "Un reto que manejé fue…", "CHALLENGE"),
    q("a1d10-p2", "In one sentence: what is a mistake you learned from?", "En una oración: ¿de qué error aprendiste?", "One mistake I learned from was…", "Un error del que aprendí fue…", "MISTAKE"),
    q("a1d10-p3", "Give me the RESULT of one of those stories with a real number or detail.", "Dame el RESULTADO de una de esas historias con un número o detalle real.", "As a result…", "Como resultado…", "RESULT", "justify"),
    q("a1d10-p4", "What is something you did under pressure last month?", "¿Qué hiciste bajo presión el mes pasado?", "Last month, I had to…", "El mes pasado tuve que…", "PRESSURE"),
    q("a1d10-p5", "Quick: what do these stories say about you as an employee?", "Rápido: ¿qué dicen estas historias de ti como empleado/a?", "I think they show that I…", "Creo que muestran que yo…", "CLOSE", "defend"),
  ],
  cues: ["CHALLENGE", "MISTAKE", "HELPING", "PRESSURE"],
  powerChunks: { core: ["What I did was…", "As a result…"], stretch: "I don't remember exactly, but…" },
  sceneImage: { src: sceneD10, alt: "A candidate answering a panel of two recruiters in a glass meeting room", altEs: "Una candidata respondiendo a un panel de dos reclutadores en una sala de vidrio" },
  goalSeconds: [240, 330],
  goalSentences: 8,
  hideModelText: true,
  rep5Prompt: { question: "Behavioral Interview Round — 4 Rounds.", questionEs: "Ronda de entrevista conductual — 4 Rounds." },
  rep5Tips: {
    en: "Each follow-up appears only after you record your story. Answer the follow-up with a NEW detail, not a repeat.",
    es: "Cada repregunta aparece solo después de grabar tu historia. Responde la repregunta con un detalle NUEVO, no repitiendo.",
  },
  rep5Turns: [
    turn("a1d10-turn1", RECRUITER, b1.text, b1.es, "female", { round: { n: 1, title: "A CHALLENGE", titleEs: "UN RETO" }, targetSeconds: SUSTAIN, cues: ["SITUATION", "ACTION", "RESULT"] }),
    turn("a1d10-turn2", RECRUITER, b1.followUp!.text, b1.followUp!.es, "female", { targetSeconds: QUICK, cues: ["I…"] }),
    turn("a1d10-turn3", RECRUITER, b2.text, b2.es, "female", { round: { n: 2, title: "A MISTAKE", titleEs: "UN ERROR" }, targetSeconds: [45, 60], cues: ["MISTAKE", "ACTION", "LESSON"] }),
    turn("a1d10-turn4", RECRUITER, fuNext.text, fuNext.es, "female", { targetSeconds: QUICK, cues: ["RESULT"] }),
    turn("a1d10-turn5", RECRUITER, b3.text, b3.es, "female", { round: { n: 3, title: "HELPING SOMEONE", titleEs: "AYUDAR A ALGUIEN" }, targetSeconds: [45, 60], cues: ["NEED", "ACTION", "WHY"] }),
    turn("a1d10-turn6", RECRUITER, b4.text, b4.es, "female", { round: { n: 4, title: "UNDER PRESSURE", titleEs: "BAJO PRESIÓN" }, targetSeconds: [45, 60], cues: ["SITUATION", "ACTION", "RESULT"] }),
    turn("a1d10-turn7", RECRUITER, fuLearn.text, fuLearn.es, "female", { targetSeconds: QUICK, cues: ["LESSON → THIS JOB"] }),
    // REPAIR — REPAIR UNDER PRESSURE
    // ROUND 5 — RECOGNIZE THE QUESTION
    recognitionTurn("a1d10-rec1", RECRUITER, "difficult-1", 1, "female", W2_RECOGNITION, "story", { round: { n: 5, ...RECOGNITION_ROUND } }),
    recognitionTurn("a1d10-rec2", RECRUITER, "hire-2", 1, "female", W2_RECOGNITION, "evidence"),
    recognitionTurn("a1d10-rec3", RECRUITER, "weak-2", 0, "female", W2_RECOGNITION, "weakness"),
    recognitionTurn("a1d10-rec4", CUSTOMER, "cs-tour-1", 1, "male", W2_RECOGNITION, "service"),
    repairTurn("a1d10-repair", "mixed", "repair-mixed-2", "female", {
      round: { n: 6, title: "REPAIR UNDER PRESSURE", titleEs: "REPARA BAJO PRESIÓN" },
    }),
  ],
  speakerVoice: "female",
  testReady: d10Sprint,
  testReadyOptional: true,
});

/* ====================================================================== */
/* WEEK 3 — ANSWER THE HARD QUESTIONS                                       */
/* ====================================================================== */

/* ---------------------------- DAY 11 — WHY DID YOU LEAVE? ---------------------------- */

const leave = bankQuestion("leave-1");

const d11 = advancedDay({
  day: 11,
  topic: "Why Did You Leave?",
  topicEs: "¿Por qué te fuiste?",
  focus: "FACT → POSITIVE FRAME → WHAT I WANT NEXT · never attack a former employer",
  focusEs: "HECHO → ENFOQUE POSITIVO → LO QUE QUIERO AHORA · nunca ataques a un empleador anterior",
  intro: {
    title: "WHY DID YOU LEAVE?",
    titleEs: "¿POR QUÉ TE FUISTE?",
    lead: "Already left, want to leave, or never had a formal job — the same structure works. State the fact, frame it positively, say what you want next. No complaining.",
    leadEs: "Ya te fuiste, quieres irte o nunca tuviste un trabajo formal — la misma estructura sirve. Di el hecho, enfócalo en positivo, di qué quieres ahora. Sin quejas.",
    examples: ["I left because…", "I'm grateful for…, but…", "What I'm looking for now is…"],
    goal: "60–75 seconds, then describe what you want in your next job.",
    goalEs: "60–75 segundos y luego describe qué quieres en tu próximo trabajo.",
    cta: START,
  },
  lines: [
    l("a1d11-1", "I left my last job about three months ago | because there was no room to grow.", "Dejé mi último trabajo hace unos tres meses porque no había espacio para crecer."),
    l("a1d11-2", "I had been doing the same tasks for two years, | and I had already learned everything I could there.", "Llevaba dos años haciendo las mismas tareas y ya había aprendido todo lo que podía ahí."),
    l("a1d11-3", "I'm grateful for that experience, | because it taught me how to work with customers every day.", "Estoy agradecido/a por esa experiencia, porque me enseñó a trabajar con clientes todos los días."),
    l("a1d11-4", "My supervisor and I had a good relationship, | and I left on good terms.", "Mi supervisor y yo teníamos buena relación, y me fui en buenos términos."),
    l("a1d11-5", "I didn't want to leave without a plan, | so I started improving my English seriously.", "No quería irme sin un plan, así que empecé a mejorar mi inglés en serio."),
    l("a1d11-6", "What I'm looking for now is | a place where I can use English every day | and take on more responsibility.", "Lo que busco ahora es un lugar donde pueda usar el inglés todos los días y asumir más responsabilidad."),
    l("a1d11-7", "I want to be somewhere | where good work leads to new opportunities.", "Quiero estar en un lugar donde el buen trabajo lleve a nuevas oportunidades."),
    l("a1d11-8", "That's why this position | caught my attention.", "Por eso esta posición llamó mi atención."),
  ],
  rep2Chunks: chunks4("a1d11"),
  prompts: [
    q("a1d11-p1", "State the fact: did you leave, do you want to leave, or is this your first formal job?", "Di el hecho: ¿te fuiste, quieres irte o este es tu primer trabajo formal?", "I left because… / I'm still there, but… / This would be my first…", "Me fui porque… / Sigo ahí, pero… / Este sería mi primer…", "FACT"),
    q("a1d11-p2", "What is one positive thing you take from that experience (or from your studies)?", "¿Qué cosa positiva te llevas de esa experiencia (o de tus estudios)?", "I'm grateful for…", "Estoy agradecido/a por…", "POSITIVE", "justify"),
    q("a1d11-p3", "What do you want next?", "¿Qué quieres ahora?", "What I'm looking for now is…", "Lo que busco ahora es…", "NEXT"),
    q("a1d11-p4", "Say the reason you left WITHOUT saying anything negative about anyone.", "Di la razón por la que te fuiste SIN decir nada negativo de nadie.", "It was a good place to start, and now I…", "Fue un buen lugar para empezar, y ahora yo…", "REFRAME", "adapt"),
    q("a1d11-p5", "Why is this job the right next step?", "¿Por qué este trabajo es el siguiente paso correcto?", "This is the right next step because…", "Este es el siguiente paso correcto porque…", "FIT", "defend"),
  ],
  cues: ["FACT", "POSITIVE FRAME", "WHAT I WANT NEXT"],
  powerChunks: { core: ["I'm grateful for…", "What I'm looking for now is…"], stretch: "I left on good terms." },
  sceneImage: { src: sceneD11, alt: "A woman packing her desk into a box, looking hopefully toward the window", altEs: "Una mujer empacando su escritorio en una caja, mirando con esperanza hacia la ventana" },
  goalSeconds: [75, 100],
  goalSentences: 8,
  hideModelText: true,
  rep5Prompt: { question: leave.text, questionEs: leave.es },
  rep5Tips: {
    en: "FACT → POSITIVE FRAME → WHAT I WANT NEXT. If you feel a complaint coming, replace it with what you want instead.",
    es: "HECHO → ENFOQUE POSITIVO → LO QUE QUIERO AHORA. Si sientes que viene una queja, reemplázala con lo que quieres en su lugar.",
  },
  rep5Turns: [
    variantTurn("a1d11-turn1", RECRUITER, "leave-1", 0, "male", { targetSeconds: SUSTAIN, cues: ["FACT", "POSITIVE", "NEXT"] }),
    turn("a1d11-turn2", RECRUITER, leave.followUp!.text, leave.followUp!.es, "male", { targetSeconds: DEVELOP }),
    // REPAIR — NEEDS TIME
    repairTurn("a1d11-repair", "time", "repair-time-3", "male"),
  ],
  speakerVoice: "male",
});

/* ---------------------------- DAY 12 — A FAILURE ---------------------------- */

const failure = bankQuestion("failure-1");

const d12Sprint: TestReadySprint = {
  type: "quick-answers",
  title: "QUICK ANSWERS",
  titleEs: "RESPUESTAS RÁPIDAS",
  instruction: "Five recruiter questions at natural speed. Answer each one in 1–2 sentences. No time to think.",
  instructionEs: "Cinco preguntas de reclutador a velocidad natural. Responde cada una en 1–2 oraciones. Sin tiempo para pensar.",
  items: [
    { id: "a1d12-tr1", audio: "What's one thing you failed at last year?", text: "What's one thing you failed at last year?", textEs: "¿En qué fallaste el año pasado?", maxSeconds: 20 },
    { id: "a1d12-tr2", audio: "Whose fault was it?", text: "Whose fault was it?", textEs: "¿De quién fue la culpa?", maxSeconds: 15 },
    { id: "a1d12-tr3", audio: "What did you change after that?", text: "What did you change after that?", textEs: "¿Qué cambiaste después de eso?", maxSeconds: 20 },
    { id: "a1d12-tr4", audio: "How do you handle criticism?", text: "How do you handle criticism?", textEs: "¿Cómo manejas las críticas?", maxSeconds: 20 },
    { id: "a1d12-tr5", audio: "Why should I trust you with important tasks?", text: "Why should I trust you with important tasks?", textEs: "¿Por qué debería confiarte tareas importantes?", maxSeconds: 20 },
  ],
};

const d12 = advancedDay({
  day: 12,
  topic: "Tell Me About a Failure",
  topicEs: "Cuéntame sobre un fracaso",
  focus: "FAILURE → RESPONSIBILITY → CHANGE → RESULT · defend the lesson with evidence",
  focusEs: "FRACASO → RESPONSABILIDAD → CAMBIO → RESULTADO · defiende la lección con evidencia",
  intro: {
    title: "A FAILURE",
    titleEs: "UN FRACASO",
    lead: "Bigger than a mistake. Something that didn't work. The recruiter wants to see what you CHANGED — and will challenge you to prove it.",
    leadEs: "Más grande que un error. Algo que no funcionó. El reclutador quiere ver qué CAMBIASTE — y te retará a probarlo.",
    examples: ["I failed at…", "I realized that…", "The proof is that…"],
    goal: "60–75 seconds, then defend your lesson when the recruiter doubts you.",
    goalEs: "60–75 segundos y luego defiende tu lección cuando el reclutador dude de ti.",
    cta: START,
  },
  lines: [
    l("a1d12-1", "Two years ago, | I failed an important English certification exam.", "Hace dos años reprobé un examen importante de certificación de inglés."),
    l("a1d12-2", "I had studied grammar for months, | but when I had to speak, I froze.", "Había estudiado gramática por meses, pero cuando tuve que hablar, me quedé en blanco."),
    l("a1d12-3", "It was my responsibility — | I had been studying the wrong way.", "Fue mi responsabilidad — había estado estudiando de la forma equivocada."),
    l("a1d12-4", "I realized that | I knew the rules, | but I had almost never practiced speaking out loud.", "Me di cuenta de que sabía las reglas, pero casi nunca había practicado hablar en voz alta."),
    l("a1d12-5", "So I changed everything: | I started speaking every single day, | even if it was only for ten minutes.", "Así que cambié todo: empecé a hablar todos los días, aunque fuera solo por diez minutos."),
    l("a1d12-6", "I recorded myself, | listened back, | and fixed one thing at a time.", "Me grababa, me escuchaba y corregía una cosa a la vez."),
    l("a1d12-7", "Six months later, | I passed the exam, | and today I can hold this interview in English.", "Seis meses después aprobé el examen, y hoy puedo tener esta entrevista en inglés."),
    l("a1d12-8", "The proof that I learned the lesson | is that I'm still practicing every day.", "La prueba de que aprendí la lección es que sigo practicando todos los días."),
  ],
  rep2Chunks: chunks4("a1d12"),
  prompts: [
    q("a1d12-p1", "What did you fail at? Say it in one sentence.", "¿En qué fallaste? Dilo en una oración.", "I failed at…", "Fallé en…", "FAILURE"),
    q("a1d12-p2", "What was your part in it?", "¿Cuál fue tu parte en eso?", "It was my responsibility because…", "Fue mi responsabilidad porque…", "RESPONSIBILITY", "justify"),
    q("a1d12-p3", "What did you change after that?", "¿Qué cambiaste después de eso?", "So I changed… I started…", "Así que cambié… Empecé a…", "CHANGE", "explain"),
    q("a1d12-p4", "What is the evidence that the change worked?", "¿Cuál es la evidencia de que el cambio funcionó?", "The proof is that…", "La prueba es que…", "EVIDENCE", "defend"),
    q("a1d12-p5", "If the recruiter says 'Everyone says that' — what do you add?", "Si el reclutador dice 'Todos dicen eso' — ¿qué agregas?", "I understand. The difference is that…", "Entiendo. La diferencia es que…", "PUSH BACK", "defend"),
  ],
  cues: ["FAILURE", "RESPONSIBILITY", "CHANGE", "RESULT"],
  powerChunks: { core: ["I realized that…", "The proof is that…"], stretch: "So I changed everything:" },
  sceneImage: { src: sceneD12, alt: "A man reviewing a failed results chart while writing a new plan in a notebook", altEs: "Un hombre revisando una gráfica de malos resultados mientras escribe un nuevo plan en un cuaderno" },
  goalSeconds: [75, 100],
  goalSentences: 8,
  hideModelText: true,
  rep5Prompt: { question: failure.text, questionEs: failure.es },
  rep5Tips: {
    en: "FAILURE → RESPONSIBILITY → CHANGE → RESULT. When challenged, don't apologize again — give EVIDENCE.",
    es: "FRACASO → RESPONSABILIDAD → CAMBIO → RESULTADO. Cuando te reten, no te disculpes otra vez — da EVIDENCIA.",
  },
  rep5Turns: [
    variantTurn("a1d12-turn1", RECRUITER, "failure-1", 0, "female", { targetSeconds: SUSTAIN, cues: ["FAILURE", "CHANGE", "RESULT"] }),
    turn("a1d12-turn2", RECRUITER, failure.followUp!.text, failure.followUp!.es, "female", { targetSeconds: DEVELOP, cues: ["EVIDENCE"] }),
    // REPAIR — DIDN'T CATCH IT
    repairTurn("a1d12-repair", "catch", "repair-catch-3", "female"),
  ],
  speakerVoice: "female",
  testReady: d12Sprint,
});

/* ---------------------------- DAY 13 — WHY DO YOU WANT TO WORK HERE? ---------------------------- */

const whyHere = bankQuestion("why-here-1");

const d13 = advancedDay({
  day: 13,
  topic: "Why Do You Want to Work Here?",
  topicEs: "¿Por qué quieres trabajar aquí?",
  focus: "COMPANY → MATCH → VALUE → FUTURE · fit and value, not 'I need a job'",
  focusEs: "EMPRESA → ENCAJE → VALOR → FUTURO · encaje y valor, no 'necesito un trabajo'",
  intro: {
    title: "WHY HERE?",
    titleEs: "¿POR QUÉ AQUÍ?",
    lead: "'I need a job' and 'I like your company' are not answers. Show one specific thing you know about them, how you match it, and what you add.",
    leadEs: "'Necesito un trabajo' y 'me gusta su empresa' no son respuestas. Muestra algo específico que sabes de ellos, cómo encajas y qué aportas.",
    examples: ["What caught my attention is…", "That matches my experience because…", "What I can bring is…"],
    goal: "60–75 seconds, then explain what you bring to the team.",
    goalEs: "60–75 segundos y luego explica qué aportas al equipo.",
    cta: START,
  },
  lines: [
    l("a1d13-1", "What caught my attention about this company | is that you work with customers from different countries.", "Lo que me llamó la atención de esta empresa es que trabajan con clientes de diferentes países."),
    l("a1d13-2", "I read that your team handles support in English and Spanish, | and that's exactly the kind of work I want.", "Leí que su equipo da soporte en inglés y español, y ese es exactamente el tipo de trabajo que quiero."),
    l("a1d13-3", "That matches my experience | because I've spent the last two years helping people solve problems, | often in a second language.", "Eso encaja con mi experiencia porque he pasado los últimos dos años ayudando a la gente a resolver problemas, muchas veces en un segundo idioma."),
    l("a1d13-4", "I also noticed that you promote people from inside the company, | and that matters to me.", "También noté que promueven a gente de dentro de la empresa, y eso es importante para mí."),
    l("a1d13-5", "What I can bring is | patience with difficult customers | and a real habit of learning fast.", "Lo que puedo aportar es paciencia con clientes difíciles y un hábito real de aprender rápido."),
    l("a1d13-6", "For example, in my last job | I was usually the person who trained new coworkers on the system.", "Por ejemplo, en mi último trabajo normalmente yo era quien entrenaba a los compañeros nuevos en el sistema."),
    l("a1d13-7", "In the future, | I'd like to grow into a role where I support the team, | not only the customers.", "En el futuro me gustaría crecer hacia un rol donde apoye al equipo, no solo a los clientes."),
    l("a1d13-8", "So for me this isn't just a job — | it's the right place to build that.", "Así que para mí esto no es solo un trabajo — es el lugar correcto para construir eso."),
  ],
  rep2Chunks: chunks4("a1d13"),
  prompts: [
    q("a1d13-p1", "Name one specific thing you know (or would find out) about a company you want to work for.", "Di algo específico que sabes (o averiguarías) de una empresa donde quieres trabajar.", "What caught my attention is…", "Lo que me llamó la atención es…", "COMPANY"),
    q("a1d13-p2", "How does that match your experience or personality?", "¿Cómo encaja eso con tu experiencia o personalidad?", "That matches my experience because…", "Eso encaja con mi experiencia porque…", "MATCH", "justify"),
    q("a1d13-p3", "What do you add? One strength + one example.", "¿Qué aportas? Una fortaleza + un ejemplo.", "What I can bring is… For example…", "Lo que puedo aportar es… Por ejemplo…", "VALUE", "explain"),
    q("a1d13-p4", "Where do you want this job to take you?", "¿A dónde quieres que te lleve este trabajo?", "In the future, I'd like to…", "En el futuro, me gustaría…", "FUTURE"),
    q("a1d13-p5", "Now say the whole thing in 30 seconds without 'I need a job'.", "Ahora di todo en 30 segundos sin 'necesito un trabajo'.", "What caught my attention is… and what I can bring is…", "Lo que me llamó la atención es… y lo que puedo aportar es…", "ALL FOUR", "adapt"),
  ],
  cues: ["COMPANY", "MATCH", "VALUE", "FUTURE"],
  powerChunks: { core: ["What caught my attention is…", "What I can bring is…"], stretch: "That matches my experience because…" },
  sceneImage: { src: sceneD13, alt: "A woman researching a company on her laptop the night before an interview", altEs: "Una mujer investigando una empresa en su laptop la noche antes de una entrevista" },
  goalSeconds: [75, 100],
  goalSentences: 8,
  hideModelText: true,
  rep5Prompt: { question: whyHere.text, questionEs: whyHere.es },
  rep5Tips: {
    en: "COMPANY → MATCH → VALUE → FUTURE. Invent a realistic company if you need to — the structure is what you're training.",
    es: "EMPRESA → ENCAJE → VALOR → FUTURO. Inventa una empresa realista si lo necesitas — lo que entrenas es la estructura.",
  },
  rep5Turns: [
    variantTurn("a1d13-turn1", RECRUITER, "why-here-1", 0, "male", { targetSeconds: SUSTAIN, cues: ["COMPANY", "MATCH", "VALUE", "FUTURE"] }),
    turn("a1d13-turn2", RECRUITER, whyHere.followUp!.text, whyHere.followUp!.es, "male", { targetSeconds: DEVELOP }),
    // REPAIR — CONFIRM
    repairTurn("a1d13-repair", "confirm", "repair-confirm-3", "male"),
  ],
  speakerVoice: "male",
});

/* ---------------------------- DAY 14 — SALARY, SCHEDULE & DIFFICULT CONDITIONS ---------------------------- */

const cWeek = bankQuestion("cond-weekends");
const cSalary = bankQuestion("cond-salary");
const cSched = bankQuestion("cond-schedule");
const cPress = bankQuestion("cond-pressure");

const d14Sprint: TestReadySprint = {
  type: "listen-respond",
  title: "LISTEN & RESPOND",
  titleEs: "ESCUCHA Y RESPONDE",
  instruction: "A recruiter explains the conditions of the job. Listen once, then answer.",
  instructionEs: "Un reclutador explica las condiciones del trabajo. Escucha una vez y responde.",
  passage:
    "Before we continue, let me be clear about the position. The schedule rotates every two weeks, so some weeks you'd start at six in the morning and others at two in the afternoon. We also need everyone to work two Saturdays a month. The base salary is at the market rate, with a bonus based on customer satisfaction. Is that something you can commit to?",
  items: [
    { id: "a1d14-tr1", audio: "How often does the schedule change?", text: "How often does the schedule change?", textEs: "¿Cada cuánto cambia el horario?", maxSeconds: 15 },
    { id: "a1d14-tr2", audio: "What does the recruiter say about Saturdays and the bonus?", text: "What does the recruiter say about Saturdays and the bonus?", textEs: "¿Qué dice el reclutador sobre los sábados y el bono?", maxSeconds: 20 },
    { id: "a1d14-tr3", audio: "Answer the recruiter's question honestly and professionally.", text: "Answer the recruiter's question honestly and professionally.", textEs: "Responde la pregunta del reclutador con honestidad y profesionalismo.", maxSeconds: 40 },
  ],
};

const d14 = advancedDay({
  day: 14,
  topic: "Salary, Schedule & Difficult Conditions",
  topicEs: "Salario, horario y condiciones difíciles",
  focus: "Calm professional disagreement — 'I understand… However… What I can do is…'",
  focusEs: "Desacuerdo profesional y tranquilo — 'I understand… However… What I can do is…'",
  intro: {
    title: "SALARY, SCHEDULE & CONDITIONS",
    titleEs: "SALARIO, HORARIO Y CONDICIONES",
    lead: "Real recruiters ask about weekends, money and pressure. You don't need one memorized answer — you need one calm structure to say yes, no, or 'partly' professionally.",
    leadEs: "Los reclutadores reales preguntan por fines de semana, dinero y presión. No necesitas una respuesta memorizada — necesitas una estructura tranquila para decir sí, no o 'en parte' con profesionalismo.",
    examples: ["I understand that…", "However…", "What I can do is…"],
    goal: "Four quick recruiter questions, 20–40 seconds each.",
    goalEs: "Cuatro preguntas rápidas del reclutador, 20–40 segundos cada una.",
    cta: START,
  },
  lines: [
    l("a1d14-1", "I understand that weekends are part of this job, | and I'm open to working some of them.", "Entiendo que los fines de semana son parte de este trabajo, y estoy abierto/a a trabajar algunos."),
    l("a1d14-2", "However, I'd like to know the schedule in advance | so I can organize my responsibilities at home.", "Sin embargo, me gustaría conocer el horario con anticipación para organizar mis responsabilidades en casa."),
    l("a1d14-3", "About salary, | I've researched the market rate for this position.", "Sobre el salario, investigué el rango de mercado para esta posición."),
    l("a1d14-4", "I'm looking for something in that range, | but I'm flexible depending on the benefits and the growth opportunities.", "Busco algo en ese rango, pero soy flexible dependiendo de los beneficios y las oportunidades de crecimiento."),
    l("a1d14-5", "If my schedule changed, | I would first check how it affects my commitments | and then talk to my supervisor honestly.", "Si mi horario cambiara, primero revisaría cómo afecta mis compromisos y luego hablaría con mi supervisor con honestidad."),
    l("a1d14-6", "What I can do is | adapt with a little notice — | what I can't do is disappear from my family without warning.", "Lo que puedo hacer es adaptarme con un poco de aviso — lo que no puedo hacer es desaparecer de mi familia sin previo aviso."),
    l("a1d14-7", "As for pressure, | I've worked in busy environments before, | and I stay calmer when I organize my priorities.", "En cuanto a la presión, ya he trabajado en ambientes intensos, y me mantengo más tranquilo/a cuando organizo mis prioridades."),
    l("a1d14-8", "So yes, I can work under pressure — | and I know what I need to do it well.", "Así que sí, puedo trabajar bajo presión — y sé qué necesito para hacerlo bien."),
  ],
  rep2Chunks: chunks4("a1d14"),
  prompts: [
    q("a1d14-p1", "Are you willing to work weekends? Answer honestly with a condition.", "¿Estás dispuesto/a a trabajar fines de semana? Responde con honestidad y una condición.", "I understand that… However… What I can do is…", "Entiendo que… Sin embargo… Lo que puedo hacer es…", "WEEKENDS", "react"),
    q("a1d14-p2", "What salary are you expecting? Give a range, not one number.", "¿Qué salario esperas? Da un rango, no un solo número.", "I'm looking for something between… depending on…", "Busco algo entre… dependiendo de…", "SALARY"),
    q("a1d14-p3", "Your schedule changes next month. What do you say?", "Tu horario cambia el próximo mes. ¿Qué dices?", "I would first… and then…", "Primero… y luego…", "SCHEDULE", "adapt"),
    q("a1d14-p4", "Can you work under pressure? Prove it in two sentences.", "¿Puedes trabajar bajo presión? Pruébalo en dos oraciones.", "Yes. For example…", "Sí. Por ejemplo…", "PRESSURE", "defend"),
    q("a1d14-p5", "Say NO to something professionally (night shifts, relocation, unpaid overtime…).", "Di NO a algo con profesionalismo (turnos nocturnos, mudarte, horas extra sin pago…).", "I understand… However, that's not something I can… What I can do is…", "Entiendo… Sin embargo, eso no es algo que pueda… Lo que puedo hacer es…", "SAY NO", "defend"),
  ],
  cues: ["I UNDERSTAND", "HOWEVER", "WHAT I CAN DO IS"],
  powerChunks: { core: ["I understand that…", "What I can do is…"], stretch: "However, I'd like to…" },
  sceneImage: { src: sceneD14, alt: "A candidate calmly discussing a schedule with a recruiter, a calendar between them", altEs: "Un candidato conversando con calma sobre un horario con un reclutador, con un calendario entre ellos" },
  goalSeconds: [90, 150],
  goalSentences: 8,
  hideModelText: true,
  rep5Prompt: { question: "Conditions Round — 4 quick recruiter questions.", questionEs: "Ronda de condiciones — 4 preguntas rápidas del reclutador." },
  rep5Tips: {
    en: "One structure for all four: I understand… However… What I can do is… Yes, no or partly — always calm.",
    es: "Una estructura para las cuatro: I understand… However… What I can do is… Sí, no o en parte — siempre con calma.",
  },
  rep5Turns: [
    turn("a1d14-turn1", RECRUITER, cWeek.text, cWeek.es, "female", { round: { n: 1, title: "WEEKENDS", titleEs: "FINES DE SEMANA" }, targetSeconds: DEVELOP, cues: ["UNDERSTAND", "HOWEVER", "WHAT I CAN DO"], toolbox: ["I understand that…", "However…", "What I can do is…"] }),
    turn("a1d14-turn2", RECRUITER, cSalary.text, cSalary.es, "female", { round: { n: 2, title: "SALARY", titleEs: "SALARIO" }, targetSeconds: DEVELOP }),
    turn("a1d14-turn3", RECRUITER, cSched.text, cSched.es, "female", { round: { n: 3, title: "SCHEDULE CHANGE", titleEs: "CAMBIO DE HORARIO" }, targetSeconds: DEVELOP }),
    turn("a1d14-turn4", RECRUITER, cPress.text, cPress.es, "female", { round: { n: 4, title: "PRESSURE", titleEs: "PRESIÓN" }, targetSeconds: [30, 50] }),
    // REPAIR — RESTART
    repairTurn("a1d14-repair", "restart", "repair-restart-3", "female", {
      round: { n: 5, title: "RESTART", titleEs: "EMPIEZA DE NUEVO" },
    }),
  ],
  speakerVoice: "female",
  testReady: d14Sprint,
});

/* ---------------------------- DAY 15 — DIFFICULT RECRUITER ROUND ---------------------------- */

const hJob = bankQuestion("why-job-1");
const W3_RECOGNITION: RecognitionFrameworkId[] = ["story", "evidence", "weakness", "future"];
const hFail = bankQuestion("failure-1");
const hCrit = bankQuestion("criticize-1");
const hNot = bankQuestion("not-hire-1");

const d15Sprint: TestReadySprint = {
  type: "mixed",
  title: "MIXED SPRINT — EXTRA PRACTICE",
  titleEs: "MIXED SPRINT — PRÁCTICA EXTRA",
  instruction: "Optional extra practice. Five quick, different drills. No score.",
  instructionEs: "Práctica extra opcional. Cinco ejercicios rápidos y diferentes. Sin calificación.",
  items: [
    { id: "a1d15-tr1", kind: "repeat", audio: "I understand your concern, but the proof is that I'm still doing it every day.", maxSeconds: 12 },
    { id: "a1d15-tr2", kind: "quick-answers", audio: "Why should I believe you?", text: "Why should I believe you?", textEs: "¿Por qué debería creerte?", maxSeconds: 20 },
    { id: "a1d15-tr3", kind: "build-sentence", chunks: ["WHAT I'M LOOKING FOR", "IS A PLACE", "WHERE GOOD WORK", "LEADS TO OPPORTUNITIES"], maxSeconds: 12 },
    { id: "a1d15-tr4", kind: "listen-respond", audio: "Honestly, your English isn't perfect. Why should that not be a problem for this position?", text: "Respond to the recruiter.", textEs: "Responde al reclutador.", chunks: ["AGREE PARTLY", "EVIDENCE", "CLOSE"], maxSeconds: 30 },
    { id: "a1d15-tr5", kind: "speak-now", text: "Why shouldn't we hire you?", textEs: "¿Por qué no deberíamos contratarte?", chunks: ["HONEST", "REFRAME", "CLOSE"], thinkSeconds: 5, maxSeconds: 40 },
  ],
};

const d15 = advancedDay({
  day: 15,
  topic: "Difficult Recruiter Round",
  topicEs: "Ronda del reclutador difícil",
  focus: "Week 3 challenge — STAY CALM → ANSWER → SUPPORT → KEEP TALKING",
  focusEs: "Reto de la Semana 3 — MANTÉN LA CALMA → RESPONDE → APOYA → SIGUE HABLANDO",
  intro: {
    title: "DIFFICULT RECRUITER ROUND",
    titleEs: "RONDA DEL RECLUTADOR DIFÍCIL",
    lead: "This recruiter doubts you on purpose. Grammar doesn't matter today. What matters: stay calm, answer, support it, keep talking.",
    leadEs: "Este reclutador duda de ti a propósito. Hoy la gramática no importa. Lo que importa: mantén la calma, responde, apóyalo, sigue hablando.",
    examples: ["That's a fair question.", "The reason I say that is…", "Let me give you an example."],
    goal: "Five Rounds, about 5 minutes of speaking in total.",
    goalEs: "Cinco Rounds, unos 5 minutos hablando en total.",
    cta: START,
  },
  lines: [
    l("a1d15-1", "When a recruiter pushes back, | the first thing I do is stay calm | and say 'That's a fair question.'", "Cuando un reclutador me presiona, lo primero que hago es mantener la calma y decir 'Es una pregunta justa'."),
    l("a1d15-2", "It gives me two seconds to think, | and it shows I'm not defensive.", "Me da dos segundos para pensar, y muestra que no estoy a la defensiva."),
    l("a1d15-3", "Then I answer directly — | I don't repeat what I already said.", "Luego respondo directamente — no repito lo que ya dije."),
    l("a1d15-4", "If they ask why they should believe me, | I give a specific example with a real result.", "Si preguntan por qué deberían creerme, doy un ejemplo específico con un resultado real."),
    l("a1d15-5", "If they ask what my supervisor would criticize, | I say something true and small, | and what I've done about it.", "Si preguntan qué criticaría mi supervisor, digo algo verdadero y pequeño, y qué he hecho al respecto."),
    l("a1d15-6", "For example, | she would probably say I used to take too long to make small decisions, | so now I give myself a time limit.", "Por ejemplo, ella probablemente diría que antes tardaba mucho en decisiones pequeñas, así que ahora me pongo un límite de tiempo."),
    l("a1d15-7", "And if they ask why they shouldn't hire me, | I don't panic — | I say the honest risk and why it won't be a problem.", "Y si preguntan por qué no deberían contratarme, no entro en pánico — digo el riesgo honesto y por qué no será un problema."),
    l("a1d15-8", "The goal isn't to win — | it's to keep talking with confidence.", "La meta no es ganar — es seguir hablando con confianza."),
  ],
  rep2Chunks: chunks4("a1d15"),
  prompts: [
    q("a1d15-p1", "Why do you want this job? One reason with a real detail.", "¿Por qué quieres este trabajo? Una razón con un detalle real.", "The main reason is…", "La razón principal es…", "REASON"),
    q("a1d15-p2", "Why should I believe you? Give evidence, not more claims.", "¿Por qué debería creerte? Da evidencia, no más afirmaciones.", "That's a fair question. For example…", "Es una pregunta justa. Por ejemplo…", "EVIDENCE", "defend"),
    q("a1d15-p3", "What would your previous supervisor (or teacher) criticize about you?", "¿Qué criticaría de ti tu supervisor (o maestro) anterior?", "She would probably say… so now I…", "Probablemente diría… así que ahora yo…", "CRITICISM"),
    q("a1d15-p4", "Why shouldn't I hire you?", "¿Por qué no debería contratarte?", "Honestly, if… But…", "Honestamente, si… Pero…", "RISK", "defend"),
    q("a1d15-p5", "The recruiter stays silent after your answer. Keep talking for 15 more seconds.", "El reclutador se queda en silencio después de tu respuesta. Sigue hablando 15 segundos más.", "And one more thing I'd add is…", "Y algo más que agregaría es…", "KEEP TALKING", "adapt"),
  ],
  cues: ["STAY CALM", "ANSWER", "SUPPORT", "KEEP TALKING"],
  powerChunks: { core: ["That's a fair question.", "The reason I say that is…"], stretch: "Let me give you an example." },
  sceneImage: { src: sceneD15, alt: "A skeptical recruiter with crossed arms across from a calm candidate", altEs: "Una reclutadora escéptica con los brazos cruzados frente a un candidato tranquilo" },
  goalSeconds: [240, 330],
  goalSentences: 8,
  hideModelText: true,
  rep5Prompt: { question: "Difficult Recruiter Round — 5 Rounds.", questionEs: "Ronda del reclutador difícil — 5 Rounds." },
  rep5Tips: {
    en: "STAY CALM → ANSWER → SUPPORT → KEEP TALKING. Perfection is not the goal. Silence is the only failure.",
    es: "MANTÉN LA CALMA → RESPONDE → APOYA → SIGUE HABLANDO. La perfección no es la meta. El silencio es el único fracaso.",
  },
  rep5Turns: [
    turn("a1d15-turn1", RECRUITER, hJob.text, hJob.es, "male", { round: { n: 1, title: "WHY THIS JOB", titleEs: "POR QUÉ ESTE TRABAJO" }, targetSeconds: [45, 60], cues: ["REASON", "MATCH", "VALUE"] }),
    turn("a1d15-turn2", RECRUITER, hJob.followUp!.text, hJob.followUp!.es, "male", { round: { n: 2, title: "WHY BELIEVE YOU", titleEs: "POR QUÉ CREERTE" }, targetSeconds: DEVELOP, cues: ["EVIDENCE"] }),
    turn("a1d15-turn3", RECRUITER, hFail.text, hFail.es, "male", { round: { n: 3, title: "A FAILURE", titleEs: "UN FRACASO" }, targetSeconds: [45, 60], cues: ["FAILURE", "CHANGE", "RESULT"] }),
    turn("a1d15-turn4", RECRUITER, hFail.followUp!.text, hFail.followUp!.es, "male", { targetSeconds: QUICK }),
    turn("a1d15-turn5", RECRUITER, hCrit.text, hCrit.es, "male", { round: { n: 4, title: "WHAT THEY'D CRITICIZE", titleEs: "QUÉ CRITICARÍAN" }, targetSeconds: DEVELOP, cues: ["TRUE & SMALL", "WHAT I DID"] }),
    turn("a1d15-turn6", RECRUITER, hNot.text, hNot.es, "male", { round: { n: 5, title: "WHY NOT HIRE YOU", titleEs: "POR QUÉ NO CONTRATARTE" }, targetSeconds: DEVELOP, cues: ["HONEST RISK", "WHY IT'S OK"] }),
    turn("a1d15-turn7", RECRUITER, hNot.followUp!.text, hNot.followUp!.es, "male", { targetSeconds: QUICK }),
    // REPAIR — REPAIR UNDER PRESSURE
    // ROUND 6 — RECOGNIZE THE QUESTION
    recognitionTurn("a1d15-rec1", RECRUITER, "improve-1", 0, "male", W3_RECOGNITION, "weakness", { round: { n: 6, ...RECOGNITION_ROUND } }),
    recognitionTurn("a1d15-rec2", RECRUITER, "pressure-1", 1, "male", W3_RECOGNITION, "story"),
    recognitionTurn("a1d15-rec3", RECRUITER, "three-years", 0, "male", W3_RECOGNITION, "future"),
    recognitionTurn("a1d15-rec4", RECRUITER, "strong-1", 0, "male", W3_RECOGNITION, "evidence"),
    repairTurn("a1d15-repair", "mixed", "repair-mixed-3", "male", {
      round: { n: 7, title: "REPAIR UNDER PRESSURE", titleEs: "REPARA BAJO PRESIÓN" },
    }),
  ],
  speakerVoice: "male",
  testReady: d15Sprint,
  testReadyOptional: true,
});

/* ====================================================================== */
/* WEEK 4 — PERFORM UNDER JOB PRESSURE                                      */
/* ====================================================================== */

/* ---------------------------- DAY 16 — YOUR PROFESSIONAL STORY ---------------------------- */

const journey = bankQuestion("journey-1");

const d16Sprint: TestReadySprint = {
  type: "describe-scene",
  title: "DESCRIBE THE SCENE",
  titleEs: "DESCRIBE LA ESCENA",
  instruction: "Look at the picture. 10 seconds to think, then speak for 45–60 seconds.",
  instructionEs: "Mira la imagen. 10 segundos para pensar y luego habla 45–60 segundos.",
  image: { src: sceneD16, alt: "A woman pointing at a career timeline of notes and photos on a wall", altEs: "Una mujer señalando una línea de tiempo profesional con notas y fotos en una pared" },
  thinkSeconds: 10,
  speakSeconds: 45,
  items: [
    { id: "a1d16-tr1", text: "Describe the scene. Then imagine her story.", textEs: "Describe la escena. Luego imagina su historia.", chunks: ["WHO?", "WHERE?", "PAST → PRESENT", "WHAT'S NEXT?"], maxSeconds: 60 },
  ],
};

const d16 = advancedDay({
  day: 16,
  topic: "Your Professional Story",
  topicEs: "Tu historia profesional",
  focus: "PAST → PRESENT → FUTURE · 75–90 seconds · study, projects and English count as experience",
  focusEs: "PASADO → PRESENTE → FUTURO · 75–90 segundos · estudios, proyectos e inglés cuentan como experiencia",
  intro: {
    title: "YOUR PROFESSIONAL STORY",
    titleEs: "TU HISTORIA PROFESIONAL",
    lead: "Longer than 'tell me about yourself'. Connect where you started, where you are, and where you're going. No formal jobs? Your studies, your English journey, your projects and responsibilities ARE the story.",
    leadEs: "Más largo que 'háblame de ti'. Conecta dónde empezaste, dónde estás y a dónde vas. ¿Sin trabajos formales? Tus estudios, tu camino con el inglés, tus proyectos y responsabilidades SON la historia.",
    examples: ["I started out…", "That led me to…", "Right now… and next…"],
    goal: "75–90 seconds, then describe your turning point.",
    goalEs: "75–90 segundos y luego describe tu punto de inflexión.",
    cta: START,
  },
  lines: [
    l("a1d16-1", "I started out studying administration | while I was working part-time in a small store.", "Empecé estudiando administración mientras trabajaba medio tiempo en una tienda pequeña."),
    l("a1d16-2", "That's where I learned to deal with customers | and to stay organized when things get busy.", "Ahí aprendí a tratar con clientes y a mantenerme organizado/a cuando hay mucho movimiento."),
    l("a1d16-3", "After that, | I got a job in customer support, | and that's when I realized I enjoyed solving problems for people.", "Después conseguí un trabajo en soporte al cliente, y ahí me di cuenta de que disfrutaba resolver problemas para la gente."),
    l("a1d16-4", "The turning point came | when I lost an opportunity because my English wasn't good enough.", "El punto de inflexión llegó cuando perdí una oportunidad porque mi inglés no era suficiente."),
    l("a1d16-5", "That led me to practice every day, | and it changed the way I see my career.", "Eso me llevó a practicar todos los días, y cambió la forma en que veo mi carrera."),
    l("a1d16-6", "Right now, | I'm looking for a bilingual position | where I can use everything I've learned.", "Ahora mismo busco una posición bilingüe donde pueda usar todo lo que he aprendido."),
    l("a1d16-7", "In the next few years, | I want to move into a role where I support and train other people.", "En los próximos años quiero pasar a un rol donde apoye y entrene a otras personas."),
    l("a1d16-8", "So if you look at my path, | every step has been about communicating better | and taking on more responsibility.", "Así que si ves mi camino, cada paso ha sido sobre comunicarme mejor y asumir más responsabilidad."),
  ],
  rep2Chunks: chunks4("a1d16"),
  prompts: [
    q("a1d16-p1", "Where did you start? (job, studies or first responsibility)", "¿Dónde empezaste? (trabajo, estudios o primera responsabilidad)", "I started out…", "Empecé…", "PAST"),
    q("a1d16-p2", "What did that first stage teach you?", "¿Qué te enseñó esa primera etapa?", "That's where I learned to…", "Ahí aprendí a…", "LESSON"),
    q("a1d16-p3", "What was your turning point?", "¿Cuál fue tu punto de inflexión?", "The turning point came when…", "El punto de inflexión llegó cuando…", "TURNING POINT", "explain"),
    q("a1d16-p4", "Where are you right now, professionally?", "¿Dónde estás ahora, profesionalmente?", "Right now, I'm…", "Ahora mismo, estoy…", "PRESENT"),
    q("a1d16-p5", "Where is this going? Connect the future to the past.", "¿A dónde va esto? Conecta el futuro con el pasado.", "So every step has been about…", "Así que cada paso ha sido sobre…", "FUTURE", "justify"),
  ],
  cues: ["PAST", "TURNING POINT", "PRESENT", "FUTURE"],
  powerChunks: { core: ["That's where I learned to…", "That led me to…"], stretch: "The turning point came when…" },
  sceneImage: { src: sceneD16, alt: "A woman pointing at a career timeline of notes and photos on a wall", altEs: "Una mujer señalando una línea de tiempo profesional con notas y fotos en una pared" },
  goalSeconds: [90, 120],
  goalSentences: 8,
  hideModelText: true,
  rep5Prompt: { question: journey.text, questionEs: journey.es },
  rep5Tips: {
    en: "PAST → PRESENT → FUTURE. Connect the steps with 'That's where…', 'That led me to…', 'So…'.",
    es: "PASADO → PRESENTE → FUTURO. Conecta los pasos con 'That's where…', 'That led me to…', 'So…'.",
  },
  rep5Turns: [
    variantTurn("a1d16-turn1", RECRUITER, "journey-1", 0, "female", { targetSeconds: [75, 90], cues: ["PAST", "PRESENT", "FUTURE"] }),
    turn("a1d16-turn2", RECRUITER, journey.followUp!.text, journey.followUp!.es, "female", { targetSeconds: DEVELOP }),
    // REPAIR — NEEDS TIME
    repairTurn("a1d16-repair", "time", "repair-time-4", "female"),
  ],
  speakerVoice: "female",
  testReady: d16Sprint,
});

/* ---------------------------- DAY 17 — COMPETENCY INTERVIEW ---------------------------- */

const compProblem = bankQuestion("comp-problem");
const compLearn = bankQuestion("comp-learn");
const compPressure = bankQuestion("comp-pressure");

const d17 = advancedDay({
  day: 17,
  topic: "Competency Interview",
  topicEs: "Entrevista por competencias",
  focus: "One prewritten scenario is drawn for you — you won't know which until Rep 5",
  focusEs: "Se te asigna un escenario prewritten — no sabrás cuál hasta la Rep 5",
  intro: {
    title: "COMPETENCY INTERVIEW",
    titleEs: "ENTREVISTA POR COMPETENCIAS",
    lead: "In Rep 5 you'll receive ONE competency question from a fixed bank: problem solving, fast learning or working under pressure. You won't know which. Your story bank from Weeks 1–3 is your preparation.",
    leadEs: "En la Rep 5 recibirás UNA pregunta de competencias de un banco fijo: resolver problemas, aprender rápido o trabajar bajo presión. No sabrás cuál. Tu banco de historias de las Semanas 1–3 es tu preparación.",
    examples: ["The situation was…", "What I did was…", "The result was…"],
    goal: "One story of 60–75 seconds + one hidden follow-up.",
    goalEs: "Una historia de 60–75 segundos + una repregunta oculta.",
    cta: START,
  },
  lines: [
    l("a1d17-1", "A competency question always has the same shape: | 'Tell me about a time you…'", "Una pregunta de competencias siempre tiene la misma forma: 'Cuéntame sobre una vez que…'"),
    l("a1d17-2", "So I don't prepare answers — | I prepare three or four stories I can adapt.", "Así que no preparo respuestas — preparo tres o cuatro historias que puedo adaptar."),
    l("a1d17-3", "The same story about the project with missing people | works for pressure, for problem solving, and for teamwork.", "La misma historia del proyecto con gente faltante sirve para presión, para resolver problemas y para trabajo en equipo."),
    l("a1d17-4", "I just change what I emphasize: | the deadline, the solution, or the people.", "Solo cambio lo que enfatizo: la fecha límite, la solución o las personas."),
    l("a1d17-5", "When I learned the new system in one week, | that's my story for learning quickly.", "Cuando aprendí el sistema nuevo en una semana, esa es mi historia para aprender rápido."),
    l("a1d17-6", "I asked questions, | I took notes, | and I practiced after hours until it felt natural.", "Hice preguntas, tomé notas y practiqué después del horario hasta que se sintió natural."),
    l("a1d17-7", "Whatever they ask, | I answer with the situation, what I did, and the result — | in that order.", "Pregunten lo que pregunten, respondo con la situación, lo que hice y el resultado — en ese orden."),
    l("a1d17-8", "And when the follow-up comes, | I add a new detail instead of repeating myself.", "Y cuando llega la repregunta, agrego un detalle nuevo en vez de repetirme."),
  ],
  rep2Chunks: chunks4("a1d17"),
  prompts: [
    q("a1d17-p1", "Name a story from your life you could use for 'solving a problem'.", "Nombra una historia de tu vida que podrías usar para 'resolver un problema'.", "For problem solving, I could talk about…", "Para resolver problemas, podría hablar de…", "PROBLEM"),
    q("a1d17-p2", "Name a story for 'learning something quickly'.", "Nombra una historia para 'aprender algo rápido'.", "For learning fast, I'd use the time I…", "Para aprender rápido, usaría la vez que…", "LEARN"),
    q("a1d17-p3", "Name a story for 'working under pressure'.", "Nombra una historia para 'trabajar bajo presión'.", "For pressure, there was a time when…", "Para presión, hubo una vez que…", "PRESSURE"),
    q("a1d17-p4", "Take ONE of those stories and tell it in 45 seconds.", "Toma UNA de esas historias y cuéntala en 45 segundos.", "The situation was… What I did was… The result was…", "La situación era… Lo que hice fue… El resultado fue…", "TELL IT", "explain"),
    q("a1d17-p5", "Now tell the SAME story emphasizing a different skill.", "Ahora cuenta la MISMA historia enfatizando otra habilidad.", "The same situation also shows that I…", "La misma situación también muestra que yo…", "ADAPT", "adapt"),
  ],
  cues: ["SITUATION", "WHAT I DID", "RESULT", "NEW DETAIL"],
  powerChunks: { core: ["The situation was…", "What I did was…"], stretch: "The result was…" },
  sceneImage: { src: sceneD17, alt: "A candidate in a video interview while the recruiter holds a question card face down", altEs: "Un candidato en una entrevista por video mientras el reclutador sostiene una tarjeta con la pregunta boca abajo" },
  goalSeconds: [75, 100],
  goalSentences: 8,
  hideModelText: true,
  rep5Prompt: { question: "Competency Interview — one question is drawn for you.", questionEs: "Entrevista por competencias — se te asigna una pregunta." },
  rep5Tips: {
    en: "SITUATION → WHAT I DID → RESULT. The follow-up appears after your story — answer it with a new detail.",
    es: "SITUACIÓN → LO QUE HICE → RESULTADO. La repregunta aparece después de tu historia — respóndela con un detalle nuevo.",
  },
  rep5Turns: [
    variantTurn("a1d17-turn1", RECRUITER, "comp-problem", 0, "male", { targetSeconds: SUSTAIN, cues: ["SITUATION", "WHAT I DID", "RESULT"] }),
    turn("a1d17-turn2", RECRUITER, compProblem.followUp!.text, compProblem.followUp!.es, "male", { targetSeconds: DEVELOP }),
    // REPAIR — DIDN'T CATCH IT
    repairTurn("a1d17-repair", "catch", "repair-catch-4", "male"),
  ],
  rep5Skeleton: ["SITUATION", "WHAT I DID", "RESULT", "NEW DETAIL"],
  rep5Scenarios: [
    {
      id: "a1d17-s1",
      label: "COMPETENCY",
      labelEs: "COMPETENCIA",
      situation: "PROBLEM SOLVING",
      situationEs: "RESOLVER PROBLEMAS",
      rep5Prompt: { question: compProblem.text, questionEs: compProblem.es },
      rep5Turns: [
        variantTurn("a1d17-s1-turn1", RECRUITER, "comp-problem", 0, "male", { targetSeconds: SUSTAIN, cues: ["SITUATION", "WHAT I DID", "RESULT"] }),
        turn("a1d17-s1-turn2", RECRUITER, compProblem.followUp!.text, compProblem.followUp!.es, "male", { targetSeconds: DEVELOP }),
        // REPAIR — DIDN'T CATCH IT
        repairTurn("a1d17-s1-repair", "catch", "repair-catch-4", "male"),
      ],
    },
    {
      id: "a1d17-s2",
      label: "COMPETENCY",
      labelEs: "COMPETENCIA",
      situation: "LEARNING QUICKLY",
      situationEs: "APRENDER RÁPIDO",
      rep5Prompt: { question: compLearn.text, questionEs: compLearn.es },
      rep5Turns: [
        variantTurn("a1d17-s2-turn1", RECRUITER, "comp-learn", 0, "female", { targetSeconds: SUSTAIN, cues: ["SITUATION", "WHAT I DID", "RESULT"] }),
        turn("a1d17-s2-turn2", RECRUITER, compLearn.followUp!.text, compLearn.followUp!.es, "female", { targetSeconds: DEVELOP }),
        // REPAIR — DIDN'T CATCH IT
        repairTurn("a1d17-s2-repair", "catch", "repair-catch-4", "female"),
      ],
    },
    {
      id: "a1d17-s3",
      label: "COMPETENCY",
      labelEs: "COMPETENCIA",
      situation: "WORKING UNDER PRESSURE",
      situationEs: "TRABAJAR BAJO PRESIÓN",
      rep5Prompt: { question: compPressure.text, questionEs: compPressure.es },
      rep5Turns: [
        variantTurn("a1d17-s3-turn1", RECRUITER, "comp-pressure", 0, "male", { targetSeconds: SUSTAIN, cues: ["SITUATION", "WHAT I DID", "RESULT"] }),
        turn("a1d17-s3-turn2", RECRUITER, compPressure.followUp!.text, compPressure.followUp!.es, "male", { targetSeconds: DEVELOP }),
        // REPAIR — DIDN'T CATCH IT
        repairTurn("a1d17-s3-repair", "catch", "repair-catch-4", "male"),
      ],
    },
  ],
  speakerVoice: "male",
});

/* ---------------------------- DAY 18 — UNEXPECTED RECRUITER ---------------------------- */

const czDecision = bankQuestion("crazy-decision");
const czMoney = bankQuestion("crazy-money");
const czLive = bankQuestion("crazy-live");
const czAnimal = bankQuestion("crazy-animal");

const THINK = { title: "THINK IN ENGLISH", titleEs: "PIENSA EN INGLÉS", steps: ["ANSWER", "WHY", "EXAMPLE", "CLOSE"] };

const d18Sprint: TestReadySprint = {
  type: "speak-now",
  title: "SPEAK NOW",
  titleEs: "HABLA AHORA",
  instruction: "One unexpected question. 5 seconds to think, then speak for 30–45 seconds.",
  instructionEs: "Una pregunta inesperada. 5 segundos para pensar y luego habla 30–45 segundos.",
  thinkSeconds: 5,
  speakSeconds: 30,
  items: [
    { id: "a1d18-tr1", text: czAnimal.text, textEs: czAnimal.es, chunks: ["ANSWER", "WHY", "EXAMPLE", "CLOSE"], maxSeconds: 45 },
  ],
};

const d18 = advancedDay({
  day: 18,
  topic: "Unexpected Recruiter",
  topicEs: "Reclutador inesperado",
  focus: "Crazy questions with 10 s think time — ANSWER → WHY → EXAMPLE → CLOSE",
  focusEs: "Preguntas locas con 10 s para pensar — RESPUESTA → POR QUÉ → EJEMPLO → CIERRE",
  intro: {
    title: "THE UNEXPECTED RECRUITER",
    titleEs: "EL RECLUTADOR INESPERADO",
    lead: "'If you were an animal…' There is no correct answer and no perfect answer to memorize. The skill: I may not know the question, but I know how to build an answer.",
    leadEs: "'Si fueras un animal…' No hay respuesta correcta ni respuesta perfecta que memorizar. La habilidad: quizá no conozco la pregunta, pero sé cómo construir una respuesta.",
    examples: ["I'd say…", "The reason is…", "So overall…"],
    goal: "Three unexpected questions, 10 seconds to think each, 45–60 seconds each.",
    goalEs: "Tres preguntas inesperadas, 10 segundos para pensar cada una, 45–60 segundos cada una.",
    cta: START,
  },
  lines: [
    l("a1d18-1", "When I get a strange question, | I don't try to be clever — | I just pick an answer.", "Cuando me hacen una pregunta extraña, no intento ser ingenioso/a — simplemente elijo una respuesta."),
    l("a1d18-2", "If they asked me what I'd do with ten thousand dollars, | I'd say I'd invest half in a certification.", "Si me preguntaran qué haría con diez mil dólares, diría que invertiría la mitad en una certificación."),
    l("a1d18-3", "The reason is | that education has already changed my life once, | when I learned English.", "La razón es que la educación ya cambió mi vida una vez, cuando aprendí inglés."),
    l("a1d18-4", "For example, | that decision opened doors that were completely closed before.", "Por ejemplo, esa decisión abrió puertas que antes estaban completamente cerradas."),
    l("a1d18-5", "The other half | I'd save, | because I've learned that stability lets you take better risks.", "La otra mitad la ahorraría, porque he aprendido que la estabilidad te permite tomar mejores riesgos."),
    l("a1d18-6", "So overall, | I'd use the money to grow, | not just to spend.", "Así que en general, usaría el dinero para crecer, no solo para gastar."),
    l("a1d18-7", "Answer, why, example, close — | it takes ten seconds to plan | and it works for any question.", "Respuesta, por qué, ejemplo, cierre — toma diez segundos planearlo y funciona para cualquier pregunta."),
    l("a1d18-8", "And if I need a second, | I say 'That's an interesting question' | and take it.", "Y si necesito un segundo, digo 'Es una pregunta interesante' y me lo tomo."),
  ],
  rep2Chunks: chunks4("a1d18"),
  prompts: [
    q("a1d18-p1", "If you could have dinner with anyone, who would it be? Answer in one sentence.", "Si pudieras cenar con cualquier persona, ¿quién sería? Responde en una oración.", "I'd say…", "Diría que…", "ANSWER"),
    q("a1d18-p2", "Why that person?", "¿Por qué esa persona?", "The reason is…", "La razón es…", "WHY", "justify"),
    q("a1d18-p3", "Give one example or consequence.", "Da un ejemplo o consecuencia.", "For example…", "Por ejemplo…", "EXAMPLE"),
    q("a1d18-p4", "Close it in one sentence.", "Ciérralo en una oración.", "So overall…", "Así que en general…", "CLOSE"),
    q("a1d18-p5", "New question, all four steps, no pause: what superpower would help you most at work?", "Nueva pregunta, los cuatro pasos, sin pausa: ¿qué superpoder te ayudaría más en el trabajo?", "I'd say… The reason is… For example… So overall…", "Diría que… La razón es… Por ejemplo… Así que en general…", "ALL FOUR", "adapt"),
  ],
  cues: ["ANSWER", "WHY", "EXAMPLE", "CLOSE"],
  powerChunks: { core: ["I'd say…", "The reason is…"], stretch: "That's an interesting question." },
  sceneImage: { src: sceneD18, alt: "A surprised, amused candidate thinking while the recruiter smiles across the table", altEs: "Una candidata sorprendida y divertida pensando mientras el reclutador sonríe al otro lado de la mesa" },
  goalSeconds: [120, 180],
  goalSentences: 8,
  hideModelText: true,
  rep5Prompt: { question: "Unexpected Recruiter — 3 questions, 10 seconds to think each.", questionEs: "Reclutador inesperado — 3 preguntas, 10 segundos para pensar cada una." },
  rep5Tips: {
    en: "ANSWER → WHY → EXAMPLE → CLOSE. Use the 10 seconds to choose your answer — then just build.",
    es: "RESPUESTA → POR QUÉ → EJEMPLO → CIERRE. Usa los 10 segundos para elegir tu respuesta — luego solo construye.",
  },
  rep5Turns: [
    turn("a1d18-turn1", RECRUITER, czDecision.text, czDecision.es, "female", { round: { n: 1, title: "UNEXPECTED QUESTION", titleEs: "PREGUNTA INESPERADA" }, prepSeconds: 10, targetSeconds: [45, 60], framework: THINK }),
    turn("a1d18-turn2", RECRUITER, czMoney.text, czMoney.es, "female", { round: { n: 2, title: "UNEXPECTED QUESTION", titleEs: "PREGUNTA INESPERADA" }, prepSeconds: 10, targetSeconds: [45, 60], cues: ["ANSWER", "WHY", "EXAMPLE", "CLOSE"] }),
    turn("a1d18-turn3", RECRUITER, czLive.text, czLive.es, "female", { round: { n: 3, title: "UNEXPECTED QUESTION", titleEs: "PREGUNTA INESPERADA" }, prepSeconds: 10, targetSeconds: [45, 60] }),
    // REPAIR — CONFIRM
    repairTurn("a1d18-repair", "confirm", "repair-confirm-4", "female", {
      round: { n: 4, title: "CONFIRM", titleEs: "CONFIRMA" },
    }),
  ],
  speakerVoice: "female",
  testReady: d18Sprint,
});

/* ---------------------------- DAY 19 — ROLE SWITCH ---------------------------- */

const strong = bankQuestion("strong-1");
const csCalls = bankQuestion("cs-calls-1");
const sellPhone = bankQuestion("sell-phone");

const d19 = advancedDay({
  day: 19,
  topic: "Role Switch",
  topicEs: "Cambio de rol",
  focus: "Recruiter → angry customer → sales challenge · change context without freezing",
  focusEs: "Reclutador → cliente enojado → reto de ventas · cambia de contexto sin trabarte",
  intro: {
    title: "ROLE SWITCH",
    titleEs: "CAMBIO DE ROL",
    lead: "Real jobs don't stay in one mode. Today you go from interview to an angry customer to 'sell me this phone' — in one sitting. This is only exposure; Advanced 2 goes deep on HANDLE & SELL.",
    leadEs: "Los trabajos reales no se quedan en un solo modo. Hoy pasas de la entrevista a un cliente enojado a 'véndeme este teléfono' — en una sola sesión. Esto es solo exposición; Advanced 2 profundiza en HANDLE & SELL.",
    examples: ["I'm a strong candidate because…", "I understand, and here's what I can do…", "What makes this phone different is…"],
    goal: "Five turns, about 3–4 minutes of speaking.",
    goalEs: "Cinco turnos, unos 3–4 minutos hablando.",
    cta: START,
  },
  lines: [
    l("a1d19-1", "I'm a strong candidate because | I stay useful when the situation changes.", "Soy un/a candidato/a fuerte porque sigo siendo útil cuando la situación cambia."),
    l("a1d19-2", "One minute I can explain my experience, | and the next minute I can calm down an upset customer.", "Un minuto puedo explicar mi experiencia, y al siguiente puedo calmar a un cliente molesto."),
    l("a1d19-3", "When someone tells me they've called three times, | I don't defend the company — | I take ownership.", "Cuando alguien me dice que ha llamado tres veces, no defiendo a la empresa — asumo la responsabilidad."),
    l("a1d19-4", "I understand, and I'm going to stay with you | until this is solved today.", "Entiendo, y voy a quedarme con usted hasta que esto se resuelva hoy."),
    l("a1d19-5", "Here's what I can do: | I'll open a priority case, | and I'll call you back myself before five.", "Esto es lo que puedo hacer: abro un caso prioritario y le devuelvo la llamada yo mismo/a antes de las cinco."),
    l("a1d19-6", "And if you ask me to sell you this phone, | I start with what you need, | not with the price.", "Y si me pide que le venda este teléfono, empiezo con lo que usted necesita, no con el precio."),
    l("a1d19-7", "What makes this phone different | is that the battery lasts two full days, | so you stop worrying about chargers.", "Lo que hace diferente a este teléfono es que la batería dura dos días completos, así que deja de preocuparse por cargadores."),
    l("a1d19-8", "Same person, three different situations — | and the same calm voice in all of them.", "La misma persona, tres situaciones diferentes — y la misma voz tranquila en todas."),
  ],
  rep2Chunks: chunks4("a1d19"),
  prompts: [
    q("a1d19-p1", "Why are you a strong candidate? Two reasons, one example.", "¿Por qué eres un/a candidato/a fuerte? Dos razones, un ejemplo.", "I'm a strong candidate because…", "Soy un/a candidato/a fuerte porque…", "CANDIDATE", "defend"),
    q("a1d19-p2", "A customer says: 'Nobody has helped me.' Take ownership in one sentence.", "Un cliente dice: 'Nadie me ha ayudado.' Asume la responsabilidad en una oración.", "I understand, and I'm going to…", "Entiendo, y voy a…", "OWNERSHIP", "react"),
    q("a1d19-p3", "Give that customer a concrete solution with a time.", "Dale a ese cliente una solución concreta con una hora.", "Here's what I can do: … before…", "Esto es lo que puedo hacer: … antes de…", "SOLUTION", "explain"),
    q("a1d19-p4", "Sell me something you own. Start with what I need.", "Véndeme algo que tengas. Empieza con lo que necesito.", "What makes this different is…", "Lo que hace diferente a esto es…", "SELL", "adapt"),
    q("a1d19-p5", "I say it's too expensive. Respond without lowering the price.", "Digo que es muy caro. Responde sin bajar el precio.", "I understand. However, think about…", "Entiendo. Sin embargo, piense en…", "OBJECTION", "defend"),
  ],
  cues: ["CANDIDATE", "OWNERSHIP", "SOLUTION", "SELL"],
  powerChunks: { core: ["Here's what I can do:", "What makes this different is…"], stretch: "I'm going to stay with you until this is solved." },
  sceneImage: { src: sceneD19, alt: "The same man taking a call at a call center and showing a phone to a customer at a store counter", altEs: "El mismo hombre atendiendo una llamada en un call center y mostrando un teléfono a un cliente en una tienda" },
  goalSeconds: [180, 240],
  goalSentences: 8,
  hideModelText: true,
  rep5Prompt: { question: "Role Switch — recruiter, customer, sales.", questionEs: "Cambio de rol — reclutador, cliente, ventas." },
  rep5Tips: {
    en: "Three modes, one calm voice. Interview: evidence. Customer: ownership + solution. Sales: their need first, then one difference.",
    es: "Tres modos, una voz tranquila. Entrevista: evidencia. Cliente: responsabilidad + solución. Ventas: primero su necesidad, luego una diferencia.",
  },
  rep5Turns: [
    turn("a1d19-turn1", RECRUITER, strong.text, strong.es, "male", { round: { n: 1, title: "RECRUITER", titleEs: "RECLUTADOR" }, targetSeconds: [45, 60] }),
    turn("a1d19-turn2", CUSTOMER, csCalls.text, csCalls.es, "female", {
      round: { n: 2, title: "CUSTOMER SERVICE SWITCH", titleEs: "CAMBIO A SERVICIO AL CLIENTE", situation: "A customer calls for the fourth time about the same unresolved problem.", situationEs: "Un cliente llama por cuarta vez por el mismo problema sin resolver." },
      targetSeconds: DEVELOP,
      cues: ["OWNERSHIP", "SOLUTION"],
      toolbox: ["I understand, and I'm going to stay with you until this is solved.", "Here's what I can do:"],
    }),
    turn("a1d19-turn3", CUSTOMER, csCalls.followUp!.text, csCalls.followUp!.es, "female", { targetSeconds: DEVELOP, toolbox: ["Here's exactly what happens next:", "I'll call you back myself before…"] }),
    turn("a1d19-turn4", RECRUITER, sellPhone.text, sellPhone.es, "male", { round: { n: 3, title: "SALES CHALLENGE", titleEs: "RETO DE VENTAS" }, targetSeconds: [45, 60], cues: ["THEIR NEED", "ONE DIFFERENCE", "CLOSE"] }),
    turn("a1d19-turn5", RECRUITER, sellPhone.followUp!.text, sellPhone.followUp!.es, "male", { targetSeconds: QUICK }),
    // REPAIR — RESTART
    repairTurn("a1d19-repair", "restart", "repair-restart-4", "male", {
      round: { n: 4, title: "RESTART", titleEs: "EMPIEZA DE NUEVO" },
    }),
  ],
  speakerVoice: "male",
});

/* ---------------------------- DAY 20 — FINAL JOB PRESSURE SIMULATION ---------------------------- */

const f1 = bankQuestion("tmay-1");
const f2 = bankQuestion("difficult-situation");
const f3 = bankQuestion("hire-2");
const f4 = bankQuestion("improve-1");
const f5 = bankQuestion("crazy-animal");
const f6 = bankQuestion("listen-situation");
const f7 = bankQuestion("cs-charge-1");
const f8 = bankQuestion("three-years");
const W4_RECOGNITION: RecognitionFrameworkId[] = ["story", "evidence", "unexpected", "sales", "future"];

const d20Sprint: TestReadySprint = {
  type: "mixed",
  title: "MIXED SPRINT — EXTRA PRACTICE",
  titleEs: "MIXED SPRINT — PRÁCTICA EXTRA",
  instruction: "Optional extra practice. Five quick, different drills. No score.",
  instructionEs: "Práctica extra opcional. Cinco ejercicios rápidos y diferentes. Sin calificación.",
  items: [
    { id: "a1d20-tr1", kind: "repeat", audio: "If you look at my path, every step has been about communicating better and taking on more responsibility.", maxSeconds: 14 },
    { id: "a1d20-tr2", kind: "quick-answers", audio: "Where do you see yourself in three years?", text: "Where do you see yourself in three years?", textEs: "¿Dónde te ves en tres años?", maxSeconds: 20 },
    { id: "a1d20-tr3", kind: "build-sentence", chunks: ["HERE'S WHAT", "I CAN DO", "TO FIX THIS", "TODAY"], maxSeconds: 12 },
    { id: "a1d20-tr4", kind: "listen-respond", audio: "We're going to hire someone this week. In one sentence, why should it be you?", text: "Respond to the recruiter.", textEs: "Responde al reclutador.", chunks: ["CLAIM", "PROOF"], maxSeconds: 20 },
    { id: "a1d20-tr5", kind: "speak-now", text: "If you could live anywhere in the world, where would you live?", textEs: "Si pudieras vivir en cualquier parte del mundo, ¿dónde vivirías?", chunks: ["ANSWER", "WHY", "EXAMPLE", "CLOSE"], thinkSeconds: 5, maxSeconds: 45 },
  ],
};

const d20 = advancedDay({
  day: 20,
  topic: "Final Job Pressure Simulation",
  topicEs: "Simulación final de presión laboral",
  focus: "ADVANCED 1 final — 8 Rounds: intro, behavioral, value, development, unexpected, listening, customer switch, future",
  focusEs: "Final de ADVANCED 1 — 8 Rounds: presentación, conductual, valor, desarrollo, inesperada, listening, cambio a cliente, futuro",
  intro: {
    title: "FINAL JOB PRESSURE SIMULATION",
    titleEs: "SIMULACIÓN FINAL DE PRESIÓN LABORAL",
    lead: "Everything from GET HIRED in one realistic simulation. Eight Rounds, one turn at a time, no script. Not a grammar test — a professional communication challenge.",
    leadEs: "Todo GET HIRED en una simulación realista. Ocho Rounds, un turno a la vez, sin guion. No es un examen de gramática — es un reto de comunicación profesional.",
    examples: ["NOW → BACKGROUND → STRENGTH → GOAL", "SITUATION → ACTION → RESULT", "I understand, and here's what I can do."],
    goal: "About 5–7 minutes of speaking across all Rounds. Take your time between them.",
    goalEs: "Unos 5–7 minutos hablando en total. Tómate tu tiempo entre Rounds.",
    cta: START,
  },
  lines: [
    l("a1d20-1", "Right now I'm focused on starting a bilingual career, | and I've spent the last year preparing for exactly this kind of role.", "Ahora mismo estoy enfocado/a en empezar una carrera bilingüe, y he pasado el último año preparándome para exactamente este tipo de rol."),
    l("a1d20-2", "When a difficult situation comes up, | I organize first, act second, | and keep people informed.", "Cuando surge una situación difícil, primero me organizo, luego actúo, y mantengo a la gente informada."),
    l("a1d20-3", "You should hire me because I prove things instead of promising them — | for example, I learned our last system in one week and then trained two coworkers.", "Deberían contratarme porque pruebo las cosas en vez de prometerlas — por ejemplo, aprendí nuestro último sistema en una semana y luego entrené a dos compañeros."),
    l("a1d20-4", "One area I'm still improving is speaking up in big meetings, | so I've been preparing one point in advance every time.", "Un área que todavía estoy mejorando es hablar en reuniones grandes, así que he estado preparando un punto por adelantado cada vez."),
    l("a1d20-5", "If I were an animal, I'd be a dog, | because I'm loyal, I learn fast, | and I actually enjoy working with people.", "Si fuera un animal sería un perro, porque soy leal, aprendo rápido y de verdad disfruto trabajar con gente."),
    l("a1d20-6", "If a customer is waiting and my supervisor needs a report, | I take care of the customer first | and tell my supervisor exactly when the report will be ready.", "Si un cliente espera y mi supervisor necesita un reporte, atiendo primero al cliente y le digo a mi supervisor exactamente cuándo estará el reporte."),
    l("a1d20-7", "I understand why you're upset — a double charge is serious. | Here's what I can do: I'll reverse it now and confirm by email.", "Entiendo por qué está molesto/a — un cobro doble es serio. Esto es lo que puedo hacer: lo revierto ahora y confirmo por correo."),
    l("a1d20-8", "In three years, | I want to be the person the team calls when a situation gets complicated.", "En tres años quiero ser la persona a la que el equipo llama cuando una situación se complica."),
  ],
  rep2Chunks: chunks4("a1d20"),
  prompts: [
    q("a1d20-p1", "Introduce yourself in 30 seconds — NOW → BACKGROUND → STRENGTH → GOAL.", "Preséntate en 30 segundos — AHORA → EXPERIENCIA → FORTALEZA → META.", "Right now, I'm focused on…", "Ahora mismo estoy enfocado/a en…", "INTRO"),
    q("a1d20-p2", "Give me one story: SITUATION → ACTION → RESULT, 30 seconds.", "Dame una historia: SITUACIÓN → ACCIÓN → RESULTADO, 30 segundos.", "A while ago… so I… and as a result…", "Hace un tiempo… así que yo… y como resultado…", "STORY", "explain"),
    q("a1d20-p3", "What is one area you still need to improve — and what are you doing about it?", "¿Qué área todavía necesitas mejorar — y qué estás haciendo al respecto?", "One area I'm still improving is… so I've been…", "Un área que todavía estoy mejorando es… así que he estado…", "DEVELOPMENT"),
    q("a1d20-p4", "An angry customer says it's your fault. First two sentences.", "Un cliente enojado dice que es tu culpa. Primeras dos oraciones.", "I understand why you're upset. Here's what I can do:", "Entiendo por qué está molesto/a. Esto es lo que puedo hacer:", "CUSTOMER", "react"),
    q("a1d20-p5", "Where do you want to be in three years? Connect it to this job.", "¿Dónde quieres estar en tres años? Conéctalo con este trabajo.", "In three years, I want to be…", "En tres años quiero ser…", "FUTURE", "justify"),
  ],
  cues: ["INTRO", "STORY", "VALUE", "DEVELOPMENT", "UNEXPECTED", "LISTEN", "CUSTOMER", "FUTURE"],
  powerChunks: { core: ["Here's what I can do:", "For example…"], stretch: "That's a fair question." },
  sceneImage: { src: sceneD20, alt: "A candidate wearing a headset at a call center assessment station while an evaluator observes", altEs: "Una candidata con diadema en una estación de evaluación de call center mientras una evaluadora observa" },
  goalSeconds: [300, 420],
  goalSentences: 8,
  hideModelText: true,
  rep5Prompt: { question: "Final Job Pressure Simulation — 8 Rounds.", questionEs: "Simulación final de presión laboral — 8 Rounds." },
  rep5Tips: {
    en: "Each Round is revealed only after you finish the previous answer. No script — just your frameworks, one calm voice.",
    es: "Cada Round se revela solo cuando terminas la respuesta anterior. Sin guion — solo tus estructuras, una voz tranquila.",
  },
  rep5Turns: [
    // ROUND 1 — INTRODUCTION
    turn("a1d20-turn1", RECRUITER, f1.text, f1.es, "female", { round: { n: 1, title: "INTRODUCTION", titleEs: "PRESENTACIÓN" }, targetSeconds: [60, 75] }),
    // ROUND 2 — BEHAVIORAL
    turn("a1d20-turn2", RECRUITER, f2.text, f2.es, "female", { round: { n: 2, title: "BEHAVIORAL", titleEs: "CONDUCTUAL" }, targetSeconds: SUSTAIN }),
    turn("a1d20-turn3", RECRUITER, f2.followUp!.text, f2.followUp!.es, "female", { targetSeconds: QUICK }),
    // ROUND 3 — VALUE
    turn("a1d20-turn4", RECRUITER, f3.text, f3.es, "female", { round: { n: 3, title: "VALUE", titleEs: "VALOR" }, targetSeconds: [45, 60] }),
    turn("a1d20-turn5", RECRUITER, f3.followUp!.text, f3.followUp!.es, "female", { targetSeconds: DEVELOP }),
    // ROUND 4 — DEVELOPMENT
    turn("a1d20-turn6", RECRUITER, f4.text, f4.es, "female", { round: { n: 4, title: "DEVELOPMENT", titleEs: "DESARROLLO" }, targetSeconds: DEVELOP }),
    // ROUND 5 — UNEXPECTED QUESTION
    turn("a1d20-turn7", RECRUITER, f5.text, f5.es, "female", { round: { n: 5, title: "UNEXPECTED QUESTION", titleEs: "PREGUNTA INESPERADA" }, prepSeconds: 10, targetSeconds: [40, 60], framework: THINK }),
    // ROUND 6 — LISTEN & RESPOND
    turn("a1d20-turn8", RECRUITER, f6.text, f6.es, "male", { round: { n: 6, title: "LISTEN & RESPOND", titleEs: "ESCUCHA Y RESPONDE", situation: "Listen carefully — the recruiter describes a real work situation.", situationEs: "Escucha con atención — el reclutador describe una situación real de trabajo." }, targetSeconds: [40, 60], cues: ["FIRST", "TO THE CUSTOMER"] }),
    // ROUND 7 — CUSTOMER SERVICE SWITCH
    turn("a1d20-turn9", CUSTOMER, f7.text, f7.es, "male", {
      round: { n: 7, title: "CUSTOMER SERVICE SWITCH", titleEs: "CAMBIO A SERVICIO AL CLIENTE", situation: "A customer was charged twice for one order.", situationEs: "A un cliente le cobraron dos veces un mismo pedido." },
      targetSeconds: DEVELOP,
      cues: ["ACKNOWLEDGE", "SOLUTION"],
      toolbox: ["I understand why you're upset.", "Here's what I can do:"],
    }),
    turn("a1d20-turn10", CUSTOMER, f7.followUp!.text, f7.followUp!.es, "male", { targetSeconds: QUICK, toolbox: ["Here's exactly what happens next:", "I'll confirm with you by…"] }),
    // ROUND 8 — FUTURE
    turn("a1d20-turn11", RECRUITER, f8.text, f8.es, "female", { round: { n: 8, title: "FUTURE", titleEs: "FUTURO" }, targetSeconds: DEVELOP }),
    // REPAIR — REPAIR UNDER PRESSURE
    // ROUND 9 — RECOGNIZE THE QUESTION
    recognitionTurn("a1d20-rec1", RECRUITER, "comp-learn", 1, "female", W4_RECOGNITION, "story", { round: { n: 9, ...RECOGNITION_ROUND } }),
    recognitionTurn("a1d20-rec2", RECRUITER, "why-job-1", 0, "female", W4_RECOGNITION, "evidence"),
    recognitionTurn("a1d20-rec3", RECRUITER, "crazy-money", 0, "female", W4_RECOGNITION, "unexpected"),
    recognitionTurn("a1d20-rec4", CUSTOMER, "sell-phone", 1, "male", W4_RECOGNITION, "sales"),
    recognitionTurn("a1d20-rec5", RECRUITER, "goal-1", 0, "female", W4_RECOGNITION, "future"),
    repairTurn("a1d20-repair", "mixed", "repair-mixed-4", "female", {
      round: { n: 10, title: "REPAIR UNDER PRESSURE", titleEs: "REPARA BAJO PRESIÓN" },
    }),
  ],
  speakerVoice: "female",
  testReady: d20Sprint,
  testReadyOptional: true,
});

export const ADVANCED_1_WEEKS_2_4_DAYS: CourseDay[] = [d6, d7, d8, d9, d10, d11, d12, d13, d14, d15, d16, d17, d18, d19, d20];
