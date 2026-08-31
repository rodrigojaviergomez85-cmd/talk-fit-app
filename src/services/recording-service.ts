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

export type MicErrorKind = "permission" | "unsupported" | "insecure" | "unknown";

export class MicError extends Error {
  kind: MicErrorKind;
  constructor(kind: MicErrorKind) {
    super(kind);
    this.kind = kind;
  }
}

/** iOS Safari/Chrome only support mp4; Chrome/Firefox prefer webm/opus. */
function pickMimeType(): string | undefined {
  if (typeof MediaRecorder === "undefined") return undefined;
  const candidates = [
    "audio/mp4",
    "audio/mp4;codecs=mp4a.40.2",
    "audio/webm;codecs=opus",
    "audio/webm",
  ];
  const isIOS =
    typeof navigator !== "undefined" &&
    (/iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === "MacIntel" && (navigator as unknown as { maxTouchPoints: number }).maxTouchPoints > 1));
  const ordered = isIOS ? candidates : [...candidates.slice(2), ...candidates.slice(0, 2)];
  return ordered.find((type) => {
    try {
      return MediaRecorder.isTypeSupported(type);
    } catch {
      return false;
    }
  });
}

function createAudioContext(): AudioContext | null {
  const Ctor =
    typeof window !== "undefined"
      ? (window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext)
      : undefined;
  if (!Ctor) return null;
  try {
    return new Ctor();
  } catch {
    return null;
  }
}

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
    if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia) {
      const secure = typeof window !== "undefined" && window.isSecureContext;
      throw new MicError(secure ? "unsupported" : "insecure");
    }
    if (typeof window === "undefined" || !("MediaRecorder" in window)) {
      throw new MicError("unsupported");
    }

    let stream: MediaStream;
    try {
      // Mono speech capture: clear voice at a fraction of the file size.
      stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true, channelCount: 1 },
      });
    } catch (error) {
      const name = (error as { name?: string } | null)?.name ?? "";
      throw new MicError(
        name === "NotAllowedError" || name === "SecurityError"
          ? "permission"
          : name === "NotFoundError"
            ? "unsupported"
            : "unknown",
      );
    }

    const mimeType = pickMimeType();
    // Speech-appropriate bitrate keeps uploads small on mobile networks.
    const options: MediaRecorderOptions = { audioBitsPerSecond: 32000 };
    let recorder: MediaRecorder;
    try {
      recorder = mimeType
        ? new MediaRecorder(stream, { ...options, mimeType })
        : new MediaRecorder(stream, options);
    } catch {
      try {
        recorder = new MediaRecorder(stream, options);
      } catch {
        recorder = new MediaRecorder(stream);
      }
    }
    const chunks: BlobPart[] = [];
    const startedAt = Date.now();
    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) chunks.push(event.data);
    };
    recorder.start();

    let analyser: AnalyserNode | null = null;
    const audioContext = createAudioContext();
    if (audioContext) {
      try {
        void audioContext.resume().catch(() => undefined);
        const source = audioContext.createMediaStreamSource(stream);
        analyser = audioContext.createAnalyser();
        analyser.fftSize = 256;
        source.connect(analyser);
      } catch {
        analyser = null;
      }
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
            const type = recorder.mimeType || mimeType || "audio/webm";
            const blob = new Blob(chunks, { type });
            cleanup();
            resolve({
              id: `rec-${startedAt}`,
              url: URL.createObjectURL(blob),
              durationSeconds: Math.round((Date.now() - startedAt) / 100) / 10,
              createdAt: new Date().toISOString(),
              label,
              blob,
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
