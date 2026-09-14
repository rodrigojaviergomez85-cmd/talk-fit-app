/**
 * TTS ALLOWLIST (report-only by default).
 *
 * Every text a learner can send to /api/tts comes from authored content, so a
 * text outside that set is by definition not a learner need. Because the
 * authored set is wide, this ships in report mode: /api/tts logs whether a
 * generation was inside the set and only enforces when
 * app_settings.tts_allowlist_enforce is flipped to true.
 *
 * Matching is on TEXT ONLY (voice and tone are already closed enums validated
 * by normalizeSpec, and text is the cost driver). Normalisation: trim, collapse
 * internal whitespace, lowercase.
 *
 * SOURCES INCLUDED (every call site of AudioService.speak / loadModelAudio that
 * reads from an importable data module):
 *  - buildInventory over all curriculum modules + the past-verb bank:
 *    Rep 1 / Rep 3 model text, Rep 2 chunks and Power Chunks, Rep 4 questions,
 *    Rep 5 model examples, role-play turns (TakeBoard), Test-Ready passages,
 *    and the verb cards (base / past / participle).
 *  - The 20 Review modules: every practice is converted with
 *    reviewPracticeToCourseDay and run through the same daySpecs the course
 *    uses, so lines, chunks, Power Chunks and Rep 4 items match exactly.
 *  - The three interview simulators, from the plain data module
 *    src/services/interview-prompts.ts (the routes keep only the video map).
 *  - Storybook episodes (all seasons): scene text, every dialogue line,
 *    quiz questions, say-it phrases and personal-question prompts, mindset
 *    affirmations and habit-card phrases — StorybookPlayer's call sites.
 *  - Natural Method idioms (phrase + example), including the ", " variant
 *    NaturalMethodPager speaks in place of " / ".
 *  - Review Pictionary words and Call Center phrases — same SpeakButton.
 *  - Every individual word token of all of the above, produced both by the
 *    tokenizeWords TappableSentence uses and by the simpler strip rule
 *    Rep2Feedback uses, because tap-a-word pronunciation sends single words
 *    (also covers SlowWordPanel, EdReminder and the storybook word popover).
 *
 * NOT COVERED YET: nothing known. Every screen that can reach /api/tts reads
 * from one of the sources above. Report mode stays on until the log confirms
 * it (select in_allowlist, count(*) from tts_generation_log ...).
 */

import { buildInventory } from "@/lib/course-audio-inventory";
import { tokenizeWords } from "@/lib/syllables";

function normalize(text: string): string {
  return text.trim().replace(/\s+/g, " ").toLowerCase();
}

export { normalize as normalizeTtsText };

async function collectTexts(): Promise<string[]> {
  const texts: string[] = [];

  // 1) Curriculum + verb bank, exactly as the pre-generation inventory sees it.
  const { CourseService } = await import("@/services/course-service");
  const { PAST_VERBS } = await import("@/services/verb-bank");
  const modules = await Promise.all(CourseService.modules().map((m) => CourseService.loadModule(m.id)));
  for (const spec of buildInventory(modules, PAST_VERBS).unique) texts.push(spec.text);

  // 2) Storybook episodes (all seasons).
  const { STORYBOOK_EPISODES } = await import("@/services/storybook");
  for (const episode of STORYBOOK_EPISODES) {
    for (const scene of episode.scenes) {
      texts.push(scene.text);
      for (const line of scene.lines ?? []) texts.push(line.text);
      for (const word of scene.words ?? []) texts.push(word.word);
    }
    for (const quiz of episode.quizzes ?? []) {
      texts.push(quiz.questionEn, quiz.sayIt);
      if (quiz.sayItAskEn) texts.push(quiz.sayItAskEn);
    }
    if (episode.mindsetCard) texts.push(episode.mindsetCard.phrase);
    if (episode.habitCard) texts.push(episode.habitCard.phrase);
  }

  // 3) Natural Method idioms.
  const { IDIOMS } = await import("@/services/natural-method-idioms");
  for (const idiom of IDIOMS) texts.push(idiom.phrase, idiom.example);

  // 4) Review word banks.
  const { PICTIONARY_CATEGORIES } = await import("@/services/review/pictionary");
  for (const category of PICTIONARY_CATEGORIES) for (const word of category.words) texts.push(word.en);
  const { CALL_CENTER_CATEGORIES } = await import("@/services/review/call-center-phrases");
  for (const category of CALL_CENTER_CATEGORIES) for (const phrase of category.phrases) texts.push(phrase.en);

  // 5) Review modules: ReviewPracticeFlow plays them with the same components
  // as the course, so run every practice through the very same daySpecs rules.
  const { listReviewModules, reviewPracticeToCourseDay } = await import("@/services/review/review-registry");
  const { daySpecs } = await import("@/lib/course-audio-inventory");
  for (const module of listReviewModules()) {
    for (const practice of module.practices) {
      // Cast is safe: daySpecs uses the id only for the source tag and prompt
      // tone, and this allowlist matches on text only.
      for (const spec of daySpecs(module.id as unknown as ModuleId, reviewPracticeToCourseDay(practice))) {
        texts.push(spec.text);
      }
    }
  }

  // 6) Interview simulators (text-only data module; the routes keep the clips).
  const { BASIC_INTERVIEW_PROMPTS, INTERMEDIATE_INTERVIEW_PROMPTS, ADVANCED_INTERVIEW_PROMPTS } = await import(
    "@/services/interview-prompts"
  );
  for (const prompt of [...BASIC_INTERVIEW_PROMPTS, ...INTERMEDIATE_INTERVIEW_PROMPTS, ...ADVANCED_INTERVIEW_PROMPTS]) {
    texts.push(prompt.en);
  }

  return texts;
}

/** Rep2Feedback's single-word cleanup: keep letters, digits, apostrophes, hyphens. */
function rep2FeedbackTokens(raw: string): string[] {
  return raw
    .split(/\s+/)
    .map((word) => word.replace(/^[^\p{L}\p{N}'-]+/gu, "").replace(/[^\p{L}\p{N}'-]+$/gu, ""))
    .filter(Boolean);
}

async function build(): Promise<Set<string>> {
  const set = new Set<string>();
  for (const raw of await collectTexts()) {
    if (typeof raw !== "string") continue;
    const text = normalize(raw);
    if (!text) continue;
    set.add(text);
    // SpeakButton strips the " / " separator before speaking.
    if (raw.includes(" / ")) set.add(normalize(raw.replaceAll(" / ", ", ")));
    // Tap-a-word pronunciation sends single words.
    for (const token of tokenizeWords(raw)) {
      if (token.isWord) set.add(normalize(token.value));
    }
    // Rep2Feedback cleans single words with a slightly different rule.
    for (const token of rep2FeedbackTokens(raw)) {
      const word = normalize(token);
      if (word) set.add(word);
    }
  }
  return set;
}

let cached: Promise<Set<string>> | null = null;

/** Memoized per server process; the curriculum is static at runtime. */
export function ttsAllowlist(): Promise<Set<string>> {
  cached ??= build().catch((error) => {
    console.error(`[tts-allowlist] build failed: ${String(error)}`);
    cached = null;
    // Fail open: report mode must never block a learner.
    return new Set<string>();
  });
  return cached;
}

export async function isAllowedTtsText(text: string): Promise<boolean> {
  const key = normalize(text ?? "");
  if (!key) return false;
  return (await ttsAllowlist()).has(key);
}

/** Test-only: forget the memoized set. */
export function resetTtsAllowlistForTests(): void {
  cached = null;
}
