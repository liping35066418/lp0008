import { create } from 'zustand';
import type { Choice, Result, GameStats, PlayResponse } from '../../shared/types';

export type GamePhase = 'idle' | 'thinking' | 'revealed';

const STORAGE_KEY = 'rps_game_stats';

function loadStatsFromStorage(): GameStats | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (
        typeof parsed.wins === 'number' &&
        typeof parsed.losses === 'number' &&
        typeof parsed.draws === 'number' &&
        typeof parsed.currentStreak === 'number' &&
        typeof parsed.bestStreak === 'number'
      ) {
        return parsed as GameStats;
      }
    }
  } catch (e) {
    console.error('Failed to load stats from localStorage:', e);
  }
  return null;
}

function saveStatsToStorage(stats: GameStats) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  } catch (e) {
    console.error('Failed to save stats to localStorage:', e);
  }
}

function clearStatsFromStorage() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('Failed to clear stats from localStorage:', e);
  }
}

interface GameState {
  phase: GamePhase;
  playerChoice: Choice | null;
  computerChoice: Choice | null;
  lastResult: Result | null;
  stats: GameStats;
  isLoading: boolean;
  showResetModal: boolean;
  statsAnimating: { wins: boolean; losses: boolean; draws: boolean; currentStreak: boolean; bestStreak: boolean };

  setPhase: (phase: GamePhase) => void;
  setPlayerChoice: (choice: Choice | null) => void;
  setComputerChoice: (choice: Choice | null) => void;
  setLastResult: (result: Result | null) => void;
  setStats: (stats: GameStats) => void;
  setIsLoading: (loading: boolean) => void;
  setShowResetModal: (show: boolean) => void;
  setStatsAnimating: (key: keyof GameStats, animating: boolean) => void;

  applyPlayResult: (response: PlayResponse) => void;
  resetGame: () => void;
}

const initialStats: GameStats = {
  wins: 0,
  losses: 0,
  draws: 0,
  currentStreak: 0,
  bestStreak: 0,
};

function getInitialStats(): GameStats {
  const stored = loadStatsFromStorage();
  return stored ?? initialStats;
}

export const useGameStore = create<GameState>((set, get) => ({
  phase: 'idle',
  playerChoice: null,
  computerChoice: null,
  lastResult: null,
  stats: getInitialStats(),
  isLoading: false,
  showResetModal: false,
  statsAnimating: { wins: false, losses: false, draws: false, currentStreak: false, bestStreak: false },

  setPhase: (phase) => set({ phase }),
  setPlayerChoice: (playerChoice) => set({ playerChoice }),
  setComputerChoice: (computerChoice) => set({ computerChoice }),
  setLastResult: (lastResult) => set({ lastResult }),
  setStats: (stats) => {
    set({ stats });
    saveStatsToStorage(stats);
  },
  setIsLoading: (isLoading) => set({ isLoading }),
  setShowResetModal: (showResetModal) => set({ showResetModal }),
  setStatsAnimating: (key, animating) =>
    set((state) => ({
      statsAnimating: { ...state.statsAnimating, [key]: animating },
    })),

  applyPlayResult: (response) => {
    const prevStats = get().stats;
    const newStats = response.stats;
    const mergedStats: GameStats = {
      ...newStats,
      bestStreak: Math.max(prevStats.bestStreak, newStats.bestStreak),
    };
    set({
      playerChoice: response.playerChoice,
      computerChoice: response.computerChoice,
      lastResult: response.result,
      stats: mergedStats,
      phase: 'revealed',
      isLoading: false,
    });
    saveStatsToStorage(mergedStats);

    if (mergedStats.wins !== prevStats.wins) {
      setTimeout(() => get().setStatsAnimating('wins', true), 0);
      setTimeout(() => get().setStatsAnimating('wins', false), 500);
    }
    if (mergedStats.losses !== prevStats.losses) {
      setTimeout(() => get().setStatsAnimating('losses', true), 0);
      setTimeout(() => get().setStatsAnimating('losses', false), 500);
    }
    if (mergedStats.draws !== prevStats.draws) {
      setTimeout(() => get().setStatsAnimating('draws', true), 0);
      setTimeout(() => get().setStatsAnimating('draws', false), 500);
    }
    if (mergedStats.currentStreak !== prevStats.currentStreak) {
      setTimeout(() => get().setStatsAnimating('currentStreak', true), 0);
      setTimeout(() => get().setStatsAnimating('currentStreak', false), 500);
    }
    if (mergedStats.bestStreak !== prevStats.bestStreak) {
      setTimeout(() => get().setStatsAnimating('bestStreak', true), 0);
      setTimeout(() => get().setStatsAnimating('bestStreak', false), 500);
    }
  },

  resetGame: () => {
    clearStatsFromStorage();
    set({
      phase: 'idle',
      playerChoice: null,
      computerChoice: null,
      lastResult: null,
      stats: initialStats,
      isLoading: false,
      showResetModal: false,
      statsAnimating: { wins: false, losses: false, draws: false, currentStreak: false, bestStreak: false },
    });
  },
}));
