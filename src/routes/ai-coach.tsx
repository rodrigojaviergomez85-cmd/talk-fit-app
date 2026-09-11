import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Loader2, MessageCircle, Send } from "lucide-react";
import { AppShell } from "@/components/fluency/AppShell";
import { useAppLang } from "@/lib/i18n";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/ai-coach")({
  head: () => ({
    meta: [
      { title: "AI Coach — Fluency App" },
      {
        name: "description",
        content: "Ask short English questions about grammar, vocabulary and how to say something.",
      },
      { property: "og:title", content: "AI Coach — Fluency App" },
      {
        property: "og:description",
        content: "Short answers to your English grammar and vocabulary questions.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AiCoachPage,
});

type Turn = { role: "user" | "coach"; text: string };

type Quota = {
  unlimited: boolean;
  dailyUsed: number;
  monthlyUsed: number;
  dailyLimit: number;
  monthlyLimit: number;
  dayResetAt: string;
  monthResetAt: string;
  blocked: "none" | "daily" | "monthly";
};

async function authHeaders(): Promise<Record<string, string> | null> {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  if (!token) return null;
  return { "content-type": "application/json", Authorization: `Bearer ${token}` };
}

function AiCoachPage() {
  const { t, lang } = useAppLang();
  const [turns, setTurns] = useState<Turn[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [quota, setQuota] = useState<Quota | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  /** Reads the counters without calling the model or consuming a question. */
  async function refreshQuota() {
    try {
      const headers = await authHeaders();
      if (!headers) return;
      const res = await fetch("/api/ai-coach", { method: "GET", headers });
      const body = (await res.json().catch(() => null)) as { quota?: Quota } | null;
      if (body?.quota) {
        setQuota(body.quota);
        if (body.quota.blocked === "none") setError(null);
      }
    } catch {
      /* counters stay hidden; asking still works */
    }
  }

  useEffect(() => {
    inputRef.current?.focus();
    void refreshQuota();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [turns, busy]);

  const limitReached = quota ? quota.blocked !== "none" : false;

  async function ask(question: string) {
    const text = question.trim();
    if (!text || busy || limitReached) return;

    setError(null);
    setInput("");
    setTurns((prev) => [...prev, { role: "user", text }]);
    setBusy(true);

    try {
      const headers = await authHeaders();
      if (!headers) {
        setError(t("aiCoach.authError"));
        return;
      }

      const res = await fetch("/api/ai-coach", {
        method: "POST",
        headers,
        body: JSON.stringify({ question: text }),
      });
      const body = (await res.json().catch(() => null)) as {
        answer?: string;
        quota?: Quota;
        error?: string;
      } | null;

      if (body?.quota) setQuota(body.quota);

      if (body?.error === "daily_limit" || body?.error === "monthly_limit") return;
      if (res.status === 401) {
        setError(t("aiCoach.authError"));
        return;
      }
      // Provider overload / 429 — not the learner's personal quota.
      if (body?.error === "provider_busy") {
        setError(t("aiCoach.busy"));
        return;
      }
      if (!res.ok || !body?.answer) {
        setError(t("aiCoach.error"));
        return;
      }

      setTurns((prev) => [...prev, { role: "coach", text: body.answer as string }]);
    } catch {
      setError(t("aiCoach.error"));
    } finally {
      setBusy(false);
      inputRef.current?.focus();
    }
  }

  const counter = !quota
    ? null
    : quota.unlimited
      ? t("aiCoach.unlimited")
      : t("aiCoach.counter")
          .replace("{dayUsed}", String(quota.dailyUsed))
          .replace("{dayLimit}", String(quota.dailyLimit))
          .replace("{monthUsed}", String(quota.monthlyUsed))
          .replace("{monthLimit}", String(quota.monthlyLimit));

  const monthly = quota?.blocked === "monthly";
  const limitTitle = !quota
    ? ""
    : monthly
      ? t("aiCoach.limitTitleMonthly").replace("{monthLimit}", String(quota.monthlyLimit))
      : t("aiCoach.limitTitleDaily").replace("{dayLimit}", String(quota.dailyLimit));
  const resetText = !quota
    ? ""
    : t("aiCoach.limitReset").replace(
        "{reset}",
        formatLocalReset(monthly ? quota.monthResetAt : quota.dayResetAt, lang),
      );

  return (
    <AppShell title={t("aiCoach.title")} subtitle={t("aiCoach.subtitle")} hideSync>
      <div className="space-y-4">
        {counter ? (
          <p className="text-center text-[12px] font-semibold text-muted-foreground">{counter}</p>
        ) : null}

        {turns.length === 0 && !limitReached ? (
          <div className="rounded-2xl border border-border bg-card p-4">
            <p className="flex items-center gap-2 text-[13px] font-bold text-foreground">
              <MessageCircle className="size-4 text-primary" aria-hidden />
              {t("aiCoach.suggestionsTitle")}
            </p>
            <div className="mt-3 space-y-2">
              {[t("aiCoach.suggestion1"), t("aiCoach.suggestion2"), t("aiCoach.suggestion3")].map(
                (s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => void ask(s)}
                    className="min-h-[44px] w-full rounded-xl border border-border px-3 py-2 text-left text-[13px] font-semibold text-foreground transition-colors hover:bg-secondary"
                  >
                    {s}
                  </button>
                ),
              )}
            </div>
          </div>
        ) : null}

        <div className="space-y-3">
          {turns.map((turn, i) => (
            <div
              key={`${turn.role}-${i}`}
              className={turn.role === "user" ? "flex justify-end" : "flex justify-start"}
            >
              <div
                className={
                  turn.role === "user"
                    ? "max-w-[85%] rounded-2xl bg-primary px-4 py-2.5 text-[14px] font-semibold text-primary-foreground"
                    : "max-w-[92%] whitespace-pre-wrap text-[14px] leading-relaxed text-foreground"
                }
              >
                {turn.text}
              </div>
            </div>
          ))}
          {busy ? (
            <p className="flex items-center gap-2 text-[13px] font-semibold text-muted-foreground">
              <Loader2 className="size-4 animate-spin" aria-hidden />
              {t("aiCoach.thinking")}
            </p>
          ) : null}
          <div ref={endRef} />
        </div>

        {limitReached ? (
          <div className="rounded-2xl border border-border bg-secondary p-4">
            <p className="text-[14px] font-bold text-foreground">{limitTitle}</p>
            <p className="mt-1 text-[13px] text-muted-foreground">{resetText}</p>
            <p className="mt-1 text-[13px] text-muted-foreground">{t("aiCoach.limitBody")}</p>
            <button
              type="button"
              onClick={() => void refreshQuota()}
              className="mt-3 min-h-[44px] w-full rounded-xl border border-border bg-card px-3 text-[13px] font-bold text-foreground"
            >
              {t("aiCoach.refresh")}
            </button>
          </div>
        ) : (
          <form
            onSubmit={(event) => {
              event.preventDefault();
              void ask(input);
            }}
            className="space-y-2"
          >
            <textarea
              ref={inputRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  void ask(input);
                }
              }}
              rows={3}
              maxLength={600}
              placeholder={t("aiCoach.placeholder")}
              className="w-full resize-none rounded-2xl border border-border bg-card p-3 text-[14px] text-foreground outline-none focus:border-primary"
            />
            <button
              type="submit"
              disabled={busy || !input.trim()}
              className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-2xl bg-primary px-4 text-[13px] font-extrabold uppercase tracking-[0.14em] text-primary-foreground disabled:opacity-50"
            >
              <Send className="size-4" aria-hidden />
              {t("aiCoach.send")}
            </button>
          </form>
        )}

        {error ? (
          <p className="text-center text-[13px] font-semibold text-destructive">{error}</p>
        ) : null}

        <p className="pb-2 text-center text-[12px] text-muted-foreground">{t("aiCoach.disclaimer")}</p>
      </div>
    </AppShell>
  );
}

/** Shows a UTC reset timestamp in the learner's local time. */
function formatLocalReset(iso: string, lang: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat(lang === "es" ? "es" : "en", {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}
