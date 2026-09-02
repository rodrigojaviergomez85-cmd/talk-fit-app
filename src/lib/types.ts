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

/** TIGERS micro-label shown with a Rep 4 / Rep 5 instruction: EXPLICA · JUSTIFICA · DEFIENDE. */
export type RepLabel = "explain" | "justify" | "defend" | "react" | "clarify" | "adapt";

/** Rep 4 personalization prompt. */
export type PersonalPrompt = {
  id: string;
  question: string;
  questionEs: string;
  starter: string;
  starterEs: string;
  /** Short visual cue shown above the question (e.g. NAME, AGE). */
  cue?: string | undefined;
  /** Optional TIGERS behavior label for this prompt. */
  label?: RepLabel | undefined;
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

/** Learning module identifier. Frozen once shipped — progress and recordings are keyed to it. */
export type ModuleId = "basic-zero" | "simple-present" | "past-stories" | "simple-future" | "mixed-tenses" | "eagles-week-1" | "tigers" | "sharks";

/** Test Ready Sprint types (EAGLES pilot). Practice only — never scored. */
export type TestReadyType = "repeat" | "quick-answers" | "build-sentence" | "listen-respond" | "speak-now" | "story-retell";

/** One sprint item: something to hear/see, then say. */
export type TestReadyItem = {
  id: string;
  /** Audio prompt spoken by the app (sentence to repeat, question to answer). */
  audio?: string | undefined;
  /** Visible chunks (Build the Sentence) or cue words (Speak Now). */
  chunks?: string[] | undefined;
  /** Visible prompt text (questions in Listen & Respond, Speak Now topic). */
  text?: string | undefined;
  textEs?: string | undefined;
  /** Max seconds for the spoken answer. */
  maxSeconds?: number | undefined;
};

/** Optional 3–5 minute Test Ready Sprint attached to a day. */
export type TestReadySprint = {
  type: TestReadyType;
  title: string;
  titleEs: string;
  instruction: string;
  instructionEs: string;
  items: TestReadyItem[];
  /** Listen & Respond: passage played once before the questions. */
  passage?: string | undefined;
  /** Two-speaker passages (SHARKS): played in order with alternating voices. `passage` stays as the text fallback. */
  passageParts?: { voice: "female" | "male"; text: string }[] | undefined;
  /** Speak Now: seconds to think before the mic opens. */
  thinkSeconds?: number | undefined;
  /** Speak Now: target speaking seconds. */
  speakSeconds?: number | undefined;
  /** Repeat It: play each sentence only once. */
  playOnce?: boolean | undefined;
};

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
  /** Past verb visual cards (Module 3, Weeks 1–2). */
  verbCards?: VerbCard[] | undefined;
  /** Story illustrations (Module 3, Week 4). */
  storyPanels?: StoryPanel[] | undefined;
  /** Minimum complete spoken ideas targeted in Rep 5 (default 5). */
  goalSentences?: number | undefined;
  /** Hide model sentences by default (final storytelling challenge). */
  hideModelText?: boolean | undefined;
  /** Optional Rep 2 chunk override: groups of line ids recorded together. */
  rep2Chunks?: string[][] | undefined;
  /** Rep 5 only: a customer/interlocutor message played before the learner answers (EAGLES). */
  rep5Audio?: { label: string; labelEs: string; text: string; es: string; voice?: "female" | "male" | undefined } | undefined;
  /** Separate Test Ready Sprint for this day (EAGLES pilot). */
  testReady?: TestReadySprint | undefined;
  /** 2 core + 1 stretch connector chunks automated across the day's reps (EAGLES). */
  powerChunks?: PowerChunks | undefined;
  /** Rep 5 controlled multi-turn role play: fixed interlocutor line before take N (EAGLES Sales). */
  rep5Turns?: RolePlayTurn[] | undefined;
  /** Small fixed language toolbox shown before a role play (EAGLES Sales). */
  rep5Toolbox?: string[] | undefined;
  /** Optional TIGERS behavior label for the Rep 5 instruction. */
  rep5Label?: RepLabel | undefined;
  /**
   * TIGERS FINAL: small prewritten scenario bank. One scenario is picked at
   * random (never generated) when the learner opens the day and is kept for
   * that day's session. Overrides rep5Prompt / rep5Turns / rep5Tips.
   */
  rep5Scenarios?: Rep5Scenario[] | undefined;
  /** The scenario applied for this session (set by CourseService.withScenario, never authored). */
  rep5Scenario?: Rep5Scenario | undefined;
  /** Cue skeleton shown with a scenario bank (defaults to the TIGERS list). */
  rep5Skeleton?: string[] | undefined;
};

/** One prewritten Rep 5 scenario (TIGERS FINAL bank). */
export type Rep5Scenario = {
  id: string;
  /** Category chip: WORK · CUSTOMER · LIFE. */
  label: string;
  labelEs: string;
  /** Short situation shown above the question. */
  situation: string;
  situationEs: string;
  rep5Prompt: { question: string; questionEs: string };
  rep5Turns: RolePlayTurn[];
};

/** Small set of connector chunks: automate, don't memorize lists. */
export type PowerChunks = {
  core: [string, string];
  stretch: string;
};

/** One prewritten interlocutor turn (never generated). */
export type RolePlayTurn = {
  id: string;
  label: string;
  labelEs: string;
  text: string;
  es: string;
  voice?: "female" | "male" | undefined;
};

/** Wall-clock seconds spent on each rep (pilot analytics, never shown). */
export type RepDurations = {
  rep1: number;
  rep2: number;
  rep3: number;
  rep4: number;
  rep5: number;
  total: number;
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
  /** Seconds spent per rep (pilot analytics). */
  repDurations?: RepDurations | null | undefined;
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
