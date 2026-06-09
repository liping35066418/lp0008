import type { Choice } from '../../shared/types';
import { CHOICE_EMOJI, CHOICE_LABEL } from '@/utils/choiceDisplay';
import { useGameStore } from '@/store/gameStore';
import { playGame } from '@/services/gameApi';

const CHOICES: Choice[] = ['rock', 'paper', 'scissors'];

const CHOICE_STYLES: Record<Choice, string> = {
  rock: 'from-primary-400 to-primary-600 shadow-primary-600/40',
  paper: 'from-secondary-400 to-secondary-600 shadow-secondary-600/40',
  scissors: 'from-amber-400 to-amber-600 shadow-amber-600/40',
};

export default function ChoiceButtons() {
  const { phase, isLoading, setPhase, setIsLoading, setPlayerChoice, setComputerChoice, applyPlayResult } =
    useGameStore();

  const disabled = phase === 'thinking' || isLoading;

  const handleChoice = async (choice: Choice) => {
    if (disabled) return;

    setIsLoading(true);
    setPlayerChoice(choice);
    setComputerChoice(null);
    setPhase('thinking');

    try {
      await new Promise((resolve) => setTimeout(resolve, 700));
      const response = await playGame(choice);
      applyPlayResult(response);
    } catch (error) {
      console.error('Play failed:', error);
      setPhase('idle');
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <p className="text-lg md:text-xl font-semibold text-gray-600 font-display animate-fade-in">
        选择你的出拳 👇
      </p>
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8">
        {CHOICES.map((choice, index) => (
          <button
            key={choice}
            onClick={() => handleChoice(choice)}
            disabled={disabled}
            className={`choice-btn btn-3d group relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-3xl 
              bg-gradient-to-br ${CHOICE_STYLES[choice]} shadow-3d hover:shadow-3d-hover
              flex flex-col items-center justify-center gap-1 text-white
              focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-offset-primary-50
              animate-slide-up`}
            style={{ animationDelay: `${index * 80}ms` }}
          >
            <span className="text-4xl sm:text-5xl md:text-6xl drop-shadow-lg transition-transform group-hover:scale-110">
              {CHOICE_EMOJI[choice]}
            </span>
            <span className="text-sm sm:text-base font-bold font-display text-shadow">
              {CHOICE_LABEL[choice]}
            </span>
            <div className="absolute inset-0 rounded-3xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        ))}
      </div>
    </div>
  );
}
