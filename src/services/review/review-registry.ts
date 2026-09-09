import type { CourseDay } from "@/lib/types";
import {
  REVIEW_GOAL_SECONDS,
  REVIEW_GOAL_SENTENCES,
  isReviewModuleId,
  isReviewPracticeNumber,
  type ReviewModule,
  type ReviewModuleId,
  type ReviewPractice,
  type ReviewPracticeNumber,
} from "@/lib/review-types";
import { SIMPLE_PRESENT_GUIDE, SIMPLE_PRESENT_COMMON_ERRORS } from "./simple-present-guide";
import { SIMPLE_PRESENT_PRACTICES } from "./simple-present-practices";
import { PRESENT_PROGRESSIVE_GUIDE, PRESENT_PROGRESSIVE_COMMON_ERRORS } from "./present-progressive-guide";
import { PRESENT_PROGRESSIVE_PRACTICES } from "./present-progressive-practices";
import { SIMPLE_PAST_GUIDE, SIMPLE_PAST_COMMON_ERRORS } from "./simple-past-guide";
import { SIMPLE_PAST_PRACTICES } from "./simple-past-practices";

/**
 * Trusted, server-usable registry of Review content.
 * Any module id or practice number outside this registry is rejected: the AI
 * coach never receives a prompt or rubric that did not come from here.
 */
const REVIEW_MODULES: Record<ReviewModuleId, ReviewModule> = {
  "review-simple-present": {
    id: "review-simple-present",
    label: "REVIEW",
    title: "Simple Present",
    titleEs: "Presente Simple",
    subtitle: "Routines, habits and facts — five complete speaking practices.",
    subtitleEs: "Rutinas, hábitos y hechos: cinco prácticas completas de speaking.",
    guide: SIMPLE_PRESENT_GUIDE,
    commonErrors: SIMPLE_PRESENT_COMMON_ERRORS,
    practices: SIMPLE_PRESENT_PRACTICES,
  },
  "review-present-progressive": {
    id: "review-present-progressive",
    label: "REVIEW",
    title: "Present Progressive",
    titleEs: "Presente Progresivo",
    subtitle: "What is happening right now — five complete speaking practices.",
    subtitleEs: "Lo que está pasando ahora mismo: cinco prácticas completas de speaking.",
    guide: PRESENT_PROGRESSIVE_GUIDE,
    commonErrors: PRESENT_PROGRESSIVE_COMMON_ERRORS,
    practices: PRESENT_PROGRESSIVE_PRACTICES,
  },
  "review-simple-past": {
    id: "review-simple-past",
    label: "REVIEW",
    title: "Simple Past",
    titleEs: "Pasado Simple",
    subtitle: "Finished actions, regular and irregular verbs — five complete speaking practices.",
    subtitleEs: "Acciones terminadas, verbos regulares e irregulares: cinco prácticas completas de speaking.",
    guide: SIMPLE_PAST_GUIDE,
    commonErrors: SIMPLE_PAST_COMMON_ERRORS,
    practices: SIMPLE_PAST_PRACTICES,
  },
};

export function getReviewModule(moduleId: string): ReviewModule | null {
  if (!isReviewModuleId(moduleId)) return null;
  return REVIEW_MODULES[moduleId];
}

export function listReviewModules(): ReviewModule[] {
  return Object.values(REVIEW_MODULES);
}

/** Returns the practice only when both the module id and the number are valid. */
export function getReviewPractice(moduleId: string, practice: unknown): ReviewPractice | null {
  const mod = getReviewModule(moduleId);
  if (!mod || !isReviewPracticeNumber(practice)) return null;
  return mod.practices.find((p) => p.number === (practice as ReviewPracticeNumber)) ?? null;
}

/**
 * Adapts a Review practice to the shared `CourseDay` shape so the existing
 * coach engine can build its rubric from trusted server-side content.
 * `day` carries the practice number (1–5) — it is NEVER a curriculum day.
 */
export function reviewPracticeToCourseDay(practice: ReviewPractice): CourseDay {
  return {
    day: practice.number,
    focus: `${practice.focus} Goals: ${practice.grammarGoals.join("; ")}.`,
    focusEs: practice.focusEs,
    topic: practice.title,
    topicEs: practice.titleEs,
    goalSeconds: REVIEW_GOAL_SECONDS,
    goalSentences: REVIEW_GOAL_SENTENCES,
    estimatedMinutes: "8–10",
    intro: {
      title: practice.title,
      titleEs: practice.titleEs,
      lead: practice.reminder.en,
      leadEs: practice.reminder.es,
      examples: practice.lines.slice(0, 3).map((l) => l.text),
      goal: practice.focus,
      goalEs: practice.focusEs,
      cta: "START",
    },
    lines: practice.lines.map((l) => ({ id: l.id, text: l.text, es: l.es, chunks: l.chunks })),
    prompts: practice.questions.map((q) => ({
      id: q.id,
      question: q.question,
      questionEs: q.questionEs,
      starter: q.hint,
      starterEs: q.hintEs,
    })),
    cues: practice.vocabulary,
    rep5Prompt: { question: practice.finalPrompt.question, questionEs: practice.finalPrompt.questionEs },
    rep5Tips: practice.finalPrompt.tips,
  };
}

/** Server-safe lookup: content for the coach, or null when the input is not Review. */
export function loadReviewDay(moduleId: string, practice: number): CourseDay | null {
  const found = getReviewPractice(moduleId, practice);
  return found ? reviewPracticeToCourseDay(found) : null;
}
