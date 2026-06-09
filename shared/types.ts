export type Choice = 'rock' | 'paper' | 'scissors';

export type Result = 'win' | 'lose' | 'draw';

export interface GameStats {
  wins: number;
  losses: number;
  draws: number;
}

export interface PlayRequest {
  playerChoice: Choice;
}

export interface PlayResponse {
  playerChoice: Choice;
  computerChoice: Choice;
  result: Result;
  stats: GameStats;
}

export interface ResetResponse {
  success: boolean;
  stats: GameStats;
}
