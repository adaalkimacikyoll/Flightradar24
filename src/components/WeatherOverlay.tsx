import { useEffect, useState } from 'react';

interface WeatherOverlayProps {
  type: 'volcanic';
  lat: number;
  lng: number;
  radius: number;
  active: boolean;
}

export function WeatherOverlay({ type, lat, lng, radius, active }: WeatherOverlayProps) {
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    if (!active) return;
    
    const interval = setInterval(() => {
      setPulse(p => (p + 1) % 3);
    }, 1000);

    return () => clearInterval(interval);
  }, [active]);

  if (!active) return null;

  const colors = {
    volcanic: {
      fill: 'rgba(255, 69, 0, 0.15)',
      stroke: 'rgba(255, 69, 0, 0.85)',
      center: '#ff4500',
    },
  };

  // Convert lat/lng to screen position (simplified projection)
  const x = ((lng + 180) / 360) * 100;
  const y = ((90 - lat) / 180) * 100;

  return (
    <div 
      className="absolute pointer-events-none"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: 'translate(-50%, -50%)',
        width: `${radius * 2}%`,
        height: `${radius * 2}%`,
      }}
    >
      {/* Single clean circular warning area */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          backgroundColor: colors[type].fill,
          border: `3px solid ${colors[type].stroke}`,
          boxShadow: `
            0 0 0 ${pulse === 0 ? '12px' : '8px'} ${colors[type].fill},
            0 0 30px ${colors[type].stroke},
            0 0 60px ${colors[type].fill}
          `,
          transition: 'all 1s ease-out',
        }}
      />

      {/* Pulsing outer ring */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          border: `2px solid ${colors[type].stroke}`,
          transform: `scale(${pulse === 0 ? 1.08 : 1.0})`,
          opacity: pulse === 0 ? 0.6 : 0.3,
          transition: 'all 1s ease-out',
        }}
      />

      {/* Second pulsing ring */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          border: `2px solid ${colors[type].stroke}`,
          transform: `scale(${pulse === 1 ? 1.16 : 1.08})`,
          opacity: pulse === 1 ? 0.5 : 0.2,
          transition: 'all 1s ease-out',
        }}
      />

      {/* Center warning marker */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center"
        style={{
          width: '32px',
          height: '32px',
          backgroundColor: colors[type].center,
          boxShadow: `0 0 20px ${colors[type].center}, 0 0 40px ${colors[type].fill}`,
          border: '3px solid white',
          zIndex: 10,
        }}
      >
        <span
          className="text-white font-bold"
          style={{
            fontSize: '18px',
            textShadow: '0 1px 3px rgba(0,0,0,0.5)',
          }}
        >
          🌋
        </span>
      </div>
    </div>
  );
}