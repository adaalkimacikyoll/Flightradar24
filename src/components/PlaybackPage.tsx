import { ArrowLeft, Play, Pause, SkipBack, SkipForward, Calendar } from 'lucide-react';
import { useState } from 'react';

interface PlaybackPageProps {
  onBack: () => void;
}

export function PlaybackPage({ onBack }: PlaybackPageProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);

  const speeds = [0.5, 1, 2, 4, 8];

  return (
    <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-800 z-40 overflow-y-auto">
      {/* Header */}
      <div className="bg-gray-900/50 backdrop-blur-lg border-b border-white/10 sticky top-0 z-10">
        <div className="px-4 pt-14 pb-4 flex items-center gap-4">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <ArrowLeft size={20} className="text-white" />
          </button>
          <h1 className="text-white text-2xl">Playback</h1>
        </div>
      </div>

      {/* Playback Controls */}
      <div className="p-4 space-y-6">
        {/* Date Selector */}
        <div className="bg-white/5 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <Calendar size={20} className="text-blue-400" />
            <h2 className="text-white">Select Date & Time</h2>
          </div>
          <input
            type="datetime-local"
            className="w-full bg-white/10 text-white rounded-lg px-4 py-3"
            defaultValue="2025-12-09T18:16"
          />
        </div>

        {/* Playback Speed */}
        <div className="bg-white/5 rounded-2xl p-4">
          <h2 className="text-white mb-3">Playback Speed</h2>
          <div className="flex gap-2">
            {speeds.map((s) => (
              <button
                key={s}
                onClick={() => setSpeed(s)}
                className={`flex-1 py-2 rounded-lg transition-colors ${
                  speed === s
                    ? 'bg-blue-500 text-white'
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                {s}x
              </button>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white/5 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white/70 text-sm">12:00 PM</span>
            <span className="text-white/70 text-sm">11:59 PM</span>
          </div>
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full w-1/2 bg-blue-500 rounded-full"></div>
          </div>
          <div className="text-center mt-2">
            <span className="text-white">6:00 PM</span>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-center gap-4">
          <button className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
            <SkipBack size={24} className="text-white" />
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-16 h-16 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center transition-colors"
          >
            {isPlaying ? (
              <Pause size={28} className="text-white" />
            ) : (
              <Play size={28} className="text-white ml-1" />
            )}
          </button>
          <button className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
            <SkipForward size={24} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}