import type { CourseDay, ModelLine, ModuleId } from "@/lib/types";
import { BASIC_ZERO_DAYS, BASIC_ZERO_WEEKS } from "./basic-zero-course";


/**
 * CourseService — the 5-day Simple Present Fluency Journey.
 * New language between days, deep repetition inside each day (Reps 1–4 recycle
 * the same core lines).
 */

const GOAL: [number, number] = [35, 45];

function line(id: string, text: string, es: string, chunks: string[], role?: "q" | "a"): ModelLine {
  return role ? { id, text, es, chunks, role } : { id, text, es, chunks };
}

const day1: CourseDay = {
  day: 1,
  focus: "I / You / We / They",
  focusEs: "Yo / Tú / Nosotros / Ellos",
  topic: "My Work Routine",
  topicEs: "Mi rutina de trabajo",
  goalSeconds: GOAL,
  estimatedMinutes: "5–8 min",
  intro: {
    title: "SIMPLE PRESENT",
    titleEs: "PRESENTE SIMPLE",
    lead: "Use it for things you normally do.",
    leadEs: "Úsalo para las cosas que haces normalmente.",
    examples: ["I work.", "I study.", "I play."],
    goal: "Speak for 35–45 seconds.",
    goalEs: "Habla de 35 a 45 segundos.",
    cta: "START REP 1",
  },
  lines: [
    line("d1-1", "I usually wake up around six thirty.", "Normalmente me levanto como a las seis y media.", ["I usually wake up", "around six thirty."]),
    line("d1-2", "I have breakfast at home before I start work.", "Desayuno en casa antes de empezar a trabajar.", ["I have breakfast at home", "before I start work."]),
    line("d1-3", "I start work at eight and I talk to customers every day.", "Empiezo a trabajar a las ocho y hablo con clientes todos los días.", ["I start work at eight", "and I talk to customers", "every day."]),
    line("d1-4", "My coworkers and I usually have lunch together.", "Mis compañeros y yo normalmente almorzamos juntos.", ["My coworkers and I", "usually have lunch together."]),
    line("d1-5", "We sometimes have very busy mornings.", "A veces tenemos mañanas muy ocupadas.", ["We sometimes have", "very busy mornings."]),
    line("d1-6", "They usually help customers with different problems.", "Ellos normalmente ayudan a los clientes con diferentes problemas.", ["They usually help customers", "with different problems."]),
    line("d1-7", "I like my job because I learn something new every week.", "Me gusta mi trabajo porque aprendo algo nuevo cada semana.", ["I like my job", "because I learn something new", "every week."]),
    line("d1-8", "Overall, I really enjoy my routine.", "En general, disfruto mucho mi rutina.", ["Overall,", "I really enjoy my routine."]),
  ],
  prompts: [
    { id: "d1-p1", question: "What time do you usually wake up?", questionEs: "¿A qué hora te levantas normalmente?", starter: "I usually…", starterEs: "Normalmente yo…" },
    { id: "d1-p2", question: "What do you do before work?", questionEs: "¿Qué haces antes del trabajo?", starter: "I have…", starterEs: "Yo tomo / tengo…" },
    { id: "d1-p3", question: "What time do you start?", questionEs: "¿A qué hora empiezas?", starter: "I start…", starterEs: "Empiezo…" },
    { id: "d1-p4", question: "What do you usually do at work?", questionEs: "¿Qué haces normalmente en el trabajo?", starter: "I usually…", starterEs: "Normalmente yo…" },
    { id: "d1-p5", question: "What do you do with your coworkers?", questionEs: "¿Qué haces con tus compañeros?", starter: "We usually…", starterEs: "Nosotros normalmente…" },
    { id: "d1-p6", question: "What do you sometimes do?", questionEs: "¿Qué haces a veces?", starter: "We sometimes…", starterEs: "A veces nosotros…" },
    { id: "d1-p7", question: "What do other people do at your job?", questionEs: "¿Qué hacen las otras personas en tu trabajo?", starter: "They…", starterEs: "Ellos…" },
    { id: "d1-p8", question: "What do you like about your routine? Why?", questionEs: "¿Qué te gusta de tu rutina? ¿Por qué?", starter: "I like ______ because…", starterEs: "Me gusta ______ porque…" },
  ],
  cues: ["ROUTINE", "WORK", "WE / THEY", "BECAUSE", "CONCLUSION"],
  rep5Prompt: {
    question: "What is your daily routine? / What do you do every day?",
    questionEs: "¿Cuál es tu rutina diaria? / ¿Qué haces todos los días?",
  },
  modelExample: {
    text: "I usually wake up around six thirty. I have breakfast at home before I start work. I start work at eight and I talk to customers every day. My coworkers and I usually have lunch together. We sometimes have very busy mornings. I like my job because I learn something new every week. Overall, I really enjoy my routine.",
    es: "Normalmente me levanto como a las seis y media. Desayuno en casa antes de empezar a trabajar. Empiezo a trabajar a las ocho y hablo con clientes todos los días. Mis compañeros y yo normalmente almorzamos juntos. A veces tenemos mañanas muy ocupadas. Me gusta mi trabajo porque aprendo algo nuevo cada semana. En general, disfruto mucho mi rutina.",
  },
};

const day2: CourseDay = {
  day: 2,
  focus: "He / She",
  focusEs: "Él / Ella",
  topic: "Someone I Know",
  topicEs: "Alguien que conozco",
  goalSeconds: GOAL,
  estimatedMinutes: "5–8 min",
  intro: {
    title: "HE / SHE",
    titleEs: "ÉL / ELLA",
    lead: "Today we'll practice talking about another person.",
    leadEs: "Hoy vamos a practicar hablar de otra persona.",
    examples: ["He works.", "She works."],
    goal: "Speak for 35–45 seconds about another person.",
    goalEs: "Habla 35–45 segundos sobre otra persona.",
    cta: "START REP 1",
  },
  lines: [
    line("d2-1", "My sister works from home.", "Mi hermana trabaja desde casa.", ["My sister", "works from home."]),
    line("d2-2", "She usually starts work around seven.", "Ella normalmente empieza a trabajar como a las siete.", ["She usually starts work", "around seven."]),
    line("d2-3", "She talks to customers every day.", "Ella habla con clientes todos los días.", ["She talks to customers", "every day."]),
    line("d2-4", "My brother works in an office near his house.", "Mi hermano trabaja en una oficina cerca de su casa.", ["My brother works in an office", "near his house."]),
    line("d2-5", "He usually starts at eight.", "Él normalmente empieza a las ocho.", ["He usually starts", "at eight."]),
    line("d2-6", "She likes her job because it is flexible.", "A ella le gusta su trabajo porque es flexible.", ["She likes her job", "because it is flexible."]),
    line("d2-7", "He sometimes works late because his team is busy.", "Él a veces trabaja hasta tarde porque su equipo está ocupado.", ["He sometimes works late", "because his team is busy."]),
    line("d2-8", "Overall, they both enjoy their routines.", "En general, los dos disfrutan sus rutinas.", ["Overall,", "they both enjoy their routines."]),
  ],
  prompts: [
    { id: "d2-p1", question: "Tell me about someone you know.", questionEs: "Háblame de alguien que conoces.", starter: "My ______ works…", starterEs: "Mi ______ trabaja…" },
    { id: "d2-p2", question: "Where does he / she work?", questionEs: "¿Dónde trabaja él / ella?", starter: "He works… / She works…", starterEs: "Él trabaja… / Ella trabaja…" },
    { id: "d2-p3", question: "What time does he / she start?", questionEs: "¿A qué hora empieza él / ella?", starter: "He starts…", starterEs: "Él empieza…" },
    { id: "d2-p4", question: "What does he / she usually do?", questionEs: "¿Qué hace él / ella normalmente?", starter: "She usually…", starterEs: "Ella normalmente…" },
    { id: "d2-p5", question: "What does he / she sometimes do?", questionEs: "¿Qué hace él / ella a veces?", starter: "He sometimes…", starterEs: "Él a veces…" },
    { id: "d2-p6", question: "Why does he / she like the job?", questionEs: "¿Por qué le gusta el trabajo?", starter: "She likes it because…", starterEs: "Le gusta porque…" },
    { id: "d2-p7", question: "How would you finish?", questionEs: "¿Cómo terminarías?", starter: "Overall…", starterEs: "En general…" },
  ],
  cues: ["HE / SHE", "WORK", "USUALLY", "BECAUSE", "CONCLUSION"],
  rep5Prompt: {
    question: "Tell me about someone you know. What does he / she do every day?",
    questionEs: "Háblame de alguien que conoces. ¿Qué hace él / ella todos los días?",
  },
  modelExample: {
    text: "My sister works from home. She usually starts work around seven. She talks to customers every day. She likes her job because it is flexible. She sometimes works late because her team is busy. Overall, she really enjoys her routine.",
    es: "Mi hermana trabaja desde casa. Ella normalmente empieza a trabajar como a las siete. Habla con clientes todos los días. Le gusta su trabajo porque es flexible. A veces trabaja hasta tarde porque su equipo está ocupado. En general, disfruta mucho su rutina.",
  },
};

const day3: CourseDay = {
  day: 3,
  focus: "Don't / Doesn't",
  focusEs: "Don't / Doesn't (negativos)",
  topic: "Things We Do and Don't Do",
  topicEs: "Lo que hacemos y no hacemos",
  goalSeconds: GOAL,
  estimatedMinutes: "5–8 min",
  intro: {
    title: "NEGATIVES",
    titleEs: "NEGATIVOS",
    lead: "Listen to the contrast.",
    leadEs: "Escucha el contraste.",
    examples: ["I don't work on Sundays.", "She doesn't work on Sundays."],
    goal: "Speak for 35–45 seconds using don't and doesn't.",
    goalEs: "Habla 35–45 segundos usando don't y doesn't.",
    cta: "START REP 1",
  },
  lines: [
    line("d3-1", "I usually start work at eight.", "Normalmente empiezo a trabajar a las ocho.", ["I usually start work", "at eight."]),
    line("d3-2", "I don't start work late.", "No empiezo a trabajar tarde.", ["I don't start work", "late."]),
    line("d3-3", "We usually eat lunch together.", "Normalmente almorzamos juntos.", ["We usually eat lunch", "together."]),
    line("d3-4", "We don't eat at our desks because we like to take a break.", "No comemos en nuestros escritorios porque nos gusta tomar un descanso.", ["We don't eat at our desks", "because we like", "to take a break."]),
    line("d3-5", "My sister works from home.", "Mi hermana trabaja desde casa.", ["My sister", "works from home."]),
    line("d3-6", "She doesn't work on Fridays.", "Ella no trabaja los viernes.", ["She doesn't work", "on Fridays."]),
    line("d3-7", "My brother drinks coffee in the morning, but he doesn't drink it at night.", "Mi hermano toma café en la mañana, pero no lo toma en la noche.", ["My brother drinks coffee", "in the morning,", "but he doesn't drink it", "at night."]),
    line("d3-8", "Overall, we all have different routines.", "En general, todos tenemos rutinas diferentes.", ["Overall,", "we all have", "different routines."]),
  ],
  prompts: [
    { id: "d3-p1", question: "What do you usually do?", questionEs: "¿Qué haces normalmente?", starter: "I usually…", starterEs: "Normalmente yo…" },
    { id: "d3-p2", question: "What don't you do?", questionEs: "¿Qué no haces?", starter: "I don't…", starterEs: "Yo no…" },
    { id: "d3-p3", question: "What do you do at work?", questionEs: "¿Qué haces en el trabajo?", starter: "We usually…", starterEs: "Nosotros normalmente…" },
    { id: "d3-p4", question: "What don't you do at work?", questionEs: "¿Qué no haces en el trabajo?", starter: "We don't…", starterEs: "Nosotros no…" },
    { id: "d3-p5", question: "Tell me something another person does.", questionEs: "Dime algo que hace otra persona.", starter: "My ______ works…", starterEs: "Mi ______ trabaja…" },
    { id: "d3-p6", question: "Tell me something he / she doesn't do.", questionEs: "Dime algo que él / ella no hace.", starter: "He doesn't… / She doesn't…", starterEs: "Él no… / Ella no…" },
    { id: "d3-p7", question: "How would you finish?", questionEs: "¿Cómo terminarías?", starter: "Overall…", starterEs: "En general…" },
  ],
  cues: ["I DON'T", "WE DON'T", "HE / SHE DOESN'T", "BECAUSE", "CONCLUSION"],
  rep5Prompt: {
    question: "What do you do — and what don't you do?",
    questionEs: "¿Qué haces — y qué no haces?",
  },
  modelExample: {
    text: "I usually start work at eight. I don't start work late. We usually eat lunch together, but we don't eat at our desks because we like to take a break. My sister works from home, but she doesn't work on Fridays. Overall, we all have different routines.",
    es: "Normalmente empiezo a trabajar a las ocho. No empiezo a trabajar tarde. Normalmente almorzamos juntos, pero no comemos en nuestros escritorios porque nos gusta tomar un descanso. Mi hermana trabaja desde casa, pero no trabaja los viernes. En general, todos tenemos rutinas diferentes.",
  },
};

const day4: CourseDay = {
  day: 4,
  focus: "Do / Does Questions",
  focusEs: "Preguntas con Do / Does",
  topic: "Ask & Answer",
  topicEs: "Preguntar y responder",
  goalSeconds: GOAL,
  estimatedMinutes: "5–8 min",
  intro: {
    title: "QUESTIONS",
    titleEs: "PREGUNTAS",
    lead: "Today we ask and answer.",
    leadEs: "Hoy preguntamos y respondemos.",
    examples: ["Do you work?", "Does she work?"],
    goal: "Speak for 35–45 seconds asking and answering.",
    goalEs: "Habla 35–45 segundos preguntando y respondiendo.",
    cta: "START REP 1",
  },
  lines: [
    line("d4-1q", "Do you work on Saturdays?", "¿Trabajas los sábados?", ["Do you work", "on Saturdays?"], "q"),
    line("d4-1a", "No, I don't. I usually rest on Saturdays.", "No. Normalmente descanso los sábados.", ["No, I don't.", "I usually rest", "on Saturdays."], "a"),
    line("d4-2q", "Where do you work?", "¿Dónde trabajas?", ["Where do you work?"], "q"),
    line("d4-2a", "I work at a call center.", "Trabajo en un call center.", ["I work", "at a call center."], "a"),
    line("d4-3q", "What time do you start work?", "¿A qué hora empiezas a trabajar?", ["What time", "do you start work?"], "q"),
    line("d4-3a", "I usually start at eight.", "Normalmente empiezo a las ocho.", ["I usually start", "at eight."], "a"),
    line("d4-4q", "Do you like your job?", "¿Te gusta tu trabajo?", ["Do you like", "your job?"], "q"),
    line("d4-4a", "Yes, I do, because I learn new things.", "Sí, porque aprendo cosas nuevas.", ["Yes, I do,", "because I learn new things."], "a"),
    line("d4-5q", "Does your sister work from home?", "¿Tu hermana trabaja desde casa?", ["Does your sister", "work from home?"], "q"),
    line("d4-5a", "Yes, she does. She works from home three days a week.", "Sí. Trabaja desde casa tres días a la semana.", ["Yes, she does.", "She works from home", "three days a week."], "a"),
    line("d4-6q", "Where does your brother work?", "¿Dónde trabaja tu hermano?", ["Where does", "your brother work?"], "q"),
    line("d4-6a", "He works in an office.", "Trabaja en una oficina.", ["He works", "in an office."], "a"),
    line("d4-7q", "What time does she start?", "¿A qué hora empieza ella?", ["What time", "does she start?"], "q"),
    line("d4-7a", "She usually starts around seven.", "Ella normalmente empieza como a las siete.", ["She usually starts", "around seven."], "a"),
    line("d4-8q", "Does he work on weekends?", "¿Él trabaja los fines de semana?", ["Does he work", "on weekends?"], "q"),
    line("d4-8a", "No, he doesn't. He works Monday to Friday.", "No. Trabaja de lunes a viernes.", ["No, he doesn't.", "He works", "Monday to Friday."], "a"),
  ],
  prompts: [
    { id: "d4-p1", question: "What time do you usually start work?", questionEs: "¿A qué hora empiezas a trabajar normalmente?", starter: "I usually start…", starterEs: "Normalmente empiezo…" },
    { id: "d4-p2", question: "Do you work on weekends?", questionEs: "¿Trabajas los fines de semana?", starter: "Yes, I do… / No, I don't…", starterEs: "Sí… / No…" },
    { id: "d4-p3", question: "Where do you work or study?", questionEs: "¿Dónde trabajas o estudias?", starter: "I work…", starterEs: "Yo trabajo…" },
    { id: "d4-p4", question: "Does someone in your family work from home?", questionEs: "¿Alguien de tu familia trabaja desde casa?", starter: "Yes, she does… / No, he doesn't…", starterEs: "Sí… / No…" },
    { id: "d4-p5", question: "ASK A QUESTION USING DO", questionEs: "HAZ UNA PREGUNTA CON DO", starter: "Do you…?", starterEs: "¿Tú…?" },
    { id: "d4-p6", question: "ASK A QUESTION USING DOES", questionEs: "HAZ UNA PREGUNTA CON DOES", starter: "Does he / she…?", starterEs: "¿Él / Ella…?" },
  ],
  cues: ["DO YOU…?", "DOES HE / SHE…?", "YES, I DO", "NO, HE DOESN'T", "BECAUSE"],
  rep5Prompt: {
    question: "What do you do every day? Ask and answer your own questions.",
    questionEs: "¿Qué haces todos los días? Pregúntate y respóndete.",
  },
  modelExample: {
    text: "Do I work on Saturdays? No, I don't. I usually rest on Saturdays. Where do I work? I work at a call center. What time do I start? I usually start at eight. Do I like my job? Yes, I do, because I learn new things. Does my sister work from home? Yes, she does. She works from home three days a week.",
    es: "¿Trabajo los sábados? No. Normalmente descanso los sábados. ¿Dónde trabajo? Trabajo en un call center. ¿A qué hora empiezo? Normalmente empiezo a las ocho. ¿Me gusta mi trabajo? Sí, porque aprendo cosas nuevas. ¿Mi hermana trabaja desde casa? Sí. Trabaja desde casa tres días a la semana.",
  },
};

const day5: CourseDay = {
  day: 5,
  focus: "Fluency Challenge",
  focusEs: "Reto de fluidez",
  topic: "Simple Present Fluency Challenge",
  topicEs: "Reto de fluidez de presente simple",
  goalSeconds: GOAL,
  estimatedMinutes: "6–10 min",
  intro: {
    title: "SIMPLE PRESENT CHALLENGE",
    titleEs: "RETO DE PRESENTE SIMPLE",
    lead: "Use everything you practiced this week.",
    leadEs: "Usa todo lo que practicaste esta semana.",
    examples: ["I usually…", "She doesn't…", "Do you…?"],
    goal: "Speak for 35–45 seconds in each challenge.",
    goalEs: "Habla 35–45 segundos en cada reto.",
    cta: "START CHALLENGE",
  },
  lines: [
    line("d5-1", "I usually start my day early.", "Normalmente empiezo mi día temprano.", ["I usually start", "my day early."]),
    line("d5-2", "We don't have the same schedule every day.", "No tenemos el mismo horario todos los días.", ["We don't have", "the same schedule", "every day."]),
    line("d5-3", "My manager works from home twice a week.", "Mi jefe trabaja desde casa dos veces por semana.", ["My manager works from home", "twice a week."]),
    line("d5-4", "She usually starts before the rest of the team.", "Ella normalmente empieza antes que el resto del equipo.", ["She usually starts", "before the rest of the team."]),
    line("d5-5", "My brother doesn't work on Saturdays.", "Mi hermano no trabaja los sábados.", ["My brother doesn't work", "on Saturdays."]),
    line("d5-6", "I like my routine because it keeps me busy.", "Me gusta mi rutina porque me mantiene ocupado.", ["I like my routine", "because it keeps me busy."]),
    line("d5-7", "Do you usually work in the morning?", "¿Normalmente trabajas en la mañana?", ["Do you usually work", "in the morning?"], "q"),
    line("d5-8", "Does your manager work from home?", "¿Tu jefe trabaja desde casa?", ["Does your manager", "work from home?"], "q"),
    line("d5-9", "They sometimes work late because their customers need help.", "Ellos a veces trabajan tarde porque sus clientes necesitan ayuda.", ["They sometimes work late", "because their customers", "need help."]),
    line("d5-10", "Overall, our routines are different, but they work well for us.", "En general, nuestras rutinas son diferentes, pero nos funcionan bien.", ["Overall, our routines are different,", "but they work well for us."]),
  ],
  prompts: [
    { id: "d5-p1", question: "Talk about your routine.", questionEs: "Habla de tu rutina.", starter: "I usually…", starterEs: "Normalmente yo…" },
    { id: "d5-p2", question: "Say something you don't do.", questionEs: "Di algo que no haces.", starter: "I don't…", starterEs: "Yo no…" },
    { id: "d5-p3", question: "Talk about someone else.", questionEs: "Habla de otra persona.", starter: "He / She usually…", starterEs: "Él / Ella normalmente…" },
    { id: "d5-p4", question: "Say something he / she doesn't do.", questionEs: "Di algo que él / ella no hace.", starter: "She doesn't…", starterEs: "Ella no…" },
    { id: "d5-p5", question: "Ask a question with DO.", questionEs: "Haz una pregunta con DO.", starter: "Do you…?", starterEs: "¿Tú…?" },
    { id: "d5-p6", question: "Ask a question with DOES.", questionEs: "Haz una pregunta con DOES.", starter: "Does he / she…?", starterEs: "¿Él / Ella…?" },
  ],
  cues: ["ROUTINE", "HE / SHE", "DON'T / DOESN'T", "DO / DOES?", "BECAUSE"],
  rep5Prompt: {
    question: "What is your daily routine? / What do you do every day?",
    questionEs: "¿Cuál es tu rutina diaria? / ¿Qué haces todos los días?",
  },
  challenges: [
    {
      id: "c1",
      title: "TALK ABOUT YOUR ROUTINE",
      titleEs: "HABLA DE TU RUTINA",
      detail: "35–45 seconds. Use affirmatives, negatives, frequency words and because.",
      detailEs: "35–45 segundos. Usa afirmativos, negativos, palabras de frecuencia y because.",
      cues: ["I USUALLY", "I DON'T", "SOMETIMES", "BECAUSE"],
    },
    {
      id: "c2",
      title: "TALK ABOUT SOMEONE ELSE",
      titleEs: "HABLA DE OTRA PERSONA",
      detail: "35–45 seconds. Use He / She, third-person -S, doesn't and because.",
      detailEs: "35–45 segundos. Usa He / She, la -S de tercera persona, doesn't y because.",
      cues: ["HE / SHE", "WORKS", "DOESN'T", "BECAUSE"],
    },
    {
      id: "c3",
      title: "QUESTIONS & ANSWERS",
      titleEs: "PREGUNTAS Y RESPUESTAS",
      detail: "Ask and answer with Do and Does.",
      detailEs: "Pregunta y responde con Do y Does.",
      cues: ["DO YOU…?", "DOES HE…?", "YES, I DO", "NO, SHE DOESN'T"],
    },
  ],
  
  modelExample: {
    text: "I usually start my day early. We don't have the same schedule every day. My manager works from home twice a week. She usually starts before the rest of the team. My brother doesn't work on Saturdays. I like my routine because it keeps me busy. Overall, our routines are different, but they work well for us.",
    es: "Normalmente empiezo mi día temprano. No tenemos el mismo horario todos los días. Mi jefa trabaja desde casa dos veces por semana. Ella normalmente empieza antes que el resto del equipo. Mi hermano no trabaja los sábados. Me gusta mi rutina porque me mantiene ocupado. En general, nuestras rutinas son diferentes, pero nos funcionan bien.",
  },
};

const DAYS: CourseDay[] = [day1, day2, day3, day4, day5];

export type LearningModule = {
  id: ModuleId;
  order: number;
  label: string;
  title: string;
  subtitle: string;
  subtitleEs: string;
  description: string;
  descriptionEs: string;
  meta: string[];
  days: CourseDay[];
  weeks?: { week: 1 | 2 | 3 | 4; title: string; subtitle: string; subtitleEs: string }[];
};

const MODULES: LearningModule[] = [
  {
    id: "basic-zero",
    order: 1,
    label: "MODULE 1 · MONTH 1",
    title: "BASIC ZERO",
    subtitle: "Introduce Yourself & Someone Else",
    subtitleEs: "Preséntate y habla de otra persona",
    description: "Build your first English speaking foundation.",
    descriptionEs: "Construye tu primera base para hablar inglés.",
    meta: ["4 Weeks", "20 Days", "5 Fluency Reps per Day"],
    days: BASIC_ZERO_DAYS,
    weeks: BASIC_ZERO_WEEKS,
  },
  {
    id: "simple-present",
    order: 2,
    label: "MODULE 2",
    title: "SIMPLE PRESENT",
    subtitle: "Routines, He/She, Negatives & Questions",
    subtitleEs: "Rutinas, He/She, negativos y preguntas",
    description: "5-Day Fluency Journey.",
    descriptionEs: "Viaje de fluidez de 5 días.",
    meta: ["1 Week", "5 Days", "5 Fluency Reps per Day"],
    days: DAYS,
  },
];

export const DEFAULT_MODULE: ModuleId = "basic-zero";

export function isModuleId(value: unknown): value is ModuleId {
  return value === "basic-zero" || value === "simple-present";
}

export const CourseService = {
  modules(): LearningModule[] {
    return MODULES;
  },

  getModule(moduleId: ModuleId): LearningModule {
    return MODULES.find((m) => m.id === moduleId) ?? MODULES[0]!;
  },

  totalDays(moduleId: ModuleId): number {
    return CourseService.getModule(moduleId).days.length;
  },

  getDays(moduleId: ModuleId): CourseDay[] {
    return CourseService.getModule(moduleId).days;
  },

  getDay(moduleId: ModuleId, day: number): CourseDay {
    const days = CourseService.getDays(moduleId);
    return days.find((d) => d.day === day) ?? days[0]!;
  },

  /** Full model text for the day (used by the model voice). */
  getModelText(day: CourseDay): string {
    return day.lines.map((l) => l.text).join(" ");
  },
};

