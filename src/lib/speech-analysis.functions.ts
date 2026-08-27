import { createServerFn } from "@tanstack/react-start";

/**
 * Real AI correction for free-speaking reps (Rep 9 / Rep 10).
 * Calls the Lovable AI Gateway and returns structured corrections that the
 * client merges with local fluency metrics.
 */

export type AiCorrection = {
  said: string;
  correct: string;
  note: string;
  category: "third-person-s" | "because" | "future" | "frequency" | "other";
};

export type AiAnalysisResult = {
  isCorrect: boolean;
  didWell: string;
  oneThingToImprove: string;
  focusLabel: string;
  corrections: AiCorrection[];
  scores: {
    fluency: number;
    pronunciation: number;
    grammarAutomaticity: number;
    rhythm: number;
    targetStructure: number;
  };
};

export type AnalyzeSpeechInput = {
  transcript: string;
  durationSeconds: number;
  targetStructure: string;
  isFinalRep: boolean;
};

const SYSTEM_PROMPT = `Eres un coach de inglés hablado para adultos hispanohablantes (nivel A2-B1).
Analizas la transcripción de lo que el estudiante DIJO en voz alta.
Reglas:
- Corrige gramática, orden de palabras y naturalidad, nada más.
- Máximo 3 correcciones, las más importantes.
- "said" = exactamente lo que dijo mal (en inglés). "correct" = la versión correcta (en inglés).
- "note" = explicación MUY simple en español (máximo 12 palabras).
- "didWell" y "oneThingToImprove" en español, cortos y motivadores.
- "focusLabel" en INGLÉS y MAYÚSCULAS, máximo 4 palabras (ej. "HE / SHE + S").
- Los scores van de 0 a 100.`;

const SCHEMA = {
  type: "object",
  additionalProperties: false,
  properties: {
    isCorrect: { type: "boolean" },
    didWell: { type: "string" },
    oneThingToImprove: { type: "string" },
    focusLabel: { type: "string" },
    corrections: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          said: { type: "string" },
          correct: { type: "string" },
          note: { type: "string" },
          category: { type: "string", enum: ["third-person-s", "because", "future", "frequency", "other"] },
        },
        required: ["said", "correct", "note", "category"],
      },
    },
    scores: {
      type: "object",
      additionalProperties: false,
      properties: {
        fluency: { type: "number" },
        pronunciation: { type: "number" },
        grammarAutomaticity: { type: "number" },
        rhythm: { type: "number" },
        targetStructure: { type: "number" },
      },
      required: ["fluency", "pronunciation", "grammarAutomaticity", "rhythm", "targetStructure"],
    },
  },
  required: ["isCorrect", "didWell", "oneThingToImprove", "focusLabel", "corrections", "scores"],
} as const;

export const analyzeSpeech = createServerFn({ method: "POST" })
  .inputValidator((input: AnalyzeSpeechInput) => input)
  .handler(async ({ data }): Promise<{ ok: true; result: AiAnalysisResult } | { ok: false; error: string; status?: number }> => {
    const apiKey = process.env["LOVABLE_API_KEY"];
    if (!apiKey) return { ok: false, error: "AI no configurada." };

    const userPrompt = `Estructura objetivo de la lección: ${data.targetStructure}
Duración al hablar: ${Math.round(data.durationSeconds)} segundos${data.isFinalRep ? " (repetición final, ya recibió feedback antes)" : ""}
Transcripción del estudiante:
"""${data.transcript}"""`;

    try {
      const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Lovable-API-Key": apiKey,
          "X-Lovable-AIG-SDK": "fetch",
        },
        body: JSON.stringify({
          model: "google/gemini-3.7-flash",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: userPrompt },
          ],
          response_format: {
            type: "json_schema",
            json_schema: { name: "speech_analysis", strict: true, schema: SCHEMA },
          },
        }),
      });

      if (!response.ok) {
        const body = await response.text();
        if (response.status === 429) return { ok: false, error: "Demasiadas solicitudes. Intenta en unos segundos.", status: 429 };
        if (response.status === 402) return { ok: false, error: "Se agotaron los créditos de IA del espacio de trabajo.", status: 402 };
        return { ok: false, error: `Error de IA (${response.status}): ${body.slice(0, 180)}`, status: response.status };
      }

      const json = (await response.json()) as { choices?: { message?: { content?: string } }[] };
      const content = json.choices?.[0]?.message?.content;
      if (!content) return { ok: false, error: "La IA no devolvió respuesta." };
      return { ok: true, result: JSON.parse(content) as AiAnalysisResult };
    } catch (error) {
      return { ok: false, error: error instanceof Error ? error.message : "Fallo al contactar la IA." };
    }
  });
