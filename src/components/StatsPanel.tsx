import { useGameStore } from '@/store/gameStore';
import { Trophy, ThumbsDown, Handshake, Flame, Crown } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  gradient: string;
  animating: boolean;
  delay: number;
  suffix?: string;
}

function StatCard({ label, value, icon, gradient, animating, delay, suffix }: StatCardProps) {
  return (
    <div
      className={`relative flex-1 rounded-2xl p-4 sm:p-5 bg-gradient-to-br ${gradient} 
        shadow-lg overflow-hidden animate-slide-up`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full -translate-y-6 translate-x-6" />
      <div className="relative flex flex-col items-center gap-1 text-white">
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
          {icon}
        </div>
        <span className="text-xs sm:text-sm font-semibold opacity-90 font-display tracking-wide">
          {label}
        </span>
        <span
          className={`text-3xl sm:text-4xl font-black font-display text-shadow 
            ${animating ? 'animate-count' : ''}`}
        >
          {value}
          {suffix && <span className="text-lg sm:text-xl ml-0.5">{suffix}</span>}
        </span>
      </div>
    </div>
  );
}

export default function StatsPanel() {
  const { stats, statsAnimating } = useGameStore();
  const total = stats.wins + stats.losses;
  const winRate = total > 0 ? Math.round((stats.wins / total) * 100) : 0;

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-3 px-1">
        <h3 className="text-base sm:text-lg font-bold font-display text-gray-700">
          📊 战绩统计
        </h3>
        <span className="text-xs sm:text-sm font-semibold text-gray-500 font-display">
          共 {total} 局 · 胜率 {winRate}%
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4 mb-3 sm:mb-4">
        <StatCard
          label="胜场"
          value={stats.wins}
          icon={<Trophy className="w-4 h-4 sm:w-5 sm:h-5" />}
          gradient="from-emerald-400 to-emerald-600"
          animating={statsAnimating.wins}
          delay={0}
        />
        <StatCard
          label="负场"
          value={stats.losses}
          icon={<ThumbsDown className="w-4 h-4 sm:w-5 sm:h-5" />}
          gradient="from-rose-400 to-rose-600"
          animating={statsAnimating.losses}
          delay={80}
        />
        <StatCard
          label="平局"
          value={stats.draws}
          icon={<Handshake className="w-4 h-4 sm:w-5 sm:h-5" />}
          gradient="from-amber-400 to-amber-600"
          animating={statsAnimating.draws}
          delay={160}
        />
        <StatCard
          label="当前连胜"
          value={stats.currentStreak}
          suffix={stats.currentStreak > 0 ? '🔥' : ''}
          icon={<Flame className="w-4 h-4 sm:w-5 sm:h-5" />}
          gradient="from-orange-400 to-red-500"
          animating={statsAnimating.currentStreak}
          delay={240}
        />
        <StatCard
          label="最高连胜"
          value={stats.maxStreak}
          suffix={stats.maxStreak > 0 ? '👑' : ''}
          icon={<Crown className="w-4 h-4 sm:w-5 sm:h-5" />}
          gradient="from-violet-500 to-fuchsia-600"
          animating={statsAnimating.maxStreak}
          delay={320}
        />
      </div>
    </div>
  );
}
