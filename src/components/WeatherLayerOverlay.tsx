import { useEffect, useState } from 'react';

interface WeatherLayers {
  volcanicEruption: boolean;
  cloud: boolean;
  precipitation: boolean;
}

interface WeatherLayerOverlayProps {
  layers: WeatherLayers;
}

// Mock weather regions for demonstration
const weatherRegions = {
  volcanicEruption: [
    { lat: -7.54, lng: 110.45, intensity: 3, id: 'volcano-merapi' },      // Mount Merapi, Indonesia
    { lat: 37.75, lng: 15.00, intensity: 3, id: 'volcano-etna' },          // Mount Etna, Italy
    { lat: 56.06, lng: 160.64, intensity: 2, id: 'volcano-klyuchevskoy' }, // Klyuchevskoy, Russia
    { lat: 19.02, lng: -98.62, intensity: 2, id: 'volcano-popocatepetl' }, // Popocatépetl, Mexico
    { lat: -1.52, lng: 29.25, intensity: 3, id: 'volcano-nyiragongo' },    // Mount Nyiragongo, DR Congo
  ],
  cloud: [
    { lat: 51.5074, lng: -0.1278, intensity: 2, id: 'cloud-1' },
    { lat: 48.8566, lng: 2.3522, intensity: 3, id: 'cloud-2' },
    { lat: 37.7749, lng: -122.4194, intensity: 1, id: 'cloud-3' },
  ],
  precipitation: [
    { lat: 34.0522, lng: -118.2437, intensity: 2, id: 'precip-1' },
    { lat: 41.8781, lng: -87.6298, intensity: 3, id: 'precip-2' },
  ],
};

export function WeatherLayerOverlay({ layers }: WeatherLayerOverlayProps) {
  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationPhase(p => (p + 1) % 4);
    }, 800);

    return () => clearInterval(interval);
  }, []);

  const getLayerStyle = (type: keyof WeatherLayers) => {
    switch (type) {
      case 'volcanicEruption':
        return {
          fill: 'rgba(249, 115, 22, 0.25)',
          stroke: 'rgba(234, 88, 12, 0.9)',
          glowColor: 'rgba(249, 115, 22, 0.6)',
          particleColor: '#fb923c',
        };
      case 'cloud':
        return {
          fill: 'rgba(191, 219, 254, 0.20)',
          stroke: 'rgba(147, 197, 253, 0.8)',
          glowColor: 'rgba(191, 219, 254, 0.5)',
          particleColor: '#93c5fd',
        };
      case 'precipitation':
        return {
          fill: 'rgba(34, 211, 238, 0.18)',
          stroke: 'rgba(6, 182, 212, 0.85)',
          glowColor: 'rgba(34, 211, 238, 0.5)',
          particleColor: '#22d3ee',
        };
    }
  };

  return (
    <>
      {(Object.keys(layers) as Array<keyof WeatherLayers>).map((layerType) => {
        if (!layers[layerType]) return null;
        
        const regions = weatherRegions[layerType];
        const style = getLayerStyle(layerType);

        return regions.map((region, index) => {
          // Convert lat/lng to screen position
          const x = ((region.lng + 180) / 360) * 100;
          const y = ((90 - region.lat) / 180) * 100;
          
          // Size based on intensity
          const baseSize = 8 + region.intensity * 4;
          const width = baseSize;
          const height = baseSize * 0.8;

          return (
            <div
              key={region.id}
              className="absolute pointer-events-none"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: 'translate(-50%, -50%)',
                width: `${width}%`,
                height: `${height}%`,
              }}
            >
              {/* Main weather area with pulsing effect */}
              <div
                className="absolute inset-0 rounded-full transition-all duration-700"
                style={{
                  backgroundColor: style.fill,
                  border: `2px solid ${style.stroke}`,
                  boxShadow: `0 0 20px ${style.glowColor}, inset 0 0 20px ${style.glowColor}`,
                  opacity: 0.7 + animationPhase * 0.075,
                  transform: `scale(${0.95 + animationPhase * 0.025})`,
                }}
              />

              {/* Outer glow ring */}
              <div
                className="absolute inset-0 rounded-full transition-all duration-700"
                style={{
                  border: `1px solid ${style.stroke}`,
                  opacity: animationPhase === 0 ? 0.5 : 0.2,
                  transform: `scale(${1.1 + animationPhase * 0.05})`,
                }}
              />

              {/* Type-specific visual effects */}
              {layerType === 'volcanicEruption' && (
                <>
                  {/* Ash plume effect - radiating particles */}
                  {[...Array(8)].map((_, i) => {
                    const angle = (i / 8) * Math.PI * 2;
                    const distance = 30 + (animationPhase * 10);
                    return (
                      <div
                        key={`ash-${i}`}
                        className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full transition-all duration-700"
                        style={{
                          backgroundColor: style.particleColor,
                          opacity: 0.6 - (animationPhase * 0.15),
                          transform: `translate(-50%, -50%) translate(${Math.cos(angle) * distance}%, ${Math.sin(angle) * distance}%)`,
                          boxShadow: `0 0 8px ${style.particleColor}`,
                        }}
                      />
                    );
                  })}
                  {/* Center eruption point */}
                  <div
                    className="absolute top-1/2 left-1/2 w-4 h-4 rounded-full"
                    style={{
                      backgroundColor: '#ea580c',
                      transform: 'translate(-50%, -50%)',
                      boxShadow: `0 0 15px #fb923c, 0 0 30px #f97316`,
                      animation: 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                    }}
                  />
                </>
              )}

              {layerType === 'cloud' && (
                <>
                  {/* Cloud coverage with floating effect */}
                  <div
                    className="absolute inset-0 rounded-full transition-all duration-1000"
                    style={{
                      background: `radial-gradient(circle, rgba(191, 219, 254, 0.3) 0%, rgba(147, 197, 253, 0.15) 50%, transparent 70%)`,
                      transform: `translateY(${Math.sin(animationPhase * 0.5) * 3}%)`,
                    }}
                  />
                  {/* Floating cloud particles */}
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={`cloud-${i}`}
                      className="absolute rounded-full transition-all duration-1000"
                      style={{
                        backgroundColor: 'rgba(191, 219, 254, 0.4)',
                        width: `${15 + i * 5}%`,
                        height: `${10 + i * 3}%`,
                        top: `${20 + i * 15}%`,
                        left: `${10 + i * 12}%`,
                        opacity: 0.3 + (animationPhase === i % 4 ? 0.3 : 0),
                        transform: `translateX(${(animationPhase - 2) * 2}%)`,
                      }}
                    />
                  ))}
                </>
              )}

              {layerType === 'precipitation' && (
                <>
                  {/* Rain effect - falling particles */}
                  {[...Array(12)].map((_, i) => {
                    const xPos = (i / 12) * 100;
                    const delay = i * 0.2;
                    return (
                      <div
                        key={`rain-${i}`}
                        className="absolute w-0.5 h-3 rounded-full transition-all"
                        style={{
                          backgroundColor: style.particleColor,
                          left: `${xPos}%`,
                          top: `${((animationPhase + delay) % 4) * 25}%`,
                          opacity: 0.6,
                          boxShadow: `0 0 4px ${style.particleColor}`,
                          transform: 'rotate(15deg)',
                        }}
                      />
                    );
                  })}
                  {/* Storm intensity indicator */}
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: `radial-gradient(circle, rgba(34, 211, 238, 0.2) 0%, rgba(6, 182, 212, 0.1) 60%, transparent 80%)`,
                      animation: animationPhase % 2 === 0 ? 'flash 0.3s ease-in-out' : 'none',
                    }}
                  />
                </>
              )}

              {/* Intensity indicator - center dot */}
              <div
                className="absolute top-1/2 left-1/2 rounded-full"
                style={{
                  width: `${1 + region.intensity * 0.5}%`,
                  height: `${1 + region.intensity * 0.5}%`,
                  backgroundColor: style.stroke,
                  transform: 'translate(-50%, -50%)',
                  boxShadow: `0 0 10px ${style.glowColor}`,
                }}
              />
            </div>
          );
        });
      })}
    </>
  );
}