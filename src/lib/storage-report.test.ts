import { describe, expect, it } from "vitest";
import { classifyRecordings, type DayProgressRow, type RecordingRow } from "./storage-report";

const NOW = new Date("2026-09-02T12:00:00Z");
const OLD = "2026-08-01T10:00:00Z"; // > 14 days
const RECENT = "2026-08-30T10:00:00Z"; // < 14 days

function rec(over: Partial<RecordingRow> & { id: string }): RecordingRow {
  return {
    user_id: "u1",
    module_id: "basic-zero",
    day: 1,
    take_number: 1,
    is_final_rep: false,
    storage_path: `u1/basic-zero/1/${over.id}.webm`,
    created_at: OLD,
    audio_purged_at: null,
    duration_seconds: 30,
    mime_type: "audio/webm",
    ...over,
  };
}

const completedDay1: DayProgressRow[] = [{ user_id: "u1", module_id: "basic-zero", day: 1, recording_path: null }];

describe("storage report classifier", () => {
  it("marks an old, non-final, unreferenced take on a completed day as a candidate", () => {
    const r = classifyRecordings([rec({ id: "a" })], completedDay1, NOW);
    expect(r.candidates.files).toBe(1);
    expect(r.candidates.learners).toBe(1);
    expect(r.candidates.samplePaths).toEqual(["u1/basic-zero/1/a.webm"]);
    expect(r.candidates.estimatedMb).toBeGreaterThan(0);
  });

  it("protects finals by is_final_rep", () => {
    const r = classifyRecordings([rec({ id: "a", is_final_rep: true })], completedDay1, NOW);
    expect(r.candidates.files).toBe(0);
    expect(r.excluded.finalByFlag).toBe(1);
  });

  it("protects a take referenced by day_progress.recording_path even when is_final_rep is false", () => {
    const progress: DayProgressRow[] = [
      { user_id: "u1", module_id: "basic-zero", day: 1, recording_path: "u1/basic-zero/1/a.webm" },
    ];
    const r = classifyRecordings([rec({ id: "a", is_final_rep: false })], progress, NOW);
    expect(r.candidates.files).toBe(0);
    expect(r.excluded.finalByDayProgress).toBe(1);
  });

  it("protects a path referenced by ANY learner's day_progress, even on a mismatched day", () => {
    const progress: DayProgressRow[] = [
      { user_id: "u1", module_id: "basic-zero", day: 1, recording_path: null },
      { user_id: "u2", module_id: "eagles-week-1", day: 9, recording_path: "u1/basic-zero/1/a.webm" },
    ];
    const r = classifyRecordings([rec({ id: "a" })], progress, NOW);
    expect(r.excluded.finalByDayProgress).toBe(1);
  });

  it("protects anything newer than 14 days", () => {
    const r = classifyRecordings([rec({ id: "a", created_at: RECENT })], completedDay1, NOW);
    expect(r.excluded.newerThan14Days).toBe(1);
    expect(r.candidates.files).toBe(0);
  });

  it("protects takes from days that are not completed", () => {
    const r = classifyRecordings([rec({ id: "a", day: 2 })], completedDay1, NOW);
    expect(r.excluded.dayNotCompleted).toBe(1);
  });

  it("skips already-purged takes", () => {
    const r = classifyRecordings([rec({ id: "a", audio_purged_at: OLD })], completedDay1, NOW);
    expect(r.excluded.alreadyPurged).toBe(1);
  });

  it("exclusion counts + candidates always add up to the total", () => {
    const rows = [
      rec({ id: "a" }),
      rec({ id: "b", is_final_rep: true }),
      rec({ id: "c", created_at: RECENT }),
      rec({ id: "d", day: 3 }),
      rec({ id: "e", audio_purged_at: OLD }),
    ];
    const r = classifyRecordings(rows, completedDay1, NOW);
    const sum = r.candidates.files + Object.values(r.excluded).reduce((s, n) => s + n, 0);
    expect(sum).toBe(rows.length);
    expect(r.totals.recordings).toBe(rows.length);
  });
});
