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
export type StorybookSpeaker = "narrator" | "vale" | "boss" | "kat" | "dylan" | "mateo" | "luis" | "camila" | "ana" | "beto" | "mom" | "tito" | "dani" | "morgan" | "bryan" | "sofia" | "herrera" | "reed" | "lucia" | "renata" | "marta" | "nelson" | "elena" | "barrett" | "lidia" | "keller" | "candidateM" | "candidateF" | "candidateHotel" | "mia" | "nico" | "julieta" | "oscar" | "estela";

/**
 * One conversational reply inside a scene (sitcom-style dialogue, B1→B2 seasons).
 * Scenes that use `lines` play each reply in sequence with its own character voice.
 */
export type StorybookLine = {
  speaker: StorybookSpeaker;
  text: string;
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
  /** Speaker voice for this line. Defaults to "narrator". */
  speaker?: StorybookSpeaker;
  /**
   * Optional multi-reply dialogue. When present it replaces the single line in
   * the reader; `text`/`es` stay as the plain-text fallback for older code.
   */
  lines?: StorybookLine[];
  /**
   * Characters drawn in this scene's illustration. Required for new episodes:
   * the consistency test checks that everyone who speaks here is also drawn
   * here, and artwork prompts are built from this list.
   */
  cast?: StorybookSpeaker[];
  /** Tappable words with meanings. */
  words: StorybookWord[];
};

export type StorybookSayItCheck = {
  /** Expected spoken phrase. Use `*` for a learner-supplied slot, e.g. "My name is *". */
  target: string;
  /** When true, a bare 1–2 word answer also passes (e.g. "Rodrigo" for "My name is *"). */
  allowShortAnswer?: boolean;
  /**
   * Other accepted phrasings. When the card asks the learner a question, the
   * natural answer is the main `target` and the question itself lives here.
   */
  altTargets?: string[];
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
  /**
   * When present, the card asks the learner a personal question instead of
   * asking them to repeat the story sentence. `sayIt` then works as the
   * example answer and `sayItCheck.target` carries a wildcard slot.
   */
  sayItAskEn?: string;
  sayItAskEs?: string;
  /** Optional server-side spoken check. When present, the recording is graded. */
  sayItCheck?: StorybookSayItCheck;
};

/**
 * B2 layer (Sharks and later): a phrasal verb or business idiom a character
 * actually says inside the episode. Shown on the "Say it like a native" card
 * right before the finale and recycled in later episodes of the season.
 */
export type StorybookExpression = {
  /** The expression as a native would say it, e.g. "follow up". */
  phrase: string;
  /** Conjugated or inflected forms that appear in dialogue, e.g. "showed up". */
  variants?: string[];
  /** Spanish meaning. */
  es: string;
  kind: "phrasal" | "idiom";
  /** The line from this episode where it was used. */
  example: string;
  /** Spanish translation of the example. */
  exampleEs: string;
};

export type StorybookMindsetCard = {
  /** Scene id after which the mindset card appears. */
  afterScene: string;
  phrase: string;
  /** Spanish meaning of the affirmation. */
  es: string;
};

export type StorybookHabitCard = {
  /** Scene id after which the habit card appears. */
  afterScene: string;
  phrase: string;
  /** Spanish meaning of the habit phrase. */
  es: string;
  /** Character that models the habit in the episode. */
  model: StorybookSpeaker;
  /** One-line Spanish description of what the character did. */
  modelActionEs: string;
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
  voice?: "female" | "male" | "girl";
  scenes: StorybookScene[];
  quizzes: StorybookQuiz[];
  /** Optional resilience / mindset affirmation the learner says out loud. */
  mindsetCard?: StorybookMindsetCard;
  /** Optional positive-habit micro-lesson modeled by a character. */
  habitCard?: StorybookHabitCard;
  /**
   * "Say it like a native" expressions (B2 layer). Shown on their own card
   * right before the finale; each one must be said by a character in a scene.
   */
  expressions?: StorybookExpression[];
  /** Max seconds for the final monologue recording. Defaults to 15. */
  finaleSeconds?: number;
  /** Final "continúa la historia" prompt. */
  continuePrompt: { en: string; es: string };
  /** Week-1 chunks the learner reuses in their own version. */
  continueWith: string[];
  /** Cliffhanger line teasing the next episode. */
  cliffhanger: { en: string; es: string };
};
