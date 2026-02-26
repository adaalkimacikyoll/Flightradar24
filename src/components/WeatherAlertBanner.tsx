import { CloudLightning, X, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

interface WeatherAlert {
  id: string;
  type: 'volcanic';
  title: string;
  region: string;
  lat: number;
  lng: number;
  severity: 'high' | 'medium' | 'low';
}

interface WeatherAlertBannerProps {
  alert: WeatherAlert;
  onTap: () => void;
  onDismiss: () => void;
}

export function WeatherAlertBanner({ alert, onTap, onDismiss }: WeatherAlertBannerProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const severityColors = {
    high: 'bg-red-600/95',
    medium: 'bg-orange-500/95',
    low: 'bg-yellow-500/95'
  };

  const severityIcons = {
    volcanic: '🌋',
  };

  return (
    <div 
      className={`absolute top-[120px] left-1/2 -translate-x-1/2 w-[calc(100%-3rem)] max-w-sm z-45 ${severityColors[alert.severity]} rounded-lg shadow-2xl overflow-hidden transition-all duration-300 ${
        isExpanded ? 'max-h-32' : 'max-h-10'
      }`}
    >
      {/* Collapsed State - Minimal bar */}
      <div className="flex items-center gap-2 px-3 py-1.5 min-h-[40px]">
        <div className="flex-shrink-0 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
          <span className="text-base">{severityIcons[alert.type]}</span>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <CloudLightning size={12} className="text-white flex-shrink-0" />
            <span className="text-white font-semibold text-[11px] truncate">
              {isExpanded ? 'Severe Weather Detected' : alert.title}
            </span>
          </div>
          {isExpanded && (
            <p className="text-white/90 text-[10px] mt-0.5 truncate">
              {alert.title}
            </p>
          )}
        </div>

        {/* Toggle and Dismiss buttons */}
        <div className="flex items-center gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            className="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors active:scale-95"
            aria-label={isExpanded ? "Collapse alert" : "Expand alert"}
          >
            {isExpanded ? (
              <ChevronUp size={12} className="text-white" />
            ) : (
              <ChevronDown size={12} className="text-white" />
            )}
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onDismiss();
            }}
            className="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors active:scale-95"
            aria-label="Dismiss alert"
          >
            <X size={12} className="text-white" />
          </button>
        </div>
      </div>

      {/* Expanded State - Action button */}
      {isExpanded && (
        <button
          onClick={onTap}
          className="w-full bg-white/20 hover:bg-white/30 transition-colors px-3 py-2 flex items-center justify-center gap-2 active:scale-[0.98] border-t border-white/10"
        >
          <span className="text-white text-[11px] font-semibold">Tap to view on map</span>
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className="text-white">
            <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}
    </div>
  );
}