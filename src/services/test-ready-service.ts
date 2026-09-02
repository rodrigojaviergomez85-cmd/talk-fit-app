import { supabase } from "@/integrations/supabase/client";
import type { ModuleId, TestReadyType } from "@/lib/types";

/**
 * TestReadyService — objective activity metrics for Test Ready Sprints.
 * Completed / attempts / response seconds / completion seconds only.
 * Never a score.
 */

export type TestReadyRecord = {
  moduleId: ModuleId;
  day: number;
  sprintType: TestReadyType;
  completedAt: string;
  attempts: number;
  responseSeconds: number;
  completionSeconds: number;
};

type Listener = () => void;
const listeners = new Set<Listener>();
let cache: Record<string, TestReadyRecord> = {};

const key = (moduleId: ModuleId, day: number) => `${moduleId}:${day}`;

function emit() {
  for (const fn of listeners) fn();
}

export const TestReadyService = {
  subscribe(fn: Listener): () => void {
    listeners.add(fn);
    return () => listeners.delete(fn);
  },

  snapshot(): Record<string, TestReadyRecord> {
    return cache;
  },

  get(moduleId: ModuleId, day: number): TestReadyRecord | null {
    return cache[key(moduleId, day)] ?? null;
  },

  /** Pull the learner's sprint records for one module. */
  async pull(moduleId: ModuleId): Promise<Record<string, TestReadyRecord>> {
    const { data: auth } = await supabase.auth.getUser();
    if (!auth.user) return cache;
    const { data, error } = await supabase
      .from("test_ready_progress")
      .select("module_id, day, sprint_type, completed_at, attempts, response_seconds, completion_seconds")
      .eq("module_id", moduleId);
    if (error) throw error;
    const next = { ...cache };
    for (const row of data ?? []) {
      next[key(row.module_id as ModuleId, row.day)] = {
        moduleId: row.module_id as ModuleId,
        day: row.day,
        sprintType: row.sprint_type as TestReadyType,
        completedAt: row.completed_at,
        attempts: row.attempts,
        responseSeconds: row.response_seconds,
        completionSeconds: row.completion_seconds,
      };
    }
    cache = next;
    emit();
    return cache;
  },

  /** Record one completed sprint. Repeats increment `attempts`. */
  async complete(input: {
    moduleId: ModuleId;
    day: number;
    sprintType: TestReadyType;
    responseSeconds: number;
    completionSeconds: number;
  }): Promise<TestReadyRecord> {
    const { data: auth } = await supabase.auth.getUser();
    if (!auth.user) throw new Error("Not signed in");
    const previous = cache[key(input.moduleId, input.day)];
    const attempts = (previous?.attempts ?? 0) + 1;
    const record: TestReadyRecord = {
      moduleId: input.moduleId,
      day: input.day,
      sprintType: input.sprintType,
      completedAt: new Date().toISOString(),
      attempts,
      responseSeconds: Math.round(input.responseSeconds),
      completionSeconds: Math.round(input.completionSeconds),
    };
    const { error } = await supabase.from("test_ready_progress").upsert(
      {
        user_id: auth.user.id,
        module_id: record.moduleId,
        day: record.day,
        sprint_type: record.sprintType,
        completed_at: record.completedAt,
        attempts: record.attempts,
        response_seconds: record.responseSeconds,
        completion_seconds: record.completionSeconds,
      },
      { onConflict: "user_id,module_id,day" },
    );
    if (error) throw error;
    cache = { ...cache, [key(record.moduleId, record.day)]: record };
    emit();
    return record;
  },
};
