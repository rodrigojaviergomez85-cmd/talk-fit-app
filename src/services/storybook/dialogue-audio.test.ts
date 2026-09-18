import { beforeEach, describe, expect, it, vi } from "vitest";

type SpeakOptions = { onEnd?: () => void; gain?: number };
type SpeakCall = [text: string, options: SpeakOptions];

const speakMock = vi.fn<(text: string, options: SpeakOptions) => () => void>(() => () => undefined);
const prefetchMock = vi.fn<(text: string, voice?: unknown, tone?: unknown) => Promise<void>>(() => Promise.resolve());

vi.mock("@/services/audio-service", () => ({
  AudioService: {
    speak: (text: string, options: SpeakOptions) => speakMock(text, options),
    prefetch: (text: string, voice?: unknown, tone?: unknown) => prefetchMock(text, voice, tone),
    stop: vi.fn(),
  },
}));

import { startDialogue } from "./dialogue-audio";
import type { StorybookLine } from "./types";

const lines: StorybookLine[] = [
  { speaker: "vale", text: "Line one.", es: "Uno." },
  { speaker: "dani", text: "Line two.", es: "Dos." },
  { speaker: "narrator", text: "Line three.", es: "Tres." },
];

const quietVoiceLines: StorybookLine[] = [
  { speaker: "oscar", text: "Oscar line.", es: "Óscar." },
  { speaker: "mia", text: "Mia line.", es: "Mía." },
];

function spokenText(index: number): string {
  return (speakMock.mock.calls[index] as SpeakCall)[0];
}

function finishLine(index: number) {
  (speakMock.mock.calls[index] as SpeakCall)[1].onEnd?.();
}

describe("startDialogue single-line playback", () => {
  beforeEach(() => {
    speakMock.mockClear();
    prefetchMock.mockClear();
    vi.useFakeTimers();
  });

  it("plays one line and stops instead of continuing", async () => {
    const done = vi.fn();
    startDialogue([lines[0]!], { startAt: 0, onDone: done });
    await vi.runAllTimersAsync();
    expect(speakMock).toHaveBeenCalledTimes(1);
    expect(spokenText(0)).toBe("Line one.");
    finishLine(0);
    await vi.runAllTimersAsync();
    expect(speakMock).toHaveBeenCalledTimes(1);
    expect(done).toHaveBeenCalledTimes(1);
    vi.useRealTimers();
  });

  it("plays the whole scene in order when given all lines", async () => {
    const done = vi.fn();
    startDialogue(lines, { startAt: 0, onDone: done });
    await vi.runAllTimersAsync();
    expect(speakMock).toHaveBeenCalledTimes(1);
    finishLine(0);
    await vi.runAllTimersAsync();
    finishLine(1);
    await vi.runAllTimersAsync();
    finishLine(2);
    await vi.runAllTimersAsync();
    expect(speakMock).toHaveBeenCalledTimes(3);
    expect(done).toHaveBeenCalledTimes(1);
    vi.useRealTimers();
  });

  it("resumes from startAt", async () => {
    startDialogue(lines, { startAt: 1 });
    await vi.runAllTimersAsync();
    expect(spokenText(0)).toBe("Line two.");
    vi.useRealTimers();
  });

  it("cancel stops the next line from playing", async () => {
    const controller = startDialogue(lines, { startAt: 0 });
    await vi.runAllTimersAsync();
    controller.cancel();
    finishLine(0);
    await vi.runAllTimersAsync();
    expect(speakMock).toHaveBeenCalledTimes(1);
    vi.useRealTimers();
  });

  it("applies real playback gain to Óscar and Mía", async () => {
    startDialogue(quietVoiceLines, { startAt: 0 });
    await vi.runAllTimersAsync();
    expect((speakMock.mock.calls[0] as SpeakCall)[1].gain).toBe(1.8);
    finishLine(0);
    await vi.runAllTimersAsync();
    expect((speakMock.mock.calls[1] as SpeakCall)[1].gain).toBe(1.8);
    vi.useRealTimers();
  });
});
