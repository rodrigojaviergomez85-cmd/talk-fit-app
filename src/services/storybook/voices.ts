/**
 * Per-character storybook voices.
 *
 * Single source of truth for "who sounds like what", so a test can assert that
 * no two characters that share a season also share the same voice + tone.
 */

import type { ModelVoice } from "@/services/audio-service";
import type { ModelTone } from "@/lib/model-tone";
import type { StorybookSpeaker } from "./types";

/** Per-character model voice; the narrator is the default warm neutral voice. */
export function speakerVoice(speaker: StorybookSpeaker | undefined): ModelVoice {
  if (speaker === "vale") return "girl";
  if (speaker === "boss") return "boss";
  if (speaker === "kat") return "femaleBright";
  if (speaker === "dylan") return "youngMaleCalm";
  if (speaker === "mateo") return "youngMale";
  if (speaker === "luis") return "male";
  if (speaker === "camila") return "female";
  if (speaker === "ana") return "femaleMature";
  if (speaker === "beto") return "shyBoy";
  if (speaker === "dani") return "teenBoy";
  if (speaker === "mom") return "femaleMature";
  if (speaker === "tito") return "elder";
  if (speaker === "morgan") return "femaleMature";
  if (speaker === "bryan") return "male";
  if (speaker === "sofia") return "femaleBright";
  return "neutral";
}

/** Vale speaks playful and a little shy; every other voice uses the natural story tone. */
export function speakerTone(speaker: StorybookSpeaker | undefined): ModelTone {
  if (speaker === "vale") return "playful";
  if (speaker === "mateo") return "cheerful";
  if (speaker === "dylan") return "youthful";
  if (speaker === "beto") return "shy";
  if (speaker === "dani") return "earnest";
  if (speaker === "mom") return "warm";
  if (speaker === "morgan") return "pro";
  if (speaker === "bryan") return "pro";
  if (speaker === "sofia") return "warm";
  return "story";
}

/** Voice identity used for uniqueness checks: same voice + same tone = same sound. */
export function speakerSound(speaker: StorybookSpeaker | undefined): string {
  return `${speakerVoice(speaker)}::${speakerTone(speaker)}`;
}

/** Display name shown above a dialogue reply. */
export function speakerName(speaker: StorybookSpeaker | undefined): string {
  const names: Record<StorybookSpeaker, string> = {
    narrator: "Narrator",
    vale: "Vale",
    boss: "Boss",
    kat: "Kat",
    dylan: "Dylan",
    mateo: "Mateo",
    luis: "Luis",
    camila: "Camila",
    ana: "Ana",
    beto: "Beto",
    mom: "Mom",
    tito: "Don Tito",
    dani: "Dani",
    morgan: "Morgan",
    bryan: "Bryan",
    sofia: "Sofía",
  };
  return names[speaker ?? "narrator"];
}
