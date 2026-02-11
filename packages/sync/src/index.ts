import type { SyncQueueItem } from '@ftc/shared';

const MAX_RETRIES = 5;

export type SyncExecutor = (item: SyncQueueItem) => Promise<void>;

export class SyncEngine {
  constructor(
    private readonly getPending: () => Promise<SyncQueueItem[]>,
    private readonly markDone: (id: string) => Promise<void>,
    private readonly markRetry: (id: string, retries: number, lastAttemptAt: string) => Promise<void>,
    private readonly execute: SyncExecutor,
    private readonly onConflict?: (item: SyncQueueItem) => Promise<void>
  ) {}

  async runOnce(): Promise<{ synced: number; failed: number }> {
    const queue = await this.getPending();
    let synced = 0;
    let failed = 0;

    for (const item of queue) {
      try {
        await this.execute(item);
        await this.markDone(item.id);
        synced += 1;
      } catch (error: any) {
        const retries = item.retries + 1;
        const isConflict = error?.status === 409;

        if (isConflict && this.onConflict) {
          await this.onConflict(item);
        }

        if (retries > MAX_RETRIES) {
          failed += 1;
          continue;
        }

        await this.markRetry(item.id, retries, new Date().toISOString());
        failed += 1;
      }
    }

    return { synced, failed };
  }

  static backoffDelayMs(retries: number): number {
    return Math.min(30000, 500 * Math.pow(2, retries));
  }
}
