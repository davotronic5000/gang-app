'use client';

import { useState } from 'react';
import { GameMode } from '@/types/game';

interface GameControlsProps {
  onNewGame: () => void;
  onViewLibrary: () => void;
  isGameWon: boolean;
  isGameLost: boolean;
  gameMode: GameMode;
  vaultsOpened: number;
}

export default function GameControls({
  onNewGame,
  onViewLibrary,
  isGameWon,
  isGameLost,
  gameMode,
  vaultsOpened,
}: GameControlsProps) {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleNewGame = () => {
    if (isGameWon || isGameLost) {
      onNewGame();
    } else {
      setShowConfirm(true);
    }
  };

  const confirmNewGame = () => {
    setShowConfirm(false);
    onNewGame();
  };

  return (
    <div className="space-y-4">
      {/* Win/Loss Messages */}
      {isGameWon && (
        <div className="bg-gradient-to-r from-amber-500 to-yellow-500 rounded-xl p-6 text-center shadow-lg shadow-amber-500/30">
          <div className="text-6xl mb-2">🎉</div>
          <h2 className="text-2xl font-bold text-black mb-2">Victory!</h2>
          <p className="text-black/80">You successfully cracked all 3 vaults!</p>
        </div>
      )}

      {isGameLost && (
        <div className="bg-gradient-to-r from-red-500 to-red-900 rounded-xl p-6 text-center shadow-lg shadow-red-500/30">
          <div className="text-6xl mb-2">🚨</div>
          <h2 className="text-2xl font-bold text-white mb-2">Game Over!</h2>
          <p className="text-white/90">
            {gameMode === 'neverending'
              ? `The alarms caught you! Final score: ${vaultsOpened} vaults`
              : 'You triggered 3 alarms before cracking all vaults.'}
          </p>
        </div>
      )}

      {/* Controls */}
      <div className="flex gap-3">
        <button
          onClick={onViewLibrary}
          className="flex-1 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-100 font-semibold py-3 px-4 rounded-lg transition-all"
        >
          📚 Card Library
        </button>
        <button
          onClick={handleNewGame}
          className="flex-1 bg-red-500/20 hover:bg-red-500/30 border border-red-400/40 text-red-200 font-semibold py-3 px-4 rounded-lg transition-all"
        >
          🔄 New Game
        </button>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-neutral-900 rounded-xl shadow-2xl max-w-sm w-full p-6 border border-amber-500/30">
            <h3 className="text-xl font-bold text-amber-100 mb-3">Start New Game?</h3>
            <p className="text-amber-200/70 mb-6">
              Your current game progress will be lost. Are you sure?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-100 font-semibold py-2 px-4 rounded-lg transition-all"
              >
                Cancel
              </button>
              <button
                onClick={confirmNewGame}
                className="flex-1 bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white font-semibold py-2 px-4 rounded-lg transition-all"
              >
                New Game
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
