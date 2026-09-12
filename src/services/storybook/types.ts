/**
 * Animated storybook episodes — "pasa la página" reading with TPRS.
 * All text is hand-written: no runtime AI calls and no live translation.
 */

export type StorybookWord = {
  /** Word as it appears in the scene text (case-insensitive match). */
  word: string;
  /** Spanish meaning shown in the popover. */
  es: string;
};

/** Who speaks the scene line — drives the per-character TTS voice. */
export type StorybookSpeaker = "narrator" | "vale" | "boss" | "kat" | "dylan" | "mateo";

export type StorybookScene = {
  id: string;
  /** Imported illustration URL. */
  image: string;
  imageAlt: string;
  /** English sentence — always the dominant text. */
  text: string;
  /** Hand-written Spanish translation (small, on demand). */
  es: string;
  /** Speaker voice for this line. Defaults to "narrator". */
  speaker?: StorybookSpeaker;
  /** Tappable words with meanings. */
  words: StorybookWord[];
};

export type StorybookQuiz = {
  id: string;
  /** The quiz slide appears right after this scene id. */
  afterScene: string;
  questionEn: string;
  questionEs: string;
  options: { label: string; emoji: string }[];
  /** Index of the correct option. */
  answer: number;
  /** Phrase the learner says out loud after answering. */
  sayIt: string;
  sayItEs: string;
};

export type StorybookMindsetCard = {
  /** Scene id after which the mindset card appears. */
  afterScene: string;
  phrase: string;
  /** Spanish meaning of the affirmation. */
  es: string;
};

export type StorybookEpisode = {
  id: string;
  /** Curriculum module this episode belongs to (a season). */
  moduleId: string;
  /** Week inside the module (1-4). Drives unlocking and language scope. */
  week: 1 | 2 | 3 | 4;
  title: string;
  titleEs: string;
  episodeLabel: { en: string; es: string };
  /** 3 bullet "Previously…" recap shown on the cover (from episode 2 on). */
  previously?: { en: string; es: string }[];
  /** Words from earlier episodes reviewed in the flash review. */
  reviewWords?: StorybookWord[];
  blurb: { en: string; es: string };
  /** Cover illustration. */
  cover: string;
  voice?: "female" | "male";
  scenes: StorybookScene[];
  quizzes: StorybookQuiz[];
  /** Optional resilience / mindset affirmation the learner says out loud. */
  mindsetCard?: StorybookMindsetCard;
  /** Final "continúa la historia" prompt. */
  continuePrompt: { en: string; es: string };
  /** Week-1 chunks the learner reuses in their own version. */
  continueWith: string[];
  /** Cliffhanger line teasing the next episode. */
  cliffhanger: { en: string; es: string };
};
