/**
 * Sequential dialogue playback for sitcom-style scenes (B1→B2 seasons).
 * Each reply plays with its own character voice, one after the other.
 */

import { AudioService } from "@/services/audio-service";
import { speakerTone, speakerVoice } from "./voices";
import type { StorybookLine } from "./types";

/** Plays every line in order. Returns a cancel function. */
export function speakDialogue(
  lines: readonly StorybookLine[],
  options: { rate?: number; onLine?: (index: number | null) => void } = {},
): () => void {
  let cancelled = false;
  let stopCurrent: () => void = () => undefined;

  const playFrom = (i: number) => {
    if (cancelled) return;
    const line = lines[i];
    if (!line) {
      options.onLine?.(null);
      return;
    }
    options.onLine?.(i);
    stopCurrent = AudioService.speak(line.text, {
      rate: options.rate ?? 1,
      voice: speakerVoice(line.speaker),
      tone: speakerTone(line.speaker),
      onEnd: () => {
        if (cancelled) return;
        // Small human beat between replies, like a real conversation.
        setTimeout(() => playFrom(i + 1), 260);
      },
    });
  };

  playFrom(0);

  return () => {
    cancelled = true;
    stopCurrent();
    options.onLine?.(null);
  };
}

/** Plain-text join used for previews and fallbacks. */
export function dialogueText(lines: readonly StorybookLine[]): string {
  return lines.map((l) => l.text).join(" ");
}
