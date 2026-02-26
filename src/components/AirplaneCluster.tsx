import { useState } from 'react';
import { getAltitudeColor } from './utils/altitudeColors';

interface AirplaneClusterProps {
  count: number;
  lat: number;
  lng: number;
  altitude: number;
}

export function AirplaneCluster({ count, lat, lng, altitude }: AirplaneClusterProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Convert lat/lng to screen position
  const x = ((lng + 180) / 360) * 100;
  const y = ((90 - lat) / 180) * 100;

  const color = getAltitudeColor(altitude);
  const size = Math.min(40 + count * 2, 80); // Scale based on count

  const handleClick = () => {
    alert(`Cluster of ${count} flights\nAverage altitude: ${Math.round(altitude / 1000)}k ft\nZoom in to see individual flights`);
  };

  return (
    <div
      className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        zIndex: isHovered ? 100 : 20,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* Cluster Circle */}
      <div
        className="rounded-full flex items-center justify-center transition-all duration-300"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          backgroundColor: `${color}40`,
          border: `3px solid ${color}`,
          boxShadow: isHovered 
            ? `0 0 20px ${color}80, 0 0 40px ${color}40`
            : `0 0 10px ${color}60`,
          transform: isHovered ? 'scale(1.2)' : 'scale(1)',
        }}
      >
        <span 
          className="text-white drop-shadow-lg"
          style={{
            fontSize: count > 99 ? '14px' : '16px',
          }}
        >
          {count}
        </span>
      </div>

      {/* Pulse Animation Ring */}
      <div
        className="absolute inset-0 rounded-full animate-ping opacity-30"
        style={{
          backgroundColor: color,
          animationDuration: '2s',
        }}
      />

      {/* Tooltip on Hover */}
      {isHovered && (
        <div className="absolute left-1/2 -translate-x-1/2 top-full mt-3 bg-gray-900/95 text-white px-3 py-2 rounded-lg shadow-xl whitespace-nowrap z-50">
          <div className="text-xs">
            <div>{count} flights</div>
            <div className="text-gray-300">Avg: {Math.round(altitude / 1000)}k ft</div>
            <div className="text-gray-400 text-[10px] mt-1">Click or zoom in to see details</div>
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 -top-1 w-2 h-2 bg-gray-900/95 rotate-45" />
        </div>
      )}
    </div>
  );
}