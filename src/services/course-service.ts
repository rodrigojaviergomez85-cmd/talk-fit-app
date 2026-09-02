import type { CourseDay, ModelLine, ModuleId } from "@/lib/types";
import { BASIC_ZERO_DAYS, BASIC_ZERO_WEEKS } from "./basic-zero-course";
import { SIMPLE_PRESENT_EXTRA_DAYS, SIMPLE_PRESENT_WEEKS } from "./simple-present-course";
import { PAST_STORIES_DAYS, PAST_STORIES_WEEKS } from "./past-stories-course";
import { SIMPLE_FUTURE_DAYS, SIMPLE_FUTURE_WEEKS } from "./simple-future-course";
import { MIXED_TENSES_DAYS, MIXED_TENSES_WEEKS } from "./mixed-tenses-course";
import { EAGLES_WEEK_1_DAYS, EAGLES_WEEK_1_WEEKS } from "./eagles-week-1-course";
import { EAGLES_WEEKS_2_4_DAYS } from "./eagles-weeks-2-4-course";
import { TIGERS_WEEK_1_DAYS, TIGERS_WEEKS } from "./tigers-week-1-course";
import { TIGERS_WEEKS_2_4_DAYS } from "./tigers-weeks-2-4-course";
import { SHARKS_WEEK_1_DAYS, SHARKS_WEEKS } from "./sharks-week-1-course";
import { SHARKS_WEEKS_2_4_DAYS } from "./sharks-weeks-2-4-course";
import { ADVANCED_1_WEEK_1_DAYS, ADVANCED_1_WEEKS } from "./advanced-1-week-1-course";



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
    { id: "d1-p1", cue: "WHEN", question: "When do you usually wake up and start work?", questionEs: "¿Cuándo te levantas y empiezas a trabajar normalmente?", starter: "I usually wake up at… and I start…", starterEs: "Normalmente me levanto a las… y empiezo…" },
    { id: "d1-p3", cue: "WHERE", question: "Where do you work and what do you usually do there?", questionEs: "¿Dónde trabajas y qué haces normalmente ahí?", starter: "I work at… I usually…", starterEs: "Trabajo en… Normalmente…" },
    { id: "d1-p5", cue: "WHO", question: "Who do you work with and what do you do together?", questionEs: "¿Con quién trabajas y qué hacen juntos?", starter: "We usually…", starterEs: "Nosotros normalmente…" },
    { id: "d1-p7", cue: "WHAT", question: "What do other people do at your job?", questionEs: "¿Qué hacen las otras personas en tu trabajo?", starter: "They…", starterEs: "Ellos…" },
    { id: "d1-p8", cue: "WHY", question: "Why do you like your routine?", questionEs: "¿Por qué te gusta tu rutina?", starter: "I like ______ because…", starterEs: "Me gusta ______ porque…" },
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
    { id: "d2-p1", cue: "WHO", question: "Who is someone you know, and where does he / she work?", questionEs: "¿Quién es alguien que conoces y dónde trabaja?", starter: "My ______ works at…", starterEs: "Mi ______ trabaja en…" },
    { id: "d2-p3", cue: "WHEN", question: "When does he / she start and finish?", questionEs: "¿Cuándo empieza y termina él / ella?", starter: "He starts at… and finishes…", starterEs: "Él empieza a las… y termina…" },
    { id: "d2-p4", cue: "WHAT", question: "What does he / she usually do at work?", questionEs: "¿Qué hace él / ella normalmente en el trabajo?", starter: "She usually…", starterEs: "Ella normalmente…" },
    { id: "d2-p5", cue: "HOW OFTEN", question: "How often does he / she do something different?", questionEs: "¿Con qué frecuencia hace algo diferente?", starter: "He sometimes… / Twice a week, she…", starterEs: "Él a veces… / Dos veces por semana, ella…" },
    { id: "d2-p6", cue: "WHY", question: "Why does he / she like the job?", questionEs: "¿Por qué le gusta el trabajo?", starter: "She likes it because…", starterEs: "Le gusta porque…" },
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
    { id: "d3-p1", cue: "WHAT", question: "What do you usually do, and what don't you do?", questionEs: "¿Qué haces normalmente y qué no haces?", starter: "I usually… but I don't…", starterEs: "Normalmente yo… pero no…" },
    { id: "d3-p3", cue: "WHERE", question: "Where do you work, and what don't you do there?", questionEs: "¿Dónde trabajas y qué no haces ahí?", starter: "We usually… We don't…", starterEs: "Nosotros normalmente… No…" },
    { id: "d3-p5", cue: "WHO", question: "Who has a different routine? What does he / she do?", questionEs: "¿Quién tiene una rutina diferente? ¿Qué hace él / ella?", starter: "My ______ works… He / She doesn't…", starterEs: "Mi ______ trabaja… Él / Ella no…" },
    { id: "d3-p7", cue: "WHY", question: "Why don't you do something? Finish with overall.", questionEs: "¿Por qué no haces algo? Termina con overall.", starter: "I don't… because… Overall…", starterEs: "No… porque… En general…" },
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
    { id: "d4-p1", cue: "WHEN", question: "When do you work? Do you work on weekends?", questionEs: "¿Cuándo trabajas? ¿Trabajas los fines de semana?", starter: "I usually start at… No, I don't… / Yes, I do…", starterEs: "Normalmente empiezo a las… No… / Sí…" },
    { id: "d4-p3", cue: "WHERE", question: "Where do you work or study, and why do you like it?", questionEs: "¿Dónde trabajas o estudias y por qué te gusta?", starter: "I work at… I like it because…", starterEs: "Trabajo en… Me gusta porque…" },
    { id: "d4-p4", cue: "WHO", question: "Who in your family works from home? Does he / she like it?", questionEs: "¿Quién de tu familia trabaja desde casa? ¿Le gusta?", starter: "My ______ works from home. Yes, she does… / No, he doesn't…", starterEs: "Mi ______ trabaja desde casa. Sí… / No…" },
    { id: "d4-p5", cue: "ASK", question: "Ask a question using DO, then answer it.", questionEs: "Haz una pregunta con DO y respóndela.", starter: "Do you…? Yes, I do… / No, I don't…", starterEs: "¿Tú…? Sí… / No…" },
    { id: "d4-p6", cue: "ASK", question: "Ask a question using DOES, then answer it.", questionEs: "Haz una pregunta con DOES y respóndela.", starter: "Does he / she…? Yes, she does… / No, he doesn't…", starterEs: "¿Él / Ella…? Sí… / No…" },
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
    { id: "d5-p1", cue: "WHAT", question: "What is your daily routine, and what don't you do?", questionEs: "¿Cuál es tu rutina diaria y qué no haces?", starter: "I usually… I don't…", starterEs: "Normalmente yo… No…" },
    { id: "d5-p3", cue: "WHO", question: "Who has a different routine? What does he / she do and not do?", questionEs: "¿Quién tiene una rutina diferente? ¿Qué hace y qué no hace?", starter: "My ______ usually… She doesn't…", starterEs: "Mi ______ normalmente… Ella no…" },
    { id: "d5-p5", cue: "HOW OFTEN", question: "How often do you do something different? Why?", questionEs: "¿Con qué frecuencia haces algo diferente? ¿Por qué?", starter: "I sometimes… because…", starterEs: "A veces yo… porque…" },
    { id: "d5-p6", cue: "ASK", question: "Ask one question with DO or DOES, then answer it.", questionEs: "Haz una pregunta con DO o DOES y respóndela.", starter: "Do you…? / Does she…?", starterEs: "¿Tú…? / ¿Ella…?" },
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

const WEEK_1 = SIMPLE_PRESENT_WEEKS[0]!;

/** Week 1 (Days 1–5) exactly as built, tagged so Home can group it by week. */
const WEEK_1_DAYS: CourseDay[] = [day1, day2, day3, day4, day5].map((d) => ({
  ...d,
  week: 1 as const,
  weekTitle: WEEK_1.title,
  weekTitleEs: WEEK_1.subtitleEs,
}));

const DAYS: CourseDay[] = [...WEEK_1_DAYS, ...SIMPLE_PRESENT_EXTRA_DAYS];

export type LearningModule = {
  /** Internal identity — used by progress, sessions and recordings. NEVER change. */
  id: ModuleId;
  /** Display order only. Never used to decide where a learner is. */
  order: number;
  /** Level caps shown above the title (e.g. "BASIC 2", "INTERMEDIO"). */
  label: string;
  /** Large display title (e.g. "SIMPLE PRESENT", "EAGLES"). */
  title: string;
  subtitle: string;
  subtitleEs: string;
  /** Small status line under the secondary text (e.g. "Semana 1 · 5 días"). */
  statusLine?: { en: string; es: string };
  description: string;
  descriptionEs: string;
  meta: string[];
  highlights?: { en: string; es: string }[];
  days: CourseDay[];
  weeks?: { week: 1 | 2 | 3 | 4; title: string; subtitle: string; subtitleEs: string }[];
  /** Standalone pilot: never auto-placed as the learner's "next" module. */
  pilot?: boolean;
  /** Not offered in self-placement: reached by finishing the previous module (or changing level later). */
  hiddenFromPlacement?: boolean;
  /** Extra line shown on the module intro (e.g. Test Ready Sprints). */
  extra?: { en: string; es: string };
  /** Module card CTA override. */
  cta?: { en: string; es: string };
  /**
   * ADVANCED family: cyclical, equivalent modules (A1 → A2 → A3 → A1). A learner
   * may enter at any cycle position — never a proficiency prerequisite.
   */
  family?: "advanced";
  cyclePosition?: number;
  /** Weeks actually built so far (out of 4). Below 4 = partial module: no "module complete" moment. */
  builtWeeks?: number;
};

/**
 * Presentation metadata only. Internal ids are frozen (see ModuleId); the
 * `order` here is the visual journey order and can change freely.
 */
const MODULES: LearningModule[] = [
  {
    id: "basic-zero",
    order: 1,
    label: "BASIC ZERO",
    title: "INTRODUCE YOURSELF & SOMEONE ELSE",
    subtitle: "Introduce Yourself & Someone Else",
    subtitleEs: "Preséntate y habla de otra persona",
    description: "Build your first English speaking foundation.",
    descriptionEs: "Construye tu primera base para hablar inglés.",
    meta: ["4 Weeks", "20 Days", "5 Fluency Reps per Day"],
    days: BASIC_ZERO_DAYS,
    weeks: BASIC_ZERO_WEEKS,
  },
  {
    id: "simple-future",
    order: 2,
    label: "BASIC 1",
    title: "SIMPLE FUTURE",
    subtitle: "Plans, Other People, Decisions & Predictions",
    subtitleEs: "Planes, otras personas, decisiones y predicciones",
    description: "Talk about plans, decisions and predictions.",
    descriptionEs: "Habla de planes, decisiones y predicciones.",
    meta: ["4 Weeks", "20 Days", "5 Fluency Reps per Day"],
    days: SIMPLE_FUTURE_DAYS,
    weeks: SIMPLE_FUTURE_WEEKS,
  },
  {
    id: "simple-present",
    order: 3,
    label: "BASIC 2",
    title: "SIMPLE PRESENT",
    subtitle: "Routines · Habits · Actions happening now",
    subtitleEs: "Rutinas · Hábitos · Acciones de ahora",
    description: "4-Week Fluency Journey.",
    descriptionEs: "Viaje de fluidez de 4 semanas.",
    meta: ["4 Weeks", "20 Days", "5 Fluency Reps per Day"],
    days: DAYS,
    weeks: SIMPLE_PRESENT_WEEKS,
  },
  {
    id: "past-stories",
    order: 4,
    label: "BASIC 3",
    title: "SIMPLE PAST",
    subtitle: "Past Experiences & Stories",
    subtitleEs: "Experiencias pasadas e historias",
    description: "Talk about the past and tell a complete story.",
    descriptionEs: "Habla del pasado y cuenta una historia completa.",
    meta: ["4 Weeks", "20 Days", "5 Fluency Reps per Day"],
    days: PAST_STORIES_DAYS,
    weeks: PAST_STORIES_WEEKS,
  },
  {
    id: "mixed-tenses",
    order: 5,
    label: "BASIC 4",
    title: "MIXED TENSES & QUESTIONS",
    subtitle: "Past · Present · Future · Questions — without freezing",
    subtitleEs: "Habla del pasado, presente y futuro — sin trabarte",
    description: "Move between past, present, future and questions in real conversation.",
    descriptionEs: "Cambia entre pasado, presente, futuro y preguntas en una conversación real.",
    meta: ["4 Weeks", "20 Days", "5 Fluency Reps per Day"],
    highlights: [
      { en: "Talk about what you do", es: "Hablar de lo que haces" },
      { en: "Tell what happened", es: "Contar lo que pasó" },
      { en: "Talk about your plans", es: "Hablar de tus planes" },
      { en: "Ask and answer questions", es: "Hacer y responder preguntas" },
      { en: "Switch tenses while you speak", es: "Cambiar de tiempo al hablar" },
    ],
    days: MIXED_TENSES_DAYS,
    weeks: MIXED_TENSES_WEEKS,
  },
  {
    // Internal id is frozen: learners already have progress and recordings keyed to it.
    id: "eagles-week-1",
    order: 6,
    label: "INTERMEDIO",
    title: "EAGLES",
    subtitle: "English for Work & Real Conversation",
    subtitleEs: "Inglés para el trabajo y conversación real",
    statusLine: { en: "4 weeks · 20 days", es: "4 semanas · 20 días" },
    description: "Connect your ideas, solve problems, compare options and adapt when the situation changes.",
    descriptionEs: "Conecta tus ideas, resuelve problemas, compara opciones y adáptate cuando la situación cambia.",
    meta: ["4 Weeks", "20 Days", "100 Fluency Reps", "Test Ready Sprints"],
    highlights: [
      { en: "Connect your ideas with reasons and details", es: "Conectar tus ideas con razones y detalles" },
      { en: "Explain experiences and decisions", es: "Explicar experiencias y decisiones" },
      { en: "Compare options and justify your choice", es: "Comparar opciones y justificar tu elección" },
      { en: "Solve customer service situations", es: "Resolver situaciones de servicio al cliente" },
      { en: "Recommend, handle objections and close", es: "Recomendar, manejar objeciones y cerrar" },
      { en: "Respond with less preparation", es: "Responder con menos preparación" },
    ],
    extra: {
      en: "⚡ 20 TEST READY SPRINTS — practice listening and speaking under pressure.",
      es: "⚡ 20 TEST READY SPRINTS — para practicar listening y speaking bajo presión.",
    },
    cta: { en: "START EAGLES", es: "EMPEZAR EAGLES" },
    pilot: true,
    days: [...EAGLES_WEEK_1_DAYS, ...EAGLES_WEEKS_2_4_DAYS],
    weeks: EAGLES_WEEK_1_WEEKS,
  },
  {
    // Internal id is frozen from day one: progress and recordings will be keyed to it.
    id: "tigers",
    order: 7,
    label: "INTERMEDIO",
    title: "TIGERS",
    subtitle: "Explain, Defend & Respond",
    subtitleEs: "Explica, defiende y responde",
    statusLine: { en: "Month 2 · 4 weeks · 20 days", es: "Mes 2 · 4 semanas · 20 días" },
    description: "Don't just answer. Explain why, give evidence, compare alternatives and defend your decision.",
    descriptionEs: "No solo respondas. Explica por qué, da evidencia, compara alternativas y defiende tu decisión.",
    meta: ["4 Weeks", "20 Days", "100 Fluency Reps", "12 Test Ready Sprints"],
    highlights: [
      { en: "Explain why, not just what", es: "Explicar por qué, no solo qué" },
      { en: "Give examples and evidence", es: "Dar ejemplos y evidencia" },
      { en: "Compare options and trade-offs", es: "Comparar opciones y sus costos" },
      { en: "Pass a job interview in English", es: "Pasar una entrevista de trabajo en inglés" },
      { en: "Negotiate and respond to objections", es: "Negociar y responder a objeciones" },
      { en: "Defend a decision under pressure", es: "Defender una decisión bajo presión" },
    ],
    extra: {
      en: "⚡ 12 TEST READY SPRINTS — longer audio, two-speaker conversations, interview responses.",
      es: "⚡ 12 TEST READY SPRINTS — audios más largos, conversaciones a dos voces, respuestas de entrevista.",
    },
    cta: { en: "START TIGERS", es: "EMPEZAR TIGERS" },
    hiddenFromPlacement: true,
    days: [...TIGERS_WEEK_1_DAYS, ...TIGERS_WEEKS_2_4_DAYS],
    weeks: TIGERS_WEEKS,
  },
  {
    // Internal id is frozen from day one: progress and recordings will be keyed to it.
    id: "sharks",
    order: 8,
    label: "INTERMEDIO",
    title: "SHARKS",
    subtitle: "Adapt, Improvise & Keep the Conversation Going",
    subtitleEs: "Adáptate, improvisa y mantén la conversación",
    statusLine: { en: "Month 3 · 4 weeks · 20 days", es: "Mes 3 · 4 semanas · 20 días" },
    description: "Respond when you don't know what's coming: react fast, clarify, rephrase, change your mind and keep talking under pressure.",
    descriptionEs: "Responde cuando no sabes qué viene: reacciona rápido, aclara, reformula, cambia de opinión y sigue hablando bajo presión.",
    meta: ["4 Weeks", "20 Days", "100 Fluency Reps", "12 Test Ready Sprints"],
    highlights: [
      { en: "React with 5–10 seconds of prep", es: "Reaccionar con 5–10 segundos de preparación" },
      { en: "Adapt when the information changes", es: "Adaptarte cuando cambia la información" },
      { en: "Ask for clarification and rephrase", es: "Pedir aclaración y reformular" },
      { en: "Argue, persuade and change your mind", es: "Argumentar, persuadir y cambiar de opinión" },
      { en: "Keep a conversation going by asking back", es: "Mantener la conversación preguntando de vuelta" },
      { en: "Improvise under pressure in the SHARKS Final", es: "Improvisar bajo presión en la Final SHARKS" },
    ],
    extra: {
      en: "⚡ 12 TEST READY SPRINTS — natural-speed audio, two-speaker listening, paraphrase, inference and Speak Now.",
      es: "⚡ 12 TEST READY SPRINTS — audio a velocidad natural, listening a dos voces, paráfrasis, inferencia y Speak Now.",
    },
    cta: { en: "START SHARKS", es: "EMPEZAR SHARKS" },
    hiddenFromPlacement: true,
    days: [...SHARKS_WEEK_1_DAYS, ...SHARKS_WEEKS_2_4_DAYS],
    weeks: SHARKS_WEEKS,
  },
  {
    // Internal id is frozen from day one: progress and recordings will be keyed to it.
    // ADVANCED is cyclical: A1 / A2 / A3 are equivalent entry points, not levels.
    id: "advanced-1",
    order: 9,
    label: "AVANZADO · ADVANCED 1",
    title: "GET HIRED",
    subtitle: "Tell your story. Answer anything. Get the job.",
    subtitleEs: "Cuenta tu historia. Responde lo que sea. Consigue el trabajo.",
    statusLine: { en: "Week 1 available · 5 days · 25 Fluency Reps", es: "Semana 1 disponible · 5 días · 25 Fluency Reps" },
    description: "Build answers with reusable frameworks: tell your story, prove your value, handle recruiter follow-ups and switch to customer service under pressure.",
    descriptionEs: "Construye respuestas con estructuras reutilizables: cuenta tu historia, prueba tu valor, maneja las repreguntas del reclutador y cambia a servicio al cliente bajo presión.",
    meta: ["Week 1 Available", "5 Days", "25 Fluency Reps", "More Weeks Coming Soon"],
    highlights: [
      { en: "Tell me about yourself — without sounding memorized", es: "Tell me about yourself — sin sonar memorizado/a" },
      { en: "Tell a real experience (behavioral story)", es: "Contar una experiencia real (historia conductual)" },
      { en: "Why should we hire you? — with evidence", es: "Why should we hire you? — con evidencia" },
      { en: "Talk about a real weakness and your goals", es: "Hablar de una debilidad real y tus metas" },
      { en: "Recruiter Pressure Round + customer service switch", es: "Pressure Round del reclutador + cambio a servicio al cliente" },
    ],
    extra: {
      en: "⚡ 3 TEST READY SPRINTS this week — Listen & Repeat, Describe the Scene, Mixed Sprint. Optional, never scored.",
      es: "⚡ 3 TEST READY SPRINTS esta semana — Listen & Repeat, Describe the Scene, Mixed Sprint. Opcionales, nunca calificados.",
    },
    cta: { en: "START GET HIRED", es: "EMPEZAR GET HIRED" },
    hiddenFromPlacement: true,
    family: "advanced",
    cyclePosition: 1,
    builtWeeks: 1,
    days: ADVANCED_1_WEEK_1_DAYS,
    weeks: ADVANCED_1_WEEKS,
  },
];

/** Preview-only levels: not selectable, not routable, zero days, never in totals. */
export type UpcomingLevel = { key: string; label: string; title: string; note: { en: string; es: string } };
/** ADVANCED 1 now ships as a real module card; nothing is left in preview-only state. */
export const UPCOMING_LEVELS: UpcomingLevel[] = [];

export const DEFAULT_MODULE: ModuleId = "basic-zero";

export function isModuleId(value: unknown): value is ModuleId {
  return (
    value === "basic-zero" ||
    value === "simple-present" ||
    value === "past-stories" ||
    value === "simple-future" ||
    value === "mixed-tenses" ||
    value === "eagles-week-1" ||
    value === "tigers" ||
    value === "sharks" ||
    value === "advanced-1"
  );
}


export const CourseService = {
  /** Modules in visual journey order (presentation only). */
  modules(): LearningModule[] {
    return [...MODULES].sort((a, b) => a.order - b.order);
  },

  /** Visual position of a module in the journey (1-based). */
  displayIndex(moduleId: ModuleId): number {
    return CourseService.getModule(moduleId).order;
  },

  getModule(moduleId: ModuleId): LearningModule {
    return MODULES.find((m) => m.id === moduleId) ?? MODULES[0]!;
  },

  totalDays(moduleId: ModuleId): number {
    return CourseService.getModule(moduleId).days.length;
  },

  /**
   * Total days across every published module (Home / Account / Progress).
   * Computed dynamically; upcoming preview levels have no days and never count.
   */
  totalDaysAll(): number {
    return MODULES.reduce((sum, m) => sum + m.days.length, 0);
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

  /**
   * Applies one prewritten scenario from the day's bank (TIGERS FINAL) to the
   * Rep 5 fields. Days without a bank are returned untouched.
   */
  withScenario(day: CourseDay, scenarioId: string | null): CourseDay {
    const scenario = day.rep5Scenarios?.find((s) => s.id === scenarioId) ?? day.rep5Scenarios?.[0];
    if (!scenario) return day;
    return { ...day, rep5Prompt: scenario.rep5Prompt, rep5Turns: scenario.rep5Turns, rep5Scenario: scenario };
  },
};

