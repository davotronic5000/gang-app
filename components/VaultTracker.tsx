'use client';

import { GameMode } from '@/types/game';

interface VaultTrackerProps {
  vaultsOpened: number;
  gameMode: GameMode;
  onOpenVault: () => void;
  isGameWon: boolean;
  isGameLost: boolean;
}

export default function VaultTracker({
  vaultsOpened,
  gameMode,
  onOpenVault,
  isGameWon,
  isGameLost,
}: VaultTrackerProps) {
  const isDisabled = isGameWon || isGameLost;

  return (
    <div className="bg-gradient-to-br from-amber-500/10 to-yellow-600/5 backdrop-blur-sm rounded-xl p-6 border border-amber-500/30">
      <h2 className="text-2xl font-bold text-amber-100 mb-4 flex items-center gap-2">
        <span>🔓</span> Vaults
      </h2>

      {gameMode === 'standard' || gameMode === 'professional' || gameMode === 'master-thief' ? (
        <div>
          <div className="flex gap-4 mb-4">
            {[1, 2, 3].map((vault) => (
              <div
                key={vault}
                className={`flex-1 aspect-square rounded-lg flex items-center justify-center text-4xl transition-all ${
                  vaultsOpened >= vault
                    ? 'bg-gradient-to-br from-amber-500 to-yellow-500 shadow-lg shadow-amber-500/50'
                    : 'bg-black/40 border-2 border-dashed border-amber-500/30'
                }`}
              >
                {vaultsOpened >= vault ? '🔓' : '🔒'}
              </div>
            ))}
          </div>
          <div className="text-center text-amber-100 mb-4">
            <span className="text-3xl font-bold">{vaultsOpened}</span>
            <span className="text-xl opacity-75"> / 3</span>
          </div>
        </div>
      ) : (
        <div className="mb-4">
          <div className="text-center text-amber-100 mb-4">
            <div className="text-5xl font-bold text-amber-400">{vaultsOpened}</div>
            <div className="text-sm opacity-75 mt-1">Vaults Opened</div>
          </div>
        </div>
      )}

      <button
        onClick={onOpenVault}
        disabled={isDisabled}
        className={`w-full py-3 rounded-lg font-semibold transition-all ${
          isDisabled
            ? 'bg-gray-500/50 text-gray-300 cursor-not-allowed'
            : 'bg-gradient-to-r from-amber-500 to-yellow-500 text-black hover:from-amber-600 hover:to-yellow-600 shadow-lg shadow-amber-500/30 hover:shadow-xl'
        }`}
      >
        Open Vault
      </button>
    </div>
  );
}
