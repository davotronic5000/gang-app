'use client';

interface AlarmTrackerProps {
  alarmsTriggered: number;
  onTriggerAlarm: () => void;
  isGameLost: boolean;
  specialistCardsEnabled?: boolean;
}

export default function AlarmTracker({
  alarmsTriggered,
  onTriggerAlarm,
  isGameLost,
  specialistCardsEnabled = true,
}: AlarmTrackerProps) {
  const getAlarmColor = () => {
    if (alarmsTriggered === 0) return 'from-neutral-800/30 to-neutral-900/20 border-neutral-700/30';
    if (alarmsTriggered === 1) return 'from-amber-500/10 to-orange-600/10 border-amber-500/30';
    if (alarmsTriggered === 2) return 'from-red-500/20 to-red-900/20 border-red-500/40';
    return 'from-red-600/30 to-red-950/30 border-red-500/50';
  };

  return (
    <div className={`bg-gradient-to-br ${getAlarmColor()} backdrop-blur-sm rounded-xl p-6 border`}>
      <h2 className="text-2xl font-bold text-amber-100 mb-4 flex items-center gap-2">
        <span>🔔</span> Alarms
        {!specialistCardsEnabled && (
          <span className="text-sm bg-gradient-to-r from-red-500 to-red-700 text-white px-2 py-1 rounded-full">
            🔥 HARD
          </span>
        )}
      </h2>

      <div className="flex gap-4 mb-4">
        {[1, 2, 3].map((alarm) => (
          <div
            key={alarm}
            className={`flex-1 aspect-square rounded-lg flex items-center justify-center text-4xl transition-all ${
              alarmsTriggered >= alarm
                ? 'bg-gradient-to-br from-red-500 to-red-700 shadow-lg shadow-red-500/50 animate-pulse'
                : 'bg-black/40 border-2 border-dashed border-neutral-600/30'
            }`}
          >
            {alarmsTriggered >= alarm ? '🔔' : '🔕'}
          </div>
        ))}
      </div>

      <div className="text-center text-amber-100 mb-4">
        <span className={`text-3xl font-bold ${alarmsTriggered >= 2 ? 'text-red-400' : ''}`}>
          {alarmsTriggered}
        </span>
        <span className="text-xl opacity-75"> / 3</span>
      </div>

      <button
        onClick={onTriggerAlarm}
        disabled={isGameLost}
        className={`w-full py-3 rounded-lg font-semibold transition-all ${
          isGameLost
            ? 'bg-gray-500/50 text-gray-300 cursor-not-allowed'
            : alarmsTriggered >= 2
            ? 'bg-gradient-to-r from-red-500 to-red-700 text-white hover:from-red-600 hover:to-red-800 shadow-lg shadow-red-500/30 hover:shadow-xl'
            : 'bg-gradient-to-r from-red-500/80 to-red-600/80 text-white hover:from-red-600 hover:to-red-700 shadow-lg shadow-red-500/20 hover:shadow-xl'
        }`}
      >
        Trigger Alarm
      </button>
    </div>
  );
}
