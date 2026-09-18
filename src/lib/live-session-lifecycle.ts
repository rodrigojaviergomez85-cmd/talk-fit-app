/**
 * Start/stop lifecycle for the live coach conversation.
 *
 * A live session opens several resources one after another (audio output,
 * microphone permission, websocket). Any of them can finish AFTER the learner
 * already tapped "X" or "Terminar". This helper gives every start attempt an
 * identity, so a cancelled attempt releases whatever arrives late instead of
 * leaving the microphone or the socket open.
 */

export type ReleaseFn = () => void | Promise<void>;

export class LiveSessionLifecycle {
  private lastId = 0;
  private currentId: number | null = null;
  private resources: { id: number; release: ReleaseFn }[] = [];

  /** True while a start attempt is running or a session is live. */
  get busy(): boolean {
    return this.currentId !== null;
  }

  get activeId(): number | null {
    return this.currentId;
  }

  /**
   * Claims the lifecycle for a new attempt. Returns null when one is already
   * in flight, which blocks duplicate starts before the first await.
   */
  begin(): number | null {
    if (this.currentId !== null) return null;
    this.lastId += 1;
    this.currentId = this.lastId;
    return this.currentId;
  }

  /** True when `id` is still the attempt the user is waiting for. */
  isCurrent(id: number): boolean {
    return this.currentId === id;
  }

  /**
   * Registers a resource for an attempt. If the attempt was already cancelled
   * the resource is released immediately and `false` is returned, so late
   * microphone permissions or sockets never stay open.
   */
  register(id: number, release: ReleaseFn): boolean {
    if (!this.isCurrent(id)) {
      void runSafely(release);
      return false;
    }
    this.resources.push({ id, release });
    return true;
  }

  /**
   * Releases every resource (microphone, audio nodes, playback, animation,
   * connection) in reverse order and frees the lifecycle so the learner can
   * start again. Safe to call while connecting, on errors, while live, and on
   * unmount.
   */
  async releaseAll(): Promise<void> {
    this.currentId = null;
    const pending = this.resources.reverse();
    this.resources = [];
    for (const item of pending) await runSafely(item.release);
  }
}

async function runSafely(release: ReleaseFn): Promise<void> {
  try {
    await release();
  } catch {
    /* cleanup is best effort */
  }
}
