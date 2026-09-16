import { useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Camera, Loader2, Trash2 } from "lucide-react";
import { toSquareJpegDataUrl } from "@/lib/avatar-image";
import { removeMyPhoto, uploadMyPhoto } from "@/lib/avatar-photo.functions";
import { LearnerAvatar } from "@/components/fluency/LearnerAvatar";
import type { MyProfile } from "@/lib/profile.functions";

const TEXT = {
  es: {
    title: "MI FOTO",
    upload: "SUBIR MI FOTO",
    replace: "CAMBIAR MI FOTO",
    remove: "Quitar foto",
    note: "Revisamos cada foto automáticamente. Nada de contenido sexual, violento u ofensivo.",
    checking: "Revisando tu foto…",
    approved: "Listo, tu foto ya se ve en la liga.",
    pending: "Tu foto está en revisión. Se verá cuando la aprobemos.",
    rejected: "Esa foto no se permite. Sube otra o elige un avatar.",
    hidden: "Tu foto está oculta mientras la revisamos.",
    limit: "Ya subiste 3 fotos hoy. Intenta mañana.",
    size: "La foto es muy pesada. Intenta con otra.",
    type: "Formato no válido. Usa JPG o PNG.",
    server: "No se pudo subir. Intenta de nuevo.",
  },
  en: {
    title: "MY PHOTO",
    upload: "UPLOAD MY PHOTO",
    replace: "CHANGE MY PHOTO",
    remove: "Remove photo",
    note: "Every photo is reviewed automatically. No sexual, violent or offensive content.",
    checking: "Reviewing your photo…",
    approved: "Done, your photo now shows in the league.",
    pending: "Your photo is under review. It will show once approved.",
    rejected: "That photo is not allowed. Try another one or pick an avatar.",
    hidden: "Your photo is hidden while we review it.",
    limit: "You already uploaded 3 photos today. Try tomorrow.",
    size: "That photo is too heavy. Try another one.",
    type: "Invalid format. Use JPG or PNG.",
    server: "Could not upload. Please try again.",
  },
} as const;

export function ProfilePhotoCard({
  lang,
  profile,
  onChange,
}: {
  lang: "es" | "en";
  profile: MyProfile | null;
  onChange: (patch: Partial<MyProfile>) => void;
}) {
  const t = TEXT[lang];
  const upload = useServerFn(uploadMyPhoto);
  const drop = useServerFn(removeMyPhoto);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<keyof typeof TEXT.es | null>(null);

  const status = profile?.photoStatus ?? "none";

  const pick = async (file: File | undefined) => {
    if (!file) return;
    setBusy(true);
    setMsg("checking");
    try {
      const dataUrl = await toSquareJpegDataUrl(file);
      const res = await upload({ data: { dataUrl } });
      if (res.ok) {
        onChange({ photoStatus: res.status, photoUrl: res.photoUrl ?? null });
        setMsg(res.status === "approved" ? "approved" : "pending");
      } else {
        onChange({ photoStatus: res.status ?? profile?.photoStatus });
        setMsg(res.error === "rejected" ? "rejected" : (res.error ?? "server"));
      }
    } catch {
      setMsg("server");
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const clear = async () => {
    setBusy(true);
    try {
      await drop({});
      onChange({ photoStatus: "none", photoUrl: null });
      setMsg(null);
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="space-y-3 rounded-3xl bg-card p-5 shadow-[var(--shadow-card)]">
      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">{t.title}</p>

      <div className="flex items-center gap-3">
        <LearnerAvatar
          photoUrl={status === "approved" || status === "pending" ? profile?.photoUrl : null}
          avatarId={profile?.avatarId}
          name={profile?.displayName ?? profile?.email ?? "?"}
          className="size-16 text-[16px]"
        />
        <button
          type="button"
          disabled={busy}
          onClick={() => inputRef.current?.click()}
          className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-2xl border border-border px-4 text-[12px] font-bold uppercase tracking-[0.12em] disabled:opacity-40"
        >
          {busy ? <Loader2 className="size-4 animate-spin" /> : <Camera className="size-4" />}
          {profile?.photoUrl ? t.replace : t.upload}
        </button>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={(e) => void pick(e.target.files?.[0])}
      />

      {profile?.photoUrl ? (
        <button
          type="button"
          disabled={busy}
          onClick={() => void clear()}
          className="inline-flex items-center gap-2 text-[12px] font-semibold text-destructive"
        >
          <Trash2 className="size-4" /> {t.remove}
        </button>
      ) : null}

      <p className="text-[12px] text-muted-foreground">{t.note}</p>
      {msg ? (
        <p className="text-[12px] font-semibold text-foreground">{t[msg]}</p>
      ) : status === "hidden" ? (
        <p className="text-[12px] font-semibold text-foreground">{t.hidden}</p>
      ) : null}
    </section>
  );
}
