import { describe, expect, it } from "vitest";
import {
  classifyDayFinal,
  classifyRecordings,
  type DayFinalRow,
  type DayProgressRow,
  type RecordingRow,
} from "./storage-report";

const NOW = new Date("2026-09-02T12:00:00Z");
const OLD = "2026-08-01T10:00:00Z"; // > 48 h, > 10 days
const FRESH_FINAL = "2026-08-29T10:00:00Z"; // > 48 h, < 10 days
const ANCIENT = "2026-01-01T10:00:00Z"; // > 10 days
const RECENT = "2026-09-02T02:00:00Z"; // < 48 h

function rec(over: Partial<RecordingRow> & { id: string }): RecordingRow {
  return {
    user_id: "u1",
    module_id: "basic-zero",
    day: 5,
    take_number: 1,
    is_final_rep: false,
    storage_path: `u1/basic-zero/5/${over.id}.webm`,
    created_at: OLD,
    audio_purged_at: null,
    duration_seconds: 30,
    mime_type: "audio/webm",
    ...over,
  };
}

function dayFinal(over: Partial<DayFinalRow> = {}): DayFinalRow {
  return {
    user_id: "u1",
    module_id: "basic-zero",
    day: 5,
    completed_at: ANCIENT,
    recording_path: "u1/basic-zero-day-5.webm",
    recording_purged_at: null,
    ...over,
  };
}

const completedDay: DayProgressRow[] = [{ user_id: "u1", module_id: "basic-zero", day: 5, recording_path: null }];

describe("take retention (48 hours)", () => {
  it("marks a non-final take older than 48 h as a candidate", () => {
    const r = classifyRecordings([rec({ id: "a" })], completedDay, NOW);
    expect(r.candidates.files).toBe(1);
    expect(r.candidates.learners).toBe(1);
    expect(r.candidates.estimatedMb).toBeGreaterThan(0);
  });

  it("protects a take younger than 48 h", () => {
    const r = classifyRecordings([rec({ id: "a", created_at: RECENT })], completedDay, NOW);
    expect(r.excluded.tooRecent).toBe(1);
    expect(r.candidates.files).toBe(0);
  });

  it("no longer requires the day to be completed", () => {
    const r = classifyRecordings([rec({ id: "a", day: 7 })], [], NOW);
    expect(r.candidates.files).toBe(1);
  });

  it("skips already-purged takes", () => {
    const r = classifyRecordings([rec({ id: "a", audio_purged_at: OLD })], completedDay, NOW);
    expect(r.excluded.alreadyPurged).toBe(1);
  });
});

describe("final retention (10 days)", () => {
  it("keeps a final younger than 10 days", () => {
    const r = classifyRecordings([rec({ id: "a", is_final_rep: true, created_at: FRESH_FINAL })], completedDay, NOW);
    expect(r.excluded.finalWithinRetention).toBe(1);
    expect(r.candidates.files).toBe(0);
  });

  it("purges a final older than 10 days", () => {
    const r = classifyRecordings([rec({ id: "a", is_final_rep: true, created_at: ANCIENT })], completedDay, NOW);
    expect(r.candidates.files).toBe(1);
  });

  it("keeps milestone finals (day 1 and day 20) forever", () => {
    for (const day of [1, 20]) {
      const r = classifyRecordings(
        [rec({ id: "a", day, is_final_rep: true, created_at: ANCIENT })],
        completedDay,
        NOW,
      );
      expect(r.excluded.milestoneFinal).toBe(1);
      expect(r.candidates.files).toBe(0);
    }
  });

  it("treats a take referenced by day_progress.recording_path as a final", () => {
    const progress: DayProgressRow[] = [
      { user_id: "u1", module_id: "basic-zero", day: 5, recording_path: "u1/basic-zero/5/a.webm" },
    ];
    const r = classifyRecordings([rec({ id: "a", created_at: FRESH_FINAL })], progress, NOW);
    expect(r.excluded.finalWithinRetention).toBe(1);
  });
});

describe("journey final audio (day_progress pass)", () => {
  it("purges a journey final older than 10 days", () => {
    expect(classifyDayFinal(dayFinal(), NOW)).toEqual({ kind: "candidate" });
  });

  it("keeps milestone days forever", () => {
    expect(classifyDayFinal(dayFinal({ day: 1 }), NOW)).toEqual({ kind: "excluded", reason: "milestoneFinal" });
    expect(classifyDayFinal(dayFinal({ day: 20 }), NOW)).toEqual({ kind: "excluded", reason: "milestoneFinal" });
  });

  it("keeps journey finals within retention", () => {
    expect(classifyDayFinal(dayFinal({ completed_at: FRESH_FINAL }), NOW)).toEqual({
      kind: "excluded",
      reason: "finalWithinRetention",
    });
  });

  it("skips rows without a file or already purged", () => {
    expect(classifyDayFinal(dayFinal({ recording_path: null }), NOW).kind).toBe("excluded");
    expect(classifyDayFinal(dayFinal({ recording_purged_at: OLD }), NOW).kind).toBe("excluded");
  });

  it("reports journey finals separately", () => {
    const r = classifyRecordings([], [], NOW, [dayFinal(), dayFinal({ day: 1 })]);
    expect(r.dayFinals.candidates).toBe(1);
    expect(r.dayFinals.excluded.milestoneFinal).toBe(1);
  });
});

describe("accounting", () => {
  it("exclusion counts + candidates always add up to the total", () => {
    const rows = [
      rec({ id: "a" }),
      rec({ id: "b", is_final_rep: true }),
      rec({ id: "c", created_at: RECENT }),
      rec({ id: "d", day: 1, is_final_rep: true, created_at: ANCIENT }),
      rec({ id: "e", audio_purged_at: OLD }),
    ];
    const r = classifyRecordings(rows, completedDay, NOW);
    const sum = r.candidates.files + Object.values(r.excluded).reduce((s: number, n: number) => s + n, 0);
    expect(sum).toBe(rows.length);
    expect(r.totals.recordings).toBe(rows.length);
  });
});
