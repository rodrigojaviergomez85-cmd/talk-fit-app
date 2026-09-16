import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Camera, Loader2, Smile } from "lucide-react";
import { toSquareJpegDataUrl } from "@/lib/avatar-image";
import { useAuth } from "@/lib/auth";

const TEXT = {
  es: {
    title: "Ponle cara a tu perfil",
    body: "Sube tu foto o elige un avatar para la liga semanal. Es opcional: tu nombre ya aparece.",
    upload: "SUBIR MI FOTO",
    avatar: "ELEGIR UN AVATAR",
    skip: "Ahora no",
  },
  en: {
    title: "Add a face to your profile",
    body: "Upload a photo or pick an avatar for the weekly league. It is optional: your name already shows.",
    upload: "UPLOAD MY PHOTO",
    avatar: "PICK AN AVATAR",
    skip: "Not now",
  },
} as const;

/** One-time optional invitation shown on Home after the first sign-in. */
export function AvatarPrompt({ lang }: { lang: "es" | "en" }) {
  const t = TEXT[lang];
  const { user } = useAuth();
  const loadProfile = useServerFn(getMyProfile);
  const markSeen = useServerFn(markAvatarPromptSeen);
  const upload = useServerFn(uploadMyPhoto);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!user) return;
    let alive = true;
    void loadProfile({})
      .then((p) => {
        if (!alive) return;
        if (!p.promptSeen && !p.avatarId && !p.photoUrl) setOpen(true);
      })
      .catch(() => undefined);
    return () => {
      alive = false;
    };
  }, [loadProfile, user]);

  const dismiss = () => {
    setOpen(false);
    void markSeen({}).catch(() => undefined);
  };

  const pick = async (file: File | undefined) => {
    if (!file) return;
    setBusy(true);
    try {
      const dataUrl = await toSquareJpegDataUrl(file);
      await upload({ data: { dataUrl } });
    } catch {
      /* the profile page shows the detailed state */
    } finally {
      setBusy(false);
      dismiss();
    }
  };

  if (!open) return null;

  return (
    <section className="space-y-3 rounded-3xl bg-card p-5 shadow-[var(--shadow-card)]">
      <div className="flex items-center gap-2">
        <Smile className="size-5 text-primary" />
        <p className="text-[14px] font-extrabold">{t.title}</p>
      </div>
      <p className="text-[13px] text-muted-foreground">{t.body}</p>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={(e) => void pick(e.target.files?.[0])}
      />

      <div className="flex flex-col gap-2">
        <button
          type="button"
          disabled={busy}
          onClick={() => inputRef.current?.click()}
          className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-2xl bg-primary px-4 text-[12px] font-bold uppercase tracking-[0.12em] text-primary-foreground disabled:opacity-40"
        >
          {busy ? <Loader2 className="size-4 animate-spin" /> : <Camera className="size-4" />}
          {t.upload}
        </button>
        <Link
          to="/profile"
          onClick={dismiss}
          className="inline-flex min-h-[46px] items-center justify-center rounded-2xl border border-border px-4 text-[12px] font-bold uppercase tracking-[0.12em]"
        >
          {t.avatar}
        </Link>
        <button type="button" onClick={dismiss} className="text-[12px] font-semibold text-muted-foreground">
          {t.skip}
        </button>
      </div>
    </section>
  );
}
