/**
 * Sequential dialogue playback for sitcom-style scenes (B1→B2 seasons).
 * Each reply plays with its own character voice, one after the other.
 */

import { AudioService } from "@/services/audio-service";
import { speakerTone, speakerVoice } from "./voices";
import type { StorybookLine } from "./types";

export type DialogueOptions = {
  rate?: number;
  /** Index of the first reply to play (used to resume where the learner left off). */
  startAt?: number;
  onLine?: (index: number | null) => void;
  /** Fired once the last reply finished on its own. */
  onDone?: () => void;
};

export type DialogueController = {
  cancel: () => void;
};

/**
 * Plays the replies in order starting at `startAt`. Returns a controller whose
 * `cancel()` stops playback but leaves the caller's active-line state alone, so
 * the player can resume from the same reply later.
 */
export function startDialogue(
  lines: readonly StorybookLine[],
  options: DialogueOptions = {},
): DialogueController {
  let cancelled = false;
  let stopCurrent: () => void = () => undefined;
  const start = Math.max(0, options.startAt ?? 0);

  const playFrom = (i: number) => {
    if (cancelled) return;
    const line = lines[i];
    if (!line) {
      options.onLine?.(null);
      options.onDone?.();
      return;
    }
    options.onLine?.(i);
    stopCurrent = AudioService.speak(line.text, {
      rate: options.rate ?? 1,
      voice: speakerVoice(line.speaker),
      tone: speakerTone(line.speaker),
      allowBrowserFallback: false,
      onEnd: () => {
        if (cancelled) return;
        // Small human beat between replies, like a real conversation.
        setTimeout(() => playFrom(i + 1), 260);
      },
    });
  };

  // Download every reply up front so the conversation never stalls mid-scene.
  const first = lines[start];
  if (first) {
    void AudioService.prefetch(first.text, speakerVoice(first.speaker), speakerTone(first.speaker)).then(() => {
      if (!cancelled) playFrom(start);
    });
    for (const line of lines.filter((_, i) => i !== start)) {
      void AudioService.prefetch(line.text, speakerVoice(line.speaker), speakerTone(line.speaker));
    }
  } else {
    playFrom(start);
  }

  return {
    cancel: () => {
      cancelled = true;
      stopCurrent();
    },
  };
}

/** Plays every line in order. Returns a cancel function (legacy callers). */
export function speakDialogue(
  lines: readonly StorybookLine[],
  options: { rate?: number; onLine?: (index: number | null) => void } = {},
): () => void {
  const controller = startDialogue(lines, options);
  return () => {
    controller.cancel();
    options.onLine?.(null);
  };
}

/** Plain-text join used for previews and fallbacks. */
export function dialogueText(lines: readonly StorybookLine[]): string {
  return lines.map((l) => l.text).join(" ");
}
