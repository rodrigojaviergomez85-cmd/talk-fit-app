import { supabase } from "@/integrations/supabase/client";
import { JourneyService } from "./journey-service";
import { PracticeSessionService, type PracticeSession } from "./practice-session";
import { VerbBank, type VerbBankState } from "./verb-bank";
import {
  clearPendingPlacement,
  getPendingPlacement,
  loadPreferences,
  writePreferencesLocal,
} from "./preferences";
import type { ModuleId, Recording } from "@/lib/types";
import { isModuleId } from "./course-service";

/**
 * CloudSync — the backend is the source of truth for the pilot.
 * Every learner-owned piece of state (day progress, in-progress position,
 * Rep 5 takes, verb bank, preferences) has a cloud read and a cloud write
 * here. Local storage stays as an offline cache only.
 */

export type TakeRow = {
  moduleId: ModuleId;
  day: number;
  takeNumber: number;
  isFinalRep: boolean;
  durationSeconds: number;
  estimatedIdeaCount: number | null;
  storagePath: string;
  createdAt: string;
};

async function userId(): Promise<string | null> {
  const { data } = await supabase.auth.getUser();
  return data.user?.id ?? null;
}

function extensionFor(blob: Blob): string {
  if (blob.type.includes("mp4") || blob.type.includes("m4a")) return "m4a";
  if (blob.type.includes("webm")) return "webm";
  if (blob.type.includes("ogg")) return "ogg";
  return "audio";
}

function asModuleId(value: unknown): ModuleId {
  return isModuleId(value) ? value : "simple-present";
}

export const CloudSync = {
  userId,

  /* ------------------------------ Rep 5 takes ----------------------------- */

  /**
   * Uploads one Rep 5 take and records it. Idempotent per
   * (learner, module, day, take): re-recording a take replaces it.
   */
  async uploadTake(input: {
    moduleId: ModuleId;
    day: number;
    takeNumber: number;
    recording: Recording;
    isFinalRep?: boolean;
  }): Promise<{ ok: boolean; storagePath?: string }> {
    const uid = await userId();
    const blob = input.recording.blob;
    if (!uid || !blob) return { ok: false };

    const path = `${uid}/${input.moduleId}/${input.day}/take-${input.takeNumber}.${extensionFor(blob)}`;
    const upload = await supabase.storage
      .from("recordings")
      .upload(path, blob, { upsert: true, contentType: blob.type || "audio/webm" });
    if (upload.error) {
      console.error("[cloud] take upload failed", upload.error.message);
      return { ok: false };
    }

    const { error } = await supabase.from("recordings").upsert(
      {
        user_id: uid,
        module_id: input.moduleId,
        day: input.day,
        take_number: input.takeNumber,
        is_final_rep: input.isFinalRep ?? false,
        duration_seconds: input.recording.durationSeconds,
        estimated_idea_count: input.recording.sentenceCount ?? null,
        storage_path: path,
        mime_type: blob.type || null,
      },
      { onConflict: "user_id,module_id,day,take_number" },
    );
    if (error) {
      console.error("[cloud] take row failed", error.message);
      return { ok: false };
    }
    return { ok: true, storagePath: path };
  },

  /** Exactly one Final Rep per day: the previous choice is cleared first. */
  async markFinalTake(moduleId: ModuleId, day: number, takeNumber: number): Promise<boolean> {
    const uid = await userId();
    if (!uid) return false;
    const clear = await supabase
      .from("recordings")
      .update({ is_final_rep: false })
      .eq("user_id", uid)
      .eq("module_id", moduleId)
      .eq("day", day)
      .neq("take_number", takeNumber);
    if (clear.error) {
      console.error("[cloud] clear final rep failed", clear.error.message);
      return false;
    }
    const { error } = await supabase
      .from("recordings")
      .update({ is_final_rep: true })
      .eq("user_id", uid)
      .eq("module_id", moduleId)
      .eq("day", day)
      .eq("take_number", takeNumber);
    if (error) {
      console.error("[cloud] set final rep failed", error.message);
      return false;
    }
    return true;
  },

  /** Updates the estimated idea count once analysis finishes. */
  async updateTakeIdeas(moduleId: ModuleId, day: number, takeNumber: number, ideas: number | null) {
    const uid = await userId();
    if (!uid) return;
    await supabase
      .from("recordings")
      .update({ estimated_idea_count: ideas })
      .eq("user_id", uid)
      .eq("module_id", moduleId)
      .eq("day", day)
      .eq("take_number", takeNumber);
  },

  async listTakes(moduleId?: ModuleId, day?: number): Promise<TakeRow[]> {
    const uid = await userId();
    if (!uid) return [];
    let query = supabase
      .from("recordings")
      .select("module_id, day, take_number, is_final_rep, duration_seconds, estimated_idea_count, storage_path, created_at")
      .order("created_at", { ascending: false });
    if (moduleId) query = query.eq("module_id", moduleId);
    if (typeof day === "number") query = query.eq("day", day);
    const { data, error } = await query;
    if (error || !data) return [];
    return data.map((row) => ({
      moduleId: asModuleId(row.module_id),
      day: row.day,
      takeNumber: row.take_number,
      isFinalRep: row.is_final_rep,
      durationSeconds: Number(row.duration_seconds),
      estimatedIdeaCount: row.estimated_idea_count,
      storagePath: row.storage_path,
      createdAt: row.created_at,
    }));
  },

  /* --------------------------- Practice position -------------------------- */

  async saveSession(session: PracticeSession): Promise<void> {
    const uid = await userId();
    if (!uid) return;
    const { error } = await supabase.from("practice_sessions").upsert(
      {
        user_id: uid,
        module_id: session.moduleId,
        day: session.day,
        week: session.week,
        stage: session.stage,
        sub_index: session.subIndex,
        attempted: session.attempted,
        skipped: session.skipped,
        status: "in_progress",
        started_at: session.startedAt,
        updated_at: session.updatedAt,
      },
      { onConflict: "user_id,module_id,day" },
    );
    if (error) console.error("[cloud] session save failed", error.message);
  },

  async completeSession(moduleId: ModuleId, day: number): Promise<void> {
    const uid = await userId();
    if (!uid) return;
    await supabase
      .from("practice_sessions")
      .update({ status: "completed" })
      .eq("user_id", uid)
      .eq("module_id", moduleId)
      .eq("day", day);
  },

  async pullSessions(): Promise<PracticeSession[]> {
    const uid = await userId();
    if (!uid) return [];
    const { data, error } = await supabase
      .from("practice_sessions")
      .select("module_id, day, week, stage, sub_index, attempted, skipped, status, started_at, updated_at")
      .eq("status", "in_progress");
    if (error || !data) return [];
    return data.map((row) => ({
      moduleId: asModuleId(row.module_id),
      day: row.day,
      week: row.week ?? null,
      stage: row.stage,
      subIndex: row.sub_index,
      attempted: row.attempted ?? [],
      skipped: row.skipped ?? [],
      startedAt: row.started_at,
      updatedAt: row.updated_at,
    }));
  },

  /* ------------------------------- Verb bank ------------------------------ */

  async pushVerbs(state: VerbBankState): Promise<void> {
    const uid = await userId();
    if (!uid) return;
    const rows = Object.entries(state).map(([verbId, stat]) => ({
      user_id: uid,
      verb_id: verbId,
      discovered: stat.discovered,
      first_discovered_at: stat.firstDiscoveredAt,
      listen_count: stat.listenCount,
      practice_count: stat.practiceCount,
    }));
    if (rows.length === 0) return;
    const { error } = await supabase.from("verb_progress").upsert(rows, { onConflict: "user_id,verb_id" });
    if (error) console.error("[cloud] verb progress save failed", error.message);
  },

  async pullVerbs(): Promise<VerbBankState> {
    const uid = await userId();
    if (!uid) return {};
    const { data, error } = await supabase
      .from("verb_progress")
      .select("verb_id, discovered, first_discovered_at, listen_count, practice_count");
    if (error || !data) return {};
    const state: VerbBankState = {};
    for (const row of data) {
      state[row.verb_id] = {
        discovered: row.discovered,
        firstDiscoveredAt: row.first_discovered_at,
        listenCount: row.listen_count,
        practiceCount: row.practice_count,
      };
    }
    return state;
  },

  /* ------------------------------ Preferences ----------------------------- */

  /** Pushes UI preferences only; placement fields are written by their own flows. */
  async pushPreferences(): Promise<void> {
    const uid = await userId();
    if (!uid) return;
    const prefs = loadPreferences();
    await supabase.from("user_preferences").upsert(
      {
        user_id: uid,
        app_language: prefs.appLanguage,
        spanish_support: prefs.spanishSupport,
        onboarding_completed: prefs.onboardingCompleted,
      },
      { onConflict: "user_id" },
    );
  },

  async pullPreferences(): Promise<void> {
    const uid = await userId();
    if (!uid) return;
    const { data } = await supabase
      .from("user_preferences")
      .select(
        "app_language, spanish_support, onboarding_completed, current_module_id, initial_placement_module_id, placement_source, placement_selected_at, placement_changed_at, placement_change_count",
      )
      .eq("user_id", uid)
      .maybeSingle();
    if (!data) return;
    writePreferencesLocal({
      appLanguage: data.app_language === "en" ? "en" : "es",
      spanishSupport: data.spanish_support,
      onboardingCompleted: data.onboarding_completed,
      currentModuleId: isModuleId(data.current_module_id) ? data.current_module_id : null,
      initialPlacementModuleId: isModuleId(data.initial_placement_module_id)
        ? data.initial_placement_module_id
        : null,
      placementSource: data.placement_source,
      placementSelectedAt: data.placement_selected_at,
      placementChangedAt: data.placement_changed_at,
      placementChangeCount: data.placement_change_count ?? 0,
    });
  },

  /* ------------------------------- Placement ------------------------------ */

  /** True when the account already holds meaningful learning data. */
  async isExistingLearner(uid: string): Promise<boolean> {
    const [days, sessions, prefs] = await Promise.all([
      supabase.from("day_progress").select("id", { count: "exact", head: true }).eq("user_id", uid),
      supabase.from("practice_sessions").select("id", { count: "exact", head: true }).eq("user_id", uid),
      supabase.from("user_preferences").select("current_module_id").eq("user_id", uid).maybeSingle(),
    ]);
    return (days.count ?? 0) > 0 || (sessions.count ?? 0) > 0 || Boolean(prefs.data?.current_module_id);
  },

  /**
   * Applies a pre-auth placement choice to a *new* learner. Existing learners
   * keep their saved position and the pending choice is discarded. The pending
   * key is only cleared once the backend confirms the write.
   */
  async applyPendingPlacement(): Promise<"saved" | "discarded" | "none" | "failed"> {
    const uid = await userId();
    const pending = getPendingPlacement();
    if (!uid || !pending) return "none";
    if (await CloudSync.isExistingLearner(uid)) {
      clearPendingPlacement();
      return "discarded";
    }
    const { error } = await supabase.from("user_preferences").upsert(
      {
        user_id: uid,
        current_module_id: pending.moduleId,
        initial_placement_module_id: pending.moduleId,
        placement_source: "self_selected",
        placement_selected_at: pending.selectedAt,
        onboarding_completed: true,
      },
      { onConflict: "user_id" },
    );
    if (error) {
      console.error("[placement] save failed", error.message);
      return "failed";
    }
    clearPendingPlacement();
    writePreferencesLocal({
      currentModuleId: pending.moduleId,
      initialPlacementModuleId: pending.moduleId,
      placementSource: "self_selected",
      placementSelectedAt: pending.selectedAt,
      onboardingCompleted: true,
    });
    return "saved";
  },

  /**
   * "Cambiar mi nivel": moves only the current module. Progress, recordings,
   * sessions and the original placement are untouched.
   */
  async changeLevel(moduleId: ModuleId): Promise<boolean> {
    const uid = await userId();
    const prefs = loadPreferences();
    const now = new Date().toISOString();
    const count = prefs.placementChangeCount + 1;
    if (uid) {
      const { error } = await supabase.from("user_preferences").upsert(
        { user_id: uid, current_module_id: moduleId, placement_changed_at: now, placement_change_count: count },
        { onConflict: "user_id" },
      );
      if (error) {
        console.error("[placement] change level failed", error.message);
        return false;
      }
    }
    writePreferencesLocal({ currentModuleId: moduleId, placementChangedAt: now, placementChangeCount: count });
    JourneyService.invalidatePull();
    return true;
  },

  /* ------------------------------- Migration ------------------------------ */

  async alreadyMigrated(): Promise<boolean> {
    const uid = await userId();
    if (!uid) return true;
    const { data } = await supabase
      .from("user_preferences")
      .select("migrated_local_at")
      .eq("user_id", uid)
      .maybeSingle();
    return Boolean(data?.migrated_local_at);
  },

  /**
   * One-time merge of whatever this device holds into the account.
   * Union semantics everywhere; the cloud row always wins on conflict, so
   * running it twice can never duplicate or overwrite newer data.
   */
  async migrateLocalData(): Promise<void> {
    const uid = await userId();
    if (!uid) return;
    if (await CloudSync.alreadyMigrated()) return;

    // 1. Completed days the account does not have yet.
    const local = JourneyService.load();
    const { data: cloudDays } = await supabase
      .from("day_progress")
      .select("module_id, day")
      .eq("user_id", uid);
    const known = new Set((cloudDays ?? []).map((r) => `${r.module_id}:${r.day}`));
    for (const record of Object.values(local.days)) {
      if (known.has(`${record.moduleId}:${record.day}`)) continue;
      await JourneyService.syncDay(record.moduleId, record.day, local);
    }

    // 2. Verb bank (union: cloud counts win when both exist).
    const localVerbs = VerbBank.load();
    const cloudVerbs = await CloudSync.pullVerbs();
    const mergedVerbs: VerbBankState = { ...localVerbs };
    for (const [id, stat] of Object.entries(cloudVerbs)) {
      const mine = mergedVerbs[id];
      mergedVerbs[id] = mine
        ? {
            discovered: mine.discovered || stat.discovered,
            firstDiscoveredAt: mine.firstDiscoveredAt ?? stat.firstDiscoveredAt,
            listenCount: Math.max(mine.listenCount, stat.listenCount),
            practiceCount: Math.max(mine.practiceCount, stat.practiceCount),
          }
        : stat;
    }
    await CloudSync.pushVerbs(mergedVerbs);
    VerbBank.hydrate(mergedVerbs);

    // 3. In-progress positions: keep the most recently updated of the two.
    const cloudSessions = await CloudSync.pullSessions();
    const cloudByKey = new Map(cloudSessions.map((s) => [`${s.moduleId}:${s.day}`, s]));
    for (const session of PracticeSessionService.snapshotAll()) {
      const cloudOne = cloudByKey.get(`${session.moduleId}:${session.day}`);
      const newer =
        !cloudOne || new Date(session.updatedAt).getTime() > new Date(cloudOne.updatedAt).getTime();
      if (newer) await CloudSync.saveSession(session);
    }

    // 4. Preferences from this device, then mark the migration done.
    await CloudSync.pushPreferences();
    await supabase
      .from("user_preferences")
      .upsert({ user_id: uid, migrated_local_at: new Date().toISOString() }, { onConflict: "user_id" });
  },

  /**
   * "Reset my journey": clears day progress and saved positions in the account.
   * Stored audio is kept for the pilot and is never deleted automatically.
   */
  async resetAccountProgress(): Promise<void> {
    const uid = await userId();
    if (!uid) return;
    await supabase.from("day_progress").delete().eq("user_id", uid);
    await supabase.from("practice_sessions").delete().eq("user_id", uid);
    JourneyService.invalidatePull();
  },

  /** Full restore after sign-in: backend state replaces the local cache. */
  async restoreAll(): Promise<void> {
    const uid = await userId();
    if (!uid) return;
    await CloudSync.migrateLocalData();
    await CloudSync.pullPreferences();
    JourneyService.invalidatePull();
    await JourneyService.pull();
    const [sessions, verbs] = await Promise.all([CloudSync.pullSessions(), CloudSync.pullVerbs()]);
    PracticeSessionService.hydrate(sessions);
    if (Object.keys(verbs).length > 0) VerbBank.hydrate(verbs);
  },
};
