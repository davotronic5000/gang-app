'use client';

import { useState, useEffect } from 'react';
import { GameState, GameMode, Card } from '@/types/game';
import { challengeCards, specialistCards } from '@/data/cards';

const STORAGE_KEY = 'gang-app-game-state';

const initialState: GameState = {
  gameMode: 'standard',
  vaultsOpened: 0,
  alarmsTriggered: 0,
  activeChallenges: [],
  activeSpecialists: [],
  challengeDeckPosition: 0,
  specialistDeckPosition: 0,
  gameStarted: false,
};

export function useGameState() {
  const [gameState, setGameState] = useState<GameState>(initialState);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);

        // Migrate old format to new format
        const migratedState: GameState = {
          ...initialState,
          ...parsed,
          // Ensure arrays exist (migrate from old single card format)
          activeChallenges: parsed.activeChallenges || (parsed.activeChallenge ? [parsed.activeChallenge] : []),
          activeSpecialists: parsed.activeSpecialists || (parsed.activeSpecialist ? [parsed.activeSpecialist] : []),
        };

        setGameState(migratedState);
      } catch (error) {
        console.error('Failed to parse stored game state:', error);
      }
    }
  }, []);

  // Save to localStorage on state change
  useEffect(() => {
    if (gameState.gameStarted) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
    }
  }, [gameState]);

  const startGame = (gameMode: GameMode) => {
    setGameState({
      ...initialState,
      gameMode,
      gameStarted: true,
    });
  };

  const resetGame = () => {
    setGameState(initialState);
    localStorage.removeItem(STORAGE_KEY);
  };

  const openVault = () => {
    setGameState((prev) => {
      const newPosition = (prev.challengeDeckPosition % 10) + 1;
      const newCard = challengeCards[newPosition - 1];
      return {
        ...prev,
        vaultsOpened: prev.vaultsOpened + 1,
        challengeDeckPosition: newPosition,
        activeChallenges: [...prev.activeChallenges, newCard],
      };
    });
  };

  const triggerAlarm = () => {
    setGameState((prev) => {
      const newPosition = (prev.specialistDeckPosition % 10) + 1;
      const newCard = specialistCards[newPosition - 1];
      return {
        ...prev,
        alarmsTriggered: prev.alarmsTriggered + 1,
        specialistDeckPosition: newPosition,
        activeSpecialists: [...prev.activeSpecialists, newCard],
      };
    });
  };

  const drawNextChallenge = () => {
    setGameState((prev) => {
      const newPosition = (prev.challengeDeckPosition % 10) + 1;
      const newCard = challengeCards[newPosition - 1];
      return {
        ...prev,
        challengeDeckPosition: newPosition,
        activeChallenges: [...prev.activeChallenges, newCard],
      };
    });
  };

  const drawNextSpecialist = () => {
    setGameState((prev) => {
      const newPosition = (prev.specialistDeckPosition % 10) + 1;
      const newCard = specialistCards[newPosition - 1];
      return {
        ...prev,
        specialistDeckPosition: newPosition,
        activeSpecialists: [...prev.activeSpecialists, newCard],
      };
    });
  };

  const clearActiveChallenge = (cardId?: number) => {
    setGameState((prev) => ({
      ...prev,
      activeChallenges: cardId
        ? prev.activeChallenges.filter(card => card.id !== cardId)
        : [],
    }));
  };

  const clearActiveSpecialist = (cardId?: number) => {
    setGameState((prev) => ({
      ...prev,
      activeSpecialists: cardId
        ? prev.activeSpecialists.filter(card => card.id !== cardId)
        : [],
    }));
  };

  const setActiveCard = (card: Card) => {
    if (card.type === 'challenge') {
      setGameState((prev) => ({
        ...prev,
        activeChallenges: [...prev.activeChallenges, card],
        challengeDeckPosition: card.id,
      }));
    } else {
      setGameState((prev) => ({
        ...prev,
        activeSpecialists: [...prev.activeSpecialists, card],
        specialistDeckPosition: card.id,
      }));
    }
  };

  const isGameWon = gameState.gameMode === 'standard' && gameState.vaultsOpened >= 3;
  const isGameLost = gameState.alarmsTriggered >= 3;

  return {
    gameState,
    startGame,
    resetGame,
    openVault,
    triggerAlarm,
    drawNextChallenge,
    drawNextSpecialist,
    clearActiveChallenge,
    clearActiveSpecialist,
    setActiveCard,
    isGameWon,
    isGameLost,
  };
}
