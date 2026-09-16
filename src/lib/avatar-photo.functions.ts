import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

/**
 * Real profile photos: upload, AI review, removal, reporting and admin review.
 *
 * Everything that decides visibility happens here on the server. The browser
 * only sends a resized square JPEG; it never sets a status.
 */

export const MAX_UPLOADS_PER_DAY = 3;
export const MAX_BYTES = 400_000; // after the client-side square resize
const ALLOWED_MIME = ["image/jpeg", "image/png", "image/webp"];
const BUCKET = "avatars";
/** Reports needed before a photo hides itself until an admin reviews it. */
export const REPORTS_TO_HIDE = 3;

export type AvatarStatus = "none" | "pending" | "approved" | "rejected" | "hidden";

export type UploadResult = {
  ok: boolean;
  status?: AvatarStatus;
  photoUrl?: string | null;
  error?: "type" | "size" | "limit" | "rejected" | "server";
};

function salvadorDay(): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/El_Salvador" }).format(new Date());
}

function decodeDataUrl(dataUrl: string): { mime: string; bytes: Uint8Array } | null {
  const match = /^data:([a-z/+-]+);base64,([A-Za-z0-9+/=]+)$/i.exec(dataUrl.trim());
  if (!match?.[1] || !match[2]) return null;
  try {
    const binary = atob(match[2]);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
    return { mime: match[1].toLowerCase(), bytes };
  } catch {
    return null;
  }
}

async function signPath(path: string): Promise<string | null> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data } = await supabaseAdmin.storage.from(BUCKET).createSignedUrl(path, 60 * 60);
  return data?.signedUrl ?? null;
}

export const uploadMyPhoto = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { dataUrl: string }) => ({ dataUrl: String(input?.dataUrl ?? "").slice(0, 3_000_000) }))
  .handler(async ({ data, context }): Promise<UploadResult> => {
    const decoded = decodeDataUrl(data.dataUrl);
    if (!decoded || !ALLOWED_MIME.includes(decoded.mime)) return { ok: false, error: "type" };
    if (decoded.bytes.byteLength > MAX_BYTES) return { ok: false, error: "size" };

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const userId = context.userId;
    const today = salvadorDay();

    const { data: profile } = await supabaseAdmin
      .from("profiles")
      .select("avatar_upload_day, avatar_uploads_today, avatar_photo_path")
      .eq("id", userId)
      .maybeSingle();

    const sameDay = (profile as { avatar_upload_day?: string | null } | null)?.avatar_upload_day === today;
    const usedToday = sameDay ? Number((profile as { avatar_uploads_today?: number } | null)?.avatar_uploads_today ?? 0) : 0;
    if (usedToday >= MAX_UPLOADS_PER_DAY) return { ok: false, error: "limit" };

    const oldPath = (profile as { avatar_photo_path?: string | null } | null)?.avatar_photo_path ?? null;
    const ext = decoded.mime === "image/png" ? "png" : decoded.mime === "image/webp" ? "webp" : "jpg";
    const path = `${userId}/p-${Date.now()}.${ext}`;

    const up = await supabaseAdmin.storage
      .from(BUCKET)
      .upload(path, decoded.bytes, { contentType: decoded.mime, upsert: true });
    if (up.error) {
      console.error("[avatar-photo] upload failed", up.error);
      return { ok: false, error: "server" };
    }

    await supabaseAdmin
      .from("profiles")
      .update({
        avatar_photo_path: path,
        avatar_status: "pending",
        avatar_reject_reason: null,
        avatar_upload_day: today,
        avatar_uploads_today: usedToday + 1,
      })
      .eq("id", userId);

    const started = Date.now();
    const { moderatePhoto } = await import("./avatar-photo.server");
    const verdict = await moderatePhoto(data.dataUrl);

    const { logAiCall } = await import("./ai-call-log.server");
    void logAiCall({
      user_id: userId,
      endpoint: "avatar-moderation",
      provider: verdict.failed ? "none" : "lovable-gateway",
      model: "openai/gpt-6-astra",
      input_tokens: verdict.inputTokens,
      output_tokens: verdict.outputTokens,
      ok: !verdict.failed,
      error_code: verdict.errorCode ?? null,
      latency_ms: Date.now() - started,
    });

    if (verdict.failed) {
      // Review could not run: the photo stays pending (invisible to others).
      return { ok: true, status: "pending", photoUrl: await signPath(path) };
    }

    if (!verdict.allowed) {
      await supabaseAdmin.storage.from(BUCKET).remove([path]);
      await supabaseAdmin
        .from("profiles")
        .update({
          avatar_photo_path: null,
          avatar_status: "rejected",
          avatar_reject_reason: verdict.reason.slice(0, 200),
          avatar_reviewed_at: new Date().toISOString(),
        })
        .eq("id", userId);
      return { ok: false, error: "rejected", status: "rejected" };
    }

    if (oldPath && oldPath !== path) await supabaseAdmin.storage.from(BUCKET).remove([oldPath]);
    await supabaseAdmin
      .from("profiles")
      .update({ avatar_status: "approved", avatar_reviewed_at: new Date().toISOString(), avatar_reject_reason: null })
      .eq("id", userId);

    return { ok: true, status: "approved", photoUrl: await signPath(path) };
  });

export const removeMyPhoto = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<{ ok: boolean }> => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: profile } = await supabaseAdmin
      .from("profiles")
      .select("avatar_photo_path")
      .eq("id", context.userId)
      .maybeSingle();
    const path = (profile as { avatar_photo_path?: string | null } | null)?.avatar_photo_path ?? null;
    if (path) await supabaseAdmin.storage.from(BUCKET).remove([path]);
    await supabaseAdmin
      .from("profiles")
      .update({ avatar_photo_path: null, avatar_status: "none", avatar_reject_reason: null })
      .eq("id", context.userId);
    return { ok: true };
  });

/** Signed URLs for the league board. Only approved photos are ever signed. */
export const signAvatarPhotos = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { paths: string[] }) => ({
    paths: Array.isArray(input?.paths) ? input.paths.filter((p) => typeof p === "string").slice(0, 100) : [],
  }))
  .handler(async ({ data }): Promise<Record<string, string>> => {
    if (!data.paths.length) return {};
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const owners = [...new Set(data.paths.map((p) => p.split("/")[0]).filter(Boolean))] as string[];
    const { data: rows } = await supabaseAdmin
      .from("profiles")
      .select("id, avatar_photo_path, avatar_status")
      .in("id", owners);
    const approved = new Set(
      ((rows ?? []) as { avatar_photo_path: string | null; avatar_status: string }[])
        .filter((r) => r.avatar_status === "approved" && r.avatar_photo_path)
        .map((r) => r.avatar_photo_path as string),
    );
    const out: Record<string, string> = {};
    await Promise.all(
      data.paths
        .filter((p) => approved.has(p))
        .map(async (p) => {
          const url = await signPath(p);
          if (url) out[p] = url;
        }),
    );
    return out;
  });

/** Any signed-in learner can report someone else's photo, once. */
export const reportAvatarPhoto = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { path: string; reason?: string }) => ({
    path: String(input?.path ?? "").slice(0, 200),
    reason: typeof input?.reason === "string" ? input.reason.slice(0, 200) : undefined,
  }))
  .handler(async ({ data, context }): Promise<{ ok: boolean }> => {
    const ownerId = data.path.split("/")[0] ?? "";
    if (!/^[0-9a-f-]{36}$/i.test(ownerId) || ownerId === context.userId) return { ok: false };

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    await supabaseAdmin
      .from("avatar_reports")
      .upsert(
        { reporter_id: context.userId, owner_id: ownerId, reason: data.reason ?? null, status: "open" },
        { onConflict: "reporter_id,owner_id" },
      );

    const { count } = await supabaseAdmin
      .from("avatar_reports")
      .select("id", { count: "exact", head: true })
      .eq("owner_id", ownerId)
      .eq("status", "open");

    if ((count ?? 0) >= REPORTS_TO_HIDE) {
      await supabaseAdmin
        .from("profiles")
        .update({ avatar_status: "hidden" })
        .eq("id", ownerId)
        .eq("avatar_status", "approved");
    }
    return { ok: true };
  });

export type ReportedAvatar = {
  ownerId: string;
  name: string | null;
  reports: number;
  status: AvatarStatus;
  photoUrl: string | null;
};

async function assertAdmin(supabase: { rpc: (fn: string, args: Record<string, unknown>) => Promise<{ data: unknown }> }, userId: string) {
  const { data } = await supabase.rpc("has_role", { _user_id: userId, _role: "admin" });
  if (data !== true) throw new Error("Forbidden");
}

export const listReportedAvatars = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<ReportedAvatar[]> => {
    await assertAdmin(context.supabase as never, context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: reports } = await supabaseAdmin
      .from("avatar_reports")
      .select("owner_id")
      .eq("status", "open");
    const counts = new Map<string, number>();
    for (const r of (reports ?? []) as { owner_id: string }[]) {
      counts.set(r.owner_id, (counts.get(r.owner_id) ?? 0) + 1);
    }
    if (!counts.size) return [];
    const { data: profiles } = await supabaseAdmin
      .from("profiles")
      .select("id, display_name, avatar_status, avatar_photo_path")
      .in("id", [...counts.keys()]);

    return Promise.all(
      ((profiles ?? []) as { id: string; display_name: string | null; avatar_status: string; avatar_photo_path: string | null }[]).map(
        async (p) => ({
          ownerId: p.id,
          name: p.display_name,
          reports: counts.get(p.id) ?? 0,
          status: p.avatar_status as AvatarStatus,
          photoUrl: p.avatar_photo_path ? await signPath(p.avatar_photo_path) : null,
        }),
      ),
    );
  });

export const resolveAvatarReport = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { ownerId: string; action: "approve" | "remove" }) => ({
    ownerId: String(input?.ownerId ?? "").slice(0, 40),
    action: input?.action === "remove" ? ("remove" as const) : ("approve" as const),
  }))
  .handler(async ({ data, context }): Promise<{ ok: boolean }> => {
    await assertAdmin(context.supabase as never, context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    if (data.action === "approve") {
      await supabaseAdmin.from("profiles").update({ avatar_status: "approved" }).eq("id", data.ownerId);
      await supabaseAdmin.from("avatar_reports").update({ status: "dismissed" }).eq("owner_id", data.ownerId).eq("status", "open");
      return { ok: true };
    }

    const { data: profile } = await supabaseAdmin
      .from("profiles")
      .select("avatar_photo_path")
      .eq("id", data.ownerId)
      .maybeSingle();
    const path = (profile as { avatar_photo_path?: string | null } | null)?.avatar_photo_path ?? null;
    if (path) await supabaseAdmin.storage.from(BUCKET).remove([path]);
    await supabaseAdmin
      .from("profiles")
      .update({ avatar_photo_path: null, avatar_status: "rejected", avatar_reject_reason: "admin" })
      .eq("id", data.ownerId);
    await supabaseAdmin.from("avatar_reports").update({ status: "removed" }).eq("owner_id", data.ownerId).eq("status", "open");
    return { ok: true };
  });
