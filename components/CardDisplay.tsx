'use client';

import { Card } from '@/types/game';

interface CardDisplayProps {
  activeChallenges: Card[];
  activeSpecialists: Card[];
  onClearChallenge: (cardId?: number) => void;
  onClearSpecialist: (cardId?: number) => void;
}

export default function CardDisplay({
  activeChallenges,
  activeSpecialists,
  onClearChallenge,
  onClearSpecialist,
}: CardDisplayProps) {
  const hasCards = activeChallenges.length > 0 || activeSpecialists.length > 0;

  if (!hasCards) {
    return (
      <div className="bg-black/20 backdrop-blur-sm rounded-xl p-8 border border-neutral-700/30">
        <p className="text-amber-200/50 text-center">
          No active cards. Open a vault or trigger an alarm to draw a card.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Challenge Cards */}
      {activeChallenges.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-amber-100 flex items-center gap-2">
              <span className="text-amber-400">⚡</span> Active Challenges ({activeChallenges.length})
            </h3>
            {activeChallenges.length > 1 && (
              <button
                onClick={() => onClearChallenge()}
                className="text-sm text-amber-400 hover:text-amber-300 transition-colors"
              >
                Clear All
              </button>
            )}
          </div>
          {activeChallenges.map((card) => (
            <div
              key={`challenge-${card.id}`}
              className="bg-gradient-to-br from-amber-500/20 to-yellow-600/10 backdrop-blur-sm rounded-xl p-6 border border-amber-500/40"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <span className="inline-block bg-gradient-to-r from-amber-500 to-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full mb-2">
                    CHALLENGE #{card.id}
                  </span>
                  <h4 className="text-xl font-bold text-amber-100">{card.name}</h4>
                </div>
                <button
                  onClick={() => onClearChallenge(card.id)}
                  className="text-amber-200/70 hover:text-amber-100 transition-colors text-2xl leading-none"
                  title="Clear this card"
                >
                  ×
                </button>
              </div>
              <p className="text-amber-200/90">{card.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Specialist Cards */}
      {activeSpecialists.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-amber-100 flex items-center gap-2">
              <span className="text-green-400">🎯</span> Active Specialists ({activeSpecialists.length})
            </h3>
            {activeSpecialists.length > 1 && (
              <button
                onClick={() => onClearSpecialist()}
                className="text-sm text-green-400 hover:text-green-300 transition-colors"
              >
                Clear All
              </button>
            )}
          </div>
          {activeSpecialists.map((card) => (
            <div
              key={`specialist-${card.id}`}
              className="bg-gradient-to-br from-green-500/20 to-emerald-600/10 backdrop-blur-sm rounded-xl p-6 border border-green-500/40"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <span className="inline-block bg-gradient-to-r from-green-500 to-emerald-500 text-black text-xs font-bold px-3 py-1 rounded-full mb-2">
                    SPECIALIST #{card.id}
                  </span>
                  <h4 className="text-xl font-bold text-amber-100">{card.name}</h4>
                </div>
                <button
                  onClick={() => onClearSpecialist(card.id)}
                  className="text-green-200/70 hover:text-green-100 transition-colors text-2xl leading-none"
                  title="Clear this card"
                >
                  ×
                </button>
              </div>
              <p className="text-green-100/90">{card.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
