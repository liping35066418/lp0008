import { useGameStore } from '@/store/gameStore';
import { Trophy, ThumbsDown, Handshake, Flame, Crown } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  gradient: string;
  animating: boolean;
  delay: number;
}

function StatCard({ label, value, icon, gradient, animating, delay }: StatCardProps) {
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
        </span>
      </div>
    </div>
  );
}

export default function StatsPanel() {
  const { stats, statsAnimating } = useGameStore();
  const totalDecisive = stats.wins + stats.losses;
  const winRate = totalDecisive > 0 ? Math.round((stats.wins / totalDecisive) * 100) : 0;

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-3 px-1">
        <h3 className="text-base sm:text-lg font-bold font-display text-gray-700">
          📊 战绩统计
        </h3>
        <span className="text-xs sm:text-sm font-semibold text-gray-500 font-display">
          胜负局 {totalDecisive} · 平局 {stats.draws} · 胜率 {winRate}%
        </span>
      </div>
      <div className="flex gap-3 sm:gap-4 mb-3 sm:mb-4">
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
          delay={100}
        />
        <StatCard
          label="平局"
          value={stats.draws}
          icon={<Handshake className="w-4 h-4 sm:w-5 sm:h-5" />}
          gradient="from-amber-400 to-amber-600"
          animating={statsAnimating.draws}
          delay={200}
        />
      </div>
      <div className="flex gap-3 sm:gap-4">
        <StatCard
          label="当前连胜"
          value={stats.currentStreak}
          icon={<Flame className="w-4 h-4 sm:w-5 sm:h-5" />}
          gradient="from-orange-400 to-red-500"
          animating={statsAnimating.currentStreak}
          delay={300}
        />
        <StatCard
          label="最高连胜"
          value={stats.bestStreak}
          icon={<Crown className="w-4 h-4 sm:w-5 sm:h-5" />}
          gradient="from-violet-500 to-indigo-600"
          animating={statsAnimating.bestStreak}
          delay={400}
        />
      </div>
    </div>
  );
}
