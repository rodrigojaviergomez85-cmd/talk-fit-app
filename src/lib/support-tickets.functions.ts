import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import {
  MAX_COMMENT_CHARS,
  SUPPORT_TICKET_STATUSES,
  type SupportComment,
  type SupportTicket,
  type SupportTicketStatus,
} from "./support-tickets";

/**
 * Support ticket triage.
 * Reading every ticket, changing status and writing comments is admin-only.
 * Learners can read their own tickets plus the non-internal comments on them.
 */

async function assertAdmin(context: { supabase: SupabaseClient<Database>; userId: string }): Promise<void> {
  const { data, error } = await context.supabase.rpc("has_role", { _user_id: context.userId, _role: "admin" });
  if (error || data !== true) throw new Error("Forbidden");
}

type CommentRow = {
  id: string;
  ticket_id: string;
  created_at: string;
  body: string;
  is_internal: boolean;
  author_email: string | null;
};

function groupComments(rows: CommentRow[]): Map<string, SupportComment[]> {
  const map = new Map<string, SupportComment[]>();
  for (const row of rows) {
    const list = map.get(row.ticket_id) ?? [];
    list.push({
      id: row.id,
      createdAt: row.created_at,
      body: row.body,
      isInternal: row.is_internal,
      authorEmail: row.author_email,
    });
    map.set(row.ticket_id, list);
  }
  return map;
}

export const listSupportTickets = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(
    (input: unknown) =>
      z
        .object({ estado: z.enum(SUPPORT_TICKET_STATUSES).optional() })
        .optional()
        .parse(input) ?? {},
  )
  .handler(async ({ data, context }): Promise<SupportTicket[]> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    let query = supabaseAdmin
      .from("support_tickets")
      .select("id, created_at, updated_at, nombre, email, categoria, mensaje, estado, app_version, user_agent, user_id")
      .order("created_at", { ascending: false })
      .limit(200);
    if (data?.estado) query = query.eq("estado", data.estado);

    const { data: rows, error } = await query;
    if (error) throw new Error("Could not read tickets");

    const ids = (rows ?? []).map((r) => r.id);
    let byTicket = new Map<string, SupportComment[]>();
    if (ids.length > 0) {
      const { data: comments } = await supabaseAdmin
        .from("support_ticket_comments")
        .select("id, ticket_id, created_at, body, is_internal, author_email")
        .in("ticket_id", ids)
        .order("created_at", { ascending: true });
      byTicket = groupComments((comments ?? []) as CommentRow[]);
    }

    return (rows ?? []).map((row) => ({
      id: row.id,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      nombre: row.nombre,
      email: row.email,
      categoria: row.categoria,
      mensaje: row.mensaje,
      estado: row.estado as SupportTicketStatus,
      appVersion: row.app_version,
      userAgent: row.user_agent,
      userId: row.user_id,
      comments: byTicket.get(row.id) ?? [],
    }));
  });

export const setSupportTicketStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z.object({ id: z.string().uuid(), estado: z.enum(SUPPORT_TICKET_STATUSES) }).parse(input),
  )
  .handler(async ({ data, context }): Promise<{ ok: true }> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("support_tickets")
      .update({ estado: data.estado })
      .eq("id", data.id);
    if (error) throw new Error("Could not update ticket");
    return { ok: true };
  });

export const addSupportTicketComment = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z
      .object({
        id: z.string().uuid(),
        body: z.string().trim().min(1).max(MAX_COMMENT_CHARS),
        isInternal: z.boolean().optional(),
      })
      .parse(input),
  )
  .handler(async ({ data, context }): Promise<SupportComment> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const email = (context.claims as { email?: string } | null)?.email ?? null;
    const { data: row, error } = await supabaseAdmin
      .from("support_ticket_comments")
      .insert({
        ticket_id: data.id,
        author_id: context.userId,
        author_email: email,
        body: data.body,
        is_internal: data.isInternal ?? false,
      })
      .select("id, created_at, body, is_internal, author_email")
      .single();
    if (error || !row) throw new Error("Could not add comment");

    // A comment means somebody is working on it.
    await supabaseAdmin
      .from("support_tickets")
      .update({ estado: "en_proceso" })
      .eq("id", data.id)
      .eq("estado", "nuevo");

    return {
      id: row.id,
      createdAt: row.created_at,
      body: row.body,
      isInternal: row.is_internal,
      authorEmail: row.author_email,
    };
  });

/** Learner-facing: my own tickets with their public replies. */
export const listMySupportTickets = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<SupportTicket[]> => {
    const { data: rows, error } = await context.supabase
      .from("support_tickets")
      .select("id, created_at, updated_at, nombre, email, categoria, mensaje, estado, app_version, user_agent, user_id")
      .eq("user_id", context.userId)
      .order("created_at", { ascending: false })
      .limit(100);
    if (error) throw new Error("Could not read tickets");

    const ids = (rows ?? []).map((r) => r.id);
    let byTicket = new Map<string, SupportComment[]>();
    if (ids.length > 0) {
      const { data: comments } = await context.supabase
        .from("support_ticket_comments")
        .select("id, ticket_id, created_at, body, is_internal, author_email")
        .in("ticket_id", ids)
        .order("created_at", { ascending: true });
      byTicket = groupComments((comments ?? []) as CommentRow[]);
    }

    return (rows ?? []).map((row) => ({
      id: row.id,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      nombre: row.nombre,
      email: row.email,
      categoria: row.categoria,
      mensaje: row.mensaje,
      estado: row.estado as SupportTicketStatus,
      appVersion: row.app_version,
      userAgent: row.user_agent,
      userId: row.user_id,
      comments: byTicket.get(row.id) ?? [],
    }));
  });
