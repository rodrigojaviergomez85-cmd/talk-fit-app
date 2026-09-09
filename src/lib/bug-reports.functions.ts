import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import {
  ALLOWED_SCREENSHOT_TYPES,
  BUG_REPORT_AREAS,
  BUG_REPORT_STATUSES,
  MAX_MESSAGE_CHARS,
  MAX_SCREENSHOT_BYTES,
  extensionForType,
  type AdminBugReport,
  type BugReportContext,
  type BugReportStatus,
} from "./bug-reports";

/**
 * Learner bug reports.
 * Submitting is open to everyone (signed in or not) so a broken auth state
 * never blocks a report. Reading and triaging is admin-only.
 */

const submitSchema = z.object({
  message: z.string().trim().min(1).max(MAX_MESSAGE_CHARS),
  area: z.enum(BUG_REPORT_AREAS),
  expected: z.string().trim().max(MAX_MESSAGE_CHARS).optional().nullable(),
  email: z.string().trim().email().max(200).optional().nullable(),
  context: z
    .object({
      route: z.string().max(300).optional(),
      moduleId: z.string().max(80).optional(),
      day: z.number().int().min(0).max(400).optional(),
      lang: z.string().max(8).optional(),
      userAgent: z.string().max(400).optional(),
      viewport: z.string().max(40).optional(),
      standalone: z.boolean().optional(),
    })
    .optional(),
  screenshot: z
    .object({
      type: z.enum(ALLOWED_SCREENSHOT_TYPES),
      // Raw base64 (no data: prefix).
      base64: z.string().max(Math.ceil((MAX_SCREENSHOT_BYTES * 4) / 3) + 1024),
    })
    .optional()
    .nullable(),
});

function decodeBase64(b64: string): Uint8Array {
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

export const submitBugReport = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => submitSchema.parse(input))
  .handler(async ({ data }): Promise<{ ok: true }> => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    // Cheap spam guard: at most 5 reports per 10 minutes per client.
    const ip =
      getRequestHeader("cf-connecting-ip") ??
      getRequestHeader("x-forwarded-for")?.split(",")[0]?.trim() ??
      "unknown";
    const since = new Date(Date.now() - 10 * 60 * 1000).toISOString();
    const { count } = await supabaseAdmin
      .from("bug_reports")
      .select("id", { count: "exact", head: true })
      .gte("created_at", since)
      .contains("context", { ip });
    if ((count ?? 0) >= 5) return { ok: true };

    let screenshotPath: string | null = null;
    if (data.screenshot) {
      const bytes = decodeBase64(data.screenshot.base64);
      if (bytes.byteLength > MAX_SCREENSHOT_BYTES) throw new Error("Screenshot too large");
      const path = `${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID()}.${extensionForType(
        data.screenshot.type,
      )}`;
      const { error } = await supabaseAdmin.storage
        .from("bug-screenshots")
        .upload(path, bytes, { contentType: data.screenshot.type, upsert: false });
      // A failed upload must never lose the written report.
      if (!error) screenshotPath = path;
    }

    const { error } = await supabaseAdmin.from("bug_reports").insert({
      message: data.message,
      area: data.area,
      expected: data.expected ?? null,
      email: data.email ?? null,
      context: { ...(data.context ?? {}), ip } as never,
      screenshot_path: screenshotPath,
    });
    if (error) throw new Error("Could not save report");

    return { ok: true };
  });

async function assertAdmin(context: { supabase: SupabaseClient<Database>; userId: string }): Promise<void> {
  const { data, error } = await context.supabase.rpc("has_role", { _user_id: context.userId, _role: "admin" });
  if (error || data !== true) throw new Error("Forbidden");
}

export const listBugReports = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z
      .object({ status: z.enum(BUG_REPORT_STATUSES).optional() })
      .optional()
      .parse(input) ?? {},
  )
  .handler(async ({ data, context }): Promise<AdminBugReport[]> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    let query = supabaseAdmin
      .from("bug_reports")
      .select("id, created_at, status, message, area, expected, email, user_id, context, screenshot_path")
      .order("created_at", { ascending: false })
      .limit(200);
    if (data?.status) query = query.eq("status", data.status);

    const { data: rows, error } = await query;
    if (error) throw new Error("Could not read reports");

    const out: AdminBugReport[] = [];
    for (const row of rows ?? []) {
      let screenshotUrl: string | null = null;
      if (row.screenshot_path) {
        const { data: signed } = await supabaseAdmin.storage
          .from("bug-screenshots")
          .createSignedUrl(row.screenshot_path, 60 * 30);
        screenshotUrl = signed?.signedUrl ?? null;
      }
      out.push({
        id: row.id,
        createdAt: row.created_at,
        status: row.status as BugReportStatus,
        message: row.message,
        area: row.area,
        expected: row.expected,
        email: row.email,
        userId: row.user_id,
        context: (row.context ?? {}) as BugReportContext,
        screenshotUrl,
      });
    }
    return out;
  });

export const setBugReportStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z.object({ id: z.string().uuid(), status: z.enum(BUG_REPORT_STATUSES) }).parse(input),
  )
  .handler(async ({ data, context }): Promise<{ ok: true }> => {
    await assertAdmin(context);
    const { error } = await context.supabase
      .from("bug_reports")
      .update({ status: data.status })
      .eq("id", data.id);
    if (error) throw new Error("Could not update report");
    return { ok: true };
  });
