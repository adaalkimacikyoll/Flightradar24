import { ArrowLeft, Cloud, CloudRain, Droplets, Mountain } from 'lucide-react';
import { useState } from 'react';

interface WeatherPageProps {
  onBack: () => void;
  onWeatherLayerChange: (layers: WeatherLayers) => void;
  initialLayers: WeatherLayers;
}

export interface WeatherLayers {
  volcanicEruption: boolean;
  cloud: boolean;
  precipitation: boolean;
}

export function WeatherPage({ onBack, onWeatherLayerChange, initialLayers }: WeatherPageProps) {
  const [weatherLayers, setWeatherLayers] = useState<WeatherLayers>(initialLayers);

  const handleToggle = (layer: keyof WeatherLayers) => {
    // Only allow toggling free layers
    const option = weatherOptions.find(opt => opt.id === layer);
    if (option?.isPaid) {
      return; // Prevent toggling paid features
    }
    
    const newLayers = {
      ...weatherLayers,
      [layer]: !weatherLayers[layer],
    };
    setWeatherLayers(newLayers);
    onWeatherLayerChange(newLayers);
  };

  const weatherOptions = [
    {
      id: 'volcanicEruption' as keyof WeatherLayers,
      label: 'Volcanic Eruption',
      description: 'Active volcanic ash clouds',
      icon: Mountain,
      color: 'text-orange-400',
      isPaid: false,
    },
    {
      id: 'cloud' as keyof WeatherLayers,
      label: 'Cloud',
      description: 'Cloud coverage areas',
      icon: Cloud,
      color: 'text-blue-300',
      isPaid: true,
    },
    {
      id: 'precipitation' as keyof WeatherLayers,
      label: 'Precipitation',
      description: 'Rain and storm regions',
      icon: CloudRain,
      color: 'text-cyan-400',
      isPaid: true,
    },
  ];

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
          <h1 className="text-white text-2xl">Weather</h1>
        </div>
      </div>

      {/* Weather Layer Controls */}
      <div className="p-4 space-y-3">
        <h2 className="text-white/70 text-sm uppercase tracking-wide mb-4">Weather Layers</h2>
        
        {weatherOptions.map((option) => {
          const Icon = option.icon;
          const isActive = weatherLayers[option.id];
          
          return (
            <div
              key={option.id}
              className="bg-white/10 backdrop-blur-lg rounded-3xl p-5 transition-all"
              style={{
                backgroundColor: isActive ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.08)',
                borderWidth: '2px',
                borderColor: isActive ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.1)',
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <div className={`${option.color}`}>
                    <Icon size={32} strokeWidth={2} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-white text-lg font-medium">{option.label}</span>
                      {option.isPaid && (
                        <span className="px-2 py-0.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-[10px] font-semibold rounded-full uppercase tracking-wide">
                          Free Trial
                        </span>
                      )}
                    </div>
                    <div className="text-white/60 text-sm">{option.description}</div>
                    {option.isPaid && (
                      <div className="text-white/50 text-xs mt-1 flex items-center gap-1">
                        <span>Free trial available</span>
                        <span className="text-white/30">·</span>
                        <span>Subscription required</span>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Toggle Switch */}
                <button
                  onClick={() => handleToggle(option.id)}
                  disabled={option.isPaid}
                  className="relative inline-flex h-9 w-16 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-gray-900"
                  style={{
                    backgroundColor: isActive ? 'rgba(34, 197, 94, 0.8)' : 'rgba(255, 255, 255, 0.2)',
                    opacity: option.isPaid ? 0.4 : 1,
                    cursor: option.isPaid ? 'not-allowed' : 'pointer',
                  }}
                  role="switch"
                  aria-checked={isActive}
                  aria-label={`Toggle ${option.label}`}
                >
                  <span
                    className="inline-block h-7 w-7 transform rounded-full bg-white shadow-lg transition-transform"
                    style={{
                      transform: isActive ? 'translateX(32px)' : 'translateX(4px)',
                    }}
                  />
                </button>
              </div>

              {/* Active State Indicator */}
              {isActive && (
                <div className="mt-3 pt-3 border-t border-white/20 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-white/80 text-sm font-medium">Active on map</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Info Section */}
      <div className="p-4 pb-20">
        <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
          <div className="flex items-start gap-3">
            <Droplets size={20} className="text-white/70 mt-0.5" />
            <div>
              <div className="text-white text-sm font-medium mb-1">Weather Layer Info</div>
              <div className="text-white/60 text-xs leading-relaxed">
                Toggle weather layers ON to view affected areas on the map. Active layers are highlighted with colored overlays showing weather conditions in real-time.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}