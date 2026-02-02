'use client';

import { useState } from 'react';
import { GameState, Card } from '@/types/game';
import VaultTracker from './VaultTracker';
import AlarmTracker from './AlarmTracker';
import CardDisplay from './CardDisplay';
import CardLibrary from './CardLibrary';
import GameControls from './GameControls';

interface GameBoardProps {
  gameState: GameState;
  onOpenVault: () => void;
  onTriggerAlarm: () => void;
  onClearChallenge: (cardId?: number) => void;
  onClearSpecialist: (cardId?: number) => void;
  onSetActiveCard: (card: Card) => void;
  onNewGame: () => void;
  isGameWon: boolean;
  isGameLost: boolean;
}

export default function GameBoard({
  gameState,
  onOpenVault,
  onTriggerAlarm,
  onClearChallenge,
  onClearSpecialist,
  onSetActiveCard,
  onNewGame,
  isGameWon,
  isGameLost,
}: GameBoardProps) {
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-neutral-900 to-black p-4">
      <div className="max-w-4xl mx-auto py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500 mb-2">
            The Gang
          </h1>
          <div className="flex items-center justify-center gap-4 text-amber-200/80">
            <span className="capitalize">{gameState.gameMode} Mode</span>
          </div>
        </div>

        <div className="space-y-6">
          {/* Vault and Alarm Trackers */}
          <div className="grid md:grid-cols-2 gap-6">
            <VaultTracker
              vaultsOpened={gameState.vaultsOpened}
              gameMode={gameState.gameMode}
              onOpenVault={onOpenVault}
              isGameWon={isGameWon}
              isGameLost={isGameLost}
            />
            <AlarmTracker
              alarmsTriggered={gameState.alarmsTriggered}
              onTriggerAlarm={onTriggerAlarm}
              isGameLost={isGameLost}
              specialistCardsEnabled={gameState.specialistCardsEnabled}
            />
          </div>

          {/* Active Cards */}
          <CardDisplay
            activeChallenges={gameState.activeChallenges}
            activeSpecialists={gameState.activeSpecialists}
            onClearChallenge={onClearChallenge}
            onClearSpecialist={onClearSpecialist}
          />

          {/* Game Controls */}
          <GameControls
            onNewGame={onNewGame}
            onViewLibrary={() => setIsLibraryOpen(true)}
            isGameWon={isGameWon}
            isGameLost={isGameLost}
            gameMode={gameState.gameMode}
            vaultsOpened={gameState.vaultsOpened}
          />
        </div>
      </div>

      {/* Card Library Modal */}
      <CardLibrary
        isOpen={isLibraryOpen}
        onClose={() => setIsLibraryOpen(false)}
        onSelectCard={onSetActiveCard}
      />
    </div>
  );
}
