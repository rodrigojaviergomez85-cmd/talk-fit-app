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
    { id: "s1", text: "I usually wake up around six thirty.", chunks: ["I usually wake up", "around six thirty."] },
    { id: "s2", text: "I have breakfast at home before I start work.", chunks: ["I have breakfast at home", "before I start work."] },
    { id: "s3", text: "I start work at eight and I talk to customers every day.", chunks: ["I start work at eight", "and I talk to customers", "every day."] },
    { id: "s4", text: "My sister works from home.", chunks: ["My sister works", "from home."] },
    { id: "s5", text: "She usually starts before me, around seven.", chunks: ["She usually starts before me,", "around seven."] },
    { id: "s6", text: "I like my job because I learn something new every week.", chunks: ["I like my job", "because I learn something new", "every week."] },
    { id: "s7", text: "Sometimes I feel tired because my days are pretty busy.", chunks: ["Sometimes I feel tired", "because my days are pretty busy."] },
    { id: "s8", text: "But overall, I really enjoy my routine.", chunks: ["But overall,", "I really enjoy my routine."] },
    { id: "s9", text: "Tomorrow I am going to start a little earlier.", chunks: ["Tomorrow I am going to", "start a little earlier."] },
  ],
  automaticityChunks: [
    { id: "c1", text: "I usually…" },
    { id: "c2", text: "I sometimes…" },
    { id: "c3", text: "I always…" },
    { id: "c4", text: "I work…" },
    { id: "c5", text: "I live…" },
    { id: "c6", text: "I like…" },
    { id: "c7", text: "He works…" },
    { id: "c8", text: "She usually…" },
    { id: "c9", text: "because I…" },
    { id: "c10", text: "because she…" },
    { id: "c11", text: "Overall…" },
    { id: "c12", text: "Tomorrow I am going to…" },
  ],
  prompts: [
    { id: "p1", question: "What time do you usually wake up?", starter: "I usually…" },
    { id: "p2", question: "What do you do in the morning?", starter: "I sometimes…" },
    { id: "p3", question: "Where do you work or study?", starter: "I work…" },
    { id: "p4", question: "What do you usually do at work?", starter: "I usually…" },
    { id: "p5", question: "Tell me about someone you know.", starter: "My ______ works…" },
    { id: "p6", question: "What does he / she do?", starter: "He usually… / She usually…" },
    { id: "p7", question: "Why do you like something?", starter: "I like ______ because…" },
    { id: "p8", question: "Give another reason using BECAUSE.", starter: "Sometimes ______ because…" },
    { id: "p9", question: "How would you summarize your routine?", starter: "Overall…" },
    { id: "p10", question: "What are you going to do tomorrow?", starter: "Tomorrow I am going to…" },
  ],
  cues: ["ROUTINE", "HE / SHE", "BECAUSE", "CONCLUSION", "TOMORROW"],
  checklist: ["7–10 sentences", "Simple Present", "He / She", "Because", "Conclusion", "Tomorrow"],
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
