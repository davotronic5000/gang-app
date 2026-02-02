'use client';

import { useState } from 'react';
import { Card, GameMode } from '@/types/game';
import { challengeCards, specialistCards } from '@/data/cards';

interface CardLibraryProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCard: (card: Card) => void;
  gameMode?: GameMode;
}

export default function CardLibrary({
  isOpen,
  onClose,
  onSelectCard,
  gameMode = 'standard',
}: CardLibraryProps) {
  const [activeTab, setActiveTab] = useState<'challenge' | 'specialist'>('challenge');
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  // Filter out Quick Access (card #1) for professional and master-thief modes
  const availableChallengeCards = (gameMode === 'professional' || gameMode === 'master-thief')
    ? challengeCards.filter(card => card.id !== 1)
    : challengeCards;

  const currentCards = activeTab === 'challenge' ? availableChallengeCards : specialistCards;
  const filteredCards = currentCards.filter(
    (card) =>
      card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectCard = (card: Card) => {
    onSelectCard(card);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-neutral-900 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] flex flex-col border border-amber-500/30">
        {/* Header */}
        <div className="p-6 border-b border-amber-500/20">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-amber-100">Card Library</h2>
            <button
              onClick={onClose}
              className="text-amber-200/70 hover:text-amber-100 transition-colors text-3xl leading-none"
            >
              ×
            </button>
          </div>

          {/* Search */}
          <input
            type="text"
            placeholder="Search cards..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-black/40 border border-amber-500/30 rounded-lg px-4 py-2 text-amber-100 placeholder-amber-300/30 focus:outline-none focus:border-amber-500"
          />
        </div>

        {/* Tabs */}
        <div className="flex border-b border-amber-500/20">
          <button
            onClick={() => setActiveTab('challenge')}
            className={`flex-1 px-6 py-3 font-semibold transition-all ${
              activeTab === 'challenge'
                ? 'text-amber-400 border-b-2 border-amber-400 bg-amber-500/10'
                : 'text-amber-200/60 hover:text-amber-200/80'
            }`}
          >
            Challenge Cards ({availableChallengeCards.length})
          </button>
          <button
            onClick={() => setActiveTab('specialist')}
            className={`flex-1 px-6 py-3 font-semibold transition-all ${
              activeTab === 'specialist'
                ? 'text-green-400 border-b-2 border-green-400 bg-green-500/10'
                : 'text-amber-200/60 hover:text-amber-200/80'
            }`}
          >
            Specialist Cards ({specialistCards.length})
          </button>
        </div>

        {/* Card List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3">
          {filteredCards.length === 0 ? (
            <p className="text-amber-200/50 text-center py-8">No cards found</p>
          ) : (
            filteredCards.map((card) => (
              <div
                key={card.id}
                className={`p-4 rounded-lg border transition-all hover:scale-[1.02] ${
                  activeTab === 'challenge'
                    ? 'bg-amber-500/10 border-amber-500/30 hover:border-amber-500/50'
                    : 'bg-green-500/10 border-green-500/30 hover:border-green-500/50'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className={`inline-block text-black text-xs font-bold px-2 py-1 rounded ${
                          activeTab === 'challenge'
                            ? 'bg-gradient-to-r from-amber-500 to-yellow-500'
                            : 'bg-gradient-to-r from-green-500 to-emerald-500'
                        }`}
                      >
                        #{card.id}
                      </span>
                      <h3 className="text-amber-100 font-semibold">{card.name}</h3>
                    </div>
                    <p className="text-amber-200/80 text-sm">{card.description}</p>
                  </div>
                  <button
                    onClick={() => handleSelectCard(card)}
                    className={`px-3 py-1 rounded text-sm font-semibold text-black transition-all ${
                      activeTab === 'challenge'
                        ? 'bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600'
                        : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600'
                    }`}
                  >
                    Select
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
