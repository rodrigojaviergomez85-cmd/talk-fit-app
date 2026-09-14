import { beforeEach, describe, expect, it, vi } from "vitest";

const speakMock = vi.fn(() => () => undefined);
const prefetchMock = vi.fn(() => Promise.resolve());

vi.mock("@/services/audio-service", () => ({
  AudioService: {
    speak: (...args: unknown[]) => speakMock(...args),
    prefetch: (...args: unknown[]) => prefetchMock(...args),
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

function finishLine(index: number) {
  const call = speakMock.mock.calls[index];
  const options = call?.[1] as { onEnd?: () => void };
  options?.onEnd?.();
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
    expect((speakMock.mock.calls[0]?.[0] as string)).toBe("Line one.");
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
    expect((speakMock.mock.calls[0]?.[0] as string)).toBe("Line two.");
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
});
