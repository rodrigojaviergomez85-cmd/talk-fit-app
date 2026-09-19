/**
 * Original Fluency App UI feedback sounds, generated with the Web Audio API.
 *
 * Deliberately isolated: no AudioService, TTS, Supabase or course-audio cache.
 * Every function fails silently — sound is reinforcement, never information.
 */

let ctx: AudioContext | null = null;

function getContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  try {
    const Ctor =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return null;
    if (!ctx || ctx.state === "closed") ctx = new Ctor();
    return ctx;
  } catch {
    return null;
  }
}

/**
 * Call from a genuine user gesture (tap on record, etc.) so iOS/Safari allow
 * later playback. Never throws, never shows a prompt.
 */
export function unlockFeedbackAudio() {
  try {
    const c = getContext();
    if (c && c.state === "suspended") void c.resume().catch(() => undefined);
  } catch {
    /* ignore */
  }
}

type Note = {
  /** Seconds after start. */
  at: number;
  freq: number;
  /** Seconds. */
  dur: number;
  /** Peak gain, conservative. */
  peak: number;
  type: OscillatorType;
};

function playNotes(notes: Note[]) {
  void playNotesWhenReady(notes);
}

async function playNotesWhenReady(notes: Note[]) {
  try {
    const c = getContext();
    if (!c) return;
    if (c.state === "suspended") {
      try {
        await c.resume();
      } catch {
        return; // browser blocked audio — stay silent
      }
    }
    if (c.state !== "running") return; // browser blocked audio — stay silent
    const now = c.currentTime + 0.01;
    for (const n of notes) {
      const osc = c.createOscillator();
      const gain = c.createGain();
      osc.type = n.type;
      osc.frequency.setValueAtTime(n.freq, now + n.at);
      gain.gain.setValueAtTime(0.0001, now + n.at);
      gain.gain.exponentialRampToValueAtTime(n.peak, now + n.at + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + n.at + n.dur);
      osc.connect(gain);
      gain.connect(c.destination);
      osc.start(now + n.at);
      osc.stop(now + n.at + n.dur + 0.02);
      osc.onended = () => {
        try {
          osc.disconnect();
          gain.disconnect();
        } catch {
          /* ignore */
        }
      };
    }
  } catch {
    /* fail silently */
  }
}

/** GOOD — bright two-note ascending chime (~0.5 s). "I got it!" */
export function playGoodFeedbackSound() {
  playNotes([
    { at: 0, freq: 659.25, dur: 0.22, peak: 0.16, type: "triangle" }, // E5
    { at: 0.13, freq: 987.77, dur: 0.38, peak: 0.18, type: "triangle" }, // B5
    { at: 0.13, freq: 1975.53, dur: 0.25, peak: 0.03, type: "sine" }, // soft sparkle
  ]);
}

/** CORRECT / ALMOST — soft, gentle "boop" with a slight downward move (~0.3 s). */
export function playCorrectFeedbackSound() {
  playNotes([
    { at: 0, freq: 440, dur: 0.14, peak: 0.09, type: "sine" }, // A4
    { at: 0.1, freq: 392, dur: 0.2, peak: 0.07, type: "sine" }, // G4
  ]);
}

/** VICTORY — bright rising fanfare (~1 s) for passing the quiz (16/20+). */
export function playVictorySound() {
  playNotes([
    { at: 0, freq: 523.25, dur: 0.18, peak: 0.14, type: "triangle" }, // C5
    { at: 0.12, freq: 659.25, dur: 0.18, peak: 0.14, type: "triangle" }, // E5
    { at: 0.24, freq: 783.99, dur: 0.2, peak: 0.15, type: "triangle" }, // G5
    { at: 0.38, freq: 1046.5, dur: 0.42, peak: 0.16, type: "triangle" }, // C6
    { at: 0.38, freq: 2093, dur: 0.3, peak: 0.03, type: "sine" }, // soft sparkle
  ]);
}

/** WRONG — short low double note. Never harsh: it marks the miss, it doesn't punish. */
export function playWrongFeedbackSound() {
  playNotes([
    { at: 0, freq: 233.08, dur: 0.16, peak: 0.1, type: "triangle" }, // Bb3
    { at: 0.12, freq: 174.61, dur: 0.26, peak: 0.09, type: "triangle" }, // F3
  ]);
}
