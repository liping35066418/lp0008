import { create } from 'zustand';
import type { Choice, Result, GameStats, PlayResponse } from '../../shared/types';

export type GamePhase = 'idle' | 'thinking' | 'revealed';

interface GameState {
  phase: GamePhase;
  playerChoice: Choice | null;
  computerChoice: Choice | null;
  lastResult: Result | null;
  stats: GameStats;
  isLoading: boolean;
  showResetModal: boolean;
  statsAnimating: { wins: boolean; losses: boolean; draws: boolean };

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
};

export const useGameStore = create<GameState>((set) => ({
  phase: 'idle',
  playerChoice: null,
  computerChoice: null,
  lastResult: null,
  stats: initialStats,
  isLoading: false,
  showResetModal: false,
  statsAnimating: { wins: false, losses: false, draws: false },

  setPhase: (phase) => set({ phase }),
  setPlayerChoice: (playerChoice) => set({ playerChoice }),
  setComputerChoice: (computerChoice) => set({ computerChoice }),
  setLastResult: (lastResult) => set({ lastResult }),
  setStats: (stats) => set({ stats }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setShowResetModal: (showResetModal) => set({ showResetModal }),
  setStatsAnimating: (key, animating) =>
    set((state) => ({
      statsAnimating: { ...state.statsAnimating, [key]: animating },
    })),

  applyPlayResult: (response) => {
    const prevStats = useGameStore.getState().stats;
    set({
      playerChoice: response.playerChoice,
      computerChoice: response.computerChoice,
      lastResult: response.result,
      stats: response.stats,
      phase: 'revealed',
      isLoading: false,
    });

    if (response.stats.wins !== prevStats.wins) {
      setTimeout(() => useGameStore.getState().setStatsAnimating('wins', true), 0);
      setTimeout(() => useGameStore.getState().setStatsAnimating('wins', false), 500);
    }
    if (response.stats.losses !== prevStats.losses) {
      setTimeout(() => useGameStore.getState().setStatsAnimating('losses', true), 0);
      setTimeout(() => useGameStore.getState().setStatsAnimating('losses', false), 500);
    }
    if (response.stats.draws !== prevStats.draws) {
      setTimeout(() => useGameStore.getState().setStatsAnimating('draws', true), 0);
      setTimeout(() => useGameStore.getState().setStatsAnimating('draws', false), 500);
    }
  },

  resetGame: () =>
    set({
      phase: 'idle',
      playerChoice: null,
      computerChoice: null,
      lastResult: null,
      stats: initialStats,
      isLoading: false,
      showResetModal: false,
      statsAnimating: { wins: false, losses: false, draws: false },
    }),
}));
