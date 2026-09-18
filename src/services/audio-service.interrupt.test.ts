import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";

/**
 * Two players, one voice: starting a clip must tell the previous owner that its
 * playback was cut short, so its button and announcement stop lying.
 */

const fakeWindow = {
  addEventListener: () => undefined,
  removeEventListener: () => undefined,
} as unknown as Window & typeof globalThis;

beforeAll(() => {
  vi.stubGlobal("window", fakeWindow);
  vi.stubGlobal("Audio", class {} as unknown as typeof Audio);
});

afterAll(() => {
  vi.unstubAllGlobals();
});

describe("AudioService playback ownership", () => {
  it("notifies the previous clip when a new one starts", async () => {
    const { AudioService } = await import("./audio-service");
    const firstInterrupted = vi.fn();
    const secondInterrupted = vi.fn();

    AudioService.speak("first clip", { onInterrupt: firstInterrupted });
    expect(firstInterrupted).not.toHaveBeenCalled();

    AudioService.speak("second clip", { onInterrupt: secondInterrupted });
    expect(firstInterrupted).toHaveBeenCalledTimes(1);
    expect(secondInterrupted).not.toHaveBeenCalled();

    AudioService.stop();
    expect(secondInterrupted).toHaveBeenCalledTimes(1);
    expect(firstInterrupted).toHaveBeenCalledTimes(1);
  });

  it("does not report an interruption when the owner cancels itself", async () => {
    const { AudioService } = await import("./audio-service");
    const interrupted = vi.fn();
    const cancel = AudioService.speak("own clip", { onInterrupt: interrupted });
    cancel();
    expect(interrupted).not.toHaveBeenCalled();

    // A later stop() must not resurrect the old notification either.
    AudioService.stop();
    expect(interrupted).not.toHaveBeenCalled();
  });
});
