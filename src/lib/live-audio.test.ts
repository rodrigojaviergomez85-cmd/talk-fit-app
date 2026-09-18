import { describe, expect, it } from "vitest";
import {
  LIVE_AUDIO_EDGE_FADE_SECONDS,
  LIVE_AUDIO_START_LEAD_SECONDS,
  nextLiveAudioWindow,
} from "./live-audio";

describe("live audio scheduling", () => {
  it("gives the first PCM chunk enough output-device lead time", () => {
    const window = nextLiveAudioWindow(12, 12, 0.2);
    expect(window.startAt).toBe(12 + LIVE_AUDIO_START_LEAD_SECONDS);
    expect(window.endAt).toBeCloseTo(window.startAt + 0.2);
  });

  it("slightly overlaps consecutive chunks for a click-free crossfade", () => {
    const window = nextLiveAudioWindow(12, 13, 0.2);
    expect(window.startAt).toBe(13 - LIVE_AUDIO_EDGE_FADE_SECONDS);
    expect(window.fadeSeconds).toBe(LIVE_AUDIO_EDGE_FADE_SECONDS);
  });

  it("limits fades for very short chunks", () => {
    const window = nextLiveAudioWindow(12, 13, 0.004);
    expect(window.fadeSeconds).toBe(0.001);
  });
});