import { useEffect } from 'react';
import { RotateCcw, Sparkles } from 'lucide-react';
import ChoiceButtons from '@/components/ChoiceButtons';
import BattleArena from '@/components/BattleArena';
import StatsPanel from '@/components/StatsPanel';
import ResetModal from '@/components/ResetModal';
import { useGameStore } from '@/store/gameStore';
import { fetchStats } from '@/services/gameApi';

export default function Home() {
  const { setStats, setShowResetModal, phase, lastResult } = useGameStore();

  useEffect(() => {
    const loadStats = async () => {
      try {
        const stats = await fetchStats();
        setStats(stats);
      } catch (error) {
        console.error('Failed to load stats:', error);
      }
    };
    loadStats();
  }, [setStats]);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-start py-6 sm:py-10 px-4 sm:px-6 gap-6 sm:gap-8 md:gap-10 max-w-4xl mx-auto w-full">
        <header className="text-center animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 backdrop-blur-sm border border-primary-100 shadow-sm mb-3">
            <Sparkles className="w-4 h-4 text-primary-500" />
            <span className="text-xs sm:text-sm font-display font-semibold text-primary-600">
              休闲对战 · 轻松一刻
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-black bg-gradient-to-r from-primary-600 via-primary-500 to-secondary-600 bg-clip-text text-transparent text-shadow-lg">
            石头 · 剪刀 · 布
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-500 font-display">
            与电脑来一场轻松愉快的对决吧！
          </p>
        </header>

        <section className="w-full">
          <BattleArena />
        </section>

        <section className="w-full">
          <ChoiceButtons />
        </section>

        <section className="w-full mt-auto">
          <div className="relative">
            <StatsPanel />

            <button
              onClick={() => setShowResetModal(true)}
              className="mt-4 w-full sm:w-auto sm:absolute sm:-top-1 sm:right-0 
                py-2.5 px-5 rounded-xl bg-white/70 hover:bg-white backdrop-blur-sm 
                border border-gray-200 text-gray-600 hover:text-gray-800
                font-display font-semibold text-sm shadow-sm hover:shadow
                transition-all flex items-center justify-center gap-2 group"
            >
              <RotateCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
              清空战绩
            </button>
          </div>
        </section>

        <footer className="w-full text-center pt-4 pb-2 animate-fade-in" style={{ animationDelay: '500ms' }}>
          <p className="text-xs text-gray-400 font-display">
            💡 小提示：石头胜剪刀 · 剪刀胜布 · 布胜石头
          </p>
        </footer>
      </div>

      <ResetModal />

      {lastResult && phase === 'revealed' && (
        <div
          className="fixed bottom-6 left-1/2 -translate-x-1/2 px-5 py-2.5 rounded-full 
            bg-white/80 backdrop-blur-md border border-gray-200 shadow-lg
            text-sm font-display font-semibold text-gray-600
            animate-slide-up cursor-default"
        >
          点击下方按钮继续下一局 🎮
        </div>
      )}
    </div>
  );
}
