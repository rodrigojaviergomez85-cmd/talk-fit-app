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
  "practice.skipChunk": ["SALTAR ESTE CHUNK", "SKIP THIS CHUNK"],
  "practice.nextChunk": ["SIGUIENTE CHUNK", "NEXT CHUNK"],
  "practice.chunk": ["CHUNK", "CHUNK"],
  "practice.question": ["PREGUNTA", "QUESTION"],
  "practice.of": ["DE", "OF"],
  "practice.repeat": ["REPETIR", "REPEAT"],
  "practice.reRecord": ["VOLVER A GRABAR", "RECORD AGAIN"],
  "practice.copyChunk": ["Escucha y di las dos frases juntas.", "Listen, then say both sentences together."],

  // Standard rep headers (title + one-sentence instruction)
  "rep1.title": ["ESCUCHA", "LISTEN"],
  "rep1.instr": ["Escucha el modelo. Todavía no hables.", "Just listen. Don't speak yet."],
  "rep2.title": ["COPIA", "COPY"],
  "rep2.instr": ["Escucha las 2 frases y grábalas juntas.", "Listen to the 2 sentences, then record them together."],
  "rep3.title": ["SHADOWING", "SHADOWING"],
  "rep3.instr": ["Habla al mismo tiempo que el audio.", "Speak at the same time as the audio."],
  "rep3.cue": ["🔊 AUDIO + 🗣️ TÚ · AL MISMO TIEMPO", "🔊 AUDIO + 🗣️ YOU · AT THE SAME TIME"],
  "rep4.title": ["HAZLO TUYO", "MAKE IT YOURS"],
  "rep4.instr": ["Responde con tu propia información.", "Answer with your own information."],
  "rep5.title": ["TU TURNO", "YOUR TURN"],
  "rep5.instr": ["Habla solo. Conecta 5 ideas o más.", "Speak alone. Connect 5 or more ideas."],
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
  "take.totalSpeaking": ["TIEMPO TOTAL", "TOTAL SPEAKING"],
  "take.retry": ["REPETIR", "RETRY"],
  "take.turn": ["TURNO", "TURN"],
  "take.listenCustomer": ["ESCUCHA AL CLIENTE", "LISTEN TO THE CUSTOMER"],
  "take.respond": ["Responde al cliente", "Respond to the customer"],
  "take.retryHint": ["Repite cualquier turno", "Retry any turn"],

  // Power Chunks (EAGLES)
  "power.title": ["POWER CHUNKS", "POWER CHUNKS"],
  "power.challenge": ["RETO", "CHALLENGE"],
  "power.toolbox": ["TU CAJA DE HERRAMIENTAS", "YOUR TOOLBOX"],


  // Status
  "status.current": ["ACTUAL", "CURRENT"],
  "status.complete": ["COMPLETADO ✓", "COMPLETE ✓"],
  "status.upNext": ["SIGUIENTE", "UP NEXT"],
  "status.review": ["DISPONIBLE PARA REPASAR", "AVAILABLE TO REVIEW"],
  "status.soon": ["PRÓXIMAMENTE", "COMING SOON"],

  // Placement
  "place.title": ["¿DÓNDE EMPIEZAS?", "WHERE DO YOU START?"],
  "place.subtitle": [
    "Elige el nivel que mejor describe tu inglés actual.",
    "Choose the level that best describes your English today.",
  ],
  "place.basic-zero": ["Estoy empezando desde cero.", "I'm starting from zero."],
  "place.simple-future": [
    "Ya puedo presentarme y quiero hablar de mis planes futuros.",
    "I can introduce myself and want to talk about my future plans.",
  ],
  "place.simple-present": [
    "Ya puedo hablar de planes y quiero dominar rutinas, hábitos y acciones de ahora.",
    "I can talk about plans and want to master routines, habits and what's happening now.",
  ],
  "place.past-stories": [
    "Ya manejo el presente y quiero contar lo que pasó.",
    "I handle the present and want to tell what happened.",
  ],
  "place.mixed-tenses": [
    "Ya uso presente, pasado y futuro; quiero mezclarlos y hacer preguntas.",
    "I use present, past and future; I want to mix them and ask questions.",
  ],
  "place.eagles-week-1": [
    "Ya converso y quiero conectar ideas, resolver problemas, comparar opciones y vender.",
    "I can hold a conversation and want to connect ideas, solve problems, compare options and sell.",
  ],
  "place.tigers": [
    "Ya terminé EAGLES y quiero explicar, justificar y defender mis decisiones.",
    "I finished EAGLES and want to explain, justify and defend my decisions.",
  ],
  "place.sharks": [
    "Ya terminé TIGERS y quiero improvisar, adaptarme y mantener la conversación.",
    "I finished TIGERS and want to improvise, adapt and keep the conversation going.",
  ],
  "place.advanced-1": [
    "Nivel Avanzado (cíclico): quiero prepararme para entrevistas reales de reclutamiento.",
    "Advanced level (cyclical): I want to prepare for real recruitment interviews.",
  ],
  "take.round": ["ROUND", "ROUND"],
  "take.target": ["META", "TARGET"],
  "take.think": ["PIENSA", "THINK"],
  "take.thinkStart": ["PIENSA 10 SEGUNDOS", "THINK FOR 10 SECONDS"],
  "take.speakNow": ["¡AHORA HABLA!", "SPEAK NOW!"],
  "take.toolbox": ["FRASES DE APOYO", "SUPPORT PHRASES"],
  "take.situation": ["SITUACIÓN", "SITUATION"],
  "take.responsesLeft": ["respuestas pendientes", "responses left"],
  "take.roundsDone": ["ROUNDS COMPLETADOS", "ROUNDS COMPLETED"],
  "rep.label.explain": ["EXPLICA", "EXPLAIN"],
  "rep.label.justify": ["JUSTIFICA", "JUSTIFY"],
  "rep.label.defend": ["DEFIENDE", "DEFEND"],
  "rep.label.react": ["REACCIONA", "REACT"],
  "rep.label.clarify": ["ACLARA", "CLARIFY"],
  "rep.label.adapt": ["ADAPTA", "ADAPT"],
  "rep5.scenario": ["TU ESCENARIO", "YOUR SCENARIO"],
  "rep5.skeleton": ["ESTRUCTURA", "STRUCTURE"],
  "journey.title": ["🔥 60 DÍAS HABLANDO INGLÉS", "🔥 60 DAYS SPEAKING ENGLISH"],
  "journey.sub": ["Escucha cómo empezó este camino y cómo hablas hoy.", "Hear how this journey started and how you speak today."],
  "journey.start": ["ASÍ EMPEZÓ TU CAMINO", "HOW YOUR JOURNEY STARTED"],
  "journey.end": ["HOY", "TODAY"],
  "journey.days": ["DÍAS DE PRÁCTICA", "PRACTICE DAYS"],
  "journey.minutes": ["MINUTOS HABLANDO", "MINUTES SPEAKING"],
  "journey.finals": ["FINAL REPS", "FINAL REPS"],
  "journey.sprints": ["TEST READY SPRINTS", "TEST READY SPRINTS"],
  "place.soonTitle": ["MUY PRONTO", "VERY SOON"],
  "place.soonBody": [
    "Por ahora te recomendamos comenzar en INTERMEDIO.",
    "For now we recommend starting at INTERMEDIO.",
  ],
  "place.goIntermedio": ["IR A INTERMEDIO", "GO TO INTERMEDIO"],
  "place.selected": ["SELECCIONADO", "SELECTED"],
  "place.changeTitle": ["CAMBIAR MI NIVEL", "CHANGE MY LEVEL"],
  "place.changeHelp": [
    "Elige dónde quieres seguir practicando. Tu progreso y tus grabaciones se conservan.",
    "Choose where you want to keep practicing. Your progress and recordings are kept.",
  ],
  "place.confirmTitle": ["¿CAMBIAR TU NIVEL?", "CHANGE YOUR LEVEL?"],
  "place.confirmBody": [
    "Tu progreso y tus grabaciones anteriores se conservarán.",
    "Your previous progress and recordings will be kept.",
  ],
  "place.confirmCta": ["CAMBIAR NIVEL", "CHANGE LEVEL"],
  "place.saveFailed": ["No se pudo guardar tu nivel. Intenta de nuevo.", "We couldn't save your level. Try again."],
  "module.loadFailed": ["NO PUDIMOS CARGAR ESTE MÓDULO", "WE COULDN'T LOAD THIS MODULE"],
  "module.loadFailedBody": ["Revisa tu conexión e inténtalo otra vez. Tu progreso está a salvo.", "Check your connection and try again. Your progress is safe."],
  "module.retry": ["REINTENTAR", "RETRY"],
  "place.currentLevel": ["Tu nivel actual", "Your current level"],
  "prog.yourModule": ["TU MÓDULO ACTUAL", "YOUR CURRENT MODULE"],
  "prog.forward": ["Tu camino", "Your path"],
  "prog.review": ["Disponibles para repasar", "Available to review"],
  "prog.fullCurriculum": ["Currículo completo", "Full curriculum"],

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
  // Account gate + sync
  "gate.title": ["GUARDA TU PROGRESO", "SAVE YOUR PROGRESS"],
  "gate.practiceTitle": ["INICIA SESIÓN PARA PRACTICAR", "SIGN IN TO PRACTICE"],
  "gate.b1": ["Tu progreso se guarda en tu cuenta.", "Your progress is saved to your account."],
  "gate.b2": ["Tus grabaciones te siguen a cualquier teléfono.", "Your recordings follow you to any phone."],
  "gate.b3": ["Continúa justo donde te quedaste.", "Continue right where you left off."],
  "gate.haveAccount": [
    "¿Ya tienes cuenta? Usa el mismo correo o Google.",
    "Already have an account? Use the same email or Google.",
  ],
  "sync.syncing": ["SINCRONIZANDO TU PROGRESO…", "SYNCING YOUR PROGRESS…"],
  "sync.ready": ["TUS DATOS ESTÁN LISTOS ✓", "YOUR DATA IS READY ✓"],
  "sync.failed": ["No pudimos sincronizar tu progreso.", "We couldn't sync your progress."],
  "sync.retry": ["REINTENTAR", "RETRY"],
  "sync.takeFailed": [
    "No pudimos guardar esta grabación todavía.",
    "We couldn't save this recording yet.",
  ],
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
  "account.modeLabel": ["Entrar o crear cuenta", "Sign in or create account"],
  "account.modeSignIn": ["ENTRAR", "SIGN IN"],
  "account.modeSignUp": ["CREAR CUENTA", "CREATE ACCOUNT"],
  "account.wrongCredentials": [
    "Correo o contraseña incorrectos. Intenta de nuevo o restablece tu contraseña.",
    "Wrong email or password. Try again or reset your password.",
  ],
  "account.emailNotConfirmed": [
    "Tu correo aún no está confirmado. Revisa tu bandeja o reenvía el correo de confirmación.",
    "Your email is not confirmed yet. Check your inbox or resend the confirmation email.",
  ],
  "account.forgotPassword": ["¿Olvidaste tu contraseña?", "Forgot your password?"],
  "account.resetSent": [
    "Te enviamos un enlace para restablecer tu contraseña. Revisa tu correo.",
    "We sent you a password reset link. Check your email.",
  ],
  "account.resendConfirmation": ["REENVIAR CORREO DE CONFIRMACIÓN", "RESEND CONFIRMATION EMAIL"],
  "reset.title": ["NUEVA CONTRASEÑA", "NEW PASSWORD"],
  "reset.newPassword": ["Nueva contraseña (mínimo 6 caracteres)", "New password (min 6 characters)"],
  "reset.submit": ["GUARDAR CONTRASEÑA", "SAVE PASSWORD"],
  "reset.done": ["Listo. Tu contraseña fue actualizada.", "Done. Your password was updated."],
  "reset.invalid": [
    "Este enlace no es válido o ya expiró. Pide un nuevo enlace desde la pantalla de inicio de sesión.",
    "This link is invalid or has expired. Request a new one from the sign-in screen.",
  ],
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

  // Test Ready Sprint (EAGLES pilot)
  "tr.card": ["TEST READY", "TEST READY"],
  "tr.minutes": ["3–5 MIN", "3–5 MIN"],
  "tr.subtitle": ["Practica para evaluaciones de inglés laboral.", "Practice for workplace English assessments."],
  "tr.start": ["EMPEZAR SPRINT", "START SPRINT"],
  "tr.again": ["REPETIR SPRINT", "REPEAT SPRINT"],
  "tr.done": ["SPRINT COMPLETO", "SPRINT COMPLETE"],
  "tr.doneBody": ["Bien hecho. Esto es práctica — sin puntajes.", "Well done. This is practice — no scores."],
  "tr.backToModule": ["VOLVER AL MÓDULO", "BACK TO MODULE"],
  "tr.item": ["ÍTEM", "ITEM"],
  "tr.play": ["ESCUCHAR", "LISTEN"],
  "tr.played": ["YA LO ESCUCHASTE", "ALREADY PLAYED"],
  "tr.record": ["GRABAR", "RECORD"],
  "tr.stop": ["DETENER", "STOP"],
  "tr.next": ["SIGUIENTE", "NEXT"],
  "tr.finish": ["TERMINAR SPRINT", "FINISH SPRINT"],
  "tr.retry": ["GRABAR OTRA VEZ", "RECORD AGAIN"],
  "tr.listenFirst": ["Escucha primero.", "Listen first."],
  "tr.sayIt": ["Ahora dilo.", "Now say it."],
  "tr.think": ["PIENSA", "THINK"],
  "tr.speakNow": ["¡HABLA AHORA!", "SPEAK NOW!"],
  "tr.passage": ["MENSAJE DEL CLIENTE", "CUSTOMER MESSAGE"],
  "tr.story": ["LA SITUACIÓN", "THE SITUATION"],
  "tr.listenOnce": ["Escucha una vez. Luego cuéntalo con tus palabras.", "Listen once. Then retell it in your own words."],
  "tr.retellNow": ["AHORA CUÉNTALO", "NOW RETELL IT"],
  "tr.attempt": ["Intento", "Attempt"],
  "tr.saving": ["Guardando…", "Saving…"],
  "tr.saveFailed": ["No se pudo guardar. Inténtalo otra vez.", "Couldn't save. Try again."],
  "tr.dailyLabel": ["PRÁCTICA DIARIA", "DAILY PRACTICE"],
  "module.start": ["EMPEZAR", "START"],
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

/** Both language variants of a key: [es, en]. */
export function tPair(key: TKey): [string, string] {
  return [DICT[key][0], DICT[key][1]];
}
