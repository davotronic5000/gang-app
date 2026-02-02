'use client';

import { useState } from 'react';
import { GameMode } from '@/types/game';

interface GameSetupProps {
  onStartGame: (gameMode: GameMode, specialistCardsEnabled: boolean, randomizeCards: boolean) => void;
}

export default function GameSetup({ onStartGame }: GameSetupProps) {
  const [gameMode, setGameMode] = useState<GameMode>('standard');
  const [specialistCardsEnabled, setSpecialistCardsEnabled] = useState(true);
  const [randomizeCards, setRandomizeCards] = useState(false);

  const handleStart = () => {
    onStartGame(gameMode, specialistCardsEnabled, randomizeCards);
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
                  Unlimited vaults | Random cards stack
                </div>
              </button>
              <button
                onClick={() => setGameMode('professional')}
                className={`w-full p-4 rounded-lg text-left transition-all ${
                  gameMode === 'professional'
                    ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-black shadow-lg shadow-amber-500/50'
                    : 'bg-white/10 text-amber-100 hover:bg-white/20 border border-amber-500/20'
                }`}
              >
                <div className="font-semibold">Professional Mode</div>
                <div className="text-sm opacity-90">
                  Win: 3 vaults | 1 permanent challenge
                </div>
              </button>
              <button
                onClick={() => setGameMode('master-thief')}
                className={`w-full p-4 rounded-lg text-left transition-all ${
                  gameMode === 'master-thief'
                    ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-black shadow-lg shadow-amber-500/50'
                    : 'bg-white/10 text-amber-100 hover:bg-white/20 border border-amber-500/20'
                }`}
              >
                <div className="font-semibold">Master Thief Mode</div>
                <div className="text-sm opacity-90">
                  Win: 3 vaults | Lose: 2 alarms | No specialists
                </div>
              </button>
            </div>
          </div>

          {/* Card Randomization Toggle (only for standard mode) */}
          {gameMode === 'standard' && (
            <div>
              <label className="block text-amber-100 font-semibold mb-3">Card Order</label>
              <button
                onClick={() => setRandomizeCards(!randomizeCards)}
                className={`w-full p-4 rounded-lg text-left transition-all ${
                  randomizeCards
                    ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-black shadow-lg shadow-amber-500/50'
                    : 'bg-white/10 text-amber-100 hover:bg-white/20 border border-amber-500/20'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold">
                      {randomizeCards ? 'Random Cards' : 'Sequential Cards'}
                    </div>
                    <div className="text-sm opacity-90">
                      {randomizeCards
                        ? 'Cards drawn randomly'
                        : 'Cards drawn in order (1, 2, 3...)'}
                    </div>
                  </div>
                  <div className="text-2xl">
                    {randomizeCards ? '🎲' : '🔢'}
                  </div>
                </div>
              </button>
            </div>
          )}

          {/* Specialist Cards Toggle (only for never ending mode) */}
          {gameMode === 'neverending' && (
            <div>
              <label className="block text-amber-100 font-semibold mb-3">Difficulty</label>
              <button
                onClick={() => setSpecialistCardsEnabled(!specialistCardsEnabled)}
                className={`w-full p-4 rounded-lg text-left transition-all ${
                  specialistCardsEnabled
                    ? 'bg-white/10 text-amber-100 hover:bg-white/20 border border-amber-500/20'
                    : 'bg-gradient-to-r from-red-500 to-red-700 text-white shadow-lg shadow-red-500/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold">
                      {specialistCardsEnabled ? 'Normal' : 'Hard Mode'}
                    </div>
                    <div className="text-sm opacity-90">
                      {specialistCardsEnabled
                        ? 'Specialist cards enabled'
                        : 'No specialist cards (harder!)'}
                    </div>
                  </div>
                  <div className="text-2xl">
                    {specialistCardsEnabled ? '✓' : '🔥'}
                  </div>
                </div>
              </button>
            </div>
          )}

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
              {gameMode === 'standard' && (
                <>
                  <li>• Success: Open vault → draw Challenge card</li>
                  <li>• Failure: Trigger alarm → draw Specialist card</li>
                  <li>• One card at a time, {randomizeCards ? 'random order' : 'sequential'}</li>
                </>
              )}
              {gameMode === 'neverending' && (
                <>
                  <li>• Success: Open vault → add Challenge card</li>
                  <li>• Failure: Trigger alarm → {specialistCardsEnabled ? 'add Specialist card' : 'no card (hard mode!)'}</li>
                  <li>• Multiple random cards, no duplicates</li>
                  <li>• Play until you lose!</li>
                </>
              )}
              {gameMode === 'professional' && (
                <>
                  <li>• One permanent Challenge card throughout game</li>
                  <li>• Success: Open vault → may add another Challenge</li>
                  <li>• Failure: Trigger alarm → draw Specialist card</li>
                  <li>• Win at 3 vaults, lose at 3 alarms</li>
                </>
              )}
              {gameMode === 'master-thief' && (
                <>
                  <li>• Always 2 Challenge cards active</li>
                  <li>• Each heist: discard lowest, draw new Challenge</li>
                  <li>• No Specialist cards available</li>
                  <li>• Win at 3 vaults, lose at 2 alarms!</li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
