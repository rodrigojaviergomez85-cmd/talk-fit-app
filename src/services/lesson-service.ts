import type { Lesson } from "@/lib/types";

/**
 * LessonService — mock content source for the MVP.
 * Replace `fetchLesson` with a real API/DB read later; the shape stays the same.
 */

const simplePresentDailyRoutine: Lesson = {
  id: "sp-daily-routine",
  grammar: "Simple Present",
  topic: "My Daily Routine",
  level: "A2",
  goalSeconds: [35, 45],
  focus: "Third person + natural rhythm",
  estimatedMinutes: "8–12 minutes",
  sentences: [
    { id: "s1", text: "I usually wake up around six thirty.", es: "Normalmente me levanto como a las seis y media.", chunks: ["I usually wake up", "around six thirty."] },
    { id: "s2", text: "I have breakfast at home before I start work.", es: "Desayuno en casa antes de empezar a trabajar.", chunks: ["I have breakfast at home", "before I start work."] },
    { id: "s3", text: "I start work at eight and I talk to customers every day.", es: "Empiezo a trabajar a las ocho y hablo con clientes todos los días.", chunks: ["I start work at eight", "and I talk to customers", "every day."] },
    { id: "s4", text: "My sister works from home.", es: "Mi hermana trabaja desde casa.", chunks: ["My sister works", "from home."] },
    { id: "s5", text: "She usually starts before me, around seven.", es: "Ella normalmente empieza antes que yo, como a las siete.", chunks: ["She usually starts before me,", "around seven."] },
    { id: "s6", text: "I like my job because I learn something new every week.", es: "Me gusta mi trabajo porque aprendo algo nuevo cada semana.", chunks: ["I like my job", "because I learn something new", "every week."] },
    { id: "s7", text: "Sometimes I feel tired because my days are pretty busy.", es: "A veces me siento cansado porque mis días son bastante ocupados.", chunks: ["Sometimes I feel tired", "because my days are pretty busy."] },
    { id: "s8", text: "But overall, I really enjoy my routine.", es: "Pero en general, disfruto mucho mi rutina.", chunks: ["But overall,", "I really enjoy my routine."] },
    { id: "s9", text: "Tomorrow I am going to start a little earlier.", es: "Mañana voy a empezar un poco más temprano.", chunks: ["Tomorrow I am going to", "start a little earlier."] },
  ],
  automaticityChunks: [
    { id: "c1", text: "I usually…", es: "Normalmente yo…" },
    { id: "c2", text: "I sometimes…", es: "A veces yo…" },
    { id: "c3", text: "I always…", es: "Siempre yo…" },
    { id: "c4", text: "I work…", es: "Yo trabajo…" },
    { id: "c5", text: "I live…", es: "Yo vivo…" },
    { id: "c6", text: "I like…", es: "Me gusta…" },
    { id: "c7", text: "He works…", es: "Él trabaja…" },
    { id: "c8", text: "She usually…", es: "Ella normalmente…" },
    { id: "c9", text: "because I…", es: "porque yo…" },
    { id: "c10", text: "because she…", es: "porque ella…" },
    { id: "c11", text: "Overall…", es: "En general…" },
    { id: "c12", text: "Tomorrow I am going to…", es: "Mañana voy a…" },
  ],
  prompts: [
    { id: "p1", question: "What time do you usually wake up?", questionEs: "¿A qué hora te levantas normalmente?", starter: "I usually…", starterEs: "Normalmente yo…" },
    { id: "p2", question: "What do you do in the morning?", questionEs: "¿Qué haces en la mañana?", starter: "I sometimes…", starterEs: "A veces yo…" },
    { id: "p3", question: "Where do you work or study?", questionEs: "¿Dónde trabajas o estudias?", starter: "I work…", starterEs: "Yo trabajo…" },
    { id: "p4", question: "What do you usually do at work?", questionEs: "¿Qué haces normalmente en el trabajo?", starter: "I usually…", starterEs: "Normalmente yo…" },
    { id: "p5", question: "Tell me about someone you know.", questionEs: "Háblame de alguien que conoces.", starter: "My ______ works…", starterEs: "Mi ______ trabaja…" },
    { id: "p6", question: "What does he / she do?", questionEs: "¿A qué se dedica él / ella?", starter: "He usually… / She usually…", starterEs: "Él normalmente… / Ella normalmente…" },
    { id: "p7", question: "Why do you like something?", questionEs: "¿Por qué te gusta algo?", starter: "I like ______ because…", starterEs: "Me gusta ______ porque…" },
    { id: "p8", question: "Give another reason using BECAUSE.", questionEs: "Da otra razón usando BECAUSE (porque).", starter: "Sometimes ______ because…", starterEs: "A veces ______ porque…" },
    { id: "p9", question: "How would you summarize your routine?", questionEs: "¿Cómo resumirías tu rutina?", starter: "Overall…", starterEs: "En general…" },
    { id: "p10", question: "What are you going to do tomorrow?", questionEs: "¿Qué vas a hacer mañana?", starter: "Tomorrow I am going to…", starterEs: "Mañana voy a…" },
  ],
  cues: ["ROUTINE", "HE / SHE", "BECAUSE", "CONCLUSION", "TOMORROW"],
  checklist: ["7–10 sentences", "Simple Present", "He / She", "Because", "Conclusion", "Tomorrow"],
  checklistEs: ["7–10 oraciones", "Presente simple", "Él / Ella (+ s)", "Porque", "Conclusión", "Mañana"],

};

export const LessonService = {
  getTodayLesson(): Lesson {
    return simplePresentDailyRoutine;
  },
  getModelText(lesson: Lesson): string {
    return lesson.sentences.map((s) => s.text).join(" ");
  },
  /** Natural-speech chunks taught across the course. */
  getNaturalSpeechChunks(): string[] {
    return [
      "I usually…",
      "I normally…",
      "Most of the time…",
      "During the week…",
      "After work…",
      "In the morning…",
      "because I…",
      "because it's…",
      "One thing I like is…",
      "Overall…",
      "Tomorrow I'm going to…",
    ];
  },
  /** Idea-expansion ladder used when a learner speaks under target time. */
  getExpansionLadder(): string[] {
    return [
      "I work at a bank.",
      "I work at a bank in Managua.",
      "I work at a bank in Managua because I like helping customers.",
      "I work at a bank in Managua because I like helping customers, and I usually start work at eight.",
    ];
  },
};
