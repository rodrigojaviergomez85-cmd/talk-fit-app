import { describe, expect, it } from "vitest";
import {
  countBy,
  evaluateAlerts,
  levelFor,
  overallLevel,
  worstLevel,
  type HealthSnapshot,
  type Threshold,
} from "./admin-alerts";

const thresholds: Threshold[] = [
  { key: "ai_daily_usd", label: "ai", warn: 25, critical: 60, unit: "usd", sort_order: 1 },
  { key: "ai_spike_ratio", label: "spike", warn: 1.5, critical: 2.5, unit: "x", sort_order: 2 },
  { key: "storage_disk_pct", label: "disk", warn: 60, critical: 80, unit: "pct", sort_order: 3 },
  { key: "storage_daily_mb", label: "mb", warn: 4000, critical: 8000, unit: "mb", sort_order: 4 },
  { key: "peak_hour_sessions", label: "peak", warn: 1200, critical: 2500, unit: "count", sort_order: 5 },
  { key: "db_connections_pct", label: "conn", warn: 60, critical: 80, unit: "pct", sort_order: 6 },
  { key: "db_size_gb", label: "size", warn: 100, critical: 300, unit: "gb", sort_order: 7 },
  { key: "purge_hours_since_ok", label: "purge", warn: 24, critical: 48, unit: "h", sort_order: 8 },
  { key: "purge_backlog_files", label: "backlog", warn: 20000, critical: 60000, unit: "count", sort_order: 9 },
];

const NOW = new Date("2026-09-15T12:00:00Z");
const today = "2026-09-15";

function snapshot(overrides: Partial<HealthSnapshot> = {}): HealthSnapshot {
  return {
    generated_at: NOW.toISOString(),
    ai: { by_day: [], coach_today: 0 },
    storage: { by_day: [], files_total: 100, mb_total: 1024, purged_total: 0, disk_gb: 500 },
    activity: { by_day: [], by_hour: [], users_total: 835 },
    database: { size_gb: 0.05, connections: 6, max_connections: 240 },
    thresholds,
    ...overrides,
  };
}

describe("levelFor", () => {
  it("uses green / yellow / red bands", () => {
    expect(levelFor(10, 25, 60)).toBe("ok");
    expect(levelFor(25, 25, 60)).toBe("warn");
    expect(levelFor(60, 25, 60)).toBe("critical");
  });
});

describe("worstLevel", () => {
  it("picks the most serious level", () => {
    expect(worstLevel(["ok", "ok"])).toBe("ok");
    expect(worstLevel(["ok", "warn"])).toBe("warn");
    expect(worstLevel(["warn", "critical"])).toBe("critical");
  });
});

describe("evaluateAlerts", () => {
  it("is all green on a quiet day", () => {
    const groups = evaluateAlerts(snapshot(), NOW);
    expect(groups.map((g) => g.key)).toEqual(["ai", "storage", "purge", "activity", "database"]);
    expect(overallLevel(groups)).toBe("ok");
  });

  it("turns the cleanup block red when the job has not succeeded in 48 hours", () => {
    const groups = evaluateAlerts(
      snapshot({
        purge: {
          last_ok_at: "2026-09-12T07:00:00Z",
          hours_since_ok: 77,
          backlog_files: 100,
          backlog_capped: false,
          last_run: {
            started_at: "2026-09-15T07:00:00Z",
            finished_at: "2026-09-15T07:01:00Z",
            ok: false,
            deleted_files: 0,
            marked_rows: 0,
            error: "timeout",
          },
        },
      }),
      NOW,
    );
    const purge = groups.find((g) => g.key === "purge")!;
    expect(purge.level).toBe("critical");
    expect(purge.signals[0]!.hint.es).toContain("timeout");
  });

  it("warns when too many files are waiting to be deleted", () => {
    const groups = evaluateAlerts(
      snapshot({
        purge: { last_ok_at: NOW.toISOString(), hours_since_ok: 1, backlog_files: 30000, backlog_capped: false, last_run: null },
      }),
      NOW,
    );
    const purge = groups.find((g) => g.key === "purge")!;
    expect(purge.level).toBe("warn");
  });

  it("flags a red day of AI spend", () => {
    const groups = evaluateAlerts(
      snapshot({
        ai: {
          by_day: [
            { day_key: today, endpoint: "final-audio-coach", model: "google/gemini-3.7-flash", requests: 60000, est_cost_usd: 90 },
          ],
          coach_today: 60000,
        },
      }),
      NOW,
    );
    const ai = groups.find((g) => g.key === "ai")!;
    expect(ai.level).toBe("critical");
    expect(countBy(groups, "critical")).toBeGreaterThan(0);
  });

  it("flags disk usage above the warning threshold", () => {
    const groups = evaluateAlerts(
      snapshot({ storage: { by_day: [], files_total: 1, mb_total: 340 * 1024, purged_total: 0, disk_gb: 500 } }),
      NOW,
    );
    expect(groups.find((g) => g.key === "storage")!.level).toBe("warn");
  });

  it("flags a peak hour above the critical threshold", () => {
    const groups = evaluateAlerts(
      snapshot({ activity: { by_day: [], by_hour: [{ hour_key: "2026-09-15 20:00", sessions: 3000 }], users_total: 10 } }),
      NOW,
    );
    expect(groups.find((g) => g.key === "activity")!.level).toBe("critical");
  });

  it("flags saturated database connections", () => {
    const groups = evaluateAlerts(
      snapshot({ database: { size_gb: 1, connections: 200, max_connections: 240 } }),
      NOW,
    );
    expect(groups.find((g) => g.key === "database")!.level).toBe("critical");
  });

  it("never crashes when thresholds are missing", () => {
    const groups = evaluateAlerts(snapshot({ thresholds: [] }), NOW);
    expect(overallLevel(groups)).toBe("ok");
  });
});
