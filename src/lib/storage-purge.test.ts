import { describe, expect, it } from "vitest";
import { runPurge } from "./storage-purge.server";

const NOW = new Date("2026-09-14T12:00:00Z");
const OLD = new Date(NOW.getTime() - 10 * 86_400_000).toISOString();
const FRESH = new Date(NOW.getTime() - 3_600_000).toISOString();

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

/** Minimal fake of the admin client: a queue of candidate pages per RPC. */
function fakeAdmin(opts: {
  recordings: Row[][];
  dayFinals?: Row[][];
  removeError?: string;
  markError?: string;
}) {
  const recPages = [...opts.recordings];
  const dayPages = [...(opts.dayFinals ?? [])];
  const removed: string[][] = [];
  const marked: unknown[][] = [];
  let rpcCalls = 0;

  const admin = {
    rpc: async (name: string) => {
      rpcCalls += 1;
      if (rpcCalls > 100) throw new Error("runaway loop");
      const page = name === "purge_candidates" ? recPages.shift() : dayPages.shift();
      return { data: page ?? [], error: null };
    },
    from: () => ({
      update: () => ({
        in: async (_col: string, values: unknown[]) => {
          marked.push(values);
          return { error: opts.markError ? { message: opts.markError } : null };
        },
        eq: () => ({ eq: () => ({ eq: async () => ({ error: null }) }) }),
      }),
    }),
    storage: {
      from: () => ({
        remove: async (paths: string[]) => {
          removed.push(paths);
          return { error: opts.removeError ? { message: opts.removeError } : null };
        },
      }),
    },
  };
  return { admin, removed, marked, rpcCalls: () => rpcCalls };
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

  it("stops at maxFiles instead of draining the whole table", async () => {
    const page = () => Array.from({ length: 100 }, (_, i) => recording(`r${Math.random()}${i}`));
    const { admin } = fakeAdmin({ recordings: [page(), page(), page(), page()] });
    const result = await runPurge(admin as never, { now: NOW, maxFiles: 200 });

    expect(result.deletedFiles).toBe(200);
    expect(result.truncated).toBe(true);
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

  it("purges journey final audio older than 90 days and its -latest copy", async () => {
    const veryOld = new Date(NOW.getTime() - 120 * 86_400_000).toISOString();
    const { admin, removed } = fakeAdmin({
      recordings: [[]],
      dayFinals: [
        [
          {
            user_id: "u1",
            module_id: "basic-zero",
            day: 7,
            completed_at: veryOld,
            recording_path: "u1/basic-zero-day-7.webm",
            recording_purged_at: null,
          },
        ],
        [],
      ],
    });
    const result = await runPurge(admin as never, { now: NOW });

    expect(result.dayFinalDeletedFiles).toBe(1);
    expect(result.dayFinalMarkedRows).toBe(1);
    expect(removed[0]).toEqual(["u1/basic-zero-day-7.webm", "u1/basic-zero-day-7-latest.webm"]);
  });
});
