/**
 * SpeechToTextService — transcription abstraction.
 *
 * MVP: browser Web Speech API when available, otherwise a realistic mock
 * transcript so the prototype never blocks on missing AI services.
 * Later: route to a server function calling a real STT API.
 */

const MOCK_TRANSCRIPTS = [
  "I usually wake up at six. I have breakfast at home. I start work at eight and I talk with customers every day. My sister work from home. She usually start before me. I like my job because I learn new things. Sometimes I feel tired because my days are busy. Overall I enjoy my routine. Tomorrow I go to start earlier.",
  "I wake up at five thirty every day. I take a shower and I have coffee. I work in a call center in the morning. My brother work in a restaurant. He usually finish late. I like my job because the people are nice. Sometimes it is hard because the calls are long. Overall I am happy. Tomorrow I am going to study more English.",
];

export type TranscriptionResult = {
  transcript: string;
  source: "browser" | "mock";
};

type RecognitionCtor = new () => {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  onresult: ((event: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
};

function getRecognition(): RecognitionCtor | undefined {
  if (typeof window === "undefined") return undefined;
  const w = window as unknown as { SpeechRecognition?: RecognitionCtor; webkitSpeechRecognition?: RecognitionCtor };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition;
}

export const SpeechToTextService = {
  isLiveSupported(): boolean {
    return !!getRecognition();
  },

  /** Live dictation running alongside a recording. Returns a stop function. */
  listen(onTranscript: (text: string) => void): () => string {
    const Recognition = getRecognition();
    if (!Recognition) {
      return () => "";
    }
    const recognition = new Recognition();
    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = true;
    let full = "";
    recognition.onresult = (event) => {
      let text = "";
      for (let i = 0; i < event.results.length; i += 1) {
        text += `${event.results[i]?.[0]?.transcript ?? ""} `;
      }
      full = text.trim();
      onTranscript(full);
    };
    recognition.onerror = () => undefined;
    try {
      recognition.start();
    } catch {
      /* ignore double-start */
    }
    return () => {
      try {
        recognition.stop();
      } catch {
        /* ignore */
      }
      return full;
    };
  },

  /**
   * Server transcription for browsers without live recognition (iPhone).
   * Returns an empty transcript when it fails; never invents text.
   */
  async transcribeBlob(blob: Blob): Promise<TranscriptionResult> {
    if (!blob || blob.size < 2048) return { transcript: "", source: "server" };
    const form = new FormData();
    form.append("file", blob, "recording");
    try {
      const response = await fetch("/api/transcribe", { method: "POST", body: form });
      if (!response.ok) return { transcript: "", source: "server" };
      const data = (await response.json()) as { text?: unknown };
      return { transcript: typeof data.text === "string" ? data.text.trim() : "", source: "server" };
    } catch {
      return { transcript: "", source: "server" };
    }
  },

  /** Fallback / offline transcription used by the prototype. */
  async transcribe(seed = 0): Promise<TranscriptionResult> {
    await new Promise((resolve) => setTimeout(resolve, 700));
    return { transcript: MOCK_TRANSCRIPTS[seed % MOCK_TRANSCRIPTS.length] ?? MOCK_TRANSCRIPTS[0]!, source: "mock" };
  },
};
