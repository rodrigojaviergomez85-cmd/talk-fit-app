/**
 * Interactive stories — read-aloud (karaoke) + TPRS content.
 * All text is hand-written: no runtime AI calls and no live translation.
 */

export type StoryLine = {
  id: string;
  /** English sentence — always the dominant text. */
  text: string;
  /** Hand-written Spanish meaning shown when the learner taps the line. */
  es: string;
};

export type StoryWord = {
  /** Base word as it appears in the story. */
  word: string;
  /** Spanish meaning. */
  es: string;
  /** The sentence where the word shows up (English). */
  from: string;
};

export type StoryQuestion = {
  id: string;
  en: string;
  es: string;
};

export type InteractiveStory = {
  id: string;
  title: string;
  titleEs: string;
  level: "basic" | "intermediate" | "advanced";
  /** Short bilingual teaser. */
  blurb: { en: string; es: string };
  voice?: "female" | "male";
  lines: StoryLine[];
  /** Vocabulary notebook entries (8-12 per story). */
  vocab: StoryWord[];
  /** TPRS comprehension questions asked out loud. */
  questions: StoryQuestion[];
  /** Words the learner should reuse when continuing the story. */
  continueWith: string[];
};

/** Full story text used for the karaoke audio. */
export function storyText(story: InteractiveStory): string {
  return story.lines.map((line) => line.text).join(" ");
}
