import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Share,
  PlusSquare,
  MoreVertical,
  Copy,
  Check,
  Smartphone,
  Chrome,
  Download,
  Compass,
  Search,
} from "lucide-react";
import { useAppLang } from "@/lib/i18n";
import { Button } from "@/components/ui/button";

const INSTALL_URL = "https://talk-fit-app.lovable.app/install";

type Env =
  | "installed"
  | "android-prompt" // beforeinstallprompt captured
  | "android-inapp"
  | "android-browser"
  | "ios-inapp"
  | "ios-chrome"
  | "ios-safari"
  | "ios-other"
  | "desktop";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

function detectEnv(hasInstallPrompt: boolean): Env {
  if (typeof window === "undefined") return "desktop";
  const ua = navigator.userAgent;

  // Already running as installed PWA
  const standalone =
    window.matchMedia("(display-mode: standalone)").matches ||
    (navigator as Navigator & { standalone?: boolean }).standalone === true;
  if (standalone) return "installed";

  const isIOS = /iP(hone|ad|od)/.test(ua);
  const isAndroid = /Android/i.test(ua);
  // In-app / embedded browsers (WhatsApp, Instagram, Facebook, Messenger, TikTok, Telegram)
  const isInApp =
    /WhatsApp|Instagram|FBAN|FBAV|FB_IAB|Messenger|TikTok|Telegram/i.test(ua) ||
    (/; wv\)/.test(ua) && isAndroid);

  if (isIOS) {
    if (isInApp) return "ios-inapp";
    const isChrome = /CriOS/i.test(ua);
    if (isChrome) return "ios-chrome";
    const isSafari = /Safari/i.test(ua) && !/CriOS|FxiOS|EdgiOS|OPiOS/i.test(ua);
    return isSafari ? "ios-safari" : "ios-other";
  }
  if (isAndroid) {
    if (isInApp) return "android-inapp";
    if (hasInstallPrompt) return "android-prompt";
    return "android-browser";
  }
  return "desktop";
}

const STRINGS = {
  es: {
    title: "INSTALA FLUENCY APP",
    subtitle: "Practica tu inglés todos los días desde tu celular.",
    installNow: "INSTALAR FLUENCY APP",
    openApp: "ABRIR FLUENCY APP",
    alreadyInstalled: "FLUENCY APP YA ESTÁ INSTALADA",
    installedOk: "FLUENCY APP INSTALADA ✅",
    iphoneTitle: "INSTALA FLUENCY APP EN TU IPHONE",
    iphoneIntro: "Haz estos 3 pasos en Safari. No necesitas descargar nada del App Store.",
    iosStep1: 'Toca el botón Compartir en la barra de Safari.',
    iosStep2: 'Desliza el menú y toca “Agregar a pantalla de inicio”.',
    iosStep3: 'Confirma tocando “Agregar” arriba a la derecha.',
    iosShareLabel: "Compartir",
    iosAddHomeLabel: "Agregar a pantalla de inicio",
    iosAddLabel: "Agregar",
    iosDone: "Después verás el ícono de Fluency App en tu pantalla de inicio.",
    openSafariTitle: "PARA INSTALAR FLUENCY APP, ÁBRELA EN SAFARI",
    openSafariCta: "ABRIR EN SAFARI",
    openSafariSteps: ['Toca el menú del navegador', 'Elige "Abrir en Safari"'],
    iosChromeTitle: "INSTALA FLUENCY APP DESDE SAFARI",
    iosChromeIntro:
      'Chrome en iPhone usa el mismo motor que Safari, pero solo Safari puede agregar la app a tu pantalla de inicio. Toca el menú de Chrome y elige "Abrir en Safari", luego sigue estos pasos.',
    iosChromeOpenStep1: 'Toca el menú ⋮ en Chrome.',
    iosChromeOpenStep2: 'Elige "Abrir en Safari".',
    iosChromeThen: "Después, en Safari:",
    openChromeTitle: "PARA INSTALAR FLUENCY APP, ÁBRELA EN CHROME",
    openChromeCta: "ABRIR EN CHROME",
    openChromeSteps: ["Toca el menú", 'Elige "Abrir en Chrome"'],
    chromeMenuTitle: "EN CHROME:",
    chromeStep1: "Toca el menú ⋮",
    chromeStep2: 'Toca "Instalar app" o "Agregar a pantalla principal"',
    desktopTitle: "INSTALA FLUENCY APP EN TU CELULAR",
    desktopHint: "Abre este enlace en tu celular:",
    copyLink: "COPIAR LINK",
    copied: "¡COPIADO!",
    continueBrowser: "CONTINUAR EN EL NAVEGADOR",
  },
  en: {
    title: "INSTALL FLUENCY APP",
    subtitle: "Practice your English every day from your phone.",
    installNow: "INSTALL FLUENCY APP",
    openApp: "OPEN FLUENCY APP",
    alreadyInstalled: "FLUENCY APP IS ALREADY INSTALLED",
    installedOk: "FLUENCY APP INSTALLED ✅",
    iphoneTitle: "INSTALL FLUENCY APP ON YOUR IPHONE",
    iphoneIntro: "Follow these 3 steps in Safari. You do not need to download anything from the App Store.",
    iosStep1: "Tap the Share button in the Safari toolbar.",
    iosStep2: 'Swipe through the menu and tap “Add to Home Screen”.',
    iosStep3: 'Confirm by tapping “Add” in the top-right corner.',
    iosShareLabel: "Share",
    iosAddHomeLabel: "Add to Home Screen",
    iosAddLabel: "Add",
    iosDone: "You will then see the Fluency App icon on your Home Screen.",
    openSafariTitle: "TO INSTALL FLUENCY APP, OPEN IT IN SAFARI",
    openSafariCta: "OPEN IN SAFARI",
    openSafariSteps: ["Tap the browser menu", 'Choose "Open in Safari"'],
    iosChromeTitle: "INSTALL FLUENCY APP FROM SAFARI",
    iosChromeIntro:
      'Chrome on iPhone uses the same engine as Safari, but only Safari can add the app to your Home Screen. Tap Chrome\'s menu and choose "Open in Safari", then follow these steps.',
    iosChromeOpenStep1: "Tap Chrome's ⋮ menu.",
    iosChromeOpenStep2: 'Choose "Open in Safari".',
    iosChromeThen: "Then, in Safari:",
    openChromeTitle: "TO INSTALL FLUENCY APP, OPEN IT IN CHROME",
    openChromeCta: "OPEN IN CHROME",
    openChromeSteps: ["Tap the menu", 'Choose "Open in Chrome"'],
    chromeMenuTitle: "IN CHROME:",
    chromeStep1: "Tap the ⋮ menu",
    chromeStep2: 'Tap "Install app" or "Add to Home screen"',
    desktopTitle: "INSTALL FLUENCY APP ON YOUR PHONE",
    desktopHint: "Open this link on your phone:",
    copyLink: "COPY LINK",
    copied: "COPIED!",
    continueBrowser: "CONTINUE IN BROWSER",
  },
} as const;

export const Route = createFileRoute("/install")({
  head: () => ({
    meta: [
      { title: "Install Fluency App" },
      {
        name: "description",
        content: "Install Fluency App on your phone — daily English speaking practice from your home screen.",
      },
      { property: "og:title", content: "Install Fluency App" },
      {
        property: "og:description",
        content: "Install Fluency App on your phone — daily English speaking practice from your home screen.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: InstallPage,
});

function StepRow({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3">
      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
        {n}
      </span>
      <span className="text-left text-sm font-semibold text-foreground">{children}</span>
    </div>
  );
}

function IphoneStepVisual({ step, labels }: { step: 1 | 2 | 3; labels: { share: string; addHome: string; add: string } }) {
  return (
    <div className="relative h-40 w-full overflow-hidden rounded-xl border border-border bg-secondary" aria-hidden="true">
      <div className="absolute inset-x-3 top-3 h-[138px] overflow-hidden rounded-xl border border-border bg-card shadow-card">
        {step === 1 ? (
          <>
            <div className="flex h-9 items-center justify-center border-b border-border bg-muted text-[10px] font-semibold text-muted-foreground">
              talk-fit-app.lovable.app
            </div>
            <div className="flex h-16 items-center justify-center">
              <img src="/icon-192.png" alt="" className="size-10 rounded-lg" width={40} height={40} />
            </div>
            <div className="flex h-9 items-center justify-around border-t border-border bg-muted text-muted-foreground">
              <span className="size-5 rounded-full border border-current" />
              <Share className="size-6 text-primary" strokeWidth={2.5} />
              <Search className="size-5" />
              <span className="flex size-5 items-center justify-center rounded border border-current text-[9px]">2</span>
            </div>
            <span className="absolute bottom-10 left-1/2 -translate-x-1/2 rounded-md bg-navy px-2 py-1 text-[10px] font-bold text-navy-foreground shadow-md">
              {labels.share}
            </span>
          </>
        ) : step === 2 ? (
          <div className="p-3">
            <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-border" />
            <div className="mb-2 h-7 rounded-lg bg-muted" />
            <div className="flex h-12 items-center gap-3 rounded-lg border-2 border-primary bg-accent px-3">
              <PlusSquare className="size-6 shrink-0 text-primary" />
              <span className="text-left text-xs font-bold text-foreground">{labels.addHome}</span>
            </div>
            <div className="mt-2 h-7 rounded-lg bg-muted" />
          </div>
        ) : (
          <>
            <div className="flex h-10 items-center justify-between border-b border-border px-3 text-[11px] font-semibold">
              <span className="text-primary">Cancel</span>
              <span className="font-bold text-foreground">Add to Home Screen</span>
              <span className="rounded-md bg-primary px-2 py-1 font-bold text-primary-foreground">{labels.add}</span>
            </div>
            <div className="flex items-center gap-3 p-4">
              <img src="/icon-192.png" alt="" className="size-12 rounded-xl" width={48} height={48} />
              <div className="min-w-0 flex-1 text-left">
                <p className="text-xs font-bold text-foreground">Fluency App</p>
                <p className="truncate text-[10px] text-muted-foreground">talk-fit-app.lovable.app</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function IphoneGuide({
  s,
  titleAs: Title = "h1",
}: {
  s: (typeof STRINGS)["es"] | (typeof STRINGS)["en"];
  titleAs?: "h1" | "h2";
}) {
  const steps = [s.iosStep1, s.iosStep2, s.iosStep3] as const;
  const labels = { share: s.iosShareLabel, addHome: s.iosAddHomeLabel, add: s.iosAddLabel };
  const titleClass = "text-balance text-2xl font-extrabold text-foreground";
  return (
    <>
      <div className="flex size-12 items-center justify-center rounded-full bg-navy text-navy-foreground">
        <Compass className="size-6" />
      </div>
      <Title className={titleClass}>{s.iphoneTitle}</Title>
      <p className="text-sm leading-6 text-muted-foreground">{s.iphoneIntro}</p>
      <div className="flex w-full flex-col gap-4">
        {steps.map((instruction, index) => (
          <section key={instruction} className="overflow-hidden rounded-2xl border border-border bg-card p-3 shadow-card">
            <div className="mb-3 flex items-start gap-3 text-left">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-extrabold text-primary-foreground">
                {index + 1}
              </span>
              <p className="pt-1 text-sm font-bold leading-5 text-foreground">{instruction}</p>
            </div>
            <IphoneStepVisual step={(index + 1) as 1 | 2 | 3} labels={labels} />
          </section>
        ))}
      </div>
      <div className="flex w-full items-center gap-3 rounded-2xl bg-accent px-4 py-3 text-left">
        <img src="/icon-192.png" alt="Fluency App" className="size-11 rounded-xl" width={44} height={44} />
        <p className="text-sm font-semibold leading-5 text-accent-foreground">{s.iosDone}</p>
      </div>
    </>
  );
}

function InstallPage() {
  const { lang } = useAppLang();
  const s = STRINGS[lang === "es" ? "es" : "en"];
  const navigate = useNavigate();
  const [promptEvent, setPromptEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [justInstalled, setJustInstalled] = useState(false);
  const [copied, setCopied] = useState(false);
  // Detect the environment only after mount so SSR and first client render match.
  const [env, setEnv] = useState<Env | null>(null);

  useEffect(() => {
    setEnv(detectEnv(false));
    const onPrompt = (e: Event) => {
      e.preventDefault();
      setPromptEvent(e as BeforeInstallPromptEvent);
    };
    const onInstalled = () => {
      setJustInstalled(true);
      setPromptEvent(null);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  useEffect(() => {
    if (promptEvent && env === "android-browser") setEnv("android-prompt");
  }, [promptEvent, env]);

  const install = async () => {
    if (!promptEvent) return;
    await promptEvent.prompt();
    const choice = await promptEvent.userChoice;
    if (choice.outcome === "accepted") setJustInstalled(true);
    setPromptEvent(null); // single-shot: never nag repeatedly
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(INSTALL_URL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable — fail silently, URL stays visible
    }
  };

  const goHome = () => navigate({ to: "/" });

  return (
    <div className="flex min-h-screen flex-col items-center bg-background px-5 py-10">
      <div className="flex w-full max-w-sm flex-1 flex-col items-center gap-6 text-center">
        <img
          src="/icon-192.png"
          alt="Fluency App"
          className="size-24 rounded-3xl shadow-lg"
          width={96}
          height={96}
        />

        {env === null && !justInstalled ? (
          <>
            <h1 className="text-2xl font-extrabold tracking-tight text-foreground">{s.title}</h1>
            <p className="text-sm text-muted-foreground">{s.subtitle}</p>
          </>
        ) : justInstalled || env === "installed" ? (
          <>
            <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
              {justInstalled ? s.installedOk : s.alreadyInstalled}
            </h1>
            <Button
              type="button"
              onClick={goHome}
              className="min-h-12 w-full rounded-2xl px-6 text-sm font-bold uppercase tracking-wide shadow-md"
            >
              {s.openApp}
            </Button>
          </>
        ) : env === "ios-inapp" || env === "ios-other" ? (
          <>
            <h1 className="text-2xl font-extrabold tracking-tight text-foreground">{s.openSafariTitle}</h1>
            <div className="flex w-full flex-col gap-2.5">
              {s.openSafariSteps.map((step, i) => (
                <StepRow key={i} n={i + 1}>{step}</StepRow>
              ))}
            </div>
          </>
        ) : env === "ios-chrome" ? (
          <>
            <h1 className="text-2xl font-extrabold tracking-tight text-foreground">{s.iosChromeTitle}</h1>
            <p className="text-sm leading-6 text-muted-foreground">{s.iosChromeIntro}</p>
            <div className="flex w-full flex-col gap-2.5">
              <StepRow n={1}>{s.iosChromeOpenStep1}</StepRow>
              <StepRow n={2}>{s.iosChromeOpenStep2}</StepRow>
            </div>
            <p className="text-xs font-bold uppercase tracking-widest text-primary">{s.iosChromeThen}</p>
            <IphoneGuide s={s} titleAs="h2" />
          </>
        ) : env === "android-inapp" ? (
          <>
            <h1 className="text-2xl font-extrabold tracking-tight text-foreground">{s.openChromeTitle}</h1>
            <div className="flex w-full flex-col gap-2.5">
              {s.openChromeSteps.map((step, i) => (
                <StepRow key={i} n={i + 1}>
                  <span className="inline-flex items-center gap-1.5">
                    {step} {i === s.openChromeSteps.length - 1 ? <Chrome className="size-4 text-primary" /> : null}
                  </span>
                </StepRow>
              ))}
            </div>
          </>
        ) : env === "android-prompt" ? (
          <>
            <h1 className="text-2xl font-extrabold tracking-tight text-foreground">{s.title}</h1>
            <p className="text-sm text-muted-foreground">{s.subtitle}</p>
            <button
              type="button"
              onClick={install}
              className="flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 text-sm font-bold uppercase tracking-wide text-primary-foreground shadow-md"
            >
              <Download className="size-4" />
              {s.installNow}
            </button>
          </>
        ) : env === "android-browser" ? (
          <>
            <h1 className="text-2xl font-extrabold tracking-tight text-foreground">{s.title}</h1>
            <p className="text-sm text-muted-foreground">{s.subtitle}</p>
            <p className="text-xs font-bold uppercase tracking-widest text-primary">{s.chromeMenuTitle}</p>
            <div className="flex w-full flex-col gap-2.5">
              <StepRow n={1}>
                <span className="inline-flex items-center gap-1.5">
                  {s.chromeStep1} <MoreVertical className="size-4 text-primary" />
                </span>
              </StepRow>
              <StepRow n={2}>{s.chromeStep2}</StepRow>
            </div>
          </>
        ) : env === "ios-chrome" ? (
          <>
            <h1 className="text-2xl font-extrabold tracking-tight text-foreground">{s.iosChromeTitle}</h1>
            <p className="text-sm leading-6 text-muted-foreground">{s.iosChromeIntro}</p>
            <div className="flex w-full flex-col gap-2.5">
              <StepRow n={1}>{s.iosChromeOpenStep1}</StepRow>
              <StepRow n={2}>{s.iosChromeOpenStep2}</StepRow>
            </div>
            <p className="text-xs font-bold uppercase tracking-widest text-primary">{s.iosChromeThen}</p>
            <IphoneGuide s={s} titleAs="h2" />
          </>
        ) : env === "ios-safari" ? (
          <IphoneGuide s={s} />
        ) : (
          <>
            <h1 className="text-2xl font-extrabold tracking-tight text-foreground">{s.desktopTitle}</h1>
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <Smartphone className="size-4" /> {s.desktopHint}
            </p>
            <p className="w-full break-all rounded-2xl border border-border bg-card px-4 py-3 text-sm font-semibold text-foreground">
              {INSTALL_URL}
            </p>
            <button
              type="button"
              onClick={copy}
              className="flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 text-sm font-bold uppercase tracking-wide text-primary-foreground shadow-md"
            >
              {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
              {copied ? s.copied : s.copyLink}
            </button>
          </>
        )}

        {/* Secondary actions */}
        <div className="mt-auto flex w-full flex-col items-center gap-4 pt-8">
          {env !== "desktop" && env !== "installed" && !justInstalled ? (
            <button
              type="button"
              onClick={copy}
              className="flex min-h-11 items-center gap-1.5 text-xs font-semibold text-muted-foreground"
            >
              {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              {copied ? s.copied : s.copyLink}
            </button>
          ) : null}
          <Link
            to="/"
            className="flex min-h-11 items-center text-xs font-semibold text-muted-foreground underline underline-offset-4"
          >
            {s.continueBrowser}
          </Link>
        </div>
      </div>
    </div>
  );
}
