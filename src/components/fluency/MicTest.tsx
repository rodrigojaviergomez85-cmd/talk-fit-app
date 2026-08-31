import { useState } from "react";
import { Mic, ShieldQuestion } from "lucide-react";
import { VoiceRecorder } from "./VoiceRecorder";
import { RecordingPlayback } from "./RecordingPlayback";
import { useAppLang } from "@/lib/i18n";
import type { Recording } from "@/lib/types";

const KEY = "fluency-reps:mic-ok:v1";

export function isMicChecked(): boolean {
  if (typeof window === "undefined") return true;
  try {
    return window.localStorage.getItem(KEY) === "1";
  } catch {
    return true;
  }
}

function markChecked() {
  try {
    window.localStorage.setItem(KEY, "1");
  } catch {
    /* storage unavailable */
  }
}

type Props = {
  /** Called when the learner confirms the mic works (or chooses to continue). */
  onPass: () => void;
  /** Optional: dismiss without marking the mic as verified. */
  onSkip?: () => void;
};

/** Short "say your name" check before the first recording of the journey. */
export function MicTest({ onPass, onSkip }: Props) {
  const es = useAppLang().lang === "es";
  const [take, setTake] = useState<Recording | null>(null);
  const [failed, setFailed] = useState(false);

  return (
    <section className="space-y-4 rounded-3xl border border-border bg-card p-5 text-center shadow-[var(--shadow-card)]">
      <Mic className="mx-auto size-8 text-primary" aria-hidden />
      <h2 className="text-[20px] font-extrabold uppercase tracking-tight">
        {es ? "PRUEBA TU MICRÓFONO" : "TEST YOUR MICROPHONE"}
      </h2>
      <p className="text-[14px] font-semibold text-muted-foreground">
        {es ? "Di tu nombre en voz alta (2–5 segundos)." : "Say your name out loud (2–5 seconds)."}
      </p>

      <VoiceRecorder
        label={es ? "GRABAR" : "RECORD"}
        maxSeconds={5}
        size="lg"
        onComplete={(rec) => {
          setTake(rec);
          setFailed(false);
        }}
      />

      {take ? (
        <div className="space-y-3">
          <RecordingPlayback url={take.url} label={es ? "ESCUCHARME" : "PLAY MYSELF"} />
          <div className="grid gap-2">
            <button
              type="button"
              onClick={() => {
                markChecked();
                onPass();
              }}
              className="min-h-12 rounded-2xl bg-primary px-4 text-[14px] font-bold uppercase tracking-[0.12em] text-primary-foreground"
            >
              {es ? "SÍ, ME ESCUCHO" : "I CAN HEAR MYSELF"}
            </button>
            <button
              type="button"
              onClick={() => setFailed(true)}
              className="min-h-11 rounded-2xl border border-border px-4 text-[13px] font-bold uppercase tracking-[0.12em]"
            >
              {es ? "NO ESCUCHO NADA" : "I CAN'T HEAR ANYTHING"}
            </button>
          </div>
        </div>
      ) : null}

      {failed ? (
        <div className="space-y-2 rounded-2xl bg-secondary p-4 text-left">
          <p className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
            <ShieldQuestion className="size-4" aria-hidden />
            {es ? "PRUEBA ESTO" : "TRY THIS"}
          </p>
          <ul className="list-disc space-y-1 pl-5 text-[13px] font-semibold text-muted-foreground">
            <li>{es ? "Permite el micrófono en tu navegador." : "Allow microphone access in your browser."}</li>
            <li>{es ? "Sube el volumen del teléfono." : "Turn up your phone volume."}</li>
            <li>{es ? "Desconecta los audífonos y prueba otra vez." : "Unplug your headphones and try again."}</li>
            <li>{es ? "Cierra otras apps que usen el micrófono." : "Close other apps using the microphone."}</li>
          </ul>
          <button
            type="button"
            onClick={onPass}
            className="min-h-11 w-full rounded-2xl border border-border bg-card px-4 text-[13px] font-bold uppercase tracking-[0.12em]"
          >
            {es ? "CONTINUAR DE TODOS MODOS" : "CONTINUE ANYWAY"}
          </button>
        </div>
      ) : null}

      {onSkip && !take ? (
        <button
          type="button"
          onClick={onSkip}
          className="text-[12px] font-bold uppercase tracking-[0.14em] text-muted-foreground underline underline-offset-4"
        >
          {es ? "OMITIR PRUEBA" : "SKIP TEST"}
        </button>
      ) : null}
    </section>
  );
}
