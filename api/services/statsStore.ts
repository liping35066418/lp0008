import type { GameStats } from '../../shared/types.js';

class StatsStore {
  private stats: GameStats = {
    wins: 0,
    losses: 0,
    draws: 0,
  };

  getStats(): GameStats {
    return { ...this.stats };
  }

  recordWin(): GameStats {
    this.stats.wins += 1;
    return this.getStats();
  }

  recordLoss(): GameStats {
    this.stats.losses += 1;
    return this.getStats();
  }

  recordDraw(): GameStats {
    this.stats.draws += 1;
    return this.getStats();
  }

  reset(): GameStats {
    this.stats = {
      wins: 0,
      losses: 0,
      draws: 0,
    };
    return this.getStats();
  }
}

export const statsStore = new StatsStore();
