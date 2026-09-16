import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { AVATAR_IDS } from "@/lib/avatars";
import { checkName } from "@/lib/profile-name";

export type MyProfile = { displayName: string | null; avatarId: string | null; email: string | null };

export const getMyProfile = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<MyProfile> => {
    const { data } = await context.supabase
      .from("profiles")
      .select("display_name, avatar_id, email")
      .eq("id", context.userId)
      .maybeSingle();
    return {
      displayName: (data as { display_name?: string | null } | null)?.display_name ?? null,
      avatarId: (data as { avatar_id?: string | null } | null)?.avatar_id ?? null,
      email: (data as { email?: string | null } | null)?.email ?? null,
    };
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
    const patch: Record<string, string> = {};

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
