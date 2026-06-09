import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import type { GameStats } from '../../shared/types.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, '..', '..', 'data');
const STATS_FILE = path.join(DATA_DIR, 'stats.json');

interface PersistedStats extends GameStats {
  currentStreak: number;
}

const DEFAULT_STATS: PersistedStats = {
  wins: 0,
  losses: 0,
  draws: 0,
  maxStreak: 0,
  currentStreak: 0,
};

function ensureDataDir(): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function loadFromDisk(): PersistedStats {
  ensureDataDir();
  try {
    if (fs.existsSync(STATS_FILE)) {
      const raw = fs.readFileSync(STATS_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      return {
        wins: typeof parsed.wins === 'number' ? parsed.wins : 0,
        losses: typeof parsed.losses === 'number' ? parsed.losses : 0,
        draws: typeof parsed.draws === 'number' ? parsed.draws : 0,
        maxStreak: typeof parsed.maxStreak === 'number' ? parsed.maxStreak : 0,
        currentStreak: typeof parsed.currentStreak === 'number' ? parsed.currentStreak : 0,
      };
    }
  } catch (e) {
    console.error('[statsStore] Failed to load stats from disk, using defaults:', e);
  }
  return { ...DEFAULT_STATS };
}

function saveToDisk(stats: PersistedStats): void {
  ensureDataDir();
  try {
    fs.writeFileSync(STATS_FILE, JSON.stringify(stats, null, 2), 'utf-8');
  } catch (e) {
    console.error('[statsStore] Failed to save stats to disk:', e);
  }
}

class StatsStore {
  private data: PersistedStats;

  constructor() {
    this.data = loadFromDisk();
  }

  getStats(): GameStats {
    return {
      wins: this.data.wins,
      losses: this.data.losses,
      draws: this.data.draws,
      currentStreak: this.data.currentStreak,
      maxStreak: this.data.maxStreak,
    };
  }

  recordWin(): GameStats {
    this.data.wins += 1;
    this.data.currentStreak += 1;
    if (this.data.currentStreak > this.data.maxStreak) {
      this.data.maxStreak = this.data.currentStreak;
    }
    saveToDisk(this.data);
    return this.getStats();
  }

  recordLoss(): GameStats {
    this.data.losses += 1;
    this.data.currentStreak = 0;
    saveToDisk(this.data);
    return this.getStats();
  }

  recordDraw(): GameStats {
    this.data.draws += 1;
    saveToDisk(this.data);
    return this.getStats();
  }

  reset(): GameStats {
    this.data = { ...DEFAULT_STATS };
    saveToDisk(this.data);
    return this.getStats();
  }
}

export const statsStore = new StatsStore();
