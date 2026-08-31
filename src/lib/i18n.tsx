import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import {
  defaultPreferences,
  loadPreferences,
  savePreferences,
  subscribePreferences,
  type AppLang,
  type Preferences,
} from "@/services/preferences";

/**
 * App interface language. It only affects application chrome — the English
 * learning content is never translated here.
 */

const DICT = {
  // Navigation
  "nav.home": ["INICIO", "HOME"],
  "nav.practice": ["PRÁCTICA", "PRACTICE"],
  "nav.progress": ["PROGRESO", "PROGRESS"],
  "nav.recordings": ["GRABACIONES", "RECORDINGS"],
  "nav.account": ["MI CUENTA", "ACCOUNT"],

  // Generic actions
  "action.start": ["EMPEZAR", "START"],
  "action.back": ["ATRÁS", "BACK"],
  "action.exit": ["SALIR", "EXIT"],
  "action.next": ["SIGUIENTE", "NEXT"],
  "action.skip": ["SALTAR", "SKIP"],
  "action.tryAgain": ["INTENTAR DE NUEVO", "TRY AGAIN"],
  "action.loadMore": ["VER MÁS", "LOAD MORE"],
  "action.continuePractice": ["CONTINUAR PRÁCTICA", "CONTINUE PRACTICE"],
  "action.startDay1": ["EMPEZAR DÍA 1", "START DAY 1"],
  "action.startPractice": ["EMPEZAR PRÁCTICA", "START PRACTICE"],

  // Practice chrome
  "practice.listen": ["ESCUCHAR", "LISTEN"],
  "practice.listenModel": ["ESCUCHAR EL MODELO", "LISTEN TO THE MODEL"],
  "practice.record": ["GRABAR", "RECORD"],
  "practice.recordMe": ["GRABARME", "RECORD ME"],
  "practice.listenToMe": ["ESCUCHARME", "LISTEN TO ME"],
  "practice.answer": ["RESPONDER", "ANSWER"],
  "practice.nextRep": ["SIGUIENTE REP", "NEXT REP"],
  "practice.nextSentence": ["SIGUIENTE FRASE", "NEXT SENTENCE"],
  "practice.nextQuestion": ["SIGUIENTE PREGUNTA", "NEXT QUESTION"],
  "practice.startShadowing": ["EMPEZAR SHADOWING", "START SHADOWING"],
  "practice.hearQuestion": ["ESCUCHAR LA PREGUNTA", "HEAR THE QUESTION"],
  "practice.listenExample": ["ESCUCHAR EJEMPLO", "LISTEN TO EXAMPLE"],
  "practice.showExampleText": ["VER TEXTO DE EJEMPLO", "SHOW EXAMPLE TEXT"],
  "practice.hideExampleText": ["OCULTAR TEXTO DE EJEMPLO", "HIDE EXAMPLE TEXT"],
  "practice.skipNow": ["SALTAR POR AHORA", "SKIP FOR NOW"],
  "practice.skipSentence": ["SALTAR ESTA FRASE", "SKIP THIS SENTENCE"],
  "practice.skipPrompt": ["SALTAR ESTA PREGUNTA", "SKIP THIS PROMPT"],
  "practice.recordOnce": ["Graba una vez para continuar.", "Record once to continue."],
  "practice.shadowTitle": ["SHADOWING", "SHADOW"],
  "practice.needHelp": ["¿Necesitas ayuda?", "Need help?"],
  "practice.complete": ["COMPLETAR LA PRÁCTICA DE HOY", "COMPLETE TODAY'S PRACTICE"],
  "practice.pickFinal": ["Elige una toma como tu rep final.", "Pick one take as your final rep."],
  "practice.finalSelected": ["Rep final elegida ✓ — Toma", "Final rep selected ✓ — Take"],
  "practice.requiredDone": ["3 reps obligatorias completas ✓", "3 required reps complete ✓"],
  "practice.recordAnother": ["O graba otra toma opcional arriba", "Or record another take above"],

  // Rep 5 take board
  "take.take": ["TOMA", "TAKE"],
  "take.optional": ["OPCIONAL", "OPTIONAL"],
  "take.ready": ["Listo para grabar", "Ready to record"],
  "take.time": ["TIEMPO", "TIME"],
  "take.sentences": ["ORACIONES", "SENTENCES"],
  "take.goal": ["META DE HOY", "TODAY'S GOAL"],
  "take.finalRep": ["Rep final ✓", "Final rep ✓"],
  "take.useAsFinal": ["Usar como final", "Use as final"],
  "take.play": ["Reproducir", "Play"],
  "take.stop": ["Detener", "Stop"],
  "take.seconds": ["seg", "sec"],
  "take.counting": ["Contando oraciones…", "Counting sentences…"],
  "take.countUnavailable": ["Conteo de oraciones no disponible", "Sentence count unavailable"],
  "take.goalReached": ["¡Meta alcanzada!", "Goal reached!"],


  // Status
  "status.current": ["ACTUAL", "CURRENT"],
  "status.complete": ["COMPLETADO ✓", "COMPLETE ✓"],
  "status.upNext": ["SIGUIENTE", "UP NEXT"],

  // Home
  "home.today": ["HOY", "TODAY"],
  "home.streak": ["Racha", "Streak"],
  "home.days": ["días", "days"],
  "home.speakingTime": ["Tiempo hablando", "Speaking time"],
  "home.daysCompleted": ["Días completados", "Days completed"],
  "home.reps": ["Fluency reps", "Fluency reps"],
  "home.journey": ["Tu viaje", "Your journey"],
  "home.loadFailed": ["No pudimos cargar tu progreso guardado.", "We couldn't load your saved progress."],
  "home.startJourney": ["EMPIEZA TU VIAJE", "START YOUR JOURNEY"],
  "home.continueJourney": ["CONTINÚA TU VIAJE", "CONTINUE YOUR JOURNEY"],
  "home.journeyComplete": ["VIAJE COMPLETADO", "CURRENT JOURNEY COMPLETE"],
  "home.journeyCompleteBody": [
    "Terminaste todos los módulos disponibles hoy. Mantén tu voz activa repitiendo cualquier día.",
    "You finished every module available today. Keep your voice warm by repeating any day.",
  ],
  "home.reviewProgress": ["VER MI PROGRESO", "REVIEW MY PROGRESS"],
  "home.startDay": ["EMPEZAR DÍA", "START DAY"],
  "home.week": ["SEMANA", "WEEK"],
  "home.day": ["DÍA", "DAY"],
  "home.continueDay": ["CONTINUAR DÍA", "CONTINUE DAY"],
  "home.rep": ["REP", "REP"],


  // Recordings
  "rec.title": ["Mis grabaciones", "My Recordings"],
  "rec.emptyTitle": ["TUS GRABACIONES APARECERÁN AQUÍ", "YOUR RECORDINGS WILL APPEAR HERE"],
  "rec.emptyBody": [
    "Completa una práctica para guardar tu primer Final Rep.",
    "Complete a practice to save your first Final Rep.",
  ],
  "rec.intro": [
    "Tu Final Rep de cada práctica completada — escúchalo y nota la diferencia.",
    "Your saved Final Rep from every completed practice — listen back and hear the difference.",
  ],
  "rec.all": ["Todos", "All"],
  "rec.recent": ["Recientes", "Recent"],
  "rec.oldest": ["Antiguas", "Oldest"],
  "rec.noneInModule": ["Aún no hay grabaciones en este módulo.", "No saved recordings in this module yet."],

  // Progress
  "prog.thisWeek": ["Esta semana", "This week"],
  "prog.days": ["Días", "Days"],
  "prog.minutes": ["Minutos", "Minutes"],
  "prog.modules": ["Tus módulos", "Your modules"],
  "prog.speaking": ["Tu speaking", "Your speaking"],
  "prog.firstRec": ["Primera grabación guardada", "First saved recording"],
  "prog.latestRec": ["Última grabación guardada", "Latest saved recording"],
  "prog.longest": ["Rep final más larga", "Longest final rep"],
  "prog.mostIdeas": ["Más ideas", "Most ideas"],
  "prog.history": ["Historial de speaking", "Speaking history"],
  "prog.viewAll": ["Ver todos los días", "View all days"],
  "prog.currentModule": ["Módulo actual", "Current module"],

  // Account
  "account.title": ["Mi cuenta", "My Account"],
  "account.language": ["Idioma de la app", "App language"],
  "account.spanishSupport": ["Ayuda en español", "Spanish support"],
  "account.spanishSupportHelp": [
    "Muestra traducciones dentro de la práctica. No cambia el idioma de la app.",
    "Shows Spanish translations inside Practice. It does not change the app language.",
  ],
  "account.on": ["Activada", "On"],
  "account.off": ["Desactivada", "Off"],
  "account.viewIntro": ["Ver la introducción otra vez", "See the intro again"],
  "account.signedIn": ["Sesión iniciada", "Signed in"],
  "account.syncNote": [
    "Tu progreso y tus grabaciones se sincronizan automáticamente.",
    "Your progress and recordings sync automatically.",
  ],
  "account.signOut": ["Cerrar sesión", "Sign out"],
  "account.saveProgress": ["Guarda tu progreso", "Save your progress"],
  "account.saveProgressBody": [
    "Opcional. Puedes practicar sin cuenta, pero al iniciar sesión tus grabaciones quedan protegidas.",
    "Optional. You can practice without an account, but signing in keeps your recordings safe.",
  ],
  "account.password": ["Contraseña", "Password"],
  "account.continueEmail": ["CONTINUAR CON EMAIL", "CONTINUE WITH EMAIL"],
  "account.continueGoogle": ["CONTINUAR CON GOOGLE", "CONTINUE WITH GOOGLE"],
  "account.signUpEmail": ["CREAR CUENTA CON EMAIL", "SIGN UP WITH EMAIL"],
  "account.continueGuest": ["SEGUIR COMO INVITADO", "CONTINUE AS GUEST"],
  "account.reset": ["Reiniciar mi viaje", "Reset my journey"],
  "account.resetConfirm": ["¿Reiniciar mi viaje?", "Reset my journey?"],
  "account.resetBody": [
    "Esto borra permanentemente tus días completados, tu progreso, tus posiciones guardadas y tu racha. No se puede deshacer.",
    "This permanently erases your completed days, course progress, saved practice positions and your streak. This can't be undone.",
  ],
  "account.cancel": ["Cancelar", "Cancel"],
  "account.resetAll": ["Borrar todo", "Reset everything"],
  "account.checkEmail": ["Revisa tu correo para confirmar tu cuenta.", "Check your email to confirm your account."],
  "account.googleFailed": [
    "No se pudo iniciar sesión con Google. Intenta de nuevo.",
    "Google sign-in failed. Try again.",
  ],

  // Save-progress prompt
  "save.title": ["GUARDA TU PROGRESO", "SAVE YOUR PROGRESS"],
  "save.body": ["Crea una cuenta para proteger:", "Create an account to protect:"],
  "save.item1": ["tu progreso", "your progress"],
  "save.item2": ["tus grabaciones", "your recordings"],
  "save.item3": ["tu historial de speaking", "your speaking history"],
  "save.footer": ["y continuar desde otros dispositivos.", "and continue on other devices."],

  // Onboarding
  "onb.1.title": ["HABLA INGLÉS TODOS LOS DÍAS", "SPEAK ENGLISH EVERY DAY"],
  "onb.1.body": [
    "Fluency Reps te ayuda a practicar inglés hablando en voz alta todos los días. No necesitas hablar perfecto. Necesitas hacer reps.",
    "Fluency Reps helps you practice English out loud every day. You don't need to be perfect. You need reps.",
  ],
  "onb.1.mic": ["Necesitarás tu micrófono para practicar.", "You'll need your microphone to practice."],
  "onb.2.title": ["5 REPS. UNA PRÁCTICA.", "5 REPS. ONE PRACTICE."],
  "onb.2.time": ["Una práctica toma 6–9 minutos.", "One practice takes 6–9 minutes."],
  "onb.3.title": ["HABLA UN POCO MÁS CADA DÍA", "SPEAK A LITTLE MORE EVERY DAY"],
  "onb.3.b1": ["Practica con constancia.", "Practice consistently."],
  "onb.3.b2": ["Escucha tus grabaciones.", "Listen back to your recordings."],
  "onb.3.b3": ["Compara tu voz con el tiempo.", "Compare your voice over time."],
  "onb.3.streak": [
    "Tu racha muestra cuántos días seguidos has practicado.",
    "Your streak shows how many days in a row you've practiced.",
  ],
  "onb.explore": ["EXPLORAR LA APP", "EXPLORE THE APP"],
} as const;

export type TKey = keyof typeof DICT;

type Ctx = {
  lang: AppLang;
  setLang: (lang: AppLang) => void;
  t: (key: TKey) => string;
  prefs: Preferences;
  setPrefs: (patch: Partial<Preferences>) => void;
};

const AppLangContext = createContext<Ctx | null>(null);

export function AppLangProvider({ children }: { children: ReactNode }) {
  const [prefs, setPrefsState] = useState<Preferences>(defaultPreferences);

  useEffect(() => {
    setPrefsState(loadPreferences());
    return subscribePreferences(() => setPrefsState(loadPreferences()));
  }, []);

  const setPrefs = useCallback((patch: Partial<Preferences>) => {
    setPrefsState(savePreferences(patch));
  }, []);

  const lang = prefs.appLanguage;
  const t = useCallback((key: TKey) => DICT[key][lang === "es" ? 0 : 1], [lang]);

  return (
    <AppLangContext.Provider
      value={{ lang, setLang: (next) => setPrefs({ appLanguage: next }), t, prefs, setPrefs }}
    >
      {children}
    </AppLangContext.Provider>
  );
}

export function useAppLang(): Ctx {
  const ctx = useContext(AppLangContext);
  if (ctx) return ctx;
  return {
    lang: "es",
    setLang: () => undefined,
    t: (key: TKey) => DICT[key][0],
    prefs: defaultPreferences,
    setPrefs: () => undefined,
  };
}

/** Shorthand for chrome copy. */
export function useT(): (key: TKey) => string {
  return useAppLang().t;
}
