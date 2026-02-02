export interface Card {
  id: number;
  type: 'challenge' | 'specialist';
  name: string;
  description: string;
}

export type GameMode = 'standard' | 'neverending';

export interface GameState {
  gameMode: GameMode;
  vaultsOpened: number;
  alarmsTriggered: number;
  activeChallenges: Card[];
  activeSpecialists: Card[];
  challengeDeckPosition: number;
  specialistDeckPosition: number;
  specialistCardsEnabled: boolean;
  randomizeCards: boolean;
  gameStarted: boolean;
}
