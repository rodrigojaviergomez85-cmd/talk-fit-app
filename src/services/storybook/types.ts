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

export type StorybookScene = {
  id: string;
  /** Imported illustration URL. */
  image: string;
  imageAlt: string;
  /** English sentence — always the dominant text. */
  text: string;
  /** Hand-written Spanish translation (small, on demand). */
  es: string;
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

export type StorybookEpisode = {
  id: string;
  title: string;
  titleEs: string;
  episodeLabel: { en: string; es: string };
  blurb: { en: string; es: string };
  /** Cover illustration. */
  cover: string;
  voice?: "female" | "male";
  scenes: StorybookScene[];
  quizzes: StorybookQuiz[];
  /** Final "continúa la historia" prompt. */
  continuePrompt: { en: string; es: string };
  /** Week-1 chunks the learner reuses in their own version. */
  continueWith: string[];
  /** Cliffhanger line teasing the next episode. */
  cliffhanger: { en: string; es: string };
};
