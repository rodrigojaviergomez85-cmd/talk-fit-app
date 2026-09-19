import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { getGrammarQuiz, GRAMMAR_PASS_SCORE, type GrammarItem } from "@/services/grammar-quiz";

/**
 * PASO 3 · GRAMÁTICA — calificación del lado del servidor.
 *
 * El navegador manda solo las respuestas; el servidor las compara contra el
 * mismo banco de ítems, guarda el intento y, si aprobó, pide los 150 puntos
 * de la liga (la base de datos vuelve a verificar que el intento exista).
 */

export type GrammarAnswer = { id: string; value: number | string[] };

export type GrammarSubmitResult = {
  correct: number;
  total: number;
  passed: boolean;
  /** Ids de los ítems fallados, para repetir solo esos. */
  wrong: string[];
  /** true cuando la liga confirmó los 150 puntos en esta llamada. */
  awarded: boolean;
  /**
   * true solo después del primer intento fallido del día: un solo reintento
   * por día. Se calcula con los intentos ya guardados (grammar_quiz_attempts),
   * el mismo lugar donde queda el resultado del día.
   */
  canRetry: boolean;
};

export function isItemCorrect(item: GrammarItem, value: number | string[] | undefined): boolean {
  if (item.kind === "rearrange") {
    if (!Array.isArray(value) || value.length !== item.answer.length) return false;
    return item.answer.every((piece, i) => piece === value[i]);
  }
  if (item.kind === "speak") {
    // Segundos grabados (el cliente los manda; el mínimo es la única condición).
    return typeof value === "number" && Number.isFinite(value) && value >= item.minSeconds;
  }
  return typeof value === "number" && value === item.answer;
}

export const submitGrammarQuiz = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { moduleId: string; day: number; answers: GrammarAnswer[] }) => ({
    moduleId: String(input.moduleId ?? "").slice(0, 60),
    day: Math.max(1, Math.min(200, Number(input.day ?? 1))),
    answers: (Array.isArray(input.answers) ? input.answers : []).slice(0, 100).map((a) => ({
      id: String(a?.id ?? "").slice(0, 60),
      value: Array.isArray(a?.value)
        ? a.value.slice(0, 12).map((p) => String(p).slice(0, 80))
        : Number(a?.value),
    })),
  }))
  .handler(async ({ data, context }): Promise<GrammarSubmitResult> => {
    const quiz = getGrammarQuiz(data.moduleId, data.day);
    if (!quiz) return { correct: 0, total: 0, passed: false, wrong: [], awarded: false, canRetry: false };

    const byId = new Map(data.answers.map((a) => [a.id, a.value] as const));
    const wrong: string[] = [];
    let correct = 0;
    for (const item of quiz.items) {
      if (isItemCorrect(item, byId.get(item.id))) correct += 1;
      else wrong.push(item.id);
    }
    const total = quiz.items.length;
    const passed = correct >= (quiz.passScore ?? GRAMMAR_PASS_SCORE);

    await context.supabase.from("grammar_quiz_attempts").insert({
      user_id: context.userId,
      module_id: data.moduleId,
      day: data.day,
      total,
      correct,
      passed,
      answers: data.answers,
    });

    // Un solo reintento por día: contamos los intentos de hoy (UTC) para este
    // módulo y día. El insert de arriba ya está incluido en el conteo.
    const todayStart = new Date();
    todayStart.setUTCHours(0, 0, 0, 0);
    const { count } = await context.supabase
      .from("grammar_quiz_attempts")
      .select("id", { count: "exact", head: true })
      .eq("user_id", context.userId)
      .eq("module_id", data.moduleId)
      .eq("day", data.day)
      .gte("completed_at", todayStart.toISOString());
    const attemptsToday = count ?? 1;
    const canRetry = !passed && attemptsToday < 2;

    let awarded = false;
    if (passed) {
      const { data: res } = await context.supabase.rpc("league_award", {
        _activity_type: "grammar",
        _module_id: data.moduleId,
        _day: data.day,
        _activity_key: `${data.moduleId}:grammar-${data.day}`,
        _min_scene_index: 0,
      });
      awarded = (res as { status?: string } | null)?.status === "awarded";
    }

    return { correct, total, passed, wrong, awarded, canRetry };
  });

/** ¿Ya aprobó este día? Para pintar la tarjeta como completada. */
export const getGrammarStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { moduleId: string; day: number }) => ({
    moduleId: String(input.moduleId ?? "").slice(0, 60),
    day: Math.max(1, Math.min(200, Number(input.day ?? 1))),
  }))
  .handler(async ({ data, context }): Promise<{ passed: boolean; bestScore: number }> => {
    const { data: rows } = await context.supabase
      .from("grammar_quiz_attempts")
      .select("correct, passed")
      .eq("user_id", context.userId)
      .eq("module_id", data.moduleId)
      .eq("day", data.day)
      .order("correct", { ascending: false })
      .limit(1);
    const top = rows?.[0];
    return { passed: Boolean(top?.passed), bestScore: Number(top?.correct ?? 0) };
  });
