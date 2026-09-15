import { describe, expect, it } from "vitest";
import { summarizeDay, type CoachCheckDayPayload } from "./coach-check";

const base = (over: Partial<CoachCheckDayPayload> = {}): CoachCheckDayPayload => ({
  day_key: "2026-09-14",
  retention_days: 10,
  practices: 2,
  recordings: 8,
  audios: [],
  ...over,
});

describe("Coach Check day card", () => {
  it("shows the players and the latest expiry date when audio is alive", () => {
    const view = summarizeDay(
      base({
        audios: [
          { path: "p1", kind: "base", recorded_at: "2026-09-10T10:00:00Z", available_until: "2026-09-20T10:00:00Z", expired: false },
          { path: "p2", kind: "latest", recorded_at: "2026-09-12T10:00:00Z", available_until: "2026-09-22T10:00:00Z", expired: false },
        ],
      }),
    );
    expect(view.state).toBe("available");
    expect(view.availableUntil).toBe("2026-09-22T10:00:00Z");
    expect(view.recordings).toBe(8);
    expect(view.practices).toBe(2);
  });

  it("keeps the counts and reports expired when every audio is gone", () => {
    const view = summarizeDay(
      base({
        audios: [
          { path: "p1", kind: "base", recorded_at: "2026-08-01T10:00:00Z", available_until: "2026-08-11T10:00:00Z", expired: true },
        ],
      }),
    );
    expect(view.state).toBe("expired");
    expect(view.availableUntil).toBeNull();
    expect(view.practices).toBe(2);
    expect(view.recordings).toBe(8);
  });

  it("reports no practice for an empty day", () => {
    const view = summarizeDay(base({ practices: 0, recordings: 0 }));
    expect(view.state).toBe("none");
  });
});
