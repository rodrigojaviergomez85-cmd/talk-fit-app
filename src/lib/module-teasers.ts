import type { ModuleId } from "@/lib/types";

/**
 * Short practice-goal teasers shown in PROGRESS → "Mi ruta".
 * Keyed by stable ModuleId; intentionally separate from course descriptions.
 * Teasers describe what you will practice — never promises of mastery,
 * employment or certification.
 */
export const MODULE_TEASERS: Record<ModuleId, { es: string; en: string }> = {
  "basic-zero": {
    es: "Preséntate y habla de las personas en tu vida.",
    en: "Introduce yourself and the people in your life.",
  },
  "simple-future": {
    es: "Habla de tus planes y de lo que viene.",
    en: "Share your plans and what comes next.",
  },
  "simple-present": {
    es: "Habla de tu día y de lo que está pasando.",
    en: "Talk about your day and what's happening now.",
  },
  "past-stories": {
    es: "Cuenta lo que viviste, de principio a fin.",
    en: "Turn your experiences into stories.",
  },
  "mixed-tenses": {
    es: "Conecta lo que pasó, lo que haces y lo que harás.",
    en: "Connect your past, present and future.",
  },
  "eagles-week-1": {
    es: "Compara opciones y explica tu elección.",
    en: "Compare options. Explain your choice.",
  },
  tigers: {
    es: "Defiende tu opinión con razones y ejemplos.",
    en: "Defend your opinion with reasons and examples.",
  },
  sharks: {
    es: "Responde a lo inesperado y mantén la conversación.",
    en: "Think on your feet. Keep the conversation going.",
  },
  "advanced-1": {
    es: "Cuenta tu historia y destaca en tus entrevistas.",
    en: "Tell your story. Stand out in interviews.",
  },
  "advanced-2": {
    es: "Atiende clientes y resuelve problemas en inglés.",
    en: "Help customers. Solve problems in English.",
  },
  "advanced-3": {
    es: "Explica ideas difíciles sin depender de un guion.",
    en: "Explain complex ideas without relying on a script.",
  },
};
