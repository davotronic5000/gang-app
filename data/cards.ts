import { Card } from '@/types/game';

export const challengeCards: Card[] = [
  {
    id: 1,
    type: 'challenge',
    name: 'Quick Access',
    description: 'Put aside the white chips for this heist. In the first round, distribute the pocket cards and go straight to Round 2.',
  },
  {
    id: 2,
    type: 'challenge',
    name: 'Noise Sensors',
    description: 'Turn over the 1-star chips for Rounds 1, 2, and 3 to the dark side. These chips cannot change owners after they have been taken from the center of the table.',
  },
  {
    id: 3,
    type: 'challenge',
    name: 'Motion Detector',
    description: 'If at least one of the community cards in Round 2 is a J, Q, or K, the following occurs: The player who has the white 1-star chip (from Round 1) must put their pocket cards face down in the discard pile and draw new pocket cards from the deck.',
  },
  {
    id: 4,
    type: 'challenge',
    name: 'Retina Scan',
    description: 'This challenge adds an extra condition for a successful heist. Before the player with the highest-value red chip reveals their hand in the showdown, you must do the following: The other players must confer and agree together on a card value (from 2 to ace) that they believe the player with the highest-value red chip has at least one of in their pocket cards. The player with the highest-value red chip obviously cannot take part in this discussion or give hints. If the players are incorrect, the heist is unsuccessful, even if the ranking of the red chips was correct.',
  },
  {
    id: 5,
    type: 'challenge',
    name: 'Hasty Getaway',
    description: 'There is no distribution of orange chips in Round 3. Just reveal the fourth community card and go straight to Round 4.',
  },
  {
    id: 6,
    type: 'challenge',
    name: 'Hasty Getaway',
    description: 'There is no distribution of orange chips in Round 3. Flip over the fourth community card and go straight to Round 4.',
  },
  {
    id: 7,
    type: 'challenge',
    name: 'Laser Tripwires',
    description: 'If none of the community cards in Round 2 is a J, Q, or K, the following occurs: The player who has the highest-value white chip (from Round 1) must put their pocket cards face down in the discard pile and draw new pocket cards from the deck.',
  },
  {
    id: 8,
    type: 'challenge',
    name: 'Blackout',
    description: 'At the beginning of Round 2, you must all discard your chips from Round 1. At the beginning of Round 3, you must all discard your chips from Round 2. At the beginning of Round 4, you must all discard your chips from Round 3. This means that you all must pay close attention to who has which chips in each round in order to better evaluate changes in the strength of your hands.',
  },
  {
    id: 9,
    type: 'challenge',
    name: 'Fingerprint Scan',
    description: 'This challenge adds an extra condition for a successful heist. Before the player with the highest-value red chip reveals their hand in the showdown, you must do the following: The other players must confer and agree together on what hand ranking (high card to royal flush) they believe the player with the highest-value red chip has. The player with the highest-value red chip obviously cannot take part in this discussion or give hints. If the players are incorrect, the heist is unsuccessful, even if the ranking of the red chips was correct.',
  },
  {
    id: 10,
    type: 'challenge',
    name: 'Security Cameras',
    description: 'Instead of two pocket cards, you all play with three! For the showdown, build the best five-card combination out of your three pocket cards and five community cards (instead of two pocket cards and five community cards).',
  },
];

export const specialistCards: Card[] = [
  {
    id: 1,
    type: 'specialist',
    name: 'Informant',
    description: 'Decide which of you will secretly show exactly one of their pocket cards to one other player. Of course, this player may not tell the others which card they have seen.',
  },
  {
    id: 2,
    type: 'specialist',
    name: 'Getaway Driver',
    description: 'Decide which of you will share what hand ranking their current hand has (pocket cards plus current community cards) with the rest of the players. They cannot share further details. Example: "I have a pair." The player cannot share which pair they have!',
  },
  {
    id: 3,
    type: 'specialist',
    name: 'Investor',
    description: 'Once the pocket cards have been dealt in Round 1, each player says how many "face cards" (J, Q, K) they have. Example: Arsène has K, J and says: "I have two face cards." Doris has Q, 3 and says: "I have one face card." Trudy has A, 10 and says: "I have no face cards."',
  },
  {
    id: 4,
    type: 'specialist',
    name: 'Mastermind',
    description: 'Decide which of you will share with everyone how many cards of a specific value they have in their hand. Example: You decide as a group that Danny will tell you all how many 9s he has. He has 9, 3 and says: "I have a 9."',
  },
  {
    id: 5,
    type: 'specialist',
    name: 'Hacker',
    description: 'Decide which of you will take one card from the deck and add it to their hand. Afterward, this player must place one of their pocket cards face down on the discard pile. This can be the card that they have just drawn from the deck.',
  },
  {
    id: 6,
    type: 'specialist',
    name: 'Coordinator',
    description: 'Once the pocket cards have been dealt in Round 1, each of you chooses one of your pocket cards. Everyone then simultaneously passes their chosen card to the player on their left as a pocket card.',
  },
  {
    id: 7,
    type: 'specialist',
    name: 'Jack',
    description: 'Decide which of you will add the "Jack" specialist card to your pocket. Afterward, this player must place one of their pocket cards face down on the discard pile. The "Jack" specialist card counts as a J (Jack). However, it does not have a suit, so it cannot be used for a flush. If you have a four of a kind with the other four Jacks, it counts as a Jack four of a kind with a Jack as a kicker card.',
  },
  {
    id: 8,
    type: 'specialist',
    name: 'Math Whiz',
    description: 'Once the pocket cards have been dealt in Round 1, everyone states the sum of the value of their pocket cards. 2 to 10 have the values 2–10. J, Q, and K have the value of 10. A has the value of 11. Example: Arsène has 10, 7 in his hand and says: "I have 17 total." Doris has Q, 3 and says: "I have 13 total." Trudy has A, 10 and says: "I have 21 total."',
  },
  {
    id: 9,
    type: 'specialist',
    name: 'Con Artist',
    description: 'Once the pocket cards have been dealt in Round 1, and everyone has looked at their cards, place them face down in a pile in the center of the table, shuffle them, and then redistribute them. Important: You must only mix the cards that were previously dealt and redistribute them. If you paid attention to which cards you had before they were mixed up, you know two of the cards that are somewhere in your fellow players\' hands.',
  },
  {
    id: 10,
    type: 'specialist',
    name: 'Muscle',
    description: 'Decide which of you will take the "Muscle" specialist card and place it in front of you. During the showdown, this player beats any other player with a hand of the same ranking.',
  },
];
