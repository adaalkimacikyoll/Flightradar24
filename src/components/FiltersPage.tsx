import { ArrowLeft, Plane, Filter, Lock, Sparkles } from 'lucide-react';
import { useState } from 'react';

interface FiltersPageProps {
  onBack: () => void;
  showConfirmation: (message: string) => void;
}

export function FiltersPage({ onBack, showConfirmation }: FiltersPageProps) {
  const [altitudeRange, setAltitudeRange] = useState([0, 45000]);
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);

  const airlines = [
    'Emirates', 'Delta Air Lines', 'United Airlines', 'American Airlines',
    'British Airways', 'Air France', 'Lufthansa', 'Singapore Airlines'
  ];

  const aircraftCategories = [
    { id: 'passenger', label: 'Passenger', icon: '✈️' },
    { id: 'cargo', label: 'Cargo', icon: '📦' },
    { id: 'military', label: 'Military & Government', icon: '🛡️' },
    { id: 'private', label: 'Private Jets', icon: '🛩️' },
    { id: 'helicopter', label: 'Helicopters', icon: '🚁' },
  ];

  const toggleAirline = (airline: string) => {
    setSelectedAirlines(prev => 
      prev.includes(airline) 
        ? prev.filter(a => a !== airline)
        : [...prev, airline]
    );
  };

  const applyFilters = () => {
    showConfirmation('Filters applied successfully');
    onBack();
  };

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
          <h1 className="text-white text-2xl">Filters</h1>
        </div>
      </div>

      {/* Filter Options */}
      <div className="p-4 space-y-6">
        {/* Altitude Filter */}
        <div className="bg-white/5 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-4">
            <Filter size={20} className="text-blue-400" />
            <h2 className="text-white">Altitude Range</h2>
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="text-white/70 text-sm">Min</label>
              <input
                type="number"
                value={altitudeRange[0]}
                onChange={(e) => setAltitudeRange([parseInt(e.target.value), altitudeRange[1]])}
                className="w-full bg-white/10 text-white rounded-lg px-3 py-2 mt-1"
              />
            </div>
            <div className="flex-1">
              <label className="text-white/70 text-sm">Max</label>
              <input
                type="number"
                value={altitudeRange[1]}
                onChange={(e) => setAltitudeRange([altitudeRange[0], parseInt(e.target.value)])}
                className="w-full bg-white/10 text-white rounded-lg px-3 py-2 mt-1"
              />
            </div>
          </div>
        </div>

        {/* Airlines Filter */}
        <div className="bg-white/5 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-4">
            <Plane size={20} className="text-blue-400" />
            <h2 className="text-white">Airlines</h2>
          </div>
          <div className="space-y-2">
            {airlines.map((airline) => (
              <button
                key={airline}
                onClick={() => toggleAirline(airline)}
                className={`w-full text-left px-4 py-3 rounded-xl transition-colors ${
                  selectedAirlines.includes(airline)
                    ? 'bg-blue-500/30 border border-blue-400/50'
                    : 'bg-white/5 hover:bg-white/10'
                }`}
              >
                <span className="text-white">{airline}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Aircraft Categories - Locked with Single Banner */}
        <div className="bg-white/5 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-4">
            <Filter size={20} className="text-purple-400" />
            <h2 className="text-white">Aircraft Categories</h2>
          </div>

          {/* Single Free Trial Banner */}
          <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 rounded-xl p-4 mb-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                <Lock size={20} className="text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-semibold text-sm mb-1">
                  Premium Feature
                </h3>
                <p className="text-white/80 text-xs leading-relaxed mb-3">
                  To filter by aircraft category, please upgrade to Silver or Gold.
                </p>
                <button
                  onClick={() => showConfirmation('Free trial started!')}
                  className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-4 py-2.5 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                  <Sparkles size={14} />
                  <span>7-day free trial | Learn more</span>
                </button>
              </div>
            </div>
          </div>

          {/* Aircraft Category List - Locked */}
          <div className="space-y-2 opacity-50">
            {aircraftCategories.map((category) => (
              <div
                key={category.id}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 cursor-not-allowed"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{category.icon}</span>
                  <span className="text-white">{category.label}</span>
                  <Lock size={14} className="text-white/50 ml-auto" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Apply Button */}
        <button
          onClick={applyFilters}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl transition-colors"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
}