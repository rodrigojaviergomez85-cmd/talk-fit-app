/**
 * STEP 5 · AI Coach Review — OBJECTIVE SPEAKING RESULT.
 *
 * Pure, client-safe and NOT AI-generated. Everything here is derived locally
 * from data the app already has (the Final Recording's estimated idea count,
 * its count status and duration, plus the authored day goals). It never
 * triggers sentence counting, STT or the LLM; a language switch or an async
 * count update is a plain re-render.
 */
import type { CourseDay, Recording } from "./types";

export type CoachLevel = "basic" | "intermediate" | "advanced";

/** Learner-facing level grouping (client mirror; the server keeps its own rubric levels). */
export function coachLevelFor(moduleId: string): CoachLevel {
  if (moduleId.startsWith("advanced")) return "advanced";
  if (moduleId.startsWith("eagles") || moduleId.startsWith("tigers") || moduleId.startsWith("sharks")) return "intermediate";
  return "basic";
}

export type ObjectiveResultInput = {
  moduleId: string;
  sentenceCount: number | null | undefined;
  countStatus: Recording["countStatus"];
  durationSeconds: number;
  goalSentences: number;
  goalSeconds: [number, number];
  /**
   * Role play / Pressure Round: the Final Audio answers ONE interlocutor turn.
   * A single turn is never compared against the whole-day idea goal.
   */
  rolePlay: boolean;
  /** Explicit per-turn speaking range (ADVANCED turns). Only per-turn goals apply to a turn. */
  turnTargetSeconds?: [number, number] | null | undefined;
};

export type IdeaResult =
  | { kind: "pending" }
  | { kind: "failed" }
  | { kind: "count"; count: number; goal: number | null; missing: number; met: boolean; exceeded: boolean };

export type TimeResult = {
  seconds: number;
  /** Null when no goal applies to this recording (role-play turn without a per-turn range). */
  goal: { min: number; max: number | null } | null;
  met: boolean;
  missing: number;
};

export type ObjectiveResult = {
  level: CoachLevel;
  /** "goal" = X / goal comparison · "output" = production only (advanced) · "turn" = one role-play response. */
  mode: "goal" | "output" | "turn";
  ideas: IdeaResult;
  time: TimeResult;
};

function validCount(value: number | null | undefined): value is number {
  return typeof value === "number" && Number.isFinite(value) && value >= 0;
}

export function objectiveResult(input: ObjectiveResultInput): ObjectiveResult {
  const level = coachLevelFor(input.moduleId);
  const mode: ObjectiveResult["mode"] = input.rolePlay ? "turn" : level === "advanced" ? "output" : "goal";
  const compareIdeas = mode === "goal";

  let ideas: IdeaResult;
  if (input.countStatus === "pending") ideas = { kind: "pending" };
  else if (validCount(input.sentenceCount)) {
    const count = Math.round(input.sentenceCount);
    const goal = compareIdeas ? input.goalSentences : null;
    const missing = goal !== null ? Math.max(0, goal - count) : 0;
    ideas = { kind: "count", count, goal, missing, met: goal === null || count >= goal, exceeded: goal !== null && count > goal };
  } else ideas = { kind: "failed" };

  const seconds = Math.max(0, Math.round(input.durationSeconds || 0));
  let goal: TimeResult["goal"] = null;
  if (mode === "turn") {
    if (input.turnTargetSeconds) goal = { min: input.turnTargetSeconds[0], max: input.turnTargetSeconds[1] };
  } else {
    const [min, max] = input.goalSeconds;
    goal = { min, max: max > min ? max : null };
  }
  // Reaching the minimum is what matters; going above the range is never punished.
  const met = goal === null || seconds >= goal.min;
  const missing = goal === null ? 0 : Math.max(0, goal.min - seconds);

  return { level, mode, ideas, time: { seconds, goal, met, missing } };
}

/** Convenience: build the input straight from the day + the live Final Recording. */
export function objectiveResultInputFor(
  moduleId: string,
  day: Pick<CourseDay, "goalSentences" | "goalSeconds" | "rep5Turns">,
  recording: Pick<Recording, "sentenceCount" | "countStatus" | "durationSeconds">,
  sourceTurnNumber: number | null,
): ObjectiveResultInput {
  const turn = sourceTurnNumber !== null ? day.rep5Turns?.[sourceTurnNumber - 1] : undefined;
  return {
    moduleId,
    sentenceCount: recording.sentenceCount,
    countStatus: recording.countStatus,
    durationSeconds: recording.durationSeconds,
    goalSentences: day.goalSentences ?? 5,
    goalSeconds: day.goalSeconds,
    rolePlay: Boolean(day.rep5Turns?.length) && sourceTurnNumber !== null,
    turnTargetSeconds: turn?.targetSeconds ?? null,
  };
}

/* ------------------------------------------------------------------------ */
/*  Learner-facing text (bilingual, local read — 0 AI calls)                 */
/* ------------------------------------------------------------------------ */

export type ObjectiveResultText = {
  heading: string;
  /** e.g. "4 / 5 IDEAS COMPLETAS" · "7 IDEAS COMPLETAS" · "CONTANDO TUS IDEAS…" · "IDEAS" */
  ideasPrimary: string;
  /** e.g. "TE FALTÓ 1 IDEA" · "META SUPERADA ✓" · "No pudimos calcularlas esta vez." */
  ideasSecondary: string | null;
  /** e.g. "32s HABLANDO" */
  timePrimary: string;
  /** e.g. "META: 30–45s" · "META: 30s+" */
  timeGoal: string | null;
  /** e.g. "TIEMPO LOGRADO ✓" · "TE FALTARON 6s" */
  timeStatus: string | null;
  /** Label for the next-step section (level + goal aware). */
  nextStepLabel: string;
  /** Advanced/turn views lead with speaking time. */
  timeFirst: boolean;
};

const plural = (n: number, es: boolean) => (es ? (n === 1 ? "idea" : "ideas") : n === 1 ? "idea" : "ideas");

export function objectiveResultText(result: ObjectiveResult, showEs: boolean): ObjectiveResultText {
  const es = showEs;
  const heading =
    result.mode === "turn"
      ? es ? "TU RESPUESTA FINAL" : "YOUR FINAL RESPONSE"
      : result.mode === "output"
        ? es ? "TU PRODUCCIÓN" : "YOUR OUTPUT"
        : es ? "TU RESULTADO" : "YOUR RESULT";

  let ideasPrimary: string;
  let ideasSecondary: string | null = null;
  const ideasWord = es ? "IDEAS COMPLETAS" : "COMPLETE IDEAS";
  if (result.ideas.kind === "pending") ideasPrimary = es ? "CONTANDO TUS IDEAS…" : "COUNTING YOUR IDEAS…";
  else if (result.ideas.kind === "failed") {
    ideasPrimary = "IDEAS";
    ideasSecondary = es ? "No pudimos calcularlas esta vez." : "We couldn't calculate them this time.";
  } else {
    const { count, goal, missing, met, exceeded } = result.ideas;
    ideasPrimary = goal !== null ? `${count} / ${goal} ${ideasWord}` : `${count} ${ideasWord}`;
    if (goal !== null) {
      if (exceeded) ideasSecondary = es ? "META SUPERADA ✓" : "GOAL EXCEEDED ✓";
      else if (met) ideasSecondary = es ? "META LOGRADA ✓" : "GOAL REACHED ✓";
      else
        ideasSecondary = es
          ? `TE ${missing === 1 ? "FALTÓ" : "FALTARON"} ${missing} ${plural(missing, true).toUpperCase()}`
          : `YOU NEEDED ${missing} MORE ${plural(missing, false).toUpperCase()}`;
    }
  }

  const { seconds, goal, met, missing } = result.time;
  const timePrimary = `${seconds}s ${es ? "HABLANDO" : "SPEAKING"}`;
  let timeGoal: string | null = null;
  let timeStatus: string | null = null;
  if (goal) {
    timeGoal = `${es ? "META" : "GOAL"}: ${goal.max !== null ? `${goal.min}–${goal.max}s` : `${goal.min}s+`}`;
    timeStatus = met
      ? es ? "TIEMPO LOGRADO ✓" : "TIME REACHED ✓"
      : es
        ? `TE ${missing === 1 ? "FALTÓ" : "FALTARON"} ${missing}s`
        : `${missing}s MORE NEEDED`;
  }

  const ideaGoalMet = result.ideas.kind === "count" && result.ideas.goal !== null && result.ideas.met;
  const ideaGoalMissed = result.ideas.kind === "count" && result.ideas.goal !== null && !result.ideas.met;
  let nextStepLabel: string;
  if (result.level === "advanced") nextStepLabel = es ? "🚀 LLEVA TU RESPUESTA MÁS LEJOS" : "🚀 TAKE YOUR ANSWER FURTHER";
  else if (ideaGoalMet) nextStepLabel = es ? "🚀 SIGUIENTE RETO" : "🚀 NEXT CHALLENGE";
  else if (result.level === "intermediate") nextStepLabel = es ? "➕ DESARROLLA MÁS" : "➕ DEVELOP MORE";
  else if (ideaGoalMissed) nextStepLabel = es ? "➕ PARA COMPLETAR TU META" : "➕ TO COMPLETE YOUR GOAL";
  else nextStepLabel = es ? "➕ SIGUIENTE PASO" : "➕ NEXT STEP";

  return {
    heading,
    ideasPrimary,
    ideasSecondary,
    timePrimary,
    timeGoal,
    timeStatus,
    nextStepLabel,
    timeFirst: result.mode !== "goal",
  };
}
