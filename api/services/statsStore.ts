import type { GameStats } from '../../shared/types.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, '..', '..', 'data');
const STREAK_FILE = path.join(DATA_DIR, 'bestStreak.json');

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function loadBestStreakFromFile(): number {
  ensureDataDir();
  try {
    if (fs.existsSync(STREAK_FILE)) {
      const data = JSON.parse(fs.readFileSync(STREAK_FILE, 'utf-8'));
      return typeof data.bestStreak === 'number' ? data.bestStreak : 0;
    }
  } catch (e) {
    console.error('Failed to load bestStreak:', e);
  }
  return 0;
}

function saveBestStreakToFile(bestStreak: number) {
  ensureDataDir();
  try {
    fs.writeFileSync(STREAK_FILE, JSON.stringify({ bestStreak }), 'utf-8');
  } catch (e) {
    console.error('Failed to save bestStreak:', e);
  }
}

class StatsStore {
  private stats: GameStats;

  constructor() {
    const bestStreak = loadBestStreakFromFile();
    this.stats = {
      wins: 0,
      losses: 0,
      draws: 0,
      currentStreak: 0,
      bestStreak,
    };
  }

  getStats(): GameStats {
    return { ...this.stats };
  }

  recordWin(): GameStats {
    this.stats.wins += 1;
    this.stats.currentStreak += 1;
    if (this.stats.currentStreak > this.stats.bestStreak) {
      this.stats.bestStreak = this.stats.currentStreak;
      saveBestStreakToFile(this.stats.bestStreak);
    }
    return this.getStats();
  }

  recordLoss(): GameStats {
    this.stats.losses += 1;
    this.stats.currentStreak = 0;
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
      currentStreak: 0,
      bestStreak: 0,
    };
    saveBestStreakToFile(0);
    return this.getStats();
  }
}

export const statsStore = new StatsStore();
