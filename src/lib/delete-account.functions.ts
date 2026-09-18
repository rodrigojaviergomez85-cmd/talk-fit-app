import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

/**
 * In-app account deletion (Apple guideline 5.1.1(v)).
 *
 * NO ROW IS EVER DELETED. The account is anonymised in place so every report
 * (completed days, streaks, spoken seconds) keeps exactly the same numbers.
 * The user id always comes from the verified session, never from the request.
 *
 * Order matters: storage is not transactional, so audio files and the profile
 * photo are removed first. Only then does the single SQL transaction run.
 */

export type DeleteAccountResult = { ok: boolean; identificador?: string; error?: string };

async function sha256Hex(value: string): Promise<string> {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** Every object under a user's folder, walking nested prefixes. */
async function listAll(
  storage: { list: (p: string, o: { limit: number; offset: number }) => Promise<{ data: { name: string; id: string | null }[] | null }> },
  prefix: string,
): Promise<string[]> {
  const found: string[] = [];
  const queue = [prefix];
  while (queue.length) {
    const dir = queue.shift()!;
    for (let offset = 0; ; offset += 100) {
      const { data } = await storage.list(dir, { limit: 100, offset });
      if (!data || data.length === 0) break;
      for (const entry of data) {
        const path = `${dir}/${entry.name}`;
        if (entry.id === null) queue.push(path);
        else found.push(path);
      }
      if (data.length < 100) break;
    }
  }
  return found;
}

export const deleteMyAccount = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<DeleteAccountResult> => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const userId = context.userId;

    try {
      const { data: userData } = await supabaseAdmin.auth.admin.getUserById(userId);
      const email = userData?.user?.email ?? "";
      if (email.endsWith("@deleted.invalid")) return { ok: true, identificador: email.split("@")[0] ?? "" };

      // 1. Voice is biometric data: every audio file goes.
      const { data: rows } = await supabaseAdmin
        .from("recordings")
        .select("storage_path")
        .eq("user_id", userId);
      const fromRows = (rows ?? []).map((r) => r.storage_path).filter(Boolean) as string[];
      const fromBucket = await listAll(supabaseAdmin.storage.from("recordings"), userId);
      const audioPaths = Array.from(new Set([...fromRows, ...fromBucket]));
      for (let i = 0; i < audioPaths.length; i += 100) {
        const { error } = await supabaseAdmin.storage.from("recordings").remove(audioPaths.slice(i, i + 100));
        if (error) throw error;
      }

      const photoPaths = await listAll(supabaseAdmin.storage.from("avatars"), userId);
      if (photoPaths.length) await supabaseAdmin.storage.from("avatars").remove(photoPaths);

      // 2. One transaction: identity, profile, free text, deletion log.
      const { data: label, error } = await supabaseAdmin.rpc("anonymize_account", {
        _user_id: userId,
        _email_sha256: await sha256Hex(email.toLowerCase()),
      });
      if (error) throw error;

      // 3. Belt and braces: drop any session the transaction could not see.
      await supabaseAdmin.auth.admin.signOut(userId, "global").catch(() => undefined);

      return { ok: true, identificador: String(label ?? "") };
    } catch (err) {
      console.error("[delete-account]", err);
      return { ok: false, error: "server" };
    }
  });
