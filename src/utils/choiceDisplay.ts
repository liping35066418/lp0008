import type { Choice, Result } from '../../shared/types';

export const CHOICE_EMOJI: Record<Choice, string> = {
  rock: '✊',
  paper: '✋',
  scissors: '✌️',
};

export const CHOICE_LABEL: Record<Choice, string> = {
  rock: '石头',
  paper: '布',
  scissors: '剪刀',
};

export const RESULT_TEXT: Record<Result, string> = {
  win: '你赢了！🎉',
  lose: '你输了 😢',
  draw: '平局！🤝',
};

export const RESULT_COLOR: Record<Result, string> = {
  win: 'text-emerald-600',
  lose: 'text-rose-500',
  draw: 'text-amber-500',
};

export const RESULT_BG: Record<Result, string> = {
  win: 'from-emerald-400 to-emerald-500',
  lose: 'from-rose-400 to-rose-500',
  draw: 'from-amber-400 to-amber-500',
};
