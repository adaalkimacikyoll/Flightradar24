import { Plane } from 'lucide-react';
import { useState } from 'react';

interface AirplaneIconProps {
  altitude: number; // in feet
  rotation: number;
  lat: number;
  lng: number;
  callsign?: string;
  airlineColor: string;
  onClick?: () => void;
  isHighlighted?: boolean;
}

export function AirplaneIcon({ altitude, rotation, lat, lng, callsign, airlineColor, onClick, isHighlighted }: AirplaneIconProps) {
  const [isHovered, setIsHovered] = useState(false);

  const altitudeInK = Math.round(altitude / 1000);

  return (
    <div
      className="cursor-pointer transition-all duration-200"
      style={{
        zIndex: isHighlighted ? 200 : (isHovered ? 100 : 10),
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Highlight Ring - Pulsing Animation */}
      {isHighlighted && (
        <>
          <div 
            className="absolute inset-0 -m-4 rounded-full border-4 border-blue-400 animate-ping"
            style={{ transform: 'rotate(0deg)' }}
          />
          <div 
            className="absolute inset-0 -m-4 rounded-full border-4 border-blue-500"
            style={{ transform: 'rotate(0deg)' }}
          />
        </>
      )}

      {/* Airplane Icon with Altitude-Based Color */}
      <div 
        className="relative transition-transform hover:scale-125"
        style={{
          transform: `rotate(${rotation}deg) ${isHighlighted ? 'scale(1.3)' : ''}`,
          filter: isHighlighted 
            ? 'drop-shadow(0 0 20px rgba(59, 130, 246, 1))' 
            : isHovered 
            ? 'drop-shadow(0 0 10px rgba(255,255,255,1))' 
            : 'drop-shadow(0 2px 6px rgba(0,0,0,0.6))',
        }}
      >
        <Plane
          size={isHighlighted ? 32 : (isHovered ? 26 : 22)}
          fill={airlineColor}
          stroke="white"
          strokeWidth={2}
          className="transition-all"
        />
      </div>

      {/* Tooltip on Hover */}
      {isHovered && (
        <div 
          className="absolute left-1/2 -translate-x-1/2 top-full mt-2 bg-gray-900/95 text-white px-3 py-2 rounded-lg shadow-xl whitespace-nowrap z-50"
          style={{ transform: `translateX(-50%) rotate(0deg)` }}
        >
          <div className="text-xs">
            <div>{callsign}</div>
            <div className="text-gray-300">{altitudeInK}k ft</div>
            <div className="text-gray-400 text-[10px] mt-1">Click for details</div>
          </div>
          <div 
            className="absolute left-1/2 -translate-x-1/2 -top-1 w-2 h-2 bg-gray-900/95 rotate-45"
          />
        </div>
      )}
    </div>
  );
}