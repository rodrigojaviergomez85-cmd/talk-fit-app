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
import { PLACE_PREPOSITIONS_GUIDE, PLACE_PREPOSITIONS_COMMON_ERRORS } from "./place-prepositions-guide";
import { PLACE_PREPOSITIONS_PRACTICES } from "./place-prepositions-practices";
import { PRESENT_PROGRESSIVE_GUIDE, PRESENT_PROGRESSIVE_COMMON_ERRORS } from "./present-progressive-guide";
import { PRESENT_PROGRESSIVE_PRACTICES } from "./present-progressive-practices";
import { SIMPLE_PAST_GUIDE, SIMPLE_PAST_COMMON_ERRORS } from "./simple-past-guide";
import { SIMPLE_PAST_PRACTICES } from "./simple-past-practices";
import { PAST_PROGRESSIVE_GUIDE, PAST_PROGRESSIVE_COMMON_ERRORS } from "./past-progressive-guide";
import { PAST_PROGRESSIVE_PRACTICES } from "./past-progressive-practices";
import { SIMPLE_FUTURE_GUIDE, SIMPLE_FUTURE_COMMON_ERRORS } from "./simple-future-guide";
import { SIMPLE_FUTURE_PRACTICES } from "./simple-future-practices";
import { PRESENT_PERFECT_GUIDE, PRESENT_PERFECT_COMMON_ERRORS } from "./present-perfect-guide";
import { PRESENT_PERFECT_PRACTICES } from "./present-perfect-practices";
import {
  PRESENT_PERFECT_PROGRESSIVE_GUIDE,
  PRESENT_PERFECT_PROGRESSIVE_COMMON_ERRORS,
} from "./present-perfect-progressive-guide";
import { PRESENT_PERFECT_PROGRESSIVE_PRACTICES } from "./present-perfect-progressive-practices";
import { COMPARATIVES_GUIDE, COMPARATIVES_COMMON_ERRORS } from "./comparatives-guide";
import { COMPARATIVES_PRACTICES } from "./comparatives-practices";
import { PREPOSITIONS_GUIDE, PREPOSITIONS_COMMON_ERRORS } from "./prepositions-guide";
import { PREPOSITIONS_PRACTICES } from "./prepositions-practices";
import { PASSIVE_VOICE_GUIDE, PASSIVE_VOICE_COMMON_ERRORS } from "./passive-voice-guide";
import { PASSIVE_VOICE_PRACTICES } from "./passive-voice-practices";
import { TAG_QUESTIONS_GUIDE, TAG_QUESTIONS_COMMON_ERRORS } from "./tag-questions-guide";
import { TAG_QUESTIONS_PRACTICES } from "./tag-questions-practices";
import { ABOUT_TO_GUIDE, ABOUT_TO_COMMON_ERRORS } from "./about-to-guide";
import { ABOUT_TO_PRACTICES } from "./about-to-practices";
import { MODALS_GUIDE, MODALS_COMMON_ERRORS } from "./modals-guide";
import { MODALS_PRACTICES } from "./modals-practices";
import { USED_TO_GUIDE, USED_TO_COMMON_ERRORS } from "./used-to-guide";
import { USED_TO_PRACTICES } from "./used-to-practices";
import { PAST_PERFECT_GUIDE, PAST_PERFECT_COMMON_ERRORS } from "./past-perfect-guide";
import { PAST_PERFECT_PRACTICES } from "./past-perfect-practices";
import { MODAL_PERFECTS_GUIDE, MODAL_PERFECTS_COMMON_ERRORS } from "./modal-perfects-guide";
import { MODAL_PERFECTS_PRACTICES } from "./modal-perfects-practices";

/**
 * Trusted, server-usable registry of Review content.
 * Any module id or practice number outside this registry is rejected: the AI
 * coach never receives a prompt or rubric that did not come from here.
 */
const REVIEW_MODULES: Record<ReviewModuleId, ReviewModule> = {
  "review-simple-present": {
    id: "review-simple-present",
    category: "basic",
    minimumModuleId: "simple-present",
    label: "REVIEW",
    title: "Simple Present",
    titleEs: "Presente Simple",
    subtitle: "Routines, habits and facts — five complete speaking practices.",
    subtitleEs: "Rutinas, hábitos y hechos: cinco prácticas completas de speaking.",
    guide: SIMPLE_PRESENT_GUIDE,
    commonErrors: SIMPLE_PRESENT_COMMON_ERRORS,
    practices: SIMPLE_PRESENT_PRACTICES,
  },
  "review-place-prepositions": {
    id: "review-place-prepositions",
    category: "basic",
    minimumModuleId: "basic-zero",
    label: "REVIEW",
    title: "Prepositions of Place",
    titleEs: "Preposiciones de Lugar",
    subtitle: "in, on, under, next to, behind, in front of and more — five complete speaking practices.",
    subtitleEs: "in, on, under, next to, behind, in front of y más: cinco prácticas completas de speaking.",
    guide: PLACE_PREPOSITIONS_GUIDE,
    commonErrors: PLACE_PREPOSITIONS_COMMON_ERRORS,
    practices: PLACE_PREPOSITIONS_PRACTICES,
  },
  "review-present-progressive": {
    id: "review-present-progressive",
    category: "basic",
    minimumModuleId: "simple-present",
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
    category: "basic",
    minimumModuleId: "past-stories",
    label: "REVIEW",
    title: "Simple Past",
    titleEs: "Pasado Simple",
    subtitle: "Finished actions, regular and irregular verbs — five complete speaking practices.",
    subtitleEs: "Acciones terminadas, verbos regulares e irregulares: cinco prácticas completas de speaking.",
    guide: SIMPLE_PAST_GUIDE,
    commonErrors: SIMPLE_PAST_COMMON_ERRORS,
    practices: SIMPLE_PAST_PRACTICES,
  },
  "review-past-progressive": {
    id: "review-past-progressive",
    category: "basic",
    minimumModuleId: "past-stories",
    label: "REVIEW",
    title: "Past Progressive",
    titleEs: "Pasado Progresivo",
    subtitle: "What was happening at a moment in the past — five complete speaking practices.",
    subtitleEs: "Lo que estaba pasando en un momento del pasado: cinco prácticas completas de speaking.",
    guide: PAST_PROGRESSIVE_GUIDE,
    commonErrors: PAST_PROGRESSIVE_COMMON_ERRORS,
    practices: PAST_PROGRESSIVE_PRACTICES,
  },
  "review-simple-future": {
    id: "review-simple-future",
    category: "basic",
    minimumModuleId: "simple-future",
    label: "REVIEW",
    title: "Simple Future",
    titleEs: "Futuro Simple",
    subtitle: "Plans and predictions with will and be going to — five complete speaking practices.",
    subtitleEs: "Planes y predicciones con will y be going to: cinco prácticas completas de speaking.",
    guide: SIMPLE_FUTURE_GUIDE,
    commonErrors: SIMPLE_FUTURE_COMMON_ERRORS,
    practices: SIMPLE_FUTURE_PRACTICES,
  },
  "review-present-perfect": {
    id: "review-present-perfect",
    category: "intermediate-advanced",
    minimumModuleId: "eagles-week-1",
    label: "REVIEW",
    title: "Present Perfect",
    titleEs: "Presente Perfecto",
    subtitle: "Experiences and results with have / has + past participle — five complete speaking practices.",
    subtitleEs: "Experiencias y resultados con have / has + participio: cinco prácticas completas de speaking.",
    guide: PRESENT_PERFECT_GUIDE,
    commonErrors: PRESENT_PERFECT_COMMON_ERRORS,
    practices: PRESENT_PERFECT_PRACTICES,
  },
  "review-present-perfect-progressive": {
    id: "review-present-perfect-progressive",
    category: "intermediate-advanced",
    minimumModuleId: "eagles-week-1",
    label: "REVIEW",
    title: "Present Perfect Progressive",
    titleEs: "Presente Perfecto Progresivo",
    subtitle: "How long something has been happening — five complete speaking practices.",
    subtitleEs: "Cuánto tiempo lleva pasando algo: cinco prácticas completas de speaking.",
    guide: PRESENT_PERFECT_PROGRESSIVE_GUIDE,
    commonErrors: PRESENT_PERFECT_PROGRESSIVE_COMMON_ERRORS,
    practices: PRESENT_PERFECT_PROGRESSIVE_PRACTICES,
  },
  "review-comparatives": {
    id: "review-comparatives",
    category: "intermediate-advanced",
    minimumModuleId: "eagles-week-1",
    label: "REVIEW",
    title: "Comparatives",
    titleEs: "Comparativos",
    subtitle: "Short (-er) and long (more …) adjectives — five complete speaking practices.",
    subtitleEs: "Adjetivos cortos (-er) y largos (more …): cinco prácticas completas de speaking.",
    guide: COMPARATIVES_GUIDE,
    commonErrors: COMPARATIVES_COMMON_ERRORS,
    practices: COMPARATIVES_PRACTICES,
  },
  "review-prepositions": {
    id: "review-prepositions",
    category: "intermediate-advanced",
    minimumModuleId: "eagles-week-1",
    label: "REVIEW",
    title: "Prepositions of Time and Place",
    titleEs: "Preposiciones de Tiempo y Lugar",
    subtitle: "in, on, at, for, since and position words — five complete speaking practices.",
    subtitleEs: "in, on, at, for, since y palabras de posición: cinco prácticas completas de speaking.",
    guide: PREPOSITIONS_GUIDE,
    commonErrors: PREPOSITIONS_COMMON_ERRORS,
    practices: PREPOSITIONS_PRACTICES,
  },
  "review-passive-voice": {
    id: "review-passive-voice",
    category: "intermediate-advanced",
    minimumModuleId: "eagles-week-1",
    label: "REVIEW",
    title: "Passive Voice",
    titleEs: "Voz Pasiva",
    subtitle: "be + past participle: The book was written by him — five complete speaking practices.",
    subtitleEs: "be + participio pasado: The book was written by him — cinco prácticas completas de speaking.",
    guide: PASSIVE_VOICE_GUIDE,
    commonErrors: PASSIVE_VOICE_COMMON_ERRORS,
    practices: PASSIVE_VOICE_PRACTICES,
  },
  "review-tag-questions": {
    id: "review-tag-questions",
    category: "intermediate-advanced",
    minimumModuleId: "eagles-week-1",
    label: "REVIEW",
    title: "Tag Questions",
    titleEs: "Tag Questions",
    subtitle: "You ate pizza, didn't you? — five complete speaking practices.",
    subtitleEs: "You ate pizza, didn't you? — cinco prácticas completas de speaking.",
    guide: TAG_QUESTIONS_GUIDE,
    commonErrors: TAG_QUESTIONS_COMMON_ERRORS,
    practices: TAG_QUESTIONS_PRACTICES,
  },
  "review-about-to": {
    id: "review-about-to",
    category: "intermediate-advanced",
    minimumModuleId: "eagles-week-1",
    label: "REVIEW",
    title: "Be About To (present & past)",
    titleEs: "Be About To (presente y pasado)",
    subtitle: "I am about to sleep · I was about to call you — five complete speaking practices.",
    subtitleEs: "I am about to sleep · I was about to call you — cinco prácticas completas de speaking.",
    guide: ABOUT_TO_GUIDE,
    commonErrors: ABOUT_TO_COMMON_ERRORS,
    practices: ABOUT_TO_PRACTICES,
  },
  "review-modals": {
    id: "review-modals",
    category: "intermediate-advanced",
    minimumModuleId: "eagles-week-1",
    label: "REVIEW",
    title: "Modal Verbs",
    titleEs: "Verbos Modales",
    subtitle: "Ability, possibility, advice, obligation and hypothetical choices — five complete speaking practices.",
    subtitleEs: "Habilidad, posibilidad, consejos, obligación y decisiones hipotéticas: cinco prácticas completas de speaking.",
    guide: MODALS_GUIDE,
    commonErrors: MODALS_COMMON_ERRORS,
    practices: MODALS_PRACTICES,
  },
  "review-used-to": {
    id: "review-used-to",
    category: "intermediate-advanced",
    minimumModuleId: "eagles-week-1",
    label: "REVIEW",
    title: "Used to, Be used to & Get used to",
    titleEs: "Used to, Be used to y Get used to",
    subtitle: "Past habits, familiar situations and adaptation — five complete speaking practices.",
    subtitleEs: "Hábitos pasados, situaciones familiares y adaptación: cinco prácticas completas de speaking.",
    guide: USED_TO_GUIDE,
    commonErrors: USED_TO_COMMON_ERRORS,
    practices: USED_TO_PRACTICES,
  },
  "review-past-perfect": {
    id: "review-past-perfect",
    category: "intermediate-advanced",
    minimumModuleId: "eagles-week-1",
    label: "REVIEW",
    title: "Past Perfect & Past Perfect Progressive",
    titleEs: "Pasado Perfecto y Pasado Perfecto Progresivo",
    subtitle: "Earlier completed actions and their duration — five complete speaking practices.",
    subtitleEs: "Acciones anteriores completadas y su duración: cinco prácticas completas de speaking.",
    guide: PAST_PERFECT_GUIDE,
    commonErrors: PAST_PERFECT_COMMON_ERRORS,
    practices: PAST_PERFECT_PRACTICES,
  },
  "review-modal-perfects": {
    id: "review-modal-perfects",
    category: "intermediate-advanced",
    minimumModuleId: "eagles-week-1",
    label: "REVIEW",
    title: "Should have, Must have, Could have & Would have",
    titleEs: "Should have, Must have, Could have y Would have",
    subtitle: "Regrets, deductions and imagined past results — five complete speaking practices.",
    subtitleEs: "Arrepentimientos, deducciones y resultados imaginarios del pasado: cinco prácticas completas de speaking.",
    guide: MODAL_PERFECTS_GUIDE,
    commonErrors: MODAL_PERFECTS_COMMON_ERRORS,
    practices: MODAL_PERFECTS_PRACTICES,
  },
};

export function getReviewModule(moduleId: string): ReviewModule | null {
  if (!isReviewModuleId(moduleId)) return null;
  return REVIEW_MODULES[moduleId];
}

export function listReviewModules(): ReviewModule[] {
  return Object.values(REVIEW_MODULES);
}

export function listReviewModulesByCategory(category: ReviewModule["category"]): ReviewModule[] {
  const order: ReviewModuleId[] = [
    "review-simple-future",
    "review-simple-present",
    "review-place-prepositions",
    "review-present-progressive",
    "review-simple-past",
    "review-past-progressive",
    "review-present-perfect",
    "review-present-perfect-progressive",
    "review-comparatives",
    "review-prepositions",
    "review-passive-voice",
    "review-tag-questions",
    "review-about-to",
    "review-modals",
    "review-used-to",
    "review-past-perfect",
    "review-modal-perfects",
  ];
  return listReviewModules()
    .filter((module) => module.category === category)
    .sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));
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
