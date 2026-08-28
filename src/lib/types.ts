/**
 * Shared domain types for FLUENCY REPS.
 * Version 1 (guided reps) and Version 2 (AI coach) share this model, so the
 * mock services can be swapped for real APIs without touching the UI.
 */

export type Chunk = {
  id: string;
  text: string;
  /** Hand-written Spanish translation (for Spanish-speaking beginners). */
  es?: string;
};

export type ModelSentence = {
  id: string;
  /** Full sentence text. */
  text: string;
  /** Sentence split into natural speaking chunks. */
  chunks: string[];
  /** Hand-written Spanish translation. */
  es?: string;
};

export type PersonalPrompt = {
  id: string;
  question: string;
  starter: string;
  /** Spanish translation of the question. */
  questionEs?: string;
  /** Spanish translation of the starter. */
  starterEs?: string;
};

export type Lesson = {
  id: string;
  grammar: string;
  topic: string;
  level: string;
  goalSeconds: [number, number];
  focus: string;
  estimatedMinutes: string;
  sentences: ModelSentence[];
  /** Reusable automaticity chunks (Rep 4). */
  automaticityChunks: Chunk[];
  prompts: PersonalPrompt[];
  cues: string[];
  checklist: string[];
  /** Spanish translations for the checklist, same order. */
  checklistEs?: string[];

};

export type Recording = {
  id: string;
  /** Object URL for playback (session-scoped). */
  url: string | null;
  durationSeconds: number;
  createdAt: string;
  label: string;
  /** Raw audio blob (session-scoped), used for server-side transcription. */
  blob?: Blob | undefined;
};

export type GrammarIssue = {
  id: string;
  category: "third-person-s" | "because" | "future" | "frequency" | "other";
  said: string;
  correct: string;
  note: string;
};

export type FluencyMetrics = {
  seconds: number;
  words: number;
  wordsPerMinute: number;
  longPauses: number;
  fillerWords: number;
  sentences: number;
  continuityNote: string;
};

export type PronunciationTarget = {
  word: string;
  tip: string;
};

export type RhythmTarget = {
  wordByWord: string;
  chunked: string;
};

export type StructureCheck = {
  label: string;
  passed: boolean;
  detail?: string;
};

export type ScoreBreakdown = {
  fluency: number;
  pronunciation: number;
  grammarAutomaticity: number;
  rhythm: number;
  targetStructure: number;
};

export type SpeechAnalysis = {
  id: string;
  createdAt: string;
  transcript: string;
  grammarIssues: GrammarIssue[];
  fluency: FluencyMetrics;
  pronunciation: PronunciationTarget[];
  rhythm: RhythmTarget[];
  structure: StructureCheck[];
  score: number;
  breakdown: ScoreBreakdown;
  didWell: string;
  oneThingToImprove: string;
  focusLabel: string;
};


export type QuickFix = {
  focusLabel: string;
  variations: string[];
};

export type MistakeEntry = {
  id: string;
  category: GrammarIssue["category"];
  categoryLabel: string;
  wrong: string;
  right: string;
  occurrences: number;
  lastSeen: string;
};

export type SessionResult = {
  date: string;
  lessonId: string;
  score: number;
  breakdown: ScoreBreakdown;
  finalSeconds: number;
  fixed: string[];
  transcript: string;
};

export type LearnerProfile = {
  studentId: string;
  name: string;
  level: string;
  lessonsCompleted: number;
  streakDays: number;
  speakingMinutesThisWeek: number;
  weeklyGoalMinutes: number;
  totalSpeakingMinutes: number;
  fluencyScore: number;
  bestContinuousSeconds: number;
  history: { day: number; score: number; label: string }[];
  sessions: SessionResult[];
  mistakes: MistakeEntry[];
  strongestSkill: string;
  priorities: string[];
  /** Local date (YYYY-MM-DD) of the last day the 5 daily reps were completed. */
  lastCompletedDate?: string;
  /** Reps completed on `lastCompletedDate`. */
  repsCompletedToday?: number;
};

