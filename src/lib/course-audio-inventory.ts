import type { CourseDay, ModuleId, RolePlayTurn } from "@/lib/types";
import { toneForTurn, type ModelTone } from "@/lib/model-tone";
import { rep2Chunks, rep2ChunkText, rep4Items } from "@/lib/rep-structure";
import type { LoadedModule } from "@/services/course-service";
import type { PastVerb } from "@/services/verb-bank";

/**
 * COURSE AUDIO INVENTORY
 *
 * Walks the loaded curriculum and lists every (text, voice, tone) the
 * learner-facing app can request from /api/tts. Each rule below mirrors one
 * real call site (AudioPlayer / AudioService.speak) so pre-generation asks for
 * exactly what runtime asks for — same voice, same tone, nothing extra.
 *
 * Runtime mapping recap (audio-service.ts): `voice` is "female" | "male" when
 * the call site passes one, otherwise "neutral"; `tone` defaults to "coach".
 *
 * Audited call sites (rg "<AudioPlayer|AudioService.speak"): practice.tsx
 * (QuestionBanner, Rep 1 model, Rep 2 chunk + PowerChunks, Rep 3 ShadowKaraoke,
 * Rep 4 question, Rep 5 rep5Audio/modelExample), TakeBoard (turns),
 * TestReadySprint (passage/parts/items), PastVerbCards, PastVerbCard,
 * TodaysPastVerbs. Deliberately NOT inventoried: RecordingComparison's model
 * button (component has no callers), VariantPicker / RecognitionStep (text only).
 */

export type RequestedVoice = "neutral" | "female" | "male";

export type AudioSpec = {
  text: string;
  voice: RequestedVoice;
  tone: ModelTone;
  /** Where this line is played (for the admin report / debugging). */
  source: string;
};

const asVoice = (voice: "female" | "male" | undefined): RequestedVoice => voice ?? "neutral";

function turnSpecs(turns: readonly RolePlayTurn[] | undefined, source: string): AudioSpec[] {
  if (!turns?.length) return [];
  // TakeBoard: every turn is playable (required takes + retry turn picker).
  return turns.map((turn) => ({
    text: turn.text,
    voice: asVoice(turn.voice),
    tone: toneForTurn(turn, turns),
    source,
  }));
}

/** All model-voice specs for one course day. */
export function daySpecs(moduleId: ModuleId, day: CourseDay): AudioSpec[] {
  const out: AudioSpec[] = [];
  const speaker = asVoice(day.speakerVoice);
  const tag = `${moduleId}/d${day.day}`;

  // Rep 1 + Rep 3 (ShadowKaraoke): the full model text, speaker voice, coach.
  const modelText = day.lines.map((l) => l.text).join(" ");
  if (modelText.trim()) out.push({ text: modelText, voice: speaker, tone: "coach", source: `${tag}/rep1` });

  // Rep 2: one clip per chunk (chunk grouping mirrors the Practice screen).
  for (const chunk of rep2Chunks(day)) {
    out.push({ text: rep2ChunkText(chunk), voice: speaker, tone: "coach", source: `${tag}/rep2` });
  }

  // Power Chunks: audible ONLY in Rep 2 (<PowerChunks size="full"> with audio on,
  // voice={day.speakerVoice}). Rep 1 (audio={false}), the intro banner and every
  // "mini" variant (Rep 4/5) are text-only — same text, so one clip covers it.
  if (day.powerChunks) {
    for (const text of [...day.powerChunks.core, day.powerChunks.stretch]) {
      out.push({ text, voice: speaker, tone: "coach", source: `${tag}/power` });
    }
  }

  // Past verb cards (Module 3): the card sentence, speaker voice, coach.
  for (const card of day.verbCards ?? []) {
    out.push({ text: card.sentence, voice: speaker, tone: "coach", source: `${tag}/verbcard` });
  }

  // Rep 4: max 3 prompts; ADVANCED asks with a neutral recruiter tone.
  const promptTone: ModelTone = moduleId === "advanced-1" ? "neutral" : "coach";
  for (const item of rep4Items(day)) {
    out.push({ text: item.question, voice: speaker, tone: promptTone, source: `${tag}/rep4` });
  }

  // Rep 5 question banner (Intro + Reps 1–3) and role-play turns.
  // A scenario bank (TIGERS FINAL) replaces the base prompt/turns per session.
  const scenarios = day.rep5Scenarios?.length ? day.rep5Scenarios : null;
  if (scenarios) {
    for (const scenario of scenarios) {
      out.push({ text: scenario.rep5Prompt.question, voice: speaker, tone: "coach", source: `${tag}/question` });
      out.push(...turnSpecs(scenario.rep5Turns, `${tag}/turn`));
    }
  } else {
    out.push({ text: day.rep5Prompt.question, voice: speaker, tone: "coach", source: `${tag}/question` });
    out.push(...turnSpecs(day.rep5Turns, `${tag}/turn`));
  }

  // Rep 5 (no turns): interlocutor message before the learner answers.
  const hasTurns = Boolean(scenarios ?? day.rep5Turns?.length);
  if (!hasTurns && day.rep5Audio) {
    const turn: RolePlayTurn = { id: "rep5-audio", ...day.rep5Audio };
    out.push({
      text: day.rep5Audio.text,
      voice: asVoice(day.rep5Audio.voice),
      tone: toneForTurn(turn, day.rep5Turns),
      source: `${tag}/rep5audio`,
    });
  }

  // Rep 5 help: model example, speaker voice, coach.
  if (day.modelExample) {
    out.push({ text: day.modelExample.text, voice: speaker, tone: "coach", source: `${tag}/example` });
  }

  // Test Ready Sprint: passage(s) + item audio prompts, always neutral.
  const sprint = day.testReady;
  if (sprint) {
    if (sprint.passage) {
      if (sprint.passageParts?.length) {
        for (const part of sprint.passageParts) {
          out.push({ text: part.text, voice: part.voice, tone: "neutral", source: `${tag}/tr-passage` });
        }
      } else {
        out.push({ text: sprint.passage, voice: "male", tone: "neutral", source: `${tag}/tr-passage` });
      }
    }
    for (const item of sprint.items) {
      const kind = sprint.type === "mixed" ? (item.kind ?? "quick-answers") : sprint.type;
      if (item.audio && kind !== "build-sentence") {
        out.push({ text: item.audio, voice: "female", tone: "neutral", source: `${tag}/tr-item` });
      }
    }
  }

  return out;
}

/** Past Verb Bank cards (PastVerbCard / TodaysPastVerbs): the past form, no voice → neutral, coach. */
export function verbBankSpecs(verbs: readonly PastVerb[]): AudioSpec[] {
  return verbs.map((verb) => ({ text: verb.past, voice: "neutral", tone: "coach", source: "verb-bank" }));
}

export type Inventory = {
  /** Every spec discovered, before dedupe (blank text excluded). */
  discovered: number;
  /** Deduplicated by exact (text, voice, tone) after trimming — the cache identity. */
  unique: AudioSpec[];
  /** Specs skipped because they would be rejected by /api/tts (empty or too long). */
  invalid: { spec: AudioSpec; reason: string }[];
};

export const MAX_TEXT = 1500;

/** Builds the deduplicated inventory for the given modules + verb bank. Pure; no I/O. */
export function buildInventory(modules: readonly LoadedModule[], verbs: readonly PastVerb[]): Inventory {
  const all: AudioSpec[] = [];
  for (const module of modules) {
    for (const day of module.days) all.push(...daySpecs(module.id, day));
  }
  all.push(...verbBankSpecs(verbs));

  const seen = new Set<string>();
  const unique: AudioSpec[] = [];
  const invalid: Inventory["invalid"] = [];
  let discovered = 0;
  for (const raw of all) {
    // Same normalisation as /api/tts: trimmed text.
    const spec: AudioSpec = { ...raw, text: raw.text.trim() };
    if (!spec.text) continue;
    discovered += 1;
    if (spec.text.length > MAX_TEXT) {
      invalid.push({ spec, reason: `text longer than ${MAX_TEXT} characters` });
      continue;
    }
    const id = `${spec.voice}\u0000${spec.tone}\u0000${spec.text}`;
    if (seen.has(id)) continue;
    seen.add(id);
    unique.push(spec);
  }
  return { discovered, unique, invalid };
}
