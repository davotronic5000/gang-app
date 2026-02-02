'use client';

import { useGameState } from '@/hooks/useGameState';
import GameSetup from '@/components/GameSetup';
import GameBoard from '@/components/GameBoard';

export default function Home() {
  const {
    gameState,
    startGame,
    resetGame,
    openVault,
    triggerAlarm,
    clearActiveChallenge,
    clearActiveSpecialist,
    setActiveCard,
    isGameWon,
    isGameLost,
  } = useGameState();

  if (!gameState.gameStarted) {
    return <GameSetup onStartGame={startGame} />;
  }

  return (
    <GameBoard
      gameState={gameState}
      onOpenVault={openVault}
      onTriggerAlarm={triggerAlarm}
      onClearChallenge={clearActiveChallenge}
      onClearSpecialist={clearActiveSpecialist}
      onSetActiveCard={setActiveCard}
      onNewGame={resetGame}
      isGameWon={isGameWon}
      isGameLost={isGameLost}
    />
  );
}
