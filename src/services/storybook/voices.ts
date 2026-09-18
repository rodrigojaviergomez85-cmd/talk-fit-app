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
  if (speaker === "dani") return "youngMale";
  if (speaker === "mom") return "femaleMature";
  if (speaker === "tito") return "elder";
  if (speaker === "morgan") return "femaleMature";
  if (speaker === "bryan") return "male";
  if (speaker === "sofia") return "femaleBright";
  if (speaker === "herrera") return "boss";
  if (speaker === "reed") return "boss";
  if (speaker === "lucia") return "femaleBright";
  if (speaker === "renata") return "femaleMature";
  if (speaker === "marta") return "femaleBright";
  if (speaker === "nelson") return "male";
  if (speaker === "elena") return "femaleMature";
  if (speaker === "barrett") return "female";
  if (speaker === "lidia") return "femaleMature";
  if (speaker === "mia") return "femaleBright";
  if (speaker === "nico") return "youngMaleCalm";
  if (speaker === "julieta") return "female";
  if (speaker === "oscar") return "shyBoy";
  if (speaker === "estela") return "femaleMature";
  if (speaker === "caller") return "femaleMature";
  if (speaker === "keller") return "femaleBright";
  if (speaker === "candidateM") return "youngMaleCalm";
  if (speaker === "candidateF") return "femaleBright";
  if (speaker === "candidateHotel") return "femaleMature";
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
  if (speaker === "morgan") return "tense";
  if (speaker === "bryan") return "sly";
  if (speaker === "sofia") return "warm";
  if (speaker === "herrera") return "pro";
  if (speaker === "reed") return "tense";
  if (speaker === "lucia") return "earnest";
  if (speaker === "renata") return "cheerful";
  if (speaker === "marta") return "warm";
  if (speaker === "nelson") return "pro";
  if (speaker === "elena") return "warm";
  if (speaker === "barrett") return "pro";
  if (speaker === "lidia") return "pro";
  if (speaker === "mia") return "bright";
  if (speaker === "nico") return "neutral";
  if (speaker === "julieta") return "earnest";
  if (speaker === "oscar") return "nervous";
  if (speaker === "estela") return "story";
  if (speaker === "caller") return "neutral";
  if (speaker === "keller") return "pro";
  if (speaker === "candidateM") return "neutral";
  if (speaker === "candidateF") return "neutral";
  if (speaker === "candidateHotel") return "story";
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
    herrera: "Mr. Herrera",
    reed: "Mr. Reed",
    lucia: "Lucía",
    renata: "Renata",
    marta: "Marta",
    nelson: "Nelson",
    elena: "Elena",
    barrett: "Ms. Barrett",
    lidia: "Lidia",
    mia: "Mía",
    nico: "Nico",
    julieta: "Julieta",
    oscar: "Óscar",
    estela: "Doña Estela",
    caller: "Customer",
    keller: "Ms. Keller",
    candidateM: "Candidate",
    candidateF: "Candidate",
    candidateHotel: "Candidate",
  };
  return names[speaker ?? "narrator"];
}

/**
 * Some characters are shown as "Candidate" before the story reveals their name.
 * They are the same person, so voice-uniqueness checks fold them together.
 */
const SPEAKER_ALIASES: Partial<Record<StorybookSpeaker, StorybookSpeaker>> = {
  candidateHotel: "ana",
};

/** Canonical identity of a speaker (an alias resolves to the named character). */
export function canonicalSpeaker(speaker: StorybookSpeaker): StorybookSpeaker {
  return SPEAKER_ALIASES[speaker] ?? speaker;
}
