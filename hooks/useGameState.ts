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
  specialistCardsEnabled: true,
  randomizeCards: false,
  gameStarted: false,
};

// Helper function to get a random card that's not already active
function getRandomUniqueCard(
  allCards: Card[],
  activeCards: Card[]
): Card {
  // Filter out cards that are already active
  const availableCards = allCards.filter(
    card => !activeCards.some(active => active.id === card.id)
  );

  // If no cards available, return a random card anyway
  if (availableCards.length === 0) {
    return allCards[Math.floor(Math.random() * allCards.length)];
  }

  // Return random card from available cards
  return availableCards[Math.floor(Math.random() * availableCards.length)];
}

export function useGameState() {
  // Load from localStorage on mount using lazy initializer
  const [gameState, setGameState] = useState<GameState>(() => {
    // Check if we're in the browser before accessing localStorage
    if (typeof window === 'undefined') {
      return initialState;
    }

    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);

        // Migrate old format to new format
        return {
          ...initialState,
          ...parsed,
          // Ensure arrays exist (migrate from old single card format)
          activeChallenges: parsed.activeChallenges || (parsed.activeChallenge ? [parsed.activeChallenge] : []),
          activeSpecialists: parsed.activeSpecialists || (parsed.activeSpecialist ? [parsed.activeSpecialist] : []),
        };
      } catch (error) {
        console.error('Failed to parse stored game state:', error);
      }
    }
    return initialState;
  });

  // Save to localStorage on state change
  useEffect(() => {
    if (typeof window !== 'undefined' && gameState.gameStarted) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
    }
  }, [gameState]);

  const startGame = (
    gameMode: GameMode,
    specialistCardsEnabled: boolean = true,
    randomizeCards: boolean = false
  ) => {
    // Get available challenge cards (excluding Quick Access for professional and master-thief modes)
    const availableChallenges = (gameMode === 'professional' || gameMode === 'master-thief')
      ? challengeCards.filter(card => card.id !== 1)
      : challengeCards;

    let initialChallenges: Card[] = [];

    // Set up initial challenge cards based on mode
    if (gameMode === 'professional') {
      // Professional: start with one random challenge card that stays active
      const randomCard = availableChallenges[Math.floor(Math.random() * availableChallenges.length)];
      initialChallenges = [randomCard];
    } else if (gameMode === 'master-thief') {
      // Master Thief: start with two random challenge cards
      const firstCard = availableChallenges[Math.floor(Math.random() * availableChallenges.length)];
      let secondCard = availableChallenges[Math.floor(Math.random() * availableChallenges.length)];
      // Make sure second card is different from first
      while (secondCard.id === firstCard.id) {
        secondCard = availableChallenges[Math.floor(Math.random() * availableChallenges.length)];
      }
      initialChallenges = [firstCard, secondCard];
    }

    setGameState({
      ...initialState,
      gameMode,
      specialistCardsEnabled: gameMode === 'master-thief' ? false : specialistCardsEnabled,
      randomizeCards,
      gameStarted: true,
      activeChallenges: initialChallenges,
    });
  };

  const resetGame = () => {
    setGameState(initialState);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const openVault = () => {
    setGameState((prev) => {
      if (prev.gameMode === 'standard') {
        // Standard mode: one card at a time (replace)
        let newCard: Card;
        let newPosition = prev.challengeDeckPosition;

        if (prev.randomizeCards) {
          // Random card selection
          newCard = challengeCards[Math.floor(Math.random() * challengeCards.length)];
        } else {
          // Sequential card selection
          newPosition = (prev.challengeDeckPosition % 10) + 1;
          newCard = challengeCards[newPosition - 1];
        }

        return {
          ...prev,
          vaultsOpened: prev.vaultsOpened + 1,
          challengeDeckPosition: newPosition,
          activeChallenges: [newCard], // Replace with single card
        };
      } else if (prev.gameMode === 'professional') {
        // Professional mode: permanent first card (locked), max 2 challenge cards total
        const availableChallenges = challengeCards.filter(card => card.id !== 1);

        // If we already have 2 cards, replace the second one (keep first locked)
        if (prev.activeChallenges.length >= 2) {
          const newCard = getRandomUniqueCard(availableChallenges, [prev.activeChallenges[0]]);
          return {
            ...prev,
            vaultsOpened: prev.vaultsOpened + 1,
            activeChallenges: [prev.activeChallenges[0], newCard], // Keep first, replace second
          };
        } else {
          // Only 1 card (the permanent one), add a second card
          const newCard = getRandomUniqueCard(availableChallenges, prev.activeChallenges);
          return {
            ...prev,
            vaultsOpened: prev.vaultsOpened + 1,
            activeChallenges: [...prev.activeChallenges, newCard],
          };
        }
      } else if (prev.gameMode === 'master-thief') {
        // Master Thief mode: max 3 cards, first 2 are locked
        const availableChallenges = challengeCards.filter(card => card.id !== 1);

        // If we have less than 3 cards, add a new one
        if (prev.activeChallenges.length < 3) {
          const newCard = getRandomUniqueCard(availableChallenges, prev.activeChallenges);
          return {
            ...prev,
            vaultsOpened: prev.vaultsOpened + 1,
            activeChallenges: [...prev.activeChallenges, newCard],
          };
        } else {
          // We have 3 cards: keep first 2 locked, replace the 3rd
          const newCard = getRandomUniqueCard(availableChallenges, [prev.activeChallenges[0], prev.activeChallenges[1]]);
          return {
            ...prev,
            vaultsOpened: prev.vaultsOpened + 1,
            activeChallenges: [prev.activeChallenges[0], prev.activeChallenges[1], newCard],
          };
        }
      } else {
        // Never ending mode: random cards, multiple allowed, no duplicates
        const newCard = getRandomUniqueCard(challengeCards, prev.activeChallenges);
        return {
          ...prev,
          vaultsOpened: prev.vaultsOpened + 1,
          activeChallenges: [...prev.activeChallenges, newCard],
        };
      }
    });
  };

  const triggerAlarm = () => {
    setGameState((prev) => {
      // Check if specialist cards are disabled
      if (!prev.specialistCardsEnabled) {
        return {
          ...prev,
          alarmsTriggered: prev.alarmsTriggered + 1,
        };
      }

      if (prev.gameMode === 'standard' || prev.gameMode === 'professional') {
        // Standard and Professional mode: one specialist card at a time (replace)
        let newCard: Card;
        let newPosition = prev.specialistDeckPosition;

        if (prev.randomizeCards && prev.gameMode === 'standard') {
          // Random card selection (only for standard mode)
          newCard = specialistCards[Math.floor(Math.random() * specialistCards.length)];
        } else if (prev.gameMode === 'professional') {
          // Professional mode: random specialist card
          newCard = specialistCards[Math.floor(Math.random() * specialistCards.length)];
        } else {
          // Sequential card selection (standard mode without randomization)
          newPosition = (prev.specialistDeckPosition % 10) + 1;
          newCard = specialistCards[newPosition - 1];
        }

        return {
          ...prev,
          alarmsTriggered: prev.alarmsTriggered + 1,
          specialistDeckPosition: newPosition,
          activeSpecialists: [newCard], // Replace with single card
        };
      } else {
        // Never ending mode: random cards, multiple allowed, no duplicates
        const newCard = getRandomUniqueCard(specialistCards, prev.activeSpecialists);
        return {
          ...prev,
          alarmsTriggered: prev.alarmsTriggered + 1,
          activeSpecialists: [...prev.activeSpecialists, newCard],
        };
      }
    });
  };

  const drawNextChallenge = () => {
    setGameState((prev) => {
      if (prev.gameMode === 'standard') {
        const newPosition = (prev.challengeDeckPosition % 10) + 1;
        const newCard = challengeCards[newPosition - 1];
        return {
          ...prev,
          challengeDeckPosition: newPosition,
          activeChallenges: [newCard],
        };
      } else {
        // Filter out Quick Access for professional and master-thief modes
        const availableChallenges = (prev.gameMode === 'professional' || prev.gameMode === 'master-thief')
          ? challengeCards.filter(card => card.id !== 1)
          : challengeCards;
        const newCard = getRandomUniqueCard(availableChallenges, prev.activeChallenges);
        return {
          ...prev,
          activeChallenges: [...prev.activeChallenges, newCard],
        };
      }
    });
  };

  const drawNextSpecialist = () => {
    setGameState((prev) => {
      if (prev.gameMode === 'standard') {
        const newPosition = (prev.specialistDeckPosition % 10) + 1;
        const newCard = specialistCards[newPosition - 1];
        return {
          ...prev,
          specialistDeckPosition: newPosition,
          activeSpecialists: [newCard],
        };
      } else {
        const newCard = getRandomUniqueCard(specialistCards, prev.activeSpecialists);
        return {
          ...prev,
          activeSpecialists: [...prev.activeSpecialists, newCard],
        };
      }
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
    setGameState((prev) => {
      if (card.type === 'challenge') {
        // Prevent Quick Access (card #1) in professional and master-thief modes
        if ((prev.gameMode === 'professional' || prev.gameMode === 'master-thief') && card.id === 1) {
          return prev; // Don't add Quick Access card
        }

        // Check if card is already active
        const isAlreadyActive = prev.activeChallenges.some(c => c.id === card.id);
        if (isAlreadyActive) {
          return prev; // Don't add duplicate
        }

        if (prev.gameMode === 'standard') {
          return {
            ...prev,
            activeChallenges: [card], // Replace
            challengeDeckPosition: card.id,
          };
        } else {
          return {
            ...prev,
            activeChallenges: [...prev.activeChallenges, card],
          };
        }
      } else {
        // Check if card is already active
        const isAlreadyActive = prev.activeSpecialists.some(c => c.id === card.id);
        if (isAlreadyActive) {
          return prev; // Don't add duplicate
        }

        if (prev.gameMode === 'standard') {
          return {
            ...prev,
            activeSpecialists: [card], // Replace
            specialistDeckPosition: card.id,
          };
        } else {
          return {
            ...prev,
            activeSpecialists: [...prev.activeSpecialists, card],
          };
        }
      }
    });
  };

  const isGameWon = (gameState.gameMode === 'standard' || gameState.gameMode === 'professional' || gameState.gameMode === 'master-thief') && gameState.vaultsOpened >= 3;
  const isGameLost = gameState.gameMode === 'master-thief' ? gameState.alarmsTriggered >= 2 : gameState.alarmsTriggered >= 3;

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
