import type { Choice, Result } from '../../shared/types.js';

const CHOICES: Choice[] = ['rock', 'paper', 'scissors'];

const WINNING_PAIRS: Record<Choice, Choice> = {
  rock: 'scissors',
  scissors: 'paper',
  paper: 'rock',
};

export function generateComputerChoice(): Choice {
  const index = Math.floor(Math.random() * CHOICES.length);
  return CHOICES[index];
}

export function determineResult(
  playerChoice: Choice,
  computerChoice: Choice,
): Result {
  if (playerChoice === computerChoice) {
    return 'draw';
  }
  if (WINNING_PAIRS[playerChoice] === computerChoice) {
    return 'win';
  }
  return 'lose';
}

export function isValidChoice(value: unknown): value is Choice {
  return typeof value === 'string' && CHOICES.includes(value as Choice);
}
