import type { Recording } from "@/lib/types";

/**
 * RecordingService — microphone capture abstraction (MediaRecorder).
 * Returns session-scoped object URLs; a future version can upload the blob.
 */

export type ActiveRecording = {
  stop: () => Promise<Recording>;
  cancel: () => void;
  analyser: AnalyserNode | null;
};

export const RecordingService = {
  isSupported(): boolean {
    return (
      typeof navigator !== "undefined" &&
      !!navigator.mediaDevices?.getUserMedia &&
      typeof window !== "undefined" &&
      "MediaRecorder" in window
    );
  },

  async start(label: string): Promise<ActiveRecording> {
    if (!RecordingService.isSupported()) {
      throw new Error("Microphone recording is not supported in this browser.");
    }
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    const chunks: BlobPart[] = [];
    const startedAt = Date.now();
    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) chunks.push(event.data);
    };
    recorder.start();

    let analyser: AnalyserNode | null = null;
    let audioContext: AudioContext | null = null;
    try {
      audioContext = new AudioContext();
      const source = audioContext.createMediaStreamSource(stream);
      analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);
    } catch {
      analyser = null;
    }

    const cleanup = () => {
      stream.getTracks().forEach((track) => track.stop());
      void audioContext?.close().catch(() => undefined);
    };

    return {
      analyser,
      cancel: () => {
        try {
          recorder.stop();
        } catch {
          /* already stopped */
        }
        cleanup();
      },
      stop: () =>
        new Promise<Recording>((resolve) => {
          recorder.onstop = () => {
            const blob = new Blob(chunks, { type: recorder.mimeType || "audio/webm" });
            cleanup();
            resolve({
              id: `rec-${startedAt}`,
              url: URL.createObjectURL(blob),
              durationSeconds: Math.round((Date.now() - startedAt) / 100) / 10,
              createdAt: new Date().toISOString(),
              label,
            });
          };
          try {
            recorder.stop();
          } catch {
            cleanup();
            resolve({
              id: `rec-${startedAt}`,
              url: null,
              durationSeconds: Math.round((Date.now() - startedAt) / 100) / 10,
              createdAt: new Date().toISOString(),
              label,
            });
          }
        }),
    };
  },
};
