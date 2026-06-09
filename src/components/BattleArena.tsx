import { useGameStore } from '@/store/gameStore';
import { CHOICE_EMOJI, CHOICE_LABEL, RESULT_TEXT, RESULT_COLOR, RESULT_BG } from '@/utils/choiceDisplay';
import { useEffect, useState } from 'react';

export default function BattleArena() {
  const { phase, playerChoice, computerChoice, lastResult } = useGameStore();
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (phase === 'revealed') {
      const t = setTimeout(() => setShowResult(true), 100);
      return () => clearTimeout(t);
    } else {
      setShowResult(false);
    }
  }, [phase]);

  const showPlayer = phase !== 'idle';
  const showComputer = phase === 'revealed';
  const computerThinking = phase === 'thinking';

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative flex items-center justify-between gap-2 sm:gap-4 md:gap-8 px-2 sm:px-4">
        <div className="flex-1 flex flex-col items-center gap-2">
          <span className="text-sm sm:text-base font-bold font-display text-primary-600">
            你
          </span>
          <div
            className={`w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-3xl bg-gradient-to-br 
              from-primary-50 to-primary-100 border-2 border-primary-200 shadow-lg
              flex items-center justify-center
              ${showPlayer ? 'animate-pop' : ''}`}
          >
            {showPlayer && playerChoice ? (
              <span className="text-4xl sm:text-5xl md:text-6xl animate-reveal">
                {CHOICE_EMOJI[playerChoice]}
              </span>
            ) : (
              <span className="text-gray-300 text-3xl sm:text-4xl">❓</span>
            )}
          </div>
          <span className={`text-sm sm:text-base font-semibold font-display 
            ${showPlayer && playerChoice ? 'text-primary-700' : 'text-gray-400'}`}>
            {showPlayer && playerChoice ? CHOICE_LABEL[playerChoice] : '等待选择'}
          </span>
        </div>

        <div className="flex flex-col items-center pb-8">
          <div
            className={`w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full 
              bg-gradient-to-br from-gray-700 to-gray-900
              flex items-center justify-center text-white font-display font-black
              text-lg sm:text-2xl md:text-3xl shadow-xl
              ${computerThinking ? 'animate-bounce' : ''}`}
          >
            VS
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center gap-2">
          <span className="text-sm sm:text-base font-bold font-display text-secondary-600">
            电脑
          </span>
          <div
            className={`w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-3xl bg-gradient-to-br 
              from-secondary-50 to-secondary-100 border-2 border-secondary-200 shadow-lg
              flex items-center justify-center
              ${showComputer ? 'animate-pop' : ''}`}
          >
            {computerThinking ? (
              <span className="text-4xl sm:text-5xl md:text-6xl animate-think">
                🤔
              </span>
            ) : showComputer && computerChoice ? (
              <span className="text-4xl sm:text-5xl md:text-6xl animate-reveal">
                {CHOICE_EMOJI[computerChoice]}
              </span>
            ) : (
              <span className="text-gray-300 text-3xl sm:text-4xl">❓</span>
            )}
          </div>
          <span className={`text-sm sm:text-base font-semibold font-display 
            ${showComputer && computerChoice ? 'text-secondary-700' : 'text-gray-400'}`}>
            {computerThinking
              ? '思考中...'
              : showComputer && computerChoice
                ? CHOICE_LABEL[computerChoice]
                : '等待出招'}
          </span>
        </div>
      </div>

      <div className="mt-6 sm:mt-8 h-16 sm:h-20 flex items-center justify-center">
        {showResult && lastResult ? (
          <div
            className={`px-6 sm:px-10 py-3 sm:py-4 rounded-full bg-gradient-to-r ${RESULT_BG[lastResult]} 
              text-white font-display font-black text-xl sm:text-2xl md:text-3xl
              shadow-2xl animate-pop text-shadow-lg`}
          >
            {RESULT_TEXT[lastResult]}
          </div>
        ) : computerThinking ? (
          <div className="flex items-center gap-2 text-gray-500 font-display font-semibold animate-pulse">
            <span>电脑正在思考</span>
            <span className="flex gap-1">
              <span className="w-2 h-2 rounded-full bg-primary-500 animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2 h-2 rounded-full bg-primary-500 animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2 h-2 rounded-full bg-primary-500 animate-bounce" style={{ animationDelay: '300ms' }} />
            </span>
          </div>
        ) : null}
      </div>
    </div>
  );
}
