/**
 * Shared domain types for FLUENCY REPS.
 * MVP: no automatic evaluation — only objective, measurable practice data.
 */

/** One model line of the day, split into natural speaking chunks. */
export type ModelLine = {
  id: string;
  /** English text (always visually dominant). */
  text: string;
  /** Hand-written Spanish translation (secondary support). */
  es: string;
  /** Natural speaking chunks. */
  chunks: string[];
  /** Day 4 only: question or answer turn. */
  role?: "q" | "a" | undefined;
};

/** Rep 4 personalization prompt. */
export type PersonalPrompt = {
  id: string;
  question: string;
  questionEs: string;
  starter: string;
  starterEs: string;
};

/** Step 0 — very short grammar intro. */
export type DayIntro = {
  title: string;
  titleEs: string;
  lead: string;
  leadEs: string;
  examples: string[];
  goal: string;
  goalEs: string;
  cta: string;
};

/** Day 5 mini challenge. */
export type Challenge = {
  id: string;
  title: string;
  titleEs: string;
  detail: string;
  detailEs: string;
  cues: string[];
};

export type CourseDay = {
  day: number;
  focus: string;
  focusEs: string;
  topic: string;
  topicEs: string;
  goalSeconds: [number, number];
  estimatedMinutes: string;
  intro: DayIntro;
  /** The day's core model lines — recycled across Reps 1–4. */
  lines: ModelLine[];
  prompts: PersonalPrompt[];
  cues: string[];
  challenges?: Challenge[] | undefined;
  /** Optional non-Simple-Present speaking extension. */
  fluencyBonus?: { text: string; es: string } | undefined;
};

export type Recording = {
  id: string;
  /** Object URL for playback (session-scoped). */
  url: string | null;
  durationSeconds: number;
  createdAt: string;
  label: string;
  /** Raw audio blob (session-scoped), used for cloud upload. */
  blob?: Blob | undefined;
};

export type SelfAssessment = "not-yet" | "a-little" | "definitely";

/** Objective record of one completed day. */
export type DayRecord = {
  day: number;
  /** Local YYYY-MM-DD key of completion. */
  dayKey: string;
  completedAt: string;
  /** Duration of the saved final recording. */
  finalSeconds: number;
  /** Duration of attempt 1 (for the first-vs-final comparison). */
  firstSeconds: number;
  /** Total recorded seconds during the day. */
  practiceSeconds: number;
  /** Number of full recordings made in Rep 5. */
  recordingsCount: number;
  /** Session-scoped object URL of the final recording. */
  finalUrl?: string | null | undefined;
  /** Session-scoped object URL of attempt 1. */
  firstUrl?: string | null | undefined;
  /** Cloud storage path of the final recording, when signed in. */
  recordingPath?: string | null | undefined;
  selfAssessment?: SelfAssessment | undefined;
};

export type JourneyState = {
  /** Completed days, keyed by day number. */
  days: Record<number, DayRecord>;
  streakDays: number;
  /** Local YYYY-MM-DD key of the last completed day. */
  lastCompletedDate?: string | undefined;
  totalRepsCompleted: number;
  totalSpeakingSeconds: number;
  /** Speaking seconds keyed by local day, used for the weekly total. */
  weekSeconds: Record<string, number>;
  selfAssessment?: SelfAssessment | undefined;
};
