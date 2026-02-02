'use client';

import { useState } from 'react';
import { GameMode } from '@/types/game';

interface GameSetupProps {
  onStartGame: (gameMode: GameMode) => void;
}

export default function GameSetup({ onStartGame }: GameSetupProps) {
  const [gameMode, setGameMode] = useState<GameMode>('standard');

  const handleStart = () => {
    onStartGame(gameMode);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-neutral-900 to-black p-4">
      <div className="max-w-md w-full bg-gradient-to-br from-amber-500/10 to-yellow-600/5 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-amber-500/30">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500 mb-2 text-center">
          The Gang
        </h1>
        <p className="text-amber-200/80 text-center mb-8">Vault Heist Tracker</p>

        <div className="space-y-6">
          {/* Game Mode */}
          <div>
            <label className="block text-amber-100 font-semibold mb-3">Game Mode</label>
            <div className="space-y-2">
              <button
                onClick={() => setGameMode('standard')}
                className={`w-full p-4 rounded-lg text-left transition-all ${
                  gameMode === 'standard'
                    ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-black shadow-lg shadow-amber-500/50'
                    : 'bg-white/10 text-amber-100 hover:bg-white/20 border border-amber-500/20'
                }`}
              >
                <div className="font-semibold">Standard Mode</div>
                <div className="text-sm opacity-90">
                  Win: 3 vaults | Lose: 3 alarms
                </div>
              </button>
              <button
                onClick={() => setGameMode('neverending')}
                className={`w-full p-4 rounded-lg text-left transition-all ${
                  gameMode === 'neverending'
                    ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-black shadow-lg shadow-amber-500/50'
                    : 'bg-white/10 text-amber-100 hover:bg-white/20 border border-amber-500/20'
                }`}
              >
                <div className="font-semibold">Never Ending Mode</div>
                <div className="text-sm opacity-90">
                  Unlimited vaults | Lose: 3 alarms
                </div>
              </button>
            </div>
          </div>

          {/* Start Button */}
          <button
            onClick={handleStart}
            className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-bold py-4 rounded-lg hover:from-amber-600 hover:to-yellow-600 transition-all shadow-lg shadow-amber-500/30 hover:shadow-xl hover:shadow-amber-500/50"
          >
            Start Game
          </button>

          {/* Game Rules */}
          <div className="mt-6 p-4 bg-black/40 rounded-lg border border-amber-500/20">
            <h3 className="text-amber-100 font-semibold mb-2">How to Play</h3>
            <ul className="text-sm text-amber-200/70 space-y-1">
              <li>• Success: Open a vault → draw Challenge card</li>
              <li>• Failure: Trigger alarm → draw Specialist card</li>
              <li>• Challenge cards add difficulty</li>
              <li>• Specialist cards provide help</li>
              <li>• Multiple cards can be active at once</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
