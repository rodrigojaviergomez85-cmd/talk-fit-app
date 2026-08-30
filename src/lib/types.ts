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
  /** Short visual cue shown above the question (e.g. NAME, AGE). */
  cue?: string | undefined;
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

/** Learning module identifier. */
export type ModuleId = "basic-zero" | "simple-present" | "past-stories";

/** Image → action → past verb → spoken sentence (Module 3). */
export type VerbCard = {
  id: string;
  /** Imported image asset. */
  src: string;
  alt: string;
  /** Base form, e.g. WAKE UP. */
  present: string;
  /** Past form, e.g. WOKE UP. */
  past: string;
  /** Model sentence using the past form. */
  sentence: string;
  /** Optional Spanish support: "despertarse → me desperté". */
  es?: string | undefined;
  /** Show the action crossed out (didn't + base verb contrast). */
  negative?: { sentence: string; es?: string | undefined } | undefined;
};

/** One illustration of the week's story (Module 3, Week 4). */
export type StoryPanel = {
  id: string;
  src: string;
  alt: string;
  /** Sequencing cue: ONE DAY, THEN, SUDDENLY… */
  cue: string;
  /** Optional caption, hidden on the final storytelling challenge. */
  caption?: string | undefined;
  captionEs?: string | undefined;
};


export type CourseDay = {
  day: number;
  /** Week number inside the module (Basic Zero only). */
  week?: 1 | 2 | 3 | 4 | undefined;
  weekTitle?: string | undefined;
  weekTitleEs?: string | undefined;
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
  /** Rep 5 main question the learner answers with their free talk. */
  rep5Prompt: { question: string; questionEs: string };
  /** Short bilingual guidance shown with the Rep 5 question. */
  rep5Tips?: { en: string; es: string } | undefined;
  /** Optional model monologue for Rep 5 — how a complete answer should sound. */
  modelExample?: { text: string; es: string } | undefined;
  /** Model voice for this day's character (Basic Zero). Omitted = neutral. */
  speakerVoice?: "female" | "male";
  /** Instructional picture the whole day is built around (Present Progressive). */
  sceneImage?: { src: string; alt: string; altEs: string } | undefined;
  /** Optional choices the learner can talk about instead of the model person/process. */
  variants?: { id: string; label: string; labelEs: string }[] | undefined;
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
  /** Estimated number of complete spoken ideas (Rep 5 only). */
  sentenceCount?: number | null | undefined;
  /** Status of the sentence estimate. */
  countStatus?: "pending" | "done" | "failed" | undefined;
};

export type SelfAssessment = "not-yet" | "a-little" | "definitely";

/** Objective record of one completed day. */
export type DayRecord = {
  day: number;
  /** Module the day belongs to. */
  moduleId: ModuleId;
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
  /** Estimated complete spoken ideas in the final recording. */
  sentenceCount?: number | null | undefined;
  /** Session-scoped object URL of the final recording. */
  finalUrl?: string | null | undefined;
  /** Session-scoped object URL of attempt 1. */
  firstUrl?: string | null | undefined;
  /** Cloud storage path of the final recording, when signed in. */
  recordingPath?: string | null | undefined;
  selfAssessment?: SelfAssessment | undefined;
};

export type JourneyState = {
  /** Completed days, keyed by `${moduleId}:${day}`. */
  days: Record<string, DayRecord>;

  streakDays: number;
  /** Local YYYY-MM-DD key of the last completed day. */
  lastCompletedDate?: string | undefined;
  totalRepsCompleted: number;
  totalSpeakingSeconds: number;
  /** Speaking seconds keyed by local day, used for the weekly total. */
  weekSeconds: Record<string, number>;
  selfAssessment?: SelfAssessment | undefined;
};
