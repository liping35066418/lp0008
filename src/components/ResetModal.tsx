import { useGameStore } from '@/store/gameStore';
import { resetStats } from '@/services/gameApi';
import { RotateCcw, X } from 'lucide-react';
import { useState } from 'react';

export default function ResetModal() {
  const { showResetModal, setShowResetModal, resetGame } =
    useGameStore();
  const [isResetting, setIsResetting] = useState(false);

  if (!showResetModal) return null;

  const handleClose = () => {
    if (!isResetting) setShowResetModal(false);
  };

  const handleConfirm = async () => {
    setIsResetting(true);
    try {
      await resetStats();
      resetGame();
    } catch (error) {
      console.error('Reset failed:', error);
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-sm rounded-3xl bg-white shadow-2xl animate-pop overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-primary-500 via-secondary-500 to-primary-500" />

        <button
          onClick={handleClose}
          disabled={isResetting}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 
            flex items-center justify-center text-gray-500 transition-colors disabled:opacity-50"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-6 sm:p-8">
          <div className="flex flex-col items-center text-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 
              flex items-center justify-center shadow-lg">
              <RotateCcw className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-display font-bold text-gray-800 mb-2">
                确定清空战绩？
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                所有胜场、负场、平局数据将被清零，<br />
                此操作不可恢复哦～
              </p>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={handleClose}
              disabled={isResetting}
              className="flex-1 py-3 px-4 rounded-2xl bg-gray-100 hover:bg-gray-200 
                text-gray-700 font-display font-bold text-base transition-colors
                disabled:opacity-50"
            >
              取消
            </button>
            <button
              onClick={handleConfirm}
              disabled={isResetting}
              className="flex-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-primary-500 to-primary-600 
                hover:from-primary-600 hover:to-primary-700 text-white font-display font-bold text-base 
                shadow-lg shadow-primary-500/30 transition-all btn-3d
                disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isResetting ? (
                <span className="flex items-center justify-center gap-2">
                  <RotateCcw className="w-4 h-4 animate-spin" />
                  清空中...
                </span>
              ) : (
                '确认清空'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
