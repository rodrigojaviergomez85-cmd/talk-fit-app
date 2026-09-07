import { describe, expect, it } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import {
  AVG_LOGPROB_THRESHOLD,
  buildRubric,
  COACH_JSON_SCHEMA,
  COACH_QUOTA_ENDPOINT,
  FINAL_AUDIO_COACH_VERSION,
  coachVersionFor,
  MAX_FINAL_AUDIO_BYTES,
  MAX_FINAL_AUDIO_SECONDS,
  MIN_TRANSCRIPT_WORDS,
  NO_SPEECH_THRESHOLD,
  PENDING_STALE_MS,
  RECORDER_BITS_PER_SECOND,
  maxTakeNumberFor,
  normalizeFeedback,
  rubricSha256,
  runFinalAudioCoach,
  sha256Hex,
  type CoachDeps,
  type CoachFeedback,
  type FeedbackRow,
  type PendingInsert,
  type RecordingRow,
  type SttConfidence,
} from "./final-audio-coach.server";
import { takeSlots } from "./take-slots";
import { sourceTurnNumberFor } from "./final-audio-coach";
import { CourseService } from "@/services/course-service";
import type { CourseDay } from "./types";

const USER_A = "aaaaaaaa-0000-0000-0000-000000000001";
const USER_B = "bbbbbbbb-0000-0000-0000-000000000002";

const GOOD_LLM: CoachFeedback = {
  taskCompleted: true,
  targetLanguage: "good",
  organization: "developing",
  strengthEn: "You answered the question with clear ideas.",
  strengthEs: "Respondiste la pregunta con ideas claras.",
  nextStepEn: "Add one reason with because.",
  nextStepEs: "Agrega una razón usando because.",
  correctionNeeded: false,
  corrections: [],
  said: null,
  betterVersion: null,
  whyEn: null,
  whyEs: null,
  practicePhrase: null,
};

const LONG_TRANSCRIPT = "My name is Carlos and I live in San Salvador because I like the city and my family is here.";

function audioOf(seed: string, bytes = 4096): Uint8Array {
  const out = new Uint8Array(bytes);
  for (let i = 0; i < bytes; i++) out[i] = (seed.charCodeAt(i % seed.length) + i) & 0xff;
  return out;
}

function recording(over: Partial<RecordingRow> = {}): RecordingRow {
  return {
    id: "rec-1",
    user_id: USER_A,
    module_id: "simple-present",
    day: 1,
    take_number: 2,
    is_final_rep: true,
    storage_path: `${USER_A}/simple-present/1/take-2.webm`,
    mime_type: "audio/webm",
    audio_purged_at: null,
    estimated_idea_count: 4,
    source_turn_number: null,
    ...over,
  };
}

/** In-memory durable store honouring the unique key + optimistic reclaim. */
function makeStore(now: () => number) {
  const rows = new Map<string, FeedbackRow & { key: string; insert: PendingInsert }>();
  const keyOf = (k: { userId: string; audioSha256: string; rubricSha256: string; coachVersion: string }) =>
    `${k.userId}|${k.audioSha256}|${k.rubricSha256}|${k.coachVersion}`;
  let seq = 0;
  const store = {
    rows,
    findExisting: async (k: Parameters<typeof keyOf>[0]) => {
      const r = rows.get(keyOf(k));
      return r ? { ...r } : null;
    },
    tryInsertPending: async (row: PendingInsert) => {
      const k = keyOf(row);
      if (rows.has(k)) return false;
      rows.set(k, {
        key: k,
        insert: row,
        id: `fb-${++seq}`,
        status: "pending",
        updated_at: new Date(now()).toISOString(),
        task_completed: null,
        target_language: null,
        organization: null,
        strength_en: null,
        strength_es: null,
        next_step_en: null,
        next_step_es: null,
        correction_needed: null,
        said: null,
        better_version: null,
        why_en: null,
        why_es: null,
        practice_phrase: null,
        transcript_word_count: null,
        corrections: null,
        answered_task: null,
        fluency_upgrade: null,
        estimated_idea_count: row.estimatedIdeaCount,
      });
      return true;
    },
    tryReclaim: async (id: string, seen: string) => {
      const r = [...rows.values()].find((x) => x.id === id);
      if (!r || r.updated_at !== seen) return false;
      r.status = "pending";
      r.updated_at = new Date(now() + 1).toISOString();
      return true;
    },
    finalize: async (id: string, patch: Parameters<CoachDeps["store"]["finalize"]>[1]) => {
      const r = [...rows.values()].find((x) => x.id === id);
      if (!r) return;
      r.status = patch.status;
      r.updated_at = new Date(now() + 2).toISOString();
      r.transcript_word_count = patch.transcriptWordCount ?? null;
      r.task_completed = patch.feedback?.taskCompleted ?? null;
      r.target_language = patch.feedback?.targetLanguage ?? null;
      r.organization = patch.feedback?.organization ?? null;
      r.strength_en = patch.feedback?.strengthEn ?? null;
      r.strength_es = patch.feedback?.strengthEs ?? null;
      r.next_step_en = patch.feedback?.nextStepEn ?? null;
      r.next_step_es = patch.feedback?.nextStepEs ?? null;
      r.correction_needed = patch.feedback?.correctionNeeded ?? null;
      r.said = patch.feedback?.said ?? null;
      r.better_version = patch.feedback?.betterVersion ?? null;
      r.why_en = patch.feedback?.whyEn ?? null;
      r.why_es = patch.feedback?.whyEs ?? null;
      r.practice_phrase = patch.feedback?.practicePhrase ?? null;
      r.corrections = patch.feedback?.corrections?.length ? patch.feedback.corrections : null;
      r.answered_task = patch.feedback?.answeredTask ?? null;
      r.fluency_upgrade = patch.feedback?.fluencyUpgrade ?? null;
    },
  };
  return store;
}

type Harness = ReturnType<typeof harness>;
function harness(opts: {
  recordings?: RecordingRow[];
  audio?: Record<string, Uint8Array>;
  transcript?: string | null;
  llm?: unknown;
  quotaAllowed?: boolean;
  userId?: string;
  clock?: { t: number };
  store?: ReturnType<typeof makeStore>;
  delayStt?: () => Promise<void>;
  llmReply?: unknown;
  confidence?: SttConfidence | null;
} = {}) {
  const clock = opts.clock ?? { t: 1_700_000_000_000 };
  const now = () => clock.t;
  const store = opts.store ?? makeStore(now);
  const counters = { fetch: 0, download: 0, stt: 0, llm: 0, quota: 0 };
  const logs: Record<string, unknown>[] = [];
  const recs = opts.recordings ?? [recording()];
  const audio = opts.audio ?? { [recording().storage_path]: audioOf("take-2-v1") };
  const deps: CoachDeps = {
    userId: opts.userId ?? USER_A,
    now,
    fetchRecording: async (uid, input) => {
      counters.fetch++;
      return (
        recs.find(
          (r) => r.user_id === uid && r.module_id === input.moduleId && r.day === input.day && r.take_number === input.takeNumber,
        ) ?? null
      );
    },
    downloadAudio: async (path) => {
      counters.download++;
      return audio[path] ?? null;
    },
    loadDay: async (moduleId, day) => {
      const loaded = await CourseService.loadModule(moduleId);
      return loaded.days.find((d) => d.day === day) ?? null;
    },
    moduleLabel: (moduleId) => CourseService.getModule(moduleId).title,
    store,
    consumeQuota: async () => {
      counters.quota++;
      return opts.quotaAllowed ?? true;
    },
    stt: async () => {
      counters.stt++;
      if (opts.delayStt) await opts.delayStt();
      if (opts.transcript === null) return { ok: false };
      return { ok: true, text: opts.transcript ?? LONG_TRANSCRIPT, confidence: opts.confidence };
    },
    llm: async () => {
      counters.llm++;
      return "llmReply" in opts ? opts.llmReply : GOOD_LLM;
    },
    log: (e) => logs.push(e),
  };
  return { deps, counters, store, clock, logs };
}

const INPUT = { moduleId: "simple-present", day: 1, takeNumber: 2 };

describe("Final Audio Coach — ownership & readiness", () => {
  it("CASE 1: User B cannot analyse User A's take — blocked before Storage/AI", async () => {
    const h = harness({ userId: USER_B });
    const res = await runFinalAudioCoach(INPUT, h.deps);
    expect(res.http).toBe(404);
    expect(h.counters.download).toBe(0);
    expect(h.counters.stt).toBe(0);
    expect(h.counters.llm).toBe(0);
  });

  it("CASE 1b: a row whose storage_path is outside the learner's folder is rejected", async () => {
    const h = harness({ recordings: [recording({ storage_path: `${USER_B}/simple-present/1/take-2.webm` })] });
    const res = await runFinalAudioCoach(INPUT, h.deps);
    expect(res.http).toBe(404);
    expect(h.counters.download).toBe(0);
  });

  it("CASE 2: valid take that is not Final → 409, 0 AI calls, no download", async () => {
    const h = harness({ recordings: [recording({ is_final_rep: false })] });
    const res = await runFinalAudioCoach(INPUT, h.deps);
    expect(res.http).toBe(409);
    expect(res.body.status).toBe("final_audio_not_ready");
    expect(h.counters.download + h.counters.stt + h.counters.llm + h.counters.quota).toBe(0);
  });

  it("purged audio is never analysed", async () => {
    const h = harness({ recordings: [recording({ audio_purged_at: "2026-01-01T00:00:00Z" })] });
    expect((await runFinalAudioCoach(INPUT, h.deps)).http).toBe(404);
    expect(h.counters.download).toBe(0);
  });
});

describe("Final Audio Coach — happy path & cache", () => {
  it("new Final Audio costs exactly 1 STT + 1 LLM and stores a compact bilingual row", async () => {
    const h = harness();
    const res = await runFinalAudioCoach(INPUT, h.deps);
    expect(res.http).toBe(200);
    expect(res.body.status).toBe("ready");
    expect(h.counters.stt).toBe(1);
    expect(h.counters.llm).toBe(1);
    expect(h.counters.quota).toBe(1);
    const row = [...h.store.rows.values()][0]!;
    expect(row.status).toBe("ready");
    expect(row.strength_es).toBe(GOOD_LLM.strengthEs);
    expect(row.insert.coachVersion).toBe(coachVersionFor("simple-present", 1));
    expect(row.insert.sourceTurnNumber).toBeNull();
  });

  it("CASE 3: same audio + same rubric already READY → cached feedback, 0 STT, 0 LLM, 0 quota", async () => {
    const h = harness();
    await runFinalAudioCoach(INPUT, h.deps);
    const before = { ...h.counters };
    const res = await runFinalAudioCoach(INPUT, h.deps);
    expect(res.body.status).toBe("ready");
    if (res.body.status === "ready") expect(res.body.feedback.strengthEn).toBe(GOOD_LLM.strengthEn);
    expect(h.counters.stt).toBe(before.stt);
    expect(h.counters.llm).toBe(before.llm);
    expect(h.counters.quota).toBe(before.quota);
    expect(h.logs.at(-1)?.["cacheHit"]).toBe(true);
  });

  it("CASE 4: same Take re-recorded (different bytes) → different SHA-256, new evaluation allowed", async () => {
    const path = recording().storage_path;
    const audio = { [path]: audioOf("version-1") };
    const h = harness({ audio });
    await runFinalAudioCoach(INPUT, h.deps);
    audio[path] = audioOf("version-2");
    const res = await runFinalAudioCoach(INPUT, h.deps);
    expect(res.body.status).toBe("ready");
    expect(h.counters.stt).toBe(2);
    expect(h.counters.llm).toBe(2);
    const hashes = [...h.store.rows.values()].map((r) => r.insert.audioSha256);
    expect(new Set(hashes).size).toBe(2);
    expect(await sha256Hex(audioOf("version-1"))).not.toBe(await sha256Hex(audioOf("version-2")));
  });

  it("CASE 20: repeating a day with new audio may evaluate again; refresh of the same audio is a cache hit", async () => {
    const path = recording().storage_path;
    const audio = { [path]: audioOf("monday") };
    const h = harness({ audio });
    await runFinalAudioCoach(INPUT, h.deps); // Monday
    audio[path] = audioOf("friday");
    await runFinalAudioCoach(INPUT, h.deps); // Friday repeat
    await runFinalAudioCoach(INPUT, h.deps); // Friday refresh
    expect(h.counters.stt).toBe(2);
    expect(h.counters.llm).toBe(2);
  });
});

describe("Final Audio Coach — concurrency & leases", () => {
  it("CASE 5: two simultaneous requests for the same audio → max 1 STT + 1 LLM", async () => {
    let release!: () => void;
    const gate = new Promise<void>((r) => (release = r));
    const h = harness({ delayStt: () => gate });
    const a = runFinalAudioCoach(INPUT, h.deps);
    const b = runFinalAudioCoach(INPUT, h.deps);
    // Let both reach the lease step, then release the STT.
    await new Promise((r) => setTimeout(r, 10));
    release();
    const [ra, rb] = await Promise.all([a, b]);
    // The loser either sees the active lease (202) or, if the owner already
    // finished, the cached result — never a second paid evaluation.
    expect([ra.body.status, rb.body.status]).toContain("ready");
    expect([ra.body.status, rb.body.status].every((s) => s === "ready" || s === "pending")).toBe(true);
    expect(h.counters.stt).toBe(1);
    expect(h.counters.llm).toBe(1);
  });

  it("CASE 6: an active pending row → 202 pending, 0 additional AI calls", async () => {
    const h = harness();
    const audioHash = await sha256Hex(audioOf("take-2-v1"));
    const day = (await CourseService.loadModule("simple-present")).days[0]!;
    const rubric = buildRubric(day, "simple-present", CourseService.getModule("simple-present").title, null)!;
    await h.store.tryInsertPending({
      userId: USER_A,
      audioSha256: audioHash,
      rubricSha256: await rubricSha256(rubric),
      coachVersion: coachVersionFor("simple-present", 1),
      moduleId: "simple-present",
      day: 1,
      takeNumber: 2,
      sourceTurnNumber: null,
      estimatedIdeaCount: null,
    });
    h.clock.t += 30_000; // 30s later: still fresh
    const res = await runFinalAudioCoach(INPUT, h.deps);
    expect(res.http).toBe(202);
    expect(h.counters.stt + h.counters.llm + h.counters.quota).toBe(0);
  });

  async function seedPending(h: Harness) {
    const audioHash = await sha256Hex(audioOf("take-2-v1"));
    const day = (await CourseService.loadModule("simple-present")).days[0]!;
    const rubric = buildRubric(day, "simple-present", CourseService.getModule("simple-present").title, null)!;
    await h.store.tryInsertPending({
      userId: USER_A,
      audioSha256: audioHash,
      rubricSha256: await rubricSha256(rubric),
      coachVersion: coachVersionFor("simple-present", 1),
      moduleId: "simple-present",
      day: 1,
      takeNumber: 2,
      sourceTurnNumber: null,
      estimatedIdeaCount: null,
    });
  }

  it("CASE D: the lease is 10 minutes — pending at 2 min and 9 min → 202, 0 paid calls, no reclaim", async () => {
    expect(PENDING_STALE_MS).toBe(10 * 60 * 1000);
    for (const ageMs of [2 * 60_000, 9 * 60_000]) {
      const h = harness();
      await seedPending(h);
      h.clock.t += ageMs;
      const res = await runFinalAudioCoach(INPUT, h.deps);
      expect(res.http).toBe(202);
      expect(res.body.status).toBe("pending");
      expect(h.counters.stt + h.counters.llm + h.counters.quota).toBe(0);
      expect([...h.store.rows.values()][0]!.status).toBe("pending");
    }
  });

  it("CASE 7 / E: a stale pending row (> 10 min) can be reclaimed by exactly one request", async () => {
    let release!: () => void;
    const gate = new Promise<void>((r) => (release = r));
    const h = harness({ delayStt: () => gate });
    await seedPending(h);
    h.clock.t += PENDING_STALE_MS + 1000;
    const pa = runFinalAudioCoach(INPUT, h.deps);
    const pb = runFinalAudioCoach(INPUT, h.deps);
    await new Promise((r) => setTimeout(r, 10));
    release();
    const [ra, rb] = await Promise.all([pa, pb]);
    expect([ra.body.status, rb.body.status]).toContain("ready");
    expect([ra.body.status, rb.body.status].every((s) => s === "ready" || s === "pending")).toBe(true);
    expect(h.counters.stt).toBe(1);
    expect(h.counters.llm).toBe(1);
  });
});

describe("Final Audio Coach — unclear, quota, errors", () => {
  it("CASE 8: unclear transcription → status unclear, 1 STT, 0 LLM; later request is a free cache hit", async () => {
    const h = harness({ transcript: "uh" });
    const res = await runFinalAudioCoach(INPUT, h.deps);
    expect(res.body.status).toBe("unclear");
    expect(h.counters.stt).toBe(1);
    expect(h.counters.llm).toBe(0);
    const again = await runFinalAudioCoach(INPUT, h.deps);
    expect(again.body.status).toBe("unclear");
    expect(h.counters.stt).toBe(1);
    const row = [...h.store.rows.values()][0]!;
    expect(row.strength_en).toBeNull();
  });

  it("CASE 9: quota exhausted → 429 with no paid call, but a cache hit still works", async () => {
    const path = recording().storage_path;
    const store = makeStore(() => 1_700_000_000_000);
    const audio = { [path]: audioOf("first") };
    const ok = harness({ store, audio });
    await runFinalAudioCoach(INPUT, ok.deps); // READY cached
    const limited = harness({ store, audio, quotaAllowed: false });
    const hit = await runFinalAudioCoach(INPUT, limited.deps);
    expect(hit.body.status).toBe("ready");
    expect(limited.counters.quota).toBe(0);
    audio[path] = audioOf("second");
    const blocked = await runFinalAudioCoach(INPUT, limited.deps);
    expect(blocked.http).toBe(429);
    expect(limited.counters.stt + limited.counters.llm).toBe(0);
    expect(COACH_QUOTA_ENDPOINT).toBe("final-audio-coach");
  });

  it("STT provider failure → status error (not learner failure), no LLM call", async () => {
    const h = harness({ transcript: null });
    const res = await runFinalAudioCoach(INPUT, h.deps);
    expect(res.body.status).toBe("error");
    expect(h.counters.llm).toBe(0);
    expect([...h.store.rows.values()][0]!.status).toBe("error");
  });

  it("invalid model output → status error, nothing invented", async () => {
    const h = harness({ llmReply: { taskCompleted: "yes", targetLanguage: "excellent" } });
    const res = await runFinalAudioCoach(INPUT, h.deps);
    expect(res.body.status).toBe("error");
    expect([...h.store.rows.values()][0]!.strength_en).toBeNull();
  });
});

describe("Final Audio Coach — rubric resolution", () => {
  it("CASE 10: ordinary STEP 5 (source_turn_number=null) → rubric from the real rep5Prompt", async () => {
    const day = (await CourseService.loadModule("simple-present")).days.find((d) => d.day === 1)!;
    const rubric = buildRubric(day, "simple-present", "SIMPLE PRESENT", null)!;
    expect(rubric.prompt?.question).toBe(day.rep5Prompt.question);
    expect(rubric.turn).toBeUndefined();
    expect(rubric.topic).toBe(day.topic);
  });

  it("CASE 11: Pressure Round (source_turn_number=2) → rubric from the real rep5Turns[1]", async () => {
    const days = (await CourseService.loadModule("advanced-1")).days;
    const day = days.find((d) => (d.rep5Turns?.length ?? 0) >= 2)!;
    const rubric = buildRubric(day, "advanced-1", "ADVANCED", 2)!;
    expect(rubric.turn?.text).toBe(day.rep5Turns![1]!.text);
    expect(rubric.prompt).toBeUndefined();
    expect(rubric.level).toBe("advanced");
    // Different turns → different rubric hashes.
    const other = buildRubric(day, "advanced-1", "ADVANCED", 1)!;
    expect(await rubricSha256(rubric)).not.toBe(await rubricSha256(other));
    // A turn that does not exist is refused.
    expect(buildRubric(day, "advanced-1", "ADVANCED", day.rep5Turns!.length + 1)).toBeNull();
  });

  it("CASE 11b: the engine uses source_turn_number from the trusted row", async () => {
    const days = (await CourseService.loadModule("advanced-1")).days;
    const day = days.find((d) => (d.rep5Turns?.length ?? 0) >= 2)!;
    const rec = recording({
      module_id: "advanced-1",
      day: day.day,
      take_number: 2,
      source_turn_number: 2,
      storage_path: `${USER_A}/advanced-1/${day.day}/take-2.webm`,
    });
    let seenRubricTurn: string | undefined;
    const h = harness({ recordings: [rec], audio: { [rec.storage_path]: audioOf("adv") } });
    const llm = h.deps.llm;
    h.deps.llm = async (rubric, transcript, ideas) => {
      seenRubricTurn = rubric.turn?.text;
      return llm(rubric, transcript, ideas);
    };
    const res = await runFinalAudioCoach({ moduleId: "advanced-1", day: day.day, takeNumber: 2 }, h.deps);
    expect(res.body.status).toBe("ready");
    expect(seenRubricTurn).toBe(day.rep5Turns![1]!.text);
    expect([...h.store.rows.values()][0]!.insert.sourceTurnNumber).toBe(2);
  });

  it("CASE 12: a retry slot (Take 4/5) answering Turn 1 keeps source_turn_number=1", () => {
    const day = { rep5Turns: [{ id: "a" }, { id: "b" }, { id: "c" }] } as unknown as CourseDay;
    expect(sourceTurnNumberFor(day, 3, "turn:0")).toBe(1);
    expect(sourceTurnNumberFor(day, 4, "turn:0")).toBe(1);
    expect(sourceTurnNumberFor(day, 4, "turn:2")).toBe(3);
    // Scripted slots map Take N → Turn N.
    expect(sourceTurnNumberFor(day, 0)).toBe(1);
    expect(sourceTurnNumberFor(day, 1)).toBe(2);
    // Classic STEP 5 has no turns.
    expect(sourceTurnNumberFor({ rep5Turns: undefined }, 0)).toBeNull();
    expect(sourceTurnNumberFor({ rep5Turns: undefined }, 4, "turn:0")).toBeNull();
    // Out-of-range retry slot without a label is not guessed.
    expect(sourceTurnNumberFor(day, 4)).toBeNull();
  });

  it("rubric hash is deterministic and changes with the coach version", async () => {
    const day = (await CourseService.loadModule("simple-present")).days[0]!;
    const a = buildRubric(day, "simple-present", "X", null)!;
    const b = buildRubric(day, "simple-present", "X", null)!;
    expect(await rubricSha256(a)).toBe(await rubricSha256(b));
    expect(a.coachVersion).toBe(coachVersionFor("simple-present", 1));
    expect(await rubricSha256({ ...a, coachVersion: "v1" })).not.toBe(await rubricSha256(a));
  });
});

describe("Final Audio Coach — data hygiene & limits", () => {
  it("CASE 14: the stored row keeps transcript word count + compact feedback, never the transcript", async () => {
    const h = harness();
    await runFinalAudioCoach(INPUT, h.deps);
    const row = [...h.store.rows.values()][0]!;
    expect(row.transcript_word_count).toBeGreaterThan(5);
    const serialized = JSON.stringify(row);
    expect(serialized).not.toContain("San Salvador");
    expect(serialized).not.toContain(LONG_TRANSCRIPT);
    expect(Object.keys(row)).not.toContain("transcript");
    // Logs carry the count, not the words.
    const last = h.logs.at(-1)!;
    expect(last["transcriptWordCount"]).toBe(row.transcript_word_count);
    expect(JSON.stringify(last)).not.toContain("San Salvador");
  });

  it("CASE 13: RLS — learners can only read their own feedback; no browser write policy", () => {
    const dir = join(process.cwd(), "supabase", "migrations");
    const sql = readdirSync(dir)
      .map((f) => readFileSync(join(dir, f), "utf8"))
      .find((s) => s.includes("CREATE TABLE public.final_audio_coach_feedback"));
    expect(sql).toBeDefined();
    expect(sql).toMatch(/ENABLE ROW LEVEL SECURITY/);
    expect(sql).toMatch(/FOR SELECT TO authenticated USING \(auth\.uid\(\) = user_id\)/);
    expect(sql).not.toMatch(/FOR (INSERT|UPDATE|ALL)/);
    expect(sql).toMatch(/GRANT SELECT ON public\.final_audio_coach_feedback TO authenticated/);
    expect(sql).toMatch(/UNIQUE \(user_id, audio_sha256, rubric_sha256, coach_version\)/);
  });

  it("CASE 21: the byte ceiling covers the longest valid STEP 5 recording with headroom, and is bounded", async () => {
    // Longest authored classic goal is 420s → recorder cap goalSeconds[1] + 15.
    let longestGoal = 0;
    let longestTurn = 0;
    for (const id of ["basic-zero", "simple-present", "past-stories", "simple-future", "mixed-tenses", "eagles-week-1", "tigers", "sharks", "advanced-1"] as const) {
      for (const d of (await CourseService.loadModule(id)).days) {
        longestGoal = Math.max(longestGoal, d.goalSeconds[1]);
        for (const t of d.rep5Turns ?? []) longestTurn = Math.max(longestTurn, t.targetSeconds?.[1] ?? 0);
      }
    }
    const classicMax = longestGoal + 15;
    const pressureMax = Math.max(90, longestTurn + 15);
    expect(Math.max(classicMax, pressureMax)).toBeLessThanOrEqual(MAX_FINAL_AUDIO_SECONDS);
    const worstCaseBytes = (MAX_FINAL_AUDIO_SECONDS * RECORDER_BITS_PER_SECOND) / 8;
    expect(MAX_FINAL_AUDIO_BYTES).toBeGreaterThanOrEqual(worstCaseBytes * 2);
    expect(MAX_FINAL_AUDIO_BYTES).toBeLessThanOrEqual(16 * 1024 * 1024);
  });

  it("oversized stored audio is refused before hashing or AI", async () => {
    const path = recording().storage_path;
    const h = harness({ audio: { [path]: new Uint8Array(MAX_FINAL_AUDIO_BYTES + 1) } });
    const res = await runFinalAudioCoach(INPUT, h.deps);
    expect(res.http).toBe(413);
    expect(h.counters.stt + h.counters.llm + h.counters.quota).toBe(0);
  });

  it("output is validated and truncated to the hard length limits", () => {
    const long = "x".repeat(400);
    const fb = normalizeFeedback({ ...GOOD_LLM, strengthEn: long, nextStepEs: `${long} ${long}` })!;
    expect(fb.strengthEn.length).toBeLessThanOrEqual(120);
    expect(fb.nextStepEs.length).toBeLessThanOrEqual(160);
    expect(normalizeFeedback({ ...GOOD_LLM, targetLanguage: "excellent" })).toBeNull();
    expect(normalizeFeedback({ ...GOOD_LLM, strengthEs: "" })).toBeNull();
  });
});

describe("Final Audio Coach v2 — ONE transcript-grounded specific correction", () => {
  const ROUTINE = "I wake up at six and I took a shower and then I have breakfast. After that I go to work by bus.";
  const CORRECTION = {
    correctionNeeded: true,
    said: "I took a shower",
    betterVersion: "I take a shower",
    whyEn: "You're talking about your routine, so use the simple present.",
    whyEs: "Estás hablando de tu rutina, por eso usamos presente simple.",
    practicePhrase: "I take a shower and then I have breakfast.",
    corrections: [
      { category: "verb_tense", said: "I took a shower", betterVersion: "I take a shower", whyEn: "Use the simple present.", whyEs: "Usa el presente simple." },
    ],
  };

  it("coach version is v2 so cached v1 rows are never replayed as v2 feedback", () => {
    expect(FINAL_AUDIO_COACH_VERSION).toBe("v2");
  });

  it("CASE H: `said` found in the transcript → correction exposed, still 1 STT + 1 LLM, persisted without transcript", async () => {
    const h = harness({ transcript: ROUTINE, llmReply: { ...GOOD_LLM, ...CORRECTION } });
    const res = await runFinalAudioCoach(INPUT, h.deps);
    expect(res.body.status).toBe("ready");
    if (res.body.status !== "ready") return;
    expect(res.body.feedback.correctionNeeded).toBe(true);
    expect(res.body.feedback.said).toBe("I took a shower");
    expect(res.body.feedback.betterVersion).toBe("I take a shower");
    expect(res.body.feedback.practicePhrase).toBe(CORRECTION.practicePhrase);
    expect(h.counters.stt).toBe(1);
    expect(h.counters.llm).toBe(1);
    const row = [...h.store.rows.values()][0]!;
    expect(row.correction_needed).toBe(true);
    expect(row.said).toBe("I took a shower");
    expect(JSON.stringify(row)).not.toContain("go to work by bus");
  });

  it("CASE H (punctuation/case): matching ignores case, punctuation and whitespace", () => {
    const fb = normalizeFeedback({ ...GOOD_LLM, ...CORRECTION, said: "  i TOOK a shower!  " }, "So, I took a shower... then I have breakfast, and later I go to work by bus today.")!;
    expect(fb.correctionNeeded).toBe(true);
    expect(fb.said).toBe("i TOOK a shower!");
  });

  it("CASE I: `said` NOT in the transcript → fabricated quote suppressed, general next step kept, no second LLM call", async () => {
    const h = harness({ transcript: ROUTINE, llmReply: { ...GOOD_LLM, ...CORRECTION, said: "She work at home", corrections: [{ category: "grammar", said: "She work at home", betterVersion: "She works at home", whyEn: "Third person -s.", whyEs: "Tercera persona -s." }] } });
    const res = await runFinalAudioCoach(INPUT, h.deps);
    expect(res.body.status).toBe("ready");
    if (res.body.status !== "ready") return;
    expect(res.body.feedback.correctionNeeded).toBe(false);
    expect(res.body.feedback.said).toBeNull();
    expect(res.body.feedback.betterVersion).toBeNull();
    expect(res.body.feedback.whyEn).toBeNull();
    expect(res.body.feedback.whyEs).toBeNull();
    expect(res.body.feedback.practicePhrase).toBeNull();
    expect(res.body.feedback.nextStepEs).toBe(GOOD_LLM.nextStepEs);
    expect(h.counters.llm).toBe(1);
  });

  it("CASE I (partial words): `said` must match whole words, not a substring", () => {
    const fb = normalizeFeedback({ ...GOOD_LLM, ...CORRECTION, said: "took a show" }, ROUTINE)!;
    expect(fb.correctionNeeded).toBe(false);
  });

  it("CASE I (too long): a `said` over 15 words is not a short quote → suppressed", () => {
    const long = ROUTINE.split(" ").slice(0, 17).join(" ");
    const fb = normalizeFeedback({ ...GOOD_LLM, ...CORRECTION, said: long }, ROUTINE)!;
    expect(fb.correctionNeeded).toBe(false);
  });

  it("CASE I (incomplete): correctionNeeded=true with a missing field is suppressed, never half-rendered", () => {
    const fb = normalizeFeedback({ ...GOOD_LLM, ...CORRECTION, practicePhrase: null }, ROUTINE)!;
    expect(fb.correctionNeeded).toBe(false);
    expect(fb.said).toBeNull();
  });

  it("CASE J: no meaningful error → correctionNeeded=false, all correction fields null, strength + next step present", async () => {
    const h = harness({ transcript: ROUTINE, llmReply: GOOD_LLM });
    const res = await runFinalAudioCoach(INPUT, h.deps);
    if (res.body.status !== "ready") throw new Error("expected ready");
    expect(res.body.feedback).toMatchObject({
      correctionNeeded: false,
      said: null,
      betterVersion: null,
      whyEn: null,
      whyEs: null,
      practicePhrase: null,
    });
    expect(res.body.feedback.strengthEn).toBeTruthy();
    expect(res.body.feedback.nextStepEn).toBeTruthy();
  });

  it("CASE J (model leaks fields while false): correctionNeeded=false nulls any stray correction text", () => {
    const fb = normalizeFeedback({ ...GOOD_LLM, ...CORRECTION, correctionNeeded: false }, ROUTINE)!;
    expect(fb.correctionNeeded).toBe(false);
    expect(fb.said).toBeNull();
    expect(fb.betterVersion).toBeNull();
  });

  it("CASE K: the schema allows exactly ONE correction — scalar fields, no arrays", () => {
    const props = COACH_JSON_SCHEMA.schema.properties as Record<string, { type: unknown }>;
    for (const key of ["said", "betterVersion", "whyEn", "whyEs", "practicePhrase"]) {
      expect(props[key]!.type).toEqual(["string", "null"]);
    }
    expect(COACH_JSON_SCHEMA.schema.required).toContain("correctionNeeded");
    expect(Object.values(props).some((p) => p.type === "array")).toBe(false);
    // The engine has a single llm dependency and calls it once (CASE H above); a second "correction" call does not exist.
    const src = readFileSync(join(process.cwd(), "src/lib/final-audio-coach.server.ts"), "utf8");
    expect(src.match(/deps\.llm\(/g)).toHaveLength(1);
  });

  it("correction fields obey their length limits and a no-op 'correction' (same as said) is dropped", () => {
    const long = "word ".repeat(80);
    const fb = normalizeFeedback({ ...GOOD_LLM, ...CORRECTION, whyEs: long, practicePhrase: long }, ROUTINE)!;
    expect(fb.correctionNeeded).toBe(true);
    expect(fb.whyEs!.length).toBeLessThanOrEqual(180);
    expect(fb.practicePhrase!.length).toBeLessThanOrEqual(160);
    const same = normalizeFeedback({ ...GOOD_LLM, ...CORRECTION, betterVersion: "I took a shower." }, ROUTINE)!;
    expect(same.correctionNeeded).toBe(false);
  });

  it("cache replay (no transcript in memory) keeps the correction that was grounded at generation time", async () => {
    const h = harness({ transcript: ROUTINE, llmReply: { ...GOOD_LLM, ...CORRECTION } });
    await runFinalAudioCoach(INPUT, h.deps);
    const again = await runFinalAudioCoach(INPUT, h.deps);
    expect(h.counters.stt).toBe(1);
    expect(h.counters.llm).toBe(1);
    if (again.body.status !== "ready") throw new Error("expected ready");
    expect(again.body.feedback.said).toBe("I took a shower");
  });
});

describe("Final Audio Coach — Take number derived from the real CourseDay", () => {
  const advancedTurns = async () => (await CourseService.loadModule("advanced-1")).days;

  it("maxTakeNumberFor matches TakeBoard's takeSlots for every real day", async () => {
    for (const id of ["basic-zero", "simple-present", "past-stories", "simple-future", "mixed-tenses", "eagles-week-1", "tigers", "sharks", "advanced-1"] as const) {
      for (const d of (await CourseService.loadModule(id)).days) {
        expect(maxTakeNumberFor(d)).toBe(takeSlots(d.rep5Turns));
      }
    }
  });

  it("CASE A: classic STEP 5 day → Take 5 valid, Take 6 rejected before Storage/AI", async () => {
    const day = (await CourseService.loadModule("simple-present")).days[0]!;
    expect(maxTakeNumberFor(day)).toBe(5);
    const rec5 = recording({ take_number: 5, storage_path: `${USER_A}/simple-present/1/take-5.webm` });
    const ok = harness({ recordings: [rec5], audio: { [rec5.storage_path]: audioOf("t5") } });
    const res5 = await runFinalAudioCoach({ ...INPUT, takeNumber: 5 }, ok.deps);
    expect(res5.body.status).toBe("ready");
    expect(ok.counters.download).toBe(1);

    const rec6 = recording({ take_number: 6, storage_path: `${USER_A}/simple-present/1/take-6.webm` });
    const bad = harness({ recordings: [rec6], audio: { [rec6.storage_path]: audioOf("t6") } });
    const res6 = await runFinalAudioCoach({ ...INPUT, takeNumber: 6 }, bad.deps);
    expect(res6.http).toBe(404);
    expect(bad.counters.fetch + bad.counters.download + bad.counters.quota + bad.counters.stt + bad.counters.llm).toBe(0);
  });

  it("CASE B: real Advanced Pressure Round with > 5 turns → Take N valid, Take N+1 rejected", async () => {
    const days = await advancedTurns();
    const pressure = days.filter((d) => (d.rep5Turns?.length ?? 0) > 5);
    expect(pressure.length).toBeGreaterThan(0);
    for (const day of pressure) {
      const n = day.rep5Turns!.length;
      expect(maxTakeNumberFor(day)).toBe(n);
      const recN = recording({
        module_id: "advanced-1",
        day: day.day,
        take_number: n,
        source_turn_number: n,
        storage_path: `${USER_A}/advanced-1/${day.day}/take-${n}.webm`,
      });
      const ok = harness({ recordings: [recN], audio: { [recN.storage_path]: audioOf(`adv-${day.day}-${n}`) } });
      const res = await runFinalAudioCoach({ moduleId: "advanced-1", day: day.day, takeNumber: n }, ok.deps);
      expect(res.body.status).toBe("ready");
      expect([...ok.store.rows.values()][0]!.insert.sourceTurnNumber).toBe(n);

      const recOver = recording({
        module_id: "advanced-1",
        day: day.day,
        take_number: n + 1,
        source_turn_number: null,
        storage_path: `${USER_A}/advanced-1/${day.day}/take-${n + 1}.webm`,
      });
      const bad = harness({ recordings: [recOver], audio: { [recOver.storage_path]: audioOf("over") } });
      const over = await runFinalAudioCoach({ moduleId: "advanced-1", day: day.day, takeNumber: n + 1 }, bad.deps);
      expect(over.http).toBe(404);
      expect(bad.counters.fetch + bad.counters.download + bad.counters.quota + bad.counters.stt + bad.counters.llm).toBe(0);
    }
  });

  it("CASE B2: a classic role play (2–3 turns + retries) still allows exactly 5 Takes", async () => {
    const day = (await advancedTurns()).find((d) => d.rep5Turns?.length === 3)!;
    expect(maxTakeNumberFor(day)).toBe(5);
  });

  it("CASE C: takeNumber 0 / negative / non-integer → nothing paid, no Storage, no quota", async () => {
    for (const takeNumber of [0, -1, 2.5, Number.NaN]) {
      const h = harness();
      const res = await runFinalAudioCoach({ ...INPUT, takeNumber }, h.deps);
      expect(res.http).toBe(404);
      expect(h.counters.download + h.counters.quota + h.counters.stt + h.counters.llm).toBe(0);
    }
  });
});

describe("Final Audio Coach — Whisper confidence → UNCLEAR", () => {
  const IMPERFECT = "I work yesterday and my manager help me because customer angry and I talk with him.";

  it("CASE F: enough words but avgLogprob below threshold → unclear, 1 STT, 0 LLM", async () => {
    const h = harness({ transcript: IMPERFECT, confidence: { avgLogprob: AVG_LOGPROB_THRESHOLD - 0.2, noSpeechProb: 0.05 } });
    const res = await runFinalAudioCoach(INPUT, h.deps);
    expect(res.body.status).toBe("unclear");
    expect(h.counters.stt).toBe(1);
    expect(h.counters.llm).toBe(0);
    expect([...h.store.rows.values()][0]!.status).toBe("unclear");
  });

  it("CASE G: hallucinated words with high noSpeechProb → unclear, 1 STT, 0 LLM", async () => {
    const h = harness({ transcript: IMPERFECT, confidence: { avgLogprob: -0.2, noSpeechProb: NO_SPEECH_THRESHOLD + 0.2 } });
    const res = await runFinalAudioCoach(INPUT, h.deps);
    expect(res.body.status).toBe("unclear");
    expect(h.counters.stt).toBe(1);
    expect(h.counters.llm).toBe(0);
  });

  it("CASE H: good confidence but fewer than MIN_TRANSCRIPT_WORDS → unclear, 1 STT, 0 LLM", async () => {
    const short = Array.from({ length: MIN_TRANSCRIPT_WORDS - 1 }, () => "word").join(" ");
    const h = harness({ transcript: short, confidence: { avgLogprob: -0.1, noSpeechProb: 0.01 } });
    const res = await runFinalAudioCoach(INPUT, h.deps);
    expect(res.body.status).toBe("unclear");
    expect(h.counters.stt).toBe(1);
    expect(h.counters.llm).toBe(0);
  });

  it("CASE I: clear but grammatically imperfect learner English reaches the LLM exactly once", async () => {
    const h = harness({ transcript: IMPERFECT, confidence: { avgLogprob: -0.35, noSpeechProb: 0.1 } });
    const res = await runFinalAudioCoach(INPUT, h.deps);
    expect(res.body.status).toBe("ready");
    expect(h.counters.stt).toBe(1);
    expect(h.counters.llm).toBe(1);
  });

  it("missing segment metadata never rejects a clearly present transcript", async () => {
    const h = harness({ transcript: IMPERFECT, confidence: null });
    const res = await runFinalAudioCoach(INPUT, h.deps);
    expect(res.body.status).toBe("ready");
    expect(h.counters.llm).toBe(1);
  });

  it("CASE J: Groq provider failure → status error (never unclear), 0 LLM, exactly 1 STT attempt", async () => {
    const h = harness({ transcript: null });
    const res = await runFinalAudioCoach(INPUT, h.deps);
    expect(res.body.status).toBe("error");
    expect(res.body.status).not.toBe("unclear");
    expect(h.counters.stt).toBe(1);
    expect(h.counters.llm).toBe(0);
  });
});
