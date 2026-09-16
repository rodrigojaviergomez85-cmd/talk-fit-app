import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { AVATAR_IDS } from "@/lib/avatars";
import { checkName } from "@/lib/profile-name";

export type MyProfile = {
  displayName: string | null;
  avatarId: string | null;
  email: string | null;
  photoStatus?: "none" | "pending" | "approved" | "rejected" | "hidden";
  photoUrl?: string | null;
  photoRejectReason?: string | null;
  promptSeen?: boolean;
};

export const getMyProfile = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<MyProfile> => {
    const { data } = await context.supabase
      .from("profiles")
      .select(
        "display_name, avatar_id, email, avatar_status, avatar_photo_path, avatar_reject_reason, avatar_prompt_seen_at",
      )
      .eq("id", context.userId)
      .maybeSingle();

    const row = (data ?? null) as {
      display_name?: string | null;
      avatar_id?: string | null;
      email?: string | null;
      avatar_status?: string | null;
      avatar_photo_path?: string | null;
      avatar_reject_reason?: string | null;
      avatar_prompt_seen_at?: string | null;
    } | null;

    let photoUrl: string | null = null;
    if (row?.avatar_photo_path) {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      const { data: signed } = await supabaseAdmin.storage
        .from("avatars")
        .createSignedUrl(row.avatar_photo_path, 60 * 60);
      photoUrl = signed?.signedUrl ?? null;
    }

    return {
      displayName: row?.display_name ?? null,
      avatarId: row?.avatar_id ?? null,
      email: row?.email ?? null,
      photoStatus: (row?.avatar_status as MyProfile["photoStatus"]) ?? "none",
      photoUrl,
      photoRejectReason: row?.avatar_reject_reason ?? null,
      promptSeen: Boolean(row?.avatar_prompt_seen_at),
    };
  });

/** Marks the one-time "add a photo" invitation as already shown. */
export const markAvatarPromptSeen = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<{ ok: boolean }> => {
    await context.supabase
      .from("profiles")
      .update({ avatar_prompt_seen_at: new Date().toISOString() })
      .eq("id", context.userId);
    return { ok: true };
  });

type UpdateInput = { displayName?: string; avatarId?: string };
type UpdateResult = { ok: boolean; error?: "short" | "long" | "blocked" | "avatar" | "server"; profile?: MyProfile };

export const updateMyProfile = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: UpdateInput) => ({
    displayName: typeof input?.displayName === "string" ? input.displayName.slice(0, 80) : undefined,
    avatarId: typeof input?.avatarId === "string" ? input.avatarId.slice(0, 40) : undefined,
  }))
  .handler(async ({ data, context }): Promise<UpdateResult> => {
    const patch: { display_name?: string; avatar_id?: string } = {};

    if (data.displayName !== undefined) {
      const check = checkName(data.displayName);
      if (!check.ok) return { ok: false, error: check.reason };
      patch['display_name'] = check.value;
    }

    if (data.avatarId !== undefined) {
      if (!AVATAR_IDS.includes(data.avatarId)) return { ok: false, error: "avatar" };
      patch['avatar_id'] = data.avatarId;
    }

    if (!Object.keys(patch).length) return { ok: false, error: "server" };

    const { data: row, error } = await context.supabase
      .from("profiles")
      .update(patch)
      .eq("id", context.userId)
      .select("display_name, avatar_id, email")
      .maybeSingle();

    if (error) return { ok: false, error: "server" };

    return {
      ok: true,
      profile: {
        displayName: (row as { display_name?: string | null } | null)?.display_name ?? null,
        avatarId: (row as { avatar_id?: string | null } | null)?.avatar_id ?? null,
        email: (row as { email?: string | null } | null)?.email ?? null,
      },
    };
  });
