import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Check, Loader2, Pencil } from "lucide-react";
import { AVATARS } from "@/lib/avatars";
import { NAME_MAX, checkName } from "@/lib/profile-name";
import { getMyProfile, updateMyProfile, type MyProfile } from "@/lib/profile.functions";
import { LearnerAvatar } from "@/components/fluency/LearnerAvatar";
import { cn } from "@/lib/utils";

const TEXT = {
  es: {
    title: "MI PERFIL",
    name: "Nombre visible",
    save: "GUARDAR",
    saved: "Listo, se guardó tu perfil.",
    change: "Cambiar avatar",
    pick: "Elige tu avatar",
    close: "Cerrar",
    note: "Así te verán en la liga semanal.",
    short: "Escribe al menos 2 letras.",
    long: `Máximo ${NAME_MAX} caracteres.`,
    blocked: "Ese nombre no se permite. Usa tu nombre real.",
    server: "No se pudo guardar. Intenta de nuevo.",
    avatar: "Ese avatar no es válido.",
  },
  en: {
    title: "MY PROFILE",
    name: "Display name",
    save: "SAVE",
    saved: "Your profile was saved.",
    change: "Change avatar",
    pick: "Pick your avatar",
    close: "Close",
    note: "This is how you appear in the weekly league.",
    short: "Use at least 2 letters.",
    long: `Max ${NAME_MAX} characters.`,
    blocked: "That name is not allowed. Use your real name.",
    server: "Could not save. Please try again.",
    avatar: "That avatar is not valid.",
  },
} as const;

export function ProfileCard({ lang }: { lang: "es" | "en" }) {
  const t = TEXT[lang];
  const load = useServerFn(getMyProfile);
  const save = useServerFn(updateMyProfile);

  const [profile, setProfile] = useState<MyProfile | null>(null);
  const [name, setName] = useState("");
  const [picking, setPicking] = useState(false);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ kind: "ok" | "err"; text: string } | null>(null);

  useEffect(() => {
    let alive = true;
    void load({})
      .then((p) => {
        if (!alive) return;
        setProfile(p);
        setName(p.displayName ?? "");
      })
      .catch(() => undefined);
    return () => {
      alive = false;
    };
  }, [load]);

  const apply = async (patch: { displayName?: string; avatarId?: string }) => {
    setBusy(true);
    setMsg(null);
    try {
      const res = await save({ data: patch });
      if (res.ok && res.profile) {
        setProfile(res.profile);
        setName(res.profile.displayName ?? "");
        setMsg({ kind: "ok", text: t.saved });
      } else {
        setMsg({ kind: "err", text: t[(res.error ?? "server") as keyof typeof t] as string });
      }
    } catch {
      setMsg({ kind: "err", text: t.server });
    } finally {
      setBusy(false);
    }
  };

  const onSaveName = () => {
    const check = checkName(name);
    if (!check.ok) {
      setMsg({ kind: "err", text: t[check.reason] });
      return;
    }
    void apply({ displayName: check.value });
  };

  const dirty = (profile?.displayName ?? "") !== name.trim();

  return (
    <section className="space-y-3 rounded-3xl bg-card p-5 shadow-[var(--shadow-card)]">
      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">{t.title}</p>

      <div className="flex items-center gap-3">
        <LearnerAvatar
          avatarId={profile?.avatarId}
          name={profile?.displayName ?? profile?.email ?? "?"}
          className="size-16 text-[16px]"
        />
        <button
          type="button"
          onClick={() => setPicking((v) => !v)}
          className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-2xl border border-border px-4 text-[12px] font-bold uppercase tracking-[0.12em]"
        >
          <Pencil className="size-4" /> {picking ? t.close : t.change}
        </button>
      </div>

      {picking ? (
        <div className="space-y-2">
          <p className="text-[12px] text-muted-foreground">{t.pick}</p>
          <div className="grid grid-cols-5 gap-2">
            {AVATARS.map((a) => (
              <button
                key={a.id}
                type="button"
                disabled={busy}
                aria-label={a.id}
                aria-pressed={profile?.avatarId === a.id}
                onClick={() => void apply({ avatarId: a.id }).then(() => setPicking(false))}
                className={cn(
                  "relative overflow-hidden rounded-full border-2 transition-colors",
                  profile?.avatarId === a.id ? "border-primary" : "border-transparent",
                )}
              >
                <img src={a.src} alt="" loading="lazy" width={256} height={256} className="size-full object-cover" />
                {profile?.avatarId === a.id ? (
                  <span className="absolute inset-0 flex items-center justify-center bg-primary/25">
                    <Check className="size-4 text-primary-foreground" />
                  </span>
                ) : null}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <div className="space-y-2">
        <label htmlFor="display-name" className="text-[12px] font-bold text-muted-foreground">
          {t.name}
        </label>
        <div className="flex gap-2">
          <input
            id="display-name"
            value={name}
            maxLength={NAME_MAX}
            onChange={(e) => setName(e.target.value)}
            className="min-h-[48px] w-full min-w-0 flex-1 rounded-2xl border border-border bg-background px-4 text-[15px] font-semibold"
          />
          <button
            type="button"
            disabled={busy || !dirty}
            onClick={onSaveName}
            className="inline-flex min-h-[48px] shrink-0 items-center justify-center rounded-2xl bg-primary px-3 text-[12px] font-bold uppercase tracking-[0.12em] text-primary-foreground disabled:opacity-40"
          >
            {busy ? <Loader2 className="size-4 animate-spin" /> : t.save}
          </button>
        </div>
        <p className="text-[12px] text-muted-foreground">{t.note}</p>
        {msg ? (
          <p className={cn("text-[12px] font-semibold", msg.kind === "ok" ? "text-primary" : "text-destructive")}>
            {msg.text}
          </p>
        ) : null}
      </div>
    </section>
  );
}
