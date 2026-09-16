import { describe, expect, it } from "vitest";
import { runPurge } from "./storage-purge.server";
import { hasActiveRun } from "@/routes/api/public/hooks/purge-audio";

const NOW = new Date("2026-09-14T12:00:00Z");
const OLD = new Date(NOW.getTime() - 10 * 86_400_000).toISOString();
const FRESH = new Date(NOW.getTime() - 3_600_000).toISOString();
const VERY_OLD = new Date(NOW.getTime() - 120 * 86_400_000).toISOString();

type Row = Record<string, unknown>;

function recording(id: string, created_at = OLD, extra: Row = {}): Row {
  return {
    id,
    user_id: "u1",
    module_id: "basic-zero",
    day: 5,
    take_number: 1,
    is_final_rep: false,
    storage_path: `u1/${id}.webm`,
    created_at,
    audio_purged_at: null,
    duration_seconds: 10,
    mime_type: "audio/webm",
    ...extra,
  };
}

function dayFinal(day: number): Row {
  return {
    user_id: "u1",
    module_id: "basic-zero",
    day,
    completed_at: VERY_OLD,
    recording_path: `u1/basic-zero-day-${day}.webm`,
    recording_purged_at: null,
  };
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/** Minimal fake of the admin client: a queue of candidate pages per RPC. */
function fakeAdmin(opts: {
  recordings: Row[][];
  dayFinals?: Row[][];
  removeError?: string;
  markError?: string;
  /** Error returned when stamping a day_progress final row. */
  dayMarkError?: string;
  /** Real delay applied to every storage remove call. */
  removeDelayMs?: number;
  /** Virtual milliseconds each call adds to the injected clock. */
  tickMs?: number;
  tick?: () => void;
}) {
  const recPages = [...opts.recordings];
  const dayPages = [...(opts.dayFinals ?? [])];
  const removed: string[][] = [];
  const marked: unknown[][] = [];
  const dayMarked: number[] = [];
  let rpcCalls = 0;
  const tick = opts.tick ?? (() => {});

  const admin = {
    rpc: async (name: string) => {
      rpcCalls += 1;
      if (rpcCalls > 200) throw new Error("runaway loop");
      tick();
      const page = name === "purge_candidates" ? recPages.shift() : dayPages.shift();
      return { data: page ?? [], error: null };
    },
    from: () => ({
      update: () => ({
        in: async (_col: string, values: unknown[]) => {
          tick();
          marked.push(values);
          return { error: opts.markError ? { message: opts.markError } : null };
        },
        eq: () => ({
          eq: () => ({
            eq: async () => {
              tick();
              if (opts.dayMarkError) return { error: { message: opts.dayMarkError } };
              dayMarked.push(dayMarked.length);
              return { error: null };
            },
          }),
        }),
      }),
    }),
    storage: {
      from: () => ({
        remove: async (paths: string[]) => {
          tick();
          if (opts.removeDelayMs) await sleep(opts.removeDelayMs);
          removed.push(paths);
          return { error: opts.removeError ? { message: opts.removeError } : null };
        },
      }),
    },
  };
  return { admin, removed, marked, dayMarked, rpcCalls: () => rpcCalls };
}

describe("runPurge", () => {
  it("deletes the candidates the database returned and stamps their rows", async () => {
    const { admin, removed, marked } = fakeAdmin({ recordings: [[recording("a"), recording("b")], []] });
    const result = await runPurge(admin as never, { now: NOW });

    expect(result.deletedFiles).toBe(2);
    expect(result.markedRows).toBe(2);
    expect(removed[0]).toEqual(["u1/a.webm", "u1/b.webm"]);
    expect(marked[0]).toEqual(["a", "b"]);
    expect(result.errors).toEqual([]);
  });

  it("never deletes a row the pure policy still protects", async () => {
    const { admin, removed } = fakeAdmin({
      recordings: [[recording("fresh", FRESH), recording("milestone", OLD, { day: 1, is_final_rep: true })], []],
    });
    const result = await runPurge(admin as never, { now: NOW });

    expect(result.deletedFiles).toBe(0);
    expect(removed).toEqual([]);
  });

  it("never deletes a recording whose path belongs to another learner", async () => {
    const { admin, removed, marked } = fakeAdmin({
      recordings: [[recording("a"), recording("bad", OLD, { storage_path: "u2/bad.webm" })], []],
    });
    const result = await runPurge(admin as never, { now: NOW });

    expect(removed[0]).toEqual(["u1/a.webm"]);
    expect(marked[0]).toEqual(["a"]);
    expect(result.deletedFiles).toBe(1);
    // Per-row problem: reported as skipped, the run itself stays green.
    expect(result.skipped.some((e) => e.startsWith("OWNERSHIP MISMATCH"))).toBe(true);
    expect(result.errors).toEqual([]);
  });

  it("skips a day final whose path is not owned by its user", async () => {
    const bad = { ...dayFinal(7), recording_path: "u1/basic-zero-day-7.webm" };
    const broken = { ...dayFinal(8), user_id: "u1", recording_path: "u2/basic-zero-day-8.webm" };
    const { admin, removed } = fakeAdmin({ recordings: [[]], dayFinals: [[bad, broken], []] });
    const result = await runPurge(admin as never, { now: NOW });

    expect(removed).toEqual([["u1/basic-zero-day-7.webm"]]);
    expect(result.dayFinalDeletedFiles).toBe(1);
    expect(result.dayFinalMarkedRows).toBe(1);
    expect(result.skipped.some((e) => e.startsWith("OWNERSHIP MISMATCH"))).toBe(true);
    expect(result.errors).toEqual([]);
  });

  it("a day final that cannot be stamped is skipped, not a failed run", async () => {
    const { admin } = fakeAdmin({
      recordings: [[]],
      dayFinals: [[dayFinal(7)], []],
      dayMarkError: "INVALID_COMPLETED_AT: out of window",
    });
    const result = await runPurge(admin as never, { now: NOW });

    expect(result.dayFinalMarkedRows).toBe(0);
    expect(result.skipped.some((e) => e.startsWith("day final mark failed"))).toBe(true);
    // The run stays green: one bad row must not stop retention for everyone.
    expect(result.errors).toEqual([]);
  });

  it("stops at maxTakes instead of draining the whole table", async () => {
    const page = () => Array.from({ length: 100 }, (_, i) => recording(`r${Math.random()}${i}`));
    const { admin } = fakeAdmin({ recordings: [page(), page(), page(), page()] });
    const result = await runPurge(admin as never, { now: NOW, maxTakes: 200 });

    expect(result.deletedFiles).toBe(200);
    expect(result.takesTruncated).toBe(true);
  });

  it("leaves rows unmarked when storage deletion fails", async () => {
    const { admin, marked } = fakeAdmin({ recordings: [[recording("a")], []], removeError: "boom" });
    const result = await runPurge(admin as never, { now: NOW });

    expect(result.deletedFiles).toBe(0);
    expect(marked).toEqual([]);
    expect(result.errors[0]).toContain("boom");
  });

  it("dry run reports candidates without touching storage", async () => {
    const { admin, removed } = fakeAdmin({ recordings: [[recording("a")], []] });
    const result = await runPurge(admin as never, { now: NOW, dryRun: true });

    expect(result.candidates).toBe(1);
    expect(result.deletedFiles).toBe(0);
    expect(removed).toEqual([]);
  });

  it("purges an expired journey final, one file per row", async () => {
    const { admin, removed } = fakeAdmin({ recordings: [[]], dayFinals: [[dayFinal(7)], []] });
    const result = await runPurge(admin as never, { now: NOW });

    expect(result.dayFinalDeletedFiles).toBe(1);
    expect(result.dayFinalMarkedRows).toBe(1);
    expect(removed[0]).toEqual(["u1/basic-zero-day-7.webm"]);
  });

  it("runs both queues on their own ceilings", async () => {
    const takePages = Array.from({ length: 40 }, (_, p) =>
      Array.from({ length: 100 }, (_, i) => recording(`p${p}i${i}`)),
    );
    const finals = Array.from({ length: 50 }, (_, i) => dayFinal(i + 2));
    const { admin } = fakeAdmin({ recordings: takePages, dayFinals: [finals, []] });

    const result = await runPurge(admin as never, { now: NOW });

    expect(result.deletedFiles).toBe(4000);
    // Day 20 is a module milestone and is never purged.
    expect(result.dayFinalMarkedRows).toBe(49);
  });

  it("still processes finals when the takes ceiling was hit", async () => {
    const page = (p: number) => Array.from({ length: 100 }, (_, i) => recording(`q${p}i${i}`));
    const { admin } = fakeAdmin({
      recordings: [page(1), page(2), page(3)],
      dayFinals: [[dayFinal(3), dayFinal(4)], []],
    });

    const result = await runPurge(admin as never, { now: NOW, maxTakes: 200 });

    expect(result.takesTruncated).toBe(true);
    expect(result.finalsTruncated).toBe(false);
    expect(result.dayFinalMarkedRows).toBe(2);
  });

  it("reports a hung storage call as TIMEOUT, marks nothing and keeps going", async () => {
    const { admin, marked } = fakeAdmin({
      recordings: [[recording("a")], []],
      dayFinals: [[dayFinal(9)], []],
      removeDelayMs: 120,
    });

    const result = await runPurge(admin as never, { now: NOW, callTimeoutMs: 40 });

    expect(result.errors.some((e) => e.includes("TIMEOUT"))).toBe(true);
    expect(result.deletedFiles).toBe(0);
    expect(marked).toEqual([]);
    // The finals queue still ran (its own removes time out too, but it ran).
    expect(result.dayFinalCandidates).toBe(1);
  });

  it("stops the per-row finals loop inside the time budget", async () => {
    let clockMs = 0;
    const clock = () => clockMs;
    const { admin } = fakeAdmin({
      recordings: [[]],
      dayFinals: [Array.from({ length: 100 }, (_, i) => dayFinal(i + 2)), []],
      tick: () => {
        clockMs += 400;
      },
    });

    const result = await runPurge(admin as never, { now: NOW, budgetMs: 2000, monotonic: clock });

    expect(result.finalsTruncated).toBe(true);
    expect(result.dayFinalMarkedRows).toBeGreaterThan(0);
    expect(result.dayFinalMarkedRows).toBeLessThan(100);
    expect(clockMs).toBeLessThanOrEqual(2000 + 400);
  });
});

function runLookup(rows: { started_at: string }[]) {
  let cutoff = "";
  return {
    cutoff: () => cutoff,
    admin: {
      from: () => ({
        select: () => ({
          eq: () => ({
            is: () => ({
              gte: (_col: string, value: string) => {
                cutoff = value;
                return {
                  limit: async () => ({ data: rows.filter((r) => r.started_at >= value) }),
                };
              },
            }),
          }),
        }),
      }),
    },
  };
}

describe("purge overlap guard", () => {
  const nowMs = NOW.getTime();

  it("reports an unfinished run from 5 minutes ago as active", async () => {
    const { admin } = runLookup([{ started_at: new Date(nowMs - 5 * 60_000).toISOString() }]);
    expect(await hasActiveRun(admin as never, nowMs)).toBe(true);
  });

  it("ignores an unfinished run from 40 minutes ago", async () => {
    const { admin } = runLookup([{ started_at: new Date(nowMs - 40 * 60_000).toISOString() }]);
    expect(await hasActiveRun(admin as never, nowMs)).toBe(false);
  });
});

/**
 * Repeats have their own clock: the database returns ONE ROW PER FILE, with
 * `which` saying which stamp the job must write.
 */
describe("runPurge — base vs latest finals", () => {
  const YESTERDAY = new Date(NOW.getTime() - 86_400_000).toISOString();
  const ELEVEN_DAYS = new Date(NOW.getTime() - 11 * 86_400_000).toISOString();

  /** Fake admin that captures the exact update payload per day-final row. */
  function finalsAdmin(pages: Row[][]) {
    const removed: string[][] = [];
    const stamps: Row[] = [];
    let calls = 0;
    const queue = [...pages];
    const admin = {
      rpc: async (name: string) => {
        calls += 1;
        if (calls > 50) throw new Error("runaway loop");
        return { data: name === "purge_day_final_candidates" ? (queue.shift() ?? []) : [], error: null };
      },
      from: () => ({
        update: (payload: Row) => ({
          in: async () => ({ error: null }),
          eq: () => ({
            eq: () => ({
              eq: async () => {
                stamps.push(payload);
                return { error: null };
              },
            }),
          }),
        }),
      }),
      storage: {
        from: () => ({
          remove: async (paths: string[]) => {
            removed.push(paths);
            return { error: null };
          },
        }),
      },
    };
    return { admin, removed, stamps };
  }

  it("deletes only the base file and stamps only recording_purged_at", async () => {
    const { admin, removed, stamps } = finalsAdmin([
      [
        {
          user_id: "u1",
          module_id: "basic-zero",
          day: 5,
          which: "base",
          completed_at: ELEVEN_DAYS,
          latest_recorded_at: YESTERDAY,
          recording_path: "u1/basic-zero-day-5.webm",
          recording_purged_at: null,
        },
      ],
      [],
    ]);
    const result = await runPurge(admin as never, { now: NOW });

    expect(result.dayFinalDeletedFiles).toBe(1);
    expect(removed).toEqual([["u1/basic-zero-day-5.webm"]]);
    expect(Object.keys(stamps[0] ?? {})).toEqual(["recording_purged_at"]);
  });

  it("deletes only the -latest file and stamps only latest_purged_at", async () => {
    const { admin, removed, stamps } = finalsAdmin([
      [
        {
          user_id: "u1",
          module_id: "basic-zero",
          day: 7,
          which: "latest",
          completed_at: VERY_OLD,
          latest_recorded_at: ELEVEN_DAYS,
          recording_path: "u1/basic-zero-day-7-latest.webm",
          recording_purged_at: null,
        },
      ],
      [],
    ]);
    const result = await runPurge(admin as never, { now: NOW });

    expect(result.dayFinalDeletedFiles).toBe(1);
    expect(removed).toEqual([["u1/basic-zero-day-7-latest.webm"]]);
    expect(Object.keys(stamps[0] ?? {})).toEqual(["latest_purged_at"]);
  });

  it("never touches day 1 or day 20, base or latest", async () => {
    const { admin, removed } = finalsAdmin([
      [
        {
          user_id: "u1",
          module_id: "basic-zero",
          day: 1,
          which: "base",
          completed_at: VERY_OLD,
          latest_recorded_at: null,
          recording_path: "u1/basic-zero-day-1.webm",
          recording_purged_at: null,
        },
        {
          user_id: "u1",
          module_id: "basic-zero",
          day: 20,
          which: "latest",
          completed_at: VERY_OLD,
          latest_recorded_at: ELEVEN_DAYS,
          recording_path: "u1/basic-zero-day-20-latest.webm",
          recording_purged_at: null,
        },
      ],
      [],
    ]);
    const result = await runPurge(admin as never, { now: NOW });

    expect(result.dayFinalDeletedFiles).toBe(0);
    expect(removed).toEqual([]);
  });
});
